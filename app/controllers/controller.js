/*
 *@author: xietianxin@qiyi.com
 *@description: 整合projects下面的controller文件夹
*/
'use strict';

const controllerMap = Symbol.for('koas#controllerMap');

let controllerConf = require('../../koasConfig').controller;
class Controller {
	constructor(isTest){
		isTest&&controllerConf = require('../../test/koasConfig').controller;
		this[controllerMap] = {};
		for(var i in controllerConf){
			this[controllerMap][i] = controllerConf[i];
		}
	}

}