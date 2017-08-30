'use strict';

const rq = require('request-promise');
const asyncMiddleware = require('../../deps/asyncMiddleware');
const Koas = require('../..');

let app = new Koas();
let requestAction = contentType => {
	return rq({
		uri:'http://localhost:8012',
		resolveWithFullResponse: true,
		headers: {
   			'Content-Type': contentType
    	}
	});
}
app.use(async(ctx, next) => {
	throw new Error('error test');
	await next();
})
describe('koas server error test',() => {
	let server = app.listen('8012');
	it('if 8012 port request error',async () => {
		expect.assertions(2);
		try{
			await requestAction('text/html')
		}catch(e){
			expect(e.statusCode).toEqual(500);
		}
		try{
			await requestAction('application/json')
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