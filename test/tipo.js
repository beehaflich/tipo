
const assert = require('assert');

import tipo from './../src/tipo.js';

var namedFunction = function(x) {
	return x;
};

// https://developer.mozilla.org/en-US/docs/Glossary
// https://stackoverflow.com/a/22482737

const expectedTypes = [
	{
		'test': '"I am a teapot"',
		'type': 'string',
		'isAnObject': false,
	},
	{
		'test': new String('"short and stout"'),
		'type': 'string',
		'isAnObject': true,
	},
	{
		'test': '',
		'type': 'string',
		'isAnObject': false,
	},
	{
		'test': new String(),
		'type': 'string',
		'isAnObject': true,
	},
	{
		'test': (4).toString(),
		'type': 'string',
		'isAnObject': false,
	},
	{
		'test': 4,
		'type': 'number',
		'isAnObject': false,
	},
	{
		'test': 4.8,
		'type': 'number',
		'isAnObject': false,
	},
	{
		'test': new Number('4'),
		'type': 'number',
		'isAnObject': true,
	},
	{
		'test': new Number('4.8'),
		'type': 'number',
		'isAnObject': true,
	},
	{
		'test': new Number(4),
		'type': 'number',
		'isAnObject': true,
	},
	{
		'test': new Number(),
		'type': 'number',
		'isAnObject': true,
	},
	{
		'test': Number('4.8'),
		'type': 'number',
		'isAnObject': false,
	},
	{
		'test': Number(4),
		'type': 'number',
		'isAnObject': false,
	},
	{
		'test': Number(),
		'type': 'number',
		'isAnObject': false,
	},
	{
		'test': +'not a number',
		'type': 'number',
		'isAnObject': false,
	},
	{
		'test': NaN,
		'type': 'number',
		'isAnObject': false,
	},
	{
		'test': Infinity,
		'type': 'number',
		'isAnObject': false,
	},
	{
		'test': [0, 1, 2, 'foo', 'bar'],
		'type': 'array',
		'isAnObject': true,
	},
	{
		'test': new Array(0, 1, 2, 'foo', 'bar'),
		'type': 'array',
		'isAnObject': true,
	},
	{
		'test': new Array(),
		'type': 'array',
		'isAnObject': true,
	},
	{
		'test': Array(),
		'type': 'array',
		'isAnObject': true,
	},
	{
		'test': function() {
			return true;
		},
		'type': 'function',
		'isAnObject': true,
	},
	{
		'test': new Function('return true;'),
		'type': 'function',
		'isAnObject': true,
	},
	{
		'test': function foo() {
			return 'bar';
		},
		'type': 'function',
		'isAnObject': true,
	},
	{
		'test': namedFunction,
		'type': 'function',
		'isAnObject': true,
	},
	{
		'test': new namedFunction(),
		'type': 'object',
		'isAnObject': true,
	},
	{
		'test': String,
		'type': 'function',
		'isAnObject': true,
	},
	{
		'test': Array,
		'type': 'function',
		'isAnObject': true,
	},
	{
		'test': {'foo': 'bar'},
		'type': 'object',
		'isAnObject': true,
	},
	{
		'test': new Object(),
		'type': 'object',
		'isAnObject': true,
	},
	{
		'test': Object.create(String),
		'type': 'object',
		'isAnObject': true,
	},
	{
		'test': undefined, // eslint-disable-line
		'type': 'undefined',
		'isAnObject': false,
	},
	{
		'test': (function() {
			// notta
		})(),
		'type': 'undefined',
		'isAnObject': false,
	},
	{
		'test': null,
		'type': 'null',
		'isAnObject': false,
	},
	{
		'test': false,
		'type': 'boolean',
		'isAnObject': false,
	},
	{
		'test': new Boolean(false),
		'type': 'boolean',
		'isAnObject': true,
	},
	{
		'test': true,
		'type': 'boolean',
		'isAnObject': false,
	},
	{
		'test': new Boolean(true),
		'type': 'boolean',
		'isAnObject': true,
	},
	{
		'test': new Boolean(),
		'type': 'boolean',
		'isAnObject': true,
	},
];

describe('getDetectedType', () => {
	it('Returns a lowercase type string based on its argument', () => {
		expectedTypes.forEach((testObject) => {
			assert.equal(testObject.type, tipo.getDetectedType(testObject.test));
		});
	});
});

describe('isString', () => {
	it('Returns true for literal strings', () => {
		assert.equal(true, tipo.isString('Hallo'));
		assert.equal(true, tipo.isString(''));
	});

	it('Returns true for constructed strings', () => {
		assert.equal(true, tipo.isString(new String('Hallo')));
		assert.equal(true, tipo.isString(new String()));
	});

	it('Returns true for other primitive strings', () => {
		expectedTypes.forEach((testObject) => {
			if (testObject.type === 'string') {
				assert.equal(true, tipo.isString(testObject.test));
			}
		});
	});

	it('Returns false for non-strings', () => {
		expectedTypes.forEach((testObject) => {
			if (testObject.type !== 'string') {
				assert.equal(false, tipo.isString(testObject.test));
			}
		});
	});
});

describe('isNumber', () => {
	it('Returns true for literal numerically typed items', () => {
		assert.equal(true, tipo.isNumber(4));
		assert.equal(true, tipo.isNumber(0));
	});

	it('Returns true for NaN and Infinity', () => {
		assert.equal(true, tipo.isNumber(NaN));
		assert.equal(true, tipo.isNumber(Infinity));
	});

	it('Returns true for constructed numerically typed items', () => {
		assert.equal(true, tipo.isNumber(new Number(4)));
		assert.equal(true, tipo.isNumber(new Number()));
	});

	it('Returns true for other primitive numerically typed items', () => {
		expectedTypes.forEach((testObject) => {
			if (testObject.type === 'number') {
				assert.equal(true, tipo.isNumber(testObject.test));
			}
		});
	});

	it('Returns false for non-numerically typed items', () => {
		expectedTypes.forEach((testObject) => {
			if (testObject.type !== 'number') {
				assert.equal(false, tipo.isNumber(testObject.test));
			}
		});
	});
});

