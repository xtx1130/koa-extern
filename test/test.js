'use strict';

const testing = require('testing');
module.exports.test = callback => {
	let tests = {};
	let routesTest = require('../routes/koas-router');
	tests.routes = callback =>{
		let koasRoutes = new routesTest(true);
		testing.verify(Array.isArray(koasRoutes.map),'koasRoutes.map must be an array',callback);
		testing.verify(typeof koasRoutes.jsonMap === 'object','koasRoutes.trueUri() must be a Object',callback);
		console.log(koasRoutes.jsonMap,koasRoutes.map)
		koasRoutes.deleteRouter('list','test1')
		//testing.verify(koasRoutes.trueUri()['test1'] === null,'koasRoutes.trueUri() must be a Object',callback);
		testing.success(callback);
	}
	testing.run(tests, 1000, callback);
}
exports.test(testing.show);