'use strict';

const isAsync = require('./isAsyncFunc');

let createAsync = async (next)=>{
	return await next();
}

exports = module.exports = (func) => {
	let dispatch = async (ctx,next) => {
		!isAsync(func) && func.call(this,ctx,next);
	}
	return dispatch;
}