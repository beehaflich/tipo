


/**
 * @preserve
 * tipo - tiny, bulletproof type detection
 *
 * @author beehaflich
 * @license MIT
 *
 * @param {window} window
 * @return {void}
 */
(function(window) {
  var tipo = {};


  /**
   * Grab the type JavaScript believes the parameter to be
   * Native types will often have an uppercased string;
   * Remember to check for or normalize case when using this
   * @param {mixed} perhaps
   * @return {string}
   */
  tipo.type = function(perhaps) {
    var type = Object.prototype.toString.call(perhaps);
    return type.replace(/\[object |]/g, '');
  };


  /**
   * Is the input a string?
   * @param {mixed} perhaps
   * @return {boolean}
   */
  tipo.string = function(perhaps) {
    // things that don't work:
    // typeof perhaps === 'string' doesn't work with new String()
    // '' + perhaps === perhaps doesn't work with new String()
    // perhaps instanceof String doesn't work cross-frame
    return (Object.prototype.toString.call(perhaps) === '[object String]');
  };


  /**
   * Is the input a number?
   * This will return true for NaN, despite how silly that sounds.
   * It is still of a Numeric type, so I'll let it slide :)
   * @param {mixed} perhaps
   * @return {boolean}
   */
  tipo.number = function(perhaps) {
    // things that don't work:
    // typeof perhaps === 'number' doesn't work with new Number()
    // +perhaps === perhaps doesn't work with NaN or new Number()
    // perhaps instanceof Number doesn't work cross-frame
    return (Object.prototype.toString.call(perhaps) === '[object Number]');
  };


  /**
   * Is the input an array?
   * @param {mixed} perhaps
   * @return {boolean}
   */
  tipo.array = function(perhaps) {
    // ecmascript 5 has this built in, so let's use it if we can
    if (Array.isArray) {
      return Array.isArray(perhaps);
    }
    // toString check as backup
    return Object.prototype.toString.call(perhaps) === '[object Array]';
  };


  /**
   * Is the input a function?
   * @param {mixed} perhaps
   * @return {boolean}
   */
  tipo.function = function(perhaps) {
    // Object.prototype.toString.call once again comes to the rescue
    // This is really the only good way to tell, afaik
    // Your only other options are checking if it has function-ish properties,
    // which will fail if you have some earlier code adding function-ish
    // prototypes to non-functions
    return Object.prototype.toString.call(perhaps) === '[object Function]';
  };


  /**
   * Is the input an object?
   * This is here for completionism
   * Defining 'object' in javascript is not a trivial exercise
   * If this is producing undesirable results, reconsider using it
   * @param {mixed} perhaps
   * @return {void}
   */
  tipo.object = function(perhaps) {
    // things that don't work:
    // perhaps instanceof Object not only fails cross-frame,
    // but will return true for any non-primitive in the same frame!
    // typeof perhaps === 'object' has the same greedy problem as instanceof,
    // plus returns true for null, which was a flaw in the original ECMAScript
    return (perhaps === Object(perhaps));
  };


  /**
   * Is the input undefined?
   * @param {mixed} perhaps
   * @return {boolean}
   */
  tipo.undefined = function(perhaps) {
    // yeah, this looks odd.
    // in JS you can redefine 'undefined'
    // So if you want to know if something is truly undefined,
    // the easiest way is to create your own.
    // This empty self-executing anonymous function is an undefined factory!
    return (perhaps === (function() {})());
  };


  /**
   * Is the input null?
   * This one is really just in here for completion's sake
   * @param {mixed} perhaps
   * @return {boolean}
   */
  tipo.null = function(perhaps) {
    // This isn't exactly a type, but it's easy enough to detect
    // Plus, we did one for undefined. Why not null?
    return (perhaps === null);
  };


  /**
   * Is the input a boolean?
   * @param {mixed} perhaps
   * @return {boolean}
   */
  tipo.boolean = function(perhaps) {
    // now you'd think that there is an easy solution here, like with null
    // ...nope!
    // triple-equals fails here for constructed booleans
    // more object prototypes... yay
    return (Object.prototype.toString.call(perhaps) === '[object Boolean]');
  };


  /**
   * Restore the old object and return a reference to tipo
   * @return {Object}
   */
  tipo.noConflict = function() {
    window.tipo = _tipo;
    return tipo;
  };


  var _tipo = window.tipo;
  window.tipo = tipo;
})(window);

