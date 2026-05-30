'use strict';

/**
 * Returns the bank account number parsed from specified string.
 *
 * @param {string} bankAccount
 * @return {number}
 */
function parseBankAccount(bankAccount) {
    const lines = bankAccount.split('\n');
    if (lines.length < 3) return NaN;

    const patterns = {
        ' _ | ||_|': 0,
        '     |  |': 1,
        ' _  _||_ ': 2,
        ' _  _| _|': 3,
        '   |_|  |': 4,
        ' _ |_  _|': 5,
        ' _ |_ |_|': 6,
        ' _   |  |': 7,
        ' _ |_||_|': 8,
        ' _ |_| _|': 9
    };

    let account = 0;
    for (let i = 0; i < 9; i++) {
        const col = i * 3;
        const pattern =
            lines[0].substr(col, 3) +
            lines[1].substr(col, 3) +
            lines[2].substr(col, 3);
        const digit = patterns[pattern];
        if (digit === undefined) return NaN;
        account = account * 10 + digit;
    }
    return account;
}

/**
 * Returns the string, but with line breaks inserted at just the right places
 * to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 */
function* wrapText(text, columns) {
    if (columns <= 0) {
        yield text;
        return;
    }
    const words = text.split(' ');
    let currentLine = '';

    for (const word of words) {
        if (currentLine.length === 0) {
            currentLine = word;
        } else if (currentLine.length + 1 + word.length <= columns) {
            currentLine += ' ' + word;
        } else {
            yield currentLine;
            currentLine = word;
        }
    }
    if (currentLine) yield currentLine;
}

/**
 * Poker hand ranking.
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
};

/**
 * Returns the rank of the specified poker hand.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 */
function getPokerHandRank(hand) {
    const valueMap = {
        '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
        'J': 11, 'Q': 12, 'K': 13, 'A': 14
    };
    const cards = hand.map(card => {
        const suit = card.slice(-1);
        const rankStr = card.slice(0, -1);
        const value = valueMap[rankStr];
        return { value, suit };
    });

    cards.sort((a, b) => a.value - b.value);
    let values = cards.map(c => c.value);
    const suits = cards.map(c => c.suit);

    const isFlush = suits.every(s => s === suits[0]);

    let isStraight = false;
    if (values[0] === 2 && values[1] === 3 && values[2] === 4 && values[3] === 5 && values[4] === 14) {
        isStraight = true;
        values = [1, 2, 3, 4, 5]; // re‑map for frequency checks
    } else {
        isStraight = values[4] - values[0] === 4 && new Set(values).size === 5;
    }

    if (isFlush && isStraight) return PokerRank.StraightFlush;

    const freq = new Map();
    for (const v of values) freq.set(v, (freq.get(v) || 0) + 1);
    const counts = [...freq.values()].sort((a, b) => b - a);

    if (counts[0] === 4) return PokerRank.FourOfKind;
    if (counts[0] === 3 && counts[1] === 2) return PokerRank.FullHouse;
    if (isFlush) return PokerRank.Flush;
    if (isStraight) return PokerRank.Straight;
    if (counts[0] === 3) return PokerRank.ThreeOfKind;
    if (counts[0] === 2 && counts[1] === 2) return PokerRank.TwoPairs;
    if (counts[0] === 2) return PokerRank.OnePair;
    return PokerRank.HighCard;
}

/**
 * Returns the rectangles sequence of specified figure.
 *
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 */
function* getFigureRectangles(figure) {
    const lines = figure.split('\n');

    while (lines.length > 0 && lines[lines.length - 1] === '') {
        lines.pop();
    }

    if (lines.length === 0) {
        return;
    }

    const height = lines.length;
    const width = Math.max(...lines.map(line => line.length));
    const grid = lines.map(line => line.padEnd(width, ' '));

    function isHorizontalLine(y, x1, x2) {
        for (let x = x1; x <= x2; x++) {
            if (grid[y][x] !== '-' && grid[y][x] !== '+') {
                return false;
            }
        }

        return true;
    }

    function isVerticalLine(x, y1, y2) {
        for (let y = y1; y <= y2; y++) {
            if (grid[y][x] !== '|' && grid[y][x] !== '+') {
                return false;
            }
        }

        return true;
    }

    for (let y1 = 0; y1 < height; y1++) {
        for (let x1 = 0; x1 < width; x1++) {
            if (grid[y1][x1] !== '+') {
                continue;
            }

            for (let y2 = y1 + 1; y2 < height; y2++) {
                for (let x2 = x1 + 1; x2 < width; x2++) {
                    if (
                        grid[y1][x2] !== '+' ||
                        grid[y2][x1] !== '+' ||
                        grid[y2][x2] !== '+'
                    ) {
                        continue;
                    }

                    const hasOuterBorders =
                        isHorizontalLine(y1, x1, x2) &&
                        isHorizontalLine(y2, x1, x2) &&
                        isVerticalLine(x1, y1, y2) &&
                        isVerticalLine(x2, y1, y2);

                    if (!hasOuterBorders) {
                        continue;
                    }

                    let hasInnerSeparator = false;

                    for (let x = x1 + 1; x < x2; x++) {
                        if (isVerticalLine(x, y1, y2)) {
                            hasInnerSeparator = true;
                            break;
                        }
                    }

                    if (!hasInnerSeparator) {
                        for (let y = y1 + 1; y < y2; y++) {
                            if (isHorizontalLine(y, x1, x2)) {
                                hasInnerSeparator = true;
                                break;
                            }
                        }
                    }

                    if (hasInnerSeparator) {
                        continue;
                    }

                    const innerWidth = x2 - x1 - 1;
                    const rectangleLines = [];

                    rectangleLines.push(
                        '+' + '-'.repeat(innerWidth) + '+'
                    );

                    for (let y = y1 + 1; y < y2; y++) {
                        rectangleLines.push(
                            '|' + ' '.repeat(innerWidth) + '|'
                        );
                    }

                    rectangleLines.push(
                        '+' + '-'.repeat(innerWidth) + '+'
                    );

                    yield rectangleLines.join('\n') + '\n';
                }
            }
        }
    }
}
module.exports = {
    parseBankAccount,
    wrapText,
    PokerRank,
    getPokerHandRank,
    getFigureRectangles
};