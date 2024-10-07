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
    return console.warn('\n      The selected elements can\'t be efficiently mapped.\n      Its probably best to use multiple single selectors instead!\n    ', elements);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzM2E3MjhhOThkNDM3ZmVjYjYwMCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9wYXR0ZXJuLmpzIiwid2VicGFjazovLy8uL3NyYy9zZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9tYXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3B0aW1pemUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L3NpenpsZS9kaXN0L3NpenpsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiY29udmVydE5vZGVMaXN0Iiwibm9kZXMiLCJsZW5ndGgiLCJhcnIiLCJBcnJheSIsImkiLCJlc2NhcGVWYWx1ZSIsInZhbHVlIiwicmVwbGFjZSIsInBhcnRpdGlvbiIsImFycmF5IiwicHJlZGljYXRlIiwicmVkdWNlIiwiaXRlbSIsImlubmVyIiwib3V0ZXIiLCJjb25jYXQiLCJpc1ZhbGlkQ1NTSWRlbnRpZmllciIsInRlc3QiLCJjcmVhdGVQYXR0ZXJuIiwiYmFzZSIsImF0dHJpYnV0ZXMiLCJjbGFzc2VzIiwicHNldWRvIiwiZGVzY2VuZGFudHMiLCJhdHRyaWJ1dGVzVG9TZWxlY3RvciIsIm1hcCIsIm5hbWUiLCJqb2luIiwiY2xhc3Nlc1RvU2VsZWN0b3IiLCJjIiwicHNldWRvVG9TZWxlY3RvciIsInBhdHRlcm5Ub1NlbGVjdG9yIiwicGF0dGVybiIsInJlbGF0ZXMiLCJ0YWciLCJwYXRoVG9TZWxlY3RvciIsInBhdGgiLCJjb252ZXJ0RXNjYXBpbmciLCJhdHRyaWJ1dGVzVG9YUGF0aCIsImNsYXNzZXNUb1hQYXRoIiwicHNldWRvVG9YUGF0aCIsIm1hdGNoIiwicCIsInBhdHRlcm5Ub1hQYXRoIiwiZGVzY2VuZGFudHNUb1hQYXRoIiwicGF0aFRvWFBhdGgiLCJjaGlsZHJlbiIsInRvU3RyaW5nIiwianF1ZXJ5IiwiY3NzIiwieHBhdGgiLCJnZXRUb1N0cmluZyIsIm9wdGlvbnMiLCJmb3JtYXQiLCJTaXp6bGUiLCJzZWxlY3RKUXVlcnkiLCJzZWxlY3RvciIsInBhcmVudCIsInJlcXVpcmUiLCJkb2N1bWVudCIsInNlbGVjdFhQYXRoIiwiZG9jIiwicGFyZW50Tm9kZSIsInN0YXJ0c1dpdGgiLCJpdGVyYXRvciIsImV2YWx1YXRlIiwiZWxlbWVudHMiLCJlbGVtZW50IiwiaXRlcmF0ZU5leHQiLCJwdXNoIiwic2VsZWN0Q1NTIiwicXVlcnlTZWxlY3RvckFsbCIsInNlbGVjdCIsImdldFNlbGVjdCIsInJvb3QiLCJlcnIiLCJnZXRDb21tb25BbmNlc3RvciIsImFuY2VzdG9ycyIsImZvckVhY2giLCJpbmRleCIsInBhcmVudHMiLCJ1bnNoaWZ0Iiwic29ydCIsImN1cnIiLCJuZXh0Iiwic2hhbGxvd0FuY2VzdG9yIiwic2hpZnQiLCJhbmNlc3RvciIsIm1pc3NpbmciLCJzb21lIiwib3RoZXJQYXJlbnRzIiwib3RoZXJQYXJlbnQiLCJsIiwiZ2V0Q29tbW9uUHJvcGVydGllcyIsImlnbm9yZSIsImNvbW1vblByb3BlcnRpZXMiLCJjb21tb25DbGFzc2VzIiwiY29tbW9uQXR0cmlidXRlcyIsImNvbW1vblRhZyIsInVuZGVmaW5lZCIsImdldEF0dHJpYnV0ZSIsInRyaW0iLCJzcGxpdCIsImZpbHRlciIsImNsYXNzIiwiY2xzIiwiZW50cnkiLCJlbGVtZW50QXR0cmlidXRlcyIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJhdHRyaWJ1dGUiLCJhdHRyaWJ1dGVOYW1lIiwiYXR0cmlidXRlc05hbWVzIiwiY29tbW9uQXR0cmlidXRlc05hbWVzIiwibmV4dENvbW1vbkF0dHJpYnV0ZXMiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJkZWZhdWx0SWdub3JlIiwiaW5kZXhPZiIsImNvbnRhaW5zIiwiaW5pdE9wdGlvbnMiLCJza2lwIiwicHJpb3JpdHkiLCJub2RlIiwibmVzdGVkIiwic2tpcENvbXBhcmUiLCJpc0FycmF5Iiwic2tpcENoZWNrcyIsImNvbXBhcmUiLCJ0eXBlIiwiUmVnRXhwIiwibm9kZVR5cGUiLCJjaGVja0F0dHJpYnV0ZXMiLCJjaGVja1RhZyIsImluY2x1ZGVzIiwiY2hlY2tSZWN1cnNpdmVEZXNjZW5kYW50cyIsImNoZWNrVGV4dCIsImNoZWNrTnRoQ2hpbGQiLCJmaW5kUGF0dGVybiIsImZpbmRBdHRyaWJ1dGVzUGF0dGVybiIsImNvbWJpbmF0aW9ucyIsInZhbHVlcyIsIm1pbiIsIm1heCIsInJlc3VsdCIsInIiLCJ2IiwibWF4U3Vic2V0U2l6ZSIsIml0ZW1zIiwiZ2V0Q2xhc3NTZWxlY3RvciIsImZpbmQiLCJtYXRjaGVzIiwiYXR0cmlidXRlTmFtZXMiLCJ2YWwiLCJhIiwic29ydGVkS2V5cyIsImlzT3B0aW1hbCIsImF0dHJpYnV0ZVZhbHVlIiwidXNlTmFtZWRJZ25vcmUiLCJjdXJyZW50SWdub3JlIiwiY3VycmVudERlZmF1bHRJZ25vcmUiLCJjaGVja0lnbm9yZSIsImNsYXNzTmFtZXMiLCJjbGFzc0lnbm9yZSIsImNsYXNzTmFtZSIsImZpbmRUYWdQYXR0ZXJuIiwiY2hpbGQiLCJjaGlsZFBhdHRlcm4iLCJjb25zb2xlIiwid2FybiIsInRleHRDb250ZW50IiwiZmlyc3RDaGlsZCIsIm5vZGVWYWx1ZSIsInRleHRzIiwidGV4dCIsImZyb20iLCJkZXNjZW5kYW50UGF0aCIsInBhcmVudEVsZW1lbnQiLCJkZWZhdWx0UHJlZGljYXRlIiwiY2hlY2siLCJvcHRpbWl6ZSIsIkVycm9yIiwib3B0aW1pemVQYXJ0IiwiZW5kT3B0aW1pemVkIiwic2xpY2UiLCJzaG9ydGVuZWQiLCJwb3AiLCJjdXJyZW50IiwiaGFzU2FtZVJlc3VsdCIsImV2ZXJ5Iiwib3B0aW1pemVUZXh0IiwicHJlIiwicG9zdCIsIm90aGVyIiwib3B0aW1pemVkIiwiY29tcGFyZVJlc3VsdHMiLCJvcHRpbWl6ZUF0dHJpYnV0ZXMiLCJzaW1wbGlmeSIsIm9yaWdpbmFsIiwiZ2V0U2ltcGxpZmllZCIsInNpbXBsaWZpZWQiLCJvcHRpbWl6ZURlc2NlbmRhbnQiLCJkZXNjZW5kYW50Iiwib3B0aW1pemVSZWN1cnNpdmVEZXNjZW5kYW50cyIsIm9wdGltaXplTnRoT2ZUeXBlIiwiZmluZEluZGV4IiwibnRoT2ZUeXBlIiwib3B0aW1pemVDbGFzc2VzIiwicmVmZXJlbmNlcyIsInJlZmVyZW5jZSIsImRlc2NyaXB0aW9uIiwib3B0aW1pemVycyIsImFjYyIsIm9wdGltaXplciIsImdldFF1ZXJ5U2VsZWN0b3IiLCJnZXRTaW5nbGVTZWxlY3RvclBhdGgiLCJvcHRpbWl6ZWRQYXRoIiwiZ2V0TXVsdGlTZWxlY3RvclBhdGgiLCJhbmNlc3RvclBhdGgiLCJjb21tb25QYXRoIiwiZ2V0Q29tbW9uUGF0aCIsImRlc2NlbmRhbnRQYXR0ZXJuIiwic2VsZWN0b3JQYXRoIiwic2VsZWN0b3JNYXRjaGVzIiwiaW5wdXQiLCJ3aW5kb3ciLCJzdXBwb3J0IiwiRXhwciIsImdldFRleHQiLCJpc1hNTCIsInRva2VuaXplIiwiY29tcGlsZSIsIm91dGVybW9zdENvbnRleHQiLCJzb3J0SW5wdXQiLCJoYXNEdXBsaWNhdGUiLCJzZXREb2N1bWVudCIsImRvY0VsZW0iLCJkb2N1bWVudElzSFRNTCIsInJidWdneVFTQSIsInJidWdneU1hdGNoZXMiLCJleHBhbmRvIiwiRGF0ZSIsInByZWZlcnJlZERvYyIsImRpcnJ1bnMiLCJkb25lIiwiY2xhc3NDYWNoZSIsImNyZWF0ZUNhY2hlIiwidG9rZW5DYWNoZSIsImNvbXBpbGVyQ2FjaGUiLCJub25uYXRpdmVTZWxlY3RvckNhY2hlIiwic29ydE9yZGVyIiwiYiIsImhhc093biIsImhhc093blByb3BlcnR5IiwicHVzaE5hdGl2ZSIsImxpc3QiLCJlbGVtIiwibGVuIiwiYm9vbGVhbnMiLCJ3aGl0ZXNwYWNlIiwiaWRlbnRpZmllciIsInBzZXVkb3MiLCJyd2hpdGVzcGFjZSIsInJ0cmltIiwicmNvbW1hIiwicmNvbWJpbmF0b3JzIiwicmRlc2NlbmQiLCJycHNldWRvIiwicmlkZW50aWZpZXIiLCJtYXRjaEV4cHIiLCJyaHRtbCIsInJpbnB1dHMiLCJyaGVhZGVyIiwicm5hdGl2ZSIsInJxdWlja0V4cHIiLCJyc2libGluZyIsInJ1bmVzY2FwZSIsImZ1bmVzY2FwZSIsImVzY2FwZSIsIm5vbkhleCIsImhpZ2giLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJyY3NzZXNjYXBlIiwiZmNzc2VzY2FwZSIsImNoIiwiYXNDb2RlUG9pbnQiLCJjaGFyQ29kZUF0IiwidW5sb2FkSGFuZGxlciIsImluRGlzYWJsZWRGaWVsZHNldCIsImFkZENvbWJpbmF0b3IiLCJkaXNhYmxlZCIsIm5vZGVOYW1lIiwiZGlyIiwiYXBwbHkiLCJjYWxsIiwiY2hpbGROb2RlcyIsImUiLCJ0YXJnZXQiLCJlbHMiLCJqIiwiY29udGV4dCIsInJlc3VsdHMiLCJzZWVkIiwibSIsIm5pZCIsImdyb3VwcyIsIm5ld1NlbGVjdG9yIiwibmV3Q29udGV4dCIsIm93bmVyRG9jdW1lbnQiLCJleGVjIiwiZ2V0RWxlbWVudEJ5SWQiLCJpZCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInFzYSIsInRlc3RDb250ZXh0Iiwic2NvcGUiLCJzZXRBdHRyaWJ1dGUiLCJ0b1NlbGVjdG9yIiwicXNhRXJyb3IiLCJyZW1vdmVBdHRyaWJ1dGUiLCJjYWNoZSIsImNhY2hlTGVuZ3RoIiwibWFya0Z1bmN0aW9uIiwiZm4iLCJhc3NlcnQiLCJlbCIsImNyZWF0ZUVsZW1lbnQiLCJyZW1vdmVDaGlsZCIsImFkZEhhbmRsZSIsImF0dHJzIiwiaGFuZGxlciIsImF0dHJIYW5kbGUiLCJzaWJsaW5nQ2hlY2siLCJjdXIiLCJkaWZmIiwic291cmNlSW5kZXgiLCJuZXh0U2libGluZyIsImNyZWF0ZUlucHV0UHNldWRvIiwiY3JlYXRlQnV0dG9uUHNldWRvIiwiY3JlYXRlRGlzYWJsZWRQc2V1ZG8iLCJpc0Rpc2FibGVkIiwiY3JlYXRlUG9zaXRpb25hbFBzZXVkbyIsImFyZ3VtZW50IiwibWF0Y2hJbmRleGVzIiwibmFtZXNwYWNlIiwibmFtZXNwYWNlVVJJIiwiZG9jdW1lbnRFbGVtZW50IiwiaGFzQ29tcGFyZSIsInN1YldpbmRvdyIsImRlZmF1bHRWaWV3IiwidG9wIiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dGFjaEV2ZW50IiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVDb21tZW50IiwiZ2V0QnlJZCIsImdldEVsZW1lbnRzQnlOYW1lIiwiYXR0cklkIiwiZ2V0QXR0cmlidXRlTm9kZSIsImVsZW1zIiwidG1wIiwiaW5uZXJIVE1MIiwibWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwibW96TWF0Y2hlc1NlbGVjdG9yIiwib01hdGNoZXNTZWxlY3RvciIsIm1zTWF0Y2hlc1NlbGVjdG9yIiwiZGlzY29ubmVjdGVkTWF0Y2giLCJjb21wYXJlRG9jdW1lbnRQb3NpdGlvbiIsImFkb3duIiwiYnVwIiwic29ydERldGFjaGVkIiwiYXVwIiwiYXAiLCJicCIsImV4cHIiLCJyZXQiLCJhdHRyIiwic3BlY2lmaWVkIiwic2VsIiwiZXJyb3IiLCJtc2ciLCJ1bmlxdWVTb3J0IiwiZHVwbGljYXRlcyIsImRldGVjdER1cGxpY2F0ZXMiLCJzb3J0U3RhYmxlIiwic3BsaWNlIiwic2VsZWN0b3JzIiwiY3JlYXRlUHNldWRvIiwicmVsYXRpdmUiLCJmaXJzdCIsInByZUZpbHRlciIsImV4Y2VzcyIsInVucXVvdGVkIiwibm9kZU5hbWVTZWxlY3RvciIsIm9wZXJhdG9yIiwid2hhdCIsIl9hcmd1bWVudCIsImxhc3QiLCJzaW1wbGUiLCJmb3J3YXJkIiwib2ZUeXBlIiwiX2NvbnRleHQiLCJ4bWwiLCJ1bmlxdWVDYWNoZSIsIm91dGVyQ2FjaGUiLCJub2RlSW5kZXgiLCJzdGFydCIsInVzZUNhY2hlIiwibGFzdENoaWxkIiwidW5pcXVlSUQiLCJhcmdzIiwic2V0RmlsdGVycyIsImlkeCIsIm1hdGNoZWQiLCJtYXRjaGVyIiwidW5tYXRjaGVkIiwibGFuZyIsImVsZW1MYW5nIiwiaGFzaCIsImxvY2F0aW9uIiwiYWN0aXZlRWxlbWVudCIsImhhc0ZvY3VzIiwiaHJlZiIsInRhYkluZGV4IiwiY2hlY2tlZCIsInNlbGVjdGVkIiwic2VsZWN0ZWRJbmRleCIsIl9tYXRjaEluZGV4ZXMiLCJyYWRpbyIsImNoZWNrYm94IiwiZmlsZSIsInBhc3N3b3JkIiwiaW1hZ2UiLCJzdWJtaXQiLCJyZXNldCIsInByb3RvdHlwZSIsImZpbHRlcnMiLCJwYXJzZU9ubHkiLCJ0b2tlbnMiLCJzb0ZhciIsInByZUZpbHRlcnMiLCJjYWNoZWQiLCJjb21iaW5hdG9yIiwiY2hlY2tOb25FbGVtZW50cyIsImRvbmVOYW1lIiwib2xkQ2FjaGUiLCJuZXdDYWNoZSIsImVsZW1lbnRNYXRjaGVyIiwibWF0Y2hlcnMiLCJtdWx0aXBsZUNvbnRleHRzIiwiY29udGV4dHMiLCJjb25kZW5zZSIsIm5ld1VubWF0Y2hlZCIsIm1hcHBlZCIsInNldE1hdGNoZXIiLCJwb3N0RmlsdGVyIiwicG9zdEZpbmRlciIsInBvc3RTZWxlY3RvciIsInRlbXAiLCJwcmVNYXAiLCJwb3N0TWFwIiwicHJlZXhpc3RpbmciLCJtYXRjaGVySW4iLCJtYXRjaGVyT3V0IiwibWF0Y2hlckZyb21Ub2tlbnMiLCJjaGVja0NvbnRleHQiLCJsZWFkaW5nUmVsYXRpdmUiLCJpbXBsaWNpdFJlbGF0aXZlIiwibWF0Y2hDb250ZXh0IiwibWF0Y2hBbnlDb250ZXh0IiwibWF0Y2hlckZyb21Hcm91cE1hdGNoZXJzIiwiZWxlbWVudE1hdGNoZXJzIiwic2V0TWF0Y2hlcnMiLCJieVNldCIsImJ5RWxlbWVudCIsInN1cGVyTWF0Y2hlciIsIm91dGVybW9zdCIsIm1hdGNoZWRDb3VudCIsInNldE1hdGNoZWQiLCJjb250ZXh0QmFja3VwIiwiZGlycnVuc1VuaXF1ZSIsIk1hdGgiLCJyYW5kb20iLCJ0b2tlbiIsImNvbXBpbGVkIiwiX25hbWUiLCJkZWZhdWx0VmFsdWUiLCJfc2l6emxlIiwibm9Db25mbGljdCIsImRlZmluZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJkZWZhdWx0IiwiZ2V0U2luZ2xlU2VsZWN0b3IiLCJnZXRNdWx0aVNlbGVjdG9yIiwiY29tbW9uIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRUE7Ozs7OztBQU1BOzs7Ozs7QUFNTyxJQUFNQSw0Q0FBa0IsU0FBbEJBLGVBQWtCLENBQUNDLEtBQUQsRUFBVztBQUFBLE1BQ2hDQyxNQURnQyxHQUNyQkQsS0FEcUIsQ0FDaENDLE1BRGdDOztBQUV4QyxNQUFNQyxNQUFNLElBQUlDLEtBQUosQ0FBVUYsTUFBVixDQUFaO0FBQ0EsT0FBSyxJQUFJRyxJQUFJLENBQWIsRUFBZ0JBLElBQUlILE1BQXBCLEVBQTRCRyxHQUE1QixFQUFpQztBQUMvQkYsUUFBSUUsQ0FBSixJQUFTSixNQUFNSSxDQUFOLENBQVQ7QUFDRDtBQUNELFNBQU9GLEdBQVA7QUFDRCxDQVBNOztBQVNQOzs7Ozs7OztBQVFPLElBQU1HLG9DQUFjLFNBQWRBLFdBQWMsQ0FBQ0MsS0FBRDtBQUFBLFNBQ3pCQSxTQUFTQSxNQUFNQyxPQUFOLENBQWMscUNBQWQsRUFBcUQsTUFBckQsRUFDTkEsT0FETSxDQUNFLEtBREYsRUFDUyxNQURULENBRGdCO0FBQUEsQ0FBcEI7O0FBSVA7OztBQUdPLElBQU1DLGdDQUFZLFNBQVpBLFNBQVksQ0FBQ0MsS0FBRCxFQUFRQyxTQUFSO0FBQUEsU0FDdkJELE1BQU1FLE1BQU4sQ0FDRSxnQkFBaUJDLElBQWpCO0FBQUE7QUFBQSxRQUFFQyxLQUFGO0FBQUEsUUFBU0MsS0FBVDs7QUFBQSxXQUEwQkosVUFBVUUsSUFBVixJQUFrQixDQUFDQyxNQUFNRSxNQUFOLENBQWFILElBQWIsQ0FBRCxFQUFxQkUsS0FBckIsQ0FBbEIsR0FBZ0QsQ0FBQ0QsS0FBRCxFQUFRQyxNQUFNQyxNQUFOLENBQWFILElBQWIsQ0FBUixDQUExRTtBQUFBLEdBREYsRUFFRSxDQUFDLEVBQUQsRUFBSyxFQUFMLENBRkYsQ0FEdUI7QUFBQSxDQUFsQjs7QUFRUDs7Ozs7Ozs7Ozs7OztBQWFPLElBQU1JLHNEQUF1QixTQUF2QkEsb0JBQXVCLENBQUNWLEtBQUQ7QUFBQSxTQUNsQyxDQUFDLENBQUNBLEtBQUYsSUFBVyxDQUFDLHFCQUFxQlcsSUFBckIsQ0FBMEJYLEtBQTFCLENBQVosSUFBZ0QsQ0FBQyw0Q0FBNENXLElBQTVDLENBQWlEWCxLQUFqRCxDQURmO0FBQUEsQ0FBN0IsQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pEUDs7QUFDQTs7Ozs7Ozs7OztBQVVBOzs7Ozs7QUFNTyxJQUFNWSx3Q0FBZ0IsU0FBaEJBLGFBQWdCO0FBQUEsTUFBQ0MsSUFBRCx1RUFBUSxFQUFSO0FBQUEsb0JBQ3hCQyxZQUFZLEVBRFksRUFDUkMsU0FBUyxFQURELEVBQ0tDLFFBQVEsRUFEYixFQUNpQkMsYUFBYSxFQUQ5QixJQUNxQ0osSUFEckM7QUFBQSxDQUF0Qjs7QUFHUDs7Ozs7O0FBTU8sSUFBTUssc0RBQXVCLFNBQXZCQSxvQkFBdUIsQ0FBQ0osVUFBRDtBQUFBLFNBQ2xDQSxXQUFXSyxHQUFYLENBQWUsZ0JBQXFCO0FBQUEsUUFBbEJDLElBQWtCLFFBQWxCQSxJQUFrQjtBQUFBLFFBQVpwQixLQUFZLFFBQVpBLEtBQVk7O0FBQ2xDLFFBQUlBLFVBQVUsSUFBZCxFQUFvQjtBQUNsQixtQkFBV29CLElBQVg7QUFDRDtBQUNELFFBQUlBLFNBQVMsSUFBVCxJQUFpQixxQ0FBcUJwQixLQUFyQixDQUFyQixFQUFrRDtBQUNoRCxtQkFBV0EsS0FBWDtBQUNEO0FBQ0QsaUJBQVdvQixJQUFYLFVBQW9CcEIsS0FBcEI7QUFDRCxHQVJELEVBUUdxQixJQVJILENBUVEsRUFSUixDQURrQztBQUFBLENBQTdCOztBQVdQOzs7Ozs7QUFNTyxJQUFNQyxnREFBb0IsU0FBcEJBLGlCQUFvQixDQUFDUCxPQUFEO0FBQUEsU0FDL0JBLFFBQVFJLEdBQVIsQ0FBWTtBQUFBLFdBQUsscUNBQXFCSSxDQUFyQixVQUE4QkEsQ0FBOUIsaUJBQWdEQSxDQUFoRCxPQUFMO0FBQUEsR0FBWixFQUF3RUYsSUFBeEUsQ0FBNkUsRUFBN0UsQ0FEK0I7QUFBQSxDQUExQjs7QUFHUDs7Ozs7O0FBTU8sSUFBTUcsOENBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBQ1IsTUFBRDtBQUFBLFNBQVlBLE9BQU9yQixNQUFQLFNBQW9CcUIsT0FBT0ssSUFBUCxDQUFZLEdBQVosQ0FBcEIsR0FBeUMsRUFBckQ7QUFBQSxDQUF6Qjs7QUFFUDs7Ozs7O0FBTU8sSUFBTUksZ0RBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsT0FBRCxFQUFhO0FBQUEsTUFDcENDLE9BRG9DLEdBQ1VELE9BRFYsQ0FDcENDLE9BRG9DO0FBQUEsTUFDM0JDLEdBRDJCLEdBQ1VGLE9BRFYsQ0FDM0JFLEdBRDJCO0FBQUEsTUFDdEJkLFVBRHNCLEdBQ1VZLE9BRFYsQ0FDdEJaLFVBRHNCO0FBQUEsTUFDVkMsT0FEVSxHQUNVVyxPQURWLENBQ1ZYLE9BRFU7QUFBQSxNQUNEQyxNQURDLEdBQ1VVLE9BRFYsQ0FDRFYsTUFEQzs7QUFFNUMsTUFBTWhCLGNBQ0oyQixZQUFZLE9BQVosR0FBc0IsSUFBdEIsR0FBNkIsRUFEekIsS0FHSkMsT0FBTyxFQUhILElBS0pWLHFCQUFxQkosVUFBckIsQ0FMSSxHQU9KUSxrQkFBa0JQLE9BQWxCLENBUEksR0FTSlMsaUJBQWlCUixNQUFqQixDQVRGO0FBV0EsU0FBT2hCLEtBQVA7QUFDRCxDQWRNOztBQWdCUDs7Ozs7O0FBTU8sSUFBTTZCLDBDQUFpQixTQUFqQkEsY0FBaUIsQ0FBQ0MsSUFBRDtBQUFBLFNBQzVCQSxLQUFLWCxHQUFMLENBQVNNLGlCQUFULEVBQTRCSixJQUE1QixDQUFpQyxHQUFqQyxDQUQ0QjtBQUFBLENBQXZCOztBQUlQLElBQU1VLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQy9CLEtBQUQ7QUFBQSxTQUN0QkEsU0FBU0EsTUFBTUMsT0FBTixDQUFjLHVDQUFkLEVBQXVELElBQXZELEVBQ05BLE9BRE0sQ0FDRSxXQURGLEVBQ2UsTUFEZixFQUVOQSxPQUZNLENBRUUsT0FGRixFQUVXLElBRlgsQ0FEYTtBQUFBLENBQXhCOztBQUtBOzs7Ozs7QUFNTyxJQUFNK0IsZ0RBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBQ2xCLFVBQUQ7QUFBQSxTQUMvQkEsV0FBV0ssR0FBWCxDQUFlLGlCQUFxQjtBQUFBLFFBQWxCQyxJQUFrQixTQUFsQkEsSUFBa0I7QUFBQSxRQUFacEIsS0FBWSxTQUFaQSxLQUFZOztBQUNsQyxRQUFJQSxVQUFVLElBQWQsRUFBb0I7QUFDbEIsb0JBQVlvQixJQUFaO0FBQ0Q7QUFDRCxrQkFBWUEsSUFBWixVQUFxQlcsZ0JBQWdCL0IsS0FBaEIsQ0FBckI7QUFDRCxHQUxELEVBS0dxQixJQUxILENBS1EsRUFMUixDQUQrQjtBQUFBLENBQTFCOztBQVFQOzs7Ozs7QUFNTyxJQUFNWSwwQ0FBaUIsU0FBakJBLGNBQWlCLENBQUNsQixPQUFEO0FBQUEsU0FDNUJBLFFBQVFJLEdBQVIsQ0FBWTtBQUFBLG9FQUE0REksQ0FBNUQ7QUFBQSxHQUFaLEVBQWlGRixJQUFqRixDQUFzRixFQUF0RixDQUQ0QjtBQUFBLENBQXZCOztBQUdQOzs7Ozs7QUFNTyxJQUFNYSx3Q0FBZ0IsU0FBaEJBLGFBQWdCLENBQUNsQixNQUFEO0FBQUEsU0FDM0JBLE9BQU9HLEdBQVAsQ0FBVyxhQUFLO0FBQ2QsUUFBTWdCLFFBQVFDLEVBQUVELEtBQUYsQ0FBUSw0Q0FBUixDQUFkO0FBQ0EsUUFBSSxDQUFDQSxLQUFMLEVBQVk7QUFDVixhQUFPLEVBQVA7QUFDRDs7QUFFRCxZQUFRQSxNQUFNLENBQU4sQ0FBUjtBQUNFLFdBQUssV0FBTDtBQUNFLHVEQUE2Q0EsTUFBTSxDQUFOLENBQTdDOztBQUVGLFdBQUssYUFBTDtBQUNFLHFCQUFXQSxNQUFNLENBQU4sQ0FBWDs7QUFFRixXQUFLLFVBQUw7QUFDRSxxQ0FBMkJBLE1BQU0sQ0FBTixDQUEzQjs7QUFFRjtBQUNFLGVBQU8sRUFBUDtBQVhKO0FBYUQsR0FuQkQsRUFtQkdkLElBbkJILENBbUJRLEVBbkJSLENBRDJCO0FBQUEsQ0FBdEI7O0FBc0JQOzs7Ozs7QUFNTyxJQUFNZ0IsMENBQWlCLFNBQWpCQSxjQUFpQixDQUFDWCxPQUFELEVBQWE7QUFBQSxNQUNqQ0MsT0FEaUMsR0FDMEJELE9BRDFCLENBQ2pDQyxPQURpQztBQUFBLE1BQ3hCQyxHQUR3QixHQUMwQkYsT0FEMUIsQ0FDeEJFLEdBRHdCO0FBQUEsTUFDbkJkLFVBRG1CLEdBQzBCWSxPQUQxQixDQUNuQlosVUFEbUI7QUFBQSxNQUNQQyxPQURPLEdBQzBCVyxPQUQxQixDQUNQWCxPQURPO0FBQUEsTUFDRUMsTUFERixHQUMwQlUsT0FEMUIsQ0FDRVYsTUFERjtBQUFBLE1BQ1VDLFdBRFYsR0FDMEJTLE9BRDFCLENBQ1VULFdBRFY7O0FBRXpDLE1BQU1qQixjQUNKMkIsWUFBWSxPQUFaLEdBQXNCLEdBQXRCLEdBQTRCLElBRHhCLEtBR0pDLE9BQU8sR0FISCxJQUtKSSxrQkFBa0JsQixVQUFsQixDQUxJLEdBT0ptQixlQUFlbEIsT0FBZixDQVBJLEdBU0ptQixjQUFjbEIsTUFBZCxDQVRJLEdBV0pzQixtQkFBbUJyQixXQUFuQixDQVhGO0FBYUEsU0FBT2pCLEtBQVA7QUFDRCxDQWhCTTs7QUFrQlA7Ozs7OztBQU1PLElBQU11QyxvQ0FBYyxTQUFkQSxXQUFjLENBQUNULElBQUQ7QUFBQSxlQUFjQSxLQUFLWCxHQUFMLENBQVNrQixjQUFULEVBQXlCaEIsSUFBekIsQ0FBOEIsRUFBOUIsQ0FBZDtBQUFBLENBQXBCOztBQUVQOzs7Ozs7QUFNTyxJQUFNaUIsa0RBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBQ0UsUUFBRDtBQUFBLFNBQ2hDQSxTQUFTN0MsTUFBVCxTQUFzQjZDLFNBQVNyQixHQUFULENBQWFvQixXQUFiLEVBQTBCbEIsSUFBMUIsQ0FBK0IsSUFBL0IsQ0FBdEIsU0FBZ0UsRUFEaEM7QUFBQSxDQUEzQjs7QUFJUCxJQUFNb0IsV0FBVztBQUNmLFNBQU87QUFDTDNCLGdCQUFZSSxvQkFEUDtBQUVMSCxhQUFTTyxpQkFGSjtBQUdMTixZQUFRUSxnQkFISDtBQUlMRSxhQUFTRCxpQkFKSjtBQUtMSyxVQUFNRDtBQUxELEdBRFE7QUFRZixXQUFTO0FBQ1BmLGdCQUFZa0IsaUJBREw7QUFFUGpCLGFBQVNrQixjQUZGO0FBR1BqQixZQUFRa0IsYUFIRDtBQUlQUixhQUFTVyxjQUpGO0FBS1BQLFVBQU1TO0FBTEMsR0FSTTtBQWVmLFlBQVU7QUFmSyxDQUFqQjs7QUFrQkFFLFNBQVNDLE1BQVQsR0FBa0JELFNBQVNFLEdBQTNCO0FBQ0FGLFNBQVMsQ0FBVCxJQUFjQSxTQUFTRSxHQUF2QjtBQUNBRixTQUFTLENBQVQsSUFBY0EsU0FBU0csS0FBdkI7O0FBRUE7Ozs7Ozs7OztBQVNBOzs7OztBQUtPLElBQU1DLG9DQUFjLFNBQWRBLFdBQWM7QUFBQSxNQUFDQyxPQUFELHVFQUFXLEVBQVg7QUFBQSxTQUN6QkwsU0FBU0ssUUFBUUMsTUFBUixJQUFrQixLQUEzQixDQUR5QjtBQUFBLENBQXBCLEM7Ozs7Ozs7Ozs7OztBQzVOUDtBQUNBLElBQUlDLGVBQUo7O0FBRUE7Ozs7OztBQU1BLElBQU1DLGVBQWUsU0FBZkEsWUFBZSxDQUFDQyxRQUFELEVBQTZCO0FBQUEsTUFBbEJDLE1BQWtCLHVFQUFULElBQVM7O0FBQ2hELE1BQUksQ0FBQ0gsTUFBTCxFQUFhO0FBQ1hBLGFBQVMsbUJBQUFJLENBQVEsQ0FBUixDQUFUO0FBQ0Q7QUFDRCxTQUFPSixPQUFPRSxRQUFQLEVBQWlCQyxVQUFVRSxRQUEzQixDQUFQO0FBQ0QsQ0FMRDs7QUFPQTs7Ozs7O0FBTUEsSUFBTUMsY0FBYyxTQUFkQSxXQUFjLENBQUNKLFFBQUQsRUFBNkI7QUFBQSxNQUFsQkMsTUFBa0IsdUVBQVQsSUFBUzs7QUFDL0NBLFdBQVVBLFVBQVVFLFFBQXBCO0FBQ0EsTUFBSUUsTUFBTUosTUFBVjtBQUNBLFNBQU9JLElBQUlDLFVBQVgsRUFBdUI7QUFDckJELFVBQU1BLElBQUlDLFVBQVY7QUFDRDtBQUNELE1BQUlELFFBQVFKLE1BQVIsSUFBa0IsQ0FBQ0QsU0FBU08sVUFBVCxDQUFvQixHQUFwQixDQUF2QixFQUFpRDtBQUMvQ1AscUJBQWVBLFFBQWY7QUFDRDtBQUNELE1BQUlRLFdBQVdILElBQUlJLFFBQUosQ0FBYVQsUUFBYixFQUF1QkMsTUFBdkIsRUFBK0IsSUFBL0IsRUFBcUMsQ0FBckMsQ0FBZjtBQUNBLE1BQUlTLFdBQVcsRUFBZjtBQUNBLE1BQUlDLE9BQUo7QUFDQSxTQUFRQSxVQUFVSCxTQUFTSSxXQUFULEVBQWxCLEVBQTJDO0FBQ3pDRixhQUFTRyxJQUFULENBQWNGLE9BQWQ7QUFDRDtBQUNELFNBQU9ELFFBQVA7QUFDRCxDQWhCRDs7QUFrQkE7Ozs7OztBQU1BLElBQU1JLFlBQVksU0FBWkEsU0FBWSxDQUFDZCxRQUFEO0FBQUEsTUFBV0MsTUFBWCx1RUFBb0IsSUFBcEI7QUFBQSxTQUNoQixDQUFDQSxVQUFVRSxRQUFYLEVBQXFCWSxnQkFBckIsQ0FBc0NmLFFBQXRDLENBRGdCO0FBQUEsQ0FBbEI7O0FBR0EsSUFBTWdCLFNBQVM7QUFDYixTQUFPRixTQURNO0FBRWIsV0FBU1YsV0FGSTtBQUdiLFlBQVVMO0FBSEcsQ0FBZjs7QUFNQWlCLE9BQU8sQ0FBUCxJQUFZQSxPQUFPdkIsR0FBbkI7QUFDQXVCLE9BQU8sQ0FBUCxJQUFZQSxPQUFPdEIsS0FBbkI7O0FBRUE7Ozs7O0FBS08sSUFBTXVCLGdDQUFZLFNBQVpBLFNBQVk7QUFBQSxNQUFDckIsT0FBRCx1RUFBVyxFQUFYO0FBQUEsU0FDdkIsVUFBQ0ksUUFBRCxFQUFXQyxNQUFYLEVBQXNCO0FBQ3BCLFFBQUk7QUFDRixhQUFPZSxPQUFPcEIsUUFBUUMsTUFBUixJQUFrQixLQUF6QixFQUFnQ0csUUFBaEMsRUFBMENDLFVBQVVMLFFBQVFzQixJQUE1RCxDQUFQO0FBQ0QsS0FGRCxDQUVFLE9BQU9DLEdBQVAsRUFBWTtBQUNaLGFBQU8sRUFBUDtBQUNEO0FBQ0YsR0FQc0I7QUFBQSxDQUFsQixDOzs7Ozs7Ozs7Ozs7QUMvRFA7Ozs7OztBQU1BOzs7O0FBSUE7Ozs7Ozs7QUFPTyxJQUFNQyxnREFBb0IsU0FBcEJBLGlCQUFvQixDQUFDVixRQUFELEVBQTRCO0FBQUEsTUFBakJkLE9BQWlCLHVFQUFQLEVBQU87QUFBQSxzQkFJdkRBLE9BSnVELENBR3pEc0IsSUFIeUQ7QUFBQSxNQUd6REEsSUFIeUQsaUNBR2xEZixRQUhrRDs7O0FBTTNELE1BQU1rQixZQUFZLEVBQWxCOztBQUVBWCxXQUFTWSxPQUFULENBQWlCLFVBQUNYLE9BQUQsRUFBVVksS0FBVixFQUFvQjtBQUNuQyxRQUFNQyxVQUFVLEVBQWhCO0FBQ0EsV0FBT2IsWUFBWU8sSUFBbkIsRUFBeUI7QUFDdkJQLGdCQUFVQSxRQUFRTCxVQUFsQjtBQUNBa0IsY0FBUUMsT0FBUixDQUFnQmQsT0FBaEI7QUFDRDtBQUNEVSxjQUFVRSxLQUFWLElBQW1CQyxPQUFuQjtBQUNELEdBUEQ7O0FBU0FILFlBQVVLLElBQVYsQ0FBZSxVQUFDQyxJQUFELEVBQU9DLElBQVA7QUFBQSxXQUFnQkQsS0FBS2xGLE1BQUwsR0FBY21GLEtBQUtuRixNQUFuQztBQUFBLEdBQWY7O0FBRUEsTUFBTW9GLGtCQUFrQlIsVUFBVVMsS0FBVixFQUF4Qjs7QUFFQSxNQUFJQyxXQUFXLElBQWY7O0FBckIyRDtBQXdCekQsUUFBTTlCLFNBQVM0QixnQkFBZ0JqRixDQUFoQixDQUFmO0FBQ0EsUUFBTW9GLFVBQVVYLFVBQVVZLElBQVYsQ0FBZSxVQUFDQyxZQUFELEVBQWtCO0FBQy9DLGFBQU8sQ0FBQ0EsYUFBYUQsSUFBYixDQUFrQixVQUFDRSxXQUFEO0FBQUEsZUFBaUJBLGdCQUFnQmxDLE1BQWpDO0FBQUEsT0FBbEIsQ0FBUjtBQUNELEtBRmUsQ0FBaEI7O0FBSUEsUUFBSStCLE9BQUosRUFBYTtBQUNYO0FBQ0E7QUFDRDs7QUFFREQsZUFBVzlCLE1BQVg7QUFsQ3lEOztBQXVCM0QsT0FBSyxJQUFJckQsSUFBSSxDQUFSLEVBQVd3RixJQUFJUCxnQkFBZ0JwRixNQUFwQyxFQUE0Q0csSUFBSXdGLENBQWhELEVBQW1EeEYsR0FBbkQsRUFBd0Q7QUFBQTs7QUFBQSwwQkFRcEQ7QUFJSDs7QUFFRCxTQUFPbUYsUUFBUDtBQUNELENBdENNOztBQXdDUDs7Ozs7O0FBTU8sSUFBTU0sb0RBQXNCLFNBQXRCQSxtQkFBc0IsQ0FBQzNCLFFBQUQsRUFBNEI7QUFBQSxNQUFqQmQsT0FBaUIsdUVBQVAsRUFBTztBQUFBLHdCQUNyQ0EsT0FEcUMsQ0FDckQwQyxNQURxRDtBQUFBLE1BQ3JEQSxNQURxRCxtQ0FDNUMsRUFENEM7OztBQUc3RCxNQUFNQyxtQkFBbUI7QUFDdkIxRSxhQUFTLEVBRGM7QUFFdkJELGdCQUFZLEVBRlc7QUFHdkJjLFNBQUs7QUFIa0IsR0FBekI7O0FBTUFnQyxXQUFTWSxPQUFULENBQWlCLFVBQUNYLE9BQUQsRUFBYTtBQUFBLFFBR2pCNkIsYUFIaUIsR0FNeEJELGdCQU53QixDQUcxQjFFLE9BSDBCO0FBQUEsUUFJZDRFLGdCQUpjLEdBTXhCRixnQkFOd0IsQ0FJMUIzRSxVQUowQjtBQUFBLFFBS3JCOEUsU0FMcUIsR0FNeEJILGdCQU53QixDQUsxQjdELEdBTDBCOztBQVE1Qjs7QUFDQSxRQUFJOEQsa0JBQWtCRyxTQUF0QixFQUFpQztBQUMvQixVQUFJOUUsVUFBVThDLFFBQVFpQyxZQUFSLENBQXFCLE9BQXJCLENBQWQ7QUFDQSxVQUFJL0UsT0FBSixFQUFhO0FBQ1hBLGtCQUFVQSxRQUFRZ0YsSUFBUixHQUFlQyxLQUFmLENBQXFCLEdBQXJCLEVBQTBCQyxNQUExQixDQUFpQztBQUFBLGlCQUFPLENBQUNULE9BQU9VLEtBQVIsSUFBaUIsQ0FBQ1YsT0FBT1UsS0FBUCxDQUFhQyxHQUFiLENBQXpCO0FBQUEsU0FBakMsQ0FBVjtBQUNBLFlBQUksQ0FBQ1QsY0FBYy9GLE1BQW5CLEVBQTJCO0FBQ3pCOEYsMkJBQWlCMUUsT0FBakIsR0FBMkJBLE9BQTNCO0FBQ0QsU0FGRCxNQUVPO0FBQ0wyRSwwQkFBZ0JBLGNBQWNPLE1BQWQsQ0FBcUIsVUFBQ0csS0FBRDtBQUFBLG1CQUFXckYsUUFBUW9FLElBQVIsQ0FBYSxVQUFDL0QsSUFBRDtBQUFBLHFCQUFVQSxTQUFTZ0YsS0FBbkI7QUFBQSxhQUFiLENBQVg7QUFBQSxXQUFyQixDQUFoQjtBQUNBLGNBQUlWLGNBQWMvRixNQUFsQixFQUEwQjtBQUN4QjhGLDZCQUFpQjFFLE9BQWpCLEdBQTJCMkUsYUFBM0I7QUFDRCxXQUZELE1BRU87QUFDTCxtQkFBT0QsaUJBQWlCMUUsT0FBeEI7QUFDRDtBQUNGO0FBQ0YsT0FaRCxNQVlPO0FBQ0wsZUFBTzBFLGlCQUFpQjFFLE9BQXhCO0FBQ0Q7QUFDRjs7QUFFRDtBQUNBLFFBQUk0RSxxQkFBcUJFLFNBQXpCLEVBQW9DO0FBQ2xDLFVBQU1RLG9CQUFvQnhDLFFBQVEvQyxVQUFsQztBQUNBLFVBQU1BLGFBQWF3RixPQUFPQyxJQUFQLENBQVlGLGlCQUFaLEVBQStCaEcsTUFBL0IsQ0FBc0MsVUFBQ1MsVUFBRCxFQUFhMEYsR0FBYixFQUFxQjtBQUM1RSxZQUFNQyxZQUFZSixrQkFBa0JHLEdBQWxCLENBQWxCO0FBQ0EsWUFBTUUsZ0JBQWdCRCxVQUFVckYsSUFBaEM7QUFDQSxZQUFJcUYsYUFBYUMsa0JBQWtCLE9BQS9CLEtBQTJDLENBQUNsQixPQUFPaUIsU0FBUixJQUFxQixDQUFDakIsT0FBT2lCLFNBQVAsQ0FBaUJDLGFBQWpCLEVBQWdDRCxVQUFVekcsS0FBMUMsQ0FBakUsQ0FBSixFQUF3SDtBQUN0SGMscUJBQVc0RixhQUFYLElBQTRCRCxVQUFVekcsS0FBdEM7QUFDRDtBQUNELGVBQU9jLFVBQVA7QUFDRCxPQVBrQixFQU9oQixFQVBnQixDQUFuQjs7QUFTQSxVQUFNNkYsa0JBQWtCTCxPQUFPQyxJQUFQLENBQVl6RixVQUFaLENBQXhCO0FBQ0EsVUFBTThGLHdCQUF3Qk4sT0FBT0MsSUFBUCxDQUFZWixnQkFBWixDQUE5Qjs7QUFFQSxVQUFJZ0IsZ0JBQWdCaEgsTUFBcEIsRUFBNEI7QUFDMUIsWUFBSSxDQUFDaUgsc0JBQXNCakgsTUFBM0IsRUFBbUM7QUFDakM4RiwyQkFBaUIzRSxVQUFqQixHQUE4QkEsVUFBOUI7QUFDRCxTQUZELE1BRU87QUFDTDZFLDZCQUFtQmlCLHNCQUFzQnZHLE1BQXRCLENBQTZCLFVBQUN3RyxvQkFBRCxFQUF1QnpGLElBQXZCLEVBQWdDO0FBQzlFLGdCQUFNcEIsUUFBUTJGLGlCQUFpQnZFLElBQWpCLENBQWQ7QUFDQSxnQkFBSXBCLFVBQVVjLFdBQVdNLElBQVgsQ0FBZCxFQUFnQztBQUM5QnlGLG1DQUFxQnpGLElBQXJCLElBQTZCcEIsS0FBN0I7QUFDRDtBQUNELG1CQUFPNkcsb0JBQVA7QUFDRCxXQU5rQixFQU1oQixFQU5nQixDQUFuQjtBQU9BLGNBQUlQLE9BQU9DLElBQVAsQ0FBWVosZ0JBQVosRUFBOEJoRyxNQUFsQyxFQUEwQztBQUN4QzhGLDZCQUFpQjNFLFVBQWpCLEdBQThCNkUsZ0JBQTlCO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsbUJBQU9GLGlCQUFpQjNFLFVBQXhCO0FBQ0Q7QUFDRjtBQUNGLE9BakJELE1BaUJPO0FBQ0wsZUFBTzJFLGlCQUFpQjNFLFVBQXhCO0FBQ0Q7QUFDRjs7QUFFRDtBQUNBLFFBQUk4RSxjQUFjQyxTQUFsQixFQUE2QjtBQUMzQixVQUFNakUsTUFBTWlDLFFBQVFpRCxPQUFSLENBQWdCQyxXQUFoQixFQUFaO0FBQ0EsVUFBSSxDQUFDbkIsU0FBTCxFQUFnQjtBQUNkSCx5QkFBaUI3RCxHQUFqQixHQUF1QkEsR0FBdkI7QUFDRCxPQUZELE1BRU8sSUFBSUEsUUFBUWdFLFNBQVosRUFBdUI7QUFDNUIsZUFBT0gsaUJBQWlCN0QsR0FBeEI7QUFDRDtBQUNGO0FBQ0YsR0ExRUQ7O0FBNEVBLFNBQU82RCxnQkFBUDtBQUNELENBdEZNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7a1FDL0RQOzs7Ozs7a0JBMEN3QnRELEs7O0FBcEN4Qjs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7QUFNQSxJQUFNNkUsZ0JBQWdCO0FBQ3BCUCxXQURvQixxQkFDVEMsYUFEUyxFQUNNO0FBQ3hCLFdBQU8sQ0FDTCxPQURLLEVBRUwsY0FGSyxFQUdMLHFCQUhLLEVBSUxPLE9BSkssQ0FJR1AsYUFKSCxJQUlvQixDQUFDLENBSjVCO0FBS0QsR0FQbUI7O0FBUXBCUSxZQUFVO0FBQUEsV0FBTSxJQUFOO0FBQUE7QUFSVSxDQUF0Qjs7QUFXTyxJQUFNQyxvQ0FBYyxTQUFkQSxXQUFjO0FBQUEsTUFBQ3JFLE9BQUQsdUVBQVcsRUFBWDtBQUFBLHNCQUN0QkEsT0FEc0I7QUFFekJzQixVQUFNdEIsUUFBUXNCLElBQVIsSUFBZ0JmLFFBRkc7QUFHekIrRCxVQUFNdEUsUUFBUXNFLElBQVIsSUFBZ0IsSUFIRztBQUl6QkMsY0FBVXZFLFFBQVF1RSxRQUFSLElBQW9CLENBQUMsSUFBRCxFQUFPLE9BQVAsRUFBZ0IsTUFBaEIsRUFBd0IsS0FBeEIsQ0FKTDtBQUt6QjdCLFlBQVExQyxRQUFRMEMsTUFBUixJQUFrQjtBQUxEO0FBQUEsQ0FBcEI7O0FBUVA7Ozs7Ozs7QUFPZSxTQUFTckQsS0FBVCxDQUFnQm1GLElBQWhCLEVBQW9EO0FBQUEsTUFBOUJ4RSxPQUE4Qix1RUFBcEIsRUFBb0I7QUFBQSxNQUFoQnlFLE1BQWdCLHVFQUFQLEtBQU87O0FBQ2pFekUsWUFBVXFFLFlBQVlyRSxPQUFaLENBQVY7QUFEaUUsaUJBRTFCQSxPQUYwQjtBQUFBLE1BRXpEc0IsSUFGeUQsWUFFekRBLElBRnlEO0FBQUEsTUFFbkRnRCxJQUZtRCxZQUVuREEsSUFGbUQ7QUFBQSxNQUU3QzVCLE1BRjZDLFlBRTdDQSxNQUY2QztBQUFBLE1BRXJDekMsTUFGcUMsWUFFckNBLE1BRnFDOzs7QUFJakUsTUFBTWpCLE9BQU8sRUFBYjtBQUNBLE1BQUkrQixVQUFVeUQsSUFBZDtBQUNBLE1BQUkzSCxTQUFTbUMsS0FBS25DLE1BQWxCO0FBQ0EsTUFBTXVFLFNBQVMseUJBQVVwQixPQUFWLENBQWY7QUFDQSxNQUFNTCxXQUFXLDBCQUFZSyxPQUFaLENBQWpCOztBQUVBLE1BQU0wRSxjQUFjSixRQUFRLENBQUN2SCxNQUFNNEgsT0FBTixDQUFjTCxJQUFkLElBQXNCQSxJQUF0QixHQUE2QixDQUFDQSxJQUFELENBQTlCLEVBQXNDakcsR0FBdEMsQ0FBMEMsVUFBQ2lGLEtBQUQsRUFBVztBQUMvRSxRQUFJLE9BQU9BLEtBQVAsS0FBaUIsVUFBckIsRUFBaUM7QUFDL0IsYUFBTyxVQUFDdkMsT0FBRDtBQUFBLGVBQWFBLFlBQVl1QyxLQUF6QjtBQUFBLE9BQVA7QUFDRDtBQUNELFdBQU9BLEtBQVA7QUFDRCxHQUwyQixDQUE1Qjs7QUFPQSxNQUFNc0IsYUFBYSxTQUFiQSxVQUFhLENBQUM3RCxPQUFELEVBQWE7QUFDOUIsV0FBT3VELFFBQVFJLFlBQVlyQyxJQUFaLENBQWlCLFVBQUN3QyxPQUFEO0FBQUEsYUFBYUEsUUFBUTlELE9BQVIsQ0FBYjtBQUFBLEtBQWpCLENBQWY7QUFDRCxHQUZEOztBQUlBeUMsU0FBT0MsSUFBUCxDQUFZZixNQUFaLEVBQW9CaEIsT0FBcEIsQ0FBNEIsVUFBQ29ELElBQUQsRUFBVTtBQUNwQyxRQUFJeEgsWUFBWW9GLE9BQU9vQyxJQUFQLENBQWhCO0FBQ0EsUUFBSSxPQUFPeEgsU0FBUCxLQUFxQixVQUF6QixFQUFxQztBQUNyQyxRQUFJLE9BQU9BLFNBQVAsS0FBcUIsUUFBekIsRUFBbUM7QUFDakNBLGtCQUFZQSxVQUFVcUMsUUFBVixFQUFaO0FBQ0Q7QUFDRCxRQUFJLE9BQU9yQyxTQUFQLEtBQXFCLFFBQXpCLEVBQW1DO0FBQ2pDQSxrQkFBWSxJQUFJeUgsTUFBSixDQUFXLDRCQUFZekgsU0FBWixFQUF1QkgsT0FBdkIsQ0FBK0IsS0FBL0IsRUFBc0MsTUFBdEMsQ0FBWCxDQUFaO0FBQ0Q7QUFDRCxRQUFJLE9BQU9HLFNBQVAsS0FBcUIsU0FBekIsRUFBb0M7QUFDbENBLGtCQUFZQSxZQUFZLE1BQVosR0FBcUIsSUFBakM7QUFDRDtBQUNEO0FBQ0FvRixXQUFPb0MsSUFBUCxJQUFlLFVBQUN4RyxJQUFELEVBQU9wQixLQUFQO0FBQUEsYUFBaUJJLFVBQVVPLElBQVYsQ0FBZVgsS0FBZixDQUFqQjtBQUFBLEtBQWY7QUFDRCxHQWREOztBQWdCQSxTQUFPNkQsWUFBWU8sSUFBWixJQUFvQlAsUUFBUWlFLFFBQVIsS0FBcUIsRUFBaEQsRUFBb0Q7QUFDbEQsUUFBSUosV0FBVzdELE9BQVgsTUFBd0IsSUFBNUIsRUFBa0M7QUFDaEM7QUFDQSxVQUFJa0UsZ0JBQWdCbEUsT0FBaEIsRUFBeUIvQixJQUF6QixFQUErQmdCLE9BQS9CLEVBQXdDb0IsTUFBeEMsRUFBZ0R6QixRQUFoRCxFQUEwRDJCLElBQTFELENBQUosRUFBcUU7QUFDckUsVUFBSTRELFNBQVNuRSxPQUFULEVBQWtCL0IsSUFBbEIsRUFBd0JnQixPQUF4QixFQUFpQ29CLE1BQWpDLEVBQXlDekIsUUFBekMsRUFBbUQyQixJQUFuRCxDQUFKLEVBQThEOztBQUU5RDtBQUNBMkQsc0JBQWdCbEUsT0FBaEIsRUFBeUIvQixJQUF6QixFQUErQmdCLE9BQS9CLEVBQXdDb0IsTUFBeEMsRUFBZ0R6QixRQUFoRDtBQUNBLFVBQUlYLEtBQUtuQyxNQUFMLEtBQWdCQSxNQUFwQixFQUE0QjtBQUMxQnFJLGlCQUFTbkUsT0FBVCxFQUFrQi9CLElBQWxCLEVBQXdCZ0IsT0FBeEIsRUFBaUNvQixNQUFqQyxFQUF5Q3pCLFFBQXpDO0FBQ0Q7O0FBRUQsVUFBSVgsS0FBS25DLE1BQUwsS0FBZ0JBLE1BQWhCLElBQTBCLENBQUMsQ0FBRCxFQUFJLE9BQUosRUFBYXNJLFFBQWIsQ0FBc0JsRixNQUF0QixDQUExQixJQUEyRCxDQUFDd0UsTUFBNUQsSUFBc0UxRCxZQUFZeUQsSUFBdEYsRUFBNEY7QUFDMUZZLGtDQUEwQnJFLE9BQTFCLEVBQW1DL0IsSUFBbkMsRUFBeUNnQixPQUF6QyxFQUFrRG9CLE1BQWxELEVBQTBEekIsUUFBMUQ7QUFDRDs7QUFFRCxVQUFJWCxLQUFLbkMsTUFBTCxLQUFnQkEsTUFBaEIsSUFBMEIsQ0FBQyxDQUFELEVBQUksT0FBSixFQUFhLFFBQWIsRUFBdUJzSSxRQUF2QixDQUFnQ2xGLE1BQWhDLENBQTlCLEVBQXVFO0FBQ3JFb0Ysa0JBQVV0RSxPQUFWLEVBQW1CL0IsSUFBbkIsRUFBeUJnQixPQUF6QixFQUFrQ29CLE1BQWxDLEVBQTBDekIsUUFBMUMsRUFBb0RNLFdBQVcsUUFBL0Q7QUFDRDs7QUFFRCxVQUFJakIsS0FBS25DLE1BQUwsS0FBZ0JBLE1BQXBCLEVBQTRCO0FBQzFCeUksc0JBQWN2RSxPQUFkLEVBQXVCL0IsSUFBdkIsRUFBNkJnQixPQUE3QjtBQUNEO0FBQ0Y7O0FBRURlLGNBQVVBLFFBQVFMLFVBQWxCO0FBQ0E3RCxhQUFTbUMsS0FBS25DLE1BQWQ7QUFDRDs7QUFFRCxNQUFJa0UsWUFBWU8sSUFBaEIsRUFBc0I7QUFDcEIsUUFBTTFDLFVBQVUyRyxZQUFZeEUsT0FBWixFQUFxQmYsT0FBckIsRUFBOEJvQixNQUE5QixFQUFzQ3pCLFFBQXRDLENBQWhCO0FBQ0FYLFNBQUs2QyxPQUFMLENBQWFqRCxPQUFiO0FBQ0Q7O0FBRUQsU0FBT0ksSUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7OztBQVdBLElBQU1pRyxrQkFBa0IsU0FBbEJBLGVBQWtCLENBQUNsRSxPQUFELEVBQVUvQixJQUFWLFFBQXNDb0MsTUFBdEMsRUFBOEN6QixRQUE5QyxFQUF3RjtBQUFBLE1BQXRFNEUsUUFBc0UsUUFBdEVBLFFBQXNFO0FBQUEsTUFBNUQ3QixNQUE0RCxRQUE1REEsTUFBNEQ7QUFBQSxNQUFoQ3JDLE1BQWdDLHVFQUF2QlUsUUFBUUwsVUFBZTs7QUFDOUcsTUFBTTlCLFVBQVU0RyxzQkFBc0JqQixRQUF0QixFQUFnQ3hELE9BQWhDLEVBQXlDMkIsTUFBekMsRUFBaUR0QixNQUFqRCxFQUF5RHpCLFFBQXpELEVBQW1FVSxNQUFuRSxDQUFoQjtBQUNBLE1BQUl6QixPQUFKLEVBQWE7QUFDWEksU0FBSzZDLE9BQUwsQ0FBYWpELE9BQWI7QUFDQSxXQUFPLElBQVA7QUFDRDtBQUNELFNBQU8sS0FBUDtBQUNELENBUEQ7O0FBU0E7Ozs7OztBQU1PLElBQU02RyxzQ0FBZSxTQUFmQSxZQUFlLENBQUNDLE1BQUQsRUFBUzFGLE9BQVQsRUFBcUI7QUFBQSxjQUMxQkEsV0FBVyxFQURlO0FBQUEsTUFDdkMyRixHQUR1QyxTQUN2Q0EsR0FEdUM7QUFBQSxNQUNsQ0MsR0FEa0MsU0FDbENBLEdBRGtDOztBQUUvQyxNQUFNQyxTQUFTLENBQUMsRUFBRCxDQUFmOztBQUVBSCxTQUFPaEUsT0FBUCxDQUFlLGFBQUs7QUFDbEJtRSxXQUFPbkUsT0FBUCxDQUFlLGFBQUs7QUFDbEIsVUFBSSxDQUFDa0UsR0FBRCxJQUFRRSxFQUFFakosTUFBRixHQUFXK0ksR0FBdkIsRUFBNEI7QUFDMUJDLGVBQU81RSxJQUFQLENBQVk2RSxFQUFFbkksTUFBRixDQUFTb0ksQ0FBVCxDQUFaO0FBQ0Q7QUFDRixLQUpEO0FBS0QsR0FORDs7QUFRQUYsU0FBTzNELEtBQVA7QUFDQSxTQUFPeUQsTUFBTUUsT0FBTzFDLE1BQVAsQ0FBYztBQUFBLFdBQUsyQyxFQUFFakosTUFBRixJQUFZOEksR0FBakI7QUFBQSxHQUFkLENBQU4sR0FBNENFLE1BQW5EO0FBQ0QsQ0FkTTs7QUFnQlA7QUFDQSxJQUFNRyxnQkFBZ0IsQ0FDcEIsRUFBRUMsT0FBTyxFQUFULEVBQWFMLEtBQUssQ0FBbEIsRUFEb0IsRUFFcEIsRUFBRUssT0FBTyxFQUFULEVBQWFMLEtBQUssQ0FBbEIsRUFGb0IsRUFHcEIsRUFBRUssT0FBTyxDQUFULEVBQVlMLEtBQUssQ0FBakIsRUFIb0IsRUFJcEIsRUFBRUssT0FBTyxDQUFULEVBQVlMLEtBQUssQ0FBakIsRUFKb0IsQ0FBdEI7O0FBT0E7Ozs7Ozs7Ozs7QUFVQSxJQUFNTSxtQkFBbUIsU0FBbkJBLGdCQUFtQixHQUFrRDtBQUFBLE1BQWpEakksT0FBaUQsdUVBQXZDLEVBQXVDO0FBQUEsTUFBbkNtRCxNQUFtQztBQUFBLE1BQTNCekIsUUFBMkI7QUFBQSxNQUFqQlUsTUFBaUI7QUFBQSxNQUFUdEMsSUFBUzs7QUFBQSxjQUV2RWlJLGNBQWNHLElBQWQsQ0FBbUI7QUFBQSxRQUFHRixLQUFILFNBQUdBLEtBQUg7QUFBQSxXQUFlaEksUUFBUXBCLE1BQVIsR0FBaUJvSixLQUFoQztBQUFBLEdBQW5CLEtBQTZELEVBQUVMLEtBQUszSCxRQUFRcEIsTUFBZixFQUZVO0FBQUEsTUFDakUrSSxHQURpRSxTQUNqRUEsR0FEaUU7O0FBSXpFLE1BQUlDLFNBQVNKLGFBQWF4SCxPQUFiLEVBQXNCLEVBQUUySCxRQUFGLEVBQXRCLENBQWI7O0FBRUEsT0FBSSxJQUFJNUksSUFBSSxDQUFaLEVBQWVBLElBQUk2SSxPQUFPaEosTUFBMUIsRUFBa0NHLEdBQWxDLEVBQXVDO0FBQ3JDLFFBQU00QixVQUFVZSxTQUFTZixPQUFULGNBQXNCYixJQUF0QixJQUE0QkUsU0FBUzRILE9BQU83SSxDQUFQLENBQXJDLElBQWhCO0FBQ0EsUUFBTW9KLFVBQVVoRixPQUFPeEMsT0FBUCxFQUFnQnlCLE1BQWhCLENBQWhCO0FBQ0EsUUFBSStGLFFBQVF2SixNQUFSLEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGFBQU9nSixPQUFPN0ksQ0FBUCxDQUFQO0FBQ0Q7QUFDRjs7QUFFRCxTQUFPLElBQVA7QUFDRCxDQWZEOztBQWlCQTs7Ozs7Ozs7Ozs7QUFXQSxJQUFNd0ksd0JBQXdCLFNBQXhCQSxxQkFBd0IsQ0FBQ2pCLFFBQUQsRUFBV3hELE9BQVgsRUFBb0IyQixNQUFwQixFQUE0QnRCLE1BQTVCLEVBQW9DekIsUUFBcEMsRUFBOEU7QUFBQSxNQUFoQ1UsTUFBZ0MsdUVBQXZCVSxRQUFRTCxVQUFlOztBQUMxRyxNQUFNMUMsYUFBYStDLFFBQVEvQyxVQUEzQjtBQUNBLE1BQUlxSSxpQkFBaUI3QyxPQUFPQyxJQUFQLENBQVl6RixVQUFaLEVBQXdCSyxHQUF4QixDQUE0QixVQUFDaUksR0FBRDtBQUFBLFdBQVN0SSxXQUFXc0ksR0FBWCxFQUFnQmhJLElBQXpCO0FBQUEsR0FBNUIsRUFDbEI2RSxNQURrQixDQUNYLFVBQUNvRCxDQUFEO0FBQUEsV0FBT2hDLFNBQVNKLE9BQVQsQ0FBaUJvQyxDQUFqQixJQUFzQixDQUE3QjtBQUFBLEdBRFcsQ0FBckI7O0FBR0EsTUFBSUMsMENBQWtCakMsUUFBbEIsc0JBQStCOEIsY0FBL0IsRUFBSjtBQUNBLE1BQUl6SCxVQUFVLDZCQUFkO0FBQ0FBLFVBQVFFLEdBQVIsR0FBY2lDLFFBQVFpRCxPQUFSLENBQWdCQyxXQUFoQixFQUFkOztBQUVBLE1BQUl3QyxZQUFZLFNBQVpBLFNBQVksQ0FBQzdILE9BQUQ7QUFBQSxXQUFjd0MsT0FBT3pCLFNBQVNmLE9BQVQsQ0FBaUJBLE9BQWpCLENBQVAsRUFBa0N5QixNQUFsQyxFQUEwQ3hELE1BQTFDLEtBQXFELENBQW5FO0FBQUEsR0FBaEI7O0FBRUEsT0FBSyxJQUFJRyxJQUFJLENBQVIsRUFBV3dGLElBQUlnRSxXQUFXM0osTUFBL0IsRUFBdUNHLElBQUl3RixDQUEzQyxFQUE4Q3hGLEdBQTlDLEVBQW1EO0FBQ2pELFFBQU0wRyxNQUFNOEMsV0FBV3hKLENBQVgsQ0FBWjtBQUNBLFFBQU0yRyxZQUFZM0YsV0FBVzBGLEdBQVgsQ0FBbEI7QUFDQSxRQUFNRSxnQkFBZ0IsNEJBQVlELGFBQWFBLFVBQVVyRixJQUFuQyxDQUF0QjtBQUNBLFFBQU1vSSxpQkFBaUIsNEJBQVkvQyxhQUFhQSxVQUFVekcsS0FBbkMsQ0FBdkI7QUFDQSxRQUFNeUosaUJBQWlCL0Msa0JBQWtCLE9BQXpDOztBQUVBLFFBQU1nRCxnQkFBaUJELGtCQUFrQmpFLE9BQU9rQixhQUFQLENBQW5CLElBQTZDbEIsT0FBT2lCLFNBQTFFO0FBQ0EsUUFBTWtELHVCQUF3QkYsa0JBQWtCekMsY0FBY04sYUFBZCxDQUFuQixJQUFvRE0sY0FBY1AsU0FBL0Y7QUFDQSxRQUFJbUQsWUFBWUYsYUFBWixFQUEyQmhELGFBQTNCLEVBQTBDOEMsY0FBMUMsRUFBMERHLG9CQUExRCxDQUFKLEVBQXFGO0FBQ25GO0FBQ0Q7O0FBRUQsWUFBUWpELGFBQVI7QUFDRSxXQUFLLE9BQUw7QUFBYztBQUFBO0FBQ1osZ0JBQUltRCxhQUFhTCxlQUFlekQsSUFBZixHQUFzQkMsS0FBdEIsQ0FBNEIsTUFBNUIsQ0FBakI7QUFDQSxnQkFBSSxDQUFDNkQsV0FBVyxDQUFYLENBQUwsRUFBb0I7QUFBRTtBQUNwQjtBQUNEO0FBQ0QsZ0JBQU1DLGNBQWN0RSxPQUFPVSxLQUFQLElBQWdCYyxjQUFjZCxLQUFsRDtBQUNBLGdCQUFJNEQsV0FBSixFQUFpQjtBQUNmRCwyQkFBYUEsV0FBVzVELE1BQVgsQ0FBa0I7QUFBQSx1QkFBYSxDQUFDNkQsWUFBWUMsU0FBWixDQUFkO0FBQUEsZUFBbEIsQ0FBYjtBQUNEO0FBQ0QsZ0JBQUlGLFdBQVdsSyxNQUFYLEdBQW9CLENBQXhCLEVBQTJCO0FBQ3pCLGtCQUFNb0IsVUFBVWlJLGlCQUFpQmEsVUFBakIsRUFBNkIzRixNQUE3QixFQUFxQ3pCLFFBQXJDLEVBQStDVSxNQUEvQyxFQUF1RHpCLE9BQXZELENBQWhCO0FBQ0Esa0JBQUlYLE9BQUosRUFBYTtBQUNYVyx3QkFBUVgsT0FBUixHQUFrQkEsT0FBbEI7QUFDQSxvQkFBSXdJLFVBQVU3SCxPQUFWLENBQUosRUFBd0I7QUFDdEI7QUFBQSx1QkFBT0E7QUFBUDtBQUNEO0FBQ0Y7QUFDRjtBQWpCVzs7QUFBQTtBQUFBO0FBR1Y7O0FBSFU7QUFBQTtBQUFBO0FBa0JiO0FBQ0M7O0FBRUY7QUFDRUEsZ0JBQVFaLFVBQVIsQ0FBbUJpRCxJQUFuQixDQUF3QixFQUFFM0MsTUFBTXNGLGFBQVIsRUFBdUIxRyxPQUFPd0osY0FBOUIsRUFBeEI7QUFDQSxZQUFJRCxVQUFVN0gsT0FBVixDQUFKLEVBQXdCO0FBQ3RCLGlCQUFPQSxPQUFQO0FBQ0Q7QUExQkw7QUE0QkQ7O0FBRUQsU0FBTyxJQUFQO0FBQ0QsQ0F2REQ7O0FBMERBOzs7Ozs7Ozs7OztBQVdBLElBQU1zRyxXQUFXLFNBQVhBLFFBQVcsQ0FBQ25FLE9BQUQsRUFBVS9CLElBQVYsU0FBNEJvQyxNQUE1QixFQUFvQ3pCLFFBQXBDLEVBQThFO0FBQUEsTUFBNUQrQyxNQUE0RCxTQUE1REEsTUFBNEQ7QUFBQSxNQUFoQ3JDLE1BQWdDLHVFQUF2QlUsUUFBUUwsVUFBZTs7QUFDN0YsTUFBTTlCLFVBQVVzSSxlQUFlbkcsT0FBZixFQUF3QjJCLE1BQXhCLENBQWhCO0FBQ0EsTUFBSTlELE9BQUosRUFBYTtBQUNYLFFBQUl3SCxVQUFVLEVBQWQ7QUFDQUEsY0FBVWhGLE9BQU96QixTQUFTZixPQUFULENBQWlCQSxPQUFqQixDQUFQLEVBQWtDeUIsTUFBbEMsQ0FBVjtBQUNBLFFBQUkrRixRQUFRdkosTUFBUixLQUFtQixDQUF2QixFQUEwQjtBQUN4Qm1DLFdBQUs2QyxPQUFMLENBQWFqRCxPQUFiO0FBQ0EsVUFBSUEsUUFBUUUsR0FBUixLQUFnQixRQUFwQixFQUE4QjtBQUM1QixlQUFPLEtBQVA7QUFDRDtBQUNELGFBQU8sSUFBUDtBQUNEO0FBQ0Y7QUFDRCxTQUFPLEtBQVA7QUFDRCxDQWREOztBQWdCQTs7Ozs7OztBQU9BLElBQU1vSSxpQkFBaUIsU0FBakJBLGNBQWlCLENBQUNuRyxPQUFELEVBQVUyQixNQUFWLEVBQXFCO0FBQzFDLE1BQU1zQixVQUFVakQsUUFBUWlELE9BQVIsQ0FBZ0JDLFdBQWhCLEVBQWhCO0FBQ0EsTUFBSTZDLFlBQVlwRSxPQUFPNUQsR0FBbkIsRUFBd0IsSUFBeEIsRUFBOEJrRixPQUE5QixDQUFKLEVBQTRDO0FBQzFDLFdBQU8sSUFBUDtBQUNEO0FBQ0QsTUFBTXBGLFVBQVUsNkJBQWhCO0FBQ0FBLFVBQVFFLEdBQVIsR0FBY2tGLE9BQWQ7QUFDQSxTQUFPcEYsT0FBUDtBQUNELENBUkQ7O0FBVUE7Ozs7Ozs7O0FBUUEsSUFBTTBHLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBQ3ZFLE9BQUQsRUFBVS9CLElBQVYsU0FBK0I7QUFBQSxNQUFiMEQsTUFBYSxTQUFiQSxNQUFhOztBQUNuRCxNQUFNckMsU0FBU1UsUUFBUUwsVUFBdkI7QUFDQSxNQUFNaEIsV0FBV1csT0FBT1gsUUFBeEI7QUFDQSxPQUFLLElBQUkxQyxJQUFJLENBQVIsRUFBV3dGLElBQUk5QyxTQUFTN0MsTUFBN0IsRUFBcUNHLElBQUl3RixDQUF6QyxFQUE0Q3hGLEdBQTVDLEVBQWlEO0FBQy9DLFFBQU1tSyxRQUFRekgsU0FBUzFDLENBQVQsQ0FBZDtBQUNBLFFBQUltSyxVQUFVcEcsT0FBZCxFQUF1QjtBQUNyQixVQUFNcUcsZUFBZUYsZUFBZUMsS0FBZixFQUFzQnpFLE1BQXRCLENBQXJCO0FBQ0EsVUFBSSxDQUFDMEUsWUFBTCxFQUFtQjtBQUNqQixlQUFPQyxRQUFRQyxJQUFSLHNGQUVKSCxLQUZJLEVBRUd6RSxNQUZILEVBRVcwRSxZQUZYLENBQVA7QUFHRDtBQUNEQSxtQkFBYXZJLE9BQWIsR0FBdUIsT0FBdkI7QUFDQXVJLG1CQUFhbEosTUFBYixHQUFzQixpQkFBY2xCLElBQUUsQ0FBaEIsUUFBdEI7QUFDQWdDLFdBQUs2QyxPQUFMLENBQWF1RixZQUFiO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7QUFDRjtBQUNELFNBQU8sS0FBUDtBQUNELENBbkJEOztBQXFCQTs7Ozs7Ozs7Ozs7QUFXQSxJQUFNL0IsWUFBWSxTQUFaQSxTQUFZLENBQUN0RSxPQUFELEVBQVUvQixJQUFWLFNBQTRCb0MsTUFBNUIsRUFBb0N6QixRQUFwQyxFQUE4QzhFLE1BQTlDLEVBQXlEO0FBQUEsTUFBdkMvQixNQUF1QyxTQUF2Q0EsTUFBdUM7O0FBQ3pFLE1BQU05RCxVQUFVc0ksZUFBZW5HLE9BQWYsRUFBd0IyQixNQUF4QixDQUFoQjtBQUNBLE1BQUksQ0FBQzlELE9BQUwsRUFBYztBQUNaLFdBQU8sS0FBUDtBQUNEO0FBQ0QsTUFBTTJJLGNBQWU5QyxTQUFTMUQsUUFBUXdHLFdBQWpCLEdBQWdDeEcsUUFBUXlHLFVBQVIsSUFBc0J6RyxRQUFReUcsVUFBUixDQUFtQkMsU0FBMUMsSUFBd0QsRUFBNUc7QUFDQSxNQUFJLENBQUNGLFdBQUwsRUFBa0I7QUFDaEIsV0FBTyxLQUFQO0FBQ0Q7O0FBRUQzSSxVQUFRQyxPQUFSLEdBQWtCLE9BQWxCO0FBQ0EsTUFBTXdCLFNBQVNVLFFBQVFMLFVBQXZCO0FBQ0EsTUFBTWdILFFBQVFILFlBQ1hwSyxPQURXLENBQ0gsTUFERyxFQUNLLElBREwsRUFFWCtGLEtBRlcsQ0FFTCxJQUZLLEVBR1g3RSxHQUhXLENBR1A7QUFBQSxXQUFRc0osS0FBSzFFLElBQUwsRUFBUjtBQUFBLEdBSE8sRUFJWEUsTUFKVyxDQUlKO0FBQUEsV0FBUXdFLEtBQUs5SyxNQUFMLEdBQWMsQ0FBdEI7QUFBQSxHQUpJLENBQWQ7O0FBTUEsTUFBTXVILFdBQVcsRUFBakI7O0FBRUEsU0FBT3NELE1BQU03SyxNQUFOLEdBQWUsQ0FBdEIsRUFBeUI7QUFDdkIsUUFBTThLLE9BQU9ELE1BQU14RixLQUFOLEVBQWI7QUFDQSxRQUFJNEUsWUFBWXBFLE9BQU8wQixRQUFuQixFQUE2QixJQUE3QixFQUFtQ3VELElBQW5DLEVBQXlDekQsY0FBY0UsUUFBdkQsQ0FBSixFQUFzRTtBQUNwRTtBQUNEO0FBQ0RBLGFBQVNuRCxJQUFULGdCQUEyQjBHLElBQTNCOztBQUVBLFFBQU12QixVQUFVaEYsT0FBT3pCLFNBQVNmLE9BQVQsY0FBc0JBLE9BQXRCLElBQStCVixRQUFRa0csUUFBdkMsSUFBUCxFQUEyRC9ELE1BQTNELENBQWhCO0FBQ0EsUUFBSStGLFFBQVF2SixNQUFSLEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCK0IsY0FBUVYsTUFBUixHQUFpQmtHLFFBQWpCO0FBQ0FwRixXQUFLNkMsT0FBTCxDQUFhakQsT0FBYjtBQUNBLGFBQU8sSUFBUDtBQUNEO0FBQ0QsUUFBSXdILFFBQVF2SixNQUFSLEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGFBQU8sS0FBUDtBQUNEO0FBQ0Y7QUFDRCxTQUFPLEtBQVA7QUFDRCxDQXRDRDs7QUF3Q0E7Ozs7Ozs7Ozs7QUFVQSxJQUFNdUksNEJBQTRCLFNBQTVCQSx5QkFBNEIsQ0FBQ3JFLE9BQUQsRUFBVS9CLElBQVYsRUFBZ0JnQixPQUFoQixFQUF5Qm9CLE1BQXpCLEVBQWlDekIsUUFBakMsRUFBOEM7QUFDOUUsTUFBTWYsVUFBVXNJLGVBQWVuRyxPQUFmLEVBQXdCZixRQUFRMEMsTUFBaEMsQ0FBaEI7QUFDQSxNQUFJLENBQUM5RCxPQUFMLEVBQWM7QUFDWixXQUFPLEtBQVA7QUFDRDs7QUFFRCxNQUFNVCxjQUFjcEIsTUFBTTZLLElBQU4sQ0FBVzdHLFFBQVFJLGdCQUFSLENBQXlCLEdBQXpCLENBQVgsQ0FBcEI7QUFDQSxTQUFPaEQsWUFBWXRCLE1BQVosR0FBcUIsQ0FBNUIsRUFBK0I7QUFDN0IsUUFBTWdMLGlCQUFpQnhJLE1BQU1sQixZQUFZK0QsS0FBWixFQUFOLGVBQWdDbEMsT0FBaEMsSUFBeUNzQixNQUFNUCxPQUEvQyxLQUEwRCxJQUExRCxDQUF2QjtBQUNBO0FBQ0EsUUFBSSxDQUFDOEcsZUFBZXhGLElBQWYsQ0FBb0I7QUFBQSxhQUFXekQsUUFBUVYsTUFBUixDQUFlbUUsSUFBZixDQUFvQjtBQUFBLGVBQUsvQyxFQUFFcUIsVUFBRixDQUFhLFdBQWIsQ0FBTDtBQUFBLE9BQXBCLENBQVg7QUFBQSxLQUFwQixDQUFMLEVBQTBGO0FBQ3hGLFVBQU1OLFNBQVNVLFFBQVErRyxhQUF2QjtBQUNBLFVBQU0xQixVQUFVaEYsT0FBT3pCLFNBQVNmLE9BQVQsY0FBc0JBLE9BQXRCLElBQStCVCxhQUFhLENBQUMwSixjQUFELENBQTVDLElBQVAsRUFBd0V4SCxNQUF4RSxDQUFoQjtBQUNBLFVBQUkrRixRQUFRdkosTUFBUixLQUFtQixDQUF2QixFQUEwQjtBQUN4QitCLGdCQUFRVCxXQUFSLEdBQXNCLENBQUMwSixjQUFELENBQXRCO0FBQ0E3SSxhQUFLNkMsT0FBTCxDQUFhakQsT0FBYjtBQUNBLGVBQU8sSUFBUDtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxTQUFPLEtBQVA7QUFDRCxDQXRCRDs7QUF3QkE7Ozs7Ozs7OztBQVNBLElBQU0yRyxjQUFjLFNBQWRBLFdBQWMsQ0FBQ3hFLE9BQUQsU0FBZ0NLLE1BQWhDLEVBQXdDekIsUUFBeEMsRUFBcUQ7QUFBQSxNQUF6QzRFLFFBQXlDLFNBQXpDQSxRQUF5QztBQUFBLE1BQS9CN0IsTUFBK0IsU0FBL0JBLE1BQStCOztBQUN2RSxNQUFJOUQsVUFBVTRHLHNCQUFzQmpCLFFBQXRCLEVBQWdDeEQsT0FBaEMsRUFBeUMyQixNQUF6QyxFQUFpRHRCLE1BQWpELEVBQXlEekIsUUFBekQsQ0FBZDtBQUNBLE1BQUksQ0FBQ2YsT0FBTCxFQUFjO0FBQ1pBLGNBQVVzSSxlQUFlbkcsT0FBZixFQUF3QjJCLE1BQXhCLENBQVY7QUFDRDtBQUNELFNBQU85RCxPQUFQO0FBQ0QsQ0FORDs7QUFRQTs7Ozs7Ozs7O0FBU0EsSUFBTWtJLGNBQWMsU0FBZEEsV0FBYyxDQUFDeEosU0FBRCxFQUFZZ0IsSUFBWixFQUFrQnBCLEtBQWxCLEVBQXlCNkssZ0JBQXpCLEVBQThDO0FBQ2hFLE1BQUksQ0FBQzdLLEtBQUwsRUFBWTtBQUNWLFdBQU8sSUFBUDtBQUNEO0FBQ0QsTUFBTThLLFFBQVExSyxhQUFheUssZ0JBQTNCO0FBQ0EsTUFBSSxDQUFDQyxLQUFMLEVBQVk7QUFDVixXQUFPLEtBQVA7QUFDRDtBQUNELFNBQU9BLE1BQU0xSixJQUFOLEVBQVlwQixLQUFaLEVBQW1CNkssZ0JBQW5CLENBQVA7QUFDRCxDQVRELEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkNyYXdCRSxROztBQWxCeEI7O0FBQ0E7O0FBQ0E7O29NQVRBOzs7Ozs7O0FBV0E7Ozs7OztBQU1BOzs7Ozs7OztBQVFlLFNBQVNBLFFBQVQsQ0FBbUJqSixJQUFuQixFQUF5QjhCLFFBQXpCLEVBQWlEO0FBQUEsTUFBZGQsT0FBYyx1RUFBSixFQUFJOztBQUM5RCxNQUFJaEIsS0FBS25DLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckIsV0FBTyxFQUFQO0FBQ0Q7O0FBRUQsTUFBSW1DLEtBQUssQ0FBTCxFQUFRSCxPQUFSLEtBQW9CLE9BQXhCLEVBQWlDO0FBQy9CRyxTQUFLLENBQUwsRUFBUUgsT0FBUixHQUFrQmtFLFNBQWxCO0FBQ0Q7O0FBRUQ7QUFDQSxNQUFJLENBQUNoRyxNQUFNNEgsT0FBTixDQUFjN0QsUUFBZCxDQUFMLEVBQThCO0FBQzVCQSxlQUFXLENBQUNBLFNBQVNqRSxNQUFWLEdBQW1CLENBQUNpRSxRQUFELENBQW5CLEdBQWdDLGdDQUFnQkEsUUFBaEIsQ0FBM0M7QUFDRDs7QUFFRCxNQUFJLENBQUNBLFNBQVNqRSxNQUFWLElBQW9CaUUsU0FBU3VCLElBQVQsQ0FBYyxVQUFDdEIsT0FBRDtBQUFBLFdBQWFBLFFBQVFpRSxRQUFSLEtBQXFCLENBQWxDO0FBQUEsR0FBZCxDQUF4QixFQUE0RTtBQUMxRSxVQUFNLElBQUlrRCxLQUFKLENBQVUsNEhBQVYsQ0FBTjtBQUNEOztBQUVELE1BQU05RyxTQUFTLHlCQUFVcEIsT0FBVixDQUFmO0FBQ0EsTUFBTUwsV0FBVywyQkFBWUssT0FBWixDQUFqQjs7QUFFQSxNQUFJaEIsS0FBS25DLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckIsV0FBTyxDQUFDc0wsYUFBYSxFQUFiLEVBQWlCbkosS0FBSyxDQUFMLENBQWpCLEVBQTBCLEVBQTFCLEVBQThCOEIsUUFBOUIsRUFBd0NNLE1BQXhDLEVBQWdEekIsUUFBaEQsQ0FBRCxDQUFQO0FBQ0Q7O0FBRUQsTUFBSXlJLGVBQWUsS0FBbkI7QUFDQSxNQUFJcEosS0FBS0EsS0FBS25DLE1BQUwsR0FBWSxDQUFqQixFQUFvQmdDLE9BQXBCLEtBQWdDLE9BQXBDLEVBQTZDO0FBQzNDRyxTQUFLQSxLQUFLbkMsTUFBTCxHQUFZLENBQWpCLElBQXNCc0wsYUFBYW5KLEtBQUtxSixLQUFMLENBQVcsQ0FBWCxFQUFjLENBQUMsQ0FBZixDQUFiLEVBQWdDckosS0FBS0EsS0FBS25DLE1BQUwsR0FBWSxDQUFqQixDQUFoQyxFQUFxRCxFQUFyRCxFQUF5RGlFLFFBQXpELEVBQW1FTSxNQUFuRSxFQUEyRXpCLFFBQTNFLENBQXRCO0FBQ0F5SSxtQkFBZSxJQUFmO0FBQ0Q7O0FBRURwSixzQ0FBV0EsSUFBWDtBQUNBLE1BQU1zSixZQUFZLENBQUN0SixLQUFLdUosR0FBTCxFQUFELENBQWxCOztBQWhDOEQ7QUFrQzVELFFBQU1DLFVBQVV4SixLQUFLdUosR0FBTCxFQUFoQjtBQUNBLFFBQU1uQyxVQUFVaEYsT0FBT3pCLFNBQVNYLElBQVQsOEJBQWtCQSxJQUFsQixHQUEyQnNKLFNBQTNCLEVBQVAsQ0FBaEI7QUFDQSxRQUFNRyxnQkFBZ0JyQyxRQUFRdkosTUFBUixLQUFtQmlFLFNBQVNqRSxNQUE1QixJQUFzQ2lFLFNBQVM0SCxLQUFULENBQWUsVUFBQzNILE9BQUQsRUFBVS9ELENBQVY7QUFBQSxhQUFnQitELFlBQVlxRixRQUFRcEosQ0FBUixDQUE1QjtBQUFBLEtBQWYsQ0FBNUQ7QUFDQSxRQUFJLENBQUN5TCxhQUFMLEVBQW9CO0FBQ2xCSCxnQkFBVXpHLE9BQVYsQ0FBa0JzRyxhQUFhbkosSUFBYixFQUFtQndKLE9BQW5CLEVBQTRCRixTQUE1QixFQUF1Q3hILFFBQXZDLEVBQWlETSxNQUFqRCxFQUF5RHpCLFFBQXpELENBQWxCO0FBQ0Q7QUF2QzJEOztBQWlDOUQsU0FBT1gsS0FBS25DLE1BQUwsR0FBYyxDQUFyQixFQUF3QjtBQUFBO0FBT3ZCO0FBQ0R5TCxZQUFVekcsT0FBVixDQUFrQjdDLEtBQUssQ0FBTCxDQUFsQjtBQUNBQSxTQUFPc0osU0FBUDs7QUFFQTtBQUNBdEosT0FBSyxDQUFMLElBQVVtSixhQUFhLEVBQWIsRUFBaUJuSixLQUFLLENBQUwsQ0FBakIsRUFBMEJBLEtBQUtxSixLQUFMLENBQVcsQ0FBWCxDQUExQixFQUF5Q3ZILFFBQXpDLEVBQW1ETSxNQUFuRCxFQUEyRHpCLFFBQTNELENBQVY7QUFDQSxNQUFJLENBQUN5SSxZQUFMLEVBQW1CO0FBQ2pCcEosU0FBS0EsS0FBS25DLE1BQUwsR0FBWSxDQUFqQixJQUFzQnNMLGFBQWFuSixLQUFLcUosS0FBTCxDQUFXLENBQVgsRUFBYyxDQUFDLENBQWYsQ0FBYixFQUFnQ3JKLEtBQUtBLEtBQUtuQyxNQUFMLEdBQVksQ0FBakIsQ0FBaEMsRUFBcUQsRUFBckQsRUFBeURpRSxRQUF6RCxFQUFtRU0sTUFBbkUsRUFBMkV6QixRQUEzRSxDQUF0QjtBQUNEOztBQUVELFNBQU9YLElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7QUFXQSxJQUFNMkosZUFBZSxTQUFmQSxZQUFlLENBQUNDLEdBQUQsRUFBTUosT0FBTixFQUFlSyxJQUFmLEVBQXFCL0gsUUFBckIsRUFBK0JNLE1BQS9CLEVBQXVDekIsUUFBdkMsRUFBb0Q7QUFBQSxtQkFDN0MsMEJBQVU2SSxRQUFRdEssTUFBbEIsRUFBMEIsVUFBQ1YsSUFBRDtBQUFBLFdBQVVBLEtBQUttRCxVQUFMLENBQWdCLFVBQWhCLENBQVY7QUFBQSxHQUExQixDQUQ2QztBQUFBO0FBQUEsTUFDaEV5RCxRQURnRTtBQUFBLE1BQ3REMEUsS0FEc0Q7O0FBR3ZFLE1BQUkxRSxTQUFTdkgsTUFBVCxHQUFrQixDQUFsQixJQUF1QmdNLEtBQUtoTSxNQUFoQyxFQUF3QztBQUN0QyxRQUFNa0Isb0JBQVl5SyxPQUFaLElBQXFCdEsscUNBQVk0SyxLQUFaLHNCQUFzQjFFLFFBQXRCLEVBQXJCLEdBQU47QUFDQSxXQUFPckcsS0FBS0csTUFBTCxDQUFZckIsTUFBWixHQUFxQmlNLE1BQU1qTSxNQUFsQyxFQUEwQztBQUN4QyxVQUFNa00sWUFBWWhMLEtBQUtHLE1BQUwsQ0FBWW1LLEtBQVosQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBQyxDQUF0QixDQUFsQjtBQUNBLFVBQUksQ0FBQ1csZUFBZTVILE9BQU96QixTQUFTWCxJQUFULDhCQUFrQjRKLEdBQWxCLGlCQUE0QjdLLElBQTVCLElBQWtDRyxRQUFRNkssU0FBMUMseUJBQTBERixJQUExRCxHQUFQLENBQWYsRUFBeUYvSCxRQUF6RixDQUFMLEVBQXlHO0FBQ3ZHO0FBQ0Q7QUFDRC9DLFdBQUtHLE1BQUwsR0FBYzZLLFNBQWQ7QUFDRDtBQUNELFdBQU9oTCxJQUFQO0FBQ0Q7QUFDRCxTQUFPeUssT0FBUDtBQUNELENBZkQ7O0FBaUJBOzs7Ozs7Ozs7OztBQVdBLElBQU1TLHFCQUFxQixTQUFyQkEsa0JBQXFCLENBQUNMLEdBQUQsRUFBTUosT0FBTixFQUFlSyxJQUFmLEVBQXFCL0gsUUFBckIsRUFBK0JNLE1BQS9CLEVBQXVDekIsUUFBdkMsRUFBb0Q7QUFDN0U7QUFDQSxNQUFJNkksUUFBUXhLLFVBQVIsQ0FBbUJuQixNQUFuQixHQUE0QixDQUFoQyxFQUFtQztBQUNqQyxRQUFJbUIsMENBQWlCd0ssUUFBUXhLLFVBQXpCLEVBQUo7O0FBRUEsUUFBTWtMLFdBQVcsU0FBWEEsUUFBVyxDQUFDQyxRQUFELEVBQVdDLGFBQVgsRUFBNkI7QUFDNUMsVUFBSXBNLElBQUltTSxTQUFTdE0sTUFBVCxHQUFrQixDQUExQjtBQUNBLGFBQU9HLEtBQUssQ0FBWixFQUFlO0FBQ2IsWUFBSWdCLGNBQWFvTCxjQUFjRCxRQUFkLEVBQXdCbk0sQ0FBeEIsQ0FBakI7QUFDQSxZQUFJLENBQUNnTSxlQUNINUgsT0FBT3pCLFNBQVNYLElBQVQsOEJBQWtCNEosR0FBbEIsaUJBQTRCSixPQUE1QixJQUFxQ3hLLHVCQUFyQyx5QkFBc0Q2SyxJQUF0RCxHQUFQLENBREcsRUFFSC9ILFFBRkcsQ0FBTCxFQUdHO0FBQ0Q7QUFDRDtBQUNEOUQ7QUFDQW1NLG1CQUFXbkwsV0FBWDtBQUNEO0FBQ0QsYUFBT21MLFFBQVA7QUFDRCxLQWREOztBQWdCQSxRQUFNRSxhQUFhSCxTQUFTbEwsVUFBVCxFQUFxQixVQUFDQSxVQUFELEVBQWFoQixDQUFiLEVBQW1CO0FBQUEsVUFDakRzQixJQURpRCxHQUN4Q04sV0FBV2hCLENBQVgsQ0FEd0MsQ0FDakRzQixJQURpRDs7QUFFekQsVUFBSUEsU0FBUyxJQUFiLEVBQW1CO0FBQ2pCLGVBQU9OLFVBQVA7QUFDRDtBQUNELDBDQUFXQSxXQUFXcUssS0FBWCxDQUFpQixDQUFqQixFQUFvQnJMLENBQXBCLENBQVgsSUFBbUMsRUFBRXNCLFVBQUYsRUFBUXBCLE9BQU8sSUFBZixFQUFuQyxzQkFBNkRjLFdBQVdxSyxLQUFYLENBQWlCckwsSUFBSSxDQUFyQixDQUE3RDtBQUNELEtBTmtCLENBQW5CO0FBT0Esd0JBQVl3TCxPQUFaLElBQXFCeEssWUFBWWtMLFNBQVNHLFVBQVQsRUFBcUI7QUFBQSxlQUFjckwsV0FBV3FLLEtBQVgsQ0FBaUIsQ0FBakIsRUFBb0IsQ0FBQyxDQUFyQixDQUFkO0FBQUEsT0FBckIsQ0FBakM7QUFDRDtBQUNELFNBQU9HLE9BQVA7QUFDRCxDQS9CRDs7QUFpQ0E7Ozs7Ozs7Ozs7O0FBV0EsSUFBTWMscUJBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBQ1YsR0FBRCxFQUFNSixPQUFOLEVBQWVLLElBQWYsRUFBcUIvSCxRQUFyQixFQUErQk0sTUFBL0IsRUFBdUN6QixRQUF2QyxFQUFvRDtBQUM3RTtBQUNBLE1BQUk2SSxRQUFRM0osT0FBUixLQUFvQixPQUF4QixFQUFpQztBQUMvQixRQUFNMEssMEJBQWtCZixPQUFsQixJQUEyQjNKLFNBQVNrRSxTQUFwQyxHQUFOO0FBQ0EsUUFBSXFELFdBQVVoRixPQUFPekIsU0FBU1gsSUFBVCw4QkFBa0I0SixHQUFsQixJQUF1QlcsVUFBdkIsc0JBQXNDVixJQUF0QyxHQUFQLENBQWQ7QUFDQSxRQUFJRyxlQUFlNUMsUUFBZixFQUF3QnRGLFFBQXhCLENBQUosRUFBdUM7QUFDckMsYUFBT3lJLFVBQVA7QUFDRDtBQUNGO0FBQ0QsU0FBT2YsT0FBUDtBQUNELENBVkQ7O0FBWUE7Ozs7Ozs7Ozs7O0FBV0EsSUFBTWdCLCtCQUErQixTQUEvQkEsNEJBQStCLENBQUNaLEdBQUQsRUFBTUosT0FBTixFQUFlSyxJQUFmLEVBQXFCL0gsUUFBckIsRUFBK0JNLE1BQS9CLEVBQXVDekIsUUFBdkMsRUFBb0Q7QUFDdkYsTUFBSTZJLFFBQVFySyxXQUFSLENBQW9CdEIsTUFBcEIsR0FBNkIsQ0FBN0IsSUFBa0NnTSxLQUFLaE0sTUFBM0MsRUFBbUQ7QUFDakQsUUFBTWtCLG9CQUFZeUssT0FBWixJQUFxQnJLLDBDQUFpQnFLLFFBQVFySyxXQUF6QixFQUFyQixHQUFOO0FBQ0EsV0FBT0osS0FBS0ksV0FBTCxDQUFpQnRCLE1BQWpCLEdBQTBCLENBQWpDLEVBQW9DO0FBQ2xDLFVBQU1rTSxZQUFZaEwsS0FBS0ksV0FBTCxDQUFpQmtLLEtBQWpCLENBQXVCLENBQXZCLEVBQTBCLENBQUMsQ0FBM0IsQ0FBbEI7QUFDQSxVQUFJLENBQUNXLGVBQWU1SCxPQUFPekIsU0FBU1gsSUFBVCw4QkFBa0I0SixHQUFsQixpQkFBNEI3SyxJQUE1QixJQUFrQ0ksYUFBYTRLLFNBQS9DLHlCQUErREYsSUFBL0QsR0FBUCxDQUFmLEVBQThGL0gsUUFBOUYsQ0FBTCxFQUE4RztBQUM1RztBQUNEO0FBQ0QvQyxXQUFLSSxXQUFMLEdBQW1CNEssU0FBbkI7QUFDRDtBQUNELFdBQU9oTCxJQUFQO0FBQ0Q7QUFDRCxTQUFPeUssT0FBUDtBQUNELENBYkQ7O0FBZUE7Ozs7Ozs7Ozs7O0FBV0EsSUFBTWlCLG9CQUFvQixTQUFwQkEsaUJBQW9CLENBQUNiLEdBQUQsRUFBTUosT0FBTixFQUFlSyxJQUFmLEVBQXFCL0gsUUFBckIsRUFBK0JNLE1BQS9CLEVBQXVDekIsUUFBdkMsRUFBb0Q7QUFDNUUsTUFBTTNDLElBQUl3TCxRQUFRdEssTUFBUixDQUFld0wsU0FBZixDQUF5QjtBQUFBLFdBQVFsTSxLQUFLbUQsVUFBTCxDQUFnQixXQUFoQixDQUFSO0FBQUEsR0FBekIsQ0FBVjtBQUNBO0FBQ0EsTUFBSTNELEtBQUssQ0FBVCxFQUFZO0FBQ1Y7QUFDQSxRQUFNOEgsT0FBTzBELFFBQVF0SyxNQUFSLENBQWVsQixDQUFmLEVBQWtCRyxPQUFsQixDQUEwQixZQUExQixFQUF3QyxhQUF4QyxDQUFiO0FBQ0EsUUFBTXdNLHlCQUFpQm5CLE9BQWpCLElBQTBCdEsscUNBQVlzSyxRQUFRdEssTUFBUixDQUFlbUssS0FBZixDQUFxQixDQUFyQixFQUF3QnJMLENBQXhCLENBQVosSUFBd0M4SCxJQUF4QyxzQkFBaUQwRCxRQUFRdEssTUFBUixDQUFlbUssS0FBZixDQUFxQnJMLElBQUksQ0FBekIsQ0FBakQsRUFBMUIsR0FBTjtBQUNBLFFBQUk0QixVQUFVZSxTQUFTWCxJQUFULDhCQUFrQjRKLEdBQWxCLElBQXVCZSxTQUF2QixzQkFBcUNkLElBQXJDLEdBQWQ7QUFDQSxRQUFJekMsWUFBVWhGLE9BQU94QyxPQUFQLENBQWQ7QUFDQSxRQUFJb0ssZUFBZTVDLFNBQWYsRUFBd0J0RixRQUF4QixDQUFKLEVBQXVDO0FBQ3JDLGFBQU82SSxTQUFQO0FBQ0Q7QUFDRjtBQUNELFNBQU9uQixPQUFQO0FBQ0QsQ0FkRDs7QUFnQkE7Ozs7Ozs7Ozs7O0FBV0EsSUFBTW9CLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ2hCLEdBQUQsRUFBTUosT0FBTixFQUFlSyxJQUFmLEVBQXFCL0gsUUFBckIsRUFBK0JNLE1BQS9CLEVBQXVDekIsUUFBdkMsRUFBb0Q7QUFDMUU7QUFDQSxNQUFJNkksUUFBUXZLLE9BQVIsQ0FBZ0JwQixNQUFoQixHQUF5QixDQUE3QixFQUFnQztBQUM5QixRQUFJa00sWUFBWVAsUUFBUXZLLE9BQVIsQ0FBZ0JvSyxLQUFoQixHQUF3QnZHLElBQXhCLENBQTZCLFVBQUNDLElBQUQsRUFBT0MsSUFBUDtBQUFBLGFBQWdCRCxLQUFLbEYsTUFBTCxHQUFjbUYsS0FBS25GLE1BQW5DO0FBQUEsS0FBN0IsQ0FBaEI7O0FBRUEsV0FBT2tNLFVBQVVsTSxNQUFWLEdBQW1CLENBQTFCLEVBQTZCO0FBQzNCa00sZ0JBQVU3RyxLQUFWO0FBQ0EsVUFBTXRELFdBQVVlLFNBQVNYLElBQVQsOEJBQWtCNEosR0FBbEIsaUJBQTRCSixPQUE1QixJQUFxQ3ZLLFNBQVM4SyxTQUE5Qyx5QkFBOERGLElBQTlELEdBQWhCO0FBQ0EsVUFBSSxDQUFDRyxlQUFlNUgsT0FBT3hDLFFBQVAsQ0FBZixFQUFnQ2tDLFFBQWhDLENBQUwsRUFBZ0Q7QUFDOUM7QUFDRDtBQUNEMEgsY0FBUXZLLE9BQVIsR0FBa0I4SyxTQUFsQjtBQUNEOztBQUVEQSxnQkFBWVAsUUFBUXZLLE9BQXBCOztBQUVBLFFBQUk4SyxVQUFVbE0sTUFBVixHQUFtQixDQUF2QixFQUEwQjtBQUN4QixVQUFNa0IsT0FBTyw2QkFBYyxFQUFFRSxTQUFTOEssU0FBWCxFQUFkLENBQWI7QUFDQSxVQUFNYyxhQUFhekksT0FBT3pCLFNBQVNYLElBQVQsOEJBQWtCNEosR0FBbEIsSUFBdUI3SyxJQUF2QixHQUFQLENBQW5COztBQUZ3QjtBQUl0QixZQUFNK0wsWUFBWUQsV0FBVzdNLENBQVgsQ0FBbEI7QUFDQSxZQUFJOEQsU0FBU3VCLElBQVQsQ0FBYyxVQUFDdEIsT0FBRDtBQUFBLGlCQUFhK0ksVUFBVTFGLFFBQVYsQ0FBbUJyRCxPQUFuQixDQUFiO0FBQUEsU0FBZCxDQUFKLEVBQTZEO0FBQzNEO0FBQ0E7QUFDQSxjQUFNZ0osY0FBYyw2QkFBYyxFQUFFakwsS0FBS2dMLFVBQVU5RixPQUFqQixFQUFkLENBQXBCO0FBQ0lwRixvQkFBVWUsU0FBU1gsSUFBVCw4QkFBa0I0SixHQUFsQixJQUF1Qm1CLFdBQXZCLHNCQUF1Q2xCLElBQXZDLEdBSjZDO0FBS3ZEekMsb0JBQVVoRixPQUFPeEMsT0FBUCxDQUw2Qzs7QUFNM0QsY0FBSW9LLGVBQWU1QyxPQUFmLEVBQXdCdEYsUUFBeEIsQ0FBSixFQUF1QztBQUNyQzBILHNCQUFVdUIsV0FBVjtBQUNEO0FBQ0Q7QUFDRDtBQWZxQjs7QUFHeEIsV0FBSyxJQUFJL00sSUFBSSxDQUFiLEVBQWdCQSxJQUFJNk0sV0FBV2hOLE1BQS9CLEVBQXVDRyxHQUF2QyxFQUE0QztBQUFBLFlBTXBDNEIsT0FOb0M7QUFBQSxZQU9wQ3dILE9BUG9DOztBQUFBOztBQUFBLCtCQVd4QztBQUVIO0FBQ0Y7QUFDRjtBQUNELFNBQU9vQyxPQUFQO0FBQ0QsQ0FwQ0Q7O0FBc0NBLElBQU13QixhQUFhLENBQ2pCckIsWUFEaUIsRUFFakJNLGtCQUZpQixFQUdqQkssa0JBSGlCLEVBSWpCRSw0QkFKaUIsRUFLakJDLGlCQUxpQixFQU1qQkcsZUFOaUIsQ0FBbkI7O0FBU0E7Ozs7Ozs7Ozs7O0FBV0EsSUFBTXpCLGVBQWUsU0FBZkEsWUFBZSxDQUFDUyxHQUFELEVBQU1KLE9BQU4sRUFBZUssSUFBZixFQUFxQi9ILFFBQXJCLEVBQStCTSxNQUEvQixFQUF1Q3pCLFFBQXZDO0FBQUEsU0FDbkJxSyxXQUFXek0sTUFBWCxDQUFrQixVQUFDME0sR0FBRCxFQUFNQyxTQUFOO0FBQUEsV0FBb0JBLFVBQVV0QixHQUFWLEVBQWVxQixHQUFmLEVBQW9CcEIsSUFBcEIsRUFBMEIvSCxRQUExQixFQUFvQ00sTUFBcEMsRUFBNEN6QixRQUE1QyxDQUFwQjtBQUFBLEdBQWxCLEVBQTZGNkksT0FBN0YsQ0FEbUI7QUFBQSxDQUFyQjs7QUFHQTs7Ozs7OztBQU9PLElBQU1RLDBDQUFpQixTQUFqQkEsY0FBaUIsQ0FBQzVDLE9BQUQsRUFBVXRGLFFBQVYsRUFBdUI7QUFBQSxNQUMzQ2pFLE1BRDJDLEdBQ2hDdUosT0FEZ0MsQ0FDM0N2SixNQUQyQzs7QUFFbkQsU0FBT0EsV0FBV2lFLFNBQVNqRSxNQUFwQixJQUE4QmlFLFNBQVM0SCxLQUFULENBQWUsVUFBQzNILE9BQUQsRUFBYTtBQUMvRCxTQUFLLElBQUkvRCxJQUFJLENBQWIsRUFBZ0JBLElBQUlILE1BQXBCLEVBQTRCRyxHQUE1QixFQUFpQztBQUMvQixVQUFJb0osUUFBUXBKLENBQVIsTUFBZStELE9BQW5CLEVBQTRCO0FBQzFCLGVBQU8sSUFBUDtBQUNEO0FBQ0Y7QUFDRCxXQUFPLEtBQVA7QUFDRCxHQVBvQyxDQUFyQztBQVFELENBVk0sQzs7Ozs7Ozs7Ozs7Ozs7OFFDalRQOzs7Ozs7OztrQkErSHdCb0osZ0I7O0FBekh4Qjs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBOzs7Ozs7Ozs7QUFTQTs7OztBQUlBOzs7Ozs7O0FBT08sSUFBTUMsd0RBQXdCLFNBQXhCQSxxQkFBd0IsQ0FBQ3JKLE9BQUQsRUFBMkI7QUFBQSxNQUFqQmYsT0FBaUIsdUVBQVAsRUFBTzs7O0FBRTlELE1BQUllLFFBQVFpRSxRQUFSLEtBQXFCLENBQXpCLEVBQTRCO0FBQzFCakUsY0FBVUEsUUFBUUwsVUFBbEI7QUFDRDs7QUFFRCxNQUFJSyxRQUFRaUUsUUFBUixLQUFxQixDQUF6QixFQUE0QjtBQUMxQixVQUFNLElBQUlrRCxLQUFKLGdHQUFzR25ILE9BQXRHLHlDQUFzR0EsT0FBdEcsVUFBTjtBQUNEOztBQUVELE1BQU0vQixPQUFPLHFCQUFNK0IsT0FBTixFQUFlZixPQUFmLENBQWI7QUFDQSxNQUFNcUssZ0JBQWdCLHdCQUFTckwsSUFBVCxFQUFlK0IsT0FBZixFQUF3QmYsT0FBeEIsQ0FBdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFPcUssYUFBUDtBQUNELENBcEJNOztBQXNCUDs7Ozs7OztBQU9PLElBQU1DLHNEQUF1QixTQUF2QkEsb0JBQXVCLENBQUN4SixRQUFELEVBQTRCO0FBQUEsTUFBakJkLE9BQWlCLHVFQUFQLEVBQU87OztBQUU5RCxNQUFJLENBQUNqRCxNQUFNNEgsT0FBTixDQUFjN0QsUUFBZCxDQUFMLEVBQThCO0FBQzVCQSxlQUFXLGdDQUFnQkEsUUFBaEIsQ0FBWDtBQUNEOztBQUVELE1BQUlBLFNBQVN1QixJQUFULENBQWMsVUFBQ3RCLE9BQUQ7QUFBQSxXQUFhQSxRQUFRaUUsUUFBUixLQUFxQixDQUFsQztBQUFBLEdBQWQsQ0FBSixFQUF3RDtBQUN0RCxVQUFNLElBQUlrRCxLQUFKLENBQVUsd0ZBQVYsQ0FBTjtBQUNEOztBQUVELE1BQU05RyxTQUFTLHlCQUFVcEIsT0FBVixDQUFmO0FBQ0EsTUFBTUwsV0FBVywwQkFBWUssT0FBWixDQUFqQjs7QUFFQSxNQUFNbUMsV0FBVywrQkFBa0JyQixRQUFsQixFQUE0QmQsT0FBNUIsQ0FBakI7QUFDQSxNQUFNdUssZUFBZSxxQkFBTXBJLFFBQU4sRUFBZ0JuQyxPQUFoQixDQUFyQjs7QUFFQTtBQUNBLE1BQU13SyxhQUFhQyxjQUFjM0osUUFBZCxFQUF3QmQsT0FBeEIsQ0FBbkI7QUFDQSxNQUFNMEssb0JBQW9CRixXQUFXLENBQVgsQ0FBMUI7O0FBRUEsTUFBTUcsZUFBZSxxREFBYUosWUFBYixJQUEyQkcsaUJBQTNCLElBQStDNUosUUFBL0MsRUFBeURkLE9BQXpELENBQXJCO0FBQ0EsTUFBTTRLLGtCQUFrQixnQ0FBZ0J4SixPQUFPekIsU0FBU1gsSUFBVCxDQUFjMkwsWUFBZCxDQUFQLENBQWhCLENBQXhCOztBQUVBLE1BQUksQ0FBQzdKLFNBQVM0SCxLQUFULENBQWUsVUFBQzNILE9BQUQ7QUFBQSxXQUFhNkosZ0JBQWdCdkksSUFBaEIsQ0FBcUIsVUFBQ2lCLEtBQUQ7QUFBQSxhQUFXQSxVQUFVdkMsT0FBckI7QUFBQSxLQUFyQixDQUFiO0FBQUEsR0FBZixDQUFMLEVBQXNGO0FBQ3BGO0FBQ0EsV0FBT3NHLFFBQVFDLElBQVIseUlBR0p4RyxRQUhJLENBQVA7QUFJRDs7QUFFRCxTQUFPNkosWUFBUDtBQUNELENBaENNOztBQWtDUDs7Ozs7O0FBTUEsSUFBTUYsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFDM0osUUFBRCxFQUFXZCxPQUFYLEVBQXVCO0FBQUEsNkJBQ04saUNBQW9CYyxRQUFwQixFQUE4QmQsT0FBOUIsQ0FETTtBQUFBLE1BQ25DL0IsT0FEbUMsd0JBQ25DQSxPQURtQztBQUFBLE1BQzFCRCxVQUQwQix3QkFDMUJBLFVBRDBCO0FBQUEsTUFDZGMsR0FEYyx3QkFDZEEsR0FEYzs7QUFJM0MsU0FBTyxDQUNMLDRCQUFjO0FBQ1pBLFlBRFk7QUFFWmIsYUFBU0EsV0FBVyxFQUZSO0FBR1pELGdCQUFZQSxhQUFhd0YsT0FBT0MsSUFBUCxDQUFZekYsVUFBWixFQUF3QkssR0FBeEIsQ0FBNEIsVUFBQ0MsSUFBRDtBQUFBLGFBQVc7QUFDOURBLGNBQU0sNEJBQVlBLElBQVosQ0FEd0Q7QUFFOURwQixlQUFPLDRCQUFZYyxXQUFXTSxJQUFYLENBQVo7QUFGdUQsT0FBWDtBQUFBLEtBQTVCLENBQWIsR0FHTjtBQU5NLEdBQWQsQ0FESyxDQUFQO0FBVUQsQ0FkRDs7QUFnQkE7Ozs7Ozs7OztBQVNlLFNBQVM2TCxnQkFBVCxDQUEwQlUsS0FBMUIsRUFBK0M7QUFBQSxNQUFkN0ssT0FBYyx1RUFBSixFQUFJOztBQUM1RCxNQUFNaEIsT0FBUTZMLE1BQU1oTyxNQUFOLElBQWdCLENBQUNnTyxNQUFNdk0sSUFBeEIsR0FDVGdNLHFCQUFxQk8sS0FBckIsRUFBNEI3SyxPQUE1QixDQURTLEdBRVRvSyxzQkFBc0JTLEtBQXRCLEVBQTZCN0ssT0FBN0IsQ0FGSjs7QUFJQSxTQUFPLDBCQUFZQSxPQUFaLEVBQXFCaEIsSUFBckIsQ0FBMEJBLElBQTFCLENBQVA7QUFDRCxDOzs7Ozs7Ozs7QUNySUQ7Ozs7Ozs7Ozs7QUFVQSxDQUFFLFVBQVU4TCxNQUFWLEVBQW1CO0FBQ3JCLEtBQUk5TixDQUFKO0FBQUEsS0FDQytOLE9BREQ7QUFBQSxLQUVDQyxJQUZEO0FBQUEsS0FHQ0MsT0FIRDtBQUFBLEtBSUNDLEtBSkQ7QUFBQSxLQUtDQyxRQUxEO0FBQUEsS0FNQ0MsT0FORDtBQUFBLEtBT0NoSyxNQVBEO0FBQUEsS0FRQ2lLLGdCQVJEO0FBQUEsS0FTQ0MsU0FURDtBQUFBLEtBVUNDLFlBVkQ7OztBQVlDO0FBQ0FDLFlBYkQ7QUFBQSxLQWNDakwsUUFkRDtBQUFBLEtBZUNrTCxPQWZEO0FBQUEsS0FnQkNDLGNBaEJEO0FBQUEsS0FpQkNDLFNBakJEO0FBQUEsS0FrQkNDLGFBbEJEO0FBQUEsS0FtQkN4RixPQW5CRDtBQUFBLEtBb0JDaEMsUUFwQkQ7OztBQXNCQztBQUNBeUgsV0FBVSxXQUFXLElBQUksSUFBSUMsSUFBSixFQXZCMUI7QUFBQSxLQXdCQ0MsZUFBZWpCLE9BQU92SyxRQXhCdkI7QUFBQSxLQXlCQ3lMLFVBQVUsQ0F6Qlg7QUFBQSxLQTBCQ0MsT0FBTyxDQTFCUjtBQUFBLEtBMkJDQyxhQUFhQyxhQTNCZDtBQUFBLEtBNEJDQyxhQUFhRCxhQTVCZDtBQUFBLEtBNkJDRSxnQkFBZ0JGLGFBN0JqQjtBQUFBLEtBOEJDRyx5QkFBeUJILGFBOUIxQjtBQUFBLEtBK0JDSSxZQUFZLG1CQUFVaEcsQ0FBVixFQUFhaUcsQ0FBYixFQUFpQjtBQUM1QixNQUFLakcsTUFBTWlHLENBQVgsRUFBZTtBQUNkakIsa0JBQWUsSUFBZjtBQUNBO0FBQ0QsU0FBTyxDQUFQO0FBQ0EsRUFwQ0Y7OztBQXNDQztBQUNBa0IsVUFBVyxFQUFGLENBQU9DLGNBdkNqQjtBQUFBLEtBd0NDNVAsTUFBTSxFQXhDUDtBQUFBLEtBeUNDeUwsTUFBTXpMLElBQUl5TCxHQXpDWDtBQUFBLEtBMENDb0UsYUFBYTdQLElBQUltRSxJQTFDbEI7QUFBQSxLQTJDQ0EsT0FBT25FLElBQUltRSxJQTNDWjtBQUFBLEtBNENDb0gsUUFBUXZMLElBQUl1TCxLQTVDYjs7O0FBOENDO0FBQ0E7QUFDQWxFLFdBQVUsU0FBVkEsT0FBVSxDQUFVeUksSUFBVixFQUFnQkMsSUFBaEIsRUFBdUI7QUFDaEMsTUFBSTdQLElBQUksQ0FBUjtBQUFBLE1BQ0M4UCxNQUFNRixLQUFLL1AsTUFEWjtBQUVBLFNBQVFHLElBQUk4UCxHQUFaLEVBQWlCOVAsR0FBakIsRUFBdUI7QUFDdEIsT0FBSzRQLEtBQU01UCxDQUFOLE1BQWM2UCxJQUFuQixFQUEwQjtBQUN6QixXQUFPN1AsQ0FBUDtBQUNBO0FBQ0Q7QUFDRCxTQUFPLENBQUMsQ0FBUjtBQUNBLEVBekRGO0FBQUEsS0EyREMrUCxXQUFXLDhFQUNWLG1EQTVERjs7O0FBOERDOztBQUVBO0FBQ0FDLGNBQWEscUJBakVkOzs7QUFtRUM7QUFDQUMsY0FBYSw0QkFBNEJELFVBQTVCLEdBQ1oseUNBckVGOzs7QUF1RUM7QUFDQWhQLGNBQWEsUUFBUWdQLFVBQVIsR0FBcUIsSUFBckIsR0FBNEJDLFVBQTVCLEdBQXlDLE1BQXpDLEdBQWtERCxVQUFsRDs7QUFFWjtBQUNBLGdCQUhZLEdBR01BLFVBSE47O0FBS1o7QUFDQTtBQUNBLDJEQVBZLEdBT2lEQyxVQVBqRCxHQU84RCxNQVA5RCxHQVFaRCxVQVJZLEdBUUMsTUFoRmY7QUFBQSxLQWtGQ0UsVUFBVSxPQUFPRCxVQUFQLEdBQW9CLFVBQXBCOztBQUVUO0FBQ0E7QUFDQSx3REFKUzs7QUFNVDtBQUNBLDJCQVBTLEdBT29CalAsVUFQcEIsR0FPaUMsTUFQakM7O0FBU1Q7QUFDQSxLQVZTLEdBV1QsUUE3RkY7OztBQStGQztBQUNBbVAsZUFBYyxJQUFJcEksTUFBSixDQUFZaUksYUFBYSxHQUF6QixFQUE4QixHQUE5QixDQWhHZjtBQUFBLEtBaUdDSSxRQUFRLElBQUlySSxNQUFKLENBQVksTUFBTWlJLFVBQU4sR0FBbUIsNkJBQW5CLEdBQ25CQSxVQURtQixHQUNOLElBRE4sRUFDWSxHQURaLENBakdUO0FBQUEsS0FvR0NLLFNBQVMsSUFBSXRJLE1BQUosQ0FBWSxNQUFNaUksVUFBTixHQUFtQixJQUFuQixHQUEwQkEsVUFBMUIsR0FBdUMsR0FBbkQsQ0FwR1Y7QUFBQSxLQXFHQ00sZUFBZSxJQUFJdkksTUFBSixDQUFZLE1BQU1pSSxVQUFOLEdBQW1CLFVBQW5CLEdBQWdDQSxVQUFoQyxHQUE2QyxHQUE3QyxHQUFtREEsVUFBbkQsR0FDMUIsR0FEYyxDQXJHaEI7QUFBQSxLQXVHQ08sV0FBVyxJQUFJeEksTUFBSixDQUFZaUksYUFBYSxJQUF6QixDQXZHWjtBQUFBLEtBeUdDUSxVQUFVLElBQUl6SSxNQUFKLENBQVltSSxPQUFaLENBekdYO0FBQUEsS0EwR0NPLGNBQWMsSUFBSTFJLE1BQUosQ0FBWSxNQUFNa0ksVUFBTixHQUFtQixHQUEvQixDQTFHZjtBQUFBLEtBNEdDUyxZQUFZO0FBQ1gsUUFBTSxJQUFJM0ksTUFBSixDQUFZLFFBQVFrSSxVQUFSLEdBQXFCLEdBQWpDLENBREs7QUFFWCxXQUFTLElBQUlsSSxNQUFKLENBQVksVUFBVWtJLFVBQVYsR0FBdUIsR0FBbkMsQ0FGRTtBQUdYLFNBQU8sSUFBSWxJLE1BQUosQ0FBWSxPQUFPa0ksVUFBUCxHQUFvQixPQUFoQyxDQUhJO0FBSVgsVUFBUSxJQUFJbEksTUFBSixDQUFZLE1BQU0vRyxVQUFsQixDQUpHO0FBS1gsWUFBVSxJQUFJK0csTUFBSixDQUFZLE1BQU1tSSxPQUFsQixDQUxDO0FBTVgsV0FBUyxJQUFJbkksTUFBSixDQUFZLDJEQUNwQmlJLFVBRG9CLEdBQ1AsOEJBRE8sR0FDMEJBLFVBRDFCLEdBQ3VDLGFBRHZDLEdBRXBCQSxVQUZvQixHQUVQLFlBRk8sR0FFUUEsVUFGUixHQUVxQixRQUZqQyxFQUUyQyxHQUYzQyxDQU5FO0FBU1gsVUFBUSxJQUFJakksTUFBSixDQUFZLFNBQVNnSSxRQUFULEdBQW9CLElBQWhDLEVBQXNDLEdBQXRDLENBVEc7O0FBV1g7QUFDQTtBQUNBLGtCQUFnQixJQUFJaEksTUFBSixDQUFZLE1BQU1pSSxVQUFOLEdBQzNCLGtEQUQyQixHQUMwQkEsVUFEMUIsR0FFM0Isa0JBRjJCLEdBRU5BLFVBRk0sR0FFTyxrQkFGbkIsRUFFdUMsR0FGdkM7QUFiTCxFQTVHYjtBQUFBLEtBOEhDVyxRQUFRLFFBOUhUO0FBQUEsS0ErSENDLFVBQVUscUNBL0hYO0FBQUEsS0FnSUNDLFVBQVUsUUFoSVg7QUFBQSxLQWtJQ0MsVUFBVSx3QkFsSVg7OztBQW9JQztBQUNBQyxjQUFhLGtDQXJJZDtBQUFBLEtBdUlDQyxXQUFXLE1BdklaOzs7QUF5SUM7QUFDQTtBQUNBQyxhQUFZLElBQUlsSixNQUFKLENBQVkseUJBQXlCaUksVUFBekIsR0FBc0Msc0JBQWxELEVBQTBFLEdBQTFFLENBM0liO0FBQUEsS0E0SUNrQixZQUFZLFNBQVpBLFNBQVksQ0FBVUMsTUFBVixFQUFrQkMsTUFBbEIsRUFBMkI7QUFDdEMsTUFBSUMsT0FBTyxPQUFPRixPQUFPOUYsS0FBUCxDQUFjLENBQWQsQ0FBUCxHQUEyQixPQUF0Qzs7QUFFQSxTQUFPK0Y7O0FBRU47QUFDQUEsUUFITTs7QUFLTjtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxTQUFPLENBQVAsR0FDQ0MsT0FBT0MsWUFBUCxDQUFxQkYsT0FBTyxPQUE1QixDQURELEdBRUNDLE9BQU9DLFlBQVAsQ0FBcUJGLFFBQVEsRUFBUixHQUFhLE1BQWxDLEVBQTBDQSxPQUFPLEtBQVAsR0FBZSxNQUF6RCxDQVhGO0FBWUEsRUEzSkY7OztBQTZKQztBQUNBO0FBQ0FHLGNBQWEscURBL0pkO0FBQUEsS0FnS0NDLGFBQWEsU0FBYkEsVUFBYSxDQUFVQyxFQUFWLEVBQWNDLFdBQWQsRUFBNEI7QUFDeEMsTUFBS0EsV0FBTCxFQUFtQjs7QUFFbEI7QUFDQSxPQUFLRCxPQUFPLElBQVosRUFBbUI7QUFDbEIsV0FBTyxRQUFQO0FBQ0E7O0FBRUQ7QUFDQSxVQUFPQSxHQUFHckcsS0FBSCxDQUFVLENBQVYsRUFBYSxDQUFDLENBQWQsSUFBb0IsSUFBcEIsR0FDTnFHLEdBQUdFLFVBQUgsQ0FBZUYsR0FBRzdSLE1BQUgsR0FBWSxDQUEzQixFQUErQjhDLFFBQS9CLENBQXlDLEVBQXpDLENBRE0sR0FDMEMsR0FEakQ7QUFFQTs7QUFFRDtBQUNBLFNBQU8sT0FBTytPLEVBQWQ7QUFDQSxFQS9LRjs7O0FBaUxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0FHLGlCQUFnQixTQUFoQkEsYUFBZ0IsR0FBVztBQUMxQnJEO0FBQ0EsRUF2TEY7QUFBQSxLQXlMQ3NELHFCQUFxQkMsY0FDcEIsVUFBVWxDLElBQVYsRUFBaUI7QUFDaEIsU0FBT0EsS0FBS21DLFFBQUwsS0FBa0IsSUFBbEIsSUFBMEJuQyxLQUFLb0MsUUFBTCxDQUFjaEwsV0FBZCxPQUFnQyxVQUFqRTtBQUNBLEVBSG1CLEVBSXBCLEVBQUVpTCxLQUFLLFlBQVAsRUFBcUJsTixNQUFNLFFBQTNCLEVBSm9CLENBekx0Qjs7QUFnTUE7QUFDQSxLQUFJO0FBQ0hmLE9BQUtrTyxLQUFMLENBQ0dyUyxNQUFNdUwsTUFBTStHLElBQU4sQ0FBWXJELGFBQWFzRCxVQUF6QixDQURULEVBRUN0RCxhQUFhc0QsVUFGZDs7QUFLQTtBQUNBO0FBQ0E7QUFDQXZTLE1BQUtpUCxhQUFhc0QsVUFBYixDQUF3QnhTLE1BQTdCLEVBQXNDbUksUUFBdEM7QUFDQSxFQVZELENBVUUsT0FBUXNLLENBQVIsRUFBWTtBQUNick8sU0FBTyxFQUFFa08sT0FBT3JTLElBQUlELE1BQUo7O0FBRWY7QUFDQSxhQUFVMFMsTUFBVixFQUFrQkMsR0FBbEIsRUFBd0I7QUFDdkI3QyxlQUFXd0MsS0FBWCxDQUFrQkksTUFBbEIsRUFBMEJsSCxNQUFNK0csSUFBTixDQUFZSSxHQUFaLENBQTFCO0FBQ0EsSUFMYzs7QUFPZjtBQUNBO0FBQ0EsYUFBVUQsTUFBVixFQUFrQkMsR0FBbEIsRUFBd0I7QUFDdkIsUUFBSUMsSUFBSUYsT0FBTzFTLE1BQWY7QUFBQSxRQUNDRyxJQUFJLENBREw7O0FBR0E7QUFDQSxXQUFVdVMsT0FBUUUsR0FBUixJQUFnQkQsSUFBS3hTLEdBQUwsQ0FBMUIsRUFBeUMsQ0FBRTtBQUMzQ3VTLFdBQU8xUyxNQUFQLEdBQWdCNFMsSUFBSSxDQUFwQjtBQUNBO0FBaEJLLEdBQVA7QUFrQkE7O0FBRUQsVUFBU3ZQLE1BQVQsQ0FBaUJFLFFBQWpCLEVBQTJCc1AsT0FBM0IsRUFBb0NDLE9BQXBDLEVBQTZDQyxJQUE3QyxFQUFvRDtBQUNuRCxNQUFJQyxDQUFKO0FBQUEsTUFBTzdTLENBQVA7QUFBQSxNQUFVNlAsSUFBVjtBQUFBLE1BQWdCaUQsR0FBaEI7QUFBQSxNQUFxQnpRLEtBQXJCO0FBQUEsTUFBNEIwUSxNQUE1QjtBQUFBLE1BQW9DQyxXQUFwQztBQUFBLE1BQ0NDLGFBQWFQLFdBQVdBLFFBQVFRLGFBRGpDOzs7QUFHQztBQUNBbEwsYUFBVzBLLFVBQVVBLFFBQVExSyxRQUFsQixHQUE2QixDQUp6Qzs7QUFNQTJLLFlBQVVBLFdBQVcsRUFBckI7O0FBRUE7QUFDQSxNQUFLLE9BQU92UCxRQUFQLEtBQW9CLFFBQXBCLElBQWdDLENBQUNBLFFBQWpDLElBQ0o0RSxhQUFhLENBQWIsSUFBa0JBLGFBQWEsQ0FBL0IsSUFBb0NBLGFBQWEsRUFEbEQsRUFDdUQ7O0FBRXRELFVBQU8ySyxPQUFQO0FBQ0E7O0FBRUQ7QUFDQSxNQUFLLENBQUNDLElBQU4sRUFBYTtBQUNacEUsZUFBYWtFLE9BQWI7QUFDQUEsYUFBVUEsV0FBV25QLFFBQXJCOztBQUVBLE9BQUttTCxjQUFMLEVBQXNCOztBQUVyQjtBQUNBO0FBQ0EsUUFBSzFHLGFBQWEsRUFBYixLQUFxQjNGLFFBQVEwTyxXQUFXb0MsSUFBWCxDQUFpQi9QLFFBQWpCLENBQTdCLENBQUwsRUFBa0U7O0FBRWpFO0FBQ0EsU0FBT3lQLElBQUl4USxNQUFPLENBQVAsQ0FBWCxFQUEwQjs7QUFFekI7QUFDQSxVQUFLMkYsYUFBYSxDQUFsQixFQUFzQjtBQUNyQixXQUFPNkgsT0FBTzZDLFFBQVFVLGNBQVIsQ0FBd0JQLENBQXhCLENBQWQsRUFBOEM7O0FBRTdDO0FBQ0E7QUFDQTtBQUNBLFlBQUtoRCxLQUFLd0QsRUFBTCxLQUFZUixDQUFqQixFQUFxQjtBQUNwQkYsaUJBQVExTyxJQUFSLENBQWM0TCxJQUFkO0FBQ0EsZ0JBQU84QyxPQUFQO0FBQ0E7QUFDRCxRQVRELE1BU087QUFDTixlQUFPQSxPQUFQO0FBQ0E7O0FBRUY7QUFDQyxPQWZELE1BZU87O0FBRU47QUFDQTtBQUNBO0FBQ0EsV0FBS00sZUFBZ0JwRCxPQUFPb0QsV0FBV0csY0FBWCxDQUEyQlAsQ0FBM0IsQ0FBdkIsS0FDSnpMLFNBQVVzTCxPQUFWLEVBQW1CN0MsSUFBbkIsQ0FESSxJQUVKQSxLQUFLd0QsRUFBTCxLQUFZUixDQUZiLEVBRWlCOztBQUVoQkYsZ0JBQVExTyxJQUFSLENBQWM0TCxJQUFkO0FBQ0EsZUFBTzhDLE9BQVA7QUFDQTtBQUNEOztBQUVGO0FBQ0MsTUFqQ0QsTUFpQ08sSUFBS3RRLE1BQU8sQ0FBUCxDQUFMLEVBQWtCO0FBQ3hCNEIsV0FBS2tPLEtBQUwsQ0FBWVEsT0FBWixFQUFxQkQsUUFBUVksb0JBQVIsQ0FBOEJsUSxRQUE5QixDQUFyQjtBQUNBLGFBQU91UCxPQUFQOztBQUVEO0FBQ0MsTUFMTSxNQUtBLElBQUssQ0FBRUUsSUFBSXhRLE1BQU8sQ0FBUCxDQUFOLEtBQXNCMEwsUUFBUXdGLHNCQUE5QixJQUNYYixRQUFRYSxzQkFERixFQUMyQjs7QUFFakN0UCxXQUFLa08sS0FBTCxDQUFZUSxPQUFaLEVBQXFCRCxRQUFRYSxzQkFBUixDQUFnQ1YsQ0FBaEMsQ0FBckI7QUFDQSxhQUFPRixPQUFQO0FBQ0E7QUFDRDs7QUFFRDtBQUNBLFFBQUs1RSxRQUFReUYsR0FBUixJQUNKLENBQUNsRSx1QkFBd0JsTSxXQUFXLEdBQW5DLENBREcsS0FFRixDQUFDdUwsU0FBRCxJQUFjLENBQUNBLFVBQVU5TixJQUFWLENBQWdCdUMsUUFBaEIsQ0FGYjs7QUFJSjtBQUNBO0FBQ0U0RSxpQkFBYSxDQUFiLElBQWtCMEssUUFBUVQsUUFBUixDQUFpQmhMLFdBQWpCLE9BQW1DLFFBTm5ELENBQUwsRUFNcUU7O0FBRXBFK0wsbUJBQWM1UCxRQUFkO0FBQ0E2UCxrQkFBYVAsT0FBYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQUsxSyxhQUFhLENBQWIsS0FDRnVJLFNBQVMxUCxJQUFULENBQWV1QyxRQUFmLEtBQTZCa04sYUFBYXpQLElBQWIsQ0FBbUJ1QyxRQUFuQixDQUQzQixDQUFMLEVBQ2tFOztBQUVqRTtBQUNBNlAsbUJBQWFqQyxTQUFTblEsSUFBVCxDQUFldUMsUUFBZixLQUE2QnFRLFlBQWFmLFFBQVFoUCxVQUFyQixDQUE3QixJQUNaZ1AsT0FERDs7QUFHQTtBQUNBO0FBQ0EsVUFBS08sZUFBZVAsT0FBZixJQUEwQixDQUFDM0UsUUFBUTJGLEtBQXhDLEVBQWdEOztBQUUvQztBQUNBLFdBQU9aLE1BQU1KLFFBQVExTSxZQUFSLENBQXNCLElBQXRCLENBQWIsRUFBOEM7QUFDN0M4TSxjQUFNQSxJQUFJM1MsT0FBSixDQUFhcVIsVUFBYixFQUF5QkMsVUFBekIsQ0FBTjtBQUNBLFFBRkQsTUFFTztBQUNOaUIsZ0JBQVFpQixZQUFSLENBQXNCLElBQXRCLEVBQThCYixNQUFNakUsT0FBcEM7QUFDQTtBQUNEOztBQUVEO0FBQ0FrRSxlQUFTNUUsU0FBVS9LLFFBQVYsQ0FBVDtBQUNBcEQsVUFBSStTLE9BQU9sVCxNQUFYO0FBQ0EsYUFBUUcsR0FBUixFQUFjO0FBQ2IrUyxjQUFRL1MsQ0FBUixJQUFjLENBQUU4UyxNQUFNLE1BQU1BLEdBQVosR0FBa0IsUUFBcEIsSUFBaUMsR0FBakMsR0FDYmMsV0FBWWIsT0FBUS9TLENBQVIsQ0FBWixDQUREO0FBRUE7QUFDRGdULG9CQUFjRCxPQUFPeFIsSUFBUCxDQUFhLEdBQWIsQ0FBZDtBQUNBOztBQUVELFNBQUk7QUFDSDBDLFdBQUtrTyxLQUFMLENBQVlRLE9BQVosRUFDQ00sV0FBVzlPLGdCQUFYLENBQTZCNk8sV0FBN0IsQ0FERDtBQUdBLGFBQU9MLE9BQVA7QUFDQSxNQUxELENBS0UsT0FBUWtCLFFBQVIsRUFBbUI7QUFDcEJ2RSw2QkFBd0JsTSxRQUF4QixFQUFrQyxJQUFsQztBQUNBLE1BUEQsU0FPVTtBQUNULFVBQUswUCxRQUFRakUsT0FBYixFQUF1QjtBQUN0QjZELGVBQVFvQixlQUFSLENBQXlCLElBQXpCO0FBQ0E7QUFDRDtBQUNEO0FBQ0Q7QUFDRDs7QUFFRDtBQUNBLFNBQU8xUCxPQUFRaEIsU0FBU2pELE9BQVQsQ0FBa0JpUSxLQUFsQixFQUF5QixJQUF6QixDQUFSLEVBQXlDc0MsT0FBekMsRUFBa0RDLE9BQWxELEVBQTJEQyxJQUEzRCxDQUFQO0FBQ0E7O0FBRUQ7Ozs7OztBQU1BLFVBQVN6RCxXQUFULEdBQXVCO0FBQ3RCLE1BQUkxSSxPQUFPLEVBQVg7O0FBRUEsV0FBU3NOLEtBQVQsQ0FBZ0JyTixHQUFoQixFQUFxQnhHLEtBQXJCLEVBQTZCOztBQUU1QjtBQUNBLE9BQUt1RyxLQUFLeEMsSUFBTCxDQUFXeUMsTUFBTSxHQUFqQixJQUF5QnNILEtBQUtnRyxXQUFuQyxFQUFpRDs7QUFFaEQ7QUFDQSxXQUFPRCxNQUFPdE4sS0FBS3ZCLEtBQUwsRUFBUCxDQUFQO0FBQ0E7QUFDRCxVQUFTNk8sTUFBT3JOLE1BQU0sR0FBYixJQUFxQnhHLEtBQTlCO0FBQ0E7QUFDRCxTQUFPNlQsS0FBUDtBQUNBOztBQUVEOzs7O0FBSUEsVUFBU0UsWUFBVCxDQUF1QkMsRUFBdkIsRUFBNEI7QUFDM0JBLEtBQUlyRixPQUFKLElBQWdCLElBQWhCO0FBQ0EsU0FBT3FGLEVBQVA7QUFDQTs7QUFFRDs7OztBQUlBLFVBQVNDLE1BQVQsQ0FBaUJELEVBQWpCLEVBQXNCO0FBQ3JCLE1BQUlFLEtBQUs3USxTQUFTOFEsYUFBVCxDQUF3QixVQUF4QixDQUFUOztBQUVBLE1BQUk7QUFDSCxVQUFPLENBQUMsQ0FBQ0gsR0FBSUUsRUFBSixDQUFUO0FBQ0EsR0FGRCxDQUVFLE9BQVE5QixDQUFSLEVBQVk7QUFDYixVQUFPLEtBQVA7QUFDQSxHQUpELFNBSVU7O0FBRVQ7QUFDQSxPQUFLOEIsR0FBRzFRLFVBQVIsRUFBcUI7QUFDcEIwUSxPQUFHMVEsVUFBSCxDQUFjNFEsV0FBZCxDQUEyQkYsRUFBM0I7QUFDQTs7QUFFRDtBQUNBQSxRQUFLLElBQUw7QUFDQTtBQUNEOztBQUVEOzs7OztBQUtBLFVBQVNHLFNBQVQsQ0FBb0JDLEtBQXBCLEVBQTJCQyxPQUEzQixFQUFxQztBQUNwQyxNQUFJM1UsTUFBTTBVLE1BQU10TyxLQUFOLENBQWEsR0FBYixDQUFWO0FBQUEsTUFDQ2xHLElBQUlGLElBQUlELE1BRFQ7O0FBR0EsU0FBUUcsR0FBUixFQUFjO0FBQ2JnTyxRQUFLMEcsVUFBTCxDQUFpQjVVLElBQUtFLENBQUwsQ0FBakIsSUFBOEJ5VSxPQUE5QjtBQUNBO0FBQ0Q7O0FBRUQ7Ozs7OztBQU1BLFVBQVNFLFlBQVQsQ0FBdUJwTCxDQUF2QixFQUEwQmlHLENBQTFCLEVBQThCO0FBQzdCLE1BQUlvRixNQUFNcEYsS0FBS2pHLENBQWY7QUFBQSxNQUNDc0wsT0FBT0QsT0FBT3JMLEVBQUV2QixRQUFGLEtBQWUsQ0FBdEIsSUFBMkJ3SCxFQUFFeEgsUUFBRixLQUFlLENBQTFDLElBQ051QixFQUFFdUwsV0FBRixHQUFnQnRGLEVBQUVzRixXQUZwQjs7QUFJQTtBQUNBLE1BQUtELElBQUwsRUFBWTtBQUNYLFVBQU9BLElBQVA7QUFDQTs7QUFFRDtBQUNBLE1BQUtELEdBQUwsRUFBVztBQUNWLFVBQVVBLE1BQU1BLElBQUlHLFdBQXBCLEVBQW9DO0FBQ25DLFFBQUtILFFBQVFwRixDQUFiLEVBQWlCO0FBQ2hCLFlBQU8sQ0FBQyxDQUFSO0FBQ0E7QUFDRDtBQUNEOztBQUVELFNBQU9qRyxJQUFJLENBQUosR0FBUSxDQUFDLENBQWhCO0FBQ0E7O0FBRUQ7Ozs7QUFJQSxVQUFTeUwsaUJBQVQsQ0FBNEJsTixJQUE1QixFQUFtQztBQUNsQyxTQUFPLFVBQVUrSCxJQUFWLEVBQWlCO0FBQ3ZCLE9BQUl2TyxPQUFPdU8sS0FBS29DLFFBQUwsQ0FBY2hMLFdBQWQsRUFBWDtBQUNBLFVBQU8zRixTQUFTLE9BQVQsSUFBb0J1TyxLQUFLL0gsSUFBTCxLQUFjQSxJQUF6QztBQUNBLEdBSEQ7QUFJQTs7QUFFRDs7OztBQUlBLFVBQVNtTixrQkFBVCxDQUE2Qm5OLElBQTdCLEVBQW9DO0FBQ25DLFNBQU8sVUFBVStILElBQVYsRUFBaUI7QUFDdkIsT0FBSXZPLE9BQU91TyxLQUFLb0MsUUFBTCxDQUFjaEwsV0FBZCxFQUFYO0FBQ0EsVUFBTyxDQUFFM0YsU0FBUyxPQUFULElBQW9CQSxTQUFTLFFBQS9CLEtBQTZDdU8sS0FBSy9ILElBQUwsS0FBY0EsSUFBbEU7QUFDQSxHQUhEO0FBSUE7O0FBRUQ7Ozs7QUFJQSxVQUFTb04sb0JBQVQsQ0FBK0JsRCxRQUEvQixFQUEwQzs7QUFFekM7QUFDQSxTQUFPLFVBQVVuQyxJQUFWLEVBQWlCOztBQUV2QjtBQUNBO0FBQ0E7QUFDQSxPQUFLLFVBQVVBLElBQWYsRUFBc0I7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBS0EsS0FBS25NLFVBQUwsSUFBbUJtTSxLQUFLbUMsUUFBTCxLQUFrQixLQUExQyxFQUFrRDs7QUFFakQ7QUFDQSxTQUFLLFdBQVduQyxJQUFoQixFQUF1QjtBQUN0QixVQUFLLFdBQVdBLEtBQUtuTSxVQUFyQixFQUFrQztBQUNqQyxjQUFPbU0sS0FBS25NLFVBQUwsQ0FBZ0JzTyxRQUFoQixLQUE2QkEsUUFBcEM7QUFDQSxPQUZELE1BRU87QUFDTixjQUFPbkMsS0FBS21DLFFBQUwsS0FBa0JBLFFBQXpCO0FBQ0E7QUFDRDs7QUFFRDtBQUNBO0FBQ0EsWUFBT25DLEtBQUtzRixVQUFMLEtBQW9CbkQsUUFBcEI7O0FBRU47QUFDQTtBQUNBbkMsVUFBS3NGLFVBQUwsS0FBb0IsQ0FBQ25ELFFBQXJCLElBQ0FGLG1CQUFvQmpDLElBQXBCLE1BQStCbUMsUUFMaEM7QUFNQTs7QUFFRCxXQUFPbkMsS0FBS21DLFFBQUwsS0FBa0JBLFFBQXpCOztBQUVEO0FBQ0E7QUFDQTtBQUNDLElBbkNELE1BbUNPLElBQUssV0FBV25DLElBQWhCLEVBQXVCO0FBQzdCLFdBQU9BLEtBQUttQyxRQUFMLEtBQWtCQSxRQUF6QjtBQUNBOztBQUVEO0FBQ0EsVUFBTyxLQUFQO0FBQ0EsR0E5Q0Q7QUErQ0E7O0FBRUQ7Ozs7QUFJQSxVQUFTb0Qsc0JBQVQsQ0FBaUNsQixFQUFqQyxFQUFzQztBQUNyQyxTQUFPRCxhQUFjLFVBQVVvQixRQUFWLEVBQXFCO0FBQ3pDQSxjQUFXLENBQUNBLFFBQVo7QUFDQSxVQUFPcEIsYUFBYyxVQUFVckIsSUFBVixFQUFnQnhKLE9BQWhCLEVBQTBCO0FBQzlDLFFBQUlxSixDQUFKO0FBQUEsUUFDQzZDLGVBQWVwQixHQUFJLEVBQUosRUFBUXRCLEtBQUsvUyxNQUFiLEVBQXFCd1YsUUFBckIsQ0FEaEI7QUFBQSxRQUVDclYsSUFBSXNWLGFBQWF6VixNQUZsQjs7QUFJQTtBQUNBLFdBQVFHLEdBQVIsRUFBYztBQUNiLFNBQUs0UyxLQUFRSCxJQUFJNkMsYUFBY3RWLENBQWQsQ0FBWixDQUFMLEVBQXlDO0FBQ3hDNFMsV0FBTUgsQ0FBTixJQUFZLEVBQUdySixRQUFTcUosQ0FBVCxJQUFlRyxLQUFNSCxDQUFOLENBQWxCLENBQVo7QUFDQTtBQUNEO0FBQ0QsSUFYTSxDQUFQO0FBWUEsR0FkTSxDQUFQO0FBZUE7O0FBRUQ7Ozs7O0FBS0EsVUFBU2dCLFdBQVQsQ0FBc0JmLE9BQXRCLEVBQWdDO0FBQy9CLFNBQU9BLFdBQVcsT0FBT0EsUUFBUVksb0JBQWYsS0FBd0MsV0FBbkQsSUFBa0VaLE9BQXpFO0FBQ0E7O0FBRUQ7QUFDQTNFLFdBQVU3SyxPQUFPNkssT0FBUCxHQUFpQixFQUEzQjs7QUFFQTs7Ozs7QUFLQUcsU0FBUWhMLE9BQU9nTCxLQUFQLEdBQWUsVUFBVTJCLElBQVYsRUFBaUI7QUFDdkMsTUFBSTBGLFlBQVkxRixRQUFRQSxLQUFLMkYsWUFBN0I7QUFBQSxNQUNDL0csVUFBVW9CLFFBQVEsQ0FBRUEsS0FBS3FELGFBQUwsSUFBc0JyRCxJQUF4QixFQUErQjRGLGVBRGxEOztBQUdBO0FBQ0E7QUFDQTtBQUNBLFNBQU8sQ0FBQzlFLE1BQU05UCxJQUFOLENBQVkwVSxhQUFhOUcsV0FBV0EsUUFBUXdELFFBQWhDLElBQTRDLE1BQXhELENBQVI7QUFDQSxFQVJEOztBQVVBOzs7OztBQUtBekQsZUFBY3RMLE9BQU9zTCxXQUFQLEdBQXFCLFVBQVVoSCxJQUFWLEVBQWlCO0FBQ25ELE1BQUlrTyxVQUFKO0FBQUEsTUFBZ0JDLFNBQWhCO0FBQUEsTUFDQ2xTLE1BQU0rRCxPQUFPQSxLQUFLMEwsYUFBTCxJQUFzQjFMLElBQTdCLEdBQW9DdUgsWUFEM0M7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUt0TCxPQUFPRixRQUFQLElBQW1CRSxJQUFJdUUsUUFBSixLQUFpQixDQUFwQyxJQUF5QyxDQUFDdkUsSUFBSWdTLGVBQW5ELEVBQXFFO0FBQ3BFLFVBQU9sUyxRQUFQO0FBQ0E7O0FBRUQ7QUFDQUEsYUFBV0UsR0FBWDtBQUNBZ0wsWUFBVWxMLFNBQVNrUyxlQUFuQjtBQUNBL0csbUJBQWlCLENBQUNSLE1BQU8zSyxRQUFQLENBQWxCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUt3TCxnQkFBZ0J4TCxRQUFoQixLQUNGb1MsWUFBWXBTLFNBQVNxUyxXQURuQixLQUNvQ0QsVUFBVUUsR0FBVixLQUFrQkYsU0FEM0QsRUFDdUU7O0FBRXRFO0FBQ0EsT0FBS0EsVUFBVUcsZ0JBQWYsRUFBa0M7QUFDakNILGNBQVVHLGdCQUFWLENBQTRCLFFBQTVCLEVBQXNDakUsYUFBdEMsRUFBcUQsS0FBckQ7O0FBRUQ7QUFDQyxJQUpELE1BSU8sSUFBSzhELFVBQVVJLFdBQWYsRUFBNkI7QUFDbkNKLGNBQVVJLFdBQVYsQ0FBdUIsVUFBdkIsRUFBbUNsRSxhQUFuQztBQUNBO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOUQsVUFBUTJGLEtBQVIsR0FBZ0JTLE9BQVEsVUFBVUMsRUFBVixFQUFlO0FBQ3RDM0YsV0FBUXVILFdBQVIsQ0FBcUI1QixFQUFyQixFQUEwQjRCLFdBQTFCLENBQXVDelMsU0FBUzhRLGFBQVQsQ0FBd0IsS0FBeEIsQ0FBdkM7QUFDQSxVQUFPLE9BQU9ELEdBQUdqUSxnQkFBVixLQUErQixXQUEvQixJQUNOLENBQUNpUSxHQUFHalEsZ0JBQUgsQ0FBcUIscUJBQXJCLEVBQTZDdEUsTUFEL0M7QUFFQSxHQUplLENBQWhCOztBQU1BOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQWtPLFVBQVEvTSxVQUFSLEdBQXFCbVQsT0FBUSxVQUFVQyxFQUFWLEVBQWU7QUFDM0NBLE1BQUduSyxTQUFILEdBQWUsR0FBZjtBQUNBLFVBQU8sQ0FBQ21LLEdBQUdwTyxZQUFILENBQWlCLFdBQWpCLENBQVI7QUFDQSxHQUhvQixDQUFyQjs7QUFLQTs7O0FBR0E7QUFDQStILFVBQVF1RixvQkFBUixHQUErQmEsT0FBUSxVQUFVQyxFQUFWLEVBQWU7QUFDckRBLE1BQUc0QixXQUFILENBQWdCelMsU0FBUzBTLGFBQVQsQ0FBd0IsRUFBeEIsQ0FBaEI7QUFDQSxVQUFPLENBQUM3QixHQUFHZCxvQkFBSCxDQUF5QixHQUF6QixFQUErQnpULE1BQXZDO0FBQ0EsR0FIOEIsQ0FBL0I7O0FBS0E7QUFDQWtPLFVBQVF3RixzQkFBUixHQUFpQ3pDLFFBQVFqUSxJQUFSLENBQWMwQyxTQUFTZ1Esc0JBQXZCLENBQWpDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0F4RixVQUFRbUksT0FBUixHQUFrQi9CLE9BQVEsVUFBVUMsRUFBVixFQUFlO0FBQ3hDM0YsV0FBUXVILFdBQVIsQ0FBcUI1QixFQUFyQixFQUEwQmYsRUFBMUIsR0FBK0J4RSxPQUEvQjtBQUNBLFVBQU8sQ0FBQ3RMLFNBQVM0UyxpQkFBVixJQUErQixDQUFDNVMsU0FBUzRTLGlCQUFULENBQTRCdEgsT0FBNUIsRUFBc0NoUCxNQUE3RTtBQUNBLEdBSGlCLENBQWxCOztBQUtBO0FBQ0EsTUFBS2tPLFFBQVFtSSxPQUFiLEVBQXVCO0FBQ3RCbEksUUFBSzdILE1BQUwsQ0FBYSxJQUFiLElBQXNCLFVBQVVrTixFQUFWLEVBQWU7QUFDcEMsUUFBSStDLFNBQVMvQyxHQUFHbFQsT0FBSCxDQUFZOFEsU0FBWixFQUF1QkMsU0FBdkIsQ0FBYjtBQUNBLFdBQU8sVUFBVXJCLElBQVYsRUFBaUI7QUFDdkIsWUFBT0EsS0FBSzdKLFlBQUwsQ0FBbUIsSUFBbkIsTUFBOEJvUSxNQUFyQztBQUNBLEtBRkQ7QUFHQSxJQUxEO0FBTUFwSSxRQUFLN0UsSUFBTCxDQUFXLElBQVgsSUFBb0IsVUFBVWtLLEVBQVYsRUFBY1gsT0FBZCxFQUF3QjtBQUMzQyxRQUFLLE9BQU9BLFFBQVFVLGNBQWYsS0FBa0MsV0FBbEMsSUFBaUQxRSxjQUF0RCxFQUF1RTtBQUN0RSxTQUFJbUIsT0FBTzZDLFFBQVFVLGNBQVIsQ0FBd0JDLEVBQXhCLENBQVg7QUFDQSxZQUFPeEQsT0FBTyxDQUFFQSxJQUFGLENBQVAsR0FBa0IsRUFBekI7QUFDQTtBQUNELElBTEQ7QUFNQSxHQWJELE1BYU87QUFDTjdCLFFBQUs3SCxNQUFMLENBQWEsSUFBYixJQUF1QixVQUFVa04sRUFBVixFQUFlO0FBQ3JDLFFBQUkrQyxTQUFTL0MsR0FBR2xULE9BQUgsQ0FBWThRLFNBQVosRUFBdUJDLFNBQXZCLENBQWI7QUFDQSxXQUFPLFVBQVVyQixJQUFWLEVBQWlCO0FBQ3ZCLFNBQUlySSxPQUFPLE9BQU9xSSxLQUFLd0csZ0JBQVosS0FBaUMsV0FBakMsSUFDVnhHLEtBQUt3RyxnQkFBTCxDQUF1QixJQUF2QixDQUREO0FBRUEsWUFBTzdPLFFBQVFBLEtBQUt0SCxLQUFMLEtBQWVrVyxNQUE5QjtBQUNBLEtBSkQ7QUFLQSxJQVBEOztBQVNBO0FBQ0E7QUFDQXBJLFFBQUs3RSxJQUFMLENBQVcsSUFBWCxJQUFvQixVQUFVa0ssRUFBVixFQUFjWCxPQUFkLEVBQXdCO0FBQzNDLFFBQUssT0FBT0EsUUFBUVUsY0FBZixLQUFrQyxXQUFsQyxJQUFpRDFFLGNBQXRELEVBQXVFO0FBQ3RFLFNBQUlsSCxJQUFKO0FBQUEsU0FBVXhILENBQVY7QUFBQSxTQUFhc1csS0FBYjtBQUFBLFNBQ0N6RyxPQUFPNkMsUUFBUVUsY0FBUixDQUF3QkMsRUFBeEIsQ0FEUjs7QUFHQSxTQUFLeEQsSUFBTCxFQUFZOztBQUVYO0FBQ0FySSxhQUFPcUksS0FBS3dHLGdCQUFMLENBQXVCLElBQXZCLENBQVA7QUFDQSxVQUFLN08sUUFBUUEsS0FBS3RILEtBQUwsS0FBZW1ULEVBQTVCLEVBQWlDO0FBQ2hDLGNBQU8sQ0FBRXhELElBQUYsQ0FBUDtBQUNBOztBQUVEO0FBQ0F5RyxjQUFRNUQsUUFBUXlELGlCQUFSLENBQTJCOUMsRUFBM0IsQ0FBUjtBQUNBclQsVUFBSSxDQUFKO0FBQ0EsYUFBVTZQLE9BQU95RyxNQUFPdFcsR0FBUCxDQUFqQixFQUFrQztBQUNqQ3dILGNBQU9xSSxLQUFLd0csZ0JBQUwsQ0FBdUIsSUFBdkIsQ0FBUDtBQUNBLFdBQUs3TyxRQUFRQSxLQUFLdEgsS0FBTCxLQUFlbVQsRUFBNUIsRUFBaUM7QUFDaEMsZUFBTyxDQUFFeEQsSUFBRixDQUFQO0FBQ0E7QUFDRDtBQUNEOztBQUVELFlBQU8sRUFBUDtBQUNBO0FBQ0QsSUExQkQ7QUEyQkE7O0FBRUQ7QUFDQTdCLE9BQUs3RSxJQUFMLENBQVcsS0FBWCxJQUFxQjRFLFFBQVF1RixvQkFBUixHQUNwQixVQUFVeFIsR0FBVixFQUFlNFEsT0FBZixFQUF5QjtBQUN4QixPQUFLLE9BQU9BLFFBQVFZLG9CQUFmLEtBQXdDLFdBQTdDLEVBQTJEO0FBQzFELFdBQU9aLFFBQVFZLG9CQUFSLENBQThCeFIsR0FBOUIsQ0FBUDs7QUFFRDtBQUNDLElBSkQsTUFJTyxJQUFLaU0sUUFBUXlGLEdBQWIsRUFBbUI7QUFDekIsV0FBT2QsUUFBUXZPLGdCQUFSLENBQTBCckMsR0FBMUIsQ0FBUDtBQUNBO0FBQ0QsR0FUbUIsR0FXcEIsVUFBVUEsR0FBVixFQUFlNFEsT0FBZixFQUF5QjtBQUN4QixPQUFJN0MsSUFBSjtBQUFBLE9BQ0MwRyxNQUFNLEVBRFA7QUFBQSxPQUVDdlcsSUFBSSxDQUZMOzs7QUFJQztBQUNBMlMsYUFBVUQsUUFBUVksb0JBQVIsQ0FBOEJ4UixHQUE5QixDQUxYOztBQU9BO0FBQ0EsT0FBS0EsUUFBUSxHQUFiLEVBQW1CO0FBQ2xCLFdBQVUrTixPQUFPOEMsUUFBUzNTLEdBQVQsQ0FBakIsRUFBb0M7QUFDbkMsU0FBSzZQLEtBQUs3SCxRQUFMLEtBQWtCLENBQXZCLEVBQTJCO0FBQzFCdU8sVUFBSXRTLElBQUosQ0FBVTRMLElBQVY7QUFDQTtBQUNEOztBQUVELFdBQU8wRyxHQUFQO0FBQ0E7QUFDRCxVQUFPNUQsT0FBUDtBQUNBLEdBOUJGOztBQWdDQTtBQUNBM0UsT0FBSzdFLElBQUwsQ0FBVyxPQUFYLElBQXVCNEUsUUFBUXdGLHNCQUFSLElBQWtDLFVBQVV0SixTQUFWLEVBQXFCeUksT0FBckIsRUFBK0I7QUFDdkYsT0FBSyxPQUFPQSxRQUFRYSxzQkFBZixLQUEwQyxXQUExQyxJQUF5RDdFLGNBQTlELEVBQStFO0FBQzlFLFdBQU9nRSxRQUFRYSxzQkFBUixDQUFnQ3RKLFNBQWhDLENBQVA7QUFDQTtBQUNELEdBSkQ7O0FBTUE7OztBQUdBOztBQUVBO0FBQ0EyRSxrQkFBZ0IsRUFBaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBRCxjQUFZLEVBQVo7O0FBRUEsTUFBT1osUUFBUXlGLEdBQVIsR0FBYzFDLFFBQVFqUSxJQUFSLENBQWMwQyxTQUFTWSxnQkFBdkIsQ0FBckIsRUFBbUU7O0FBRWxFO0FBQ0E7QUFDQWdRLFVBQVEsVUFBVUMsRUFBVixFQUFlOztBQUV0QixRQUFJdkcsS0FBSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FZLFlBQVF1SCxXQUFSLENBQXFCNUIsRUFBckIsRUFBMEJvQyxTQUExQixHQUFzQyxZQUFZM0gsT0FBWixHQUFzQixRQUF0QixHQUNyQyxjQURxQyxHQUNwQkEsT0FEb0IsR0FDViwyQkFEVSxHQUVyQyx3Q0FGRDs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQUt1RixHQUFHalEsZ0JBQUgsQ0FBcUIsc0JBQXJCLEVBQThDdEUsTUFBbkQsRUFBNEQ7QUFDM0Q4TyxlQUFVMUssSUFBVixDQUFnQixXQUFXK0wsVUFBWCxHQUF3QixjQUF4QztBQUNBOztBQUVEO0FBQ0E7QUFDQSxRQUFLLENBQUNvRSxHQUFHalEsZ0JBQUgsQ0FBcUIsWUFBckIsRUFBb0N0RSxNQUExQyxFQUFtRDtBQUNsRDhPLGVBQVUxSyxJQUFWLENBQWdCLFFBQVErTCxVQUFSLEdBQXFCLFlBQXJCLEdBQW9DRCxRQUFwQyxHQUErQyxHQUEvRDtBQUNBOztBQUVEO0FBQ0EsUUFBSyxDQUFDcUUsR0FBR2pRLGdCQUFILENBQXFCLFVBQVUwSyxPQUFWLEdBQW9CLElBQXpDLEVBQWdEaFAsTUFBdEQsRUFBK0Q7QUFDOUQ4TyxlQUFVMUssSUFBVixDQUFnQixJQUFoQjtBQUNBOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTRKLFlBQVF0SyxTQUFTOFEsYUFBVCxDQUF3QixPQUF4QixDQUFSO0FBQ0F4RyxVQUFNOEYsWUFBTixDQUFvQixNQUFwQixFQUE0QixFQUE1QjtBQUNBUyxPQUFHNEIsV0FBSCxDQUFnQm5JLEtBQWhCO0FBQ0EsUUFBSyxDQUFDdUcsR0FBR2pRLGdCQUFILENBQXFCLFdBQXJCLEVBQW1DdEUsTUFBekMsRUFBa0Q7QUFDakQ4TyxlQUFVMUssSUFBVixDQUFnQixRQUFRK0wsVUFBUixHQUFxQixPQUFyQixHQUErQkEsVUFBL0IsR0FBNEMsSUFBNUMsR0FDZkEsVUFEZSxHQUNGLGNBRGQ7QUFFQTs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxRQUFLLENBQUNvRSxHQUFHalEsZ0JBQUgsQ0FBcUIsVUFBckIsRUFBa0N0RSxNQUF4QyxFQUFpRDtBQUNoRDhPLGVBQVUxSyxJQUFWLENBQWdCLFVBQWhCO0FBQ0E7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsUUFBSyxDQUFDbVEsR0FBR2pRLGdCQUFILENBQXFCLE9BQU8wSyxPQUFQLEdBQWlCLElBQXRDLEVBQTZDaFAsTUFBbkQsRUFBNEQ7QUFDM0Q4TyxlQUFVMUssSUFBVixDQUFnQixVQUFoQjtBQUNBOztBQUVEO0FBQ0E7QUFDQW1RLE9BQUdqUSxnQkFBSCxDQUFxQixNQUFyQjtBQUNBd0ssY0FBVTFLLElBQVYsQ0FBZ0IsYUFBaEI7QUFDQSxJQS9ERDs7QUFpRUFrUSxVQUFRLFVBQVVDLEVBQVYsRUFBZTtBQUN0QkEsT0FBR29DLFNBQUgsR0FBZSx3Q0FDZCxnREFERDs7QUFHQTtBQUNBO0FBQ0EsUUFBSTNJLFFBQVF0SyxTQUFTOFEsYUFBVCxDQUF3QixPQUF4QixDQUFaO0FBQ0F4RyxVQUFNOEYsWUFBTixDQUFvQixNQUFwQixFQUE0QixRQUE1QjtBQUNBUyxPQUFHNEIsV0FBSCxDQUFnQm5JLEtBQWhCLEVBQXdCOEYsWUFBeEIsQ0FBc0MsTUFBdEMsRUFBOEMsR0FBOUM7O0FBRUE7QUFDQTtBQUNBLFFBQUtTLEdBQUdqUSxnQkFBSCxDQUFxQixVQUFyQixFQUFrQ3RFLE1BQXZDLEVBQWdEO0FBQy9DOE8sZUFBVTFLLElBQVYsQ0FBZ0IsU0FBUytMLFVBQVQsR0FBc0IsYUFBdEM7QUFDQTs7QUFFRDtBQUNBO0FBQ0EsUUFBS29FLEdBQUdqUSxnQkFBSCxDQUFxQixVQUFyQixFQUFrQ3RFLE1BQWxDLEtBQTZDLENBQWxELEVBQXNEO0FBQ3JEOE8sZUFBVTFLLElBQVYsQ0FBZ0IsVUFBaEIsRUFBNEIsV0FBNUI7QUFDQTs7QUFFRDtBQUNBO0FBQ0F3SyxZQUFRdUgsV0FBUixDQUFxQjVCLEVBQXJCLEVBQTBCcEMsUUFBMUIsR0FBcUMsSUFBckM7QUFDQSxRQUFLb0MsR0FBR2pRLGdCQUFILENBQXFCLFdBQXJCLEVBQW1DdEUsTUFBbkMsS0FBOEMsQ0FBbkQsRUFBdUQ7QUFDdEQ4TyxlQUFVMUssSUFBVixDQUFnQixVQUFoQixFQUE0QixXQUE1QjtBQUNBOztBQUVEO0FBQ0E7QUFDQW1RLE9BQUdqUSxnQkFBSCxDQUFxQixNQUFyQjtBQUNBd0ssY0FBVTFLLElBQVYsQ0FBZ0IsTUFBaEI7QUFDQSxJQWpDRDtBQWtDQTs7QUFFRCxNQUFPOEosUUFBUTBJLGVBQVIsR0FBMEIzRixRQUFRalEsSUFBUixDQUFnQnVJLFVBQVVxRixRQUFRckYsT0FBUixJQUMxRHFGLFFBQVFpSSxxQkFEa0QsSUFFMURqSSxRQUFRa0ksa0JBRmtELElBRzFEbEksUUFBUW1JLGdCQUhrRCxJQUkxRG5JLFFBQVFvSSxpQkFKd0IsQ0FBakMsRUFJbUM7O0FBRWxDMUMsVUFBUSxVQUFVQyxFQUFWLEVBQWU7O0FBRXRCO0FBQ0E7QUFDQXJHLFlBQVErSSxpQkFBUixHQUE0QjFOLFFBQVFnSixJQUFSLENBQWNnQyxFQUFkLEVBQWtCLEdBQWxCLENBQTVCOztBQUVBO0FBQ0E7QUFDQWhMLFlBQVFnSixJQUFSLENBQWNnQyxFQUFkLEVBQWtCLFdBQWxCO0FBQ0F4RixrQkFBYzNLLElBQWQsQ0FBb0IsSUFBcEIsRUFBMEJpTSxPQUExQjtBQUNBLElBVkQ7QUFXQTs7QUFFRHZCLGNBQVlBLFVBQVU5TyxNQUFWLElBQW9CLElBQUlrSSxNQUFKLENBQVk0RyxVQUFVcE4sSUFBVixDQUFnQixHQUFoQixDQUFaLENBQWhDO0FBQ0FxTixrQkFBZ0JBLGNBQWMvTyxNQUFkLElBQXdCLElBQUlrSSxNQUFKLENBQVk2RyxjQUFjck4sSUFBZCxDQUFvQixHQUFwQixDQUFaLENBQXhDOztBQUVBOztBQUVBbVUsZUFBYTVFLFFBQVFqUSxJQUFSLENBQWM0TixRQUFRc0ksdUJBQXRCLENBQWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EzUCxhQUFXc08sY0FBYzVFLFFBQVFqUSxJQUFSLENBQWM0TixRQUFRckgsUUFBdEIsQ0FBZCxHQUNWLFVBQVVtQyxDQUFWLEVBQWFpRyxDQUFiLEVBQWlCO0FBQ2hCLE9BQUl3SCxRQUFRek4sRUFBRXZCLFFBQUYsS0FBZSxDQUFmLEdBQW1CdUIsRUFBRWtNLGVBQXJCLEdBQXVDbE0sQ0FBbkQ7QUFBQSxPQUNDME4sTUFBTXpILEtBQUtBLEVBQUU5TCxVQURkO0FBRUEsVUFBTzZGLE1BQU0wTixHQUFOLElBQWEsQ0FBQyxFQUFHQSxPQUFPQSxJQUFJalAsUUFBSixLQUFpQixDQUF4QixLQUN2QmdQLE1BQU01UCxRQUFOLEdBQ0M0UCxNQUFNNVAsUUFBTixDQUFnQjZQLEdBQWhCLENBREQsR0FFQzFOLEVBQUV3Tix1QkFBRixJQUE2QnhOLEVBQUV3Tix1QkFBRixDQUEyQkUsR0FBM0IsSUFBbUMsRUFIMUMsQ0FBSCxDQUFyQjtBQUtBLEdBVFMsR0FVVixVQUFVMU4sQ0FBVixFQUFhaUcsQ0FBYixFQUFpQjtBQUNoQixPQUFLQSxDQUFMLEVBQVM7QUFDUixXQUFVQSxJQUFJQSxFQUFFOUwsVUFBaEIsRUFBK0I7QUFDOUIsU0FBSzhMLE1BQU1qRyxDQUFYLEVBQWU7QUFDZCxhQUFPLElBQVA7QUFDQTtBQUNEO0FBQ0Q7QUFDRCxVQUFPLEtBQVA7QUFDQSxHQW5CRjs7QUFxQkE7OztBQUdBO0FBQ0FnRyxjQUFZbUcsYUFDWixVQUFVbk0sQ0FBVixFQUFhaUcsQ0FBYixFQUFpQjs7QUFFaEI7QUFDQSxPQUFLakcsTUFBTWlHLENBQVgsRUFBZTtBQUNkakIsbUJBQWUsSUFBZjtBQUNBLFdBQU8sQ0FBUDtBQUNBOztBQUVEO0FBQ0EsT0FBSTFHLFVBQVUsQ0FBQzBCLEVBQUV3Tix1QkFBSCxHQUE2QixDQUFDdkgsRUFBRXVILHVCQUE5QztBQUNBLE9BQUtsUCxPQUFMLEVBQWU7QUFDZCxXQUFPQSxPQUFQO0FBQ0E7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQSxhQUFVLENBQUUwQixFQUFFMkosYUFBRixJQUFtQjNKLENBQXJCLE1BQThCaUcsRUFBRTBELGFBQUYsSUFBbUIxRCxDQUFqRCxJQUNUakcsRUFBRXdOLHVCQUFGLENBQTJCdkgsQ0FBM0IsQ0FEUzs7QUFHVDtBQUNBLElBSkQ7O0FBTUE7QUFDQSxPQUFLM0gsVUFBVSxDQUFWLElBQ0YsQ0FBQ2tHLFFBQVFtSixZQUFULElBQXlCMUgsRUFBRXVILHVCQUFGLENBQTJCeE4sQ0FBM0IsTUFBbUMxQixPQUQvRCxFQUMyRTs7QUFFMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQUswQixLQUFLaEcsUUFBTCxJQUFpQmdHLEVBQUUySixhQUFGLElBQW1CbkUsWUFBbkIsSUFDckIzSCxTQUFVMkgsWUFBVixFQUF3QnhGLENBQXhCLENBREQsRUFDK0I7QUFDOUIsWUFBTyxDQUFDLENBQVI7QUFDQTs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQUtpRyxLQUFLak0sUUFBTCxJQUFpQmlNLEVBQUUwRCxhQUFGLElBQW1CbkUsWUFBbkIsSUFDckIzSCxTQUFVMkgsWUFBVixFQUF3QlMsQ0FBeEIsQ0FERCxFQUMrQjtBQUM5QixZQUFPLENBQVA7QUFDQTs7QUFFRDtBQUNBLFdBQU9sQixZQUNKbkgsUUFBU21ILFNBQVQsRUFBb0IvRSxDQUFwQixJQUEwQnBDLFFBQVNtSCxTQUFULEVBQW9Ca0IsQ0FBcEIsQ0FEdEIsR0FFTixDQUZEO0FBR0E7O0FBRUQsVUFBTzNILFVBQVUsQ0FBVixHQUFjLENBQUMsQ0FBZixHQUFtQixDQUExQjtBQUNBLEdBeERXLEdBeURaLFVBQVUwQixDQUFWLEVBQWFpRyxDQUFiLEVBQWlCOztBQUVoQjtBQUNBLE9BQUtqRyxNQUFNaUcsQ0FBWCxFQUFlO0FBQ2RqQixtQkFBZSxJQUFmO0FBQ0EsV0FBTyxDQUFQO0FBQ0E7O0FBRUQsT0FBSXFHLEdBQUo7QUFBQSxPQUNDNVUsSUFBSSxDQURMO0FBQUEsT0FFQ21YLE1BQU01TixFQUFFN0YsVUFGVDtBQUFBLE9BR0N1VCxNQUFNekgsRUFBRTlMLFVBSFQ7QUFBQSxPQUlDMFQsS0FBSyxDQUFFN04sQ0FBRixDQUpOO0FBQUEsT0FLQzhOLEtBQUssQ0FBRTdILENBQUYsQ0FMTjs7QUFPQTtBQUNBLE9BQUssQ0FBQzJILEdBQUQsSUFBUSxDQUFDRixHQUFkLEVBQW9COztBQUVuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQU8xTixLQUFLaEcsUUFBTCxHQUFnQixDQUFDLENBQWpCLEdBQ05pTSxLQUFLak0sUUFBTCxHQUFnQixDQUFoQjtBQUNBO0FBQ0E0VCxVQUFNLENBQUMsQ0FBUCxHQUNBRixNQUFNLENBQU4sR0FDQTNJLFlBQ0VuSCxRQUFTbUgsU0FBVCxFQUFvQi9FLENBQXBCLElBQTBCcEMsUUFBU21ILFNBQVQsRUFBb0JrQixDQUFwQixDQUQ1QixHQUVBLENBUEQ7O0FBU0Q7QUFDQyxJQWhCRCxNQWdCTyxJQUFLMkgsUUFBUUYsR0FBYixFQUFtQjtBQUN6QixXQUFPdEMsYUFBY3BMLENBQWQsRUFBaUJpRyxDQUFqQixDQUFQO0FBQ0E7O0FBRUQ7QUFDQW9GLFNBQU1yTCxDQUFOO0FBQ0EsVUFBVXFMLE1BQU1BLElBQUlsUixVQUFwQixFQUFtQztBQUNsQzBULE9BQUd2UyxPQUFILENBQVkrUCxHQUFaO0FBQ0E7QUFDREEsU0FBTXBGLENBQU47QUFDQSxVQUFVb0YsTUFBTUEsSUFBSWxSLFVBQXBCLEVBQW1DO0FBQ2xDMlQsT0FBR3hTLE9BQUgsQ0FBWStQLEdBQVo7QUFDQTs7QUFFRDtBQUNBLFVBQVF3QyxHQUFJcFgsQ0FBSixNQUFZcVgsR0FBSXJYLENBQUosQ0FBcEIsRUFBOEI7QUFDN0JBO0FBQ0E7O0FBRUQsVUFBT0E7O0FBRU47QUFDQTJVLGdCQUFjeUMsR0FBSXBYLENBQUosQ0FBZCxFQUF1QnFYLEdBQUlyWCxDQUFKLENBQXZCLENBSE07O0FBS047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBb1gsTUFBSXBYLENBQUosS0FBVytPLFlBQVgsR0FBMEIsQ0FBQyxDQUEzQixHQUNBc0ksR0FBSXJYLENBQUosS0FBVytPLFlBQVgsR0FBMEIsQ0FBMUI7QUFDQTtBQUNBLElBYkQ7QUFjQSxHQTFIRDs7QUE0SEEsU0FBT3hMLFFBQVA7QUFDQSxFQTFkRDs7QUE0ZEFMLFFBQU9rRyxPQUFQLEdBQWlCLFVBQVVrTyxJQUFWLEVBQWdCeFQsUUFBaEIsRUFBMkI7QUFDM0MsU0FBT1osT0FBUW9VLElBQVIsRUFBYyxJQUFkLEVBQW9CLElBQXBCLEVBQTBCeFQsUUFBMUIsQ0FBUDtBQUNBLEVBRkQ7O0FBSUFaLFFBQU91VCxlQUFQLEdBQXlCLFVBQVU1RyxJQUFWLEVBQWdCeUgsSUFBaEIsRUFBdUI7QUFDL0M5SSxjQUFhcUIsSUFBYjs7QUFFQSxNQUFLOUIsUUFBUTBJLGVBQVIsSUFBMkIvSCxjQUEzQixJQUNKLENBQUNZLHVCQUF3QmdJLE9BQU8sR0FBL0IsQ0FERyxLQUVGLENBQUMxSSxhQUFELElBQWtCLENBQUNBLGNBQWMvTixJQUFkLENBQW9CeVcsSUFBcEIsQ0FGakIsTUFHRixDQUFDM0ksU0FBRCxJQUFrQixDQUFDQSxVQUFVOU4sSUFBVixDQUFnQnlXLElBQWhCLENBSGpCLENBQUwsRUFHaUQ7O0FBRWhELE9BQUk7QUFDSCxRQUFJQyxNQUFNbk8sUUFBUWdKLElBQVIsQ0FBY3ZDLElBQWQsRUFBb0J5SCxJQUFwQixDQUFWOztBQUVBO0FBQ0EsUUFBS0MsT0FBT3hKLFFBQVErSSxpQkFBZjs7QUFFSjtBQUNBO0FBQ0FqSCxTQUFLdE0sUUFBTCxJQUFpQnNNLEtBQUt0TSxRQUFMLENBQWN5RSxRQUFkLEtBQTJCLEVBSjdDLEVBSWtEO0FBQ2pELFlBQU91UCxHQUFQO0FBQ0E7QUFDRCxJQVhELENBV0UsT0FBUWpGLENBQVIsRUFBWTtBQUNiaEQsMkJBQXdCZ0ksSUFBeEIsRUFBOEIsSUFBOUI7QUFDQTtBQUNEOztBQUVELFNBQU9wVSxPQUFRb1UsSUFBUixFQUFjL1QsUUFBZCxFQUF3QixJQUF4QixFQUE4QixDQUFFc00sSUFBRixDQUE5QixFQUF5Q2hRLE1BQXpDLEdBQWtELENBQXpEO0FBQ0EsRUF6QkQ7O0FBMkJBcUQsUUFBT2tFLFFBQVAsR0FBa0IsVUFBVXNMLE9BQVYsRUFBbUI3QyxJQUFuQixFQUEwQjs7QUFFM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUssQ0FBRTZDLFFBQVFRLGFBQVIsSUFBeUJSLE9BQTNCLEtBQXdDblAsUUFBN0MsRUFBd0Q7QUFDdkRpTCxlQUFha0UsT0FBYjtBQUNBO0FBQ0QsU0FBT3RMLFNBQVVzTCxPQUFWLEVBQW1CN0MsSUFBbkIsQ0FBUDtBQUNBLEVBWEQ7O0FBYUEzTSxRQUFPc1UsSUFBUCxHQUFjLFVBQVUzSCxJQUFWLEVBQWdCdk8sSUFBaEIsRUFBdUI7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLLENBQUV1TyxLQUFLcUQsYUFBTCxJQUFzQnJELElBQXhCLEtBQWtDdE0sUUFBdkMsRUFBa0Q7QUFDakRpTCxlQUFhcUIsSUFBYjtBQUNBOztBQUVELE1BQUlxRSxLQUFLbEcsS0FBSzBHLFVBQUwsQ0FBaUJwVCxLQUFLMkYsV0FBTCxFQUFqQixDQUFUOzs7QUFFQztBQUNBcUMsUUFBTTRLLE1BQU16RSxPQUFPMkMsSUFBUCxDQUFhcEUsS0FBSzBHLFVBQWxCLEVBQThCcFQsS0FBSzJGLFdBQUwsRUFBOUIsQ0FBTixHQUNMaU4sR0FBSXJFLElBQUosRUFBVXZPLElBQVYsRUFBZ0IsQ0FBQ29OLGNBQWpCLENBREssR0FFTDNJLFNBTEY7O0FBT0EsU0FBT3VELFFBQVF2RCxTQUFSLEdBQ051RCxHQURNLEdBRU55RSxRQUFRL00sVUFBUixJQUFzQixDQUFDME4sY0FBdkIsR0FDQ21CLEtBQUs3SixZQUFMLENBQW1CMUUsSUFBbkIsQ0FERCxHQUVDLENBQUVnSSxNQUFNdUcsS0FBS3dHLGdCQUFMLENBQXVCL1UsSUFBdkIsQ0FBUixLQUEyQ2dJLElBQUltTyxTQUEvQyxHQUNDbk8sSUFBSXBKLEtBREwsR0FFQyxJQU5IO0FBT0EsRUF6QkQ7O0FBMkJBZ0QsUUFBT2lPLE1BQVAsR0FBZ0IsVUFBVXVHLEdBQVYsRUFBZ0I7QUFDL0IsU0FBTyxDQUFFQSxNQUFNLEVBQVIsRUFBYXZYLE9BQWIsQ0FBc0JxUixVQUF0QixFQUFrQ0MsVUFBbEMsQ0FBUDtBQUNBLEVBRkQ7O0FBSUF2TyxRQUFPeVUsS0FBUCxHQUFlLFVBQVVDLEdBQVYsRUFBZ0I7QUFDOUIsUUFBTSxJQUFJMU0sS0FBSixDQUFXLDRDQUE0QzBNLEdBQXZELENBQU47QUFDQSxFQUZEOztBQUlBOzs7O0FBSUExVSxRQUFPMlUsVUFBUCxHQUFvQixVQUFVbEYsT0FBVixFQUFvQjtBQUN2QyxNQUFJOUMsSUFBSjtBQUFBLE1BQ0NpSSxhQUFhLEVBRGQ7QUFBQSxNQUVDckYsSUFBSSxDQUZMO0FBQUEsTUFHQ3pTLElBQUksQ0FITDs7QUFLQTtBQUNBdU8saUJBQWUsQ0FBQ1IsUUFBUWdLLGdCQUF4QjtBQUNBekosY0FBWSxDQUFDUCxRQUFRaUssVUFBVCxJQUF1QnJGLFFBQVF0SCxLQUFSLENBQWUsQ0FBZixDQUFuQztBQUNBc0gsVUFBUTdOLElBQVIsQ0FBY3lLLFNBQWQ7O0FBRUEsTUFBS2hCLFlBQUwsRUFBb0I7QUFDbkIsVUFBVXNCLE9BQU84QyxRQUFTM1MsR0FBVCxDQUFqQixFQUFvQztBQUNuQyxRQUFLNlAsU0FBUzhDLFFBQVMzUyxDQUFULENBQWQsRUFBNkI7QUFDNUJ5UyxTQUFJcUYsV0FBVzdULElBQVgsQ0FBaUJqRSxDQUFqQixDQUFKO0FBQ0E7QUFDRDtBQUNELFVBQVF5UyxHQUFSLEVBQWM7QUFDYkUsWUFBUXNGLE1BQVIsQ0FBZ0JILFdBQVlyRixDQUFaLENBQWhCLEVBQWlDLENBQWpDO0FBQ0E7QUFDRDs7QUFFRDtBQUNBO0FBQ0FuRSxjQUFZLElBQVo7O0FBRUEsU0FBT3FFLE9BQVA7QUFDQSxFQTNCRDs7QUE2QkE7Ozs7QUFJQTFFLFdBQVUvSyxPQUFPK0ssT0FBUCxHQUFpQixVQUFVNEIsSUFBVixFQUFpQjtBQUMzQyxNQUFJckksSUFBSjtBQUFBLE1BQ0MrUCxNQUFNLEVBRFA7QUFBQSxNQUVDdlgsSUFBSSxDQUZMO0FBQUEsTUFHQ2dJLFdBQVc2SCxLQUFLN0gsUUFIakI7O0FBS0EsTUFBSyxDQUFDQSxRQUFOLEVBQWlCOztBQUVoQjtBQUNBLFVBQVVSLE9BQU9xSSxLQUFNN1AsR0FBTixDQUFqQixFQUFpQzs7QUFFaEM7QUFDQXVYLFdBQU90SixRQUFTekcsSUFBVCxDQUFQO0FBQ0E7QUFDRCxHQVJELE1BUU8sSUFBS1EsYUFBYSxDQUFiLElBQWtCQSxhQUFhLENBQS9CLElBQW9DQSxhQUFhLEVBQXRELEVBQTJEOztBQUVqRTtBQUNBO0FBQ0EsT0FBSyxPQUFPNkgsS0FBS3RGLFdBQVosS0FBNEIsUUFBakMsRUFBNEM7QUFDM0MsV0FBT3NGLEtBQUt0RixXQUFaO0FBQ0EsSUFGRCxNQUVPOztBQUVOO0FBQ0EsU0FBTXNGLE9BQU9BLEtBQUtyRixVQUFsQixFQUE4QnFGLElBQTlCLEVBQW9DQSxPQUFPQSxLQUFLa0YsV0FBaEQsRUFBOEQ7QUFDN0R3QyxZQUFPdEosUUFBUzRCLElBQVQsQ0FBUDtBQUNBO0FBQ0Q7QUFDRCxHQWJNLE1BYUEsSUFBSzdILGFBQWEsQ0FBYixJQUFrQkEsYUFBYSxDQUFwQyxFQUF3QztBQUM5QyxVQUFPNkgsS0FBS3BGLFNBQVo7QUFDQTs7QUFFRDs7QUFFQSxTQUFPOE0sR0FBUDtBQUNBLEVBbENEOztBQW9DQXZKLFFBQU85SyxPQUFPZ1YsU0FBUCxHQUFtQjs7QUFFekI7QUFDQWxFLGVBQWEsRUFIWTs7QUFLekJtRSxnQkFBY2xFLFlBTFc7O0FBT3pCNVIsU0FBT3FPLFNBUGtCOztBQVN6QmdFLGNBQVksRUFUYTs7QUFXekJ2TCxRQUFNLEVBWG1COztBQWF6QmlQLFlBQVU7QUFDVCxRQUFLLEVBQUVsRyxLQUFLLFlBQVAsRUFBcUJtRyxPQUFPLElBQTVCLEVBREk7QUFFVCxRQUFLLEVBQUVuRyxLQUFLLFlBQVAsRUFGSTtBQUdULFFBQUssRUFBRUEsS0FBSyxpQkFBUCxFQUEwQm1HLE9BQU8sSUFBakMsRUFISTtBQUlULFFBQUssRUFBRW5HLEtBQUssaUJBQVA7QUFKSSxHQWJlOztBQW9CekJvRyxhQUFXO0FBQ1YsV0FBUSxjQUFValcsS0FBVixFQUFrQjtBQUN6QkEsVUFBTyxDQUFQLElBQWFBLE1BQU8sQ0FBUCxFQUFXbEMsT0FBWCxDQUFvQjhRLFNBQXBCLEVBQStCQyxTQUEvQixDQUFiOztBQUVBO0FBQ0E3TyxVQUFPLENBQVAsSUFBYSxDQUFFQSxNQUFPLENBQVAsS0FBY0EsTUFBTyxDQUFQLENBQWQsSUFDZEEsTUFBTyxDQUFQLENBRGMsSUFDQSxFQURGLEVBQ09sQyxPQURQLENBQ2dCOFEsU0FEaEIsRUFDMkJDLFNBRDNCLENBQWI7O0FBR0EsUUFBSzdPLE1BQU8sQ0FBUCxNQUFlLElBQXBCLEVBQTJCO0FBQzFCQSxXQUFPLENBQVAsSUFBYSxNQUFNQSxNQUFPLENBQVAsQ0FBTixHQUFtQixHQUFoQztBQUNBOztBQUVELFdBQU9BLE1BQU1nSixLQUFOLENBQWEsQ0FBYixFQUFnQixDQUFoQixDQUFQO0FBQ0EsSUFiUzs7QUFlVixZQUFTLGVBQVVoSixLQUFWLEVBQWtCOztBQUUxQjs7Ozs7Ozs7OztBQVVBQSxVQUFPLENBQVAsSUFBYUEsTUFBTyxDQUFQLEVBQVc0RSxXQUFYLEVBQWI7O0FBRUEsUUFBSzVFLE1BQU8sQ0FBUCxFQUFXZ0osS0FBWCxDQUFrQixDQUFsQixFQUFxQixDQUFyQixNQUE2QixLQUFsQyxFQUEwQzs7QUFFekM7QUFDQSxTQUFLLENBQUNoSixNQUFPLENBQVAsQ0FBTixFQUFtQjtBQUNsQmEsYUFBT3lVLEtBQVAsQ0FBY3RWLE1BQU8sQ0FBUCxDQUFkO0FBQ0E7O0FBRUQ7QUFDQTtBQUNBQSxXQUFPLENBQVAsSUFBYSxFQUFHQSxNQUFPLENBQVAsSUFDZkEsTUFBTyxDQUFQLEtBQWVBLE1BQU8sQ0FBUCxLQUFjLENBQTdCLENBRGUsR0FFZixLQUFNQSxNQUFPLENBQVAsTUFBZSxNQUFmLElBQXlCQSxNQUFPLENBQVAsTUFBZSxLQUE5QyxDQUZZLENBQWI7QUFHQUEsV0FBTyxDQUFQLElBQWEsRUFBS0EsTUFBTyxDQUFQLElBQWFBLE1BQU8sQ0FBUCxDQUFmLElBQStCQSxNQUFPLENBQVAsTUFBZSxLQUFqRCxDQUFiOztBQUVBO0FBQ0EsS0FmRCxNQWVPLElBQUtBLE1BQU8sQ0FBUCxDQUFMLEVBQWtCO0FBQ3hCYSxZQUFPeVUsS0FBUCxDQUFjdFYsTUFBTyxDQUFQLENBQWQ7QUFDQTs7QUFFRCxXQUFPQSxLQUFQO0FBQ0EsSUFqRFM7O0FBbURWLGFBQVUsZ0JBQVVBLEtBQVYsRUFBa0I7QUFDM0IsUUFBSWtXLE1BQUo7QUFBQSxRQUNDQyxXQUFXLENBQUNuVyxNQUFPLENBQVAsQ0FBRCxJQUFlQSxNQUFPLENBQVAsQ0FEM0I7O0FBR0EsUUFBS3FPLFVBQVcsT0FBWCxFQUFxQjdQLElBQXJCLENBQTJCd0IsTUFBTyxDQUFQLENBQTNCLENBQUwsRUFBK0M7QUFDOUMsWUFBTyxJQUFQO0FBQ0E7O0FBRUQ7QUFDQSxRQUFLQSxNQUFPLENBQVAsQ0FBTCxFQUFrQjtBQUNqQkEsV0FBTyxDQUFQLElBQWFBLE1BQU8sQ0FBUCxLQUFjQSxNQUFPLENBQVAsQ0FBZCxJQUE0QixFQUF6Qzs7QUFFRDtBQUNDLEtBSkQsTUFJTyxJQUFLbVcsWUFBWWhJLFFBQVEzUCxJQUFSLENBQWMyWCxRQUFkLENBQVo7O0FBRVg7QUFDRUQsYUFBU3BLLFNBQVVxSyxRQUFWLEVBQW9CLElBQXBCLENBSEE7O0FBS1g7QUFDRUQsYUFBU0MsU0FBU3JSLE9BQVQsQ0FBa0IsR0FBbEIsRUFBdUJxUixTQUFTM1ksTUFBVCxHQUFrQjBZLE1BQXpDLElBQW9EQyxTQUFTM1ksTUFON0QsQ0FBTCxFQU02RTs7QUFFbkY7QUFDQXdDLFdBQU8sQ0FBUCxJQUFhQSxNQUFPLENBQVAsRUFBV2dKLEtBQVgsQ0FBa0IsQ0FBbEIsRUFBcUJrTixNQUFyQixDQUFiO0FBQ0FsVyxXQUFPLENBQVAsSUFBYW1XLFNBQVNuTixLQUFULENBQWdCLENBQWhCLEVBQW1Ca04sTUFBbkIsQ0FBYjtBQUNBOztBQUVEO0FBQ0EsV0FBT2xXLE1BQU1nSixLQUFOLENBQWEsQ0FBYixFQUFnQixDQUFoQixDQUFQO0FBQ0E7QUEvRVMsR0FwQmM7O0FBc0d6QmxGLFVBQVE7O0FBRVAsVUFBTyxhQUFVc1MsZ0JBQVYsRUFBNkI7QUFDbkMsUUFBSXhHLFdBQVd3RyxpQkFBaUJ0WSxPQUFqQixDQUEwQjhRLFNBQTFCLEVBQXFDQyxTQUFyQyxFQUFpRGpLLFdBQWpELEVBQWY7QUFDQSxXQUFPd1IscUJBQXFCLEdBQXJCLEdBQ04sWUFBVztBQUNWLFlBQU8sSUFBUDtBQUNBLEtBSEssR0FJTixVQUFVNUksSUFBVixFQUFpQjtBQUNoQixZQUFPQSxLQUFLb0MsUUFBTCxJQUFpQnBDLEtBQUtvQyxRQUFMLENBQWNoTCxXQUFkLE9BQWdDZ0wsUUFBeEQ7QUFDQSxLQU5GO0FBT0EsSUFYTTs7QUFhUCxZQUFTLGVBQVVoSSxTQUFWLEVBQXNCO0FBQzlCLFFBQUlySSxVQUFVc04sV0FBWWpGLFlBQVksR0FBeEIsQ0FBZDs7QUFFQSxXQUFPckksV0FDTixDQUFFQSxVQUFVLElBQUltRyxNQUFKLENBQVksUUFBUWlJLFVBQVIsR0FDdkIsR0FEdUIsR0FDakIvRixTQURpQixHQUNMLEdBREssR0FDQytGLFVBREQsR0FDYyxLQUQxQixDQUFaLEtBQ21EZCxXQUNqRGpGLFNBRGlELEVBQ3RDLFVBQVU0RixJQUFWLEVBQWlCO0FBQzNCLFlBQU9qTyxRQUFRZixJQUFSLENBQ04sT0FBT2dQLEtBQUs1RixTQUFaLEtBQTBCLFFBQTFCLElBQXNDNEYsS0FBSzVGLFNBQTNDLElBQ0EsT0FBTzRGLEtBQUs3SixZQUFaLEtBQTZCLFdBQTdCLElBQ0M2SixLQUFLN0osWUFBTCxDQUFtQixPQUFuQixDQUZELElBR0EsRUFKTSxDQUFQO0FBTUYsS0FSa0QsQ0FGcEQ7QUFXQSxJQTNCTTs7QUE2QlAsV0FBUSxjQUFVMUUsSUFBVixFQUFnQm9YLFFBQWhCLEVBQTBCMU4sS0FBMUIsRUFBa0M7QUFDekMsV0FBTyxVQUFVNkUsSUFBVixFQUFpQjtBQUN2QixTQUFJaEgsU0FBUzNGLE9BQU9zVSxJQUFQLENBQWEzSCxJQUFiLEVBQW1Cdk8sSUFBbkIsQ0FBYjs7QUFFQSxTQUFLdUgsVUFBVSxJQUFmLEVBQXNCO0FBQ3JCLGFBQU82UCxhQUFhLElBQXBCO0FBQ0E7QUFDRCxTQUFLLENBQUNBLFFBQU4sRUFBaUI7QUFDaEIsYUFBTyxJQUFQO0FBQ0E7O0FBRUQ3UCxlQUFVLEVBQVY7O0FBRUE7O0FBRUEsWUFBTzZQLGFBQWEsR0FBYixHQUFtQjdQLFdBQVdtQyxLQUE5QixHQUNOME4sYUFBYSxJQUFiLEdBQW9CN1AsV0FBV21DLEtBQS9CLEdBQ0EwTixhQUFhLElBQWIsR0FBb0IxTixTQUFTbkMsT0FBTzFCLE9BQVAsQ0FBZ0I2RCxLQUFoQixNQUE0QixDQUF6RCxHQUNBME4sYUFBYSxJQUFiLEdBQW9CMU4sU0FBU25DLE9BQU8xQixPQUFQLENBQWdCNkQsS0FBaEIsSUFBMEIsQ0FBQyxDQUF4RCxHQUNBME4sYUFBYSxJQUFiLEdBQW9CMU4sU0FBU25DLE9BQU93QyxLQUFQLENBQWMsQ0FBQ0wsTUFBTW5MLE1BQXJCLE1BQWtDbUwsS0FBL0QsR0FDQTBOLGFBQWEsSUFBYixHQUFvQixDQUFFLE1BQU03UCxPQUFPMUksT0FBUCxDQUFnQmdRLFdBQWhCLEVBQTZCLEdBQTdCLENBQU4sR0FBMkMsR0FBN0MsRUFBbURoSixPQUFuRCxDQUE0RDZELEtBQTVELElBQXNFLENBQUMsQ0FBM0YsR0FDQTBOLGFBQWEsSUFBYixHQUFvQjdQLFdBQVdtQyxLQUFYLElBQW9CbkMsT0FBT3dDLEtBQVAsQ0FBYyxDQUFkLEVBQWlCTCxNQUFNbkwsTUFBTixHQUFlLENBQWhDLE1BQXdDbUwsUUFBUSxHQUF4RixHQUNBLEtBUEQ7QUFRQTtBQUVBLEtBeEJEO0FBeUJBLElBdkRNOztBQXlEUCxZQUFTLGVBQVVsRCxJQUFWLEVBQWdCNlEsSUFBaEIsRUFBc0JDLFNBQXRCLEVBQWlDUCxLQUFqQyxFQUF3Q1EsSUFBeEMsRUFBK0M7QUFDdkQsUUFBSUMsU0FBU2hSLEtBQUt1RCxLQUFMLENBQVksQ0FBWixFQUFlLENBQWYsTUFBdUIsS0FBcEM7QUFBQSxRQUNDME4sVUFBVWpSLEtBQUt1RCxLQUFMLENBQVksQ0FBQyxDQUFiLE1BQXFCLE1BRGhDO0FBQUEsUUFFQzJOLFNBQVNMLFNBQVMsU0FGbkI7O0FBSUEsV0FBT04sVUFBVSxDQUFWLElBQWVRLFNBQVMsQ0FBeEI7O0FBRU47QUFDQSxjQUFVaEosSUFBVixFQUFpQjtBQUNoQixZQUFPLENBQUMsQ0FBQ0EsS0FBS25NLFVBQWQ7QUFDQSxLQUxLLEdBT04sVUFBVW1NLElBQVYsRUFBZ0JvSixRQUFoQixFQUEwQkMsR0FBMUIsRUFBZ0M7QUFDL0IsU0FBSW5GLEtBQUo7QUFBQSxTQUFXb0YsV0FBWDtBQUFBLFNBQXdCQyxVQUF4QjtBQUFBLFNBQW9DNVIsSUFBcEM7QUFBQSxTQUEwQzZSLFNBQTFDO0FBQUEsU0FBcURDLEtBQXJEO0FBQUEsU0FDQ3BILE1BQU00RyxXQUFXQyxPQUFYLEdBQXFCLGFBQXJCLEdBQXFDLGlCQUQ1QztBQUFBLFNBRUMxVixTQUFTd00sS0FBS25NLFVBRmY7QUFBQSxTQUdDcEMsT0FBTzBYLFVBQVVuSixLQUFLb0MsUUFBTCxDQUFjaEwsV0FBZCxFQUhsQjtBQUFBLFNBSUNzUyxXQUFXLENBQUNMLEdBQUQsSUFBUSxDQUFDRixNQUpyQjtBQUFBLFNBS0NuRSxPQUFPLEtBTFI7O0FBT0EsU0FBS3hSLE1BQUwsRUFBYzs7QUFFYjtBQUNBLFVBQUt5VixNQUFMLEVBQWM7QUFDYixjQUFRNUcsR0FBUixFQUFjO0FBQ2IxSyxlQUFPcUksSUFBUDtBQUNBLGVBQVVySSxPQUFPQSxLQUFNMEssR0FBTixDQUFqQixFQUFpQztBQUNoQyxhQUFLOEcsU0FDSnhSLEtBQUt5SyxRQUFMLENBQWNoTCxXQUFkLE9BQWdDM0YsSUFENUIsR0FFSmtHLEtBQUtRLFFBQUwsS0FBa0IsQ0FGbkIsRUFFdUI7O0FBRXRCLGlCQUFPLEtBQVA7QUFDQTtBQUNEOztBQUVEO0FBQ0FzUixnQkFBUXBILE1BQU1wSyxTQUFTLE1BQVQsSUFBbUIsQ0FBQ3dSLEtBQXBCLElBQTZCLGFBQTNDO0FBQ0E7QUFDRCxjQUFPLElBQVA7QUFDQTs7QUFFREEsY0FBUSxDQUFFUCxVQUFVMVYsT0FBT21ILFVBQWpCLEdBQThCbkgsT0FBT21XLFNBQXZDLENBQVI7O0FBRUE7QUFDQSxVQUFLVCxXQUFXUSxRQUFoQixFQUEyQjs7QUFFMUI7O0FBRUE7QUFDQS9SLGNBQU9uRSxNQUFQO0FBQ0ErVixvQkFBYTVSLEtBQU1xSCxPQUFOLE1BQXFCckgsS0FBTXFILE9BQU4sSUFBa0IsRUFBdkMsQ0FBYjs7QUFFQTtBQUNBO0FBQ0FzSyxxQkFBY0MsV0FBWTVSLEtBQUtpUyxRQUFqQixNQUNYTCxXQUFZNVIsS0FBS2lTLFFBQWpCLElBQThCLEVBRG5CLENBQWQ7O0FBR0ExRixlQUFRb0YsWUFBYXJSLElBQWIsS0FBdUIsRUFBL0I7QUFDQXVSLG1CQUFZdEYsTUFBTyxDQUFQLE1BQWUvRSxPQUFmLElBQTBCK0UsTUFBTyxDQUFQLENBQXRDO0FBQ0FjLGNBQU93RSxhQUFhdEYsTUFBTyxDQUFQLENBQXBCO0FBQ0F2TSxjQUFPNlIsYUFBYWhXLE9BQU9nUCxVQUFQLENBQW1CZ0gsU0FBbkIsQ0FBcEI7O0FBRUEsY0FBVTdSLE9BQU8sRUFBRTZSLFNBQUYsSUFBZTdSLElBQWYsSUFBdUJBLEtBQU0wSyxHQUFOLENBQXZCOztBQUVoQjtBQUNFMkMsY0FBT3dFLFlBQVksQ0FITCxLQUdZQyxNQUFNL04sR0FBTixFQUg3QixFQUc2Qzs7QUFFNUM7QUFDQSxZQUFLL0QsS0FBS1EsUUFBTCxLQUFrQixDQUFsQixJQUF1QixFQUFFNk0sSUFBekIsSUFBaUNyTixTQUFTcUksSUFBL0MsRUFBc0Q7QUFDckRzSixxQkFBYXJSLElBQWIsSUFBc0IsQ0FBRWtILE9BQUYsRUFBV3FLLFNBQVgsRUFBc0J4RSxJQUF0QixDQUF0QjtBQUNBO0FBQ0E7QUFDRDtBQUVELE9BOUJELE1BOEJPOztBQUVOO0FBQ0EsV0FBSzBFLFFBQUwsRUFBZ0I7O0FBRWY7QUFDQS9SLGVBQU9xSSxJQUFQO0FBQ0F1SixxQkFBYTVSLEtBQU1xSCxPQUFOLE1BQXFCckgsS0FBTXFILE9BQU4sSUFBa0IsRUFBdkMsQ0FBYjs7QUFFQTtBQUNBO0FBQ0FzSyxzQkFBY0MsV0FBWTVSLEtBQUtpUyxRQUFqQixNQUNYTCxXQUFZNVIsS0FBS2lTLFFBQWpCLElBQThCLEVBRG5CLENBQWQ7O0FBR0ExRixnQkFBUW9GLFlBQWFyUixJQUFiLEtBQXVCLEVBQS9CO0FBQ0F1UixvQkFBWXRGLE1BQU8sQ0FBUCxNQUFlL0UsT0FBZixJQUEwQitFLE1BQU8sQ0FBUCxDQUF0QztBQUNBYyxlQUFPd0UsU0FBUDtBQUNBOztBQUVEO0FBQ0E7QUFDQSxXQUFLeEUsU0FBUyxLQUFkLEVBQXNCOztBQUVyQjtBQUNBLGVBQVVyTixPQUFPLEVBQUU2UixTQUFGLElBQWU3UixJQUFmLElBQXVCQSxLQUFNMEssR0FBTixDQUF2QixLQUNkMkMsT0FBT3dFLFlBQVksQ0FETCxLQUNZQyxNQUFNL04sR0FBTixFQUQ3QixFQUM2Qzs7QUFFNUMsYUFBSyxDQUFFeU4sU0FDTnhSLEtBQUt5SyxRQUFMLENBQWNoTCxXQUFkLE9BQWdDM0YsSUFEMUIsR0FFTmtHLEtBQUtRLFFBQUwsS0FBa0IsQ0FGZCxLQUdKLEVBQUU2TSxJQUhILEVBR1U7O0FBRVQ7QUFDQSxjQUFLMEUsUUFBTCxFQUFnQjtBQUNmSCx3QkFBYTVSLEtBQU1xSCxPQUFOLE1BQ1ZySCxLQUFNcUgsT0FBTixJQUFrQixFQURSLENBQWI7O0FBR0E7QUFDQTtBQUNBc0sseUJBQWNDLFdBQVk1UixLQUFLaVMsUUFBakIsTUFDWEwsV0FBWTVSLEtBQUtpUyxRQUFqQixJQUE4QixFQURuQixDQUFkOztBQUdBTix1QkFBYXJSLElBQWIsSUFBc0IsQ0FBRWtILE9BQUYsRUFBVzZGLElBQVgsQ0FBdEI7QUFDQTs7QUFFRCxjQUFLck4sU0FBU3FJLElBQWQsRUFBcUI7QUFDcEI7QUFDQTtBQUNEO0FBQ0Q7QUFDRDtBQUNEOztBQUVEO0FBQ0FnRixjQUFRZ0UsSUFBUjtBQUNBLGFBQU9oRSxTQUFTd0QsS0FBVCxJQUFvQnhELE9BQU93RCxLQUFQLEtBQWlCLENBQWpCLElBQXNCeEQsT0FBT3dELEtBQVAsSUFBZ0IsQ0FBakU7QUFDQTtBQUNELEtBOUhGO0FBK0hBLElBN0xNOztBQStMUCxhQUFVLGdCQUFVblgsTUFBVixFQUFrQm1VLFFBQWxCLEVBQTZCOztBQUV0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQUlxRSxJQUFKO0FBQUEsUUFDQ3hGLEtBQUtsRyxLQUFLa0MsT0FBTCxDQUFjaFAsTUFBZCxLQUEwQjhNLEtBQUsyTCxVQUFMLENBQWlCelksT0FBTytGLFdBQVAsRUFBakIsQ0FBMUIsSUFDSi9ELE9BQU95VSxLQUFQLENBQWMseUJBQXlCelcsTUFBdkMsQ0FGRjs7QUFJQTtBQUNBO0FBQ0E7QUFDQSxRQUFLZ1QsR0FBSXJGLE9BQUosQ0FBTCxFQUFxQjtBQUNwQixZQUFPcUYsR0FBSW1CLFFBQUosQ0FBUDtBQUNBOztBQUVEO0FBQ0EsUUFBS25CLEdBQUdyVSxNQUFILEdBQVksQ0FBakIsRUFBcUI7QUFDcEI2WixZQUFPLENBQUV4WSxNQUFGLEVBQVVBLE1BQVYsRUFBa0IsRUFBbEIsRUFBc0JtVSxRQUF0QixDQUFQO0FBQ0EsWUFBT3JILEtBQUsyTCxVQUFMLENBQWdCakssY0FBaEIsQ0FBZ0N4TyxPQUFPK0YsV0FBUCxFQUFoQyxJQUNOZ04sYUFBYyxVQUFVckIsSUFBVixFQUFnQnhKLE9BQWhCLEVBQTBCO0FBQ3ZDLFVBQUl3USxHQUFKO0FBQUEsVUFDQ0MsVUFBVTNGLEdBQUl0QixJQUFKLEVBQVV5QyxRQUFWLENBRFg7QUFBQSxVQUVDclYsSUFBSTZaLFFBQVFoYSxNQUZiO0FBR0EsYUFBUUcsR0FBUixFQUFjO0FBQ2I0WixhQUFNelMsUUFBU3lMLElBQVQsRUFBZWlILFFBQVM3WixDQUFULENBQWYsQ0FBTjtBQUNBNFMsWUFBTWdILEdBQU4sSUFBYyxFQUFHeFEsUUFBU3dRLEdBQVQsSUFBaUJDLFFBQVM3WixDQUFULENBQXBCLENBQWQ7QUFDQTtBQUNELE1BUkQsQ0FETSxHQVVOLFVBQVU2UCxJQUFWLEVBQWlCO0FBQ2hCLGFBQU9xRSxHQUFJckUsSUFBSixFQUFVLENBQVYsRUFBYTZKLElBQWIsQ0FBUDtBQUNBLE1BWkY7QUFhQTs7QUFFRCxXQUFPeEYsRUFBUDtBQUNBO0FBbk9NLEdBdEdpQjs7QUE0VXpCaEUsV0FBUzs7QUFFUjtBQUNBLFVBQU8rRCxhQUFjLFVBQVU3USxRQUFWLEVBQXFCOztBQUV6QztBQUNBO0FBQ0E7QUFDQSxRQUFJeUssUUFBUSxFQUFaO0FBQUEsUUFDQzhFLFVBQVUsRUFEWDtBQUFBLFFBRUNtSCxVQUFVMUwsUUFBU2hMLFNBQVNqRCxPQUFULENBQWtCaVEsS0FBbEIsRUFBeUIsSUFBekIsQ0FBVCxDQUZYOztBQUlBLFdBQU8wSixRQUFTakwsT0FBVCxJQUNOb0YsYUFBYyxVQUFVckIsSUFBVixFQUFnQnhKLE9BQWhCLEVBQXlCNlAsUUFBekIsRUFBbUNDLEdBQW5DLEVBQXlDO0FBQ3RELFNBQUlySixJQUFKO0FBQUEsU0FDQ2tLLFlBQVlELFFBQVNsSCxJQUFULEVBQWUsSUFBZixFQUFxQnNHLEdBQXJCLEVBQTBCLEVBQTFCLENBRGI7QUFBQSxTQUVDbFosSUFBSTRTLEtBQUsvUyxNQUZWOztBQUlBO0FBQ0EsWUFBUUcsR0FBUixFQUFjO0FBQ2IsVUFBTzZQLE9BQU9rSyxVQUFXL1osQ0FBWCxDQUFkLEVBQWlDO0FBQ2hDNFMsWUFBTTVTLENBQU4sSUFBWSxFQUFHb0osUUFBU3BKLENBQVQsSUFBZTZQLElBQWxCLENBQVo7QUFDQTtBQUNEO0FBQ0QsS0FYRCxDQURNLEdBYU4sVUFBVUEsSUFBVixFQUFnQm9KLFFBQWhCLEVBQTBCQyxHQUExQixFQUFnQztBQUMvQnJMLFdBQU8sQ0FBUCxJQUFhZ0MsSUFBYjtBQUNBaUssYUFBU2pNLEtBQVQsRUFBZ0IsSUFBaEIsRUFBc0JxTCxHQUF0QixFQUEyQnZHLE9BQTNCOztBQUVBO0FBQ0E5RSxXQUFPLENBQVAsSUFBYSxJQUFiO0FBQ0EsWUFBTyxDQUFDOEUsUUFBUXBILEdBQVIsRUFBUjtBQUNBLEtBcEJGO0FBcUJBLElBOUJNLENBSEM7O0FBbUNSLFVBQU8wSSxhQUFjLFVBQVU3USxRQUFWLEVBQXFCO0FBQ3pDLFdBQU8sVUFBVXlNLElBQVYsRUFBaUI7QUFDdkIsWUFBTzNNLE9BQVFFLFFBQVIsRUFBa0J5TSxJQUFsQixFQUF5QmhRLE1BQXpCLEdBQWtDLENBQXpDO0FBQ0EsS0FGRDtBQUdBLElBSk0sQ0FuQ0M7O0FBeUNSLGVBQVlvVSxhQUFjLFVBQVV0SixJQUFWLEVBQWlCO0FBQzFDQSxXQUFPQSxLQUFLeEssT0FBTCxDQUFjOFEsU0FBZCxFQUF5QkMsU0FBekIsQ0FBUDtBQUNBLFdBQU8sVUFBVXJCLElBQVYsRUFBaUI7QUFDdkIsWUFBTyxDQUFFQSxLQUFLdEYsV0FBTCxJQUFvQjBELFFBQVM0QixJQUFULENBQXRCLEVBQXdDMUksT0FBeEMsQ0FBaUR3RCxJQUFqRCxJQUEwRCxDQUFDLENBQWxFO0FBQ0EsS0FGRDtBQUdBLElBTFcsQ0F6Q0o7O0FBZ0RSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBUXNKLGFBQWMsVUFBVStGLElBQVYsRUFBaUI7O0FBRXRDO0FBQ0EsUUFBSyxDQUFDdkosWUFBWTVQLElBQVosQ0FBa0JtWixRQUFRLEVBQTFCLENBQU4sRUFBdUM7QUFDdEM5VyxZQUFPeVUsS0FBUCxDQUFjLHVCQUF1QnFDLElBQXJDO0FBQ0E7QUFDREEsV0FBT0EsS0FBSzdaLE9BQUwsQ0FBYzhRLFNBQWQsRUFBeUJDLFNBQXpCLEVBQXFDakssV0FBckMsRUFBUDtBQUNBLFdBQU8sVUFBVTRJLElBQVYsRUFBaUI7QUFDdkIsU0FBSW9LLFFBQUo7QUFDQSxRQUFHO0FBQ0YsVUFBT0EsV0FBV3ZMLGlCQUNqQm1CLEtBQUttSyxJQURZLEdBRWpCbkssS0FBSzdKLFlBQUwsQ0FBbUIsVUFBbkIsS0FBbUM2SixLQUFLN0osWUFBTCxDQUFtQixNQUFuQixDQUZwQyxFQUVvRTs7QUFFbkVpVSxrQkFBV0EsU0FBU2hULFdBQVQsRUFBWDtBQUNBLGNBQU9nVCxhQUFhRCxJQUFiLElBQXFCQyxTQUFTOVMsT0FBVCxDQUFrQjZTLE9BQU8sR0FBekIsTUFBbUMsQ0FBL0Q7QUFDQTtBQUNELE1BUkQsUUFRVSxDQUFFbkssT0FBT0EsS0FBS25NLFVBQWQsS0FBOEJtTSxLQUFLN0gsUUFBTCxLQUFrQixDQVIxRDtBQVNBLFlBQU8sS0FBUDtBQUNBLEtBWkQ7QUFhQSxJQXBCTyxDQXZEQTs7QUE2RVI7QUFDQSxhQUFVLGdCQUFVNkgsSUFBVixFQUFpQjtBQUMxQixRQUFJcUssT0FBT3BNLE9BQU9xTSxRQUFQLElBQW1Cck0sT0FBT3FNLFFBQVAsQ0FBZ0JELElBQTlDO0FBQ0EsV0FBT0EsUUFBUUEsS0FBSzdPLEtBQUwsQ0FBWSxDQUFaLE1BQW9Cd0UsS0FBS3dELEVBQXhDO0FBQ0EsSUFqRk87O0FBbUZSLFdBQVEsY0FBVXhELElBQVYsRUFBaUI7QUFDeEIsV0FBT0EsU0FBU3BCLE9BQWhCO0FBQ0EsSUFyRk87O0FBdUZSLFlBQVMsZUFBVW9CLElBQVYsRUFBaUI7QUFDekIsV0FBT0EsU0FBU3RNLFNBQVM2VyxhQUFsQixLQUNKLENBQUM3VyxTQUFTOFcsUUFBVixJQUFzQjlXLFNBQVM4VyxRQUFULEVBRGxCLEtBRU4sQ0FBQyxFQUFHeEssS0FBSy9ILElBQUwsSUFBYStILEtBQUt5SyxJQUFsQixJQUEwQixDQUFDekssS0FBSzBLLFFBQW5DLENBRkY7QUFHQSxJQTNGTzs7QUE2RlI7QUFDQSxjQUFXckYscUJBQXNCLEtBQXRCLENBOUZIO0FBK0ZSLGVBQVlBLHFCQUFzQixJQUF0QixDQS9GSjs7QUFpR1IsY0FBVyxpQkFBVXJGLElBQVYsRUFBaUI7O0FBRTNCO0FBQ0E7QUFDQSxRQUFJb0MsV0FBV3BDLEtBQUtvQyxRQUFMLENBQWNoTCxXQUFkLEVBQWY7QUFDQSxXQUFTZ0wsYUFBYSxPQUFiLElBQXdCLENBQUMsQ0FBQ3BDLEtBQUsySyxPQUFqQyxJQUNKdkksYUFBYSxRQUFiLElBQXlCLENBQUMsQ0FBQ3BDLEtBQUs0SyxRQURuQztBQUVBLElBeEdPOztBQTBHUixlQUFZLGtCQUFVNUssSUFBVixFQUFpQjs7QUFFNUI7QUFDQTtBQUNBLFFBQUtBLEtBQUtuTSxVQUFWLEVBQXVCO0FBQ3RCO0FBQ0FtTSxVQUFLbk0sVUFBTCxDQUFnQmdYLGFBQWhCO0FBQ0E7O0FBRUQsV0FBTzdLLEtBQUs0SyxRQUFMLEtBQWtCLElBQXpCO0FBQ0EsSUFwSE87O0FBc0hSO0FBQ0EsWUFBUyxlQUFVNUssSUFBVixFQUFpQjs7QUFFekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFNQSxPQUFPQSxLQUFLckYsVUFBbEIsRUFBOEJxRixJQUE5QixFQUFvQ0EsT0FBT0EsS0FBS2tGLFdBQWhELEVBQThEO0FBQzdELFNBQUtsRixLQUFLN0gsUUFBTCxHQUFnQixDQUFyQixFQUF5QjtBQUN4QixhQUFPLEtBQVA7QUFDQTtBQUNEO0FBQ0QsV0FBTyxJQUFQO0FBQ0EsSUFuSU87O0FBcUlSLGFBQVUsZ0JBQVU2SCxJQUFWLEVBQWlCO0FBQzFCLFdBQU8sQ0FBQzdCLEtBQUtrQyxPQUFMLENBQWMsT0FBZCxFQUF5QkwsSUFBekIsQ0FBUjtBQUNBLElBdklPOztBQXlJUjtBQUNBLGFBQVUsZ0JBQVVBLElBQVYsRUFBaUI7QUFDMUIsV0FBT2dCLFFBQVFoUSxJQUFSLENBQWNnUCxLQUFLb0MsUUFBbkIsQ0FBUDtBQUNBLElBNUlPOztBQThJUixZQUFTLGVBQVVwQyxJQUFWLEVBQWlCO0FBQ3pCLFdBQU9lLFFBQVEvUCxJQUFSLENBQWNnUCxLQUFLb0MsUUFBbkIsQ0FBUDtBQUNBLElBaEpPOztBQWtKUixhQUFVLGdCQUFVcEMsSUFBVixFQUFpQjtBQUMxQixRQUFJdk8sT0FBT3VPLEtBQUtvQyxRQUFMLENBQWNoTCxXQUFkLEVBQVg7QUFDQSxXQUFPM0YsU0FBUyxPQUFULElBQW9CdU8sS0FBSy9ILElBQUwsS0FBYyxRQUFsQyxJQUE4Q3hHLFNBQVMsUUFBOUQ7QUFDQSxJQXJKTzs7QUF1SlIsV0FBUSxjQUFVdU8sSUFBVixFQUFpQjtBQUN4QixRQUFJMkgsSUFBSjtBQUNBLFdBQU8zSCxLQUFLb0MsUUFBTCxDQUFjaEwsV0FBZCxPQUFnQyxPQUFoQyxJQUNONEksS0FBSy9ILElBQUwsS0FBYyxNQURSOztBQUdOO0FBQ0E7QUFDRSxLQUFFMFAsT0FBTzNILEtBQUs3SixZQUFMLENBQW1CLE1BQW5CLENBQVQsS0FBMEMsSUFBMUMsSUFDRHdSLEtBQUt2USxXQUFMLE9BQXVCLE1BTmxCLENBQVA7QUFPQSxJQWhLTzs7QUFrS1I7QUFDQSxZQUFTbU8sdUJBQXdCLFlBQVc7QUFDM0MsV0FBTyxDQUFFLENBQUYsQ0FBUDtBQUNBLElBRlEsQ0FuS0Q7O0FBdUtSLFdBQVFBLHVCQUF3QixVQUFVdUYsYUFBVixFQUF5QjlhLE1BQXpCLEVBQWtDO0FBQ2pFLFdBQU8sQ0FBRUEsU0FBUyxDQUFYLENBQVA7QUFDQSxJQUZPLENBdktBOztBQTJLUixTQUFNdVYsdUJBQXdCLFVBQVV1RixhQUFWLEVBQXlCOWEsTUFBekIsRUFBaUN3VixRQUFqQyxFQUE0QztBQUN6RSxXQUFPLENBQUVBLFdBQVcsQ0FBWCxHQUFlQSxXQUFXeFYsTUFBMUIsR0FBbUN3VixRQUFyQyxDQUFQO0FBQ0EsSUFGSyxDQTNLRTs7QUErS1IsV0FBUUQsdUJBQXdCLFVBQVVFLFlBQVYsRUFBd0J6VixNQUF4QixFQUFpQztBQUNoRSxRQUFJRyxJQUFJLENBQVI7QUFDQSxXQUFRQSxJQUFJSCxNQUFaLEVBQW9CRyxLQUFLLENBQXpCLEVBQTZCO0FBQzVCc1Ysa0JBQWFyUixJQUFiLENBQW1CakUsQ0FBbkI7QUFDQTtBQUNELFdBQU9zVixZQUFQO0FBQ0EsSUFOTyxDQS9LQTs7QUF1TFIsVUFBT0YsdUJBQXdCLFVBQVVFLFlBQVYsRUFBd0J6VixNQUF4QixFQUFpQztBQUMvRCxRQUFJRyxJQUFJLENBQVI7QUFDQSxXQUFRQSxJQUFJSCxNQUFaLEVBQW9CRyxLQUFLLENBQXpCLEVBQTZCO0FBQzVCc1Ysa0JBQWFyUixJQUFiLENBQW1CakUsQ0FBbkI7QUFDQTtBQUNELFdBQU9zVixZQUFQO0FBQ0EsSUFOTSxDQXZMQzs7QUErTFIsU0FBTUYsdUJBQXdCLFVBQVVFLFlBQVYsRUFBd0J6VixNQUF4QixFQUFnQ3dWLFFBQWhDLEVBQTJDO0FBQ3hFLFFBQUlyVixJQUFJcVYsV0FBVyxDQUFYLEdBQ1BBLFdBQVd4VixNQURKLEdBRVB3VixXQUFXeFYsTUFBWCxHQUNDQSxNQURELEdBRUN3VixRQUpGO0FBS0EsV0FBUSxFQUFFclYsQ0FBRixJQUFPLENBQWYsR0FBb0I7QUFDbkJzVixrQkFBYXJSLElBQWIsQ0FBbUJqRSxDQUFuQjtBQUNBO0FBQ0QsV0FBT3NWLFlBQVA7QUFDQSxJQVZLLENBL0xFOztBQTJNUixTQUFNRix1QkFBd0IsVUFBVUUsWUFBVixFQUF3QnpWLE1BQXhCLEVBQWdDd1YsUUFBaEMsRUFBMkM7QUFDeEUsUUFBSXJWLElBQUlxVixXQUFXLENBQVgsR0FBZUEsV0FBV3hWLE1BQTFCLEdBQW1Dd1YsUUFBM0M7QUFDQSxXQUFRLEVBQUVyVixDQUFGLEdBQU1ILE1BQWQsR0FBd0I7QUFDdkJ5VixrQkFBYXJSLElBQWIsQ0FBbUJqRSxDQUFuQjtBQUNBO0FBQ0QsV0FBT3NWLFlBQVA7QUFDQSxJQU5LO0FBM01FO0FBNVVnQixFQUExQjs7QUFpaUJBdEgsTUFBS2tDLE9BQUwsQ0FBYyxLQUFkLElBQXdCbEMsS0FBS2tDLE9BQUwsQ0FBYyxJQUFkLENBQXhCOztBQUVBO0FBQ0EsTUFBTWxRLENBQU4sSUFBVyxFQUFFNGEsT0FBTyxJQUFULEVBQWVDLFVBQVUsSUFBekIsRUFBK0JDLE1BQU0sSUFBckMsRUFBMkNDLFVBQVUsSUFBckQsRUFBMkRDLE9BQU8sSUFBbEUsRUFBWCxFQUFzRjtBQUNyRmhOLE9BQUtrQyxPQUFMLENBQWNsUSxDQUFkLElBQW9CZ1Ysa0JBQW1CaFYsQ0FBbkIsQ0FBcEI7QUFDQTtBQUNELE1BQU1BLENBQU4sSUFBVyxFQUFFaWIsUUFBUSxJQUFWLEVBQWdCQyxPQUFPLElBQXZCLEVBQVgsRUFBMkM7QUFDMUNsTixPQUFLa0MsT0FBTCxDQUFjbFEsQ0FBZCxJQUFvQmlWLG1CQUFvQmpWLENBQXBCLENBQXBCO0FBQ0E7O0FBRUQ7QUFDQSxVQUFTMlosVUFBVCxHQUFzQixDQUFFO0FBQ3hCQSxZQUFXd0IsU0FBWCxHQUF1Qm5OLEtBQUtvTixPQUFMLEdBQWVwTixLQUFLa0MsT0FBM0M7QUFDQWxDLE1BQUsyTCxVQUFMLEdBQWtCLElBQUlBLFVBQUosRUFBbEI7O0FBRUF4TCxZQUFXakwsT0FBT2lMLFFBQVAsR0FBa0IsVUFBVS9LLFFBQVYsRUFBb0JpWSxTQUFwQixFQUFnQztBQUM1RCxNQUFJeEIsT0FBSjtBQUFBLE1BQWF4WCxLQUFiO0FBQUEsTUFBb0JpWixNQUFwQjtBQUFBLE1BQTRCeFQsSUFBNUI7QUFBQSxNQUNDeVQsS0FERDtBQUFBLE1BQ1F4SSxNQURSO0FBQUEsTUFDZ0J5SSxVQURoQjtBQUFBLE1BRUNDLFNBQVNyTSxXQUFZaE0sV0FBVyxHQUF2QixDQUZWOztBQUlBLE1BQUtxWSxNQUFMLEVBQWM7QUFDYixVQUFPSixZQUFZLENBQVosR0FBZ0JJLE9BQU9wUSxLQUFQLENBQWMsQ0FBZCxDQUF2QjtBQUNBOztBQUVEa1EsVUFBUW5ZLFFBQVI7QUFDQTJQLFdBQVMsRUFBVDtBQUNBeUksZUFBYXhOLEtBQUtzSyxTQUFsQjs7QUFFQSxTQUFRaUQsS0FBUixFQUFnQjs7QUFFZjtBQUNBLE9BQUssQ0FBQzFCLE9BQUQsS0FBY3hYLFFBQVFnTyxPQUFPOEMsSUFBUCxDQUFhb0ksS0FBYixDQUF0QixDQUFMLEVBQW9EO0FBQ25ELFFBQUtsWixLQUFMLEVBQWE7O0FBRVo7QUFDQWtaLGFBQVFBLE1BQU1sUSxLQUFOLENBQWFoSixNQUFPLENBQVAsRUFBV3hDLE1BQXhCLEtBQW9DMGIsS0FBNUM7QUFDQTtBQUNEeEksV0FBTzlPLElBQVAsQ0FBZXFYLFNBQVMsRUFBeEI7QUFDQTs7QUFFRHpCLGFBQVUsS0FBVjs7QUFFQTtBQUNBLE9BQU94WCxRQUFRaU8sYUFBYTZDLElBQWIsQ0FBbUJvSSxLQUFuQixDQUFmLEVBQThDO0FBQzdDMUIsY0FBVXhYLE1BQU02QyxLQUFOLEVBQVY7QUFDQW9XLFdBQU9yWCxJQUFQLENBQWE7QUFDWi9ELFlBQU8yWixPQURLOztBQUdaO0FBQ0EvUixXQUFNekYsTUFBTyxDQUFQLEVBQVdsQyxPQUFYLENBQW9CaVEsS0FBcEIsRUFBMkIsR0FBM0I7QUFKTSxLQUFiO0FBTUFtTCxZQUFRQSxNQUFNbFEsS0FBTixDQUFhd08sUUFBUWhhLE1BQXJCLENBQVI7QUFDQTs7QUFFRDtBQUNBLFFBQU1pSSxJQUFOLElBQWNrRyxLQUFLN0gsTUFBbkIsRUFBNEI7QUFDM0IsUUFBSyxDQUFFOUQsUUFBUXFPLFVBQVc1SSxJQUFYLEVBQWtCcUwsSUFBbEIsQ0FBd0JvSSxLQUF4QixDQUFWLE1BQWlELENBQUNDLFdBQVkxVCxJQUFaLENBQUQsS0FDbkR6RixRQUFRbVosV0FBWTFULElBQVosRUFBb0J6RixLQUFwQixDQUQyQyxDQUFqRCxDQUFMLEVBQzZDO0FBQzVDd1gsZUFBVXhYLE1BQU02QyxLQUFOLEVBQVY7QUFDQW9XLFlBQU9yWCxJQUFQLENBQWE7QUFDWi9ELGFBQU8yWixPQURLO0FBRVovUixZQUFNQSxJQUZNO0FBR1pzQixlQUFTL0c7QUFIRyxNQUFiO0FBS0FrWixhQUFRQSxNQUFNbFEsS0FBTixDQUFhd08sUUFBUWhhLE1BQXJCLENBQVI7QUFDQTtBQUNEOztBQUVELE9BQUssQ0FBQ2dhLE9BQU4sRUFBZ0I7QUFDZjtBQUNBO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsU0FBT3dCLFlBQ05FLE1BQU0xYixNQURBLEdBRU4wYixRQUNDclksT0FBT3lVLEtBQVAsQ0FBY3ZVLFFBQWQsQ0FERDs7QUFHQztBQUNBZ00sYUFBWWhNLFFBQVosRUFBc0IyUCxNQUF0QixFQUErQjFILEtBQS9CLENBQXNDLENBQXRDLENBTkY7QUFPQSxFQXBFRDs7QUFzRUEsVUFBU3VJLFVBQVQsQ0FBcUIwSCxNQUFyQixFQUE4QjtBQUM3QixNQUFJdGIsSUFBSSxDQUFSO0FBQUEsTUFDQzhQLE1BQU13TCxPQUFPemIsTUFEZDtBQUFBLE1BRUN1RCxXQUFXLEVBRlo7QUFHQSxTQUFRcEQsSUFBSThQLEdBQVosRUFBaUI5UCxHQUFqQixFQUF1QjtBQUN0Qm9ELGVBQVlrWSxPQUFRdGIsQ0FBUixFQUFZRSxLQUF4QjtBQUNBO0FBQ0QsU0FBT2tELFFBQVA7QUFDQTs7QUFFRCxVQUFTMk8sYUFBVCxDQUF3QitILE9BQXhCLEVBQWlDNEIsVUFBakMsRUFBNkMzYSxJQUE3QyxFQUFvRDtBQUNuRCxNQUFJbVIsTUFBTXdKLFdBQVd4SixHQUFyQjtBQUFBLE1BQ0M1SyxPQUFPb1UsV0FBVzFXLElBRG5CO0FBQUEsTUFFQzBCLE1BQU1ZLFFBQVE0SyxHQUZmO0FBQUEsTUFHQ3lKLG1CQUFtQjVhLFFBQVEyRixRQUFRLFlBSHBDO0FBQUEsTUFJQ2tWLFdBQVczTSxNQUpaOztBQU1BLFNBQU95TSxXQUFXckQsS0FBWDs7QUFFTjtBQUNBLFlBQVV4SSxJQUFWLEVBQWdCNkMsT0FBaEIsRUFBeUJ3RyxHQUF6QixFQUErQjtBQUM5QixVQUFVckosT0FBT0EsS0FBTXFDLEdBQU4sQ0FBakIsRUFBaUM7QUFDaEMsUUFBS3JDLEtBQUs3SCxRQUFMLEtBQWtCLENBQWxCLElBQXVCMlQsZ0JBQTVCLEVBQStDO0FBQzlDLFlBQU83QixRQUFTakssSUFBVCxFQUFlNkMsT0FBZixFQUF3QndHLEdBQXhCLENBQVA7QUFDQTtBQUNEO0FBQ0QsVUFBTyxLQUFQO0FBQ0EsR0FWSzs7QUFZTjtBQUNBLFlBQVVySixJQUFWLEVBQWdCNkMsT0FBaEIsRUFBeUJ3RyxHQUF6QixFQUErQjtBQUM5QixPQUFJMkMsUUFBSjtBQUFBLE9BQWMxQyxXQUFkO0FBQUEsT0FBMkJDLFVBQTNCO0FBQUEsT0FDQzBDLFdBQVcsQ0FBRTlNLE9BQUYsRUFBVzRNLFFBQVgsQ0FEWjs7QUFHQTtBQUNBLE9BQUsxQyxHQUFMLEVBQVc7QUFDVixXQUFVckosT0FBT0EsS0FBTXFDLEdBQU4sQ0FBakIsRUFBaUM7QUFDaEMsU0FBS3JDLEtBQUs3SCxRQUFMLEtBQWtCLENBQWxCLElBQXVCMlQsZ0JBQTVCLEVBQStDO0FBQzlDLFVBQUs3QixRQUFTakssSUFBVCxFQUFlNkMsT0FBZixFQUF3QndHLEdBQXhCLENBQUwsRUFBcUM7QUFDcEMsY0FBTyxJQUFQO0FBQ0E7QUFDRDtBQUNEO0FBQ0QsSUFSRCxNQVFPO0FBQ04sV0FBVXJKLE9BQU9BLEtBQU1xQyxHQUFOLENBQWpCLEVBQWlDO0FBQ2hDLFNBQUtyQyxLQUFLN0gsUUFBTCxLQUFrQixDQUFsQixJQUF1QjJULGdCQUE1QixFQUErQztBQUM5Q3ZDLG1CQUFhdkosS0FBTWhCLE9BQU4sTUFBcUJnQixLQUFNaEIsT0FBTixJQUFrQixFQUF2QyxDQUFiOztBQUVBO0FBQ0E7QUFDQXNLLG9CQUFjQyxXQUFZdkosS0FBSzRKLFFBQWpCLE1BQ1hMLFdBQVl2SixLQUFLNEosUUFBakIsSUFBOEIsRUFEbkIsQ0FBZDs7QUFHQSxVQUFLblMsUUFBUUEsU0FBU3VJLEtBQUtvQyxRQUFMLENBQWNoTCxXQUFkLEVBQXRCLEVBQW9EO0FBQ25ENEksY0FBT0EsS0FBTXFDLEdBQU4sS0FBZXJDLElBQXRCO0FBQ0EsT0FGRCxNQUVPLElBQUssQ0FBRWdNLFdBQVcxQyxZQUFhelMsR0FBYixDQUFiLEtBQ1htVixTQUFVLENBQVYsTUFBa0I3TSxPQURQLElBQ2tCNk0sU0FBVSxDQUFWLE1BQWtCRCxRQUR6QyxFQUNvRDs7QUFFMUQ7QUFDQSxjQUFTRSxTQUFVLENBQVYsSUFBZ0JELFNBQVUsQ0FBVixDQUF6QjtBQUNBLE9BTE0sTUFLQTs7QUFFTjtBQUNBMUMsbUJBQWF6UyxHQUFiLElBQXFCb1YsUUFBckI7O0FBRUE7QUFDQSxXQUFPQSxTQUFVLENBQVYsSUFBZ0JoQyxRQUFTakssSUFBVCxFQUFlNkMsT0FBZixFQUF3QndHLEdBQXhCLENBQXZCLEVBQXlEO0FBQ3hELGVBQU8sSUFBUDtBQUNBO0FBQ0Q7QUFDRDtBQUNEO0FBQ0Q7QUFDRCxVQUFPLEtBQVA7QUFDQSxHQXpERjtBQTBEQTs7QUFFRCxVQUFTNkMsY0FBVCxDQUF5QkMsUUFBekIsRUFBb0M7QUFDbkMsU0FBT0EsU0FBU25jLE1BQVQsR0FBa0IsQ0FBbEIsR0FDTixVQUFVZ1EsSUFBVixFQUFnQjZDLE9BQWhCLEVBQXlCd0csR0FBekIsRUFBK0I7QUFDOUIsT0FBSWxaLElBQUlnYyxTQUFTbmMsTUFBakI7QUFDQSxVQUFRRyxHQUFSLEVBQWM7QUFDYixRQUFLLENBQUNnYyxTQUFVaGMsQ0FBVixFQUFlNlAsSUFBZixFQUFxQjZDLE9BQXJCLEVBQThCd0csR0FBOUIsQ0FBTixFQUE0QztBQUMzQyxZQUFPLEtBQVA7QUFDQTtBQUNEO0FBQ0QsVUFBTyxJQUFQO0FBQ0EsR0FUSyxHQVVOOEMsU0FBVSxDQUFWLENBVkQ7QUFXQTs7QUFFRCxVQUFTQyxnQkFBVCxDQUEyQjdZLFFBQTNCLEVBQXFDOFksUUFBckMsRUFBK0N2SixPQUEvQyxFQUF5RDtBQUN4RCxNQUFJM1MsSUFBSSxDQUFSO0FBQUEsTUFDQzhQLE1BQU1vTSxTQUFTcmMsTUFEaEI7QUFFQSxTQUFRRyxJQUFJOFAsR0FBWixFQUFpQjlQLEdBQWpCLEVBQXVCO0FBQ3RCa0QsVUFBUUUsUUFBUixFQUFrQjhZLFNBQVVsYyxDQUFWLENBQWxCLEVBQWlDMlMsT0FBakM7QUFDQTtBQUNELFNBQU9BLE9BQVA7QUFDQTs7QUFFRCxVQUFTd0osUUFBVCxDQUFtQnBDLFNBQW5CLEVBQThCMVksR0FBOUIsRUFBbUM4RSxNQUFuQyxFQUEyQ3VNLE9BQTNDLEVBQW9Ed0csR0FBcEQsRUFBMEQ7QUFDekQsTUFBSXJKLElBQUo7QUFBQSxNQUNDdU0sZUFBZSxFQURoQjtBQUFBLE1BRUNwYyxJQUFJLENBRkw7QUFBQSxNQUdDOFAsTUFBTWlLLFVBQVVsYSxNQUhqQjtBQUFBLE1BSUN3YyxTQUFTaGIsT0FBTyxJQUpqQjs7QUFNQSxTQUFRckIsSUFBSThQLEdBQVosRUFBaUI5UCxHQUFqQixFQUF1QjtBQUN0QixPQUFPNlAsT0FBT2tLLFVBQVcvWixDQUFYLENBQWQsRUFBaUM7QUFDaEMsUUFBSyxDQUFDbUcsTUFBRCxJQUFXQSxPQUFRMEosSUFBUixFQUFjNkMsT0FBZCxFQUF1QndHLEdBQXZCLENBQWhCLEVBQStDO0FBQzlDa0Qsa0JBQWFuWSxJQUFiLENBQW1CNEwsSUFBbkI7QUFDQSxTQUFLd00sTUFBTCxFQUFjO0FBQ2JoYixVQUFJNEMsSUFBSixDQUFVakUsQ0FBVjtBQUNBO0FBQ0Q7QUFDRDtBQUNEOztBQUVELFNBQU9vYyxZQUFQO0FBQ0E7O0FBRUQsVUFBU0UsVUFBVCxDQUFxQmhFLFNBQXJCLEVBQWdDbFYsUUFBaEMsRUFBMEMwVyxPQUExQyxFQUFtRHlDLFVBQW5ELEVBQStEQyxVQUEvRCxFQUEyRUMsWUFBM0UsRUFBMEY7QUFDekYsTUFBS0YsY0FBYyxDQUFDQSxXQUFZMU4sT0FBWixDQUFwQixFQUE0QztBQUMzQzBOLGdCQUFhRCxXQUFZQyxVQUFaLENBQWI7QUFDQTtBQUNELE1BQUtDLGNBQWMsQ0FBQ0EsV0FBWTNOLE9BQVosQ0FBcEIsRUFBNEM7QUFDM0MyTixnQkFBYUYsV0FBWUUsVUFBWixFQUF3QkMsWUFBeEIsQ0FBYjtBQUNBO0FBQ0QsU0FBT3hJLGFBQWMsVUFBVXJCLElBQVYsRUFBZ0JELE9BQWhCLEVBQXlCRCxPQUF6QixFQUFrQ3dHLEdBQWxDLEVBQXdDO0FBQzVELE9BQUl3RCxJQUFKO0FBQUEsT0FBVTFjLENBQVY7QUFBQSxPQUFhNlAsSUFBYjtBQUFBLE9BQ0M4TSxTQUFTLEVBRFY7QUFBQSxPQUVDQyxVQUFVLEVBRlg7QUFBQSxPQUdDQyxjQUFjbEssUUFBUTlTLE1BSHZCOzs7QUFLQztBQUNBeVcsV0FBUTFELFFBQVFxSixpQkFDZjdZLFlBQVksR0FERyxFQUVmc1AsUUFBUTFLLFFBQVIsR0FBbUIsQ0FBRTBLLE9BQUYsQ0FBbkIsR0FBaUNBLE9BRmxCLEVBR2YsRUFIZSxDQU5qQjs7O0FBWUM7QUFDQW9LLGVBQVl4RSxjQUFlMUYsUUFBUSxDQUFDeFAsUUFBeEIsSUFDWCtZLFNBQVU3RixLQUFWLEVBQWlCcUcsTUFBakIsRUFBeUJyRSxTQUF6QixFQUFvQzVGLE9BQXBDLEVBQTZDd0csR0FBN0MsQ0FEVyxHQUVYNUMsS0FmRjtBQUFBLE9BaUJDeUcsYUFBYWpEOztBQUVaO0FBQ0EwQyxrQkFBZ0I1SixPQUFPMEYsU0FBUCxHQUFtQnVFLGVBQWVOLFVBQWxEOztBQUVDO0FBQ0EsS0FIRDs7QUFLQztBQUNBNUosVUFUVyxHQVVabUssU0EzQkY7O0FBNkJBO0FBQ0EsT0FBS2hELE9BQUwsRUFBZTtBQUNkQSxZQUFTZ0QsU0FBVCxFQUFvQkMsVUFBcEIsRUFBZ0NySyxPQUFoQyxFQUF5Q3dHLEdBQXpDO0FBQ0E7O0FBRUQ7QUFDQSxPQUFLcUQsVUFBTCxFQUFrQjtBQUNqQkcsV0FBT1AsU0FBVVksVUFBVixFQUFzQkgsT0FBdEIsQ0FBUDtBQUNBTCxlQUFZRyxJQUFaLEVBQWtCLEVBQWxCLEVBQXNCaEssT0FBdEIsRUFBK0J3RyxHQUEvQjs7QUFFQTtBQUNBbFosUUFBSTBjLEtBQUs3YyxNQUFUO0FBQ0EsV0FBUUcsR0FBUixFQUFjO0FBQ2IsU0FBTzZQLE9BQU82TSxLQUFNMWMsQ0FBTixDQUFkLEVBQTRCO0FBQzNCK2MsaUJBQVlILFFBQVM1YyxDQUFULENBQVosSUFBNkIsRUFBRzhjLFVBQVdGLFFBQVM1YyxDQUFULENBQVgsSUFBNEI2UCxJQUEvQixDQUE3QjtBQUNBO0FBQ0Q7QUFDRDs7QUFFRCxPQUFLK0MsSUFBTCxFQUFZO0FBQ1gsUUFBSzRKLGNBQWNsRSxTQUFuQixFQUErQjtBQUM5QixTQUFLa0UsVUFBTCxFQUFrQjs7QUFFakI7QUFDQUUsYUFBTyxFQUFQO0FBQ0ExYyxVQUFJK2MsV0FBV2xkLE1BQWY7QUFDQSxhQUFRRyxHQUFSLEVBQWM7QUFDYixXQUFPNlAsT0FBT2tOLFdBQVkvYyxDQUFaLENBQWQsRUFBa0M7O0FBRWpDO0FBQ0EwYyxhQUFLelksSUFBTCxDQUFhNlksVUFBVzljLENBQVgsSUFBaUI2UCxJQUE5QjtBQUNBO0FBQ0Q7QUFDRDJNLGlCQUFZLElBQVosRUFBb0JPLGFBQWEsRUFBakMsRUFBdUNMLElBQXZDLEVBQTZDeEQsR0FBN0M7QUFDQTs7QUFFRDtBQUNBbFosU0FBSStjLFdBQVdsZCxNQUFmO0FBQ0EsWUFBUUcsR0FBUixFQUFjO0FBQ2IsVUFBSyxDQUFFNlAsT0FBT2tOLFdBQVkvYyxDQUFaLENBQVQsS0FDSixDQUFFMGMsT0FBT0YsYUFBYXJWLFFBQVN5TCxJQUFULEVBQWUvQyxJQUFmLENBQWIsR0FBcUM4TSxPQUFRM2MsQ0FBUixDQUE5QyxJQUE4RCxDQUFDLENBRGhFLEVBQ29FOztBQUVuRTRTLFlBQU04SixJQUFOLElBQWUsRUFBRy9KLFFBQVMrSixJQUFULElBQWtCN00sSUFBckIsQ0FBZjtBQUNBO0FBQ0Q7QUFDRDs7QUFFRjtBQUNDLElBN0JELE1BNkJPO0FBQ05rTixpQkFBYVosU0FDWlksZUFBZXBLLE9BQWYsR0FDQ29LLFdBQVc5RSxNQUFYLENBQW1CNEUsV0FBbkIsRUFBZ0NFLFdBQVdsZCxNQUEzQyxDQURELEdBRUNrZCxVQUhXLENBQWI7QUFLQSxRQUFLUCxVQUFMLEVBQWtCO0FBQ2pCQSxnQkFBWSxJQUFaLEVBQWtCN0osT0FBbEIsRUFBMkJvSyxVQUEzQixFQUF1QzdELEdBQXZDO0FBQ0EsS0FGRCxNQUVPO0FBQ05qVixVQUFLa08sS0FBTCxDQUFZUSxPQUFaLEVBQXFCb0ssVUFBckI7QUFDQTtBQUNEO0FBQ0QsR0ExRk0sQ0FBUDtBQTJGQTs7QUFFRCxVQUFTQyxpQkFBVCxDQUE0QjFCLE1BQTVCLEVBQXFDO0FBQ3BDLE1BQUkyQixZQUFKO0FBQUEsTUFBa0JuRCxPQUFsQjtBQUFBLE1BQTJCckgsQ0FBM0I7QUFBQSxNQUNDM0MsTUFBTXdMLE9BQU96YixNQURkO0FBQUEsTUFFQ3FkLGtCQUFrQmxQLEtBQUtvSyxRQUFMLENBQWVrRCxPQUFRLENBQVIsRUFBWXhULElBQTNCLENBRm5CO0FBQUEsTUFHQ3FWLG1CQUFtQkQsbUJBQW1CbFAsS0FBS29LLFFBQUwsQ0FBZSxHQUFmLENBSHZDO0FBQUEsTUFJQ3BZLElBQUlrZCxrQkFBa0IsQ0FBbEIsR0FBc0IsQ0FKM0I7OztBQU1DO0FBQ0FFLGlCQUFlckwsY0FBZSxVQUFVbEMsSUFBVixFQUFpQjtBQUM5QyxVQUFPQSxTQUFTb04sWUFBaEI7QUFDQSxHQUZjLEVBRVpFLGdCQUZZLEVBRU0sSUFGTixDQVBoQjtBQUFBLE1BVUNFLGtCQUFrQnRMLGNBQWUsVUFBVWxDLElBQVYsRUFBaUI7QUFDakQsVUFBTzFJLFFBQVM4VixZQUFULEVBQXVCcE4sSUFBdkIsSUFBZ0MsQ0FBQyxDQUF4QztBQUNBLEdBRmlCLEVBRWZzTixnQkFGZSxFQUVHLElBRkgsQ0FWbkI7QUFBQSxNQWFDbkIsV0FBVyxDQUFFLFVBQVVuTSxJQUFWLEVBQWdCNkMsT0FBaEIsRUFBeUJ3RyxHQUF6QixFQUErQjtBQUMzQyxPQUFJM0IsTUFBUSxDQUFDMkYsZUFBRCxLQUFzQmhFLE9BQU94RyxZQUFZckUsZ0JBQXpDLENBQUYsS0FDVCxDQUFFNE8sZUFBZXZLLE9BQWpCLEVBQTJCMUssUUFBM0IsR0FDQ29WLGFBQWN2TixJQUFkLEVBQW9CNkMsT0FBcEIsRUFBNkJ3RyxHQUE3QixDQURELEdBRUNtRSxnQkFBaUJ4TixJQUFqQixFQUF1QjZDLE9BQXZCLEVBQWdDd0csR0FBaEMsQ0FIUSxDQUFWOztBQUtBO0FBQ0ErRCxrQkFBZSxJQUFmO0FBQ0EsVUFBTzFGLEdBQVA7QUFDQSxHQVRVLENBYlo7O0FBd0JBLFNBQVF2WCxJQUFJOFAsR0FBWixFQUFpQjlQLEdBQWpCLEVBQXVCO0FBQ3RCLE9BQU84WixVQUFVOUwsS0FBS29LLFFBQUwsQ0FBZWtELE9BQVF0YixDQUFSLEVBQVk4SCxJQUEzQixDQUFqQixFQUF1RDtBQUN0RGtVLGVBQVcsQ0FBRWpLLGNBQWVnSyxlQUFnQkMsUUFBaEIsQ0FBZixFQUEyQ2xDLE9BQTNDLENBQUYsQ0FBWDtBQUNBLElBRkQsTUFFTztBQUNOQSxjQUFVOUwsS0FBSzdILE1BQUwsQ0FBYW1WLE9BQVF0YixDQUFSLEVBQVk4SCxJQUF6QixFQUFnQ3FLLEtBQWhDLENBQXVDLElBQXZDLEVBQTZDbUosT0FBUXRiLENBQVIsRUFBWW9KLE9BQXpELENBQVY7O0FBRUE7QUFDQSxRQUFLMFEsUUFBU2pMLE9BQVQsQ0FBTCxFQUEwQjs7QUFFekI7QUFDQTRELFNBQUksRUFBRXpTLENBQU47QUFDQSxZQUFReVMsSUFBSTNDLEdBQVosRUFBaUIyQyxHQUFqQixFQUF1QjtBQUN0QixVQUFLekUsS0FBS29LLFFBQUwsQ0FBZWtELE9BQVE3SSxDQUFSLEVBQVkzSyxJQUEzQixDQUFMLEVBQXlDO0FBQ3hDO0FBQ0E7QUFDRDtBQUNELFlBQU93VSxXQUNOdGMsSUFBSSxDQUFKLElBQVMrYixlQUFnQkMsUUFBaEIsQ0FESCxFQUVOaGMsSUFBSSxDQUFKLElBQVM0VDs7QUFFVDtBQUNBMEgsWUFDRWpRLEtBREYsQ0FDUyxDQURULEVBQ1lyTCxJQUFJLENBRGhCLEVBRUVXLE1BRkYsQ0FFVSxFQUFFVCxPQUFPb2IsT0FBUXRiLElBQUksQ0FBWixFQUFnQjhILElBQWhCLEtBQXlCLEdBQXpCLEdBQStCLEdBQS9CLEdBQXFDLEVBQTlDLEVBRlYsQ0FIUyxFQU1QM0gsT0FOTyxDQU1FaVEsS0FORixFQU1TLElBTlQsQ0FGSCxFQVNOMEosT0FUTSxFQVVOOVosSUFBSXlTLENBQUosSUFBU3VLLGtCQUFtQjFCLE9BQU9qUSxLQUFQLENBQWNyTCxDQUFkLEVBQWlCeVMsQ0FBakIsQ0FBbkIsQ0FWSCxFQVdOQSxJQUFJM0MsR0FBSixJQUFXa04sa0JBQXFCMUIsU0FBU0EsT0FBT2pRLEtBQVAsQ0FBY29ILENBQWQsQ0FBOUIsQ0FYTCxFQVlOQSxJQUFJM0MsR0FBSixJQUFXOEQsV0FBWTBILE1BQVosQ0FaTCxDQUFQO0FBY0E7QUFDRFUsYUFBUy9YLElBQVQsQ0FBZTZWLE9BQWY7QUFDQTtBQUNEOztBQUVELFNBQU9pQyxlQUFnQkMsUUFBaEIsQ0FBUDtBQUNBOztBQUVELFVBQVNzQix3QkFBVCxDQUFtQ0MsZUFBbkMsRUFBb0RDLFdBQXBELEVBQWtFO0FBQ2pFLE1BQUlDLFFBQVFELFlBQVkzZCxNQUFaLEdBQXFCLENBQWpDO0FBQUEsTUFDQzZkLFlBQVlILGdCQUFnQjFkLE1BQWhCLEdBQXlCLENBRHRDO0FBQUEsTUFFQzhkLGVBQWUsU0FBZkEsWUFBZSxDQUFVL0ssSUFBVixFQUFnQkYsT0FBaEIsRUFBeUJ3RyxHQUF6QixFQUE4QnZHLE9BQTlCLEVBQXVDaUwsU0FBdkMsRUFBbUQ7QUFDakUsT0FBSS9OLElBQUo7QUFBQSxPQUFVNEMsQ0FBVjtBQUFBLE9BQWFxSCxPQUFiO0FBQUEsT0FDQytELGVBQWUsQ0FEaEI7QUFBQSxPQUVDN2QsSUFBSSxHQUZMO0FBQUEsT0FHQytaLFlBQVluSCxRQUFRLEVBSHJCO0FBQUEsT0FJQ2tMLGFBQWEsRUFKZDtBQUFBLE9BS0NDLGdCQUFnQjFQLGdCQUxqQjs7O0FBT0M7QUFDQWlJLFdBQVExRCxRQUFROEssYUFBYTFQLEtBQUs3RSxJQUFMLENBQVcsS0FBWCxFQUFvQixHQUFwQixFQUF5QnlVLFNBQXpCLENBUjlCOzs7QUFVQztBQUNBSSxtQkFBa0JoUCxXQUFXK08saUJBQWlCLElBQWpCLEdBQXdCLENBQXhCLEdBQTRCRSxLQUFLQyxNQUFMLE1BQWlCLEdBWDNFO0FBQUEsT0FZQ3BPLE1BQU13RyxNQUFNelcsTUFaYjs7QUFjQSxPQUFLK2QsU0FBTCxFQUFpQjs7QUFFaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQXZQLHVCQUFtQnFFLFdBQVduUCxRQUFYLElBQXVCbVAsT0FBdkIsSUFBa0NrTCxTQUFyRDtBQUNBOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFVBQVE1ZCxNQUFNOFAsR0FBTixJQUFhLENBQUVELE9BQU95RyxNQUFPdFcsQ0FBUCxDQUFULEtBQXlCLElBQTlDLEVBQW9EQSxHQUFwRCxFQUEwRDtBQUN6RCxRQUFLMGQsYUFBYTdOLElBQWxCLEVBQXlCO0FBQ3hCNEMsU0FBSSxDQUFKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBSyxDQUFDQyxPQUFELElBQVk3QyxLQUFLcUQsYUFBTCxJQUFzQjNQLFFBQXZDLEVBQWtEO0FBQ2pEaUwsa0JBQWFxQixJQUFiO0FBQ0FxSixZQUFNLENBQUN4SyxjQUFQO0FBQ0E7QUFDRCxZQUFVb0wsVUFBVXlELGdCQUFpQjlLLEdBQWpCLENBQXBCLEVBQStDO0FBQzlDLFVBQUtxSCxRQUFTakssSUFBVCxFQUFlNkMsV0FBV25QLFFBQTFCLEVBQW9DMlYsR0FBcEMsQ0FBTCxFQUFpRDtBQUNoRHZHLGVBQVExTyxJQUFSLENBQWM0TCxJQUFkO0FBQ0E7QUFDQTtBQUNEO0FBQ0QsU0FBSytOLFNBQUwsRUFBaUI7QUFDaEI1TyxnQkFBVWdQLGFBQVY7QUFDQTtBQUNEOztBQUVEO0FBQ0EsUUFBS1AsS0FBTCxFQUFhOztBQUVaO0FBQ0EsU0FBTzVOLE9BQU8sQ0FBQ2lLLE9BQUQsSUFBWWpLLElBQTFCLEVBQW1DO0FBQ2xDZ087QUFDQTs7QUFFRDtBQUNBLFNBQUtqTCxJQUFMLEVBQVk7QUFDWG1ILGdCQUFVOVYsSUFBVixDQUFnQjRMLElBQWhCO0FBQ0E7QUFDRDtBQUNEOztBQUVEO0FBQ0E7QUFDQWdPLG1CQUFnQjdkLENBQWhCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBS3lkLFNBQVN6ZCxNQUFNNmQsWUFBcEIsRUFBbUM7QUFDbENwTCxRQUFJLENBQUo7QUFDQSxXQUFVcUgsVUFBVTBELFlBQWEvSyxHQUFiLENBQXBCLEVBQTJDO0FBQzFDcUgsYUFBU0MsU0FBVCxFQUFvQitELFVBQXBCLEVBQWdDcEwsT0FBaEMsRUFBeUN3RyxHQUF6QztBQUNBOztBQUVELFFBQUt0RyxJQUFMLEVBQVk7O0FBRVg7QUFDQSxTQUFLaUwsZUFBZSxDQUFwQixFQUF3QjtBQUN2QixhQUFRN2QsR0FBUixFQUFjO0FBQ2IsV0FBSyxFQUFHK1osVUFBVy9aLENBQVgsS0FBa0I4ZCxXQUFZOWQsQ0FBWixDQUFyQixDQUFMLEVBQThDO0FBQzdDOGQsbUJBQVk5ZCxDQUFaLElBQWtCdUwsSUFBSTZHLElBQUosQ0FBVU8sT0FBVixDQUFsQjtBQUNBO0FBQ0Q7QUFDRDs7QUFFRDtBQUNBbUwsa0JBQWEzQixTQUFVMkIsVUFBVixDQUFiO0FBQ0E7O0FBRUQ7QUFDQTdaLFNBQUtrTyxLQUFMLENBQVlRLE9BQVosRUFBcUJtTCxVQUFyQjs7QUFFQTtBQUNBLFFBQUtGLGFBQWEsQ0FBQ2hMLElBQWQsSUFBc0JrTCxXQUFXamUsTUFBWCxHQUFvQixDQUExQyxJQUNGZ2UsZUFBZUwsWUFBWTNkLE1BQTdCLEdBQXdDLENBRHpDLEVBQzZDOztBQUU1Q3FELFlBQU8yVSxVQUFQLENBQW1CbEYsT0FBbkI7QUFDQTtBQUNEOztBQUVEO0FBQ0EsT0FBS2lMLFNBQUwsRUFBaUI7QUFDaEI1TyxjQUFVZ1AsYUFBVjtBQUNBM1AsdUJBQW1CMFAsYUFBbkI7QUFDQTs7QUFFRCxVQUFPaEUsU0FBUDtBQUNBLEdBckhGOztBQXVIQSxTQUFPMEQsUUFDTnhKLGFBQWMwSixZQUFkLENBRE0sR0FFTkEsWUFGRDtBQUdBOztBQUVEdlAsV0FBVWxMLE9BQU9rTCxPQUFQLEdBQWlCLFVBQVVoTCxRQUFWLEVBQW9CZixLQUFwQixDQUEwQix1QkFBMUIsRUFBb0Q7QUFDOUUsTUFBSXJDLENBQUo7QUFBQSxNQUNDd2QsY0FBYyxFQURmO0FBQUEsTUFFQ0Qsa0JBQWtCLEVBRm5CO0FBQUEsTUFHQzlCLFNBQVNwTSxjQUFlak0sV0FBVyxHQUExQixDQUhWOztBQUtBLE1BQUssQ0FBQ3FZLE1BQU4sRUFBZTs7QUFFZDtBQUNBLE9BQUssQ0FBQ3BaLEtBQU4sRUFBYztBQUNiQSxZQUFROEwsU0FBVS9LLFFBQVYsQ0FBUjtBQUNBO0FBQ0RwRCxPQUFJcUMsTUFBTXhDLE1BQVY7QUFDQSxVQUFRRyxHQUFSLEVBQWM7QUFDYnliLGFBQVN1QixrQkFBbUIzYSxNQUFPckMsQ0FBUCxDQUFuQixDQUFUO0FBQ0EsUUFBS3liLE9BQVE1TSxPQUFSLENBQUwsRUFBeUI7QUFDeEIyTyxpQkFBWXZaLElBQVosQ0FBa0J3WCxNQUFsQjtBQUNBLEtBRkQsTUFFTztBQUNOOEIscUJBQWdCdFosSUFBaEIsQ0FBc0J3WCxNQUF0QjtBQUNBO0FBQ0Q7O0FBRUQ7QUFDQUEsWUFBU3BNLGNBQ1JqTSxRQURRLEVBRVJrYSx5QkFBMEJDLGVBQTFCLEVBQTJDQyxXQUEzQyxDQUZRLENBQVQ7O0FBS0E7QUFDQS9CLFVBQU9yWSxRQUFQLEdBQWtCQSxRQUFsQjtBQUNBO0FBQ0QsU0FBT3FZLE1BQVA7QUFDQSxFQWhDRDs7QUFrQ0E7Ozs7Ozs7OztBQVNBclgsVUFBU2xCLE9BQU9rQixNQUFQLEdBQWdCLFVBQVVoQixRQUFWLEVBQW9Cc1AsT0FBcEIsRUFBNkJDLE9BQTdCLEVBQXNDQyxJQUF0QyxFQUE2QztBQUNyRSxNQUFJNVMsQ0FBSjtBQUFBLE1BQU9zYixNQUFQO0FBQUEsTUFBZTZDLEtBQWY7QUFBQSxNQUFzQnJXLElBQXRCO0FBQUEsTUFBNEJxQixJQUE1QjtBQUFBLE1BQ0NpVixXQUFXLE9BQU9oYixRQUFQLEtBQW9CLFVBQXBCLElBQWtDQSxRQUQ5QztBQUFBLE1BRUNmLFFBQVEsQ0FBQ3VRLElBQUQsSUFBU3pFLFNBQVkvSyxXQUFXZ2IsU0FBU2hiLFFBQVQsSUFBcUJBLFFBQTVDLENBRmxCOztBQUlBdVAsWUFBVUEsV0FBVyxFQUFyQjs7QUFFQTtBQUNBO0FBQ0EsTUFBS3RRLE1BQU14QyxNQUFOLEtBQWlCLENBQXRCLEVBQTBCOztBQUV6QjtBQUNBeWIsWUFBU2paLE1BQU8sQ0FBUCxJQUFhQSxNQUFPLENBQVAsRUFBV2dKLEtBQVgsQ0FBa0IsQ0FBbEIsQ0FBdEI7QUFDQSxPQUFLaVEsT0FBT3piLE1BQVAsR0FBZ0IsQ0FBaEIsSUFBcUIsQ0FBRXNlLFFBQVE3QyxPQUFRLENBQVIsQ0FBVixFQUF3QnhULElBQXhCLEtBQWlDLElBQXRELElBQ0o0SyxRQUFRMUssUUFBUixLQUFxQixDQURqQixJQUNzQjBHLGNBRHRCLElBQ3dDVixLQUFLb0ssUUFBTCxDQUFla0QsT0FBUSxDQUFSLEVBQVl4VCxJQUEzQixDQUQ3QyxFQUNpRjs7QUFFaEY0SyxjQUFVLENBQUUxRSxLQUFLN0UsSUFBTCxDQUFXLElBQVgsRUFBbUJnVixNQUFNL1UsT0FBTixDQUFlLENBQWYsRUFDN0JqSixPQUQ2QixDQUNwQjhRLFNBRG9CLEVBQ1RDLFNBRFMsQ0FBbkIsRUFDdUJ3QixPQUR2QixLQUNvQyxFQUR0QyxFQUM0QyxDQUQ1QyxDQUFWO0FBRUEsUUFBSyxDQUFDQSxPQUFOLEVBQWdCO0FBQ2YsWUFBT0MsT0FBUDs7QUFFRDtBQUNDLEtBSkQsTUFJTyxJQUFLeUwsUUFBTCxFQUFnQjtBQUN0QjFMLGVBQVVBLFFBQVFoUCxVQUFsQjtBQUNBOztBQUVETixlQUFXQSxTQUFTaUksS0FBVCxDQUFnQmlRLE9BQU9wVyxLQUFQLEdBQWVoRixLQUFmLENBQXFCTCxNQUFyQyxDQUFYO0FBQ0E7O0FBRUQ7QUFDQUcsT0FBSTBRLFVBQVcsY0FBWCxFQUE0QjdQLElBQTVCLENBQWtDdUMsUUFBbEMsSUFBK0MsQ0FBL0MsR0FBbURrWSxPQUFPemIsTUFBOUQ7QUFDQSxVQUFRRyxHQUFSLEVBQWM7QUFDYm1lLFlBQVE3QyxPQUFRdGIsQ0FBUixDQUFSOztBQUVBO0FBQ0EsUUFBS2dPLEtBQUtvSyxRQUFMLENBQWlCdFEsT0FBT3FXLE1BQU1yVyxJQUE5QixDQUFMLEVBQThDO0FBQzdDO0FBQ0E7QUFDRCxRQUFPcUIsT0FBTzZFLEtBQUs3RSxJQUFMLENBQVdyQixJQUFYLENBQWQsRUFBb0M7O0FBRW5DO0FBQ0EsU0FBTzhLLE9BQU96SixLQUNiZ1YsTUFBTS9VLE9BQU4sQ0FBZSxDQUFmLEVBQW1CakosT0FBbkIsQ0FBNEI4USxTQUE1QixFQUF1Q0MsU0FBdkMsQ0FEYSxFQUViRixTQUFTblEsSUFBVCxDQUFleWEsT0FBUSxDQUFSLEVBQVl4VCxJQUEzQixLQUFxQzJMLFlBQWFmLFFBQVFoUCxVQUFyQixDQUFyQyxJQUNDZ1AsT0FIWSxDQUFkLEVBSU07O0FBRUw7QUFDQTRJLGFBQU9yRCxNQUFQLENBQWVqWSxDQUFmLEVBQWtCLENBQWxCO0FBQ0FvRCxpQkFBV3dQLEtBQUsvUyxNQUFMLElBQWUrVCxXQUFZMEgsTUFBWixDQUExQjtBQUNBLFVBQUssQ0FBQ2xZLFFBQU4sRUFBaUI7QUFDaEJhLFlBQUtrTyxLQUFMLENBQVlRLE9BQVosRUFBcUJDLElBQXJCO0FBQ0EsY0FBT0QsT0FBUDtBQUNBOztBQUVEO0FBQ0E7QUFDRDtBQUNEO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBLEdBQUV5TCxZQUFZaFEsUUFBU2hMLFFBQVQsRUFBbUJmLEtBQW5CLENBQWQsRUFDQ3VRLElBREQsRUFFQ0YsT0FGRCxFQUdDLENBQUNoRSxjQUhGLEVBSUNpRSxPQUpELEVBS0MsQ0FBQ0QsT0FBRCxJQUFZMUIsU0FBU25RLElBQVQsQ0FBZXVDLFFBQWYsS0FBNkJxUSxZQUFhZixRQUFRaFAsVUFBckIsQ0FBekMsSUFBOEVnUCxPQUwvRTtBQU9BLFNBQU9DLE9BQVA7QUFDQSxFQXZFRDs7QUF5RUE7O0FBRUE7QUFDQTVFLFNBQVFpSyxVQUFSLEdBQXFCbkosUUFBUTNJLEtBQVIsQ0FBZSxFQUFmLEVBQW9CcEIsSUFBcEIsQ0FBMEJ5SyxTQUExQixFQUFzQ2hPLElBQXRDLENBQTRDLEVBQTVDLE1BQXFEc04sT0FBMUU7O0FBRUE7QUFDQTtBQUNBZCxTQUFRZ0ssZ0JBQVIsR0FBMkIsQ0FBQyxDQUFDeEosWUFBN0I7O0FBRUE7QUFDQUM7O0FBRUE7QUFDQTtBQUNBVCxTQUFRbUosWUFBUixHQUF1Qi9DLE9BQVEsVUFBVUMsRUFBVixFQUFlOztBQUU3QztBQUNBLFNBQU9BLEdBQUcyQyx1QkFBSCxDQUE0QnhULFNBQVM4USxhQUFULENBQXdCLFVBQXhCLENBQTVCLElBQXFFLENBQTVFO0FBQ0EsRUFKc0IsQ0FBdkI7O0FBTUE7QUFDQTtBQUNBO0FBQ0EsS0FBSyxDQUFDRixPQUFRLFVBQVVDLEVBQVYsRUFBZTtBQUM1QkEsS0FBR29DLFNBQUgsR0FBZSxrQkFBZjtBQUNBLFNBQU9wQyxHQUFHNUosVUFBSCxDQUFjeEUsWUFBZCxDQUE0QixNQUE1QixNQUF5QyxHQUFoRDtBQUNBLEVBSEssQ0FBTixFQUdNO0FBQ0x1TyxZQUFXLHdCQUFYLEVBQXFDLFVBQVUxRSxJQUFWLEVBQWdCdk8sSUFBaEIsRUFBc0I0TSxLQUF0QixFQUE4QjtBQUNsRSxPQUFLLENBQUNBLEtBQU4sRUFBYztBQUNiLFdBQU8yQixLQUFLN0osWUFBTCxDQUFtQjFFLElBQW5CLEVBQXlCQSxLQUFLMkYsV0FBTCxPQUF1QixNQUF2QixHQUFnQyxDQUFoQyxHQUFvQyxDQUE3RCxDQUFQO0FBQ0E7QUFDRCxHQUpEO0FBS0E7O0FBRUQ7QUFDQTtBQUNBLEtBQUssQ0FBQzhHLFFBQVEvTSxVQUFULElBQXVCLENBQUNtVCxPQUFRLFVBQVVDLEVBQVYsRUFBZTtBQUNuREEsS0FBR29DLFNBQUgsR0FBZSxVQUFmO0FBQ0FwQyxLQUFHNUosVUFBSCxDQUFjbUosWUFBZCxDQUE0QixPQUE1QixFQUFxQyxFQUFyQztBQUNBLFNBQU9TLEdBQUc1SixVQUFILENBQWN4RSxZQUFkLENBQTRCLE9BQTVCLE1BQTBDLEVBQWpEO0FBQ0EsRUFKNEIsQ0FBN0IsRUFJTTtBQUNMdU8sWUFBVyxPQUFYLEVBQW9CLFVBQVUxRSxJQUFWLEVBQWdCd08sS0FBaEIsRUFBdUJuUSxLQUF2QixFQUErQjtBQUNsRCxPQUFLLENBQUNBLEtBQUQsSUFBVTJCLEtBQUtvQyxRQUFMLENBQWNoTCxXQUFkLE9BQWdDLE9BQS9DLEVBQXlEO0FBQ3hELFdBQU80SSxLQUFLeU8sWUFBWjtBQUNBO0FBQ0QsR0FKRDtBQUtBOztBQUVEO0FBQ0E7QUFDQSxLQUFLLENBQUNuSyxPQUFRLFVBQVVDLEVBQVYsRUFBZTtBQUM1QixTQUFPQSxHQUFHcE8sWUFBSCxDQUFpQixVQUFqQixLQUFpQyxJQUF4QztBQUNBLEVBRkssQ0FBTixFQUVNO0FBQ0x1TyxZQUFXeEUsUUFBWCxFQUFxQixVQUFVRixJQUFWLEVBQWdCdk8sSUFBaEIsRUFBc0I0TSxLQUF0QixFQUE4QjtBQUNsRCxPQUFJNUUsR0FBSjtBQUNBLE9BQUssQ0FBQzRFLEtBQU4sRUFBYztBQUNiLFdBQU8yQixLQUFNdk8sSUFBTixNQUFpQixJQUFqQixHQUF3QkEsS0FBSzJGLFdBQUwsRUFBeEIsR0FDTixDQUFFcUMsTUFBTXVHLEtBQUt3RyxnQkFBTCxDQUF1Qi9VLElBQXZCLENBQVIsS0FBMkNnSSxJQUFJbU8sU0FBL0MsR0FDQ25PLElBQUlwSixLQURMLEdBRUMsSUFIRjtBQUlBO0FBQ0QsR0FSRDtBQVNBOztBQUVEO0FBQ0EsS0FBSXFlLFVBQVV6USxPQUFPNUssTUFBckI7O0FBRUFBLFFBQU9zYixVQUFQLEdBQW9CLFlBQVc7QUFDOUIsTUFBSzFRLE9BQU81SyxNQUFQLEtBQWtCQSxNQUF2QixFQUFnQztBQUMvQjRLLFVBQU81SyxNQUFQLEdBQWdCcWIsT0FBaEI7QUFDQTs7QUFFRCxTQUFPcmIsTUFBUDtBQUNBLEVBTkQ7O0FBUUEsS0FBSyxJQUFMLEVBQWtEO0FBQ2pEdWIsRUFBQSxrQ0FBUSxZQUFXO0FBQ2xCLFVBQU92YixNQUFQO0FBQ0EsR0FGRDs7QUFJRDtBQUNDLEVBTkQsTUFNTyxJQUFLLE9BQU93YixNQUFQLEtBQWtCLFdBQWxCLElBQWlDQSxPQUFPQyxPQUE3QyxFQUF1RDtBQUM3REQsU0FBT0MsT0FBUCxHQUFpQnpiLE1BQWpCO0FBQ0EsRUFGTSxNQUVBO0FBQ040SyxTQUFPNUssTUFBUCxHQUFnQkEsTUFBaEI7QUFDQTs7QUFFRDtBQUVDLENBbjZFRCxFQW02RUs0SyxNQW42RUwsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQ0NWUzhRLE87Ozs7OzttQkFBbUJDLGlCOzs7Ozs7bUJBQW1CQyxnQjs7Ozs7Ozs7OzBDQUN0Q0YsTzs7Ozs7O2tCQUFrQnZYLFc7Ozs7Ozs7Ozs2Q0FDbEJ1WCxPOzs7Ozs7Ozs7Ozs7UUFDR0csTSIsImZpbGUiOiJvcHRpbWFsLXNlbGVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIk9wdGltYWxTZWxlY3RcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiT3B0aW1hbFNlbGVjdFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzM2E3MjhhOThkNDM3ZmVjYjYwMCIsIi8qKlxuICogIyBVdGlsaXRpZXNcbiAqXG4gKiBDb252ZW5pZW5jZSBoZWxwZXJzLlxuICovXG5cbi8qKlxuICogQ3JlYXRlIGFuIGFycmF5IHdpdGggdGhlIERPTSBub2RlcyBvZiB0aGUgbGlzdFxuICpcbiAqIEBwYXJhbSAge05vZGVMaXN0fSAgICAgICAgICAgICBub2RlcyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge0FycmF5LjxIVE1MRWxlbWVudD59ICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnROb2RlTGlzdCA9IChub2RlcykgPT4ge1xuICBjb25zdCB7IGxlbmd0aCB9ID0gbm9kZXNcbiAgY29uc3QgYXJyID0gbmV3IEFycmF5KGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGFycltpXSA9IG5vZGVzW2ldXG4gIH1cbiAgcmV0dXJuIGFyclxufVxuXG4vKipcbiAqIEVzY2FwZSBzcGVjaWFsIGNoYXJhY3RlcnMgYW5kIGxpbmUgYnJlYWtzIGFzIGEgc2ltcGxpZmllZCB2ZXJzaW9uIG9mICdDU1MuZXNjYXBlKCknXG4gKlxuICogRGVzY3JpcHRpb24gb2YgdmFsaWQgY2hhcmFjdGVyczogaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2Nzcy1lc2NhcGVzXG4gKlxuICogQHBhcmFtICB7U3RyaW5nP30gdmFsdWUgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGNvbnN0IGVzY2FwZVZhbHVlID0gKHZhbHVlKSA9PlxuICB2YWx1ZSAmJiB2YWx1ZS5yZXBsYWNlKC9bJ1wiYFxcXFwvOj8mISMkJV4oKVtcXF17fH0qKzssLjw9PkB+XS9nLCAnXFxcXCQmJylcbiAgICAucmVwbGFjZSgvXFxuL2csICdcXHUwMGEwJylcblxuLyoqXG4gKiBQYXJ0aXRpb24gYXJyYXkgaW50byB0d28gZ3JvdXBzIGRldGVybWluZWQgYnkgcHJlZGljYXRlXG4gKi9cbmV4cG9ydCBjb25zdCBwYXJ0aXRpb24gPSAoYXJyYXksIHByZWRpY2F0ZSkgPT5cbiAgYXJyYXkucmVkdWNlKFxuICAgIChbaW5uZXIsIG91dGVyXSwgaXRlbSkgPT4gcHJlZGljYXRlKGl0ZW0pID8gW2lubmVyLmNvbmNhdChpdGVtKSwgb3V0ZXJdIDogW2lubmVyLCBvdXRlci5jb25jYXQoaXRlbSldLFxuICAgIFtbXSwgW11dXG4gIClcblxuXG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHN0cmluZyBpcyB2YWxpZCBDU1MgaWRlbnRpZmllclxuICogXG4gKiBJbiBDU1MsIGlkZW50aWZpZXJzIChpbmNsdWRpbmcgZWxlbWVudCBuYW1lcywgY2xhc3NlcywgYW5kIElEcyBpbiBzZWxlY3RvcnMpIGNhbiBjb250YWluXG4gKiBvbmx5IHRoZSBjaGFyYWN0ZXJzIFthLXpBLVowLTldIGFuZCBJU08gMTA2NDYgY2hhcmFjdGVycyBVKzAwQTAgYW5kIGhpZ2hlciwgcGx1cyB0aGUgaHlwaGVuICgtKVxuICogYW5kIHRoZSB1bmRlcnNjb3JlIChfKTsgdGhleSBjYW5ub3Qgc3RhcnQgd2l0aCBhIGRpZ2l0LCB0d28gaHlwaGVucywgb3IgYSBoeXBoZW4gZm9sbG93ZWQgYnlcbiAqIGEgZGlnaXQuXG4gKiBcbiAqIElkZW50aWZpZXJzIGNhbiBhbHNvIGNvbnRhaW4gZXNjYXBlZCBjaGFyYWN0ZXJzIGFuZCBhbnkgSVNPIDEwNjQ2IGNoYXJhY3RlciBhcyBhIG51bWVyaWNcbiAqIGNvZGUgKHNlZSBuZXh0IGl0ZW0pLiBGb3IgaW5zdGFuY2UsIHRoZSBpZGVudGlmaWVyIFwiQiZXP1wiIG1heSBiZSB3cml0dGVuIGFzIFwiQlxcJldcXD9cIiBvciBcIkJcXDI2IFdcXDNGXCIuXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaXNWYWxpZENTU0lkZW50aWZpZXIgPSAodmFsdWUpID0+XG4gICEhdmFsdWUgJiYgIS8oXlxcZCl8KF4tLSl8KF4tXFxkKS8udGVzdCh2YWx1ZSkgJiYgIS8oW15cXFxcXXxeKVsnXCJgLzo/JiEjJCVeKClbXFxde3x9Kis7LC48PT5Afl0vLnRlc3QodmFsdWUpXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxpdGllcy5qcyIsImltcG9ydCB7IGlzVmFsaWRDU1NJZGVudGlmaWVyIH0gZnJvbSAnLi91dGlsaXRpZXMnXG4vKipcbiAqIEB0eXBlZGVmICB7T2JqZWN0fSBQYXR0ZXJuXG4gKiBAcHJvcGVydHkgeygnZGVzY2VuZGFudCcgfCAnY2hpbGQnKX0gICAgICAgICAgICAgICAgICBbcmVsYXRlc11cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YWddXG4gKiBAcHJvcGVydHkge0FycmF5Ljx7IG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZz8gfT59ICBhdHRyaWJ1dGVzXG4gKiBAcHJvcGVydHkge0FycmF5LjxzdHJpbmc+fSAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzXG4gKiBAcHJvcGVydHkge0FycmF5LjxzdHJpbmc+fSAgICAgICAgICAgICAgICAgICAgICAgICAgICBwc2V1ZG9cbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPEFycmF5LjxQYXR0ZXJuPj59ICAgICAgICAgICAgICAgICAgIGRlc2NlbmRhbnRzXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHBhdHRlcm4gc3RydWN0dXJlXG4gKiBcbiAqIEBwYXJhbSB7UGFydGlhbDxQYXR0ZXJuPn0gcGF0dGVyblxuICogQHJldHVybnMge1BhdHRlcm59XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVQYXR0ZXJuID0gKGJhc2UgPSB7fSkgPT5cbiAgKHsgYXR0cmlidXRlczogW10sIGNsYXNzZXM6IFtdLCBwc2V1ZG86IFtdLCBkZXNjZW5kYW50czogW10sIC4uLmJhc2UgfSlcblxuLyoqXG4gKiBDb252ZXJ0IGF0dHJpYnV0ZXMgdG8gQ1NTIHNlbGVjdG9yXG4gKiBcbiAqIEBwYXJhbSB7QXJyYXkuPHsgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nPyB9Pn0gYXR0cmlidXRlcyBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVzVG9TZWxlY3RvciA9IChhdHRyaWJ1dGVzKSA9PlxuICBhdHRyaWJ1dGVzLm1hcCgoeyBuYW1lLCB2YWx1ZSB9KSA9PiB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gYFske25hbWV9XWBcbiAgICB9XG4gICAgaWYgKG5hbWUgPT09ICdpZCcgJiYgaXNWYWxpZENTU0lkZW50aWZpZXIodmFsdWUpKSB7XG4gICAgICByZXR1cm4gYCMke3ZhbHVlfWBcbiAgICB9XG4gICAgcmV0dXJuIGBbJHtuYW1lfT1cIiR7dmFsdWV9XCJdYFxuICB9KS5qb2luKCcnKVxuXG4vKipcbiAqIENvbnZlcnQgY2xhc3NlcyB0byBDU1Mgc2VsZWN0b3JcbiAqIFxuICogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gY2xhc3NlcyBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBjbGFzc2VzVG9TZWxlY3RvciA9IChjbGFzc2VzKSA9PlxuICBjbGFzc2VzLm1hcChjID0+IGlzVmFsaWRDU1NJZGVudGlmaWVyKGMpID8gYC4ke2N9YCA6IGBbY2xhc3N+PVwiJHtjfVwiXWApLmpvaW4oJycpXG5cbi8qKlxuICogQ29udmVydCBwc2V1ZG8gc2VsZWN0b3JzIHRvIENTUyBzZWxlY3RvclxuICogXG4gKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fSBwc2V1ZG8gXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgcHNldWRvVG9TZWxlY3RvciA9IChwc2V1ZG8pID0+IHBzZXVkby5sZW5ndGggPyBgOiR7cHNldWRvLmpvaW4oJzonKX1gIDogJydcblxuLyoqXG4gKiBDb252ZXJ0IHBhdHRlcm4gdG8gQ1NTIHNlbGVjdG9yXG4gKiBcbiAqIEBwYXJhbSB7UGF0dGVybn0gcGF0dGVybiBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBwYXR0ZXJuVG9TZWxlY3RvciA9IChwYXR0ZXJuKSA9PiB7XG4gIGNvbnN0IHsgcmVsYXRlcywgdGFnLCBhdHRyaWJ1dGVzLCBjbGFzc2VzLCBwc2V1ZG8gfSA9IHBhdHRlcm5cbiAgY29uc3QgdmFsdWUgPSBgJHtcbiAgICByZWxhdGVzID09PSAnY2hpbGQnID8gJz4gJyA6ICcnXG4gIH0ke1xuICAgIHRhZyB8fCAnJ1xuICB9JHtcbiAgICBhdHRyaWJ1dGVzVG9TZWxlY3RvcihhdHRyaWJ1dGVzKVxuICB9JHtcbiAgICBjbGFzc2VzVG9TZWxlY3RvcihjbGFzc2VzKVxuICB9JHtcbiAgICBwc2V1ZG9Ub1NlbGVjdG9yKHBzZXVkbylcbiAgfWBcbiAgcmV0dXJuIHZhbHVlXG59XG5cbi8qKlxuICogQ29udmVydHMgcGF0aCB0byBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge0FycmF5LjxQYXR0ZXJuPn0gcGF0aCBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBwYXRoVG9TZWxlY3RvciA9IChwYXRoKSA9PlxuICBwYXRoLm1hcChwYXR0ZXJuVG9TZWxlY3Rvcikuam9pbignICcpXG5cblxuY29uc3QgY29udmVydEVzY2FwaW5nID0gKHZhbHVlKSA9PlxuICB2YWx1ZSAmJiB2YWx1ZS5yZXBsYWNlKC9cXFxcKFtgXFxcXC86PyYhIyQlXigpW1xcXXt8fSorOywuPD0+QH5dKS9nLCAnJDEnKVxuICAgIC5yZXBsYWNlKC9cXFxcKFsnXCJdKS9nLCAnJDEkMScpXG4gICAgLnJlcGxhY2UoL1xcXFxBIC9nLCAnXFxuJylcblxuLyoqXG4qIENvbnZlcnQgYXR0cmlidXRlcyB0byBYUGF0aCBzdHJpbmdcbiogXG4qIEBwYXJhbSB7QXJyYXkuPHsgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nPyB9Pn0gYXR0cmlidXRlcyBcbiogQHJldHVybnMge3N0cmluZ31cbiovXG5leHBvcnQgY29uc3QgYXR0cmlidXRlc1RvWFBhdGggPSAoYXR0cmlidXRlcykgPT5cbiAgYXR0cmlidXRlcy5tYXAoKHsgbmFtZSwgdmFsdWUgfSkgPT4ge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGBbQCR7bmFtZX1dYFxuICAgIH1cbiAgICByZXR1cm4gYFtAJHtuYW1lfT1cIiR7Y29udmVydEVzY2FwaW5nKHZhbHVlKX1cIl1gXG4gIH0pLmpvaW4oJycpXG5cbi8qKlxuKiBDb252ZXJ0IGNsYXNzZXMgdG8gWFBhdGggc3RyaW5nXG4qIFxuKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fSBjbGFzc2VzIFxuKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmV4cG9ydCBjb25zdCBjbGFzc2VzVG9YUGF0aCA9IChjbGFzc2VzKSA9PlxuICBjbGFzc2VzLm1hcChjID0+IGBbY29udGFpbnMoY29uY2F0KFwiIFwiLG5vcm1hbGl6ZS1zcGFjZShAY2xhc3MpLFwiIFwiKSxcIiAke2N9IFwiKV1gKS5qb2luKCcnKVxuXG4vKipcbiogQ29udmVydCBwc2V1ZG8gc2VsZWN0b3JzIHRvIFhQYXRoIHN0cmluZ1xuKiBcbiogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gcHNldWRvIFxuKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmV4cG9ydCBjb25zdCBwc2V1ZG9Ub1hQYXRoID0gKHBzZXVkbykgPT5cbiAgcHNldWRvLm1hcChwID0+IHtcbiAgICBjb25zdCBtYXRjaCA9IHAubWF0Y2goL14obnRoLWNoaWxkfG50aC1vZi10eXBlfGNvbnRhaW5zKVxcKCguKylcXCkkLylcbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICByZXR1cm4gJydcbiAgICB9XG5cbiAgICBzd2l0Y2ggKG1hdGNoWzFdKSB7XG4gICAgICBjYXNlICdudGgtY2hpbGQnOlxuICAgICAgICByZXR1cm4gYFsoY291bnQocHJlY2VkaW5nLXNpYmxpbmc6OiopKzEpID0gJHttYXRjaFsyXX1dYFxuXG4gICAgICBjYXNlICdudGgtb2YtdHlwZSc6XG4gICAgICAgIHJldHVybiBgWyR7bWF0Y2hbMl19XWBcblxuICAgICAgY2FzZSAnY29udGFpbnMnOlxuICAgICAgICByZXR1cm4gYFtjb250YWlucyh0ZXh0KCksJHttYXRjaFsyXX0pXWBcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICcnXG4gICAgfVxuICB9KS5qb2luKCcnKVxuXG4vKipcbiogQ29udmVydCBwYXR0ZXJuIHRvIFhQYXRoIHN0cmluZ1xuKiBcbiogQHBhcmFtIHtQYXR0ZXJufSBwYXR0ZXJuIFxuKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmV4cG9ydCBjb25zdCBwYXR0ZXJuVG9YUGF0aCA9IChwYXR0ZXJuKSA9PiB7XG4gIGNvbnN0IHsgcmVsYXRlcywgdGFnLCBhdHRyaWJ1dGVzLCBjbGFzc2VzLCBwc2V1ZG8sIGRlc2NlbmRhbnRzIH0gPSBwYXR0ZXJuXG4gIGNvbnN0IHZhbHVlID0gYCR7XG4gICAgcmVsYXRlcyA9PT0gJ2NoaWxkJyA/ICcvJyA6ICcvLydcbiAgfSR7XG4gICAgdGFnIHx8ICcqJ1xuICB9JHtcbiAgICBhdHRyaWJ1dGVzVG9YUGF0aChhdHRyaWJ1dGVzKVxuICB9JHtcbiAgICBjbGFzc2VzVG9YUGF0aChjbGFzc2VzKVxuICB9JHtcbiAgICBwc2V1ZG9Ub1hQYXRoKHBzZXVkbylcbiAgfSR7XG4gICAgZGVzY2VuZGFudHNUb1hQYXRoKGRlc2NlbmRhbnRzKVxuICB9YFxuICByZXR1cm4gdmFsdWVcbn1cblxuLyoqXG4qIENvbnZlcnRzIHBhdGggdG8gWFBhdGggc3RyaW5nXG4qXG4qIEBwYXJhbSB7QXJyYXkuPFBhdHRlcm4+fSBwYXRoIFxuKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmV4cG9ydCBjb25zdCBwYXRoVG9YUGF0aCA9IChwYXRoKSA9PiBgLiR7cGF0aC5tYXAocGF0dGVyblRvWFBhdGgpLmpvaW4oJycpfWBcblxuLyoqXG4qIENvbnZlcnQgY2hpbGQgc2VsZWN0b3JzIHRvIFhQYXRoIHN0cmluZ1xuKiBcbiogQHBhcmFtIHtBcnJheS48QXJyYXkuPFBhdHRlcm4+Pn0gY2hpbGRyZW4gXG4qIEByZXR1cm5zIHtzdHJpbmd9XG4qL1xuZXhwb3J0IGNvbnN0IGRlc2NlbmRhbnRzVG9YUGF0aCA9IChjaGlsZHJlbikgPT5cbiAgY2hpbGRyZW4ubGVuZ3RoID8gYFske2NoaWxkcmVuLm1hcChwYXRoVG9YUGF0aCkuam9pbignXVsnKX1dYCA6ICcnXG5cbiAgXG5jb25zdCB0b1N0cmluZyA9IHtcbiAgJ2Nzcyc6IHtcbiAgICBhdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzVG9TZWxlY3RvcixcbiAgICBjbGFzc2VzOiBjbGFzc2VzVG9TZWxlY3RvcixcbiAgICBwc2V1ZG86IHBzZXVkb1RvU2VsZWN0b3IsXG4gICAgcGF0dGVybjogcGF0dGVyblRvU2VsZWN0b3IsXG4gICAgcGF0aDogcGF0aFRvU2VsZWN0b3JcbiAgfSxcbiAgJ3hwYXRoJzoge1xuICAgIGF0dHJpYnV0ZXM6IGF0dHJpYnV0ZXNUb1hQYXRoLFxuICAgIGNsYXNzZXM6IGNsYXNzZXNUb1hQYXRoLFxuICAgIHBzZXVkbzogcHNldWRvVG9YUGF0aCxcbiAgICBwYXR0ZXJuOiBwYXR0ZXJuVG9YUGF0aCxcbiAgICBwYXRoOiBwYXRoVG9YUGF0aFxuICB9LFxuICAnanF1ZXJ5Jzoge31cbn1cblxudG9TdHJpbmcuanF1ZXJ5ID0gdG9TdHJpbmcuY3NzXG50b1N0cmluZ1swXSA9IHRvU3RyaW5nLmNzc1xudG9TdHJpbmdbMV0gPSB0b1N0cmluZy54cGF0aFxuICBcbi8qKlxuICogQHR5cGVkZWYgIHtPYmplY3R9IFRvU3RyaW5nQXBpXG4gKiBAcHJvcGVydHkgeyhhdHRyaWJ1dGVzOiBBcnJheS48eyBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmc/IH0+KSA9PiBzdHJpbmd9IGF0dHJpYnV0ZXNcbiAqIEBwcm9wZXJ0eSB7KGNsYXNzZXM6IEFycmF5LjxzdHJpbmc+KSA9PiBzdHJpbmd9ICBjbGFzc2VzXG4gKiBAcHJvcGVydHkgeyhwc2V1ZG86IEFycmF5LjxzdHJpbmc+KSA9PiBzdHJpbmd9ICAgcHNldWRvXG4gKiBAcHJvcGVydHkgeyhwYXR0ZXJuOiBQYXR0ZXJuKSA9PiBzdHJpbmd9ICAgICAgICAgcGF0dGVyblxuICogQHByb3BlcnR5IHsocGF0aDogQXJyYXkuPFBhdHRlcm4+KSA9PiBzdHJpbmd9ICAgIHBhdGhcbiAqL1xuXG4vKipcbiAqIFxuICogQHBhcmFtIHtPcHRpb25zfSBvcHRpb25zIFxuICogQHJldHVybnMge1RvU3RyaW5nQXBpfVxuICovXG5leHBvcnQgY29uc3QgZ2V0VG9TdHJpbmcgPSAob3B0aW9ucyA9IHt9KSA9PlxuICB0b1N0cmluZ1tvcHRpb25zLmZvcm1hdCB8fCAnY3NzJ11cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGF0dGVybi5qcyIsIi8vIGltcG9ydCBTaXp6bGUgZnJvbSAnc2l6emxlJ1xubGV0IFNpenpsZVxuXG4vKipcbiAqIFNlbGVjdCBlbGVtZW50IHVzaW5nIGpRdWVyeVxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgIHNlbGVjdG9yXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgcGFyZW50XG4gKiBAcmV0dXJuIEFycmF5LjxIVE1MRWxlbWVudD5cbiAqL1xuY29uc3Qgc2VsZWN0SlF1ZXJ5ID0gKHNlbGVjdG9yLCBwYXJlbnQgPSBudWxsKSA9PiB7XG4gIGlmICghU2l6emxlKSB7XG4gICAgU2l6emxlID0gcmVxdWlyZSgnc2l6emxlJylcbiAgfVxuICByZXR1cm4gU2l6emxlKHNlbGVjdG9yLCBwYXJlbnQgfHwgZG9jdW1lbnQpXG59XG4gIFxuLyoqXG4gKiBTZWxlY3QgZWxlbWVudCB1c2luZyBYUGF0aFxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgIHNlbGVjdG9yXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgcGFyZW50XG4gKiBAcmV0dXJuIEFycmF5LjxIVE1MRWxlbWVudD5cbiAqL1xuY29uc3Qgc2VsZWN0WFBhdGggPSAoc2VsZWN0b3IsIHBhcmVudCA9IG51bGwpID0+IHtcbiAgcGFyZW50ID0gKHBhcmVudCB8fCBkb2N1bWVudClcbiAgdmFyIGRvYyA9IHBhcmVudFxuICB3aGlsZSAoZG9jLnBhcmVudE5vZGUpIHtcbiAgICBkb2MgPSBkb2MucGFyZW50Tm9kZVxuICB9XG4gIGlmIChkb2MgIT09IHBhcmVudCAmJiAhc2VsZWN0b3Iuc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgc2VsZWN0b3IgPSBgLiR7c2VsZWN0b3J9YFxuICB9XG4gIHZhciBpdGVyYXRvciA9IGRvYy5ldmFsdWF0ZShzZWxlY3RvciwgcGFyZW50LCBudWxsLCAwKVxuICB2YXIgZWxlbWVudHMgPSBbXVxuICB2YXIgZWxlbWVudFxuICB3aGlsZSAoKGVsZW1lbnQgPSBpdGVyYXRvci5pdGVyYXRlTmV4dCgpKSkge1xuICAgIGVsZW1lbnRzLnB1c2goZWxlbWVudClcbiAgfVxuICByZXR1cm4gZWxlbWVudHNcbn1cbiAgXG4vKipcbiAqIFNlbGVjdCBlbGVtZW50IHVzaW5nIENTU1xuICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgIHNlbGVjdG9yXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgcGFyZW50XG4gKiBAcmV0dXJuIEFycmF5LjxIVE1MRWxlbWVudD5cbiAqL1xuY29uc3Qgc2VsZWN0Q1NTID0gKHNlbGVjdG9yLCBwYXJlbnQgPSBudWxsKSA9PlxuICAocGFyZW50IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuXG5jb25zdCBzZWxlY3QgPSB7XG4gICdjc3MnOiBzZWxlY3RDU1MsXG4gICd4cGF0aCc6IHNlbGVjdFhQYXRoLFxuICAnanF1ZXJ5Jzogc2VsZWN0SlF1ZXJ5XG59XG5cbnNlbGVjdFswXSA9IHNlbGVjdC5jc3NcbnNlbGVjdFsxXSA9IHNlbGVjdC54cGF0aFxuXG4vKipcbiogXG4qIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9ucyBcbiogQHJldHVybnMgeyhzZWxlY3Rvcjogc3RyaW5nLCBwYXJlbnQ6IEhUTUxFbGVtZW50KSA9PiBBcnJheS48SFRNTEVsZW1lbnQ+fVxuKi9cbmV4cG9ydCBjb25zdCBnZXRTZWxlY3QgPSAob3B0aW9ucyA9IHt9KSA9PlxuICAoc2VsZWN0b3IsIHBhcmVudCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc2VsZWN0W29wdGlvbnMuZm9ybWF0IHx8ICdjc3MnXShzZWxlY3RvciwgcGFyZW50IHx8IG9wdGlvbnMucm9vdClcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBbXVxuICAgIH1cbiAgfVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VsZWN0b3IuanMiLCIvKipcbiAqICMgQ29tbW9uXG4gKlxuICogUHJvY2VzcyBjb2xsZWN0aW9ucyBmb3Igc2ltaWxhcml0aWVzLlxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnLi9zZWxlY3QnKS5PcHRpb25zfSBPcHRpb25zXG4gKi9cblxuLyoqXG4gKiBGaW5kIHRoZSBsYXN0IGNvbW1vbiBhbmNlc3RvciBvZiBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICAgICAgICBvcHRpb25zICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldENvbW1vbkFuY2VzdG9yID0gKGVsZW1lbnRzLCBvcHRpb25zID0ge30pID0+IHtcblxuICBjb25zdCB7XG4gICAgcm9vdCA9IGRvY3VtZW50XG4gIH0gPSBvcHRpb25zXG5cbiAgY29uc3QgYW5jZXN0b3JzID0gW11cblxuICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHBhcmVudHMgPSBbXVxuICAgIHdoaWxlIChlbGVtZW50ICE9PSByb290KSB7XG4gICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlXG4gICAgICBwYXJlbnRzLnVuc2hpZnQoZWxlbWVudClcbiAgICB9XG4gICAgYW5jZXN0b3JzW2luZGV4XSA9IHBhcmVudHNcbiAgfSlcblxuICBhbmNlc3RvcnMuc29ydCgoY3VyciwgbmV4dCkgPT4gY3Vyci5sZW5ndGggLSBuZXh0Lmxlbmd0aClcblxuICBjb25zdCBzaGFsbG93QW5jZXN0b3IgPSBhbmNlc3RvcnMuc2hpZnQoKVxuXG4gIHZhciBhbmNlc3RvciA9IG51bGxcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IHNoYWxsb3dBbmNlc3Rvci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCBwYXJlbnQgPSBzaGFsbG93QW5jZXN0b3JbaV1cbiAgICBjb25zdCBtaXNzaW5nID0gYW5jZXN0b3JzLnNvbWUoKG90aGVyUGFyZW50cykgPT4ge1xuICAgICAgcmV0dXJuICFvdGhlclBhcmVudHMuc29tZSgob3RoZXJQYXJlbnQpID0+IG90aGVyUGFyZW50ID09PSBwYXJlbnQpXG4gICAgfSlcblxuICAgIGlmIChtaXNzaW5nKSB7XG4gICAgICAvLyBUT0RPOiBmaW5kIHNpbWlsYXIgc3ViLXBhcmVudHMsIG5vdCB0aGUgdG9wIHJvb3QsIGUuZy4gc2hhcmluZyBhIGNsYXNzIHNlbGVjdG9yXG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGFuY2VzdG9yID0gcGFyZW50XG4gIH1cblxuICByZXR1cm4gYW5jZXN0b3Jcbn1cblxuLyoqXG4gKiBHZXQgYSBzZXQgb2YgY29tbW9uIHByb3BlcnRpZXMgb2YgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgY29uc3QgZ2V0Q29tbW9uUHJvcGVydGllcyA9IChlbGVtZW50cywgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGNvbnN0IHsgaWdub3JlID0ge30gfSA9IG9wdGlvbnNcblxuICBjb25zdCBjb21tb25Qcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzZXM6IFtdLFxuICAgIGF0dHJpYnV0ZXM6IHt9LFxuICAgIHRhZzogbnVsbFxuICB9XG5cbiAgZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXG4gICAgdmFyIHtcbiAgICAgIGNsYXNzZXM6IGNvbW1vbkNsYXNzZXMsXG4gICAgICBhdHRyaWJ1dGVzOiBjb21tb25BdHRyaWJ1dGVzLFxuICAgICAgdGFnOiBjb21tb25UYWdcbiAgICB9ID0gY29tbW9uUHJvcGVydGllc1xuXG4gICAgLy8gfiBjbGFzc2VzXG4gICAgaWYgKGNvbW1vbkNsYXNzZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnY2xhc3MnKVxuICAgICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMudHJpbSgpLnNwbGl0KCcgJykuZmlsdGVyKGNscyA9PiAhaWdub3JlLmNsYXNzIHx8ICFpZ25vcmUuY2xhc3MoY2xzKSlcbiAgICAgICAgaWYgKCFjb21tb25DbGFzc2VzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbW1vblByb3BlcnRpZXMuY2xhc3NlcyA9IGNsYXNzZXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21tb25DbGFzc2VzID0gY29tbW9uQ2xhc3Nlcy5maWx0ZXIoKGVudHJ5KSA9PiBjbGFzc2VzLnNvbWUoKG5hbWUpID0+IG5hbWUgPT09IGVudHJ5KSlcbiAgICAgICAgICBpZiAoY29tbW9uQ2xhc3Nlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbW1vblByb3BlcnRpZXMuY2xhc3NlcyA9IGNvbW1vbkNsYXNzZXNcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIGNvbW1vblByb3BlcnRpZXMuY2xhc3Nlc1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIGNvbW1vblByb3BlcnRpZXMuY2xhc3Nlc1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIH4gYXR0cmlidXRlc1xuICAgIGlmIChjb21tb25BdHRyaWJ1dGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnRBdHRyaWJ1dGVzID0gZWxlbWVudC5hdHRyaWJ1dGVzXG4gICAgICBjb25zdCBhdHRyaWJ1dGVzID0gT2JqZWN0LmtleXMoZWxlbWVudEF0dHJpYnV0ZXMpLnJlZHVjZSgoYXR0cmlidXRlcywga2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGVsZW1lbnRBdHRyaWJ1dGVzW2tleV1cbiAgICAgICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGF0dHJpYnV0ZS5uYW1lXG4gICAgICAgIGlmIChhdHRyaWJ1dGUgJiYgYXR0cmlidXRlTmFtZSAhPT0gJ2NsYXNzJyAmJiAoIWlnbm9yZS5hdHRyaWJ1dGUgfHwgIWlnbm9yZS5hdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlLnZhbHVlKSkpIHtcbiAgICAgICAgICBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID0gYXR0cmlidXRlLnZhbHVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXNcbiAgICAgIH0sIHt9KVxuXG4gICAgICBjb25zdCBhdHRyaWJ1dGVzTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKVxuICAgICAgY29uc3QgY29tbW9uQXR0cmlidXRlc05hbWVzID0gT2JqZWN0LmtleXMoY29tbW9uQXR0cmlidXRlcylcblxuICAgICAgaWYgKGF0dHJpYnV0ZXNOYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCFjb21tb25BdHRyaWJ1dGVzTmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbW1vbkF0dHJpYnV0ZXMgPSBjb21tb25BdHRyaWJ1dGVzTmFtZXMucmVkdWNlKChuZXh0Q29tbW9uQXR0cmlidXRlcywgbmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjb21tb25BdHRyaWJ1dGVzW25hbWVdXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IGF0dHJpYnV0ZXNbbmFtZV0pIHtcbiAgICAgICAgICAgICAgbmV4dENvbW1vbkF0dHJpYnV0ZXNbbmFtZV0gPSB2YWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5leHRDb21tb25BdHRyaWJ1dGVzXG4gICAgICAgICAgfSwge30pXG4gICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGNvbW1vbkF0dHJpYnV0ZXMpLmxlbmd0aCkge1xuICAgICAgICAgICAgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzID0gY29tbW9uQXR0cmlidXRlc1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gfiB0YWdcbiAgICBpZiAoY29tbW9uVGFnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHRhZyA9IGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICBpZiAoIWNvbW1vblRhZykge1xuICAgICAgICBjb21tb25Qcm9wZXJ0aWVzLnRhZyA9IHRhZ1xuICAgICAgfSBlbHNlIGlmICh0YWcgIT09IGNvbW1vblRhZykge1xuICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy50YWdcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIGNvbW1vblByb3BlcnRpZXNcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24uanMiLCIvKipcbiAqICMgTWF0Y2hcbiAqXG4gKiBSZXRyaWV2ZSBzZWxlY3RvciBmb3IgYSBub2RlLlxuICovXG5cbmltcG9ydCB7IGNyZWF0ZVBhdHRlcm4sIGdldFRvU3RyaW5nIH0gZnJvbSAnLi9wYXR0ZXJuJ1xuaW1wb3J0IHsgZ2V0U2VsZWN0IH0gZnJvbSAnLi9zZWxlY3RvcidcbmltcG9ydCB7IGVzY2FwZVZhbHVlIH0gZnJvbSAnLi91dGlsaXRpZXMnXG5cbi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnLi9zZWxlY3QnKS5PcHRpb25zfSBPcHRpb25zXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3BhdHRlcm4nKS5QYXR0ZXJufSBQYXR0ZXJuXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3BhdHRlcm4nKS5Ub1N0cmluZ0FwaX0gUGF0dGVyblxuICovXG5cbmNvbnN0IGRlZmF1bHRJZ25vcmUgPSB7XG4gIGF0dHJpYnV0ZSAoYXR0cmlidXRlTmFtZSkge1xuICAgIHJldHVybiBbXG4gICAgICAnc3R5bGUnLFxuICAgICAgJ2RhdGEtcmVhY3RpZCcsXG4gICAgICAnZGF0YS1yZWFjdC1jaGVja3N1bSdcbiAgICBdLmluZGV4T2YoYXR0cmlidXRlTmFtZSkgPiAtMVxuICB9LFxuICBjb250YWluczogKCkgPT4gdHJ1ZVxufVxuXG5leHBvcnQgY29uc3QgaW5pdE9wdGlvbnMgPSAob3B0aW9ucyA9IHt9KSA9PiAoe1xuICAuLi5vcHRpb25zLFxuICByb290OiBvcHRpb25zLnJvb3QgfHwgZG9jdW1lbnQsXG4gIHNraXA6IG9wdGlvbnMuc2tpcCB8fCBudWxsLFxuICBwcmlvcml0eTogb3B0aW9ucy5wcmlvcml0eSB8fCBbJ2lkJywgJ2NsYXNzJywgJ2hyZWYnLCAnc3JjJ10sXG4gIGlnbm9yZTogb3B0aW9ucy5pZ25vcmUgfHwge31cbn0pXG5cbi8qKlxuICogR2V0IHRoZSBwYXRoIG9mIHRoZSBlbGVtZW50XG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IG5vZGUgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICBbb3B0aW9uc10gLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtBcnJheS48UGF0dGVybj59ICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYXRjaCAobm9kZSwgb3B0aW9ucyA9IHt9LCBuZXN0ZWQgPSBmYWxzZSkge1xuICBvcHRpb25zID0gaW5pdE9wdGlvbnMob3B0aW9ucylcbiAgY29uc3QgeyByb290LCBza2lwLCBpZ25vcmUsIGZvcm1hdCB9ID0gb3B0aW9uc1xuXG4gIGNvbnN0IHBhdGggPSBbXVxuICBsZXQgZWxlbWVudCA9IG5vZGVcbiAgbGV0IGxlbmd0aCA9IHBhdGgubGVuZ3RoXG4gIGNvbnN0IHNlbGVjdCA9IGdldFNlbGVjdChvcHRpb25zKVxuICBjb25zdCB0b1N0cmluZyA9IGdldFRvU3RyaW5nKG9wdGlvbnMpXG5cbiAgY29uc3Qgc2tpcENvbXBhcmUgPSBza2lwICYmIChBcnJheS5pc0FycmF5KHNraXApID8gc2tpcCA6IFtza2lwXSkubWFwKChlbnRyeSkgPT4ge1xuICAgIGlmICh0eXBlb2YgZW50cnkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAoZWxlbWVudCkgPT4gZWxlbWVudCA9PT0gZW50cnlcbiAgICB9XG4gICAgcmV0dXJuIGVudHJ5XG4gIH0pXG5cbiAgY29uc3Qgc2tpcENoZWNrcyA9IChlbGVtZW50KSA9PiB7XG4gICAgcmV0dXJuIHNraXAgJiYgc2tpcENvbXBhcmUuc29tZSgoY29tcGFyZSkgPT4gY29tcGFyZShlbGVtZW50KSlcbiAgfVxuXG4gIE9iamVjdC5rZXlzKGlnbm9yZSkuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgIHZhciBwcmVkaWNhdGUgPSBpZ25vcmVbdHlwZV1cbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuXG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgPT09ICdudW1iZXInKSB7XG4gICAgICBwcmVkaWNhdGUgPSBwcmVkaWNhdGUudG9TdHJpbmcoKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHByZWRpY2F0ZSA9IG5ldyBSZWdFeHAoZXNjYXBlVmFsdWUocHJlZGljYXRlKS5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBwcmVkaWNhdGUgPSBwcmVkaWNhdGUgPyAvKD86KS8gOiAvLl4vXG4gICAgfVxuICAgIC8vIGNoZWNrIGNsYXNzLS9hdHRyaWJ1dGVuYW1lIGZvciByZWdleFxuICAgIGlnbm9yZVt0eXBlXSA9IChuYW1lLCB2YWx1ZSkgPT4gcHJlZGljYXRlLnRlc3QodmFsdWUpXG4gIH0pXG5cbiAgd2hpbGUgKGVsZW1lbnQgIT09IHJvb3QgJiYgZWxlbWVudC5ub2RlVHlwZSAhPT0gMTEpIHtcbiAgICBpZiAoc2tpcENoZWNrcyhlbGVtZW50KSAhPT0gdHJ1ZSkge1xuICAgICAgLy8gfiBnbG9iYWxcbiAgICAgIGlmIChjaGVja0F0dHJpYnV0ZXMoZWxlbWVudCwgcGF0aCwgb3B0aW9ucywgc2VsZWN0LCB0b1N0cmluZywgcm9vdCkpIGJyZWFrXG4gICAgICBpZiAoY2hlY2tUYWcoZWxlbWVudCwgcGF0aCwgb3B0aW9ucywgc2VsZWN0LCB0b1N0cmluZywgcm9vdCkpIGJyZWFrXG5cbiAgICAgIC8vIH4gbG9jYWxcbiAgICAgIGNoZWNrQXR0cmlidXRlcyhlbGVtZW50LCBwYXRoLCBvcHRpb25zLCBzZWxlY3QsIHRvU3RyaW5nKVxuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSBsZW5ndGgpIHtcbiAgICAgICAgY2hlY2tUYWcoZWxlbWVudCwgcGF0aCwgb3B0aW9ucywgc2VsZWN0LCB0b1N0cmluZylcbiAgICAgIH1cblxuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSBsZW5ndGggJiYgWzEsICd4cGF0aCddLmluY2x1ZGVzKGZvcm1hdCkgJiYgIW5lc3RlZCAmJiBlbGVtZW50ID09PSBub2RlKSB7XG4gICAgICAgIGNoZWNrUmVjdXJzaXZlRGVzY2VuZGFudHMoZWxlbWVudCwgcGF0aCwgb3B0aW9ucywgc2VsZWN0LCB0b1N0cmluZylcbiAgICAgIH1cblxuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSBsZW5ndGggJiYgWzEsICd4cGF0aCcsICdqcXVlcnknXS5pbmNsdWRlcyhmb3JtYXQpKSB7XG4gICAgICAgIGNoZWNrVGV4dChlbGVtZW50LCBwYXRoLCBvcHRpb25zLCBzZWxlY3QsIHRvU3RyaW5nLCBmb3JtYXQgPT09ICdqcXVlcnknKVxuICAgICAgfVxuXG4gICAgICBpZiAocGF0aC5sZW5ndGggPT09IGxlbmd0aCkge1xuICAgICAgICBjaGVja050aENoaWxkKGVsZW1lbnQsIHBhdGgsIG9wdGlvbnMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZVxuICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoXG4gIH1cblxuICBpZiAoZWxlbWVudCA9PT0gcm9vdCkge1xuICAgIGNvbnN0IHBhdHRlcm4gPSBmaW5kUGF0dGVybihlbGVtZW50LCBvcHRpb25zLCBzZWxlY3QsIHRvU3RyaW5nKVxuICAgIHBhdGgudW5zaGlmdChwYXR0ZXJuKVxuICB9XG5cbiAgcmV0dXJuIHBhdGhcbn1cblxuLyoqXG4gKiBFeHRlbmQgcGF0aCB3aXRoIGF0dHJpYnV0ZSBpZGVudGlmaWVyXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgICBlbGVtZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gcGF0aCAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPcHRpb25zfSAgICAgICAgIG9wdGlvbnMgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgICBzZWxlY3QgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICAgdG9TdHJpbmcgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgIHBhcmVudCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3QgY2hlY2tBdHRyaWJ1dGVzID0gKGVsZW1lbnQsIHBhdGgsIHsgcHJpb3JpdHksIGlnbm9yZSB9LCBzZWxlY3QsIHRvU3RyaW5nLCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGUpID0+IHtcbiAgY29uc3QgcGF0dGVybiA9IGZpbmRBdHRyaWJ1dGVzUGF0dGVybihwcmlvcml0eSwgZWxlbWVudCwgaWdub3JlLCBzZWxlY3QsIHRvU3RyaW5nLCBwYXJlbnQpXG4gIGlmIChwYXR0ZXJuKSB7XG4gICAgcGF0aC51bnNoaWZ0KHBhdHRlcm4pXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIGFycmF5IG9mIGNvbWJpbmF0aW9ucyBvZiBpdGVtcyBpbiBpbnB1dCBhcnJheS5cbiAqIEBwYXJhbSAge0FycmF5Ljxhbnk+fSB2YWx1ZXMgICAtIGFycmF5IG9mIHZhbHVlc1xuICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zICAgICAgIC0gb3B0aW9uczogbWluIC0gbWluaW11bSBzdWJzZXQgc2l6ZTsgbWF4IC0gbWF4aW11bSBzdWJzZXQgc2l6ZVxuICogQHJldHVybiB7QXJyYXkuPEFycmF5Ljxhbnk+Pj99ICAgYXJyYXkgb2Ygc3Vic2V0c1xuICovXG5leHBvcnQgY29uc3QgY29tYmluYXRpb25zID0gKHZhbHVlcywgb3B0aW9ucykgPT4ge1xuICBjb25zdCB7IG1pbiwgbWF4IH0gPSBvcHRpb25zIHx8IHt9XG4gIGNvbnN0IHJlc3VsdCA9IFtbXV1cblxuICB2YWx1ZXMuZm9yRWFjaCh2ID0+IHtcbiAgICByZXN1bHQuZm9yRWFjaChyID0+IHtcbiAgICAgIGlmICghbWF4IHx8IHIubGVuZ3RoIDwgbWF4KSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHIuY29uY2F0KHYpKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgcmVzdWx0LnNoaWZ0KClcbiAgcmV0dXJuIG1pbiA/IHJlc3VsdC5maWx0ZXIociA9PiByLmxlbmd0aCA+PSBtaW4pIDogcmVzdWx0XG59XG5cbi8vIGxpbWl0IHN1YnNldCBzaXplIHRvIGluY3JlYXNlIHBlcmZvcm1hbmNlXG5jb25zdCBtYXhTdWJzZXRTaXplID0gW1xuICB7IGl0ZW1zOiAxMywgbWF4OiAxIH0sXG4gIHsgaXRlbXM6IDEwLCBtYXg6IDIgfSxcbiAgeyBpdGVtczogOCwgbWF4OiAzIH0sXG4gIHsgaXRlbXM6IDUsIG1heDogNCB9XG5dXG5cbi8qKlxuICogR2V0IGNsYXNzIHNlbGVjdG9yXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPHN0cmluZz59IGNsYXNzZXMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgc2VsZWN0ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBwYXJlbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UGF0dGVybn0gICAgICAgIGJhc2UgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtBcnJheS48c3RyaW5nPj99ICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3QgZ2V0Q2xhc3NTZWxlY3RvciA9IChjbGFzc2VzID0gW10sIHNlbGVjdCwgdG9TdHJpbmcsIHBhcmVudCwgYmFzZSkgPT4ge1xuICBjb25zdCB7IG1heCB9ID1cbiAgICBtYXhTdWJzZXRTaXplLmZpbmQoKHsgaXRlbXMgfSkgPT4gY2xhc3Nlcy5sZW5ndGggPiBpdGVtcykgfHwgeyBtYXg6IGNsYXNzZXMubGVuZ3RoIH1cblxuICBsZXQgcmVzdWx0ID0gY29tYmluYXRpb25zKGNsYXNzZXMsIHsgbWF4IH0pXG5cbiAgZm9yKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHBhdHRlcm4gPSB0b1N0cmluZy5wYXR0ZXJuKHsgLi4uYmFzZSwgY2xhc3NlczogcmVzdWx0W2ldIH0pXG4gICAgY29uc3QgbWF0Y2hlcyA9IHNlbGVjdChwYXR0ZXJuLCBwYXJlbnQpXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gcmVzdWx0W2ldXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGxcbn1cblxuLyoqXG4gKiBMb29rdXAgYXR0cmlidXRlIGlkZW50aWZpZXJcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48c3RyaW5nPn0gcHJpb3JpdHkgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIGVsZW1lbnQgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBpZ25vcmUgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgc2VsZWN0ICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7VG9TdHJpbmdBcGl9ICAgIHRvU3RyaW5nICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1BhcmVudE5vZGV9ICAgICBwYXJlbnQgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtQYXR0ZXJuP30gICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBmaW5kQXR0cmlidXRlc1BhdHRlcm4gPSAocHJpb3JpdHksIGVsZW1lbnQsIGlnbm9yZSwgc2VsZWN0LCB0b1N0cmluZywgcGFyZW50ID0gZWxlbWVudC5wYXJlbnROb2RlKSA9PiB7XG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBlbGVtZW50LmF0dHJpYnV0ZXNcbiAgdmFyIGF0dHJpYnV0ZU5hbWVzID0gT2JqZWN0LmtleXMoYXR0cmlidXRlcykubWFwKCh2YWwpID0+IGF0dHJpYnV0ZXNbdmFsXS5uYW1lKVxuICAgIC5maWx0ZXIoKGEpID0+IHByaW9yaXR5LmluZGV4T2YoYSkgPCAwKVxuXG4gIHZhciBzb3J0ZWRLZXlzID0gWyAuLi5wcmlvcml0eSwgLi4uYXR0cmlidXRlTmFtZXMgXVxuICB2YXIgcGF0dGVybiA9IGNyZWF0ZVBhdHRlcm4oKVxuICBwYXR0ZXJuLnRhZyA9IGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG5cbiAgdmFyIGlzT3B0aW1hbCA9IChwYXR0ZXJuKSA9PiAoc2VsZWN0KHRvU3RyaW5nLnBhdHRlcm4ocGF0dGVybiksIHBhcmVudCkubGVuZ3RoID09PSAxKVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gc29ydGVkS2V5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCBrZXkgPSBzb3J0ZWRLZXlzW2ldXG4gICAgY29uc3QgYXR0cmlidXRlID0gYXR0cmlidXRlc1trZXldXG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGVzY2FwZVZhbHVlKGF0dHJpYnV0ZSAmJiBhdHRyaWJ1dGUubmFtZSlcbiAgICBjb25zdCBhdHRyaWJ1dGVWYWx1ZSA9IGVzY2FwZVZhbHVlKGF0dHJpYnV0ZSAmJiBhdHRyaWJ1dGUudmFsdWUpXG4gICAgY29uc3QgdXNlTmFtZWRJZ25vcmUgPSBhdHRyaWJ1dGVOYW1lICE9PSAnY2xhc3MnXG5cbiAgICBjb25zdCBjdXJyZW50SWdub3JlID0gKHVzZU5hbWVkSWdub3JlICYmIGlnbm9yZVthdHRyaWJ1dGVOYW1lXSkgfHwgaWdub3JlLmF0dHJpYnV0ZVxuICAgIGNvbnN0IGN1cnJlbnREZWZhdWx0SWdub3JlID0gKHVzZU5hbWVkSWdub3JlICYmIGRlZmF1bHRJZ25vcmVbYXR0cmlidXRlTmFtZV0pIHx8IGRlZmF1bHRJZ25vcmUuYXR0cmlidXRlXG4gICAgaWYgKGNoZWNrSWdub3JlKGN1cnJlbnRJZ25vcmUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlLCBjdXJyZW50RGVmYXVsdElnbm9yZSkpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgc3dpdGNoIChhdHRyaWJ1dGVOYW1lKSB7XG4gICAgICBjYXNlICdjbGFzcyc6IHtcbiAgICAgICAgbGV0IGNsYXNzTmFtZXMgPSBhdHRyaWJ1dGVWYWx1ZS50cmltKCkuc3BsaXQoL1xccysvZylcbiAgICAgICAgaWYgKCFjbGFzc05hbWVzWzBdKSB7IC8vIGVtcHR5IHN0cmluZ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2xhc3NJZ25vcmUgPSBpZ25vcmUuY2xhc3MgfHwgZGVmYXVsdElnbm9yZS5jbGFzc1xuICAgICAgICBpZiAoY2xhc3NJZ25vcmUpIHtcbiAgICAgICAgICBjbGFzc05hbWVzID0gY2xhc3NOYW1lcy5maWx0ZXIoY2xhc3NOYW1lID0+ICFjbGFzc0lnbm9yZShjbGFzc05hbWUpKVxuICAgICAgICB9XG4gICAgICAgIGlmIChjbGFzc05hbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBjbGFzc2VzID0gZ2V0Q2xhc3NTZWxlY3RvcihjbGFzc05hbWVzLCBzZWxlY3QsIHRvU3RyaW5nLCBwYXJlbnQsIHBhdHRlcm4pXG4gICAgICAgICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgICAgIHBhdHRlcm4uY2xhc3NlcyA9IGNsYXNzZXNcbiAgICAgICAgICAgIGlmIChpc09wdGltYWwocGF0dGVybikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhdHRlcm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgICAgYnJlYWtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcGF0dGVybi5hdHRyaWJ1dGVzLnB1c2goeyBuYW1lOiBhdHRyaWJ1dGVOYW1lLCB2YWx1ZTogYXR0cmlidXRlVmFsdWUgfSlcbiAgICAgICAgaWYgKGlzT3B0aW1hbChwYXR0ZXJuKSkge1xuICAgICAgICAgIHJldHVybiBwYXR0ZXJuXG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbFxufVxuXG5cbi8qKlxuICogRXh0ZW5kIHBhdGggd2l0aCB0YWcgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICAgZWxlbWVudCAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICAgb3B0aW9ucyAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59IHBhdGggICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgIHNlbGVjdCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgICBwYXJlbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBjaGVja1RhZyA9IChlbGVtZW50LCBwYXRoLCB7IGlnbm9yZSB9LCBzZWxlY3QsIHRvU3RyaW5nLCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGUpID0+IHtcbiAgY29uc3QgcGF0dGVybiA9IGZpbmRUYWdQYXR0ZXJuKGVsZW1lbnQsIGlnbm9yZSlcbiAgaWYgKHBhdHRlcm4pIHtcbiAgICBsZXQgbWF0Y2hlcyA9IFtdXG4gICAgbWF0Y2hlcyA9IHNlbGVjdCh0b1N0cmluZy5wYXR0ZXJuKHBhdHRlcm4pLCBwYXJlbnQpXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICBwYXRoLnVuc2hpZnQocGF0dGVybilcbiAgICAgIGlmIChwYXR0ZXJuLnRhZyA9PT0gJ2lmcmFtZScpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBMb29rdXAgdGFnIGlkZW50aWZpZXJcbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICBpZ25vcmUgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7UGF0dGVybj99ICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IGZpbmRUYWdQYXR0ZXJuID0gKGVsZW1lbnQsIGlnbm9yZSkgPT4ge1xuICBjb25zdCB0YWdOYW1lID0gZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKClcbiAgaWYgKGNoZWNrSWdub3JlKGlnbm9yZS50YWcsIG51bGwsIHRhZ05hbWUpKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICBjb25zdCBwYXR0ZXJuID0gY3JlYXRlUGF0dGVybigpXG4gIHBhdHRlcm4udGFnID0gdGFnTmFtZVxuICByZXR1cm4gcGF0dGVyblxufVxuXG4vKipcbiAqIEV4dGVuZCBwYXRoIHdpdGggc3BlY2lmaWMgY2hpbGQgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICAgZWxlbWVudCAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICAgb3B0aW9ucyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gcGF0aCAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3QgY2hlY2tOdGhDaGlsZCA9IChlbGVtZW50LCBwYXRoLCB7IGlnbm9yZSB9KSA9PiB7XG4gIGNvbnN0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZVxuICBjb25zdCBjaGlsZHJlbiA9IHBhcmVudC5jaGlsZHJlblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baV1cbiAgICBpZiAoY2hpbGQgPT09IGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGNoaWxkUGF0dGVybiA9IGZpbmRUYWdQYXR0ZXJuKGNoaWxkLCBpZ25vcmUpXG4gICAgICBpZiAoIWNoaWxkUGF0dGVybikge1xuICAgICAgICByZXR1cm4gY29uc29sZS53YXJuKGBcbiAgICAgICAgICBFbGVtZW50IGNvdWxkbid0IGJlIG1hdGNoZWQgdGhyb3VnaCBzdHJpY3QgaWdub3JlIHBhdHRlcm4hXG4gICAgICAgIGAsIGNoaWxkLCBpZ25vcmUsIGNoaWxkUGF0dGVybilcbiAgICAgIH1cbiAgICAgIGNoaWxkUGF0dGVybi5yZWxhdGVzID0gJ2NoaWxkJ1xuICAgICAgY2hpbGRQYXR0ZXJuLnBzZXVkbyA9IFtgbnRoLWNoaWxkKCR7aSsxfSlgXVxuICAgICAgcGF0aC51bnNoaWZ0KGNoaWxkUGF0dGVybilcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIEV4dGVuZCBwYXRoIHdpdGggY29udGFpbnNcbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgIGVsZW1lbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSBwYXRoICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICAgb3B0aW9ucyAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgIHNlbGVjdCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7VG9TdHJpbmdBcGl9ICAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Jvb2xlYW59ICAgICAgICAgbmVzdGVkICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBjaGVja1RleHQgPSAoZWxlbWVudCwgcGF0aCwgeyBpZ25vcmUgfSwgc2VsZWN0LCB0b1N0cmluZywgbmVzdGVkKSA9PiB7XG4gIGNvbnN0IHBhdHRlcm4gPSBmaW5kVGFnUGF0dGVybihlbGVtZW50LCBpZ25vcmUpXG4gIGlmICghcGF0dGVybikge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGNvbnN0IHRleHRDb250ZW50ID0gKG5lc3RlZCA/IGVsZW1lbnQudGV4dENvbnRlbnQgOiAoZWxlbWVudC5maXJzdENoaWxkICYmIGVsZW1lbnQuZmlyc3RDaGlsZC5ub2RlVmFsdWUpIHx8ICcnKVxuICBpZiAoIXRleHRDb250ZW50KSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBwYXR0ZXJuLnJlbGF0ZXMgPSAnY2hpbGQnXG4gIGNvbnN0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZVxuICBjb25zdCB0ZXh0cyA9IHRleHRDb250ZW50XG4gICAgLnJlcGxhY2UoL1xcbisvZywgJ1xcbicpXG4gICAgLnNwbGl0KCdcXG4nKVxuICAgIC5tYXAodGV4dCA9PiB0ZXh0LnRyaW0oKSlcbiAgICAuZmlsdGVyKHRleHQgPT4gdGV4dC5sZW5ndGggPiAwKVxuXG4gIGNvbnN0IGNvbnRhaW5zID0gW11cblxuICB3aGlsZSAodGV4dHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHRleHQgPSB0ZXh0cy5zaGlmdCgpXG4gICAgaWYgKGNoZWNrSWdub3JlKGlnbm9yZS5jb250YWlucywgbnVsbCwgdGV4dCwgZGVmYXVsdElnbm9yZS5jb250YWlucykpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIGNvbnRhaW5zLnB1c2goYGNvbnRhaW5zKFwiJHt0ZXh0fVwiKWApXG4gIFxuICAgIGNvbnN0IG1hdGNoZXMgPSBzZWxlY3QodG9TdHJpbmcucGF0dGVybih7IC4uLnBhdHRlcm4sIHBzZXVkbzogY29udGFpbnMgfSksIHBhcmVudClcbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHBhdHRlcm4ucHNldWRvID0gY29udGFpbnNcbiAgICAgIHBhdGgudW5zaGlmdChwYXR0ZXJuKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qKlxuICogRXh0ZW5kIHBhdGggd2l0aCBkZXNjZW5kYW50IHRhZ1xuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICAgZWxlbWVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59IHBhdGggICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T3B0aW9uc30gICAgICAgICBvcHRpb25zICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3QgY2hlY2tSZWN1cnNpdmVEZXNjZW5kYW50cyA9IChlbGVtZW50LCBwYXRoLCBvcHRpb25zLCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIGNvbnN0IHBhdHRlcm4gPSBmaW5kVGFnUGF0dGVybihlbGVtZW50LCBvcHRpb25zLmlnbm9yZSlcbiAgaWYgKCFwYXR0ZXJuKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBjb25zdCBkZXNjZW5kYW50cyA9IEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJykpXG4gIHdoaWxlIChkZXNjZW5kYW50cy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZGVzY2VuZGFudFBhdGggPSBtYXRjaChkZXNjZW5kYW50cy5zaGlmdCgpLCB7IC4uLm9wdGlvbnMsIHJvb3Q6IGVsZW1lbnQgfSwgdHJ1ZSlcbiAgICAvLyBhdm9pZCBkZXNjZW5kYW50IHNlbGVjdG9ycyB3aXRoIG50aC1jaGlsZFxuICAgIGlmICghZGVzY2VuZGFudFBhdGguc29tZShwYXR0ZXJuID0+IHBhdHRlcm4ucHNldWRvLnNvbWUocCA9PiBwLnN0YXJ0c1dpdGgoJ250aC1jaGlsZCcpKSkpIHtcbiAgICAgIGNvbnN0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudFxuICAgICAgY29uc3QgbWF0Y2hlcyA9IHNlbGVjdCh0b1N0cmluZy5wYXR0ZXJuKHsgLi4ucGF0dGVybiwgZGVzY2VuZGFudHM6IFtkZXNjZW5kYW50UGF0aF0gfSksIHBhcmVudClcbiAgICAgIGlmIChtYXRjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBwYXR0ZXJuLmRlc2NlbmRhbnRzID0gW2Rlc2NlbmRhbnRQYXRoXVxuICAgICAgICBwYXRoLnVuc2hpZnQocGF0dGVybilcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBMb29rdXAgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBlbGVtZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICBvcHRpb25zICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgdG9TdHJpbmcgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtQYXR0ZXJufSAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IGZpbmRQYXR0ZXJuID0gKGVsZW1lbnQsIHsgcHJpb3JpdHksIGlnbm9yZSB9LCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIHZhciBwYXR0ZXJuID0gZmluZEF0dHJpYnV0ZXNQYXR0ZXJuKHByaW9yaXR5LCBlbGVtZW50LCBpZ25vcmUsIHNlbGVjdCwgdG9TdHJpbmcpXG4gIGlmICghcGF0dGVybikge1xuICAgIHBhdHRlcm4gPSBmaW5kVGFnUGF0dGVybihlbGVtZW50LCBpZ25vcmUpXG4gIH1cbiAgcmV0dXJuIHBhdHRlcm5cbn1cblxuLyoqXG4gKiBWYWxpZGF0ZSB3aXRoIGN1c3RvbSBhbmQgZGVmYXVsdCBmdW5jdGlvbnNcbiAqXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gcHJlZGljYXRlICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge3N0cmluZz99ICBuYW1lICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7c3RyaW5nfSAgIHZhbHVlICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZGVmYXVsdFByZWRpY2F0ZSAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBjaGVja0lnbm9yZSA9IChwcmVkaWNhdGUsIG5hbWUsIHZhbHVlLCBkZWZhdWx0UHJlZGljYXRlKSA9PiB7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGNvbnN0IGNoZWNrID0gcHJlZGljYXRlIHx8IGRlZmF1bHRQcmVkaWNhdGVcbiAgaWYgKCFjaGVjaykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiBjaGVjayhuYW1lLCB2YWx1ZSwgZGVmYXVsdFByZWRpY2F0ZSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXRjaC5qcyIsIi8qKlxuICogIyBPcHRpbWl6ZVxuICpcbiAqIDEuKSBJbXByb3ZlIGVmZmljaWVuY3kgdGhyb3VnaCBzaG9ydGVyIHNlbGVjdG9ycyBieSByZW1vdmluZyByZWR1bmRhbmN5XG4gKiAyLikgSW1wcm92ZSByb2J1c3RuZXNzIHRocm91Z2ggc2VsZWN0b3IgdHJhbnNmb3JtYXRpb25cbiAqL1xuXG5pbXBvcnQgeyBnZXRTZWxlY3QgfSBmcm9tICcuL3NlbGVjdG9yJ1xuaW1wb3J0IHsgY3JlYXRlUGF0dGVybiwgZ2V0VG9TdHJpbmcgfSBmcm9tICcuL3BhdHRlcm4nXG5pbXBvcnQgeyBjb252ZXJ0Tm9kZUxpc3QsIHBhcnRpdGlvbiB9IGZyb20gJy4vdXRpbGl0aWVzJ1xuXG4vKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vc2VsZWN0JykuT3B0aW9uc30gT3B0aW9uc1xuICogQHR5cGVkZWYge2ltcG9ydCgnLi9wYXR0ZXJuJykuUGF0dGVybn0gUGF0dGVyblxuICogQHR5cGVkZWYge2ltcG9ydCgnLi9wYXR0ZXJuJykuVG9TdHJpbmdBcGl9IFBhdHRlcm5cbiAqL1xuXG4vKipcbiAqIEFwcGx5IGRpZmZlcmVudCBvcHRpbWl6YXRpb24gdGVjaG5pcXVlc1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgICAgICAgICAgICAgIHBhdGggICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fEFycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnQgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPcHRpb25zfSAgICAgICAgICAgICAgICAgICAgICAgICBbb3B0aW9uc10gIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7QXJyYXkuPFBhdHRlcm4+fSAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3B0aW1pemUgKHBhdGgsIGVsZW1lbnRzLCBvcHRpb25zID0ge30pIHtcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cblxuICBpZiAocGF0aFswXS5yZWxhdGVzID09PSAnY2hpbGQnKSB7XG4gICAgcGF0aFswXS5yZWxhdGVzID0gdW5kZWZpbmVkXG4gIH1cblxuICAvLyBjb252ZXJ0IHNpbmdsZSBlbnRyeSBhbmQgTm9kZUxpc3RcbiAgaWYgKCFBcnJheS5pc0FycmF5KGVsZW1lbnRzKSkge1xuICAgIGVsZW1lbnRzID0gIWVsZW1lbnRzLmxlbmd0aCA/IFtlbGVtZW50c10gOiBjb252ZXJ0Tm9kZUxpc3QoZWxlbWVudHMpXG4gIH1cblxuICBpZiAoIWVsZW1lbnRzLmxlbmd0aCB8fCBlbGVtZW50cy5zb21lKChlbGVtZW50KSA9PiBlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBpbnB1dCAtIHRvIGNvbXBhcmUgSFRNTEVsZW1lbnRzIGl0cyBuZWNlc3NhcnkgdG8gcHJvdmlkZSBhIHJlZmVyZW5jZSBvZiB0aGUgc2VsZWN0ZWQgbm9kZShzKSEgKG1pc3NpbmcgXCJlbGVtZW50c1wiKScpXG4gIH1cblxuICBjb25zdCBzZWxlY3QgPSBnZXRTZWxlY3Qob3B0aW9ucylcbiAgY29uc3QgdG9TdHJpbmcgPSBnZXRUb1N0cmluZyhvcHRpb25zKVxuXG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBbb3B0aW1pemVQYXJ0KFtdLCBwYXRoWzBdLCBbXSwgZWxlbWVudHMsIHNlbGVjdCwgdG9TdHJpbmcpXVxuICB9XG5cbiAgdmFyIGVuZE9wdGltaXplZCA9IGZhbHNlXG4gIGlmIChwYXRoW3BhdGgubGVuZ3RoLTFdLnJlbGF0ZXMgPT09ICdjaGlsZCcpIHtcbiAgICBwYXRoW3BhdGgubGVuZ3RoLTFdID0gb3B0aW1pemVQYXJ0KHBhdGguc2xpY2UoMCwgLTEpLCBwYXRoW3BhdGgubGVuZ3RoLTFdLCBbXSwgZWxlbWVudHMsIHNlbGVjdCwgdG9TdHJpbmcpXG4gICAgZW5kT3B0aW1pemVkID0gdHJ1ZVxuICB9XG5cbiAgcGF0aCA9IFsuLi5wYXRoXVxuICBjb25zdCBzaG9ydGVuZWQgPSBbcGF0aC5wb3AoKV1cbiAgd2hpbGUgKHBhdGgubGVuZ3RoID4gMSkge1xuICAgIGNvbnN0IGN1cnJlbnQgPSBwYXRoLnBvcCgpXG4gICAgY29uc3QgbWF0Y2hlcyA9IHNlbGVjdCh0b1N0cmluZy5wYXRoKFsuLi5wYXRoLCAuLi5zaG9ydGVuZWRdKSlcbiAgICBjb25zdCBoYXNTYW1lUmVzdWx0ID0gbWF0Y2hlcy5sZW5ndGggPT09IGVsZW1lbnRzLmxlbmd0aCAmJiBlbGVtZW50cy5ldmVyeSgoZWxlbWVudCwgaSkgPT4gZWxlbWVudCA9PT0gbWF0Y2hlc1tpXSlcbiAgICBpZiAoIWhhc1NhbWVSZXN1bHQpIHtcbiAgICAgIHNob3J0ZW5lZC51bnNoaWZ0KG9wdGltaXplUGFydChwYXRoLCBjdXJyZW50LCBzaG9ydGVuZWQsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSlcbiAgICB9XG4gIH1cbiAgc2hvcnRlbmVkLnVuc2hpZnQocGF0aFswXSlcbiAgcGF0aCA9IHNob3J0ZW5lZFxuXG4gIC8vIG9wdGltaXplIHN0YXJ0ICsgZW5kXG4gIHBhdGhbMF0gPSBvcHRpbWl6ZVBhcnQoW10sIHBhdGhbMF0sIHBhdGguc2xpY2UoMSksIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKVxuICBpZiAoIWVuZE9wdGltaXplZCkge1xuICAgIHBhdGhbcGF0aC5sZW5ndGgtMV0gPSBvcHRpbWl6ZVBhcnQocGF0aC5zbGljZSgwLCAtMSksIHBhdGhbcGF0aC5sZW5ndGgtMV0sIFtdLCBlbGVtZW50cywgc2VsZWN0LCB0b1N0cmluZylcbiAgfVxuXG4gIHJldHVybiBwYXRoXG59XG5cbi8qKlxuICogT3B0aW1pemUgOmNvbnRhaW5zXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgcHJlICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtQYXR0ZXJufSAgICAgICAgICAgICBjdXJyZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHBvc3QgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgICAgICBzZWxlY3QgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICAgICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7UGF0dGVybn0gICAgICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IG9wdGltaXplVGV4dCA9IChwcmUsIGN1cnJlbnQsIHBvc3QsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIGNvbnN0IFtjb250YWlucywgb3RoZXJdID0gcGFydGl0aW9uKGN1cnJlbnQucHNldWRvLCAoaXRlbSkgPT4gaXRlbS5zdGFydHNXaXRoKCdjb250YWlucycpKVxuXG4gIGlmIChjb250YWlucy5sZW5ndGggPiAwICYmIHBvc3QubGVuZ3RoKSB7XG4gICAgY29uc3QgYmFzZSA9IHsgLi4uY3VycmVudCwgcHNldWRvOiBbLi4ub3RoZXIsIC4uLmNvbnRhaW5zXSB9XG4gICAgd2hpbGUgKGJhc2UucHNldWRvLmxlbmd0aCA+IG90aGVyLmxlbmd0aCkge1xuICAgICAgY29uc3Qgb3B0aW1pemVkID0gYmFzZS5wc2V1ZG8uc2xpY2UoMCwgLTEpXG4gICAgICBpZiAoIWNvbXBhcmVSZXN1bHRzKHNlbGVjdCh0b1N0cmluZy5wYXRoKFsuLi5wcmUsIHsgLi4uYmFzZSwgcHNldWRvOiBvcHRpbWl6ZWQgfSwgLi4ucG9zdF0pKSwgZWxlbWVudHMpKSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBiYXNlLnBzZXVkbyA9IG9wdGltaXplZFxuICAgIH1cbiAgICByZXR1cm4gYmFzZVxuICB9XG4gIHJldHVybiBjdXJyZW50XG59XG5cbi8qKlxuICogT3B0aW1pemUgYXR0cmlidXRlc1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHByZSAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UGF0dGVybn0gICAgICAgICAgICAgY3VycmVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwb3N0ICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgICAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1BhdHRlcm59ICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBvcHRpbWl6ZUF0dHJpYnV0ZXMgPSAocHJlLCBjdXJyZW50LCBwb3N0LCBlbGVtZW50cywgc2VsZWN0LCB0b1N0cmluZykgPT4ge1xuICAvLyByZWR1Y2UgYXR0cmlidXRlczogZmlyc3QgdHJ5IHdpdGhvdXQgdmFsdWUsIHRoZW4gcmVtb3ZpbmcgY29tcGxldGVseVxuICBpZiAoY3VycmVudC5hdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgYXR0cmlidXRlcyA9IFsuLi5jdXJyZW50LmF0dHJpYnV0ZXNdXG5cbiAgICBjb25zdCBzaW1wbGlmeSA9IChvcmlnaW5hbCwgZ2V0U2ltcGxpZmllZCkgPT4ge1xuICAgICAgbGV0IGkgPSBvcmlnaW5hbC5sZW5ndGggLSAxXG4gICAgICB3aGlsZSAoaSA+PSAwKSB7XG4gICAgICAgIGxldCBhdHRyaWJ1dGVzID0gZ2V0U2ltcGxpZmllZChvcmlnaW5hbCwgaSlcbiAgICAgICAgaWYgKCFjb21wYXJlUmVzdWx0cyhcbiAgICAgICAgICBzZWxlY3QodG9TdHJpbmcucGF0aChbLi4ucHJlLCB7IC4uLmN1cnJlbnQsIGF0dHJpYnV0ZXMgfSwgLi4ucG9zdF0pKSxcbiAgICAgICAgICBlbGVtZW50c1xuICAgICAgICApKSB7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBpLS1cbiAgICAgICAgb3JpZ2luYWwgPSBhdHRyaWJ1dGVzXG4gICAgICB9XG4gICAgICByZXR1cm4gb3JpZ2luYWxcbiAgICB9XG5cbiAgICBjb25zdCBzaW1wbGlmaWVkID0gc2ltcGxpZnkoYXR0cmlidXRlcywgKGF0dHJpYnV0ZXMsIGkpID0+IHtcbiAgICAgIGNvbnN0IHsgbmFtZSB9ID0gYXR0cmlidXRlc1tpXVxuICAgICAgaWYgKG5hbWUgPT09ICdpZCcpIHtcbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXNcbiAgICAgIH1cbiAgICAgIHJldHVybiBbLi4uYXR0cmlidXRlcy5zbGljZSgwLCBpKSwgeyBuYW1lLCB2YWx1ZTogbnVsbCB9LCAuLi5hdHRyaWJ1dGVzLnNsaWNlKGkgKyAxKV1cbiAgICB9KVxuICAgIHJldHVybiB7IC4uLmN1cnJlbnQsIGF0dHJpYnV0ZXM6IHNpbXBsaWZ5KHNpbXBsaWZpZWQsIGF0dHJpYnV0ZXMgPT4gYXR0cmlidXRlcy5zbGljZSgwLCAtMSkpIH0gICAgXG4gIH1cbiAgcmV0dXJuIGN1cnJlbnRcbn1cblxuLyoqXG4gKiBPcHRpbWl6ZSBkZXNjZW5kYW50XG4gKlxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgcHJlICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtQYXR0ZXJufSAgICAgICAgICAgICBjdXJyZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHBvc3QgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgICAgICBzZWxlY3QgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICAgICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7UGF0dGVybn0gICAgICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IG9wdGltaXplRGVzY2VuZGFudCA9IChwcmUsIGN1cnJlbnQsIHBvc3QsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIC8vIHJvYnVzdG5lc3M6IGRlc2NlbmRhbnQgaW5zdGVhZCBjaGlsZCAoaGV1cmlzdGljKVxuICBpZiAoY3VycmVudC5yZWxhdGVzID09PSAnY2hpbGQnKSB7XG4gICAgY29uc3QgZGVzY2VuZGFudCA9IHsgLi4uY3VycmVudCwgcmVsYXRlczogdW5kZWZpbmVkIH1cbiAgICBsZXQgbWF0Y2hlcyA9IHNlbGVjdCh0b1N0cmluZy5wYXRoKFsuLi5wcmUsIGRlc2NlbmRhbnQsIC4uLnBvc3RdKSlcbiAgICBpZiAoY29tcGFyZVJlc3VsdHMobWF0Y2hlcywgZWxlbWVudHMpKSB7XG4gICAgICByZXR1cm4gZGVzY2VuZGFudFxuICAgIH1cbiAgfVxuICByZXR1cm4gY3VycmVudFxufVxuXG4vKipcbiAqIE9wdGltaXplIHJlY3Vyc2l2ZSBkZXNjZW5kYW50c1xuICogXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwcmUgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1BhdHRlcm59ICAgICAgICAgICAgIGN1cnJlbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgcG9zdCAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICAgICAgIHNlbGVjdCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7VG9TdHJpbmdBcGl9ICAgICAgICAgdG9TdHJpbmcgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtQYXR0ZXJufSAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3Qgb3B0aW1pemVSZWN1cnNpdmVEZXNjZW5kYW50cyA9IChwcmUsIGN1cnJlbnQsIHBvc3QsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIGlmIChjdXJyZW50LmRlc2NlbmRhbnRzLmxlbmd0aCA+IDAgJiYgcG9zdC5sZW5ndGgpIHtcbiAgICBjb25zdCBiYXNlID0geyAuLi5jdXJyZW50LCBkZXNjZW5kYW50czogWy4uLmN1cnJlbnQuZGVzY2VuZGFudHNdIH1cbiAgICB3aGlsZSAoYmFzZS5kZXNjZW5kYW50cy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBvcHRpbWl6ZWQgPSBiYXNlLmRlc2NlbmRhbnRzLnNsaWNlKDAsIC0xKVxuICAgICAgaWYgKCFjb21wYXJlUmVzdWx0cyhzZWxlY3QodG9TdHJpbmcucGF0aChbLi4ucHJlLCB7IC4uLmJhc2UsIGRlc2NlbmRhbnRzOiBvcHRpbWl6ZWQgfSwgLi4ucG9zdF0pKSwgZWxlbWVudHMpKSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBiYXNlLmRlc2NlbmRhbnRzID0gb3B0aW1pemVkXG4gICAgfVxuICAgIHJldHVybiBiYXNlXG4gIH1cbiAgcmV0dXJuIGN1cnJlbnRcbn1cblxuLyoqXG4gKiBPcHRpbWl6ZSBudGggb2YgdHlwZVxuICpcbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHByZSAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UGF0dGVybn0gICAgICAgICAgICAgY3VycmVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwb3N0ICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgICAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1BhdHRlcm59ICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBvcHRpbWl6ZU50aE9mVHlwZSA9IChwcmUsIGN1cnJlbnQsIHBvc3QsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIGNvbnN0IGkgPSBjdXJyZW50LnBzZXVkby5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLnN0YXJ0c1dpdGgoJ250aC1jaGlsZCcpKVxuICAvLyByb2J1c3RuZXNzOiAnbnRoLW9mLXR5cGUnIGluc3RlYWQgJ250aC1jaGlsZCcgKGhldXJpc3RpYylcbiAgaWYgKGkgPj0gMCkge1xuICAgIC8vIFRPRE86IGNvbnNpZGVyIGNvbXBsZXRlIGNvdmVyYWdlIG9mICdudGgtb2YtdHlwZScgcmVwbGFjZW1lbnRcbiAgICBjb25zdCB0eXBlID0gY3VycmVudC5wc2V1ZG9baV0ucmVwbGFjZSgvXm50aC1jaGlsZC8sICdudGgtb2YtdHlwZScpXG4gICAgY29uc3QgbnRoT2ZUeXBlID0geyAuLi5jdXJyZW50LCBwc2V1ZG86IFsuLi5jdXJyZW50LnBzZXVkby5zbGljZSgwLCBpKSwgdHlwZSwgLi4uY3VycmVudC5wc2V1ZG8uc2xpY2UoaSArIDEpXSB9XG4gICAgbGV0IHBhdHRlcm4gPSB0b1N0cmluZy5wYXRoKFsuLi5wcmUsIG50aE9mVHlwZSwgLi4ucG9zdF0pXG4gICAgbGV0IG1hdGNoZXMgPSBzZWxlY3QocGF0dGVybilcbiAgICBpZiAoY29tcGFyZVJlc3VsdHMobWF0Y2hlcywgZWxlbWVudHMpKSB7XG4gICAgICByZXR1cm4gbnRoT2ZUeXBlXG4gICAgfVxuICB9XG4gIHJldHVybiBjdXJyZW50XG59XG5cbi8qKlxuICogT3B0aW1pemUgY2xhc3Nlc1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHByZSAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UGF0dGVybn0gICAgICAgICAgICAgY3VycmVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwb3N0ICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgICAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1BhdHRlcm59ICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBvcHRpbWl6ZUNsYXNzZXMgPSAocHJlLCBjdXJyZW50LCBwb3N0LCBlbGVtZW50cywgc2VsZWN0LCB0b1N0cmluZykgPT4ge1xuICAvLyBlZmZpY2llbmN5OiBjb21iaW5hdGlvbnMgb2YgY2xhc3NuYW1lIChwYXJ0aWFsIHBlcm11dGF0aW9ucylcbiAgaWYgKGN1cnJlbnQuY2xhc3Nlcy5sZW5ndGggPiAxKSB7XG4gICAgbGV0IG9wdGltaXplZCA9IGN1cnJlbnQuY2xhc3Nlcy5zbGljZSgpLnNvcnQoKGN1cnIsIG5leHQpID0+IGN1cnIubGVuZ3RoIC0gbmV4dC5sZW5ndGgpXG5cbiAgICB3aGlsZSAob3B0aW1pemVkLmxlbmd0aCA+IDEpIHtcbiAgICAgIG9wdGltaXplZC5zaGlmdCgpXG4gICAgICBjb25zdCBwYXR0ZXJuID0gdG9TdHJpbmcucGF0aChbLi4ucHJlLCB7IC4uLmN1cnJlbnQsIGNsYXNzZXM6IG9wdGltaXplZCB9LCAuLi5wb3N0XSlcbiAgICAgIGlmICghY29tcGFyZVJlc3VsdHMoc2VsZWN0KHBhdHRlcm4pLCBlbGVtZW50cykpIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnQuY2xhc3NlcyA9IG9wdGltaXplZFxuICAgIH1cblxuICAgIG9wdGltaXplZCA9IGN1cnJlbnQuY2xhc3Nlc1xuXG4gICAgaWYgKG9wdGltaXplZC5sZW5ndGggPiAyKSB7XG4gICAgICBjb25zdCBiYXNlID0gY3JlYXRlUGF0dGVybih7IGNsYXNzZXM6IG9wdGltaXplZCB9KVxuICAgICAgY29uc3QgcmVmZXJlbmNlcyA9IHNlbGVjdCh0b1N0cmluZy5wYXRoKFsuLi5wcmUsIGJhc2VdKSlcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVmZXJlbmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCByZWZlcmVuY2UgPSByZWZlcmVuY2VzW2ldXG4gICAgICAgIGlmIChlbGVtZW50cy5zb21lKChlbGVtZW50KSA9PiByZWZlcmVuY2UuY29udGFpbnMoZWxlbWVudCkpKSB7XG4gICAgICAgICAgLy8gVE9ETzpcbiAgICAgICAgICAvLyAtIGNoZWNrIHVzaW5nIGF0dHJpYnV0ZXMgKyByZWdhcmQgZXhjbHVkZXNcbiAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGNyZWF0ZVBhdHRlcm4oeyB0YWc6IHJlZmVyZW5jZS50YWdOYW1lIH0pXG4gICAgICAgICAgdmFyIHBhdHRlcm4gPSB0b1N0cmluZy5wYXRoKFsuLi5wcmUsIGRlc2NyaXB0aW9uLCAuLi5wb3N0XSlcbiAgICAgICAgICB2YXIgbWF0Y2hlcyA9IHNlbGVjdChwYXR0ZXJuKVxuICAgICAgICAgIGlmIChjb21wYXJlUmVzdWx0cyhtYXRjaGVzLCBlbGVtZW50cykpIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBkZXNjcmlwdGlvblxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjdXJyZW50XG59XG5cbmNvbnN0IG9wdGltaXplcnMgPSBbXG4gIG9wdGltaXplVGV4dCxcbiAgb3B0aW1pemVBdHRyaWJ1dGVzLFxuICBvcHRpbWl6ZURlc2NlbmRhbnQsXG4gIG9wdGltaXplUmVjdXJzaXZlRGVzY2VuZGFudHMsXG4gIG9wdGltaXplTnRoT2ZUeXBlLFxuICBvcHRpbWl6ZUNsYXNzZXMsXG5dXG5cbi8qKlxuICogSW1wcm92ZSBhIGNodW5rIG9mIHRoZSBzZWxlY3RvclxuICpcbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHByZSAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UGF0dGVybn0gICAgICAgICAgICAgY3VycmVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwb3N0ICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgICAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1BhdHRlcm59ICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBvcHRpbWl6ZVBhcnQgPSAocHJlLCBjdXJyZW50LCBwb3N0LCBlbGVtZW50cywgc2VsZWN0LCB0b1N0cmluZykgPT5cbiAgb3B0aW1pemVycy5yZWR1Y2UoKGFjYywgb3B0aW1pemVyKSA9PiBvcHRpbWl6ZXIocHJlLCBhY2MsIHBvc3QsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSwgY3VycmVudClcblxuLyoqXG4gKiBFdmFsdWF0ZSBtYXRjaGVzIHdpdGggZXhwZWN0ZWQgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBtYXRjaGVzICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Qm9vbGVhbn0gICAgICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBjb25zdCBjb21wYXJlUmVzdWx0cyA9IChtYXRjaGVzLCBlbGVtZW50cykgPT4ge1xuICBjb25zdCB7IGxlbmd0aCB9ID0gbWF0Y2hlc1xuICByZXR1cm4gbGVuZ3RoID09PSBlbGVtZW50cy5sZW5ndGggJiYgZWxlbWVudHMuZXZlcnkoKGVsZW1lbnQpID0+IHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobWF0Y2hlc1tpXSA9PT0gZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9vcHRpbWl6ZS5qcyIsIi8qKlxuICogIyBTZWxlY3RcbiAqXG4gKiBDb25zdHJ1Y3QgYSB1bmlxdWUgQ1NTIHF1ZXJ5IHNlbGVjdG9yIHRvIGFjY2VzcyB0aGUgc2VsZWN0ZWQgRE9NIGVsZW1lbnQocykuXG4gKiBGb3IgbG9uZ2V2aXR5IGl0IGFwcGxpZXMgZGlmZmVyZW50IG1hdGNoaW5nIGFuZCBvcHRpbWl6YXRpb24gc3RyYXRlZ2llcy5cbiAqL1xuaW1wb3J0IG1hdGNoIGZyb20gJy4vbWF0Y2gnXG5pbXBvcnQgb3B0aW1pemUgZnJvbSAnLi9vcHRpbWl6ZSdcbmltcG9ydCB7IGNvbnZlcnROb2RlTGlzdCwgZXNjYXBlVmFsdWUgfSBmcm9tICcuL3V0aWxpdGllcydcbmltcG9ydCB7IGdldENvbW1vbkFuY2VzdG9yLCBnZXRDb21tb25Qcm9wZXJ0aWVzIH0gZnJvbSAnLi9jb21tb24nXG5pbXBvcnQgeyBnZXRTZWxlY3QgfSBmcm9tICcuL3NlbGVjdG9yJ1xuaW1wb3J0IHsgY3JlYXRlUGF0dGVybiwgZ2V0VG9TdHJpbmcgfSBmcm9tICcuL3BhdHRlcm4nXG5cbi8qKlxuICogQHR5cGVkZWYgIHtPYmplY3R9IE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IFtyb290XSAgICAgICAgICAgICAgICAgICAgIE9wdGlvbmFsbHkgc3BlY2lmeSB0aGUgcm9vdCBlbGVtZW50XG4gKiBAcHJvcGVydHkge2Z1bmN0aW9uIHwgQXJyYXkuPEhUTUxFbGVtZW50Pn0gW3NraXBdICBTcGVjaWZ5IGVsZW1lbnRzIHRvIHNraXBcbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPHN0cmluZz59IFtwcmlvcml0eV0gICAgICAgICAgICAgIE9yZGVyIG9mIGF0dHJpYnV0ZSBwcm9jZXNzaW5nXG4gKiBAcHJvcGVydHkge09iamVjdDxzdHJpbmcsIGZ1bmN0aW9uIHwgbnVtYmVyIHwgc3RyaW5nIHwgYm9vbGVhbn0gW2lnbm9yZV0gRGVmaW5lIHBhdHRlcm5zIHdoaWNoIHNob3VsZG4ndCBiZSBpbmNsdWRlZFxuICogQHByb3BlcnR5IHsoJ2Nzcyd8J3hwYXRoJ3wnanF1ZXJ5Jyl9IFtmb3JtYXRdICAgICAgT3V0cHV0IGZvcm1hdCAgICBcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vcGF0dGVybicpLlBhdHRlcm59IFBhdHRlcm5cbiAqL1xuXG4vKipcbiAqIEdldCBhIHNlbGVjdG9yIGZvciB0aGUgcHJvdmlkZWQgZWxlbWVudFxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPcHRpb25zfSAgICAgW29wdGlvbnNdIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7QXJyYXkuPFBhdHRlcm4+fSAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFNpbmdsZVNlbGVjdG9yUGF0aCA9IChlbGVtZW50LCBvcHRpb25zID0ge30pID0+IHtcblxuICBpZiAoZWxlbWVudC5ub2RlVHlwZSA9PT0gMykge1xuICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGVcbiAgfVxuXG4gIGlmIChlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGlucHV0IC0gb25seSBIVE1MRWxlbWVudHMgb3IgcmVwcmVzZW50YXRpb25zIG9mIHRoZW0gYXJlIHN1cHBvcnRlZCEgKG5vdCBcIiR7dHlwZW9mIGVsZW1lbnR9XCIpYClcbiAgfVxuXG4gIGNvbnN0IHBhdGggPSBtYXRjaChlbGVtZW50LCBvcHRpb25zKVxuICBjb25zdCBvcHRpbWl6ZWRQYXRoID0gb3B0aW1pemUocGF0aCwgZWxlbWVudCwgb3B0aW9ucylcblxuICAvLyBkZWJ1Z1xuICAvLyBjb25zb2xlLmxvZyhgXG4gIC8vICAgc2VsZWN0b3I6ICAke3BhdGh9XG4gIC8vICAgb3B0aW1pemVkOiAke29wdGltaXplZFBhdGh9XG4gIC8vIGApXG5cbiAgcmV0dXJuIG9wdGltaXplZFBhdGhcbn1cblxuLyoqXG4gKiBHZXQgYSBzZWxlY3RvciB0byBtYXRjaCBtdWx0aXBsZSBkZXNjZW5kYW50cyBmcm9tIGFuIGFuY2VzdG9yXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50PnxOb2RlTGlzdH0gZWxlbWVudHMgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICAgICAgICAgICAgICAgIFtvcHRpb25zXSAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtBcnJheS48UGF0dGVybj59ICAgICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgY29uc3QgZ2V0TXVsdGlTZWxlY3RvclBhdGggPSAoZWxlbWVudHMsIG9wdGlvbnMgPSB7fSkgPT4ge1xuXG4gIGlmICghQXJyYXkuaXNBcnJheShlbGVtZW50cykpIHtcbiAgICBlbGVtZW50cyA9IGNvbnZlcnROb2RlTGlzdChlbGVtZW50cylcbiAgfVxuXG4gIGlmIChlbGVtZW50cy5zb21lKChlbGVtZW50KSA9PiBlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBpbnB1dCAtIG9ubHkgYW4gQXJyYXkgb2YgSFRNTEVsZW1lbnRzIG9yIHJlcHJlc2VudGF0aW9ucyBvZiB0aGVtIGlzIHN1cHBvcnRlZCEnKVxuICB9XG5cbiAgY29uc3Qgc2VsZWN0ID0gZ2V0U2VsZWN0KG9wdGlvbnMpXG4gIGNvbnN0IHRvU3RyaW5nID0gZ2V0VG9TdHJpbmcob3B0aW9ucylcblxuICBjb25zdCBhbmNlc3RvciA9IGdldENvbW1vbkFuY2VzdG9yKGVsZW1lbnRzLCBvcHRpb25zKVxuICBjb25zdCBhbmNlc3RvclBhdGggPSBtYXRjaChhbmNlc3Rvciwgb3B0aW9ucylcblxuICAvLyBUT0RPOiBjb25zaWRlciB1c2FnZSBvZiBtdWx0aXBsZSBzZWxlY3RvcnMgKyBwYXJlbnQtY2hpbGQgcmVsYXRpb24gKyBjaGVjayBmb3IgcGFydCByZWR1bmRhbmN5XG4gIGNvbnN0IGNvbW1vblBhdGggPSBnZXRDb21tb25QYXRoKGVsZW1lbnRzLCBvcHRpb25zKVxuICBjb25zdCBkZXNjZW5kYW50UGF0dGVybiA9IGNvbW1vblBhdGhbMF1cblxuICBjb25zdCBzZWxlY3RvclBhdGggPSBvcHRpbWl6ZShbLi4uYW5jZXN0b3JQYXRoLCBkZXNjZW5kYW50UGF0dGVybl0sIGVsZW1lbnRzLCBvcHRpb25zKVxuICBjb25zdCBzZWxlY3Rvck1hdGNoZXMgPSBjb252ZXJ0Tm9kZUxpc3Qoc2VsZWN0KHRvU3RyaW5nLnBhdGgoc2VsZWN0b3JQYXRoKSkpXG5cbiAgaWYgKCFlbGVtZW50cy5ldmVyeSgoZWxlbWVudCkgPT4gc2VsZWN0b3JNYXRjaGVzLnNvbWUoKGVudHJ5KSA9PiBlbnRyeSA9PT0gZWxlbWVudCkpKSB7XG4gICAgLy8gVE9ETzogY2x1c3RlciBtYXRjaGVzIHRvIHNwbGl0IGludG8gc2ltaWxhciBncm91cHMgZm9yIHN1YiBzZWxlY3Rpb25zXG4gICAgcmV0dXJuIGNvbnNvbGUud2FybihgXG4gICAgICBUaGUgc2VsZWN0ZWQgZWxlbWVudHMgY2FuJ3QgYmUgZWZmaWNpZW50bHkgbWFwcGVkLlxuICAgICAgSXRzIHByb2JhYmx5IGJlc3QgdG8gdXNlIG11bHRpcGxlIHNpbmdsZSBzZWxlY3RvcnMgaW5zdGVhZCFcbiAgICBgLCBlbGVtZW50cylcbiAgfVxuXG4gIHJldHVybiBzZWxlY3RvclBhdGhcbn1cblxuLyoqXG4gKiBHZXQgc2VsZWN0b3JzIHRvIGRlc2NyaWJlIGEgc2V0IG9mIGVsZW1lbnRzXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7QXJyYXkuPFBhdHRlcm4+fSAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBnZXRDb21tb25QYXRoID0gKGVsZW1lbnRzLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHsgY2xhc3NlcywgYXR0cmlidXRlcywgdGFnIH0gPSBnZXRDb21tb25Qcm9wZXJ0aWVzKGVsZW1lbnRzLCBvcHRpb25zKVxuXG5cbiAgcmV0dXJuIFtcbiAgICBjcmVhdGVQYXR0ZXJuKHtcbiAgICAgIHRhZyxcbiAgICAgIGNsYXNzZXM6IGNsYXNzZXMgfHwgW10sXG4gICAgICBhdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzID8gT2JqZWN0LmtleXMoYXR0cmlidXRlcykubWFwKChuYW1lKSA9PiAoe1xuICAgICAgICBuYW1lOiBlc2NhcGVWYWx1ZShuYW1lKSxcbiAgICAgICAgdmFsdWU6IGVzY2FwZVZhbHVlKGF0dHJpYnV0ZXNbbmFtZV0pXG4gICAgICB9KSkgOiBbXVxuICAgIH0pXG4gIF1cbn1cblxuLyoqXG4gKiBDaG9vc2UgYWN0aW9uIGRlcGVuZGluZyBvbiB0aGUgaW5wdXQgKG11bHRpcGxlL3NpbmdsZSlcbiAqXG4gKiBOT1RFOiBleHRlbmRlZCBkZXRlY3Rpb24gaXMgdXNlZCBmb3Igc3BlY2lhbCBjYXNlcyBsaWtlIHRoZSA8c2VsZWN0PiBlbGVtZW50IHdpdGggPG9wdGlvbnM+XG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR8Tm9kZUxpc3R8QXJyYXkuPEhUTUxFbGVtZW50Pn0gaW5wdXQgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T3B0aW9uc30gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW29wdGlvbnNdIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRRdWVyeVNlbGVjdG9yKGlucHV0LCBvcHRpb25zID0ge30pIHtcbiAgY29uc3QgcGF0aCA9IChpbnB1dC5sZW5ndGggJiYgIWlucHV0Lm5hbWUpXG4gICAgPyBnZXRNdWx0aVNlbGVjdG9yUGF0aChpbnB1dCwgb3B0aW9ucylcbiAgICA6IGdldFNpbmdsZVNlbGVjdG9yUGF0aChpbnB1dCwgb3B0aW9ucylcblxuICByZXR1cm4gZ2V0VG9TdHJpbmcob3B0aW9ucykucGF0aChwYXRoKVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlbGVjdC5qcyIsIi8qIVxuICogU2l6emxlIENTUyBTZWxlY3RvciBFbmdpbmUgdjIuMy42XG4gKiBodHRwczovL3NpenpsZWpzLmNvbS9cbiAqXG4gKiBDb3B5cmlnaHQgSlMgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vanMuZm91bmRhdGlvbi9cbiAqXG4gKiBEYXRlOiAyMDIxLTAyLTE2XG4gKi9cbiggZnVuY3Rpb24oIHdpbmRvdyApIHtcbnZhciBpLFxuXHRzdXBwb3J0LFxuXHRFeHByLFxuXHRnZXRUZXh0LFxuXHRpc1hNTCxcblx0dG9rZW5pemUsXG5cdGNvbXBpbGUsXG5cdHNlbGVjdCxcblx0b3V0ZXJtb3N0Q29udGV4dCxcblx0c29ydElucHV0LFxuXHRoYXNEdXBsaWNhdGUsXG5cblx0Ly8gTG9jYWwgZG9jdW1lbnQgdmFyc1xuXHRzZXREb2N1bWVudCxcblx0ZG9jdW1lbnQsXG5cdGRvY0VsZW0sXG5cdGRvY3VtZW50SXNIVE1MLFxuXHRyYnVnZ3lRU0EsXG5cdHJidWdneU1hdGNoZXMsXG5cdG1hdGNoZXMsXG5cdGNvbnRhaW5zLFxuXG5cdC8vIEluc3RhbmNlLXNwZWNpZmljIGRhdGFcblx0ZXhwYW5kbyA9IFwic2l6emxlXCIgKyAxICogbmV3IERhdGUoKSxcblx0cHJlZmVycmVkRG9jID0gd2luZG93LmRvY3VtZW50LFxuXHRkaXJydW5zID0gMCxcblx0ZG9uZSA9IDAsXG5cdGNsYXNzQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuXHR0b2tlbkNhY2hlID0gY3JlYXRlQ2FjaGUoKSxcblx0Y29tcGlsZXJDYWNoZSA9IGNyZWF0ZUNhY2hlKCksXG5cdG5vbm5hdGl2ZVNlbGVjdG9yQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuXHRzb3J0T3JkZXIgPSBmdW5jdGlvbiggYSwgYiApIHtcblx0XHRpZiAoIGEgPT09IGIgKSB7XG5cdFx0XHRoYXNEdXBsaWNhdGUgPSB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gMDtcblx0fSxcblxuXHQvLyBJbnN0YW5jZSBtZXRob2RzXG5cdGhhc093biA9ICgge30gKS5oYXNPd25Qcm9wZXJ0eSxcblx0YXJyID0gW10sXG5cdHBvcCA9IGFyci5wb3AsXG5cdHB1c2hOYXRpdmUgPSBhcnIucHVzaCxcblx0cHVzaCA9IGFyci5wdXNoLFxuXHRzbGljZSA9IGFyci5zbGljZSxcblxuXHQvLyBVc2UgYSBzdHJpcHBlZC1kb3duIGluZGV4T2YgYXMgaXQncyBmYXN0ZXIgdGhhbiBuYXRpdmVcblx0Ly8gaHR0cHM6Ly9qc3BlcmYuY29tL3Rob3ItaW5kZXhvZi12cy1mb3IvNVxuXHRpbmRleE9mID0gZnVuY3Rpb24oIGxpc3QsIGVsZW0gKSB7XG5cdFx0dmFyIGkgPSAwLFxuXHRcdFx0bGVuID0gbGlzdC5sZW5ndGg7XG5cdFx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRpZiAoIGxpc3RbIGkgXSA9PT0gZWxlbSApIHtcblx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiAtMTtcblx0fSxcblxuXHRib29sZWFucyA9IFwiY2hlY2tlZHxzZWxlY3RlZHxhc3luY3xhdXRvZm9jdXN8YXV0b3BsYXl8Y29udHJvbHN8ZGVmZXJ8ZGlzYWJsZWR8aGlkZGVufFwiICtcblx0XHRcImlzbWFwfGxvb3B8bXVsdGlwbGV8b3BlbnxyZWFkb25seXxyZXF1aXJlZHxzY29wZWRcIixcblxuXHQvLyBSZWd1bGFyIGV4cHJlc3Npb25zXG5cblx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1zZWxlY3RvcnMvI3doaXRlc3BhY2Vcblx0d2hpdGVzcGFjZSA9IFwiW1xcXFx4MjBcXFxcdFxcXFxyXFxcXG5cXFxcZl1cIixcblxuXHQvLyBodHRwczovL3d3dy53My5vcmcvVFIvY3NzLXN5bnRheC0zLyNpZGVudC10b2tlbi1kaWFncmFtXG5cdGlkZW50aWZpZXIgPSBcIig/OlxcXFxcXFxcW1xcXFxkYS1mQS1GXXsxLDZ9XCIgKyB3aGl0ZXNwYWNlICtcblx0XHRcIj98XFxcXFxcXFxbXlxcXFxyXFxcXG5cXFxcZl18W1xcXFx3LV18W15cXDAtXFxcXHg3Zl0pK1wiLFxuXG5cdC8vIEF0dHJpYnV0ZSBzZWxlY3RvcnM6IGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jYXR0cmlidXRlLXNlbGVjdG9yc1xuXHRhdHRyaWJ1dGVzID0gXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKihcIiArIGlkZW50aWZpZXIgKyBcIikoPzpcIiArIHdoaXRlc3BhY2UgK1xuXG5cdFx0Ly8gT3BlcmF0b3IgKGNhcHR1cmUgMilcblx0XHRcIiooWypeJHwhfl0/PSlcIiArIHdoaXRlc3BhY2UgK1xuXG5cdFx0Ly8gXCJBdHRyaWJ1dGUgdmFsdWVzIG11c3QgYmUgQ1NTIGlkZW50aWZpZXJzIFtjYXB0dXJlIDVdXG5cdFx0Ly8gb3Igc3RyaW5ncyBbY2FwdHVyZSAzIG9yIGNhcHR1cmUgNF1cIlxuXHRcdFwiKig/OicoKD86XFxcXFxcXFwufFteXFxcXFxcXFwnXSkqKSd8XFxcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXFxcXCJdKSopXFxcInwoXCIgKyBpZGVudGlmaWVyICsgXCIpKXwpXCIgK1xuXHRcdHdoaXRlc3BhY2UgKyBcIipcXFxcXVwiLFxuXG5cdHBzZXVkb3MgPSBcIjooXCIgKyBpZGVudGlmaWVyICsgXCIpKD86XFxcXCgoXCIgK1xuXG5cdFx0Ly8gVG8gcmVkdWNlIHRoZSBudW1iZXIgb2Ygc2VsZWN0b3JzIG5lZWRpbmcgdG9rZW5pemUgaW4gdGhlIHByZUZpbHRlciwgcHJlZmVyIGFyZ3VtZW50czpcblx0XHQvLyAxLiBxdW90ZWQgKGNhcHR1cmUgMzsgY2FwdHVyZSA0IG9yIGNhcHR1cmUgNSlcblx0XHRcIignKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcJ10pKiknfFxcXCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFxcXFwiXSkqKVxcXCIpfFwiICtcblxuXHRcdC8vIDIuIHNpbXBsZSAoY2FwdHVyZSA2KVxuXHRcdFwiKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcKClbXFxcXF1dfFwiICsgYXR0cmlidXRlcyArIFwiKSopfFwiICtcblxuXHRcdC8vIDMuIGFueXRoaW5nIGVsc2UgKGNhcHR1cmUgMilcblx0XHRcIi4qXCIgK1xuXHRcdFwiKVxcXFwpfClcIixcblxuXHQvLyBMZWFkaW5nIGFuZCBub24tZXNjYXBlZCB0cmFpbGluZyB3aGl0ZXNwYWNlLCBjYXB0dXJpbmcgc29tZSBub24td2hpdGVzcGFjZSBjaGFyYWN0ZXJzIHByZWNlZGluZyB0aGUgbGF0dGVyXG5cdHJ3aGl0ZXNwYWNlID0gbmV3IFJlZ0V4cCggd2hpdGVzcGFjZSArIFwiK1wiLCBcImdcIiApLFxuXHRydHJpbSA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiK3woKD86XnxbXlxcXFxcXFxcXSkoPzpcXFxcXFxcXC4pKilcIiArXG5cdFx0d2hpdGVzcGFjZSArIFwiKyRcIiwgXCJnXCIgKSxcblxuXHRyY29tbWEgPSBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIiosXCIgKyB3aGl0ZXNwYWNlICsgXCIqXCIgKSxcblx0cmNvbWJpbmF0b3JzID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIqKFs+K35dfFwiICsgd2hpdGVzcGFjZSArIFwiKVwiICsgd2hpdGVzcGFjZSArXG5cdFx0XCIqXCIgKSxcblx0cmRlc2NlbmQgPSBuZXcgUmVnRXhwKCB3aGl0ZXNwYWNlICsgXCJ8PlwiICksXG5cblx0cnBzZXVkbyA9IG5ldyBSZWdFeHAoIHBzZXVkb3MgKSxcblx0cmlkZW50aWZpZXIgPSBuZXcgUmVnRXhwKCBcIl5cIiArIGlkZW50aWZpZXIgKyBcIiRcIiApLFxuXG5cdG1hdGNoRXhwciA9IHtcblx0XHRcIklEXCI6IG5ldyBSZWdFeHAoIFwiXiMoXCIgKyBpZGVudGlmaWVyICsgXCIpXCIgKSxcblx0XHRcIkNMQVNTXCI6IG5ldyBSZWdFeHAoIFwiXlxcXFwuKFwiICsgaWRlbnRpZmllciArIFwiKVwiICksXG5cdFx0XCJUQUdcIjogbmV3IFJlZ0V4cCggXCJeKFwiICsgaWRlbnRpZmllciArIFwifFsqXSlcIiApLFxuXHRcdFwiQVRUUlwiOiBuZXcgUmVnRXhwKCBcIl5cIiArIGF0dHJpYnV0ZXMgKSxcblx0XHRcIlBTRVVET1wiOiBuZXcgUmVnRXhwKCBcIl5cIiArIHBzZXVkb3MgKSxcblx0XHRcIkNISUxEXCI6IG5ldyBSZWdFeHAoIFwiXjoob25seXxmaXJzdHxsYXN0fG50aHxudGgtbGFzdCktKGNoaWxkfG9mLXR5cGUpKD86XFxcXChcIiArXG5cdFx0XHR3aGl0ZXNwYWNlICsgXCIqKGV2ZW58b2RkfCgoWystXXwpKFxcXFxkKilufClcIiArIHdoaXRlc3BhY2UgKyBcIiooPzooWystXXwpXCIgK1xuXHRcdFx0d2hpdGVzcGFjZSArIFwiKihcXFxcZCspfCkpXCIgKyB3aGl0ZXNwYWNlICsgXCIqXFxcXCl8KVwiLCBcImlcIiApLFxuXHRcdFwiYm9vbFwiOiBuZXcgUmVnRXhwKCBcIl4oPzpcIiArIGJvb2xlYW5zICsgXCIpJFwiLCBcImlcIiApLFxuXG5cdFx0Ly8gRm9yIHVzZSBpbiBsaWJyYXJpZXMgaW1wbGVtZW50aW5nIC5pcygpXG5cdFx0Ly8gV2UgdXNlIHRoaXMgZm9yIFBPUyBtYXRjaGluZyBpbiBgc2VsZWN0YFxuXHRcdFwibmVlZHNDb250ZXh0XCI6IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArXG5cdFx0XHRcIipbPit+XXw6KGV2ZW58b2RkfGVxfGd0fGx0fG50aHxmaXJzdHxsYXN0KSg/OlxcXFwoXCIgKyB3aGl0ZXNwYWNlICtcblx0XHRcdFwiKigoPzotXFxcXGQpP1xcXFxkKilcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcKXwpKD89W14tXXwkKVwiLCBcImlcIiApXG5cdH0sXG5cblx0cmh0bWwgPSAvSFRNTCQvaSxcblx0cmlucHV0cyA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGJ1dHRvbikkL2ksXG5cdHJoZWFkZXIgPSAvXmhcXGQkL2ksXG5cblx0cm5hdGl2ZSA9IC9eW157XStcXHtcXHMqXFxbbmF0aXZlIFxcdy8sXG5cblx0Ly8gRWFzaWx5LXBhcnNlYWJsZS9yZXRyaWV2YWJsZSBJRCBvciBUQUcgb3IgQ0xBU1Mgc2VsZWN0b3JzXG5cdHJxdWlja0V4cHIgPSAvXig/OiMoW1xcdy1dKyl8KFxcdyspfFxcLihbXFx3LV0rKSkkLyxcblxuXHRyc2libGluZyA9IC9bK35dLyxcblxuXHQvLyBDU1MgZXNjYXBlc1xuXHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9DU1MyMS9zeW5kYXRhLmh0bWwjZXNjYXBlZC1jaGFyYWN0ZXJzXG5cdHJ1bmVzY2FwZSA9IG5ldyBSZWdFeHAoIFwiXFxcXFxcXFxbXFxcXGRhLWZBLUZdezEsNn1cIiArIHdoaXRlc3BhY2UgKyBcIj98XFxcXFxcXFwoW15cXFxcclxcXFxuXFxcXGZdKVwiLCBcImdcIiApLFxuXHRmdW5lc2NhcGUgPSBmdW5jdGlvbiggZXNjYXBlLCBub25IZXggKSB7XG5cdFx0dmFyIGhpZ2ggPSBcIjB4XCIgKyBlc2NhcGUuc2xpY2UoIDEgKSAtIDB4MTAwMDA7XG5cblx0XHRyZXR1cm4gbm9uSGV4ID9cblxuXHRcdFx0Ly8gU3RyaXAgdGhlIGJhY2tzbGFzaCBwcmVmaXggZnJvbSBhIG5vbi1oZXggZXNjYXBlIHNlcXVlbmNlXG5cdFx0XHRub25IZXggOlxuXG5cdFx0XHQvLyBSZXBsYWNlIGEgaGV4YWRlY2ltYWwgZXNjYXBlIHNlcXVlbmNlIHdpdGggdGhlIGVuY29kZWQgVW5pY29kZSBjb2RlIHBvaW50XG5cdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTExK1xuXHRcdFx0Ly8gRm9yIHZhbHVlcyBvdXRzaWRlIHRoZSBCYXNpYyBNdWx0aWxpbmd1YWwgUGxhbmUgKEJNUCksIG1hbnVhbGx5IGNvbnN0cnVjdCBhXG5cdFx0XHQvLyBzdXJyb2dhdGUgcGFpclxuXHRcdFx0aGlnaCA8IDAgP1xuXHRcdFx0XHRTdHJpbmcuZnJvbUNoYXJDb2RlKCBoaWdoICsgMHgxMDAwMCApIDpcblx0XHRcdFx0U3RyaW5nLmZyb21DaGFyQ29kZSggaGlnaCA+PiAxMCB8IDB4RDgwMCwgaGlnaCAmIDB4M0ZGIHwgMHhEQzAwICk7XG5cdH0sXG5cblx0Ly8gQ1NTIHN0cmluZy9pZGVudGlmaWVyIHNlcmlhbGl6YXRpb25cblx0Ly8gaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzc29tLyNjb21tb24tc2VyaWFsaXppbmctaWRpb21zXG5cdHJjc3Nlc2NhcGUgPSAvKFtcXDAtXFx4MWZcXHg3Zl18Xi0/XFxkKXxeLSR8W15cXDAtXFx4MWZcXHg3Zi1cXHVGRkZGXFx3LV0vZyxcblx0ZmNzc2VzY2FwZSA9IGZ1bmN0aW9uKCBjaCwgYXNDb2RlUG9pbnQgKSB7XG5cdFx0aWYgKCBhc0NvZGVQb2ludCApIHtcblxuXHRcdFx0Ly8gVSswMDAwIE5VTEwgYmVjb21lcyBVK0ZGRkQgUkVQTEFDRU1FTlQgQ0hBUkFDVEVSXG5cdFx0XHRpZiAoIGNoID09PSBcIlxcMFwiICkge1xuXHRcdFx0XHRyZXR1cm4gXCJcXHVGRkZEXCI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbnRyb2wgY2hhcmFjdGVycyBhbmQgKGRlcGVuZGVudCB1cG9uIHBvc2l0aW9uKSBudW1iZXJzIGdldCBlc2NhcGVkIGFzIGNvZGUgcG9pbnRzXG5cdFx0XHRyZXR1cm4gY2guc2xpY2UoIDAsIC0xICkgKyBcIlxcXFxcIiArXG5cdFx0XHRcdGNoLmNoYXJDb2RlQXQoIGNoLmxlbmd0aCAtIDEgKS50b1N0cmluZyggMTYgKSArIFwiIFwiO1xuXHRcdH1cblxuXHRcdC8vIE90aGVyIHBvdGVudGlhbGx5LXNwZWNpYWwgQVNDSUkgY2hhcmFjdGVycyBnZXQgYmFja3NsYXNoLWVzY2FwZWRcblx0XHRyZXR1cm4gXCJcXFxcXCIgKyBjaDtcblx0fSxcblxuXHQvLyBVc2VkIGZvciBpZnJhbWVzXG5cdC8vIFNlZSBzZXREb2N1bWVudCgpXG5cdC8vIFJlbW92aW5nIHRoZSBmdW5jdGlvbiB3cmFwcGVyIGNhdXNlcyBhIFwiUGVybWlzc2lvbiBEZW5pZWRcIlxuXHQvLyBlcnJvciBpbiBJRVxuXHR1bmxvYWRIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0c2V0RG9jdW1lbnQoKTtcblx0fSxcblxuXHRpbkRpc2FibGVkRmllbGRzZXQgPSBhZGRDb21iaW5hdG9yKFxuXHRcdGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IHRydWUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImZpZWxkc2V0XCI7XG5cdFx0fSxcblx0XHR7IGRpcjogXCJwYXJlbnROb2RlXCIsIG5leHQ6IFwibGVnZW5kXCIgfVxuXHQpO1xuXG4vLyBPcHRpbWl6ZSBmb3IgcHVzaC5hcHBseSggXywgTm9kZUxpc3QgKVxudHJ5IHtcblx0cHVzaC5hcHBseShcblx0XHQoIGFyciA9IHNsaWNlLmNhbGwoIHByZWZlcnJlZERvYy5jaGlsZE5vZGVzICkgKSxcblx0XHRwcmVmZXJyZWREb2MuY2hpbGROb2Rlc1xuXHQpO1xuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQ8NC4wXG5cdC8vIERldGVjdCBzaWxlbnRseSBmYWlsaW5nIHB1c2guYXBwbHlcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuXHRhcnJbIHByZWZlcnJlZERvYy5jaGlsZE5vZGVzLmxlbmd0aCBdLm5vZGVUeXBlO1xufSBjYXRjaCAoIGUgKSB7XG5cdHB1c2ggPSB7IGFwcGx5OiBhcnIubGVuZ3RoID9cblxuXHRcdC8vIExldmVyYWdlIHNsaWNlIGlmIHBvc3NpYmxlXG5cdFx0ZnVuY3Rpb24oIHRhcmdldCwgZWxzICkge1xuXHRcdFx0cHVzaE5hdGl2ZS5hcHBseSggdGFyZ2V0LCBzbGljZS5jYWxsKCBlbHMgKSApO1xuXHRcdH0gOlxuXG5cdFx0Ly8gU3VwcG9ydDogSUU8OVxuXHRcdC8vIE90aGVyd2lzZSBhcHBlbmQgZGlyZWN0bHlcblx0XHRmdW5jdGlvbiggdGFyZ2V0LCBlbHMgKSB7XG5cdFx0XHR2YXIgaiA9IHRhcmdldC5sZW5ndGgsXG5cdFx0XHRcdGkgPSAwO1xuXG5cdFx0XHQvLyBDYW4ndCB0cnVzdCBOb2RlTGlzdC5sZW5ndGhcblx0XHRcdHdoaWxlICggKCB0YXJnZXRbIGorKyBdID0gZWxzWyBpKysgXSApICkge31cblx0XHRcdHRhcmdldC5sZW5ndGggPSBqIC0gMTtcblx0XHR9XG5cdH07XG59XG5cbmZ1bmN0aW9uIFNpenpsZSggc2VsZWN0b3IsIGNvbnRleHQsIHJlc3VsdHMsIHNlZWQgKSB7XG5cdHZhciBtLCBpLCBlbGVtLCBuaWQsIG1hdGNoLCBncm91cHMsIG5ld1NlbGVjdG9yLFxuXHRcdG5ld0NvbnRleHQgPSBjb250ZXh0ICYmIGNvbnRleHQub3duZXJEb2N1bWVudCxcblxuXHRcdC8vIG5vZGVUeXBlIGRlZmF1bHRzIHRvIDksIHNpbmNlIGNvbnRleHQgZGVmYXVsdHMgdG8gZG9jdW1lbnRcblx0XHRub2RlVHlwZSA9IGNvbnRleHQgPyBjb250ZXh0Lm5vZGVUeXBlIDogOTtcblxuXHRyZXN1bHRzID0gcmVzdWx0cyB8fCBbXTtcblxuXHQvLyBSZXR1cm4gZWFybHkgZnJvbSBjYWxscyB3aXRoIGludmFsaWQgc2VsZWN0b3Igb3IgY29udGV4dFxuXHRpZiAoIHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiB8fCAhc2VsZWN0b3IgfHxcblx0XHRub2RlVHlwZSAhPT0gMSAmJiBub2RlVHlwZSAhPT0gOSAmJiBub2RlVHlwZSAhPT0gMTEgKSB7XG5cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxuXG5cdC8vIFRyeSB0byBzaG9ydGN1dCBmaW5kIG9wZXJhdGlvbnMgKGFzIG9wcG9zZWQgdG8gZmlsdGVycykgaW4gSFRNTCBkb2N1bWVudHNcblx0aWYgKCAhc2VlZCApIHtcblx0XHRzZXREb2N1bWVudCggY29udGV4dCApO1xuXHRcdGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xuXG5cdFx0aWYgKCBkb2N1bWVudElzSFRNTCApIHtcblxuXHRcdFx0Ly8gSWYgdGhlIHNlbGVjdG9yIGlzIHN1ZmZpY2llbnRseSBzaW1wbGUsIHRyeSB1c2luZyBhIFwiZ2V0KkJ5KlwiIERPTSBtZXRob2Rcblx0XHRcdC8vIChleGNlcHRpbmcgRG9jdW1lbnRGcmFnbWVudCBjb250ZXh0LCB3aGVyZSB0aGUgbWV0aG9kcyBkb24ndCBleGlzdClcblx0XHRcdGlmICggbm9kZVR5cGUgIT09IDExICYmICggbWF0Y2ggPSBycXVpY2tFeHByLmV4ZWMoIHNlbGVjdG9yICkgKSApIHtcblxuXHRcdFx0XHQvLyBJRCBzZWxlY3RvclxuXHRcdFx0XHRpZiAoICggbSA9IG1hdGNoWyAxIF0gKSApIHtcblxuXHRcdFx0XHRcdC8vIERvY3VtZW50IGNvbnRleHRcblx0XHRcdFx0XHRpZiAoIG5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoIGVsZW0gPSBjb250ZXh0LmdldEVsZW1lbnRCeUlkKCBtICkgKSApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSwgT3BlcmEsIFdlYmtpdFxuXHRcdFx0XHRcdFx0XHQvLyBUT0RPOiBpZGVudGlmeSB2ZXJzaW9uc1xuXHRcdFx0XHRcdFx0XHQvLyBnZXRFbGVtZW50QnlJZCBjYW4gbWF0Y2ggZWxlbWVudHMgYnkgbmFtZSBpbnN0ZWFkIG9mIElEXG5cdFx0XHRcdFx0XHRcdGlmICggZWxlbS5pZCA9PT0gbSApIHtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBFbGVtZW50IGNvbnRleHRcblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSwgT3BlcmEsIFdlYmtpdFxuXHRcdFx0XHRcdFx0Ly8gVE9ETzogaWRlbnRpZnkgdmVyc2lvbnNcblx0XHRcdFx0XHRcdC8vIGdldEVsZW1lbnRCeUlkIGNhbiBtYXRjaCBlbGVtZW50cyBieSBuYW1lIGluc3RlYWQgb2YgSURcblx0XHRcdFx0XHRcdGlmICggbmV3Q29udGV4dCAmJiAoIGVsZW0gPSBuZXdDb250ZXh0LmdldEVsZW1lbnRCeUlkKCBtICkgKSAmJlxuXHRcdFx0XHRcdFx0XHRjb250YWlucyggY29udGV4dCwgZWxlbSApICYmXG5cdFx0XHRcdFx0XHRcdGVsZW0uaWQgPT09IG0gKSB7XG5cblx0XHRcdFx0XHRcdFx0cmVzdWx0cy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBUeXBlIHNlbGVjdG9yXG5cdFx0XHRcdH0gZWxzZSBpZiAoIG1hdGNoWyAyIF0gKSB7XG5cdFx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggc2VsZWN0b3IgKSApO1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXG5cdFx0XHRcdC8vIENsYXNzIHNlbGVjdG9yXG5cdFx0XHRcdH0gZWxzZSBpZiAoICggbSA9IG1hdGNoWyAzIF0gKSAmJiBzdXBwb3J0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgJiZcblx0XHRcdFx0XHRjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgKSB7XG5cblx0XHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoIG0gKSApO1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRha2UgYWR2YW50YWdlIG9mIHF1ZXJ5U2VsZWN0b3JBbGxcblx0XHRcdGlmICggc3VwcG9ydC5xc2EgJiZcblx0XHRcdFx0IW5vbm5hdGl2ZVNlbGVjdG9yQ2FjaGVbIHNlbGVjdG9yICsgXCIgXCIgXSAmJlxuXHRcdFx0XHQoICFyYnVnZ3lRU0EgfHwgIXJidWdneVFTQS50ZXN0KCBzZWxlY3RvciApICkgJiZcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA4IG9ubHlcblx0XHRcdFx0Ly8gRXhjbHVkZSBvYmplY3QgZWxlbWVudHNcblx0XHRcdFx0KCBub2RlVHlwZSAhPT0gMSB8fCBjb250ZXh0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09IFwib2JqZWN0XCIgKSApIHtcblxuXHRcdFx0XHRuZXdTZWxlY3RvciA9IHNlbGVjdG9yO1xuXHRcdFx0XHRuZXdDb250ZXh0ID0gY29udGV4dDtcblxuXHRcdFx0XHQvLyBxU0EgY29uc2lkZXJzIGVsZW1lbnRzIG91dHNpZGUgYSBzY29waW5nIHJvb3Qgd2hlbiBldmFsdWF0aW5nIGNoaWxkIG9yXG5cdFx0XHRcdC8vIGRlc2NlbmRhbnQgY29tYmluYXRvcnMsIHdoaWNoIGlzIG5vdCB3aGF0IHdlIHdhbnQuXG5cdFx0XHRcdC8vIEluIHN1Y2ggY2FzZXMsIHdlIHdvcmsgYXJvdW5kIHRoZSBiZWhhdmlvciBieSBwcmVmaXhpbmcgZXZlcnkgc2VsZWN0b3IgaW4gdGhlXG5cdFx0XHRcdC8vIGxpc3Qgd2l0aCBhbiBJRCBzZWxlY3RvciByZWZlcmVuY2luZyB0aGUgc2NvcGUgY29udGV4dC5cblx0XHRcdFx0Ly8gVGhlIHRlY2huaXF1ZSBoYXMgdG8gYmUgdXNlZCBhcyB3ZWxsIHdoZW4gYSBsZWFkaW5nIGNvbWJpbmF0b3IgaXMgdXNlZFxuXHRcdFx0XHQvLyBhcyBzdWNoIHNlbGVjdG9ycyBhcmUgbm90IHJlY29nbml6ZWQgYnkgcXVlcnlTZWxlY3RvckFsbC5cblx0XHRcdFx0Ly8gVGhhbmtzIHRvIEFuZHJldyBEdXBvbnQgZm9yIHRoaXMgdGVjaG5pcXVlLlxuXHRcdFx0XHRpZiAoIG5vZGVUeXBlID09PSAxICYmXG5cdFx0XHRcdFx0KCByZGVzY2VuZC50ZXN0KCBzZWxlY3RvciApIHx8IHJjb21iaW5hdG9ycy50ZXN0KCBzZWxlY3RvciApICkgKSB7XG5cblx0XHRcdFx0XHQvLyBFeHBhbmQgY29udGV4dCBmb3Igc2libGluZyBzZWxlY3RvcnNcblx0XHRcdFx0XHRuZXdDb250ZXh0ID0gcnNpYmxpbmcudGVzdCggc2VsZWN0b3IgKSAmJiB0ZXN0Q29udGV4dCggY29udGV4dC5wYXJlbnROb2RlICkgfHxcblx0XHRcdFx0XHRcdGNvbnRleHQ7XG5cblx0XHRcdFx0XHQvLyBXZSBjYW4gdXNlIDpzY29wZSBpbnN0ZWFkIG9mIHRoZSBJRCBoYWNrIGlmIHRoZSBicm93c2VyXG5cdFx0XHRcdFx0Ly8gc3VwcG9ydHMgaXQgJiBpZiB3ZSdyZSBub3QgY2hhbmdpbmcgdGhlIGNvbnRleHQuXG5cdFx0XHRcdFx0aWYgKCBuZXdDb250ZXh0ICE9PSBjb250ZXh0IHx8ICFzdXBwb3J0LnNjb3BlICkge1xuXG5cdFx0XHRcdFx0XHQvLyBDYXB0dXJlIHRoZSBjb250ZXh0IElELCBzZXR0aW5nIGl0IGZpcnN0IGlmIG5lY2Vzc2FyeVxuXHRcdFx0XHRcdFx0aWYgKCAoIG5pZCA9IGNvbnRleHQuZ2V0QXR0cmlidXRlKCBcImlkXCIgKSApICkge1xuXHRcdFx0XHRcdFx0XHRuaWQgPSBuaWQucmVwbGFjZSggcmNzc2VzY2FwZSwgZmNzc2VzY2FwZSApO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Y29udGV4dC5zZXRBdHRyaWJ1dGUoIFwiaWRcIiwgKCBuaWQgPSBleHBhbmRvICkgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBQcmVmaXggZXZlcnkgc2VsZWN0b3IgaW4gdGhlIGxpc3Rcblx0XHRcdFx0XHRncm91cHMgPSB0b2tlbml6ZSggc2VsZWN0b3IgKTtcblx0XHRcdFx0XHRpID0gZ3JvdXBzLmxlbmd0aDtcblx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdGdyb3Vwc1sgaSBdID0gKCBuaWQgPyBcIiNcIiArIG5pZCA6IFwiOnNjb3BlXCIgKSArIFwiIFwiICtcblx0XHRcdFx0XHRcdFx0dG9TZWxlY3RvciggZ3JvdXBzWyBpIF0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bmV3U2VsZWN0b3IgPSBncm91cHMuam9pbiggXCIsXCIgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cyxcblx0XHRcdFx0XHRcdG5ld0NvbnRleHQucXVlcnlTZWxlY3RvckFsbCggbmV3U2VsZWN0b3IgKVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdH0gY2F0Y2ggKCBxc2FFcnJvciApIHtcblx0XHRcdFx0XHRub25uYXRpdmVTZWxlY3RvckNhY2hlKCBzZWxlY3RvciwgdHJ1ZSApO1xuXHRcdFx0XHR9IGZpbmFsbHkge1xuXHRcdFx0XHRcdGlmICggbmlkID09PSBleHBhbmRvICkge1xuXHRcdFx0XHRcdFx0Y29udGV4dC5yZW1vdmVBdHRyaWJ1dGUoIFwiaWRcIiApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIEFsbCBvdGhlcnNcblx0cmV0dXJuIHNlbGVjdCggc2VsZWN0b3IucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICk7XG59XG5cbi8qKlxuICogQ3JlYXRlIGtleS12YWx1ZSBjYWNoZXMgb2YgbGltaXRlZCBzaXplXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb24oc3RyaW5nLCBvYmplY3QpfSBSZXR1cm5zIHRoZSBPYmplY3QgZGF0YSBhZnRlciBzdG9yaW5nIGl0IG9uIGl0c2VsZiB3aXRoXG4gKlx0cHJvcGVydHkgbmFtZSB0aGUgKHNwYWNlLXN1ZmZpeGVkKSBzdHJpbmcgYW5kIChpZiB0aGUgY2FjaGUgaXMgbGFyZ2VyIHRoYW4gRXhwci5jYWNoZUxlbmd0aClcbiAqXHRkZWxldGluZyB0aGUgb2xkZXN0IGVudHJ5XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNhY2hlKCkge1xuXHR2YXIga2V5cyA9IFtdO1xuXG5cdGZ1bmN0aW9uIGNhY2hlKCBrZXksIHZhbHVlICkge1xuXG5cdFx0Ly8gVXNlIChrZXkgKyBcIiBcIikgdG8gYXZvaWQgY29sbGlzaW9uIHdpdGggbmF0aXZlIHByb3RvdHlwZSBwcm9wZXJ0aWVzIChzZWUgSXNzdWUgIzE1Nylcblx0XHRpZiAoIGtleXMucHVzaCgga2V5ICsgXCIgXCIgKSA+IEV4cHIuY2FjaGVMZW5ndGggKSB7XG5cblx0XHRcdC8vIE9ubHkga2VlcCB0aGUgbW9zdCByZWNlbnQgZW50cmllc1xuXHRcdFx0ZGVsZXRlIGNhY2hlWyBrZXlzLnNoaWZ0KCkgXTtcblx0XHR9XG5cdFx0cmV0dXJuICggY2FjaGVbIGtleSArIFwiIFwiIF0gPSB2YWx1ZSApO1xuXHR9XG5cdHJldHVybiBjYWNoZTtcbn1cblxuLyoqXG4gKiBNYXJrIGEgZnVuY3Rpb24gZm9yIHNwZWNpYWwgdXNlIGJ5IFNpenpsZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIG1hcmtcbiAqL1xuZnVuY3Rpb24gbWFya0Z1bmN0aW9uKCBmbiApIHtcblx0Zm5bIGV4cGFuZG8gXSA9IHRydWU7XG5cdHJldHVybiBmbjtcbn1cblxuLyoqXG4gKiBTdXBwb3J0IHRlc3RpbmcgdXNpbmcgYW4gZWxlbWVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gUGFzc2VkIHRoZSBjcmVhdGVkIGVsZW1lbnQgYW5kIHJldHVybnMgYSBib29sZWFuIHJlc3VsdFxuICovXG5mdW5jdGlvbiBhc3NlcnQoIGZuICkge1xuXHR2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImZpZWxkc2V0XCIgKTtcblxuXHR0cnkge1xuXHRcdHJldHVybiAhIWZuKCBlbCApO1xuXHR9IGNhdGNoICggZSApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0gZmluYWxseSB7XG5cblx0XHQvLyBSZW1vdmUgZnJvbSBpdHMgcGFyZW50IGJ5IGRlZmF1bHRcblx0XHRpZiAoIGVsLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBlbCApO1xuXHRcdH1cblxuXHRcdC8vIHJlbGVhc2UgbWVtb3J5IGluIElFXG5cdFx0ZWwgPSBudWxsO1xuXHR9XG59XG5cbi8qKlxuICogQWRkcyB0aGUgc2FtZSBoYW5kbGVyIGZvciBhbGwgb2YgdGhlIHNwZWNpZmllZCBhdHRyc1xuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJzIFBpcGUtc2VwYXJhdGVkIGxpc3Qgb2YgYXR0cmlidXRlc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlciBUaGUgbWV0aG9kIHRoYXQgd2lsbCBiZSBhcHBsaWVkXG4gKi9cbmZ1bmN0aW9uIGFkZEhhbmRsZSggYXR0cnMsIGhhbmRsZXIgKSB7XG5cdHZhciBhcnIgPSBhdHRycy5zcGxpdCggXCJ8XCIgKSxcblx0XHRpID0gYXJyLmxlbmd0aDtcblxuXHR3aGlsZSAoIGktLSApIHtcblx0XHRFeHByLmF0dHJIYW5kbGVbIGFyclsgaSBdIF0gPSBoYW5kbGVyO1xuXHR9XG59XG5cbi8qKlxuICogQ2hlY2tzIGRvY3VtZW50IG9yZGVyIG9mIHR3byBzaWJsaW5nc1xuICogQHBhcmFtIHtFbGVtZW50fSBhXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgbGVzcyB0aGFuIDAgaWYgYSBwcmVjZWRlcyBiLCBncmVhdGVyIHRoYW4gMCBpZiBhIGZvbGxvd3MgYlxuICovXG5mdW5jdGlvbiBzaWJsaW5nQ2hlY2soIGEsIGIgKSB7XG5cdHZhciBjdXIgPSBiICYmIGEsXG5cdFx0ZGlmZiA9IGN1ciAmJiBhLm5vZGVUeXBlID09PSAxICYmIGIubm9kZVR5cGUgPT09IDEgJiZcblx0XHRcdGEuc291cmNlSW5kZXggLSBiLnNvdXJjZUluZGV4O1xuXG5cdC8vIFVzZSBJRSBzb3VyY2VJbmRleCBpZiBhdmFpbGFibGUgb24gYm90aCBub2Rlc1xuXHRpZiAoIGRpZmYgKSB7XG5cdFx0cmV0dXJuIGRpZmY7XG5cdH1cblxuXHQvLyBDaGVjayBpZiBiIGZvbGxvd3MgYVxuXHRpZiAoIGN1ciApIHtcblx0XHR3aGlsZSAoICggY3VyID0gY3VyLm5leHRTaWJsaW5nICkgKSB7XG5cdFx0XHRpZiAoIGN1ciA9PT0gYiApIHtcblx0XHRcdFx0cmV0dXJuIC0xO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBhID8gMSA6IC0xO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgaW5wdXQgdHlwZXNcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUlucHV0UHNldWRvKCB0eXBlICkge1xuXHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0dmFyIG5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0cmV0dXJuIG5hbWUgPT09IFwiaW5wdXRcIiAmJiBlbGVtLnR5cGUgPT09IHR5cGU7XG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIHVzZSBpbiBwc2V1ZG9zIGZvciBidXR0b25zXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICovXG5mdW5jdGlvbiBjcmVhdGVCdXR0b25Qc2V1ZG8oIHR5cGUgKSB7XG5cdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHR2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRyZXR1cm4gKCBuYW1lID09PSBcImlucHV0XCIgfHwgbmFtZSA9PT0gXCJidXR0b25cIiApICYmIGVsZW0udHlwZSA9PT0gdHlwZTtcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIDplbmFibGVkLzpkaXNhYmxlZFxuICogQHBhcmFtIHtCb29sZWFufSBkaXNhYmxlZCB0cnVlIGZvciA6ZGlzYWJsZWQ7IGZhbHNlIGZvciA6ZW5hYmxlZFxuICovXG5mdW5jdGlvbiBjcmVhdGVEaXNhYmxlZFBzZXVkbyggZGlzYWJsZWQgKSB7XG5cblx0Ly8gS25vd24gOmRpc2FibGVkIGZhbHNlIHBvc2l0aXZlczogZmllbGRzZXRbZGlzYWJsZWRdID4gbGVnZW5kOm50aC1vZi10eXBlKG4rMikgOmNhbi1kaXNhYmxlXG5cdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdC8vIE9ubHkgY2VydGFpbiBlbGVtZW50cyBjYW4gbWF0Y2ggOmVuYWJsZWQgb3IgOmRpc2FibGVkXG5cdFx0Ly8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc2NyaXB0aW5nLmh0bWwjc2VsZWN0b3ItZW5hYmxlZFxuXHRcdC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3NjcmlwdGluZy5odG1sI3NlbGVjdG9yLWRpc2FibGVkXG5cdFx0aWYgKCBcImZvcm1cIiBpbiBlbGVtICkge1xuXG5cdFx0XHQvLyBDaGVjayBmb3IgaW5oZXJpdGVkIGRpc2FibGVkbmVzcyBvbiByZWxldmFudCBub24tZGlzYWJsZWQgZWxlbWVudHM6XG5cdFx0XHQvLyAqIGxpc3RlZCBmb3JtLWFzc29jaWF0ZWQgZWxlbWVudHMgaW4gYSBkaXNhYmxlZCBmaWVsZHNldFxuXHRcdFx0Ly8gICBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9mb3Jtcy5odG1sI2NhdGVnb3J5LWxpc3RlZFxuXHRcdFx0Ly8gICBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9mb3Jtcy5odG1sI2NvbmNlcHQtZmUtZGlzYWJsZWRcblx0XHRcdC8vICogb3B0aW9uIGVsZW1lbnRzIGluIGEgZGlzYWJsZWQgb3B0Z3JvdXBcblx0XHRcdC8vICAgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZm9ybXMuaHRtbCNjb25jZXB0LW9wdGlvbi1kaXNhYmxlZFxuXHRcdFx0Ly8gQWxsIHN1Y2ggZWxlbWVudHMgaGF2ZSBhIFwiZm9ybVwiIHByb3BlcnR5LlxuXHRcdFx0aWYgKCBlbGVtLnBhcmVudE5vZGUgJiYgZWxlbS5kaXNhYmxlZCA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdFx0Ly8gT3B0aW9uIGVsZW1lbnRzIGRlZmVyIHRvIGEgcGFyZW50IG9wdGdyb3VwIGlmIHByZXNlbnRcblx0XHRcdFx0aWYgKCBcImxhYmVsXCIgaW4gZWxlbSApIHtcblx0XHRcdFx0XHRpZiAoIFwibGFiZWxcIiBpbiBlbGVtLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbS5wYXJlbnROb2RlLmRpc2FibGVkID09PSBkaXNhYmxlZDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IGRpc2FibGVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDYgLSAxMVxuXHRcdFx0XHQvLyBVc2UgdGhlIGlzRGlzYWJsZWQgc2hvcnRjdXQgcHJvcGVydHkgdG8gY2hlY2sgZm9yIGRpc2FibGVkIGZpZWxkc2V0IGFuY2VzdG9yc1xuXHRcdFx0XHRyZXR1cm4gZWxlbS5pc0Rpc2FibGVkID09PSBkaXNhYmxlZCB8fFxuXG5cdFx0XHRcdFx0Ly8gV2hlcmUgdGhlcmUgaXMgbm8gaXNEaXNhYmxlZCwgY2hlY2sgbWFudWFsbHlcblx0XHRcdFx0XHQvKiBqc2hpbnQgLVcwMTggKi9cblx0XHRcdFx0XHRlbGVtLmlzRGlzYWJsZWQgIT09ICFkaXNhYmxlZCAmJlxuXHRcdFx0XHRcdGluRGlzYWJsZWRGaWVsZHNldCggZWxlbSApID09PSBkaXNhYmxlZDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IGRpc2FibGVkO1xuXG5cdFx0Ly8gVHJ5IHRvIHdpbm5vdyBvdXQgZWxlbWVudHMgdGhhdCBjYW4ndCBiZSBkaXNhYmxlZCBiZWZvcmUgdHJ1c3RpbmcgdGhlIGRpc2FibGVkIHByb3BlcnR5LlxuXHRcdC8vIFNvbWUgdmljdGltcyBnZXQgY2F1Z2h0IGluIG91ciBuZXQgKGxhYmVsLCBsZWdlbmQsIG1lbnUsIHRyYWNrKSwgYnV0IGl0IHNob3VsZG4ndFxuXHRcdC8vIGV2ZW4gZXhpc3Qgb24gdGhlbSwgbGV0IGFsb25lIGhhdmUgYSBib29sZWFuIHZhbHVlLlxuXHRcdH0gZWxzZSBpZiAoIFwibGFiZWxcIiBpbiBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IGRpc2FibGVkO1xuXHRcdH1cblxuXHRcdC8vIFJlbWFpbmluZyBlbGVtZW50cyBhcmUgbmVpdGhlciA6ZW5hYmxlZCBub3IgOmRpc2FibGVkXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgcG9zaXRpb25hbHNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oIGZuICkge1xuXHRyZXR1cm4gbWFya0Z1bmN0aW9uKCBmdW5jdGlvbiggYXJndW1lbnQgKSB7XG5cdFx0YXJndW1lbnQgPSArYXJndW1lbnQ7XG5cdFx0cmV0dXJuIG1hcmtGdW5jdGlvbiggZnVuY3Rpb24oIHNlZWQsIG1hdGNoZXMgKSB7XG5cdFx0XHR2YXIgaixcblx0XHRcdFx0bWF0Y2hJbmRleGVzID0gZm4oIFtdLCBzZWVkLmxlbmd0aCwgYXJndW1lbnQgKSxcblx0XHRcdFx0aSA9IG1hdGNoSW5kZXhlcy5sZW5ndGg7XG5cblx0XHRcdC8vIE1hdGNoIGVsZW1lbnRzIGZvdW5kIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXhlc1xuXHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdGlmICggc2VlZFsgKCBqID0gbWF0Y2hJbmRleGVzWyBpIF0gKSBdICkge1xuXHRcdFx0XHRcdHNlZWRbIGogXSA9ICEoIG1hdGNoZXNbIGogXSA9IHNlZWRbIGogXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9ICk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGEgbm9kZSBmb3IgdmFsaWRpdHkgYXMgYSBTaXp6bGUgY29udGV4dFxuICogQHBhcmFtIHtFbGVtZW50fE9iamVjdD19IGNvbnRleHRcbiAqIEByZXR1cm5zIHtFbGVtZW50fE9iamVjdHxCb29sZWFufSBUaGUgaW5wdXQgbm9kZSBpZiBhY2NlcHRhYmxlLCBvdGhlcndpc2UgYSBmYWxzeSB2YWx1ZVxuICovXG5mdW5jdGlvbiB0ZXN0Q29udGV4dCggY29udGV4dCApIHtcblx0cmV0dXJuIGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29udGV4dDtcbn1cblxuLy8gRXhwb3NlIHN1cHBvcnQgdmFycyBmb3IgY29udmVuaWVuY2VcbnN1cHBvcnQgPSBTaXp6bGUuc3VwcG9ydCA9IHt9O1xuXG4vKipcbiAqIERldGVjdHMgWE1MIG5vZGVzXG4gKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0fSBlbGVtIEFuIGVsZW1lbnQgb3IgYSBkb2N1bWVudFxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWZmIGVsZW0gaXMgYSBub24tSFRNTCBYTUwgbm9kZVxuICovXG5pc1hNTCA9IFNpenpsZS5pc1hNTCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHR2YXIgbmFtZXNwYWNlID0gZWxlbSAmJiBlbGVtLm5hbWVzcGFjZVVSSSxcblx0XHRkb2NFbGVtID0gZWxlbSAmJiAoIGVsZW0ub3duZXJEb2N1bWVudCB8fCBlbGVtICkuZG9jdW1lbnRFbGVtZW50O1xuXG5cdC8vIFN1cHBvcnQ6IElFIDw9OFxuXHQvLyBBc3N1bWUgSFRNTCB3aGVuIGRvY3VtZW50RWxlbWVudCBkb2Vzbid0IHlldCBleGlzdCwgc3VjaCBhcyBpbnNpZGUgbG9hZGluZyBpZnJhbWVzXG5cdC8vIGh0dHBzOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC80ODMzXG5cdHJldHVybiAhcmh0bWwudGVzdCggbmFtZXNwYWNlIHx8IGRvY0VsZW0gJiYgZG9jRWxlbS5ub2RlTmFtZSB8fCBcIkhUTUxcIiApO1xufTtcblxuLyoqXG4gKiBTZXRzIGRvY3VtZW50LXJlbGF0ZWQgdmFyaWFibGVzIG9uY2UgYmFzZWQgb24gdGhlIGN1cnJlbnQgZG9jdW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3R9IFtkb2NdIEFuIGVsZW1lbnQgb3IgZG9jdW1lbnQgb2JqZWN0IHRvIHVzZSB0byBzZXQgdGhlIGRvY3VtZW50XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjdXJyZW50IGRvY3VtZW50XG4gKi9cbnNldERvY3VtZW50ID0gU2l6emxlLnNldERvY3VtZW50ID0gZnVuY3Rpb24oIG5vZGUgKSB7XG5cdHZhciBoYXNDb21wYXJlLCBzdWJXaW5kb3csXG5cdFx0ZG9jID0gbm9kZSA/IG5vZGUub3duZXJEb2N1bWVudCB8fCBub2RlIDogcHJlZmVycmVkRG9jO1xuXG5cdC8vIFJldHVybiBlYXJseSBpZiBkb2MgaXMgaW52YWxpZCBvciBhbHJlYWR5IHNlbGVjdGVkXG5cdC8vIFN1cHBvcnQ6IElFIDExKywgRWRnZSAxNyAtIDE4K1xuXHQvLyBJRS9FZGdlIHNvbWV0aW1lcyB0aHJvdyBhIFwiUGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvciB3aGVuIHN0cmljdC1jb21wYXJpbmdcblx0Ly8gdHdvIGRvY3VtZW50czsgc2hhbGxvdyBjb21wYXJpc29ucyB3b3JrLlxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG5cdGlmICggZG9jID09IGRvY3VtZW50IHx8IGRvYy5ub2RlVHlwZSAhPT0gOSB8fCAhZG9jLmRvY3VtZW50RWxlbWVudCApIHtcblx0XHRyZXR1cm4gZG9jdW1lbnQ7XG5cdH1cblxuXHQvLyBVcGRhdGUgZ2xvYmFsIHZhcmlhYmxlc1xuXHRkb2N1bWVudCA9IGRvYztcblx0ZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblx0ZG9jdW1lbnRJc0hUTUwgPSAhaXNYTUwoIGRvY3VtZW50ICk7XG5cblx0Ly8gU3VwcG9ydDogSUUgOSAtIDExKywgRWRnZSAxMiAtIDE4K1xuXHQvLyBBY2Nlc3NpbmcgaWZyYW1lIGRvY3VtZW50cyBhZnRlciB1bmxvYWQgdGhyb3dzIFwicGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvcnMgKGpRdWVyeSAjMTM5MzYpXG5cdC8vIFN1cHBvcnQ6IElFIDExKywgRWRnZSAxNyAtIDE4K1xuXHQvLyBJRS9FZGdlIHNvbWV0aW1lcyB0aHJvdyBhIFwiUGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvciB3aGVuIHN0cmljdC1jb21wYXJpbmdcblx0Ly8gdHdvIGRvY3VtZW50czsgc2hhbGxvdyBjb21wYXJpc29ucyB3b3JrLlxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG5cdGlmICggcHJlZmVycmVkRG9jICE9IGRvY3VtZW50ICYmXG5cdFx0KCBzdWJXaW5kb3cgPSBkb2N1bWVudC5kZWZhdWx0VmlldyApICYmIHN1YldpbmRvdy50b3AgIT09IHN1YldpbmRvdyApIHtcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDExLCBFZGdlXG5cdFx0aWYgKCBzdWJXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lciApIHtcblx0XHRcdHN1YldpbmRvdy5hZGRFdmVudExpc3RlbmVyKCBcInVubG9hZFwiLCB1bmxvYWRIYW5kbGVyLCBmYWxzZSApO1xuXG5cdFx0Ly8gU3VwcG9ydDogSUUgOSAtIDEwIG9ubHlcblx0XHR9IGVsc2UgaWYgKCBzdWJXaW5kb3cuYXR0YWNoRXZlbnQgKSB7XG5cdFx0XHRzdWJXaW5kb3cuYXR0YWNoRXZlbnQoIFwib251bmxvYWRcIiwgdW5sb2FkSGFuZGxlciApO1xuXHRcdH1cblx0fVxuXG5cdC8vIFN1cHBvcnQ6IElFIDggLSAxMSssIEVkZ2UgMTIgLSAxOCssIENocm9tZSA8PTE2IC0gMjUgb25seSwgRmlyZWZveCA8PTMuNiAtIDMxIG9ubHksXG5cdC8vIFNhZmFyaSA0IC0gNSBvbmx5LCBPcGVyYSA8PTExLjYgLSAxMi54IG9ubHlcblx0Ly8gSUUvRWRnZSAmIG9sZGVyIGJyb3dzZXJzIGRvbid0IHN1cHBvcnQgdGhlIDpzY29wZSBwc2V1ZG8tY2xhc3MuXG5cdC8vIFN1cHBvcnQ6IFNhZmFyaSA2LjAgb25seVxuXHQvLyBTYWZhcmkgNi4wIHN1cHBvcnRzIDpzY29wZSBidXQgaXQncyBhbiBhbGlhcyBvZiA6cm9vdCB0aGVyZS5cblx0c3VwcG9ydC5zY29wZSA9IGFzc2VydCggZnVuY3Rpb24oIGVsICkge1xuXHRcdGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGVsICkuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKSApO1xuXHRcdHJldHVybiB0eXBlb2YgZWwucXVlcnlTZWxlY3RvckFsbCAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuXHRcdFx0IWVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiOnNjb3BlIGZpZWxkc2V0IGRpdlwiICkubGVuZ3RoO1xuXHR9ICk7XG5cblx0LyogQXR0cmlidXRlc1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gU3VwcG9ydDogSUU8OFxuXHQvLyBWZXJpZnkgdGhhdCBnZXRBdHRyaWJ1dGUgcmVhbGx5IHJldHVybnMgYXR0cmlidXRlcyBhbmQgbm90IHByb3BlcnRpZXNcblx0Ly8gKGV4Y2VwdGluZyBJRTggYm9vbGVhbnMpXG5cdHN1cHBvcnQuYXR0cmlidXRlcyA9IGFzc2VydCggZnVuY3Rpb24oIGVsICkge1xuXHRcdGVsLmNsYXNzTmFtZSA9IFwiaVwiO1xuXHRcdHJldHVybiAhZWwuZ2V0QXR0cmlidXRlKCBcImNsYXNzTmFtZVwiICk7XG5cdH0gKTtcblxuXHQvKiBnZXRFbGVtZW50KHMpQnkqXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXHQvLyBDaGVjayBpZiBnZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIikgcmV0dXJucyBvbmx5IGVsZW1lbnRzXG5cdHN1cHBvcnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgPSBhc3NlcnQoIGZ1bmN0aW9uKCBlbCApIHtcblx0XHRlbC5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlQ29tbWVudCggXCJcIiApICk7XG5cdFx0cmV0dXJuICFlbC5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCIqXCIgKS5sZW5ndGg7XG5cdH0gKTtcblxuXHQvLyBTdXBwb3J0OiBJRTw5XG5cdHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSA9IHJuYXRpdmUudGVzdCggZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSApO1xuXG5cdC8vIFN1cHBvcnQ6IElFPDEwXG5cdC8vIENoZWNrIGlmIGdldEVsZW1lbnRCeUlkIHJldHVybnMgZWxlbWVudHMgYnkgbmFtZVxuXHQvLyBUaGUgYnJva2VuIGdldEVsZW1lbnRCeUlkIG1ldGhvZHMgZG9uJ3QgcGljayB1cCBwcm9ncmFtbWF0aWNhbGx5LXNldCBuYW1lcyxcblx0Ly8gc28gdXNlIGEgcm91bmRhYm91dCBnZXRFbGVtZW50c0J5TmFtZSB0ZXN0XG5cdHN1cHBvcnQuZ2V0QnlJZCA9IGFzc2VydCggZnVuY3Rpb24oIGVsICkge1xuXHRcdGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGVsICkuaWQgPSBleHBhbmRvO1xuXHRcdHJldHVybiAhZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUgfHwgIWRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCBleHBhbmRvICkubGVuZ3RoO1xuXHR9ICk7XG5cblx0Ly8gSUQgZmlsdGVyIGFuZCBmaW5kXG5cdGlmICggc3VwcG9ydC5nZXRCeUlkICkge1xuXHRcdEV4cHIuZmlsdGVyWyBcIklEXCIgXSA9IGZ1bmN0aW9uKCBpZCApIHtcblx0XHRcdHZhciBhdHRySWQgPSBpZC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoIFwiaWRcIiApID09PSBhdHRySWQ7XG5cdFx0XHR9O1xuXHRcdH07XG5cdFx0RXhwci5maW5kWyBcIklEXCIgXSA9IGZ1bmN0aW9uKCBpZCwgY29udGV4dCApIHtcblx0XHRcdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnRJc0hUTUwgKSB7XG5cdFx0XHRcdHZhciBlbGVtID0gY29udGV4dC5nZXRFbGVtZW50QnlJZCggaWQgKTtcblx0XHRcdFx0cmV0dXJuIGVsZW0gPyBbIGVsZW0gXSA6IFtdO1xuXHRcdFx0fVxuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0RXhwci5maWx0ZXJbIFwiSURcIiBdID0gIGZ1bmN0aW9uKCBpZCApIHtcblx0XHRcdHZhciBhdHRySWQgPSBpZC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHR2YXIgbm9kZSA9IHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZU5vZGUgIT09IFwidW5kZWZpbmVkXCIgJiZcblx0XHRcdFx0XHRlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIFwiaWRcIiApO1xuXHRcdFx0XHRyZXR1cm4gbm9kZSAmJiBub2RlLnZhbHVlID09PSBhdHRySWQ7XG5cdFx0XHR9O1xuXHRcdH07XG5cblx0XHQvLyBTdXBwb3J0OiBJRSA2IC0gNyBvbmx5XG5cdFx0Ly8gZ2V0RWxlbWVudEJ5SWQgaXMgbm90IHJlbGlhYmxlIGFzIGEgZmluZCBzaG9ydGN1dFxuXHRcdEV4cHIuZmluZFsgXCJJRFwiIF0gPSBmdW5jdGlvbiggaWQsIGNvbnRleHQgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRCeUlkICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50SXNIVE1MICkge1xuXHRcdFx0XHR2YXIgbm9kZSwgaSwgZWxlbXMsXG5cdFx0XHRcdFx0ZWxlbSA9IGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIGlkICk7XG5cblx0XHRcdFx0aWYgKCBlbGVtICkge1xuXG5cdFx0XHRcdFx0Ly8gVmVyaWZ5IHRoZSBpZCBhdHRyaWJ1dGVcblx0XHRcdFx0XHRub2RlID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKCBcImlkXCIgKTtcblx0XHRcdFx0XHRpZiAoIG5vZGUgJiYgbm9kZS52YWx1ZSA9PT0gaWQgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gWyBlbGVtIF07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gRmFsbCBiYWNrIG9uIGdldEVsZW1lbnRzQnlOYW1lXG5cdFx0XHRcdFx0ZWxlbXMgPSBjb250ZXh0LmdldEVsZW1lbnRzQnlOYW1lKCBpZCApO1xuXHRcdFx0XHRcdGkgPSAwO1xuXHRcdFx0XHRcdHdoaWxlICggKCBlbGVtID0gZWxlbXNbIGkrKyBdICkgKSB7XG5cdFx0XHRcdFx0XHRub2RlID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKCBcImlkXCIgKTtcblx0XHRcdFx0XHRcdGlmICggbm9kZSAmJiBub2RlLnZhbHVlID09PSBpZCApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFsgZWxlbSBdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG5cblx0Ly8gVGFnXG5cdEV4cHIuZmluZFsgXCJUQUdcIiBdID0gc3VwcG9ydC5nZXRFbGVtZW50c0J5VGFnTmFtZSA/XG5cdFx0ZnVuY3Rpb24oIHRhZywgY29udGV4dCApIHtcblx0XHRcdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IFwidW5kZWZpbmVkXCIgKSB7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgKTtcblxuXHRcdFx0Ly8gRG9jdW1lbnRGcmFnbWVudCBub2RlcyBkb24ndCBoYXZlIGdFQlROXG5cdFx0XHR9IGVsc2UgaWYgKCBzdXBwb3J0LnFzYSApIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQucXVlcnlTZWxlY3RvckFsbCggdGFnICk7XG5cdFx0XHR9XG5cdFx0fSA6XG5cblx0XHRmdW5jdGlvbiggdGFnLCBjb250ZXh0ICkge1xuXHRcdFx0dmFyIGVsZW0sXG5cdFx0XHRcdHRtcCA9IFtdLFxuXHRcdFx0XHRpID0gMCxcblxuXHRcdFx0XHQvLyBCeSBoYXBweSBjb2luY2lkZW5jZSwgYSAoYnJva2VuKSBnRUJUTiBhcHBlYXJzIG9uIERvY3VtZW50RnJhZ21lbnQgbm9kZXMgdG9vXG5cdFx0XHRcdHJlc3VsdHMgPSBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgKTtcblxuXHRcdFx0Ly8gRmlsdGVyIG91dCBwb3NzaWJsZSBjb21tZW50c1xuXHRcdFx0aWYgKCB0YWcgPT09IFwiKlwiICkge1xuXHRcdFx0XHR3aGlsZSAoICggZWxlbSA9IHJlc3VsdHNbIGkrKyBdICkgKSB7XG5cdFx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRcdFx0dG1wLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdG1wO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0fTtcblxuXHQvLyBDbGFzc1xuXHRFeHByLmZpbmRbIFwiQ0xBU1NcIiBdID0gc3VwcG9ydC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICYmIGZ1bmN0aW9uKCBjbGFzc05hbWUsIGNvbnRleHQgKSB7XG5cdFx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50SXNIVE1MICkge1xuXHRcdFx0cmV0dXJuIGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggY2xhc3NOYW1lICk7XG5cdFx0fVxuXHR9O1xuXG5cdC8qIFFTQS9tYXRjaGVzU2VsZWN0b3Jcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8vIFFTQSBhbmQgbWF0Y2hlc1NlbGVjdG9yIHN1cHBvcnRcblxuXHQvLyBtYXRjaGVzU2VsZWN0b3IoOmFjdGl2ZSkgcmVwb3J0cyBmYWxzZSB3aGVuIHRydWUgKElFOS9PcGVyYSAxMS41KVxuXHRyYnVnZ3lNYXRjaGVzID0gW107XG5cblx0Ly8gcVNhKDpmb2N1cykgcmVwb3J0cyBmYWxzZSB3aGVuIHRydWUgKENocm9tZSAyMSlcblx0Ly8gV2UgYWxsb3cgdGhpcyBiZWNhdXNlIG9mIGEgYnVnIGluIElFOC85IHRoYXQgdGhyb3dzIGFuIGVycm9yXG5cdC8vIHdoZW5ldmVyIGBkb2N1bWVudC5hY3RpdmVFbGVtZW50YCBpcyBhY2Nlc3NlZCBvbiBhbiBpZnJhbWVcblx0Ly8gU28sIHdlIGFsbG93IDpmb2N1cyB0byBwYXNzIHRocm91Z2ggUVNBIGFsbCB0aGUgdGltZSB0byBhdm9pZCB0aGUgSUUgZXJyb3Jcblx0Ly8gU2VlIGh0dHBzOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMzM3OFxuXHRyYnVnZ3lRU0EgPSBbXTtcblxuXHRpZiAoICggc3VwcG9ydC5xc2EgPSBybmF0aXZlLnRlc3QoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwgKSApICkge1xuXG5cdFx0Ly8gQnVpbGQgUVNBIHJlZ2V4XG5cdFx0Ly8gUmVnZXggc3RyYXRlZ3kgYWRvcHRlZCBmcm9tIERpZWdvIFBlcmluaVxuXHRcdGFzc2VydCggZnVuY3Rpb24oIGVsICkge1xuXG5cdFx0XHR2YXIgaW5wdXQ7XG5cblx0XHRcdC8vIFNlbGVjdCBpcyBzZXQgdG8gZW1wdHkgc3RyaW5nIG9uIHB1cnBvc2Vcblx0XHRcdC8vIFRoaXMgaXMgdG8gdGVzdCBJRSdzIHRyZWF0bWVudCBvZiBub3QgZXhwbGljaXRseVxuXHRcdFx0Ly8gc2V0dGluZyBhIGJvb2xlYW4gY29udGVudCBhdHRyaWJ1dGUsXG5cdFx0XHQvLyBzaW5jZSBpdHMgcHJlc2VuY2Ugc2hvdWxkIGJlIGVub3VnaFxuXHRcdFx0Ly8gaHR0cHM6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzEyMzU5XG5cdFx0XHRkb2NFbGVtLmFwcGVuZENoaWxkKCBlbCApLmlubmVySFRNTCA9IFwiPGEgaWQ9J1wiICsgZXhwYW5kbyArIFwiJz48L2E+XCIgK1xuXHRcdFx0XHRcIjxzZWxlY3QgaWQ9J1wiICsgZXhwYW5kbyArIFwiLVxcclxcXFwnIG1zYWxsb3djYXB0dXJlPScnPlwiICtcblx0XHRcdFx0XCI8b3B0aW9uIHNlbGVjdGVkPScnPjwvb3B0aW9uPjwvc2VsZWN0PlwiO1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRTgsIE9wZXJhIDExLTEyLjE2XG5cdFx0XHQvLyBOb3RoaW5nIHNob3VsZCBiZSBzZWxlY3RlZCB3aGVuIGVtcHR5IHN0cmluZ3MgZm9sbG93IF49IG9yICQ9IG9yICo9XG5cdFx0XHQvLyBUaGUgdGVzdCBhdHRyaWJ1dGUgbXVzdCBiZSB1bmtub3duIGluIE9wZXJhIGJ1dCBcInNhZmVcIiBmb3IgV2luUlRcblx0XHRcdC8vIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvaGg0NjUzODguYXNweCNhdHRyaWJ1dGVfc2VjdGlvblxuXHRcdFx0aWYgKCBlbC5xdWVyeVNlbGVjdG9yQWxsKCBcIlttc2FsbG93Y2FwdHVyZV49JyddXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIlsqXiRdPVwiICsgd2hpdGVzcGFjZSArIFwiKig/OicnfFxcXCJcXFwiKVwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFOFxuXHRcdFx0Ly8gQm9vbGVhbiBhdHRyaWJ1dGVzIGFuZCBcInZhbHVlXCIgYXJlIG5vdCB0cmVhdGVkIGNvcnJlY3RseVxuXHRcdFx0aWYgKCAhZWwucXVlcnlTZWxlY3RvckFsbCggXCJbc2VsZWN0ZWRdXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIlxcXFxbXCIgKyB3aGl0ZXNwYWNlICsgXCIqKD86dmFsdWV8XCIgKyBib29sZWFucyArIFwiKVwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IENocm9tZTwyOSwgQW5kcm9pZDw0LjQsIFNhZmFyaTw3LjArLCBpT1M8Ny4wKywgUGhhbnRvbUpTPDEuOS44K1xuXHRcdFx0aWYgKCAhZWwucXVlcnlTZWxlY3RvckFsbCggXCJbaWR+PVwiICsgZXhwYW5kbyArIFwiLV1cIiApLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwifj1cIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTUgLSAxOCtcblx0XHRcdC8vIElFIDExL0VkZ2UgZG9uJ3QgZmluZCBlbGVtZW50cyBvbiBhIGBbbmFtZT0nJ11gIHF1ZXJ5IGluIHNvbWUgY2FzZXMuXG5cdFx0XHQvLyBBZGRpbmcgYSB0ZW1wb3JhcnkgYXR0cmlidXRlIHRvIHRoZSBkb2N1bWVudCBiZWZvcmUgdGhlIHNlbGVjdGlvbiB3b3Jrc1xuXHRcdFx0Ly8gYXJvdW5kIHRoZSBpc3N1ZS5cblx0XHRcdC8vIEludGVyZXN0aW5nbHksIElFIDEwICYgb2xkZXIgZG9uJ3Qgc2VlbSB0byBoYXZlIHRoZSBpc3N1ZS5cblx0XHRcdGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJpbnB1dFwiICk7XG5cdFx0XHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwibmFtZVwiLCBcIlwiICk7XG5cdFx0XHRlbC5hcHBlbmRDaGlsZCggaW5wdXQgKTtcblx0XHRcdGlmICggIWVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiW25hbWU9JyddXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIlxcXFxbXCIgKyB3aGl0ZXNwYWNlICsgXCIqbmFtZVwiICsgd2hpdGVzcGFjZSArIFwiKj1cIiArXG5cdFx0XHRcdFx0d2hpdGVzcGFjZSArIFwiKig/OicnfFxcXCJcXFwiKVwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFdlYmtpdC9PcGVyYSAtIDpjaGVja2VkIHNob3VsZCByZXR1cm4gc2VsZWN0ZWQgb3B0aW9uIGVsZW1lbnRzXG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1JFQy1jc3MzLXNlbGVjdG9ycy0yMDExMDkyOS8jY2hlY2tlZFxuXHRcdFx0Ly8gSUU4IHRocm93cyBlcnJvciBoZXJlIGFuZCB3aWxsIG5vdCBzZWUgbGF0ZXIgdGVzdHNcblx0XHRcdGlmICggIWVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiOmNoZWNrZWRcIiApLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiOmNoZWNrZWRcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBTYWZhcmkgOCssIGlPUyA4K1xuXHRcdFx0Ly8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTEzNjg1MVxuXHRcdFx0Ly8gSW4tcGFnZSBgc2VsZWN0b3IjaWQgc2libGluZy1jb21iaW5hdG9yIHNlbGVjdG9yYCBmYWlsc1xuXHRcdFx0aWYgKCAhZWwucXVlcnlTZWxlY3RvckFsbCggXCJhI1wiICsgZXhwYW5kbyArIFwiKypcIiApLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiLiMuK1srfl1cIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBGaXJlZm94IDw9My42IC0gNSBvbmx5XG5cdFx0XHQvLyBPbGQgRmlyZWZveCBkb2Vzbid0IHRocm93IG9uIGEgYmFkbHktZXNjYXBlZCBpZGVudGlmaWVyLlxuXHRcdFx0ZWwucXVlcnlTZWxlY3RvckFsbCggXCJcXFxcXFxmXCIgKTtcblx0XHRcdHJidWdneVFTQS5wdXNoKCBcIltcXFxcclxcXFxuXFxcXGZdXCIgKTtcblx0XHR9ICk7XG5cblx0XHRhc3NlcnQoIGZ1bmN0aW9uKCBlbCApIHtcblx0XHRcdGVsLmlubmVySFRNTCA9IFwiPGEgaHJlZj0nJyBkaXNhYmxlZD0nZGlzYWJsZWQnPjwvYT5cIiArXG5cdFx0XHRcdFwiPHNlbGVjdCBkaXNhYmxlZD0nZGlzYWJsZWQnPjxvcHRpb24vPjwvc2VsZWN0PlwiO1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBXaW5kb3dzIDggTmF0aXZlIEFwcHNcblx0XHRcdC8vIFRoZSB0eXBlIGFuZCBuYW1lIGF0dHJpYnV0ZXMgYXJlIHJlc3RyaWN0ZWQgZHVyaW5nIC5pbm5lckhUTUwgYXNzaWdubWVudFxuXHRcdFx0dmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJpbnB1dFwiICk7XG5cdFx0XHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCBcImhpZGRlblwiICk7XG5cdFx0XHRlbC5hcHBlbmRDaGlsZCggaW5wdXQgKS5zZXRBdHRyaWJ1dGUoIFwibmFtZVwiLCBcIkRcIiApO1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRThcblx0XHRcdC8vIEVuZm9yY2UgY2FzZS1zZW5zaXRpdml0eSBvZiBuYW1lIGF0dHJpYnV0ZVxuXHRcdFx0aWYgKCBlbC5xdWVyeVNlbGVjdG9yQWxsKCBcIltuYW1lPWRdXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIm5hbWVcIiArIHdoaXRlc3BhY2UgKyBcIipbKl4kfCF+XT89XCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRkYgMy41IC0gOmVuYWJsZWQvOmRpc2FibGVkIGFuZCBoaWRkZW4gZWxlbWVudHMgKGhpZGRlbiBlbGVtZW50cyBhcmUgc3RpbGwgZW5hYmxlZClcblx0XHRcdC8vIElFOCB0aHJvd3MgZXJyb3IgaGVyZSBhbmQgd2lsbCBub3Qgc2VlIGxhdGVyIHRlc3RzXG5cdFx0XHRpZiAoIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiOmVuYWJsZWRcIiApLmxlbmd0aCAhPT0gMiApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiOmVuYWJsZWRcIiwgXCI6ZGlzYWJsZWRcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRTktMTErXG5cdFx0XHQvLyBJRSdzIDpkaXNhYmxlZCBzZWxlY3RvciBkb2VzIG5vdCBwaWNrIHVwIHRoZSBjaGlsZHJlbiBvZiBkaXNhYmxlZCBmaWVsZHNldHNcblx0XHRcdGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGVsICkuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0aWYgKCBlbC5xdWVyeVNlbGVjdG9yQWxsKCBcIjpkaXNhYmxlZFwiICkubGVuZ3RoICE9PSAyICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCI6ZW5hYmxlZFwiLCBcIjpkaXNhYmxlZFwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IE9wZXJhIDEwIC0gMTEgb25seVxuXHRcdFx0Ly8gT3BlcmEgMTAtMTEgZG9lcyBub3QgdGhyb3cgb24gcG9zdC1jb21tYSBpbnZhbGlkIHBzZXVkb3Ncblx0XHRcdGVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiKiw6eFwiICk7XG5cdFx0XHRyYnVnZ3lRU0EucHVzaCggXCIsLio6XCIgKTtcblx0XHR9ICk7XG5cdH1cblxuXHRpZiAoICggc3VwcG9ydC5tYXRjaGVzU2VsZWN0b3IgPSBybmF0aXZlLnRlc3QoICggbWF0Y2hlcyA9IGRvY0VsZW0ubWF0Y2hlcyB8fFxuXHRcdGRvY0VsZW0ud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZG9jRWxlbS5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRkb2NFbGVtLm9NYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRkb2NFbGVtLm1zTWF0Y2hlc1NlbGVjdG9yICkgKSApICkge1xuXG5cdFx0YXNzZXJ0KCBmdW5jdGlvbiggZWwgKSB7XG5cblx0XHRcdC8vIENoZWNrIHRvIHNlZSBpZiBpdCdzIHBvc3NpYmxlIHRvIGRvIG1hdGNoZXNTZWxlY3RvclxuXHRcdFx0Ly8gb24gYSBkaXNjb25uZWN0ZWQgbm9kZSAoSUUgOSlcblx0XHRcdHN1cHBvcnQuZGlzY29ubmVjdGVkTWF0Y2ggPSBtYXRjaGVzLmNhbGwoIGVsLCBcIipcIiApO1xuXG5cdFx0XHQvLyBUaGlzIHNob3VsZCBmYWlsIHdpdGggYW4gZXhjZXB0aW9uXG5cdFx0XHQvLyBHZWNrbyBkb2VzIG5vdCBlcnJvciwgcmV0dXJucyBmYWxzZSBpbnN0ZWFkXG5cdFx0XHRtYXRjaGVzLmNhbGwoIGVsLCBcIltzIT0nJ106eFwiICk7XG5cdFx0XHRyYnVnZ3lNYXRjaGVzLnB1c2goIFwiIT1cIiwgcHNldWRvcyApO1xuXHRcdH0gKTtcblx0fVxuXG5cdHJidWdneVFTQSA9IHJidWdneVFTQS5sZW5ndGggJiYgbmV3IFJlZ0V4cCggcmJ1Z2d5UVNBLmpvaW4oIFwifFwiICkgKTtcblx0cmJ1Z2d5TWF0Y2hlcyA9IHJidWdneU1hdGNoZXMubGVuZ3RoICYmIG5ldyBSZWdFeHAoIHJidWdneU1hdGNoZXMuam9pbiggXCJ8XCIgKSApO1xuXG5cdC8qIENvbnRhaW5zXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0aGFzQ29tcGFyZSA9IHJuYXRpdmUudGVzdCggZG9jRWxlbS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiApO1xuXG5cdC8vIEVsZW1lbnQgY29udGFpbnMgYW5vdGhlclxuXHQvLyBQdXJwb3NlZnVsbHkgc2VsZi1leGNsdXNpdmVcblx0Ly8gQXMgaW4sIGFuIGVsZW1lbnQgZG9lcyBub3QgY29udGFpbiBpdHNlbGZcblx0Y29udGFpbnMgPSBoYXNDb21wYXJlIHx8IHJuYXRpdmUudGVzdCggZG9jRWxlbS5jb250YWlucyApID9cblx0XHRmdW5jdGlvbiggYSwgYiApIHtcblx0XHRcdHZhciBhZG93biA9IGEubm9kZVR5cGUgPT09IDkgPyBhLmRvY3VtZW50RWxlbWVudCA6IGEsXG5cdFx0XHRcdGJ1cCA9IGIgJiYgYi5wYXJlbnROb2RlO1xuXHRcdFx0cmV0dXJuIGEgPT09IGJ1cCB8fCAhISggYnVwICYmIGJ1cC5ub2RlVHlwZSA9PT0gMSAmJiAoXG5cdFx0XHRcdGFkb3duLmNvbnRhaW5zID9cblx0XHRcdFx0XHRhZG93bi5jb250YWlucyggYnVwICkgOlxuXHRcdFx0XHRcdGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24gJiYgYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYnVwICkgJiAxNlxuXHRcdFx0KSApO1xuXHRcdH0gOlxuXHRcdGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdFx0aWYgKCBiICkge1xuXHRcdFx0XHR3aGlsZSAoICggYiA9IGIucGFyZW50Tm9kZSApICkge1xuXHRcdFx0XHRcdGlmICggYiA9PT0gYSApIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG5cblx0LyogU29ydGluZ1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gRG9jdW1lbnQgb3JkZXIgc29ydGluZ1xuXHRzb3J0T3JkZXIgPSBoYXNDb21wYXJlID9cblx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cblx0XHQvLyBGbGFnIGZvciBkdXBsaWNhdGUgcmVtb3ZhbFxuXHRcdGlmICggYSA9PT0gYiApIHtcblx0XHRcdGhhc0R1cGxpY2F0ZSA9IHRydWU7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHQvLyBTb3J0IG9uIG1ldGhvZCBleGlzdGVuY2UgaWYgb25seSBvbmUgaW5wdXQgaGFzIGNvbXBhcmVEb2N1bWVudFBvc2l0aW9uXG5cdFx0dmFyIGNvbXBhcmUgPSAhYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiAtICFiLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uO1xuXHRcdGlmICggY29tcGFyZSApIHtcblx0XHRcdHJldHVybiBjb21wYXJlO1xuXHRcdH1cblxuXHRcdC8vIENhbGN1bGF0ZSBwb3NpdGlvbiBpZiBib3RoIGlucHV0cyBiZWxvbmcgdG8gdGhlIHNhbWUgZG9jdW1lbnRcblx0XHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTcgLSAxOCtcblx0XHQvLyBJRS9FZGdlIHNvbWV0aW1lcyB0aHJvdyBhIFwiUGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvciB3aGVuIHN0cmljdC1jb21wYXJpbmdcblx0XHQvLyB0d28gZG9jdW1lbnRzOyBzaGFsbG93IGNvbXBhcmlzb25zIHdvcmsuXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXHRcdGNvbXBhcmUgPSAoIGEub3duZXJEb2N1bWVudCB8fCBhICkgPT0gKCBiLm93bmVyRG9jdW1lbnQgfHwgYiApID9cblx0XHRcdGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGIgKSA6XG5cblx0XHRcdC8vIE90aGVyd2lzZSB3ZSBrbm93IHRoZXkgYXJlIGRpc2Nvbm5lY3RlZFxuXHRcdFx0MTtcblxuXHRcdC8vIERpc2Nvbm5lY3RlZCBub2Rlc1xuXHRcdGlmICggY29tcGFyZSAmIDEgfHxcblx0XHRcdCggIXN1cHBvcnQuc29ydERldGFjaGVkICYmIGIuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGEgKSA9PT0gY29tcGFyZSApICkge1xuXG5cdFx0XHQvLyBDaG9vc2UgdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBpcyByZWxhdGVkIHRvIG91ciBwcmVmZXJyZWQgZG9jdW1lbnRcblx0XHRcdC8vIFN1cHBvcnQ6IElFIDExKywgRWRnZSAxNyAtIDE4K1xuXHRcdFx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdFx0XHQvLyB0d28gZG9jdW1lbnRzOyBzaGFsbG93IGNvbXBhcmlzb25zIHdvcmsuXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG5cdFx0XHRpZiAoIGEgPT0gZG9jdW1lbnQgfHwgYS5vd25lckRvY3VtZW50ID09IHByZWZlcnJlZERvYyAmJlxuXHRcdFx0XHRjb250YWlucyggcHJlZmVycmVkRG9jLCBhICkgKSB7XG5cdFx0XHRcdHJldHVybiAtMTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogSUUgMTErLCBFZGdlIDE3IC0gMTgrXG5cdFx0XHQvLyBJRS9FZGdlIHNvbWV0aW1lcyB0aHJvdyBhIFwiUGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvciB3aGVuIHN0cmljdC1jb21wYXJpbmdcblx0XHRcdC8vIHR3byBkb2N1bWVudHM7IHNoYWxsb3cgY29tcGFyaXNvbnMgd29yay5cblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcblx0XHRcdGlmICggYiA9PSBkb2N1bWVudCB8fCBiLm93bmVyRG9jdW1lbnQgPT0gcHJlZmVycmVkRG9jICYmXG5cdFx0XHRcdGNvbnRhaW5zKCBwcmVmZXJyZWREb2MsIGIgKSApIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE1haW50YWluIG9yaWdpbmFsIG9yZGVyXG5cdFx0XHRyZXR1cm4gc29ydElucHV0ID9cblx0XHRcdFx0KCBpbmRleE9mKCBzb3J0SW5wdXQsIGEgKSAtIGluZGV4T2YoIHNvcnRJbnB1dCwgYiApICkgOlxuXHRcdFx0XHQwO1xuXHRcdH1cblxuXHRcdHJldHVybiBjb21wYXJlICYgNCA/IC0xIDogMTtcblx0fSA6XG5cdGZ1bmN0aW9uKCBhLCBiICkge1xuXG5cdFx0Ly8gRXhpdCBlYXJseSBpZiB0aGUgbm9kZXMgYXJlIGlkZW50aWNhbFxuXHRcdGlmICggYSA9PT0gYiApIHtcblx0XHRcdGhhc0R1cGxpY2F0ZSA9IHRydWU7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHR2YXIgY3VyLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRhdXAgPSBhLnBhcmVudE5vZGUsXG5cdFx0XHRidXAgPSBiLnBhcmVudE5vZGUsXG5cdFx0XHRhcCA9IFsgYSBdLFxuXHRcdFx0YnAgPSBbIGIgXTtcblxuXHRcdC8vIFBhcmVudGxlc3Mgbm9kZXMgYXJlIGVpdGhlciBkb2N1bWVudHMgb3IgZGlzY29ubmVjdGVkXG5cdFx0aWYgKCAhYXVwIHx8ICFidXAgKSB7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFIDExKywgRWRnZSAxNyAtIDE4K1xuXHRcdFx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdFx0XHQvLyB0d28gZG9jdW1lbnRzOyBzaGFsbG93IGNvbXBhcmlzb25zIHdvcmsuXG5cdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBlcWVxZXEgKi9cblx0XHRcdHJldHVybiBhID09IGRvY3VtZW50ID8gLTEgOlxuXHRcdFx0XHRiID09IGRvY3VtZW50ID8gMSA6XG5cdFx0XHRcdC8qIGVzbGludC1lbmFibGUgZXFlcWVxICovXG5cdFx0XHRcdGF1cCA/IC0xIDpcblx0XHRcdFx0YnVwID8gMSA6XG5cdFx0XHRcdHNvcnRJbnB1dCA/XG5cdFx0XHRcdCggaW5kZXhPZiggc29ydElucHV0LCBhICkgLSBpbmRleE9mKCBzb3J0SW5wdXQsIGIgKSApIDpcblx0XHRcdFx0MDtcblxuXHRcdC8vIElmIHRoZSBub2RlcyBhcmUgc2libGluZ3MsIHdlIGNhbiBkbyBhIHF1aWNrIGNoZWNrXG5cdFx0fSBlbHNlIGlmICggYXVwID09PSBidXAgKSB7XG5cdFx0XHRyZXR1cm4gc2libGluZ0NoZWNrKCBhLCBiICk7XG5cdFx0fVxuXG5cdFx0Ly8gT3RoZXJ3aXNlIHdlIG5lZWQgZnVsbCBsaXN0cyBvZiB0aGVpciBhbmNlc3RvcnMgZm9yIGNvbXBhcmlzb25cblx0XHRjdXIgPSBhO1xuXHRcdHdoaWxlICggKCBjdXIgPSBjdXIucGFyZW50Tm9kZSApICkge1xuXHRcdFx0YXAudW5zaGlmdCggY3VyICk7XG5cdFx0fVxuXHRcdGN1ciA9IGI7XG5cdFx0d2hpbGUgKCAoIGN1ciA9IGN1ci5wYXJlbnROb2RlICkgKSB7XG5cdFx0XHRicC51bnNoaWZ0KCBjdXIgKTtcblx0XHR9XG5cblx0XHQvLyBXYWxrIGRvd24gdGhlIHRyZWUgbG9va2luZyBmb3IgYSBkaXNjcmVwYW5jeVxuXHRcdHdoaWxlICggYXBbIGkgXSA9PT0gYnBbIGkgXSApIHtcblx0XHRcdGkrKztcblx0XHR9XG5cblx0XHRyZXR1cm4gaSA/XG5cblx0XHRcdC8vIERvIGEgc2libGluZyBjaGVjayBpZiB0aGUgbm9kZXMgaGF2ZSBhIGNvbW1vbiBhbmNlc3RvclxuXHRcdFx0c2libGluZ0NoZWNrKCBhcFsgaSBdLCBicFsgaSBdICkgOlxuXG5cdFx0XHQvLyBPdGhlcndpc2Ugbm9kZXMgaW4gb3VyIGRvY3VtZW50IHNvcnQgZmlyc3Rcblx0XHRcdC8vIFN1cHBvcnQ6IElFIDExKywgRWRnZSAxNyAtIDE4K1xuXHRcdFx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdFx0XHQvLyB0d28gZG9jdW1lbnRzOyBzaGFsbG93IGNvbXBhcmlzb25zIHdvcmsuXG5cdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBlcWVxZXEgKi9cblx0XHRcdGFwWyBpIF0gPT0gcHJlZmVycmVkRG9jID8gLTEgOlxuXHRcdFx0YnBbIGkgXSA9PSBwcmVmZXJyZWREb2MgPyAxIDpcblx0XHRcdC8qIGVzbGludC1lbmFibGUgZXFlcWVxICovXG5cdFx0XHQwO1xuXHR9O1xuXG5cdHJldHVybiBkb2N1bWVudDtcbn07XG5cblNpenpsZS5tYXRjaGVzID0gZnVuY3Rpb24oIGV4cHIsIGVsZW1lbnRzICkge1xuXHRyZXR1cm4gU2l6emxlKCBleHByLCBudWxsLCBudWxsLCBlbGVtZW50cyApO1xufTtcblxuU2l6emxlLm1hdGNoZXNTZWxlY3RvciA9IGZ1bmN0aW9uKCBlbGVtLCBleHByICkge1xuXHRzZXREb2N1bWVudCggZWxlbSApO1xuXG5cdGlmICggc3VwcG9ydC5tYXRjaGVzU2VsZWN0b3IgJiYgZG9jdW1lbnRJc0hUTUwgJiZcblx0XHQhbm9ubmF0aXZlU2VsZWN0b3JDYWNoZVsgZXhwciArIFwiIFwiIF0gJiZcblx0XHQoICFyYnVnZ3lNYXRjaGVzIHx8ICFyYnVnZ3lNYXRjaGVzLnRlc3QoIGV4cHIgKSApICYmXG5cdFx0KCAhcmJ1Z2d5UVNBICAgICB8fCAhcmJ1Z2d5UVNBLnRlc3QoIGV4cHIgKSApICkge1xuXG5cdFx0dHJ5IHtcblx0XHRcdHZhciByZXQgPSBtYXRjaGVzLmNhbGwoIGVsZW0sIGV4cHIgKTtcblxuXHRcdFx0Ly8gSUUgOSdzIG1hdGNoZXNTZWxlY3RvciByZXR1cm5zIGZhbHNlIG9uIGRpc2Nvbm5lY3RlZCBub2Rlc1xuXHRcdFx0aWYgKCByZXQgfHwgc3VwcG9ydC5kaXNjb25uZWN0ZWRNYXRjaCB8fFxuXG5cdFx0XHRcdC8vIEFzIHdlbGwsIGRpc2Nvbm5lY3RlZCBub2RlcyBhcmUgc2FpZCB0byBiZSBpbiBhIGRvY3VtZW50XG5cdFx0XHRcdC8vIGZyYWdtZW50IGluIElFIDlcblx0XHRcdFx0ZWxlbS5kb2N1bWVudCAmJiBlbGVtLmRvY3VtZW50Lm5vZGVUeXBlICE9PSAxMSApIHtcblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH1cblx0XHR9IGNhdGNoICggZSApIHtcblx0XHRcdG5vbm5hdGl2ZVNlbGVjdG9yQ2FjaGUoIGV4cHIsIHRydWUgKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gU2l6emxlKCBleHByLCBkb2N1bWVudCwgbnVsbCwgWyBlbGVtIF0gKS5sZW5ndGggPiAwO1xufTtcblxuU2l6emxlLmNvbnRhaW5zID0gZnVuY3Rpb24oIGNvbnRleHQsIGVsZW0gKSB7XG5cblx0Ly8gU2V0IGRvY3VtZW50IHZhcnMgaWYgbmVlZGVkXG5cdC8vIFN1cHBvcnQ6IElFIDExKywgRWRnZSAxNyAtIDE4K1xuXHQvLyBJRS9FZGdlIHNvbWV0aW1lcyB0aHJvdyBhIFwiUGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvciB3aGVuIHN0cmljdC1jb21wYXJpbmdcblx0Ly8gdHdvIGRvY3VtZW50czsgc2hhbGxvdyBjb21wYXJpc29ucyB3b3JrLlxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG5cdGlmICggKCBjb250ZXh0Lm93bmVyRG9jdW1lbnQgfHwgY29udGV4dCApICE9IGRvY3VtZW50ICkge1xuXHRcdHNldERvY3VtZW50KCBjb250ZXh0ICk7XG5cdH1cblx0cmV0dXJuIGNvbnRhaW5zKCBjb250ZXh0LCBlbGVtICk7XG59O1xuXG5TaXp6bGUuYXR0ciA9IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuXG5cdC8vIFNldCBkb2N1bWVudCB2YXJzIGlmIG5lZWRlZFxuXHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTcgLSAxOCtcblx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdC8vIHR3byBkb2N1bWVudHM7IHNoYWxsb3cgY29tcGFyaXNvbnMgd29yay5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXHRpZiAoICggZWxlbS5vd25lckRvY3VtZW50IHx8IGVsZW0gKSAhPSBkb2N1bWVudCApIHtcblx0XHRzZXREb2N1bWVudCggZWxlbSApO1xuXHR9XG5cblx0dmFyIGZuID0gRXhwci5hdHRySGFuZGxlWyBuYW1lLnRvTG93ZXJDYXNlKCkgXSxcblxuXHRcdC8vIERvbid0IGdldCBmb29sZWQgYnkgT2JqZWN0LnByb3RvdHlwZSBwcm9wZXJ0aWVzIChqUXVlcnkgIzEzODA3KVxuXHRcdHZhbCA9IGZuICYmIGhhc093bi5jYWxsKCBFeHByLmF0dHJIYW5kbGUsIG5hbWUudG9Mb3dlckNhc2UoKSApID9cblx0XHRcdGZuKCBlbGVtLCBuYW1lLCAhZG9jdW1lbnRJc0hUTUwgKSA6XG5cdFx0XHR1bmRlZmluZWQ7XG5cblx0cmV0dXJuIHZhbCAhPT0gdW5kZWZpbmVkID9cblx0XHR2YWwgOlxuXHRcdHN1cHBvcnQuYXR0cmlidXRlcyB8fCAhZG9jdW1lbnRJc0hUTUwgP1xuXHRcdFx0ZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUgKSA6XG5cdFx0XHQoIHZhbCA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZSggbmFtZSApICkgJiYgdmFsLnNwZWNpZmllZCA/XG5cdFx0XHRcdHZhbC52YWx1ZSA6XG5cdFx0XHRcdG51bGw7XG59O1xuXG5TaXp6bGUuZXNjYXBlID0gZnVuY3Rpb24oIHNlbCApIHtcblx0cmV0dXJuICggc2VsICsgXCJcIiApLnJlcGxhY2UoIHJjc3Nlc2NhcGUsIGZjc3Nlc2NhcGUgKTtcbn07XG5cblNpenpsZS5lcnJvciA9IGZ1bmN0aW9uKCBtc2cgKSB7XG5cdHRocm93IG5ldyBFcnJvciggXCJTeW50YXggZXJyb3IsIHVucmVjb2duaXplZCBleHByZXNzaW9uOiBcIiArIG1zZyApO1xufTtcblxuLyoqXG4gKiBEb2N1bWVudCBzb3J0aW5nIGFuZCByZW1vdmluZyBkdXBsaWNhdGVzXG4gKiBAcGFyYW0ge0FycmF5TGlrZX0gcmVzdWx0c1xuICovXG5TaXp6bGUudW5pcXVlU29ydCA9IGZ1bmN0aW9uKCByZXN1bHRzICkge1xuXHR2YXIgZWxlbSxcblx0XHRkdXBsaWNhdGVzID0gW10sXG5cdFx0aiA9IDAsXG5cdFx0aSA9IDA7XG5cblx0Ly8gVW5sZXNzIHdlICprbm93KiB3ZSBjYW4gZGV0ZWN0IGR1cGxpY2F0ZXMsIGFzc3VtZSB0aGVpciBwcmVzZW5jZVxuXHRoYXNEdXBsaWNhdGUgPSAhc3VwcG9ydC5kZXRlY3REdXBsaWNhdGVzO1xuXHRzb3J0SW5wdXQgPSAhc3VwcG9ydC5zb3J0U3RhYmxlICYmIHJlc3VsdHMuc2xpY2UoIDAgKTtcblx0cmVzdWx0cy5zb3J0KCBzb3J0T3JkZXIgKTtcblxuXHRpZiAoIGhhc0R1cGxpY2F0ZSApIHtcblx0XHR3aGlsZSAoICggZWxlbSA9IHJlc3VsdHNbIGkrKyBdICkgKSB7XG5cdFx0XHRpZiAoIGVsZW0gPT09IHJlc3VsdHNbIGkgXSApIHtcblx0XHRcdFx0aiA9IGR1cGxpY2F0ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR3aGlsZSAoIGotLSApIHtcblx0XHRcdHJlc3VsdHMuc3BsaWNlKCBkdXBsaWNhdGVzWyBqIF0sIDEgKTtcblx0XHR9XG5cdH1cblxuXHQvLyBDbGVhciBpbnB1dCBhZnRlciBzb3J0aW5nIHRvIHJlbGVhc2Ugb2JqZWN0c1xuXHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9zaXp6bGUvcHVsbC8yMjVcblx0c29ydElucHV0ID0gbnVsbDtcblxuXHRyZXR1cm4gcmVzdWx0cztcbn07XG5cbi8qKlxuICogVXRpbGl0eSBmdW5jdGlvbiBmb3IgcmV0cmlldmluZyB0aGUgdGV4dCB2YWx1ZSBvZiBhbiBhcnJheSBvZiBET00gbm9kZXNcbiAqIEBwYXJhbSB7QXJyYXl8RWxlbWVudH0gZWxlbVxuICovXG5nZXRUZXh0ID0gU2l6emxlLmdldFRleHQgPSBmdW5jdGlvbiggZWxlbSApIHtcblx0dmFyIG5vZGUsXG5cdFx0cmV0ID0gXCJcIixcblx0XHRpID0gMCxcblx0XHRub2RlVHlwZSA9IGVsZW0ubm9kZVR5cGU7XG5cblx0aWYgKCAhbm9kZVR5cGUgKSB7XG5cblx0XHQvLyBJZiBubyBub2RlVHlwZSwgdGhpcyBpcyBleHBlY3RlZCB0byBiZSBhbiBhcnJheVxuXHRcdHdoaWxlICggKCBub2RlID0gZWxlbVsgaSsrIF0gKSApIHtcblxuXHRcdFx0Ly8gRG8gbm90IHRyYXZlcnNlIGNvbW1lbnQgbm9kZXNcblx0XHRcdHJldCArPSBnZXRUZXh0KCBub2RlICk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKCBub2RlVHlwZSA9PT0gMSB8fCBub2RlVHlwZSA9PT0gOSB8fCBub2RlVHlwZSA9PT0gMTEgKSB7XG5cblx0XHQvLyBVc2UgdGV4dENvbnRlbnQgZm9yIGVsZW1lbnRzXG5cdFx0Ly8gaW5uZXJUZXh0IHVzYWdlIHJlbW92ZWQgZm9yIGNvbnNpc3RlbmN5IG9mIG5ldyBsaW5lcyAoalF1ZXJ5ICMxMTE1Mylcblx0XHRpZiAoIHR5cGVvZiBlbGVtLnRleHRDb250ZW50ID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIGVsZW0udGV4dENvbnRlbnQ7XG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gVHJhdmVyc2UgaXRzIGNoaWxkcmVuXG5cdFx0XHRmb3IgKCBlbGVtID0gZWxlbS5maXJzdENoaWxkOyBlbGVtOyBlbGVtID0gZWxlbS5uZXh0U2libGluZyApIHtcblx0XHRcdFx0cmV0ICs9IGdldFRleHQoIGVsZW0gKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSBpZiAoIG5vZGVUeXBlID09PSAzIHx8IG5vZGVUeXBlID09PSA0ICkge1xuXHRcdHJldHVybiBlbGVtLm5vZGVWYWx1ZTtcblx0fVxuXG5cdC8vIERvIG5vdCBpbmNsdWRlIGNvbW1lbnQgb3IgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbiBub2Rlc1xuXG5cdHJldHVybiByZXQ7XG59O1xuXG5FeHByID0gU2l6emxlLnNlbGVjdG9ycyA9IHtcblxuXHQvLyBDYW4gYmUgYWRqdXN0ZWQgYnkgdGhlIHVzZXJcblx0Y2FjaGVMZW5ndGg6IDUwLFxuXG5cdGNyZWF0ZVBzZXVkbzogbWFya0Z1bmN0aW9uLFxuXG5cdG1hdGNoOiBtYXRjaEV4cHIsXG5cblx0YXR0ckhhbmRsZToge30sXG5cblx0ZmluZDoge30sXG5cblx0cmVsYXRpdmU6IHtcblx0XHRcIj5cIjogeyBkaXI6IFwicGFyZW50Tm9kZVwiLCBmaXJzdDogdHJ1ZSB9LFxuXHRcdFwiIFwiOiB7IGRpcjogXCJwYXJlbnROb2RlXCIgfSxcblx0XHRcIitcIjogeyBkaXI6IFwicHJldmlvdXNTaWJsaW5nXCIsIGZpcnN0OiB0cnVlIH0sXG5cdFx0XCJ+XCI6IHsgZGlyOiBcInByZXZpb3VzU2libGluZ1wiIH1cblx0fSxcblxuXHRwcmVGaWx0ZXI6IHtcblx0XHRcIkFUVFJcIjogZnVuY3Rpb24oIG1hdGNoICkge1xuXHRcdFx0bWF0Y2hbIDEgXSA9IG1hdGNoWyAxIF0ucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblxuXHRcdFx0Ly8gTW92ZSB0aGUgZ2l2ZW4gdmFsdWUgdG8gbWF0Y2hbM10gd2hldGhlciBxdW90ZWQgb3IgdW5xdW90ZWRcblx0XHRcdG1hdGNoWyAzIF0gPSAoIG1hdGNoWyAzIF0gfHwgbWF0Y2hbIDQgXSB8fFxuXHRcdFx0XHRtYXRjaFsgNSBdIHx8IFwiXCIgKS5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXG5cdFx0XHRpZiAoIG1hdGNoWyAyIF0gPT09IFwifj1cIiApIHtcblx0XHRcdFx0bWF0Y2hbIDMgXSA9IFwiIFwiICsgbWF0Y2hbIDMgXSArIFwiIFwiO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbWF0Y2guc2xpY2UoIDAsIDQgKTtcblx0XHR9LFxuXG5cdFx0XCJDSElMRFwiOiBmdW5jdGlvbiggbWF0Y2ggKSB7XG5cblx0XHRcdC8qIG1hdGNoZXMgZnJvbSBtYXRjaEV4cHJbXCJDSElMRFwiXVxuXHRcdFx0XHQxIHR5cGUgKG9ubHl8bnRofC4uLilcblx0XHRcdFx0MiB3aGF0IChjaGlsZHxvZi10eXBlKVxuXHRcdFx0XHQzIGFyZ3VtZW50IChldmVufG9kZHxcXGQqfFxcZCpuKFsrLV1cXGQrKT98Li4uKVxuXHRcdFx0XHQ0IHhuLWNvbXBvbmVudCBvZiB4bit5IGFyZ3VtZW50IChbKy1dP1xcZCpufClcblx0XHRcdFx0NSBzaWduIG9mIHhuLWNvbXBvbmVudFxuXHRcdFx0XHQ2IHggb2YgeG4tY29tcG9uZW50XG5cdFx0XHRcdDcgc2lnbiBvZiB5LWNvbXBvbmVudFxuXHRcdFx0XHQ4IHkgb2YgeS1jb21wb25lbnRcblx0XHRcdCovXG5cdFx0XHRtYXRjaFsgMSBdID0gbWF0Y2hbIDEgXS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0XHRpZiAoIG1hdGNoWyAxIF0uc2xpY2UoIDAsIDMgKSA9PT0gXCJudGhcIiApIHtcblxuXHRcdFx0XHQvLyBudGgtKiByZXF1aXJlcyBhcmd1bWVudFxuXHRcdFx0XHRpZiAoICFtYXRjaFsgMyBdICkge1xuXHRcdFx0XHRcdFNpenpsZS5lcnJvciggbWF0Y2hbIDAgXSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gbnVtZXJpYyB4IGFuZCB5IHBhcmFtZXRlcnMgZm9yIEV4cHIuZmlsdGVyLkNISUxEXG5cdFx0XHRcdC8vIHJlbWVtYmVyIHRoYXQgZmFsc2UvdHJ1ZSBjYXN0IHJlc3BlY3RpdmVseSB0byAwLzFcblx0XHRcdFx0bWF0Y2hbIDQgXSA9ICsoIG1hdGNoWyA0IF0gP1xuXHRcdFx0XHRcdG1hdGNoWyA1IF0gKyAoIG1hdGNoWyA2IF0gfHwgMSApIDpcblx0XHRcdFx0XHQyICogKCBtYXRjaFsgMyBdID09PSBcImV2ZW5cIiB8fCBtYXRjaFsgMyBdID09PSBcIm9kZFwiICkgKTtcblx0XHRcdFx0bWF0Y2hbIDUgXSA9ICsoICggbWF0Y2hbIDcgXSArIG1hdGNoWyA4IF0gKSB8fCBtYXRjaFsgMyBdID09PSBcIm9kZFwiICk7XG5cblx0XHRcdFx0Ly8gb3RoZXIgdHlwZXMgcHJvaGliaXQgYXJndW1lbnRzXG5cdFx0XHR9IGVsc2UgaWYgKCBtYXRjaFsgMyBdICkge1xuXHRcdFx0XHRTaXp6bGUuZXJyb3IoIG1hdGNoWyAwIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG1hdGNoO1xuXHRcdH0sXG5cblx0XHRcIlBTRVVET1wiOiBmdW5jdGlvbiggbWF0Y2ggKSB7XG5cdFx0XHR2YXIgZXhjZXNzLFxuXHRcdFx0XHR1bnF1b3RlZCA9ICFtYXRjaFsgNiBdICYmIG1hdGNoWyAyIF07XG5cblx0XHRcdGlmICggbWF0Y2hFeHByWyBcIkNISUxEXCIgXS50ZXN0KCBtYXRjaFsgMCBdICkgKSB7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBY2NlcHQgcXVvdGVkIGFyZ3VtZW50cyBhcy1pc1xuXHRcdFx0aWYgKCBtYXRjaFsgMyBdICkge1xuXHRcdFx0XHRtYXRjaFsgMiBdID0gbWF0Y2hbIDQgXSB8fCBtYXRjaFsgNSBdIHx8IFwiXCI7XG5cblx0XHRcdC8vIFN0cmlwIGV4Y2VzcyBjaGFyYWN0ZXJzIGZyb20gdW5xdW90ZWQgYXJndW1lbnRzXG5cdFx0XHR9IGVsc2UgaWYgKCB1bnF1b3RlZCAmJiBycHNldWRvLnRlc3QoIHVucXVvdGVkICkgJiZcblxuXHRcdFx0XHQvLyBHZXQgZXhjZXNzIGZyb20gdG9rZW5pemUgKHJlY3Vyc2l2ZWx5KVxuXHRcdFx0XHQoIGV4Y2VzcyA9IHRva2VuaXplKCB1bnF1b3RlZCwgdHJ1ZSApICkgJiZcblxuXHRcdFx0XHQvLyBhZHZhbmNlIHRvIHRoZSBuZXh0IGNsb3NpbmcgcGFyZW50aGVzaXNcblx0XHRcdFx0KCBleGNlc3MgPSB1bnF1b3RlZC5pbmRleE9mKCBcIilcIiwgdW5xdW90ZWQubGVuZ3RoIC0gZXhjZXNzICkgLSB1bnF1b3RlZC5sZW5ndGggKSApIHtcblxuXHRcdFx0XHQvLyBleGNlc3MgaXMgYSBuZWdhdGl2ZSBpbmRleFxuXHRcdFx0XHRtYXRjaFsgMCBdID0gbWF0Y2hbIDAgXS5zbGljZSggMCwgZXhjZXNzICk7XG5cdFx0XHRcdG1hdGNoWyAyIF0gPSB1bnF1b3RlZC5zbGljZSggMCwgZXhjZXNzICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJldHVybiBvbmx5IGNhcHR1cmVzIG5lZWRlZCBieSB0aGUgcHNldWRvIGZpbHRlciBtZXRob2QgKHR5cGUgYW5kIGFyZ3VtZW50KVxuXHRcdFx0cmV0dXJuIG1hdGNoLnNsaWNlKCAwLCAzICk7XG5cdFx0fVxuXHR9LFxuXG5cdGZpbHRlcjoge1xuXG5cdFx0XCJUQUdcIjogZnVuY3Rpb24oIG5vZGVOYW1lU2VsZWN0b3IgKSB7XG5cdFx0XHR2YXIgbm9kZU5hbWUgPSBub2RlTmFtZVNlbGVjdG9yLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICkudG9Mb3dlckNhc2UoKTtcblx0XHRcdHJldHVybiBub2RlTmFtZVNlbGVjdG9yID09PSBcIipcIiA/XG5cdFx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9IDpcblx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVsZW0ubm9kZU5hbWUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBub2RlTmFtZTtcblx0XHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0XCJDTEFTU1wiOiBmdW5jdGlvbiggY2xhc3NOYW1lICkge1xuXHRcdFx0dmFyIHBhdHRlcm4gPSBjbGFzc0NhY2hlWyBjbGFzc05hbWUgKyBcIiBcIiBdO1xuXG5cdFx0XHRyZXR1cm4gcGF0dGVybiB8fFxuXHRcdFx0XHQoIHBhdHRlcm4gPSBuZXcgUmVnRXhwKCBcIihefFwiICsgd2hpdGVzcGFjZSArXG5cdFx0XHRcdFx0XCIpXCIgKyBjbGFzc05hbWUgKyBcIihcIiArIHdoaXRlc3BhY2UgKyBcInwkKVwiICkgKSAmJiBjbGFzc0NhY2hlKFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHBhdHRlcm4udGVzdChcblx0XHRcdFx0XHRcdFx0XHR0eXBlb2YgZWxlbS5jbGFzc05hbWUgPT09IFwic3RyaW5nXCIgJiYgZWxlbS5jbGFzc05hbWUgfHxcblx0XHRcdFx0XHRcdFx0XHR0eXBlb2YgZWxlbS5nZXRBdHRyaWJ1dGUgIT09IFwidW5kZWZpbmVkXCIgJiZcblx0XHRcdFx0XHRcdFx0XHRcdGVsZW0uZ2V0QXR0cmlidXRlKCBcImNsYXNzXCIgKSB8fFxuXHRcdFx0XHRcdFx0XHRcdFwiXCJcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0fSApO1xuXHRcdH0sXG5cblx0XHRcIkFUVFJcIjogZnVuY3Rpb24oIG5hbWUsIG9wZXJhdG9yLCBjaGVjayApIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IFNpenpsZS5hdHRyKCBlbGVtLCBuYW1lICk7XG5cblx0XHRcdFx0aWYgKCByZXN1bHQgPT0gbnVsbCApIHtcblx0XHRcdFx0XHRyZXR1cm4gb3BlcmF0b3IgPT09IFwiIT1cIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoICFvcGVyYXRvciApIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlc3VsdCArPSBcIlwiO1xuXG5cdFx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cblxuXHRcdFx0XHRyZXR1cm4gb3BlcmF0b3IgPT09IFwiPVwiID8gcmVzdWx0ID09PSBjaGVjayA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwiIT1cIiA/IHJlc3VsdCAhPT0gY2hlY2sgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIl49XCIgPyBjaGVjayAmJiByZXN1bHQuaW5kZXhPZiggY2hlY2sgKSA9PT0gMCA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwiKj1cIiA/IGNoZWNrICYmIHJlc3VsdC5pbmRleE9mKCBjaGVjayApID4gLTEgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIiQ9XCIgPyBjaGVjayAmJiByZXN1bHQuc2xpY2UoIC1jaGVjay5sZW5ndGggKSA9PT0gY2hlY2sgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIn49XCIgPyAoIFwiIFwiICsgcmVzdWx0LnJlcGxhY2UoIHJ3aGl0ZXNwYWNlLCBcIiBcIiApICsgXCIgXCIgKS5pbmRleE9mKCBjaGVjayApID4gLTEgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcInw9XCIgPyByZXN1bHQgPT09IGNoZWNrIHx8IHJlc3VsdC5zbGljZSggMCwgY2hlY2subGVuZ3RoICsgMSApID09PSBjaGVjayArIFwiLVwiIDpcblx0XHRcdFx0XHRmYWxzZTtcblx0XHRcdFx0LyogZXNsaW50LWVuYWJsZSBtYXgtbGVuICovXG5cblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdFwiQ0hJTERcIjogZnVuY3Rpb24oIHR5cGUsIHdoYXQsIF9hcmd1bWVudCwgZmlyc3QsIGxhc3QgKSB7XG5cdFx0XHR2YXIgc2ltcGxlID0gdHlwZS5zbGljZSggMCwgMyApICE9PSBcIm50aFwiLFxuXHRcdFx0XHRmb3J3YXJkID0gdHlwZS5zbGljZSggLTQgKSAhPT0gXCJsYXN0XCIsXG5cdFx0XHRcdG9mVHlwZSA9IHdoYXQgPT09IFwib2YtdHlwZVwiO1xuXG5cdFx0XHRyZXR1cm4gZmlyc3QgPT09IDEgJiYgbGFzdCA9PT0gMCA/XG5cblx0XHRcdFx0Ly8gU2hvcnRjdXQgZm9yIDpudGgtKihuKVxuXHRcdFx0XHRmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0XHRyZXR1cm4gISFlbGVtLnBhcmVudE5vZGU7XG5cdFx0XHRcdH0gOlxuXG5cdFx0XHRcdGZ1bmN0aW9uKCBlbGVtLCBfY29udGV4dCwgeG1sICkge1xuXHRcdFx0XHRcdHZhciBjYWNoZSwgdW5pcXVlQ2FjaGUsIG91dGVyQ2FjaGUsIG5vZGUsIG5vZGVJbmRleCwgc3RhcnQsXG5cdFx0XHRcdFx0XHRkaXIgPSBzaW1wbGUgIT09IGZvcndhcmQgPyBcIm5leHRTaWJsaW5nXCIgOiBcInByZXZpb3VzU2libGluZ1wiLFxuXHRcdFx0XHRcdFx0cGFyZW50ID0gZWxlbS5wYXJlbnROb2RlLFxuXHRcdFx0XHRcdFx0bmFtZSA9IG9mVHlwZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCksXG5cdFx0XHRcdFx0XHR1c2VDYWNoZSA9ICF4bWwgJiYgIW9mVHlwZSxcblx0XHRcdFx0XHRcdGRpZmYgPSBmYWxzZTtcblxuXHRcdFx0XHRcdGlmICggcGFyZW50ICkge1xuXG5cdFx0XHRcdFx0XHQvLyA6KGZpcnN0fGxhc3R8b25seSktKGNoaWxkfG9mLXR5cGUpXG5cdFx0XHRcdFx0XHRpZiAoIHNpbXBsZSApIHtcblx0XHRcdFx0XHRcdFx0d2hpbGUgKCBkaXIgKSB7XG5cdFx0XHRcdFx0XHRcdFx0bm9kZSA9IGVsZW07XG5cdFx0XHRcdFx0XHRcdFx0d2hpbGUgKCAoIG5vZGUgPSBub2RlWyBkaXIgXSApICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBvZlR5cGUgP1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUgOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRub2RlLm5vZGVUeXBlID09PSAxICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBSZXZlcnNlIGRpcmVjdGlvbiBmb3IgOm9ubHktKiAoaWYgd2UgaGF2ZW4ndCB5ZXQgZG9uZSBzbylcblx0XHRcdFx0XHRcdFx0XHRzdGFydCA9IGRpciA9IHR5cGUgPT09IFwib25seVwiICYmICFzdGFydCAmJiBcIm5leHRTaWJsaW5nXCI7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHN0YXJ0ID0gWyBmb3J3YXJkID8gcGFyZW50LmZpcnN0Q2hpbGQgOiBwYXJlbnQubGFzdENoaWxkIF07XG5cblx0XHRcdFx0XHRcdC8vIG5vbi14bWwgOm50aC1jaGlsZCguLi4pIHN0b3JlcyBjYWNoZSBkYXRhIG9uIGBwYXJlbnRgXG5cdFx0XHRcdFx0XHRpZiAoIGZvcndhcmQgJiYgdXNlQ2FjaGUgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gU2VlayBgZWxlbWAgZnJvbSBhIHByZXZpb3VzbHktY2FjaGVkIGluZGV4XG5cblx0XHRcdFx0XHRcdFx0Ly8gLi4uaW4gYSBnemlwLWZyaWVuZGx5IHdheVxuXHRcdFx0XHRcdFx0XHRub2RlID0gcGFyZW50O1xuXHRcdFx0XHRcdFx0XHRvdXRlckNhY2hlID0gbm9kZVsgZXhwYW5kbyBdIHx8ICggbm9kZVsgZXhwYW5kbyBdID0ge30gKTtcblxuXHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8OSBvbmx5XG5cdFx0XHRcdFx0XHRcdC8vIERlZmVuZCBhZ2FpbnN0IGNsb25lZCBhdHRyb3BlcnRpZXMgKGpRdWVyeSBnaC0xNzA5KVxuXHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZSA9IG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSB8fFxuXHRcdFx0XHRcdFx0XHRcdCggb3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdID0ge30gKTtcblxuXHRcdFx0XHRcdFx0XHRjYWNoZSA9IHVuaXF1ZUNhY2hlWyB0eXBlIF0gfHwgW107XG5cdFx0XHRcdFx0XHRcdG5vZGVJbmRleCA9IGNhY2hlWyAwIF0gPT09IGRpcnJ1bnMgJiYgY2FjaGVbIDEgXTtcblx0XHRcdFx0XHRcdFx0ZGlmZiA9IG5vZGVJbmRleCAmJiBjYWNoZVsgMiBdO1xuXHRcdFx0XHRcdFx0XHRub2RlID0gbm9kZUluZGV4ICYmIHBhcmVudC5jaGlsZE5vZGVzWyBub2RlSW5kZXggXTtcblxuXHRcdFx0XHRcdFx0XHR3aGlsZSAoICggbm9kZSA9ICsrbm9kZUluZGV4ICYmIG5vZGUgJiYgbm9kZVsgZGlyIF0gfHxcblxuXHRcdFx0XHRcdFx0XHRcdC8vIEZhbGxiYWNrIHRvIHNlZWtpbmcgYGVsZW1gIGZyb20gdGhlIHN0YXJ0XG5cdFx0XHRcdFx0XHRcdFx0KCBkaWZmID0gbm9kZUluZGV4ID0gMCApIHx8IHN0YXJ0LnBvcCgpICkgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBXaGVuIGZvdW5kLCBjYWNoZSBpbmRleGVzIG9uIGBwYXJlbnRgIGFuZCBicmVha1xuXHRcdFx0XHRcdFx0XHRcdGlmICggbm9kZS5ub2RlVHlwZSA9PT0gMSAmJiArK2RpZmYgJiYgbm9kZSA9PT0gZWxlbSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlWyB0eXBlIF0gPSBbIGRpcnJ1bnMsIG5vZGVJbmRleCwgZGlmZiBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gVXNlIHByZXZpb3VzbHktY2FjaGVkIGVsZW1lbnQgaW5kZXggaWYgYXZhaWxhYmxlXG5cdFx0XHRcdFx0XHRcdGlmICggdXNlQ2FjaGUgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyAuLi5pbiBhIGd6aXAtZnJpZW5kbHkgd2F5XG5cdFx0XHRcdFx0XHRcdFx0bm9kZSA9IGVsZW07XG5cdFx0XHRcdFx0XHRcdFx0b3V0ZXJDYWNoZSA9IG5vZGVbIGV4cGFuZG8gXSB8fCAoIG5vZGVbIGV4cGFuZG8gXSA9IHt9ICk7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8OSBvbmx5XG5cdFx0XHRcdFx0XHRcdFx0Ly8gRGVmZW5kIGFnYWluc3QgY2xvbmVkIGF0dHJvcGVydGllcyAoalF1ZXJ5IGdoLTE3MDkpXG5cdFx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGUgPSBvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gfHxcblx0XHRcdFx0XHRcdFx0XHRcdCggb3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdID0ge30gKTtcblxuXHRcdFx0XHRcdFx0XHRcdGNhY2hlID0gdW5pcXVlQ2FjaGVbIHR5cGUgXSB8fCBbXTtcblx0XHRcdFx0XHRcdFx0XHRub2RlSW5kZXggPSBjYWNoZVsgMCBdID09PSBkaXJydW5zICYmIGNhY2hlWyAxIF07XG5cdFx0XHRcdFx0XHRcdFx0ZGlmZiA9IG5vZGVJbmRleDtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdC8vIHhtbCA6bnRoLWNoaWxkKC4uLilcblx0XHRcdFx0XHRcdFx0Ly8gb3IgOm50aC1sYXN0LWNoaWxkKC4uLikgb3IgOm50aCgtbGFzdCk/LW9mLXR5cGUoLi4uKVxuXHRcdFx0XHRcdFx0XHRpZiAoIGRpZmYgPT09IGZhbHNlICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gVXNlIHRoZSBzYW1lIGxvb3AgYXMgYWJvdmUgdG8gc2VlayBgZWxlbWAgZnJvbSB0aGUgc3RhcnRcblx0XHRcdFx0XHRcdFx0XHR3aGlsZSAoICggbm9kZSA9ICsrbm9kZUluZGV4ICYmIG5vZGUgJiYgbm9kZVsgZGlyIF0gfHxcblx0XHRcdFx0XHRcdFx0XHRcdCggZGlmZiA9IG5vZGVJbmRleCA9IDAgKSB8fCBzdGFydC5wb3AoKSApICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoICggb2ZUeXBlID9cblx0XHRcdFx0XHRcdFx0XHRcdFx0bm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lIDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0bm9kZS5ub2RlVHlwZSA9PT0gMSApICYmXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCsrZGlmZiApIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBDYWNoZSB0aGUgaW5kZXggb2YgZWFjaCBlbmNvdW50ZXJlZCBlbGVtZW50XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICggdXNlQ2FjaGUgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3V0ZXJDYWNoZSA9IG5vZGVbIGV4cGFuZG8gXSB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KCBub2RlWyBleHBhbmRvIF0gPSB7fSApO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPDkgb25seVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIERlZmVuZCBhZ2FpbnN0IGNsb25lZCBhdHRyb3BlcnRpZXMgKGpRdWVyeSBnaC0xNzA5KVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlID0gb3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQoIG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSA9IHt9ICk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZVsgdHlwZSBdID0gWyBkaXJydW5zLCBkaWZmIF07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIG5vZGUgPT09IGVsZW0gKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSW5jb3Jwb3JhdGUgdGhlIG9mZnNldCwgdGhlbiBjaGVjayBhZ2FpbnN0IGN5Y2xlIHNpemVcblx0XHRcdFx0XHRcdGRpZmYgLT0gbGFzdDtcblx0XHRcdFx0XHRcdHJldHVybiBkaWZmID09PSBmaXJzdCB8fCAoIGRpZmYgJSBmaXJzdCA9PT0gMCAmJiBkaWZmIC8gZmlyc3QgPj0gMCApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0XCJQU0VVRE9cIjogZnVuY3Rpb24oIHBzZXVkbywgYXJndW1lbnQgKSB7XG5cblx0XHRcdC8vIHBzZXVkby1jbGFzcyBuYW1lcyBhcmUgY2FzZS1pbnNlbnNpdGl2ZVxuXHRcdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNwc2V1ZG8tY2xhc3Nlc1xuXHRcdFx0Ly8gUHJpb3JpdGl6ZSBieSBjYXNlIHNlbnNpdGl2aXR5IGluIGNhc2UgY3VzdG9tIHBzZXVkb3MgYXJlIGFkZGVkIHdpdGggdXBwZXJjYXNlIGxldHRlcnNcblx0XHRcdC8vIFJlbWVtYmVyIHRoYXQgc2V0RmlsdGVycyBpbmhlcml0cyBmcm9tIHBzZXVkb3Ncblx0XHRcdHZhciBhcmdzLFxuXHRcdFx0XHRmbiA9IEV4cHIucHNldWRvc1sgcHNldWRvIF0gfHwgRXhwci5zZXRGaWx0ZXJzWyBwc2V1ZG8udG9Mb3dlckNhc2UoKSBdIHx8XG5cdFx0XHRcdFx0U2l6emxlLmVycm9yKCBcInVuc3VwcG9ydGVkIHBzZXVkbzogXCIgKyBwc2V1ZG8gKTtcblxuXHRcdFx0Ly8gVGhlIHVzZXIgbWF5IHVzZSBjcmVhdGVQc2V1ZG8gdG8gaW5kaWNhdGUgdGhhdFxuXHRcdFx0Ly8gYXJndW1lbnRzIGFyZSBuZWVkZWQgdG8gY3JlYXRlIHRoZSBmaWx0ZXIgZnVuY3Rpb25cblx0XHRcdC8vIGp1c3QgYXMgU2l6emxlIGRvZXNcblx0XHRcdGlmICggZm5bIGV4cGFuZG8gXSApIHtcblx0XHRcdFx0cmV0dXJuIGZuKCBhcmd1bWVudCApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBCdXQgbWFpbnRhaW4gc3VwcG9ydCBmb3Igb2xkIHNpZ25hdHVyZXNcblx0XHRcdGlmICggZm4ubGVuZ3RoID4gMSApIHtcblx0XHRcdFx0YXJncyA9IFsgcHNldWRvLCBwc2V1ZG8sIFwiXCIsIGFyZ3VtZW50IF07XG5cdFx0XHRcdHJldHVybiBFeHByLnNldEZpbHRlcnMuaGFzT3duUHJvcGVydHkoIHBzZXVkby50b0xvd2VyQ2FzZSgpICkgP1xuXHRcdFx0XHRcdG1hcmtGdW5jdGlvbiggZnVuY3Rpb24oIHNlZWQsIG1hdGNoZXMgKSB7XG5cdFx0XHRcdFx0XHR2YXIgaWR4LFxuXHRcdFx0XHRcdFx0XHRtYXRjaGVkID0gZm4oIHNlZWQsIGFyZ3VtZW50ICksXG5cdFx0XHRcdFx0XHRcdGkgPSBtYXRjaGVkLmxlbmd0aDtcblx0XHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdFx0XHRpZHggPSBpbmRleE9mKCBzZWVkLCBtYXRjaGVkWyBpIF0gKTtcblx0XHRcdFx0XHRcdFx0c2VlZFsgaWR4IF0gPSAhKCBtYXRjaGVzWyBpZHggXSA9IG1hdGNoZWRbIGkgXSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gKSA6XG5cdFx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4oIGVsZW0sIDAsIGFyZ3MgKTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZm47XG5cdFx0fVxuXHR9LFxuXG5cdHBzZXVkb3M6IHtcblxuXHRcdC8vIFBvdGVudGlhbGx5IGNvbXBsZXggcHNldWRvc1xuXHRcdFwibm90XCI6IG1hcmtGdW5jdGlvbiggZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXG5cdFx0XHQvLyBUcmltIHRoZSBzZWxlY3RvciBwYXNzZWQgdG8gY29tcGlsZVxuXHRcdFx0Ly8gdG8gYXZvaWQgdHJlYXRpbmcgbGVhZGluZyBhbmQgdHJhaWxpbmdcblx0XHRcdC8vIHNwYWNlcyBhcyBjb21iaW5hdG9yc1xuXHRcdFx0dmFyIGlucHV0ID0gW10sXG5cdFx0XHRcdHJlc3VsdHMgPSBbXSxcblx0XHRcdFx0bWF0Y2hlciA9IGNvbXBpbGUoIHNlbGVjdG9yLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSApO1xuXG5cdFx0XHRyZXR1cm4gbWF0Y2hlclsgZXhwYW5kbyBdID9cblx0XHRcdFx0bWFya0Z1bmN0aW9uKCBmdW5jdGlvbiggc2VlZCwgbWF0Y2hlcywgX2NvbnRleHQsIHhtbCApIHtcblx0XHRcdFx0XHR2YXIgZWxlbSxcblx0XHRcdFx0XHRcdHVubWF0Y2hlZCA9IG1hdGNoZXIoIHNlZWQsIG51bGwsIHhtbCwgW10gKSxcblx0XHRcdFx0XHRcdGkgPSBzZWVkLmxlbmd0aDtcblxuXHRcdFx0XHRcdC8vIE1hdGNoIGVsZW1lbnRzIHVubWF0Y2hlZCBieSBgbWF0Y2hlcmBcblx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdGlmICggKCBlbGVtID0gdW5tYXRjaGVkWyBpIF0gKSApIHtcblx0XHRcdFx0XHRcdFx0c2VlZFsgaSBdID0gISggbWF0Y2hlc1sgaSBdID0gZWxlbSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApIDpcblx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0sIF9jb250ZXh0LCB4bWwgKSB7XG5cdFx0XHRcdFx0aW5wdXRbIDAgXSA9IGVsZW07XG5cdFx0XHRcdFx0bWF0Y2hlciggaW5wdXQsIG51bGwsIHhtbCwgcmVzdWx0cyApO1xuXG5cdFx0XHRcdFx0Ly8gRG9uJ3Qga2VlcCB0aGUgZWxlbWVudCAoaXNzdWUgIzI5OSlcblx0XHRcdFx0XHRpbnB1dFsgMCBdID0gbnVsbDtcblx0XHRcdFx0XHRyZXR1cm4gIXJlc3VsdHMucG9wKCk7XG5cdFx0XHRcdH07XG5cdFx0fSApLFxuXG5cdFx0XCJoYXNcIjogbWFya0Z1bmN0aW9uKCBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHJldHVybiBTaXp6bGUoIHNlbGVjdG9yLCBlbGVtICkubGVuZ3RoID4gMDtcblx0XHRcdH07XG5cdFx0fSApLFxuXG5cdFx0XCJjb250YWluc1wiOiBtYXJrRnVuY3Rpb24oIGZ1bmN0aW9uKCB0ZXh0ICkge1xuXHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0cmV0dXJuICggZWxlbS50ZXh0Q29udGVudCB8fCBnZXRUZXh0KCBlbGVtICkgKS5pbmRleE9mKCB0ZXh0ICkgPiAtMTtcblx0XHRcdH07XG5cdFx0fSApLFxuXG5cdFx0Ly8gXCJXaGV0aGVyIGFuIGVsZW1lbnQgaXMgcmVwcmVzZW50ZWQgYnkgYSA6bGFuZygpIHNlbGVjdG9yXG5cdFx0Ly8gaXMgYmFzZWQgc29sZWx5IG9uIHRoZSBlbGVtZW50J3MgbGFuZ3VhZ2UgdmFsdWVcblx0XHQvLyBiZWluZyBlcXVhbCB0byB0aGUgaWRlbnRpZmllciBDLFxuXHRcdC8vIG9yIGJlZ2lubmluZyB3aXRoIHRoZSBpZGVudGlmaWVyIEMgaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgXCItXCIuXG5cdFx0Ly8gVGhlIG1hdGNoaW5nIG9mIEMgYWdhaW5zdCB0aGUgZWxlbWVudCdzIGxhbmd1YWdlIHZhbHVlIGlzIHBlcmZvcm1lZCBjYXNlLWluc2Vuc2l0aXZlbHkuXG5cdFx0Ly8gVGhlIGlkZW50aWZpZXIgQyBkb2VzIG5vdCBoYXZlIHRvIGJlIGEgdmFsaWQgbGFuZ3VhZ2UgbmFtZS5cIlxuXHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jbGFuZy1wc2V1ZG9cblx0XHRcImxhbmdcIjogbWFya0Z1bmN0aW9uKCBmdW5jdGlvbiggbGFuZyApIHtcblxuXHRcdFx0Ly8gbGFuZyB2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgaWRlbnRpZmllclxuXHRcdFx0aWYgKCAhcmlkZW50aWZpZXIudGVzdCggbGFuZyB8fCBcIlwiICkgKSB7XG5cdFx0XHRcdFNpenpsZS5lcnJvciggXCJ1bnN1cHBvcnRlZCBsYW5nOiBcIiArIGxhbmcgKTtcblx0XHRcdH1cblx0XHRcdGxhbmcgPSBsYW5nLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICkudG9Mb3dlckNhc2UoKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0dmFyIGVsZW1MYW5nO1xuXHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0aWYgKCAoIGVsZW1MYW5nID0gZG9jdW1lbnRJc0hUTUwgP1xuXHRcdFx0XHRcdFx0ZWxlbS5sYW5nIDpcblx0XHRcdFx0XHRcdGVsZW0uZ2V0QXR0cmlidXRlKCBcInhtbDpsYW5nXCIgKSB8fCBlbGVtLmdldEF0dHJpYnV0ZSggXCJsYW5nXCIgKSApICkge1xuXG5cdFx0XHRcdFx0XHRlbGVtTGFuZyA9IGVsZW1MYW5nLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbUxhbmcgPT09IGxhbmcgfHwgZWxlbUxhbmcuaW5kZXhPZiggbGFuZyArIFwiLVwiICkgPT09IDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IHdoaWxlICggKCBlbGVtID0gZWxlbS5wYXJlbnROb2RlICkgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9O1xuXHRcdH0gKSxcblxuXHRcdC8vIE1pc2NlbGxhbmVvdXNcblx0XHRcInRhcmdldFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBoYXNoID0gd2luZG93LmxvY2F0aW9uICYmIHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuXHRcdFx0cmV0dXJuIGhhc2ggJiYgaGFzaC5zbGljZSggMSApID09PSBlbGVtLmlkO1xuXHRcdH0sXG5cblx0XHRcInJvb3RcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbSA9PT0gZG9jRWxlbTtcblx0XHR9LFxuXG5cdFx0XCJmb2N1c1wiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmXG5cdFx0XHRcdCggIWRvY3VtZW50Lmhhc0ZvY3VzIHx8IGRvY3VtZW50Lmhhc0ZvY3VzKCkgKSAmJlxuXHRcdFx0XHQhISggZWxlbS50eXBlIHx8IGVsZW0uaHJlZiB8fCB+ZWxlbS50YWJJbmRleCApO1xuXHRcdH0sXG5cblx0XHQvLyBCb29sZWFuIHByb3BlcnRpZXNcblx0XHRcImVuYWJsZWRcIjogY3JlYXRlRGlzYWJsZWRQc2V1ZG8oIGZhbHNlICksXG5cdFx0XCJkaXNhYmxlZFwiOiBjcmVhdGVEaXNhYmxlZFBzZXVkbyggdHJ1ZSApLFxuXG5cdFx0XCJjaGVja2VkXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0XHQvLyBJbiBDU1MzLCA6Y2hlY2tlZCBzaG91bGQgcmV0dXJuIGJvdGggY2hlY2tlZCBhbmQgc2VsZWN0ZWQgZWxlbWVudHNcblx0XHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTEvUkVDLWNzczMtc2VsZWN0b3JzLTIwMTEwOTI5LyNjaGVja2VkXG5cdFx0XHR2YXIgbm9kZU5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyZXR1cm4gKCBub2RlTmFtZSA9PT0gXCJpbnB1dFwiICYmICEhZWxlbS5jaGVja2VkICkgfHxcblx0XHRcdFx0KCBub2RlTmFtZSA9PT0gXCJvcHRpb25cIiAmJiAhIWVsZW0uc2VsZWN0ZWQgKTtcblx0XHR9LFxuXG5cdFx0XCJzZWxlY3RlZFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdFx0Ly8gQWNjZXNzaW5nIHRoaXMgcHJvcGVydHkgbWFrZXMgc2VsZWN0ZWQtYnktZGVmYXVsdFxuXHRcdFx0Ly8gb3B0aW9ucyBpbiBTYWZhcmkgd29yayBwcm9wZXJseVxuXHRcdFx0aWYgKCBlbGVtLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcblx0XHRcdFx0ZWxlbS5wYXJlbnROb2RlLnNlbGVjdGVkSW5kZXg7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBlbGVtLnNlbGVjdGVkID09PSB0cnVlO1xuXHRcdH0sXG5cblx0XHQvLyBDb250ZW50c1xuXHRcdFwiZW1wdHlcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jZW1wdHktcHNldWRvXG5cdFx0XHQvLyA6ZW1wdHkgaXMgbmVnYXRlZCBieSBlbGVtZW50ICgxKSBvciBjb250ZW50IG5vZGVzICh0ZXh0OiAzOyBjZGF0YTogNDsgZW50aXR5IHJlZjogNSksXG5cdFx0XHQvLyAgIGJ1dCBub3QgYnkgb3RoZXJzIChjb21tZW50OiA4OyBwcm9jZXNzaW5nIGluc3RydWN0aW9uOiA3OyBldGMuKVxuXHRcdFx0Ly8gbm9kZVR5cGUgPCA2IHdvcmtzIGJlY2F1c2UgYXR0cmlidXRlcyAoMikgZG8gbm90IGFwcGVhciBhcyBjaGlsZHJlblxuXHRcdFx0Zm9yICggZWxlbSA9IGVsZW0uZmlyc3RDaGlsZDsgZWxlbTsgZWxlbSA9IGVsZW0ubmV4dFNpYmxpbmcgKSB7XG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA8IDYgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0XCJwYXJlbnRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gIUV4cHIucHNldWRvc1sgXCJlbXB0eVwiIF0oIGVsZW0gKTtcblx0XHR9LFxuXG5cdFx0Ly8gRWxlbWVudC9pbnB1dCB0eXBlc1xuXHRcdFwiaGVhZGVyXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIHJoZWFkZXIudGVzdCggZWxlbS5ub2RlTmFtZSApO1xuXHRcdH0sXG5cblx0XHRcImlucHV0XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIHJpbnB1dHMudGVzdCggZWxlbS5ub2RlTmFtZSApO1xuXHRcdH0sXG5cblx0XHRcImJ1dHRvblwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0cmV0dXJuIG5hbWUgPT09IFwiaW5wdXRcIiAmJiBlbGVtLnR5cGUgPT09IFwiYnV0dG9uXCIgfHwgbmFtZSA9PT0gXCJidXR0b25cIjtcblx0XHR9LFxuXG5cdFx0XCJ0ZXh0XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0dmFyIGF0dHI7XG5cdFx0XHRyZXR1cm4gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIgJiZcblx0XHRcdFx0ZWxlbS50eXBlID09PSBcInRleHRcIiAmJlxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IElFPDhcblx0XHRcdFx0Ly8gTmV3IEhUTUw1IGF0dHJpYnV0ZSB2YWx1ZXMgKGUuZy4sIFwic2VhcmNoXCIpIGFwcGVhciB3aXRoIGVsZW0udHlwZSA9PT0gXCJ0ZXh0XCJcblx0XHRcdFx0KCAoIGF0dHIgPSBlbGVtLmdldEF0dHJpYnV0ZSggXCJ0eXBlXCIgKSApID09IG51bGwgfHxcblx0XHRcdFx0XHRhdHRyLnRvTG93ZXJDYXNlKCkgPT09IFwidGV4dFwiICk7XG5cdFx0fSxcblxuXHRcdC8vIFBvc2l0aW9uLWluLWNvbGxlY3Rpb25cblx0XHRcImZpcnN0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oIGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIFsgMCBdO1xuXHRcdH0gKSxcblxuXHRcdFwibGFzdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKCBmdW5jdGlvbiggX21hdGNoSW5kZXhlcywgbGVuZ3RoICkge1xuXHRcdFx0cmV0dXJuIFsgbGVuZ3RoIC0gMSBdO1xuXHRcdH0gKSxcblxuXHRcdFwiZXFcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyggZnVuY3Rpb24oIF9tYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG5cdFx0XHRyZXR1cm4gWyBhcmd1bWVudCA8IDAgPyBhcmd1bWVudCArIGxlbmd0aCA6IGFyZ3VtZW50IF07XG5cdFx0fSApLFxuXG5cdFx0XCJldmVuXCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oIGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcblx0XHRcdHZhciBpID0gMDtcblx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSArPSAyICkge1xuXHRcdFx0XHRtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1hdGNoSW5kZXhlcztcblx0XHR9ICksXG5cblx0XHRcIm9kZFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKCBmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGggKSB7XG5cdFx0XHR2YXIgaSA9IDE7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkgKz0gMiApIHtcblx0XHRcdFx0bWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYXRjaEluZGV4ZXM7XG5cdFx0fSApLFxuXG5cdFx0XCJsdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKCBmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGgsIGFyZ3VtZW50ICkge1xuXHRcdFx0dmFyIGkgPSBhcmd1bWVudCA8IDAgP1xuXHRcdFx0XHRhcmd1bWVudCArIGxlbmd0aCA6XG5cdFx0XHRcdGFyZ3VtZW50ID4gbGVuZ3RoID9cblx0XHRcdFx0XHRsZW5ndGggOlxuXHRcdFx0XHRcdGFyZ3VtZW50O1xuXHRcdFx0Zm9yICggOyAtLWkgPj0gMDsgKSB7XG5cdFx0XHRcdG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF0Y2hJbmRleGVzO1xuXHRcdH0gKSxcblxuXHRcdFwiZ3RcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyggZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoLCBhcmd1bWVudCApIHtcblx0XHRcdHZhciBpID0gYXJndW1lbnQgPCAwID8gYXJndW1lbnQgKyBsZW5ndGggOiBhcmd1bWVudDtcblx0XHRcdGZvciAoIDsgKytpIDwgbGVuZ3RoOyApIHtcblx0XHRcdFx0bWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYXRjaEluZGV4ZXM7XG5cdFx0fSApXG5cdH1cbn07XG5cbkV4cHIucHNldWRvc1sgXCJudGhcIiBdID0gRXhwci5wc2V1ZG9zWyBcImVxXCIgXTtcblxuLy8gQWRkIGJ1dHRvbi9pbnB1dCB0eXBlIHBzZXVkb3NcbmZvciAoIGkgaW4geyByYWRpbzogdHJ1ZSwgY2hlY2tib3g6IHRydWUsIGZpbGU6IHRydWUsIHBhc3N3b3JkOiB0cnVlLCBpbWFnZTogdHJ1ZSB9ICkge1xuXHRFeHByLnBzZXVkb3NbIGkgXSA9IGNyZWF0ZUlucHV0UHNldWRvKCBpICk7XG59XG5mb3IgKCBpIGluIHsgc3VibWl0OiB0cnVlLCByZXNldDogdHJ1ZSB9ICkge1xuXHRFeHByLnBzZXVkb3NbIGkgXSA9IGNyZWF0ZUJ1dHRvblBzZXVkbyggaSApO1xufVxuXG4vLyBFYXN5IEFQSSBmb3IgY3JlYXRpbmcgbmV3IHNldEZpbHRlcnNcbmZ1bmN0aW9uIHNldEZpbHRlcnMoKSB7fVxuc2V0RmlsdGVycy5wcm90b3R5cGUgPSBFeHByLmZpbHRlcnMgPSBFeHByLnBzZXVkb3M7XG5FeHByLnNldEZpbHRlcnMgPSBuZXcgc2V0RmlsdGVycygpO1xuXG50b2tlbml6ZSA9IFNpenpsZS50b2tlbml6ZSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgcGFyc2VPbmx5ICkge1xuXHR2YXIgbWF0Y2hlZCwgbWF0Y2gsIHRva2VucywgdHlwZSxcblx0XHRzb0ZhciwgZ3JvdXBzLCBwcmVGaWx0ZXJzLFxuXHRcdGNhY2hlZCA9IHRva2VuQ2FjaGVbIHNlbGVjdG9yICsgXCIgXCIgXTtcblxuXHRpZiAoIGNhY2hlZCApIHtcblx0XHRyZXR1cm4gcGFyc2VPbmx5ID8gMCA6IGNhY2hlZC5zbGljZSggMCApO1xuXHR9XG5cblx0c29GYXIgPSBzZWxlY3Rvcjtcblx0Z3JvdXBzID0gW107XG5cdHByZUZpbHRlcnMgPSBFeHByLnByZUZpbHRlcjtcblxuXHR3aGlsZSAoIHNvRmFyICkge1xuXG5cdFx0Ly8gQ29tbWEgYW5kIGZpcnN0IHJ1blxuXHRcdGlmICggIW1hdGNoZWQgfHwgKCBtYXRjaCA9IHJjb21tYS5leGVjKCBzb0ZhciApICkgKSB7XG5cdFx0XHRpZiAoIG1hdGNoICkge1xuXG5cdFx0XHRcdC8vIERvbid0IGNvbnN1bWUgdHJhaWxpbmcgY29tbWFzIGFzIHZhbGlkXG5cdFx0XHRcdHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoWyAwIF0ubGVuZ3RoICkgfHwgc29GYXI7XG5cdFx0XHR9XG5cdFx0XHRncm91cHMucHVzaCggKCB0b2tlbnMgPSBbXSApICk7XG5cdFx0fVxuXG5cdFx0bWF0Y2hlZCA9IGZhbHNlO1xuXG5cdFx0Ly8gQ29tYmluYXRvcnNcblx0XHRpZiAoICggbWF0Y2ggPSByY29tYmluYXRvcnMuZXhlYyggc29GYXIgKSApICkge1xuXHRcdFx0bWF0Y2hlZCA9IG1hdGNoLnNoaWZ0KCk7XG5cdFx0XHR0b2tlbnMucHVzaCgge1xuXHRcdFx0XHR2YWx1ZTogbWF0Y2hlZCxcblxuXHRcdFx0XHQvLyBDYXN0IGRlc2NlbmRhbnQgY29tYmluYXRvcnMgdG8gc3BhY2Vcblx0XHRcdFx0dHlwZTogbWF0Y2hbIDAgXS5yZXBsYWNlKCBydHJpbSwgXCIgXCIgKVxuXHRcdFx0fSApO1xuXHRcdFx0c29GYXIgPSBzb0Zhci5zbGljZSggbWF0Y2hlZC5sZW5ndGggKTtcblx0XHR9XG5cblx0XHQvLyBGaWx0ZXJzXG5cdFx0Zm9yICggdHlwZSBpbiBFeHByLmZpbHRlciApIHtcblx0XHRcdGlmICggKCBtYXRjaCA9IG1hdGNoRXhwclsgdHlwZSBdLmV4ZWMoIHNvRmFyICkgKSAmJiAoICFwcmVGaWx0ZXJzWyB0eXBlIF0gfHxcblx0XHRcdFx0KCBtYXRjaCA9IHByZUZpbHRlcnNbIHR5cGUgXSggbWF0Y2ggKSApICkgKSB7XG5cdFx0XHRcdG1hdGNoZWQgPSBtYXRjaC5zaGlmdCgpO1xuXHRcdFx0XHR0b2tlbnMucHVzaCgge1xuXHRcdFx0XHRcdHZhbHVlOiBtYXRjaGVkLFxuXHRcdFx0XHRcdHR5cGU6IHR5cGUsXG5cdFx0XHRcdFx0bWF0Y2hlczogbWF0Y2hcblx0XHRcdFx0fSApO1xuXHRcdFx0XHRzb0ZhciA9IHNvRmFyLnNsaWNlKCBtYXRjaGVkLmxlbmd0aCApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICggIW1hdGNoZWQgKSB7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIGxlbmd0aCBvZiB0aGUgaW52YWxpZCBleGNlc3Ncblx0Ly8gaWYgd2UncmUganVzdCBwYXJzaW5nXG5cdC8vIE90aGVyd2lzZSwgdGhyb3cgYW4gZXJyb3Igb3IgcmV0dXJuIHRva2Vuc1xuXHRyZXR1cm4gcGFyc2VPbmx5ID9cblx0XHRzb0Zhci5sZW5ndGggOlxuXHRcdHNvRmFyID9cblx0XHRcdFNpenpsZS5lcnJvciggc2VsZWN0b3IgKSA6XG5cblx0XHRcdC8vIENhY2hlIHRoZSB0b2tlbnNcblx0XHRcdHRva2VuQ2FjaGUoIHNlbGVjdG9yLCBncm91cHMgKS5zbGljZSggMCApO1xufTtcblxuZnVuY3Rpb24gdG9TZWxlY3RvciggdG9rZW5zICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bGVuID0gdG9rZW5zLmxlbmd0aCxcblx0XHRzZWxlY3RvciA9IFwiXCI7XG5cdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdHNlbGVjdG9yICs9IHRva2Vuc1sgaSBdLnZhbHVlO1xuXHR9XG5cdHJldHVybiBzZWxlY3Rvcjtcbn1cblxuZnVuY3Rpb24gYWRkQ29tYmluYXRvciggbWF0Y2hlciwgY29tYmluYXRvciwgYmFzZSApIHtcblx0dmFyIGRpciA9IGNvbWJpbmF0b3IuZGlyLFxuXHRcdHNraXAgPSBjb21iaW5hdG9yLm5leHQsXG5cdFx0a2V5ID0gc2tpcCB8fCBkaXIsXG5cdFx0Y2hlY2tOb25FbGVtZW50cyA9IGJhc2UgJiYga2V5ID09PSBcInBhcmVudE5vZGVcIixcblx0XHRkb25lTmFtZSA9IGRvbmUrKztcblxuXHRyZXR1cm4gY29tYmluYXRvci5maXJzdCA/XG5cblx0XHQvLyBDaGVjayBhZ2FpbnN0IGNsb3Nlc3QgYW5jZXN0b3IvcHJlY2VkaW5nIGVsZW1lbnRcblx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0d2hpbGUgKCAoIGVsZW0gPSBlbGVtWyBkaXIgXSApICkge1xuXHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgY2hlY2tOb25FbGVtZW50cyApIHtcblx0XHRcdFx0XHRyZXR1cm4gbWF0Y2hlciggZWxlbSwgY29udGV4dCwgeG1sICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9IDpcblxuXHRcdC8vIENoZWNrIGFnYWluc3QgYWxsIGFuY2VzdG9yL3ByZWNlZGluZyBlbGVtZW50c1xuXHRcdGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHR2YXIgb2xkQ2FjaGUsIHVuaXF1ZUNhY2hlLCBvdXRlckNhY2hlLFxuXHRcdFx0XHRuZXdDYWNoZSA9IFsgZGlycnVucywgZG9uZU5hbWUgXTtcblxuXHRcdFx0Ly8gV2UgY2FuJ3Qgc2V0IGFyYml0cmFyeSBkYXRhIG9uIFhNTCBub2Rlcywgc28gdGhleSBkb24ndCBiZW5lZml0IGZyb20gY29tYmluYXRvciBjYWNoaW5nXG5cdFx0XHRpZiAoIHhtbCApIHtcblx0XHRcdFx0d2hpbGUgKCAoIGVsZW0gPSBlbGVtWyBkaXIgXSApICkge1xuXHRcdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzICkge1xuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR3aGlsZSAoICggZWxlbSA9IGVsZW1bIGRpciBdICkgKSB7XG5cdFx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGNoZWNrTm9uRWxlbWVudHMgKSB7XG5cdFx0XHRcdFx0XHRvdXRlckNhY2hlID0gZWxlbVsgZXhwYW5kbyBdIHx8ICggZWxlbVsgZXhwYW5kbyBdID0ge30gKTtcblxuXHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPDkgb25seVxuXHRcdFx0XHRcdFx0Ly8gRGVmZW5kIGFnYWluc3QgY2xvbmVkIGF0dHJvcGVydGllcyAoalF1ZXJ5IGdoLTE3MDkpXG5cdFx0XHRcdFx0XHR1bmlxdWVDYWNoZSA9IG91dGVyQ2FjaGVbIGVsZW0udW5pcXVlSUQgXSB8fFxuXHRcdFx0XHRcdFx0XHQoIG91dGVyQ2FjaGVbIGVsZW0udW5pcXVlSUQgXSA9IHt9ICk7XG5cblx0XHRcdFx0XHRcdGlmICggc2tpcCAmJiBza2lwID09PSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgKSB7XG5cdFx0XHRcdFx0XHRcdGVsZW0gPSBlbGVtWyBkaXIgXSB8fCBlbGVtO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICggKCBvbGRDYWNoZSA9IHVuaXF1ZUNhY2hlWyBrZXkgXSApICYmXG5cdFx0XHRcdFx0XHRcdG9sZENhY2hlWyAwIF0gPT09IGRpcnJ1bnMgJiYgb2xkQ2FjaGVbIDEgXSA9PT0gZG9uZU5hbWUgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gQXNzaWduIHRvIG5ld0NhY2hlIHNvIHJlc3VsdHMgYmFjay1wcm9wYWdhdGUgdG8gcHJldmlvdXMgZWxlbWVudHNcblx0XHRcdFx0XHRcdFx0cmV0dXJuICggbmV3Q2FjaGVbIDIgXSA9IG9sZENhY2hlWyAyIF0gKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gUmV1c2UgbmV3Y2FjaGUgc28gcmVzdWx0cyBiYWNrLXByb3BhZ2F0ZSB0byBwcmV2aW91cyBlbGVtZW50c1xuXHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZVsga2V5IF0gPSBuZXdDYWNoZTtcblxuXHRcdFx0XHRcdFx0XHQvLyBBIG1hdGNoIG1lYW5zIHdlJ3JlIGRvbmU7IGEgZmFpbCBtZWFucyB3ZSBoYXZlIHRvIGtlZXAgY2hlY2tpbmdcblx0XHRcdFx0XHRcdFx0aWYgKCAoIG5ld0NhY2hlWyAyIF0gPSBtYXRjaGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApICkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcbn1cblxuZnVuY3Rpb24gZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICkge1xuXHRyZXR1cm4gbWF0Y2hlcnMubGVuZ3RoID4gMSA/XG5cdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdHZhciBpID0gbWF0Y2hlcnMubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdGlmICggIW1hdGNoZXJzWyBpIF0oIGVsZW0sIGNvbnRleHQsIHhtbCApICkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSA6XG5cdFx0bWF0Y2hlcnNbIDAgXTtcbn1cblxuZnVuY3Rpb24gbXVsdGlwbGVDb250ZXh0cyggc2VsZWN0b3IsIGNvbnRleHRzLCByZXN1bHRzICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bGVuID0gY29udGV4dHMubGVuZ3RoO1xuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRTaXp6bGUoIHNlbGVjdG9yLCBjb250ZXh0c1sgaSBdLCByZXN1bHRzICk7XG5cdH1cblx0cmV0dXJuIHJlc3VsdHM7XG59XG5cbmZ1bmN0aW9uIGNvbmRlbnNlKCB1bm1hdGNoZWQsIG1hcCwgZmlsdGVyLCBjb250ZXh0LCB4bWwgKSB7XG5cdHZhciBlbGVtLFxuXHRcdG5ld1VubWF0Y2hlZCA9IFtdLFxuXHRcdGkgPSAwLFxuXHRcdGxlbiA9IHVubWF0Y2hlZC5sZW5ndGgsXG5cdFx0bWFwcGVkID0gbWFwICE9IG51bGw7XG5cblx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0aWYgKCAoIGVsZW0gPSB1bm1hdGNoZWRbIGkgXSApICkge1xuXHRcdFx0aWYgKCAhZmlsdGVyIHx8IGZpbHRlciggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XG5cdFx0XHRcdG5ld1VubWF0Y2hlZC5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdGlmICggbWFwcGVkICkge1xuXHRcdFx0XHRcdG1hcC5wdXNoKCBpICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbmV3VW5tYXRjaGVkO1xufVxuXG5mdW5jdGlvbiBzZXRNYXRjaGVyKCBwcmVGaWx0ZXIsIHNlbGVjdG9yLCBtYXRjaGVyLCBwb3N0RmlsdGVyLCBwb3N0RmluZGVyLCBwb3N0U2VsZWN0b3IgKSB7XG5cdGlmICggcG9zdEZpbHRlciAmJiAhcG9zdEZpbHRlclsgZXhwYW5kbyBdICkge1xuXHRcdHBvc3RGaWx0ZXIgPSBzZXRNYXRjaGVyKCBwb3N0RmlsdGVyICk7XG5cdH1cblx0aWYgKCBwb3N0RmluZGVyICYmICFwb3N0RmluZGVyWyBleHBhbmRvIF0gKSB7XG5cdFx0cG9zdEZpbmRlciA9IHNldE1hdGNoZXIoIHBvc3RGaW5kZXIsIHBvc3RTZWxlY3RvciApO1xuXHR9XG5cdHJldHVybiBtYXJrRnVuY3Rpb24oIGZ1bmN0aW9uKCBzZWVkLCByZXN1bHRzLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0dmFyIHRlbXAsIGksIGVsZW0sXG5cdFx0XHRwcmVNYXAgPSBbXSxcblx0XHRcdHBvc3RNYXAgPSBbXSxcblx0XHRcdHByZWV4aXN0aW5nID0gcmVzdWx0cy5sZW5ndGgsXG5cblx0XHRcdC8vIEdldCBpbml0aWFsIGVsZW1lbnRzIGZyb20gc2VlZCBvciBjb250ZXh0XG5cdFx0XHRlbGVtcyA9IHNlZWQgfHwgbXVsdGlwbGVDb250ZXh0cyhcblx0XHRcdFx0c2VsZWN0b3IgfHwgXCIqXCIsXG5cdFx0XHRcdGNvbnRleHQubm9kZVR5cGUgPyBbIGNvbnRleHQgXSA6IGNvbnRleHQsXG5cdFx0XHRcdFtdXG5cdFx0XHQpLFxuXG5cdFx0XHQvLyBQcmVmaWx0ZXIgdG8gZ2V0IG1hdGNoZXIgaW5wdXQsIHByZXNlcnZpbmcgYSBtYXAgZm9yIHNlZWQtcmVzdWx0cyBzeW5jaHJvbml6YXRpb25cblx0XHRcdG1hdGNoZXJJbiA9IHByZUZpbHRlciAmJiAoIHNlZWQgfHwgIXNlbGVjdG9yICkgP1xuXHRcdFx0XHRjb25kZW5zZSggZWxlbXMsIHByZU1hcCwgcHJlRmlsdGVyLCBjb250ZXh0LCB4bWwgKSA6XG5cdFx0XHRcdGVsZW1zLFxuXG5cdFx0XHRtYXRjaGVyT3V0ID0gbWF0Y2hlciA/XG5cblx0XHRcdFx0Ly8gSWYgd2UgaGF2ZSBhIHBvc3RGaW5kZXIsIG9yIGZpbHRlcmVkIHNlZWQsIG9yIG5vbi1zZWVkIHBvc3RGaWx0ZXIgb3IgcHJlZXhpc3RpbmcgcmVzdWx0cyxcblx0XHRcdFx0cG9zdEZpbmRlciB8fCAoIHNlZWQgPyBwcmVGaWx0ZXIgOiBwcmVleGlzdGluZyB8fCBwb3N0RmlsdGVyICkgP1xuXG5cdFx0XHRcdFx0Ly8gLi4uaW50ZXJtZWRpYXRlIHByb2Nlc3NpbmcgaXMgbmVjZXNzYXJ5XG5cdFx0XHRcdFx0W10gOlxuXG5cdFx0XHRcdFx0Ly8gLi4ub3RoZXJ3aXNlIHVzZSByZXN1bHRzIGRpcmVjdGx5XG5cdFx0XHRcdFx0cmVzdWx0cyA6XG5cdFx0XHRcdG1hdGNoZXJJbjtcblxuXHRcdC8vIEZpbmQgcHJpbWFyeSBtYXRjaGVzXG5cdFx0aWYgKCBtYXRjaGVyICkge1xuXHRcdFx0bWF0Y2hlciggbWF0Y2hlckluLCBtYXRjaGVyT3V0LCBjb250ZXh0LCB4bWwgKTtcblx0XHR9XG5cblx0XHQvLyBBcHBseSBwb3N0RmlsdGVyXG5cdFx0aWYgKCBwb3N0RmlsdGVyICkge1xuXHRcdFx0dGVtcCA9IGNvbmRlbnNlKCBtYXRjaGVyT3V0LCBwb3N0TWFwICk7XG5cdFx0XHRwb3N0RmlsdGVyKCB0ZW1wLCBbXSwgY29udGV4dCwgeG1sICk7XG5cblx0XHRcdC8vIFVuLW1hdGNoIGZhaWxpbmcgZWxlbWVudHMgYnkgbW92aW5nIHRoZW0gYmFjayB0byBtYXRjaGVySW5cblx0XHRcdGkgPSB0ZW1wLmxlbmd0aDtcblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRpZiAoICggZWxlbSA9IHRlbXBbIGkgXSApICkge1xuXHRcdFx0XHRcdG1hdGNoZXJPdXRbIHBvc3RNYXBbIGkgXSBdID0gISggbWF0Y2hlckluWyBwb3N0TWFwWyBpIF0gXSA9IGVsZW0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICggc2VlZCApIHtcblx0XHRcdGlmICggcG9zdEZpbmRlciB8fCBwcmVGaWx0ZXIgKSB7XG5cdFx0XHRcdGlmICggcG9zdEZpbmRlciApIHtcblxuXHRcdFx0XHRcdC8vIEdldCB0aGUgZmluYWwgbWF0Y2hlck91dCBieSBjb25kZW5zaW5nIHRoaXMgaW50ZXJtZWRpYXRlIGludG8gcG9zdEZpbmRlciBjb250ZXh0c1xuXHRcdFx0XHRcdHRlbXAgPSBbXTtcblx0XHRcdFx0XHRpID0gbWF0Y2hlck91dC5sZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRpZiAoICggZWxlbSA9IG1hdGNoZXJPdXRbIGkgXSApICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIFJlc3RvcmUgbWF0Y2hlckluIHNpbmNlIGVsZW0gaXMgbm90IHlldCBhIGZpbmFsIG1hdGNoXG5cdFx0XHRcdFx0XHRcdHRlbXAucHVzaCggKCBtYXRjaGVySW5bIGkgXSA9IGVsZW0gKSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwb3N0RmluZGVyKCBudWxsLCAoIG1hdGNoZXJPdXQgPSBbXSApLCB0ZW1wLCB4bWwgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIE1vdmUgbWF0Y2hlZCBlbGVtZW50cyBmcm9tIHNlZWQgdG8gcmVzdWx0cyB0byBrZWVwIHRoZW0gc3luY2hyb25pemVkXG5cdFx0XHRcdGkgPSBtYXRjaGVyT3V0Lmxlbmd0aDtcblx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0aWYgKCAoIGVsZW0gPSBtYXRjaGVyT3V0WyBpIF0gKSAmJlxuXHRcdFx0XHRcdFx0KCB0ZW1wID0gcG9zdEZpbmRlciA/IGluZGV4T2YoIHNlZWQsIGVsZW0gKSA6IHByZU1hcFsgaSBdICkgPiAtMSApIHtcblxuXHRcdFx0XHRcdFx0c2VlZFsgdGVtcCBdID0gISggcmVzdWx0c1sgdGVtcCBdID0gZWxlbSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0Ly8gQWRkIGVsZW1lbnRzIHRvIHJlc3VsdHMsIHRocm91Z2ggcG9zdEZpbmRlciBpZiBkZWZpbmVkXG5cdFx0fSBlbHNlIHtcblx0XHRcdG1hdGNoZXJPdXQgPSBjb25kZW5zZShcblx0XHRcdFx0bWF0Y2hlck91dCA9PT0gcmVzdWx0cyA/XG5cdFx0XHRcdFx0bWF0Y2hlck91dC5zcGxpY2UoIHByZWV4aXN0aW5nLCBtYXRjaGVyT3V0Lmxlbmd0aCApIDpcblx0XHRcdFx0XHRtYXRjaGVyT3V0XG5cdFx0XHQpO1xuXHRcdFx0aWYgKCBwb3N0RmluZGVyICkge1xuXHRcdFx0XHRwb3N0RmluZGVyKCBudWxsLCByZXN1bHRzLCBtYXRjaGVyT3V0LCB4bWwgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIG1hdGNoZXJPdXQgKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gKTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hlckZyb21Ub2tlbnMoIHRva2VucyApIHtcblx0dmFyIGNoZWNrQ29udGV4dCwgbWF0Y2hlciwgaixcblx0XHRsZW4gPSB0b2tlbnMubGVuZ3RoLFxuXHRcdGxlYWRpbmdSZWxhdGl2ZSA9IEV4cHIucmVsYXRpdmVbIHRva2Vuc1sgMCBdLnR5cGUgXSxcblx0XHRpbXBsaWNpdFJlbGF0aXZlID0gbGVhZGluZ1JlbGF0aXZlIHx8IEV4cHIucmVsYXRpdmVbIFwiIFwiIF0sXG5cdFx0aSA9IGxlYWRpbmdSZWxhdGl2ZSA/IDEgOiAwLFxuXG5cdFx0Ly8gVGhlIGZvdW5kYXRpb25hbCBtYXRjaGVyIGVuc3VyZXMgdGhhdCBlbGVtZW50cyBhcmUgcmVhY2hhYmxlIGZyb20gdG9wLWxldmVsIGNvbnRleHQocylcblx0XHRtYXRjaENvbnRleHQgPSBhZGRDb21iaW5hdG9yKCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtID09PSBjaGVja0NvbnRleHQ7XG5cdFx0fSwgaW1wbGljaXRSZWxhdGl2ZSwgdHJ1ZSApLFxuXHRcdG1hdGNoQW55Q29udGV4dCA9IGFkZENvbWJpbmF0b3IoIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGluZGV4T2YoIGNoZWNrQ29udGV4dCwgZWxlbSApID4gLTE7XG5cdFx0fSwgaW1wbGljaXRSZWxhdGl2ZSwgdHJ1ZSApLFxuXHRcdG1hdGNoZXJzID0gWyBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0dmFyIHJldCA9ICggIWxlYWRpbmdSZWxhdGl2ZSAmJiAoIHhtbCB8fCBjb250ZXh0ICE9PSBvdXRlcm1vc3RDb250ZXh0ICkgKSB8fCAoXG5cdFx0XHRcdCggY2hlY2tDb250ZXh0ID0gY29udGV4dCApLm5vZGVUeXBlID9cblx0XHRcdFx0XHRtYXRjaENvbnRleHQoIGVsZW0sIGNvbnRleHQsIHhtbCApIDpcblx0XHRcdFx0XHRtYXRjaEFueUNvbnRleHQoIGVsZW0sIGNvbnRleHQsIHhtbCApICk7XG5cblx0XHRcdC8vIEF2b2lkIGhhbmdpbmcgb250byBlbGVtZW50IChpc3N1ZSAjMjk5KVxuXHRcdFx0Y2hlY2tDb250ZXh0ID0gbnVsbDtcblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fSBdO1xuXG5cdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdGlmICggKCBtYXRjaGVyID0gRXhwci5yZWxhdGl2ZVsgdG9rZW5zWyBpIF0udHlwZSBdICkgKSB7XG5cdFx0XHRtYXRjaGVycyA9IFsgYWRkQ29tYmluYXRvciggZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICksIG1hdGNoZXIgKSBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtYXRjaGVyID0gRXhwci5maWx0ZXJbIHRva2Vuc1sgaSBdLnR5cGUgXS5hcHBseSggbnVsbCwgdG9rZW5zWyBpIF0ubWF0Y2hlcyApO1xuXG5cdFx0XHQvLyBSZXR1cm4gc3BlY2lhbCB1cG9uIHNlZWluZyBhIHBvc2l0aW9uYWwgbWF0Y2hlclxuXHRcdFx0aWYgKCBtYXRjaGVyWyBleHBhbmRvIF0gKSB7XG5cblx0XHRcdFx0Ly8gRmluZCB0aGUgbmV4dCByZWxhdGl2ZSBvcGVyYXRvciAoaWYgYW55KSBmb3IgcHJvcGVyIGhhbmRsaW5nXG5cdFx0XHRcdGogPSArK2k7XG5cdFx0XHRcdGZvciAoIDsgaiA8IGxlbjsgaisrICkge1xuXHRcdFx0XHRcdGlmICggRXhwci5yZWxhdGl2ZVsgdG9rZW5zWyBqIF0udHlwZSBdICkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBzZXRNYXRjaGVyKFxuXHRcdFx0XHRcdGkgPiAxICYmIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApLFxuXHRcdFx0XHRcdGkgPiAxICYmIHRvU2VsZWN0b3IoXG5cblx0XHRcdFx0XHQvLyBJZiB0aGUgcHJlY2VkaW5nIHRva2VuIHdhcyBhIGRlc2NlbmRhbnQgY29tYmluYXRvciwgaW5zZXJ0IGFuIGltcGxpY2l0IGFueS1lbGVtZW50IGAqYFxuXHRcdFx0XHRcdHRva2Vuc1xuXHRcdFx0XHRcdFx0LnNsaWNlKCAwLCBpIC0gMSApXG5cdFx0XHRcdFx0XHQuY29uY2F0KCB7IHZhbHVlOiB0b2tlbnNbIGkgLSAyIF0udHlwZSA9PT0gXCIgXCIgPyBcIipcIiA6IFwiXCIgfSApXG5cdFx0XHRcdFx0KS5yZXBsYWNlKCBydHJpbSwgXCIkMVwiICksXG5cdFx0XHRcdFx0bWF0Y2hlcixcblx0XHRcdFx0XHRpIDwgaiAmJiBtYXRjaGVyRnJvbVRva2VucyggdG9rZW5zLnNsaWNlKCBpLCBqICkgKSxcblx0XHRcdFx0XHRqIDwgbGVuICYmIG1hdGNoZXJGcm9tVG9rZW5zKCAoIHRva2VucyA9IHRva2Vucy5zbGljZSggaiApICkgKSxcblx0XHRcdFx0XHRqIDwgbGVuICYmIHRvU2VsZWN0b3IoIHRva2VucyApXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRtYXRjaGVycy5wdXNoKCBtYXRjaGVyICk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMoIGVsZW1lbnRNYXRjaGVycywgc2V0TWF0Y2hlcnMgKSB7XG5cdHZhciBieVNldCA9IHNldE1hdGNoZXJzLmxlbmd0aCA+IDAsXG5cdFx0YnlFbGVtZW50ID0gZWxlbWVudE1hdGNoZXJzLmxlbmd0aCA+IDAsXG5cdFx0c3VwZXJNYXRjaGVyID0gZnVuY3Rpb24oIHNlZWQsIGNvbnRleHQsIHhtbCwgcmVzdWx0cywgb3V0ZXJtb3N0ICkge1xuXHRcdFx0dmFyIGVsZW0sIGosIG1hdGNoZXIsXG5cdFx0XHRcdG1hdGNoZWRDb3VudCA9IDAsXG5cdFx0XHRcdGkgPSBcIjBcIixcblx0XHRcdFx0dW5tYXRjaGVkID0gc2VlZCAmJiBbXSxcblx0XHRcdFx0c2V0TWF0Y2hlZCA9IFtdLFxuXHRcdFx0XHRjb250ZXh0QmFja3VwID0gb3V0ZXJtb3N0Q29udGV4dCxcblxuXHRcdFx0XHQvLyBXZSBtdXN0IGFsd2F5cyBoYXZlIGVpdGhlciBzZWVkIGVsZW1lbnRzIG9yIG91dGVybW9zdCBjb250ZXh0XG5cdFx0XHRcdGVsZW1zID0gc2VlZCB8fCBieUVsZW1lbnQgJiYgRXhwci5maW5kWyBcIlRBR1wiIF0oIFwiKlwiLCBvdXRlcm1vc3QgKSxcblxuXHRcdFx0XHQvLyBVc2UgaW50ZWdlciBkaXJydW5zIGlmZiB0aGlzIGlzIHRoZSBvdXRlcm1vc3QgbWF0Y2hlclxuXHRcdFx0XHRkaXJydW5zVW5pcXVlID0gKCBkaXJydW5zICs9IGNvbnRleHRCYWNrdXAgPT0gbnVsbCA/IDEgOiBNYXRoLnJhbmRvbSgpIHx8IDAuMSApLFxuXHRcdFx0XHRsZW4gPSBlbGVtcy5sZW5ndGg7XG5cblx0XHRcdGlmICggb3V0ZXJtb3N0ICkge1xuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDExKywgRWRnZSAxNyAtIDE4K1xuXHRcdFx0XHQvLyBJRS9FZGdlIHNvbWV0aW1lcyB0aHJvdyBhIFwiUGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvciB3aGVuIHN0cmljdC1jb21wYXJpbmdcblx0XHRcdFx0Ly8gdHdvIGRvY3VtZW50czsgc2hhbGxvdyBjb21wYXJpc29ucyB3b3JrLlxuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG5cdFx0XHRcdG91dGVybW9zdENvbnRleHQgPSBjb250ZXh0ID09IGRvY3VtZW50IHx8IGNvbnRleHQgfHwgb3V0ZXJtb3N0O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgZWxlbWVudHMgcGFzc2luZyBlbGVtZW50TWF0Y2hlcnMgZGlyZWN0bHkgdG8gcmVzdWx0c1xuXHRcdFx0Ly8gU3VwcG9ydDogSUU8OSwgU2FmYXJpXG5cdFx0XHQvLyBUb2xlcmF0ZSBOb2RlTGlzdCBwcm9wZXJ0aWVzIChJRTogXCJsZW5ndGhcIjsgU2FmYXJpOiA8bnVtYmVyPikgbWF0Y2hpbmcgZWxlbWVudHMgYnkgaWRcblx0XHRcdGZvciAoIDsgaSAhPT0gbGVuICYmICggZWxlbSA9IGVsZW1zWyBpIF0gKSAhPSBudWxsOyBpKysgKSB7XG5cdFx0XHRcdGlmICggYnlFbGVtZW50ICYmIGVsZW0gKSB7XG5cdFx0XHRcdFx0aiA9IDA7XG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTcgLSAxOCtcblx0XHRcdFx0XHQvLyBJRS9FZGdlIHNvbWV0aW1lcyB0aHJvdyBhIFwiUGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvciB3aGVuIHN0cmljdC1jb21wYXJpbmdcblx0XHRcdFx0XHQvLyB0d28gZG9jdW1lbnRzOyBzaGFsbG93IGNvbXBhcmlzb25zIHdvcmsuXG5cdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXHRcdFx0XHRcdGlmICggIWNvbnRleHQgJiYgZWxlbS5vd25lckRvY3VtZW50ICE9IGRvY3VtZW50ICkge1xuXHRcdFx0XHRcdFx0c2V0RG9jdW1lbnQoIGVsZW0gKTtcblx0XHRcdFx0XHRcdHhtbCA9ICFkb2N1bWVudElzSFRNTDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0d2hpbGUgKCAoIG1hdGNoZXIgPSBlbGVtZW50TWF0Y2hlcnNbIGorKyBdICkgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQgfHwgZG9jdW1lbnQsIHhtbCApICkge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggb3V0ZXJtb3N0ICkge1xuXHRcdFx0XHRcdFx0ZGlycnVucyA9IGRpcnJ1bnNVbmlxdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gVHJhY2sgdW5tYXRjaGVkIGVsZW1lbnRzIGZvciBzZXQgZmlsdGVyc1xuXHRcdFx0XHRpZiAoIGJ5U2V0ICkge1xuXG5cdFx0XHRcdFx0Ly8gVGhleSB3aWxsIGhhdmUgZ29uZSB0aHJvdWdoIGFsbCBwb3NzaWJsZSBtYXRjaGVyc1xuXHRcdFx0XHRcdGlmICggKCBlbGVtID0gIW1hdGNoZXIgJiYgZWxlbSApICkge1xuXHRcdFx0XHRcdFx0bWF0Y2hlZENvdW50LS07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gTGVuZ3RoZW4gdGhlIGFycmF5IGZvciBldmVyeSBlbGVtZW50LCBtYXRjaGVkIG9yIG5vdFxuXHRcdFx0XHRcdGlmICggc2VlZCApIHtcblx0XHRcdFx0XHRcdHVubWF0Y2hlZC5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGBpYCBpcyBub3cgdGhlIGNvdW50IG9mIGVsZW1lbnRzIHZpc2l0ZWQgYWJvdmUsIGFuZCBhZGRpbmcgaXQgdG8gYG1hdGNoZWRDb3VudGBcblx0XHRcdC8vIG1ha2VzIHRoZSBsYXR0ZXIgbm9ubmVnYXRpdmUuXG5cdFx0XHRtYXRjaGVkQ291bnQgKz0gaTtcblxuXHRcdFx0Ly8gQXBwbHkgc2V0IGZpbHRlcnMgdG8gdW5tYXRjaGVkIGVsZW1lbnRzXG5cdFx0XHQvLyBOT1RFOiBUaGlzIGNhbiBiZSBza2lwcGVkIGlmIHRoZXJlIGFyZSBubyB1bm1hdGNoZWQgZWxlbWVudHMgKGkuZS4sIGBtYXRjaGVkQ291bnRgXG5cdFx0XHQvLyBlcXVhbHMgYGlgKSwgdW5sZXNzIHdlIGRpZG4ndCB2aXNpdCBfYW55XyBlbGVtZW50cyBpbiB0aGUgYWJvdmUgbG9vcCBiZWNhdXNlIHdlIGhhdmVcblx0XHRcdC8vIG5vIGVsZW1lbnQgbWF0Y2hlcnMgYW5kIG5vIHNlZWQuXG5cdFx0XHQvLyBJbmNyZW1lbnRpbmcgYW4gaW5pdGlhbGx5LXN0cmluZyBcIjBcIiBgaWAgYWxsb3dzIGBpYCB0byByZW1haW4gYSBzdHJpbmcgb25seSBpbiB0aGF0XG5cdFx0XHQvLyBjYXNlLCB3aGljaCB3aWxsIHJlc3VsdCBpbiBhIFwiMDBcIiBgbWF0Y2hlZENvdW50YCB0aGF0IGRpZmZlcnMgZnJvbSBgaWAgYnV0IGlzIGFsc29cblx0XHRcdC8vIG51bWVyaWNhbGx5IHplcm8uXG5cdFx0XHRpZiAoIGJ5U2V0ICYmIGkgIT09IG1hdGNoZWRDb3VudCApIHtcblx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdHdoaWxlICggKCBtYXRjaGVyID0gc2V0TWF0Y2hlcnNbIGorKyBdICkgKSB7XG5cdFx0XHRcdFx0bWF0Y2hlciggdW5tYXRjaGVkLCBzZXRNYXRjaGVkLCBjb250ZXh0LCB4bWwgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggc2VlZCApIHtcblxuXHRcdFx0XHRcdC8vIFJlaW50ZWdyYXRlIGVsZW1lbnQgbWF0Y2hlcyB0byBlbGltaW5hdGUgdGhlIG5lZWQgZm9yIHNvcnRpbmdcblx0XHRcdFx0XHRpZiAoIG1hdGNoZWRDb3VudCA+IDAgKSB7XG5cdFx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCAhKCB1bm1hdGNoZWRbIGkgXSB8fCBzZXRNYXRjaGVkWyBpIF0gKSApIHtcblx0XHRcdFx0XHRcdFx0XHRzZXRNYXRjaGVkWyBpIF0gPSBwb3AuY2FsbCggcmVzdWx0cyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gRGlzY2FyZCBpbmRleCBwbGFjZWhvbGRlciB2YWx1ZXMgdG8gZ2V0IG9ubHkgYWN0dWFsIG1hdGNoZXNcblx0XHRcdFx0XHRzZXRNYXRjaGVkID0gY29uZGVuc2UoIHNldE1hdGNoZWQgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFkZCBtYXRjaGVzIHRvIHJlc3VsdHNcblx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgc2V0TWF0Y2hlZCApO1xuXG5cdFx0XHRcdC8vIFNlZWRsZXNzIHNldCBtYXRjaGVzIHN1Y2NlZWRpbmcgbXVsdGlwbGUgc3VjY2Vzc2Z1bCBtYXRjaGVycyBzdGlwdWxhdGUgc29ydGluZ1xuXHRcdFx0XHRpZiAoIG91dGVybW9zdCAmJiAhc2VlZCAmJiBzZXRNYXRjaGVkLmxlbmd0aCA+IDAgJiZcblx0XHRcdFx0XHQoIG1hdGNoZWRDb3VudCArIHNldE1hdGNoZXJzLmxlbmd0aCApID4gMSApIHtcblxuXHRcdFx0XHRcdFNpenpsZS51bmlxdWVTb3J0KCByZXN1bHRzICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gT3ZlcnJpZGUgbWFuaXB1bGF0aW9uIG9mIGdsb2JhbHMgYnkgbmVzdGVkIG1hdGNoZXJzXG5cdFx0XHRpZiAoIG91dGVybW9zdCApIHtcblx0XHRcdFx0ZGlycnVucyA9IGRpcnJ1bnNVbmlxdWU7XG5cdFx0XHRcdG91dGVybW9zdENvbnRleHQgPSBjb250ZXh0QmFja3VwO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdW5tYXRjaGVkO1xuXHRcdH07XG5cblx0cmV0dXJuIGJ5U2V0ID9cblx0XHRtYXJrRnVuY3Rpb24oIHN1cGVyTWF0Y2hlciApIDpcblx0XHRzdXBlck1hdGNoZXI7XG59XG5cbmNvbXBpbGUgPSBTaXp6bGUuY29tcGlsZSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgbWF0Y2ggLyogSW50ZXJuYWwgVXNlIE9ubHkgKi8gKSB7XG5cdHZhciBpLFxuXHRcdHNldE1hdGNoZXJzID0gW10sXG5cdFx0ZWxlbWVudE1hdGNoZXJzID0gW10sXG5cdFx0Y2FjaGVkID0gY29tcGlsZXJDYWNoZVsgc2VsZWN0b3IgKyBcIiBcIiBdO1xuXG5cdGlmICggIWNhY2hlZCApIHtcblxuXHRcdC8vIEdlbmVyYXRlIGEgZnVuY3Rpb24gb2YgcmVjdXJzaXZlIGZ1bmN0aW9ucyB0aGF0IGNhbiBiZSB1c2VkIHRvIGNoZWNrIGVhY2ggZWxlbWVudFxuXHRcdGlmICggIW1hdGNoICkge1xuXHRcdFx0bWF0Y2ggPSB0b2tlbml6ZSggc2VsZWN0b3IgKTtcblx0XHR9XG5cdFx0aSA9IG1hdGNoLmxlbmd0aDtcblx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdGNhY2hlZCA9IG1hdGNoZXJGcm9tVG9rZW5zKCBtYXRjaFsgaSBdICk7XG5cdFx0XHRpZiAoIGNhY2hlZFsgZXhwYW5kbyBdICkge1xuXHRcdFx0XHRzZXRNYXRjaGVycy5wdXNoKCBjYWNoZWQgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1lbnRNYXRjaGVycy5wdXNoKCBjYWNoZWQgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDYWNoZSB0aGUgY29tcGlsZWQgZnVuY3Rpb25cblx0XHRjYWNoZWQgPSBjb21waWxlckNhY2hlKFxuXHRcdFx0c2VsZWN0b3IsXG5cdFx0XHRtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMoIGVsZW1lbnRNYXRjaGVycywgc2V0TWF0Y2hlcnMgKVxuXHRcdCk7XG5cblx0XHQvLyBTYXZlIHNlbGVjdG9yIGFuZCB0b2tlbml6YXRpb25cblx0XHRjYWNoZWQuc2VsZWN0b3IgPSBzZWxlY3Rvcjtcblx0fVxuXHRyZXR1cm4gY2FjaGVkO1xufTtcblxuLyoqXG4gKiBBIGxvdy1sZXZlbCBzZWxlY3Rpb24gZnVuY3Rpb24gdGhhdCB3b3JrcyB3aXRoIFNpenpsZSdzIGNvbXBpbGVkXG4gKiAgc2VsZWN0b3IgZnVuY3Rpb25zXG4gKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gc2VsZWN0b3IgQSBzZWxlY3RvciBvciBhIHByZS1jb21waWxlZFxuICogIHNlbGVjdG9yIGZ1bmN0aW9uIGJ1aWx0IHdpdGggU2l6emxlLmNvbXBpbGVcbiAqIEBwYXJhbSB7RWxlbWVudH0gY29udGV4dFxuICogQHBhcmFtIHtBcnJheX0gW3Jlc3VsdHNdXG4gKiBAcGFyYW0ge0FycmF5fSBbc2VlZF0gQSBzZXQgb2YgZWxlbWVudHMgdG8gbWF0Y2ggYWdhaW5zdFxuICovXG5zZWxlY3QgPSBTaXp6bGUuc2VsZWN0ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICkge1xuXHR2YXIgaSwgdG9rZW5zLCB0b2tlbiwgdHlwZSwgZmluZCxcblx0XHRjb21waWxlZCA9IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJmdW5jdGlvblwiICYmIHNlbGVjdG9yLFxuXHRcdG1hdGNoID0gIXNlZWQgJiYgdG9rZW5pemUoICggc2VsZWN0b3IgPSBjb21waWxlZC5zZWxlY3RvciB8fCBzZWxlY3RvciApICk7XG5cblx0cmVzdWx0cyA9IHJlc3VsdHMgfHwgW107XG5cblx0Ly8gVHJ5IHRvIG1pbmltaXplIG9wZXJhdGlvbnMgaWYgdGhlcmUgaXMgb25seSBvbmUgc2VsZWN0b3IgaW4gdGhlIGxpc3QgYW5kIG5vIHNlZWRcblx0Ly8gKHRoZSBsYXR0ZXIgb2Ygd2hpY2ggZ3VhcmFudGVlcyB1cyBjb250ZXh0KVxuXHRpZiAoIG1hdGNoLmxlbmd0aCA9PT0gMSApIHtcblxuXHRcdC8vIFJlZHVjZSBjb250ZXh0IGlmIHRoZSBsZWFkaW5nIGNvbXBvdW5kIHNlbGVjdG9yIGlzIGFuIElEXG5cdFx0dG9rZW5zID0gbWF0Y2hbIDAgXSA9IG1hdGNoWyAwIF0uc2xpY2UoIDAgKTtcblx0XHRpZiAoIHRva2Vucy5sZW5ndGggPiAyICYmICggdG9rZW4gPSB0b2tlbnNbIDAgXSApLnR5cGUgPT09IFwiSURcIiAmJlxuXHRcdFx0Y29udGV4dC5ub2RlVHlwZSA9PT0gOSAmJiBkb2N1bWVudElzSFRNTCAmJiBFeHByLnJlbGF0aXZlWyB0b2tlbnNbIDEgXS50eXBlIF0gKSB7XG5cblx0XHRcdGNvbnRleHQgPSAoIEV4cHIuZmluZFsgXCJJRFwiIF0oIHRva2VuLm1hdGNoZXNbIDAgXVxuXHRcdFx0XHQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKSwgY29udGV4dCApIHx8IFtdIClbIDAgXTtcblx0XHRcdGlmICggIWNvbnRleHQgKSB7XG5cdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXG5cdFx0XHQvLyBQcmVjb21waWxlZCBtYXRjaGVycyB3aWxsIHN0aWxsIHZlcmlmeSBhbmNlc3RyeSwgc28gc3RlcCB1cCBhIGxldmVsXG5cdFx0XHR9IGVsc2UgaWYgKCBjb21waWxlZCApIHtcblx0XHRcdFx0Y29udGV4dCA9IGNvbnRleHQucGFyZW50Tm9kZTtcblx0XHRcdH1cblxuXHRcdFx0c2VsZWN0b3IgPSBzZWxlY3Rvci5zbGljZSggdG9rZW5zLnNoaWZ0KCkudmFsdWUubGVuZ3RoICk7XG5cdFx0fVxuXG5cdFx0Ly8gRmV0Y2ggYSBzZWVkIHNldCBmb3IgcmlnaHQtdG8tbGVmdCBtYXRjaGluZ1xuXHRcdGkgPSBtYXRjaEV4cHJbIFwibmVlZHNDb250ZXh0XCIgXS50ZXN0KCBzZWxlY3RvciApID8gMCA6IHRva2Vucy5sZW5ndGg7XG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHR0b2tlbiA9IHRva2Vuc1sgaSBdO1xuXG5cdFx0XHQvLyBBYm9ydCBpZiB3ZSBoaXQgYSBjb21iaW5hdG9yXG5cdFx0XHRpZiAoIEV4cHIucmVsYXRpdmVbICggdHlwZSA9IHRva2VuLnR5cGUgKSBdICkge1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGlmICggKCBmaW5kID0gRXhwci5maW5kWyB0eXBlIF0gKSApIHtcblxuXHRcdFx0XHQvLyBTZWFyY2gsIGV4cGFuZGluZyBjb250ZXh0IGZvciBsZWFkaW5nIHNpYmxpbmcgY29tYmluYXRvcnNcblx0XHRcdFx0aWYgKCAoIHNlZWQgPSBmaW5kKFxuXHRcdFx0XHRcdHRva2VuLm1hdGNoZXNbIDAgXS5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLFxuXHRcdFx0XHRcdHJzaWJsaW5nLnRlc3QoIHRva2Vuc1sgMCBdLnR5cGUgKSAmJiB0ZXN0Q29udGV4dCggY29udGV4dC5wYXJlbnROb2RlICkgfHxcblx0XHRcdFx0XHRcdGNvbnRleHRcblx0XHRcdFx0KSApICkge1xuXG5cdFx0XHRcdFx0Ly8gSWYgc2VlZCBpcyBlbXB0eSBvciBubyB0b2tlbnMgcmVtYWluLCB3ZSBjYW4gcmV0dXJuIGVhcmx5XG5cdFx0XHRcdFx0dG9rZW5zLnNwbGljZSggaSwgMSApO1xuXHRcdFx0XHRcdHNlbGVjdG9yID0gc2VlZC5sZW5ndGggJiYgdG9TZWxlY3RvciggdG9rZW5zICk7XG5cdFx0XHRcdFx0aWYgKCAhc2VsZWN0b3IgKSB7XG5cdFx0XHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBzZWVkICk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIENvbXBpbGUgYW5kIGV4ZWN1dGUgYSBmaWx0ZXJpbmcgZnVuY3Rpb24gaWYgb25lIGlzIG5vdCBwcm92aWRlZFxuXHQvLyBQcm92aWRlIGBtYXRjaGAgdG8gYXZvaWQgcmV0b2tlbml6YXRpb24gaWYgd2UgbW9kaWZpZWQgdGhlIHNlbGVjdG9yIGFib3ZlXG5cdCggY29tcGlsZWQgfHwgY29tcGlsZSggc2VsZWN0b3IsIG1hdGNoICkgKShcblx0XHRzZWVkLFxuXHRcdGNvbnRleHQsXG5cdFx0IWRvY3VtZW50SXNIVE1MLFxuXHRcdHJlc3VsdHMsXG5cdFx0IWNvbnRleHQgfHwgcnNpYmxpbmcudGVzdCggc2VsZWN0b3IgKSAmJiB0ZXN0Q29udGV4dCggY29udGV4dC5wYXJlbnROb2RlICkgfHwgY29udGV4dFxuXHQpO1xuXHRyZXR1cm4gcmVzdWx0cztcbn07XG5cbi8vIE9uZS10aW1lIGFzc2lnbm1lbnRzXG5cbi8vIFNvcnQgc3RhYmlsaXR5XG5zdXBwb3J0LnNvcnRTdGFibGUgPSBleHBhbmRvLnNwbGl0KCBcIlwiICkuc29ydCggc29ydE9yZGVyICkuam9pbiggXCJcIiApID09PSBleHBhbmRvO1xuXG4vLyBTdXBwb3J0OiBDaHJvbWUgMTQtMzUrXG4vLyBBbHdheXMgYXNzdW1lIGR1cGxpY2F0ZXMgaWYgdGhleSBhcmVuJ3QgcGFzc2VkIHRvIHRoZSBjb21wYXJpc29uIGZ1bmN0aW9uXG5zdXBwb3J0LmRldGVjdER1cGxpY2F0ZXMgPSAhIWhhc0R1cGxpY2F0ZTtcblxuLy8gSW5pdGlhbGl6ZSBhZ2FpbnN0IHRoZSBkZWZhdWx0IGRvY3VtZW50XG5zZXREb2N1bWVudCgpO1xuXG4vLyBTdXBwb3J0OiBXZWJraXQ8NTM3LjMyIC0gU2FmYXJpIDYuMC4zL0Nocm9tZSAyNSAoZml4ZWQgaW4gQ2hyb21lIDI3KVxuLy8gRGV0YWNoZWQgbm9kZXMgY29uZm91bmRpbmdseSBmb2xsb3cgKmVhY2ggb3RoZXIqXG5zdXBwb3J0LnNvcnREZXRhY2hlZCA9IGFzc2VydCggZnVuY3Rpb24oIGVsICkge1xuXG5cdC8vIFNob3VsZCByZXR1cm4gMSwgYnV0IHJldHVybnMgNCAoZm9sbG93aW5nKVxuXHRyZXR1cm4gZWwuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZmllbGRzZXRcIiApICkgJiAxO1xufSApO1xuXG4vLyBTdXBwb3J0OiBJRTw4XG4vLyBQcmV2ZW50IGF0dHJpYnV0ZS9wcm9wZXJ0eSBcImludGVycG9sYXRpb25cIlxuLy8gaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzNjQyOSUyOFZTLjg1JTI5LmFzcHhcbmlmICggIWFzc2VydCggZnVuY3Rpb24oIGVsICkge1xuXHRlbC5pbm5lckhUTUwgPSBcIjxhIGhyZWY9JyMnPjwvYT5cIjtcblx0cmV0dXJuIGVsLmZpcnN0Q2hpbGQuZ2V0QXR0cmlidXRlKCBcImhyZWZcIiApID09PSBcIiNcIjtcbn0gKSApIHtcblx0YWRkSGFuZGxlKCBcInR5cGV8aHJlZnxoZWlnaHR8d2lkdGhcIiwgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdGlmICggIWlzWE1MICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lLCBuYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwidHlwZVwiID8gMSA6IDIgKTtcblx0XHR9XG5cdH0gKTtcbn1cblxuLy8gU3VwcG9ydDogSUU8OVxuLy8gVXNlIGRlZmF1bHRWYWx1ZSBpbiBwbGFjZSBvZiBnZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKVxuaWYgKCAhc3VwcG9ydC5hdHRyaWJ1dGVzIHx8ICFhc3NlcnQoIGZ1bmN0aW9uKCBlbCApIHtcblx0ZWwuaW5uZXJIVE1MID0gXCI8aW5wdXQvPlwiO1xuXHRlbC5maXJzdENoaWxkLnNldEF0dHJpYnV0ZSggXCJ2YWx1ZVwiLCBcIlwiICk7XG5cdHJldHVybiBlbC5maXJzdENoaWxkLmdldEF0dHJpYnV0ZSggXCJ2YWx1ZVwiICkgPT09IFwiXCI7XG59ICkgKSB7XG5cdGFkZEhhbmRsZSggXCJ2YWx1ZVwiLCBmdW5jdGlvbiggZWxlbSwgX25hbWUsIGlzWE1MICkge1xuXHRcdGlmICggIWlzWE1MICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnB1dFwiICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0fSApO1xufVxuXG4vLyBTdXBwb3J0OiBJRTw5XG4vLyBVc2UgZ2V0QXR0cmlidXRlTm9kZSB0byBmZXRjaCBib29sZWFucyB3aGVuIGdldEF0dHJpYnV0ZSBsaWVzXG5pZiAoICFhc3NlcnQoIGZ1bmN0aW9uKCBlbCApIHtcblx0cmV0dXJuIGVsLmdldEF0dHJpYnV0ZSggXCJkaXNhYmxlZFwiICkgPT0gbnVsbDtcbn0gKSApIHtcblx0YWRkSGFuZGxlKCBib29sZWFucywgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdHZhciB2YWw7XG5cdFx0aWYgKCAhaXNYTUwgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbVsgbmFtZSBdID09PSB0cnVlID8gbmFtZS50b0xvd2VyQ2FzZSgpIDpcblx0XHRcdFx0KCB2YWwgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIG5hbWUgKSApICYmIHZhbC5zcGVjaWZpZWQgP1xuXHRcdFx0XHRcdHZhbC52YWx1ZSA6XG5cdFx0XHRcdFx0bnVsbDtcblx0XHR9XG5cdH0gKTtcbn1cblxuLy8gRVhQT1NFXG52YXIgX3NpenpsZSA9IHdpbmRvdy5TaXp6bGU7XG5cblNpenpsZS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG5cdGlmICggd2luZG93LlNpenpsZSA9PT0gU2l6emxlICkge1xuXHRcdHdpbmRvdy5TaXp6bGUgPSBfc2l6emxlO1xuXHR9XG5cblx0cmV0dXJuIFNpenpsZTtcbn07XG5cbmlmICggdHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQgKSB7XG5cdGRlZmluZSggZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIFNpenpsZTtcblx0fSApO1xuXG4vLyBTaXp6bGUgcmVxdWlyZXMgdGhhdCB0aGVyZSBiZSBhIGdsb2JhbCB3aW5kb3cgaW4gQ29tbW9uLUpTIGxpa2UgZW52aXJvbm1lbnRzXG59IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmIG1vZHVsZS5leHBvcnRzICkge1xuXHRtb2R1bGUuZXhwb3J0cyA9IFNpenpsZTtcbn0gZWxzZSB7XG5cdHdpbmRvdy5TaXp6bGUgPSBTaXp6bGU7XG59XG5cbi8vIEVYUE9TRVxuXG59ICkoIHdpbmRvdyApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9zaXp6bGUvZGlzdC9zaXp6bGUuanMiLCJleHBvcnQgeyBkZWZhdWx0IGFzIHNlbGVjdCwgZ2V0U2luZ2xlU2VsZWN0b3IsIGdldE11bHRpU2VsZWN0b3IgfSBmcm9tICcuL3NlbGVjdCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgbWF0Y2gsIGluaXRPcHRpb25zIH0gZnJvbSAnLi9tYXRjaCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgb3B0aW1pemUgfSBmcm9tICcuL29wdGltaXplJ1xuZXhwb3J0ICogYXMgY29tbW9uIGZyb20gJy4vY29tbW9uJ1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==