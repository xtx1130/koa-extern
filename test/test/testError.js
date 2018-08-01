'use strict'

const rq = require('request-promise')
const asyncMiddleware = require('../../deps/asyncMiddleware')
const Koas = require('../..')

let server
let requestAction = (contentType,port) => {
  return rq({
    uri:'http://localhost:'+port,
    resolveWithFullResponse: true,
    headers: {
      'Content-Type': contentType
    }
  })
}

describe('koas server error test 500',() => {
	let app = new Koas();
	app.use(async (ctx, next) => {
		var err = new Error('error test')
		err.code = '500'
		ctx.type = ctx.request.type
		throw err
		await next()
	})
	let server = app.listen('8012')
	it('if 8012 port request 500 error',async () => {
		expect.assertions(4)
		try{
			await requestAction('text/plain','8012')
		}catch(e){
			expect(e.statusCode).toEqual(500)
		}
		try{
			await requestAction('text/html','8012')
		}catch(e){
			expect(e.statusCode).toEqual(500)
		}
		try{
			await requestAction('application/json','8012')
		}catch(e){
			expect(e.statusCode).toEqual(500)
		}
		let serverClose = await new Promise((resolve, reject) => {
			server.close(err => err ? reject(err) : resolve())
		})
		expect(serverClose).toBe(undefined)
	})
})
describe('koas server error test 404',() => {
	let app = new Koas()
	app.use(async (ctx, next) => {
		ctx.status = 404
		await next()
	});
	let server = app.listen('8013')
	it('if 8013 port request 404 error',async () => {
		expect.assertions(3)
		try{
			await requestAction('application/json','8013')
		}catch(e){
			expect(e.statusCode).toEqual(404)
		}
		try{
			await requestAction('text/plain','8013')
		}catch(e){
			//console.log(e)
			expect(e.statusCode).toEqual(404)
		}
		let serverClose = await new Promise((resolve, reject) => {
			server.close(err => err ? reject(err) : resolve())
		})
		expect(serverClose).toBe(undefined)
	})
})