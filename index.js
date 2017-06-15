'use strict';
/*
 *@author xtx1130
 *@description 处理基础routes和基本controller绑定，抛出扩展后的koa构造函数
 */
const Koa = require('koa');
const Routes = require('./app/routes/koas-router');
const Controller = require('./app/controllers/controller');
const Assert = require('assert');

const syncRouteController = Symbol.for('koas#syncRouteController')

class Koas extends Koa{
	constructor(){
		super();
		this.koasroutes = new Routes();
		this.controller = new Controller();
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
	use(fn) {
		if (Object.prototype.toString.call(fn) !== '[object AsyncFunction]') 
			throw new TypeError('middleware must be a AsyncFunction!');
		this.middleware.push(fn);
		return this;
	}
	//同步注册routes，controllers，通过key来寻找对应关系
	[syncRouteController](){
		for(let i in this.routesMap){
			for(let j in this.routesMap[i]){
				if(j === 'baseRouter'){
					//TO DO: 一级路由的controller绑定还未做
					console.log('todo index');
				}else{
					let temroute = this.routesMap[i][j]; 
					let meth = temroute.method.split(',')||['get','post'];
					if(temroute.status === 1){
						for(let k = 0;k<meth.length;k++){
							Assert(this.koasroutes.methods.join('').match(meth[k].toUpperCase()),'only support HEAD,OPTIONS,GET,PUT,PATCH,POST,DELETE')
							this.koasroutes[meth[k]](temroute.url,this.controlMap[i][j])
						}
					}
				}
			}
		}
		//console.dir(this.koasroutes.routes().router.stack)
	}	
}
module.exports = Koas;
//let s = new Koas();