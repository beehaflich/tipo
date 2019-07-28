"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * A tiny, highly testable file;
 * easy to add to your project and simple to use.
 *
 * - No duck typing
 * - Works cross-iframe
 * - Works with non-primitive constructed objects (`new String()`, `new Number()`, etc)
 *
 * @author @tchaflich
 * @license MIT
 * @class
 */
var tipo =
/*#__PURE__*/
function () {
  function tipo() {
    _classCallCheck(this, tipo);
  }

  _createClass(tipo, null, [{
    key: "getDetectedType",

    /**
     * Grab the type JavaScript believes the parameter to be.
     * Native types will often have an uppercased string,
     * so this function converts to lowercase for ease of use.
     *
     * @param {*} something
     * @returns {string}
     */
    value: function getDetectedType(something) {
      var type = Object.prototype.toString.call(something);
      return type.replace(/\[object |]/gi, '').toLowerCase();
    }
    /**
     * Is the input a string?
     *
     * @param {*} something
     * @returns {boolean}
     */

  }, {
    key: "isString",
    value: function isString(something) {
      // things that don't work:
      // typeof something === 'string' doesn't work with new String()
      // '' + something === something doesn't work with new String()
      // something instanceof String doesn't work cross-frame
      return Object.prototype.toString.call(something) === '[object String]';
    }
    /**
     * Is the input a number?
     * This will return true for NaN, despite how silly that sounds.
     * It is still of a "numeric" type, much like Infinity.
     *
     * @param {*} something
     * @returns {boolean}
     */

  }, {
    key: "isNumber",
    value: function isNumber(something) {
      // things that don't work:
      // typeof something === 'number' doesn't work with new Number()
      // +something === something doesn't work with NaN or new Number()
      // something instanceof Number doesn't work cross-frame
      return Object.prototype.toString.call(something) === '[object Number]';
    }
    /**
     * Is the input an array?
     *
     * @param {*} something
     * @returns {boolean}
     */

  }, {
    key: "isArray",
    value: function isArray(something) {
      // ecmascript 5 has this built in, so let's use it if we can
      if (Array.isArray) {
        return Array.isArray(something);
      } // toString check as backup


      return Object.prototype.toString.call(something) === '[object Array]';
    }
    /**
     * Is the input a function?
     *
     * @param {*} something
     * @returns {boolean}
     */

  }, {
    key: "isFunction",
    value: function isFunction(something) {
      // Object.prototype.toString.call once again comes to the rescue
      // This is really the only good way to tell, afaik
      // Your only other options are checking if it has function-ish properties,
      // which will fail if you have some earlier code adding function-ish
      // prototypes to non-functions
      return Object.prototype.toString.call(something) === '[object Function]';
    }
    /**
     * Is the input an object?
     * Defining 'object' in javascript is not a trivial exercise -
     * the specification used here is that the argument is a non-primitive.
     *
     * @param {*} something
     * @returns {undefined}
     */

  }, {
    key: "isObject",
    value: function isObject(something) {
      // things that don't work:
      // something instanceof Object not only fails cross-frame,
      // but will return true for any non-primitive in the same frame!
      // typeof something === 'object' has the same greedy problem as instanceof,
      // plus returns true for null, which was a flaw in the original ECMAScript
      return something === Object(something);
    }
    /**
     * Is the input undefined?
     *
     * @param {*} something
     * @returns {boolean}
     */

  }, {
    key: "isUndefined",
    value: function isUndefined(something) {
      // "wat r u doing"
      // in JS you can redefine 'undefined'
      // So if you want to know if something is truly undefined,
      // the easiest way is to create your own.
      // This empty self-executing anonymous function is an undefined factory!
      return something === function () {// empty!
      }();
    }
    /**
     * Is the input null?
     * This one is really just in here for completion's sake.
     *
     * @param {*} something
     * @returns {boolean}
     */

  }, {
    key: "isNull",
    value: function isNull(something) {
      // This isn't exactly a type, but it's easy enough to detect
      // Plus, we did one for undefined. Why not null?
      return something === null;
    }
    /**
     * Is the input a boolean?
     *
     * @param {*} something
     * @returns {boolean}
     */

  }, {
    key: "isBoolean",
    value: function isBoolean(something) {
      // now you'd think that there is an easy solution here, like with null
      // ...nope!
      // triple-equals fails here for constructed booleans
      // more object prototypes... yay
      return Object.prototype.toString.call(something) === '[object Boolean]';
    }
  }]);

  return tipo;
}();

var _default = tipo;
exports["default"] = _default;