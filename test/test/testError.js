'use strict';

const rq = require('request-promise');
const asyncMiddleware = require('../../deps/asyncMiddleware');
const Koas = require('../..');

let requestAction = (contentType,port) => {
	return rq({
		uri:'http://localhost:'+port,
		resolveWithFullResponse: true,
		headers: {
   			'Content-Type': contentType
    	}
	});
}
describe('koas server error test 500',() => {
	let app = new Koas();
	app.use(async (ctx, next) => {
		var err = new Error('error test');
		err.code = '500 inter error';
		throw err;
		await next();
	});
	let server = app.listen('8012');
	it('if 8012 port request 500 error',async () => {
		expect.assertions(2);
		try{
			await requestAction('text/html','8012')
		}catch(e){
			expect(e.statusCode).toEqual(500);
		}
		try{
			await requestAction('application/json','8012')
		}catch(e){
			expect(e.statusCode).toEqual(500);
		}
		server.close(error => {
			test('Could not stop server',() => {
				expect(error).toBe('')
			});
		});
	});
});
describe('koas server error test 404',() => {
	let app = new Koas();
	app.use(async (ctx, next) => {
		ctx.status = 404;
		await next();
	});
	let server = app.listen('8013');
	it('if 8013 port request 404 error',async () => {
		expect.assertions(2);
		try{
			await requestAction('text/html','8013')
		}catch(e){
			//console.log(e)
			expect(e.statusCode).toEqual(404);
		}
		try{
			await requestAction('application/json','8013')
		}catch(e){
			expect(e.statusCode).toEqual(404);
		}
		server.close(error => {
			test('Could not stop server',() => {
				expect(error).toBe('')
			});
		});
	});
});