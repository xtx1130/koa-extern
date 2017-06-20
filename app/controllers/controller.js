/*
 *@author: xtx1130
 *@description: 整合projects下面的controller文件夹
 */
'use strict';

const path = require('path');
const assert = require('assert');

const controllerMap = Symbol.for('koas#controllerMap');

let controllerConf = require(path.join(process.cwd(), '/koasConfig')).controller;
class Controller {
	constructor(isTest) {
		isTest && (controllerConf = require('../../test/koasConfig').controller);
		this[controllerMap] = {};
		for (var i in controllerConf) {
			this[controllerMap][i] = require(path.join(process.cwd(), controllerConf[i]));
		}
	}
	get jsonMap() {
			return this[controllerMap]
		}
		//map can't change by =
	set jsonMap(val) {
			return this[controllerMap]
		}
		//返回中间件函数，通过router.use让用户可以自由插入到想插入的位置
	slot(block, name) {
		assert(this[controllerMap][block] != null, 'This block is not exists');
		assert((typeof this[controllerMap][block][name]).match('function'), 'This router is not exists or not a function');
		return this[controllerMap][block][name];
	}
}
module.exports = Controller;