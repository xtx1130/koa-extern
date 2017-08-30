'use strict';
const Koas = require('../..');

let app = new Koas();

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
		//console.log(koasRoutes.map) //测试的时候看结构用
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