describe('isArray', () => {
	it('Returns true for literal arrays', () => {
		assert.equal(true, tipo.isArray(['Hallo']));
		assert.equal(true, tipo.isArray(['Hallo', 'Salut']));
		assert.equal(true, tipo.isArray([]));
	});

	it('Returns true for constructed arrays', () => {
		assert.equal(true, tipo.isArray(new Array('Hallo')));
		assert.equal(true, tipo.isArray(new Array(9)));
		assert.equal(true, tipo.isArray(new Array()));
	});

	it('Returns true for other generated arrays', () => {
		expectedTypes.forEach((testObject) => {
			if (testObject.type === 'array') {
				assert.equal(true, tipo.isArray(testObject.test));
			}
		});
	});

	it('Returns false for non-arrays', () => {
		expectedTypes.forEach((testObject) => {
			if (testObject.type !== 'array') {
				assert.equal(false, tipo.isArray(testObject.test));
			}
		});
	});
});

describe('isFunction', () => {
	it('Returns true for anonymous functions, including arrow functions', () => {
		assert.equal(true, tipo.isFunction(function() {})); // eslint-disable-line
		assert.equal(true, tipo.isFunction(() => {})); // eslint-disable-line
	});

	it('Returns true for named functions and assigned functions', () => {
		function x(a) { // eslint-disable-line
			return a;
		}

		let y = (b) => {
			return b;
		};

		var z = function(c) {
			return c;
		};

		assert.equal(true, tipo.isFunction(x));
		assert.equal(true, tipo.isFunction(y));
		assert.equal(true, tipo.isFunction(z));
	});

	it('Returns true for constructed functions', () => {
		assert.equal(true, tipo.isFunction(new Function('return false;')));
		assert.equal(true, tipo.isFunction(new Function()));
	});

	it('Returns true for other generated functions', () => {
		expectedTypes.forEach((testObject) => {
			if (testObject.type === 'function') {
				assert.equal(true, tipo.isFunction(testObject.test));
			}
		});
	});

	it('Returns false for non-functions', () => {
		expectedTypes.forEach((testObject) => {
			if (testObject.type !== 'function') {
				assert.equal(false, tipo.isFunction(testObject.test));
			}
		});
	});
});

describe('isObject', () => {
	it('Returns true for literal objects', () => {
		assert.equal(true, tipo.isObject({'hallo': 'salut'}));
		assert.equal(true, tipo.isObject({}));
	});

	it('Returns true for constructed objects', () => {
		assert.equal(true, tipo.isObject(new Object()));
		assert.equal(true, tipo.isObject(Object.create(null)));
	});

	it('Returns true for non-primitives', () => {
		expectedTypes.forEach((testObject) => {
			if (testObject.isAnObject) {
				assert.equal(true, tipo.isObject(testObject.test));
			}
		});
	});

	it('Returns false for primitives', () => {
		expectedTypes.forEach((testObject) => {
			if (!testObject.isAnObject) {
				assert.equal(false, tipo.isObject(testObject.test));
			}
		});
	});
});

describe('isUndefined', () => {
	it('Returns true for literal undefined', () => {
		assert.equal(true, tipo.isUndefined(undefined)); // eslint-disable-line
	});

	it('Returns true for implicit undefined', () => {
		assert.equal(true, tipo.isUndefined());
	});

	it('Returns true for other native undefined values', () => {
		expectedTypes.forEach((testObject) => {
			if (testObject.type === 'undefined') {
				assert.equal(true, tipo.isUndefined(testObject.test));
			}
		});
	});

	it('Returns false for non-undefined values', () => {
		expectedTypes.forEach((testObject) => {
			if (testObject.type !== 'undefined') {
				assert.equal(false, tipo.isUndefined(testObject.test));
			}
		});
	});
});

describe('isNull', () => {
	it('Returns true for literal null', () => {
		assert.equal(true, tipo.isNull(null));
	});

	it('Returns true for other generated null values', () => {
		expectedTypes.forEach((testObject) => {
			if (testObject.type === 'null') {
				assert.equal(true, tipo.isNull(testObject.test));
			}
		});
	});

	it('Returns false for non-null values', () => {
		expectedTypes.forEach((testObject) => {
			if (testObject.type !== 'null') {
				assert.equal(false, tipo.isNull(testObject.test));
			}
		});
	});
});

describe('isBoolean', () => {
	it('Returns true for literal booleans', () => {
		assert.equal(true, tipo.isBoolean(true));
		assert.equal(true, tipo.isBoolean(false));
	});

	it('Returns true for constructed booleans', () => {
		assert.equal(true, tipo.isBoolean(new Boolean('true')));
		assert.equal(true, tipo.isBoolean(new Boolean()));
	});

	it('Returns true for other native booleans', () => {
		expectedTypes.forEach((testObject) => {
			if (testObject.type === 'boolean') {
				assert.equal(true, tipo.isBoolean(testObject.test));
			}
		});
	});

	it('Returns false for non-booleans', () => {
		expectedTypes.forEach((testObject) => {
			if (testObject.type !== 'boolean') {
				assert.equal(false, tipo.isBoolean(testObject.test));
			}
		});
	});
});








