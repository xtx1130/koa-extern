'use strict';

module.exports = uri => {
	let arr = uri.split('');
	let last = arr.length-1;
	return arr[last]!='/'? arr.concat(['/']).join(''):uri;
}