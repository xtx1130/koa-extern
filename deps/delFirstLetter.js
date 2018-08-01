'use strict'

exports = module.exports = uri => uri.split('')[0] === '/' ? uri.split('').fill('', 0, 1).join('') : uri
