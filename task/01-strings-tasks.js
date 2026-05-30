'use strict';

/********************************************************************************************
 *                                                                                          *
 * Please read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String  *
 *                                                                                          *
 ********************************************************************************************/

/**
 * Returns the result of concatenation of two strings.
 *
 * @param {string} value1
 * @param {string} value2
 * @return {string}
 */
function concatenateStrings(value1, value2) {
    return value1 + value2;
}

/**
 * Returns the length of given string.
 *
 * @param {string} value
 * @return {number}
 */
function getStringLength(value) {
    return value.length;
}

/**
 * Returns the result of string template and given parameters firstName and lastName.
 * Please do not use concatenation, use template string.
 *
 * @param {string} firstName
 * @param {string} lastName
 * @return {string}
 */
function getStringFromTemplate(firstName, lastName) {
    return `Hello, ${firstName} ${lastName}!`;
}

/**
 * Extracts a name from template string 'Hello, First_Name Last_Name!'.
 *
 * @param {string} value
 * @return {string}
 */
function extractNameFromTemplate(value) {
    return value.slice(7, -1);
}

/**
 * Returns a first char of the given string.
 *
 * @param {string} value
 * @return {string}
 */
function getFirstChar(value) {
    return value[0];
}

/**
 * Removes a leading and trailing whitespace characters from string.
 *
 * @param {string} value
 * @return {string}
 */
function removeLeadingAndTrailingWhitespaces(value) {
    return value.trim();
}

/**
 * Returns a string that repeated the specified number of times.
 *
 * @param {string} value
 * @param {string} count
 * @return {string}
 */
function repeatString(value, count) {
    return value.repeat(count);
}

/**
 * Remove the first occurrence of string inside another string
 *
 * @param {string} str
 * @param {string} value
 * @return {string}
 */
function removeFirstOccurrences(str, value) {
    const index = str.indexOf(value);
    if (index === -1) return str;
    return str.slice(0, index) + str.slice(index + value.length);
}

/**
 * Remove the first and last angle brackets from tag string
 *
 * @param {string} str
 * @return {string}
 */
function unbracketTag(str) {
    return str.slice(1, -1);
}

/**
 * Converts all characters of the specified string into the upper case
 *
 * @param {string} str
 * @return {string}
 */
function convertToUpperCase(str) {
    return str.toUpperCase();
}

/**
 * Extracts e-mails from single string with e-mails list delimeted by semicolons
 *
 * @param {string} str
 * @return {array}
 */
function extractEmails(str) {
    return str.split(';');
}

/**
 * Returns the string representation of rectangle with specified width and height
 * using pseudograhic chars
 *
 * @param {number} width
 * @param {number} height
 * @return {string}
 */
function getRectangleString(width, height) {
    const top = '┌' + '─'.repeat(width - 2) + '┐\n';
    const middle = '│' + ' '.repeat(width - 2) + '│\n';
    const bottom = '└' + '─'.repeat(width - 2) + '┘\n';
    return top + middle.repeat(height - 2) + bottom;
}

/**
 * Encode specified string with ROT13 cipher
 * See details:  https://en.wikipedia.org/wiki/ROT13
 *
 * @param {string} str
 * @return {string}
 */
function encodeToRot13(str) {
    return str.replace(/[A-Za-z]/g, (c) => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });
}

/**
 * Returns true if the value is string; otherwise false.
 * @param {string} value
 * @return {boolean}
 */
function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

/**
 * Returns playid card id.
 *
 * Playing cards initial deck includes the cards in the following order:
 *   'A♣','2♣','3♣','4♣','5♣','6♣','7♣','8♣','9♣','10♣','J♣','Q♣','K♣',
 *   'A♦','2♦','3♦','4♦','5♦','6♦','7♦','8♦','9♦','10♦','J♦','Q♦','K♦',
 *   'A♥','2♥','3♥','4♥','5♥','6♥','7♥','8♥','9♥','10♥','J♥','Q♥','K♥',
 *   'A♠','2♠','3♠','4♠','5♠','6♠','7♠','8♠','9♠','10♠','J♠','Q♠','K♠'
 *
 * @param {string} value
 * @return {number}
 */
function getCardId(value) {
    const suits = ['♣', '♦', '♥', '♠'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push(rank + suit);
        }
    }
    return deck.indexOf(value);
}

module.exports = {
    concatenateStrings,
    getStringLength,
    getStringFromTemplate,
    extractNameFromTemplate,
    getFirstChar,
    removeLeadingAndTrailingWhitespaces,
    repeatString,
    removeFirstOccurrences,
    unbracketTag,
    convertToUpperCase,
    extractEmails,
    getRectangleString,
    encodeToRot13,
    isString,
    getCardId
};