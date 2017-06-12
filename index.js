'use strict';
/*
 *@author xtx1130
 *@description 处理基础routes和基本controller绑定，抛出扩展后的koa构造函数
 */
const Koa = require('koa');
const Routes = require('./app/routes/koas-router');
const Controller = require('./app/controllers/controller');

const syncRouteController = Symbol.for('koas#syncRouteController')

class Koas extends Koa{
	constructor(){
		super();
		this.routes = new Routes();
		this.controller = new Controller();
	}
	get routesMap() {
		return this.routes.jsonMap;
	}
	get controlMap() {
		return this.controller.jsonMap;
	}
	//同步注册routes，controllers，通过key来寻找对应关系
	[syncRouteController](){
		console.log(this.routesMap)
		console.log(this.controlMap)
	}	
}
let s = new Koas();
console.dir(s[syncRouteController]())