module.exports = async (ctx,next)=>{
	ctx.body='listtest2';
	await next();
}