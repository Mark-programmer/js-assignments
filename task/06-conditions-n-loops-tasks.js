'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration              *
 *                                                                                                *
 **************************************************************************************************/


/**
 * Returns 'Fizz', 'Buzz', 'FizzBuzz' or the original number.
 *
 * @param {number} num
 * @return {any}
 */
function getFizzBuzz(num) {
    if (num % 15 === 0) {
        return 'FizzBuzz';
    }

    if (num % 3 === 0) {
        return 'Fizz';
    }

    if (num % 5 === 0) {
        return 'Buzz';
    }

    return num;
}


/**
 * Returns the factorial of the specified integer.
 *
 * @param {number} n
 * @return {number}
 */
function getFactorial(n) {
    let result = 1;

    for (let value = 2; value <= n; value++) {
        result *= value;
    }

    return result;
}


/**
 * Returns the sum of integer numbers between n1 and n2 inclusive.
 *
 * @param {number} n1
 * @param {number} n2
 * @return {number}
 */
function getSumBetweenNumbers(n1, n2) {
    const start = Math.min(n1, n2);
    const end = Math.max(n1, n2);

    let result = 0;

    for (let value = start; value <= end; value++) {
        result += value;
    }

    return result;
}


/**
 * Returns true if a triangle can be built with the specified sides.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {boolean}
 */
function isTriangle(a, b, c) {
    return (
        a > 0 &&
        b > 0 &&
        c > 0 &&
        a + b > c &&
        a + c > b &&
        b + c > a
    );
}


/**
 * Returns true if two axis-aligned rectangles overlap.
 *
 * @param {object} rect1
 * @param {object} rect2
 * @return {boolean}
 */
function doRectanglesOverlap(rect1, rect2) {
    return (
        rect1.left < rect2.left + rect2.width &&
        rect1.left + rect1.width > rect2.left &&
        rect1.top < rect2.top + rect2.height &&
        rect1.top + rect1.height > rect2.top
    );
}


/**
 * Returns true if the point lies strictly inside the circle.
 *
 * @param {object} circle
 * @param {object} point
 * @return {boolean}
 */
function isInsideCircle(circle, point) {
    const deltaX = point.x - circle.center.x;
    const deltaY = point.y - circle.center.y;

    const distanceSquared = deltaX * deltaX + deltaY * deltaY;
    const radiusSquared = circle.radius * circle.radius;

    return distanceSquared < radiusSquared;
}


/**
 * Returns the first non-repeated character or null.
 *
 * @param {string} str
 * @return {string|null}
 */
function findFirstSingleChar(str) {
    return (
        str
            .split('')
            .find(
                char =>
                    str.indexOf(char) ===
                    str.lastIndexOf(char)
            ) || null
    );
}


/**
 * Returns the string representation of a mathematical interval.
 *
 * @param {number} a
 * @param {number} b
 * @param {boolean} isStartIncluded
 * @param {boolean} isEndIncluded
 * @return {string}
 */
function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
    const start = Math.min(a, b);
    const end = Math.max(a, b);

    const leftBracket = isStartIncluded ? '[' : '(';
    const rightBracket = isEndIncluded ? ']' : ')';

    return `${leftBracket}${start}, ${end}${rightBracket}`;
}


/**
 * Reverses the specified string.
 *
 * @param {string} str
 * @return {string}
 */
function reverseString(str) {
    return str
        .split('')
        .reverse()
        .join('');
}


/**
 * Reverses the digits of an integer.
 *
 * @param {number} num
 * @return {number}
 */
function reverseInteger(num) {
    const reversed = Number(
        String(Math.abs(num))
            .split('')
            .reverse()
            .join('')
    );

    return reversed * Math.sign(num);
}


/**
 * Validates a credit card number using the Luhn algorithm.
 *
 * @param {number} ccn
 * @return {boolean}
 */
function isCreditCardNumber(ccn) {
    const digits = String(ccn)
        .split('')
        .reverse()
        .map(Number);

    const sum = digits.reduce(
        (result, digit, index) => {
            if (index % 2 === 0) {
                return result + digit;
            }

            const doubledDigit = digit * 2;

            return (
                result +
                (doubledDigit > 9
                    ? doubledDigit - 9
                    : doubledDigit)
            );
        },
        0
    );

    return sum % 10 === 0;
}


/**
 * Returns the digital root of an integer.
 *
 * @param {number} num
 * @return {number}
 */
function getDigitalRoot(num) {
    let value = Math.abs(num);

    while (value > 9) {
        value = String(value)
            .split('')
            .reduce(
                (sum, digit) => sum + Number(digit),
                0
            );
    }

    return value;
}


/**
 * Returns true if the specified string contains balanced brackets.
 *
 * Supported brackets: [], (), {}, <>.
 *
 * @param {string} str
 * @return {boolean}
 */
function isBracketsBalanced(str) {
    const pairs = {
        ')': '(',
        ']': '[',
        '}': '{',
        '>': '<'
    };

    const stack = [];

    for (const char of str) {
        if ('([{<'.includes(char)) {
            stack.push(char);
        } else if (stack.pop() !== pairs[char]) {
            return false;
        }
    }

    return stack.length === 0;
}


