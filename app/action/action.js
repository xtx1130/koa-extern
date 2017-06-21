'use strict';
/*
 *@decription 公共数据统一管理
 *@author xtx1130
*/

const rp = require('request-promise');
//const tough = require('tough-cookie');
const assert = require('assert');

class koax {
	constructor(){
		this.data = {};
		this.cookies = {};
	}
	//设置cookie 不做了，cookie独立出来一个类，也可以加到request中
	// setCookie(){
	// 	return this;
	// }
	//设置数据的key
	setName(name){
		assert(this.data[name],'this name has been declared');
		this.data[name]={};
		return this;
	}
	//request请求接口，这里只做数据请求，async为以后多请求做准备
	//数据挂载让中间件做
	async request(options){
		return this;
	}
	//返回供koas调用的中间件，在这里对接口数据做ctx挂载
	middleware(){

	}
}
exports = module.exports = {};