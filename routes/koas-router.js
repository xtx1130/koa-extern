'use strict';

const KoaRouter = require('koa-router');
const routerConf = require('../koasConfig').router;
const path = require('path');
const staticRoute = {};
const routes = Symbol.for('koas#routes');
for(let i in routerConf){
	staticRoute[i] = require(path.join(__dirname,'../',routerConf[i]));
}
console.log(staticRoute)
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
				if(ob[url]){
					console.log(1)
				}
			})
		}
	}
}
console.log(KoasRouter)