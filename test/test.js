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
});/*
testing.verify(typeof koasRoutes.jsonMap === 'object', 'koasRoutes.jsonMap must be an Object', callback);
console.log(koasRoutes.jsonMap, koasRoutes.map) //测试的时候看结构用
koasRoutes.deleteRouter('list', 'listtest1');
let testMapDel = () => {
	for (let i = 0; i < koasRoutes.map.length; i++) {
		if (koasRoutes.map[i] == '')
			return true
	}
	return false;
}
testing.verify(koasRoutes.jsonMap.list.listtest1.status == 0, 'delete failed ,please check deleteRouter', callback);
testing.verify(testMapDel(), 'delete failed ,please check deleteRouter', callback)
koasRoutes.addRouter('list', 'listtest1');
let testMapAdd = () => {
	for (let i = 0; i < koasRoutes.map.length; i++) {
		if (koasRoutes.map[i] == '')
			return false
	}
	return true;
}
testing.verify(koasRoutes.jsonMap.list.listtest1.status == 1, 'add failed ,please check addRouter', callback);
testing.verify(testMapAdd(), 'add failed ,please check addRouter', callback)
testing.success(callback);
//koas controller 测试
let koasController = new controllerTest(true);
koasController.jsonMap = 1; //对set jsonMap()进行测试
testing.verify(typeof koasController.jsonMap === 'object', 'koasController.map must be an Object', callback)
console.log(koasController.jsonMap);
let koasSlot = koasController.slot('movie', 'movietest1')
testing.verify((typeof koasSlot).match('function'), 'slot must return a function or async function', callback)
testing.success(callback);
//koas 测试
let app = new Koas(true);
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