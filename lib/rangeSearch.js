'use strict'

class RangeSearch {

  constructor (from, to) {
    if (!(from instanceof Array && to instanceof Array) || from.length !== to.length) {
      throw new Error('Invalid arguments!')
    }
    this.from = new Uint32Array(from)
    this.to = new Uint32Array(to)
    this.lowest = this.from[0]
    this.biggest = this.to[this.to.length - 1]
  }

  static invalid (int) {
    return int < 0 || int < this.lowest || int > this.biggest
  }

  /**
   * @method belongs
   * @param {number} int
   * @returns {boolean}
   * */

  async belongs (int) {
    if (RangeSearch.invalid(int)) { return false }
    const index = await findLowerIndex(this.from, int)
    return this.from[index] <= int && int <= this.to[index]
  }
}

module.exports = RangeSearch

async function findLowerIndex (array, elem, marker = {}) {
  marker.min = marker.min || 0
  marker.max = marker.max || Math.ceil(array.length / 2)

  const left = array[marker.min]
  const right = array[marker.max]
  const diff = marker.max - marker.min

  if (elem === right) {
    return marker.max
  }

  if (elem === left) {
    return marker.min
  }

  if (diff === 1) {
    return elem >= right ? marker.max : marker.min
  }

  if (elem > right) {
    marker.min = marker.max
    marker.max += Math.ceil(diff / 2)
    return await findLowerIndex(array, elem, marker)
  }

  if (elem < left) {
    if (marker.min === 0) {
      return marker.min
    }
    marker.max = marker.min
    marker.min -= Math.floor(diff / 2)
    return await findLowerIndex(array, elem, marker)
  }

  marker.max -= Math.ceil(diff / 2)
  return await findLowerIndex(array, elem, marker)
}
