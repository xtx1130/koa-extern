'use strict';
/*
 *@decription 公共数据统一管理
 *@author xtx1130
 *@memo 每一个koax实例会相应的维护一套数据
*/

const rp = require('request-promise');
//const tough = require('tough-cookie');
const assert = require('assert');
const isEmptyObj = require('../../deps/isEmptyObj');

class koax {
	constructor(){
		this.data = {};
		this.nameCache = void 0;
		this.dataCache = {};
	}
	//设置cookie 不做了，cookie独立出来一个类，也可以加到request中
	// setCookie(){
	// 	return this;
	// }
	//设置数据的key
	setName(name){
		assert(!this.data[name],'this name has been declared.');
		this.data[name]={};
		this.nameCache = name;
		return this;
	}
	/*
	 *@description request请求接口，这里数据挂载到data视图上，
		async为以后多请求做准备
		name 可不加，链式调用的时候name做缓存，取最近声明的name
	*/
	async request(options,name){
		let tplName = name||this.nameCache;
		assert(tplName,'no name has been declared.');
		if (this.dataCache[tplName] && !isEmptyObj(this.data[tplName])) {
			return this;
		}
		try {
			let res = await rp(options);
			this.data[tplName] = res;
		} catch (e) {
			throw e;
		}
		return this;
	}
	cached(name){
		let tplName = name||this.nameCache;
		this.dataCache[tplName] = true;
		return this;
	}
	//返回供koas调用的中间件，这里data挂在到ctx上
	middleware(){
		let _this = this;
		let dispatch = async (ctx,next) => {
			ctx.koax = ctx.koax||{};
			let copy = Object.assign(ctx.koax,_this.data);
			await next();
		}
		return dispatch;
	}
}
exports = module.exports = koax;