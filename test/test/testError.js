'use strict';

const rq = require('request-promise');
const err = require('../../app/middleware/koas_error');
const Koas = require('../..');

let app = new Koas();

app.use(async(ctx, next) => {
	throw new Error('error test');
	await next();
})
describe('koas server error test',() => {
	let server = app.listen('8012');
	it('if 8012 port request error',async () => {
		expect.assertions(1);
		try{
			await rq({
				uri:'http://localhost:8012',
				resolveWithFullResponse: true
			});
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