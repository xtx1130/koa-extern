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
	}
	trueUri() {
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
		return this[routes];
	}
	deleteRouter(router) {
		assert(this[routes][router]!=null,'This router is not exists');
		[this[memoryRoutes][router],this[routes][router]] = [this[routes][router],null]
	}
	addRouter(router) {
		assert(this[memoryRoutes][router]!=null,'This router is not exists');
		this[routes][router] = this[memoryRoutes][router];
	}
	get map() {
		return this[routesMap];
	}
}
module.exports = KoasRouter;