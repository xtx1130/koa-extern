module.exports = {
	baseRouter:'/movie',
	test1:{
		url:'/:id',
		method:'get,post',
		success:(ctx,next)=>{}
	}
}