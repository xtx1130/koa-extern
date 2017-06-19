'use strict';
module.exports = func => {
	return Object.prototype.toString.call(func) === '[object AsyncFunction]'
}