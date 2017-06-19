module.exports = {
	movietest1:require('./test1'),
	movietest2:require('./test2'),
	index:async (ctx,next)=>{
		ctx.body = 'index'
		await next();
	}
}