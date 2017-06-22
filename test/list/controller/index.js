module.exports = {
	listtest1:require('./test1'),
	listtest2:require('./test2'),
	index:async (ctx,next)=>{
		ctx.body = ctx.koax;
		ctx.status =200;
		await next();
	}
}