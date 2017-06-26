'use strict';

const KoaRouter = require('koa-router');
const path = require('path');
const delFirst = require('../../deps/delFirstLetter');
const addLast = require('../../deps/addLastLetter');
const assert = require('assert');
const routes = Symbol.for('koas#routes');
const memoryRoutes = Symbol.for('koas#routesMemory');
const routesMap = Symbol.for('koas#routesMap');
const privateInit = Symbol.for('koas#routesprivateInit');
const staticRoute = {};

let routerConf = require(path.join(process.cwd(), '/koasConfig')).router;
class KoasRouter extends KoaRouter {
	constructor(isTest) {
			super();
			isTest && (routerConf = require('../../test/koasConfig').router)
			for (let i in routerConf) {
				staticRoute[i] = require(path.join(process.cwd(), routerConf[i]));
			}
			this[routes] = staticRoute; //未加工的路由
			this[memoryRoutes] = {}; //对路由的增删改查做内部记录
			this[routesMap] = []; //最终koa-router会加载的路由
			this[privateInit]();
		}
		[privateInit]() {
			let [tem, temBase] = [{}, '/'];
			for (let i in this[routes]) {
				this[routes][i].baseRouter && (temBase = this[routes][i].baseRouter);
				this[routesMap].push(addLast(temBase));
				Object.values(this[routes][i]).forEach(ob => {
					if (ob['url']) {
						ob.status = 1;
						ob['url'] = addLast(temBase) + delFirst(ob['url']);
						this[routesMap].push(ob['url']);
						this[memoryRoutes][ob['url']] = -1; //一级路由不能被删掉，只对二级路由做增删配置
					}
				})
			}
		}
	deleteRouter(block, router) {
		assert(this[routes][block] != null, 'This block is not exists');
		assert(this[routes][block][router], 'This router is not exists');
		let temro = this[routes][block][router].url;
		let index = this[routesMap].findIndex(ele => ele == temro);
		this[memoryRoutes][temro] = index; //index>=0 是删除的路由
		this[routesMap][index] = ''; //对相应的路由列表置空
		this[routes][block][router].status = 0; //数组暂时没用，因为一级路由的存在，数组不好统计
	}
	addRouter(block, router) {
			assert(this[routes][block] != null, 'This block is not exists');
			assert(this[routes][block][router], 'This router is not exists');
			let temro = this[routes][block][router].url;
			this[routes][block][router].status = 1;
			if (this[memoryRoutes][temro] >= 0) {
				let index = this[memoryRoutes][temro];
				this[routesMap][index] = temro;
			}
		}
		//重写routes()方法，之前的routes返回的是函数，非async，进行async改装
	routes() {
			return async(ctx, next) => {
				let despatch = super.routes.call(this);
				return await despatch.call(this, ctx, next)
			}
		}
		//用map来做管理 注册到koa2的router
	get map() {
			return this[routesMap];
		}
		//map can't change by =
	set map(val) {
			return this[routesMap];
		}
		//jsonMap 主要用于router json串管理
	get jsonMap() {
		return this[routes];
	}
	set jsonMap(val) {
		return this[routes];
	}
}
exports = module.exports = KoasRouter;