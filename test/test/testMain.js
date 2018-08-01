'use strict'

const rq = require('request-promise')
const asyncMiddleware = require('../../deps/asyncMiddleware')
const isAsync = require('../../deps/isAsyncFunc')
const err = require('../../app/middleware/koas_error')
const Koas = require('../..')

let app = new Koas()

describe('koas server tester',() => {
	let server = app.listen('8011')
	it('if 8011 port is startup or not', async () => {
		expect.assertions(1)
		let data = await rq({
			uri:'http://localhost:8011/movie/xtx',
			resolveWithFullResponse: true
		})
		expect(data.statusCode).toEqual(200)
		server.close(error => {
			test('Could not stop server', () => {
				expect(error).toBe('')
			})
		})
	})
})