/**
 * Returns a human-readable representation of the time period.
 *
 * @param {Date} startDate
 * @param {Date} endDate
 * @return {string}
 */
function timespanToHumanString(startDate, endDate) {
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const MONTH = 30 * DAY;
    const YEAR = 365 * DAY;

    const difference = Math.abs(
        endDate.getTime() - startDate.getTime()
    );

    /*
     * По условиям тестов значение ровно x.5 округляется вниз,
     * а значение больше x.5 — вверх.
     */
    const roundHalfDown = value =>
        Math.ceil(value - 0.5);

    if (difference <= 45 * SECOND) {
        return 'a few seconds ago';
    }

    if (difference <= 90 * SECOND) {
        return 'a minute ago';
    }

    if (difference <= 45 * MINUTE) {
        return (
            `${roundHalfDown(difference / MINUTE)} minutes ago`
        );
    }

    if (difference <= 90 * MINUTE) {
        return 'an hour ago';
    }

    if (difference <= 22 * HOUR) {
        return (
            `${roundHalfDown(difference / HOUR)} hours ago`
        );
    }

    if (difference <= 36 * HOUR) {
        return 'a day ago';
    }

    if (difference <= 25 * DAY) {
        return (
            `${roundHalfDown(difference / DAY)} days ago`
        );
    }

    if (difference <= 45 * DAY) {
        return 'a month ago';
    }

    if (difference <= 345 * DAY) {
        return (
            `${roundHalfDown(difference / MONTH)} months ago`
        );
    }

    if (difference <= 545 * DAY) {
        return 'a year ago';
    }

    return `${roundHalfDown(difference / YEAR)} years ago`;
}


/**
 * Returns the n-ary string representation of the specified number.
 *
 * @param {number} num
 * @param {number} n
 * @return {string}
 */
function toNaryString(num, n) {
    return num.toString(n);
}


/**
 * Returns the common directory path for the specified filenames.
 *
 * @param {array} pathes
 * @return {string}
 */
function getCommonDirectoryPath(pathes) {
    if (pathes.length === 0) {
        return '';
    }

    const commonPrefix = pathes.reduce(
        (prefix, path) => {
            let index = 0;

            while (
                index < prefix.length &&
                index < path.length &&
                prefix[index] === path[index]
                ) {
                index++;
            }

            return prefix.slice(0, index);
        }
    );

    return commonPrefix.slice(
        0,
        commonPrefix.lastIndexOf('/') + 1
    );
}


/**
 * Returns the product of two specified matrices.
 *
 * @param {array} m1
 * @param {array} m2
 * @return {array}
 */
function getMatrixProduct(m1, m2) {
    return m1.map(
        row =>
            m2[0].map(
                (_, columnIndex) =>
                    row.reduce(
                        (sum, value, rowIndex) =>
                            sum +
                            value *
                            m2[rowIndex][columnIndex],
                        0
                    )
            )
    );
}


/**
 * Returns the winner of a tic-tac-toe position.
 *
 * Possible results: 'X', '0', undefined.
 *
 * @param {array} position
 * @return {string|undefined}
 */
function evaluateTicTacToePosition(position) {
    const lines = [
        // Сначала проверяем горизонтальные линии
        [position[0][0], position[0][1], position[0][2]],
        [position[1][0], position[1][1], position[1][2]],
        [position[2][0], position[2][1], position[2][2]],

        // Затем проверяем вертикальные линии
        [position[0][0], position[1][0], position[2][0]],
        [position[0][1], position[1][1], position[2][1]],
        [position[0][2], position[1][2], position[2][2]],

        // В конце проверяем диагонали
        [position[0][0], position[1][1], position[2][2]],
        [position[0][2], position[1][1], position[2][0]]
    ];

    const winningLine = lines.find(line =>
        line[0] !== undefined &&
        line[0] === line[1] &&
        line[1] === line[2]
    );

    return winningLine === undefined
        ? undefined
        : winningLine[0];
}


module.exports = {
    getFizzBuzz: getFizzBuzz,
    getFactorial: getFactorial,
    getSumBetweenNumbers: getSumBetweenNumbers,
    isTriangle: isTriangle,
    doRectanglesOverlap: doRectanglesOverlap,
    isInsideCircle: isInsideCircle,
    findFirstSingleChar: findFirstSingleChar,
    getIntervalString: getIntervalString,
    reverseString: reverseString,
    reverseInteger: reverseInteger,
    isCreditCardNumber: isCreditCardNumber,
    getDigitalRoot: getDigitalRoot,
    isBracketsBalanced: isBracketsBalanced,
    timespanToHumanString: timespanToHumanString,
    toNaryString: toNaryString,
    getCommonDirectoryPath: getCommonDirectoryPath,
    getMatrixProduct: getMatrixProduct,
    evaluateTicTacToePosition: evaluateTicTacToePosition
};