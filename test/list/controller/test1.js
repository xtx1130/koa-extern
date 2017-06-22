let json = require('../../json/testKoax1')
module.exports = async (ctx,next)=>{
	ctx.body=json;
	await next();
}