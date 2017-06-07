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
}
console.log(KoasRouter)