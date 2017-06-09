module.exports = {
	baseRouter:'/movie',
	movietest1:{
		url:'/:id',
		method:'get,post',
		success:(ctx,next)=>{}
	},
	movietest2:{
		url:'/xtx',
		method:'get',
		success:(ctx,next)=>{}
	}
}