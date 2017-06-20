'use strict';

module.exports = uri => {
	let arr = uri.split('');
	let last = arr.length - 1;
	arr[last] != '/' && (arr = arr.concat(['/']));
	arr[0] != '/' && arr.unshift('/');
	return arr.join('');
}