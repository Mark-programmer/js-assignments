'use strict';

/*********************************************************************************************
 *                                                                                           *
 * Plese read the following tutorial before implementing tasks:                              *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array    *
 *                                                                                           *
 * NOTE : Please do not use loops! All tasks can be implmeneted using standard Array methods *
 *                                                                                           *
 *********************************************************************************************/

/**
 * Returns an index of the specified element in array or -1 if element is not found.
 */
function findElement(arr, value) {
   return arr.indexOf(value);
}

/**
 * Generates an array of odd numbers of the specified length.
 */
function generateOdds(len) {
   return Array.from(
       { length: len },
       (_, index) => index * 2 + 1
   );
}

/**
 * Returns the doubled array.
 */
function doubleArray(arr) {
   return arr.concat(arr);
}

/**
 * Returns an array of positive numbers.
 */
function getArrayOfPositives(arr) {
   return arr.filter(
       item => typeof item === 'number' && item > 0
   );
}

/**
 * Returns an array containing strings only.
 */
function getArrayOfStrings(arr) {
   return arr.filter(
       item => typeof item === 'string'
   );
}

/**
 * Removes falsy values from the specified array.
 */
function removeFalsyValues(arr) {
   return arr.filter(Boolean);
}

/**
 * Returns an array of uppercase strings.
 */
function getUpperCaseStrings(arr) {
   return arr.map(
       item => item.toUpperCase()
   );
}

/**
 * Returns an array of string lengths.
 */
function getStringsLength(arr) {
   return arr.map(
       item => item.length
   );
}

/**
 * Inserts an item into the specified array at the specified index.
 */
function insertItem(arr, item, index) {
   arr.splice(index, 0, item);
}

/**
 * Returns the first n items of the specified array.
 */
function getHead(arr, n) {
   return arr.slice(0, n);
}

/**
 * Returns the last n items of the specified array.
 */
function getTail(arr, n) {
   return n === 0 ? [] : arr.slice(-n);
}

/**
 * Returns CSV representation of a two-dimensional array.
 */
function toCsvText(arr) {
   return arr
       .map(row => row.join(','))
       .join('\n');
}

/**
 * Returns an array of squares.
 */
function toArrayOfSquares(arr) {
   return arr.map(
       item => item * item
   );
}

/**
 * Returns an array of moving sums.
 */
function getMovingSum(arr) {
   return arr.reduce(
       (result, item) => {
          const previousSum =
              result.length === 0
                  ? 0
                  : result[result.length - 1];

          return result.concat(previousSum + item);
       },
       []
   );
}

/**
 * Returns every second item from the specified array.
 */
function getSecondItems(arr) {
   return arr.filter(
       (_, index) => index % 2 === 1
   );
}

/**
 * Propagates every item its position times.
 */
function propagateItemsByPositionIndex(arr) {
   return arr.reduce(
       (result, item, index) =>
           result.concat(
               Array(index + 1).fill(item)
           ),
       []
   );
}

/**
 * Returns the three largest numbers from the specified array.
 */
function get3TopItems(arr) {
   return arr
       .slice()
       .sort((first, second) => second - first)
       .slice(0, 3);
}

/**
 * Returns the number of positive numeric values.
 */
function getPositivesCount(arr) {
   return arr.filter(
       item => typeof item === 'number' && item > 0
   ).length;
}

/**
 * Sorts digit names by their numeric value.
 */
function sortDigitNamesByNumericOrder(arr) {
   const digitNames = [
      'zero',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine'
   ];

   return arr.sort(
       (first, second) =>
           digitNames.indexOf(first) -
           digitNames.indexOf(second)
   );
}

/**
 * Returns the sum of all items.
 */
function getItemsSum(arr) {
   return arr.reduce(
       (sum, item) => sum + item,
       0
   );
}

/**
 * Returns the number of falsy values.
 */
function getFalsyValuesCount(arr) {
   return arr.filter(
       item => !item
   ).length;
}

