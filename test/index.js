'use strict'

const binarySearch = require('../lib/binarySearch')
const RangeSearch = require('../lib/rangeSearch')
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

describe('RangeSearch()', function () {

  const from = [1, 444, 1998]
  const to = [34, 800, 2003]
  const data = [
    { val: 0, result: false },
    { val: 1, result: true },
    { val: 34, result: true },
    { val: 444, result: true },
    { val: 800, result: true },
    { val: 1998, result: true },
    { val: 2003, result: true },
    { val: -1, result: false },
    { val: 35, result: false },
    { val: 443, result: false },
    { val: 881, result: false },
    { val: 1997, result: false },
    { val: 2004, result: false }
  ]

  const rs = new RangeSearch(from, to)
  for (const { val, result } of data) {
    it(`should return ${ result }`, async function () {
      Assert.equal(result, await rs.belongs(val))
    })
  }
})
