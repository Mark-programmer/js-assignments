'use strict';

/********************************************************************************************
 *                                                                                          *
 * Please read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield        *
 *                                                                                          *
 ********************************************************************************************/

/**
 * Returns the lines sequence of "99 Bottles of Beer" song.
 *
 * @return {Iterable.<string>}
 */
function* get99BottlesOfBeer() {
    for (let i = 99; i >= 2; i--) {
        yield `${i} bottles of beer on the wall, ${i} bottles of beer.`;
        const next = i - 1;
        const bottleWord = next === 1 ? 'bottle' : 'bottles';
        yield `Take one down and pass it around, ${next} ${bottleWord} of beer on the wall.`;
    }
    yield '1 bottle of beer on the wall, 1 bottle of beer.';
    yield 'Take one down and pass it around, no more bottles of beer on the wall.';
    yield 'No more bottles of beer on the wall, no more bottles of beer.';
    yield 'Go to the store and buy some more, 99 bottles of beer on the wall.';
}

/**
 * Returns the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
 *
 * @return {Iterable.<number>}
 */
function* getFibonacciSequence() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

/**
 * Traverses a tree using the depth-first strategy.
 * See details: https://en.wikipedia.org/wiki/Depth-first_search
 *
 * Each node has child nodes in node.children array.
 * Leaf nodes do not have 'children' property.
 *
 * @param {object} root - the tree root
 * @return {Iterable.<object>} - the sequence of all tree nodes in depth-first order
 */
function* depthTraversalTree(root) {
    const stack = [root];
    while (stack.length) {
        const node = stack.pop();
        yield node;
        if (node.children) {
            // Push children in reverse order to preserve original order
            for (let i = node.children.length - 1; i >= 0; i--) {
                stack.push(node.children[i]);
            }
        }
    }
}

/**
 * Traverses a tree using the breadth-first strategy.
 * See details: https://en.wikipedia.org/wiki/Breadth-first_search
 *
 * Each node has child nodes in node.children array.
 * Leaf nodes do not have 'children' property.
 *
 * @param {object} root - the tree root
 * @return {Iterable.<object>} - the sequence of all tree nodes in breadth-first order
 */
function* breadthTraversalTree(root) {
    const queue = [root];
    let currentIndex = 0;

    while (currentIndex < queue.length) {
        const node = queue[currentIndex++];

        yield node;

        if (node.children) {
            for (const child of node.children) {
                queue.push(child);
            }
        }
    }
}

/**
 * Merges two yield-style sorted sequences into one sorted sequence.
 * The result sequence consists of sorted items from source iterators.
 *
 * @param {Iterable.<number>} source1
 * @param {Iterable.<number>} source2
 * @return {Iterable.<number>} - the merged sorted sequence
 */
function* mergeSortedSequences(source1, source2) {
    const iter1 = source1();
    const iter2 = source2();

    let result1 = iter1.next();
    let result2 = iter2.next();

    while (!result1.done || !result2.done) {
        if (result1.done) {
            yield result2.value;
            result2 = iter2.next();
        } else if (result2.done) {
            yield result1.value;
            result1 = iter1.next();
        } else if (result1.value <= result2.value) {
            yield result1.value;
            result1 = iter1.next();
        } else {
            yield result2.value;
            result2 = iter2.next();
        }
    }
}

module.exports = {
    get99BottlesOfBeer,
    getFibonacciSequence,
    depthTraversalTree,
    breadthTraversalTree,
    mergeSortedSequences
};