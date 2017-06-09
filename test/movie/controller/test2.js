module.exports = async (ctx,next){
	console.log('test2');
	await next;
}