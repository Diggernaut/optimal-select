(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["OptimalSelect"] = factory();
	else
		root["OptimalSelect"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * # Utilities
 *
 * Convenience helpers.
 */

/**
 * Create an array with the DOM nodes of the list
 *
 * @param  {NodeList}             nodes - [description]
 * @return {Array.<HTMLElement>}        - [description]
 */
var convertNodeList = exports.convertNodeList = function convertNodeList(nodes) {
  var length = nodes.length;

  var arr = new Array(length);
  for (var i = 0; i < length; i++) {
    arr[i] = nodes[i];
  }
  return arr;
};

/**
 * Escape special characters and line breaks as a simplified version of 'CSS.escape()'
 *
 * Description of valid characters: https://mathiasbynens.be/notes/css-escapes
 *
 * @param  {String?} value - [description]
 * @return {String}        - [description]
 */
var escapeValue = exports.escapeValue = function escapeValue(value) {
  return value && value.replace(/['"`\\/:?&!#$%^()[\]{|}*+;,.<=>@~]/g, '\\$&').replace(/\n/g, '\xA0');
};

/**
 * Partition array into two groups determined by predicate
 */
var partition = exports.partition = function partition(array, predicate) {
  return array.reduce(function (_ref, item) {
    var _ref2 = _slicedToArray(_ref, 2),
        inner = _ref2[0],
        outer = _ref2[1];

    return predicate(item) ? [inner.concat(item), outer] : [inner, outer.concat(item)];
  }, [[], []]);
};

/**
 * Determine if string is valid CSS identifier
 * 
 * In CSS, identifiers (including element names, classes, and IDs in selectors) can contain
 * only the characters [a-zA-Z0-9] and ISO 10646 characters U+00A0 and higher, plus the hyphen (-)
 * and the underscore (_); they cannot start with a digit, two hyphens, or a hyphen followed by
 * a digit.
 * 
 * Identifiers can also contain escaped characters and any ISO 10646 character as a numeric
 * code (see next item). For instance, the identifier "B&W?" may be written as "B\&W\?" or "B\26 W\3F".
 * @param {String} value 
 * @return {Boolean}
 */
var isValidCSSIdentifier = exports.isValidCSSIdentifier = function isValidCSSIdentifier(value) {
  return !!value && !/(^\d)|(^--)|(^-\d)/.test(value) && !/([^\\]|^)['"`/:?&!#$%^()[\]{|}*+;,.<=>@~]/.test(value);
};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToString = exports.descendantsToXPath = exports.pathToXPath = exports.patternToXPath = exports.pseudoToXPath = exports.classesToXPath = exports.attributesToXPath = exports.pathToSelector = exports.patternToSelector = exports.pseudoToSelector = exports.classesToSelector = exports.attributesToSelector = exports.createPattern = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utilities = __webpack_require__(0);

/**
 * @typedef  {Object} Pattern
 * @property {('descendant' | 'child')}                  [relates]
 * @property {string}                                    [tag]
 * @property {Array.<{ name: string, value: string? }>}  attributes
 * @property {Array.<string>}                            classes
 * @property {Array.<string>}                            pseudo
 * @property {Array.<Array.<Pattern>>}                   descendants
 */

/**
 * Creates a new pattern structure
 * 
 * @param {Partial<Pattern>} pattern
 * @returns {Pattern}
 */
var createPattern = exports.createPattern = function createPattern() {
  var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _extends({ attributes: [], classes: [], pseudo: [], descendants: [] }, base);
};

/**
 * Convert attributes to CSS selector
 * 
 * @param {Array.<{ name: string, value: string? }>} attributes 
 * @returns {string}
 */
var attributesToSelector = exports.attributesToSelector = function attributesToSelector(attributes) {
  return attributes.map(function (_ref) {
    var name = _ref.name,
        value = _ref.value;

    if (value === null) {
      return '[' + name + ']';
    }
    if (name === 'id' && (0, _utilities.isValidCSSIdentifier)(value)) {
      return '#' + value;
    }
    return '[' + name + '="' + value + '"]';
  }).join('');
};

/**
 * Convert classes to CSS selector
 * 
 * @param {Array.<string>} classes 
 * @returns {string}
 */
var classesToSelector = exports.classesToSelector = function classesToSelector(classes) {
  return classes.map(function (c) {
    return (0, _utilities.isValidCSSIdentifier)(c) ? '.' + c : '[class~="' + c + '"]';
  }).join('');
};

/**
 * Convert pseudo selectors to CSS selector
 * 
 * @param {Array.<string>} pseudo 
 * @returns {string}
 */
var pseudoToSelector = exports.pseudoToSelector = function pseudoToSelector(pseudo) {
  return pseudo.length ? ':' + pseudo.join(':') : '';
};

/**
 * Convert pattern to CSS selector
 * 
 * @param {Pattern} pattern 
 * @returns {string}
 */
var patternToSelector = exports.patternToSelector = function patternToSelector(pattern) {
  var relates = pattern.relates,
      tag = pattern.tag,
      attributes = pattern.attributes,
      classes = pattern.classes,
      pseudo = pattern.pseudo;

  var value = '' + (relates === 'child' ? '> ' : '') + (tag || '') + attributesToSelector(attributes) + classesToSelector(classes) + pseudoToSelector(pseudo);
  return value;
};

/**
 * Converts path to string
 *
 * @param {Array.<Pattern>} path 
 * @returns {string}
 */
var pathToSelector = exports.pathToSelector = function pathToSelector(path) {
  return path.map(patternToSelector).join(' ');
};

var convertEscaping = function convertEscaping(value) {
  return value && value.replace(/\\([`\\/:?&!#$%^()[\]{|}*+;,.<=>@~])/g, '$1').replace(/\\(['"])/g, '$1$1').replace(/\\A /g, '\n');
};

/**
* Convert attributes to XPath string
* 
* @param {Array.<{ name: string, value: string? }>} attributes 
* @returns {string}
*/
var attributesToXPath = exports.attributesToXPath = function attributesToXPath(attributes) {
  return attributes.map(function (_ref2) {
    var name = _ref2.name,
        value = _ref2.value;

    if (value === null) {
      return '[@' + name + ']';
    }
    return '[@' + name + '="' + convertEscaping(value) + '"]';
  }).join('');
};

/**
* Convert classes to XPath string
* 
* @param {Array.<string>} classes 
* @returns {string}
*/
var classesToXPath = exports.classesToXPath = function classesToXPath(classes) {
  return classes.map(function (c) {
    return '[contains(concat(" ",normalize-space(@class)," ")," ' + c + ' ")]';
  }).join('');
};

/**
* Convert pseudo selectors to XPath string
* 
* @param {Array.<string>} pseudo 
* @returns {string}
*/
var pseudoToXPath = exports.pseudoToXPath = function pseudoToXPath(pseudo) {
  return pseudo.map(function (p) {
    var match = p.match(/^(nth-child|nth-of-type|contains)\((.+)\)$/);
    if (!match) {
      return '';
    }

    switch (match[1]) {
      case 'nth-child':
        return '[(count(preceding-sibling::*)+1) = ' + match[2] + ']';

      case 'nth-of-type':
        return '[' + match[2] + ']';

      case 'contains':
        return '[contains(text(),' + match[2] + ')]';

      default:
        return '';
    }
  }).join('');
};

/**
* Convert pattern to XPath string
* 
* @param {Pattern} pattern 
* @returns {string}
*/
var patternToXPath = exports.patternToXPath = function patternToXPath(pattern) {
  var relates = pattern.relates,
      tag = pattern.tag,
      attributes = pattern.attributes,
      classes = pattern.classes,
      pseudo = pattern.pseudo,
      descendants = pattern.descendants;

  var value = '' + (relates === 'child' ? '/' : '//') + (tag || '*') + attributesToXPath(attributes) + classesToXPath(classes) + pseudoToXPath(pseudo) + descendantsToXPath(descendants);
  return value;
};

/**
* Converts path to XPath string
*
* @param {Array.<Pattern>} path 
* @returns {string}
*/
var pathToXPath = exports.pathToXPath = function pathToXPath(path) {
  return '.' + path.map(patternToXPath).join('');
};

/**
* Convert child selectors to XPath string
* 
* @param {Array.<Array.<Pattern>>} children 
* @returns {string}
*/
var descendantsToXPath = exports.descendantsToXPath = function descendantsToXPath(children) {
  return children.length ? '[' + children.map(pathToXPath).join('][') + ']' : '';
};

var toString = {
  'css': {
    attributes: attributesToSelector,
    classes: classesToSelector,
    pseudo: pseudoToSelector,
    pattern: patternToSelector,
    path: pathToSelector
  },
  'xpath': {
    attributes: attributesToXPath,
    classes: classesToXPath,
    pseudo: pseudoToXPath,
    pattern: patternToXPath,
    path: pathToXPath
  },
  'jquery': {}
};

toString.jquery = toString.css;
toString[0] = toString.css;
toString[1] = toString.xpath;

/**
 * @typedef  {Object} ToStringApi
 * @property {(attributes: Array.<{ name: string, value: string? }>) => string} attributes
 * @property {(classes: Array.<string>) => string}  classes
 * @property {(pseudo: Array.<string>) => string}   pseudo
 * @property {(pattern: Pattern) => string}         pattern
 * @property {(path: Array.<Pattern>) => string}    path
 */

/**
 * 
 * @param {Options} options 
 * @returns {ToStringApi}
 */
var getToString = exports.getToString = function getToString() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return toString[options.format || 'css'];
};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// import Sizzle from 'sizzle'
var Sizzle = void 0;

/**
 * Select element using jQuery
 * @param  {string}         selector
 * @param  {HTMLElement}    parent
 * @return Array.<HTMLElement>
 */
var selectJQuery = function selectJQuery(selector) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!Sizzle) {
    Sizzle = __webpack_require__(7);
  }
  return Sizzle(selector, parent || document);
};

/**
 * Select element using XPath
 * @param  {string}         selector
 * @param  {HTMLElement}    parent
 * @return Array.<HTMLElement>
 */
var selectXPath = function selectXPath(selector) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  parent = parent || document;
  var doc = parent;
  while (doc.parentNode) {
    doc = doc.parentNode;
  }
  if (doc !== parent && !selector.startsWith('.')) {
    selector = '.' + selector;
  }
  var iterator = doc.evaluate(selector, parent, null, 0);
  var elements = [];
  var element;
  while (element = iterator.iterateNext()) {
    elements.push(element);
  }
  return elements;
};

/**
 * Select element using CSS
 * @param  {string}         selector
 * @param  {HTMLElement}    parent
 * @return Array.<HTMLElement>
 */
var selectCSS = function selectCSS(selector) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return (parent || document).querySelectorAll(selector);
};

var select = {
  'css': selectCSS,
  'xpath': selectXPath,
  'jquery': selectJQuery
};

select[0] = select.css;
select[1] = select.xpath;

/**
* 
* @param {Options} options 
* @returns {(selector: string, parent: HTMLElement) => Array.<HTMLElement>}
*/
var getSelect = exports.getSelect = function getSelect() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (selector, parent) {
    try {
      return select[options.format || 'css'](selector, parent || options.root);
    } catch (err) {
      return [];
    }
  };
};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * # Common
 *
 * Process collections for similarities.
 */

/**
 * @typedef {import('./select').Options} Options
 */

/**
 * Find the last common ancestor of elements
 *
 * @param  {Array.<HTMLElement>} elements  - [description]
 * @param  {Options}              options  - [description]
 * @return {HTMLElement}                   - [description]
 */
var getCommonAncestor = exports.getCommonAncestor = function getCommonAncestor(elements) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$root = options.root,
      root = _options$root === undefined ? document : _options$root;


  var ancestors = [];

  elements.forEach(function (element, index) {
    var parents = [];
    while (element !== root) {
      element = element.parentNode;
      parents.unshift(element);
    }
    ancestors[index] = parents;
  });

  ancestors.sort(function (curr, next) {
    return curr.length - next.length;
  });

  var shallowAncestor = ancestors.shift();

  var ancestor = null;

  var _loop = function _loop() {
    var parent = shallowAncestor[i];
    var missing = ancestors.some(function (otherParents) {
      return !otherParents.some(function (otherParent) {
        return otherParent === parent;
      });
    });

    if (missing) {
      // TODO: find similar sub-parents, not the top root, e.g. sharing a class selector
      return 'break';
    }

    ancestor = parent;
  };

  for (var i = 0, l = shallowAncestor.length; i < l; i++) {
    var _ret = _loop();

    if (_ret === 'break') break;
  }

  return ancestor;
};

/**
 * Get a set of common properties of elements
 *
 * @param  {Array.<HTMLElement>} elements - [description]
 * @return {Object}                       - [description]
 */
var getCommonProperties = exports.getCommonProperties = function getCommonProperties(elements) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$ignore = options.ignore,
      ignore = _options$ignore === undefined ? {} : _options$ignore;


  var commonProperties = {
    classes: [],
    attributes: {},
    tag: null
  };

  elements.forEach(function (element) {
    var commonClasses = commonProperties.classes,
        commonAttributes = commonProperties.attributes,
        commonTag = commonProperties.tag;

    // ~ classes

    if (commonClasses !== undefined) {
      var classes = element.getAttribute('class');
      if (classes) {
        classes = classes.trim().split(' ').filter(function (cls) {
          return !ignore.class || !ignore.class(cls);
        });
        if (!commonClasses.length) {
          commonProperties.classes = classes;
        } else {
          commonClasses = commonClasses.filter(function (entry) {
            return classes.some(function (name) {
              return name === entry;
            });
          });
          if (commonClasses.length) {
            commonProperties.classes = commonClasses;
          } else {
            delete commonProperties.classes;
          }
        }
      } else {
        delete commonProperties.classes;
      }
    }

    // ~ attributes
    if (commonAttributes !== undefined) {
      var elementAttributes = element.attributes;
      var attributes = Object.keys(elementAttributes).reduce(function (attributes, key) {
        var attribute = elementAttributes[key];
        var attributeName = attribute.name;
        if (attribute && attributeName !== 'class' && (!ignore.attribute || !ignore.attribute(attributeName, attribute.value))) {
          attributes[attributeName] = attribute.value;
        }
        return attributes;
      }, {});

      var attributesNames = Object.keys(attributes);
      var commonAttributesNames = Object.keys(commonAttributes);

      if (attributesNames.length) {
        if (!commonAttributesNames.length) {
          commonProperties.attributes = attributes;
        } else {
          commonAttributes = commonAttributesNames.reduce(function (nextCommonAttributes, name) {
            var value = commonAttributes[name];
            if (value === attributes[name]) {
              nextCommonAttributes[name] = value;
            }
            return nextCommonAttributes;
          }, {});
          if (Object.keys(commonAttributes).length) {
            commonProperties.attributes = commonAttributes;
          } else {
            delete commonProperties.attributes;
          }
        }
      } else {
        delete commonProperties.attributes;
      }
    }

    // ~ tag
    if (commonTag !== undefined) {
      var tag = element.tagName.toLowerCase();
      if (!commonTag) {
        commonProperties.tag = tag;
      } else if (tag !== commonTag) {
        delete commonProperties.tag;
      }
    }
  });

  return commonProperties;
};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combinations = exports.initOptions = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * # Match
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * Retrieve selector for a node.
                                                                                                                                                                                                                                                                   */

exports.default = match;

var _pattern = __webpack_require__(1);

var _selector = __webpack_require__(2);

var _utilities = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @typedef {import('./select').Options} Options
 * @typedef {import('./pattern').Pattern} Pattern
 * @typedef {import('./pattern').ToStringApi} Pattern
 */

var defaultIgnore = {
  attribute: function attribute(attributeName) {
    return ['style', 'data-reactid', 'data-react-checksum'].indexOf(attributeName) > -1;
  },

  contains: function contains() {
    return true;
  }
};

var initOptions = exports.initOptions = function initOptions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _extends({}, options, {
    root: options.root || document,
    skip: options.skip || null,
    priority: options.priority || ['id', 'class', 'href', 'src'],
    ignore: options.ignore || {}
  });
};

/**
 * Get the path of the element
 *
 * @param  {HTMLElement} node      - [description]
 * @param  {Options}     [options] - [description]
 * @return {Array.<Pattern>}       - [description]
 */
function match(node) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var nested = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  options = initOptions(options);
  var _options = options,
      root = _options.root,
      skip = _options.skip,
      ignore = _options.ignore,
      format = _options.format;


  var path = [];
  var element = node;
  var length = path.length;
  var select = (0, _selector.getSelect)(options);
  var toString = (0, _pattern.getToString)(options);

  var skipCompare = skip && (Array.isArray(skip) ? skip : [skip]).map(function (entry) {
    if (typeof entry !== 'function') {
      return function (element) {
        return element === entry;
      };
    }
    return entry;
  });

  var skipChecks = function skipChecks(element) {
    return skip && skipCompare.some(function (compare) {
      return compare(element);
    });
  };

  Object.keys(ignore).forEach(function (type) {
    var predicate = ignore[type];
    if (typeof predicate === 'function') return;
    if (typeof predicate === 'number') {
      predicate = predicate.toString();
    }
    if (typeof predicate === 'string') {
      predicate = new RegExp((0, _utilities.escapeValue)(predicate).replace(/\\/g, '\\\\'));
    }
    if (typeof predicate === 'boolean') {
      predicate = predicate ? /(?:)/ : /.^/;
    }
    // check class-/attributename for regex
    ignore[type] = function (name, value) {
      return predicate.test(value);
    };
  });

  while (element !== root && element.nodeType !== 11) {
    if (skipChecks(element) !== true) {
      // ~ global
      if (checkAttributes(element, path, options, select, toString, root)) break;
      if (checkTag(element, path, options, select, toString, root)) break;

      // ~ local
      checkAttributes(element, path, options, select, toString);
      if (path.length === length) {
        checkTag(element, path, options, select, toString);
      }

      if (path.length === length && [1, 'xpath'].includes(format) && !nested && element === node) {
        checkRecursiveDescendants(element, path, options, select, toString);
      }

      if (path.length === length && [1, 'xpath', 'jquery'].includes(format)) {
        checkText(element, path, options, select, toString, format === 'jquery');
      }

      if (path.length === length) {
        checkNthChild(element, path, options);
      }
    }

    element = element.parentNode;
    length = path.length;
  }

  if (element === root) {
    var pattern = findPattern(element, options, select, toString);
    path.unshift(pattern);
  }

  return path;
}

/**
 * Extend path with attribute identifier
 *
 * @param  {HTMLElement}     element  - [description]
 * @param  {Array.<Pattern>} path     - [description]
 * @param  {Options}         options  - [description]
 * @param  {function}        select   - [description]
 * @param  {ToStringApi}     toString - [description]
 * @param  {HTMLElement}     parent   - [description]
 * @return {boolean}                  - [description]
 */
var checkAttributes = function checkAttributes(element, path, _ref, select, toString) {
  var priority = _ref.priority,
      ignore = _ref.ignore;
  var parent = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : element.parentNode;

  var pattern = findAttributesPattern(priority, element, ignore, select, toString, parent);
  if (pattern) {
    path.unshift(pattern);
    return true;
  }
  return false;
};

/**
 * Calculates array of combinations of items in input array.
 * @param  {Array.<any>} values   - array of values
 * @param  {Object} options       - options: min - minimum subset size; max - maximum subset size
 * @return {Array.<Array.<any>>?}   array of subsets
 */
var combinations = exports.combinations = function combinations(values, options) {
  var _ref2 = options || {},
      min = _ref2.min,
      max = _ref2.max;

  var result = [[]];

  values.forEach(function (v) {
    result.forEach(function (r) {
      if (!max || r.length < max) {
        result.push(r.concat(v));
      }
    });
  });

  result.shift();
  return min ? result.filter(function (r) {
    return r.length >= min;
  }) : result;
};

// limit subset size to increase performance
var maxSubsetSize = [{ items: 13, max: 1 }, { items: 10, max: 2 }, { items: 8, max: 3 }, { items: 5, max: 4 }];

/**
 * Get class selector
 *
 * @param  {Array.<string>} classes - [description]
 * @param  {function}       select  - [description]
 * @param  {ToStringApi}    toString - [description]
 * @param  {HTMLElement}    parent  - [description]
 * @param  {Pattern}        base    - [description]
 * @return {Array.<string>?}        - [description]
 */
var getClassSelector = function getClassSelector() {
  var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var select = arguments[1];
  var toString = arguments[2];
  var parent = arguments[3];
  var base = arguments[4];

  var _ref3 = maxSubsetSize.find(function (_ref4) {
    var items = _ref4.items;
    return classes.length > items;
  }) || { max: classes.length },
      max = _ref3.max;

  var result = combinations(classes, { max: max });

  for (var i = 0; i < result.length; i++) {
    var pattern = toString.pattern(_extends({}, base, { classes: result[i] }));
    var matches = select(pattern, parent);
    if (matches.length === 1) {
      return result[i];
    }
  }

  return null;
};

/**
 * Lookup attribute identifier
 *
 * @param  {Array.<string>} priority  - [description]
 * @param  {HTMLElement}    element   - [description]
 * @param  {Object}         ignore    - [description]
 * @param  {function}       select    - [description]
 * @param  {ToStringApi}    toString  - [description]
 * @param  {ParentNode}     parent    - [description]
 * @return {Pattern?}                 - [description]
 */
var findAttributesPattern = function findAttributesPattern(priority, element, ignore, select, toString) {
  var parent = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : element.parentNode;

  var attributes = element.attributes;
  var attributeNames = Object.keys(attributes).map(function (val) {
    return attributes[val].name;
  }).filter(function (a) {
    return priority.indexOf(a) < 0;
  });

  var sortedKeys = [].concat(_toConsumableArray(priority), _toConsumableArray(attributeNames));
  var pattern = (0, _pattern.createPattern)();
  pattern.tag = element.tagName.toLowerCase();

  var isOptimal = function isOptimal(pattern) {
    return select(toString.pattern(pattern), parent).length === 1;
  };

  for (var i = 0, l = sortedKeys.length; i < l; i++) {
    var key = sortedKeys[i];
    var attribute = attributes[key];
    var attributeName = (0, _utilities.escapeValue)(attribute && attribute.name);
    var attributeValue = (0, _utilities.escapeValue)(attribute && attribute.value);
    var useNamedIgnore = attributeName !== 'class';

    var currentIgnore = useNamedIgnore && ignore[attributeName] || ignore.attribute;
    var currentDefaultIgnore = useNamedIgnore && defaultIgnore[attributeName] || defaultIgnore.attribute;
    if (checkIgnore(currentIgnore, attributeName, attributeValue, currentDefaultIgnore)) {
      continue;
    }

    switch (attributeName) {
      case 'class':
        {
          var _ret = function () {
            var classNames = attributeValue.trim().split(/\s+/g);
            if (!classNames[0]) {
              // empty string
              return 'break';
            }
            var classIgnore = ignore.class || defaultIgnore.class;
            if (classIgnore) {
              classNames = classNames.filter(function (className) {
                return !classIgnore(className);
              });
            }
            if (classNames.length > 0) {
              var classes = getClassSelector(classNames, select, toString, parent, pattern);
              if (classes) {
                pattern.classes = classes;
                if (isOptimal(pattern)) {
                  return {
                    v: pattern
                  };
                }
              }
            }
          }();

          switch (_ret) {
            case 'break':
              break;

            default:
              if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
          }
        }
        break;

      default:
        pattern.attributes.push({ name: attributeName, value: attributeValue });
        if (isOptimal(pattern)) {
          return pattern;
        }
    }
  }

  return null;
};

/**
 * Extend path with tag identifier
 *
 * @param  {HTMLElement}     element - [description]
 * @param  {Options}         options  - [description]
 * @param  {Array.<Pattern>} path    - [description]
 * @param  {function}        select  - [description]
 * @param  {ToStringApi}     toString - [description]
 * @param  {HTMLElement}     parent  - [description]
 * @return {boolean}                 - [description]
 */
var checkTag = function checkTag(element, path, _ref5, select, toString) {
  var ignore = _ref5.ignore;
  var parent = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : element.parentNode;

  var pattern = findTagPattern(element, ignore);
  if (pattern) {
    var matches = [];
    matches = select(toString.pattern(pattern), parent);
    if (matches.length === 1) {
      path.unshift(pattern);
      if (pattern.tag === 'iframe') {
        return false;
      }
      return true;
    }
  }
  return false;
};

/**
 * Lookup tag identifier
 *
 * @param  {HTMLElement} element - [description]
 * @param  {Object}      ignore  - [description]
 * @return {Pattern?}            - [description]
 */
var findTagPattern = function findTagPattern(element, ignore) {
  var tagName = element.tagName.toLowerCase();
  if (checkIgnore(ignore.tag, null, tagName)) {
    return null;
  }
  var pattern = (0, _pattern.createPattern)();
  pattern.tag = tagName;
  return pattern;
};

/**
 * Extend path with specific child identifier
 *
 * @param  {HTMLElement}     element - [description]
 * @param  {Options}         options - [description]
 * @param  {Array.<Pattern>} path    - [description]
 * @return {boolean}                 - [description]
 */
var checkNthChild = function checkNthChild(element, path, _ref6) {
  var ignore = _ref6.ignore;

  var parent = element.parentNode;
  var children = parent.children;
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    if (child === element) {
      var childPattern = findTagPattern(child, ignore);
      if (!childPattern) {
        return console.warn('\n          Element couldn\'t be matched through strict ignore pattern!\n        ', child, ignore, childPattern);
      }
      childPattern.relates = 'child';
      childPattern.pseudo = ['nth-child(' + (i + 1) + ')'];
      path.unshift(childPattern);
      return true;
    }
  }
  return false;
};

/**
 * Extend path with contains
 *
 * @param  {HTMLElement}     element  - [description]
 * @param  {Array.<Pattern>} path     - [description]
 * @param  {Options}         options  - [description]
 * @param  {function}        select   - [description]
 * @param  {ToStringApi}     toString - [description]
 * @param  {boolean}         nested   - [description]
 * @return {boolean}                  - [description]
 */
var checkText = function checkText(element, path, _ref7, select, toString, nested) {
  var ignore = _ref7.ignore;

  var pattern = findTagPattern(element, ignore);
  if (!pattern) {
    return false;
  }
  var textContent = nested ? element.textContent : element.firstChild && element.firstChild.nodeValue || '';
  if (!textContent) {
    return false;
  }

  pattern.relates = 'child';
  var parent = element.parentNode;
  var texts = textContent.replace(/\n+/g, '\n').split('\n').map(function (text) {
    return text.trim();
  }).filter(function (text) {
    return text.length > 0;
  });

  var contains = [];

  while (texts.length > 0) {
    var text = texts.shift();
    if (checkIgnore(ignore.contains, null, text, defaultIgnore.contains)) {
      break;
    }
    contains.push('contains("' + text + '")');

    var matches = select(toString.pattern(_extends({}, pattern, { pseudo: contains })), parent);
    if (matches.length === 1) {
      pattern.pseudo = contains;
      path.unshift(pattern);
      return true;
    }
    if (matches.length === 0) {
      return false;
    }
  }
  return false;
};

/**
 * Extend path with descendant tag
 *
 * @param  {HTMLElement}     element  - [description]
 * @param  {Array.<Pattern>} path     - [description]
 * @param  {Options}         options  - [description]
 * @param  {function}        select   - [description]
 * @param  {ToStringApi}     toString - [description]
 * @return {boolean}                  - [description]
 */
var checkRecursiveDescendants = function checkRecursiveDescendants(element, path, options, select, toString) {
  var pattern = findTagPattern(element, options.ignore);
  if (!pattern) {
    return false;
  }

  var descendants = Array.from(element.querySelectorAll('*'));
  while (descendants.length > 0) {
    var descendantPath = match(descendants.shift(), _extends({}, options, { root: element }), true);
    // avoid descendant selectors with nth-child
    if (!descendantPath.some(function (pattern) {
      return pattern.pseudo.some(function (p) {
        return p.startsWith('nth-child');
      });
    })) {
      var parent = element.parentElement;
      var matches = select(toString.pattern(_extends({}, pattern, { descendants: [descendantPath] })), parent);
      if (matches.length === 1) {
        pattern.descendants = [descendantPath];
        path.unshift(pattern);
        return true;
      }
    }
  }

  return false;
};

/**
 * Lookup identifier
 *
 * @param  {HTMLElement}    element  - [description]
 * @param  {Options}        options   - [description]
 * @param  {function}       select   - [description]
 * @param  {ToStringApi}    toString - [description]
 * @return {Pattern}                 - [description]
 */
var findPattern = function findPattern(element, _ref8, select, toString) {
  var priority = _ref8.priority,
      ignore = _ref8.ignore;

  var pattern = findAttributesPattern(priority, element, ignore, select, toString);
  if (!pattern) {
    pattern = findTagPattern(element, ignore);
  }
  return pattern;
};

/**
 * Validate with custom and default functions
 *
 * @param  {Function} predicate        - [description]
 * @param  {string?}  name             - [description]
 * @param  {string}   value            - [description]
 * @param  {Function} defaultPredicate - [description]
 * @return {boolean}                   - [description]
 */
var checkIgnore = function checkIgnore(predicate, name, value, defaultPredicate) {
  if (!value) {
    return true;
  }
  var check = predicate || defaultPredicate;
  if (!check) {
    return false;
  }
  return check(name, value, defaultPredicate);
};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareResults = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = optimize;

var _selector = __webpack_require__(2);

var _pattern2 = __webpack_require__(1);

var _utilities = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * # Optimize
                                                                                                                                                                                                     *
                                                                                                                                                                                                     * 1.) Improve efficiency through shorter selectors by removing redundancy
                                                                                                                                                                                                     * 2.) Improve robustness through selector transformation
                                                                                                                                                                                                     */

/**
 * @typedef {import('./select').Options} Options
 * @typedef {import('./pattern').Pattern} Pattern
 * @typedef {import('./pattern').ToStringApi} Pattern
 */

/**
 * Apply different optimization techniques
 *
 * @param  {Array.<Pattern>}                 path   - [description]
 * @param  {HTMLElement|Array.<HTMLElement>} element    - [description]
 * @param  {Options}                         [options]  - [description]
 * @return {Array.<Pattern>}                            - [description]
 */
function optimize(path, elements) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (path.length === 0) {
    return [];
  }

  if (path[0].relates === 'child') {
    path[0].relates = undefined;
  }

  // convert single entry and NodeList
  if (!Array.isArray(elements)) {
    elements = !elements.length ? [elements] : (0, _utilities.convertNodeList)(elements);
  }

  if (!elements.length || elements.some(function (element) {
    return element.nodeType !== 1;
  })) {
    throw new Error('Invalid input - to compare HTMLElements its necessary to provide a reference of the selected node(s)! (missing "elements")');
  }

  var select = (0, _selector.getSelect)(options);
  var toString = (0, _pattern2.getToString)(options);

  if (path.length === 1) {
    return [optimizePart([], path[0], [], elements, select, toString)];
  }

  var endOptimized = false;
  if (path[path.length - 1].relates === 'child') {
    path[path.length - 1] = optimizePart(path.slice(0, -1), path[path.length - 1], [], elements, select, toString);
    endOptimized = true;
  }

  path = [].concat(_toConsumableArray(path));
  var shortened = [path.pop()];

  var _loop = function _loop() {
    var current = path.pop();
    var matches = select(toString.path([].concat(_toConsumableArray(path), shortened)));
    var hasSameResult = matches.length === elements.length && elements.every(function (element, i) {
      return element === matches[i];
    });
    if (!hasSameResult) {
      shortened.unshift(optimizePart(path, current, shortened, elements, select, toString));
    }
  };

  while (path.length > 1) {
    _loop();
  }
  shortened.unshift(path[0]);
  path = shortened;

  // optimize start + end
  path[0] = optimizePart([], path[0], path.slice(1), elements, select, toString);
  if (!endOptimized) {
    path[path.length - 1] = optimizePart(path.slice(0, -1), path[path.length - 1], [], elements, select, toString);
  }

  return path;
}

/**
 * Optimize :contains
 *
 * @param  {Array.<Pattern>}     pre      - [description]
 * @param  {Pattern}             current  - [description]
 * @param  {Array.<Pattern>}     post     - [description]
 * @param  {Array.<HTMLElement>} elements - [description]
 * @param  {function}            select   - [description]
 * @param  {ToStringApi}         toString - [description]
 * @return {Pattern}                      - [description]
 */
var optimizeText = function optimizeText(pre, current, post, elements, select, toString) {
  var _partition = (0, _utilities.partition)(current.pseudo, function (item) {
    return item.startsWith('contains');
  }),
      _partition2 = _slicedToArray(_partition, 2),
      contains = _partition2[0],
      other = _partition2[1];

  if (contains.length > 0 && post.length) {
    var base = _extends({}, current, { pseudo: [].concat(_toConsumableArray(other), _toConsumableArray(contains)) });
    while (base.pseudo.length > other.length) {
      var optimized = base.pseudo.slice(0, -1);
      if (!compareResults(select(toString.path([].concat(_toConsumableArray(pre), [_extends({}, base, { pseudo: optimized })], _toConsumableArray(post)))), elements)) {
        break;
      }
      base.pseudo = optimized;
    }
    return base;
  }
  return current;
};

/**
 * Optimize attributes
 *
 * @param  {Array.<Pattern>}     pre      - [description]
 * @param  {Pattern}             current  - [description]
 * @param  {Array.<Pattern>}     post     - [description]
 * @param  {Array.<HTMLElement>} elements - [description]
 * @param  {function}            select   - [description]
 * @param  {ToStringApi}         toString - [description]
 * @return {Pattern}                      - [description]
 */
var optimizeAttributes = function optimizeAttributes(pre, current, post, elements, select, toString) {
  // reduce attributes: first try without value, then removing completely
  if (current.attributes.length > 0) {
    var attributes = [].concat(_toConsumableArray(current.attributes));

    var simplify = function simplify(original, getSimplified) {
      var i = original.length - 1;
      while (i >= 0) {
        var _attributes = getSimplified(original, i);
        if (!compareResults(select(toString.path([].concat(_toConsumableArray(pre), [_extends({}, current, { attributes: _attributes })], _toConsumableArray(post)))), elements)) {
          break;
        }
        i--;
        original = _attributes;
      }
      return original;
    };

    var simplified = simplify(attributes, function (attributes, i) {
      var name = attributes[i].name;

      if (name === 'id') {
        return attributes;
      }
      return [].concat(_toConsumableArray(attributes.slice(0, i)), [{ name: name, value: null }], _toConsumableArray(attributes.slice(i + 1)));
    });
    return _extends({}, current, { attributes: simplify(simplified, function (attributes) {
        return attributes.slice(0, -1);
      }) });
  }
  return current;
};

/**
 * Optimize descendant
 *
 * @param  {Array.<Pattern>}     pre      - [description]
 * @param  {Pattern}             current  - [description]
 * @param  {Array.<Pattern>}     post     - [description]
 * @param  {Array.<HTMLElement>} elements - [description]
 * @param  {function}            select   - [description]
 * @param  {ToStringApi}         toString - [description]
 * @return {Pattern}                      - [description]
 */
var optimizeDescendant = function optimizeDescendant(pre, current, post, elements, select, toString) {
  // robustness: descendant instead child (heuristic)
  if (current.relates === 'child') {
    var descendant = _extends({}, current, { relates: undefined });
    var _matches = select(toString.path([].concat(_toConsumableArray(pre), [descendant], _toConsumableArray(post))));
    if (compareResults(_matches, elements)) {
      return descendant;
    }
  }
  return current;
};

/**
 * Optimize recursive descendants
 * 
 * @param  {Array.<Pattern>}     pre      - [description]
 * @param  {Pattern}             current  - [description]
 * @param  {Array.<Pattern>}     post     - [description]
 * @param  {Array.<HTMLElement>} elements - [description]
 * @param  {function}            select   - [description]
 * @param  {ToStringApi}         toString - [description]
 * @return {Pattern}                      - [description]
 */
var optimizeRecursiveDescendants = function optimizeRecursiveDescendants(pre, current, post, elements, select, toString) {
  if (current.descendants.length > 0 && post.length) {
    var base = _extends({}, current, { descendants: [].concat(_toConsumableArray(current.descendants)) });
    while (base.descendants.length > 0) {
      var optimized = base.descendants.slice(0, -1);
      if (!compareResults(select(toString.path([].concat(_toConsumableArray(pre), [_extends({}, base, { descendants: optimized })], _toConsumableArray(post)))), elements)) {
        break;
      }
      base.descendants = optimized;
    }
    return base;
  }
  return current;
};

/**
 * Optimize nth of type
 *
 * @param  {Array.<Pattern>}     pre      - [description]
 * @param  {Pattern}             current  - [description]
 * @param  {Array.<Pattern>}     post     - [description]
 * @param  {Array.<HTMLElement>} elements - [description]
 * @param  {function}            select   - [description]
 * @param  {ToStringApi}         toString - [description]
 * @return {Pattern}                      - [description]
 */
var optimizeNthOfType = function optimizeNthOfType(pre, current, post, elements, select, toString) {
  var i = current.pseudo.findIndex(function (item) {
    return item.startsWith('nth-child');
  });
  // robustness: 'nth-of-type' instead 'nth-child' (heuristic)
  if (i >= 0) {
    // TODO: consider complete coverage of 'nth-of-type' replacement
    var type = current.pseudo[i].replace(/^nth-child/, 'nth-of-type');
    var nthOfType = _extends({}, current, { pseudo: [].concat(_toConsumableArray(current.pseudo.slice(0, i)), [type], _toConsumableArray(current.pseudo.slice(i + 1))) });
    var pattern = toString.path([].concat(_toConsumableArray(pre), [nthOfType], _toConsumableArray(post)));
    var _matches2 = select(pattern);
    if (compareResults(_matches2, elements)) {
      return nthOfType;
    }
  }
  return current;
};

/**
 * Optimize classes
 *
 * @param  {Array.<Pattern>}     pre      - [description]
 * @param  {Pattern}             current  - [description]
 * @param  {Array.<Pattern>}     post     - [description]
 * @param  {Array.<HTMLElement>} elements - [description]
 * @param  {function}            select   - [description]
 * @param  {ToStringApi}         toString - [description]
 * @return {Pattern}                      - [description]
 */
var optimizeClasses = function optimizeClasses(pre, current, post, elements, select, toString) {
  // efficiency: combinations of classname (partial permutations)
  if (current.classes.length > 1) {
    var optimized = current.classes.slice().sort(function (curr, next) {
      return curr.length - next.length;
    });

    while (optimized.length > 1) {
      optimized.shift();
      var _pattern = toString.path([].concat(_toConsumableArray(pre), [_extends({}, current, { classes: optimized })], _toConsumableArray(post)));
      if (!compareResults(select(_pattern), elements)) {
        break;
      }
      current.classes = optimized;
    }

    optimized = current.classes;

    if (optimized.length > 2) {
      var base = (0, _pattern2.createPattern)({ classes: optimized });
      var references = select(toString.path([].concat(_toConsumableArray(pre), [base])));

      var _loop2 = function _loop2() {
        var reference = references[i];
        if (elements.some(function (element) {
          return reference.contains(element);
        })) {
          // TODO:
          // - check using attributes + regard excludes
          var description = (0, _pattern2.createPattern)({ tag: reference.tagName });
          pattern = toString.path([].concat(_toConsumableArray(pre), [description], _toConsumableArray(post)));
          matches = select(pattern);

          if (compareResults(matches, elements)) {
            current = description;
          }
          return 'break';
        }
      };

      for (var i = 0; i < references.length; i++) {
        var pattern;
        var matches;

        var _ret2 = _loop2();

        if (_ret2 === 'break') break;
      }
    }
  }
  return current;
};

var optimizers = [optimizeText, optimizeAttributes, optimizeDescendant, optimizeRecursiveDescendants, optimizeNthOfType, optimizeClasses];

/**
 * Improve a chunk of the selector
 *
 * @param  {Array.<Pattern>}     pre      - [description]
 * @param  {Pattern}             current  - [description]
 * @param  {Array.<Pattern>}     post     - [description]
 * @param  {Array.<HTMLElement>} elements - [description]
 * @param  {function}            select   - [description]
 * @param  {ToStringApi}         toString - [description]
 * @return {Pattern}                      - [description]
 */
var optimizePart = function optimizePart(pre, current, post, elements, select, toString) {
  return optimizers.reduce(function (acc, optimizer) {
    return optimizer(pre, acc, post, elements, select, toString);
  }, current);
};

/**
 * Evaluate matches with expected elements
 *
 * @param  {Array.<HTMLElement>} matches  - [description]
 * @param  {Array.<HTMLElement>} elements - [description]
 * @return {Boolean}                      - [description]
 */
var compareResults = exports.compareResults = function compareResults(matches, elements) {
  var length = matches.length;

  return length === elements.length && elements.every(function (element) {
    for (var i = 0; i < length; i++) {
      if (matches[i] === element) {
        return true;
      }
    }
    return false;
  });
};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMultiSelectorPath = exports.getSingleSelectorPath = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * # Select
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * Construct a unique CSS query selector to access the selected DOM element(s).
                                                                                                                                                                                                                                                                               * For longevity it applies different matching and optimization strategies.
                                                                                                                                                                                                                                                                               */


exports.default = getQuerySelector;

var _match = __webpack_require__(4);

var _match2 = _interopRequireDefault(_match);

var _optimize = __webpack_require__(5);

var _optimize2 = _interopRequireDefault(_optimize);

var _utilities = __webpack_require__(0);

var _common = __webpack_require__(3);

var _selector = __webpack_require__(2);

var _pattern = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @typedef  {Object} Options
 * @property {HTMLElement} [root]                     Optionally specify the root element
 * @property {function | Array.<HTMLElement>} [skip]  Specify elements to skip
 * @property {Array.<string>} [priority]              Order of attribute processing
 * @property {Object<string, function | number | string | boolean} [ignore] Define patterns which shouldn't be included
 * @property {('css'|'xpath'|'jquery')} [format]      Output format    
 */

/**
 * @typedef {import('./pattern').Pattern} Pattern
 */

/**
 * Get a selector for the provided element
 *
 * @param  {HTMLElement} element   - [description]
 * @param  {Options}     [options] - [description]
 * @return {Array.<Pattern>}       - [description]
 */
var getSingleSelectorPath = exports.getSingleSelectorPath = function getSingleSelectorPath(element) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


  if (element.nodeType === 3) {
    element = element.parentNode;
  }

  if (element.nodeType !== 1) {
    throw new Error('Invalid input - only HTMLElements or representations of them are supported! (not "' + (typeof element === 'undefined' ? 'undefined' : _typeof(element)) + '")');
  }

  var path = (0, _match2.default)(element, options);
  var optimizedPath = (0, _optimize2.default)(path, element, options);

  // debug
  // console.log(`
  //   selector:  ${path}
  //   optimized: ${optimizedPath}
  // `)

  return optimizedPath;
};

/**
 * Get a selector to match multiple descendants from an ancestor
 *
 * @param  {Array.<HTMLElement>|NodeList} elements   - [description]
 * @param  {Options}                      [options]  - [description]
 * @return {Array.<Pattern>}                         - [description]
 */
var getMultiSelectorPath = exports.getMultiSelectorPath = function getMultiSelectorPath(elements) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


  if (!Array.isArray(elements)) {
    elements = (0, _utilities.convertNodeList)(elements);
  }

  if (elements.some(function (element) {
    return element.nodeType !== 1;
  })) {
    throw new Error('Invalid input - only an Array of HTMLElements or representations of them is supported!');
  }

  var select = (0, _selector.getSelect)(options);
  var toString = (0, _pattern.getToString)(options);

  var ancestor = (0, _common.getCommonAncestor)(elements, options);
  var ancestorPath = (0, _match2.default)(ancestor, options);

  // TODO: consider usage of multiple selectors + parent-child relation + check for part redundancy
  var commonPath = getCommonPath(elements, options);
  var descendantPattern = commonPath[0];

  var selectorPath = (0, _optimize2.default)([].concat(_toConsumableArray(ancestorPath), [descendantPattern]), elements, options);
  var selectorMatches = (0, _utilities.convertNodeList)(select(toString.path(selectorPath)));

  if (!elements.every(function (element) {
    return selectorMatches.some(function (entry) {
      return entry === element;
    });
  })) {
    // TODO: cluster matches to split into similar groups for sub selections
    console.warn('\n      The selected elements can\'t be efficiently mapped.\n      Its probably best to use multiple single selectors instead!\n    ');
    return elements;
  }

  return selectorPath;
};

/**
 * Get selectors to describe a set of elements
 *
 * @param  {Array.<HTMLElement>} elements  - [description]
 * @return {Array.<Pattern>}               - [description]
 */
var getCommonPath = function getCommonPath(elements, options) {
  var _getCommonProperties = (0, _common.getCommonProperties)(elements, options),
      classes = _getCommonProperties.classes,
      attributes = _getCommonProperties.attributes,
      tag = _getCommonProperties.tag;

  return [(0, _pattern.createPattern)({
    tag: tag,
    classes: classes || [],
    attributes: attributes ? Object.keys(attributes).map(function (name) {
      return {
        name: (0, _utilities.escapeValue)(name),
        value: (0, _utilities.escapeValue)(attributes[name])
      };
    }) : []
  })];
};

/**
 * Choose action depending on the input (multiple/single)
 *
 * NOTE: extended detection is used for special cases like the <select> element with <options>
 *
 * @param  {HTMLElement|NodeList|Array.<HTMLElement>} input     - [description]
 * @param  {Options}                                  [options] - [description]
 * @return {string}                                             - [description]
 */
function getQuerySelector(input) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var path = input.length && !input.name ? getMultiSelectorPath(input, options) : getSingleSelectorPath(input, options);

  if (Array.isArray(path) && path.length > 0 && path[0] instanceof HTMLElement) {
    return path.map(function (entry) {
      return getQuerySelector(entry, options);
    }).join(',');
  }
  return (0, _pattern.getToString)(options).path(path);
}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/*!
 * Sizzle CSS Selector Engine v2.3.6
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2021-02-16
 */
(function (window) {
	var i,
	    support,
	    Expr,
	    getText,
	    isXML,
	    tokenize,
	    compile,
	    select,
	    outermostContext,
	    sortInput,
	    hasDuplicate,


	// Local document vars
	setDocument,
	    document,
	    docElem,
	    documentIsHTML,
	    rbuggyQSA,
	    rbuggyMatches,
	    matches,
	    contains,


	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	    preferredDoc = window.document,
	    dirruns = 0,
	    done = 0,
	    classCache = createCache(),
	    tokenCache = createCache(),
	    compilerCache = createCache(),
	    nonnativeSelectorCache = createCache(),
	    sortOrder = function sortOrder(a, b) {
		if (a === b) {
			hasDuplicate = true;
		}
		return 0;
	},


	// Instance methods
	hasOwn = {}.hasOwnProperty,
	    arr = [],
	    pop = arr.pop,
	    pushNative = arr.push,
	    push = arr.push,
	    slice = arr.slice,


	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function indexOf(list, elem) {
		var i = 0,
		    len = list.length;
		for (; i < len; i++) {
			if (list[i] === elem) {
				return i;
			}
		}
		return -1;
	},
	    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" + "ismap|loop|multiple|open|readonly|required|scoped",


	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",


	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",


	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

	// Operator (capture 2)
	"*([*^$|!~]?=)" + whitespace +

	// "Attribute values must be CSS identifiers [capture 5]
	// or strings [capture 3 or capture 4]"
	"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
	    pseudos = ":(" + identifier + ")(?:\\((" +

	// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
	// 1. quoted (capture 3; capture 4 or capture 5)
	"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

	// 2. simple (capture 6)
	"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

	// 3. anything else (capture 2)
	".*" + ")\\)|)",


	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp(whitespace + "+", "g"),
	    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
	    rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
	    rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
	    rdescend = new RegExp(whitespace + "|>"),
	    rpseudo = new RegExp(pseudos),
	    ridentifier = new RegExp("^" + identifier + "$"),
	    matchExpr = {
		"ID": new RegExp("^#(" + identifier + ")"),
		"CLASS": new RegExp("^\\.(" + identifier + ")"),
		"TAG": new RegExp("^(" + identifier + "|[*])"),
		"ATTR": new RegExp("^" + attributes),
		"PSEUDO": new RegExp("^" + pseudos),
		"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
		"bool": new RegExp("^(?:" + booleans + ")$", "i"),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
	},
	    rhtml = /HTML$/i,
	    rinputs = /^(?:input|select|textarea|button)$/i,
	    rheader = /^h\d$/i,
	    rnative = /^[^{]+\{\s*\[native \w/,


	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	    rsibling = /[+~]/,


	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"),
	    funescape = function funescape(escape, nonHex) {
		var high = "0x" + escape.slice(1) - 0x10000;

		return nonHex ?

		// Strip the backslash prefix from a non-hex escape sequence
		nonHex :

		// Replace a hexadecimal escape sequence with the encoded Unicode code point
		// Support: IE <=11+
		// For values outside the Basic Multilingual Plane (BMP), manually construct a
		// surrogate pair
		high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
	},


	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	    fcssescape = function fcssescape(ch, asCodePoint) {
		if (asCodePoint) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if (ch === "\0") {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},


	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function unloadHandler() {
		setDocument();
	},
	    inDisabledFieldset = addCombinator(function (elem) {
		return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
	}, { dir: "parentNode", next: "legend" });

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);

		// Support: Android<4.0
		// Detect silently failing push.apply
		// eslint-disable-next-line no-unused-expressions
		arr[preferredDoc.childNodes.length].nodeType;
	} catch (e) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function (target, els) {
				pushNative.apply(target, slice.call(els));
			} :

			// Support: IE<9
			// Otherwise append directly
			function (target, els) {
				var j = target.length,
				    i = 0;

				// Can't trust NodeList.length
				while (target[j++] = els[i++]) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle(selector, context, results, seed) {
		var m,
		    i,
		    elem,
		    nid,
		    match,
		    groups,
		    newSelector,
		    newContext = context && context.ownerDocument,


		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

		results = results || [];

		// Return early from calls with invalid selector or context
		if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

			return results;
		}

		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if (!seed) {
			setDocument(context);
			context = context || document;

			if (documentIsHTML) {

				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

					// ID selector
					if (m = match[1]) {

						// Document context
						if (nodeType === 9) {
							if (elem = context.getElementById(m)) {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if (elem.id === m) {
									results.push(elem);
									return results;
								}
							} else {
								return results;
							}

							// Element context
						} else {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {

								results.push(elem);
								return results;
							}
						}

						// Type selector
					} else if (match[2]) {
						push.apply(results, context.getElementsByTagName(selector));
						return results;

						// Class selector
					} else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {

						push.apply(results, context.getElementsByClassName(m));
						return results;
					}
				}

				// Take advantage of querySelectorAll
				if (support.qsa && !nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector)) && (

				// Support: IE 8 only
				// Exclude object elements
				nodeType !== 1 || context.nodeName.toLowerCase() !== "object")) {

					newSelector = selector;
					newContext = context;

					// qSA considers elements outside a scoping root when evaluating child or
					// descendant combinators, which is not what we want.
					// In such cases, we work around the behavior by prefixing every selector in the
					// list with an ID selector referencing the scope context.
					// The technique has to be used as well when a leading combinator is used
					// as such selectors are not recognized by querySelectorAll.
					// Thanks to Andrew Dupont for this technique.
					if (nodeType === 1 && (rdescend.test(selector) || rcombinators.test(selector))) {

						// Expand context for sibling selectors
						newContext = rsibling.test(selector) && testContext(context.parentNode) || context;

						// We can use :scope instead of the ID hack if the browser
						// supports it & if we're not changing the context.
						if (newContext !== context || !support.scope) {

							// Capture the context ID, setting it first if necessary
							if (nid = context.getAttribute("id")) {
								nid = nid.replace(rcssescape, fcssescape);
							} else {
								context.setAttribute("id", nid = expando);
							}
						}

						// Prefix every selector in the list
						groups = tokenize(selector);
						i = groups.length;
						while (i--) {
							groups[i] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i]);
						}
						newSelector = groups.join(",");
					}

					try {
						push.apply(results, newContext.querySelectorAll(newSelector));
						return results;
					} catch (qsaError) {
						nonnativeSelectorCache(selector, true);
					} finally {
						if (nid === expando) {
							context.removeAttribute("id");
						}
					}
				}
			}
		}

		// All others
		return select(selector.replace(rtrim, "$1"), context, results, seed);
	}

	/**
  * Create key-value caches of limited size
  * @returns {function(string, object)} Returns the Object data after storing it on itself with
  *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
  *	deleting the oldest entry
  */
	function createCache() {
		var keys = [];

		function cache(key, value) {

			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if (keys.push(key + " ") > Expr.cacheLength) {

				// Only keep the most recent entries
				delete cache[keys.shift()];
			}
			return cache[key + " "] = value;
		}
		return cache;
	}

	/**
  * Mark a function for special use by Sizzle
  * @param {Function} fn The function to mark
  */
	function markFunction(fn) {
		fn[expando] = true;
		return fn;
	}

	/**
  * Support testing using an element
  * @param {Function} fn Passed the created element and returns a boolean result
  */
	function assert(fn) {
		var el = document.createElement("fieldset");

		try {
			return !!fn(el);
		} catch (e) {
			return false;
		} finally {

			// Remove from its parent by default
			if (el.parentNode) {
				el.parentNode.removeChild(el);
			}

			// release memory in IE
			el = null;
		}
	}

	/**
  * Adds the same handler for all of the specified attrs
  * @param {String} attrs Pipe-separated list of attributes
  * @param {Function} handler The method that will be applied
  */
	function addHandle(attrs, handler) {
		var arr = attrs.split("|"),
		    i = arr.length;

		while (i--) {
			Expr.attrHandle[arr[i]] = handler;
		}
	}

	/**
  * Checks document order of two siblings
  * @param {Element} a
  * @param {Element} b
  * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
  */
	function siblingCheck(a, b) {
		var cur = b && a,
		    diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;

		// Use IE sourceIndex if available on both nodes
		if (diff) {
			return diff;
		}

		// Check if b follows a
		if (cur) {
			while (cur = cur.nextSibling) {
				if (cur === b) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
  * Returns a function to use in pseudos for input types
  * @param {String} type
  */
	function createInputPseudo(type) {
		return function (elem) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
  * Returns a function to use in pseudos for buttons
  * @param {String} type
  */
	function createButtonPseudo(type) {
		return function (elem) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
  * Returns a function to use in pseudos for :enabled/:disabled
  * @param {Boolean} disabled true for :disabled; false for :enabled
  */
	function createDisabledPseudo(disabled) {

		// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
		return function (elem) {

			// Only certain elements can match :enabled or :disabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
			if ("form" in elem) {

				// Check for inherited disabledness on relevant non-disabled elements:
				// * listed form-associated elements in a disabled fieldset
				//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
				// * option elements in a disabled optgroup
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
				// All such elements have a "form" property.
				if (elem.parentNode && elem.disabled === false) {

					// Option elements defer to a parent optgroup if present
					if ("label" in elem) {
						if ("label" in elem.parentNode) {
							return elem.parentNode.disabled === disabled;
						} else {
							return elem.disabled === disabled;
						}
					}

					// Support: IE 6 - 11
					// Use the isDisabled shortcut property to check for disabled fieldset ancestors
					return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
				}

				return elem.disabled === disabled;

				// Try to winnow out elements that can't be disabled before trusting the disabled property.
				// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
				// even exist on them, let alone have a boolean value.
			} else if ("label" in elem) {
				return elem.disabled === disabled;
			}

			// Remaining elements are neither :enabled nor :disabled
			return false;
		};
	}

	/**
  * Returns a function to use in pseudos for positionals
  * @param {Function} fn
  */
	function createPositionalPseudo(fn) {
		return markFunction(function (argument) {
			argument = +argument;
			return markFunction(function (seed, matches) {
				var j,
				    matchIndexes = fn([], seed.length, argument),
				    i = matchIndexes.length;

				// Match elements found at the specified indexes
				while (i--) {
					if (seed[j = matchIndexes[i]]) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
  * Checks a node for validity as a Sizzle context
  * @param {Element|Object=} context
  * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
  */
	function testContext(context) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
  * Detects XML nodes
  * @param {Element|Object} elem An element or a document
  * @returns {Boolean} True iff elem is a non-HTML XML node
  */
	isXML = Sizzle.isXML = function (elem) {
		var namespace = elem && elem.namespaceURI,
		    docElem = elem && (elem.ownerDocument || elem).documentElement;

		// Support: IE <=8
		// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
		// https://bugs.jquery.com/ticket/4833
		return !rhtml.test(namespace || docElem && docElem.nodeName || "HTML");
	};

	/**
  * Sets document-related variables once based on the current document
  * @param {Element|Object} [doc] An element or document object to use to set the document
  * @returns {Object} Returns the current document
  */
	setDocument = Sizzle.setDocument = function (node) {
		var hasCompare,
		    subWindow,
		    doc = node ? node.ownerDocument || node : preferredDoc;

		// Return early if doc is invalid or already selected
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		if (doc == document || doc.nodeType !== 9 || !doc.documentElement) {
			return document;
		}

		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML(document);

		// Support: IE 9 - 11+, Edge 12 - 18+
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		if (preferredDoc != document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {

			// Support: IE 11, Edge
			if (subWindow.addEventListener) {
				subWindow.addEventListener("unload", unloadHandler, false);

				// Support: IE 9 - 10 only
			} else if (subWindow.attachEvent) {
				subWindow.attachEvent("onunload", unloadHandler);
			}
		}

		// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
		// Safari 4 - 5 only, Opera <=11.6 - 12.x only
		// IE/Edge & older browsers don't support the :scope pseudo-class.
		// Support: Safari 6.0 only
		// Safari 6.0 supports :scope but it's an alias of :root there.
		support.scope = assert(function (el) {
			docElem.appendChild(el).appendChild(document.createElement("div"));
			return typeof el.querySelectorAll !== "undefined" && !el.querySelectorAll(":scope fieldset div").length;
		});

		/* Attributes
  ---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function (el) {
			el.className = "i";
			return !el.getAttribute("className");
		});

		/* getElement(s)By*
  ---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function (el) {
			el.appendChild(document.createComment(""));
			return !el.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test(document.getElementsByClassName);

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programmatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function (el) {
			docElem.appendChild(el).id = expando;
			return !document.getElementsByName || !document.getElementsByName(expando).length;
		});

		// ID filter and find
		if (support.getById) {
			Expr.filter["ID"] = function (id) {
				var attrId = id.replace(runescape, funescape);
				return function (elem) {
					return elem.getAttribute("id") === attrId;
				};
			};
			Expr.find["ID"] = function (id, context) {
				if (typeof context.getElementById !== "undefined" && documentIsHTML) {
					var elem = context.getElementById(id);
					return elem ? [elem] : [];
				}
			};
		} else {
			Expr.filter["ID"] = function (id) {
				var attrId = id.replace(runescape, funescape);
				return function (elem) {
					var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};

			// Support: IE 6 - 7 only
			// getElementById is not reliable as a find shortcut
			Expr.find["ID"] = function (id, context) {
				if (typeof context.getElementById !== "undefined" && documentIsHTML) {
					var node,
					    i,
					    elems,
					    elem = context.getElementById(id);

					if (elem) {

						// Verify the id attribute
						node = elem.getAttributeNode("id");
						if (node && node.value === id) {
							return [elem];
						}

						// Fall back on getElementsByName
						elems = context.getElementsByName(id);
						i = 0;
						while (elem = elems[i++]) {
							node = elem.getAttributeNode("id");
							if (node && node.value === id) {
								return [elem];
							}
						}
					}

					return [];
				}
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
			if (typeof context.getElementsByTagName !== "undefined") {
				return context.getElementsByTagName(tag);

				// DocumentFragment nodes don't have gEBTN
			} else if (support.qsa) {
				return context.querySelectorAll(tag);
			}
		} : function (tag, context) {
			var elem,
			    tmp = [],
			    i = 0,


			// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
			results = context.getElementsByTagName(tag);

			// Filter out possible comments
			if (tag === "*") {
				while (elem = results[i++]) {
					if (elem.nodeType === 1) {
						tmp.push(elem);
					}
				}

				return tmp;
			}
			return results;
		};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
			if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
				return context.getElementsByClassName(className);
			}
		};

		/* QSA/matchesSelector
  ---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See https://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if (support.qsa = rnative.test(document.querySelectorAll)) {

			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function (el) {

				var input;

				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// https://bugs.jquery.com/ticket/12359
				docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if (el.querySelectorAll("[msallowcapture^='']").length) {
					rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if (!el.querySelectorAll("[selected]").length) {
					rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
				}

				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
					rbuggyQSA.push("~=");
				}

				// Support: IE 11+, Edge 15 - 18+
				// IE 11/Edge don't find elements on a `[name='']` query in some cases.
				// Adding a temporary attribute to the document before the selection works
				// around the issue.
				// Interestingly, IE 10 & older don't seem to have the issue.
				input = document.createElement("input");
				input.setAttribute("name", "");
				el.appendChild(input);
				if (!el.querySelectorAll("[name='']").length) {
					rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" + whitespace + "*(?:''|\"\")");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if (!el.querySelectorAll(":checked").length) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibling-combinator selector` fails
				if (!el.querySelectorAll("a#" + expando + "+*").length) {
					rbuggyQSA.push(".#.+[+~]");
				}

				// Support: Firefox <=3.6 - 5 only
				// Old Firefox doesn't throw on a badly-escaped identifier.
				el.querySelectorAll("\\\f");
				rbuggyQSA.push("[\\r\\n\\f]");
			});

			assert(function (el) {
				el.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>";

				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute("type", "hidden");
				el.appendChild(input).setAttribute("name", "D");

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if (el.querySelectorAll("[name=d]").length) {
					rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if (el.querySelectorAll(":enabled").length !== 2) {
					rbuggyQSA.push(":enabled", ":disabled");
				}

				// Support: IE9-11+
				// IE's :disabled selector does not pick up the children of disabled fieldsets
				docElem.appendChild(el).disabled = true;
				if (el.querySelectorAll(":disabled").length !== 2) {
					rbuggyQSA.push(":enabled", ":disabled");
				}

				// Support: Opera 10 - 11 only
				// Opera 10-11 does not throw on post-comma invalid pseudos
				el.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {

			assert(function (el) {

				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call(el, "*");

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call(el, "[s!='']:x");
				rbuggyMatches.push("!=", pseudos);
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
		rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

		/* Contains
  ---------------------------------------------------------------------- */
		hasCompare = rnative.test(docElem.compareDocumentPosition);

		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
			    bup = b && b.parentNode;
			return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
		} : function (a, b) {
			if (b) {
				while (b = b.parentNode) {
					if (b === a) {
						return true;
					}
				}
			}
			return false;
		};

		/* Sorting
  ---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ? function (a, b) {

			// Flag for duplicate removal
			if (a === b) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if (compare) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) :

			// Otherwise we know they are disconnected
			1;

			// Disconnected nodes
			if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {

				// Choose the first element that is related to our preferred document
				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				if (a == document || a.ownerDocument == preferredDoc && contains(preferredDoc, a)) {
					return -1;
				}

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				if (b == document || b.ownerDocument == preferredDoc && contains(preferredDoc, b)) {
					return 1;
				}

				// Maintain original order
				return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
			}

			return compare & 4 ? -1 : 1;
		} : function (a, b) {

			// Exit early if the nodes are identical
			if (a === b) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
			    i = 0,
			    aup = a.parentNode,
			    bup = b.parentNode,
			    ap = [a],
			    bp = [b];

			// Parentless nodes are either documents or disconnected
			if (!aup || !bup) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				/* eslint-disable eqeqeq */
				return a == document ? -1 : b == document ? 1 :
				/* eslint-enable eqeqeq */
				aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;

				// If the nodes are siblings, we can do a quick check
			} else if (aup === bup) {
				return siblingCheck(a, b);
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while (cur = cur.parentNode) {
				ap.unshift(cur);
			}
			cur = b;
			while (cur = cur.parentNode) {
				bp.unshift(cur);
			}

			// Walk down the tree looking for a discrepancy
			while (ap[i] === bp[i]) {
				i++;
			}

			return i ?

			// Do a sibling check if the nodes have a common ancestor
			siblingCheck(ap[i], bp[i]) :

			// Otherwise nodes in our document sort first
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			ap[i] == preferredDoc ? -1 : bp[i] == preferredDoc ? 1 :
			/* eslint-enable eqeqeq */
			0;
		};

		return document;
	};

	Sizzle.matches = function (expr, elements) {
		return Sizzle(expr, null, null, elements);
	};

	Sizzle.matchesSelector = function (elem, expr) {
		setDocument(elem);

		if (support.matchesSelector && documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {

			try {
				var ret = matches.call(elem, expr);

				// IE 9's matchesSelector returns false on disconnected nodes
				if (ret || support.disconnectedMatch ||

				// As well, disconnected nodes are said to be in a document
				// fragment in IE 9
				elem.document && elem.document.nodeType !== 11) {
					return ret;
				}
			} catch (e) {
				nonnativeSelectorCache(expr, true);
			}
		}

		return Sizzle(expr, document, null, [elem]).length > 0;
	};

	Sizzle.contains = function (context, elem) {

		// Set document vars if needed
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		if ((context.ownerDocument || context) != document) {
			setDocument(context);
		}
		return contains(context, elem);
	};

	Sizzle.attr = function (elem, name) {

		// Set document vars if needed
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		if ((elem.ownerDocument || elem) != document) {
			setDocument(elem);
		}

		var fn = Expr.attrHandle[name.toLowerCase()],


		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;

		return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
	};

	Sizzle.escape = function (sel) {
		return (sel + "").replace(rcssescape, fcssescape);
	};

	Sizzle.error = function (msg) {
		throw new Error("Syntax error, unrecognized expression: " + msg);
	};

	/**
  * Document sorting and removing duplicates
  * @param {ArrayLike} results
  */
	Sizzle.uniqueSort = function (results) {
		var elem,
		    duplicates = [],
		    j = 0,
		    i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice(0);
		results.sort(sortOrder);

		if (hasDuplicate) {
			while (elem = results[i++]) {
				if (elem === results[i]) {
					j = duplicates.push(i);
				}
			}
			while (j--) {
				results.splice(duplicates[j], 1);
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
  * Utility function for retrieving the text value of an array of DOM nodes
  * @param {Array|Element} elem
  */
	getText = Sizzle.getText = function (elem) {
		var node,
		    ret = "",
		    i = 0,
		    nodeType = elem.nodeType;

		if (!nodeType) {

			// If no nodeType, this is expected to be an array
			while (node = elem[i++]) {

				// Do not traverse comment nodes
				ret += getText(node);
			}
		} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {

			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if (typeof elem.textContent === "string") {
				return elem.textContent;
			} else {

				// Traverse its children
				for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
					ret += getText(elem);
				}
			}
		} else if (nodeType === 3 || nodeType === 4) {
			return elem.nodeValue;
		}

		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function ATTR(match) {
				match[1] = match[1].replace(runescape, funescape);

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

				if (match[2] === "~=") {
					match[3] = " " + match[3] + " ";
				}

				return match.slice(0, 4);
			},

			"CHILD": function CHILD(match) {

				/* matches from matchExpr["CHILD"]
    	1 type (only|nth|...)
    	2 what (child|of-type)
    	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
    	4 xn-component of xn+y argument ([+-]?\d*n|)
    	5 sign of xn-component
    	6 x of xn-component
    	7 sign of y-component
    	8 y of y-component
    */
				match[1] = match[1].toLowerCase();

				if (match[1].slice(0, 3) === "nth") {

					// nth-* requires argument
					if (!match[3]) {
						Sizzle.error(match[0]);
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
					match[5] = +(match[7] + match[8] || match[3] === "odd");

					// other types prohibit arguments
				} else if (match[3]) {
					Sizzle.error(match[0]);
				}

				return match;
			},

			"PSEUDO": function PSEUDO(match) {
				var excess,
				    unquoted = !match[6] && match[2];

				if (matchExpr["CHILD"].test(match[0])) {
					return null;
				}

				// Accept quoted arguments as-is
				if (match[3]) {
					match[2] = match[4] || match[5] || "";

					// Strip excess characters from unquoted arguments
				} else if (unquoted && rpseudo.test(unquoted) && (

				// Get excess from tokenize (recursively)
				excess = tokenize(unquoted, true)) && (

				// advance to the next closing parenthesis
				excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

					// excess is a negative index
					match[0] = match[0].slice(0, excess);
					match[2] = unquoted.slice(0, excess);
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice(0, 3);
			}
		},

		filter: {

			"TAG": function TAG(nodeNameSelector) {
				var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
				return nodeNameSelector === "*" ? function () {
					return true;
				} : function (elem) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
			},

			"CLASS": function CLASS(className) {
				var pattern = classCache[className + " "];

				return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
					return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
				});
			},

			"ATTR": function ATTR(name, operator, check) {
				return function (elem) {
					var result = Sizzle.attr(elem, name);

					if (result == null) {
						return operator === "!=";
					}
					if (!operator) {
						return true;
					}

					result += "";

					/* eslint-disable max-len */

					return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
					/* eslint-enable max-len */
				};
			},

			"CHILD": function CHILD(type, what, _argument, first, last) {
				var simple = type.slice(0, 3) !== "nth",
				    forward = type.slice(-4) !== "last",
				    ofType = what === "of-type";

				return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function (elem) {
					return !!elem.parentNode;
				} : function (elem, _context, xml) {
					var cache,
					    uniqueCache,
					    outerCache,
					    node,
					    nodeIndex,
					    start,
					    dir = simple !== forward ? "nextSibling" : "previousSibling",
					    parent = elem.parentNode,
					    name = ofType && elem.nodeName.toLowerCase(),
					    useCache = !xml && !ofType,
					    diff = false;

					if (parent) {

						// :(first|last|only)-(child|of-type)
						if (simple) {
							while (dir) {
								node = elem;
								while (node = node[dir]) {
									if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [forward ? parent.firstChild : parent.lastChild];

						// non-xml :nth-child(...) stores cache data on `parent`
						if (forward && useCache) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[expando] || (node[expando] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

							cache = uniqueCache[type] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = nodeIndex && cache[2];
							node = nodeIndex && parent.childNodes[nodeIndex];

							while (node = ++nodeIndex && node && node[dir] || (

							// Fallback to seeking `elem` from the start
							diff = nodeIndex = 0) || start.pop()) {

								// When found, cache indexes on `parent` and break
								if (node.nodeType === 1 && ++diff && node === elem) {
									uniqueCache[type] = [dirruns, nodeIndex, diff];
									break;
								}
							}
						} else {

							// Use previously-cached element index if available
							if (useCache) {

								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[expando] || (node[expando] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

								cache = uniqueCache[type] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if (diff === false) {

								// Use the same loop as above to seek `elem` from the start
								while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {

									if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {

										// Cache the index of each encountered element
										if (useCache) {
											outerCache = node[expando] || (node[expando] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

											uniqueCache[type] = [dirruns, diff];
										}

										if (node === elem) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || diff % first === 0 && diff / first >= 0;
					}
				};
			},

			"PSEUDO": function PSEUDO(pseudo, argument) {

				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
				    fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if (fn[expando]) {
					return fn(argument);
				}

				// But maintain support for old signatures
				if (fn.length > 1) {
					args = [pseudo, pseudo, "", argument];
					return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
						var idx,
						    matched = fn(seed, argument),
						    i = matched.length;
						while (i--) {
							idx = indexOf(seed, matched[i]);
							seed[idx] = !(matches[idx] = matched[i]);
						}
					}) : function (elem) {
						return fn(elem, 0, args);
					};
				}

				return fn;
			}
		},

		pseudos: {

			// Potentially complex pseudos
			"not": markFunction(function (selector) {

				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
				    results = [],
				    matcher = compile(selector.replace(rtrim, "$1"));

				return matcher[expando] ? markFunction(function (seed, matches, _context, xml) {
					var elem,
					    unmatched = matcher(seed, null, xml, []),
					    i = seed.length;

					// Match elements unmatched by `matcher`
					while (i--) {
						if (elem = unmatched[i]) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) : function (elem, _context, xml) {
					input[0] = elem;
					matcher(input, null, xml, results);

					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
			}),

			"has": markFunction(function (selector) {
				return function (elem) {
					return Sizzle(selector, elem).length > 0;
				};
			}),

			"contains": markFunction(function (text) {
				text = text.replace(runescape, funescape);
				return function (elem) {
					return (elem.textContent || getText(elem)).indexOf(text) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction(function (lang) {

				// lang value must be a valid identifier
				if (!ridentifier.test(lang || "")) {
					Sizzle.error("unsupported lang: " + lang);
				}
				lang = lang.replace(runescape, funescape).toLowerCase();
				return function (elem) {
					var elemLang;
					do {
						if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
						}
					} while ((elem = elem.parentNode) && elem.nodeType === 1);
					return false;
				};
			}),

			// Miscellaneous
			"target": function target(elem) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice(1) === elem.id;
			},

			"root": function root(elem) {
				return elem === docElem;
			},

			"focus": function focus(elem) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": createDisabledPseudo(false),
			"disabled": createDisabledPseudo(true),

			"checked": function checked(elem) {

				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
			},

			"selected": function selected(elem) {

				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if (elem.parentNode) {
					// eslint-disable-next-line no-unused-expressions
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function empty(elem) {

				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
					if (elem.nodeType < 6) {
						return false;
					}
				}
				return true;
			},

			"parent": function parent(elem) {
				return !Expr.pseudos["empty"](elem);
			},

			// Element/input types
			"header": function header(elem) {
				return rheader.test(elem.nodeName);
			},

			"input": function input(elem) {
				return rinputs.test(elem.nodeName);
			},

			"button": function button(elem) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function text(elem) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && (

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				(attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
			},

			// Position-in-collection
			"first": createPositionalPseudo(function () {
				return [0];
			}),

			"last": createPositionalPseudo(function (_matchIndexes, length) {
				return [length - 1];
			}),

			"eq": createPositionalPseudo(function (_matchIndexes, length, argument) {
				return [argument < 0 ? argument + length : argument];
			}),

			"even": createPositionalPseudo(function (matchIndexes, length) {
				var i = 0;
				for (; i < length; i += 2) {
					matchIndexes.push(i);
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function (matchIndexes, length) {
				var i = 1;
				for (; i < length; i += 2) {
					matchIndexes.push(i);
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function (matchIndexes, length, argument) {
				var i = argument < 0 ? argument + length : argument > length ? length : argument;
				for (; --i >= 0;) {
					matchIndexes.push(i);
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function (matchIndexes, length, argument) {
				var i = argument < 0 ? argument + length : argument;
				for (; ++i < length;) {
					matchIndexes.push(i);
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
		Expr.pseudos[i] = createInputPseudo(i);
	}
	for (i in { submit: true, reset: true }) {
		Expr.pseudos[i] = createButtonPseudo(i);
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function (selector, parseOnly) {
		var matched,
		    match,
		    tokens,
		    type,
		    soFar,
		    groups,
		    preFilters,
		    cached = tokenCache[selector + " "];

		if (cached) {
			return parseOnly ? 0 : cached.slice(0);
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while (soFar) {

			// Comma and first run
			if (!matched || (match = rcomma.exec(soFar))) {
				if (match) {

					// Don't consume trailing commas as valid
					soFar = soFar.slice(match[0].length) || soFar;
				}
				groups.push(tokens = []);
			}

			matched = false;

			// Combinators
			if (match = rcombinators.exec(soFar)) {
				matched = match.shift();
				tokens.push({
					value: matched,

					// Cast descendant combinators to space
					type: match[0].replace(rtrim, " ")
				});
				soFar = soFar.slice(matched.length);
			}

			// Filters
			for (type in Expr.filter) {
				if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice(matched.length);
				}
			}

			if (!matched) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) :

		// Cache the tokens
		tokenCache(selector, groups).slice(0);
	};

	function toSelector(tokens) {
		var i = 0,
		    len = tokens.length,
		    selector = "";
		for (; i < len; i++) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator(matcher, combinator, base) {
		var dir = combinator.dir,
		    skip = combinator.next,
		    key = skip || dir,
		    checkNonElements = base && key === "parentNode",
		    doneName = done++;

		return combinator.first ?

		// Check against closest ancestor/preceding element
		function (elem, context, xml) {
			while (elem = elem[dir]) {
				if (elem.nodeType === 1 || checkNonElements) {
					return matcher(elem, context, xml);
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function (elem, context, xml) {
			var oldCache,
			    uniqueCache,
			    outerCache,
			    newCache = [dirruns, doneName];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if (xml) {
				while (elem = elem[dir]) {
					if (elem.nodeType === 1 || checkNonElements) {
						if (matcher(elem, context, xml)) {
							return true;
						}
					}
				}
			} else {
				while (elem = elem[dir]) {
					if (elem.nodeType === 1 || checkNonElements) {
						outerCache = elem[expando] || (elem[expando] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

						if (skip && skip === elem.nodeName.toLowerCase()) {
							elem = elem[dir] || elem;
						} else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {

							// Assign to newCache so results back-propagate to previous elements
							return newCache[2] = oldCache[2];
						} else {

							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[key] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if (newCache[2] = matcher(elem, context, xml)) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
	}

	function elementMatcher(matchers) {
		return matchers.length > 1 ? function (elem, context, xml) {
			var i = matchers.length;
			while (i--) {
				if (!matchers[i](elem, context, xml)) {
					return false;
				}
			}
			return true;
		} : matchers[0];
	}

	function multipleContexts(selector, contexts, results) {
		var i = 0,
		    len = contexts.length;
		for (; i < len; i++) {
			Sizzle(selector, contexts[i], results);
		}
		return results;
	}

	function condense(unmatched, map, filter, context, xml) {
		var elem,
		    newUnmatched = [],
		    i = 0,
		    len = unmatched.length,
		    mapped = map != null;

		for (; i < len; i++) {
			if (elem = unmatched[i]) {
				if (!filter || filter(elem, context, xml)) {
					newUnmatched.push(elem);
					if (mapped) {
						map.push(i);
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
		if (postFilter && !postFilter[expando]) {
			postFilter = setMatcher(postFilter);
		}
		if (postFinder && !postFinder[expando]) {
			postFinder = setMatcher(postFinder, postSelector);
		}
		return markFunction(function (seed, results, context, xml) {
			var temp,
			    i,
			    elem,
			    preMap = [],
			    postMap = [],
			    preexisting = results.length,


			// Get initial elements from seed or context
			elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),


			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
			    matcherOut = matcher ?

			// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
			postFinder || (seed ? preFilter : preexisting || postFilter) ?

			// ...intermediate processing is necessary
			[] :

			// ...otherwise use results directly
			results : matcherIn;

			// Find primary matches
			if (matcher) {
				matcher(matcherIn, matcherOut, context, xml);
			}

			// Apply postFilter
			if (postFilter) {
				temp = condense(matcherOut, postMap);
				postFilter(temp, [], context, xml);

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while (i--) {
					if (elem = temp[i]) {
						matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
					}
				}
			}

			if (seed) {
				if (postFinder || preFilter) {
					if (postFinder) {

						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while (i--) {
							if (elem = matcherOut[i]) {

								// Restore matcherIn since elem is not yet a final match
								temp.push(matcherIn[i] = elem);
							}
						}
						postFinder(null, matcherOut = [], temp, xml);
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while (i--) {
						if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

				// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
				if (postFinder) {
					postFinder(null, results, matcherOut, xml);
				} else {
					push.apply(results, matcherOut);
				}
			}
		});
	}

	function matcherFromTokens(tokens) {
		var checkContext,
		    matcher,
		    j,
		    len = tokens.length,
		    leadingRelative = Expr.relative[tokens[0].type],
		    implicitRelative = leadingRelative || Expr.relative[" "],
		    i = leadingRelative ? 1 : 0,


		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator(function (elem) {
			return elem === checkContext;
		}, implicitRelative, true),
		    matchAnyContext = addCombinator(function (elem) {
			return indexOf(checkContext, elem) > -1;
		}, implicitRelative, true),
		    matchers = [function (elem, context, xml) {
			var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));

			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		}];

		for (; i < len; i++) {
			if (matcher = Expr.relative[tokens[i].type]) {
				matchers = [addCombinator(elementMatcher(matchers), matcher)];
			} else {
				matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

				// Return special upon seeing a positional matcher
				if (matcher[expando]) {

					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for (; j < len; j++) {
						if (Expr.relative[tokens[j].type]) {
							break;
						}
					}
					return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(

					// If the preceding token was a descendant combinator, insert an implicit any-element `*`
					tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
				}
				matchers.push(matcher);
			}
		}

		return elementMatcher(matchers);
	}

	function matcherFromGroupMatchers(elementMatchers, setMatchers) {
		var bySet = setMatchers.length > 0,
		    byElement = elementMatchers.length > 0,
		    superMatcher = function superMatcher(seed, context, xml, results, outermost) {
			var elem,
			    j,
			    matcher,
			    matchedCount = 0,
			    i = "0",
			    unmatched = seed && [],
			    setMatched = [],
			    contextBackup = outermostContext,


			// We must always have either seed elements or outermost context
			elems = seed || byElement && Expr.find["TAG"]("*", outermost),


			// Use integer dirruns iff this is the outermost matcher
			dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
			    len = elems.length;

			if (outermost) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for (; i !== len && (elem = elems[i]) != null; i++) {
				if (byElement && elem) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if (!context && elem.ownerDocument != document) {
						setDocument(elem);
						xml = !documentIsHTML;
					}
					while (matcher = elementMatchers[j++]) {
						if (matcher(elem, context || document, xml)) {
							results.push(elem);
							break;
						}
					}
					if (outermost) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if (bySet) {

					// They will have gone through all possible matchers
					if (elem = !matcher && elem) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if (seed) {
						unmatched.push(elem);
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if (bySet && i !== matchedCount) {
				j = 0;
				while (matcher = setMatchers[j++]) {
					matcher(unmatched, setMatched, context, xml);
				}

				if (seed) {

					// Reintegrate element matches to eliminate the need for sorting
					if (matchedCount > 0) {
						while (i--) {
							if (!(unmatched[i] || setMatched[i])) {
								setMatched[i] = pop.call(results);
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense(setMatched);
				}

				// Add matches to results
				push.apply(results, setMatched);

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {

					Sizzle.uniqueSort(results);
				}
			}

			// Override manipulation of globals by nested matchers
			if (outermost) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

		return bySet ? markFunction(superMatcher) : superMatcher;
	}

	compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
		var i,
		    setMatchers = [],
		    elementMatchers = [],
		    cached = compilerCache[selector + " "];

		if (!cached) {

			// Generate a function of recursive functions that can be used to check each element
			if (!match) {
				match = tokenize(selector);
			}
			i = match.length;
			while (i--) {
				cached = matcherFromTokens(match[i]);
				if (cached[expando]) {
					setMatchers.push(cached);
				} else {
					elementMatchers.push(cached);
				}
			}

			// Cache the compiled function
			cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
  * A low-level selection function that works with Sizzle's compiled
  *  selector functions
  * @param {String|Function} selector A selector or a pre-compiled
  *  selector function built with Sizzle.compile
  * @param {Element} context
  * @param {Array} [results]
  * @param {Array} [seed] A set of elements to match against
  */
	select = Sizzle.select = function (selector, context, results, seed) {
		var i,
		    tokens,
		    token,
		    type,
		    find,
		    compiled = typeof selector === "function" && selector,
		    match = !seed && tokenize(selector = compiled.selector || selector);

		results = results || [];

		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if (match.length === 1) {

			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice(0);
			if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

				context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
				if (!context) {
					return results;

					// Precompiled matchers will still verify ancestry, so step up a level
				} else if (compiled) {
					context = context.parentNode;
				}

				selector = selector.slice(tokens.shift().value.length);
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
			while (i--) {
				token = tokens[i];

				// Abort if we hit a combinator
				if (Expr.relative[type = token.type]) {
					break;
				}
				if (find = Expr.find[type]) {

					// Search, expanding context for leading sibling combinators
					if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice(i, 1);
						selector = seed.length && toSelector(tokens);
						if (!selector) {
							push.apply(results, seed);
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function (el) {

		// Should return 1, but returns 4 (following)
		return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if (!assert(function (el) {
		el.innerHTML = "<a href='#'></a>";
		return el.firstChild.getAttribute("href") === "#";
	})) {
		addHandle("type|href|height|width", function (elem, name, isXML) {
			if (!isXML) {
				return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if (!support.attributes || !assert(function (el) {
		el.innerHTML = "<input/>";
		el.firstChild.setAttribute("value", "");
		return el.firstChild.getAttribute("value") === "";
	})) {
		addHandle("value", function (elem, _name, isXML) {
			if (!isXML && elem.nodeName.toLowerCase() === "input") {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if (!assert(function (el) {
		return el.getAttribute("disabled") == null;
	})) {
		addHandle(booleans, function (elem, name, isXML) {
			var val;
			if (!isXML) {
				return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
			}
		});
	}

	// EXPOSE
	var _sizzle = window.Sizzle;

	Sizzle.noConflict = function () {
		if (window.Sizzle === Sizzle) {
			window.Sizzle = _sizzle;
		}

		return Sizzle;
	};

	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return Sizzle;
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

		// Sizzle requires that there be a global window in Common-JS like environments
	} else if (typeof module !== "undefined" && module.exports) {
		module.exports = Sizzle;
	} else {
		window.Sizzle = Sizzle;
	}

	// EXPOSE
})(window);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.common = exports.optimize = exports.initOptions = exports.match = exports.getMultiSelector = exports.getSingleSelector = exports.select = undefined;

var _select = __webpack_require__(6);

Object.defineProperty(exports, 'select', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_select).default;
  }
});
Object.defineProperty(exports, 'getSingleSelector', {
  enumerable: true,
  get: function get() {
    return _select.getSingleSelector;
  }
});
Object.defineProperty(exports, 'getMultiSelector', {
  enumerable: true,
  get: function get() {
    return _select.getMultiSelector;
  }
});

var _match = __webpack_require__(4);

Object.defineProperty(exports, 'match', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_match).default;
  }
});
Object.defineProperty(exports, 'initOptions', {
  enumerable: true,
  get: function get() {
    return _match.initOptions;
  }
});

var _optimize = __webpack_require__(5);

Object.defineProperty(exports, 'optimize', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_optimize).default;
  }
});

var _common2 = __webpack_require__(3);

var _common = _interopRequireWildcard(_common2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.common = _common;

/***/ }
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmZjFlZWYzNThhYjRkNDI2NTM1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9wYXR0ZXJuLmpzIiwid2VicGFjazovLy8uL3NyYy9zZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9tYXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3B0aW1pemUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L3NpenpsZS9kaXN0L3NpenpsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiY29udmVydE5vZGVMaXN0Iiwibm9kZXMiLCJsZW5ndGgiLCJhcnIiLCJBcnJheSIsImkiLCJlc2NhcGVWYWx1ZSIsInZhbHVlIiwicmVwbGFjZSIsInBhcnRpdGlvbiIsImFycmF5IiwicHJlZGljYXRlIiwicmVkdWNlIiwiaXRlbSIsImlubmVyIiwib3V0ZXIiLCJjb25jYXQiLCJpc1ZhbGlkQ1NTSWRlbnRpZmllciIsInRlc3QiLCJjcmVhdGVQYXR0ZXJuIiwiYmFzZSIsImF0dHJpYnV0ZXMiLCJjbGFzc2VzIiwicHNldWRvIiwiZGVzY2VuZGFudHMiLCJhdHRyaWJ1dGVzVG9TZWxlY3RvciIsIm1hcCIsIm5hbWUiLCJqb2luIiwiY2xhc3Nlc1RvU2VsZWN0b3IiLCJjIiwicHNldWRvVG9TZWxlY3RvciIsInBhdHRlcm5Ub1NlbGVjdG9yIiwicGF0dGVybiIsInJlbGF0ZXMiLCJ0YWciLCJwYXRoVG9TZWxlY3RvciIsInBhdGgiLCJjb252ZXJ0RXNjYXBpbmciLCJhdHRyaWJ1dGVzVG9YUGF0aCIsImNsYXNzZXNUb1hQYXRoIiwicHNldWRvVG9YUGF0aCIsIm1hdGNoIiwicCIsInBhdHRlcm5Ub1hQYXRoIiwiZGVzY2VuZGFudHNUb1hQYXRoIiwicGF0aFRvWFBhdGgiLCJjaGlsZHJlbiIsInRvU3RyaW5nIiwianF1ZXJ5IiwiY3NzIiwieHBhdGgiLCJnZXRUb1N0cmluZyIsIm9wdGlvbnMiLCJmb3JtYXQiLCJTaXp6bGUiLCJzZWxlY3RKUXVlcnkiLCJzZWxlY3RvciIsInBhcmVudCIsInJlcXVpcmUiLCJkb2N1bWVudCIsInNlbGVjdFhQYXRoIiwiZG9jIiwicGFyZW50Tm9kZSIsInN0YXJ0c1dpdGgiLCJpdGVyYXRvciIsImV2YWx1YXRlIiwiZWxlbWVudHMiLCJlbGVtZW50IiwiaXRlcmF0ZU5leHQiLCJwdXNoIiwic2VsZWN0Q1NTIiwicXVlcnlTZWxlY3RvckFsbCIsInNlbGVjdCIsImdldFNlbGVjdCIsInJvb3QiLCJlcnIiLCJnZXRDb21tb25BbmNlc3RvciIsImFuY2VzdG9ycyIsImZvckVhY2giLCJpbmRleCIsInBhcmVudHMiLCJ1bnNoaWZ0Iiwic29ydCIsImN1cnIiLCJuZXh0Iiwic2hhbGxvd0FuY2VzdG9yIiwic2hpZnQiLCJhbmNlc3RvciIsIm1pc3NpbmciLCJzb21lIiwib3RoZXJQYXJlbnRzIiwib3RoZXJQYXJlbnQiLCJsIiwiZ2V0Q29tbW9uUHJvcGVydGllcyIsImlnbm9yZSIsImNvbW1vblByb3BlcnRpZXMiLCJjb21tb25DbGFzc2VzIiwiY29tbW9uQXR0cmlidXRlcyIsImNvbW1vblRhZyIsInVuZGVmaW5lZCIsImdldEF0dHJpYnV0ZSIsInRyaW0iLCJzcGxpdCIsImZpbHRlciIsImNsYXNzIiwiY2xzIiwiZW50cnkiLCJlbGVtZW50QXR0cmlidXRlcyIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJhdHRyaWJ1dGUiLCJhdHRyaWJ1dGVOYW1lIiwiYXR0cmlidXRlc05hbWVzIiwiY29tbW9uQXR0cmlidXRlc05hbWVzIiwibmV4dENvbW1vbkF0dHJpYnV0ZXMiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJkZWZhdWx0SWdub3JlIiwiaW5kZXhPZiIsImNvbnRhaW5zIiwiaW5pdE9wdGlvbnMiLCJza2lwIiwicHJpb3JpdHkiLCJub2RlIiwibmVzdGVkIiwic2tpcENvbXBhcmUiLCJpc0FycmF5Iiwic2tpcENoZWNrcyIsImNvbXBhcmUiLCJ0eXBlIiwiUmVnRXhwIiwibm9kZVR5cGUiLCJjaGVja0F0dHJpYnV0ZXMiLCJjaGVja1RhZyIsImluY2x1ZGVzIiwiY2hlY2tSZWN1cnNpdmVEZXNjZW5kYW50cyIsImNoZWNrVGV4dCIsImNoZWNrTnRoQ2hpbGQiLCJmaW5kUGF0dGVybiIsImZpbmRBdHRyaWJ1dGVzUGF0dGVybiIsImNvbWJpbmF0aW9ucyIsInZhbHVlcyIsIm1pbiIsIm1heCIsInJlc3VsdCIsInIiLCJ2IiwibWF4U3Vic2V0U2l6ZSIsIml0ZW1zIiwiZ2V0Q2xhc3NTZWxlY3RvciIsImZpbmQiLCJtYXRjaGVzIiwiYXR0cmlidXRlTmFtZXMiLCJ2YWwiLCJhIiwic29ydGVkS2V5cyIsImlzT3B0aW1hbCIsImF0dHJpYnV0ZVZhbHVlIiwidXNlTmFtZWRJZ25vcmUiLCJjdXJyZW50SWdub3JlIiwiY3VycmVudERlZmF1bHRJZ25vcmUiLCJjaGVja0lnbm9yZSIsImNsYXNzTmFtZXMiLCJjbGFzc0lnbm9yZSIsImNsYXNzTmFtZSIsImZpbmRUYWdQYXR0ZXJuIiwiY2hpbGQiLCJjaGlsZFBhdHRlcm4iLCJjb25zb2xlIiwid2FybiIsInRleHRDb250ZW50IiwiZmlyc3RDaGlsZCIsIm5vZGVWYWx1ZSIsInRleHRzIiwidGV4dCIsImZyb20iLCJkZXNjZW5kYW50UGF0aCIsInBhcmVudEVsZW1lbnQiLCJkZWZhdWx0UHJlZGljYXRlIiwiY2hlY2siLCJvcHRpbWl6ZSIsIkVycm9yIiwib3B0aW1pemVQYXJ0IiwiZW5kT3B0aW1pemVkIiwic2xpY2UiLCJzaG9ydGVuZWQiLCJwb3AiLCJjdXJyZW50IiwiaGFzU2FtZVJlc3VsdCIsImV2ZXJ5Iiwib3B0aW1pemVUZXh0IiwicHJlIiwicG9zdCIsIm90aGVyIiwib3B0aW1pemVkIiwiY29tcGFyZVJlc3VsdHMiLCJvcHRpbWl6ZUF0dHJpYnV0ZXMiLCJzaW1wbGlmeSIsIm9yaWdpbmFsIiwiZ2V0U2ltcGxpZmllZCIsInNpbXBsaWZpZWQiLCJvcHRpbWl6ZURlc2NlbmRhbnQiLCJkZXNjZW5kYW50Iiwib3B0aW1pemVSZWN1cnNpdmVEZXNjZW5kYW50cyIsIm9wdGltaXplTnRoT2ZUeXBlIiwiZmluZEluZGV4IiwibnRoT2ZUeXBlIiwib3B0aW1pemVDbGFzc2VzIiwicmVmZXJlbmNlcyIsInJlZmVyZW5jZSIsImRlc2NyaXB0aW9uIiwib3B0aW1pemVycyIsImFjYyIsIm9wdGltaXplciIsImdldFF1ZXJ5U2VsZWN0b3IiLCJnZXRTaW5nbGVTZWxlY3RvclBhdGgiLCJvcHRpbWl6ZWRQYXRoIiwiZ2V0TXVsdGlTZWxlY3RvclBhdGgiLCJhbmNlc3RvclBhdGgiLCJjb21tb25QYXRoIiwiZ2V0Q29tbW9uUGF0aCIsImRlc2NlbmRhbnRQYXR0ZXJuIiwic2VsZWN0b3JQYXRoIiwic2VsZWN0b3JNYXRjaGVzIiwiaW5wdXQiLCJIVE1MRWxlbWVudCIsIndpbmRvdyIsInN1cHBvcnQiLCJFeHByIiwiZ2V0VGV4dCIsImlzWE1MIiwidG9rZW5pemUiLCJjb21waWxlIiwib3V0ZXJtb3N0Q29udGV4dCIsInNvcnRJbnB1dCIsImhhc0R1cGxpY2F0ZSIsInNldERvY3VtZW50IiwiZG9jRWxlbSIsImRvY3VtZW50SXNIVE1MIiwicmJ1Z2d5UVNBIiwicmJ1Z2d5TWF0Y2hlcyIsImV4cGFuZG8iLCJEYXRlIiwicHJlZmVycmVkRG9jIiwiZGlycnVucyIsImRvbmUiLCJjbGFzc0NhY2hlIiwiY3JlYXRlQ2FjaGUiLCJ0b2tlbkNhY2hlIiwiY29tcGlsZXJDYWNoZSIsIm5vbm5hdGl2ZVNlbGVjdG9yQ2FjaGUiLCJzb3J0T3JkZXIiLCJiIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJwdXNoTmF0aXZlIiwibGlzdCIsImVsZW0iLCJsZW4iLCJib29sZWFucyIsIndoaXRlc3BhY2UiLCJpZGVudGlmaWVyIiwicHNldWRvcyIsInJ3aGl0ZXNwYWNlIiwicnRyaW0iLCJyY29tbWEiLCJyY29tYmluYXRvcnMiLCJyZGVzY2VuZCIsInJwc2V1ZG8iLCJyaWRlbnRpZmllciIsIm1hdGNoRXhwciIsInJodG1sIiwicmlucHV0cyIsInJoZWFkZXIiLCJybmF0aXZlIiwicnF1aWNrRXhwciIsInJzaWJsaW5nIiwicnVuZXNjYXBlIiwiZnVuZXNjYXBlIiwiZXNjYXBlIiwibm9uSGV4IiwiaGlnaCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsInJjc3Nlc2NhcGUiLCJmY3NzZXNjYXBlIiwiY2giLCJhc0NvZGVQb2ludCIsImNoYXJDb2RlQXQiLCJ1bmxvYWRIYW5kbGVyIiwiaW5EaXNhYmxlZEZpZWxkc2V0IiwiYWRkQ29tYmluYXRvciIsImRpc2FibGVkIiwibm9kZU5hbWUiLCJkaXIiLCJhcHBseSIsImNhbGwiLCJjaGlsZE5vZGVzIiwiZSIsInRhcmdldCIsImVscyIsImoiLCJjb250ZXh0IiwicmVzdWx0cyIsInNlZWQiLCJtIiwibmlkIiwiZ3JvdXBzIiwibmV3U2VsZWN0b3IiLCJuZXdDb250ZXh0Iiwib3duZXJEb2N1bWVudCIsImV4ZWMiLCJnZXRFbGVtZW50QnlJZCIsImlkIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwicXNhIiwidGVzdENvbnRleHQiLCJzY29wZSIsInNldEF0dHJpYnV0ZSIsInRvU2VsZWN0b3IiLCJxc2FFcnJvciIsInJlbW92ZUF0dHJpYnV0ZSIsImNhY2hlIiwiY2FjaGVMZW5ndGgiLCJtYXJrRnVuY3Rpb24iLCJmbiIsImFzc2VydCIsImVsIiwiY3JlYXRlRWxlbWVudCIsInJlbW92ZUNoaWxkIiwiYWRkSGFuZGxlIiwiYXR0cnMiLCJoYW5kbGVyIiwiYXR0ckhhbmRsZSIsInNpYmxpbmdDaGVjayIsImN1ciIsImRpZmYiLCJzb3VyY2VJbmRleCIsIm5leHRTaWJsaW5nIiwiY3JlYXRlSW5wdXRQc2V1ZG8iLCJjcmVhdGVCdXR0b25Qc2V1ZG8iLCJjcmVhdGVEaXNhYmxlZFBzZXVkbyIsImlzRGlzYWJsZWQiLCJjcmVhdGVQb3NpdGlvbmFsUHNldWRvIiwiYXJndW1lbnQiLCJtYXRjaEluZGV4ZXMiLCJuYW1lc3BhY2UiLCJuYW1lc3BhY2VVUkkiLCJkb2N1bWVudEVsZW1lbnQiLCJoYXNDb21wYXJlIiwic3ViV2luZG93IiwiZGVmYXVsdFZpZXciLCJ0b3AiLCJhZGRFdmVudExpc3RlbmVyIiwiYXR0YWNoRXZlbnQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUNvbW1lbnQiLCJnZXRCeUlkIiwiZ2V0RWxlbWVudHNCeU5hbWUiLCJhdHRySWQiLCJnZXRBdHRyaWJ1dGVOb2RlIiwiZWxlbXMiLCJ0bXAiLCJpbm5lckhUTUwiLCJtYXRjaGVzU2VsZWN0b3IiLCJ3ZWJraXRNYXRjaGVzU2VsZWN0b3IiLCJtb3pNYXRjaGVzU2VsZWN0b3IiLCJvTWF0Y2hlc1NlbGVjdG9yIiwibXNNYXRjaGVzU2VsZWN0b3IiLCJkaXNjb25uZWN0ZWRNYXRjaCIsImNvbXBhcmVEb2N1bWVudFBvc2l0aW9uIiwiYWRvd24iLCJidXAiLCJzb3J0RGV0YWNoZWQiLCJhdXAiLCJhcCIsImJwIiwiZXhwciIsInJldCIsImF0dHIiLCJzcGVjaWZpZWQiLCJzZWwiLCJlcnJvciIsIm1zZyIsInVuaXF1ZVNvcnQiLCJkdXBsaWNhdGVzIiwiZGV0ZWN0RHVwbGljYXRlcyIsInNvcnRTdGFibGUiLCJzcGxpY2UiLCJzZWxlY3RvcnMiLCJjcmVhdGVQc2V1ZG8iLCJyZWxhdGl2ZSIsImZpcnN0IiwicHJlRmlsdGVyIiwiZXhjZXNzIiwidW5xdW90ZWQiLCJub2RlTmFtZVNlbGVjdG9yIiwib3BlcmF0b3IiLCJ3aGF0IiwiX2FyZ3VtZW50IiwibGFzdCIsInNpbXBsZSIsImZvcndhcmQiLCJvZlR5cGUiLCJfY29udGV4dCIsInhtbCIsInVuaXF1ZUNhY2hlIiwib3V0ZXJDYWNoZSIsIm5vZGVJbmRleCIsInN0YXJ0IiwidXNlQ2FjaGUiLCJsYXN0Q2hpbGQiLCJ1bmlxdWVJRCIsImFyZ3MiLCJzZXRGaWx0ZXJzIiwiaWR4IiwibWF0Y2hlZCIsIm1hdGNoZXIiLCJ1bm1hdGNoZWQiLCJsYW5nIiwiZWxlbUxhbmciLCJoYXNoIiwibG9jYXRpb24iLCJhY3RpdmVFbGVtZW50IiwiaGFzRm9jdXMiLCJocmVmIiwidGFiSW5kZXgiLCJjaGVja2VkIiwic2VsZWN0ZWQiLCJzZWxlY3RlZEluZGV4IiwiX21hdGNoSW5kZXhlcyIsInJhZGlvIiwiY2hlY2tib3giLCJmaWxlIiwicGFzc3dvcmQiLCJpbWFnZSIsInN1Ym1pdCIsInJlc2V0IiwicHJvdG90eXBlIiwiZmlsdGVycyIsInBhcnNlT25seSIsInRva2VucyIsInNvRmFyIiwicHJlRmlsdGVycyIsImNhY2hlZCIsImNvbWJpbmF0b3IiLCJjaGVja05vbkVsZW1lbnRzIiwiZG9uZU5hbWUiLCJvbGRDYWNoZSIsIm5ld0NhY2hlIiwiZWxlbWVudE1hdGNoZXIiLCJtYXRjaGVycyIsIm11bHRpcGxlQ29udGV4dHMiLCJjb250ZXh0cyIsImNvbmRlbnNlIiwibmV3VW5tYXRjaGVkIiwibWFwcGVkIiwic2V0TWF0Y2hlciIsInBvc3RGaWx0ZXIiLCJwb3N0RmluZGVyIiwicG9zdFNlbGVjdG9yIiwidGVtcCIsInByZU1hcCIsInBvc3RNYXAiLCJwcmVleGlzdGluZyIsIm1hdGNoZXJJbiIsIm1hdGNoZXJPdXQiLCJtYXRjaGVyRnJvbVRva2VucyIsImNoZWNrQ29udGV4dCIsImxlYWRpbmdSZWxhdGl2ZSIsImltcGxpY2l0UmVsYXRpdmUiLCJtYXRjaENvbnRleHQiLCJtYXRjaEFueUNvbnRleHQiLCJtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMiLCJlbGVtZW50TWF0Y2hlcnMiLCJzZXRNYXRjaGVycyIsImJ5U2V0IiwiYnlFbGVtZW50Iiwic3VwZXJNYXRjaGVyIiwib3V0ZXJtb3N0IiwibWF0Y2hlZENvdW50Iiwic2V0TWF0Y2hlZCIsImNvbnRleHRCYWNrdXAiLCJkaXJydW5zVW5pcXVlIiwiTWF0aCIsInJhbmRvbSIsInRva2VuIiwiY29tcGlsZWQiLCJfbmFtZSIsImRlZmF1bHRWYWx1ZSIsIl9zaXp6bGUiLCJub0NvbmZsaWN0IiwiZGVmaW5lIiwibW9kdWxlIiwiZXhwb3J0cyIsImRlZmF1bHQiLCJnZXRTaW5nbGVTZWxlY3RvciIsImdldE11bHRpU2VsZWN0b3IiLCJjb21tb24iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFQTs7Ozs7O0FBTUE7Ozs7OztBQU1PLElBQU1BLDRDQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ0MsS0FBRCxFQUFXO0FBQUEsTUFDaENDLE1BRGdDLEdBQ3JCRCxLQURxQixDQUNoQ0MsTUFEZ0M7O0FBRXhDLE1BQU1DLE1BQU0sSUFBSUMsS0FBSixDQUFVRixNQUFWLENBQVo7QUFDQSxPQUFLLElBQUlHLElBQUksQ0FBYixFQUFnQkEsSUFBSUgsTUFBcEIsRUFBNEJHLEdBQTVCLEVBQWlDO0FBQy9CRixRQUFJRSxDQUFKLElBQVNKLE1BQU1JLENBQU4sQ0FBVDtBQUNEO0FBQ0QsU0FBT0YsR0FBUDtBQUNELENBUE07O0FBU1A7Ozs7Ozs7O0FBUU8sSUFBTUcsb0NBQWMsU0FB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QztBQUMvQjZLLFVBQU83SyxNQUFQLEdBQWdCc2IsT0FBaEI7QUFDQTs7QUFFRCxTQUFPdGIsTUFBUDtBQUNBLEVBTkQ7O0FBUUEsS0FBSyxJQUFMLEVBQWtEO0FBQ2pEd2IsRUFBQSxrQ0FBUSxZQUFXO0FBQ2xCLFVBQU94YixNQUFQO0FBQ0EsR0FGRDs7QUFJRDtBQUNDLEVBTkQsTUFNTyxJQUFLLE9BQU95YixNQUFQLEtBQWtCLFdBQWxCLElBQWlDQSxPQUFPQyxPQUE3QyxFQUF1RDtBQUM3REQsU0FBT0MsT0FBUCxHQUFpQjFiLE1BQWpCO0FBQ0EsRUFGTSxNQUVBO0FBQ042SyxTQUFPN0ssTUFBUCxHQUFnQkEsTUFBaEI7QUFDQTs7QUFFRDtBQUVDLENBbjZFRCxFQW02RUs2SyxNQW42RUwsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQ0NWUzhRLE87Ozs7OzttQkFBbUJDLGlCOzs7Ozs7bUJBQW1CQyxnQjs7Ozs7Ozs7OzBDQUN0Q0YsTzs7Ozs7O2tCQUFrQnhYLFc7Ozs7Ozs7Ozs2Q0FDbEJ3WCxPOzs7Ozs7Ozs7Ozs7UUFDR0csTSIsImZpbGUiOiJvcHRpbWFsLXNlbGVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIk9wdGltYWxTZWxlY3RcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiT3B0aW1hbFNlbGVjdFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmZjFlZWYzNThhYjRkNDI2NTM1ZSIsIi8qKlxuICogIyBVdGlsaXRpZXNcbiAqXG4gKiBDb252ZW5pZW5jZSBoZWxwZXJzLlxuICovXG5cbi8qKlxuICogQ3JlYXRlIGFuIGFycmF5IHdpdGggdGhlIERPTSBub2RlcyBvZiB0aGUgbGlzdFxuICpcbiAqIEBwYXJhbSAge05vZGVMaXN0fSAgICAgICAgICAgICBub2RlcyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge0FycmF5LjxIVE1MRWxlbWVudD59ICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnROb2RlTGlzdCA9IChub2RlcykgPT4ge1xuICBjb25zdCB7IGxlbmd0aCB9ID0gbm9kZXNcbiAgY29uc3QgYXJyID0gbmV3IEFycmF5KGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGFycltpXSA9IG5vZGVzW2ldXG4gIH1cbiAgcmV0dXJuIGFyclxufVxuXG4vKipcbiAqIEVzY2FwZSBzcGVjaWFsIGNoYXJhY3RlcnMgYW5kIGxpbmUgYnJlYWtzIGFzIGEgc2ltcGxpZmllZCB2ZXJzaW9uIG9mICdDU1MuZXNjYXBlKCknXG4gKlxuICogRGVzY3JpcHRpb24gb2YgdmFsaWQgY2hhcmFjdGVyczogaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2Nzcy1lc2NhcGVzXG4gKlxuICogQHBhcmFtICB7U3RyaW5nP30gdmFsdWUgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGNvbnN0IGVzY2FwZVZhbHVlID0gKHZhbHVlKSA9PlxuICB2YWx1ZSAmJiB2YWx1ZS5yZXBsYWNlKC9bJ1wiYFxcXFwvOj8mISMkJV4oKVtcXF17fH0qKzssLjw9PkB+XS9nLCAnXFxcXCQmJylcbiAgICAucmVwbGFjZSgvXFxuL2csICdcXHUwMGEwJylcblxuLyoqXG4gKiBQYXJ0aXRpb24gYXJyYXkgaW50byB0d28gZ3JvdXBzIGRldGVybWluZWQgYnkgcHJlZGljYXRlXG4gKi9cbmV4cG9ydCBjb25zdCBwYXJ0aXRpb24gPSAoYXJyYXksIHByZWRpY2F0ZSkgPT5cbiAgYXJyYXkucmVkdWNlKFxuICAgIChbaW5uZXIsIG91dGVyXSwgaXRlbSkgPT4gcHJlZGljYXRlKGl0ZW0pID8gW2lubmVyLmNvbmNhdChpdGVtKSwgb3V0ZXJdIDogW2lubmVyLCBvdXRlci5jb25jYXQoaXRlbSldLFxuICAgIFtbXSwgW11dXG4gIClcblxuXG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHN0cmluZyBpcyB2YWxpZCBDU1MgaWRlbnRpZmllclxuICogXG4gKiBJbiBDU1MsIGlkZW50aWZpZXJzIChpbmNsdWRpbmcgZWxlbWVudCBuYW1lcywgY2xhc3NlcywgYW5kIElEcyBpbiBzZWxlY3RvcnMpIGNhbiBjb250YWluXG4gKiBvbmx5IHRoZSBjaGFyYWN0ZXJzIFthLXpBLVowLTldIGFuZCBJU08gMTA2NDYgY2hhcmFjdGVycyBVKzAwQTAgYW5kIGhpZ2hlciwgcGx1cyB0aGUgaHlwaGVuICgtKVxuICogYW5kIHRoZSB1bmRlcnNjb3JlIChfKTsgdGhleSBjYW5ub3Qgc3RhcnQgd2l0aCBhIGRpZ2l0LCB0d28gaHlwaGVucywgb3IgYSBoeXBoZW4gZm9sbG93ZWQgYnlcbiAqIGEgZGlnaXQuXG4gKiBcbiAqIElkZW50aWZpZXJzIGNhbiBhbHNvIGNvbnRhaW4gZXNjYXBlZCBjaGFyYWN0ZXJzIGFuZCBhbnkgSVNPIDEwNjQ2IGNoYXJhY3RlciBhcyBhIG51bWVyaWNcbiAqIGNvZGUgKHNlZSBuZXh0IGl0ZW0pLiBGb3IgaW5zdGFuY2UsIHRoZSBpZGVudGlmaWVyIFwiQiZXP1wiIG1heSBiZSB3cml0dGVuIGFzIFwiQlxcJldcXD9cIiBvciBcIkJcXDI2IFdcXDNGXCIuXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaXNWYWxpZENTU0lkZW50aWZpZXIgPSAodmFsdWUpID0+XG4gICEhdmFsdWUgJiYgIS8oXlxcZCl8KF4tLSl8KF4tXFxkKS8udGVzdCh2YWx1ZSkgJiYgIS8oW15cXFxcXXxeKVsnXCJgLzo/JiEjJCVeKClbXFxde3x9Kis7LC48PT5Afl0vLnRlc3QodmFsdWUpXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxpdGllcy5qcyIsImltcG9ydCB7IGlzVmFsaWRDU1NJZGVudGlmaWVyIH0gZnJvbSAnLi91dGlsaXRpZXMnXG4vKipcbiAqIEB0eXBlZGVmICB7T2JqZWN0fSBQYXR0ZXJuXG4gKiBAcHJvcGVydHkgeygnZGVzY2VuZGFudCcgfCAnY2hpbGQnKX0gICAgICAgICAgICAgICAgICBbcmVsYXRlc11cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YWddXG4gKiBAcHJvcGVydHkge0FycmF5Ljx7IG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZz8gfT59ICBhdHRyaWJ1dGVzXG4gKiBAcHJvcGVydHkge0FycmF5LjxzdHJpbmc+fSAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzXG4gKiBAcHJvcGVydHkge0FycmF5LjxzdHJpbmc+fSAgICAgICAgICAgICAgICAgICAgICAgICAgICBwc2V1ZG9cbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPEFycmF5LjxQYXR0ZXJuPj59ICAgICAgICAgICAgICAgICAgIGRlc2NlbmRhbnRzXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHBhdHRlcm4gc3RydWN0dXJlXG4gKiBcbiAqIEBwYXJhbSB7UGFydGlhbDxQYXR0ZXJuPn0gcGF0dGVyblxuICogQHJldHVybnMge1BhdHRlcm59XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVQYXR0ZXJuID0gKGJhc2UgPSB7fSkgPT5cbiAgKHsgYXR0cmlidXRlczogW10sIGNsYXNzZXM6IFtdLCBwc2V1ZG86IFtdLCBkZXNjZW5kYW50czogW10sIC4uLmJhc2UgfSlcblxuLyoqXG4gKiBDb252ZXJ0IGF0dHJpYnV0ZXMgdG8gQ1NTIHNlbGVjdG9yXG4gKiBcbiAqIEBwYXJhbSB7QXJyYXkuPHsgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nPyB9Pn0gYXR0cmlidXRlcyBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVzVG9TZWxlY3RvciA9IChhdHRyaWJ1dGVzKSA9PlxuICBhdHRyaWJ1dGVzLm1hcCgoeyBuYW1lLCB2YWx1ZSB9KSA9PiB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gYFske25hbWV9XWBcbiAgICB9XG4gICAgaWYgKG5hbWUgPT09ICdpZCcgJiYgaXNWYWxpZENTU0lkZW50aWZpZXIodmFsdWUpKSB7XG4gICAgICByZXR1cm4gYCMke3ZhbHVlfWBcbiAgICB9XG4gICAgcmV0dXJuIGBbJHtuYW1lfT1cIiR7dmFsdWV9XCJdYFxuICB9KS5qb2luKCcnKVxuXG4vKipcbiAqIENvbnZlcnQgY2xhc3NlcyB0byBDU1Mgc2VsZWN0b3JcbiAqIFxuICogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gY2xhc3NlcyBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBjbGFzc2VzVG9TZWxlY3RvciA9IChjbGFzc2VzKSA9PlxuICBjbGFzc2VzLm1hcChjID0+IGlzVmFsaWRDU1NJZGVudGlmaWVyKGMpID8gYC4ke2N9YCA6IGBbY2xhc3N+PVwiJHtjfVwiXWApLmpvaW4oJycpXG5cbi8qKlxuICogQ29udmVydCBwc2V1ZG8gc2VsZWN0b3JzIHRvIENTUyBzZWxlY3RvclxuICogXG4gKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fSBwc2V1ZG8gXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgcHNldWRvVG9TZWxlY3RvciA9IChwc2V1ZG8pID0+IHBzZXVkby5sZW5ndGggPyBgOiR7cHNldWRvLmpvaW4oJzonKX1gIDogJydcblxuLyoqXG4gKiBDb252ZXJ0IHBhdHRlcm4gdG8gQ1NTIHNlbGVjdG9yXG4gKiBcbiAqIEBwYXJhbSB7UGF0dGVybn0gcGF0dGVybiBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBwYXR0ZXJuVG9TZWxlY3RvciA9IChwYXR0ZXJuKSA9PiB7XG4gIGNvbnN0IHsgcmVsYXRlcywgdGFnLCBhdHRyaWJ1dGVzLCBjbGFzc2VzLCBwc2V1ZG8gfSA9IHBhdHRlcm5cbiAgY29uc3QgdmFsdWUgPSBgJHtcbiAgICByZWxhdGVzID09PSAnY2hpbGQnID8gJz4gJyA6ICcnXG4gIH0ke1xuICAgIHRhZyB8fCAnJ1xuICB9JHtcbiAgICBhdHRyaWJ1dGVzVG9TZWxlY3RvcihhdHRyaWJ1dGVzKVxuICB9JHtcbiAgICBjbGFzc2VzVG9TZWxlY3RvcihjbGFzc2VzKVxuICB9JHtcbiAgICBwc2V1ZG9Ub1NlbGVjdG9yKHBzZXVkbylcbiAgfWBcbiAgcmV0dXJuIHZhbHVlXG59XG5cbi8qKlxuICogQ29udmVydHMgcGF0aCB0byBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge0FycmF5LjxQYXR0ZXJuPn0gcGF0aCBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBwYXRoVG9TZWxlY3RvciA9IChwYXRoKSA9PlxuICBwYXRoLm1hcChwYXR0ZXJuVG9TZWxlY3Rvcikuam9pbignICcpXG5cblxuY29uc3QgY29udmVydEVzY2FwaW5nID0gKHZhbHVlKSA9PlxuICB2YWx1ZSAmJiB2YWx1ZS5yZXBsYWNlKC9cXFxcKFtgXFxcXC86PyYhIyQlXigpW1xcXXt8fSorOywuPD0+QH5dKS9nLCAnJDEnKVxuICAgIC5yZXBsYWNlKC9cXFxcKFsnXCJdKS9nLCAnJDEkMScpXG4gICAgLnJlcGxhY2UoL1xcXFxBIC9nLCAnXFxuJylcblxuLyoqXG4qIENvbnZlcnQgYXR0cmlidXRlcyB0byBYUGF0aCBzdHJpbmdcbiogXG4qIEBwYXJhbSB7QXJyYXkuPHsgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nPyB9Pn0gYXR0cmlidXRlcyBcbiogQHJldHVybnMge3N0cmluZ31cbiovXG5leHBvcnQgY29uc3QgYXR0cmlidXRlc1RvWFBhdGggPSAoYXR0cmlidXRlcykgPT5cbiAgYXR0cmlidXRlcy5tYXAoKHsgbmFtZSwgdmFsdWUgfSkgPT4ge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGBbQCR7bmFtZX1dYFxuICAgIH1cbiAgICByZXR1cm4gYFtAJHtuYW1lfT1cIiR7Y29udmVydEVzY2FwaW5nKHZhbHVlKX1cIl1gXG4gIH0pLmpvaW4oJycpXG5cbi8qKlxuKiBDb252ZXJ0IGNsYXNzZXMgdG8gWFBhdGggc3RyaW5nXG4qIFxuKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fSBjbGFzc2VzIFxuKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmV4cG9ydCBjb25zdCBjbGFzc2VzVG9YUGF0aCA9IChjbGFzc2VzKSA9PlxuICBjbGFzc2VzLm1hcChjID0+IGBbY29udGFpbnMoY29uY2F0KFwiIFwiLG5vcm1hbGl6ZS1zcGFjZShAY2xhc3MpLFwiIFwiKSxcIiAke2N9IFwiKV1gKS5qb2luKCcnKVxuXG4vKipcbiogQ29udmVydCBwc2V1ZG8gc2VsZWN0b3JzIHRvIFhQYXRoIHN0cmluZ1xuKiBcbiogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gcHNldWRvIFxuKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmV4cG9ydCBjb25zdCBwc2V1ZG9Ub1hQYXRoID0gKHBzZXVkbykgPT5cbiAgcHNldWRvLm1hcChwID0+IHtcbiAgICBjb25zdCBtYXRjaCA9IHAubWF0Y2goL14obnRoLWNoaWxkfG50aC1vZi10eXBlfGNvbnRhaW5zKVxcKCguKylcXCkkLylcbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICByZXR1cm4gJydcbiAgICB9XG5cbiAgICBzd2l0Y2ggKG1hdGNoWzFdKSB7XG4gICAgICBjYXNlICdudGgtY2hpbGQnOlxuICAgICAgICByZXR1cm4gYFsoY291bnQocHJlY2VkaW5nLXNpYmxpbmc6OiopKzEpID0gJHttYXRjaFsyXX1dYFxuXG4gICAgICBjYXNlICdudGgtb2YtdHlwZSc6XG4gICAgICAgIHJldHVybiBgWyR7bWF0Y2hbMl19XWBcblxuICAgICAgY2FzZSAnY29udGFpbnMnOlxuICAgICAgICByZXR1cm4gYFtjb250YWlucyh0ZXh0KCksJHttYXRjaFsyXX0pXWBcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICcnXG4gICAgfVxuICB9KS5qb2luKCcnKVxuXG4vKipcbiogQ29udmVydCBwYXR0ZXJuIHRvIFhQYXRoIHN0cmluZ1xuKiBcbiogQHBhcmFtIHtQYXR0ZXJufSBwYXR0ZXJuIFxuKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmV4cG9ydCBjb25zdCBwYXR0ZXJuVG9YUGF0aCA9IChwYXR0ZXJuKSA9PiB7XG4gIGNvbnN0IHsgcmVsYXRlcywgdGFnLCBhdHRyaWJ1dGVzLCBjbGFzc2VzLCBwc2V1ZG8sIGRlc2NlbmRhbnRzIH0gPSBwYXR0ZXJuXG4gIGNvbnN0IHZhbHVlID0gYCR7XG4gICAgcmVsYXRlcyA9PT0gJ2NoaWxkJyA/ICcvJyA6ICcvLydcbiAgfSR7XG4gICAgdGFnIHx8ICcqJ1xuICB9JHtcbiAgICBhdHRyaWJ1dGVzVG9YUGF0aChhdHRyaWJ1dGVzKVxuICB9JHtcbiAgICBjbGFzc2VzVG9YUGF0aChjbGFzc2VzKVxuICB9JHtcbiAgICBwc2V1ZG9Ub1hQYXRoKHBzZXVkbylcbiAgfSR7XG4gICAgZGVzY2VuZGFudHNUb1hQYXRoKGRlc2NlbmRhbnRzKVxuICB9YFxuICByZXR1cm4gdmFsdWVcbn1cblxuLyoqXG4qIENvbnZlcnRzIHBhdGggdG8gWFBhdGggc3RyaW5nXG4qXG4qIEBwYXJhbSB7QXJyYXkuPFBhdHRlcm4+fSBwYXRoIFxuKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmV4cG9ydCBjb25zdCBwYXRoVG9YUGF0aCA9IChwYXRoKSA9PiBgLiR7cGF0aC5tYXAocGF0dGVyblRvWFBhdGgpLmpvaW4oJycpfWBcblxuLyoqXG4qIENvbnZlcnQgY2hpbGQgc2VsZWN0b3JzIHRvIFhQYXRoIHN0cmluZ1xuKiBcbiogQHBhcmFtIHtBcnJheS48QXJyYXkuPFBhdHRlcm4+Pn0gY2hpbGRyZW4gXG4qIEByZXR1cm5zIHtzdHJpbmd9XG4qL1xuZXhwb3J0IGNvbnN0IGRlc2NlbmRhbnRzVG9YUGF0aCA9IChjaGlsZHJlbikgPT5cbiAgY2hpbGRyZW4ubGVuZ3RoID8gYFske2NoaWxkcmVuLm1hcChwYXRoVG9YUGF0aCkuam9pbignXVsnKX1dYCA6ICcnXG5cbiAgXG5jb25zdCB0b1N0cmluZyA9IHtcbiAgJ2Nzcyc6IHtcbiAgICBhdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzVG9TZWxlY3RvcixcbiAgICBjbGFzc2VzOiBjbGFzc2VzVG9TZWxlY3RvcixcbiAgICBwc2V1ZG86IHBzZXVkb1RvU2VsZWN0b3IsXG4gICAgcGF0dGVybjogcGF0dGVyblRvU2VsZWN0b3IsXG4gICAgcGF0aDogcGF0aFRvU2VsZWN0b3JcbiAgfSxcbiAgJ3hwYXRoJzoge1xuICAgIGF0dHJpYnV0ZXM6IGF0dHJpYnV0ZXNUb1hQYXRoLFxuICAgIGNsYXNzZXM6IGNsYXNzZXNUb1hQYXRoLFxuICAgIHBzZXVkbzogcHNldWRvVG9YUGF0aCxcbiAgICBwYXR0ZXJuOiBwYXR0ZXJuVG9YUGF0aCxcbiAgICBwYXRoOiBwYXRoVG9YUGF0aFxuICB9LFxuICAnanF1ZXJ5Jzoge31cbn1cblxudG9TdHJpbmcuanF1ZXJ5ID0gdG9TdHJpbmcuY3NzXG50b1N0cmluZ1swXSA9IHRvU3RyaW5nLmNzc1xudG9TdHJpbmdbMV0gPSB0b1N0cmluZy54cGF0aFxuICBcbi8qKlxuICogQHR5cGVkZWYgIHtPYmplY3R9IFRvU3RyaW5nQXBpXG4gKiBAcHJvcGVydHkgeyhhdHRyaWJ1dGVzOiBBcnJheS48eyBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmc/IH0+KSA9PiBzdHJpbmd9IGF0dHJpYnV0ZXNcbiAqIEBwcm9wZXJ0eSB7KGNsYXNzZXM6IEFycmF5LjxzdHJpbmc+KSA9PiBzdHJpbmd9ICBjbGFzc2VzXG4gKiBAcHJvcGVydHkgeyhwc2V1ZG86IEFycmF5LjxzdHJpbmc+KSA9PiBzdHJpbmd9ICAgcHNldWRvXG4gKiBAcHJvcGVydHkgeyhwYXR0ZXJuOiBQYXR0ZXJuKSA9PiBzdHJpbmd9ICAgICAgICAgcGF0dGVyblxuICogQHByb3BlcnR5IHsocGF0aDogQXJyYXkuPFBhdHRlcm4+KSA9PiBzdHJpbmd9ICAgIHBhdGhcbiAqL1xuXG4vKipcbiAqIFxuICogQHBhcmFtIHtPcHRpb25zfSBvcHRpb25zIFxuICogQHJldHVybnMge1RvU3RyaW5nQXBpfVxuICovXG5leHBvcnQgY29uc3QgZ2V0VG9TdHJpbmcgPSAob3B0aW9ucyA9IHt9KSA9PlxuICB0b1N0cmluZ1tvcHRpb25zLmZvcm1hdCB8fCAnY3NzJ11cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGF0dGVybi5qcyIsIi8vIGltcG9ydCBTaXp6bGUgZnJvbSAnc2l6emxlJ1xubGV0IFNpenpsZVxuXG4vKipcbiAqIFNlbGVjdCBlbGVtZW50IHVzaW5nIGpRdWVyeVxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgIHNlbGVjdG9yXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgcGFyZW50XG4gKiBAcmV0dXJuIEFycmF5LjxIVE1MRWxlbWVudD5cbiAqL1xuY29uc3Qgc2VsZWN0SlF1ZXJ5ID0gKHNlbGVjdG9yLCBwYXJlbnQgPSBudWxsKSA9PiB7XG4gIGlmICghU2l6emxlKSB7XG4gICAgU2l6emxlID0gcmVxdWlyZSgnc2l6emxlJylcbiAgfVxuICByZXR1cm4gU2l6emxlKHNlbGVjdG9yLCBwYXJlbnQgfHwgZG9jdW1lbnQpXG59XG4gIFxuLyoqXG4gKiBTZWxlY3QgZWxlbWVudCB1c2luZyBYUGF0aFxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgIHNlbGVjdG9yXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgcGFyZW50XG4gKiBAcmV0dXJuIEFycmF5LjxIVE1MRWxlbWVudD5cbiAqL1xuY29uc3Qgc2VsZWN0WFBhdGggPSAoc2VsZWN0b3IsIHBhcmVudCA9IG51bGwpID0+IHtcbiAgcGFyZW50ID0gKHBhcmVudCB8fCBkb2N1bWVudClcbiAgdmFyIGRvYyA9IHBhcmVudFxuICB3aGlsZSAoZG9jLnBhcmVudE5vZGUpIHtcbiAgICBkb2MgPSBkb2MucGFyZW50Tm9kZVxuICB9XG4gIGlmIChkb2MgIT09IHBhcmVudCAmJiAhc2VsZWN0b3Iuc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgc2VsZWN0b3IgPSBgLiR7c2VsZWN0b3J9YFxuICB9XG4gIHZhciBpdGVyYXRvciA9IGRvYy5ldmFsdWF0ZShzZWxlY3RvciwgcGFyZW50LCBudWxsLCAwKVxuICB2YXIgZWxlbWVudHMgPSBbXVxuICB2YXIgZWxlbWVudFxuICB3aGlsZSAoKGVsZW1lbnQgPSBpdGVyYXRvci5pdGVyYXRlTmV4dCgpKSkge1xuICAgIGVsZW1lbnRzLnB1c2goZWxlbWVudClcbiAgfVxuICByZXR1cm4gZWxlbWVudHNcbn1cbiAgXG4vKipcbiAqIFNlbGVjdCBlbGVtZW50IHVzaW5nIENTU1xuICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgIHNlbGVjdG9yXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgcGFyZW50XG4gKiBAcmV0dXJuIEFycmF5LjxIVE1MRWxlbWVudD5cbiAqL1xuY29uc3Qgc2VsZWN0Q1NTID0gKHNlbGVjdG9yLCBwYXJlbnQgPSBudWxsKSA9PlxuICAocGFyZW50IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuXG5jb25zdCBzZWxlY3QgPSB7XG4gICdjc3MnOiBzZWxlY3RDU1MsXG4gICd4cGF0aCc6IHNlbGVjdFhQYXRoLFxuICAnanF1ZXJ5Jzogc2VsZWN0SlF1ZXJ5XG59XG5cbnNlbGVjdFswXSA9IHNlbGVjdC5jc3NcbnNlbGVjdFsxXSA9IHNlbGVjdC54cGF0aFxuXG4vKipcbiogXG4qIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9ucyBcbiogQHJldHVybnMgeyhzZWxlY3Rvcjogc3RyaW5nLCBwYXJlbnQ6IEhUTUxFbGVtZW50KSA9PiBBcnJheS48SFRNTEVsZW1lbnQ+fVxuKi9cbmV4cG9ydCBjb25zdCBnZXRTZWxlY3QgPSAob3B0aW9ucyA9IHt9KSA9PlxuICAoc2VsZWN0b3IsIHBhcmVudCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc2VsZWN0W29wdGlvbnMuZm9ybWF0IHx8ICdjc3MnXShzZWxlY3RvciwgcGFyZW50IHx8IG9wdGlvbnMucm9vdClcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBbXVxuICAgIH1cbiAgfVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VsZWN0b3IuanMiLCIvKipcbiAqICMgQ29tbW9uXG4gKlxuICogUHJvY2VzcyBjb2xsZWN0aW9ucyBmb3Igc2ltaWxhcml0aWVzLlxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnLi9zZWxlY3QnKS5PcHRpb25zfSBPcHRpb25zXG4gKi9cblxuLyoqXG4gKiBGaW5kIHRoZSBsYXN0IGNvbW1vbiBhbmNlc3RvciBvZiBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICAgICAgICBvcHRpb25zICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldENvbW1vbkFuY2VzdG9yID0gKGVsZW1lbnRzLCBvcHRpb25zID0ge30pID0+IHtcblxuICBjb25zdCB7XG4gICAgcm9vdCA9IGRvY3VtZW50XG4gIH0gPSBvcHRpb25zXG5cbiAgY29uc3QgYW5jZXN0b3JzID0gW11cblxuICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHBhcmVudHMgPSBbXVxuICAgIHdoaWxlIChlbGVtZW50ICE9PSByb290KSB7XG4gICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlXG4gICAgICBwYXJlbnRzLnVuc2hpZnQoZWxlbWVudClcbiAgICB9XG4gICAgYW5jZXN0b3JzW2luZGV4XSA9IHBhcmVudHNcbiAgfSlcblxuICBhbmNlc3RvcnMuc29ydCgoY3VyciwgbmV4dCkgPT4gY3Vyci5sZW5ndGggLSBuZXh0Lmxlbmd0aClcblxuICBjb25zdCBzaGFsbG93QW5jZXN0b3IgPSBhbmNlc3RvcnMuc2hpZnQoKVxuXG4gIHZhciBhbmNlc3RvciA9IG51bGxcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IHNoYWxsb3dBbmNlc3Rvci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCBwYXJlbnQgPSBzaGFsbG93QW5jZXN0b3JbaV1cbiAgICBjb25zdCBtaXNzaW5nID0gYW5jZXN0b3JzLnNvbWUoKG90aGVyUGFyZW50cykgPT4ge1xuICAgICAgcmV0dXJuICFvdGhlclBhcmVudHMuc29tZSgob3RoZXJQYXJlbnQpID0+IG90aGVyUGFyZW50ID09PSBwYXJlbnQpXG4gICAgfSlcblxuICAgIGlmIChtaXNzaW5nKSB7XG4gICAgICAvLyBUT0RPOiBmaW5kIHNpbWlsYXIgc3ViLXBhcmVudHMsIG5vdCB0aGUgdG9wIHJvb3QsIGUuZy4gc2hhcmluZyBhIGNsYXNzIHNlbGVjdG9yXG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGFuY2VzdG9yID0gcGFyZW50XG4gIH1cblxuICByZXR1cm4gYW5jZXN0b3Jcbn1cblxuLyoqXG4gKiBHZXQgYSBzZXQgb2YgY29tbW9uIHByb3BlcnRpZXMgb2YgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgY29uc3QgZ2V0Q29tbW9uUHJvcGVydGllcyA9IChlbGVtZW50cywgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGNvbnN0IHsgaWdub3JlID0ge30gfSA9IG9wdGlvbnNcblxuICBjb25zdCBjb21tb25Qcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzZXM6IFtdLFxuICAgIGF0dHJpYnV0ZXM6IHt9LFxuICAgIHRhZzogbnVsbFxuICB9XG5cbiAgZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXG4gICAgdmFyIHtcbiAgICAgIGNsYXNzZXM6IGNvbW1vbkNsYXNzZXMsXG4gICAgICBhdHRyaWJ1dGVzOiBjb21tb25BdHRyaWJ1dGVzLFxuICAgICAgdGFnOiBjb21tb25UYWdcbiAgICB9ID0gY29tbW9uUHJvcGVydGllc1xuXG4gICAgLy8gfiBjbGFzc2VzXG4gICAgaWYgKGNvbW1vbkNsYXNzZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnY2xhc3MnKVxuICAgICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMudHJpbSgpLnNwbGl0KCcgJykuZmlsdGVyKGNscyA9PiAhaWdub3JlLmNsYXNzIHx8ICFpZ25vcmUuY2xhc3MoY2xzKSlcbiAgICAgICAgaWYgKCFjb21tb25DbGFzc2VzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbW1vblByb3BlcnRpZXMuY2xhc3NlcyA9IGNsYXNzZXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21tb25DbGFzc2VzID0gY29tbW9uQ2xhc3Nlcy5maWx0ZXIoKGVudHJ5KSA9PiBjbGFzc2VzLnNvbWUoKG5hbWUpID0+IG5hbWUgPT09IGVudHJ5KSlcbiAgICAgICAgICBpZiAoY29tbW9uQ2xhc3Nlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbW1vblByb3BlcnRpZXMuY2xhc3NlcyA9IGNvbW1vbkNsYXNzZXNcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIGNvbW1vblByb3BlcnRpZXMuY2xhc3Nlc1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIGNvbW1vblByb3BlcnRpZXMuY2xhc3Nlc1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIH4gYXR0cmlidXRlc1xuICAgIGlmIChjb21tb25BdHRyaWJ1dGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnRBdHRyaWJ1dGVzID0gZWxlbWVudC5hdHRyaWJ1dGVzXG4gICAgICBjb25zdCBhdHRyaWJ1dGVzID0gT2JqZWN0LmtleXMoZWxlbWVudEF0dHJpYnV0ZXMpLnJlZHVjZSgoYXR0cmlidXRlcywga2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGVsZW1lbnRBdHRyaWJ1dGVzW2tleV1cbiAgICAgICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGF0dHJpYnV0ZS5uYW1lXG4gICAgICAgIGlmIChhdHRyaWJ1dGUgJiYgYXR0cmlidXRlTmFtZSAhPT0gJ2NsYXNzJyAmJiAoIWlnbm9yZS5hdHRyaWJ1dGUgfHwgIWlnbm9yZS5hdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlLnZhbHVlKSkpIHtcbiAgICAgICAgICBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID0gYXR0cmlidXRlLnZhbHVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXNcbiAgICAgIH0sIHt9KVxuXG4gICAgICBjb25zdCBhdHRyaWJ1dGVzTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKVxuICAgICAgY29uc3QgY29tbW9uQXR0cmlidXRlc05hbWVzID0gT2JqZWN0LmtleXMoY29tbW9uQXR0cmlidXRlcylcblxuICAgICAgaWYgKGF0dHJpYnV0ZXNOYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCFjb21tb25BdHRyaWJ1dGVzTmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbW1vbkF0dHJpYnV0ZXMgPSBjb21tb25BdHRyaWJ1dGVzTmFtZXMucmVkdWNlKChuZXh0Q29tbW9uQXR0cmlidXRlcywgbmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjb21tb25BdHRyaWJ1dGVzW25hbWVdXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IGF0dHJpYnV0ZXNbbmFtZV0pIHtcbiAgICAgICAgICAgICAgbmV4dENvbW1vbkF0dHJpYnV0ZXNbbmFtZV0gPSB2YWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5leHRDb21tb25BdHRyaWJ1dGVzXG4gICAgICAgICAgfSwge30pXG4gICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGNvbW1vbkF0dHJpYnV0ZXMpLmxlbmd0aCkge1xuICAgICAgICAgICAgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzID0gY29tbW9uQXR0cmlidXRlc1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gfiB0YWdcbiAgICBpZiAoY29tbW9uVGFnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHRhZyA9IGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICBpZiAoIWNvbW1vblRhZykge1xuICAgICAgICBjb21tb25Qcm9wZXJ0aWVzLnRhZyA9IHRhZ1xuICAgICAgfSBlbHNlIGlmICh0YWcgIT09IGNvbW1vblRhZykge1xuICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy50YWdcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIGNvbW1vblByb3BlcnRpZXNcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24uanMiLCIvKipcbiAqICMgTWF0Y2hcbiAqXG4gKiBSZXRyaWV2ZSBzZWxlY3RvciBmb3IgYSBub2RlLlxuICovXG5cbmltcG9ydCB7IGNyZWF0ZVBhdHRlcm4sIGdldFRvU3RyaW5nIH0gZnJvbSAnLi9wYXR0ZXJuJ1xuaW1wb3J0IHsgZ2V0U2VsZWN0IH0gZnJvbSAnLi9zZWxlY3RvcidcbmltcG9ydCB7IGVzY2FwZVZhbHVlIH0gZnJvbSAnLi91dGlsaXRpZXMnXG5cbi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnLi9zZWxlY3QnKS5PcHRpb25zfSBPcHRpb25zXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3BhdHRlcm4nKS5QYXR0ZXJufSBQYXR0ZXJuXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3BhdHRlcm4nKS5Ub1N0cmluZ0FwaX0gUGF0dGVyblxuICovXG5cbmNvbnN0IGRlZmF1bHRJZ25vcmUgPSB7XG4gIGF0dHJpYnV0ZSAoYXR0cmlidXRlTmFtZSkge1xuICAgIHJldHVybiBbXG4gICAgICAnc3R5bGUnLFxuICAgICAgJ2RhdGEtcmVhY3RpZCcsXG4gICAgICAnZGF0YS1yZWFjdC1jaGVja3N1bSdcbiAgICBdLmluZGV4T2YoYXR0cmlidXRlTmFtZSkgPiAtMVxuICB9LFxuICBjb250YWluczogKCkgPT4gdHJ1ZVxufVxuXG5leHBvcnQgY29uc3QgaW5pdE9wdGlvbnMgPSAob3B0aW9ucyA9IHt9KSA9PiAoe1xuICAuLi5vcHRpb25zLFxuICByb290OiBvcHRpb25zLnJvb3QgfHwgZG9jdW1lbnQsXG4gIHNraXA6IG9wdGlvbnMuc2tpcCB8fCBudWxsLFxuICBwcmlvcml0eTogb3B0aW9ucy5wcmlvcml0eSB8fCBbJ2lkJywgJ2NsYXNzJywgJ2hyZWYnLCAnc3JjJ10sXG4gIGlnbm9yZTogb3B0aW9ucy5pZ25vcmUgfHwge31cbn0pXG5cbi8qKlxuICogR2V0IHRoZSBwYXRoIG9mIHRoZSBlbGVtZW50XG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IG5vZGUgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICBbb3B0aW9uc10gLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtBcnJheS48UGF0dGVybj59ICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYXRjaCAobm9kZSwgb3B0aW9ucyA9IHt9LCBuZXN0ZWQgPSBmYWxzZSkge1xuICBvcHRpb25zID0gaW5pdE9wdGlvbnMob3B0aW9ucylcbiAgY29uc3QgeyByb290LCBza2lwLCBpZ25vcmUsIGZvcm1hdCB9ID0gb3B0aW9uc1xuXG4gIGNvbnN0IHBhdGggPSBbXVxuICBsZXQgZWxlbWVudCA9IG5vZGVcbiAgbGV0IGxlbmd0aCA9IHBhdGgubGVuZ3RoXG4gIGNvbnN0IHNlbGVjdCA9IGdldFNlbGVjdChvcHRpb25zKVxuICBjb25zdCB0b1N0cmluZyA9IGdldFRvU3RyaW5nKG9wdGlvbnMpXG5cbiAgY29uc3Qgc2tpcENvbXBhcmUgPSBza2lwICYmIChBcnJheS5pc0FycmF5KHNraXApID8gc2tpcCA6IFtza2lwXSkubWFwKChlbnRyeSkgPT4ge1xuICAgIGlmICh0eXBlb2YgZW50cnkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAoZWxlbWVudCkgPT4gZWxlbWVudCA9PT0gZW50cnlcbiAgICB9XG4gICAgcmV0dXJuIGVudHJ5XG4gIH0pXG5cbiAgY29uc3Qgc2tpcENoZWNrcyA9IChlbGVtZW50KSA9PiB7XG4gICAgcmV0dXJuIHNraXAgJiYgc2tpcENvbXBhcmUuc29tZSgoY29tcGFyZSkgPT4gY29tcGFyZShlbGVtZW50KSlcbiAgfVxuXG4gIE9iamVjdC5rZXlzKGlnbm9yZSkuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgIHZhciBwcmVkaWNhdGUgPSBpZ25vcmVbdHlwZV1cbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuXG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgPT09ICdudW1iZXInKSB7XG4gICAgICBwcmVkaWNhdGUgPSBwcmVkaWNhdGUudG9TdHJpbmcoKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHByZWRpY2F0ZSA9IG5ldyBSZWdFeHAoZXNjYXBlVmFsdWUocHJlZGljYXRlKS5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBwcmVkaWNhdGUgPSBwcmVkaWNhdGUgPyAvKD86KS8gOiAvLl4vXG4gICAgfVxuICAgIC8vIGNoZWNrIGNsYXNzLS9hdHRyaWJ1dGVuYW1lIGZvciByZWdleFxuICAgIGlnbm9yZVt0eXBlXSA9IChuYW1lLCB2YWx1ZSkgPT4gcHJlZGljYXRlLnRlc3QodmFsdWUpXG4gIH0pXG5cbiAgd2hpbGUgKGVsZW1lbnQgIT09IHJvb3QgJiYgZWxlbWVudC5ub2RlVHlwZSAhPT0gMTEpIHtcbiAgICBpZiAoc2tpcENoZWNrcyhlbGVtZW50KSAhPT0gdHJ1ZSkge1xuICAgICAgLy8gfiBnbG9iYWxcbiAgICAgIGlmIChjaGVja0F0dHJpYnV0ZXMoZWxlbWVudCwgcGF0aCwgb3B0aW9ucywgc2VsZWN0LCB0b1N0cmluZywgcm9vdCkpIGJyZWFrXG4gICAgICBpZiAoY2hlY2tUYWcoZWxlbWVudCwgcGF0aCwgb3B0aW9ucywgc2VsZWN0LCB0b1N0cmluZywgcm9vdCkpIGJyZWFrXG5cbiAgICAgIC8vIH4gbG9jYWxcbiAgICAgIGNoZWNrQXR0cmlidXRlcyhlbGVtZW50LCBwYXRoLCBvcHRpb25zLCBzZWxlY3QsIHRvU3RyaW5nKVxuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSBsZW5ndGgpIHtcbiAgICAgICAgY2hlY2tUYWcoZWxlbWVudCwgcGF0aCwgb3B0aW9ucywgc2VsZWN0LCB0b1N0cmluZylcbiAgICAgIH1cblxuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSBsZW5ndGggJiYgWzEsICd4cGF0aCddLmluY2x1ZGVzKGZvcm1hdCkgJiYgIW5lc3RlZCAmJiBlbGVtZW50ID09PSBub2RlKSB7XG4gICAgICAgIGNoZWNrUmVjdXJzaXZlRGVzY2VuZGFudHMoZWxlbWVudCwgcGF0aCwgb3B0aW9ucywgc2VsZWN0LCB0b1N0cmluZylcbiAgICAgIH1cblxuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSBsZW5ndGggJiYgWzEsICd4cGF0aCcsICdqcXVlcnknXS5pbmNsdWRlcyhmb3JtYXQpKSB7XG4gICAgICAgIGNoZWNrVGV4dChlbGVtZW50LCBwYXRoLCBvcHRpb25zLCBzZWxlY3QsIHRvU3RyaW5nLCBmb3JtYXQgPT09ICdqcXVlcnknKVxuICAgICAgfVxuXG4gICAgICBpZiAocGF0aC5sZW5ndGggPT09IGxlbmd0aCkge1xuICAgICAgICBjaGVja050aENoaWxkKGVsZW1lbnQsIHBhdGgsIG9wdGlvbnMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZVxuICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoXG4gIH1cblxuICBpZiAoZWxlbWVudCA9PT0gcm9vdCkge1xuICAgIGNvbnN0IHBhdHRlcm4gPSBmaW5kUGF0dGVybihlbGVtZW50LCBvcHRpb25zLCBzZWxlY3QsIHRvU3RyaW5nKVxuICAgIHBhdGgudW5zaGlmdChwYXR0ZXJuKVxuICB9XG5cbiAgcmV0dXJuIHBhdGhcbn1cblxuLyoqXG4gKiBFeHRlbmQgcGF0aCB3aXRoIGF0dHJpYnV0ZSBpZGVudGlmaWVyXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgICBlbGVtZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gcGF0aCAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPcHRpb25zfSAgICAgICAgIG9wdGlvbnMgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgICBzZWxlY3QgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICAgdG9TdHJpbmcgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgIHBhcmVudCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3QgY2hlY2tBdHRyaWJ1dGVzID0gKGVsZW1lbnQsIHBhdGgsIHsgcHJpb3JpdHksIGlnbm9yZSB9LCBzZWxlY3QsIHRvU3RyaW5nLCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGUpID0+IHtcbiAgY29uc3QgcGF0dGVybiA9IGZpbmRBdHRyaWJ1dGVzUGF0dGVybihwcmlvcml0eSwgZWxlbWVudCwgaWdub3JlLCBzZWxlY3QsIHRvU3RyaW5nLCBwYXJlbnQpXG4gIGlmIChwYXR0ZXJuKSB7XG4gICAgcGF0aC51bnNoaWZ0KHBhdHRlcm4pXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIGFycmF5IG9mIGNvbWJpbmF0aW9ucyBvZiBpdGVtcyBpbiBpbnB1dCBhcnJheS5cbiAqIEBwYXJhbSAge0FycmF5Ljxhbnk+fSB2YWx1ZXMgICAtIGFycmF5IG9mIHZhbHVlc1xuICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zICAgICAgIC0gb3B0aW9uczogbWluIC0gbWluaW11bSBzdWJzZXQgc2l6ZTsgbWF4IC0gbWF4aW11bSBzdWJzZXQgc2l6ZVxuICogQHJldHVybiB7QXJyYXkuPEFycmF5Ljxhbnk+Pj99ICAgYXJyYXkgb2Ygc3Vic2V0c1xuICovXG5leHBvcnQgY29uc3QgY29tYmluYXRpb25zID0gKHZhbHVlcywgb3B0aW9ucykgPT4ge1xuICBjb25zdCB7IG1pbiwgbWF4IH0gPSBvcHRpb25zIHx8IHt9XG4gIGNvbnN0IHJlc3VsdCA9IFtbXV1cblxuICB2YWx1ZXMuZm9yRWFjaCh2ID0+IHtcbiAgICByZXN1bHQuZm9yRWFjaChyID0+IHtcbiAgICAgIGlmICghbWF4IHx8IHIubGVuZ3RoIDwgbWF4KSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHIuY29uY2F0KHYpKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgcmVzdWx0LnNoaWZ0KClcbiAgcmV0dXJuIG1pbiA/IHJlc3VsdC5maWx0ZXIociA9PiByLmxlbmd0aCA+PSBtaW4pIDogcmVzdWx0XG59XG5cbi8vIGxpbWl0IHN1YnNldCBzaXplIHRvIGluY3JlYXNlIHBlcmZvcm1hbmNlXG5jb25zdCBtYXhTdWJzZXRTaXplID0gW1xuICB7IGl0ZW1zOiAxMywgbWF4OiAxIH0sXG4gIHsgaXRlbXM6IDEwLCBtYXg6IDIgfSxcbiAgeyBpdGVtczogOCwgbWF4OiAzIH0sXG4gIHsgaXRlbXM6IDUsIG1heDogNCB9XG5dXG5cbi8qKlxuICogR2V0IGNsYXNzIHNlbGVjdG9yXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPHN0cmluZz59IGNsYXNzZXMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgc2VsZWN0ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBwYXJlbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UGF0dGVybn0gICAgICAgIGJhc2UgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtBcnJheS48c3RyaW5nPj99ICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3QgZ2V0Q2xhc3NTZWxlY3RvciA9IChjbGFzc2VzID0gW10sIHNlbGVjdCwgdG9TdHJpbmcsIHBhcmVudCwgYmFzZSkgPT4ge1xuICBjb25zdCB7IG1heCB9ID1cbiAgICBtYXhTdWJzZXRTaXplLmZpbmQoKHsgaXRlbXMgfSkgPT4gY2xhc3Nlcy5sZW5ndGggPiBpdGVtcykgfHwgeyBtYXg6IGNsYXNzZXMubGVuZ3RoIH1cblxuICBsZXQgcmVzdWx0ID0gY29tYmluYXRpb25zKGNsYXNzZXMsIHsgbWF4IH0pXG5cbiAgZm9yKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHBhdHRlcm4gPSB0b1N0cmluZy5wYXR0ZXJuKHsgLi4uYmFzZSwgY2xhc3NlczogcmVzdWx0W2ldIH0pXG4gICAgY29uc3QgbWF0Y2hlcyA9IHNlbGVjdChwYXR0ZXJuLCBwYXJlbnQpXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gcmVzdWx0W2ldXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGxcbn1cblxuLyoqXG4gKiBMb29rdXAgYXR0cmlidXRlIGlkZW50aWZpZXJcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48c3RyaW5nPn0gcHJpb3JpdHkgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIGVsZW1lbnQgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBpZ25vcmUgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgc2VsZWN0ICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7VG9TdHJpbmdBcGl9ICAgIHRvU3RyaW5nICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1BhcmVudE5vZGV9ICAgICBwYXJlbnQgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtQYXR0ZXJuP30gICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBmaW5kQXR0cmlidXRlc1BhdHRlcm4gPSAocHJpb3JpdHksIGVsZW1lbnQsIGlnbm9yZSwgc2VsZWN0LCB0b1N0cmluZywgcGFyZW50ID0gZWxlbWVudC5wYXJlbnROb2RlKSA9PiB7XG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBlbGVtZW50LmF0dHJpYnV0ZXNcbiAgdmFyIGF0dHJpYnV0ZU5hbWVzID0gT2JqZWN0LmtleXMoYXR0cmlidXRlcykubWFwKCh2YWwpID0+IGF0dHJpYnV0ZXNbdmFsXS5uYW1lKVxuICAgIC5maWx0ZXIoKGEpID0+IHByaW9yaXR5LmluZGV4T2YoYSkgPCAwKVxuXG4gIHZhciBzb3J0ZWRLZXlzID0gWyAuLi5wcmlvcml0eSwgLi4uYXR0cmlidXRlTmFtZXMgXVxuICB2YXIgcGF0dGVybiA9IGNyZWF0ZVBhdHRlcm4oKVxuICBwYXR0ZXJuLnRhZyA9IGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG5cbiAgdmFyIGlzT3B0aW1hbCA9IChwYXR0ZXJuKSA9PiAoc2VsZWN0KHRvU3RyaW5nLnBhdHRlcm4ocGF0dGVybiksIHBhcmVudCkubGVuZ3RoID09PSAxKVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gc29ydGVkS2V5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCBrZXkgPSBzb3J0ZWRLZXlzW2ldXG4gICAgY29uc3QgYXR0cmlidXRlID0gYXR0cmlidXRlc1trZXldXG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGVzY2FwZVZhbHVlKGF0dHJpYnV0ZSAmJiBhdHRyaWJ1dGUubmFtZSlcbiAgICBjb25zdCBhdHRyaWJ1dGVWYWx1ZSA9IGVzY2FwZVZhbHVlKGF0dHJpYnV0ZSAmJiBhdHRyaWJ1dGUudmFsdWUpXG4gICAgY29uc3QgdXNlTmFtZWRJZ25vcmUgPSBhdHRyaWJ1dGVOYW1lICE9PSAnY2xhc3MnXG5cbiAgICBjb25zdCBjdXJyZW50SWdub3JlID0gKHVzZU5hbWVkSWdub3JlICYmIGlnbm9yZVthdHRyaWJ1dGVOYW1lXSkgfHwgaWdub3JlLmF0dHJpYnV0ZVxuICAgIGNvbnN0IGN1cnJlbnREZWZhdWx0SWdub3JlID0gKHVzZU5hbWVkSWdub3JlICYmIGRlZmF1bHRJZ25vcmVbYXR0cmlidXRlTmFtZV0pIHx8IGRlZmF1bHRJZ25vcmUuYXR0cmlidXRlXG4gICAgaWYgKGNoZWNrSWdub3JlKGN1cnJlbnRJZ25vcmUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlLCBjdXJyZW50RGVmYXVsdElnbm9yZSkpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgc3dpdGNoIChhdHRyaWJ1dGVOYW1lKSB7XG4gICAgICBjYXNlICdjbGFzcyc6IHtcbiAgICAgICAgbGV0IGNsYXNzTmFtZXMgPSBhdHRyaWJ1dGVWYWx1ZS50cmltKCkuc3BsaXQoL1xccysvZylcbiAgICAgICAgaWYgKCFjbGFzc05hbWVzWzBdKSB7IC8vIGVtcHR5IHN0cmluZ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2xhc3NJZ25vcmUgPSBpZ25vcmUuY2xhc3MgfHwgZGVmYXVsdElnbm9yZS5jbGFzc1xuICAgICAgICBpZiAoY2xhc3NJZ25vcmUpIHtcbiAgICAgICAgICBjbGFzc05hbWVzID0gY2xhc3NOYW1lcy5maWx0ZXIoY2xhc3NOYW1lID0+ICFjbGFzc0lnbm9yZShjbGFzc05hbWUpKVxuICAgICAgICB9XG4gICAgICAgIGlmIChjbGFzc05hbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBjbGFzc2VzID0gZ2V0Q2xhc3NTZWxlY3RvcihjbGFzc05hbWVzLCBzZWxlY3QsIHRvU3RyaW5nLCBwYXJlbnQsIHBhdHRlcm4pXG4gICAgICAgICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgICAgIHBhdHRlcm4uY2xhc3NlcyA9IGNsYXNzZXNcbiAgICAgICAgICAgIGlmIChpc09wdGltYWwocGF0dGVybikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhdHRlcm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgICAgYnJlYWtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcGF0dGVybi5hdHRyaWJ1dGVzLnB1c2goeyBuYW1lOiBhdHRyaWJ1dGVOYW1lLCB2YWx1ZTogYXR0cmlidXRlVmFsdWUgfSlcbiAgICAgICAgaWYgKGlzT3B0aW1hbChwYXR0ZXJuKSkge1xuICAgICAgICAgIHJldHVybiBwYXR0ZXJuXG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbFxufVxuXG5cbi8qKlxuICogRXh0ZW5kIHBhdGggd2l0aCB0YWcgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICAgZWxlbWVudCAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICAgb3B0aW9ucyAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59IHBhdGggICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgIHNlbGVjdCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgICBwYXJlbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBjaGVja1RhZyA9IChlbGVtZW50LCBwYXRoLCB7IGlnbm9yZSB9LCBzZWxlY3QsIHRvU3RyaW5nLCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGUpID0+IHtcbiAgY29uc3QgcGF0dGVybiA9IGZpbmRUYWdQYXR0ZXJuKGVsZW1lbnQsIGlnbm9yZSlcbiAgaWYgKHBhdHRlcm4pIHtcbiAgICBsZXQgbWF0Y2hlcyA9IFtdXG4gICAgbWF0Y2hlcyA9IHNlbGVjdCh0b1N0cmluZy5wYXR0ZXJuKHBhdHRlcm4pLCBwYXJlbnQpXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICBwYXRoLnVuc2hpZnQocGF0dGVybilcbiAgICAgIGlmIChwYXR0ZXJuLnRhZyA9PT0gJ2lmcmFtZScpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBMb29rdXAgdGFnIGlkZW50aWZpZXJcbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICBpZ25vcmUgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7UGF0dGVybj99ICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IGZpbmRUYWdQYXR0ZXJuID0gKGVsZW1lbnQsIGlnbm9yZSkgPT4ge1xuICBjb25zdCB0YWdOYW1lID0gZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKClcbiAgaWYgKGNoZWNrSWdub3JlKGlnbm9yZS50YWcsIG51bGwsIHRhZ05hbWUpKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICBjb25zdCBwYXR0ZXJuID0gY3JlYXRlUGF0dGVybigpXG4gIHBhdHRlcm4udGFnID0gdGFnTmFtZVxuICByZXR1cm4gcGF0dGVyblxufVxuXG4vKipcbiAqIEV4dGVuZCBwYXRoIHdpdGggc3BlY2lmaWMgY2hpbGQgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICAgZWxlbWVudCAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICAgb3B0aW9ucyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gcGF0aCAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3QgY2hlY2tOdGhDaGlsZCA9IChlbGVtZW50LCBwYXRoLCB7IGlnbm9yZSB9KSA9PiB7XG4gIGNvbnN0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZVxuICBjb25zdCBjaGlsZHJlbiA9IHBhcmVudC5jaGlsZHJlblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baV1cbiAgICBpZiAoY2hpbGQgPT09IGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGNoaWxkUGF0dGVybiA9IGZpbmRUYWdQYXR0ZXJuKGNoaWxkLCBpZ25vcmUpXG4gICAgICBpZiAoIWNoaWxkUGF0dGVybikge1xuICAgICAgICByZXR1cm4gY29uc29sZS53YXJuKGBcbiAgICAgICAgICBFbGVtZW50IGNvdWxkbid0IGJlIG1hdGNoZWQgdGhyb3VnaCBzdHJpY3QgaWdub3JlIHBhdHRlcm4hXG4gICAgICAgIGAsIGNoaWxkLCBpZ25vcmUsIGNoaWxkUGF0dGVybilcbiAgICAgIH1cbiAgICAgIGNoaWxkUGF0dGVybi5yZWxhdGVzID0gJ2NoaWxkJ1xuICAgICAgY2hpbGRQYXR0ZXJuLnBzZXVkbyA9IFtgbnRoLWNoaWxkKCR7aSsxfSlgXVxuICAgICAgcGF0aC51bnNoaWZ0KGNoaWxkUGF0dGVybilcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIEV4dGVuZCBwYXRoIHdpdGggY29udGFpbnNcbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgIGVsZW1lbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSBwYXRoICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICAgb3B0aW9ucyAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgIHNlbGVjdCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7VG9TdHJpbmdBcGl9ICAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Jvb2xlYW59ICAgICAgICAgbmVzdGVkICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBjaGVja1RleHQgPSAoZWxlbWVudCwgcGF0aCwgeyBpZ25vcmUgfSwgc2VsZWN0LCB0b1N0cmluZywgbmVzdGVkKSA9PiB7XG4gIGNvbnN0IHBhdHRlcm4gPSBmaW5kVGFnUGF0dGVybihlbGVtZW50LCBpZ25vcmUpXG4gIGlmICghcGF0dGVybikge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGNvbnN0IHRleHRDb250ZW50ID0gKG5lc3RlZCA/IGVsZW1lbnQudGV4dENvbnRlbnQgOiAoZWxlbWVudC5maXJzdENoaWxkICYmIGVsZW1lbnQuZmlyc3RDaGlsZC5ub2RlVmFsdWUpIHx8ICcnKVxuICBpZiAoIXRleHRDb250ZW50KSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBwYXR0ZXJuLnJlbGF0ZXMgPSAnY2hpbGQnXG4gIGNvbnN0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZVxuICBjb25zdCB0ZXh0cyA9IHRleHRDb250ZW50XG4gICAgLnJlcGxhY2UoL1xcbisvZywgJ1xcbicpXG4gICAgLnNwbGl0KCdcXG4nKVxuICAgIC5tYXAodGV4dCA9PiB0ZXh0LnRyaW0oKSlcbiAgICAuZmlsdGVyKHRleHQgPT4gdGV4dC5sZW5ndGggPiAwKVxuXG4gIGNvbnN0IGNvbnRhaW5zID0gW11cblxuICB3aGlsZSAodGV4dHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHRleHQgPSB0ZXh0cy5zaGlmdCgpXG4gICAgaWYgKGNoZWNrSWdub3JlKGlnbm9yZS5jb250YWlucywgbnVsbCwgdGV4dCwgZGVmYXVsdElnbm9yZS5jb250YWlucykpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIGNvbnRhaW5zLnB1c2goYGNvbnRhaW5zKFwiJHt0ZXh0fVwiKWApXG4gIFxuICAgIGNvbnN0IG1hdGNoZXMgPSBzZWxlY3QodG9TdHJpbmcucGF0dGVybih7IC4uLnBhdHRlcm4sIHBzZXVkbzogY29udGFpbnMgfSksIHBhcmVudClcbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHBhdHRlcm4ucHNldWRvID0gY29udGFpbnNcbiAgICAgIHBhdGgudW5zaGlmdChwYXR0ZXJuKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qKlxuICogRXh0ZW5kIHBhdGggd2l0aCBkZXNjZW5kYW50IHRhZ1xuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICAgZWxlbWVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59IHBhdGggICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T3B0aW9uc30gICAgICAgICBvcHRpb25zICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3QgY2hlY2tSZWN1cnNpdmVEZXNjZW5kYW50cyA9IChlbGVtZW50LCBwYXRoLCBvcHRpb25zLCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIGNvbnN0IHBhdHRlcm4gPSBmaW5kVGFnUGF0dGVybihlbGVtZW50LCBvcHRpb25zLmlnbm9yZSlcbiAgaWYgKCFwYXR0ZXJuKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBjb25zdCBkZXNjZW5kYW50cyA9IEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJykpXG4gIHdoaWxlIChkZXNjZW5kYW50cy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZGVzY2VuZGFudFBhdGggPSBtYXRjaChkZXNjZW5kYW50cy5zaGlmdCgpLCB7IC4uLm9wdGlvbnMsIHJvb3Q6IGVsZW1lbnQgfSwgdHJ1ZSlcbiAgICAvLyBhdm9pZCBkZXNjZW5kYW50IHNlbGVjdG9ycyB3aXRoIG50aC1jaGlsZFxuICAgIGlmICghZGVzY2VuZGFudFBhdGguc29tZShwYXR0ZXJuID0+IHBhdHRlcm4ucHNldWRvLnNvbWUocCA9PiBwLnN0YXJ0c1dpdGgoJ250aC1jaGlsZCcpKSkpIHtcbiAgICAgIGNvbnN0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudFxuICAgICAgY29uc3QgbWF0Y2hlcyA9IHNlbGVjdCh0b1N0cmluZy5wYXR0ZXJuKHsgLi4ucGF0dGVybiwgZGVzY2VuZGFudHM6IFtkZXNjZW5kYW50UGF0aF0gfSksIHBhcmVudClcbiAgICAgIGlmIChtYXRjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBwYXR0ZXJuLmRlc2NlbmRhbnRzID0gW2Rlc2NlbmRhbnRQYXRoXVxuICAgICAgICBwYXRoLnVuc2hpZnQocGF0dGVybilcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBMb29rdXAgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBlbGVtZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICBvcHRpb25zICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgdG9TdHJpbmcgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtQYXR0ZXJufSAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IGZpbmRQYXR0ZXJuID0gKGVsZW1lbnQsIHsgcHJpb3JpdHksIGlnbm9yZSB9LCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIHZhciBwYXR0ZXJuID0gZmluZEF0dHJpYnV0ZXNQYXR0ZXJuKHByaW9yaXR5LCBlbGVtZW50LCBpZ25vcmUsIHNlbGVjdCwgdG9TdHJpbmcpXG4gIGlmICghcGF0dGVybikge1xuICAgIHBhdHRlcm4gPSBmaW5kVGFnUGF0dGVybihlbGVtZW50LCBpZ25vcmUpXG4gIH1cbiAgcmV0dXJuIHBhdHRlcm5cbn1cblxuLyoqXG4gKiBWYWxpZGF0ZSB3aXRoIGN1c3RvbSBhbmQgZGVmYXVsdCBmdW5jdGlvbnNcbiAqXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gcHJlZGljYXRlICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge3N0cmluZz99ICBuYW1lICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7c3RyaW5nfSAgIHZhbHVlICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZGVmYXVsdFByZWRpY2F0ZSAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBjaGVja0lnbm9yZSA9IChwcmVkaWNhdGUsIG5hbWUsIHZhbHVlLCBkZWZhdWx0UHJlZGljYXRlKSA9PiB7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGNvbnN0IGNoZWNrID0gcHJlZGljYXRlIHx8IGRlZmF1bHRQcmVkaWNhdGVcbiAgaWYgKCFjaGVjaykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiBjaGVjayhuYW1lLCB2YWx1ZSwgZGVmYXVsdFByZWRpY2F0ZSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXRjaC5qcyIsIi8qKlxuICogIyBPcHRpbWl6ZVxuICpcbiAqIDEuKSBJbXByb3ZlIGVmZmljaWVuY3kgdGhyb3VnaCBzaG9ydGVyIHNlbGVjdG9ycyBieSByZW1vdmluZyByZWR1bmRhbmN5XG4gKiAyLikgSW1wcm92ZSByb2J1c3RuZXNzIHRocm91Z2ggc2VsZWN0b3IgdHJhbnNmb3JtYXRpb25cbiAqL1xuXG5pbXBvcnQgeyBnZXRTZWxlY3QgfSBmcm9tICcuL3NlbGVjdG9yJ1xuaW1wb3J0IHsgY3JlYXRlUGF0dGVybiwgZ2V0VG9TdHJpbmcgfSBmcm9tICcuL3BhdHRlcm4nXG5pbXBvcnQgeyBjb252ZXJ0Tm9kZUxpc3QsIHBhcnRpdGlvbiB9IGZyb20gJy4vdXRpbGl0aWVzJ1xuXG4vKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vc2VsZWN0JykuT3B0aW9uc30gT3B0aW9uc1xuICogQHR5cGVkZWYge2ltcG9ydCgnLi9wYXR0ZXJuJykuUGF0dGVybn0gUGF0dGVyblxuICogQHR5cGVkZWYge2ltcG9ydCgnLi9wYXR0ZXJuJykuVG9TdHJpbmdBcGl9IFBhdHRlcm5cbiAqL1xuXG4vKipcbiAqIEFwcGx5IGRpZmZlcmVudCBvcHRpbWl6YXRpb24gdGVjaG5pcXVlc1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgICAgICAgICAgICAgIHBhdGggICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fEFycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnQgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPcHRpb25zfSAgICAgICAgICAgICAgICAgICAgICAgICBbb3B0aW9uc10gIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7QXJyYXkuPFBhdHRlcm4+fSAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3B0aW1pemUgKHBhdGgsIGVsZW1lbnRzLCBvcHRpb25zID0ge30pIHtcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cblxuICBpZiAocGF0aFswXS5yZWxhdGVzID09PSAnY2hpbGQnKSB7XG4gICAgcGF0aFswXS5yZWxhdGVzID0gdW5kZWZpbmVkXG4gIH1cblxuICAvLyBjb252ZXJ0IHNpbmdsZSBlbnRyeSBhbmQgTm9kZUxpc3RcbiAgaWYgKCFBcnJheS5pc0FycmF5KGVsZW1lbnRzKSkge1xuICAgIGVsZW1lbnRzID0gIWVsZW1lbnRzLmxlbmd0aCA/IFtlbGVtZW50c10gOiBjb252ZXJ0Tm9kZUxpc3QoZWxlbWVudHMpXG4gIH1cblxuICBpZiAoIWVsZW1lbnRzLmxlbmd0aCB8fCBlbGVtZW50cy5zb21lKChlbGVtZW50KSA9PiBlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBpbnB1dCAtIHRvIGNvbXBhcmUgSFRNTEVsZW1lbnRzIGl0cyBuZWNlc3NhcnkgdG8gcHJvdmlkZSBhIHJlZmVyZW5jZSBvZiB0aGUgc2VsZWN0ZWQgbm9kZShzKSEgKG1pc3NpbmcgXCJlbGVtZW50c1wiKScpXG4gIH1cblxuICBjb25zdCBzZWxlY3QgPSBnZXRTZWxlY3Qob3B0aW9ucylcbiAgY29uc3QgdG9TdHJpbmcgPSBnZXRUb1N0cmluZyhvcHRpb25zKVxuXG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBbb3B0aW1pemVQYXJ0KFtdLCBwYXRoWzBdLCBbXSwgZWxlbWVudHMsIHNlbGVjdCwgdG9TdHJpbmcpXVxuICB9XG5cbiAgdmFyIGVuZE9wdGltaXplZCA9IGZhbHNlXG4gIGlmIChwYXRoW3BhdGgubGVuZ3RoLTFdLnJlbGF0ZXMgPT09ICdjaGlsZCcpIHtcbiAgICBwYXRoW3BhdGgubGVuZ3RoLTFdID0gb3B0aW1pemVQYXJ0KHBhdGguc2xpY2UoMCwgLTEpLCBwYXRoW3BhdGgubGVuZ3RoLTFdLCBbXSwgZWxlbWVudHMsIHNlbGVjdCwgdG9TdHJpbmcpXG4gICAgZW5kT3B0aW1pemVkID0gdHJ1ZVxuICB9XG5cbiAgcGF0aCA9IFsuLi5wYXRoXVxuICBjb25zdCBzaG9ydGVuZWQgPSBbcGF0aC5wb3AoKV1cbiAgd2hpbGUgKHBhdGgubGVuZ3RoID4gMSkge1xuICAgIGNvbnN0IGN1cnJlbnQgPSBwYXRoLnBvcCgpXG4gICAgY29uc3QgbWF0Y2hlcyA9IHNlbGVjdCh0b1N0cmluZy5wYXRoKFsuLi5wYXRoLCAuLi5zaG9ydGVuZWRdKSlcbiAgICBjb25zdCBoYXNTYW1lUmVzdWx0ID0gbWF0Y2hlcy5sZW5ndGggPT09IGVsZW1lbnRzLmxlbmd0aCAmJiBlbGVtZW50cy5ldmVyeSgoZWxlbWVudCwgaSkgPT4gZWxlbWVudCA9PT0gbWF0Y2hlc1tpXSlcbiAgICBpZiAoIWhhc1NhbWVSZXN1bHQpIHtcbiAgICAgIHNob3J0ZW5lZC51bnNoaWZ0KG9wdGltaXplUGFydChwYXRoLCBjdXJyZW50LCBzaG9ydGVuZWQsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSlcbiAgICB9XG4gIH1cbiAgc2hvcnRlbmVkLnVuc2hpZnQocGF0aFswXSlcbiAgcGF0aCA9IHNob3J0ZW5lZFxuXG4gIC8vIG9wdGltaXplIHN0YXJ0ICsgZW5kXG4gIHBhdGhbMF0gPSBvcHRpbWl6ZVBhcnQoW10sIHBhdGhbMF0sIHBhdGguc2xpY2UoMSksIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKVxuICBpZiAoIWVuZE9wdGltaXplZCkge1xuICAgIHBhdGhbcGF0aC5sZW5ndGgtMV0gPSBvcHRpbWl6ZVBhcnQocGF0aC5zbGljZSgwLCAtMSksIHBhdGhbcGF0aC5sZW5ndGgtMV0sIFtdLCBlbGVtZW50cywgc2VsZWN0LCB0b1N0cmluZylcbiAgfVxuXG4gIHJldHVybiBwYXRoXG59XG5cbi8qKlxuICogT3B0aW1pemUgOmNvbnRhaW5zXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgcHJlICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtQYXR0ZXJufSAgICAgICAgICAgICBjdXJyZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHBvc3QgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgICAgICBzZWxlY3QgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICAgICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7UGF0dGVybn0gICAgICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IG9wdGltaXplVGV4dCA9IChwcmUsIGN1cnJlbnQsIHBvc3QsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIGNvbnN0IFtjb250YWlucywgb3RoZXJdID0gcGFydGl0aW9uKGN1cnJlbnQucHNldWRvLCAoaXRlbSkgPT4gaXRlbS5zdGFydHNXaXRoKCdjb250YWlucycpKVxuXG4gIGlmIChjb250YWlucy5sZW5ndGggPiAwICYmIHBvc3QubGVuZ3RoKSB7XG4gICAgY29uc3QgYmFzZSA9IHsgLi4uY3VycmVudCwgcHNldWRvOiBbLi4ub3RoZXIsIC4uLmNvbnRhaW5zXSB9XG4gICAgd2hpbGUgKGJhc2UucHNldWRvLmxlbmd0aCA+IG90aGVyLmxlbmd0aCkge1xuICAgICAgY29uc3Qgb3B0aW1pemVkID0gYmFzZS5wc2V1ZG8uc2xpY2UoMCwgLTEpXG4gICAgICBpZiAoIWNvbXBhcmVSZXN1bHRzKHNlbGVjdCh0b1N0cmluZy5wYXRoKFsuLi5wcmUsIHsgLi4uYmFzZSwgcHNldWRvOiBvcHRpbWl6ZWQgfSwgLi4ucG9zdF0pKSwgZWxlbWVudHMpKSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBiYXNlLnBzZXVkbyA9IG9wdGltaXplZFxuICAgIH1cbiAgICByZXR1cm4gYmFzZVxuICB9XG4gIHJldHVybiBjdXJyZW50XG59XG5cbi8qKlxuICogT3B0aW1pemUgYXR0cmlidXRlc1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHByZSAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UGF0dGVybn0gICAgICAgICAgICAgY3VycmVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwb3N0ICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgICAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1BhdHRlcm59ICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBvcHRpbWl6ZUF0dHJpYnV0ZXMgPSAocHJlLCBjdXJyZW50LCBwb3N0LCBlbGVtZW50cywgc2VsZWN0LCB0b1N0cmluZykgPT4ge1xuICAvLyByZWR1Y2UgYXR0cmlidXRlczogZmlyc3QgdHJ5IHdpdGhvdXQgdmFsdWUsIHRoZW4gcmVtb3ZpbmcgY29tcGxldGVseVxuICBpZiAoY3VycmVudC5hdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgYXR0cmlidXRlcyA9IFsuLi5jdXJyZW50LmF0dHJpYnV0ZXNdXG5cbiAgICBjb25zdCBzaW1wbGlmeSA9IChvcmlnaW5hbCwgZ2V0U2ltcGxpZmllZCkgPT4ge1xuICAgICAgbGV0IGkgPSBvcmlnaW5hbC5sZW5ndGggLSAxXG4gICAgICB3aGlsZSAoaSA+PSAwKSB7XG4gICAgICAgIGxldCBhdHRyaWJ1dGVzID0gZ2V0U2ltcGxpZmllZChvcmlnaW5hbCwgaSlcbiAgICAgICAgaWYgKCFjb21wYXJlUmVzdWx0cyhcbiAgICAgICAgICBzZWxlY3QodG9TdHJpbmcucGF0aChbLi4ucHJlLCB7IC4uLmN1cnJlbnQsIGF0dHJpYnV0ZXMgfSwgLi4ucG9zdF0pKSxcbiAgICAgICAgICBlbGVtZW50c1xuICAgICAgICApKSB7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBpLS1cbiAgICAgICAgb3JpZ2luYWwgPSBhdHRyaWJ1dGVzXG4gICAgICB9XG4gICAgICByZXR1cm4gb3JpZ2luYWxcbiAgICB9XG5cbiAgICBjb25zdCBzaW1wbGlmaWVkID0gc2ltcGxpZnkoYXR0cmlidXRlcywgKGF0dHJpYnV0ZXMsIGkpID0+IHtcbiAgICAgIGNvbnN0IHsgbmFtZSB9ID0gYXR0cmlidXRlc1tpXVxuICAgICAgaWYgKG5hbWUgPT09ICdpZCcpIHtcbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXNcbiAgICAgIH1cbiAgICAgIHJldHVybiBbLi4uYXR0cmlidXRlcy5zbGljZSgwLCBpKSwgeyBuYW1lLCB2YWx1ZTogbnVsbCB9LCAuLi5hdHRyaWJ1dGVzLnNsaWNlKGkgKyAxKV1cbiAgICB9KVxuICAgIHJldHVybiB7IC4uLmN1cnJlbnQsIGF0dHJpYnV0ZXM6IHNpbXBsaWZ5KHNpbXBsaWZpZWQsIGF0dHJpYnV0ZXMgPT4gYXR0cmlidXRlcy5zbGljZSgwLCAtMSkpIH0gICAgXG4gIH1cbiAgcmV0dXJuIGN1cnJlbnRcbn1cblxuLyoqXG4gKiBPcHRpbWl6ZSBkZXNjZW5kYW50XG4gKlxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgcHJlICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtQYXR0ZXJufSAgICAgICAgICAgICBjdXJyZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHBvc3QgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgICAgICBzZWxlY3QgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICAgICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7UGF0dGVybn0gICAgICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IG9wdGltaXplRGVzY2VuZGFudCA9IChwcmUsIGN1cnJlbnQsIHBvc3QsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIC8vIHJvYnVzdG5lc3M6IGRlc2NlbmRhbnQgaW5zdGVhZCBjaGlsZCAoaGV1cmlzdGljKVxuICBpZiAoY3VycmVudC5yZWxhdGVzID09PSAnY2hpbGQnKSB7XG4gICAgY29uc3QgZGVzY2VuZGFudCA9IHsgLi4uY3VycmVudCwgcmVsYXRlczogdW5kZWZpbmVkIH1cbiAgICBsZXQgbWF0Y2hlcyA9IHNlbGVjdCh0b1N0cmluZy5wYXRoKFsuLi5wcmUsIGRlc2NlbmRhbnQsIC4uLnBvc3RdKSlcbiAgICBpZiAoY29tcGFyZVJlc3VsdHMobWF0Y2hlcywgZWxlbWVudHMpKSB7XG4gICAgICByZXR1cm4gZGVzY2VuZGFudFxuICAgIH1cbiAgfVxuICByZXR1cm4gY3VycmVudFxufVxuXG4vKipcbiAqIE9wdGltaXplIHJlY3Vyc2l2ZSBkZXNjZW5kYW50c1xuICogXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwcmUgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1BhdHRlcm59ICAgICAgICAgICAgIGN1cnJlbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgcG9zdCAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICAgICAgIHNlbGVjdCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7VG9TdHJpbmdBcGl9ICAgICAgICAgdG9TdHJpbmcgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtQYXR0ZXJufSAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3Qgb3B0aW1pemVSZWN1cnNpdmVEZXNjZW5kYW50cyA9IChwcmUsIGN1cnJlbnQsIHBvc3QsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIGlmIChjdXJyZW50LmRlc2NlbmRhbnRzLmxlbmd0aCA+IDAgJiYgcG9zdC5sZW5ndGgpIHtcbiAgICBjb25zdCBiYXNlID0geyAuLi5jdXJyZW50LCBkZXNjZW5kYW50czogWy4uLmN1cnJlbnQuZGVzY2VuZGFudHNdIH1cbiAgICB3aGlsZSAoYmFzZS5kZXNjZW5kYW50cy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBvcHRpbWl6ZWQgPSBiYXNlLmRlc2NlbmRhbnRzLnNsaWNlKDAsIC0xKVxuICAgICAgaWYgKCFjb21wYXJlUmVzdWx0cyhzZWxlY3QodG9TdHJpbmcucGF0aChbLi4ucHJlLCB7IC4uLmJhc2UsIGRlc2NlbmRhbnRzOiBvcHRpbWl6ZWQgfSwgLi4ucG9zdF0pKSwgZWxlbWVudHMpKSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBiYXNlLmRlc2NlbmRhbnRzID0gb3B0aW1pemVkXG4gICAgfVxuICAgIHJldHVybiBiYXNlXG4gIH1cbiAgcmV0dXJuIGN1cnJlbnRcbn1cblxuLyoqXG4gKiBPcHRpbWl6ZSBudGggb2YgdHlwZVxuICpcbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHByZSAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UGF0dGVybn0gICAgICAgICAgICAgY3VycmVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwb3N0ICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgICAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1BhdHRlcm59ICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBvcHRpbWl6ZU50aE9mVHlwZSA9IChwcmUsIGN1cnJlbnQsIHBvc3QsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIGNvbnN0IGkgPSBjdXJyZW50LnBzZXVkby5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLnN0YXJ0c1dpdGgoJ250aC1jaGlsZCcpKVxuICAvLyByb2J1c3RuZXNzOiAnbnRoLW9mLXR5cGUnIGluc3RlYWQgJ250aC1jaGlsZCcgKGhldXJpc3RpYylcbiAgaWYgKGkgPj0gMCkge1xuICAgIC8vIFRPRE86IGNvbnNpZGVyIGNvbXBsZXRlIGNvdmVyYWdlIG9mICdudGgtb2YtdHlwZScgcmVwbGFjZW1lbnRcbiAgICBjb25zdCB0eXBlID0gY3VycmVudC5wc2V1ZG9baV0ucmVwbGFjZSgvXm50aC1jaGlsZC8sICdudGgtb2YtdHlwZScpXG4gICAgY29uc3QgbnRoT2ZUeXBlID0geyAuLi5jdXJyZW50LCBwc2V1ZG86IFsuLi5jdXJyZW50LnBzZXVkby5zbGljZSgwLCBpKSwgdHlwZSwgLi4uY3VycmVudC5wc2V1ZG8uc2xpY2UoaSArIDEpXSB9XG4gICAgbGV0IHBhdHRlcm4gPSB0b1N0cmluZy5wYXRoKFsuLi5wcmUsIG50aE9mVHlwZSwgLi4ucG9zdF0pXG4gICAgbGV0IG1hdGNoZXMgPSBzZWxlY3QocGF0dGVybilcbiAgICBpZiAoY29tcGFyZVJlc3VsdHMobWF0Y2hlcywgZWxlbWVudHMpKSB7XG4gICAgICByZXR1cm4gbnRoT2ZUeXBlXG4gICAgfVxuICB9XG4gIHJldHVybiBjdXJyZW50XG59XG5cbi8qKlxuICogT3B0aW1pemUgY2xhc3Nlc1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHByZSAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UGF0dGVybn0gICAgICAgICAgICAgY3VycmVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwb3N0ICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgICAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1BhdHRlcm59ICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBvcHRpbWl6ZUNsYXNzZXMgPSAocHJlLCBjdXJyZW50LCBwb3N0LCBlbGVtZW50cywgc2VsZWN0LCB0b1N0cmluZykgPT4ge1xuICAvLyBlZmZpY2llbmN5OiBjb21iaW5hdGlvbnMgb2YgY2xhc3NuYW1lIChwYXJ0aWFsIHBlcm11dGF0aW9ucylcbiAgaWYgKGN1cnJlbnQuY2xhc3Nlcy5sZW5ndGggPiAxKSB7XG4gICAgbGV0IG9wdGltaXplZCA9IGN1cnJlbnQuY2xhc3Nlcy5zbGljZSgpLnNvcnQoKGN1cnIsIG5leHQpID0+IGN1cnIubGVuZ3RoIC0gbmV4dC5sZW5ndGgpXG5cbiAgICB3aGlsZSAob3B0aW1pemVkLmxlbmd0aCA+IDEpIHtcbiAgICAgIG9wdGltaXplZC5zaGlmdCgpXG4gICAgICBjb25zdCBwYXR0ZXJuID0gdG9TdHJpbmcucGF0aChbLi4ucHJlLCB7IC4uLmN1cnJlbnQsIGNsYXNzZXM6IG9wdGltaXplZCB9LCAuLi5wb3N0XSlcbiAgICAgIGlmICghY29tcGFyZVJlc3VsdHMoc2VsZWN0KHBhdHRlcm4pLCBlbGVtZW50cykpIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnQuY2xhc3NlcyA9IG9wdGltaXplZFxuICAgIH1cblxuICAgIG9wdGltaXplZCA9IGN1cnJlbnQuY2xhc3Nlc1xuXG4gICAgaWYgKG9wdGltaXplZC5sZW5ndGggPiAyKSB7XG4gICAgICBjb25zdCBiYXNlID0gY3JlYXRlUGF0dGVybih7IGNsYXNzZXM6IG9wdGltaXplZCB9KVxuICAgICAgY29uc3QgcmVmZXJlbmNlcyA9IHNlbGVjdCh0b1N0cmluZy5wYXRoKFsuLi5wcmUsIGJhc2VdKSlcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVmZXJlbmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCByZWZlcmVuY2UgPSByZWZlcmVuY2VzW2ldXG4gICAgICAgIGlmIChlbGVtZW50cy5zb21lKChlbGVtZW50KSA9PiByZWZlcmVuY2UuY29udGFpbnMoZWxlbWVudCkpKSB7XG4gICAgICAgICAgLy8gVE9ETzpcbiAgICAgICAgICAvLyAtIGNoZWNrIHVzaW5nIGF0dHJpYnV0ZXMgKyByZWdhcmQgZXhjbHVkZXNcbiAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGNyZWF0ZVBhdHRlcm4oeyB0YWc6IHJlZmVyZW5jZS50YWdOYW1lIH0pXG4gICAgICAgICAgdmFyIHBhdHRlcm4gPSB0b1N0cmluZy5wYXRoKFsuLi5wcmUsIGRlc2NyaXB0aW9uLCAuLi5wb3N0XSlcbiAgICAgICAgICB2YXIgbWF0Y2hlcyA9IHNlbGVjdChwYXR0ZXJuKVxuICAgICAgICAgIGlmIChjb21wYXJlUmVzdWx0cyhtYXRjaGVzLCBlbGVtZW50cykpIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBkZXNjcmlwdGlvblxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjdXJyZW50XG59XG5cbmNvbnN0IG9wdGltaXplcnMgPSBbXG4gIG9wdGltaXplVGV4dCxcbiAgb3B0aW1pemVBdHRyaWJ1dGVzLFxuICBvcHRpbWl6ZURlc2NlbmRhbnQsXG4gIG9wdGltaXplUmVjdXJzaXZlRGVzY2VuZGFudHMsXG4gIG9wdGltaXplTnRoT2ZUeXBlLFxuICBvcHRpbWl6ZUNsYXNzZXMsXG5dXG5cbi8qKlxuICogSW1wcm92ZSBhIGNodW5rIG9mIHRoZSBzZWxlY3RvclxuICpcbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHByZSAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UGF0dGVybn0gICAgICAgICAgICAgY3VycmVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwb3N0ICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgICAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1BhdHRlcm59ICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBvcHRpbWl6ZVBhcnQgPSAocHJlLCBjdXJyZW50LCBwb3N0LCBlbGVtZW50cywgc2VsZWN0LCB0b1N0cmluZykgPT5cbiAgb3B0aW1pemVycy5yZWR1Y2UoKGFjYywgb3B0aW1pemVyKSA9PiBvcHRpbWl6ZXIocHJlLCBhY2MsIHBvc3QsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSwgY3VycmVudClcblxuLyoqXG4gKiBFdmFsdWF0ZSBtYXRjaGVzIHdpdGggZXhwZWN0ZWQgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBtYXRjaGVzICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Qm9vbGVhbn0gICAgICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBjb25zdCBjb21wYXJlUmVzdWx0cyA9IChtYXRjaGVzLCBlbGVtZW50cykgPT4ge1xuICBjb25zdCB7IGxlbmd0aCB9ID0gbWF0Y2hlc1xuICByZXR1cm4gbGVuZ3RoID09PSBlbGVtZW50cy5sZW5ndGggJiYgZWxlbWVudHMuZXZlcnkoKGVsZW1lbnQpID0+IHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobWF0Y2hlc1tpXSA9PT0gZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9vcHRpbWl6ZS5qcyIsIi8qKlxuICogIyBTZWxlY3RcbiAqXG4gKiBDb25zdHJ1Y3QgYSB1bmlxdWUgQ1NTIHF1ZXJ5IHNlbGVjdG9yIHRvIGFjY2VzcyB0aGUgc2VsZWN0ZWQgRE9NIGVsZW1lbnQocykuXG4gKiBGb3IgbG9uZ2V2aXR5IGl0IGFwcGxpZXMgZGlmZmVyZW50IG1hdGNoaW5nIGFuZCBvcHRpbWl6YXRpb24gc3RyYXRlZ2llcy5cbiAqL1xuaW1wb3J0IG1hdGNoIGZyb20gJy4vbWF0Y2gnXG5pbXBvcnQgb3B0aW1pemUgZnJvbSAnLi9vcHRpbWl6ZSdcbmltcG9ydCB7IGNvbnZlcnROb2RlTGlzdCwgZXNjYXBlVmFsdWUgfSBmcm9tICcuL3V0aWxpdGllcydcbmltcG9ydCB7IGdldENvbW1vbkFuY2VzdG9yLCBnZXRDb21tb25Qcm9wZXJ0aWVzIH0gZnJvbSAnLi9jb21tb24nXG5pbXBvcnQgeyBnZXRTZWxlY3QgfSBmcm9tICcuL3NlbGVjdG9yJ1xuaW1wb3J0IHsgY3JlYXRlUGF0dGVybiwgZ2V0VG9TdHJpbmcgfSBmcm9tICcuL3BhdHRlcm4nXG5cbi8qKlxuICogQHR5cGVkZWYgIHtPYmplY3R9IE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IFtyb290XSAgICAgICAgICAgICAgICAgICAgIE9wdGlvbmFsbHkgc3BlY2lmeSB0aGUgcm9vdCBlbGVtZW50XG4gKiBAcHJvcGVydHkge2Z1bmN0aW9uIHwgQXJyYXkuPEhUTUxFbGVtZW50Pn0gW3NraXBdICBTcGVjaWZ5IGVsZW1lbnRzIHRvIHNraXBcbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPHN0cmluZz59IFtwcmlvcml0eV0gICAgICAgICAgICAgIE9yZGVyIG9mIGF0dHJpYnV0ZSBwcm9jZXNzaW5nXG4gKiBAcHJvcGVydHkge09iamVjdDxzdHJpbmcsIGZ1bmN0aW9uIHwgbnVtYmVyIHwgc3RyaW5nIHwgYm9vbGVhbn0gW2lnbm9yZV0gRGVmaW5lIHBhdHRlcm5zIHdoaWNoIHNob3VsZG4ndCBiZSBpbmNsdWRlZFxuICogQHByb3BlcnR5IHsoJ2Nzcyd8J3hwYXRoJ3wnanF1ZXJ5Jyl9IFtmb3JtYXRdICAgICAgT3V0cHV0IGZvcm1hdCAgICBcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vcGF0dGVybicpLlBhdHRlcm59IFBhdHRlcm5cbiAqL1xuXG4vKipcbiAqIEdldCBhIHNlbGVjdG9yIGZvciB0aGUgcHJvdmlkZWQgZWxlbWVudFxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPcHRpb25zfSAgICAgW29wdGlvbnNdIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7QXJyYXkuPFBhdHRlcm4+fSAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFNpbmdsZVNlbGVjdG9yUGF0aCA9IChlbGVtZW50LCBvcHRpb25zID0ge30pID0+IHtcblxuICBpZiAoZWxlbWVudC5ub2RlVHlwZSA9PT0gMykge1xuICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGVcbiAgfVxuXG4gIGlmIChlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGlucHV0IC0gb25seSBIVE1MRWxlbWVudHMgb3IgcmVwcmVzZW50YXRpb25zIG9mIHRoZW0gYXJlIHN1cHBvcnRlZCEgKG5vdCBcIiR7dHlwZW9mIGVsZW1lbnR9XCIpYClcbiAgfVxuXG4gIGNvbnN0IHBhdGggPSBtYXRjaChlbGVtZW50LCBvcHRpb25zKVxuICBjb25zdCBvcHRpbWl6ZWRQYXRoID0gb3B0aW1pemUocGF0aCwgZWxlbWVudCwgb3B0aW9ucylcblxuICAvLyBkZWJ1Z1xuICAvLyBjb25zb2xlLmxvZyhgXG4gIC8vICAgc2VsZWN0b3I6ICAke3BhdGh9XG4gIC8vICAgb3B0aW1pemVkOiAke29wdGltaXplZFBhdGh9XG4gIC8vIGApXG5cbiAgcmV0dXJuIG9wdGltaXplZFBhdGhcbn1cblxuLyoqXG4gKiBHZXQgYSBzZWxlY3RvciB0byBtYXRjaCBtdWx0aXBsZSBkZXNjZW5kYW50cyBmcm9tIGFuIGFuY2VzdG9yXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50PnxOb2RlTGlzdH0gZWxlbWVudHMgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICAgICAgICAgICAgICAgIFtvcHRpb25zXSAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtBcnJheS48UGF0dGVybj59ICAgICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgY29uc3QgZ2V0TXVsdGlTZWxlY3RvclBhdGggPSAoZWxlbWVudHMsIG9wdGlvbnMgPSB7fSkgPT4ge1xuXG4gIGlmICghQXJyYXkuaXNBcnJheShlbGVtZW50cykpIHtcbiAgICBlbGVtZW50cyA9IGNvbnZlcnROb2RlTGlzdChlbGVtZW50cylcbiAgfVxuXG4gIGlmIChlbGVtZW50cy5zb21lKChlbGVtZW50KSA9PiBlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBpbnB1dCAtIG9ubHkgYW4gQXJyYXkgb2YgSFRNTEVsZW1lbnRzIG9yIHJlcHJlc2VudGF0aW9ucyBvZiB0aGVtIGlzIHN1cHBvcnRlZCEnKVxuICB9XG5cbiAgY29uc3Qgc2VsZWN0ID0gZ2V0U2VsZWN0KG9wdGlvbnMpXG4gIGNvbnN0IHRvU3RyaW5nID0gZ2V0VG9TdHJpbmcob3B0aW9ucylcblxuICBjb25zdCBhbmNlc3RvciA9IGdldENvbW1vbkFuY2VzdG9yKGVsZW1lbnRzLCBvcHRpb25zKVxuICBjb25zdCBhbmNlc3RvclBhdGggPSBtYXRjaChhbmNlc3Rvciwgb3B0aW9ucylcblxuICAvLyBUT0RPOiBjb25zaWRlciB1c2FnZSBvZiBtdWx0aXBsZSBzZWxlY3RvcnMgKyBwYXJlbnQtY2hpbGQgcmVsYXRpb24gKyBjaGVjayBmb3IgcGFydCByZWR1bmRhbmN5XG4gIGNvbnN0IGNvbW1vblBhdGggPSBnZXRDb21tb25QYXRoKGVsZW1lbnRzLCBvcHRpb25zKVxuICBjb25zdCBkZXNjZW5kYW50UGF0dGVybiA9IGNvbW1vblBhdGhbMF1cblxuICBjb25zdCBzZWxlY3RvclBhdGggPSBvcHRpbWl6ZShbLi4uYW5jZXN0b3JQYXRoLCBkZXNjZW5kYW50UGF0dGVybl0sIGVsZW1lbnRzLCBvcHRpb25zKVxuICBjb25zdCBzZWxlY3Rvck1hdGNoZXMgPSBjb252ZXJ0Tm9kZUxpc3Qoc2VsZWN0KHRvU3RyaW5nLnBhdGgoc2VsZWN0b3JQYXRoKSkpXG5cbiAgaWYgKCFlbGVtZW50cy5ldmVyeSgoZWxlbWVudCkgPT4gc2VsZWN0b3JNYXRjaGVzLnNvbWUoKGVudHJ5KSA9PiBlbnRyeSA9PT0gZWxlbWVudCkpKSB7XG4gICAgLy8gVE9ETzogY2x1c3RlciBtYXRjaGVzIHRvIHNwbGl0IGludG8gc2ltaWxhciBncm91cHMgZm9yIHN1YiBzZWxlY3Rpb25zXG4gICAgY29uc29sZS53YXJuKGBcbiAgICAgIFRoZSBzZWxlY3RlZCBlbGVtZW50cyBjYW4ndCBiZSBlZmZpY2llbnRseSBtYXBwZWQuXG4gICAgICBJdHMgcHJvYmFibHkgYmVzdCB0byB1c2UgbXVsdGlwbGUgc2luZ2xlIHNlbGVjdG9ycyBpbnN0ZWFkIVxuICAgIGApXG4gICAgcmV0dXJuIGVsZW1lbnRzXG4gIH1cblxuICByZXR1cm4gc2VsZWN0b3JQYXRoXG59XG5cbi8qKlxuICogR2V0IHNlbGVjdG9ycyB0byBkZXNjcmliZSBhIHNldCBvZiBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge0FycmF5LjxQYXR0ZXJuPn0gICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3QgZ2V0Q29tbW9uUGF0aCA9IChlbGVtZW50cywgb3B0aW9ucykgPT4ge1xuICBjb25zdCB7IGNsYXNzZXMsIGF0dHJpYnV0ZXMsIHRhZyB9ID0gZ2V0Q29tbW9uUHJvcGVydGllcyhlbGVtZW50cywgb3B0aW9ucylcblxuXG4gIHJldHVybiBbXG4gICAgY3JlYXRlUGF0dGVybih7XG4gICAgICB0YWcsXG4gICAgICBjbGFzc2VzOiBjbGFzc2VzIHx8IFtdLFxuICAgICAgYXR0cmlidXRlczogYXR0cmlidXRlcyA/IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLm1hcCgobmFtZSkgPT4gKHtcbiAgICAgICAgbmFtZTogZXNjYXBlVmFsdWUobmFtZSksXG4gICAgICAgIHZhbHVlOiBlc2NhcGVWYWx1ZShhdHRyaWJ1dGVzW25hbWVdKVxuICAgICAgfSkpIDogW11cbiAgICB9KVxuICBdXG59XG5cbi8qKlxuICogQ2hvb3NlIGFjdGlvbiBkZXBlbmRpbmcgb24gdGhlIGlucHV0IChtdWx0aXBsZS9zaW5nbGUpXG4gKlxuICogTk9URTogZXh0ZW5kZWQgZGV0ZWN0aW9uIGlzIHVzZWQgZm9yIHNwZWNpYWwgY2FzZXMgbGlrZSB0aGUgPHNlbGVjdD4gZWxlbWVudCB3aXRoIDxvcHRpb25zPlxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fE5vZGVMaXN0fEFycmF5LjxIVE1MRWxlbWVudD59IGlucHV0ICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtvcHRpb25zXSAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UXVlcnlTZWxlY3RvcihpbnB1dCwgb3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHBhdGggPSAoaW5wdXQubGVuZ3RoICYmICFpbnB1dC5uYW1lKVxuICAgID8gZ2V0TXVsdGlTZWxlY3RvclBhdGgoaW5wdXQsIG9wdGlvbnMpXG4gICAgOiBnZXRTaW5nbGVTZWxlY3RvclBhdGgoaW5wdXQsIG9wdGlvbnMpXG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocGF0aCkgJiYgcGF0aC5sZW5ndGggPiAwICYmIHBhdGhbMF0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiBwYXRoLm1hcChlbnRyeSA9PiBnZXRRdWVyeVNlbGVjdG9yKGVudHJ5LCBvcHRpb25zKSkuam9pbignLCcpXG4gIH1cbiAgcmV0dXJuIGdldFRvU3RyaW5nKG9wdGlvbnMpLnBhdGgocGF0aClcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZWxlY3QuanMiLCIvKiFcbiAqIFNpenpsZSBDU1MgU2VsZWN0b3IgRW5naW5lIHYyLjMuNlxuICogaHR0cHM6Ly9zaXp6bGVqcy5jb20vXG4gKlxuICogQ29weXJpZ2h0IEpTIEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwczovL2pzLmZvdW5kYXRpb24vXG4gKlxuICogRGF0ZTogMjAyMS0wMi0xNlxuICovXG4oIGZ1bmN0aW9uKCB3aW5kb3cgKSB7XG52YXIgaSxcblx0c3VwcG9ydCxcblx0RXhwcixcblx0Z2V0VGV4dCxcblx0aXNYTUwsXG5cdHRva2VuaXplLFxuXHRjb21waWxlLFxuXHRzZWxlY3QsXG5cdG91dGVybW9zdENvbnRleHQsXG5cdHNvcnRJbnB1dCxcblx0aGFzRHVwbGljYXRlLFxuXG5cdC8vIExvY2FsIGRvY3VtZW50IHZhcnNcblx0c2V0RG9jdW1lbnQsXG5cdGRvY3VtZW50LFxuXHRkb2NFbGVtLFxuXHRkb2N1bWVudElzSFRNTCxcblx0cmJ1Z2d5UVNBLFxuXHRyYnVnZ3lNYXRjaGVzLFxuXHRtYXRjaGVzLFxuXHRjb250YWlucyxcblxuXHQvLyBJbnN0YW5jZS1zcGVjaWZpYyBkYXRhXG5cdGV4cGFuZG8gPSBcInNpenpsZVwiICsgMSAqIG5ldyBEYXRlKCksXG5cdHByZWZlcnJlZERvYyA9IHdpbmRvdy5kb2N1bWVudCxcblx0ZGlycnVucyA9IDAsXG5cdGRvbmUgPSAwLFxuXHRjbGFzc0NhY2hlID0gY3JlYXRlQ2FjaGUoKSxcblx0dG9rZW5DYWNoZSA9IGNyZWF0ZUNhY2hlKCksXG5cdGNvbXBpbGVyQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuXHRub25uYXRpdmVTZWxlY3RvckNhY2hlID0gY3JlYXRlQ2FjaGUoKSxcblx0c29ydE9yZGVyID0gZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0aWYgKCBhID09PSBiICkge1xuXHRcdFx0aGFzRHVwbGljYXRlID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIDA7XG5cdH0sXG5cblx0Ly8gSW5zdGFuY2UgbWV0aG9kc1xuXHRoYXNPd24gPSAoIHt9ICkuaGFzT3duUHJvcGVydHksXG5cdGFyciA9IFtdLFxuXHRwb3AgPSBhcnIucG9wLFxuXHRwdXNoTmF0aXZlID0gYXJyLnB1c2gsXG5cdHB1c2ggPSBhcnIucHVzaCxcblx0c2xpY2UgPSBhcnIuc2xpY2UsXG5cblx0Ly8gVXNlIGEgc3RyaXBwZWQtZG93biBpbmRleE9mIGFzIGl0J3MgZmFzdGVyIHRoYW4gbmF0aXZlXG5cdC8vIGh0dHBzOi8vanNwZXJmLmNvbS90aG9yLWluZGV4b2YtdnMtZm9yLzVcblx0aW5kZXhPZiA9IGZ1bmN0aW9uKCBsaXN0LCBlbGVtICkge1xuXHRcdHZhciBpID0gMCxcblx0XHRcdGxlbiA9IGxpc3QubGVuZ3RoO1xuXHRcdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0aWYgKCBsaXN0WyBpIF0gPT09IGVsZW0gKSB7XG5cdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gLTE7XG5cdH0sXG5cblx0Ym9vbGVhbnMgPSBcImNoZWNrZWR8c2VsZWN0ZWR8YXN5bmN8YXV0b2ZvY3VzfGF1dG9wbGF5fGNvbnRyb2xzfGRlZmVyfGRpc2FibGVkfGhpZGRlbnxcIiArXG5cdFx0XCJpc21hcHxsb29wfG11bHRpcGxlfG9wZW58cmVhZG9ubHl8cmVxdWlyZWR8c2NvcGVkXCIsXG5cblx0Ly8gUmVndWxhciBleHByZXNzaW9uc1xuXG5cdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtc2VsZWN0b3JzLyN3aGl0ZXNwYWNlXG5cdHdoaXRlc3BhY2UgPSBcIltcXFxceDIwXFxcXHRcXFxcclxcXFxuXFxcXGZdXCIsXG5cblx0Ly8gaHR0cHM6Ly93d3cudzMub3JnL1RSL2Nzcy1zeW50YXgtMy8jaWRlbnQtdG9rZW4tZGlhZ3JhbVxuXHRpZGVudGlmaWVyID0gXCIoPzpcXFxcXFxcXFtcXFxcZGEtZkEtRl17MSw2fVwiICsgd2hpdGVzcGFjZSArXG5cdFx0XCI/fFxcXFxcXFxcW15cXFxcclxcXFxuXFxcXGZdfFtcXFxcdy1dfFteXFwwLVxcXFx4N2ZdKStcIixcblxuXHQvLyBBdHRyaWJ1dGUgc2VsZWN0b3JzOiBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI2F0dHJpYnV0ZS1zZWxlY3RvcnNcblx0YXR0cmlidXRlcyA9IFwiXFxcXFtcIiArIHdoaXRlc3BhY2UgKyBcIiooXCIgKyBpZGVudGlmaWVyICsgXCIpKD86XCIgKyB3aGl0ZXNwYWNlICtcblxuXHRcdC8vIE9wZXJhdG9yIChjYXB0dXJlIDIpXG5cdFx0XCIqKFsqXiR8IX5dPz0pXCIgKyB3aGl0ZXNwYWNlICtcblxuXHRcdC8vIFwiQXR0cmlidXRlIHZhbHVlcyBtdXN0IGJlIENTUyBpZGVudGlmaWVycyBbY2FwdHVyZSA1XVxuXHRcdC8vIG9yIHN0cmluZ3MgW2NhcHR1cmUgMyBvciBjYXB0dXJlIDRdXCJcblx0XHRcIiooPzonKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcJ10pKiknfFxcXCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFxcXFwiXSkqKVxcXCJ8KFwiICsgaWRlbnRpZmllciArIFwiKSl8KVwiICtcblx0XHR3aGl0ZXNwYWNlICsgXCIqXFxcXF1cIixcblxuXHRwc2V1ZG9zID0gXCI6KFwiICsgaWRlbnRpZmllciArIFwiKSg/OlxcXFwoKFwiICtcblxuXHRcdC8vIFRvIHJlZHVjZSB0aGUgbnVtYmVyIG9mIHNlbGVjdG9ycyBuZWVkaW5nIHRva2VuaXplIGluIHRoZSBwcmVGaWx0ZXIsIHByZWZlciBhcmd1bWVudHM6XG5cdFx0Ly8gMS4gcXVvdGVkIChjYXB0dXJlIDM7IGNhcHR1cmUgNCBvciBjYXB0dXJlIDUpXG5cdFx0XCIoJygoPzpcXFxcXFxcXC58W15cXFxcXFxcXCddKSopJ3xcXFwiKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcXFxcIl0pKilcXFwiKXxcIiArXG5cblx0XHQvLyAyLiBzaW1wbGUgKGNhcHR1cmUgNilcblx0XHRcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXCgpW1xcXFxdXXxcIiArIGF0dHJpYnV0ZXMgKyBcIikqKXxcIiArXG5cblx0XHQvLyAzLiBhbnl0aGluZyBlbHNlIChjYXB0dXJlIDIpXG5cdFx0XCIuKlwiICtcblx0XHRcIilcXFxcKXwpXCIsXG5cblx0Ly8gTGVhZGluZyBhbmQgbm9uLWVzY2FwZWQgdHJhaWxpbmcgd2hpdGVzcGFjZSwgY2FwdHVyaW5nIHNvbWUgbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVycyBwcmVjZWRpbmcgdGhlIGxhdHRlclxuXHRyd2hpdGVzcGFjZSA9IG5ldyBSZWdFeHAoIHdoaXRlc3BhY2UgKyBcIitcIiwgXCJnXCIgKSxcblx0cnRyaW0gPSBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIit8KCg/Ol58W15cXFxcXFxcXF0pKD86XFxcXFxcXFwuKSopXCIgK1xuXHRcdHdoaXRlc3BhY2UgKyBcIiskXCIsIFwiZ1wiICksXG5cblx0cmNvbW1hID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIqLFwiICsgd2hpdGVzcGFjZSArIFwiKlwiICksXG5cdHJjb21iaW5hdG9ycyA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKihbPit+XXxcIiArIHdoaXRlc3BhY2UgKyBcIilcIiArIHdoaXRlc3BhY2UgK1xuXHRcdFwiKlwiICksXG5cdHJkZXNjZW5kID0gbmV3IFJlZ0V4cCggd2hpdGVzcGFjZSArIFwifD5cIiApLFxuXG5cdHJwc2V1ZG8gPSBuZXcgUmVnRXhwKCBwc2V1ZG9zICksXG5cdHJpZGVudGlmaWVyID0gbmV3IFJlZ0V4cCggXCJeXCIgKyBpZGVudGlmaWVyICsgXCIkXCIgKSxcblxuXHRtYXRjaEV4cHIgPSB7XG5cdFx0XCJJRFwiOiBuZXcgUmVnRXhwKCBcIl4jKFwiICsgaWRlbnRpZmllciArIFwiKVwiICksXG5cdFx0XCJDTEFTU1wiOiBuZXcgUmVnRXhwKCBcIl5cXFxcLihcIiArIGlkZW50aWZpZXIgKyBcIilcIiApLFxuXHRcdFwiVEFHXCI6IG5ldyBSZWdFeHAoIFwiXihcIiArIGlkZW50aWZpZXIgKyBcInxbKl0pXCIgKSxcblx0XHRcIkFUVFJcIjogbmV3IFJlZ0V4cCggXCJeXCIgKyBhdHRyaWJ1dGVzICksXG5cdFx0XCJQU0VVRE9cIjogbmV3IFJlZ0V4cCggXCJeXCIgKyBwc2V1ZG9zICksXG5cdFx0XCJDSElMRFwiOiBuZXcgUmVnRXhwKCBcIl46KG9ubHl8Zmlyc3R8bGFzdHxudGh8bnRoLWxhc3QpLShjaGlsZHxvZi10eXBlKSg/OlxcXFwoXCIgK1xuXHRcdFx0d2hpdGVzcGFjZSArIFwiKihldmVufG9kZHwoKFsrLV18KShcXFxcZCopbnwpXCIgKyB3aGl0ZXNwYWNlICsgXCIqKD86KFsrLV18KVwiICtcblx0XHRcdHdoaXRlc3BhY2UgKyBcIiooXFxcXGQrKXwpKVwiICsgd2hpdGVzcGFjZSArIFwiKlxcXFwpfClcIiwgXCJpXCIgKSxcblx0XHRcImJvb2xcIjogbmV3IFJlZ0V4cCggXCJeKD86XCIgKyBib29sZWFucyArIFwiKSRcIiwgXCJpXCIgKSxcblxuXHRcdC8vIEZvciB1c2UgaW4gbGlicmFyaWVzIGltcGxlbWVudGluZyAuaXMoKVxuXHRcdC8vIFdlIHVzZSB0aGlzIGZvciBQT1MgbWF0Y2hpbmcgaW4gYHNlbGVjdGBcblx0XHRcIm5lZWRzQ29udGV4dFwiOiBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgK1xuXHRcdFx0XCIqWz4rfl18OihldmVufG9kZHxlcXxndHxsdHxudGh8Zmlyc3R8bGFzdCkoPzpcXFxcKFwiICsgd2hpdGVzcGFjZSArXG5cdFx0XHRcIiooKD86LVxcXFxkKT9cXFxcZCopXCIgKyB3aGl0ZXNwYWNlICsgXCIqXFxcXCl8KSg/PVteLV18JClcIiwgXCJpXCIgKVxuXHR9LFxuXG5cdHJodG1sID0gL0hUTUwkL2ksXG5cdHJpbnB1dHMgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b24pJC9pLFxuXHRyaGVhZGVyID0gL15oXFxkJC9pLFxuXG5cdHJuYXRpdmUgPSAvXltee10rXFx7XFxzKlxcW25hdGl2ZSBcXHcvLFxuXG5cdC8vIEVhc2lseS1wYXJzZWFibGUvcmV0cmlldmFibGUgSUQgb3IgVEFHIG9yIENMQVNTIHNlbGVjdG9yc1xuXHRycXVpY2tFeHByID0gL14oPzojKFtcXHctXSspfChcXHcrKXxcXC4oW1xcdy1dKykpJC8sXG5cblx0cnNpYmxpbmcgPSAvWyt+XS8sXG5cblx0Ly8gQ1NTIGVzY2FwZXNcblx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvQ1NTMjEvc3luZGF0YS5odG1sI2VzY2FwZWQtY2hhcmFjdGVyc1xuXHRydW5lc2NhcGUgPSBuZXcgUmVnRXhwKCBcIlxcXFxcXFxcW1xcXFxkYS1mQS1GXXsxLDZ9XCIgKyB3aGl0ZXNwYWNlICsgXCI/fFxcXFxcXFxcKFteXFxcXHJcXFxcblxcXFxmXSlcIiwgXCJnXCIgKSxcblx0ZnVuZXNjYXBlID0gZnVuY3Rpb24oIGVzY2FwZSwgbm9uSGV4ICkge1xuXHRcdHZhciBoaWdoID0gXCIweFwiICsgZXNjYXBlLnNsaWNlKCAxICkgLSAweDEwMDAwO1xuXG5cdFx0cmV0dXJuIG5vbkhleCA/XG5cblx0XHRcdC8vIFN0cmlwIHRoZSBiYWNrc2xhc2ggcHJlZml4IGZyb20gYSBub24taGV4IGVzY2FwZSBzZXF1ZW5jZVxuXHRcdFx0bm9uSGV4IDpcblxuXHRcdFx0Ly8gUmVwbGFjZSBhIGhleGFkZWNpbWFsIGVzY2FwZSBzZXF1ZW5jZSB3aXRoIHRoZSBlbmNvZGVkIFVuaWNvZGUgY29kZSBwb2ludFxuXHRcdFx0Ly8gU3VwcG9ydDogSUUgPD0xMStcblx0XHRcdC8vIEZvciB2YWx1ZXMgb3V0c2lkZSB0aGUgQmFzaWMgTXVsdGlsaW5ndWFsIFBsYW5lIChCTVApLCBtYW51YWxseSBjb25zdHJ1Y3QgYVxuXHRcdFx0Ly8gc3Vycm9nYXRlIHBhaXJcblx0XHRcdGhpZ2ggPCAwID9cblx0XHRcdFx0U3RyaW5nLmZyb21DaGFyQ29kZSggaGlnaCArIDB4MTAwMDAgKSA6XG5cdFx0XHRcdFN0cmluZy5mcm9tQ2hhckNvZGUoIGhpZ2ggPj4gMTAgfCAweEQ4MDAsIGhpZ2ggJiAweDNGRiB8IDB4REMwMCApO1xuXHR9LFxuXG5cdC8vIENTUyBzdHJpbmcvaWRlbnRpZmllciBzZXJpYWxpemF0aW9uXG5cdC8vIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3NvbS8jY29tbW9uLXNlcmlhbGl6aW5nLWlkaW9tc1xuXHRyY3NzZXNjYXBlID0gLyhbXFwwLVxceDFmXFx4N2ZdfF4tP1xcZCl8Xi0kfFteXFwwLVxceDFmXFx4N2YtXFx1RkZGRlxcdy1dL2csXG5cdGZjc3Nlc2NhcGUgPSBmdW5jdGlvbiggY2gsIGFzQ29kZVBvaW50ICkge1xuXHRcdGlmICggYXNDb2RlUG9pbnQgKSB7XG5cblx0XHRcdC8vIFUrMDAwMCBOVUxMIGJlY29tZXMgVStGRkZEIFJFUExBQ0VNRU5UIENIQVJBQ1RFUlxuXHRcdFx0aWYgKCBjaCA9PT0gXCJcXDBcIiApIHtcblx0XHRcdFx0cmV0dXJuIFwiXFx1RkZGRFwiO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb250cm9sIGNoYXJhY3RlcnMgYW5kIChkZXBlbmRlbnQgdXBvbiBwb3NpdGlvbikgbnVtYmVycyBnZXQgZXNjYXBlZCBhcyBjb2RlIHBvaW50c1xuXHRcdFx0cmV0dXJuIGNoLnNsaWNlKCAwLCAtMSApICsgXCJcXFxcXCIgK1xuXHRcdFx0XHRjaC5jaGFyQ29kZUF0KCBjaC5sZW5ndGggLSAxICkudG9TdHJpbmcoIDE2ICkgKyBcIiBcIjtcblx0XHR9XG5cblx0XHQvLyBPdGhlciBwb3RlbnRpYWxseS1zcGVjaWFsIEFTQ0lJIGNoYXJhY3RlcnMgZ2V0IGJhY2tzbGFzaC1lc2NhcGVkXG5cdFx0cmV0dXJuIFwiXFxcXFwiICsgY2g7XG5cdH0sXG5cblx0Ly8gVXNlZCBmb3IgaWZyYW1lc1xuXHQvLyBTZWUgc2V0RG9jdW1lbnQoKVxuXHQvLyBSZW1vdmluZyB0aGUgZnVuY3Rpb24gd3JhcHBlciBjYXVzZXMgYSBcIlBlcm1pc3Npb24gRGVuaWVkXCJcblx0Ly8gZXJyb3IgaW4gSUVcblx0dW5sb2FkSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuXHRcdHNldERvY3VtZW50KCk7XG5cdH0sXG5cblx0aW5EaXNhYmxlZEZpZWxkc2V0ID0gYWRkQ29tYmluYXRvcihcblx0XHRmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtLmRpc2FibGVkID09PSB0cnVlICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJmaWVsZHNldFwiO1xuXHRcdH0sXG5cdFx0eyBkaXI6IFwicGFyZW50Tm9kZVwiLCBuZXh0OiBcImxlZ2VuZFwiIH1cblx0KTtcblxuLy8gT3B0aW1pemUgZm9yIHB1c2guYXBwbHkoIF8sIE5vZGVMaXN0IClcbnRyeSB7XG5cdHB1c2guYXBwbHkoXG5cdFx0KCBhcnIgPSBzbGljZS5jYWxsKCBwcmVmZXJyZWREb2MuY2hpbGROb2RlcyApICksXG5cdFx0cHJlZmVycmVkRG9jLmNoaWxkTm9kZXNcblx0KTtcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkPDQuMFxuXHQvLyBEZXRlY3Qgc2lsZW50bHkgZmFpbGluZyBwdXNoLmFwcGx5XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcblx0YXJyWyBwcmVmZXJyZWREb2MuY2hpbGROb2Rlcy5sZW5ndGggXS5ub2RlVHlwZTtcbn0gY2F0Y2ggKCBlICkge1xuXHRwdXNoID0geyBhcHBseTogYXJyLmxlbmd0aCA/XG5cblx0XHQvLyBMZXZlcmFnZSBzbGljZSBpZiBwb3NzaWJsZVxuXHRcdGZ1bmN0aW9uKCB0YXJnZXQsIGVscyApIHtcblx0XHRcdHB1c2hOYXRpdmUuYXBwbHkoIHRhcmdldCwgc2xpY2UuY2FsbCggZWxzICkgKTtcblx0XHR9IDpcblxuXHRcdC8vIFN1cHBvcnQ6IElFPDlcblx0XHQvLyBPdGhlcndpc2UgYXBwZW5kIGRpcmVjdGx5XG5cdFx0ZnVuY3Rpb24oIHRhcmdldCwgZWxzICkge1xuXHRcdFx0dmFyIGogPSB0YXJnZXQubGVuZ3RoLFxuXHRcdFx0XHRpID0gMDtcblxuXHRcdFx0Ly8gQ2FuJ3QgdHJ1c3QgTm9kZUxpc3QubGVuZ3RoXG5cdFx0XHR3aGlsZSAoICggdGFyZ2V0WyBqKysgXSA9IGVsc1sgaSsrIF0gKSApIHt9XG5cdFx0XHR0YXJnZXQubGVuZ3RoID0gaiAtIDE7XG5cdFx0fVxuXHR9O1xufVxuXG5mdW5jdGlvbiBTaXp6bGUoIHNlbGVjdG9yLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICkge1xuXHR2YXIgbSwgaSwgZWxlbSwgbmlkLCBtYXRjaCwgZ3JvdXBzLCBuZXdTZWxlY3Rvcixcblx0XHRuZXdDb250ZXh0ID0gY29udGV4dCAmJiBjb250ZXh0Lm93bmVyRG9jdW1lbnQsXG5cblx0XHQvLyBub2RlVHlwZSBkZWZhdWx0cyB0byA5LCBzaW5jZSBjb250ZXh0IGRlZmF1bHRzIHRvIGRvY3VtZW50XG5cdFx0bm9kZVR5cGUgPSBjb250ZXh0ID8gY29udGV4dC5ub2RlVHlwZSA6IDk7XG5cblx0cmVzdWx0cyA9IHJlc3VsdHMgfHwgW107XG5cblx0Ly8gUmV0dXJuIGVhcmx5IGZyb20gY2FsbHMgd2l0aCBpbnZhbGlkIHNlbGVjdG9yIG9yIGNvbnRleHRcblx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgfHwgIXNlbGVjdG9yIHx8XG5cdFx0bm9kZVR5cGUgIT09IDEgJiYgbm9kZVR5cGUgIT09IDkgJiYgbm9kZVR5cGUgIT09IDExICkge1xuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHQvLyBUcnkgdG8gc2hvcnRjdXQgZmluZCBvcGVyYXRpb25zIChhcyBvcHBvc2VkIHRvIGZpbHRlcnMpIGluIEhUTUwgZG9jdW1lbnRzXG5cdGlmICggIXNlZWQgKSB7XG5cdFx0c2V0RG9jdW1lbnQoIGNvbnRleHQgKTtcblx0XHRjb250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcblxuXHRcdGlmICggZG9jdW1lbnRJc0hUTUwgKSB7XG5cblx0XHRcdC8vIElmIHRoZSBzZWxlY3RvciBpcyBzdWZmaWNpZW50bHkgc2ltcGxlLCB0cnkgdXNpbmcgYSBcImdldCpCeSpcIiBET00gbWV0aG9kXG5cdFx0XHQvLyAoZXhjZXB0aW5nIERvY3VtZW50RnJhZ21lbnQgY29udGV4dCwgd2hlcmUgdGhlIG1ldGhvZHMgZG9uJ3QgZXhpc3QpXG5cdFx0XHRpZiAoIG5vZGVUeXBlICE9PSAxMSAmJiAoIG1hdGNoID0gcnF1aWNrRXhwci5leGVjKCBzZWxlY3RvciApICkgKSB7XG5cblx0XHRcdFx0Ly8gSUQgc2VsZWN0b3Jcblx0XHRcdFx0aWYgKCAoIG0gPSBtYXRjaFsgMSBdICkgKSB7XG5cblx0XHRcdFx0XHQvLyBEb2N1bWVudCBjb250ZXh0XG5cdFx0XHRcdFx0aWYgKCBub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0XHRcdGlmICggKCBlbGVtID0gY29udGV4dC5nZXRFbGVtZW50QnlJZCggbSApICkgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUsIE9wZXJhLCBXZWJraXRcblx0XHRcdFx0XHRcdFx0Ly8gVE9ETzogaWRlbnRpZnkgdmVyc2lvbnNcblx0XHRcdFx0XHRcdFx0Ly8gZ2V0RWxlbWVudEJ5SWQgY2FuIG1hdGNoIGVsZW1lbnRzIGJ5IG5hbWUgaW5zdGVhZCBvZiBJRFxuXHRcdFx0XHRcdFx0XHRpZiAoIGVsZW0uaWQgPT09IG0gKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0cy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gRWxlbWVudCBjb250ZXh0XG5cdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUsIE9wZXJhLCBXZWJraXRcblx0XHRcdFx0XHRcdC8vIFRPRE86IGlkZW50aWZ5IHZlcnNpb25zXG5cdFx0XHRcdFx0XHQvLyBnZXRFbGVtZW50QnlJZCBjYW4gbWF0Y2ggZWxlbWVudHMgYnkgbmFtZSBpbnN0ZWFkIG9mIElEXG5cdFx0XHRcdFx0XHRpZiAoIG5ld0NvbnRleHQgJiYgKCBlbGVtID0gbmV3Q29udGV4dC5nZXRFbGVtZW50QnlJZCggbSApICkgJiZcblx0XHRcdFx0XHRcdFx0Y29udGFpbnMoIGNvbnRleHQsIGVsZW0gKSAmJlxuXHRcdFx0XHRcdFx0XHRlbGVtLmlkID09PSBtICkge1xuXG5cdFx0XHRcdFx0XHRcdHJlc3VsdHMucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gVHlwZSBzZWxlY3RvclxuXHRcdFx0XHR9IGVsc2UgaWYgKCBtYXRjaFsgMiBdICkge1xuXHRcdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHNlbGVjdG9yICkgKTtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblxuXHRcdFx0XHQvLyBDbGFzcyBzZWxlY3RvclxuXHRcdFx0XHR9IGVsc2UgaWYgKCAoIG0gPSBtYXRjaFsgMyBdICkgJiYgc3VwcG9ydC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICYmXG5cdFx0XHRcdFx0Y29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICkge1xuXG5cdFx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBtICkgKTtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBUYWtlIGFkdmFudGFnZSBvZiBxdWVyeVNlbGVjdG9yQWxsXG5cdFx0XHRpZiAoIHN1cHBvcnQucXNhICYmXG5cdFx0XHRcdCFub25uYXRpdmVTZWxlY3RvckNhY2hlWyBzZWxlY3RvciArIFwiIFwiIF0gJiZcblx0XHRcdFx0KCAhcmJ1Z2d5UVNBIHx8ICFyYnVnZ3lRU0EudGVzdCggc2VsZWN0b3IgKSApICYmXG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgOCBvbmx5XG5cdFx0XHRcdC8vIEV4Y2x1ZGUgb2JqZWN0IGVsZW1lbnRzXG5cdFx0XHRcdCggbm9kZVR5cGUgIT09IDEgfHwgY29udGV4dC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSBcIm9iamVjdFwiICkgKSB7XG5cblx0XHRcdFx0bmV3U2VsZWN0b3IgPSBzZWxlY3Rvcjtcblx0XHRcdFx0bmV3Q29udGV4dCA9IGNvbnRleHQ7XG5cblx0XHRcdFx0Ly8gcVNBIGNvbnNpZGVycyBlbGVtZW50cyBvdXRzaWRlIGEgc2NvcGluZyByb290IHdoZW4gZXZhbHVhdGluZyBjaGlsZCBvclxuXHRcdFx0XHQvLyBkZXNjZW5kYW50IGNvbWJpbmF0b3JzLCB3aGljaCBpcyBub3Qgd2hhdCB3ZSB3YW50LlxuXHRcdFx0XHQvLyBJbiBzdWNoIGNhc2VzLCB3ZSB3b3JrIGFyb3VuZCB0aGUgYmVoYXZpb3IgYnkgcHJlZml4aW5nIGV2ZXJ5IHNlbGVjdG9yIGluIHRoZVxuXHRcdFx0XHQvLyBsaXN0IHdpdGggYW4gSUQgc2VsZWN0b3IgcmVmZXJlbmNpbmcgdGhlIHNjb3BlIGNvbnRleHQuXG5cdFx0XHRcdC8vIFRoZSB0ZWNobmlxdWUgaGFzIHRvIGJlIHVzZWQgYXMgd2VsbCB3aGVuIGEgbGVhZGluZyBjb21iaW5hdG9yIGlzIHVzZWRcblx0XHRcdFx0Ly8gYXMgc3VjaCBzZWxlY3RvcnMgYXJlIG5vdCByZWNvZ25pemVkIGJ5IHF1ZXJ5U2VsZWN0b3JBbGwuXG5cdFx0XHRcdC8vIFRoYW5rcyB0byBBbmRyZXcgRHVwb250IGZvciB0aGlzIHRlY2huaXF1ZS5cblx0XHRcdFx0aWYgKCBub2RlVHlwZSA9PT0gMSAmJlxuXHRcdFx0XHRcdCggcmRlc2NlbmQudGVzdCggc2VsZWN0b3IgKSB8fCByY29tYmluYXRvcnMudGVzdCggc2VsZWN0b3IgKSApICkge1xuXG5cdFx0XHRcdFx0Ly8gRXhwYW5kIGNvbnRleHQgZm9yIHNpYmxpbmcgc2VsZWN0b3JzXG5cdFx0XHRcdFx0bmV3Q29udGV4dCA9IHJzaWJsaW5nLnRlc3QoIHNlbGVjdG9yICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8XG5cdFx0XHRcdFx0XHRjb250ZXh0O1xuXG5cdFx0XHRcdFx0Ly8gV2UgY2FuIHVzZSA6c2NvcGUgaW5zdGVhZCBvZiB0aGUgSUQgaGFjayBpZiB0aGUgYnJvd3NlclxuXHRcdFx0XHRcdC8vIHN1cHBvcnRzIGl0ICYgaWYgd2UncmUgbm90IGNoYW5naW5nIHRoZSBjb250ZXh0LlxuXHRcdFx0XHRcdGlmICggbmV3Q29udGV4dCAhPT0gY29udGV4dCB8fCAhc3VwcG9ydC5zY29wZSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gQ2FwdHVyZSB0aGUgY29udGV4dCBJRCwgc2V0dGluZyBpdCBmaXJzdCBpZiBuZWNlc3Nhcnlcblx0XHRcdFx0XHRcdGlmICggKCBuaWQgPSBjb250ZXh0LmdldEF0dHJpYnV0ZSggXCJpZFwiICkgKSApIHtcblx0XHRcdFx0XHRcdFx0bmlkID0gbmlkLnJlcGxhY2UoIHJjc3Nlc2NhcGUsIGZjc3Nlc2NhcGUgKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRleHQuc2V0QXR0cmlidXRlKCBcImlkXCIsICggbmlkID0gZXhwYW5kbyApICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gUHJlZml4IGV2ZXJ5IHNlbGVjdG9yIGluIHRoZSBsaXN0XG5cdFx0XHRcdFx0Z3JvdXBzID0gdG9rZW5pemUoIHNlbGVjdG9yICk7XG5cdFx0XHRcdFx0aSA9IGdyb3Vwcy5sZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRncm91cHNbIGkgXSA9ICggbmlkID8gXCIjXCIgKyBuaWQgOiBcIjpzY29wZVwiICkgKyBcIiBcIiArXG5cdFx0XHRcdFx0XHRcdHRvU2VsZWN0b3IoIGdyb3Vwc1sgaSBdICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG5ld1NlbGVjdG9yID0gZ3JvdXBzLmpvaW4oIFwiLFwiICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsXG5cdFx0XHRcdFx0XHRuZXdDb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIG5ld1NlbGVjdG9yIClcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHR9IGNhdGNoICggcXNhRXJyb3IgKSB7XG5cdFx0XHRcdFx0bm9ubmF0aXZlU2VsZWN0b3JDYWNoZSggc2VsZWN0b3IsIHRydWUgKTtcblx0XHRcdFx0fSBmaW5hbGx5IHtcblx0XHRcdFx0XHRpZiAoIG5pZCA9PT0gZXhwYW5kbyApIHtcblx0XHRcdFx0XHRcdGNvbnRleHQucmVtb3ZlQXR0cmlidXRlKCBcImlkXCIgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBBbGwgb3RoZXJzXG5cdHJldHVybiBzZWxlY3QoIHNlbGVjdG9yLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApO1xufVxuXG4vKipcbiAqIENyZWF0ZSBrZXktdmFsdWUgY2FjaGVzIG9mIGxpbWl0ZWQgc2l6ZVxuICogQHJldHVybnMge2Z1bmN0aW9uKHN0cmluZywgb2JqZWN0KX0gUmV0dXJucyB0aGUgT2JqZWN0IGRhdGEgYWZ0ZXIgc3RvcmluZyBpdCBvbiBpdHNlbGYgd2l0aFxuICpcdHByb3BlcnR5IG5hbWUgdGhlIChzcGFjZS1zdWZmaXhlZCkgc3RyaW5nIGFuZCAoaWYgdGhlIGNhY2hlIGlzIGxhcmdlciB0aGFuIEV4cHIuY2FjaGVMZW5ndGgpXG4gKlx0ZGVsZXRpbmcgdGhlIG9sZGVzdCBlbnRyeVxuICovXG5mdW5jdGlvbiBjcmVhdGVDYWNoZSgpIHtcblx0dmFyIGtleXMgPSBbXTtcblxuXHRmdW5jdGlvbiBjYWNoZSgga2V5LCB2YWx1ZSApIHtcblxuXHRcdC8vIFVzZSAoa2V5ICsgXCIgXCIpIHRvIGF2b2lkIGNvbGxpc2lvbiB3aXRoIG5hdGl2ZSBwcm90b3R5cGUgcHJvcGVydGllcyAoc2VlIElzc3VlICMxNTcpXG5cdFx0aWYgKCBrZXlzLnB1c2goIGtleSArIFwiIFwiICkgPiBFeHByLmNhY2hlTGVuZ3RoICkge1xuXG5cdFx0XHQvLyBPbmx5IGtlZXAgdGhlIG1vc3QgcmVjZW50IGVudHJpZXNcblx0XHRcdGRlbGV0ZSBjYWNoZVsga2V5cy5zaGlmdCgpIF07XG5cdFx0fVxuXHRcdHJldHVybiAoIGNhY2hlWyBrZXkgKyBcIiBcIiBdID0gdmFsdWUgKTtcblx0fVxuXHRyZXR1cm4gY2FjaGU7XG59XG5cbi8qKlxuICogTWFyayBhIGZ1bmN0aW9uIGZvciBzcGVjaWFsIHVzZSBieSBTaXp6bGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBtYXJrXG4gKi9cbmZ1bmN0aW9uIG1hcmtGdW5jdGlvbiggZm4gKSB7XG5cdGZuWyBleHBhbmRvIF0gPSB0cnVlO1xuXHRyZXR1cm4gZm47XG59XG5cbi8qKlxuICogU3VwcG9ydCB0ZXN0aW5nIHVzaW5nIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFBhc3NlZCB0aGUgY3JlYXRlZCBlbGVtZW50IGFuZCByZXR1cm5zIGEgYm9vbGVhbiByZXN1bHRcbiAqL1xuZnVuY3Rpb24gYXNzZXJ0KCBmbiApIHtcblx0dmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJmaWVsZHNldFwiICk7XG5cblx0dHJ5IHtcblx0XHRyZXR1cm4gISFmbiggZWwgKTtcblx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9IGZpbmFsbHkge1xuXG5cdFx0Ly8gUmVtb3ZlIGZyb20gaXRzIHBhcmVudCBieSBkZWZhdWx0XG5cdFx0aWYgKCBlbC5wYXJlbnROb2RlICkge1xuXHRcdFx0ZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggZWwgKTtcblx0XHR9XG5cblx0XHQvLyByZWxlYXNlIG1lbW9yeSBpbiBJRVxuXHRcdGVsID0gbnVsbDtcblx0fVxufVxuXG4vKipcbiAqIEFkZHMgdGhlIHNhbWUgaGFuZGxlciBmb3IgYWxsIG9mIHRoZSBzcGVjaWZpZWQgYXR0cnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBhdHRycyBQaXBlLXNlcGFyYXRlZCBsaXN0IG9mIGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXIgVGhlIG1ldGhvZCB0aGF0IHdpbGwgYmUgYXBwbGllZFxuICovXG5mdW5jdGlvbiBhZGRIYW5kbGUoIGF0dHJzLCBoYW5kbGVyICkge1xuXHR2YXIgYXJyID0gYXR0cnMuc3BsaXQoIFwifFwiICksXG5cdFx0aSA9IGFyci5sZW5ndGg7XG5cblx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0RXhwci5hdHRySGFuZGxlWyBhcnJbIGkgXSBdID0gaGFuZGxlcjtcblx0fVxufVxuXG4vKipcbiAqIENoZWNrcyBkb2N1bWVudCBvcmRlciBvZiB0d28gc2libGluZ3NcbiAqIEBwYXJhbSB7RWxlbWVudH0gYVxuICogQHBhcmFtIHtFbGVtZW50fSBiXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIGxlc3MgdGhhbiAwIGlmIGEgcHJlY2VkZXMgYiwgZ3JlYXRlciB0aGFuIDAgaWYgYSBmb2xsb3dzIGJcbiAqL1xuZnVuY3Rpb24gc2libGluZ0NoZWNrKCBhLCBiICkge1xuXHR2YXIgY3VyID0gYiAmJiBhLFxuXHRcdGRpZmYgPSBjdXIgJiYgYS5ub2RlVHlwZSA9PT0gMSAmJiBiLm5vZGVUeXBlID09PSAxICYmXG5cdFx0XHRhLnNvdXJjZUluZGV4IC0gYi5zb3VyY2VJbmRleDtcblxuXHQvLyBVc2UgSUUgc291cmNlSW5kZXggaWYgYXZhaWxhYmxlIG9uIGJvdGggbm9kZXNcblx0aWYgKCBkaWZmICkge1xuXHRcdHJldHVybiBkaWZmO1xuXHR9XG5cblx0Ly8gQ2hlY2sgaWYgYiBmb2xsb3dzIGFcblx0aWYgKCBjdXIgKSB7XG5cdFx0d2hpbGUgKCAoIGN1ciA9IGN1ci5uZXh0U2libGluZyApICkge1xuXHRcdFx0aWYgKCBjdXIgPT09IGIgKSB7XG5cdFx0XHRcdHJldHVybiAtMTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gYSA/IDEgOiAtMTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIGlucHV0IHR5cGVzXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICovXG5mdW5jdGlvbiBjcmVhdGVJbnB1dFBzZXVkbyggdHlwZSApIHtcblx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdHJldHVybiBuYW1lID09PSBcImlucHV0XCIgJiYgZWxlbS50eXBlID09PSB0eXBlO1xuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgYnV0dG9uc1xuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQnV0dG9uUHNldWRvKCB0eXBlICkge1xuXHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0dmFyIG5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0cmV0dXJuICggbmFtZSA9PT0gXCJpbnB1dFwiIHx8IG5hbWUgPT09IFwiYnV0dG9uXCIgKSAmJiBlbGVtLnR5cGUgPT09IHR5cGU7XG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIHVzZSBpbiBwc2V1ZG9zIGZvciA6ZW5hYmxlZC86ZGlzYWJsZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZGlzYWJsZWQgdHJ1ZSBmb3IgOmRpc2FibGVkOyBmYWxzZSBmb3IgOmVuYWJsZWRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlRGlzYWJsZWRQc2V1ZG8oIGRpc2FibGVkICkge1xuXG5cdC8vIEtub3duIDpkaXNhYmxlZCBmYWxzZSBwb3NpdGl2ZXM6IGZpZWxkc2V0W2Rpc2FibGVkXSA+IGxlZ2VuZDpudGgtb2YtdHlwZShuKzIpIDpjYW4tZGlzYWJsZVxuXHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHQvLyBPbmx5IGNlcnRhaW4gZWxlbWVudHMgY2FuIG1hdGNoIDplbmFibGVkIG9yIDpkaXNhYmxlZFxuXHRcdC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3NjcmlwdGluZy5odG1sI3NlbGVjdG9yLWVuYWJsZWRcblx0XHQvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zY3JpcHRpbmcuaHRtbCNzZWxlY3Rvci1kaXNhYmxlZFxuXHRcdGlmICggXCJmb3JtXCIgaW4gZWxlbSApIHtcblxuXHRcdFx0Ly8gQ2hlY2sgZm9yIGluaGVyaXRlZCBkaXNhYmxlZG5lc3Mgb24gcmVsZXZhbnQgbm9uLWRpc2FibGVkIGVsZW1lbnRzOlxuXHRcdFx0Ly8gKiBsaXN0ZWQgZm9ybS1hc3NvY2lhdGVkIGVsZW1lbnRzIGluIGEgZGlzYWJsZWQgZmllbGRzZXRcblx0XHRcdC8vICAgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZm9ybXMuaHRtbCNjYXRlZ29yeS1saXN0ZWRcblx0XHRcdC8vICAgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZm9ybXMuaHRtbCNjb25jZXB0LWZlLWRpc2FibGVkXG5cdFx0XHQvLyAqIG9wdGlvbiBlbGVtZW50cyBpbiBhIGRpc2FibGVkIG9wdGdyb3VwXG5cdFx0XHQvLyAgIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2Zvcm1zLmh0bWwjY29uY2VwdC1vcHRpb24tZGlzYWJsZWRcblx0XHRcdC8vIEFsbCBzdWNoIGVsZW1lbnRzIGhhdmUgYSBcImZvcm1cIiBwcm9wZXJ0eS5cblx0XHRcdGlmICggZWxlbS5wYXJlbnROb2RlICYmIGVsZW0uZGlzYWJsZWQgPT09IGZhbHNlICkge1xuXG5cdFx0XHRcdC8vIE9wdGlvbiBlbGVtZW50cyBkZWZlciB0byBhIHBhcmVudCBvcHRncm91cCBpZiBwcmVzZW50XG5cdFx0XHRcdGlmICggXCJsYWJlbFwiIGluIGVsZW0gKSB7XG5cdFx0XHRcdFx0aWYgKCBcImxhYmVsXCIgaW4gZWxlbS5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW0ucGFyZW50Tm9kZS5kaXNhYmxlZCA9PT0gZGlzYWJsZWQ7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtLmRpc2FibGVkID09PSBkaXNhYmxlZDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA2IC0gMTFcblx0XHRcdFx0Ly8gVXNlIHRoZSBpc0Rpc2FibGVkIHNob3J0Y3V0IHByb3BlcnR5IHRvIGNoZWNrIGZvciBkaXNhYmxlZCBmaWVsZHNldCBhbmNlc3RvcnNcblx0XHRcdFx0cmV0dXJuIGVsZW0uaXNEaXNhYmxlZCA9PT0gZGlzYWJsZWQgfHxcblxuXHRcdFx0XHRcdC8vIFdoZXJlIHRoZXJlIGlzIG5vIGlzRGlzYWJsZWQsIGNoZWNrIG1hbnVhbGx5XG5cdFx0XHRcdFx0LyoganNoaW50IC1XMDE4ICovXG5cdFx0XHRcdFx0ZWxlbS5pc0Rpc2FibGVkICE9PSAhZGlzYWJsZWQgJiZcblx0XHRcdFx0XHRpbkRpc2FibGVkRmllbGRzZXQoIGVsZW0gKSA9PT0gZGlzYWJsZWQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBlbGVtLmRpc2FibGVkID09PSBkaXNhYmxlZDtcblxuXHRcdC8vIFRyeSB0byB3aW5ub3cgb3V0IGVsZW1lbnRzIHRoYXQgY2FuJ3QgYmUgZGlzYWJsZWQgYmVmb3JlIHRydXN0aW5nIHRoZSBkaXNhYmxlZCBwcm9wZXJ0eS5cblx0XHQvLyBTb21lIHZpY3RpbXMgZ2V0IGNhdWdodCBpbiBvdXIgbmV0IChsYWJlbCwgbGVnZW5kLCBtZW51LCB0cmFjayksIGJ1dCBpdCBzaG91bGRuJ3Rcblx0XHQvLyBldmVuIGV4aXN0IG9uIHRoZW0sIGxldCBhbG9uZSBoYXZlIGEgYm9vbGVhbiB2YWx1ZS5cblx0XHR9IGVsc2UgaWYgKCBcImxhYmVsXCIgaW4gZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtLmRpc2FibGVkID09PSBkaXNhYmxlZDtcblx0XHR9XG5cblx0XHQvLyBSZW1haW5pbmcgZWxlbWVudHMgYXJlIG5laXRoZXIgOmVuYWJsZWQgbm9yIDpkaXNhYmxlZFxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIHBvc2l0aW9uYWxzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICovXG5mdW5jdGlvbiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKCBmbiApIHtcblx0cmV0dXJuIG1hcmtGdW5jdGlvbiggZnVuY3Rpb24oIGFyZ3VtZW50ICkge1xuXHRcdGFyZ3VtZW50ID0gK2FyZ3VtZW50O1xuXHRcdHJldHVybiBtYXJrRnVuY3Rpb24oIGZ1bmN0aW9uKCBzZWVkLCBtYXRjaGVzICkge1xuXHRcdFx0dmFyIGosXG5cdFx0XHRcdG1hdGNoSW5kZXhlcyA9IGZuKCBbXSwgc2VlZC5sZW5ndGgsIGFyZ3VtZW50ICksXG5cdFx0XHRcdGkgPSBtYXRjaEluZGV4ZXMubGVuZ3RoO1xuXG5cdFx0XHQvLyBNYXRjaCBlbGVtZW50cyBmb3VuZCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4ZXNcblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRpZiAoIHNlZWRbICggaiA9IG1hdGNoSW5kZXhlc1sgaSBdICkgXSApIHtcblx0XHRcdFx0XHRzZWVkWyBqIF0gPSAhKCBtYXRjaGVzWyBqIF0gPSBzZWVkWyBqIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSApO1xufVxuXG4vKipcbiAqIENoZWNrcyBhIG5vZGUgZm9yIHZhbGlkaXR5IGFzIGEgU2l6emxlIGNvbnRleHRcbiAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3Q9fSBjb250ZXh0XG4gKiBAcmV0dXJucyB7RWxlbWVudHxPYmplY3R8Qm9vbGVhbn0gVGhlIGlucHV0IG5vZGUgaWYgYWNjZXB0YWJsZSwgb3RoZXJ3aXNlIGEgZmFsc3kgdmFsdWVcbiAqL1xuZnVuY3Rpb24gdGVzdENvbnRleHQoIGNvbnRleHQgKSB7XG5cdHJldHVybiBjb250ZXh0ICYmIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnRleHQ7XG59XG5cbi8vIEV4cG9zZSBzdXBwb3J0IHZhcnMgZm9yIGNvbnZlbmllbmNlXG5zdXBwb3J0ID0gU2l6emxlLnN1cHBvcnQgPSB7fTtcblxuLyoqXG4gKiBEZXRlY3RzIFhNTCBub2Rlc1xuICogQHBhcmFtIHtFbGVtZW50fE9iamVjdH0gZWxlbSBBbiBlbGVtZW50IG9yIGEgZG9jdW1lbnRcbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmZiBlbGVtIGlzIGEgbm9uLUhUTUwgWE1MIG5vZGVcbiAqL1xuaXNYTUwgPSBTaXp6bGUuaXNYTUwgPSBmdW5jdGlvbiggZWxlbSApIHtcblx0dmFyIG5hbWVzcGFjZSA9IGVsZW0gJiYgZWxlbS5uYW1lc3BhY2VVUkksXG5cdFx0ZG9jRWxlbSA9IGVsZW0gJiYgKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSApLmRvY3VtZW50RWxlbWVudDtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PThcblx0Ly8gQXNzdW1lIEhUTUwgd2hlbiBkb2N1bWVudEVsZW1lbnQgZG9lc24ndCB5ZXQgZXhpc3QsIHN1Y2ggYXMgaW5zaWRlIGxvYWRpbmcgaWZyYW1lc1xuXHQvLyBodHRwczovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvNDgzM1xuXHRyZXR1cm4gIXJodG1sLnRlc3QoIG5hbWVzcGFjZSB8fCBkb2NFbGVtICYmIGRvY0VsZW0ubm9kZU5hbWUgfHwgXCJIVE1MXCIgKTtcbn07XG5cbi8qKlxuICogU2V0cyBkb2N1bWVudC1yZWxhdGVkIHZhcmlhYmxlcyBvbmNlIGJhc2VkIG9uIHRoZSBjdXJyZW50IGRvY3VtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0fSBbZG9jXSBBbiBlbGVtZW50IG9yIGRvY3VtZW50IG9iamVjdCB0byB1c2UgdG8gc2V0IHRoZSBkb2N1bWVudFxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY3VycmVudCBkb2N1bWVudFxuICovXG5zZXREb2N1bWVudCA9IFNpenpsZS5zZXREb2N1bWVudCA9IGZ1bmN0aW9uKCBub2RlICkge1xuXHR2YXIgaGFzQ29tcGFyZSwgc3ViV2luZG93LFxuXHRcdGRvYyA9IG5vZGUgPyBub2RlLm93bmVyRG9jdW1lbnQgfHwgbm9kZSA6IHByZWZlcnJlZERvYztcblxuXHQvLyBSZXR1cm4gZWFybHkgaWYgZG9jIGlzIGludmFsaWQgb3IgYWxyZWFkeSBzZWxlY3RlZFxuXHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTcgLSAxOCtcblx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdC8vIHR3byBkb2N1bWVudHM7IHNoYWxsb3cgY29tcGFyaXNvbnMgd29yay5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXHRpZiAoIGRvYyA9PSBkb2N1bWVudCB8fCBkb2Mubm9kZVR5cGUgIT09IDkgfHwgIWRvYy5kb2N1bWVudEVsZW1lbnQgKSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50O1xuXHR9XG5cblx0Ly8gVXBkYXRlIGdsb2JhbCB2YXJpYWJsZXNcblx0ZG9jdW1lbnQgPSBkb2M7XG5cdGRvY0VsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cdGRvY3VtZW50SXNIVE1MID0gIWlzWE1MKCBkb2N1bWVudCApO1xuXG5cdC8vIFN1cHBvcnQ6IElFIDkgLSAxMSssIEVkZ2UgMTIgLSAxOCtcblx0Ly8gQWNjZXNzaW5nIGlmcmFtZSBkb2N1bWVudHMgYWZ0ZXIgdW5sb2FkIHRocm93cyBcInBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3JzIChqUXVlcnkgIzEzOTM2KVxuXHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTcgLSAxOCtcblx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdC8vIHR3byBkb2N1bWVudHM7IHNoYWxsb3cgY29tcGFyaXNvbnMgd29yay5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXHRpZiAoIHByZWZlcnJlZERvYyAhPSBkb2N1bWVudCAmJlxuXHRcdCggc3ViV2luZG93ID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcgKSAmJiBzdWJXaW5kb3cudG9wICE9PSBzdWJXaW5kb3cgKSB7XG5cblx0XHQvLyBTdXBwb3J0OiBJRSAxMSwgRWRnZVxuXHRcdGlmICggc3ViV2luZG93LmFkZEV2ZW50TGlzdGVuZXIgKSB7XG5cdFx0XHRzdWJXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggXCJ1bmxvYWRcIiwgdW5sb2FkSGFuZGxlciwgZmFsc2UgKTtcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDkgLSAxMCBvbmx5XG5cdFx0fSBlbHNlIGlmICggc3ViV2luZG93LmF0dGFjaEV2ZW50ICkge1xuXHRcdFx0c3ViV2luZG93LmF0dGFjaEV2ZW50KCBcIm9udW5sb2FkXCIsIHVubG9hZEhhbmRsZXIgKTtcblx0XHR9XG5cdH1cblxuXHQvLyBTdXBwb3J0OiBJRSA4IC0gMTErLCBFZGdlIDEyIC0gMTgrLCBDaHJvbWUgPD0xNiAtIDI1IG9ubHksIEZpcmVmb3ggPD0zLjYgLSAzMSBvbmx5LFxuXHQvLyBTYWZhcmkgNCAtIDUgb25seSwgT3BlcmEgPD0xMS42IC0gMTIueCBvbmx5XG5cdC8vIElFL0VkZ2UgJiBvbGRlciBicm93c2VycyBkb24ndCBzdXBwb3J0IHRoZSA6c2NvcGUgcHNldWRvLWNsYXNzLlxuXHQvLyBTdXBwb3J0OiBTYWZhcmkgNi4wIG9ubHlcblx0Ly8gU2FmYXJpIDYuMCBzdXBwb3J0cyA6c2NvcGUgYnV0IGl0J3MgYW4gYWxpYXMgb2YgOnJvb3QgdGhlcmUuXG5cdHN1cHBvcnQuc2NvcGUgPSBhc3NlcnQoIGZ1bmN0aW9uKCBlbCApIHtcblx0XHRkb2NFbGVtLmFwcGVuZENoaWxkKCBlbCApLmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkgKTtcblx0XHRyZXR1cm4gdHlwZW9mIGVsLnF1ZXJ5U2VsZWN0b3JBbGwgIT09IFwidW5kZWZpbmVkXCIgJiZcblx0XHRcdCFlbC5xdWVyeVNlbGVjdG9yQWxsKCBcIjpzY29wZSBmaWVsZHNldCBkaXZcIiApLmxlbmd0aDtcblx0fSApO1xuXG5cdC8qIEF0dHJpYnV0ZXNcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8vIFN1cHBvcnQ6IElFPDhcblx0Ly8gVmVyaWZ5IHRoYXQgZ2V0QXR0cmlidXRlIHJlYWxseSByZXR1cm5zIGF0dHJpYnV0ZXMgYW5kIG5vdCBwcm9wZXJ0aWVzXG5cdC8vIChleGNlcHRpbmcgSUU4IGJvb2xlYW5zKVxuXHRzdXBwb3J0LmF0dHJpYnV0ZXMgPSBhc3NlcnQoIGZ1bmN0aW9uKCBlbCApIHtcblx0XHRlbC5jbGFzc05hbWUgPSBcImlcIjtcblx0XHRyZXR1cm4gIWVsLmdldEF0dHJpYnV0ZSggXCJjbGFzc05hbWVcIiApO1xuXHR9ICk7XG5cblx0LyogZ2V0RWxlbWVudChzKUJ5KlxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gQ2hlY2sgaWYgZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpIHJldHVybnMgb25seSBlbGVtZW50c1xuXHRzdXBwb3J0LmdldEVsZW1lbnRzQnlUYWdOYW1lID0gYXNzZXJ0KCBmdW5jdGlvbiggZWwgKSB7XG5cdFx0ZWwuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoIFwiXCIgKSApO1xuXHRcdHJldHVybiAhZWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwiKlwiICkubGVuZ3RoO1xuXHR9ICk7XG5cblx0Ly8gU3VwcG9ydDogSUU8OVxuXHRzdXBwb3J0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgPSBybmF0aXZlLnRlc3QoIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgKTtcblxuXHQvLyBTdXBwb3J0OiBJRTwxMFxuXHQvLyBDaGVjayBpZiBnZXRFbGVtZW50QnlJZCByZXR1cm5zIGVsZW1lbnRzIGJ5IG5hbWVcblx0Ly8gVGhlIGJyb2tlbiBnZXRFbGVtZW50QnlJZCBtZXRob2RzIGRvbid0IHBpY2sgdXAgcHJvZ3JhbW1hdGljYWxseS1zZXQgbmFtZXMsXG5cdC8vIHNvIHVzZSBhIHJvdW5kYWJvdXQgZ2V0RWxlbWVudHNCeU5hbWUgdGVzdFxuXHRzdXBwb3J0LmdldEJ5SWQgPSBhc3NlcnQoIGZ1bmN0aW9uKCBlbCApIHtcblx0XHRkb2NFbGVtLmFwcGVuZENoaWxkKCBlbCApLmlkID0gZXhwYW5kbztcblx0XHRyZXR1cm4gIWRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lIHx8ICFkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSggZXhwYW5kbyApLmxlbmd0aDtcblx0fSApO1xuXG5cdC8vIElEIGZpbHRlciBhbmQgZmluZFxuXHRpZiAoIHN1cHBvcnQuZ2V0QnlJZCApIHtcblx0XHRFeHByLmZpbHRlclsgXCJJRFwiIF0gPSBmdW5jdGlvbiggaWQgKSB7XG5cdFx0XHR2YXIgYXR0cklkID0gaWQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0cmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKCBcImlkXCIgKSA9PT0gYXR0cklkO1xuXHRcdFx0fTtcblx0XHR9O1xuXHRcdEV4cHIuZmluZFsgXCJJRFwiIF0gPSBmdW5jdGlvbiggaWQsIGNvbnRleHQgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRCeUlkICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50SXNIVE1MICkge1xuXHRcdFx0XHR2YXIgZWxlbSA9IGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIGlkICk7XG5cdFx0XHRcdHJldHVybiBlbGVtID8gWyBlbGVtIF0gOiBbXTtcblx0XHRcdH1cblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdEV4cHIuZmlsdGVyWyBcIklEXCIgXSA9ICBmdW5jdGlvbiggaWQgKSB7XG5cdFx0XHR2YXIgYXR0cklkID0gaWQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0dmFyIG5vZGUgPSB0eXBlb2YgZWxlbS5nZXRBdHRyaWJ1dGVOb2RlICE9PSBcInVuZGVmaW5lZFwiICYmXG5cdFx0XHRcdFx0ZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKCBcImlkXCIgKTtcblx0XHRcdFx0cmV0dXJuIG5vZGUgJiYgbm9kZS52YWx1ZSA9PT0gYXR0cklkO1xuXHRcdFx0fTtcblx0XHR9O1xuXG5cdFx0Ly8gU3VwcG9ydDogSUUgNiAtIDcgb25seVxuXHRcdC8vIGdldEVsZW1lbnRCeUlkIGlzIG5vdCByZWxpYWJsZSBhcyBhIGZpbmQgc2hvcnRjdXRcblx0XHRFeHByLmZpbmRbIFwiSURcIiBdID0gZnVuY3Rpb24oIGlkLCBjb250ZXh0ICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50QnlJZCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudElzSFRNTCApIHtcblx0XHRcdFx0dmFyIG5vZGUsIGksIGVsZW1zLFxuXHRcdFx0XHRcdGVsZW0gPSBjb250ZXh0LmdldEVsZW1lbnRCeUlkKCBpZCApO1xuXG5cdFx0XHRcdGlmICggZWxlbSApIHtcblxuXHRcdFx0XHRcdC8vIFZlcmlmeSB0aGUgaWQgYXR0cmlidXRlXG5cdFx0XHRcdFx0bm9kZSA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZSggXCJpZFwiICk7XG5cdFx0XHRcdFx0aWYgKCBub2RlICYmIG5vZGUudmFsdWUgPT09IGlkICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIFsgZWxlbSBdO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIEZhbGwgYmFjayBvbiBnZXRFbGVtZW50c0J5TmFtZVxuXHRcdFx0XHRcdGVsZW1zID0gY29udGV4dC5nZXRFbGVtZW50c0J5TmFtZSggaWQgKTtcblx0XHRcdFx0XHRpID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoICggZWxlbSA9IGVsZW1zWyBpKysgXSApICkge1xuXHRcdFx0XHRcdFx0bm9kZSA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZSggXCJpZFwiICk7XG5cdFx0XHRcdFx0XHRpZiAoIG5vZGUgJiYgbm9kZS52YWx1ZSA9PT0gaWQgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBbIGVsZW0gXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG5cdC8vIFRhZ1xuXHRFeHByLmZpbmRbIFwiVEFHXCIgXSA9IHN1cHBvcnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgP1xuXHRcdGZ1bmN0aW9uKCB0YWcsIGNvbnRleHQgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lICE9PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggdGFnICk7XG5cblx0XHRcdC8vIERvY3VtZW50RnJhZ21lbnQgbm9kZXMgZG9uJ3QgaGF2ZSBnRUJUTlxuXHRcdFx0fSBlbHNlIGlmICggc3VwcG9ydC5xc2EgKSB7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIHRhZyApO1xuXHRcdFx0fVxuXHRcdH0gOlxuXG5cdFx0ZnVuY3Rpb24oIHRhZywgY29udGV4dCApIHtcblx0XHRcdHZhciBlbGVtLFxuXHRcdFx0XHR0bXAgPSBbXSxcblx0XHRcdFx0aSA9IDAsXG5cblx0XHRcdFx0Ly8gQnkgaGFwcHkgY29pbmNpZGVuY2UsIGEgKGJyb2tlbikgZ0VCVE4gYXBwZWFycyBvbiBEb2N1bWVudEZyYWdtZW50IG5vZGVzIHRvb1xuXHRcdFx0XHRyZXN1bHRzID0gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggdGFnICk7XG5cblx0XHRcdC8vIEZpbHRlciBvdXQgcG9zc2libGUgY29tbWVudHNcblx0XHRcdGlmICggdGFnID09PSBcIipcIiApIHtcblx0XHRcdFx0d2hpbGUgKCAoIGVsZW0gPSByZXN1bHRzWyBpKysgXSApICkge1xuXHRcdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdFx0XHRcdHRtcC5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRtcDtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdH07XG5cblx0Ly8gQ2xhc3Ncblx0RXhwci5maW5kWyBcIkNMQVNTXCIgXSA9IHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSAmJiBmdW5jdGlvbiggY2xhc3NOYW1lLCBjb250ZXh0ICkge1xuXHRcdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudElzSFRNTCApIHtcblx0XHRcdHJldHVybiBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoIGNsYXNzTmFtZSApO1xuXHRcdH1cblx0fTtcblxuXHQvKiBRU0EvbWF0Y2hlc1NlbGVjdG9yXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXHQvLyBRU0EgYW5kIG1hdGNoZXNTZWxlY3RvciBzdXBwb3J0XG5cblx0Ly8gbWF0Y2hlc1NlbGVjdG9yKDphY3RpdmUpIHJlcG9ydHMgZmFsc2Ugd2hlbiB0cnVlIChJRTkvT3BlcmEgMTEuNSlcblx0cmJ1Z2d5TWF0Y2hlcyA9IFtdO1xuXG5cdC8vIHFTYSg6Zm9jdXMpIHJlcG9ydHMgZmFsc2Ugd2hlbiB0cnVlIChDaHJvbWUgMjEpXG5cdC8vIFdlIGFsbG93IHRoaXMgYmVjYXVzZSBvZiBhIGJ1ZyBpbiBJRTgvOSB0aGF0IHRocm93cyBhbiBlcnJvclxuXHQvLyB3aGVuZXZlciBgZG9jdW1lbnQuYWN0aXZlRWxlbWVudGAgaXMgYWNjZXNzZWQgb24gYW4gaWZyYW1lXG5cdC8vIFNvLCB3ZSBhbGxvdyA6Zm9jdXMgdG8gcGFzcyB0aHJvdWdoIFFTQSBhbGwgdGhlIHRpbWUgdG8gYXZvaWQgdGhlIElFIGVycm9yXG5cdC8vIFNlZSBodHRwczovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTMzNzhcblx0cmJ1Z2d5UVNBID0gW107XG5cblx0aWYgKCAoIHN1cHBvcnQucXNhID0gcm5hdGl2ZS50ZXN0KCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsICkgKSApIHtcblxuXHRcdC8vIEJ1aWxkIFFTQSByZWdleFxuXHRcdC8vIFJlZ2V4IHN0cmF0ZWd5IGFkb3B0ZWQgZnJvbSBEaWVnbyBQZXJpbmlcblx0XHRhc3NlcnQoIGZ1bmN0aW9uKCBlbCApIHtcblxuXHRcdFx0dmFyIGlucHV0O1xuXG5cdFx0XHQvLyBTZWxlY3QgaXMgc2V0IHRvIGVtcHR5IHN0cmluZyBvbiBwdXJwb3NlXG5cdFx0XHQvLyBUaGlzIGlzIHRvIHRlc3QgSUUncyB0cmVhdG1lbnQgb2Ygbm90IGV4cGxpY2l0bHlcblx0XHRcdC8vIHNldHRpbmcgYSBib29sZWFuIGNvbnRlbnQgYXR0cmlidXRlLFxuXHRcdFx0Ly8gc2luY2UgaXRzIHByZXNlbmNlIHNob3VsZCBiZSBlbm91Z2hcblx0XHRcdC8vIGh0dHBzOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMjM1OVxuXHRcdFx0ZG9jRWxlbS5hcHBlbmRDaGlsZCggZWwgKS5pbm5lckhUTUwgPSBcIjxhIGlkPSdcIiArIGV4cGFuZG8gKyBcIic+PC9hPlwiICtcblx0XHRcdFx0XCI8c2VsZWN0IGlkPSdcIiArIGV4cGFuZG8gKyBcIi1cXHJcXFxcJyBtc2FsbG93Y2FwdHVyZT0nJz5cIiArXG5cdFx0XHRcdFwiPG9wdGlvbiBzZWxlY3RlZD0nJz48L29wdGlvbj48L3NlbGVjdD5cIjtcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU4LCBPcGVyYSAxMS0xMi4xNlxuXHRcdFx0Ly8gTm90aGluZyBzaG91bGQgYmUgc2VsZWN0ZWQgd2hlbiBlbXB0eSBzdHJpbmdzIGZvbGxvdyBePSBvciAkPSBvciAqPVxuXHRcdFx0Ly8gVGhlIHRlc3QgYXR0cmlidXRlIG11c3QgYmUgdW5rbm93biBpbiBPcGVyYSBidXQgXCJzYWZlXCIgZm9yIFdpblJUXG5cdFx0XHQvLyBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL2hoNDY1Mzg4LmFzcHgjYXR0cmlidXRlX3NlY3Rpb25cblx0XHRcdGlmICggZWwucXVlcnlTZWxlY3RvckFsbCggXCJbbXNhbGxvd2NhcHR1cmVePScnXVwiICkubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCJbKl4kXT1cIiArIHdoaXRlc3BhY2UgKyBcIiooPzonJ3xcXFwiXFxcIilcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRThcblx0XHRcdC8vIEJvb2xlYW4gYXR0cmlidXRlcyBhbmQgXCJ2YWx1ZVwiIGFyZSBub3QgdHJlYXRlZCBjb3JyZWN0bHlcblx0XHRcdGlmICggIWVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiW3NlbGVjdGVkXVwiICkubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKig/OnZhbHVlfFwiICsgYm9vbGVhbnMgKyBcIilcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBDaHJvbWU8MjksIEFuZHJvaWQ8NC40LCBTYWZhcmk8Ny4wKywgaU9TPDcuMCssIFBoYW50b21KUzwxLjkuOCtcblx0XHRcdGlmICggIWVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiW2lkfj1cIiArIGV4cGFuZG8gKyBcIi1dXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIn49XCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogSUUgMTErLCBFZGdlIDE1IC0gMTgrXG5cdFx0XHQvLyBJRSAxMS9FZGdlIGRvbid0IGZpbmQgZWxlbWVudHMgb24gYSBgW25hbWU9JyddYCBxdWVyeSBpbiBzb21lIGNhc2VzLlxuXHRcdFx0Ly8gQWRkaW5nIGEgdGVtcG9yYXJ5IGF0dHJpYnV0ZSB0byB0aGUgZG9jdW1lbnQgYmVmb3JlIHRoZSBzZWxlY3Rpb24gd29ya3Ncblx0XHRcdC8vIGFyb3VuZCB0aGUgaXNzdWUuXG5cdFx0XHQvLyBJbnRlcmVzdGluZ2x5LCBJRSAxMCAmIG9sZGVyIGRvbid0IHNlZW0gdG8gaGF2ZSB0aGUgaXNzdWUuXG5cdFx0XHRpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiaW5wdXRcIiApO1xuXHRcdFx0aW5wdXQuc2V0QXR0cmlidXRlKCBcIm5hbWVcIiwgXCJcIiApO1xuXHRcdFx0ZWwuYXBwZW5kQ2hpbGQoIGlucHV0ICk7XG5cdFx0XHRpZiAoICFlbC5xdWVyeVNlbGVjdG9yQWxsKCBcIltuYW1lPScnXVwiICkubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKm5hbWVcIiArIHdoaXRlc3BhY2UgKyBcIio9XCIgK1xuXHRcdFx0XHRcdHdoaXRlc3BhY2UgKyBcIiooPzonJ3xcXFwiXFxcIilcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBXZWJraXQvT3BlcmEgLSA6Y2hlY2tlZCBzaG91bGQgcmV0dXJuIHNlbGVjdGVkIG9wdGlvbiBlbGVtZW50c1xuXHRcdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAxMS9SRUMtY3NzMy1zZWxlY3RvcnMtMjAxMTA5MjkvI2NoZWNrZWRcblx0XHRcdC8vIElFOCB0aHJvd3MgZXJyb3IgaGVyZSBhbmQgd2lsbCBub3Qgc2VlIGxhdGVyIHRlc3RzXG5cdFx0XHRpZiAoICFlbC5xdWVyeVNlbGVjdG9yQWxsKCBcIjpjaGVja2VkXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIjpjaGVja2VkXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogU2FmYXJpIDgrLCBpT1MgOCtcblx0XHRcdC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzY4NTFcblx0XHRcdC8vIEluLXBhZ2UgYHNlbGVjdG9yI2lkIHNpYmxpbmctY29tYmluYXRvciBzZWxlY3RvcmAgZmFpbHNcblx0XHRcdGlmICggIWVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiYSNcIiArIGV4cGFuZG8gKyBcIisqXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIi4jLitbK35dXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogRmlyZWZveCA8PTMuNiAtIDUgb25seVxuXHRcdFx0Ly8gT2xkIEZpcmVmb3ggZG9lc24ndCB0aHJvdyBvbiBhIGJhZGx5LWVzY2FwZWQgaWRlbnRpZmllci5cblx0XHRcdGVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiXFxcXFxcZlwiICk7XG5cdFx0XHRyYnVnZ3lRU0EucHVzaCggXCJbXFxcXHJcXFxcblxcXFxmXVwiICk7XG5cdFx0fSApO1xuXG5cdFx0YXNzZXJ0KCBmdW5jdGlvbiggZWwgKSB7XG5cdFx0XHRlbC5pbm5lckhUTUwgPSBcIjxhIGhyZWY9JycgZGlzYWJsZWQ9J2Rpc2FibGVkJz48L2E+XCIgK1xuXHRcdFx0XHRcIjxzZWxlY3QgZGlzYWJsZWQ9J2Rpc2FibGVkJz48b3B0aW9uLz48L3NlbGVjdD5cIjtcblxuXHRcdFx0Ly8gU3VwcG9ydDogV2luZG93cyA4IE5hdGl2ZSBBcHBzXG5cdFx0XHQvLyBUaGUgdHlwZSBhbmQgbmFtZSBhdHRyaWJ1dGVzIGFyZSByZXN0cmljdGVkIGR1cmluZyAuaW5uZXJIVE1MIGFzc2lnbm1lbnRcblx0XHRcdHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiaW5wdXRcIiApO1xuXHRcdFx0aW5wdXQuc2V0QXR0cmlidXRlKCBcInR5cGVcIiwgXCJoaWRkZW5cIiApO1xuXHRcdFx0ZWwuYXBwZW5kQ2hpbGQoIGlucHV0ICkuc2V0QXR0cmlidXRlKCBcIm5hbWVcIiwgXCJEXCIgKTtcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU4XG5cdFx0XHQvLyBFbmZvcmNlIGNhc2Utc2Vuc2l0aXZpdHkgb2YgbmFtZSBhdHRyaWJ1dGVcblx0XHRcdGlmICggZWwucXVlcnlTZWxlY3RvckFsbCggXCJbbmFtZT1kXVwiICkubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCJuYW1lXCIgKyB3aGl0ZXNwYWNlICsgXCIqWypeJHwhfl0/PVwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZGIDMuNSAtIDplbmFibGVkLzpkaXNhYmxlZCBhbmQgaGlkZGVuIGVsZW1lbnRzIChoaWRkZW4gZWxlbWVudHMgYXJlIHN0aWxsIGVuYWJsZWQpXG5cdFx0XHQvLyBJRTggdGhyb3dzIGVycm9yIGhlcmUgYW5kIHdpbGwgbm90IHNlZSBsYXRlciB0ZXN0c1xuXHRcdFx0aWYgKCBlbC5xdWVyeVNlbGVjdG9yQWxsKCBcIjplbmFibGVkXCIgKS5sZW5ndGggIT09IDIgKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIjplbmFibGVkXCIsIFwiOmRpc2FibGVkXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU5LTExK1xuXHRcdFx0Ly8gSUUncyA6ZGlzYWJsZWQgc2VsZWN0b3IgZG9lcyBub3QgcGljayB1cCB0aGUgY2hpbGRyZW4gb2YgZGlzYWJsZWQgZmllbGRzZXRzXG5cdFx0XHRkb2NFbGVtLmFwcGVuZENoaWxkKCBlbCApLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGlmICggZWwucXVlcnlTZWxlY3RvckFsbCggXCI6ZGlzYWJsZWRcIiApLmxlbmd0aCAhPT0gMiApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiOmVuYWJsZWRcIiwgXCI6ZGlzYWJsZWRcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBPcGVyYSAxMCAtIDExIG9ubHlcblx0XHRcdC8vIE9wZXJhIDEwLTExIGRvZXMgbm90IHRocm93IG9uIHBvc3QtY29tbWEgaW52YWxpZCBwc2V1ZG9zXG5cdFx0XHRlbC5xdWVyeVNlbGVjdG9yQWxsKCBcIiosOnhcIiApO1xuXHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiLC4qOlwiICk7XG5cdFx0fSApO1xuXHR9XG5cblx0aWYgKCAoIHN1cHBvcnQubWF0Y2hlc1NlbGVjdG9yID0gcm5hdGl2ZS50ZXN0KCAoIG1hdGNoZXMgPSBkb2NFbGVtLm1hdGNoZXMgfHxcblx0XHRkb2NFbGVtLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGRvY0VsZW0ubW96TWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZG9jRWxlbS5vTWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZG9jRWxlbS5tc01hdGNoZXNTZWxlY3RvciApICkgKSApIHtcblxuXHRcdGFzc2VydCggZnVuY3Rpb24oIGVsICkge1xuXG5cdFx0XHQvLyBDaGVjayB0byBzZWUgaWYgaXQncyBwb3NzaWJsZSB0byBkbyBtYXRjaGVzU2VsZWN0b3Jcblx0XHRcdC8vIG9uIGEgZGlzY29ubmVjdGVkIG5vZGUgKElFIDkpXG5cdFx0XHRzdXBwb3J0LmRpc2Nvbm5lY3RlZE1hdGNoID0gbWF0Y2hlcy5jYWxsKCBlbCwgXCIqXCIgKTtcblxuXHRcdFx0Ly8gVGhpcyBzaG91bGQgZmFpbCB3aXRoIGFuIGV4Y2VwdGlvblxuXHRcdFx0Ly8gR2Vja28gZG9lcyBub3QgZXJyb3IsIHJldHVybnMgZmFsc2UgaW5zdGVhZFxuXHRcdFx0bWF0Y2hlcy5jYWxsKCBlbCwgXCJbcyE9JyddOnhcIiApO1xuXHRcdFx0cmJ1Z2d5TWF0Y2hlcy5wdXNoKCBcIiE9XCIsIHBzZXVkb3MgKTtcblx0XHR9ICk7XG5cdH1cblxuXHRyYnVnZ3lRU0EgPSByYnVnZ3lRU0EubGVuZ3RoICYmIG5ldyBSZWdFeHAoIHJidWdneVFTQS5qb2luKCBcInxcIiApICk7XG5cdHJidWdneU1hdGNoZXMgPSByYnVnZ3lNYXRjaGVzLmxlbmd0aCAmJiBuZXcgUmVnRXhwKCByYnVnZ3lNYXRjaGVzLmpvaW4oIFwifFwiICkgKTtcblxuXHQvKiBDb250YWluc1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cdGhhc0NvbXBhcmUgPSBybmF0aXZlLnRlc3QoIGRvY0VsZW0uY29tcGFyZURvY3VtZW50UG9zaXRpb24gKTtcblxuXHQvLyBFbGVtZW50IGNvbnRhaW5zIGFub3RoZXJcblx0Ly8gUHVycG9zZWZ1bGx5IHNlbGYtZXhjbHVzaXZlXG5cdC8vIEFzIGluLCBhbiBlbGVtZW50IGRvZXMgbm90IGNvbnRhaW4gaXRzZWxmXG5cdGNvbnRhaW5zID0gaGFzQ29tcGFyZSB8fCBybmF0aXZlLnRlc3QoIGRvY0VsZW0uY29udGFpbnMgKSA/XG5cdFx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0XHR2YXIgYWRvd24gPSBhLm5vZGVUeXBlID09PSA5ID8gYS5kb2N1bWVudEVsZW1lbnQgOiBhLFxuXHRcdFx0XHRidXAgPSBiICYmIGIucGFyZW50Tm9kZTtcblx0XHRcdHJldHVybiBhID09PSBidXAgfHwgISEoIGJ1cCAmJiBidXAubm9kZVR5cGUgPT09IDEgJiYgKFxuXHRcdFx0XHRhZG93bi5jb250YWlucyA/XG5cdFx0XHRcdFx0YWRvd24uY29udGFpbnMoIGJ1cCApIDpcblx0XHRcdFx0XHRhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uICYmIGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGJ1cCApICYgMTZcblx0XHRcdCkgKTtcblx0XHR9IDpcblx0XHRmdW5jdGlvbiggYSwgYiApIHtcblx0XHRcdGlmICggYiApIHtcblx0XHRcdFx0d2hpbGUgKCAoIGIgPSBiLnBhcmVudE5vZGUgKSApIHtcblx0XHRcdFx0XHRpZiAoIGIgPT09IGEgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXG5cdC8qIFNvcnRpbmdcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8vIERvY3VtZW50IG9yZGVyIHNvcnRpbmdcblx0c29ydE9yZGVyID0gaGFzQ29tcGFyZSA/XG5cdGZ1bmN0aW9uKCBhLCBiICkge1xuXG5cdFx0Ly8gRmxhZyBmb3IgZHVwbGljYXRlIHJlbW92YWxcblx0XHRpZiAoIGEgPT09IGIgKSB7XG5cdFx0XHRoYXNEdXBsaWNhdGUgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXG5cdFx0Ly8gU29ydCBvbiBtZXRob2QgZXhpc3RlbmNlIGlmIG9ubHkgb25lIGlucHV0IGhhcyBjb21wYXJlRG9jdW1lbnRQb3NpdGlvblxuXHRcdHZhciBjb21wYXJlID0gIWEuY29tcGFyZURvY3VtZW50UG9zaXRpb24gLSAhYi5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbjtcblx0XHRpZiAoIGNvbXBhcmUgKSB7XG5cdFx0XHRyZXR1cm4gY29tcGFyZTtcblx0XHR9XG5cblx0XHQvLyBDYWxjdWxhdGUgcG9zaXRpb24gaWYgYm90aCBpbnB1dHMgYmVsb25nIHRvIHRoZSBzYW1lIGRvY3VtZW50XG5cdFx0Ly8gU3VwcG9ydDogSUUgMTErLCBFZGdlIDE3IC0gMTgrXG5cdFx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdFx0Ly8gdHdvIGRvY3VtZW50czsgc2hhbGxvdyBjb21wYXJpc29ucyB3b3JrLlxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcblx0XHRjb21wYXJlID0gKCBhLm93bmVyRG9jdW1lbnQgfHwgYSApID09ICggYi5vd25lckRvY3VtZW50IHx8IGIgKSA/XG5cdFx0XHRhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBiICkgOlxuXG5cdFx0XHQvLyBPdGhlcndpc2Ugd2Uga25vdyB0aGV5IGFyZSBkaXNjb25uZWN0ZWRcblx0XHRcdDE7XG5cblx0XHQvLyBEaXNjb25uZWN0ZWQgbm9kZXNcblx0XHRpZiAoIGNvbXBhcmUgJiAxIHx8XG5cdFx0XHQoICFzdXBwb3J0LnNvcnREZXRhY2hlZCAmJiBiLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBhICkgPT09IGNvbXBhcmUgKSApIHtcblxuXHRcdFx0Ly8gQ2hvb3NlIHRoZSBmaXJzdCBlbGVtZW50IHRoYXQgaXMgcmVsYXRlZCB0byBvdXIgcHJlZmVycmVkIGRvY3VtZW50XG5cdFx0XHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTcgLSAxOCtcblx0XHRcdC8vIElFL0VkZ2Ugc29tZXRpbWVzIHRocm93IGEgXCJQZXJtaXNzaW9uIGRlbmllZFwiIGVycm9yIHdoZW4gc3RyaWN0LWNvbXBhcmluZ1xuXHRcdFx0Ly8gdHdvIGRvY3VtZW50czsgc2hhbGxvdyBjb21wYXJpc29ucyB3b3JrLlxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXHRcdFx0aWYgKCBhID09IGRvY3VtZW50IHx8IGEub3duZXJEb2N1bWVudCA9PSBwcmVmZXJyZWREb2MgJiZcblx0XHRcdFx0Y29udGFpbnMoIHByZWZlcnJlZERvYywgYSApICkge1xuXHRcdFx0XHRyZXR1cm4gLTE7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFIDExKywgRWRnZSAxNyAtIDE4K1xuXHRcdFx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdFx0XHQvLyB0d28gZG9jdW1lbnRzOyBzaGFsbG93IGNvbXBhcmlzb25zIHdvcmsuXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG5cdFx0XHRpZiAoIGIgPT0gZG9jdW1lbnQgfHwgYi5vd25lckRvY3VtZW50ID09IHByZWZlcnJlZERvYyAmJlxuXHRcdFx0XHRjb250YWlucyggcHJlZmVycmVkRG9jLCBiICkgKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNYWludGFpbiBvcmlnaW5hbCBvcmRlclxuXHRcdFx0cmV0dXJuIHNvcnRJbnB1dCA/XG5cdFx0XHRcdCggaW5kZXhPZiggc29ydElucHV0LCBhICkgLSBpbmRleE9mKCBzb3J0SW5wdXQsIGIgKSApIDpcblx0XHRcdFx0MDtcblx0XHR9XG5cblx0XHRyZXR1cm4gY29tcGFyZSAmIDQgPyAtMSA6IDE7XG5cdH0gOlxuXHRmdW5jdGlvbiggYSwgYiApIHtcblxuXHRcdC8vIEV4aXQgZWFybHkgaWYgdGhlIG5vZGVzIGFyZSBpZGVudGljYWxcblx0XHRpZiAoIGEgPT09IGIgKSB7XG5cdFx0XHRoYXNEdXBsaWNhdGUgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXG5cdFx0dmFyIGN1cixcblx0XHRcdGkgPSAwLFxuXHRcdFx0YXVwID0gYS5wYXJlbnROb2RlLFxuXHRcdFx0YnVwID0gYi5wYXJlbnROb2RlLFxuXHRcdFx0YXAgPSBbIGEgXSxcblx0XHRcdGJwID0gWyBiIF07XG5cblx0XHQvLyBQYXJlbnRsZXNzIG5vZGVzIGFyZSBlaXRoZXIgZG9jdW1lbnRzIG9yIGRpc2Nvbm5lY3RlZFxuXHRcdGlmICggIWF1cCB8fCAhYnVwICkge1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTcgLSAxOCtcblx0XHRcdC8vIElFL0VkZ2Ugc29tZXRpbWVzIHRocm93IGEgXCJQZXJtaXNzaW9uIGRlbmllZFwiIGVycm9yIHdoZW4gc3RyaWN0LWNvbXBhcmluZ1xuXHRcdFx0Ly8gdHdvIGRvY3VtZW50czsgc2hhbGxvdyBjb21wYXJpc29ucyB3b3JrLlxuXHRcdFx0LyogZXNsaW50LWRpc2FibGUgZXFlcWVxICovXG5cdFx0XHRyZXR1cm4gYSA9PSBkb2N1bWVudCA/IC0xIDpcblx0XHRcdFx0YiA9PSBkb2N1bWVudCA/IDEgOlxuXHRcdFx0XHQvKiBlc2xpbnQtZW5hYmxlIGVxZXFlcSAqL1xuXHRcdFx0XHRhdXAgPyAtMSA6XG5cdFx0XHRcdGJ1cCA/IDEgOlxuXHRcdFx0XHRzb3J0SW5wdXQgP1xuXHRcdFx0XHQoIGluZGV4T2YoIHNvcnRJbnB1dCwgYSApIC0gaW5kZXhPZiggc29ydElucHV0LCBiICkgKSA6XG5cdFx0XHRcdDA7XG5cblx0XHQvLyBJZiB0aGUgbm9kZXMgYXJlIHNpYmxpbmdzLCB3ZSBjYW4gZG8gYSBxdWljayBjaGVja1xuXHRcdH0gZWxzZSBpZiAoIGF1cCA9PT0gYnVwICkge1xuXHRcdFx0cmV0dXJuIHNpYmxpbmdDaGVjayggYSwgYiApO1xuXHRcdH1cblxuXHRcdC8vIE90aGVyd2lzZSB3ZSBuZWVkIGZ1bGwgbGlzdHMgb2YgdGhlaXIgYW5jZXN0b3JzIGZvciBjb21wYXJpc29uXG5cdFx0Y3VyID0gYTtcblx0XHR3aGlsZSAoICggY3VyID0gY3VyLnBhcmVudE5vZGUgKSApIHtcblx0XHRcdGFwLnVuc2hpZnQoIGN1ciApO1xuXHRcdH1cblx0XHRjdXIgPSBiO1xuXHRcdHdoaWxlICggKCBjdXIgPSBjdXIucGFyZW50Tm9kZSApICkge1xuXHRcdFx0YnAudW5zaGlmdCggY3VyICk7XG5cdFx0fVxuXG5cdFx0Ly8gV2FsayBkb3duIHRoZSB0cmVlIGxvb2tpbmcgZm9yIGEgZGlzY3JlcGFuY3lcblx0XHR3aGlsZSAoIGFwWyBpIF0gPT09IGJwWyBpIF0gKSB7XG5cdFx0XHRpKys7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGkgP1xuXG5cdFx0XHQvLyBEbyBhIHNpYmxpbmcgY2hlY2sgaWYgdGhlIG5vZGVzIGhhdmUgYSBjb21tb24gYW5jZXN0b3Jcblx0XHRcdHNpYmxpbmdDaGVjayggYXBbIGkgXSwgYnBbIGkgXSApIDpcblxuXHRcdFx0Ly8gT3RoZXJ3aXNlIG5vZGVzIGluIG91ciBkb2N1bWVudCBzb3J0IGZpcnN0XG5cdFx0XHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTcgLSAxOCtcblx0XHRcdC8vIElFL0VkZ2Ugc29tZXRpbWVzIHRocm93IGEgXCJQZXJtaXNzaW9uIGRlbmllZFwiIGVycm9yIHdoZW4gc3RyaWN0LWNvbXBhcmluZ1xuXHRcdFx0Ly8gdHdvIGRvY3VtZW50czsgc2hhbGxvdyBjb21wYXJpc29ucyB3b3JrLlxuXHRcdFx0LyogZXNsaW50LWRpc2FibGUgZXFlcWVxICovXG5cdFx0XHRhcFsgaSBdID09IHByZWZlcnJlZERvYyA/IC0xIDpcblx0XHRcdGJwWyBpIF0gPT0gcHJlZmVycmVkRG9jID8gMSA6XG5cdFx0XHQvKiBlc2xpbnQtZW5hYmxlIGVxZXFlcSAqL1xuXHRcdFx0MDtcblx0fTtcblxuXHRyZXR1cm4gZG9jdW1lbnQ7XG59O1xuXG5TaXp6bGUubWF0Y2hlcyA9IGZ1bmN0aW9uKCBleHByLCBlbGVtZW50cyApIHtcblx0cmV0dXJuIFNpenpsZSggZXhwciwgbnVsbCwgbnVsbCwgZWxlbWVudHMgKTtcbn07XG5cblNpenpsZS5tYXRjaGVzU2VsZWN0b3IgPSBmdW5jdGlvbiggZWxlbSwgZXhwciApIHtcblx0c2V0RG9jdW1lbnQoIGVsZW0gKTtcblxuXHRpZiAoIHN1cHBvcnQubWF0Y2hlc1NlbGVjdG9yICYmIGRvY3VtZW50SXNIVE1MICYmXG5cdFx0IW5vbm5hdGl2ZVNlbGVjdG9yQ2FjaGVbIGV4cHIgKyBcIiBcIiBdICYmXG5cdFx0KCAhcmJ1Z2d5TWF0Y2hlcyB8fCAhcmJ1Z2d5TWF0Y2hlcy50ZXN0KCBleHByICkgKSAmJlxuXHRcdCggIXJidWdneVFTQSAgICAgfHwgIXJidWdneVFTQS50ZXN0KCBleHByICkgKSApIHtcblxuXHRcdHRyeSB7XG5cdFx0XHR2YXIgcmV0ID0gbWF0Y2hlcy5jYWxsKCBlbGVtLCBleHByICk7XG5cblx0XHRcdC8vIElFIDkncyBtYXRjaGVzU2VsZWN0b3IgcmV0dXJucyBmYWxzZSBvbiBkaXNjb25uZWN0ZWQgbm9kZXNcblx0XHRcdGlmICggcmV0IHx8IHN1cHBvcnQuZGlzY29ubmVjdGVkTWF0Y2ggfHxcblxuXHRcdFx0XHQvLyBBcyB3ZWxsLCBkaXNjb25uZWN0ZWQgbm9kZXMgYXJlIHNhaWQgdG8gYmUgaW4gYSBkb2N1bWVudFxuXHRcdFx0XHQvLyBmcmFnbWVudCBpbiBJRSA5XG5cdFx0XHRcdGVsZW0uZG9jdW1lbnQgJiYgZWxlbS5kb2N1bWVudC5ub2RlVHlwZSAhPT0gMTEgKSB7XG5cdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0XHRub25uYXRpdmVTZWxlY3RvckNhY2hlKCBleHByLCB0cnVlICk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIFNpenpsZSggZXhwciwgZG9jdW1lbnQsIG51bGwsIFsgZWxlbSBdICkubGVuZ3RoID4gMDtcbn07XG5cblNpenpsZS5jb250YWlucyA9IGZ1bmN0aW9uKCBjb250ZXh0LCBlbGVtICkge1xuXG5cdC8vIFNldCBkb2N1bWVudCB2YXJzIGlmIG5lZWRlZFxuXHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTcgLSAxOCtcblx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdC8vIHR3byBkb2N1bWVudHM7IHNoYWxsb3cgY29tcGFyaXNvbnMgd29yay5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXHRpZiAoICggY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgKSAhPSBkb2N1bWVudCApIHtcblx0XHRzZXREb2N1bWVudCggY29udGV4dCApO1xuXHR9XG5cdHJldHVybiBjb250YWlucyggY29udGV4dCwgZWxlbSApO1xufTtcblxuU2l6emxlLmF0dHIgPSBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcblxuXHQvLyBTZXQgZG9jdW1lbnQgdmFycyBpZiBuZWVkZWRcblx0Ly8gU3VwcG9ydDogSUUgMTErLCBFZGdlIDE3IC0gMTgrXG5cdC8vIElFL0VkZ2Ugc29tZXRpbWVzIHRocm93IGEgXCJQZXJtaXNzaW9uIGRlbmllZFwiIGVycm9yIHdoZW4gc3RyaWN0LWNvbXBhcmluZ1xuXHQvLyB0d28gZG9jdW1lbnRzOyBzaGFsbG93IGNvbXBhcmlzb25zIHdvcmsuXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcblx0aWYgKCAoIGVsZW0ub3duZXJEb2N1bWVudCB8fCBlbGVtICkgIT0gZG9jdW1lbnQgKSB7XG5cdFx0c2V0RG9jdW1lbnQoIGVsZW0gKTtcblx0fVxuXG5cdHZhciBmbiA9IEV4cHIuYXR0ckhhbmRsZVsgbmFtZS50b0xvd2VyQ2FzZSgpIF0sXG5cblx0XHQvLyBEb24ndCBnZXQgZm9vbGVkIGJ5IE9iamVjdC5wcm90b3R5cGUgcHJvcGVydGllcyAoalF1ZXJ5ICMxMzgwNylcblx0XHR2YWwgPSBmbiAmJiBoYXNPd24uY2FsbCggRXhwci5hdHRySGFuZGxlLCBuYW1lLnRvTG93ZXJDYXNlKCkgKSA/XG5cdFx0XHRmbiggZWxlbSwgbmFtZSwgIWRvY3VtZW50SXNIVE1MICkgOlxuXHRcdFx0dW5kZWZpbmVkO1xuXG5cdHJldHVybiB2YWwgIT09IHVuZGVmaW5lZCA/XG5cdFx0dmFsIDpcblx0XHRzdXBwb3J0LmF0dHJpYnV0ZXMgfHwgIWRvY3VtZW50SXNIVE1MID9cblx0XHRcdGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lICkgOlxuXHRcdFx0KCB2YWwgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIG5hbWUgKSApICYmIHZhbC5zcGVjaWZpZWQgP1xuXHRcdFx0XHR2YWwudmFsdWUgOlxuXHRcdFx0XHRudWxsO1xufTtcblxuU2l6emxlLmVzY2FwZSA9IGZ1bmN0aW9uKCBzZWwgKSB7XG5cdHJldHVybiAoIHNlbCArIFwiXCIgKS5yZXBsYWNlKCByY3NzZXNjYXBlLCBmY3NzZXNjYXBlICk7XG59O1xuXG5TaXp6bGUuZXJyb3IgPSBmdW5jdGlvbiggbXNnICkge1xuXHR0aHJvdyBuZXcgRXJyb3IoIFwiU3ludGF4IGVycm9yLCB1bnJlY29nbml6ZWQgZXhwcmVzc2lvbjogXCIgKyBtc2cgKTtcbn07XG5cbi8qKlxuICogRG9jdW1lbnQgc29ydGluZyBhbmQgcmVtb3ZpbmcgZHVwbGljYXRlc1xuICogQHBhcmFtIHtBcnJheUxpa2V9IHJlc3VsdHNcbiAqL1xuU2l6emxlLnVuaXF1ZVNvcnQgPSBmdW5jdGlvbiggcmVzdWx0cyApIHtcblx0dmFyIGVsZW0sXG5cdFx0ZHVwbGljYXRlcyA9IFtdLFxuXHRcdGogPSAwLFxuXHRcdGkgPSAwO1xuXG5cdC8vIFVubGVzcyB3ZSAqa25vdyogd2UgY2FuIGRldGVjdCBkdXBsaWNhdGVzLCBhc3N1bWUgdGhlaXIgcHJlc2VuY2Vcblx0aGFzRHVwbGljYXRlID0gIXN1cHBvcnQuZGV0ZWN0RHVwbGljYXRlcztcblx0c29ydElucHV0ID0gIXN1cHBvcnQuc29ydFN0YWJsZSAmJiByZXN1bHRzLnNsaWNlKCAwICk7XG5cdHJlc3VsdHMuc29ydCggc29ydE9yZGVyICk7XG5cblx0aWYgKCBoYXNEdXBsaWNhdGUgKSB7XG5cdFx0d2hpbGUgKCAoIGVsZW0gPSByZXN1bHRzWyBpKysgXSApICkge1xuXHRcdFx0aWYgKCBlbGVtID09PSByZXN1bHRzWyBpIF0gKSB7XG5cdFx0XHRcdGogPSBkdXBsaWNhdGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0d2hpbGUgKCBqLS0gKSB7XG5cdFx0XHRyZXN1bHRzLnNwbGljZSggZHVwbGljYXRlc1sgaiBdLCAxICk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ2xlYXIgaW5wdXQgYWZ0ZXIgc29ydGluZyB0byByZWxlYXNlIG9iamVjdHNcblx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvc2l6emxlL3B1bGwvMjI1XG5cdHNvcnRJbnB1dCA9IG51bGw7XG5cblx0cmV0dXJuIHJlc3VsdHM7XG59O1xuXG4vKipcbiAqIFV0aWxpdHkgZnVuY3Rpb24gZm9yIHJldHJpZXZpbmcgdGhlIHRleHQgdmFsdWUgb2YgYW4gYXJyYXkgb2YgRE9NIG5vZGVzXG4gKiBAcGFyYW0ge0FycmF5fEVsZW1lbnR9IGVsZW1cbiAqL1xuZ2V0VGV4dCA9IFNpenpsZS5nZXRUZXh0ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdHZhciBub2RlLFxuXHRcdHJldCA9IFwiXCIsXG5cdFx0aSA9IDAsXG5cdFx0bm9kZVR5cGUgPSBlbGVtLm5vZGVUeXBlO1xuXG5cdGlmICggIW5vZGVUeXBlICkge1xuXG5cdFx0Ly8gSWYgbm8gbm9kZVR5cGUsIHRoaXMgaXMgZXhwZWN0ZWQgdG8gYmUgYW4gYXJyYXlcblx0XHR3aGlsZSAoICggbm9kZSA9IGVsZW1bIGkrKyBdICkgKSB7XG5cblx0XHRcdC8vIERvIG5vdCB0cmF2ZXJzZSBjb21tZW50IG5vZGVzXG5cdFx0XHRyZXQgKz0gZ2V0VGV4dCggbm9kZSApO1xuXHRcdH1cblx0fSBlbHNlIGlmICggbm9kZVR5cGUgPT09IDEgfHwgbm9kZVR5cGUgPT09IDkgfHwgbm9kZVR5cGUgPT09IDExICkge1xuXG5cdFx0Ly8gVXNlIHRleHRDb250ZW50IGZvciBlbGVtZW50c1xuXHRcdC8vIGlubmVyVGV4dCB1c2FnZSByZW1vdmVkIGZvciBjb25zaXN0ZW5jeSBvZiBuZXcgbGluZXMgKGpRdWVyeSAjMTExNTMpXG5cdFx0aWYgKCB0eXBlb2YgZWxlbS50ZXh0Q29udGVudCA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiBlbGVtLnRleHRDb250ZW50O1xuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIFRyYXZlcnNlIGl0cyBjaGlsZHJlblxuXHRcdFx0Zm9yICggZWxlbSA9IGVsZW0uZmlyc3RDaGlsZDsgZWxlbTsgZWxlbSA9IGVsZW0ubmV4dFNpYmxpbmcgKSB7XG5cdFx0XHRcdHJldCArPSBnZXRUZXh0KCBlbGVtICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2UgaWYgKCBub2RlVHlwZSA9PT0gMyB8fCBub2RlVHlwZSA9PT0gNCApIHtcblx0XHRyZXR1cm4gZWxlbS5ub2RlVmFsdWU7XG5cdH1cblxuXHQvLyBEbyBub3QgaW5jbHVkZSBjb21tZW50IG9yIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24gbm9kZXNcblxuXHRyZXR1cm4gcmV0O1xufTtcblxuRXhwciA9IFNpenpsZS5zZWxlY3RvcnMgPSB7XG5cblx0Ly8gQ2FuIGJlIGFkanVzdGVkIGJ5IHRoZSB1c2VyXG5cdGNhY2hlTGVuZ3RoOiA1MCxcblxuXHRjcmVhdGVQc2V1ZG86IG1hcmtGdW5jdGlvbixcblxuXHRtYXRjaDogbWF0Y2hFeHByLFxuXG5cdGF0dHJIYW5kbGU6IHt9LFxuXG5cdGZpbmQ6IHt9LFxuXG5cdHJlbGF0aXZlOiB7XG5cdFx0XCI+XCI6IHsgZGlyOiBcInBhcmVudE5vZGVcIiwgZmlyc3Q6IHRydWUgfSxcblx0XHRcIiBcIjogeyBkaXI6IFwicGFyZW50Tm9kZVwiIH0sXG5cdFx0XCIrXCI6IHsgZGlyOiBcInByZXZpb3VzU2libGluZ1wiLCBmaXJzdDogdHJ1ZSB9LFxuXHRcdFwiflwiOiB7IGRpcjogXCJwcmV2aW91c1NpYmxpbmdcIiB9XG5cdH0sXG5cblx0cHJlRmlsdGVyOiB7XG5cdFx0XCJBVFRSXCI6IGZ1bmN0aW9uKCBtYXRjaCApIHtcblx0XHRcdG1hdGNoWyAxIF0gPSBtYXRjaFsgMSBdLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cblx0XHRcdC8vIE1vdmUgdGhlIGdpdmVuIHZhbHVlIHRvIG1hdGNoWzNdIHdoZXRoZXIgcXVvdGVkIG9yIHVucXVvdGVkXG5cdFx0XHRtYXRjaFsgMyBdID0gKCBtYXRjaFsgMyBdIHx8IG1hdGNoWyA0IF0gfHxcblx0XHRcdFx0bWF0Y2hbIDUgXSB8fCBcIlwiICkucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblxuXHRcdFx0aWYgKCBtYXRjaFsgMiBdID09PSBcIn49XCIgKSB7XG5cdFx0XHRcdG1hdGNoWyAzIF0gPSBcIiBcIiArIG1hdGNoWyAzIF0gKyBcIiBcIjtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG1hdGNoLnNsaWNlKCAwLCA0ICk7XG5cdFx0fSxcblxuXHRcdFwiQ0hJTERcIjogZnVuY3Rpb24oIG1hdGNoICkge1xuXG5cdFx0XHQvKiBtYXRjaGVzIGZyb20gbWF0Y2hFeHByW1wiQ0hJTERcIl1cblx0XHRcdFx0MSB0eXBlIChvbmx5fG50aHwuLi4pXG5cdFx0XHRcdDIgd2hhdCAoY2hpbGR8b2YtdHlwZSlcblx0XHRcdFx0MyBhcmd1bWVudCAoZXZlbnxvZGR8XFxkKnxcXGQqbihbKy1dXFxkKyk/fC4uLilcblx0XHRcdFx0NCB4bi1jb21wb25lbnQgb2YgeG4reSBhcmd1bWVudCAoWystXT9cXGQqbnwpXG5cdFx0XHRcdDUgc2lnbiBvZiB4bi1jb21wb25lbnRcblx0XHRcdFx0NiB4IG9mIHhuLWNvbXBvbmVudFxuXHRcdFx0XHQ3IHNpZ24gb2YgeS1jb21wb25lbnRcblx0XHRcdFx0OCB5IG9mIHktY29tcG9uZW50XG5cdFx0XHQqL1xuXHRcdFx0bWF0Y2hbIDEgXSA9IG1hdGNoWyAxIF0udG9Mb3dlckNhc2UoKTtcblxuXHRcdFx0aWYgKCBtYXRjaFsgMSBdLnNsaWNlKCAwLCAzICkgPT09IFwibnRoXCIgKSB7XG5cblx0XHRcdFx0Ly8gbnRoLSogcmVxdWlyZXMgYXJndW1lbnRcblx0XHRcdFx0aWYgKCAhbWF0Y2hbIDMgXSApIHtcblx0XHRcdFx0XHRTaXp6bGUuZXJyb3IoIG1hdGNoWyAwIF0gKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIG51bWVyaWMgeCBhbmQgeSBwYXJhbWV0ZXJzIGZvciBFeHByLmZpbHRlci5DSElMRFxuXHRcdFx0XHQvLyByZW1lbWJlciB0aGF0IGZhbHNlL3RydWUgY2FzdCByZXNwZWN0aXZlbHkgdG8gMC8xXG5cdFx0XHRcdG1hdGNoWyA0IF0gPSArKCBtYXRjaFsgNCBdID9cblx0XHRcdFx0XHRtYXRjaFsgNSBdICsgKCBtYXRjaFsgNiBdIHx8IDEgKSA6XG5cdFx0XHRcdFx0MiAqICggbWF0Y2hbIDMgXSA9PT0gXCJldmVuXCIgfHwgbWF0Y2hbIDMgXSA9PT0gXCJvZGRcIiApICk7XG5cdFx0XHRcdG1hdGNoWyA1IF0gPSArKCAoIG1hdGNoWyA3IF0gKyBtYXRjaFsgOCBdICkgfHwgbWF0Y2hbIDMgXSA9PT0gXCJvZGRcIiApO1xuXG5cdFx0XHRcdC8vIG90aGVyIHR5cGVzIHByb2hpYml0IGFyZ3VtZW50c1xuXHRcdFx0fSBlbHNlIGlmICggbWF0Y2hbIDMgXSApIHtcblx0XHRcdFx0U2l6emxlLmVycm9yKCBtYXRjaFsgMCBdICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBtYXRjaDtcblx0XHR9LFxuXG5cdFx0XCJQU0VVRE9cIjogZnVuY3Rpb24oIG1hdGNoICkge1xuXHRcdFx0dmFyIGV4Y2Vzcyxcblx0XHRcdFx0dW5xdW90ZWQgPSAhbWF0Y2hbIDYgXSAmJiBtYXRjaFsgMiBdO1xuXG5cdFx0XHRpZiAoIG1hdGNoRXhwclsgXCJDSElMRFwiIF0udGVzdCggbWF0Y2hbIDAgXSApICkge1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWNjZXB0IHF1b3RlZCBhcmd1bWVudHMgYXMtaXNcblx0XHRcdGlmICggbWF0Y2hbIDMgXSApIHtcblx0XHRcdFx0bWF0Y2hbIDIgXSA9IG1hdGNoWyA0IF0gfHwgbWF0Y2hbIDUgXSB8fCBcIlwiO1xuXG5cdFx0XHQvLyBTdHJpcCBleGNlc3MgY2hhcmFjdGVycyBmcm9tIHVucXVvdGVkIGFyZ3VtZW50c1xuXHRcdFx0fSBlbHNlIGlmICggdW5xdW90ZWQgJiYgcnBzZXVkby50ZXN0KCB1bnF1b3RlZCApICYmXG5cblx0XHRcdFx0Ly8gR2V0IGV4Y2VzcyBmcm9tIHRva2VuaXplIChyZWN1cnNpdmVseSlcblx0XHRcdFx0KCBleGNlc3MgPSB0b2tlbml6ZSggdW5xdW90ZWQsIHRydWUgKSApICYmXG5cblx0XHRcdFx0Ly8gYWR2YW5jZSB0byB0aGUgbmV4dCBjbG9zaW5nIHBhcmVudGhlc2lzXG5cdFx0XHRcdCggZXhjZXNzID0gdW5xdW90ZWQuaW5kZXhPZiggXCIpXCIsIHVucXVvdGVkLmxlbmd0aCAtIGV4Y2VzcyApIC0gdW5xdW90ZWQubGVuZ3RoICkgKSB7XG5cblx0XHRcdFx0Ly8gZXhjZXNzIGlzIGEgbmVnYXRpdmUgaW5kZXhcblx0XHRcdFx0bWF0Y2hbIDAgXSA9IG1hdGNoWyAwIF0uc2xpY2UoIDAsIGV4Y2VzcyApO1xuXHRcdFx0XHRtYXRjaFsgMiBdID0gdW5xdW90ZWQuc2xpY2UoIDAsIGV4Y2VzcyApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZXR1cm4gb25seSBjYXB0dXJlcyBuZWVkZWQgYnkgdGhlIHBzZXVkbyBmaWx0ZXIgbWV0aG9kICh0eXBlIGFuZCBhcmd1bWVudClcblx0XHRcdHJldHVybiBtYXRjaC5zbGljZSggMCwgMyApO1xuXHRcdH1cblx0fSxcblxuXHRmaWx0ZXI6IHtcblxuXHRcdFwiVEFHXCI6IGZ1bmN0aW9uKCBub2RlTmFtZVNlbGVjdG9yICkge1xuXHRcdFx0dmFyIG5vZGVOYW1lID0gbm9kZU5hbWVTZWxlY3Rvci5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyZXR1cm4gbm9kZU5hbWVTZWxlY3RvciA9PT0gXCIqXCIgP1xuXHRcdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSA6XG5cdFx0XHRcdGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRcdHJldHVybiBlbGVtLm5vZGVOYW1lICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbm9kZU5hbWU7XG5cdFx0XHRcdH07XG5cdFx0fSxcblxuXHRcdFwiQ0xBU1NcIjogZnVuY3Rpb24oIGNsYXNzTmFtZSApIHtcblx0XHRcdHZhciBwYXR0ZXJuID0gY2xhc3NDYWNoZVsgY2xhc3NOYW1lICsgXCIgXCIgXTtcblxuXHRcdFx0cmV0dXJuIHBhdHRlcm4gfHxcblx0XHRcdFx0KCBwYXR0ZXJuID0gbmV3IFJlZ0V4cCggXCIoXnxcIiArIHdoaXRlc3BhY2UgK1xuXHRcdFx0XHRcdFwiKVwiICsgY2xhc3NOYW1lICsgXCIoXCIgKyB3aGl0ZXNwYWNlICsgXCJ8JClcIiApICkgJiYgY2xhc3NDYWNoZShcblx0XHRcdFx0XHRcdGNsYXNzTmFtZSwgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBwYXR0ZXJuLnRlc3QoXG5cdFx0XHRcdFx0XHRcdFx0dHlwZW9mIGVsZW0uY2xhc3NOYW1lID09PSBcInN0cmluZ1wiICYmIGVsZW0uY2xhc3NOYW1lIHx8XG5cdFx0XHRcdFx0XHRcdFx0dHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlICE9PSBcInVuZGVmaW5lZFwiICYmXG5cdFx0XHRcdFx0XHRcdFx0XHRlbGVtLmdldEF0dHJpYnV0ZSggXCJjbGFzc1wiICkgfHxcblx0XHRcdFx0XHRcdFx0XHRcIlwiXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0gKTtcblx0XHR9LFxuXG5cdFx0XCJBVFRSXCI6IGZ1bmN0aW9uKCBuYW1lLCBvcGVyYXRvciwgY2hlY2sgKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBTaXp6bGUuYXR0ciggZWxlbSwgbmFtZSApO1xuXG5cdFx0XHRcdGlmICggcmVzdWx0ID09IG51bGwgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9wZXJhdG9yID09PSBcIiE9XCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCAhb3BlcmF0b3IgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXN1bHQgKz0gXCJcIjtcblxuXHRcdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5cblx0XHRcdFx0cmV0dXJuIG9wZXJhdG9yID09PSBcIj1cIiA/IHJlc3VsdCA9PT0gY2hlY2sgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIiE9XCIgPyByZXN1bHQgIT09IGNoZWNrIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCJePVwiID8gY2hlY2sgJiYgcmVzdWx0LmluZGV4T2YoIGNoZWNrICkgPT09IDAgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIio9XCIgPyBjaGVjayAmJiByZXN1bHQuaW5kZXhPZiggY2hlY2sgKSA+IC0xIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCIkPVwiID8gY2hlY2sgJiYgcmVzdWx0LnNsaWNlKCAtY2hlY2subGVuZ3RoICkgPT09IGNoZWNrIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCJ+PVwiID8gKCBcIiBcIiArIHJlc3VsdC5yZXBsYWNlKCByd2hpdGVzcGFjZSwgXCIgXCIgKSArIFwiIFwiICkuaW5kZXhPZiggY2hlY2sgKSA+IC0xIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCJ8PVwiID8gcmVzdWx0ID09PSBjaGVjayB8fCByZXN1bHQuc2xpY2UoIDAsIGNoZWNrLmxlbmd0aCArIDEgKSA9PT0gY2hlY2sgKyBcIi1cIiA6XG5cdFx0XHRcdFx0ZmFsc2U7XG5cdFx0XHRcdC8qIGVzbGludC1lbmFibGUgbWF4LWxlbiAqL1xuXG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRcIkNISUxEXCI6IGZ1bmN0aW9uKCB0eXBlLCB3aGF0LCBfYXJndW1lbnQsIGZpcnN0LCBsYXN0ICkge1xuXHRcdFx0dmFyIHNpbXBsZSA9IHR5cGUuc2xpY2UoIDAsIDMgKSAhPT0gXCJudGhcIixcblx0XHRcdFx0Zm9yd2FyZCA9IHR5cGUuc2xpY2UoIC00ICkgIT09IFwibGFzdFwiLFxuXHRcdFx0XHRvZlR5cGUgPSB3aGF0ID09PSBcIm9mLXR5cGVcIjtcblxuXHRcdFx0cmV0dXJuIGZpcnN0ID09PSAxICYmIGxhc3QgPT09IDAgP1xuXG5cdFx0XHRcdC8vIFNob3J0Y3V0IGZvciA6bnRoLSoobilcblx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdFx0cmV0dXJuICEhZWxlbS5wYXJlbnROb2RlO1xuXHRcdFx0XHR9IDpcblxuXHRcdFx0XHRmdW5jdGlvbiggZWxlbSwgX2NvbnRleHQsIHhtbCApIHtcblx0XHRcdFx0XHR2YXIgY2FjaGUsIHVuaXF1ZUNhY2hlLCBvdXRlckNhY2hlLCBub2RlLCBub2RlSW5kZXgsIHN0YXJ0LFxuXHRcdFx0XHRcdFx0ZGlyID0gc2ltcGxlICE9PSBmb3J3YXJkID8gXCJuZXh0U2libGluZ1wiIDogXCJwcmV2aW91c1NpYmxpbmdcIixcblx0XHRcdFx0XHRcdHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZSxcblx0XHRcdFx0XHRcdG5hbWUgPSBvZlR5cGUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpLFxuXHRcdFx0XHRcdFx0dXNlQ2FjaGUgPSAheG1sICYmICFvZlR5cGUsXG5cdFx0XHRcdFx0XHRkaWZmID0gZmFsc2U7XG5cblx0XHRcdFx0XHRpZiAoIHBhcmVudCApIHtcblxuXHRcdFx0XHRcdFx0Ly8gOihmaXJzdHxsYXN0fG9ubHkpLShjaGlsZHxvZi10eXBlKVxuXHRcdFx0XHRcdFx0aWYgKCBzaW1wbGUgKSB7XG5cdFx0XHRcdFx0XHRcdHdoaWxlICggZGlyICkge1xuXHRcdFx0XHRcdFx0XHRcdG5vZGUgPSBlbGVtO1xuXHRcdFx0XHRcdFx0XHRcdHdoaWxlICggKCBub2RlID0gbm9kZVsgZGlyIF0gKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICggb2ZUeXBlID9cblx0XHRcdFx0XHRcdFx0XHRcdFx0bm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lIDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0bm9kZS5ub2RlVHlwZSA9PT0gMSApIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gUmV2ZXJzZSBkaXJlY3Rpb24gZm9yIDpvbmx5LSogKGlmIHdlIGhhdmVuJ3QgeWV0IGRvbmUgc28pXG5cdFx0XHRcdFx0XHRcdFx0c3RhcnQgPSBkaXIgPSB0eXBlID09PSBcIm9ubHlcIiAmJiAhc3RhcnQgJiYgXCJuZXh0U2libGluZ1wiO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRzdGFydCA9IFsgZm9yd2FyZCA/IHBhcmVudC5maXJzdENoaWxkIDogcGFyZW50Lmxhc3RDaGlsZCBdO1xuXG5cdFx0XHRcdFx0XHQvLyBub24teG1sIDpudGgtY2hpbGQoLi4uKSBzdG9yZXMgY2FjaGUgZGF0YSBvbiBgcGFyZW50YFxuXHRcdFx0XHRcdFx0aWYgKCBmb3J3YXJkICYmIHVzZUNhY2hlICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIFNlZWsgYGVsZW1gIGZyb20gYSBwcmV2aW91c2x5LWNhY2hlZCBpbmRleFxuXG5cdFx0XHRcdFx0XHRcdC8vIC4uLmluIGEgZ3ppcC1mcmllbmRseSB3YXlcblx0XHRcdFx0XHRcdFx0bm9kZSA9IHBhcmVudDtcblx0XHRcdFx0XHRcdFx0b3V0ZXJDYWNoZSA9IG5vZGVbIGV4cGFuZG8gXSB8fCAoIG5vZGVbIGV4cGFuZG8gXSA9IHt9ICk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPDkgb25seVxuXHRcdFx0XHRcdFx0XHQvLyBEZWZlbmQgYWdhaW5zdCBjbG9uZWQgYXR0cm9wZXJ0aWVzIChqUXVlcnkgZ2gtMTcwOSlcblx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGUgPSBvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gfHxcblx0XHRcdFx0XHRcdFx0XHQoIG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSA9IHt9ICk7XG5cblx0XHRcdFx0XHRcdFx0Y2FjaGUgPSB1bmlxdWVDYWNoZVsgdHlwZSBdIHx8IFtdO1xuXHRcdFx0XHRcdFx0XHRub2RlSW5kZXggPSBjYWNoZVsgMCBdID09PSBkaXJydW5zICYmIGNhY2hlWyAxIF07XG5cdFx0XHRcdFx0XHRcdGRpZmYgPSBub2RlSW5kZXggJiYgY2FjaGVbIDIgXTtcblx0XHRcdFx0XHRcdFx0bm9kZSA9IG5vZGVJbmRleCAmJiBwYXJlbnQuY2hpbGROb2Rlc1sgbm9kZUluZGV4IF07XG5cblx0XHRcdFx0XHRcdFx0d2hpbGUgKCAoIG5vZGUgPSArK25vZGVJbmRleCAmJiBub2RlICYmIG5vZGVbIGRpciBdIHx8XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBGYWxsYmFjayB0byBzZWVraW5nIGBlbGVtYCBmcm9tIHRoZSBzdGFydFxuXHRcdFx0XHRcdFx0XHRcdCggZGlmZiA9IG5vZGVJbmRleCA9IDAgKSB8fCBzdGFydC5wb3AoKSApICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gV2hlbiBmb3VuZCwgY2FjaGUgaW5kZXhlcyBvbiBgcGFyZW50YCBhbmQgYnJlYWtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIG5vZGUubm9kZVR5cGUgPT09IDEgJiYgKytkaWZmICYmIG5vZGUgPT09IGVsZW0gKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZVsgdHlwZSBdID0gWyBkaXJydW5zLCBub2RlSW5kZXgsIGRpZmYgXTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRcdC8vIFVzZSBwcmV2aW91c2x5LWNhY2hlZCBlbGVtZW50IGluZGV4IGlmIGF2YWlsYWJsZVxuXHRcdFx0XHRcdFx0XHRpZiAoIHVzZUNhY2hlICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gLi4uaW4gYSBnemlwLWZyaWVuZGx5IHdheVxuXHRcdFx0XHRcdFx0XHRcdG5vZGUgPSBlbGVtO1xuXHRcdFx0XHRcdFx0XHRcdG91dGVyQ2FjaGUgPSBub2RlWyBleHBhbmRvIF0gfHwgKCBub2RlWyBleHBhbmRvIF0gPSB7fSApO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPDkgb25seVxuXHRcdFx0XHRcdFx0XHRcdC8vIERlZmVuZCBhZ2FpbnN0IGNsb25lZCBhdHRyb3BlcnRpZXMgKGpRdWVyeSBnaC0xNzA5KVxuXHRcdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlID0gb3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHQoIG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSA9IHt9ICk7XG5cblx0XHRcdFx0XHRcdFx0XHRjYWNoZSA9IHVuaXF1ZUNhY2hlWyB0eXBlIF0gfHwgW107XG5cdFx0XHRcdFx0XHRcdFx0bm9kZUluZGV4ID0gY2FjaGVbIDAgXSA9PT0gZGlycnVucyAmJiBjYWNoZVsgMSBdO1xuXHRcdFx0XHRcdFx0XHRcdGRpZmYgPSBub2RlSW5kZXg7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQvLyB4bWwgOm50aC1jaGlsZCguLi4pXG5cdFx0XHRcdFx0XHRcdC8vIG9yIDpudGgtbGFzdC1jaGlsZCguLi4pIG9yIDpudGgoLWxhc3QpPy1vZi10eXBlKC4uLilcblx0XHRcdFx0XHRcdFx0aWYgKCBkaWZmID09PSBmYWxzZSApIHtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIFVzZSB0aGUgc2FtZSBsb29wIGFzIGFib3ZlIHRvIHNlZWsgYGVsZW1gIGZyb20gdGhlIHN0YXJ0XG5cdFx0XHRcdFx0XHRcdFx0d2hpbGUgKCAoIG5vZGUgPSArK25vZGVJbmRleCAmJiBub2RlICYmIG5vZGVbIGRpciBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHQoIGRpZmYgPSBub2RlSW5kZXggPSAwICkgfHwgc3RhcnQucG9wKCkgKSApIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCAoIG9mVHlwZSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZSA6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG5vZGUubm9kZVR5cGUgPT09IDEgKSAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQrK2RpZmYgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gQ2FjaGUgdGhlIGluZGV4IG9mIGVhY2ggZW5jb3VudGVyZWQgZWxlbWVudFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIHVzZUNhY2hlICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG91dGVyQ2FjaGUgPSBub2RlWyBleHBhbmRvIF0gfHxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCggbm9kZVsgZXhwYW5kbyBdID0ge30gKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw5IG9ubHlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBEZWZlbmQgYWdhaW5zdCBjbG9uZWQgYXR0cm9wZXJ0aWVzIChqUXVlcnkgZ2gtMTcwOSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZSA9IG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KCBvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gPSB7fSApO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGVbIHR5cGUgXSA9IFsgZGlycnVucywgZGlmZiBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBub2RlID09PSBlbGVtICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEluY29ycG9yYXRlIHRoZSBvZmZzZXQsIHRoZW4gY2hlY2sgYWdhaW5zdCBjeWNsZSBzaXplXG5cdFx0XHRcdFx0XHRkaWZmIC09IGxhc3Q7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZGlmZiA9PT0gZmlyc3QgfHwgKCBkaWZmICUgZmlyc3QgPT09IDAgJiYgZGlmZiAvIGZpcnN0ID49IDAgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0fSxcblxuXHRcdFwiUFNFVURPXCI6IGZ1bmN0aW9uKCBwc2V1ZG8sIGFyZ3VtZW50ICkge1xuXG5cdFx0XHQvLyBwc2V1ZG8tY2xhc3MgbmFtZXMgYXJlIGNhc2UtaW5zZW5zaXRpdmVcblx0XHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jcHNldWRvLWNsYXNzZXNcblx0XHRcdC8vIFByaW9yaXRpemUgYnkgY2FzZSBzZW5zaXRpdml0eSBpbiBjYXNlIGN1c3RvbSBwc2V1ZG9zIGFyZSBhZGRlZCB3aXRoIHVwcGVyY2FzZSBsZXR0ZXJzXG5cdFx0XHQvLyBSZW1lbWJlciB0aGF0IHNldEZpbHRlcnMgaW5oZXJpdHMgZnJvbSBwc2V1ZG9zXG5cdFx0XHR2YXIgYXJncyxcblx0XHRcdFx0Zm4gPSBFeHByLnBzZXVkb3NbIHBzZXVkbyBdIHx8IEV4cHIuc2V0RmlsdGVyc1sgcHNldWRvLnRvTG93ZXJDYXNlKCkgXSB8fFxuXHRcdFx0XHRcdFNpenpsZS5lcnJvciggXCJ1bnN1cHBvcnRlZCBwc2V1ZG86IFwiICsgcHNldWRvICk7XG5cblx0XHRcdC8vIFRoZSB1c2VyIG1heSB1c2UgY3JlYXRlUHNldWRvIHRvIGluZGljYXRlIHRoYXRcblx0XHRcdC8vIGFyZ3VtZW50cyBhcmUgbmVlZGVkIHRvIGNyZWF0ZSB0aGUgZmlsdGVyIGZ1bmN0aW9uXG5cdFx0XHQvLyBqdXN0IGFzIFNpenpsZSBkb2VzXG5cdFx0XHRpZiAoIGZuWyBleHBhbmRvIF0gKSB7XG5cdFx0XHRcdHJldHVybiBmbiggYXJndW1lbnQgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQnV0IG1haW50YWluIHN1cHBvcnQgZm9yIG9sZCBzaWduYXR1cmVzXG5cdFx0XHRpZiAoIGZuLmxlbmd0aCA+IDEgKSB7XG5cdFx0XHRcdGFyZ3MgPSBbIHBzZXVkbywgcHNldWRvLCBcIlwiLCBhcmd1bWVudCBdO1xuXHRcdFx0XHRyZXR1cm4gRXhwci5zZXRGaWx0ZXJzLmhhc093blByb3BlcnR5KCBwc2V1ZG8udG9Mb3dlckNhc2UoKSApID9cblx0XHRcdFx0XHRtYXJrRnVuY3Rpb24oIGZ1bmN0aW9uKCBzZWVkLCBtYXRjaGVzICkge1xuXHRcdFx0XHRcdFx0dmFyIGlkeCxcblx0XHRcdFx0XHRcdFx0bWF0Y2hlZCA9IGZuKCBzZWVkLCBhcmd1bWVudCApLFxuXHRcdFx0XHRcdFx0XHRpID0gbWF0Y2hlZC5sZW5ndGg7XG5cdFx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdFx0aWR4ID0gaW5kZXhPZiggc2VlZCwgbWF0Y2hlZFsgaSBdICk7XG5cdFx0XHRcdFx0XHRcdHNlZWRbIGlkeCBdID0gISggbWF0Y2hlc1sgaWR4IF0gPSBtYXRjaGVkWyBpIF0gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9ICkgOlxuXHRcdFx0XHRcdGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuKCBlbGVtLCAwLCBhcmdzICk7XG5cdFx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZuO1xuXHRcdH1cblx0fSxcblxuXHRwc2V1ZG9zOiB7XG5cblx0XHQvLyBQb3RlbnRpYWxseSBjb21wbGV4IHBzZXVkb3Ncblx0XHRcIm5vdFwiOiBtYXJrRnVuY3Rpb24oIGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblxuXHRcdFx0Ly8gVHJpbSB0aGUgc2VsZWN0b3IgcGFzc2VkIHRvIGNvbXBpbGVcblx0XHRcdC8vIHRvIGF2b2lkIHRyZWF0aW5nIGxlYWRpbmcgYW5kIHRyYWlsaW5nXG5cdFx0XHQvLyBzcGFjZXMgYXMgY29tYmluYXRvcnNcblx0XHRcdHZhciBpbnB1dCA9IFtdLFxuXHRcdFx0XHRyZXN1bHRzID0gW10sXG5cdFx0XHRcdG1hdGNoZXIgPSBjb21waWxlKCBzZWxlY3Rvci5yZXBsYWNlKCBydHJpbSwgXCIkMVwiICkgKTtcblxuXHRcdFx0cmV0dXJuIG1hdGNoZXJbIGV4cGFuZG8gXSA/XG5cdFx0XHRcdG1hcmtGdW5jdGlvbiggZnVuY3Rpb24oIHNlZWQsIG1hdGNoZXMsIF9jb250ZXh0LCB4bWwgKSB7XG5cdFx0XHRcdFx0dmFyIGVsZW0sXG5cdFx0XHRcdFx0XHR1bm1hdGNoZWQgPSBtYXRjaGVyKCBzZWVkLCBudWxsLCB4bWwsIFtdICksXG5cdFx0XHRcdFx0XHRpID0gc2VlZC5sZW5ndGg7XG5cblx0XHRcdFx0XHQvLyBNYXRjaCBlbGVtZW50cyB1bm1hdGNoZWQgYnkgYG1hdGNoZXJgXG5cdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRpZiAoICggZWxlbSA9IHVubWF0Y2hlZFsgaSBdICkgKSB7XG5cdFx0XHRcdFx0XHRcdHNlZWRbIGkgXSA9ICEoIG1hdGNoZXNbIGkgXSA9IGVsZW0gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKSA6XG5cdFx0XHRcdGZ1bmN0aW9uKCBlbGVtLCBfY29udGV4dCwgeG1sICkge1xuXHRcdFx0XHRcdGlucHV0WyAwIF0gPSBlbGVtO1xuXHRcdFx0XHRcdG1hdGNoZXIoIGlucHV0LCBudWxsLCB4bWwsIHJlc3VsdHMgKTtcblxuXHRcdFx0XHRcdC8vIERvbid0IGtlZXAgdGhlIGVsZW1lbnQgKGlzc3VlICMyOTkpXG5cdFx0XHRcdFx0aW5wdXRbIDAgXSA9IG51bGw7XG5cdFx0XHRcdFx0cmV0dXJuICFyZXN1bHRzLnBvcCgpO1xuXHRcdFx0XHR9O1xuXHRcdH0gKSxcblxuXHRcdFwiaGFzXCI6IG1hcmtGdW5jdGlvbiggZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gU2l6emxlKCBzZWxlY3RvciwgZWxlbSApLmxlbmd0aCA+IDA7XG5cdFx0XHR9O1xuXHRcdH0gKSxcblxuXHRcdFwiY29udGFpbnNcIjogbWFya0Z1bmN0aW9uKCBmdW5jdGlvbiggdGV4dCApIHtcblx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHJldHVybiAoIGVsZW0udGV4dENvbnRlbnQgfHwgZ2V0VGV4dCggZWxlbSApICkuaW5kZXhPZiggdGV4dCApID4gLTE7XG5cdFx0XHR9O1xuXHRcdH0gKSxcblxuXHRcdC8vIFwiV2hldGhlciBhbiBlbGVtZW50IGlzIHJlcHJlc2VudGVkIGJ5IGEgOmxhbmcoKSBzZWxlY3RvclxuXHRcdC8vIGlzIGJhc2VkIHNvbGVseSBvbiB0aGUgZWxlbWVudCdzIGxhbmd1YWdlIHZhbHVlXG5cdFx0Ly8gYmVpbmcgZXF1YWwgdG8gdGhlIGlkZW50aWZpZXIgQyxcblx0XHQvLyBvciBiZWdpbm5pbmcgd2l0aCB0aGUgaWRlbnRpZmllciBDIGltbWVkaWF0ZWx5IGZvbGxvd2VkIGJ5IFwiLVwiLlxuXHRcdC8vIFRoZSBtYXRjaGluZyBvZiBDIGFnYWluc3QgdGhlIGVsZW1lbnQncyBsYW5ndWFnZSB2YWx1ZSBpcyBwZXJmb3JtZWQgY2FzZS1pbnNlbnNpdGl2ZWx5LlxuXHRcdC8vIFRoZSBpZGVudGlmaWVyIEMgZG9lcyBub3QgaGF2ZSB0byBiZSBhIHZhbGlkIGxhbmd1YWdlIG5hbWUuXCJcblx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI2xhbmctcHNldWRvXG5cdFx0XCJsYW5nXCI6IG1hcmtGdW5jdGlvbiggZnVuY3Rpb24oIGxhbmcgKSB7XG5cblx0XHRcdC8vIGxhbmcgdmFsdWUgbXVzdCBiZSBhIHZhbGlkIGlkZW50aWZpZXJcblx0XHRcdGlmICggIXJpZGVudGlmaWVyLnRlc3QoIGxhbmcgfHwgXCJcIiApICkge1xuXHRcdFx0XHRTaXp6bGUuZXJyb3IoIFwidW5zdXBwb3J0ZWQgbGFuZzogXCIgKyBsYW5nICk7XG5cdFx0XHR9XG5cdFx0XHRsYW5nID0gbGFuZy5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciBlbGVtTGFuZztcblx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdGlmICggKCBlbGVtTGFuZyA9IGRvY3VtZW50SXNIVE1MID9cblx0XHRcdFx0XHRcdGVsZW0ubGFuZyA6XG5cdFx0XHRcdFx0XHRlbGVtLmdldEF0dHJpYnV0ZSggXCJ4bWw6bGFuZ1wiICkgfHwgZWxlbS5nZXRBdHRyaWJ1dGUoIFwibGFuZ1wiICkgKSApIHtcblxuXHRcdFx0XHRcdFx0ZWxlbUxhbmcgPSBlbGVtTGFuZy50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW1MYW5nID09PSBsYW5nIHx8IGVsZW1MYW5nLmluZGV4T2YoIGxhbmcgKyBcIi1cIiApID09PSAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSB3aGlsZSAoICggZWxlbSA9IGVsZW0ucGFyZW50Tm9kZSApICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fTtcblx0XHR9ICksXG5cblx0XHQvLyBNaXNjZWxsYW5lb3VzXG5cdFx0XCJ0YXJnZXRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHR2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbiAmJiB3aW5kb3cubG9jYXRpb24uaGFzaDtcblx0XHRcdHJldHVybiBoYXNoICYmIGhhc2guc2xpY2UoIDEgKSA9PT0gZWxlbS5pZDtcblx0XHR9LFxuXG5cdFx0XCJyb290XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0gPT09IGRvY0VsZW07XG5cdFx0fSxcblxuXHRcdFwiZm9jdXNcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJlxuXHRcdFx0XHQoICFkb2N1bWVudC5oYXNGb2N1cyB8fCBkb2N1bWVudC5oYXNGb2N1cygpICkgJiZcblx0XHRcdFx0ISEoIGVsZW0udHlwZSB8fCBlbGVtLmhyZWYgfHwgfmVsZW0udGFiSW5kZXggKTtcblx0XHR9LFxuXG5cdFx0Ly8gQm9vbGVhbiBwcm9wZXJ0aWVzXG5cdFx0XCJlbmFibGVkXCI6IGNyZWF0ZURpc2FibGVkUHNldWRvKCBmYWxzZSApLFxuXHRcdFwiZGlzYWJsZWRcIjogY3JlYXRlRGlzYWJsZWRQc2V1ZG8oIHRydWUgKSxcblxuXHRcdFwiY2hlY2tlZFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdFx0Ly8gSW4gQ1NTMywgOmNoZWNrZWQgc2hvdWxkIHJldHVybiBib3RoIGNoZWNrZWQgYW5kIHNlbGVjdGVkIGVsZW1lbnRzXG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1JFQy1jc3MzLXNlbGVjdG9ycy0yMDExMDkyOS8jY2hlY2tlZFxuXHRcdFx0dmFyIG5vZGVOYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0cmV0dXJuICggbm9kZU5hbWUgPT09IFwiaW5wdXRcIiAmJiAhIWVsZW0uY2hlY2tlZCApIHx8XG5cdFx0XHRcdCggbm9kZU5hbWUgPT09IFwib3B0aW9uXCIgJiYgISFlbGVtLnNlbGVjdGVkICk7XG5cdFx0fSxcblxuXHRcdFwic2VsZWN0ZWRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHRcdC8vIEFjY2Vzc2luZyB0aGlzIHByb3BlcnR5IG1ha2VzIHNlbGVjdGVkLWJ5LWRlZmF1bHRcblx0XHRcdC8vIG9wdGlvbnMgaW4gU2FmYXJpIHdvcmsgcHJvcGVybHlcblx0XHRcdGlmICggZWxlbS5wYXJlbnROb2RlICkge1xuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG5cdFx0XHRcdGVsZW0ucGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZWxlbS5zZWxlY3RlZCA9PT0gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0Ly8gQ29udGVudHNcblx0XHRcImVtcHR5XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI2VtcHR5LXBzZXVkb1xuXHRcdFx0Ly8gOmVtcHR5IGlzIG5lZ2F0ZWQgYnkgZWxlbWVudCAoMSkgb3IgY29udGVudCBub2RlcyAodGV4dDogMzsgY2RhdGE6IDQ7IGVudGl0eSByZWY6IDUpLFxuXHRcdFx0Ly8gICBidXQgbm90IGJ5IG90aGVycyAoY29tbWVudDogODsgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbjogNzsgZXRjLilcblx0XHRcdC8vIG5vZGVUeXBlIDwgNiB3b3JrcyBiZWNhdXNlIGF0dHJpYnV0ZXMgKDIpIGRvIG5vdCBhcHBlYXIgYXMgY2hpbGRyZW5cblx0XHRcdGZvciAoIGVsZW0gPSBlbGVtLmZpcnN0Q2hpbGQ7IGVsZW07IGVsZW0gPSBlbGVtLm5leHRTaWJsaW5nICkge1xuXHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPCA2ICkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblxuXHRcdFwicGFyZW50XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuICFFeHByLnBzZXVkb3NbIFwiZW1wdHlcIiBdKCBlbGVtICk7XG5cdFx0fSxcblxuXHRcdC8vIEVsZW1lbnQvaW5wdXQgdHlwZXNcblx0XHRcImhlYWRlclwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiByaGVhZGVyLnRlc3QoIGVsZW0ubm9kZU5hbWUgKTtcblx0XHR9LFxuXG5cdFx0XCJpbnB1dFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiByaW5wdXRzLnRlc3QoIGVsZW0ubm9kZU5hbWUgKTtcblx0XHR9LFxuXG5cdFx0XCJidXR0b25cIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHR2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdHJldHVybiBuYW1lID09PSBcImlucHV0XCIgJiYgZWxlbS50eXBlID09PSBcImJ1dHRvblwiIHx8IG5hbWUgPT09IFwiYnV0dG9uXCI7XG5cdFx0fSxcblxuXHRcdFwidGV4dFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBhdHRyO1xuXHRcdFx0cmV0dXJuIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnB1dFwiICYmXG5cdFx0XHRcdGVsZW0udHlwZSA9PT0gXCJ0ZXh0XCIgJiZcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRTw4XG5cdFx0XHRcdC8vIE5ldyBIVE1MNSBhdHRyaWJ1dGUgdmFsdWVzIChlLmcuLCBcInNlYXJjaFwiKSBhcHBlYXIgd2l0aCBlbGVtLnR5cGUgPT09IFwidGV4dFwiXG5cdFx0XHRcdCggKCBhdHRyID0gZWxlbS5nZXRBdHRyaWJ1dGUoIFwidHlwZVwiICkgKSA9PSBudWxsIHx8XG5cdFx0XHRcdFx0YXR0ci50b0xvd2VyQ2FzZSgpID09PSBcInRleHRcIiApO1xuXHRcdH0sXG5cblx0XHQvLyBQb3NpdGlvbi1pbi1jb2xsZWN0aW9uXG5cdFx0XCJmaXJzdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKCBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBbIDAgXTtcblx0XHR9ICksXG5cblx0XHRcImxhc3RcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyggZnVuY3Rpb24oIF9tYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcblx0XHRcdHJldHVybiBbIGxlbmd0aCAtIDEgXTtcblx0XHR9ICksXG5cblx0XHRcImVxXCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oIGZ1bmN0aW9uKCBfbWF0Y2hJbmRleGVzLCBsZW5ndGgsIGFyZ3VtZW50ICkge1xuXHRcdFx0cmV0dXJuIFsgYXJndW1lbnQgPCAwID8gYXJndW1lbnQgKyBsZW5ndGggOiBhcmd1bWVudCBdO1xuXHRcdH0gKSxcblxuXHRcdFwiZXZlblwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKCBmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGggKSB7XG5cdFx0XHR2YXIgaSA9IDA7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkgKz0gMiApIHtcblx0XHRcdFx0bWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYXRjaEluZGV4ZXM7XG5cdFx0fSApLFxuXG5cdFx0XCJvZGRcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyggZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoICkge1xuXHRcdFx0dmFyIGkgPSAxO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpICs9IDIgKSB7XG5cdFx0XHRcdG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF0Y2hJbmRleGVzO1xuXHRcdH0gKSxcblxuXHRcdFwibHRcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyggZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoLCBhcmd1bWVudCApIHtcblx0XHRcdHZhciBpID0gYXJndW1lbnQgPCAwID9cblx0XHRcdFx0YXJndW1lbnQgKyBsZW5ndGggOlxuXHRcdFx0XHRhcmd1bWVudCA+IGxlbmd0aCA/XG5cdFx0XHRcdFx0bGVuZ3RoIDpcblx0XHRcdFx0XHRhcmd1bWVudDtcblx0XHRcdGZvciAoIDsgLS1pID49IDA7ICkge1xuXHRcdFx0XHRtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1hdGNoSW5kZXhlcztcblx0XHR9ICksXG5cblx0XHRcImd0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oIGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG5cdFx0XHR2YXIgaSA9IGFyZ3VtZW50IDwgMCA/IGFyZ3VtZW50ICsgbGVuZ3RoIDogYXJndW1lbnQ7XG5cdFx0XHRmb3IgKCA7ICsraSA8IGxlbmd0aDsgKSB7XG5cdFx0XHRcdG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF0Y2hJbmRleGVzO1xuXHRcdH0gKVxuXHR9XG59O1xuXG5FeHByLnBzZXVkb3NbIFwibnRoXCIgXSA9IEV4cHIucHNldWRvc1sgXCJlcVwiIF07XG5cbi8vIEFkZCBidXR0b24vaW5wdXQgdHlwZSBwc2V1ZG9zXG5mb3IgKCBpIGluIHsgcmFkaW86IHRydWUsIGNoZWNrYm94OiB0cnVlLCBmaWxlOiB0cnVlLCBwYXNzd29yZDogdHJ1ZSwgaW1hZ2U6IHRydWUgfSApIHtcblx0RXhwci5wc2V1ZG9zWyBpIF0gPSBjcmVhdGVJbnB1dFBzZXVkbyggaSApO1xufVxuZm9yICggaSBpbiB7IHN1Ym1pdDogdHJ1ZSwgcmVzZXQ6IHRydWUgfSApIHtcblx0RXhwci5wc2V1ZG9zWyBpIF0gPSBjcmVhdGVCdXR0b25Qc2V1ZG8oIGkgKTtcbn1cblxuLy8gRWFzeSBBUEkgZm9yIGNyZWF0aW5nIG5ldyBzZXRGaWx0ZXJzXG5mdW5jdGlvbiBzZXRGaWx0ZXJzKCkge31cbnNldEZpbHRlcnMucHJvdG90eXBlID0gRXhwci5maWx0ZXJzID0gRXhwci5wc2V1ZG9zO1xuRXhwci5zZXRGaWx0ZXJzID0gbmV3IHNldEZpbHRlcnMoKTtcblxudG9rZW5pemUgPSBTaXp6bGUudG9rZW5pemUgPSBmdW5jdGlvbiggc2VsZWN0b3IsIHBhcnNlT25seSApIHtcblx0dmFyIG1hdGNoZWQsIG1hdGNoLCB0b2tlbnMsIHR5cGUsXG5cdFx0c29GYXIsIGdyb3VwcywgcHJlRmlsdGVycyxcblx0XHRjYWNoZWQgPSB0b2tlbkNhY2hlWyBzZWxlY3RvciArIFwiIFwiIF07XG5cblx0aWYgKCBjYWNoZWQgKSB7XG5cdFx0cmV0dXJuIHBhcnNlT25seSA/IDAgOiBjYWNoZWQuc2xpY2UoIDAgKTtcblx0fVxuXG5cdHNvRmFyID0gc2VsZWN0b3I7XG5cdGdyb3VwcyA9IFtdO1xuXHRwcmVGaWx0ZXJzID0gRXhwci5wcmVGaWx0ZXI7XG5cblx0d2hpbGUgKCBzb0ZhciApIHtcblxuXHRcdC8vIENvbW1hIGFuZCBmaXJzdCBydW5cblx0XHRpZiAoICFtYXRjaGVkIHx8ICggbWF0Y2ggPSByY29tbWEuZXhlYyggc29GYXIgKSApICkge1xuXHRcdFx0aWYgKCBtYXRjaCApIHtcblxuXHRcdFx0XHQvLyBEb24ndCBjb25zdW1lIHRyYWlsaW5nIGNvbW1hcyBhcyB2YWxpZFxuXHRcdFx0XHRzb0ZhciA9IHNvRmFyLnNsaWNlKCBtYXRjaFsgMCBdLmxlbmd0aCApIHx8IHNvRmFyO1xuXHRcdFx0fVxuXHRcdFx0Z3JvdXBzLnB1c2goICggdG9rZW5zID0gW10gKSApO1xuXHRcdH1cblxuXHRcdG1hdGNoZWQgPSBmYWxzZTtcblxuXHRcdC8vIENvbWJpbmF0b3JzXG5cdFx0aWYgKCAoIG1hdGNoID0gcmNvbWJpbmF0b3JzLmV4ZWMoIHNvRmFyICkgKSApIHtcblx0XHRcdG1hdGNoZWQgPSBtYXRjaC5zaGlmdCgpO1xuXHRcdFx0dG9rZW5zLnB1c2goIHtcblx0XHRcdFx0dmFsdWU6IG1hdGNoZWQsXG5cblx0XHRcdFx0Ly8gQ2FzdCBkZXNjZW5kYW50IGNvbWJpbmF0b3JzIHRvIHNwYWNlXG5cdFx0XHRcdHR5cGU6IG1hdGNoWyAwIF0ucmVwbGFjZSggcnRyaW0sIFwiIFwiIClcblx0XHRcdH0gKTtcblx0XHRcdHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoZWQubGVuZ3RoICk7XG5cdFx0fVxuXG5cdFx0Ly8gRmlsdGVyc1xuXHRcdGZvciAoIHR5cGUgaW4gRXhwci5maWx0ZXIgKSB7XG5cdFx0XHRpZiAoICggbWF0Y2ggPSBtYXRjaEV4cHJbIHR5cGUgXS5leGVjKCBzb0ZhciApICkgJiYgKCAhcHJlRmlsdGVyc1sgdHlwZSBdIHx8XG5cdFx0XHRcdCggbWF0Y2ggPSBwcmVGaWx0ZXJzWyB0eXBlIF0oIG1hdGNoICkgKSApICkge1xuXHRcdFx0XHRtYXRjaGVkID0gbWF0Y2guc2hpZnQoKTtcblx0XHRcdFx0dG9rZW5zLnB1c2goIHtcblx0XHRcdFx0XHR2YWx1ZTogbWF0Y2hlZCxcblx0XHRcdFx0XHR0eXBlOiB0eXBlLFxuXHRcdFx0XHRcdG1hdGNoZXM6IG1hdGNoXG5cdFx0XHRcdH0gKTtcblx0XHRcdFx0c29GYXIgPSBzb0Zhci5zbGljZSggbWF0Y2hlZC5sZW5ndGggKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoICFtYXRjaGVkICkge1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBsZW5ndGggb2YgdGhlIGludmFsaWQgZXhjZXNzXG5cdC8vIGlmIHdlJ3JlIGp1c3QgcGFyc2luZ1xuXHQvLyBPdGhlcndpc2UsIHRocm93IGFuIGVycm9yIG9yIHJldHVybiB0b2tlbnNcblx0cmV0dXJuIHBhcnNlT25seSA/XG5cdFx0c29GYXIubGVuZ3RoIDpcblx0XHRzb0ZhciA/XG5cdFx0XHRTaXp6bGUuZXJyb3IoIHNlbGVjdG9yICkgOlxuXG5cdFx0XHQvLyBDYWNoZSB0aGUgdG9rZW5zXG5cdFx0XHR0b2tlbkNhY2hlKCBzZWxlY3RvciwgZ3JvdXBzICkuc2xpY2UoIDAgKTtcbn07XG5cbmZ1bmN0aW9uIHRvU2VsZWN0b3IoIHRva2VucyApIHtcblx0dmFyIGkgPSAwLFxuXHRcdGxlbiA9IHRva2Vucy5sZW5ndGgsXG5cdFx0c2VsZWN0b3IgPSBcIlwiO1xuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRzZWxlY3RvciArPSB0b2tlbnNbIGkgXS52YWx1ZTtcblx0fVxuXHRyZXR1cm4gc2VsZWN0b3I7XG59XG5cbmZ1bmN0aW9uIGFkZENvbWJpbmF0b3IoIG1hdGNoZXIsIGNvbWJpbmF0b3IsIGJhc2UgKSB7XG5cdHZhciBkaXIgPSBjb21iaW5hdG9yLmRpcixcblx0XHRza2lwID0gY29tYmluYXRvci5uZXh0LFxuXHRcdGtleSA9IHNraXAgfHwgZGlyLFxuXHRcdGNoZWNrTm9uRWxlbWVudHMgPSBiYXNlICYmIGtleSA9PT0gXCJwYXJlbnROb2RlXCIsXG5cdFx0ZG9uZU5hbWUgPSBkb25lKys7XG5cblx0cmV0dXJuIGNvbWJpbmF0b3IuZmlyc3QgP1xuXG5cdFx0Ly8gQ2hlY2sgYWdhaW5zdCBjbG9zZXN0IGFuY2VzdG9yL3ByZWNlZGluZyBlbGVtZW50XG5cdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdHdoaWxlICggKCBlbGVtID0gZWxlbVsgZGlyIF0gKSApIHtcblx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGNoZWNrTm9uRWxlbWVudHMgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSA6XG5cblx0XHQvLyBDaGVjayBhZ2FpbnN0IGFsbCBhbmNlc3Rvci9wcmVjZWRpbmcgZWxlbWVudHNcblx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0dmFyIG9sZENhY2hlLCB1bmlxdWVDYWNoZSwgb3V0ZXJDYWNoZSxcblx0XHRcdFx0bmV3Q2FjaGUgPSBbIGRpcnJ1bnMsIGRvbmVOYW1lIF07XG5cblx0XHRcdC8vIFdlIGNhbid0IHNldCBhcmJpdHJhcnkgZGF0YSBvbiBYTUwgbm9kZXMsIHNvIHRoZXkgZG9uJ3QgYmVuZWZpdCBmcm9tIGNvbWJpbmF0b3IgY2FjaGluZ1xuXHRcdFx0aWYgKCB4bWwgKSB7XG5cdFx0XHRcdHdoaWxlICggKCBlbGVtID0gZWxlbVsgZGlyIF0gKSApIHtcblx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgY2hlY2tOb25FbGVtZW50cyApIHtcblx0XHRcdFx0XHRcdGlmICggbWF0Y2hlciggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0d2hpbGUgKCAoIGVsZW0gPSBlbGVtWyBkaXIgXSApICkge1xuXHRcdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzICkge1xuXHRcdFx0XHRcdFx0b3V0ZXJDYWNoZSA9IGVsZW1bIGV4cGFuZG8gXSB8fCAoIGVsZW1bIGV4cGFuZG8gXSA9IHt9ICk7XG5cblx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw5IG9ubHlcblx0XHRcdFx0XHRcdC8vIERlZmVuZCBhZ2FpbnN0IGNsb25lZCBhdHRyb3BlcnRpZXMgKGpRdWVyeSBnaC0xNzA5KVxuXHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGUgPSBvdXRlckNhY2hlWyBlbGVtLnVuaXF1ZUlEIF0gfHxcblx0XHRcdFx0XHRcdFx0KCBvdXRlckNhY2hlWyBlbGVtLnVuaXF1ZUlEIF0gPSB7fSApO1xuXG5cdFx0XHRcdFx0XHRpZiAoIHNraXAgJiYgc2tpcCA9PT0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICkge1xuXHRcdFx0XHRcdFx0XHRlbGVtID0gZWxlbVsgZGlyIF0gfHwgZWxlbTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoICggb2xkQ2FjaGUgPSB1bmlxdWVDYWNoZVsga2V5IF0gKSAmJlxuXHRcdFx0XHRcdFx0XHRvbGRDYWNoZVsgMCBdID09PSBkaXJydW5zICYmIG9sZENhY2hlWyAxIF0gPT09IGRvbmVOYW1lICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIEFzc2lnbiB0byBuZXdDYWNoZSBzbyByZXN1bHRzIGJhY2stcHJvcGFnYXRlIHRvIHByZXZpb3VzIGVsZW1lbnRzXG5cdFx0XHRcdFx0XHRcdHJldHVybiAoIG5ld0NhY2hlWyAyIF0gPSBvbGRDYWNoZVsgMiBdICk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRcdC8vIFJldXNlIG5ld2NhY2hlIHNvIHJlc3VsdHMgYmFjay1wcm9wYWdhdGUgdG8gcHJldmlvdXMgZWxlbWVudHNcblx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGVbIGtleSBdID0gbmV3Q2FjaGU7XG5cblx0XHRcdFx0XHRcdFx0Ly8gQSBtYXRjaCBtZWFucyB3ZSdyZSBkb25lOyBhIGZhaWwgbWVhbnMgd2UgaGF2ZSB0byBrZWVwIGNoZWNraW5nXG5cdFx0XHRcdFx0XHRcdGlmICggKCBuZXdDYWNoZVsgMiBdID0gbWF0Y2hlciggZWxlbSwgY29udGV4dCwgeG1sICkgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG59XG5cbmZ1bmN0aW9uIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApIHtcblx0cmV0dXJuIG1hdGNoZXJzLmxlbmd0aCA+IDEgP1xuXHRcdGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHR2YXIgaSA9IG1hdGNoZXJzLmxlbmd0aDtcblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRpZiAoICFtYXRjaGVyc1sgaSBdKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gOlxuXHRcdG1hdGNoZXJzWyAwIF07XG59XG5cbmZ1bmN0aW9uIG11bHRpcGxlQ29udGV4dHMoIHNlbGVjdG9yLCBjb250ZXh0cywgcmVzdWx0cyApIHtcblx0dmFyIGkgPSAwLFxuXHRcdGxlbiA9IGNvbnRleHRzLmxlbmd0aDtcblx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0U2l6emxlKCBzZWxlY3RvciwgY29udGV4dHNbIGkgXSwgcmVzdWx0cyApO1xuXHR9XG5cdHJldHVybiByZXN1bHRzO1xufVxuXG5mdW5jdGlvbiBjb25kZW5zZSggdW5tYXRjaGVkLCBtYXAsIGZpbHRlciwgY29udGV4dCwgeG1sICkge1xuXHR2YXIgZWxlbSxcblx0XHRuZXdVbm1hdGNoZWQgPSBbXSxcblx0XHRpID0gMCxcblx0XHRsZW4gPSB1bm1hdGNoZWQubGVuZ3RoLFxuXHRcdG1hcHBlZCA9IG1hcCAhPSBudWxsO1xuXG5cdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdGlmICggKCBlbGVtID0gdW5tYXRjaGVkWyBpIF0gKSApIHtcblx0XHRcdGlmICggIWZpbHRlciB8fCBmaWx0ZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApICkge1xuXHRcdFx0XHRuZXdVbm1hdGNoZWQucHVzaCggZWxlbSApO1xuXHRcdFx0XHRpZiAoIG1hcHBlZCApIHtcblx0XHRcdFx0XHRtYXAucHVzaCggaSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG5ld1VubWF0Y2hlZDtcbn1cblxuZnVuY3Rpb24gc2V0TWF0Y2hlciggcHJlRmlsdGVyLCBzZWxlY3RvciwgbWF0Y2hlciwgcG9zdEZpbHRlciwgcG9zdEZpbmRlciwgcG9zdFNlbGVjdG9yICkge1xuXHRpZiAoIHBvc3RGaWx0ZXIgJiYgIXBvc3RGaWx0ZXJbIGV4cGFuZG8gXSApIHtcblx0XHRwb3N0RmlsdGVyID0gc2V0TWF0Y2hlciggcG9zdEZpbHRlciApO1xuXHR9XG5cdGlmICggcG9zdEZpbmRlciAmJiAhcG9zdEZpbmRlclsgZXhwYW5kbyBdICkge1xuXHRcdHBvc3RGaW5kZXIgPSBzZXRNYXRjaGVyKCBwb3N0RmluZGVyLCBwb3N0U2VsZWN0b3IgKTtcblx0fVxuXHRyZXR1cm4gbWFya0Z1bmN0aW9uKCBmdW5jdGlvbiggc2VlZCwgcmVzdWx0cywgY29udGV4dCwgeG1sICkge1xuXHRcdHZhciB0ZW1wLCBpLCBlbGVtLFxuXHRcdFx0cHJlTWFwID0gW10sXG5cdFx0XHRwb3N0TWFwID0gW10sXG5cdFx0XHRwcmVleGlzdGluZyA9IHJlc3VsdHMubGVuZ3RoLFxuXG5cdFx0XHQvLyBHZXQgaW5pdGlhbCBlbGVtZW50cyBmcm9tIHNlZWQgb3IgY29udGV4dFxuXHRcdFx0ZWxlbXMgPSBzZWVkIHx8IG11bHRpcGxlQ29udGV4dHMoXG5cdFx0XHRcdHNlbGVjdG9yIHx8IFwiKlwiLFxuXHRcdFx0XHRjb250ZXh0Lm5vZGVUeXBlID8gWyBjb250ZXh0IF0gOiBjb250ZXh0LFxuXHRcdFx0XHRbXVxuXHRcdFx0KSxcblxuXHRcdFx0Ly8gUHJlZmlsdGVyIHRvIGdldCBtYXRjaGVyIGlucHV0LCBwcmVzZXJ2aW5nIGEgbWFwIGZvciBzZWVkLXJlc3VsdHMgc3luY2hyb25pemF0aW9uXG5cdFx0XHRtYXRjaGVySW4gPSBwcmVGaWx0ZXIgJiYgKCBzZWVkIHx8ICFzZWxlY3RvciApID9cblx0XHRcdFx0Y29uZGVuc2UoIGVsZW1zLCBwcmVNYXAsIHByZUZpbHRlciwgY29udGV4dCwgeG1sICkgOlxuXHRcdFx0XHRlbGVtcyxcblxuXHRcdFx0bWF0Y2hlck91dCA9IG1hdGNoZXIgP1xuXG5cdFx0XHRcdC8vIElmIHdlIGhhdmUgYSBwb3N0RmluZGVyLCBvciBmaWx0ZXJlZCBzZWVkLCBvciBub24tc2VlZCBwb3N0RmlsdGVyIG9yIHByZWV4aXN0aW5nIHJlc3VsdHMsXG5cdFx0XHRcdHBvc3RGaW5kZXIgfHwgKCBzZWVkID8gcHJlRmlsdGVyIDogcHJlZXhpc3RpbmcgfHwgcG9zdEZpbHRlciApID9cblxuXHRcdFx0XHRcdC8vIC4uLmludGVybWVkaWF0ZSBwcm9jZXNzaW5nIGlzIG5lY2Vzc2FyeVxuXHRcdFx0XHRcdFtdIDpcblxuXHRcdFx0XHRcdC8vIC4uLm90aGVyd2lzZSB1c2UgcmVzdWx0cyBkaXJlY3RseVxuXHRcdFx0XHRcdHJlc3VsdHMgOlxuXHRcdFx0XHRtYXRjaGVySW47XG5cblx0XHQvLyBGaW5kIHByaW1hcnkgbWF0Y2hlc1xuXHRcdGlmICggbWF0Y2hlciApIHtcblx0XHRcdG1hdGNoZXIoIG1hdGNoZXJJbiwgbWF0Y2hlck91dCwgY29udGV4dCwgeG1sICk7XG5cdFx0fVxuXG5cdFx0Ly8gQXBwbHkgcG9zdEZpbHRlclxuXHRcdGlmICggcG9zdEZpbHRlciApIHtcblx0XHRcdHRlbXAgPSBjb25kZW5zZSggbWF0Y2hlck91dCwgcG9zdE1hcCApO1xuXHRcdFx0cG9zdEZpbHRlciggdGVtcCwgW10sIGNvbnRleHQsIHhtbCApO1xuXG5cdFx0XHQvLyBVbi1tYXRjaCBmYWlsaW5nIGVsZW1lbnRzIGJ5IG1vdmluZyB0aGVtIGJhY2sgdG8gbWF0Y2hlckluXG5cdFx0XHRpID0gdGVtcC5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0aWYgKCAoIGVsZW0gPSB0ZW1wWyBpIF0gKSApIHtcblx0XHRcdFx0XHRtYXRjaGVyT3V0WyBwb3N0TWFwWyBpIF0gXSA9ICEoIG1hdGNoZXJJblsgcG9zdE1hcFsgaSBdIF0gPSBlbGVtICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIHNlZWQgKSB7XG5cdFx0XHRpZiAoIHBvc3RGaW5kZXIgfHwgcHJlRmlsdGVyICkge1xuXHRcdFx0XHRpZiAoIHBvc3RGaW5kZXIgKSB7XG5cblx0XHRcdFx0XHQvLyBHZXQgdGhlIGZpbmFsIG1hdGNoZXJPdXQgYnkgY29uZGVuc2luZyB0aGlzIGludGVybWVkaWF0ZSBpbnRvIHBvc3RGaW5kZXIgY29udGV4dHNcblx0XHRcdFx0XHR0ZW1wID0gW107XG5cdFx0XHRcdFx0aSA9IG1hdGNoZXJPdXQubGVuZ3RoO1xuXHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoIGVsZW0gPSBtYXRjaGVyT3V0WyBpIF0gKSApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBSZXN0b3JlIG1hdGNoZXJJbiBzaW5jZSBlbGVtIGlzIG5vdCB5ZXQgYSBmaW5hbCBtYXRjaFxuXHRcdFx0XHRcdFx0XHR0ZW1wLnB1c2goICggbWF0Y2hlckluWyBpIF0gPSBlbGVtICkgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cG9zdEZpbmRlciggbnVsbCwgKCBtYXRjaGVyT3V0ID0gW10gKSwgdGVtcCwgeG1sICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBNb3ZlIG1hdGNoZWQgZWxlbWVudHMgZnJvbSBzZWVkIHRvIHJlc3VsdHMgdG8ga2VlcCB0aGVtIHN5bmNocm9uaXplZFxuXHRcdFx0XHRpID0gbWF0Y2hlck91dC5sZW5ndGg7XG5cdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdGlmICggKCBlbGVtID0gbWF0Y2hlck91dFsgaSBdICkgJiZcblx0XHRcdFx0XHRcdCggdGVtcCA9IHBvc3RGaW5kZXIgPyBpbmRleE9mKCBzZWVkLCBlbGVtICkgOiBwcmVNYXBbIGkgXSApID4gLTEgKSB7XG5cblx0XHRcdFx0XHRcdHNlZWRbIHRlbXAgXSA9ICEoIHJlc3VsdHNbIHRlbXAgXSA9IGVsZW0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdC8vIEFkZCBlbGVtZW50cyB0byByZXN1bHRzLCB0aHJvdWdoIHBvc3RGaW5kZXIgaWYgZGVmaW5lZFxuXHRcdH0gZWxzZSB7XG5cdFx0XHRtYXRjaGVyT3V0ID0gY29uZGVuc2UoXG5cdFx0XHRcdG1hdGNoZXJPdXQgPT09IHJlc3VsdHMgP1xuXHRcdFx0XHRcdG1hdGNoZXJPdXQuc3BsaWNlKCBwcmVleGlzdGluZywgbWF0Y2hlck91dC5sZW5ndGggKSA6XG5cdFx0XHRcdFx0bWF0Y2hlck91dFxuXHRcdFx0KTtcblx0XHRcdGlmICggcG9zdEZpbmRlciApIHtcblx0XHRcdFx0cG9zdEZpbmRlciggbnVsbCwgcmVzdWx0cywgbWF0Y2hlck91dCwgeG1sICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBtYXRjaGVyT3V0ICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9ICk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXJGcm9tVG9rZW5zKCB0b2tlbnMgKSB7XG5cdHZhciBjaGVja0NvbnRleHQsIG1hdGNoZXIsIGosXG5cdFx0bGVuID0gdG9rZW5zLmxlbmd0aCxcblx0XHRsZWFkaW5nUmVsYXRpdmUgPSBFeHByLnJlbGF0aXZlWyB0b2tlbnNbIDAgXS50eXBlIF0sXG5cdFx0aW1wbGljaXRSZWxhdGl2ZSA9IGxlYWRpbmdSZWxhdGl2ZSB8fCBFeHByLnJlbGF0aXZlWyBcIiBcIiBdLFxuXHRcdGkgPSBsZWFkaW5nUmVsYXRpdmUgPyAxIDogMCxcblxuXHRcdC8vIFRoZSBmb3VuZGF0aW9uYWwgbWF0Y2hlciBlbnN1cmVzIHRoYXQgZWxlbWVudHMgYXJlIHJlYWNoYWJsZSBmcm9tIHRvcC1sZXZlbCBjb250ZXh0KHMpXG5cdFx0bWF0Y2hDb250ZXh0ID0gYWRkQ29tYmluYXRvciggZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbSA9PT0gY2hlY2tDb250ZXh0O1xuXHRcdH0sIGltcGxpY2l0UmVsYXRpdmUsIHRydWUgKSxcblx0XHRtYXRjaEFueUNvbnRleHQgPSBhZGRDb21iaW5hdG9yKCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBpbmRleE9mKCBjaGVja0NvbnRleHQsIGVsZW0gKSA+IC0xO1xuXHRcdH0sIGltcGxpY2l0UmVsYXRpdmUsIHRydWUgKSxcblx0XHRtYXRjaGVycyA9IFsgZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdHZhciByZXQgPSAoICFsZWFkaW5nUmVsYXRpdmUgJiYgKCB4bWwgfHwgY29udGV4dCAhPT0gb3V0ZXJtb3N0Q29udGV4dCApICkgfHwgKFxuXHRcdFx0XHQoIGNoZWNrQ29udGV4dCA9IGNvbnRleHQgKS5ub2RlVHlwZSA/XG5cdFx0XHRcdFx0bWF0Y2hDb250ZXh0KCBlbGVtLCBjb250ZXh0LCB4bWwgKSA6XG5cdFx0XHRcdFx0bWF0Y2hBbnlDb250ZXh0KCBlbGVtLCBjb250ZXh0LCB4bWwgKSApO1xuXG5cdFx0XHQvLyBBdm9pZCBoYW5naW5nIG9udG8gZWxlbWVudCAoaXNzdWUgIzI5OSlcblx0XHRcdGNoZWNrQ29udGV4dCA9IG51bGw7XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH0gXTtcblxuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRpZiAoICggbWF0Y2hlciA9IEV4cHIucmVsYXRpdmVbIHRva2Vuc1sgaSBdLnR5cGUgXSApICkge1xuXHRcdFx0bWF0Y2hlcnMgPSBbIGFkZENvbWJpbmF0b3IoIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApLCBtYXRjaGVyICkgXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWF0Y2hlciA9IEV4cHIuZmlsdGVyWyB0b2tlbnNbIGkgXS50eXBlIF0uYXBwbHkoIG51bGwsIHRva2Vuc1sgaSBdLm1hdGNoZXMgKTtcblxuXHRcdFx0Ly8gUmV0dXJuIHNwZWNpYWwgdXBvbiBzZWVpbmcgYSBwb3NpdGlvbmFsIG1hdGNoZXJcblx0XHRcdGlmICggbWF0Y2hlclsgZXhwYW5kbyBdICkge1xuXG5cdFx0XHRcdC8vIEZpbmQgdGhlIG5leHQgcmVsYXRpdmUgb3BlcmF0b3IgKGlmIGFueSkgZm9yIHByb3BlciBoYW5kbGluZ1xuXHRcdFx0XHRqID0gKytpO1xuXHRcdFx0XHRmb3IgKCA7IGogPCBsZW47IGorKyApIHtcblx0XHRcdFx0XHRpZiAoIEV4cHIucmVsYXRpdmVbIHRva2Vuc1sgaiBdLnR5cGUgXSApIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gc2V0TWF0Y2hlcihcblx0XHRcdFx0XHRpID4gMSAmJiBlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKSxcblx0XHRcdFx0XHRpID4gMSAmJiB0b1NlbGVjdG9yKFxuXG5cdFx0XHRcdFx0Ly8gSWYgdGhlIHByZWNlZGluZyB0b2tlbiB3YXMgYSBkZXNjZW5kYW50IGNvbWJpbmF0b3IsIGluc2VydCBhbiBpbXBsaWNpdCBhbnktZWxlbWVudCBgKmBcblx0XHRcdFx0XHR0b2tlbnNcblx0XHRcdFx0XHRcdC5zbGljZSggMCwgaSAtIDEgKVxuXHRcdFx0XHRcdFx0LmNvbmNhdCggeyB2YWx1ZTogdG9rZW5zWyBpIC0gMiBdLnR5cGUgPT09IFwiIFwiID8gXCIqXCIgOiBcIlwiIH0gKVxuXHRcdFx0XHRcdCkucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApLFxuXHRcdFx0XHRcdG1hdGNoZXIsXG5cdFx0XHRcdFx0aSA8IGogJiYgbWF0Y2hlckZyb21Ub2tlbnMoIHRva2Vucy5zbGljZSggaSwgaiApICksXG5cdFx0XHRcdFx0aiA8IGxlbiAmJiBtYXRjaGVyRnJvbVRva2VucyggKCB0b2tlbnMgPSB0b2tlbnMuc2xpY2UoIGogKSApICksXG5cdFx0XHRcdFx0aiA8IGxlbiAmJiB0b1NlbGVjdG9yKCB0b2tlbnMgKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0bWF0Y2hlcnMucHVzaCggbWF0Y2hlciApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hlckZyb21Hcm91cE1hdGNoZXJzKCBlbGVtZW50TWF0Y2hlcnMsIHNldE1hdGNoZXJzICkge1xuXHR2YXIgYnlTZXQgPSBzZXRNYXRjaGVycy5sZW5ndGggPiAwLFxuXHRcdGJ5RWxlbWVudCA9IGVsZW1lbnRNYXRjaGVycy5sZW5ndGggPiAwLFxuXHRcdHN1cGVyTWF0Y2hlciA9IGZ1bmN0aW9uKCBzZWVkLCBjb250ZXh0LCB4bWwsIHJlc3VsdHMsIG91dGVybW9zdCApIHtcblx0XHRcdHZhciBlbGVtLCBqLCBtYXRjaGVyLFxuXHRcdFx0XHRtYXRjaGVkQ291bnQgPSAwLFxuXHRcdFx0XHRpID0gXCIwXCIsXG5cdFx0XHRcdHVubWF0Y2hlZCA9IHNlZWQgJiYgW10sXG5cdFx0XHRcdHNldE1hdGNoZWQgPSBbXSxcblx0XHRcdFx0Y29udGV4dEJhY2t1cCA9IG91dGVybW9zdENvbnRleHQsXG5cblx0XHRcdFx0Ly8gV2UgbXVzdCBhbHdheXMgaGF2ZSBlaXRoZXIgc2VlZCBlbGVtZW50cyBvciBvdXRlcm1vc3QgY29udGV4dFxuXHRcdFx0XHRlbGVtcyA9IHNlZWQgfHwgYnlFbGVtZW50ICYmIEV4cHIuZmluZFsgXCJUQUdcIiBdKCBcIipcIiwgb3V0ZXJtb3N0ICksXG5cblx0XHRcdFx0Ly8gVXNlIGludGVnZXIgZGlycnVucyBpZmYgdGhpcyBpcyB0aGUgb3V0ZXJtb3N0IG1hdGNoZXJcblx0XHRcdFx0ZGlycnVuc1VuaXF1ZSA9ICggZGlycnVucyArPSBjb250ZXh0QmFja3VwID09IG51bGwgPyAxIDogTWF0aC5yYW5kb20oKSB8fCAwLjEgKSxcblx0XHRcdFx0bGVuID0gZWxlbXMubGVuZ3RoO1xuXG5cdFx0XHRpZiAoIG91dGVybW9zdCApIHtcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTcgLSAxOCtcblx0XHRcdFx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdFx0XHRcdC8vIHR3byBkb2N1bWVudHM7IHNoYWxsb3cgY29tcGFyaXNvbnMgd29yay5cblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXHRcdFx0XHRvdXRlcm1vc3RDb250ZXh0ID0gY29udGV4dCA9PSBkb2N1bWVudCB8fCBjb250ZXh0IHx8IG91dGVybW9zdDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIGVsZW1lbnRzIHBhc3NpbmcgZWxlbWVudE1hdGNoZXJzIGRpcmVjdGx5IHRvIHJlc3VsdHNcblx0XHRcdC8vIFN1cHBvcnQ6IElFPDksIFNhZmFyaVxuXHRcdFx0Ly8gVG9sZXJhdGUgTm9kZUxpc3QgcHJvcGVydGllcyAoSUU6IFwibGVuZ3RoXCI7IFNhZmFyaTogPG51bWJlcj4pIG1hdGNoaW5nIGVsZW1lbnRzIGJ5IGlkXG5cdFx0XHRmb3IgKCA7IGkgIT09IGxlbiAmJiAoIGVsZW0gPSBlbGVtc1sgaSBdICkgIT0gbnVsbDsgaSsrICkge1xuXHRcdFx0XHRpZiAoIGJ5RWxlbWVudCAmJiBlbGVtICkge1xuXHRcdFx0XHRcdGogPSAwO1xuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgMTErLCBFZGdlIDE3IC0gMTgrXG5cdFx0XHRcdFx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdFx0XHRcdFx0Ly8gdHdvIGRvY3VtZW50czsgc2hhbGxvdyBjb21wYXJpc29ucyB3b3JrLlxuXHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcblx0XHRcdFx0XHRpZiAoICFjb250ZXh0ICYmIGVsZW0ub3duZXJEb2N1bWVudCAhPSBkb2N1bWVudCApIHtcblx0XHRcdFx0XHRcdHNldERvY3VtZW50KCBlbGVtICk7XG5cdFx0XHRcdFx0XHR4bWwgPSAhZG9jdW1lbnRJc0hUTUw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHdoaWxlICggKCBtYXRjaGVyID0gZWxlbWVudE1hdGNoZXJzWyBqKysgXSApICkge1xuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVyKCBlbGVtLCBjb250ZXh0IHx8IGRvY3VtZW50LCB4bWwgKSApIHtcblx0XHRcdFx0XHRcdFx0cmVzdWx0cy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIG91dGVybW9zdCApIHtcblx0XHRcdFx0XHRcdGRpcnJ1bnMgPSBkaXJydW5zVW5pcXVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFRyYWNrIHVubWF0Y2hlZCBlbGVtZW50cyBmb3Igc2V0IGZpbHRlcnNcblx0XHRcdFx0aWYgKCBieVNldCApIHtcblxuXHRcdFx0XHRcdC8vIFRoZXkgd2lsbCBoYXZlIGdvbmUgdGhyb3VnaCBhbGwgcG9zc2libGUgbWF0Y2hlcnNcblx0XHRcdFx0XHRpZiAoICggZWxlbSA9ICFtYXRjaGVyICYmIGVsZW0gKSApIHtcblx0XHRcdFx0XHRcdG1hdGNoZWRDb3VudC0tO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIExlbmd0aGVuIHRoZSBhcnJheSBmb3IgZXZlcnkgZWxlbWVudCwgbWF0Y2hlZCBvciBub3Rcblx0XHRcdFx0XHRpZiAoIHNlZWQgKSB7XG5cdFx0XHRcdFx0XHR1bm1hdGNoZWQucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBgaWAgaXMgbm93IHRoZSBjb3VudCBvZiBlbGVtZW50cyB2aXNpdGVkIGFib3ZlLCBhbmQgYWRkaW5nIGl0IHRvIGBtYXRjaGVkQ291bnRgXG5cdFx0XHQvLyBtYWtlcyB0aGUgbGF0dGVyIG5vbm5lZ2F0aXZlLlxuXHRcdFx0bWF0Y2hlZENvdW50ICs9IGk7XG5cblx0XHRcdC8vIEFwcGx5IHNldCBmaWx0ZXJzIHRvIHVubWF0Y2hlZCBlbGVtZW50c1xuXHRcdFx0Ly8gTk9URTogVGhpcyBjYW4gYmUgc2tpcHBlZCBpZiB0aGVyZSBhcmUgbm8gdW5tYXRjaGVkIGVsZW1lbnRzIChpLmUuLCBgbWF0Y2hlZENvdW50YFxuXHRcdFx0Ly8gZXF1YWxzIGBpYCksIHVubGVzcyB3ZSBkaWRuJ3QgdmlzaXQgX2FueV8gZWxlbWVudHMgaW4gdGhlIGFib3ZlIGxvb3AgYmVjYXVzZSB3ZSBoYXZlXG5cdFx0XHQvLyBubyBlbGVtZW50IG1hdGNoZXJzIGFuZCBubyBzZWVkLlxuXHRcdFx0Ly8gSW5jcmVtZW50aW5nIGFuIGluaXRpYWxseS1zdHJpbmcgXCIwXCIgYGlgIGFsbG93cyBgaWAgdG8gcmVtYWluIGEgc3RyaW5nIG9ubHkgaW4gdGhhdFxuXHRcdFx0Ly8gY2FzZSwgd2hpY2ggd2lsbCByZXN1bHQgaW4gYSBcIjAwXCIgYG1hdGNoZWRDb3VudGAgdGhhdCBkaWZmZXJzIGZyb20gYGlgIGJ1dCBpcyBhbHNvXG5cdFx0XHQvLyBudW1lcmljYWxseSB6ZXJvLlxuXHRcdFx0aWYgKCBieVNldCAmJiBpICE9PSBtYXRjaGVkQ291bnQgKSB7XG5cdFx0XHRcdGogPSAwO1xuXHRcdFx0XHR3aGlsZSAoICggbWF0Y2hlciA9IHNldE1hdGNoZXJzWyBqKysgXSApICkge1xuXHRcdFx0XHRcdG1hdGNoZXIoIHVubWF0Y2hlZCwgc2V0TWF0Y2hlZCwgY29udGV4dCwgeG1sICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIHNlZWQgKSB7XG5cblx0XHRcdFx0XHQvLyBSZWludGVncmF0ZSBlbGVtZW50IG1hdGNoZXMgdG8gZWxpbWluYXRlIHRoZSBuZWVkIGZvciBzb3J0aW5nXG5cdFx0XHRcdFx0aWYgKCBtYXRjaGVkQ291bnQgPiAwICkge1xuXHRcdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggISggdW5tYXRjaGVkWyBpIF0gfHwgc2V0TWF0Y2hlZFsgaSBdICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0c2V0TWF0Y2hlZFsgaSBdID0gcG9wLmNhbGwoIHJlc3VsdHMgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIERpc2NhcmQgaW5kZXggcGxhY2Vob2xkZXIgdmFsdWVzIHRvIGdldCBvbmx5IGFjdHVhbCBtYXRjaGVzXG5cdFx0XHRcdFx0c2V0TWF0Y2hlZCA9IGNvbmRlbnNlKCBzZXRNYXRjaGVkICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBZGQgbWF0Y2hlcyB0byByZXN1bHRzXG5cdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIHNldE1hdGNoZWQgKTtcblxuXHRcdFx0XHQvLyBTZWVkbGVzcyBzZXQgbWF0Y2hlcyBzdWNjZWVkaW5nIG11bHRpcGxlIHN1Y2Nlc3NmdWwgbWF0Y2hlcnMgc3RpcHVsYXRlIHNvcnRpbmdcblx0XHRcdFx0aWYgKCBvdXRlcm1vc3QgJiYgIXNlZWQgJiYgc2V0TWF0Y2hlZC5sZW5ndGggPiAwICYmXG5cdFx0XHRcdFx0KCBtYXRjaGVkQ291bnQgKyBzZXRNYXRjaGVycy5sZW5ndGggKSA+IDEgKSB7XG5cblx0XHRcdFx0XHRTaXp6bGUudW5pcXVlU29ydCggcmVzdWx0cyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIE92ZXJyaWRlIG1hbmlwdWxhdGlvbiBvZiBnbG9iYWxzIGJ5IG5lc3RlZCBtYXRjaGVyc1xuXHRcdFx0aWYgKCBvdXRlcm1vc3QgKSB7XG5cdFx0XHRcdGRpcnJ1bnMgPSBkaXJydW5zVW5pcXVlO1xuXHRcdFx0XHRvdXRlcm1vc3RDb250ZXh0ID0gY29udGV4dEJhY2t1cDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHVubWF0Y2hlZDtcblx0XHR9O1xuXG5cdHJldHVybiBieVNldCA/XG5cdFx0bWFya0Z1bmN0aW9uKCBzdXBlck1hdGNoZXIgKSA6XG5cdFx0c3VwZXJNYXRjaGVyO1xufVxuXG5jb21waWxlID0gU2l6emxlLmNvbXBpbGUgPSBmdW5jdGlvbiggc2VsZWN0b3IsIG1hdGNoIC8qIEludGVybmFsIFVzZSBPbmx5ICovICkge1xuXHR2YXIgaSxcblx0XHRzZXRNYXRjaGVycyA9IFtdLFxuXHRcdGVsZW1lbnRNYXRjaGVycyA9IFtdLFxuXHRcdGNhY2hlZCA9IGNvbXBpbGVyQ2FjaGVbIHNlbGVjdG9yICsgXCIgXCIgXTtcblxuXHRpZiAoICFjYWNoZWQgKSB7XG5cblx0XHQvLyBHZW5lcmF0ZSBhIGZ1bmN0aW9uIG9mIHJlY3Vyc2l2ZSBmdW5jdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCB0byBjaGVjayBlYWNoIGVsZW1lbnRcblx0XHRpZiAoICFtYXRjaCApIHtcblx0XHRcdG1hdGNoID0gdG9rZW5pemUoIHNlbGVjdG9yICk7XG5cdFx0fVxuXHRcdGkgPSBtYXRjaC5sZW5ndGg7XG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRjYWNoZWQgPSBtYXRjaGVyRnJvbVRva2VucyggbWF0Y2hbIGkgXSApO1xuXHRcdFx0aWYgKCBjYWNoZWRbIGV4cGFuZG8gXSApIHtcblx0XHRcdFx0c2V0TWF0Y2hlcnMucHVzaCggY2FjaGVkICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbGVtZW50TWF0Y2hlcnMucHVzaCggY2FjaGVkICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ2FjaGUgdGhlIGNvbXBpbGVkIGZ1bmN0aW9uXG5cdFx0Y2FjaGVkID0gY29tcGlsZXJDYWNoZShcblx0XHRcdHNlbGVjdG9yLFxuXHRcdFx0bWF0Y2hlckZyb21Hcm91cE1hdGNoZXJzKCBlbGVtZW50TWF0Y2hlcnMsIHNldE1hdGNoZXJzIClcblx0XHQpO1xuXG5cdFx0Ly8gU2F2ZSBzZWxlY3RvciBhbmQgdG9rZW5pemF0aW9uXG5cdFx0Y2FjaGVkLnNlbGVjdG9yID0gc2VsZWN0b3I7XG5cdH1cblx0cmV0dXJuIGNhY2hlZDtcbn07XG5cbi8qKlxuICogQSBsb3ctbGV2ZWwgc2VsZWN0aW9uIGZ1bmN0aW9uIHRoYXQgd29ya3Mgd2l0aCBTaXp6bGUncyBjb21waWxlZFxuICogIHNlbGVjdG9yIGZ1bmN0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IHNlbGVjdG9yIEEgc2VsZWN0b3Igb3IgYSBwcmUtY29tcGlsZWRcbiAqICBzZWxlY3RvciBmdW5jdGlvbiBidWlsdCB3aXRoIFNpenpsZS5jb21waWxlXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRleHRcbiAqIEBwYXJhbSB7QXJyYXl9IFtyZXN1bHRzXVxuICogQHBhcmFtIHtBcnJheX0gW3NlZWRdIEEgc2V0IG9mIGVsZW1lbnRzIHRvIG1hdGNoIGFnYWluc3RcbiAqL1xuc2VsZWN0ID0gU2l6emxlLnNlbGVjdCA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApIHtcblx0dmFyIGksIHRva2VucywgdG9rZW4sIHR5cGUsIGZpbmQsXG5cdFx0Y29tcGlsZWQgPSB0eXBlb2Ygc2VsZWN0b3IgPT09IFwiZnVuY3Rpb25cIiAmJiBzZWxlY3Rvcixcblx0XHRtYXRjaCA9ICFzZWVkICYmIHRva2VuaXplKCAoIHNlbGVjdG9yID0gY29tcGlsZWQuc2VsZWN0b3IgfHwgc2VsZWN0b3IgKSApO1xuXG5cdHJlc3VsdHMgPSByZXN1bHRzIHx8IFtdO1xuXG5cdC8vIFRyeSB0byBtaW5pbWl6ZSBvcGVyYXRpb25zIGlmIHRoZXJlIGlzIG9ubHkgb25lIHNlbGVjdG9yIGluIHRoZSBsaXN0IGFuZCBubyBzZWVkXG5cdC8vICh0aGUgbGF0dGVyIG9mIHdoaWNoIGd1YXJhbnRlZXMgdXMgY29udGV4dClcblx0aWYgKCBtYXRjaC5sZW5ndGggPT09IDEgKSB7XG5cblx0XHQvLyBSZWR1Y2UgY29udGV4dCBpZiB0aGUgbGVhZGluZyBjb21wb3VuZCBzZWxlY3RvciBpcyBhbiBJRFxuXHRcdHRva2VucyA9IG1hdGNoWyAwIF0gPSBtYXRjaFsgMCBdLnNsaWNlKCAwICk7XG5cdFx0aWYgKCB0b2tlbnMubGVuZ3RoID4gMiAmJiAoIHRva2VuID0gdG9rZW5zWyAwIF0gKS50eXBlID09PSBcIklEXCIgJiZcblx0XHRcdGNvbnRleHQubm9kZVR5cGUgPT09IDkgJiYgZG9jdW1lbnRJc0hUTUwgJiYgRXhwci5yZWxhdGl2ZVsgdG9rZW5zWyAxIF0udHlwZSBdICkge1xuXG5cdFx0XHRjb250ZXh0ID0gKCBFeHByLmZpbmRbIFwiSURcIiBdKCB0b2tlbi5tYXRjaGVzWyAwIF1cblx0XHRcdFx0LnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICksIGNvbnRleHQgKSB8fCBbXSApWyAwIF07XG5cdFx0XHRpZiAoICFjb250ZXh0ICkge1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblxuXHRcdFx0Ly8gUHJlY29tcGlsZWQgbWF0Y2hlcnMgd2lsbCBzdGlsbCB2ZXJpZnkgYW5jZXN0cnksIHNvIHN0ZXAgdXAgYSBsZXZlbFxuXHRcdFx0fSBlbHNlIGlmICggY29tcGlsZWQgKSB7XG5cdFx0XHRcdGNvbnRleHQgPSBjb250ZXh0LnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdHNlbGVjdG9yID0gc2VsZWN0b3Iuc2xpY2UoIHRva2Vucy5zaGlmdCgpLnZhbHVlLmxlbmd0aCApO1xuXHRcdH1cblxuXHRcdC8vIEZldGNoIGEgc2VlZCBzZXQgZm9yIHJpZ2h0LXRvLWxlZnQgbWF0Y2hpbmdcblx0XHRpID0gbWF0Y2hFeHByWyBcIm5lZWRzQ29udGV4dFwiIF0udGVzdCggc2VsZWN0b3IgKSA/IDAgOiB0b2tlbnMubGVuZ3RoO1xuXHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0dG9rZW4gPSB0b2tlbnNbIGkgXTtcblxuXHRcdFx0Ly8gQWJvcnQgaWYgd2UgaGl0IGEgY29tYmluYXRvclxuXHRcdFx0aWYgKCBFeHByLnJlbGF0aXZlWyAoIHR5cGUgPSB0b2tlbi50eXBlICkgXSApIHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpZiAoICggZmluZCA9IEV4cHIuZmluZFsgdHlwZSBdICkgKSB7XG5cblx0XHRcdFx0Ly8gU2VhcmNoLCBleHBhbmRpbmcgY29udGV4dCBmb3IgbGVhZGluZyBzaWJsaW5nIGNvbWJpbmF0b3JzXG5cdFx0XHRcdGlmICggKCBzZWVkID0gZmluZChcblx0XHRcdFx0XHR0b2tlbi5tYXRjaGVzWyAwIF0ucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKSxcblx0XHRcdFx0XHRyc2libGluZy50ZXN0KCB0b2tlbnNbIDAgXS50eXBlICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8XG5cdFx0XHRcdFx0XHRjb250ZXh0XG5cdFx0XHRcdCkgKSApIHtcblxuXHRcdFx0XHRcdC8vIElmIHNlZWQgaXMgZW1wdHkgb3Igbm8gdG9rZW5zIHJlbWFpbiwgd2UgY2FuIHJldHVybiBlYXJseVxuXHRcdFx0XHRcdHRva2Vucy5zcGxpY2UoIGksIDEgKTtcblx0XHRcdFx0XHRzZWxlY3RvciA9IHNlZWQubGVuZ3RoICYmIHRvU2VsZWN0b3IoIHRva2VucyApO1xuXHRcdFx0XHRcdGlmICggIXNlbGVjdG9yICkge1xuXHRcdFx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgc2VlZCApO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBDb21waWxlIGFuZCBleGVjdXRlIGEgZmlsdGVyaW5nIGZ1bmN0aW9uIGlmIG9uZSBpcyBub3QgcHJvdmlkZWRcblx0Ly8gUHJvdmlkZSBgbWF0Y2hgIHRvIGF2b2lkIHJldG9rZW5pemF0aW9uIGlmIHdlIG1vZGlmaWVkIHRoZSBzZWxlY3RvciBhYm92ZVxuXHQoIGNvbXBpbGVkIHx8IGNvbXBpbGUoIHNlbGVjdG9yLCBtYXRjaCApICkoXG5cdFx0c2VlZCxcblx0XHRjb250ZXh0LFxuXHRcdCFkb2N1bWVudElzSFRNTCxcblx0XHRyZXN1bHRzLFxuXHRcdCFjb250ZXh0IHx8IHJzaWJsaW5nLnRlc3QoIHNlbGVjdG9yICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8IGNvbnRleHRcblx0KTtcblx0cmV0dXJuIHJlc3VsdHM7XG59O1xuXG4vLyBPbmUtdGltZSBhc3NpZ25tZW50c1xuXG4vLyBTb3J0IHN0YWJpbGl0eVxuc3VwcG9ydC5zb3J0U3RhYmxlID0gZXhwYW5kby5zcGxpdCggXCJcIiApLnNvcnQoIHNvcnRPcmRlciApLmpvaW4oIFwiXCIgKSA9PT0gZXhwYW5kbztcblxuLy8gU3VwcG9ydDogQ2hyb21lIDE0LTM1K1xuLy8gQWx3YXlzIGFzc3VtZSBkdXBsaWNhdGVzIGlmIHRoZXkgYXJlbid0IHBhc3NlZCB0byB0aGUgY29tcGFyaXNvbiBmdW5jdGlvblxuc3VwcG9ydC5kZXRlY3REdXBsaWNhdGVzID0gISFoYXNEdXBsaWNhdGU7XG5cbi8vIEluaXRpYWxpemUgYWdhaW5zdCB0aGUgZGVmYXVsdCBkb2N1bWVudFxuc2V0RG9jdW1lbnQoKTtcblxuLy8gU3VwcG9ydDogV2Via2l0PDUzNy4zMiAtIFNhZmFyaSA2LjAuMy9DaHJvbWUgMjUgKGZpeGVkIGluIENocm9tZSAyNylcbi8vIERldGFjaGVkIG5vZGVzIGNvbmZvdW5kaW5nbHkgZm9sbG93ICplYWNoIG90aGVyKlxuc3VwcG9ydC5zb3J0RGV0YWNoZWQgPSBhc3NlcnQoIGZ1bmN0aW9uKCBlbCApIHtcblxuXHQvLyBTaG91bGQgcmV0dXJuIDEsIGJ1dCByZXR1cm5zIDQgKGZvbGxvd2luZylcblx0cmV0dXJuIGVsLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImZpZWxkc2V0XCIgKSApICYgMTtcbn0gKTtcblxuLy8gU3VwcG9ydDogSUU8OFxuLy8gUHJldmVudCBhdHRyaWJ1dGUvcHJvcGVydHkgXCJpbnRlcnBvbGF0aW9uXCJcbi8vIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXM1MzY0MjklMjhWUy44NSUyOS5hc3B4XG5pZiAoICFhc3NlcnQoIGZ1bmN0aW9uKCBlbCApIHtcblx0ZWwuaW5uZXJIVE1MID0gXCI8YSBocmVmPScjJz48L2E+XCI7XG5cdHJldHVybiBlbC5maXJzdENoaWxkLmdldEF0dHJpYnV0ZSggXCJocmVmXCIgKSA9PT0gXCIjXCI7XG59ICkgKSB7XG5cdGFkZEhhbmRsZSggXCJ0eXBlfGhyZWZ8aGVpZ2h0fHdpZHRoXCIsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcblx0XHRpZiAoICFpc1hNTCApIHtcblx0XHRcdHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSwgbmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInR5cGVcIiA/IDEgOiAyICk7XG5cdFx0fVxuXHR9ICk7XG59XG5cbi8vIFN1cHBvcnQ6IElFPDlcbi8vIFVzZSBkZWZhdWx0VmFsdWUgaW4gcGxhY2Ugb2YgZ2V0QXR0cmlidXRlKFwidmFsdWVcIilcbmlmICggIXN1cHBvcnQuYXR0cmlidXRlcyB8fCAhYXNzZXJ0KCBmdW5jdGlvbiggZWwgKSB7XG5cdGVsLmlubmVySFRNTCA9IFwiPGlucHV0Lz5cIjtcblx0ZWwuZmlyc3RDaGlsZC5zZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiwgXCJcIiApO1xuXHRyZXR1cm4gZWwuZmlyc3RDaGlsZC5nZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiApID09PSBcIlwiO1xufSApICkge1xuXHRhZGRIYW5kbGUoIFwidmFsdWVcIiwgZnVuY3Rpb24oIGVsZW0sIF9uYW1lLCBpc1hNTCApIHtcblx0XHRpZiAoICFpc1hNTCAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaW5wdXRcIiApIHtcblx0XHRcdHJldHVybiBlbGVtLmRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH0gKTtcbn1cblxuLy8gU3VwcG9ydDogSUU8OVxuLy8gVXNlIGdldEF0dHJpYnV0ZU5vZGUgdG8gZmV0Y2ggYm9vbGVhbnMgd2hlbiBnZXRBdHRyaWJ1dGUgbGllc1xuaWYgKCAhYXNzZXJ0KCBmdW5jdGlvbiggZWwgKSB7XG5cdHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoIFwiZGlzYWJsZWRcIiApID09IG51bGw7XG59ICkgKSB7XG5cdGFkZEhhbmRsZSggYm9vbGVhbnMsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcblx0XHR2YXIgdmFsO1xuXHRcdGlmICggIWlzWE1MICkge1xuXHRcdFx0cmV0dXJuIGVsZW1bIG5hbWUgXSA9PT0gdHJ1ZSA/IG5hbWUudG9Mb3dlckNhc2UoKSA6XG5cdFx0XHRcdCggdmFsID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKCBuYW1lICkgKSAmJiB2YWwuc3BlY2lmaWVkID9cblx0XHRcdFx0XHR2YWwudmFsdWUgOlxuXHRcdFx0XHRcdG51bGw7XG5cdFx0fVxuXHR9ICk7XG59XG5cbi8vIEVYUE9TRVxudmFyIF9zaXp6bGUgPSB3aW5kb3cuU2l6emxlO1xuXG5TaXp6bGUubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuXHRpZiAoIHdpbmRvdy5TaXp6bGUgPT09IFNpenpsZSApIHtcblx0XHR3aW5kb3cuU2l6emxlID0gX3NpenpsZTtcblx0fVxuXG5cdHJldHVybiBTaXp6bGU7XG59O1xuXG5pZiAoIHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kICkge1xuXHRkZWZpbmUoIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBTaXp6bGU7XG5cdH0gKTtcblxuLy8gU2l6emxlIHJlcXVpcmVzIHRoYXQgdGhlcmUgYmUgYSBnbG9iYWwgd2luZG93IGluIENvbW1vbi1KUyBsaWtlIGVudmlyb25tZW50c1xufSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUuZXhwb3J0cyApIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBTaXp6bGU7XG59IGVsc2Uge1xuXHR3aW5kb3cuU2l6emxlID0gU2l6emxlO1xufVxuXG4vLyBFWFBPU0VcblxufSApKCB3aW5kb3cgKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vc2l6emxlL2Rpc3Qvc2l6emxlLmpzIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBzZWxlY3QsIGdldFNpbmdsZVNlbGVjdG9yLCBnZXRNdWx0aVNlbGVjdG9yIH0gZnJvbSAnLi9zZWxlY3QnXG5leHBvcnQgeyBkZWZhdWx0IGFzIG1hdGNoLCBpbml0T3B0aW9ucyB9IGZyb20gJy4vbWF0Y2gnXG5leHBvcnQgeyBkZWZhdWx0IGFzIG9wdGltaXplIH0gZnJvbSAnLi9vcHRpbWl6ZSdcbmV4cG9ydCAqIGFzIGNvbW1vbiBmcm9tICcuL2NvbW1vbidcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=