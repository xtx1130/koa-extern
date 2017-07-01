module.exports = async (ctx,next)=>{
	ctx.body='movietest2';
	await next();
}