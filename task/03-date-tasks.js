'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date    *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Parses an RFC 2822 string date representation into date value.
 *
 * @param {string} value
 * @return {Date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'       => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT'    => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {
    return new Date(value);
}


/**
 * Parses an ISO 8601 string date representation into date value.
 *
 * @param {string} value
 * @return {Date}
 *
 * @example:
 *    '2016-01-19T16:07:37+00:00' => Date()
 *    '2016-01-19T08:07:37Z'      => Date()
 */
function parseDataFromIso8601(value) {
    return new Date(value);
}


/**
 * Returns true if specified date is leap year and false otherwise.
 *
 * A year is leap if:
 * - it is divisible by 400;
 * - or it is divisible by 4, but not divisible by 100.
 *
 * @param {Date} date
 * @return {boolean}
 *
 * @example:
 *    Date(1900, 1, 1) => false
 *    Date(2000, 1, 1) => true
 *    Date(2001, 1, 1) => false
 *    Date(2012, 1, 1) => true
 */
function isLeapYear(date) {
    const year = date.getFullYear();

    return year % 400 === 0 ||
        (year % 4 === 0 && year % 100 !== 0);
}


/**
 * Returns the string representation of the timespan between two dates.
 * The output format is "HH:mm:ss.sss".
 *
 * @param {Date} startDate
 * @param {Date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0), Date(2000,1,1,11,0,0)       => "01:00:00.000"
 *    Date(2000,1,1,10,0,0), Date(2000,1,1,10,30,0)      => "00:30:00.000"
 *    Date(2000,1,1,10,0,0), Date(2000,1,1,10,0,20)      => "00:00:20.000"
 *    Date(2000,1,1,10,0,0), Date(2000,1,1,10,0,0,250)   => "00:00:00.250"
 *    Date(2000,1,1,10,0,0), Date(2000,1,1,15,20,10,453) => "05:20:10.453"
 */
function timeSpanToString(startDate, endDate) {
    let difference = Math.abs(endDate.getTime() - startDate.getTime());

    const milliseconds = difference % 1000;
    difference = Math.floor(difference / 1000);

    const seconds = difference % 60;
    difference = Math.floor(difference / 60);

    const minutes = difference % 60;
    const hours = Math.floor(difference / 60);

    return (
        String(hours).padStart(2, '0') +
        ':' +
        String(minutes).padStart(2, '0') +
        ':' +
        String(seconds).padStart(2, '0') +
        '.' +
        String(milliseconds).padStart(3, '0')
    );
}


/**
 * Returns the smaller angle in radians between the hands of an analog clock
 * for the specified Greenwich time.
 *
 * @param {Date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,3,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI / 2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI / 2
 */
function angleBetweenClockHands(date) {
    const hours = date.getUTCHours() % 12;
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const milliseconds = date.getUTCMilliseconds();

    /*
     * Учитываем не только минуты, но и секунды с миллисекундами.
     * Это делает вычисление корректным для произвольного момента времени.
     */
    const fullMinutes =
        minutes +
        seconds / 60 +
        milliseconds / 60000;

    /*
     * Минутная стрелка проходит 6 градусов за минуту.
     * Часовая стрелка проходит 30 градусов за час
     * и дополнительно 0.5 градуса за каждую минуту.
     */
    const minuteHandAngle = fullMinutes * 6;
    const hourHandAngle = hours * 30 + fullMinutes * 0.5;

    let angleInDegrees = Math.abs(hourHandAngle - minuteHandAngle);

    /*
     * Между стрелками существуют два угла.
     * Возвращаем меньший из них.
     */
    if (angleInDegrees > 180) {
        angleInDegrees = 360 - angleInDegrees;
    }

    return angleInDegrees * Math.PI / 180;
}


module.exports = {
    parseDataFromRfc2822: parseDataFromRfc2822,
    parseDataFromIso8601: parseDataFromIso8601,
    isLeapYear: isLeapYear,
    timeSpanToString: timeSpanToString,
    angleBetweenClockHands: angleBetweenClockHands
};