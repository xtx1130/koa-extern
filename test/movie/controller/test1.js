module.exports = async (ctx,next)=>{
	ctx.body='movietest1';
	await next();
}