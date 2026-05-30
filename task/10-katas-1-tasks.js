'use strict';

/**
 * Returns the array of 32 compass points and heading.
 * See details here:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Example of return :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
function createCompassPoints() {
    const sides = ['N', 'E', 'S', 'W'];  // use array of cardinal directions only!
    const abbreviations = [
        'N', 'NbE', 'NNE', 'NEbN', 'NE', 'NEbE', 'ENE', 'EbN',
        'E', 'EbS', 'ESE', 'SEbE', 'SE', 'SEbS', 'SSE', 'SbE',
        'S', 'SbW', 'SSW', 'SWbS', 'SW', 'SWbW', 'WSW', 'WbS',
        'W', 'WbN', 'WNW', 'NWbW', 'NW', 'NWbN', 'NNW', 'NbW'
    ];
    return abbreviations.map((abbr, idx) => ({
        abbreviation: abbr,
        azimuth: idx * 11.25
    }));
}

/**
 * Expand the braces of the specified string.
 * See https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * In the input string, balanced pairs of braces containing comma-separated substrings
 * represent alternations that specify multiple alternatives which are to appear at that position in the output.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * NOTE: The order of output string does not matter.
 *
 * Example:
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
function* expandBraces(str) {
    function* expandRec(s) {
        let open = s.indexOf('{');
        if (open === -1) {
            yield s;
            return;
        }
        // find matching closing brace
        let depth = 0;
        let close = -1;
        for (let i = open; i < s.length; i++) {
            if (s[i] === '{') depth++;
            else if (s[i] === '}') {
                depth--;
                if (depth === 0) {
                    close = i;
                    break;
                }
            }
        }
        if (close === -1) {
            // no matching brace – treat as literal
            yield s;
            return;
        }
        const prefix = s.slice(0, open);
        const middle = s.slice(open + 1, close);
        const suffix = s.slice(close + 1);
        // split middle by commas ignoring nested braces
        const alternatives = [];
        let start = 0;
        depth = 0;
        for (let i = 0; i < middle.length; i++) {
            if (middle[i] === '{') depth++;
            else if (middle[i] === '}') depth--;
            else if (middle[i] === ',' && depth === 0) {
                alternatives.push(middle.slice(start, i));
                start = i + 1;
            }
        }
        alternatives.push(middle.slice(start));

        for (const alt of alternatives) {
            for (const expandedAlt of expandRec(alt)) {
                for (const expandedSuffix of expandRec(suffix)) {
                    yield prefix + expandedAlt + expandedSuffix;
                }
            }
        }
    }
    yield* expandRec(str);
}

/**
 * Returns the ZigZag matrix
 *
 * The fundamental idea in the JPEG compression algorithm is to sort coefficient of given image by zigzag path and encode it.
 * In this task you are asked to implement a simple method to create a zigzag square matrix.
 * See details at https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * and zigzag path here: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - matrix dimension
 * @return {array}  n x n array of zigzag path
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
    const matrix = Array.from({ length: n }, () => new Array(n).fill(0));
    let num = 0;
    for (let s = 0; s < 2 * n - 1; s++) {
        if (s % 2 === 0) {
            // even diagonal: bottom-left to top-right
            let row = Math.min(s, n - 1);
            let col = s - row;
            while (row >= 0 && col < n) {
                matrix[row][col] = num++;
                row--;
                col++;
            }
        } else {
            // odd diagonal: top-right to bottom-left
            let col = Math.min(s, n - 1);
            let row = s - col;
            while (col >= 0 && row < n) {
                matrix[row][col] = num++;
                row++;
                col--;
            }
        }
    }
    return matrix;
}

/**
 * Returns true if specified subset of dominoes can be placed in a row according to the game rules.
 * Dominoes details see at: https://en.wikipedia.org/wiki/Dominoes
 *
 * Each domino tile presented as an array [x,y] of tile value.
 * For example, the subset [1, 1], [2, 2], [1, 2] can be arranged in a row (as [1, 1] followed by [1, 2] followed by [2, 2]),
 * while the subset [1, 1], [0, 3], [1, 4] can not be arranged in one row.
 * NOTE that as in usual dominoes playing any pair [i, j] can also be treated as [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
function canDominoesMakeRow(dominoes) {
    if (dominoes.length === 0) return false;
    const degree = new Map();
    const adj = new Map();

    for (const [a, b] of dominoes) {
        degree.set(a, (degree.get(a) || 0) + 1);
        degree.set(b, (degree.get(b) || 0) + 1);
        if (!adj.has(a)) adj.set(a, new Set());
        if (!adj.has(b)) adj.set(b, new Set());
        adj.get(a).add(b);
        adj.get(b).add(a);
    }

    // find first node with degree > 0 for BFS
    let start = null;
    for (const [node, deg] of degree.entries()) {
        if (deg > 0) {
            start = node;
            break;
        }
    }
    if (start === null) return false; // no dominoes? but length>0 guarantee

    const visited = new Set();
    const queue = [start];
    visited.add(start);
    while (queue.length) {
        const node = queue.shift();
        for (const neighbor of adj.get(node) || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    // all nodes with positive degree must be visited
    for (const [node, deg] of degree.entries()) {
        if (deg > 0 && !visited.has(node)) return false;
    }

    let oddCount = 0;
    for (const deg of degree.values()) {
        if (deg % 2 === 1) oddCount++;
    }
    return oddCount === 0 || oddCount === 2;
}

/**
 * Returns the string expression of the specified ordered list of integers.
 *
 * A format for expressing an ordered list of integers is to use a comma separated list of either:
 *   - individual integers
 *   - or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'.
 *     (The range includes all integers in the interval including both endpoints)
 *     The range syntax is to be used only for, and for every range that expands to more than two values.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
    if (nums.length === 0) return '';
    const result = [];
    let i = 0;
    while (i < nums.length) {
        let start = nums[i];
        let j = i;
        while (j + 1 < nums.length && nums[j + 1] === nums[j] + 1) {
            j++;
        }
        if (j - i >= 2) {
            result.push(`${start}-${nums[j]}`);
        } else {
            for (let k = i; k <= j; k++) {
                result.push(`${nums[k]}`);
            }
        }
        i = j + 1;
    }
    return result.join(',');
}

module.exports = {
    createCompassPoints: createCompassPoints,
    expandBraces: expandBraces,
    getZigZagMatrix: getZigZagMatrix,
    canDominoesMakeRow: canDominoesMakeRow,
    extractRanges: extractRanges
};
