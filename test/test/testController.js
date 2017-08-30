'use strict';
const Koas = require('../..');

let app = new Koas();

describe('koas controller tester',() => {
	let koasController = app.controller;
	test('koasController.map must be an Object', () => {
		koasController.jsonMap = 1; //对set jsonMap()进行测试
		expect(typeof koasController.jsonMap).toBe('object')
	});
	//console.log(koasController.jsonMap);
	test('slot must return a function or async function', ()=>{
		let koasSlot = koasController.slot('movie', 'movietest1')
		expect(typeof koasSlot).toBe('function');
	});
});