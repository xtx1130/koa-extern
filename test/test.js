'use strict';

const testing = require('testing');
module.exports.test = callback => {
	let tests = {};
	let routesTest = require('../app/routes/koas-router');
	let controllerTest = require('../app/controllers/controller');
	//koas-router 测试
	tests.routes = callback =>{
		let koasRoutes = new routesTest(true);
		koasRoutes.map = 1;//对set map()进行测试
		koasRoutes.jsonMap = 1;//对set jsonMap()进行测试
		testing.verify(Array.isArray(koasRoutes.map),'koasRoutes.map must be an array',callback);
		testing.verify(typeof koasRoutes.jsonMap === 'object','koasRoutes.trueUri() must be a Object',callback);
		console.log(koasRoutes.jsonMap,koasRoutes.map)//测试的时候看结构用
		koasRoutes.deleteRouter('list','listtest1');
		let testMapDel = () => {
			for(let i = 0;i < koasRoutes.map.length;i++){
				if(koasRoutes.map[i] =='')
					return true
			}
			return false;
		}
		testing.verify(testMapDel(),'delete failed ,please check deleteRouter',callback)
		koasRoutes.addRouter('list','listtest1');
		let testMapAdd = () => {
			for(let i = 0;i < koasRoutes.map.length;i++){
				if(koasRoutes.map[i] =='')
					return false
			}
			return true;
		}
		testing.verify(testMapAdd(),'add failed ,please check addRouter',callback)
		testing.success(callback);
	}
	tests.controller = callback => {
		let koasController = new controllerTest(true);
		console.log(koasController.map);
		testing.success(callback);
	}
	testing.run(tests, 1000, callback);
}
exports.test(testing.show);