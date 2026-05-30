'use strict';

/**********************************************************************************************
 *                                                                                            *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions                    *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments      *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures                           *
 *                                                                                            *
 **********************************************************************************************/

/**
 * Returns the functions composition of two specified functions f(x) and g(x).
 * The result of compose is to be a function of one argument, (lets call the argument x),
 * which works like applying function f to the result of applying function g to x, i.e.
 *  getComposition(f,g)(x) = f(g(x))
 *
 * @param {Function} f
 * @param {Function} g
 * @return {Function}
 */
function getComposition(f, g) {
    return function(x) {
        return f(g(x));
    };
}

/**
 * Returns the math power function with the specified exponent
 *
 * @param {number} exponent
 * @return {Function}
 */
function getPowerFunction(exponent) {
    return function(x) {
        return Math.pow(x, exponent);
    };
}

/**
 * Returns the polynom function of one argument based on specified coefficients.
 * See: https://en.wikipedia.org/wiki/Polynomial#Definition
 *
 * @params {integer}
 * @return {Function}
 */
function getPolynom() {
    const coefficients = Array.from(arguments);
    if (coefficients.length === 0) {
        return null;
    }
    return function(x) {
        let result = 0;
        const n = coefficients.length;
        for (let i = 0; i < n; i++) {
            result += coefficients[i] * Math.pow(x, n - i - 1);
        }
        return result;
    };
}

/**
 * Memoizes passed function and returns function
 * which invoked first time calls the passed function and then always returns cached result.
 *
 * @param {Function} func - function to memoize
 * @return {Function} memoized function
 */
function memoize(func) {
    let cached = null;
    let called = false;
    return function() {
        if (!called) {
            cached = func();
            called = true;
        }
        return cached;
    };
}

/**
 * Returns the function trying to call the passed function and if it throws,
 * retrying it specified number of attempts.
 *
 * @param {Function} func
 * @param {number} attempts
 * @return {Function}
 */
function retry(func, attempts) {
    return function() {
        let lastError;
        for (let i = 0; i < attempts; i++) {
            try {
                return func();
            } catch (err) {
                lastError = err;
            }
        }
        throw lastError;
    };
}

/**
 * Returns the logging wrapper for the specified method,
 * Logger has to log the start and end of calling the specified function.
 * Logger has to log the arguments of invoked function.
 * The format of output log is:
 * <function name>(<arg1>, <arg2>,...,<argN>) starts
 * <function name>(<arg1>, <arg2>,...,<argN>) ends
 *
 * @param {Function} func
 * @param {Function} logFunc - function to output log with single string argument
 * @return {Function}
 */
function logger(func, logFunc) {
    return function(...args) {
        const argsString = args.map(arg => JSON.stringify(arg)).join(',');
        const startMsg = `${func.name}(${argsString}) starts`;
        logFunc(startMsg);
        const result = func(...args);
        const endMsg = `${func.name}(${argsString}) ends`;
        logFunc(endMsg);
        return result;
    };
}

/**
 * Return the function with partial applied arguments
 *
 * @param {Function} fn
 * @return {Function}
 */
function partialUsingArguments(fn) {
    const fixedArgs = Array.from(arguments).slice(1);
    return function(...restArgs) {
        return fn(...fixedArgs, ...restArgs);
    };
}

/**
 * Returns the id generator function that returns next integer starting from specified number every time when invoking.
 *
 * @param {Number} startFrom
 * @return {Function}
 */
function getIdGeneratorFunction(startFrom) {
    let current = startFrom;
    return function() {
        return current++;
    };
}

module.exports = {
    getComposition: getComposition,
    getPowerFunction: getPowerFunction,
    getPolynom: getPolynom,
    memoize: memoize,
    retry: retry,
    logger: logger,
    partialUsingArguments: partialUsingArguments,
    getIdGeneratorFunction: getIdGeneratorFunction,
};