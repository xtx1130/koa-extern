'use strict';
const asyncMiddleware = require('../../deps/asyncMiddleware');
const isAsyncFunc = require('../../deps/isAsyncFunc');

describe('establish async middleware',() => {
	let normalFunc = (...args)=>{};
	test('normalFunc should return AsyncFunction',() => {
		expect(isAsyncFunc(asyncMiddleware(normalFunc))).toBe(true);
	});
});	