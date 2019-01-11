'use strict'

module.exports = binarySearch

/**
 * @function binarySearch
 * @description finding integers in a sorted array
 * @example - binarySearch(array, elem)
 * @param {object} array - target array
 * @param {number} elem - target elem
 * @param {object} marker - object with min and max search range params (non required)
 * @returns {number|null} - index of the equal value (if it exists) or null
 * */

function binarySearch (array, elem, marker = {}) {
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
    return null
  }

  if (elem > right) {
    marker.min = marker.max
    marker.max += Math.ceil(diff / 2)
    return binarySearch(array, elem, marker)
  }

  if (elem < left) {
    if (marker.min === 0) { return null }
    marker.max = marker.min
    marker.min -= Math.floor(diff / 2)
    return binarySearch(array, elem, marker)
  }

  marker.max -= Math.ceil(diff / 2)
  return binarySearch(array, elem, marker)
}