/**
 * Returns the number of occurrences of the specified item.
 */
function findAllOccurences(arr, item) {
   return arr.filter(
       value => value === item
   ).length;
}

/**
 * Concatenates all elements into a single string with "," delimiter.
 */
function toStringList(arr) {
   return arr.join(',');
}

/**
 * Sorts cities by country and then by city.
 */
function sortCitiesArray(arr) {
   return arr.sort(
       (first, second) => {
          if (first.country < second.country) {
             return -1;
          }

          if (first.country > second.country) {
             return 1;
          }

          if (first.city < second.city) {
             return -1;
          }

          if (first.city > second.city) {
             return 1;
          }

          return 0;
       }
   );
}

/**
 * Creates an identity matrix of the specified size.
 */
function getIdentityMatrix(n) {
   return Array.from(
       { length: n },
       (_, rowIndex) =>
           Array.from(
               { length: n },
               (_, columnIndex) =>
                   rowIndex === columnIndex ? 1 : 0
           )
   );
}

/**
 * Creates an array of integers from start to end inclusive.
 */
function getIntervalArray(start, end) {
   const step = start <= end ? 1 : -1;
   const length = Math.abs(end - start) + 1;

   return Array.from(
       { length: length },
       (_, index) => start + index * step
   );
}

/**
 * Returns an array containing only unique values.
 */
function distinct(arr) {
   return Array.from(new Set(arr));
}

/**
 * Groups elements of an array by key.
 */
function group(array, keySelector, valueSelector) {
   return array.reduce(
       (result, item) => {
          const key = keySelector(item);
          const value = valueSelector(item);
          const values = result.get(key) || [];

          values.push(value);
          result.set(key, values);

          return result;
       },
       new Map()
   );
}

/**
 * Projects each element to a sequence and flattens the result.
 */
function selectMany(arr, childrenSelector) {
   return arr.reduce(
       (result, item) =>
           result.concat(childrenSelector(item)),
       []
   );
}

/**
 * Returns an element from a multidimensional array by indexes.
 */
function getElementByIndexes(arr, indexes) {
   return indexes.reduce(
       (result, index) => result[index],
       arr
   );
}

/**
 * Swaps the head and tail of the specified array.
 */
function swapHeadAndTail(arr) {
   const headEnd = Math.floor(arr.length / 2);
   const tailStart = Math.ceil(arr.length / 2);

   const head = arr.slice(0, headEnd);
   const middle = arr.slice(headEnd, tailStart);
   const tail = arr.slice(tailStart);

   return tail.concat(middle, head);
}

module.exports = {
   findElement: findElement,
   generateOdds: generateOdds,
   doubleArray: doubleArray,
   getArrayOfPositives: getArrayOfPositives,
   getArrayOfStrings: getArrayOfStrings,
   removeFalsyValues: removeFalsyValues,
   getUpperCaseStrings: getUpperCaseStrings,
   getStringsLength: getStringsLength,
   insertItem: insertItem,
   getHead: getHead,
   getTail: getTail,
   toCsvText: toCsvText,
   toStringList: toStringList,
   toArrayOfSquares: toArrayOfSquares,
   getMovingSum: getMovingSum,
   getSecondItems: getSecondItems,
   propagateItemsByPositionIndex: propagateItemsByPositionIndex,
   get3TopItems: get3TopItems,
   getPositivesCount: getPositivesCount,
   sortDigitNamesByNumericOrder: sortDigitNamesByNumericOrder,
   getItemsSum: getItemsSum,
   getFalsyValuesCount: getFalsyValuesCount,
   findAllOccurences: findAllOccurences,
   sortCitiesArray: sortCitiesArray,
   getIdentityMatrix: getIdentityMatrix,
   getIntervalArray: getIntervalArray,
   distinct: distinct,
   group: group,
   selectMany: selectMany,
   getElementByIndexes: getElementByIndexes,
   swapHeadAndTail: swapHeadAndTail
};
