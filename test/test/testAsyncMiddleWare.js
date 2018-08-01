'use strict'

const asyncMiddleware = require('../../deps/asyncMiddleware')
const isAsyncFunc = require('../../deps/isAsyncFunc')

describe('establish async middleware',() => {
  let normalFunc = (...args) => {}
  test('normalFunc should return AsyncFunction',() => {
    //https://github.com/caolan/async can't support function named AsyncFunction
    expect(isAsyncFunc(asyncMiddleware(normalFunc))).toBe(false)
  })
})
