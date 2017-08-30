'use strict';

const rq = require('request-promise');
const asyncMiddleware = require('../../deps/asyncMiddleware');
const isAsync = require('../../deps/isAsyncFunc');
const err = require('../../app/middleware/koas_error');
const Koas = require('../..');

let app = new Koas();
//koas-router 测试
describe('koas-router tester',() => {
	let koasRoutes = app.koasroutes;
	koasRoutes.map = 1; //对set map()进行测试
	koasRoutes.jsonMap = 1; //对set jsonMap()进行测试
	test('koasRoutes.map must be an Array', () => {
		expect(Array.isArray(koasRoutes.map)).toBe(true)
	});
	test('koasRoutes.jsonMap must be an Object', () => {
		expect(typeof koasRoutes.jsonMap === 'object').toBe(true);
	});
	test('one of the koa router has been deleted',() => {
		koasRoutes.deleteRouter('list', 'listtest1');
		console.log(koasRoutes.map) //测试的时候看结构用
		expect(koasRoutes.jsonMap.list.listtest1.status == 0).toBe(true)
	});
	test('deleteRouter is ok',()=>{
		let testMapDel = () => {
			for (let i = 0; i < koasRoutes.map.length; i++) {
				if (koasRoutes.map[i] == '')
					return true
			}
			return false;
		}
		expect(testMapDel()).toBe(true);
	});
	let testMapAdd = () => {
		for (let i = 0; i < koasRoutes.map.length; i++) {
			if (koasRoutes.map[i] == '')
				return false
		}
		return true;
	}
	test('addRouter is ok ,router has been added', () => {
		koasRoutes.addRouter('list', 'listtest1');
		expect(koasRoutes.jsonMap.list.listtest1.status).toBe(1)
	});
	test('add function has been finished', () => {
		expect(testMapAdd()).toBe(true)
	});
});
//koas controller 测试
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
//koas 测试
// app.use(async(ctx, next) => {
// 	throw new Error('wtf')
// 	await next();
// })
describe('koas server tester',() => {
	let server = app.listen('8011');
	if (process.env.NODE_ENV === 'travis') {
		server.close(error => {
			test('Could not stop server',() => {
				expect(error).toBe('')
			});
		});
	}
});