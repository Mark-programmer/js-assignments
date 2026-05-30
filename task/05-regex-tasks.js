'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions           *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Returns the regexp that matches a GUID string representation
 * '{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}',
 * where X is hexadecimal digit.
 *
 * @return {RegExp}
 */
function getRegexForGuid() {
    return /^\{[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\}$/i;
}


/**
 * Returns the regexp that matches strings containing:
 * lowercase "p", any single character and lowercase "t".
 *
 * Examples:
 *   'pit'      => true
 *   'spot'     => true
 *   'slap two' => true
 *   'Pot'      => false
 *
 * Regex length must be less than 13 characters.
 *
 * @return {RegExp}
 */
function getRegexForPitSpot() {
    return /p.t/;
}


/**
 * Returns the regexp that matches IPv4 strings in dotted format.
 * Every number must be in the range from 0 to 255.
 *
 * Leading zeros are allowed:
 *   '010.234.015.001'
 *
 * @return {RegExp}
 */
function getRegexForIPv4() {
    return /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|0?\d{1,2})\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|0?\d{1,2})$/;
}


/**
 * Returns the regexp that matches SSN codes in XXX-XX-XXXX format.
 * Each group cannot consist only of zeros.
 *
 * @return {RegExp}
 */
function getRegexForSSN() {
    return /^(?!000)\d{3}-(?!00)\d{2}-(?!0000)\d{4}$/;
}


/**
 * Returns the password validator regexp.
 *
 * Password requirements:
 * - minimum specified length;
 * - at least one lowercase letter;
 * - at least one uppercase letter;
 * - at least one digit;
 * - alphanumeric characters only.
 *
 * @param {number} minLength
 * @return {RegExp}
 */
function getPasswordValidator(minLength) {
    return new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{' +
        minLength +
        ',}$'
    );
}


module.exports = {
    getRegexForGuid: getRegexForGuid,
    getRegexForPitSpot: getRegexForPitSpot,
    getRegexForIPv4: getRegexForIPv4,
    getRegexForSSN: getRegexForSSN,
    getPasswordValidator: getPasswordValidator
};