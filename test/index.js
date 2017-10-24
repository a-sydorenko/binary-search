'use strict'

const binarySearch = require('../index')
const Assert = require('assert')
const arr = [1, 3, 5, 7, 9, 11, 33, 77]
const bad = [0, 2, 4, 6, 8, 14, 256]

describe('binarySearch()', function () {

  for (let i = 0; i < bad.length; i++) {
    it('should return null', function () {
      Assert.equal(null, binarySearch(arr, bad[i]))
    })
  }

  for (let i = 0; i < arr.length; i++) {
    it('should return index', function () {
      Assert.equal(arr.indexOf(arr[i]), binarySearch(arr, arr[i]))
    })
  }
})
