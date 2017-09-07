'use strict';
const isEmptyObject = require('../../deps/isEmptyObj');

describe('isEmptyObj is ok',() => {
	let emptyObj = {};
	let notEmptyObj = {test:true};
	test('emptyObj should return true',() => {
		expect(isEmptyObject(emptyObj)).toBe(true);
	});
	test('notEmptyObj should return false',() => {
		expect(isEmptyObject(notEmptyObj)).toBe(false);
	});
});	