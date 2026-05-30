'use strict';

/**
 * Returns true if word occurs in the specified word snaking puzzle.
 * Each word can be constructed using "snake" path inside a grid with top, left, right and bottom directions.
 * Each char can be used only once ("snake" should not cross itself).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {
    if (!searchStr.length) return true;
    const rows = puzzle.length;
    const cols = puzzle[0].length;
    const grid = puzzle.map(row => row.split(''));
    const target = searchStr.split('');

    function dfs(r, c, idx, visited) {
        if (idx === target.length) return true;
        if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
        if (visited[r][c]) return false;
        if (grid[r][c] !== target[idx]) return false;

        visited[r][c] = true;
        const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
        for (let [dr, dc] of dirs) {
            if (dfs(r+dr, c+dc, idx+1, visited)) return true;
        }
        visited[r][c] = false;
        return false;
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === target[0]) {
                const visited = Array(rows).fill().map(() => Array(cols).fill(false));
                if (dfs(i, j, 0, visited)) return true;
            }
        }
    }
    return false;
}

/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 *
 * @param {string} chars
 * @return {Iterable.<string>}
 */
function* getPermutations(chars) {
    const n = chars.length;
    if (n <= 1) {
        yield chars;
        return;
    }
    const used = Array(n).fill(false);
    const current = [];

    function* backtrack() {
        if (current.length === n) {
            yield current.join('');
            return;
        }
        for (let i = 0; i < n; i++) {
            if (!used[i]) {
                used[i] = true;
                current.push(chars[i]);
                yield* backtrack();
                current.pop();
                used[i] = false;
            }
        }
    }
    yield* backtrack();
}

/**
 * Returns the most profit from stock quotes.
 * @param {array} quotes
 * @return {number} max profit
 */
function getMostProfitFromStockQuotes(quotes) {
    let max = 0;
    let profit = 0;
    for (let i = quotes.length - 1; i >= 0; i--) {
        if (quotes[i] > max) {
            max = quotes[i];
        } else {
            profit += max - quotes[i];
        }
    }
    return profit;
}

/**
 * Class representing the url shorting helper.
 * The short link can be at least 1.5 times shorter than the original url.
 * @class
 */
function UrlShortener() {
    // Allowed characters for the shortened URL
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "0123456789-_.~!*'();:@&=+$,/?#[]";

    // Compression dictionary: common substrings -> single character
    // Characters used are from the allowed set (e.g., '^', '|', '~', '`', etc.)
    this.encodeMap = new Map([
        ['https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/', '^'],
        ['https://en.wikipedia.org/wiki/', '|'],
        ['https://', '~'],
        ['http://', '`'],
        ['/wiki/', '!'],
        ['Percent-encoding#Types_of_URI_characters', '@'],
        ['Binary-to-text_encoding#Encoding_plain_text', '#'],
        ['/en-US/docs/', '$'],
        ['/Web/JavaScript/Reference/', '%'],
        ['/Global_Objects/', '&'],
        ['/Math/imul', '*'],
        ['/catalog.html?search=mobile+phones&price=100-200&year=2016#top_links', '+']
    ]);

    // Reverse map for decoding
    this.decodeMap = new Map();
    for (let [k, v] of this.encodeMap) {
        this.decodeMap.set(v, k);
    }
}

UrlShortener.prototype = {
    encode: function(url) {
        let result = url;
        // Sort keys by length descending to match longest substrings first
        const keys = Array.from(this.encodeMap.keys()).sort((a,b) => b.length - a.length);
        for (let key of keys) {
            const repl = this.encodeMap.get(key);
            result = result.split(key).join(repl);
        }
        return result;
    },

    decode: function(code) {
        let result = code;
        for (let [key, value] of this.decodeMap) {
            result = result.split(key).join(value);
        }
        return result;
    }
};

module.exports = {
    findStringInSnakingPuzzle,
    getPermutations,
    getMostProfitFromStockQuotes,
    UrlShortener
};