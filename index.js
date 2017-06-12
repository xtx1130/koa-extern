'use strict';
/*
 *@author xtx1130
 *@description 处理基础routes和基本controller绑定，抛出扩展后的koa构造函数
 */
const Koa = require('koa');
const Routes = require('app/routes/koas-router');
const Controller = require('app/controllers/controller');
class Koas extends Koa{
	constructor(){
		super();
		this.routes = new Routes();
		this.controller = new Controller();
	}
}