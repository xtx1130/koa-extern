'use strict';

const KoaRouter = require('koa-router');
const path = require('path');
const delFirst = require('../deps/delFirstLetter');
const addLast = require('../deps/addLastLetter');
const assert = require('assert');
const staticRoute = {};
const routes = Symbol.for('koas#routes');
const memoryRoutes = Symbol.for('koas#memoryRoutes');
const routesMap = Symbol.for('koas#routesMap');
const praviteInit = Symbol.for('koas#praviteInit')

let routerConf = require('../koasConfig').router;
class KoasRouter extends KoaRouter{
	constructor(isTest){
		isTest&&(routerConf = require('../test/koasConfig').router)
		for(let i in routerConf){
			staticRoute[i] = require(path.join(__dirname,'../',routerConf[i]));
		}
		super();
		this[routes] = staticRoute;
		this[memoryRoutes] = {};
		this[routesMap] = [];
		this[privateInit]();
	}
	[privateInit]() {
		let [tem,temBase] = [{},'/'];
		for(let i in this[routes]){
			this[routes][i].baseRouter&&(temBase = this[routes][i].baseRouter);
			this[routesMap].push(addLast(temBase));
			Object.values(this[routes][i]).forEach(ob => {
				if(ob['url']){
					ob['url'] = addLast(temBase)+delFirst(ob['url']);
					this[routesMap].push(ob['url'])
				}
			})
		}
	}
	deleteRouter(block,router) {
		assert(this[routes][block]!=null,'This block is not exists');
		assert(this[routes][block][router],'This router is not exists');
		let temro = this[routes][block][router].url;
		console.log(temro)
		let index = this[routesMap].findIndex(ele => ele==temro);
		console.log(index)	
	}
	addRouter(block,router) {
		assert(this[routes][block]!=null,'This block is not exists');
		assert(this[routes][block][router],'This router is not exists');
		let temro = this[routes][block][router].url;
	}
	//用map来做管理 注册到koa2的router
	get map() {
		return this[routesMap];
	}
	get jsonMap(){
		return this[routes];
	}
}
module.exports = KoasRouter;