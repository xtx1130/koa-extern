'use strict';
const tough = require('tough-cookie');
const Cookie = tough.Cookie;
module.exports = {
	listtest1:require('./test1'),
	listtest2:require('./test2'),
	index:async (ctx,next)=>{
		console.log('````````````')
		ctx.body = ctx.koax;
		ctx.cookies.set('xtx','nb');
		ctx.status =200;
		await next();
	}
}