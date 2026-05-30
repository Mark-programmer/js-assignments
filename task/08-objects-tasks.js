'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 **************************************************************************************************/

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 */
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
}
Rectangle.prototype.getArea = function() {
    return this.width * this.height;
};

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 */
function getJSON(obj) {
    return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 */
function fromJSON(proto, json) {
    const obj = Object.create(proto);
    const data = JSON.parse(json);
    Object.assign(obj, data);
    return obj;
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy and implement the functionality
 * to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple, clear and readable as possible.
 */

class CssSelector {
    constructor(parts = []) {
        this.parts = parts; // each part: { type, value }
    }

    _getOrderIndex(type) {
        const order = {
            element: 0,
            id: 1,
            class: 2,
            attribute: 3,
            pseudoClass: 4,
            pseudoElement: 5
        };
        return order[type];
    }

    _addPart(type, value, orderIndex) {
        // Check for single occurrence types
        const singleTypes = ['element', 'id', 'pseudoElement'];
        if (singleTypes.includes(type) && this.parts.some(p => p.type === type)) {
            throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
        }

        // Check order
        const lastOrder = this.parts.length ? this._getOrderIndex(this.parts[this.parts.length - 1].type) : -1;
        if (orderIndex < lastOrder) {
            throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
        }

        return new CssSelector([...this.parts, { type, value }]);
    }

    element(value) {
        return this._addPart('element', value, 0);
    }

    id(value) {
        return this._addPart('id', value, 1);
    }

    class(value) {
        return this._addPart('class', value, 2);
    }

    attr(value) {
        return this._addPart('attribute', value, 3);
    }

    pseudoClass(value) {
        return this._addPart('pseudoClass', value, 4);
    }

    pseudoElement(value) {
        return this._addPart('pseudoElement', value, 5);
    }

    stringify() {
        return this.parts.map(part => {
            switch (part.type) {
                case 'element': return part.value;
                case 'id': return '#' + part.value;
                case 'class': return '.' + part.value;
                case 'attribute': return '[' + part.value + ']';
                case 'pseudoClass': return ':' + part.value;
                case 'pseudoElement': return '::' + part.value;
            }
        }).join('');
    }
}

class CombinedSelector {
    constructor(selector1, combinator, selector2) {
        this.selector1 = selector1;
        this.combinator = combinator;
        this.selector2 = selector2;
    }

    stringify() {
        const left = this.selector1.stringify();
        const right = this.selector2.stringify();
        if (this.combinator === ' ') {
            return left + '   ' + right;
        } else {
            return left + ' ' + this.combinator + ' ' + right;
        }
    }
}

const cssSelectorBuilder = {
    element: function(value) {
        return new CssSelector().element(value);
    },
    id: function(value) {
        return new CssSelector().id(value);
    },
    class: function(value) {
        return new CssSelector().class(value);
    },
    attr: function(value) {
        return new CssSelector().attr(value);
    },
    pseudoClass: function(value) {
        return new CssSelector().pseudoClass(value);
    },
    pseudoElement: function(value) {
        return new CssSelector().pseudoElement(value);
    },
    combine: function(selector1, combinator, selector2) {
        return new CombinedSelector(selector1, combinator, selector2);
    }
};

module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};