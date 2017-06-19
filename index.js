'use strict';
/*
 *@author xtx1130
 *@description 处理基础routes和基本controller绑定，抛出扩展后的koa构造函数
 */
const Koa = require('koa');
const Routes = require('./app/routes/koas-router');
const Controller = require('./app/controllers/controller');
const isAsync = require('./deps/isAsyncFunc');
const Assert = require('assert');

const syncRouteController = Symbol.for('koas#syncRouteController');

class Koas extends Koa{
	constructor(flag){
		flag = flag|| false;
		super();
		this.koasroutes = new Routes(flag);
		this.controller = new Controller(flag);
		this[syncRouteController]();//初始化所有的二级routes
		this.use(this.koasroutes.routes())
	}
	get routesMap() {
		return this.koasroutes.jsonMap;
	}
	get controlMap() {
		return this.controller.jsonMap;
	}
	get routes() {
		return Routes;
	}
	//重构koa的use方法，只针对async function进行判断，迎接8.x的lts版本，删除koa-convert引用
	use(fn) {
		if (!isAsync(fn)) 
			throw new TypeError('middleware must be a AsyncFunction!');
		this.middleware.push(fn);
		return this;
	}
	//同步注册routes，controllers，通过key来寻找对应关系
	[syncRouteController](){
		for(let i in this.routesMap){
			for(let j in this.routesMap[i]){
				if(j === 'baseRouter'){
					//对一级路由进行绑定 统一get方法
					Assert(isAsync(this.controlMap[i].index),'controlMap\'s index must be an async function');
					this.koasroutes.get(this.routesMap[i][j],this.controlMap[i].index);
				}else{
					//对二级路由进行绑定，方法为routesMap中的方法，没有的话默认get
					let temroute = this.routesMap[i][j]; 
					let meth = (temroute.method&&temroute.method.split(','))||['get'];
					if(temroute.status === 1){
						for(let k = 0;k<meth.length;k++){
							Assert(this.koasroutes.methods.join('').match(meth[k].toUpperCase()),'only support HEAD,OPTIONS,GET,PUT,PATCH,POST,DELETE')
							this.koasroutes[meth[k]](temroute.url,this.controlMap[i][j])
						}
					}
				}
			}
		}
	}	
}
module.exports = Koas;
//let s = new Koas();