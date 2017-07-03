'use strict';

const errOptions = {
	msg:void 0,
	code:500
}
let errFunc = async (ctx, next)=>{
	try{
		await next();
		if(ctx.response.status == 404)
			ctx.throw(404,'Page not find');
	}catch(e){
		ctx.status = typeof e.status === 'number' ? e.status : 500;
		let htmlString = '<html>'+
					'<title>Sorry,but there has an error Occured</title>'+
					'<head>there has an error Occured</head>'+
					'<body>'+
						'<p style="font-weight:bold;font-size:18px">error code</p>'+
						'<p>'+(e.code||'No error code')+'</p>'+
						'<p style="font-weight:bold;font-size:18px">error stack</p>'+
						'<p>'+e.stack+'</p>'+
						'<p style="font-weight:bold;font-size:18px">error messgae</p>'+
						'<p>'+e.message+'</p>'
					'</body>'+
					'</html>';
		let type = ctx.accepts(['html','text','json']);
		console.log(type,ctx.request.header)
		switch(type){
			case 'html':
				ctx.type = 'text/html';
				ctx.body = htmlString;
				break;
			case 'text':
				ctx.type = 'text/plain';
				ctx.body = e.stack;
				break;
			case 'json':
				ctx.type = 'application/json';
				ctx.body = JSON.Stringify(e);
		}
	}
}
exports = module.exports = errFunc