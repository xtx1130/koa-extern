module.exports = {
	baseRouter:'/list',
	test1:{
		url:'/:id',
		method:'get,post',
		success:(ctx,next)=>{}
	},
	test2:{
		url:'/xtx',
		method:'get',
		success:(ctx,next)=>{}
	}
}