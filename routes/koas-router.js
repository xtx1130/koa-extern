'use strict';

const KoaRouter = require('koa-router');
const routerConf = require('../koasConfig').router;
const path = require('path');
const delFirst = require('../deps/delFirstLetter');
const addLast = require('../deps/addLastLetter');
const staticRoute = {};
const routes = Symbol.for('koas#routes');
for(let i in routerConf){
	staticRoute[i] = require(path.join(__dirname,'../',routerConf[i]));
}
class KoasRouter extends KoaRouter{
	constructor(){
		super();
		this[routes] = staticRoute;
	}
	trueUri() {
		let [tem,temBase] = [{},'/'];
		for(let i in this[routes]){
			this[routes][i].baseRouter&&(temBase = this[routes][i].baseRouter);
			Object.values(this[routes][i]).forEach(ob => {
				if(ob['url']){
					ob['url'] = addLast(temBase)+delFirst(ob['url'])
				}
			})
		}
		return this[routes];
	}
}
let s = new KoasRouter();
console.log(s.trueUri())