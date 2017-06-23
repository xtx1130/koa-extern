module.exports = {
	baseRouter:'/list',
	listtest1:{
		url:'/:id',
		method:'get,post',
		success:(ctx,next)=>{}
	},
	listtest2:{
		url:'xtx/',
		method:'get',
		success:(ctx,next)=>{}
	}
}