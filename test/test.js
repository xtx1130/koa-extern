'use strict';

// require("babel-core/register");
// require("babel-polyfill");

const rq = require('request-promise');
const asyncMiddleware = require('../deps/asyncMiddleware');
const isAsync = require('../deps/isAsyncFunc');
const err = require('../app/middleware/koas_error');

let tests = {};
let routesTest = require('../app/routes/koas-router');
let controllerTest = require('../app/controllers/controller');
let Koas = require('../index');
//koas-router 测试

let koasRoutes = new routesTest(true);
koasRoutes.map = 1; //对set map()进行测试
koasRoutes.jsonMap = 1; //对set jsonMap()进行测试
test('koasRoutes.map must be an Array', () => {
	expect(Array.isArray(koasRoutes.map)).toBe(true)
});
test('koasRoutes.jsonMap must be an Object', () => {
	expect(typeof koasRoutes.jsonMap === 'object').toBe(true);
});
let testMapDel = () => {
	for (let i = 0; i < koasRoutes.map.length; i++) {
		if (koasRoutes.map[i] == '')
			return true
	}
	return false;
}
test('one of the koa router has been deleted',() => {
	koasRoutes.deleteRouter('list', 'listtest1');
	//console.log(koasRoutes.map) //测试的时候看结构用
	expect(koasRoutes.jsonMap.list.listtest1.status == 0).toBe(true)
});
test('deleteRouter is ok',()=>{
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
//koas controller 测试

let koasController = new controllerTest(true);
test('koasController.map must be an Object', () => {
	koasController.jsonMap = 1; //对set jsonMap()进行测试
	expect(typeof koasController.jsonMap).toBe('object')
});
//console.log(koasController.jsonMap);
test('slot must return a function or async function', ()=>{
	let koasSlot = koasController.slot('movie', 'movietest1')
	expect(typeof koasSlot).toBe('function');
});
//koas 测试
/*let app = new Koas(true);
app.use(async(ctx, next) => {
	throw new Error('wtf')
	await next();
})
let server = app.listen('8011');
if (process.env.NODE_ENV === 'travis') {
	server.close(error => {
		testing.check(error, 'Could not stop server', callback);
	});
}*/