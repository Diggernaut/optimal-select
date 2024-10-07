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
  if (Array.isArray(path)) {
    return path.entries.map(function (entry) {
      return entry.getQuerySelector(entry, options);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiNjczY2RiYjc1N2U3YjBkOTA1ZCIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9wYXR0ZXJuLmpzIiwid2VicGFjazovLy8uL3NyYy9zZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9tYXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3B0aW1pemUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L3NpenpsZS9kaXN0L3NpenpsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiY29udmVydE5vZGVMaXN0Iiwibm9kZXMiLCJsZW5ndGgiLCJhcnIiLCJBcnJheSIsImkiLCJlc2NhcGVWYWx1ZSIsInZhbHVlIiwicmVwbGFjZSIsInBhcnRpdGlvbiIsImFycmF5IiwicHJlZGljYXRlIiwicmVkdWNlIiwiaXRlbSIsImlubmVyIiwib3V0ZXIiLCJjb25jYXQiLCJpc1ZhbGlkQ1NTSWRlbnRpZmllciIsInRlc3QiLCJjcmVhdGVQYXR0ZXJuIiwiYmFzZSIsImF0dHJpYnV0ZXMiLCJjbGFzc2VzIiwicHNldWRvIiwiZGVzY2VuZGFudHMiLCJhdHRyaWJ1dGVzVG9TZWxlY3RvciIsIm1hcCIsIm5hbWUiLCJqb2luIiwiY2xhc3Nlc1RvU2VsZWN0b3IiLCJjIiwicHNldWRvVG9TZWxlY3RvciIsInBhdHRlcm5Ub1NlbGVjdG9yIiwicGF0dGVybiIsInJlbGF0ZXMiLCJ0YWciLCJwYXRoVG9TZWxlY3RvciIsInBhdGgiLCJjb252ZXJ0RXNjYXBpbmciLCJhdHRyaWJ1dGVzVG9YUGF0aCIsImNsYXNzZXNUb1hQYXRoIiwicHNldWRvVG9YUGF0aCIsIm1hdGNoIiwicCIsInBhdHRlcm5Ub1hQYXRoIiwiZGVzY2VuZGFudHNUb1hQYXRoIiwicGF0aFRvWFBhdGgiLCJjaGlsZHJlbiIsInRvU3RyaW5nIiwianF1ZXJ5IiwiY3NzIiwieHBhdGgiLCJnZXRUb1N0cmluZyIsIm9wdGlvbnMiLCJmb3JtYXQiLCJTaXp6bGUiLCJzZWxlY3RKUXVlcnkiLCJzZWxlY3RvciIsInBhcmVudCIsInJlcXVpcmUiLCJkb2N1bWVudCIsInNlbGVjdFhQYXRoIiwiZG9jIiwicGFyZW50Tm9kZSIsInN0YXJ0c1dpdGgiLCJpdGVyYXRvciIsImV2YWx1YXRlIiwiZWxlbWVudHMiLCJlbGVtZW50IiwiaXRlcmF0ZU5leHQiLCJwdXNoIiwic2VsZWN0Q1NTIiwicXVlcnlTZWxlY3RvckFsbCIsInNlbGVjdCIsImdldFNlbGVjdCIsInJvb3QiLCJlcnIiLCJnZXRDb21tb25BbmNlc3RvciIsImFuY2VzdG9ycyIsImZvckVhY2giLCJpbmRleCIsInBhcmVudHMiLCJ1bnNoaWZ0Iiwic29ydCIsImN1cnIiLCJuZXh0Iiwic2hhbGxvd0FuY2VzdG9yIiwic2hpZnQiLCJhbmNlc3RvciIsIm1pc3NpbmciLCJzb21lIiwib3RoZXJQYXJlbnRzIiwib3RoZXJQYXJlbnQiLCJsIiwiZ2V0Q29tbW9uUHJvcGVydGllcyIsImlnbm9yZSIsImNvbW1vblByb3BlcnRpZXMiLCJjb21tb25DbGFzc2VzIiwiY29tbW9uQXR0cmlidXRlcyIsImNvbW1vblRhZyIsInVuZGVmaW5lZCIsImdldEF0dHJpYnV0ZSIsInRyaW0iLCJzcGxpdCIsImZpbHRlciIsImNsYXNzIiwiY2xzIiwiZW50cnkiLCJlbGVtZW50QXR0cmlidXRlcyIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJhdHRyaWJ1dGUiLCJhdHRyaWJ1dGVOYW1lIiwiYXR0cmlidXRlc05hbWVzIiwiY29tbW9uQXR0cmlidXRlc05hbWVzIiwibmV4dENvbW1vbkF0dHJpYnV0ZXMiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJkZWZhdWx0SWdub3JlIiwiaW5kZXhPZiIsImNvbnRhaW5zIiwiaW5pdE9wdGlvbnMiLCJza2lwIiwicHJpb3JpdHkiLCJub2RlIiwibmVzdGVkIiwic2tpcENvbXBhcmUiLCJpc0FycmF5Iiwic2tpcENoZWNrcyIsImNvbXBhcmUiLCJ0eXBlIiwiUmVnRXhwIiwibm9kZVR5cGUiLCJjaGVja0F0dHJpYnV0ZXMiLCJjaGVja1RhZyIsImluY2x1ZGVzIiwiY2hlY2tSZWN1cnNpdmVEZXNjZW5kYW50cyIsImNoZWNrVGV4dCIsImNoZWNrTnRoQ2hpbGQiLCJmaW5kUGF0dGVybiIsImZpbmRBdHRyaWJ1dGVzUGF0dGVybiIsImNvbWJpbmF0aW9ucyIsInZhbHVlcyIsIm1pbiIsIm1heCIsInJlc3VsdCIsInIiLCJ2IiwibWF4U3Vic2V0U2l6ZSIsIml0ZW1zIiwiZ2V0Q2xhc3NTZWxlY3RvciIsImZpbmQiLCJtYXRjaGVzIiwiYXR0cmlidXRlTmFtZXMiLCJ2YWwiLCJhIiwic29ydGVkS2V5cyIsImlzT3B0aW1hbCIsImF0dHJpYnV0ZVZhbHVlIiwidXNlTmFtZWRJZ25vcmUiLCJjdXJyZW50SWdub3JlIiwiY3VycmVudERlZmF1bHRJZ25vcmUiLCJjaGVja0lnbm9yZSIsImNsYXNzTmFtZXMiLCJjbGFzc0lnbm9yZSIsImNsYXNzTmFtZSIsImZpbmRUYWdQYXR0ZXJuIiwiY2hpbGQiLCJjaGlsZFBhdHRlcm4iLCJjb25zb2xlIiwid2FybiIsInRleHRDb250ZW50IiwiZmlyc3RDaGlsZCIsIm5vZGVWYWx1ZSIsInRleHRzIiwidGV4dCIsImZyb20iLCJkZXNjZW5kYW50UGF0aCIsInBhcmVudEVsZW1lbnQiLCJkZWZhdWx0UHJlZGljYXRlIiwiY2hlY2siLCJvcHRpbWl6ZSIsIkVycm9yIiwib3B0aW1pemVQYXJ0IiwiZW5kT3B0aW1pemVkIiwic2xpY2UiLCJzaG9ydGVuZWQiLCJwb3AiLCJjdXJyZW50IiwiaGFzU2FtZVJlc3VsdCIsImV2ZXJ5Iiwib3B0aW1pemVUZXh0IiwicHJlIiwicG9zdCIsIm90aGVyIiwib3B0aW1pemVkIiwiY29tcGFyZVJlc3VsdHMiLCJvcHRpbWl6ZUF0dHJpYnV0ZXMiLCJzaW1wbGlmeSIsIm9yaWdpbmFsIiwiZ2V0U2ltcGxpZmllZCIsInNpbXBsaWZpZWQiLCJvcHRpbWl6ZURlc2NlbmRhbnQiLCJkZXNjZW5kYW50Iiwib3B0aW1pemVSZWN1cnNpdmVEZXNjZW5kYW50cyIsIm9wdGltaXplTnRoT2ZUeXBlIiwiZmluZEluZGV4IiwibnRoT2ZUeXBlIiwib3B0aW1pemVDbGFzc2VzIiwicmVmZXJlbmNlcyIsInJlZmVyZW5jZSIsImRlc2NyaXB0aW9uIiwib3B0aW1pemVycyIsImFjYyIsIm9wdGltaXplciIsImdldFF1ZXJ5U2VsZWN0b3IiLCJnZXRTaW5nbGVTZWxlY3RvclBhdGgiLCJvcHRpbWl6ZWRQYXRoIiwiZ2V0TXVsdGlTZWxlY3RvclBhdGgiLCJhbmNlc3RvclBhdGgiLCJjb21tb25QYXRoIiwiZ2V0Q29tbW9uUGF0aCIsImRlc2NlbmRhbnRQYXR0ZXJuIiwic2VsZWN0b3JQYXRoIiwic2VsZWN0b3JNYXRjaGVzIiwiaW5wdXQiLCJlbnRyaWVzIiwid2luZG93Iiwic3VwcG9ydCIsIkV4cHIiLCJnZXRUZXh0IiwiaXNYTUwiLCJ0b2tlbml6ZSIsImNvbXBpbGUiLCJvdXRlcm1vc3RDb250ZXh0Iiwic29ydElucHV0IiwiaGFzRHVwbGljYXRlIiwic2V0RG9jdW1lbnQiLCJkb2NFbGVtIiwiZG9jdW1lbnRJc0hUTUwiLCJyYnVnZ3lRU0EiLCJyYnVnZ3lNYXRjaGVzIiwiZXhwYW5kbyIsIkRhdGUiLCJwcmVmZXJyZWREb2MiLCJkaXJydW5zIiwiZG9uZSIsImNsYXNzQ2FjaGUiLCJjcmVhdGVDYWNoZSIsInRva2VuQ2FjaGUiLCJjb21waWxlckNhY2hlIiwibm9ubmF0aXZlU2VsZWN0b3JDYWNoZSIsInNvcnRPcmRlciIsImIiLCJoYXNPd24iLCJoYXNPd25Qcm9wZXJ0eSIsInB1c2hOYXRpdmUiLCJsaXN0IiwiZWxlbSIsImxlbiIsImJvb2xlYW5zIiwid2hpdGVzcGFjZSIsImlkZW50aWZpZXIiLCJwc2V1ZG9zIiwicndoaXRlc3BhY2UiLCJydHJpbSIsInJjb21tYSIsInJjb21iaW5hdG9ycyIsInJkZXNjZW5kIiwicnBzZXVkbyIsInJpZGVudGlmaWVyIiwibWF0Y2hFeHByIiwicmh0bWwiLCJyaW5wdXRzIiwicmhlYWRlciIsInJuYXRpdmUiLCJycXVpY2tFeHByIiwicnNpYmxpbmciLCJydW5lc2NhcGUiLCJmdW5lc2NhcGUiLCJlc2NhcGUiLCJub25IZXgiLCJoaWdoIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwicmNzc2VzY2FwZSIsImZjc3Nlc2NhcGUiLCJjaCIsImFzQ29kZVBvaW50IiwiY2hhckNvZGVBdCIsInVubG9hZEhhbmRsZXIiLCJpbkRpc2FibGVkRmllbGRzZXQiLCJhZGRDb21iaW5hdG9yIiwiZGlzYWJsZWQiLCJub2RlTmFtZSIsImRpciIsImFwcGx5IiwiY2FsbCIsImNoaWxkTm9kZXMiLCJlIiwidGFyZ2V0IiwiZWxzIiwiaiIsImNvbnRleHQiLCJyZXN1bHRzIiwic2VlZCIsIm0iLCJuaWQiLCJncm91cHMiLCJuZXdTZWxlY3RvciIsIm5ld0NvbnRleHQiLCJvd25lckRvY3VtZW50IiwiZXhlYyIsImdldEVsZW1lbnRCeUlkIiwiaWQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJxc2EiLCJ0ZXN0Q29udGV4dCIsInNjb3BlIiwic2V0QXR0cmlidXRlIiwidG9TZWxlY3RvciIsInFzYUVycm9yIiwicmVtb3ZlQXR0cmlidXRlIiwiY2FjaGUiLCJjYWNoZUxlbmd0aCIsIm1hcmtGdW5jdGlvbiIsImZuIiwiYXNzZXJ0IiwiZWwiLCJjcmVhdGVFbGVtZW50IiwicmVtb3ZlQ2hpbGQiLCJhZGRIYW5kbGUiLCJhdHRycyIsImhhbmRsZXIiLCJhdHRySGFuZGxlIiwic2libGluZ0NoZWNrIiwiY3VyIiwiZGlmZiIsInNvdXJjZUluZGV4IiwibmV4dFNpYmxpbmciLCJjcmVhdGVJbnB1dFBzZXVkbyIsImNyZWF0ZUJ1dHRvblBzZXVkbyIsImNyZWF0ZURpc2FibGVkUHNldWRvIiwiaXNEaXNhYmxlZCIsImNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8iLCJhcmd1bWVudCIsIm1hdGNoSW5kZXhlcyIsIm5hbWVzcGFjZSIsIm5hbWVzcGFjZVVSSSIsImRvY3VtZW50RWxlbWVudCIsImhhc0NvbXBhcmUiLCJzdWJXaW5kb3ciLCJkZWZhdWx0VmlldyIsInRvcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRhY2hFdmVudCIsImFwcGVuZENoaWxkIiwiY3JlYXRlQ29tbWVudCIsImdldEJ5SWQiLCJnZXRFbGVtZW50c0J5TmFtZSIsImF0dHJJZCIsImdldEF0dHJpYnV0ZU5vZGUiLCJlbGVtcyIsInRtcCIsImlubmVySFRNTCIsIm1hdGNoZXNTZWxlY3RvciIsIndlYmtpdE1hdGNoZXNTZWxlY3RvciIsIm1vek1hdGNoZXNTZWxlY3RvciIsIm9NYXRjaGVzU2VsZWN0b3IiLCJtc01hdGNoZXNTZWxlY3RvciIsImRpc2Nvbm5lY3RlZE1hdGNoIiwiY29tcGFyZURvY3VtZW50UG9zaXRpb24iLCJhZG93biIsImJ1cCIsInNvcnREZXRhY2hlZCIsImF1cCIsImFwIiwiYnAiLCJleHByIiwicmV0IiwiYXR0ciIsInNwZWNpZmllZCIsInNlbCIsImVycm9yIiwibXNnIiwidW5pcXVlU29ydCIsImR1cGxpY2F0ZXMiLCJkZXRlY3REdXBsaWNhdGVzIiwic29ydFN0YWJsZSIsInNwbGljZSIsInNlbGVjdG9ycyIsImNyZWF0ZVBzZXVkbyIsInJlbGF0aXZlIiwiZmlyc3QiLCJwcmVGaWx0ZXIiLCJleGNlc3MiLCJ1bnF1b3RlZCIsIm5vZGVOYW1lU2VsZWN0b3IiLCJvcGVyYXRvciIsIndoYXQiLCJfYXJndW1lbnQiLCJsYXN0Iiwic2ltcGxlIiwiZm9yd2FyZCIsIm9mVHlwZSIsIl9jb250ZXh0IiwieG1sIiwidW5pcXVlQ2FjaGUiLCJvdXRlckNhY2hlIiwibm9kZUluZGV4Iiwic3RhcnQiLCJ1c2VDYWNoZSIsImxhc3RDaGlsZCIsInVuaXF1ZUlEIiwiYXJncyIsInNldEZpbHRlcnMiLCJpZHgiLCJtYXRjaGVkIiwibWF0Y2hlciIsInVubWF0Y2hlZCIsImxhbmciLCJlbGVtTGFuZyIsImhhc2giLCJsb2NhdGlvbiIsImFjdGl2ZUVsZW1lbnQiLCJoYXNGb2N1cyIsImhyZWYiLCJ0YWJJbmRleCIsImNoZWNrZWQiLCJzZWxlY3RlZCIsInNlbGVjdGVkSW5kZXgiLCJfbWF0Y2hJbmRleGVzIiwicmFkaW8iLCJjaGVja2JveCIsImZpbGUiLCJwYXNzd29yZCIsImltYWdlIiwic3VibWl0IiwicmVzZXQiLCJwcm90b3R5cGUiLCJmaWx0ZXJzIiwicGFyc2VPbmx5IiwidG9rZW5zIiwic29GYXIiLCJwcmVGaWx0ZXJzIiwiY2FjaGVkIiwiY29tYmluYXRvciIsImNoZWNrTm9uRWxlbWVudHMiLCJkb25lTmFtZSIsIm9sZENhY2hlIiwibmV3Q2FjaGUiLCJlbGVtZW50TWF0Y2hlciIsIm1hdGNoZXJzIiwibXVsdGlwbGVDb250ZXh0cyIsImNvbnRleHRzIiwiY29uZGVuc2UiLCJuZXdVbm1hdGNoZWQiLCJtYXBwZWQiLCJzZXRNYXRjaGVyIiwicG9zdEZpbHRlciIsInBvc3RGaW5kZXIiLCJwb3N0U2VsZWN0b3IiLCJ0ZW1wIiwicHJlTWFwIiwicG9zdE1hcCIsInByZWV4aXN0aW5nIiwibWF0Y2hlckluIiwibWF0Y2hlck91dCIsIm1hdGNoZXJGcm9tVG9rZW5zIiwiY2hlY2tDb250ZXh0IiwibGVhZGluZ1JlbGF0aXZlIiwiaW1wbGljaXRSZWxhdGl2ZSIsIm1hdGNoQ29udGV4dCIsIm1hdGNoQW55Q29udGV4dCIsIm1hdGNoZXJGcm9tR3JvdXBNYXRjaGVycyIsImVsZW1lbnRNYXRjaGVycyIsInNldE1hdGNoZXJzIiwiYnlTZXQiLCJieUVsZW1lbnQiLCJzdXBlck1hdGNoZXIiLCJvdXRlcm1vc3QiLCJtYXRjaGVkQ291bnQiLCJzZXRNYXRjaGVkIiwiY29udGV4dEJhY2t1cCIsImRpcnJ1bnNVbmlxdWUiLCJNYXRoIiwicmFuZG9tIiwidG9rZW4iLCJjb21waWxlZCIsIl9uYW1lIiwiZGVmYXVsdFZhbHVlIiwiX3NpenpsZSIsIm5vQ29uZmxpY3QiLCJkZWZpbmUiLCJtb2R1bGUiLCJleHBvcnRzIiwiZGVmYXVsdCIsImdldFNpbmdsZVNlbGVjdG9yIiwiZ2V0TXVsdGlTZWxlY3RvciIsImNvbW1vbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEVBOzs7Ozs7QUFNQTs7Ozs7O0FBTU8sSUFBTUEsNENBQWtCLFNBQWxCQSxlQUFrQixDQUFDQyxLQUFELEVBQVc7QUFBQSxNQUNoQ0MsTUFEZ0MsR0FDckJELEtBRHFCLENBQ2hDQyxNQURnQzs7QUFFeEMsTUFBTUMsTUFBTSxJQUFJQyxLQUFKLENBQVVGLE1BQVYsQ0FBWjtBQUNBLE9BQUssSUFBSUcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxNQUFwQixFQUE0QkcsR0FBNUIsRUFBaUM7QUFDL0JGLFFBQUlFLENBQUosSUFBU0osTUFBTUksQ0FBTixDQUFUO0FBQ0Q7QUFDRCxTQUFPRixHQUFQO0FBQ0QsQ0FQTTs7QUFTUDs7Ozs7Ozs7QUFRTyxJQUFNRyxvQ0FBYyxTQUFkQSxX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QUFDQTs7QUFFRCxTQUFPdGIsTUFBUDtBQUNBLEVBTkQ7O0FBUUEsS0FBSyxJQUFMLEVBQWtEO0FBQ2pEd2IsRUFBQSxrQ0FBUSxZQUFXO0FBQ2xCLFVBQU94YixNQUFQO0FBQ0EsR0FGRDs7QUFJRDtBQUNDLEVBTkQsTUFNTyxJQUFLLE9BQU95YixNQUFQLEtBQWtCLFdBQWxCLElBQWlDQSxPQUFPQyxPQUE3QyxFQUF1RDtBQUM3REQsU0FBT0MsT0FBUCxHQUFpQjFiLE1BQWpCO0FBQ0EsRUFGTSxNQUVBO0FBQ042SyxTQUFPN0ssTUFBUCxHQUFnQkEsTUFBaEI7QUFDQTs7QUFFRDtBQUVDLENBbjZFRCxFQW02RUs2SyxNQW42RUwsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQ0NWUzhRLE87Ozs7OzttQkFBbUJDLGlCOzs7Ozs7bUJBQW1CQyxnQjs7Ozs7Ozs7OzBDQUN0Q0YsTzs7Ozs7O2tCQUFrQnhYLFc7Ozs7Ozs7Ozs2Q0FDbEJ3WCxPOzs7Ozs7Ozs7Ozs7UUFDR0csTSIsImZpbGUiOiJvcHRpbWFsLXNlbGVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIk9wdGltYWxTZWxlY3RcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiT3B0aW1hbFNlbGVjdFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiNjczY2RiYjc1N2U3YjBkOTA1ZCIsIi8qKlxuICogIyBVdGlsaXRpZXNcbiAqXG4gKiBDb252ZW5pZW5jZSBoZWxwZXJzLlxuICovXG5cbi8qKlxuICogQ3JlYXRlIGFuIGFycmF5IHdpdGggdGhlIERPTSBub2RlcyBvZiB0aGUgbGlzdFxuICpcbiAqIEBwYXJhbSAge05vZGVMaXN0fSAgICAgICAgICAgICBub2RlcyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge0FycmF5LjxIVE1MRWxlbWVudD59ICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnROb2RlTGlzdCA9IChub2RlcykgPT4ge1xuICBjb25zdCB7IGxlbmd0aCB9ID0gbm9kZXNcbiAgY29uc3QgYXJyID0gbmV3IEFycmF5KGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGFycltpXSA9IG5vZGVzW2ldXG4gIH1cbiAgcmV0dXJuIGFyclxufVxuXG4vKipcbiAqIEVzY2FwZSBzcGVjaWFsIGNoYXJhY3RlcnMgYW5kIGxpbmUgYnJlYWtzIGFzIGEgc2ltcGxpZmllZCB2ZXJzaW9uIG9mICdDU1MuZXNjYXBlKCknXG4gKlxuICogRGVzY3JpcHRpb24gb2YgdmFsaWQgY2hhcmFjdGVyczogaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2Nzcy1lc2NhcGVzXG4gKlxuICogQHBhcmFtICB7U3RyaW5nP30gdmFsdWUgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGNvbnN0IGVzY2FwZVZhbHVlID0gKHZhbHVlKSA9PlxuICB2YWx1ZSAmJiB2YWx1ZS5yZXBsYWNlKC9bJ1wiYFxcXFwvOj8mISMkJV4oKVtcXF17fH0qKzssLjw9PkB+XS9nLCAnXFxcXCQmJylcbiAgICAucmVwbGFjZSgvXFxuL2csICdcXHUwMGEwJylcblxuLyoqXG4gKiBQYXJ0aXRpb24gYXJyYXkgaW50byB0d28gZ3JvdXBzIGRldGVybWluZWQgYnkgcHJlZGljYXRlXG4gKi9cbmV4cG9ydCBjb25zdCBwYXJ0aXRpb24gPSAoYXJyYXksIHByZWRpY2F0ZSkgPT5cbiAgYXJyYXkucmVkdWNlKFxuICAgIChbaW5uZXIsIG91dGVyXSwgaXRlbSkgPT4gcHJlZGljYXRlKGl0ZW0pID8gW2lubmVyLmNvbmNhdChpdGVtKSwgb3V0ZXJdIDogW2lubmVyLCBvdXRlci5jb25jYXQoaXRlbSldLFxuICAgIFtbXSwgW11dXG4gIClcblxuXG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHN0cmluZyBpcyB2YWxpZCBDU1MgaWRlbnRpZmllclxuICogXG4gKiBJbiBDU1MsIGlkZW50aWZpZXJzIChpbmNsdWRpbmcgZWxlbWVudCBuYW1lcywgY2xhc3NlcywgYW5kIElEcyBpbiBzZWxlY3RvcnMpIGNhbiBjb250YWluXG4gKiBvbmx5IHRoZSBjaGFyYWN0ZXJzIFthLXpBLVowLTldIGFuZCBJU08gMTA2NDYgY2hhcmFjdGVycyBVKzAwQTAgYW5kIGhpZ2hlciwgcGx1cyB0aGUgaHlwaGVuICgtKVxuICogYW5kIHRoZSB1bmRlcnNjb3JlIChfKTsgdGhleSBjYW5ub3Qgc3RhcnQgd2l0aCBhIGRpZ2l0LCB0d28gaHlwaGVucywgb3IgYSBoeXBoZW4gZm9sbG93ZWQgYnlcbiAqIGEgZGlnaXQuXG4gKiBcbiAqIElkZW50aWZpZXJzIGNhbiBhbHNvIGNvbnRhaW4gZXNjYXBlZCBjaGFyYWN0ZXJzIGFuZCBhbnkgSVNPIDEwNjQ2IGNoYXJhY3RlciBhcyBhIG51bWVyaWNcbiAqIGNvZGUgKHNlZSBuZXh0IGl0ZW0pLiBGb3IgaW5zdGFuY2UsIHRoZSBpZGVudGlmaWVyIFwiQiZXP1wiIG1heSBiZSB3cml0dGVuIGFzIFwiQlxcJldcXD9cIiBvciBcIkJcXDI2IFdcXDNGXCIuXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaXNWYWxpZENTU0lkZW50aWZpZXIgPSAodmFsdWUpID0+XG4gICEhdmFsdWUgJiYgIS8oXlxcZCl8KF4tLSl8KF4tXFxkKS8udGVzdCh2YWx1ZSkgJiYgIS8oW15cXFxcXXxeKVsnXCJgLzo/JiEjJCVeKClbXFxde3x9Kis7LC48PT5Afl0vLnRlc3QodmFsdWUpXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxpdGllcy5qcyIsImltcG9ydCB7IGlzVmFsaWRDU1NJZGVudGlmaWVyIH0gZnJvbSAnLi91dGlsaXRpZXMnXG4vKipcbiAqIEB0eXBlZGVmICB7T2JqZWN0fSBQYXR0ZXJuXG4gKiBAcHJvcGVydHkgeygnZGVzY2VuZGFudCcgfCAnY2hpbGQnKX0gICAgICAgICAgICAgICAgICBbcmVsYXRlc11cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YWddXG4gKiBAcHJvcGVydHkge0FycmF5Ljx7IG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZz8gfT59ICBhdHRyaWJ1dGVzXG4gKiBAcHJvcGVydHkge0FycmF5LjxzdHJpbmc+fSAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzXG4gKiBAcHJvcGVydHkge0FycmF5LjxzdHJpbmc+fSAgICAgICAgICAgICAgICAgICAgICAgICAgICBwc2V1ZG9cbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPEFycmF5LjxQYXR0ZXJuPj59ICAgICAgICAgICAgICAgICAgIGRlc2NlbmRhbnRzXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHBhdHRlcm4gc3RydWN0dXJlXG4gKiBcbiAqIEBwYXJhbSB7UGFydGlhbDxQYXR0ZXJuPn0gcGF0dGVyblxuICogQHJldHVybnMge1BhdHRlcm59XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVQYXR0ZXJuID0gKGJhc2UgPSB7fSkgPT5cbiAgKHsgYXR0cmlidXRlczogW10sIGNsYXNzZXM6IFtdLCBwc2V1ZG86IFtdLCBkZXNjZW5kYW50czogW10sIC4uLmJhc2UgfSlcblxuLyoqXG4gKiBDb252ZXJ0IGF0dHJpYnV0ZXMgdG8gQ1NTIHNlbGVjdG9yXG4gKiBcbiAqIEBwYXJhbSB7QXJyYXkuPHsgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nPyB9Pn0gYXR0cmlidXRlcyBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVzVG9TZWxlY3RvciA9IChhdHRyaWJ1dGVzKSA9PlxuICBhdHRyaWJ1dGVzLm1hcCgoeyBuYW1lLCB2YWx1ZSB9KSA9PiB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gYFske25hbWV9XWBcbiAgICB9XG4gICAgaWYgKG5hbWUgPT09ICdpZCcgJiYgaXNWYWxpZENTU0lkZW50aWZpZXIodmFsdWUpKSB7XG4gICAgICByZXR1cm4gYCMke3ZhbHVlfWBcbiAgICB9XG4gICAgcmV0dXJuIGBbJHtuYW1lfT1cIiR7dmFsdWV9XCJdYFxuICB9KS5qb2luKCcnKVxuXG4vKipcbiAqIENvbnZlcnQgY2xhc3NlcyB0byBDU1Mgc2VsZWN0b3JcbiAqIFxuICogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gY2xhc3NlcyBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBjbGFzc2VzVG9TZWxlY3RvciA9IChjbGFzc2VzKSA9PlxuICBjbGFzc2VzLm1hcChjID0+IGlzVmFsaWRDU1NJZGVudGlmaWVyKGMpID8gYC4ke2N9YCA6IGBbY2xhc3N+PVwiJHtjfVwiXWApLmpvaW4oJycpXG5cbi8qKlxuICogQ29udmVydCBwc2V1ZG8gc2VsZWN0b3JzIHRvIENTUyBzZWxlY3RvclxuICogXG4gKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fSBwc2V1ZG8gXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgcHNldWRvVG9TZWxlY3RvciA9IChwc2V1ZG8pID0+IHBzZXVkby5sZW5ndGggPyBgOiR7cHNldWRvLmpvaW4oJzonKX1gIDogJydcblxuLyoqXG4gKiBDb252ZXJ0IHBhdHRlcm4gdG8gQ1NTIHNlbGVjdG9yXG4gKiBcbiAqIEBwYXJhbSB7UGF0dGVybn0gcGF0dGVybiBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBwYXR0ZXJuVG9TZWxlY3RvciA9IChwYXR0ZXJuKSA9PiB7XG4gIGNvbnN0IHsgcmVsYXRlcywgdGFnLCBhdHRyaWJ1dGVzLCBjbGFzc2VzLCBwc2V1ZG8gfSA9IHBhdHRlcm5cbiAgY29uc3QgdmFsdWUgPSBgJHtcbiAgICByZWxhdGVzID09PSAnY2hpbGQnID8gJz4gJyA6ICcnXG4gIH0ke1xuICAgIHRhZyB8fCAnJ1xuICB9JHtcbiAgICBhdHRyaWJ1dGVzVG9TZWxlY3RvcihhdHRyaWJ1dGVzKVxuICB9JHtcbiAgICBjbGFzc2VzVG9TZWxlY3RvcihjbGFzc2VzKVxuICB9JHtcbiAgICBwc2V1ZG9Ub1NlbGVjdG9yKHBzZXVkbylcbiAgfWBcbiAgcmV0dXJuIHZhbHVlXG59XG5cbi8qKlxuICogQ29udmVydHMgcGF0aCB0byBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge0FycmF5LjxQYXR0ZXJuPn0gcGF0aCBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBwYXRoVG9TZWxlY3RvciA9IChwYXRoKSA9PlxuICBwYXRoLm1hcChwYXR0ZXJuVG9TZWxlY3Rvcikuam9pbignICcpXG5cblxuY29uc3QgY29udmVydEVzY2FwaW5nID0gKHZhbHVlKSA9PlxuICB2YWx1ZSAmJiB2YWx1ZS5yZXBsYWNlKC9cXFxcKFtgXFxcXC86PyYhIyQlXigpW1xcXXt8fSorOywuPD0+QH5dKS9nLCAnJDEnKVxuICAgIC5yZXBsYWNlKC9cXFxcKFsnXCJdKS9nLCAnJDEkMScpXG4gICAgLnJlcGxhY2UoL1xcXFxBIC9nLCAnXFxuJylcblxuLyoqXG4qIENvbnZlcnQgYXR0cmlidXRlcyB0byBYUGF0aCBzdHJpbmdcbiogXG4qIEBwYXJhbSB7QXJyYXkuPHsgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nPyB9Pn0gYXR0cmlidXRlcyBcbiogQHJldHVybnMge3N0cmluZ31cbiovXG5leHBvcnQgY29uc3QgYXR0cmlidXRlc1RvWFBhdGggPSAoYXR0cmlidXRlcykgPT5cbiAgYXR0cmlidXRlcy5tYXAoKHsgbmFtZSwgdmFsdWUgfSkgPT4ge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGBbQCR7bmFtZX1dYFxuICAgIH1cbiAgICByZXR1cm4gYFtAJHtuYW1lfT1cIiR7Y29udmVydEVzY2FwaW5nKHZhbHVlKX1cIl1gXG4gIH0pLmpvaW4oJycpXG5cbi8qKlxuKiBDb252ZXJ0IGNsYXNzZXMgdG8gWFBhdGggc3RyaW5nXG4qIFxuKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fSBjbGFzc2VzIFxuKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmV4cG9ydCBjb25zdCBjbGFzc2VzVG9YUGF0aCA9IChjbGFzc2VzKSA9PlxuICBjbGFzc2VzLm1hcChjID0+IGBbY29udGFpbnMoY29uY2F0KFwiIFwiLG5vcm1hbGl6ZS1zcGFjZShAY2xhc3MpLFwiIFwiKSxcIiAke2N9IFwiKV1gKS5qb2luKCcnKVxuXG4vKipcbiogQ29udmVydCBwc2V1ZG8gc2VsZWN0b3JzIHRvIFhQYXRoIHN0cmluZ1xuKiBcbiogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gcHNldWRvIFxuKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmV4cG9ydCBjb25zdCBwc2V1ZG9Ub1hQYXRoID0gKHBzZXVkbykgPT5cbiAgcHNldWRvLm1hcChwID0+IHtcbiAgICBjb25zdCBtYXRjaCA9IHAubWF0Y2goL14obnRoLWNoaWxkfG50aC1vZi10eXBlfGNvbnRhaW5zKVxcKCguKylcXCkkLylcbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICByZXR1cm4gJydcbiAgICB9XG5cbiAgICBzd2l0Y2ggKG1hdGNoWzFdKSB7XG4gICAgICBjYXNlICdudGgtY2hpbGQnOlxuICAgICAgICByZXR1cm4gYFsoY291bnQocHJlY2VkaW5nLXNpYmxpbmc6OiopKzEpID0gJHttYXRjaFsyXX1dYFxuXG4gICAgICBjYXNlICdudGgtb2YtdHlwZSc6XG4gICAgICAgIHJldHVybiBgWyR7bWF0Y2hbMl19XWBcblxuICAgICAgY2FzZSAnY29udGFpbnMnOlxuICAgICAgICByZXR1cm4gYFtjb250YWlucyh0ZXh0KCksJHttYXRjaFsyXX0pXWBcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICcnXG4gICAgfVxuICB9KS5qb2luKCcnKVxuXG4vKipcbiogQ29udmVydCBwYXR0ZXJuIHRvIFhQYXRoIHN0cmluZ1xuKiBcbiogQHBhcmFtIHtQYXR0ZXJufSBwYXR0ZXJuIFxuKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmV4cG9ydCBjb25zdCBwYXR0ZXJuVG9YUGF0aCA9IChwYXR0ZXJuKSA9PiB7XG4gIGNvbnN0IHsgcmVsYXRlcywgdGFnLCBhdHRyaWJ1dGVzLCBjbGFzc2VzLCBwc2V1ZG8sIGRlc2NlbmRhbnRzIH0gPSBwYXR0ZXJuXG4gIGNvbnN0IHZhbHVlID0gYCR7XG4gICAgcmVsYXRlcyA9PT0gJ2NoaWxkJyA/ICcvJyA6ICcvLydcbiAgfSR7XG4gICAgdGFnIHx8ICcqJ1xuICB9JHtcbiAgICBhdHRyaWJ1dGVzVG9YUGF0aChhdHRyaWJ1dGVzKVxuICB9JHtcbiAgICBjbGFzc2VzVG9YUGF0aChjbGFzc2VzKVxuICB9JHtcbiAgICBwc2V1ZG9Ub1hQYXRoKHBzZXVkbylcbiAgfSR7XG4gICAgZGVzY2VuZGFudHNUb1hQYXRoKGRlc2NlbmRhbnRzKVxuICB9YFxuICByZXR1cm4gdmFsdWVcbn1cblxuLyoqXG4qIENvbnZlcnRzIHBhdGggdG8gWFBhdGggc3RyaW5nXG4qXG4qIEBwYXJhbSB7QXJyYXkuPFBhdHRlcm4+fSBwYXRoIFxuKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmV4cG9ydCBjb25zdCBwYXRoVG9YUGF0aCA9IChwYXRoKSA9PiBgLiR7cGF0aC5tYXAocGF0dGVyblRvWFBhdGgpLmpvaW4oJycpfWBcblxuLyoqXG4qIENvbnZlcnQgY2hpbGQgc2VsZWN0b3JzIHRvIFhQYXRoIHN0cmluZ1xuKiBcbiogQHBhcmFtIHtBcnJheS48QXJyYXkuPFBhdHRlcm4+Pn0gY2hpbGRyZW4gXG4qIEByZXR1cm5zIHtzdHJpbmd9XG4qL1xuZXhwb3J0IGNvbnN0IGRlc2NlbmRhbnRzVG9YUGF0aCA9IChjaGlsZHJlbikgPT5cbiAgY2hpbGRyZW4ubGVuZ3RoID8gYFske2NoaWxkcmVuLm1hcChwYXRoVG9YUGF0aCkuam9pbignXVsnKX1dYCA6ICcnXG5cbiAgXG5jb25zdCB0b1N0cmluZyA9IHtcbiAgJ2Nzcyc6IHtcbiAgICBhdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzVG9TZWxlY3RvcixcbiAgICBjbGFzc2VzOiBjbGFzc2VzVG9TZWxlY3RvcixcbiAgICBwc2V1ZG86IHBzZXVkb1RvU2VsZWN0b3IsXG4gICAgcGF0dGVybjogcGF0dGVyblRvU2VsZWN0b3IsXG4gICAgcGF0aDogcGF0aFRvU2VsZWN0b3JcbiAgfSxcbiAgJ3hwYXRoJzoge1xuICAgIGF0dHJpYnV0ZXM6IGF0dHJpYnV0ZXNUb1hQYXRoLFxuICAgIGNsYXNzZXM6IGNsYXNzZXNUb1hQYXRoLFxuICAgIHBzZXVkbzogcHNldWRvVG9YUGF0aCxcbiAgICBwYXR0ZXJuOiBwYXR0ZXJuVG9YUGF0aCxcbiAgICBwYXRoOiBwYXRoVG9YUGF0aFxuICB9LFxuICAnanF1ZXJ5Jzoge31cbn1cblxudG9TdHJpbmcuanF1ZXJ5ID0gdG9TdHJpbmcuY3NzXG50b1N0cmluZ1swXSA9IHRvU3RyaW5nLmNzc1xudG9TdHJpbmdbMV0gPSB0b1N0cmluZy54cGF0aFxuICBcbi8qKlxuICogQHR5cGVkZWYgIHtPYmplY3R9IFRvU3RyaW5nQXBpXG4gKiBAcHJvcGVydHkgeyhhdHRyaWJ1dGVzOiBBcnJheS48eyBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmc/IH0+KSA9PiBzdHJpbmd9IGF0dHJpYnV0ZXNcbiAqIEBwcm9wZXJ0eSB7KGNsYXNzZXM6IEFycmF5LjxzdHJpbmc+KSA9PiBzdHJpbmd9ICBjbGFzc2VzXG4gKiBAcHJvcGVydHkgeyhwc2V1ZG86IEFycmF5LjxzdHJpbmc+KSA9PiBzdHJpbmd9ICAgcHNldWRvXG4gKiBAcHJvcGVydHkgeyhwYXR0ZXJuOiBQYXR0ZXJuKSA9PiBzdHJpbmd9ICAgICAgICAgcGF0dGVyblxuICogQHByb3BlcnR5IHsocGF0aDogQXJyYXkuPFBhdHRlcm4+KSA9PiBzdHJpbmd9ICAgIHBhdGhcbiAqL1xuXG4vKipcbiAqIFxuICogQHBhcmFtIHtPcHRpb25zfSBvcHRpb25zIFxuICogQHJldHVybnMge1RvU3RyaW5nQXBpfVxuICovXG5leHBvcnQgY29uc3QgZ2V0VG9TdHJpbmcgPSAob3B0aW9ucyA9IHt9KSA9PlxuICB0b1N0cmluZ1tvcHRpb25zLmZvcm1hdCB8fCAnY3NzJ11cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGF0dGVybi5qcyIsIi8vIGltcG9ydCBTaXp6bGUgZnJvbSAnc2l6emxlJ1xubGV0IFNpenpsZVxuXG4vKipcbiAqIFNlbGVjdCBlbGVtZW50IHVzaW5nIGpRdWVyeVxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgIHNlbGVjdG9yXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgcGFyZW50XG4gKiBAcmV0dXJuIEFycmF5LjxIVE1MRWxlbWVudD5cbiAqL1xuY29uc3Qgc2VsZWN0SlF1ZXJ5ID0gKHNlbGVjdG9yLCBwYXJlbnQgPSBudWxsKSA9PiB7XG4gIGlmICghU2l6emxlKSB7XG4gICAgU2l6emxlID0gcmVxdWlyZSgnc2l6emxlJylcbiAgfVxuICByZXR1cm4gU2l6emxlKHNlbGVjdG9yLCBwYXJlbnQgfHwgZG9jdW1lbnQpXG59XG4gIFxuLyoqXG4gKiBTZWxlY3QgZWxlbWVudCB1c2luZyBYUGF0aFxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgIHNlbGVjdG9yXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgcGFyZW50XG4gKiBAcmV0dXJuIEFycmF5LjxIVE1MRWxlbWVudD5cbiAqL1xuY29uc3Qgc2VsZWN0WFBhdGggPSAoc2VsZWN0b3IsIHBhcmVudCA9IG51bGwpID0+IHtcbiAgcGFyZW50ID0gKHBhcmVudCB8fCBkb2N1bWVudClcbiAgdmFyIGRvYyA9IHBhcmVudFxuICB3aGlsZSAoZG9jLnBhcmVudE5vZGUpIHtcbiAgICBkb2MgPSBkb2MucGFyZW50Tm9kZVxuICB9XG4gIGlmIChkb2MgIT09IHBhcmVudCAmJiAhc2VsZWN0b3Iuc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgc2VsZWN0b3IgPSBgLiR7c2VsZWN0b3J9YFxuICB9XG4gIHZhciBpdGVyYXRvciA9IGRvYy5ldmFsdWF0ZShzZWxlY3RvciwgcGFyZW50LCBudWxsLCAwKVxuICB2YXIgZWxlbWVudHMgPSBbXVxuICB2YXIgZWxlbWVudFxuICB3aGlsZSAoKGVsZW1lbnQgPSBpdGVyYXRvci5pdGVyYXRlTmV4dCgpKSkge1xuICAgIGVsZW1lbnRzLnB1c2goZWxlbWVudClcbiAgfVxuICByZXR1cm4gZWxlbWVudHNcbn1cbiAgXG4vKipcbiAqIFNlbGVjdCBlbGVtZW50IHVzaW5nIENTU1xuICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgIHNlbGVjdG9yXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgcGFyZW50XG4gKiBAcmV0dXJuIEFycmF5LjxIVE1MRWxlbWVudD5cbiAqL1xuY29uc3Qgc2VsZWN0Q1NTID0gKHNlbGVjdG9yLCBwYXJlbnQgPSBudWxsKSA9PlxuICAocGFyZW50IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuXG5jb25zdCBzZWxlY3QgPSB7XG4gICdjc3MnOiBzZWxlY3RDU1MsXG4gICd4cGF0aCc6IHNlbGVjdFhQYXRoLFxuICAnanF1ZXJ5Jzogc2VsZWN0SlF1ZXJ5XG59XG5cbnNlbGVjdFswXSA9IHNlbGVjdC5jc3NcbnNlbGVjdFsxXSA9IHNlbGVjdC54cGF0aFxuXG4vKipcbiogXG4qIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9ucyBcbiogQHJldHVybnMgeyhzZWxlY3Rvcjogc3RyaW5nLCBwYXJlbnQ6IEhUTUxFbGVtZW50KSA9PiBBcnJheS48SFRNTEVsZW1lbnQ+fVxuKi9cbmV4cG9ydCBjb25zdCBnZXRTZWxlY3QgPSAob3B0aW9ucyA9IHt9KSA9PlxuICAoc2VsZWN0b3IsIHBhcmVudCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc2VsZWN0W29wdGlvbnMuZm9ybWF0IHx8ICdjc3MnXShzZWxlY3RvciwgcGFyZW50IHx8IG9wdGlvbnMucm9vdClcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBbXVxuICAgIH1cbiAgfVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VsZWN0b3IuanMiLCIvKipcbiAqICMgQ29tbW9uXG4gKlxuICogUHJvY2VzcyBjb2xsZWN0aW9ucyBmb3Igc2ltaWxhcml0aWVzLlxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnLi9zZWxlY3QnKS5PcHRpb25zfSBPcHRpb25zXG4gKi9cblxuLyoqXG4gKiBGaW5kIHRoZSBsYXN0IGNvbW1vbiBhbmNlc3RvciBvZiBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICAgICAgICBvcHRpb25zICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldENvbW1vbkFuY2VzdG9yID0gKGVsZW1lbnRzLCBvcHRpb25zID0ge30pID0+IHtcblxuICBjb25zdCB7XG4gICAgcm9vdCA9IGRvY3VtZW50XG4gIH0gPSBvcHRpb25zXG5cbiAgY29uc3QgYW5jZXN0b3JzID0gW11cblxuICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHBhcmVudHMgPSBbXVxuICAgIHdoaWxlIChlbGVtZW50ICE9PSByb290KSB7XG4gICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlXG4gICAgICBwYXJlbnRzLnVuc2hpZnQoZWxlbWVudClcbiAgICB9XG4gICAgYW5jZXN0b3JzW2luZGV4XSA9IHBhcmVudHNcbiAgfSlcblxuICBhbmNlc3RvcnMuc29ydCgoY3VyciwgbmV4dCkgPT4gY3Vyci5sZW5ndGggLSBuZXh0Lmxlbmd0aClcblxuICBjb25zdCBzaGFsbG93QW5jZXN0b3IgPSBhbmNlc3RvcnMuc2hpZnQoKVxuXG4gIHZhciBhbmNlc3RvciA9IG51bGxcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IHNoYWxsb3dBbmNlc3Rvci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCBwYXJlbnQgPSBzaGFsbG93QW5jZXN0b3JbaV1cbiAgICBjb25zdCBtaXNzaW5nID0gYW5jZXN0b3JzLnNvbWUoKG90aGVyUGFyZW50cykgPT4ge1xuICAgICAgcmV0dXJuICFvdGhlclBhcmVudHMuc29tZSgob3RoZXJQYXJlbnQpID0+IG90aGVyUGFyZW50ID09PSBwYXJlbnQpXG4gICAgfSlcblxuICAgIGlmIChtaXNzaW5nKSB7XG4gICAgICAvLyBUT0RPOiBmaW5kIHNpbWlsYXIgc3ViLXBhcmVudHMsIG5vdCB0aGUgdG9wIHJvb3QsIGUuZy4gc2hhcmluZyBhIGNsYXNzIHNlbGVjdG9yXG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGFuY2VzdG9yID0gcGFyZW50XG4gIH1cblxuICByZXR1cm4gYW5jZXN0b3Jcbn1cblxuLyoqXG4gKiBHZXQgYSBzZXQgb2YgY29tbW9uIHByb3BlcnRpZXMgb2YgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgY29uc3QgZ2V0Q29tbW9uUHJvcGVydGllcyA9IChlbGVtZW50cywgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGNvbnN0IHsgaWdub3JlID0ge30gfSA9IG9wdGlvbnNcblxuICBjb25zdCBjb21tb25Qcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzZXM6IFtdLFxuICAgIGF0dHJpYnV0ZXM6IHt9LFxuICAgIHRhZzogbnVsbFxuICB9XG5cbiAgZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXG4gICAgdmFyIHtcbiAgICAgIGNsYXNzZXM6IGNvbW1vbkNsYXNzZXMsXG4gICAgICBhdHRyaWJ1dGVzOiBjb21tb25BdHRyaWJ1dGVzLFxuICAgICAgdGFnOiBjb21tb25UYWdcbiAgICB9ID0gY29tbW9uUHJvcGVydGllc1xuXG4gICAgLy8gfiBjbGFzc2VzXG4gICAgaWYgKGNvbW1vbkNsYXNzZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnY2xhc3MnKVxuICAgICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMudHJpbSgpLnNwbGl0KCcgJykuZmlsdGVyKGNscyA9PiAhaWdub3JlLmNsYXNzIHx8ICFpZ25vcmUuY2xhc3MoY2xzKSlcbiAgICAgICAgaWYgKCFjb21tb25DbGFzc2VzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbW1vblByb3BlcnRpZXMuY2xhc3NlcyA9IGNsYXNzZXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21tb25DbGFzc2VzID0gY29tbW9uQ2xhc3Nlcy5maWx0ZXIoKGVudHJ5KSA9PiBjbGFzc2VzLnNvbWUoKG5hbWUpID0+IG5hbWUgPT09IGVudHJ5KSlcbiAgICAgICAgICBpZiAoY29tbW9uQ2xhc3Nlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbW1vblByb3BlcnRpZXMuY2xhc3NlcyA9IGNvbW1vbkNsYXNzZXNcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIGNvbW1vblByb3BlcnRpZXMuY2xhc3Nlc1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIGNvbW1vblByb3BlcnRpZXMuY2xhc3Nlc1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIH4gYXR0cmlidXRlc1xuICAgIGlmIChjb21tb25BdHRyaWJ1dGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnRBdHRyaWJ1dGVzID0gZWxlbWVudC5hdHRyaWJ1dGVzXG4gICAgICBjb25zdCBhdHRyaWJ1dGVzID0gT2JqZWN0LmtleXMoZWxlbWVudEF0dHJpYnV0ZXMpLnJlZHVjZSgoYXR0cmlidXRlcywga2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGVsZW1lbnRBdHRyaWJ1dGVzW2tleV1cbiAgICAgICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGF0dHJpYnV0ZS5uYW1lXG4gICAgICAgIGlmIChhdHRyaWJ1dGUgJiYgYXR0cmlidXRlTmFtZSAhPT0gJ2NsYXNzJyAmJiAoIWlnbm9yZS5hdHRyaWJ1dGUgfHwgIWlnbm9yZS5hdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlLnZhbHVlKSkpIHtcbiAgICAgICAgICBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID0gYXR0cmlidXRlLnZhbHVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXNcbiAgICAgIH0sIHt9KVxuXG4gICAgICBjb25zdCBhdHRyaWJ1dGVzTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKVxuICAgICAgY29uc3QgY29tbW9uQXR0cmlidXRlc05hbWVzID0gT2JqZWN0LmtleXMoY29tbW9uQXR0cmlidXRlcylcblxuICAgICAgaWYgKGF0dHJpYnV0ZXNOYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCFjb21tb25BdHRyaWJ1dGVzTmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbW1vbkF0dHJpYnV0ZXMgPSBjb21tb25BdHRyaWJ1dGVzTmFtZXMucmVkdWNlKChuZXh0Q29tbW9uQXR0cmlidXRlcywgbmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjb21tb25BdHRyaWJ1dGVzW25hbWVdXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IGF0dHJpYnV0ZXNbbmFtZV0pIHtcbiAgICAgICAgICAgICAgbmV4dENvbW1vbkF0dHJpYnV0ZXNbbmFtZV0gPSB2YWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5leHRDb21tb25BdHRyaWJ1dGVzXG4gICAgICAgICAgfSwge30pXG4gICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGNvbW1vbkF0dHJpYnV0ZXMpLmxlbmd0aCkge1xuICAgICAgICAgICAgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzID0gY29tbW9uQXR0cmlidXRlc1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gfiB0YWdcbiAgICBpZiAoY29tbW9uVGFnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHRhZyA9IGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICBpZiAoIWNvbW1vblRhZykge1xuICAgICAgICBjb21tb25Qcm9wZXJ0aWVzLnRhZyA9IHRhZ1xuICAgICAgfSBlbHNlIGlmICh0YWcgIT09IGNvbW1vblRhZykge1xuICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy50YWdcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIGNvbW1vblByb3BlcnRpZXNcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24uanMiLCIvKipcbiAqICMgTWF0Y2hcbiAqXG4gKiBSZXRyaWV2ZSBzZWxlY3RvciBmb3IgYSBub2RlLlxuICovXG5cbmltcG9ydCB7IGNyZWF0ZVBhdHRlcm4sIGdldFRvU3RyaW5nIH0gZnJvbSAnLi9wYXR0ZXJuJ1xuaW1wb3J0IHsgZ2V0U2VsZWN0IH0gZnJvbSAnLi9zZWxlY3RvcidcbmltcG9ydCB7IGVzY2FwZVZhbHVlIH0gZnJvbSAnLi91dGlsaXRpZXMnXG5cbi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnLi9zZWxlY3QnKS5PcHRpb25zfSBPcHRpb25zXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3BhdHRlcm4nKS5QYXR0ZXJufSBQYXR0ZXJuXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3BhdHRlcm4nKS5Ub1N0cmluZ0FwaX0gUGF0dGVyblxuICovXG5cbmNvbnN0IGRlZmF1bHRJZ25vcmUgPSB7XG4gIGF0dHJpYnV0ZSAoYXR0cmlidXRlTmFtZSkge1xuICAgIHJldHVybiBbXG4gICAgICAnc3R5bGUnLFxuICAgICAgJ2RhdGEtcmVhY3RpZCcsXG4gICAgICAnZGF0YS1yZWFjdC1jaGVja3N1bSdcbiAgICBdLmluZGV4T2YoYXR0cmlidXRlTmFtZSkgPiAtMVxuICB9LFxuICBjb250YWluczogKCkgPT4gdHJ1ZVxufVxuXG5leHBvcnQgY29uc3QgaW5pdE9wdGlvbnMgPSAob3B0aW9ucyA9IHt9KSA9PiAoe1xuICAuLi5vcHRpb25zLFxuICByb290OiBvcHRpb25zLnJvb3QgfHwgZG9jdW1lbnQsXG4gIHNraXA6IG9wdGlvbnMuc2tpcCB8fCBudWxsLFxuICBwcmlvcml0eTogb3B0aW9ucy5wcmlvcml0eSB8fCBbJ2lkJywgJ2NsYXNzJywgJ2hyZWYnLCAnc3JjJ10sXG4gIGlnbm9yZTogb3B0aW9ucy5pZ25vcmUgfHwge31cbn0pXG5cbi8qKlxuICogR2V0IHRoZSBwYXRoIG9mIHRoZSBlbGVtZW50XG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IG5vZGUgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICBbb3B0aW9uc10gLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtBcnJheS48UGF0dGVybj59ICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYXRjaCAobm9kZSwgb3B0aW9ucyA9IHt9LCBuZXN0ZWQgPSBmYWxzZSkge1xuICBvcHRpb25zID0gaW5pdE9wdGlvbnMob3B0aW9ucylcbiAgY29uc3QgeyByb290LCBza2lwLCBpZ25vcmUsIGZvcm1hdCB9ID0gb3B0aW9uc1xuXG4gIGNvbnN0IHBhdGggPSBbXVxuICBsZXQgZWxlbWVudCA9IG5vZGVcbiAgbGV0IGxlbmd0aCA9IHBhdGgubGVuZ3RoXG4gIGNvbnN0IHNlbGVjdCA9IGdldFNlbGVjdChvcHRpb25zKVxuICBjb25zdCB0b1N0cmluZyA9IGdldFRvU3RyaW5nKG9wdGlvbnMpXG5cbiAgY29uc3Qgc2tpcENvbXBhcmUgPSBza2lwICYmIChBcnJheS5pc0FycmF5KHNraXApID8gc2tpcCA6IFtza2lwXSkubWFwKChlbnRyeSkgPT4ge1xuICAgIGlmICh0eXBlb2YgZW50cnkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAoZWxlbWVudCkgPT4gZWxlbWVudCA9PT0gZW50cnlcbiAgICB9XG4gICAgcmV0dXJuIGVudHJ5XG4gIH0pXG5cbiAgY29uc3Qgc2tpcENoZWNrcyA9IChlbGVtZW50KSA9PiB7XG4gICAgcmV0dXJuIHNraXAgJiYgc2tpcENvbXBhcmUuc29tZSgoY29tcGFyZSkgPT4gY29tcGFyZShlbGVtZW50KSlcbiAgfVxuXG4gIE9iamVjdC5rZXlzKGlnbm9yZSkuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgIHZhciBwcmVkaWNhdGUgPSBpZ25vcmVbdHlwZV1cbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuXG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgPT09ICdudW1iZXInKSB7XG4gICAgICBwcmVkaWNhdGUgPSBwcmVkaWNhdGUudG9TdHJpbmcoKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHByZWRpY2F0ZSA9IG5ldyBSZWdFeHAoZXNjYXBlVmFsdWUocHJlZGljYXRlKS5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBwcmVkaWNhdGUgPSBwcmVkaWNhdGUgPyAvKD86KS8gOiAvLl4vXG4gICAgfVxuICAgIC8vIGNoZWNrIGNsYXNzLS9hdHRyaWJ1dGVuYW1lIGZvciByZWdleFxuICAgIGlnbm9yZVt0eXBlXSA9IChuYW1lLCB2YWx1ZSkgPT4gcHJlZGljYXRlLnRlc3QodmFsdWUpXG4gIH0pXG5cbiAgd2hpbGUgKGVsZW1lbnQgIT09IHJvb3QgJiYgZWxlbWVudC5ub2RlVHlwZSAhPT0gMTEpIHtcbiAgICBpZiAoc2tpcENoZWNrcyhlbGVtZW50KSAhPT0gdHJ1ZSkge1xuICAgICAgLy8gfiBnbG9iYWxcbiAgICAgIGlmIChjaGVja0F0dHJpYnV0ZXMoZWxlbWVudCwgcGF0aCwgb3B0aW9ucywgc2VsZWN0LCB0b1N0cmluZywgcm9vdCkpIGJyZWFrXG4gICAgICBpZiAoY2hlY2tUYWcoZWxlbWVudCwgcGF0aCwgb3B0aW9ucywgc2VsZWN0LCB0b1N0cmluZywgcm9vdCkpIGJyZWFrXG5cbiAgICAgIC8vIH4gbG9jYWxcbiAgICAgIGNoZWNrQXR0cmlidXRlcyhlbGVtZW50LCBwYXRoLCBvcHRpb25zLCBzZWxlY3QsIHRvU3RyaW5nKVxuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSBsZW5ndGgpIHtcbiAgICAgICAgY2hlY2tUYWcoZWxlbWVudCwgcGF0aCwgb3B0aW9ucywgc2VsZWN0LCB0b1N0cmluZylcbiAgICAgIH1cblxuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSBsZW5ndGggJiYgWzEsICd4cGF0aCddLmluY2x1ZGVzKGZvcm1hdCkgJiYgIW5lc3RlZCAmJiBlbGVtZW50ID09PSBub2RlKSB7XG4gICAgICAgIGNoZWNrUmVjdXJzaXZlRGVzY2VuZGFudHMoZWxlbWVudCwgcGF0aCwgb3B0aW9ucywgc2VsZWN0LCB0b1N0cmluZylcbiAgICAgIH1cblxuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSBsZW5ndGggJiYgWzEsICd4cGF0aCcsICdqcXVlcnknXS5pbmNsdWRlcyhmb3JtYXQpKSB7XG4gICAgICAgIGNoZWNrVGV4dChlbGVtZW50LCBwYXRoLCBvcHRpb25zLCBzZWxlY3QsIHRvU3RyaW5nLCBmb3JtYXQgPT09ICdqcXVlcnknKVxuICAgICAgfVxuXG4gICAgICBpZiAocGF0aC5sZW5ndGggPT09IGxlbmd0aCkge1xuICAgICAgICBjaGVja050aENoaWxkKGVsZW1lbnQsIHBhdGgsIG9wdGlvbnMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZVxuICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoXG4gIH1cblxuICBpZiAoZWxlbWVudCA9PT0gcm9vdCkge1xuICAgIGNvbnN0IHBhdHRlcm4gPSBmaW5kUGF0dGVybihlbGVtZW50LCBvcHRpb25zLCBzZWxlY3QsIHRvU3RyaW5nKVxuICAgIHBhdGgudW5zaGlmdChwYXR0ZXJuKVxuICB9XG5cbiAgcmV0dXJuIHBhdGhcbn1cblxuLyoqXG4gKiBFeHRlbmQgcGF0aCB3aXRoIGF0dHJpYnV0ZSBpZGVudGlmaWVyXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgICBlbGVtZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gcGF0aCAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPcHRpb25zfSAgICAgICAgIG9wdGlvbnMgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgICBzZWxlY3QgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICAgdG9TdHJpbmcgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgIHBhcmVudCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3QgY2hlY2tBdHRyaWJ1dGVzID0gKGVsZW1lbnQsIHBhdGgsIHsgcHJpb3JpdHksIGlnbm9yZSB9LCBzZWxlY3QsIHRvU3RyaW5nLCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGUpID0+IHtcbiAgY29uc3QgcGF0dGVybiA9IGZpbmRBdHRyaWJ1dGVzUGF0dGVybihwcmlvcml0eSwgZWxlbWVudCwgaWdub3JlLCBzZWxlY3QsIHRvU3RyaW5nLCBwYXJlbnQpXG4gIGlmIChwYXR0ZXJuKSB7XG4gICAgcGF0aC51bnNoaWZ0KHBhdHRlcm4pXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIGFycmF5IG9mIGNvbWJpbmF0aW9ucyBvZiBpdGVtcyBpbiBpbnB1dCBhcnJheS5cbiAqIEBwYXJhbSAge0FycmF5Ljxhbnk+fSB2YWx1ZXMgICAtIGFycmF5IG9mIHZhbHVlc1xuICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zICAgICAgIC0gb3B0aW9uczogbWluIC0gbWluaW11bSBzdWJzZXQgc2l6ZTsgbWF4IC0gbWF4aW11bSBzdWJzZXQgc2l6ZVxuICogQHJldHVybiB7QXJyYXkuPEFycmF5Ljxhbnk+Pj99ICAgYXJyYXkgb2Ygc3Vic2V0c1xuICovXG5leHBvcnQgY29uc3QgY29tYmluYXRpb25zID0gKHZhbHVlcywgb3B0aW9ucykgPT4ge1xuICBjb25zdCB7IG1pbiwgbWF4IH0gPSBvcHRpb25zIHx8IHt9XG4gIGNvbnN0IHJlc3VsdCA9IFtbXV1cblxuICB2YWx1ZXMuZm9yRWFjaCh2ID0+IHtcbiAgICByZXN1bHQuZm9yRWFjaChyID0+IHtcbiAgICAgIGlmICghbWF4IHx8IHIubGVuZ3RoIDwgbWF4KSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHIuY29uY2F0KHYpKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgcmVzdWx0LnNoaWZ0KClcbiAgcmV0dXJuIG1pbiA/IHJlc3VsdC5maWx0ZXIociA9PiByLmxlbmd0aCA+PSBtaW4pIDogcmVzdWx0XG59XG5cbi8vIGxpbWl0IHN1YnNldCBzaXplIHRvIGluY3JlYXNlIHBlcmZvcm1hbmNlXG5jb25zdCBtYXhTdWJzZXRTaXplID0gW1xuICB7IGl0ZW1zOiAxMywgbWF4OiAxIH0sXG4gIHsgaXRlbXM6IDEwLCBtYXg6IDIgfSxcbiAgeyBpdGVtczogOCwgbWF4OiAzIH0sXG4gIHsgaXRlbXM6IDUsIG1heDogNCB9XG5dXG5cbi8qKlxuICogR2V0IGNsYXNzIHNlbGVjdG9yXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPHN0cmluZz59IGNsYXNzZXMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgc2VsZWN0ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBwYXJlbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UGF0dGVybn0gICAgICAgIGJhc2UgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtBcnJheS48c3RyaW5nPj99ICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3QgZ2V0Q2xhc3NTZWxlY3RvciA9IChjbGFzc2VzID0gW10sIHNlbGVjdCwgdG9TdHJpbmcsIHBhcmVudCwgYmFzZSkgPT4ge1xuICBjb25zdCB7IG1heCB9ID1cbiAgICBtYXhTdWJzZXRTaXplLmZpbmQoKHsgaXRlbXMgfSkgPT4gY2xhc3Nlcy5sZW5ndGggPiBpdGVtcykgfHwgeyBtYXg6IGNsYXNzZXMubGVuZ3RoIH1cblxuICBsZXQgcmVzdWx0ID0gY29tYmluYXRpb25zKGNsYXNzZXMsIHsgbWF4IH0pXG5cbiAgZm9yKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHBhdHRlcm4gPSB0b1N0cmluZy5wYXR0ZXJuKHsgLi4uYmFzZSwgY2xhc3NlczogcmVzdWx0W2ldIH0pXG4gICAgY29uc3QgbWF0Y2hlcyA9IHNlbGVjdChwYXR0ZXJuLCBwYXJlbnQpXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gcmVzdWx0W2ldXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGxcbn1cblxuLyoqXG4gKiBMb29rdXAgYXR0cmlidXRlIGlkZW50aWZpZXJcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48c3RyaW5nPn0gcHJpb3JpdHkgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIGVsZW1lbnQgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBpZ25vcmUgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgc2VsZWN0ICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7VG9TdHJpbmdBcGl9ICAgIHRvU3RyaW5nICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1BhcmVudE5vZGV9ICAgICBwYXJlbnQgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtQYXR0ZXJuP30gICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBmaW5kQXR0cmlidXRlc1BhdHRlcm4gPSAocHJpb3JpdHksIGVsZW1lbnQsIGlnbm9yZSwgc2VsZWN0LCB0b1N0cmluZywgcGFyZW50ID0gZWxlbWVudC5wYXJlbnROb2RlKSA9PiB7XG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBlbGVtZW50LmF0dHJpYnV0ZXNcbiAgdmFyIGF0dHJpYnV0ZU5hbWVzID0gT2JqZWN0LmtleXMoYXR0cmlidXRlcykubWFwKCh2YWwpID0+IGF0dHJpYnV0ZXNbdmFsXS5uYW1lKVxuICAgIC5maWx0ZXIoKGEpID0+IHByaW9yaXR5LmluZGV4T2YoYSkgPCAwKVxuXG4gIHZhciBzb3J0ZWRLZXlzID0gWyAuLi5wcmlvcml0eSwgLi4uYXR0cmlidXRlTmFtZXMgXVxuICB2YXIgcGF0dGVybiA9IGNyZWF0ZVBhdHRlcm4oKVxuICBwYXR0ZXJuLnRhZyA9IGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG5cbiAgdmFyIGlzT3B0aW1hbCA9IChwYXR0ZXJuKSA9PiAoc2VsZWN0KHRvU3RyaW5nLnBhdHRlcm4ocGF0dGVybiksIHBhcmVudCkubGVuZ3RoID09PSAxKVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gc29ydGVkS2V5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCBrZXkgPSBzb3J0ZWRLZXlzW2ldXG4gICAgY29uc3QgYXR0cmlidXRlID0gYXR0cmlidXRlc1trZXldXG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGVzY2FwZVZhbHVlKGF0dHJpYnV0ZSAmJiBhdHRyaWJ1dGUubmFtZSlcbiAgICBjb25zdCBhdHRyaWJ1dGVWYWx1ZSA9IGVzY2FwZVZhbHVlKGF0dHJpYnV0ZSAmJiBhdHRyaWJ1dGUudmFsdWUpXG4gICAgY29uc3QgdXNlTmFtZWRJZ25vcmUgPSBhdHRyaWJ1dGVOYW1lICE9PSAnY2xhc3MnXG5cbiAgICBjb25zdCBjdXJyZW50SWdub3JlID0gKHVzZU5hbWVkSWdub3JlICYmIGlnbm9yZVthdHRyaWJ1dGVOYW1lXSkgfHwgaWdub3JlLmF0dHJpYnV0ZVxuICAgIGNvbnN0IGN1cnJlbnREZWZhdWx0SWdub3JlID0gKHVzZU5hbWVkSWdub3JlICYmIGRlZmF1bHRJZ25vcmVbYXR0cmlidXRlTmFtZV0pIHx8IGRlZmF1bHRJZ25vcmUuYXR0cmlidXRlXG4gICAgaWYgKGNoZWNrSWdub3JlKGN1cnJlbnRJZ25vcmUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlLCBjdXJyZW50RGVmYXVsdElnbm9yZSkpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgc3dpdGNoIChhdHRyaWJ1dGVOYW1lKSB7XG4gICAgICBjYXNlICdjbGFzcyc6IHtcbiAgICAgICAgbGV0IGNsYXNzTmFtZXMgPSBhdHRyaWJ1dGVWYWx1ZS50cmltKCkuc3BsaXQoL1xccysvZylcbiAgICAgICAgaWYgKCFjbGFzc05hbWVzWzBdKSB7IC8vIGVtcHR5IHN0cmluZ1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2xhc3NJZ25vcmUgPSBpZ25vcmUuY2xhc3MgfHwgZGVmYXVsdElnbm9yZS5jbGFzc1xuICAgICAgICBpZiAoY2xhc3NJZ25vcmUpIHtcbiAgICAgICAgICBjbGFzc05hbWVzID0gY2xhc3NOYW1lcy5maWx0ZXIoY2xhc3NOYW1lID0+ICFjbGFzc0lnbm9yZShjbGFzc05hbWUpKVxuICAgICAgICB9XG4gICAgICAgIGlmIChjbGFzc05hbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBjbGFzc2VzID0gZ2V0Q2xhc3NTZWxlY3RvcihjbGFzc05hbWVzLCBzZWxlY3QsIHRvU3RyaW5nLCBwYXJlbnQsIHBhdHRlcm4pXG4gICAgICAgICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgICAgIHBhdHRlcm4uY2xhc3NlcyA9IGNsYXNzZXNcbiAgICAgICAgICAgIGlmIChpc09wdGltYWwocGF0dGVybikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhdHRlcm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgICAgYnJlYWtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcGF0dGVybi5hdHRyaWJ1dGVzLnB1c2goeyBuYW1lOiBhdHRyaWJ1dGVOYW1lLCB2YWx1ZTogYXR0cmlidXRlVmFsdWUgfSlcbiAgICAgICAgaWYgKGlzT3B0aW1hbChwYXR0ZXJuKSkge1xuICAgICAgICAgIHJldHVybiBwYXR0ZXJuXG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbFxufVxuXG5cbi8qKlxuICogRXh0ZW5kIHBhdGggd2l0aCB0YWcgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICAgZWxlbWVudCAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICAgb3B0aW9ucyAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59IHBhdGggICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgIHNlbGVjdCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgICBwYXJlbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBjaGVja1RhZyA9IChlbGVtZW50LCBwYXRoLCB7IGlnbm9yZSB9LCBzZWxlY3QsIHRvU3RyaW5nLCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGUpID0+IHtcbiAgY29uc3QgcGF0dGVybiA9IGZpbmRUYWdQYXR0ZXJuKGVsZW1lbnQsIGlnbm9yZSlcbiAgaWYgKHBhdHRlcm4pIHtcbiAgICBsZXQgbWF0Y2hlcyA9IFtdXG4gICAgbWF0Y2hlcyA9IHNlbGVjdCh0b1N0cmluZy5wYXR0ZXJuKHBhdHRlcm4pLCBwYXJlbnQpXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICBwYXRoLnVuc2hpZnQocGF0dGVybilcbiAgICAgIGlmIChwYXR0ZXJuLnRhZyA9PT0gJ2lmcmFtZScpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBMb29rdXAgdGFnIGlkZW50aWZpZXJcbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICBpZ25vcmUgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7UGF0dGVybj99ICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IGZpbmRUYWdQYXR0ZXJuID0gKGVsZW1lbnQsIGlnbm9yZSkgPT4ge1xuICBjb25zdCB0YWdOYW1lID0gZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKClcbiAgaWYgKGNoZWNrSWdub3JlKGlnbm9yZS50YWcsIG51bGwsIHRhZ05hbWUpKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICBjb25zdCBwYXR0ZXJuID0gY3JlYXRlUGF0dGVybigpXG4gIHBhdHRlcm4udGFnID0gdGFnTmFtZVxuICByZXR1cm4gcGF0dGVyblxufVxuXG4vKipcbiAqIEV4dGVuZCBwYXRoIHdpdGggc3BlY2lmaWMgY2hpbGQgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICAgZWxlbWVudCAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICAgb3B0aW9ucyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gcGF0aCAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3QgY2hlY2tOdGhDaGlsZCA9IChlbGVtZW50LCBwYXRoLCB7IGlnbm9yZSB9KSA9PiB7XG4gIGNvbnN0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZVxuICBjb25zdCBjaGlsZHJlbiA9IHBhcmVudC5jaGlsZHJlblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baV1cbiAgICBpZiAoY2hpbGQgPT09IGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGNoaWxkUGF0dGVybiA9IGZpbmRUYWdQYXR0ZXJuKGNoaWxkLCBpZ25vcmUpXG4gICAgICBpZiAoIWNoaWxkUGF0dGVybikge1xuICAgICAgICByZXR1cm4gY29uc29sZS53YXJuKGBcbiAgICAgICAgICBFbGVtZW50IGNvdWxkbid0IGJlIG1hdGNoZWQgdGhyb3VnaCBzdHJpY3QgaWdub3JlIHBhdHRlcm4hXG4gICAgICAgIGAsIGNoaWxkLCBpZ25vcmUsIGNoaWxkUGF0dGVybilcbiAgICAgIH1cbiAgICAgIGNoaWxkUGF0dGVybi5yZWxhdGVzID0gJ2NoaWxkJ1xuICAgICAgY2hpbGRQYXR0ZXJuLnBzZXVkbyA9IFtgbnRoLWNoaWxkKCR7aSsxfSlgXVxuICAgICAgcGF0aC51bnNoaWZ0KGNoaWxkUGF0dGVybilcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIEV4dGVuZCBwYXRoIHdpdGggY29udGFpbnNcbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgIGVsZW1lbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSBwYXRoICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICAgb3B0aW9ucyAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgIHNlbGVjdCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7VG9TdHJpbmdBcGl9ICAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Jvb2xlYW59ICAgICAgICAgbmVzdGVkICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBjaGVja1RleHQgPSAoZWxlbWVudCwgcGF0aCwgeyBpZ25vcmUgfSwgc2VsZWN0LCB0b1N0cmluZywgbmVzdGVkKSA9PiB7XG4gIGNvbnN0IHBhdHRlcm4gPSBmaW5kVGFnUGF0dGVybihlbGVtZW50LCBpZ25vcmUpXG4gIGlmICghcGF0dGVybikge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGNvbnN0IHRleHRDb250ZW50ID0gKG5lc3RlZCA/IGVsZW1lbnQudGV4dENvbnRlbnQgOiAoZWxlbWVudC5maXJzdENoaWxkICYmIGVsZW1lbnQuZmlyc3RDaGlsZC5ub2RlVmFsdWUpIHx8ICcnKVxuICBpZiAoIXRleHRDb250ZW50KSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBwYXR0ZXJuLnJlbGF0ZXMgPSAnY2hpbGQnXG4gIGNvbnN0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZVxuICBjb25zdCB0ZXh0cyA9IHRleHRDb250ZW50XG4gICAgLnJlcGxhY2UoL1xcbisvZywgJ1xcbicpXG4gICAgLnNwbGl0KCdcXG4nKVxuICAgIC5tYXAodGV4dCA9PiB0ZXh0LnRyaW0oKSlcbiAgICAuZmlsdGVyKHRleHQgPT4gdGV4dC5sZW5ndGggPiAwKVxuXG4gIGNvbnN0IGNvbnRhaW5zID0gW11cblxuICB3aGlsZSAodGV4dHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHRleHQgPSB0ZXh0cy5zaGlmdCgpXG4gICAgaWYgKGNoZWNrSWdub3JlKGlnbm9yZS5jb250YWlucywgbnVsbCwgdGV4dCwgZGVmYXVsdElnbm9yZS5jb250YWlucykpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIGNvbnRhaW5zLnB1c2goYGNvbnRhaW5zKFwiJHt0ZXh0fVwiKWApXG4gIFxuICAgIGNvbnN0IG1hdGNoZXMgPSBzZWxlY3QodG9TdHJpbmcucGF0dGVybih7IC4uLnBhdHRlcm4sIHBzZXVkbzogY29udGFpbnMgfSksIHBhcmVudClcbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHBhdHRlcm4ucHNldWRvID0gY29udGFpbnNcbiAgICAgIHBhdGgudW5zaGlmdChwYXR0ZXJuKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qKlxuICogRXh0ZW5kIHBhdGggd2l0aCBkZXNjZW5kYW50IHRhZ1xuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICAgZWxlbWVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59IHBhdGggICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T3B0aW9uc30gICAgICAgICBvcHRpb25zICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3QgY2hlY2tSZWN1cnNpdmVEZXNjZW5kYW50cyA9IChlbGVtZW50LCBwYXRoLCBvcHRpb25zLCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIGNvbnN0IHBhdHRlcm4gPSBmaW5kVGFnUGF0dGVybihlbGVtZW50LCBvcHRpb25zLmlnbm9yZSlcbiAgaWYgKCFwYXR0ZXJuKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBjb25zdCBkZXNjZW5kYW50cyA9IEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJykpXG4gIHdoaWxlIChkZXNjZW5kYW50cy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZGVzY2VuZGFudFBhdGggPSBtYXRjaChkZXNjZW5kYW50cy5zaGlmdCgpLCB7IC4uLm9wdGlvbnMsIHJvb3Q6IGVsZW1lbnQgfSwgdHJ1ZSlcbiAgICAvLyBhdm9pZCBkZXNjZW5kYW50IHNlbGVjdG9ycyB3aXRoIG50aC1jaGlsZFxuICAgIGlmICghZGVzY2VuZGFudFBhdGguc29tZShwYXR0ZXJuID0+IHBhdHRlcm4ucHNldWRvLnNvbWUocCA9PiBwLnN0YXJ0c1dpdGgoJ250aC1jaGlsZCcpKSkpIHtcbiAgICAgIGNvbnN0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudFxuICAgICAgY29uc3QgbWF0Y2hlcyA9IHNlbGVjdCh0b1N0cmluZy5wYXR0ZXJuKHsgLi4ucGF0dGVybiwgZGVzY2VuZGFudHM6IFtkZXNjZW5kYW50UGF0aF0gfSksIHBhcmVudClcbiAgICAgIGlmIChtYXRjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBwYXR0ZXJuLmRlc2NlbmRhbnRzID0gW2Rlc2NlbmRhbnRQYXRoXVxuICAgICAgICBwYXRoLnVuc2hpZnQocGF0dGVybilcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBMb29rdXAgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBlbGVtZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICBvcHRpb25zICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgdG9TdHJpbmcgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtQYXR0ZXJufSAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IGZpbmRQYXR0ZXJuID0gKGVsZW1lbnQsIHsgcHJpb3JpdHksIGlnbm9yZSB9LCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIHZhciBwYXR0ZXJuID0gZmluZEF0dHJpYnV0ZXNQYXR0ZXJuKHByaW9yaXR5LCBlbGVtZW50LCBpZ25vcmUsIHNlbGVjdCwgdG9TdHJpbmcpXG4gIGlmICghcGF0dGVybikge1xuICAgIHBhdHRlcm4gPSBmaW5kVGFnUGF0dGVybihlbGVtZW50LCBpZ25vcmUpXG4gIH1cbiAgcmV0dXJuIHBhdHRlcm5cbn1cblxuLyoqXG4gKiBWYWxpZGF0ZSB3aXRoIGN1c3RvbSBhbmQgZGVmYXVsdCBmdW5jdGlvbnNcbiAqXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gcHJlZGljYXRlICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge3N0cmluZz99ICBuYW1lICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7c3RyaW5nfSAgIHZhbHVlICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZGVmYXVsdFByZWRpY2F0ZSAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBjaGVja0lnbm9yZSA9IChwcmVkaWNhdGUsIG5hbWUsIHZhbHVlLCBkZWZhdWx0UHJlZGljYXRlKSA9PiB7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGNvbnN0IGNoZWNrID0gcHJlZGljYXRlIHx8IGRlZmF1bHRQcmVkaWNhdGVcbiAgaWYgKCFjaGVjaykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiBjaGVjayhuYW1lLCB2YWx1ZSwgZGVmYXVsdFByZWRpY2F0ZSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXRjaC5qcyIsIi8qKlxuICogIyBPcHRpbWl6ZVxuICpcbiAqIDEuKSBJbXByb3ZlIGVmZmljaWVuY3kgdGhyb3VnaCBzaG9ydGVyIHNlbGVjdG9ycyBieSByZW1vdmluZyByZWR1bmRhbmN5XG4gKiAyLikgSW1wcm92ZSByb2J1c3RuZXNzIHRocm91Z2ggc2VsZWN0b3IgdHJhbnNmb3JtYXRpb25cbiAqL1xuXG5pbXBvcnQgeyBnZXRTZWxlY3QgfSBmcm9tICcuL3NlbGVjdG9yJ1xuaW1wb3J0IHsgY3JlYXRlUGF0dGVybiwgZ2V0VG9TdHJpbmcgfSBmcm9tICcuL3BhdHRlcm4nXG5pbXBvcnQgeyBjb252ZXJ0Tm9kZUxpc3QsIHBhcnRpdGlvbiB9IGZyb20gJy4vdXRpbGl0aWVzJ1xuXG4vKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vc2VsZWN0JykuT3B0aW9uc30gT3B0aW9uc1xuICogQHR5cGVkZWYge2ltcG9ydCgnLi9wYXR0ZXJuJykuUGF0dGVybn0gUGF0dGVyblxuICogQHR5cGVkZWYge2ltcG9ydCgnLi9wYXR0ZXJuJykuVG9TdHJpbmdBcGl9IFBhdHRlcm5cbiAqL1xuXG4vKipcbiAqIEFwcGx5IGRpZmZlcmVudCBvcHRpbWl6YXRpb24gdGVjaG5pcXVlc1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgICAgICAgICAgICAgIHBhdGggICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fEFycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnQgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPcHRpb25zfSAgICAgICAgICAgICAgICAgICAgICAgICBbb3B0aW9uc10gIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7QXJyYXkuPFBhdHRlcm4+fSAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3B0aW1pemUgKHBhdGgsIGVsZW1lbnRzLCBvcHRpb25zID0ge30pIHtcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cblxuICBpZiAocGF0aFswXS5yZWxhdGVzID09PSAnY2hpbGQnKSB7XG4gICAgcGF0aFswXS5yZWxhdGVzID0gdW5kZWZpbmVkXG4gIH1cblxuICAvLyBjb252ZXJ0IHNpbmdsZSBlbnRyeSBhbmQgTm9kZUxpc3RcbiAgaWYgKCFBcnJheS5pc0FycmF5KGVsZW1lbnRzKSkge1xuICAgIGVsZW1lbnRzID0gIWVsZW1lbnRzLmxlbmd0aCA/IFtlbGVtZW50c10gOiBjb252ZXJ0Tm9kZUxpc3QoZWxlbWVudHMpXG4gIH1cblxuICBpZiAoIWVsZW1lbnRzLmxlbmd0aCB8fCBlbGVtZW50cy5zb21lKChlbGVtZW50KSA9PiBlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBpbnB1dCAtIHRvIGNvbXBhcmUgSFRNTEVsZW1lbnRzIGl0cyBuZWNlc3NhcnkgdG8gcHJvdmlkZSBhIHJlZmVyZW5jZSBvZiB0aGUgc2VsZWN0ZWQgbm9kZShzKSEgKG1pc3NpbmcgXCJlbGVtZW50c1wiKScpXG4gIH1cblxuICBjb25zdCBzZWxlY3QgPSBnZXRTZWxlY3Qob3B0aW9ucylcbiAgY29uc3QgdG9TdHJpbmcgPSBnZXRUb1N0cmluZyhvcHRpb25zKVxuXG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBbb3B0aW1pemVQYXJ0KFtdLCBwYXRoWzBdLCBbXSwgZWxlbWVudHMsIHNlbGVjdCwgdG9TdHJpbmcpXVxuICB9XG5cbiAgdmFyIGVuZE9wdGltaXplZCA9IGZhbHNlXG4gIGlmIChwYXRoW3BhdGgubGVuZ3RoLTFdLnJlbGF0ZXMgPT09ICdjaGlsZCcpIHtcbiAgICBwYXRoW3BhdGgubGVuZ3RoLTFdID0gb3B0aW1pemVQYXJ0KHBhdGguc2xpY2UoMCwgLTEpLCBwYXRoW3BhdGgubGVuZ3RoLTFdLCBbXSwgZWxlbWVudHMsIHNlbGVjdCwgdG9TdHJpbmcpXG4gICAgZW5kT3B0aW1pemVkID0gdHJ1ZVxuICB9XG5cbiAgcGF0aCA9IFsuLi5wYXRoXVxuICBjb25zdCBzaG9ydGVuZWQgPSBbcGF0aC5wb3AoKV1cbiAgd2hpbGUgKHBhdGgubGVuZ3RoID4gMSkge1xuICAgIGNvbnN0IGN1cnJlbnQgPSBwYXRoLnBvcCgpXG4gICAgY29uc3QgbWF0Y2hlcyA9IHNlbGVjdCh0b1N0cmluZy5wYXRoKFsuLi5wYXRoLCAuLi5zaG9ydGVuZWRdKSlcbiAgICBjb25zdCBoYXNTYW1lUmVzdWx0ID0gbWF0Y2hlcy5sZW5ndGggPT09IGVsZW1lbnRzLmxlbmd0aCAmJiBlbGVtZW50cy5ldmVyeSgoZWxlbWVudCwgaSkgPT4gZWxlbWVudCA9PT0gbWF0Y2hlc1tpXSlcbiAgICBpZiAoIWhhc1NhbWVSZXN1bHQpIHtcbiAgICAgIHNob3J0ZW5lZC51bnNoaWZ0KG9wdGltaXplUGFydChwYXRoLCBjdXJyZW50LCBzaG9ydGVuZWQsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSlcbiAgICB9XG4gIH1cbiAgc2hvcnRlbmVkLnVuc2hpZnQocGF0aFswXSlcbiAgcGF0aCA9IHNob3J0ZW5lZFxuXG4gIC8vIG9wdGltaXplIHN0YXJ0ICsgZW5kXG4gIHBhdGhbMF0gPSBvcHRpbWl6ZVBhcnQoW10sIHBhdGhbMF0sIHBhdGguc2xpY2UoMSksIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKVxuICBpZiAoIWVuZE9wdGltaXplZCkge1xuICAgIHBhdGhbcGF0aC5sZW5ndGgtMV0gPSBvcHRpbWl6ZVBhcnQocGF0aC5zbGljZSgwLCAtMSksIHBhdGhbcGF0aC5sZW5ndGgtMV0sIFtdLCBlbGVtZW50cywgc2VsZWN0LCB0b1N0cmluZylcbiAgfVxuXG4gIHJldHVybiBwYXRoXG59XG5cbi8qKlxuICogT3B0aW1pemUgOmNvbnRhaW5zXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgcHJlICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtQYXR0ZXJufSAgICAgICAgICAgICBjdXJyZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHBvc3QgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgICAgICBzZWxlY3QgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICAgICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7UGF0dGVybn0gICAgICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IG9wdGltaXplVGV4dCA9IChwcmUsIGN1cnJlbnQsIHBvc3QsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIGNvbnN0IFtjb250YWlucywgb3RoZXJdID0gcGFydGl0aW9uKGN1cnJlbnQucHNldWRvLCAoaXRlbSkgPT4gaXRlbS5zdGFydHNXaXRoKCdjb250YWlucycpKVxuXG4gIGlmIChjb250YWlucy5sZW5ndGggPiAwICYmIHBvc3QubGVuZ3RoKSB7XG4gICAgY29uc3QgYmFzZSA9IHsgLi4uY3VycmVudCwgcHNldWRvOiBbLi4ub3RoZXIsIC4uLmNvbnRhaW5zXSB9XG4gICAgd2hpbGUgKGJhc2UucHNldWRvLmxlbmd0aCA+IG90aGVyLmxlbmd0aCkge1xuICAgICAgY29uc3Qgb3B0aW1pemVkID0gYmFzZS5wc2V1ZG8uc2xpY2UoMCwgLTEpXG4gICAgICBpZiAoIWNvbXBhcmVSZXN1bHRzKHNlbGVjdCh0b1N0cmluZy5wYXRoKFsuLi5wcmUsIHsgLi4uYmFzZSwgcHNldWRvOiBvcHRpbWl6ZWQgfSwgLi4ucG9zdF0pKSwgZWxlbWVudHMpKSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBiYXNlLnBzZXVkbyA9IG9wdGltaXplZFxuICAgIH1cbiAgICByZXR1cm4gYmFzZVxuICB9XG4gIHJldHVybiBjdXJyZW50XG59XG5cbi8qKlxuICogT3B0aW1pemUgYXR0cmlidXRlc1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHByZSAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UGF0dGVybn0gICAgICAgICAgICAgY3VycmVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwb3N0ICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgICAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1BhdHRlcm59ICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBvcHRpbWl6ZUF0dHJpYnV0ZXMgPSAocHJlLCBjdXJyZW50LCBwb3N0LCBlbGVtZW50cywgc2VsZWN0LCB0b1N0cmluZykgPT4ge1xuICAvLyByZWR1Y2UgYXR0cmlidXRlczogZmlyc3QgdHJ5IHdpdGhvdXQgdmFsdWUsIHRoZW4gcmVtb3ZpbmcgY29tcGxldGVseVxuICBpZiAoY3VycmVudC5hdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgYXR0cmlidXRlcyA9IFsuLi5jdXJyZW50LmF0dHJpYnV0ZXNdXG5cbiAgICBjb25zdCBzaW1wbGlmeSA9IChvcmlnaW5hbCwgZ2V0U2ltcGxpZmllZCkgPT4ge1xuICAgICAgbGV0IGkgPSBvcmlnaW5hbC5sZW5ndGggLSAxXG4gICAgICB3aGlsZSAoaSA+PSAwKSB7XG4gICAgICAgIGxldCBhdHRyaWJ1dGVzID0gZ2V0U2ltcGxpZmllZChvcmlnaW5hbCwgaSlcbiAgICAgICAgaWYgKCFjb21wYXJlUmVzdWx0cyhcbiAgICAgICAgICBzZWxlY3QodG9TdHJpbmcucGF0aChbLi4ucHJlLCB7IC4uLmN1cnJlbnQsIGF0dHJpYnV0ZXMgfSwgLi4ucG9zdF0pKSxcbiAgICAgICAgICBlbGVtZW50c1xuICAgICAgICApKSB7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBpLS1cbiAgICAgICAgb3JpZ2luYWwgPSBhdHRyaWJ1dGVzXG4gICAgICB9XG4gICAgICByZXR1cm4gb3JpZ2luYWxcbiAgICB9XG5cbiAgICBjb25zdCBzaW1wbGlmaWVkID0gc2ltcGxpZnkoYXR0cmlidXRlcywgKGF0dHJpYnV0ZXMsIGkpID0+IHtcbiAgICAgIGNvbnN0IHsgbmFtZSB9ID0gYXR0cmlidXRlc1tpXVxuICAgICAgaWYgKG5hbWUgPT09ICdpZCcpIHtcbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXNcbiAgICAgIH1cbiAgICAgIHJldHVybiBbLi4uYXR0cmlidXRlcy5zbGljZSgwLCBpKSwgeyBuYW1lLCB2YWx1ZTogbnVsbCB9LCAuLi5hdHRyaWJ1dGVzLnNsaWNlKGkgKyAxKV1cbiAgICB9KVxuICAgIHJldHVybiB7IC4uLmN1cnJlbnQsIGF0dHJpYnV0ZXM6IHNpbXBsaWZ5KHNpbXBsaWZpZWQsIGF0dHJpYnV0ZXMgPT4gYXR0cmlidXRlcy5zbGljZSgwLCAtMSkpIH0gICAgXG4gIH1cbiAgcmV0dXJuIGN1cnJlbnRcbn1cblxuLyoqXG4gKiBPcHRpbWl6ZSBkZXNjZW5kYW50XG4gKlxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgcHJlICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtQYXR0ZXJufSAgICAgICAgICAgICBjdXJyZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHBvc3QgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgICAgICBzZWxlY3QgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICAgICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7UGF0dGVybn0gICAgICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IG9wdGltaXplRGVzY2VuZGFudCA9IChwcmUsIGN1cnJlbnQsIHBvc3QsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIC8vIHJvYnVzdG5lc3M6IGRlc2NlbmRhbnQgaW5zdGVhZCBjaGlsZCAoaGV1cmlzdGljKVxuICBpZiAoY3VycmVudC5yZWxhdGVzID09PSAnY2hpbGQnKSB7XG4gICAgY29uc3QgZGVzY2VuZGFudCA9IHsgLi4uY3VycmVudCwgcmVsYXRlczogdW5kZWZpbmVkIH1cbiAgICBsZXQgbWF0Y2hlcyA9IHNlbGVjdCh0b1N0cmluZy5wYXRoKFsuLi5wcmUsIGRlc2NlbmRhbnQsIC4uLnBvc3RdKSlcbiAgICBpZiAoY29tcGFyZVJlc3VsdHMobWF0Y2hlcywgZWxlbWVudHMpKSB7XG4gICAgICByZXR1cm4gZGVzY2VuZGFudFxuICAgIH1cbiAgfVxuICByZXR1cm4gY3VycmVudFxufVxuXG4vKipcbiAqIE9wdGltaXplIHJlY3Vyc2l2ZSBkZXNjZW5kYW50c1xuICogXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwcmUgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1BhdHRlcm59ICAgICAgICAgICAgIGN1cnJlbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgcG9zdCAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICAgICAgIHNlbGVjdCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7VG9TdHJpbmdBcGl9ICAgICAgICAgdG9TdHJpbmcgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtQYXR0ZXJufSAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3Qgb3B0aW1pemVSZWN1cnNpdmVEZXNjZW5kYW50cyA9IChwcmUsIGN1cnJlbnQsIHBvc3QsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIGlmIChjdXJyZW50LmRlc2NlbmRhbnRzLmxlbmd0aCA+IDAgJiYgcG9zdC5sZW5ndGgpIHtcbiAgICBjb25zdCBiYXNlID0geyAuLi5jdXJyZW50LCBkZXNjZW5kYW50czogWy4uLmN1cnJlbnQuZGVzY2VuZGFudHNdIH1cbiAgICB3aGlsZSAoYmFzZS5kZXNjZW5kYW50cy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBvcHRpbWl6ZWQgPSBiYXNlLmRlc2NlbmRhbnRzLnNsaWNlKDAsIC0xKVxuICAgICAgaWYgKCFjb21wYXJlUmVzdWx0cyhzZWxlY3QodG9TdHJpbmcucGF0aChbLi4ucHJlLCB7IC4uLmJhc2UsIGRlc2NlbmRhbnRzOiBvcHRpbWl6ZWQgfSwgLi4ucG9zdF0pKSwgZWxlbWVudHMpKSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBiYXNlLmRlc2NlbmRhbnRzID0gb3B0aW1pemVkXG4gICAgfVxuICAgIHJldHVybiBiYXNlXG4gIH1cbiAgcmV0dXJuIGN1cnJlbnRcbn1cblxuLyoqXG4gKiBPcHRpbWl6ZSBudGggb2YgdHlwZVxuICpcbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHByZSAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UGF0dGVybn0gICAgICAgICAgICAgY3VycmVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwb3N0ICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgICAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1BhdHRlcm59ICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBvcHRpbWl6ZU50aE9mVHlwZSA9IChwcmUsIGN1cnJlbnQsIHBvc3QsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIGNvbnN0IGkgPSBjdXJyZW50LnBzZXVkby5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLnN0YXJ0c1dpdGgoJ250aC1jaGlsZCcpKVxuICAvLyByb2J1c3RuZXNzOiAnbnRoLW9mLXR5cGUnIGluc3RlYWQgJ250aC1jaGlsZCcgKGhldXJpc3RpYylcbiAgaWYgKGkgPj0gMCkge1xuICAgIC8vIFRPRE86IGNvbnNpZGVyIGNvbXBsZXRlIGNvdmVyYWdlIG9mICdudGgtb2YtdHlwZScgcmVwbGFjZW1lbnRcbiAgICBjb25zdCB0eXBlID0gY3VycmVudC5wc2V1ZG9baV0ucmVwbGFjZSgvXm50aC1jaGlsZC8sICdudGgtb2YtdHlwZScpXG4gICAgY29uc3QgbnRoT2ZUeXBlID0geyAuLi5jdXJyZW50LCBwc2V1ZG86IFsuLi5jdXJyZW50LnBzZXVkby5zbGljZSgwLCBpKSwgdHlwZSwgLi4uY3VycmVudC5wc2V1ZG8uc2xpY2UoaSArIDEpXSB9XG4gICAgbGV0IHBhdHRlcm4gPSB0b1N0cmluZy5wYXRoKFsuLi5wcmUsIG50aE9mVHlwZSwgLi4ucG9zdF0pXG4gICAgbGV0IG1hdGNoZXMgPSBzZWxlY3QocGF0dGVybilcbiAgICBpZiAoY29tcGFyZVJlc3VsdHMobWF0Y2hlcywgZWxlbWVudHMpKSB7XG4gICAgICByZXR1cm4gbnRoT2ZUeXBlXG4gICAgfVxuICB9XG4gIHJldHVybiBjdXJyZW50XG59XG5cbi8qKlxuICogT3B0aW1pemUgY2xhc3Nlc1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHByZSAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UGF0dGVybn0gICAgICAgICAgICAgY3VycmVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwb3N0ICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgICAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1BhdHRlcm59ICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBvcHRpbWl6ZUNsYXNzZXMgPSAocHJlLCBjdXJyZW50LCBwb3N0LCBlbGVtZW50cywgc2VsZWN0LCB0b1N0cmluZykgPT4ge1xuICAvLyBlZmZpY2llbmN5OiBjb21iaW5hdGlvbnMgb2YgY2xhc3NuYW1lIChwYXJ0aWFsIHBlcm11dGF0aW9ucylcbiAgaWYgKGN1cnJlbnQuY2xhc3Nlcy5sZW5ndGggPiAxKSB7XG4gICAgbGV0IG9wdGltaXplZCA9IGN1cnJlbnQuY2xhc3Nlcy5zbGljZSgpLnNvcnQoKGN1cnIsIG5leHQpID0+IGN1cnIubGVuZ3RoIC0gbmV4dC5sZW5ndGgpXG5cbiAgICB3aGlsZSAob3B0aW1pemVkLmxlbmd0aCA+IDEpIHtcbiAgICAgIG9wdGltaXplZC5zaGlmdCgpXG4gICAgICBjb25zdCBwYXR0ZXJuID0gdG9TdHJpbmcucGF0aChbLi4ucHJlLCB7IC4uLmN1cnJlbnQsIGNsYXNzZXM6IG9wdGltaXplZCB9LCAuLi5wb3N0XSlcbiAgICAgIGlmICghY29tcGFyZVJlc3VsdHMoc2VsZWN0KHBhdHRlcm4pLCBlbGVtZW50cykpIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnQuY2xhc3NlcyA9IG9wdGltaXplZFxuICAgIH1cblxuICAgIG9wdGltaXplZCA9IGN1cnJlbnQuY2xhc3Nlc1xuXG4gICAgaWYgKG9wdGltaXplZC5sZW5ndGggPiAyKSB7XG4gICAgICBjb25zdCBiYXNlID0gY3JlYXRlUGF0dGVybih7IGNsYXNzZXM6IG9wdGltaXplZCB9KVxuICAgICAgY29uc3QgcmVmZXJlbmNlcyA9IHNlbGVjdCh0b1N0cmluZy5wYXRoKFsuLi5wcmUsIGJhc2VdKSlcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVmZXJlbmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCByZWZlcmVuY2UgPSByZWZlcmVuY2VzW2ldXG4gICAgICAgIGlmIChlbGVtZW50cy5zb21lKChlbGVtZW50KSA9PiByZWZlcmVuY2UuY29udGFpbnMoZWxlbWVudCkpKSB7XG4gICAgICAgICAgLy8gVE9ETzpcbiAgICAgICAgICAvLyAtIGNoZWNrIHVzaW5nIGF0dHJpYnV0ZXMgKyByZWdhcmQgZXhjbHVkZXNcbiAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGNyZWF0ZVBhdHRlcm4oeyB0YWc6IHJlZmVyZW5jZS50YWdOYW1lIH0pXG4gICAgICAgICAgdmFyIHBhdHRlcm4gPSB0b1N0cmluZy5wYXRoKFsuLi5wcmUsIGRlc2NyaXB0aW9uLCAuLi5wb3N0XSlcbiAgICAgICAgICB2YXIgbWF0Y2hlcyA9IHNlbGVjdChwYXR0ZXJuKVxuICAgICAgICAgIGlmIChjb21wYXJlUmVzdWx0cyhtYXRjaGVzLCBlbGVtZW50cykpIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBkZXNjcmlwdGlvblxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjdXJyZW50XG59XG5cbmNvbnN0IG9wdGltaXplcnMgPSBbXG4gIG9wdGltaXplVGV4dCxcbiAgb3B0aW1pemVBdHRyaWJ1dGVzLFxuICBvcHRpbWl6ZURlc2NlbmRhbnQsXG4gIG9wdGltaXplUmVjdXJzaXZlRGVzY2VuZGFudHMsXG4gIG9wdGltaXplTnRoT2ZUeXBlLFxuICBvcHRpbWl6ZUNsYXNzZXMsXG5dXG5cbi8qKlxuICogSW1wcm92ZSBhIGNodW5rIG9mIHRoZSBzZWxlY3RvclxuICpcbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHByZSAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UGF0dGVybn0gICAgICAgICAgICAgY3VycmVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwb3N0ICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgICAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1BhdHRlcm59ICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBvcHRpbWl6ZVBhcnQgPSAocHJlLCBjdXJyZW50LCBwb3N0LCBlbGVtZW50cywgc2VsZWN0LCB0b1N0cmluZykgPT5cbiAgb3B0aW1pemVycy5yZWR1Y2UoKGFjYywgb3B0aW1pemVyKSA9PiBvcHRpbWl6ZXIocHJlLCBhY2MsIHBvc3QsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSwgY3VycmVudClcblxuLyoqXG4gKiBFdmFsdWF0ZSBtYXRjaGVzIHdpdGggZXhwZWN0ZWQgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBtYXRjaGVzICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Qm9vbGVhbn0gICAgICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBjb25zdCBjb21wYXJlUmVzdWx0cyA9IChtYXRjaGVzLCBlbGVtZW50cykgPT4ge1xuICBjb25zdCB7IGxlbmd0aCB9ID0gbWF0Y2hlc1xuICByZXR1cm4gbGVuZ3RoID09PSBlbGVtZW50cy5sZW5ndGggJiYgZWxlbWVudHMuZXZlcnkoKGVsZW1lbnQpID0+IHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobWF0Y2hlc1tpXSA9PT0gZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9vcHRpbWl6ZS5qcyIsIi8qKlxuICogIyBTZWxlY3RcbiAqXG4gKiBDb25zdHJ1Y3QgYSB1bmlxdWUgQ1NTIHF1ZXJ5IHNlbGVjdG9yIHRvIGFjY2VzcyB0aGUgc2VsZWN0ZWQgRE9NIGVsZW1lbnQocykuXG4gKiBGb3IgbG9uZ2V2aXR5IGl0IGFwcGxpZXMgZGlmZmVyZW50IG1hdGNoaW5nIGFuZCBvcHRpbWl6YXRpb24gc3RyYXRlZ2llcy5cbiAqL1xuaW1wb3J0IG1hdGNoIGZyb20gJy4vbWF0Y2gnXG5pbXBvcnQgb3B0aW1pemUgZnJvbSAnLi9vcHRpbWl6ZSdcbmltcG9ydCB7IGNvbnZlcnROb2RlTGlzdCwgZXNjYXBlVmFsdWUgfSBmcm9tICcuL3V0aWxpdGllcydcbmltcG9ydCB7IGdldENvbW1vbkFuY2VzdG9yLCBnZXRDb21tb25Qcm9wZXJ0aWVzIH0gZnJvbSAnLi9jb21tb24nXG5pbXBvcnQgeyBnZXRTZWxlY3QgfSBmcm9tICcuL3NlbGVjdG9yJ1xuaW1wb3J0IHsgY3JlYXRlUGF0dGVybiwgZ2V0VG9TdHJpbmcgfSBmcm9tICcuL3BhdHRlcm4nXG5cbi8qKlxuICogQHR5cGVkZWYgIHtPYmplY3R9IE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IFtyb290XSAgICAgICAgICAgICAgICAgICAgIE9wdGlvbmFsbHkgc3BlY2lmeSB0aGUgcm9vdCBlbGVtZW50XG4gKiBAcHJvcGVydHkge2Z1bmN0aW9uIHwgQXJyYXkuPEhUTUxFbGVtZW50Pn0gW3NraXBdICBTcGVjaWZ5IGVsZW1lbnRzIHRvIHNraXBcbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPHN0cmluZz59IFtwcmlvcml0eV0gICAgICAgICAgICAgIE9yZGVyIG9mIGF0dHJpYnV0ZSBwcm9jZXNzaW5nXG4gKiBAcHJvcGVydHkge09iamVjdDxzdHJpbmcsIGZ1bmN0aW9uIHwgbnVtYmVyIHwgc3RyaW5nIHwgYm9vbGVhbn0gW2lnbm9yZV0gRGVmaW5lIHBhdHRlcm5zIHdoaWNoIHNob3VsZG4ndCBiZSBpbmNsdWRlZFxuICogQHByb3BlcnR5IHsoJ2Nzcyd8J3hwYXRoJ3wnanF1ZXJ5Jyl9IFtmb3JtYXRdICAgICAgT3V0cHV0IGZvcm1hdCAgICBcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vcGF0dGVybicpLlBhdHRlcm59IFBhdHRlcm5cbiAqL1xuXG4vKipcbiAqIEdldCBhIHNlbGVjdG9yIGZvciB0aGUgcHJvdmlkZWQgZWxlbWVudFxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPcHRpb25zfSAgICAgW29wdGlvbnNdIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7QXJyYXkuPFBhdHRlcm4+fSAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFNpbmdsZVNlbGVjdG9yUGF0aCA9IChlbGVtZW50LCBvcHRpb25zID0ge30pID0+IHtcblxuICBpZiAoZWxlbWVudC5ub2RlVHlwZSA9PT0gMykge1xuICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGVcbiAgfVxuXG4gIGlmIChlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGlucHV0IC0gb25seSBIVE1MRWxlbWVudHMgb3IgcmVwcmVzZW50YXRpb25zIG9mIHRoZW0gYXJlIHN1cHBvcnRlZCEgKG5vdCBcIiR7dHlwZW9mIGVsZW1lbnR9XCIpYClcbiAgfVxuXG4gIGNvbnN0IHBhdGggPSBtYXRjaChlbGVtZW50LCBvcHRpb25zKVxuICBjb25zdCBvcHRpbWl6ZWRQYXRoID0gb3B0aW1pemUocGF0aCwgZWxlbWVudCwgb3B0aW9ucylcblxuICAvLyBkZWJ1Z1xuICAvLyBjb25zb2xlLmxvZyhgXG4gIC8vICAgc2VsZWN0b3I6ICAke3BhdGh9XG4gIC8vICAgb3B0aW1pemVkOiAke29wdGltaXplZFBhdGh9XG4gIC8vIGApXG5cbiAgcmV0dXJuIG9wdGltaXplZFBhdGhcbn1cblxuLyoqXG4gKiBHZXQgYSBzZWxlY3RvciB0byBtYXRjaCBtdWx0aXBsZSBkZXNjZW5kYW50cyBmcm9tIGFuIGFuY2VzdG9yXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50PnxOb2RlTGlzdH0gZWxlbWVudHMgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICAgICAgICAgICAgICAgIFtvcHRpb25zXSAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtBcnJheS48UGF0dGVybj59ICAgICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgY29uc3QgZ2V0TXVsdGlTZWxlY3RvclBhdGggPSAoZWxlbWVudHMsIG9wdGlvbnMgPSB7fSkgPT4ge1xuXG4gIGlmICghQXJyYXkuaXNBcnJheShlbGVtZW50cykpIHtcbiAgICBlbGVtZW50cyA9IGNvbnZlcnROb2RlTGlzdChlbGVtZW50cylcbiAgfVxuXG4gIGlmIChlbGVtZW50cy5zb21lKChlbGVtZW50KSA9PiBlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBpbnB1dCAtIG9ubHkgYW4gQXJyYXkgb2YgSFRNTEVsZW1lbnRzIG9yIHJlcHJlc2VudGF0aW9ucyBvZiB0aGVtIGlzIHN1cHBvcnRlZCEnKVxuICB9XG5cbiAgY29uc3Qgc2VsZWN0ID0gZ2V0U2VsZWN0KG9wdGlvbnMpXG4gIGNvbnN0IHRvU3RyaW5nID0gZ2V0VG9TdHJpbmcob3B0aW9ucylcblxuICBjb25zdCBhbmNlc3RvciA9IGdldENvbW1vbkFuY2VzdG9yKGVsZW1lbnRzLCBvcHRpb25zKVxuICBjb25zdCBhbmNlc3RvclBhdGggPSBtYXRjaChhbmNlc3Rvciwgb3B0aW9ucylcblxuICAvLyBUT0RPOiBjb25zaWRlciB1c2FnZSBvZiBtdWx0aXBsZSBzZWxlY3RvcnMgKyBwYXJlbnQtY2hpbGQgcmVsYXRpb24gKyBjaGVjayBmb3IgcGFydCByZWR1bmRhbmN5XG4gIGNvbnN0IGNvbW1vblBhdGggPSBnZXRDb21tb25QYXRoKGVsZW1lbnRzLCBvcHRpb25zKVxuICBjb25zdCBkZXNjZW5kYW50UGF0dGVybiA9IGNvbW1vblBhdGhbMF1cblxuICBjb25zdCBzZWxlY3RvclBhdGggPSBvcHRpbWl6ZShbLi4uYW5jZXN0b3JQYXRoLCBkZXNjZW5kYW50UGF0dGVybl0sIGVsZW1lbnRzLCBvcHRpb25zKVxuICBjb25zdCBzZWxlY3Rvck1hdGNoZXMgPSBjb252ZXJ0Tm9kZUxpc3Qoc2VsZWN0KHRvU3RyaW5nLnBhdGgoc2VsZWN0b3JQYXRoKSkpXG5cbiAgaWYgKCFlbGVtZW50cy5ldmVyeSgoZWxlbWVudCkgPT4gc2VsZWN0b3JNYXRjaGVzLnNvbWUoKGVudHJ5KSA9PiBlbnRyeSA9PT0gZWxlbWVudCkpKSB7XG4gICAgLy8gVE9ETzogY2x1c3RlciBtYXRjaGVzIHRvIHNwbGl0IGludG8gc2ltaWxhciBncm91cHMgZm9yIHN1YiBzZWxlY3Rpb25zXG4gICAgY29uc29sZS53YXJuKGBcbiAgICAgIFRoZSBzZWxlY3RlZCBlbGVtZW50cyBjYW4ndCBiZSBlZmZpY2llbnRseSBtYXBwZWQuXG4gICAgICBJdHMgcHJvYmFibHkgYmVzdCB0byB1c2UgbXVsdGlwbGUgc2luZ2xlIHNlbGVjdG9ycyBpbnN0ZWFkIVxuICAgIGApXG4gICAgcmV0dXJuIGVsZW1lbnRzXG4gIH1cblxuICByZXR1cm4gc2VsZWN0b3JQYXRoXG59XG5cbi8qKlxuICogR2V0IHNlbGVjdG9ycyB0byBkZXNjcmliZSBhIHNldCBvZiBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge0FycmF5LjxQYXR0ZXJuPn0gICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3QgZ2V0Q29tbW9uUGF0aCA9IChlbGVtZW50cywgb3B0aW9ucykgPT4ge1xuICBjb25zdCB7IGNsYXNzZXMsIGF0dHJpYnV0ZXMsIHRhZyB9ID0gZ2V0Q29tbW9uUHJvcGVydGllcyhlbGVtZW50cywgb3B0aW9ucylcblxuXG4gIHJldHVybiBbXG4gICAgY3JlYXRlUGF0dGVybih7XG4gICAgICB0YWcsXG4gICAgICBjbGFzc2VzOiBjbGFzc2VzIHx8IFtdLFxuICAgICAgYXR0cmlidXRlczogYXR0cmlidXRlcyA/IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLm1hcCgobmFtZSkgPT4gKHtcbiAgICAgICAgbmFtZTogZXNjYXBlVmFsdWUobmFtZSksXG4gICAgICAgIHZhbHVlOiBlc2NhcGVWYWx1ZShhdHRyaWJ1dGVzW25hbWVdKVxuICAgICAgfSkpIDogW11cbiAgICB9KVxuICBdXG59XG5cbi8qKlxuICogQ2hvb3NlIGFjdGlvbiBkZXBlbmRpbmcgb24gdGhlIGlucHV0IChtdWx0aXBsZS9zaW5nbGUpXG4gKlxuICogTk9URTogZXh0ZW5kZWQgZGV0ZWN0aW9uIGlzIHVzZWQgZm9yIHNwZWNpYWwgY2FzZXMgbGlrZSB0aGUgPHNlbGVjdD4gZWxlbWVudCB3aXRoIDxvcHRpb25zPlxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fE5vZGVMaXN0fEFycmF5LjxIVE1MRWxlbWVudD59IGlucHV0ICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtvcHRpb25zXSAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UXVlcnlTZWxlY3RvcihpbnB1dCwgb3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHBhdGggPSAoaW5wdXQubGVuZ3RoICYmICFpbnB1dC5uYW1lKVxuICAgID8gZ2V0TXVsdGlTZWxlY3RvclBhdGgoaW5wdXQsIG9wdGlvbnMpXG4gICAgOiBnZXRTaW5nbGVTZWxlY3RvclBhdGgoaW5wdXQsIG9wdGlvbnMpXG4gIGlmIChBcnJheS5pc0FycmF5KHBhdGgpKSB7XG4gICAgcmV0dXJuIHBhdGguZW50cmllcy5tYXAoZW50cnkgPT4gZW50cnkuZ2V0UXVlcnlTZWxlY3RvcihlbnRyeSwgb3B0aW9ucykpLmpvaW4oJywnKVxuICB9XG4gIHJldHVybiBnZXRUb1N0cmluZyhvcHRpb25zKS5wYXRoKHBhdGgpXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VsZWN0LmpzIiwiLyohXG4gKiBTaXp6bGUgQ1NTIFNlbGVjdG9yIEVuZ2luZSB2Mi4zLjZcbiAqIGh0dHBzOi8vc2l6emxlanMuY29tL1xuICpcbiAqIENvcHlyaWdodCBKUyBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnNcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cHM6Ly9qcy5mb3VuZGF0aW9uL1xuICpcbiAqIERhdGU6IDIwMjEtMDItMTZcbiAqL1xuKCBmdW5jdGlvbiggd2luZG93ICkge1xudmFyIGksXG5cdHN1cHBvcnQsXG5cdEV4cHIsXG5cdGdldFRleHQsXG5cdGlzWE1MLFxuXHR0b2tlbml6ZSxcblx0Y29tcGlsZSxcblx0c2VsZWN0LFxuXHRvdXRlcm1vc3RDb250ZXh0LFxuXHRzb3J0SW5wdXQsXG5cdGhhc0R1cGxpY2F0ZSxcblxuXHQvLyBMb2NhbCBkb2N1bWVudCB2YXJzXG5cdHNldERvY3VtZW50LFxuXHRkb2N1bWVudCxcblx0ZG9jRWxlbSxcblx0ZG9jdW1lbnRJc0hUTUwsXG5cdHJidWdneVFTQSxcblx0cmJ1Z2d5TWF0Y2hlcyxcblx0bWF0Y2hlcyxcblx0Y29udGFpbnMsXG5cblx0Ly8gSW5zdGFuY2Utc3BlY2lmaWMgZGF0YVxuXHRleHBhbmRvID0gXCJzaXp6bGVcIiArIDEgKiBuZXcgRGF0ZSgpLFxuXHRwcmVmZXJyZWREb2MgPSB3aW5kb3cuZG9jdW1lbnQsXG5cdGRpcnJ1bnMgPSAwLFxuXHRkb25lID0gMCxcblx0Y2xhc3NDYWNoZSA9IGNyZWF0ZUNhY2hlKCksXG5cdHRva2VuQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuXHRjb21waWxlckNhY2hlID0gY3JlYXRlQ2FjaGUoKSxcblx0bm9ubmF0aXZlU2VsZWN0b3JDYWNoZSA9IGNyZWF0ZUNhY2hlKCksXG5cdHNvcnRPcmRlciA9IGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdGlmICggYSA9PT0gYiApIHtcblx0XHRcdGhhc0R1cGxpY2F0ZSA9IHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiAwO1xuXHR9LFxuXG5cdC8vIEluc3RhbmNlIG1ldGhvZHNcblx0aGFzT3duID0gKCB7fSApLmhhc093blByb3BlcnR5LFxuXHRhcnIgPSBbXSxcblx0cG9wID0gYXJyLnBvcCxcblx0cHVzaE5hdGl2ZSA9IGFyci5wdXNoLFxuXHRwdXNoID0gYXJyLnB1c2gsXG5cdHNsaWNlID0gYXJyLnNsaWNlLFxuXG5cdC8vIFVzZSBhIHN0cmlwcGVkLWRvd24gaW5kZXhPZiBhcyBpdCdzIGZhc3RlciB0aGFuIG5hdGl2ZVxuXHQvLyBodHRwczovL2pzcGVyZi5jb20vdGhvci1pbmRleG9mLXZzLWZvci81XG5cdGluZGV4T2YgPSBmdW5jdGlvbiggbGlzdCwgZWxlbSApIHtcblx0XHR2YXIgaSA9IDAsXG5cdFx0XHRsZW4gPSBsaXN0Lmxlbmd0aDtcblx0XHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdGlmICggbGlzdFsgaSBdID09PSBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIC0xO1xuXHR9LFxuXG5cdGJvb2xlYW5zID0gXCJjaGVja2VkfHNlbGVjdGVkfGFzeW5jfGF1dG9mb2N1c3xhdXRvcGxheXxjb250cm9sc3xkZWZlcnxkaXNhYmxlZHxoaWRkZW58XCIgK1xuXHRcdFwiaXNtYXB8bG9vcHxtdWx0aXBsZXxvcGVufHJlYWRvbmx5fHJlcXVpcmVkfHNjb3BlZFwiLFxuXG5cdC8vIFJlZ3VsYXIgZXhwcmVzc2lvbnNcblxuXHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLXNlbGVjdG9ycy8jd2hpdGVzcGFjZVxuXHR3aGl0ZXNwYWNlID0gXCJbXFxcXHgyMFxcXFx0XFxcXHJcXFxcblxcXFxmXVwiLFxuXG5cdC8vIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9jc3Mtc3ludGF4LTMvI2lkZW50LXRva2VuLWRpYWdyYW1cblx0aWRlbnRpZmllciA9IFwiKD86XFxcXFxcXFxbXFxcXGRhLWZBLUZdezEsNn1cIiArIHdoaXRlc3BhY2UgK1xuXHRcdFwiP3xcXFxcXFxcXFteXFxcXHJcXFxcblxcXFxmXXxbXFxcXHctXXxbXlxcMC1cXFxceDdmXSkrXCIsXG5cblx0Ly8gQXR0cmlidXRlIHNlbGVjdG9yczogaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNhdHRyaWJ1dGUtc2VsZWN0b3JzXG5cdGF0dHJpYnV0ZXMgPSBcIlxcXFxbXCIgKyB3aGl0ZXNwYWNlICsgXCIqKFwiICsgaWRlbnRpZmllciArIFwiKSg/OlwiICsgd2hpdGVzcGFjZSArXG5cblx0XHQvLyBPcGVyYXRvciAoY2FwdHVyZSAyKVxuXHRcdFwiKihbKl4kfCF+XT89KVwiICsgd2hpdGVzcGFjZSArXG5cblx0XHQvLyBcIkF0dHJpYnV0ZSB2YWx1ZXMgbXVzdCBiZSBDU1MgaWRlbnRpZmllcnMgW2NhcHR1cmUgNV1cblx0XHQvLyBvciBzdHJpbmdzIFtjYXB0dXJlIDMgb3IgY2FwdHVyZSA0XVwiXG5cdFx0XCIqKD86JygoPzpcXFxcXFxcXC58W15cXFxcXFxcXCddKSopJ3xcXFwiKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcXFxcIl0pKilcXFwifChcIiArIGlkZW50aWZpZXIgKyBcIikpfClcIiArXG5cdFx0d2hpdGVzcGFjZSArIFwiKlxcXFxdXCIsXG5cblx0cHNldWRvcyA9IFwiOihcIiArIGlkZW50aWZpZXIgKyBcIikoPzpcXFxcKChcIiArXG5cblx0XHQvLyBUbyByZWR1Y2UgdGhlIG51bWJlciBvZiBzZWxlY3RvcnMgbmVlZGluZyB0b2tlbml6ZSBpbiB0aGUgcHJlRmlsdGVyLCBwcmVmZXIgYXJndW1lbnRzOlxuXHRcdC8vIDEuIHF1b3RlZCAoY2FwdHVyZSAzOyBjYXB0dXJlIDQgb3IgY2FwdHVyZSA1KVxuXHRcdFwiKCcoKD86XFxcXFxcXFwufFteXFxcXFxcXFwnXSkqKSd8XFxcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXFxcXCJdKSopXFxcIil8XCIgK1xuXG5cdFx0Ly8gMi4gc2ltcGxlIChjYXB0dXJlIDYpXG5cdFx0XCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFwoKVtcXFxcXV18XCIgKyBhdHRyaWJ1dGVzICsgXCIpKil8XCIgK1xuXG5cdFx0Ly8gMy4gYW55dGhpbmcgZWxzZSAoY2FwdHVyZSAyKVxuXHRcdFwiLipcIiArXG5cdFx0XCIpXFxcXCl8KVwiLFxuXG5cdC8vIExlYWRpbmcgYW5kIG5vbi1lc2NhcGVkIHRyYWlsaW5nIHdoaXRlc3BhY2UsIGNhcHR1cmluZyBzb21lIG5vbi13aGl0ZXNwYWNlIGNoYXJhY3RlcnMgcHJlY2VkaW5nIHRoZSBsYXR0ZXJcblx0cndoaXRlc3BhY2UgPSBuZXcgUmVnRXhwKCB3aGl0ZXNwYWNlICsgXCIrXCIsIFwiZ1wiICksXG5cdHJ0cmltID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIrfCgoPzpefFteXFxcXFxcXFxdKSg/OlxcXFxcXFxcLikqKVwiICtcblx0XHR3aGl0ZXNwYWNlICsgXCIrJFwiLCBcImdcIiApLFxuXG5cdHJjb21tYSA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKixcIiArIHdoaXRlc3BhY2UgKyBcIipcIiApLFxuXHRyY29tYmluYXRvcnMgPSBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIiooWz4rfl18XCIgKyB3aGl0ZXNwYWNlICsgXCIpXCIgKyB3aGl0ZXNwYWNlICtcblx0XHRcIipcIiApLFxuXHRyZGVzY2VuZCA9IG5ldyBSZWdFeHAoIHdoaXRlc3BhY2UgKyBcInw+XCIgKSxcblxuXHRycHNldWRvID0gbmV3IFJlZ0V4cCggcHNldWRvcyApLFxuXHRyaWRlbnRpZmllciA9IG5ldyBSZWdFeHAoIFwiXlwiICsgaWRlbnRpZmllciArIFwiJFwiICksXG5cblx0bWF0Y2hFeHByID0ge1xuXHRcdFwiSURcIjogbmV3IFJlZ0V4cCggXCJeIyhcIiArIGlkZW50aWZpZXIgKyBcIilcIiApLFxuXHRcdFwiQ0xBU1NcIjogbmV3IFJlZ0V4cCggXCJeXFxcXC4oXCIgKyBpZGVudGlmaWVyICsgXCIpXCIgKSxcblx0XHRcIlRBR1wiOiBuZXcgUmVnRXhwKCBcIl4oXCIgKyBpZGVudGlmaWVyICsgXCJ8WypdKVwiICksXG5cdFx0XCJBVFRSXCI6IG5ldyBSZWdFeHAoIFwiXlwiICsgYXR0cmlidXRlcyApLFxuXHRcdFwiUFNFVURPXCI6IG5ldyBSZWdFeHAoIFwiXlwiICsgcHNldWRvcyApLFxuXHRcdFwiQ0hJTERcIjogbmV3IFJlZ0V4cCggXCJeOihvbmx5fGZpcnN0fGxhc3R8bnRofG50aC1sYXN0KS0oY2hpbGR8b2YtdHlwZSkoPzpcXFxcKFwiICtcblx0XHRcdHdoaXRlc3BhY2UgKyBcIiooZXZlbnxvZGR8KChbKy1dfCkoXFxcXGQqKW58KVwiICsgd2hpdGVzcGFjZSArIFwiKig/OihbKy1dfClcIiArXG5cdFx0XHR3aGl0ZXNwYWNlICsgXCIqKFxcXFxkKyl8KSlcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcKXwpXCIsIFwiaVwiICksXG5cdFx0XCJib29sXCI6IG5ldyBSZWdFeHAoIFwiXig/OlwiICsgYm9vbGVhbnMgKyBcIikkXCIsIFwiaVwiICksXG5cblx0XHQvLyBGb3IgdXNlIGluIGxpYnJhcmllcyBpbXBsZW1lbnRpbmcgLmlzKClcblx0XHQvLyBXZSB1c2UgdGhpcyBmb3IgUE9TIG1hdGNoaW5nIGluIGBzZWxlY3RgXG5cdFx0XCJuZWVkc0NvbnRleHRcIjogbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICtcblx0XHRcdFwiKls+K35dfDooZXZlbnxvZGR8ZXF8Z3R8bHR8bnRofGZpcnN0fGxhc3QpKD86XFxcXChcIiArIHdoaXRlc3BhY2UgK1xuXHRcdFx0XCIqKCg/Oi1cXFxcZCk/XFxcXGQqKVwiICsgd2hpdGVzcGFjZSArIFwiKlxcXFwpfCkoPz1bXi1dfCQpXCIsIFwiaVwiIClcblx0fSxcblxuXHRyaHRtbCA9IC9IVE1MJC9pLFxuXHRyaW5wdXRzID0gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8YnV0dG9uKSQvaSxcblx0cmhlYWRlciA9IC9eaFxcZCQvaSxcblxuXHRybmF0aXZlID0gL15bXntdK1xce1xccypcXFtuYXRpdmUgXFx3LyxcblxuXHQvLyBFYXNpbHktcGFyc2VhYmxlL3JldHJpZXZhYmxlIElEIG9yIFRBRyBvciBDTEFTUyBzZWxlY3RvcnNcblx0cnF1aWNrRXhwciA9IC9eKD86IyhbXFx3LV0rKXwoXFx3Kyl8XFwuKFtcXHctXSspKSQvLFxuXG5cdHJzaWJsaW5nID0gL1srfl0vLFxuXG5cdC8vIENTUyBlc2NhcGVzXG5cdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL0NTUzIxL3N5bmRhdGEuaHRtbCNlc2NhcGVkLWNoYXJhY3RlcnNcblx0cnVuZXNjYXBlID0gbmV3IFJlZ0V4cCggXCJcXFxcXFxcXFtcXFxcZGEtZkEtRl17MSw2fVwiICsgd2hpdGVzcGFjZSArIFwiP3xcXFxcXFxcXChbXlxcXFxyXFxcXG5cXFxcZl0pXCIsIFwiZ1wiICksXG5cdGZ1bmVzY2FwZSA9IGZ1bmN0aW9uKCBlc2NhcGUsIG5vbkhleCApIHtcblx0XHR2YXIgaGlnaCA9IFwiMHhcIiArIGVzY2FwZS5zbGljZSggMSApIC0gMHgxMDAwMDtcblxuXHRcdHJldHVybiBub25IZXggP1xuXG5cdFx0XHQvLyBTdHJpcCB0aGUgYmFja3NsYXNoIHByZWZpeCBmcm9tIGEgbm9uLWhleCBlc2NhcGUgc2VxdWVuY2Vcblx0XHRcdG5vbkhleCA6XG5cblx0XHRcdC8vIFJlcGxhY2UgYSBoZXhhZGVjaW1hbCBlc2NhcGUgc2VxdWVuY2Ugd2l0aCB0aGUgZW5jb2RlZCBVbmljb2RlIGNvZGUgcG9pbnRcblx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9MTErXG5cdFx0XHQvLyBGb3IgdmFsdWVzIG91dHNpZGUgdGhlIEJhc2ljIE11bHRpbGluZ3VhbCBQbGFuZSAoQk1QKSwgbWFudWFsbHkgY29uc3RydWN0IGFcblx0XHRcdC8vIHN1cnJvZ2F0ZSBwYWlyXG5cdFx0XHRoaWdoIDwgMCA/XG5cdFx0XHRcdFN0cmluZy5mcm9tQ2hhckNvZGUoIGhpZ2ggKyAweDEwMDAwICkgOlxuXHRcdFx0XHRTdHJpbmcuZnJvbUNoYXJDb2RlKCBoaWdoID4+IDEwIHwgMHhEODAwLCBoaWdoICYgMHgzRkYgfCAweERDMDAgKTtcblx0fSxcblxuXHQvLyBDU1Mgc3RyaW5nL2lkZW50aWZpZXIgc2VyaWFsaXphdGlvblxuXHQvLyBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3Nzb20vI2NvbW1vbi1zZXJpYWxpemluZy1pZGlvbXNcblx0cmNzc2VzY2FwZSA9IC8oW1xcMC1cXHgxZlxceDdmXXxeLT9cXGQpfF4tJHxbXlxcMC1cXHgxZlxceDdmLVxcdUZGRkZcXHctXS9nLFxuXHRmY3NzZXNjYXBlID0gZnVuY3Rpb24oIGNoLCBhc0NvZGVQb2ludCApIHtcblx0XHRpZiAoIGFzQ29kZVBvaW50ICkge1xuXG5cdFx0XHQvLyBVKzAwMDAgTlVMTCBiZWNvbWVzIFUrRkZGRCBSRVBMQUNFTUVOVCBDSEFSQUNURVJcblx0XHRcdGlmICggY2ggPT09IFwiXFwwXCIgKSB7XG5cdFx0XHRcdHJldHVybiBcIlxcdUZGRkRcIjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ29udHJvbCBjaGFyYWN0ZXJzIGFuZCAoZGVwZW5kZW50IHVwb24gcG9zaXRpb24pIG51bWJlcnMgZ2V0IGVzY2FwZWQgYXMgY29kZSBwb2ludHNcblx0XHRcdHJldHVybiBjaC5zbGljZSggMCwgLTEgKSArIFwiXFxcXFwiICtcblx0XHRcdFx0Y2guY2hhckNvZGVBdCggY2gubGVuZ3RoIC0gMSApLnRvU3RyaW5nKCAxNiApICsgXCIgXCI7XG5cdFx0fVxuXG5cdFx0Ly8gT3RoZXIgcG90ZW50aWFsbHktc3BlY2lhbCBBU0NJSSBjaGFyYWN0ZXJzIGdldCBiYWNrc2xhc2gtZXNjYXBlZFxuXHRcdHJldHVybiBcIlxcXFxcIiArIGNoO1xuXHR9LFxuXG5cdC8vIFVzZWQgZm9yIGlmcmFtZXNcblx0Ly8gU2VlIHNldERvY3VtZW50KClcblx0Ly8gUmVtb3ZpbmcgdGhlIGZ1bmN0aW9uIHdyYXBwZXIgY2F1c2VzIGEgXCJQZXJtaXNzaW9uIERlbmllZFwiXG5cdC8vIGVycm9yIGluIElFXG5cdHVubG9hZEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcblx0XHRzZXREb2N1bWVudCgpO1xuXHR9LFxuXG5cdGluRGlzYWJsZWRGaWVsZHNldCA9IGFkZENvbWJpbmF0b3IoXG5cdFx0ZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5kaXNhYmxlZCA9PT0gdHJ1ZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiZmllbGRzZXRcIjtcblx0XHR9LFxuXHRcdHsgZGlyOiBcInBhcmVudE5vZGVcIiwgbmV4dDogXCJsZWdlbmRcIiB9XG5cdCk7XG5cbi8vIE9wdGltaXplIGZvciBwdXNoLmFwcGx5KCBfLCBOb2RlTGlzdCApXG50cnkge1xuXHRwdXNoLmFwcGx5KFxuXHRcdCggYXJyID0gc2xpY2UuY2FsbCggcHJlZmVycmVkRG9jLmNoaWxkTm9kZXMgKSApLFxuXHRcdHByZWZlcnJlZERvYy5jaGlsZE5vZGVzXG5cdCk7XG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZDw0LjBcblx0Ly8gRGV0ZWN0IHNpbGVudGx5IGZhaWxpbmcgcHVzaC5hcHBseVxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG5cdGFyclsgcHJlZmVycmVkRG9jLmNoaWxkTm9kZXMubGVuZ3RoIF0ubm9kZVR5cGU7XG59IGNhdGNoICggZSApIHtcblx0cHVzaCA9IHsgYXBwbHk6IGFyci5sZW5ndGggP1xuXG5cdFx0Ly8gTGV2ZXJhZ2Ugc2xpY2UgaWYgcG9zc2libGVcblx0XHRmdW5jdGlvbiggdGFyZ2V0LCBlbHMgKSB7XG5cdFx0XHRwdXNoTmF0aXZlLmFwcGx5KCB0YXJnZXQsIHNsaWNlLmNhbGwoIGVscyApICk7XG5cdFx0fSA6XG5cblx0XHQvLyBTdXBwb3J0OiBJRTw5XG5cdFx0Ly8gT3RoZXJ3aXNlIGFwcGVuZCBkaXJlY3RseVxuXHRcdGZ1bmN0aW9uKCB0YXJnZXQsIGVscyApIHtcblx0XHRcdHZhciBqID0gdGFyZ2V0Lmxlbmd0aCxcblx0XHRcdFx0aSA9IDA7XG5cblx0XHRcdC8vIENhbid0IHRydXN0IE5vZGVMaXN0Lmxlbmd0aFxuXHRcdFx0d2hpbGUgKCAoIHRhcmdldFsgaisrIF0gPSBlbHNbIGkrKyBdICkgKSB7fVxuXHRcdFx0dGFyZ2V0Lmxlbmd0aCA9IGogLSAxO1xuXHRcdH1cblx0fTtcbn1cblxuZnVuY3Rpb24gU2l6emxlKCBzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApIHtcblx0dmFyIG0sIGksIGVsZW0sIG5pZCwgbWF0Y2gsIGdyb3VwcywgbmV3U2VsZWN0b3IsXG5cdFx0bmV3Q29udGV4dCA9IGNvbnRleHQgJiYgY29udGV4dC5vd25lckRvY3VtZW50LFxuXG5cdFx0Ly8gbm9kZVR5cGUgZGVmYXVsdHMgdG8gOSwgc2luY2UgY29udGV4dCBkZWZhdWx0cyB0byBkb2N1bWVudFxuXHRcdG5vZGVUeXBlID0gY29udGV4dCA/IGNvbnRleHQubm9kZVR5cGUgOiA5O1xuXG5cdHJlc3VsdHMgPSByZXN1bHRzIHx8IFtdO1xuXG5cdC8vIFJldHVybiBlYXJseSBmcm9tIGNhbGxzIHdpdGggaW52YWxpZCBzZWxlY3RvciBvciBjb250ZXh0XG5cdGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiIHx8ICFzZWxlY3RvciB8fFxuXHRcdG5vZGVUeXBlICE9PSAxICYmIG5vZGVUeXBlICE9PSA5ICYmIG5vZGVUeXBlICE9PSAxMSApIHtcblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cblx0Ly8gVHJ5IHRvIHNob3J0Y3V0IGZpbmQgb3BlcmF0aW9ucyAoYXMgb3Bwb3NlZCB0byBmaWx0ZXJzKSBpbiBIVE1MIGRvY3VtZW50c1xuXHRpZiAoICFzZWVkICkge1xuXHRcdHNldERvY3VtZW50KCBjb250ZXh0ICk7XG5cdFx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XG5cblx0XHRpZiAoIGRvY3VtZW50SXNIVE1MICkge1xuXG5cdFx0XHQvLyBJZiB0aGUgc2VsZWN0b3IgaXMgc3VmZmljaWVudGx5IHNpbXBsZSwgdHJ5IHVzaW5nIGEgXCJnZXQqQnkqXCIgRE9NIG1ldGhvZFxuXHRcdFx0Ly8gKGV4Y2VwdGluZyBEb2N1bWVudEZyYWdtZW50IGNvbnRleHQsIHdoZXJlIHRoZSBtZXRob2RzIGRvbid0IGV4aXN0KVxuXHRcdFx0aWYgKCBub2RlVHlwZSAhPT0gMTEgJiYgKCBtYXRjaCA9IHJxdWlja0V4cHIuZXhlYyggc2VsZWN0b3IgKSApICkge1xuXG5cdFx0XHRcdC8vIElEIHNlbGVjdG9yXG5cdFx0XHRcdGlmICggKCBtID0gbWF0Y2hbIDEgXSApICkge1xuXG5cdFx0XHRcdFx0Ly8gRG9jdW1lbnQgY29udGV4dFxuXHRcdFx0XHRcdGlmICggbm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICggZWxlbSA9IGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIG0gKSApICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFLCBPcGVyYSwgV2Via2l0XG5cdFx0XHRcdFx0XHRcdC8vIFRPRE86IGlkZW50aWZ5IHZlcnNpb25zXG5cdFx0XHRcdFx0XHRcdC8vIGdldEVsZW1lbnRCeUlkIGNhbiBtYXRjaCBlbGVtZW50cyBieSBuYW1lIGluc3RlYWQgb2YgSURcblx0XHRcdFx0XHRcdFx0aWYgKCBlbGVtLmlkID09PSBtICkge1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdHMucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIEVsZW1lbnQgY29udGV4dFxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFLCBPcGVyYSwgV2Via2l0XG5cdFx0XHRcdFx0XHQvLyBUT0RPOiBpZGVudGlmeSB2ZXJzaW9uc1xuXHRcdFx0XHRcdFx0Ly8gZ2V0RWxlbWVudEJ5SWQgY2FuIG1hdGNoIGVsZW1lbnRzIGJ5IG5hbWUgaW5zdGVhZCBvZiBJRFxuXHRcdFx0XHRcdFx0aWYgKCBuZXdDb250ZXh0ICYmICggZWxlbSA9IG5ld0NvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIG0gKSApICYmXG5cdFx0XHRcdFx0XHRcdGNvbnRhaW5zKCBjb250ZXh0LCBlbGVtICkgJiZcblx0XHRcdFx0XHRcdFx0ZWxlbS5pZCA9PT0gbSApIHtcblxuXHRcdFx0XHRcdFx0XHRyZXN1bHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFR5cGUgc2VsZWN0b3Jcblx0XHRcdFx0fSBlbHNlIGlmICggbWF0Y2hbIDIgXSApIHtcblx0XHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCBzZWxlY3RvciApICk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cblx0XHRcdFx0Ly8gQ2xhc3Mgc2VsZWN0b3Jcblx0XHRcdFx0fSBlbHNlIGlmICggKCBtID0gbWF0Y2hbIDMgXSApICYmIHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSAmJlxuXHRcdFx0XHRcdGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSApIHtcblxuXHRcdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggbSApICk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gVGFrZSBhZHZhbnRhZ2Ugb2YgcXVlcnlTZWxlY3RvckFsbFxuXHRcdFx0aWYgKCBzdXBwb3J0LnFzYSAmJlxuXHRcdFx0XHQhbm9ubmF0aXZlU2VsZWN0b3JDYWNoZVsgc2VsZWN0b3IgKyBcIiBcIiBdICYmXG5cdFx0XHRcdCggIXJidWdneVFTQSB8fCAhcmJ1Z2d5UVNBLnRlc3QoIHNlbGVjdG9yICkgKSAmJlxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDggb25seVxuXHRcdFx0XHQvLyBFeGNsdWRlIG9iamVjdCBlbGVtZW50c1xuXHRcdFx0XHQoIG5vZGVUeXBlICE9PSAxIHx8IGNvbnRleHQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSAhPT0gXCJvYmplY3RcIiApICkge1xuXG5cdFx0XHRcdG5ld1NlbGVjdG9yID0gc2VsZWN0b3I7XG5cdFx0XHRcdG5ld0NvbnRleHQgPSBjb250ZXh0O1xuXG5cdFx0XHRcdC8vIHFTQSBjb25zaWRlcnMgZWxlbWVudHMgb3V0c2lkZSBhIHNjb3Bpbmcgcm9vdCB3aGVuIGV2YWx1YXRpbmcgY2hpbGQgb3Jcblx0XHRcdFx0Ly8gZGVzY2VuZGFudCBjb21iaW5hdG9ycywgd2hpY2ggaXMgbm90IHdoYXQgd2Ugd2FudC5cblx0XHRcdFx0Ly8gSW4gc3VjaCBjYXNlcywgd2Ugd29yayBhcm91bmQgdGhlIGJlaGF2aW9yIGJ5IHByZWZpeGluZyBldmVyeSBzZWxlY3RvciBpbiB0aGVcblx0XHRcdFx0Ly8gbGlzdCB3aXRoIGFuIElEIHNlbGVjdG9yIHJlZmVyZW5jaW5nIHRoZSBzY29wZSBjb250ZXh0LlxuXHRcdFx0XHQvLyBUaGUgdGVjaG5pcXVlIGhhcyB0byBiZSB1c2VkIGFzIHdlbGwgd2hlbiBhIGxlYWRpbmcgY29tYmluYXRvciBpcyB1c2VkXG5cdFx0XHRcdC8vIGFzIHN1Y2ggc2VsZWN0b3JzIGFyZSBub3QgcmVjb2duaXplZCBieSBxdWVyeVNlbGVjdG9yQWxsLlxuXHRcdFx0XHQvLyBUaGFua3MgdG8gQW5kcmV3IER1cG9udCBmb3IgdGhpcyB0ZWNobmlxdWUuXG5cdFx0XHRcdGlmICggbm9kZVR5cGUgPT09IDEgJiZcblx0XHRcdFx0XHQoIHJkZXNjZW5kLnRlc3QoIHNlbGVjdG9yICkgfHwgcmNvbWJpbmF0b3JzLnRlc3QoIHNlbGVjdG9yICkgKSApIHtcblxuXHRcdFx0XHRcdC8vIEV4cGFuZCBjb250ZXh0IGZvciBzaWJsaW5nIHNlbGVjdG9yc1xuXHRcdFx0XHRcdG5ld0NvbnRleHQgPSByc2libGluZy50ZXN0KCBzZWxlY3RvciApICYmIHRlc3RDb250ZXh0KCBjb250ZXh0LnBhcmVudE5vZGUgKSB8fFxuXHRcdFx0XHRcdFx0Y29udGV4dDtcblxuXHRcdFx0XHRcdC8vIFdlIGNhbiB1c2UgOnNjb3BlIGluc3RlYWQgb2YgdGhlIElEIGhhY2sgaWYgdGhlIGJyb3dzZXJcblx0XHRcdFx0XHQvLyBzdXBwb3J0cyBpdCAmIGlmIHdlJ3JlIG5vdCBjaGFuZ2luZyB0aGUgY29udGV4dC5cblx0XHRcdFx0XHRpZiAoIG5ld0NvbnRleHQgIT09IGNvbnRleHQgfHwgIXN1cHBvcnQuc2NvcGUgKSB7XG5cblx0XHRcdFx0XHRcdC8vIENhcHR1cmUgdGhlIGNvbnRleHQgSUQsIHNldHRpbmcgaXQgZmlyc3QgaWYgbmVjZXNzYXJ5XG5cdFx0XHRcdFx0XHRpZiAoICggbmlkID0gY29udGV4dC5nZXRBdHRyaWJ1dGUoIFwiaWRcIiApICkgKSB7XG5cdFx0XHRcdFx0XHRcdG5pZCA9IG5pZC5yZXBsYWNlKCByY3NzZXNjYXBlLCBmY3NzZXNjYXBlICk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRjb250ZXh0LnNldEF0dHJpYnV0ZSggXCJpZFwiLCAoIG5pZCA9IGV4cGFuZG8gKSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFByZWZpeCBldmVyeSBzZWxlY3RvciBpbiB0aGUgbGlzdFxuXHRcdFx0XHRcdGdyb3VwcyA9IHRva2VuaXplKCBzZWxlY3RvciApO1xuXHRcdFx0XHRcdGkgPSBncm91cHMubGVuZ3RoO1xuXHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdFx0Z3JvdXBzWyBpIF0gPSAoIG5pZCA/IFwiI1wiICsgbmlkIDogXCI6c2NvcGVcIiApICsgXCIgXCIgK1xuXHRcdFx0XHRcdFx0XHR0b1NlbGVjdG9yKCBncm91cHNbIGkgXSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRuZXdTZWxlY3RvciA9IGdyb3Vwcy5qb2luKCBcIixcIiApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLFxuXHRcdFx0XHRcdFx0bmV3Q29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKCBuZXdTZWxlY3RvciApXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0fSBjYXRjaCAoIHFzYUVycm9yICkge1xuXHRcdFx0XHRcdG5vbm5hdGl2ZVNlbGVjdG9yQ2FjaGUoIHNlbGVjdG9yLCB0cnVlICk7XG5cdFx0XHRcdH0gZmluYWxseSB7XG5cdFx0XHRcdFx0aWYgKCBuaWQgPT09IGV4cGFuZG8gKSB7XG5cdFx0XHRcdFx0XHRjb250ZXh0LnJlbW92ZUF0dHJpYnV0ZSggXCJpZFwiICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gQWxsIG90aGVyc1xuXHRyZXR1cm4gc2VsZWN0KCBzZWxlY3Rvci5yZXBsYWNlKCBydHJpbSwgXCIkMVwiICksIGNvbnRleHQsIHJlc3VsdHMsIHNlZWQgKTtcbn1cblxuLyoqXG4gKiBDcmVhdGUga2V5LXZhbHVlIGNhY2hlcyBvZiBsaW1pdGVkIHNpemVcbiAqIEByZXR1cm5zIHtmdW5jdGlvbihzdHJpbmcsIG9iamVjdCl9IFJldHVybnMgdGhlIE9iamVjdCBkYXRhIGFmdGVyIHN0b3JpbmcgaXQgb24gaXRzZWxmIHdpdGhcbiAqXHRwcm9wZXJ0eSBuYW1lIHRoZSAoc3BhY2Utc3VmZml4ZWQpIHN0cmluZyBhbmQgKGlmIHRoZSBjYWNoZSBpcyBsYXJnZXIgdGhhbiBFeHByLmNhY2hlTGVuZ3RoKVxuICpcdGRlbGV0aW5nIHRoZSBvbGRlc3QgZW50cnlcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2FjaGUoKSB7XG5cdHZhciBrZXlzID0gW107XG5cblx0ZnVuY3Rpb24gY2FjaGUoIGtleSwgdmFsdWUgKSB7XG5cblx0XHQvLyBVc2UgKGtleSArIFwiIFwiKSB0byBhdm9pZCBjb2xsaXNpb24gd2l0aCBuYXRpdmUgcHJvdG90eXBlIHByb3BlcnRpZXMgKHNlZSBJc3N1ZSAjMTU3KVxuXHRcdGlmICgga2V5cy5wdXNoKCBrZXkgKyBcIiBcIiApID4gRXhwci5jYWNoZUxlbmd0aCApIHtcblxuXHRcdFx0Ly8gT25seSBrZWVwIHRoZSBtb3N0IHJlY2VudCBlbnRyaWVzXG5cdFx0XHRkZWxldGUgY2FjaGVbIGtleXMuc2hpZnQoKSBdO1xuXHRcdH1cblx0XHRyZXR1cm4gKCBjYWNoZVsga2V5ICsgXCIgXCIgXSA9IHZhbHVlICk7XG5cdH1cblx0cmV0dXJuIGNhY2hlO1xufVxuXG4vKipcbiAqIE1hcmsgYSBmdW5jdGlvbiBmb3Igc3BlY2lhbCB1c2UgYnkgU2l6emxlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gbWFya1xuICovXG5mdW5jdGlvbiBtYXJrRnVuY3Rpb24oIGZuICkge1xuXHRmblsgZXhwYW5kbyBdID0gdHJ1ZTtcblx0cmV0dXJuIGZuO1xufVxuXG4vKipcbiAqIFN1cHBvcnQgdGVzdGluZyB1c2luZyBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBQYXNzZWQgdGhlIGNyZWF0ZWQgZWxlbWVudCBhbmQgcmV0dXJucyBhIGJvb2xlYW4gcmVzdWx0XG4gKi9cbmZ1bmN0aW9uIGFzc2VydCggZm4gKSB7XG5cdHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZmllbGRzZXRcIiApO1xuXG5cdHRyeSB7XG5cdFx0cmV0dXJuICEhZm4oIGVsICk7XG5cdH0gY2F0Y2ggKCBlICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fSBmaW5hbGx5IHtcblxuXHRcdC8vIFJlbW92ZSBmcm9tIGl0cyBwYXJlbnQgYnkgZGVmYXVsdFxuXHRcdGlmICggZWwucGFyZW50Tm9kZSApIHtcblx0XHRcdGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIGVsICk7XG5cdFx0fVxuXG5cdFx0Ly8gcmVsZWFzZSBtZW1vcnkgaW4gSUVcblx0XHRlbCA9IG51bGw7XG5cdH1cbn1cblxuLyoqXG4gKiBBZGRzIHRoZSBzYW1lIGhhbmRsZXIgZm9yIGFsbCBvZiB0aGUgc3BlY2lmaWVkIGF0dHJzXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0cnMgUGlwZS1zZXBhcmF0ZWQgbGlzdCBvZiBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyIFRoZSBtZXRob2QgdGhhdCB3aWxsIGJlIGFwcGxpZWRcbiAqL1xuZnVuY3Rpb24gYWRkSGFuZGxlKCBhdHRycywgaGFuZGxlciApIHtcblx0dmFyIGFyciA9IGF0dHJzLnNwbGl0KCBcInxcIiApLFxuXHRcdGkgPSBhcnIubGVuZ3RoO1xuXG5cdHdoaWxlICggaS0tICkge1xuXHRcdEV4cHIuYXR0ckhhbmRsZVsgYXJyWyBpIF0gXSA9IGhhbmRsZXI7XG5cdH1cbn1cblxuLyoqXG4gKiBDaGVja3MgZG9jdW1lbnQgb3JkZXIgb2YgdHdvIHNpYmxpbmdzXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGFcbiAqIEBwYXJhbSB7RWxlbWVudH0gYlxuICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyBsZXNzIHRoYW4gMCBpZiBhIHByZWNlZGVzIGIsIGdyZWF0ZXIgdGhhbiAwIGlmIGEgZm9sbG93cyBiXG4gKi9cbmZ1bmN0aW9uIHNpYmxpbmdDaGVjayggYSwgYiApIHtcblx0dmFyIGN1ciA9IGIgJiYgYSxcblx0XHRkaWZmID0gY3VyICYmIGEubm9kZVR5cGUgPT09IDEgJiYgYi5ub2RlVHlwZSA9PT0gMSAmJlxuXHRcdFx0YS5zb3VyY2VJbmRleCAtIGIuc291cmNlSW5kZXg7XG5cblx0Ly8gVXNlIElFIHNvdXJjZUluZGV4IGlmIGF2YWlsYWJsZSBvbiBib3RoIG5vZGVzXG5cdGlmICggZGlmZiApIHtcblx0XHRyZXR1cm4gZGlmZjtcblx0fVxuXG5cdC8vIENoZWNrIGlmIGIgZm9sbG93cyBhXG5cdGlmICggY3VyICkge1xuXHRcdHdoaWxlICggKCBjdXIgPSBjdXIubmV4dFNpYmxpbmcgKSApIHtcblx0XHRcdGlmICggY3VyID09PSBiICkge1xuXHRcdFx0XHRyZXR1cm4gLTE7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGEgPyAxIDogLTE7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIHVzZSBpbiBwc2V1ZG9zIGZvciBpbnB1dCB0eXBlc1xuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5wdXRQc2V1ZG8oIHR5cGUgKSB7XG5cdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHR2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRyZXR1cm4gbmFtZSA9PT0gXCJpbnB1dFwiICYmIGVsZW0udHlwZSA9PT0gdHlwZTtcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIGJ1dHRvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJ1dHRvblBzZXVkbyggdHlwZSApIHtcblx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdHJldHVybiAoIG5hbWUgPT09IFwiaW5wdXRcIiB8fCBuYW1lID09PSBcImJ1dHRvblwiICkgJiYgZWxlbS50eXBlID09PSB0eXBlO1xuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgOmVuYWJsZWQvOmRpc2FibGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGRpc2FibGVkIHRydWUgZm9yIDpkaXNhYmxlZDsgZmFsc2UgZm9yIDplbmFibGVkXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZURpc2FibGVkUHNldWRvKCBkaXNhYmxlZCApIHtcblxuXHQvLyBLbm93biA6ZGlzYWJsZWQgZmFsc2UgcG9zaXRpdmVzOiBmaWVsZHNldFtkaXNhYmxlZF0gPiBsZWdlbmQ6bnRoLW9mLXR5cGUobisyKSA6Y2FuLWRpc2FibGVcblx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0Ly8gT25seSBjZXJ0YWluIGVsZW1lbnRzIGNhbiBtYXRjaCA6ZW5hYmxlZCBvciA6ZGlzYWJsZWRcblx0XHQvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zY3JpcHRpbmcuaHRtbCNzZWxlY3Rvci1lbmFibGVkXG5cdFx0Ly8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc2NyaXB0aW5nLmh0bWwjc2VsZWN0b3ItZGlzYWJsZWRcblx0XHRpZiAoIFwiZm9ybVwiIGluIGVsZW0gKSB7XG5cblx0XHRcdC8vIENoZWNrIGZvciBpbmhlcml0ZWQgZGlzYWJsZWRuZXNzIG9uIHJlbGV2YW50IG5vbi1kaXNhYmxlZCBlbGVtZW50czpcblx0XHRcdC8vICogbGlzdGVkIGZvcm0tYXNzb2NpYXRlZCBlbGVtZW50cyBpbiBhIGRpc2FibGVkIGZpZWxkc2V0XG5cdFx0XHQvLyAgIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2Zvcm1zLmh0bWwjY2F0ZWdvcnktbGlzdGVkXG5cdFx0XHQvLyAgIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2Zvcm1zLmh0bWwjY29uY2VwdC1mZS1kaXNhYmxlZFxuXHRcdFx0Ly8gKiBvcHRpb24gZWxlbWVudHMgaW4gYSBkaXNhYmxlZCBvcHRncm91cFxuXHRcdFx0Ly8gICBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9mb3Jtcy5odG1sI2NvbmNlcHQtb3B0aW9uLWRpc2FibGVkXG5cdFx0XHQvLyBBbGwgc3VjaCBlbGVtZW50cyBoYXZlIGEgXCJmb3JtXCIgcHJvcGVydHkuXG5cdFx0XHRpZiAoIGVsZW0ucGFyZW50Tm9kZSAmJiBlbGVtLmRpc2FibGVkID09PSBmYWxzZSApIHtcblxuXHRcdFx0XHQvLyBPcHRpb24gZWxlbWVudHMgZGVmZXIgdG8gYSBwYXJlbnQgb3B0Z3JvdXAgaWYgcHJlc2VudFxuXHRcdFx0XHRpZiAoIFwibGFiZWxcIiBpbiBlbGVtICkge1xuXHRcdFx0XHRcdGlmICggXCJsYWJlbFwiIGluIGVsZW0ucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtLnBhcmVudE5vZGUuZGlzYWJsZWQgPT09IGRpc2FibGVkO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbS5kaXNhYmxlZCA9PT0gZGlzYWJsZWQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgNiAtIDExXG5cdFx0XHRcdC8vIFVzZSB0aGUgaXNEaXNhYmxlZCBzaG9ydGN1dCBwcm9wZXJ0eSB0byBjaGVjayBmb3IgZGlzYWJsZWQgZmllbGRzZXQgYW5jZXN0b3JzXG5cdFx0XHRcdHJldHVybiBlbGVtLmlzRGlzYWJsZWQgPT09IGRpc2FibGVkIHx8XG5cblx0XHRcdFx0XHQvLyBXaGVyZSB0aGVyZSBpcyBubyBpc0Rpc2FibGVkLCBjaGVjayBtYW51YWxseVxuXHRcdFx0XHRcdC8qIGpzaGludCAtVzAxOCAqL1xuXHRcdFx0XHRcdGVsZW0uaXNEaXNhYmxlZCAhPT0gIWRpc2FibGVkICYmXG5cdFx0XHRcdFx0aW5EaXNhYmxlZEZpZWxkc2V0KCBlbGVtICkgPT09IGRpc2FibGVkO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZWxlbS5kaXNhYmxlZCA9PT0gZGlzYWJsZWQ7XG5cblx0XHQvLyBUcnkgdG8gd2lubm93IG91dCBlbGVtZW50cyB0aGF0IGNhbid0IGJlIGRpc2FibGVkIGJlZm9yZSB0cnVzdGluZyB0aGUgZGlzYWJsZWQgcHJvcGVydHkuXG5cdFx0Ly8gU29tZSB2aWN0aW1zIGdldCBjYXVnaHQgaW4gb3VyIG5ldCAobGFiZWwsIGxlZ2VuZCwgbWVudSwgdHJhY2spLCBidXQgaXQgc2hvdWxkbid0XG5cdFx0Ly8gZXZlbiBleGlzdCBvbiB0aGVtLCBsZXQgYWxvbmUgaGF2ZSBhIGJvb2xlYW4gdmFsdWUuXG5cdFx0fSBlbHNlIGlmICggXCJsYWJlbFwiIGluIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5kaXNhYmxlZCA9PT0gZGlzYWJsZWQ7XG5cdFx0fVxuXG5cdFx0Ly8gUmVtYWluaW5nIGVsZW1lbnRzIGFyZSBuZWl0aGVyIDplbmFibGVkIG5vciA6ZGlzYWJsZWRcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIHVzZSBpbiBwc2V1ZG9zIGZvciBwb3NpdGlvbmFsc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlUG9zaXRpb25hbFBzZXVkbyggZm4gKSB7XG5cdHJldHVybiBtYXJrRnVuY3Rpb24oIGZ1bmN0aW9uKCBhcmd1bWVudCApIHtcblx0XHRhcmd1bWVudCA9ICthcmd1bWVudDtcblx0XHRyZXR1cm4gbWFya0Z1bmN0aW9uKCBmdW5jdGlvbiggc2VlZCwgbWF0Y2hlcyApIHtcblx0XHRcdHZhciBqLFxuXHRcdFx0XHRtYXRjaEluZGV4ZXMgPSBmbiggW10sIHNlZWQubGVuZ3RoLCBhcmd1bWVudCApLFxuXHRcdFx0XHRpID0gbWF0Y2hJbmRleGVzLmxlbmd0aDtcblxuXHRcdFx0Ly8gTWF0Y2ggZWxlbWVudHMgZm91bmQgYXQgdGhlIHNwZWNpZmllZCBpbmRleGVzXG5cdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0aWYgKCBzZWVkWyAoIGogPSBtYXRjaEluZGV4ZXNbIGkgXSApIF0gKSB7XG5cdFx0XHRcdFx0c2VlZFsgaiBdID0gISggbWF0Y2hlc1sgaiBdID0gc2VlZFsgaiBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9ICk7XG5cdH0gKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgYSBub2RlIGZvciB2YWxpZGl0eSBhcyBhIFNpenpsZSBjb250ZXh0XG4gKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0PX0gY29udGV4dFxuICogQHJldHVybnMge0VsZW1lbnR8T2JqZWN0fEJvb2xlYW59IFRoZSBpbnB1dCBub2RlIGlmIGFjY2VwdGFibGUsIG90aGVyd2lzZSBhIGZhbHN5IHZhbHVlXG4gKi9cbmZ1bmN0aW9uIHRlc3RDb250ZXh0KCBjb250ZXh0ICkge1xuXHRyZXR1cm4gY29udGV4dCAmJiB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb250ZXh0O1xufVxuXG4vLyBFeHBvc2Ugc3VwcG9ydCB2YXJzIGZvciBjb252ZW5pZW5jZVxuc3VwcG9ydCA9IFNpenpsZS5zdXBwb3J0ID0ge307XG5cbi8qKlxuICogRGV0ZWN0cyBYTUwgbm9kZXNcbiAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3R9IGVsZW0gQW4gZWxlbWVudCBvciBhIGRvY3VtZW50XG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZmYgZWxlbSBpcyBhIG5vbi1IVE1MIFhNTCBub2RlXG4gKi9cbmlzWE1MID0gU2l6emxlLmlzWE1MID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdHZhciBuYW1lc3BhY2UgPSBlbGVtICYmIGVsZW0ubmFtZXNwYWNlVVJJLFxuXHRcdGRvY0VsZW0gPSBlbGVtICYmICggZWxlbS5vd25lckRvY3VtZW50IHx8IGVsZW0gKS5kb2N1bWVudEVsZW1lbnQ7XG5cblx0Ly8gU3VwcG9ydDogSUUgPD04XG5cdC8vIEFzc3VtZSBIVE1MIHdoZW4gZG9jdW1lbnRFbGVtZW50IGRvZXNuJ3QgeWV0IGV4aXN0LCBzdWNoIGFzIGluc2lkZSBsb2FkaW5nIGlmcmFtZXNcblx0Ly8gaHR0cHM6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzQ4MzNcblx0cmV0dXJuICFyaHRtbC50ZXN0KCBuYW1lc3BhY2UgfHwgZG9jRWxlbSAmJiBkb2NFbGVtLm5vZGVOYW1lIHx8IFwiSFRNTFwiICk7XG59O1xuXG4vKipcbiAqIFNldHMgZG9jdW1lbnQtcmVsYXRlZCB2YXJpYWJsZXMgb25jZSBiYXNlZCBvbiB0aGUgY3VycmVudCBkb2N1bWVudFxuICogQHBhcmFtIHtFbGVtZW50fE9iamVjdH0gW2RvY10gQW4gZWxlbWVudCBvciBkb2N1bWVudCBvYmplY3QgdG8gdXNlIHRvIHNldCB0aGUgZG9jdW1lbnRcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGN1cnJlbnQgZG9jdW1lbnRcbiAqL1xuc2V0RG9jdW1lbnQgPSBTaXp6bGUuc2V0RG9jdW1lbnQgPSBmdW5jdGlvbiggbm9kZSApIHtcblx0dmFyIGhhc0NvbXBhcmUsIHN1YldpbmRvdyxcblx0XHRkb2MgPSBub2RlID8gbm9kZS5vd25lckRvY3VtZW50IHx8IG5vZGUgOiBwcmVmZXJyZWREb2M7XG5cblx0Ly8gUmV0dXJuIGVhcmx5IGlmIGRvYyBpcyBpbnZhbGlkIG9yIGFscmVhZHkgc2VsZWN0ZWRcblx0Ly8gU3VwcG9ydDogSUUgMTErLCBFZGdlIDE3IC0gMTgrXG5cdC8vIElFL0VkZ2Ugc29tZXRpbWVzIHRocm93IGEgXCJQZXJtaXNzaW9uIGRlbmllZFwiIGVycm9yIHdoZW4gc3RyaWN0LWNvbXBhcmluZ1xuXHQvLyB0d28gZG9jdW1lbnRzOyBzaGFsbG93IGNvbXBhcmlzb25zIHdvcmsuXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcblx0aWYgKCBkb2MgPT0gZG9jdW1lbnQgfHwgZG9jLm5vZGVUeXBlICE9PSA5IHx8ICFkb2MuZG9jdW1lbnRFbGVtZW50ICkge1xuXHRcdHJldHVybiBkb2N1bWVudDtcblx0fVxuXG5cdC8vIFVwZGF0ZSBnbG9iYWwgdmFyaWFibGVzXG5cdGRvY3VtZW50ID0gZG9jO1xuXHRkb2NFbGVtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXHRkb2N1bWVudElzSFRNTCA9ICFpc1hNTCggZG9jdW1lbnQgKTtcblxuXHQvLyBTdXBwb3J0OiBJRSA5IC0gMTErLCBFZGdlIDEyIC0gMTgrXG5cdC8vIEFjY2Vzc2luZyBpZnJhbWUgZG9jdW1lbnRzIGFmdGVyIHVubG9hZCB0aHJvd3MgXCJwZXJtaXNzaW9uIGRlbmllZFwiIGVycm9ycyAoalF1ZXJ5ICMxMzkzNilcblx0Ly8gU3VwcG9ydDogSUUgMTErLCBFZGdlIDE3IC0gMTgrXG5cdC8vIElFL0VkZ2Ugc29tZXRpbWVzIHRocm93IGEgXCJQZXJtaXNzaW9uIGRlbmllZFwiIGVycm9yIHdoZW4gc3RyaWN0LWNvbXBhcmluZ1xuXHQvLyB0d28gZG9jdW1lbnRzOyBzaGFsbG93IGNvbXBhcmlzb25zIHdvcmsuXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcblx0aWYgKCBwcmVmZXJyZWREb2MgIT0gZG9jdW1lbnQgJiZcblx0XHQoIHN1YldpbmRvdyA9IGRvY3VtZW50LmRlZmF1bHRWaWV3ICkgJiYgc3ViV2luZG93LnRvcCAhPT0gc3ViV2luZG93ICkge1xuXG5cdFx0Ly8gU3VwcG9ydDogSUUgMTEsIEVkZ2Vcblx0XHRpZiAoIHN1YldpbmRvdy5hZGRFdmVudExpc3RlbmVyICkge1xuXHRcdFx0c3ViV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoIFwidW5sb2FkXCIsIHVubG9hZEhhbmRsZXIsIGZhbHNlICk7XG5cblx0XHQvLyBTdXBwb3J0OiBJRSA5IC0gMTAgb25seVxuXHRcdH0gZWxzZSBpZiAoIHN1YldpbmRvdy5hdHRhY2hFdmVudCApIHtcblx0XHRcdHN1YldpbmRvdy5hdHRhY2hFdmVudCggXCJvbnVubG9hZFwiLCB1bmxvYWRIYW5kbGVyICk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gU3VwcG9ydDogSUUgOCAtIDExKywgRWRnZSAxMiAtIDE4KywgQ2hyb21lIDw9MTYgLSAyNSBvbmx5LCBGaXJlZm94IDw9My42IC0gMzEgb25seSxcblx0Ly8gU2FmYXJpIDQgLSA1IG9ubHksIE9wZXJhIDw9MTEuNiAtIDEyLnggb25seVxuXHQvLyBJRS9FZGdlICYgb2xkZXIgYnJvd3NlcnMgZG9uJ3Qgc3VwcG9ydCB0aGUgOnNjb3BlIHBzZXVkby1jbGFzcy5cblx0Ly8gU3VwcG9ydDogU2FmYXJpIDYuMCBvbmx5XG5cdC8vIFNhZmFyaSA2LjAgc3VwcG9ydHMgOnNjb3BlIGJ1dCBpdCdzIGFuIGFsaWFzIG9mIDpyb290IHRoZXJlLlxuXHRzdXBwb3J0LnNjb3BlID0gYXNzZXJ0KCBmdW5jdGlvbiggZWwgKSB7XG5cdFx0ZG9jRWxlbS5hcHBlbmRDaGlsZCggZWwgKS5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApICk7XG5cdFx0cmV0dXJuIHR5cGVvZiBlbC5xdWVyeVNlbGVjdG9yQWxsICE9PSBcInVuZGVmaW5lZFwiICYmXG5cdFx0XHQhZWwucXVlcnlTZWxlY3RvckFsbCggXCI6c2NvcGUgZmllbGRzZXQgZGl2XCIgKS5sZW5ndGg7XG5cdH0gKTtcblxuXHQvKiBBdHRyaWJ1dGVzXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXHQvLyBTdXBwb3J0OiBJRTw4XG5cdC8vIFZlcmlmeSB0aGF0IGdldEF0dHJpYnV0ZSByZWFsbHkgcmV0dXJucyBhdHRyaWJ1dGVzIGFuZCBub3QgcHJvcGVydGllc1xuXHQvLyAoZXhjZXB0aW5nIElFOCBib29sZWFucylcblx0c3VwcG9ydC5hdHRyaWJ1dGVzID0gYXNzZXJ0KCBmdW5jdGlvbiggZWwgKSB7XG5cdFx0ZWwuY2xhc3NOYW1lID0gXCJpXCI7XG5cdFx0cmV0dXJuICFlbC5nZXRBdHRyaWJ1dGUoIFwiY2xhc3NOYW1lXCIgKTtcblx0fSApO1xuXG5cdC8qIGdldEVsZW1lbnQocylCeSpcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8vIENoZWNrIGlmIGdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKSByZXR1cm5zIG9ubHkgZWxlbWVudHNcblx0c3VwcG9ydC5nZXRFbGVtZW50c0J5VGFnTmFtZSA9IGFzc2VydCggZnVuY3Rpb24oIGVsICkge1xuXHRcdGVsLmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVDb21tZW50KCBcIlwiICkgKTtcblx0XHRyZXR1cm4gIWVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcIipcIiApLmxlbmd0aDtcblx0fSApO1xuXG5cdC8vIFN1cHBvcnQ6IElFPDlcblx0c3VwcG9ydC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lID0gcm5hdGl2ZS50ZXN0KCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICk7XG5cblx0Ly8gU3VwcG9ydDogSUU8MTBcblx0Ly8gQ2hlY2sgaWYgZ2V0RWxlbWVudEJ5SWQgcmV0dXJucyBlbGVtZW50cyBieSBuYW1lXG5cdC8vIFRoZSBicm9rZW4gZ2V0RWxlbWVudEJ5SWQgbWV0aG9kcyBkb24ndCBwaWNrIHVwIHByb2dyYW1tYXRpY2FsbHktc2V0IG5hbWVzLFxuXHQvLyBzbyB1c2UgYSByb3VuZGFib3V0IGdldEVsZW1lbnRzQnlOYW1lIHRlc3Rcblx0c3VwcG9ydC5nZXRCeUlkID0gYXNzZXJ0KCBmdW5jdGlvbiggZWwgKSB7XG5cdFx0ZG9jRWxlbS5hcHBlbmRDaGlsZCggZWwgKS5pZCA9IGV4cGFuZG87XG5cdFx0cmV0dXJuICFkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSB8fCAhZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoIGV4cGFuZG8gKS5sZW5ndGg7XG5cdH0gKTtcblxuXHQvLyBJRCBmaWx0ZXIgYW5kIGZpbmRcblx0aWYgKCBzdXBwb3J0LmdldEJ5SWQgKSB7XG5cdFx0RXhwci5maWx0ZXJbIFwiSURcIiBdID0gZnVuY3Rpb24oIGlkICkge1xuXHRcdFx0dmFyIGF0dHJJZCA9IGlkLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSggXCJpZFwiICkgPT09IGF0dHJJZDtcblx0XHRcdH07XG5cdFx0fTtcblx0XHRFeHByLmZpbmRbIFwiSURcIiBdID0gZnVuY3Rpb24oIGlkLCBjb250ZXh0ICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50QnlJZCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudElzSFRNTCApIHtcblx0XHRcdFx0dmFyIGVsZW0gPSBjb250ZXh0LmdldEVsZW1lbnRCeUlkKCBpZCApO1xuXHRcdFx0XHRyZXR1cm4gZWxlbSA/IFsgZWxlbSBdIDogW107XG5cdFx0XHR9XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRFeHByLmZpbHRlclsgXCJJRFwiIF0gPSAgZnVuY3Rpb24oIGlkICkge1xuXHRcdFx0dmFyIGF0dHJJZCA9IGlkLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciBub2RlID0gdHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlTm9kZSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuXHRcdFx0XHRcdGVsZW0uZ2V0QXR0cmlidXRlTm9kZSggXCJpZFwiICk7XG5cdFx0XHRcdHJldHVybiBub2RlICYmIG5vZGUudmFsdWUgPT09IGF0dHJJZDtcblx0XHRcdH07XG5cdFx0fTtcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDYgLSA3IG9ubHlcblx0XHQvLyBnZXRFbGVtZW50QnlJZCBpcyBub3QgcmVsaWFibGUgYXMgYSBmaW5kIHNob3J0Y3V0XG5cdFx0RXhwci5maW5kWyBcIklEXCIgXSA9IGZ1bmN0aW9uKCBpZCwgY29udGV4dCApIHtcblx0XHRcdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnRJc0hUTUwgKSB7XG5cdFx0XHRcdHZhciBub2RlLCBpLCBlbGVtcyxcblx0XHRcdFx0XHRlbGVtID0gY29udGV4dC5nZXRFbGVtZW50QnlJZCggaWQgKTtcblxuXHRcdFx0XHRpZiAoIGVsZW0gKSB7XG5cblx0XHRcdFx0XHQvLyBWZXJpZnkgdGhlIGlkIGF0dHJpYnV0ZVxuXHRcdFx0XHRcdG5vZGUgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIFwiaWRcIiApO1xuXHRcdFx0XHRcdGlmICggbm9kZSAmJiBub2RlLnZhbHVlID09PSBpZCApIHtcblx0XHRcdFx0XHRcdHJldHVybiBbIGVsZW0gXTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBGYWxsIGJhY2sgb24gZ2V0RWxlbWVudHNCeU5hbWVcblx0XHRcdFx0XHRlbGVtcyA9IGNvbnRleHQuZ2V0RWxlbWVudHNCeU5hbWUoIGlkICk7XG5cdFx0XHRcdFx0aSA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKCAoIGVsZW0gPSBlbGVtc1sgaSsrIF0gKSApIHtcblx0XHRcdFx0XHRcdG5vZGUgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIFwiaWRcIiApO1xuXHRcdFx0XHRcdFx0aWYgKCBub2RlICYmIG5vZGUudmFsdWUgPT09IGlkICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gWyBlbGVtIF07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cblxuXHQvLyBUYWdcblx0RXhwci5maW5kWyBcIlRBR1wiIF0gPSBzdXBwb3J0LmdldEVsZW1lbnRzQnlUYWdOYW1lID9cblx0XHRmdW5jdGlvbiggdGFnLCBjb250ZXh0ICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHRhZyApO1xuXG5cdFx0XHQvLyBEb2N1bWVudEZyYWdtZW50IG5vZGVzIGRvbid0IGhhdmUgZ0VCVE5cblx0XHRcdH0gZWxzZSBpZiAoIHN1cHBvcnQucXNhICkge1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKCB0YWcgKTtcblx0XHRcdH1cblx0XHR9IDpcblxuXHRcdGZ1bmN0aW9uKCB0YWcsIGNvbnRleHQgKSB7XG5cdFx0XHR2YXIgZWxlbSxcblx0XHRcdFx0dG1wID0gW10sXG5cdFx0XHRcdGkgPSAwLFxuXG5cdFx0XHRcdC8vIEJ5IGhhcHB5IGNvaW5jaWRlbmNlLCBhIChicm9rZW4pIGdFQlROIGFwcGVhcnMgb24gRG9jdW1lbnRGcmFnbWVudCBub2RlcyB0b29cblx0XHRcdFx0cmVzdWx0cyA9IGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHRhZyApO1xuXG5cdFx0XHQvLyBGaWx0ZXIgb3V0IHBvc3NpYmxlIGNvbW1lbnRzXG5cdFx0XHRpZiAoIHRhZyA9PT0gXCIqXCIgKSB7XG5cdFx0XHRcdHdoaWxlICggKCBlbGVtID0gcmVzdWx0c1sgaSsrIF0gKSApIHtcblx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRcdFx0XHR0bXAucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0bXA7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHR9O1xuXG5cdC8vIENsYXNzXG5cdEV4cHIuZmluZFsgXCJDTEFTU1wiIF0gPSBzdXBwb3J0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgJiYgZnVuY3Rpb24oIGNsYXNzTmFtZSwgY29udGV4dCApIHtcblx0XHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnRJc0hUTUwgKSB7XG5cdFx0XHRyZXR1cm4gY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBjbGFzc05hbWUgKTtcblx0XHR9XG5cdH07XG5cblx0LyogUVNBL21hdGNoZXNTZWxlY3RvclxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gUVNBIGFuZCBtYXRjaGVzU2VsZWN0b3Igc3VwcG9ydFxuXG5cdC8vIG1hdGNoZXNTZWxlY3Rvcig6YWN0aXZlKSByZXBvcnRzIGZhbHNlIHdoZW4gdHJ1ZSAoSUU5L09wZXJhIDExLjUpXG5cdHJidWdneU1hdGNoZXMgPSBbXTtcblxuXHQvLyBxU2EoOmZvY3VzKSByZXBvcnRzIGZhbHNlIHdoZW4gdHJ1ZSAoQ2hyb21lIDIxKVxuXHQvLyBXZSBhbGxvdyB0aGlzIGJlY2F1c2Ugb2YgYSBidWcgaW4gSUU4LzkgdGhhdCB0aHJvd3MgYW4gZXJyb3Jcblx0Ly8gd2hlbmV2ZXIgYGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRgIGlzIGFjY2Vzc2VkIG9uIGFuIGlmcmFtZVxuXHQvLyBTbywgd2UgYWxsb3cgOmZvY3VzIHRvIHBhc3MgdGhyb3VnaCBRU0EgYWxsIHRoZSB0aW1lIHRvIGF2b2lkIHRoZSBJRSBlcnJvclxuXHQvLyBTZWUgaHR0cHM6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzEzMzc4XG5cdHJidWdneVFTQSA9IFtdO1xuXG5cdGlmICggKCBzdXBwb3J0LnFzYSA9IHJuYXRpdmUudGVzdCggZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCApICkgKSB7XG5cblx0XHQvLyBCdWlsZCBRU0EgcmVnZXhcblx0XHQvLyBSZWdleCBzdHJhdGVneSBhZG9wdGVkIGZyb20gRGllZ28gUGVyaW5pXG5cdFx0YXNzZXJ0KCBmdW5jdGlvbiggZWwgKSB7XG5cblx0XHRcdHZhciBpbnB1dDtcblxuXHRcdFx0Ly8gU2VsZWN0IGlzIHNldCB0byBlbXB0eSBzdHJpbmcgb24gcHVycG9zZVxuXHRcdFx0Ly8gVGhpcyBpcyB0byB0ZXN0IElFJ3MgdHJlYXRtZW50IG9mIG5vdCBleHBsaWNpdGx5XG5cdFx0XHQvLyBzZXR0aW5nIGEgYm9vbGVhbiBjb250ZW50IGF0dHJpYnV0ZSxcblx0XHRcdC8vIHNpbmNlIGl0cyBwcmVzZW5jZSBzaG91bGQgYmUgZW5vdWdoXG5cdFx0XHQvLyBodHRwczovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTIzNTlcblx0XHRcdGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGVsICkuaW5uZXJIVE1MID0gXCI8YSBpZD0nXCIgKyBleHBhbmRvICsgXCInPjwvYT5cIiArXG5cdFx0XHRcdFwiPHNlbGVjdCBpZD0nXCIgKyBleHBhbmRvICsgXCItXFxyXFxcXCcgbXNhbGxvd2NhcHR1cmU9Jyc+XCIgK1xuXHRcdFx0XHRcIjxvcHRpb24gc2VsZWN0ZWQ9Jyc+PC9vcHRpb24+PC9zZWxlY3Q+XCI7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFOCwgT3BlcmEgMTEtMTIuMTZcblx0XHRcdC8vIE5vdGhpbmcgc2hvdWxkIGJlIHNlbGVjdGVkIHdoZW4gZW1wdHkgc3RyaW5ncyBmb2xsb3cgXj0gb3IgJD0gb3IgKj1cblx0XHRcdC8vIFRoZSB0ZXN0IGF0dHJpYnV0ZSBtdXN0IGJlIHVua25vd24gaW4gT3BlcmEgYnV0IFwic2FmZVwiIGZvciBXaW5SVFxuXHRcdFx0Ly8gaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9oaDQ2NTM4OC5hc3B4I2F0dHJpYnV0ZV9zZWN0aW9uXG5cdFx0XHRpZiAoIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiW21zYWxsb3djYXB0dXJlXj0nJ11cIiApLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiWypeJF09XCIgKyB3aGl0ZXNwYWNlICsgXCIqKD86Jyd8XFxcIlxcXCIpXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU4XG5cdFx0XHQvLyBCb29sZWFuIGF0dHJpYnV0ZXMgYW5kIFwidmFsdWVcIiBhcmUgbm90IHRyZWF0ZWQgY29ycmVjdGx5XG5cdFx0XHRpZiAoICFlbC5xdWVyeVNlbGVjdG9yQWxsKCBcIltzZWxlY3RlZF1cIiApLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiXFxcXFtcIiArIHdoaXRlc3BhY2UgKyBcIiooPzp2YWx1ZXxcIiArIGJvb2xlYW5zICsgXCIpXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lPDI5LCBBbmRyb2lkPDQuNCwgU2FmYXJpPDcuMCssIGlPUzw3LjArLCBQaGFudG9tSlM8MS45LjgrXG5cdFx0XHRpZiAoICFlbC5xdWVyeVNlbGVjdG9yQWxsKCBcIltpZH49XCIgKyBleHBhbmRvICsgXCItXVwiICkubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCJ+PVwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFIDExKywgRWRnZSAxNSAtIDE4K1xuXHRcdFx0Ly8gSUUgMTEvRWRnZSBkb24ndCBmaW5kIGVsZW1lbnRzIG9uIGEgYFtuYW1lPScnXWAgcXVlcnkgaW4gc29tZSBjYXNlcy5cblx0XHRcdC8vIEFkZGluZyBhIHRlbXBvcmFyeSBhdHRyaWJ1dGUgdG8gdGhlIGRvY3VtZW50IGJlZm9yZSB0aGUgc2VsZWN0aW9uIHdvcmtzXG5cdFx0XHQvLyBhcm91bmQgdGhlIGlzc3VlLlxuXHRcdFx0Ly8gSW50ZXJlc3RpbmdseSwgSUUgMTAgJiBvbGRlciBkb24ndCBzZWVtIHRvIGhhdmUgdGhlIGlzc3VlLlxuXHRcdFx0aW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImlucHV0XCIgKTtcblx0XHRcdGlucHV0LnNldEF0dHJpYnV0ZSggXCJuYW1lXCIsIFwiXCIgKTtcblx0XHRcdGVsLmFwcGVuZENoaWxkKCBpbnB1dCApO1xuXHRcdFx0aWYgKCAhZWwucXVlcnlTZWxlY3RvckFsbCggXCJbbmFtZT0nJ11cIiApLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiXFxcXFtcIiArIHdoaXRlc3BhY2UgKyBcIipuYW1lXCIgKyB3aGl0ZXNwYWNlICsgXCIqPVwiICtcblx0XHRcdFx0XHR3aGl0ZXNwYWNlICsgXCIqKD86Jyd8XFxcIlxcXCIpXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gV2Via2l0L09wZXJhIC0gOmNoZWNrZWQgc2hvdWxkIHJldHVybiBzZWxlY3RlZCBvcHRpb24gZWxlbWVudHNcblx0XHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTEvUkVDLWNzczMtc2VsZWN0b3JzLTIwMTEwOTI5LyNjaGVja2VkXG5cdFx0XHQvLyBJRTggdGhyb3dzIGVycm9yIGhlcmUgYW5kIHdpbGwgbm90IHNlZSBsYXRlciB0ZXN0c1xuXHRcdFx0aWYgKCAhZWwucXVlcnlTZWxlY3RvckFsbCggXCI6Y2hlY2tlZFwiICkubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCI6Y2hlY2tlZFwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IFNhZmFyaSA4KywgaU9TIDgrXG5cdFx0XHQvLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM2ODUxXG5cdFx0XHQvLyBJbi1wYWdlIGBzZWxlY3RvciNpZCBzaWJsaW5nLWNvbWJpbmF0b3Igc2VsZWN0b3JgIGZhaWxzXG5cdFx0XHRpZiAoICFlbC5xdWVyeVNlbGVjdG9yQWxsKCBcImEjXCIgKyBleHBhbmRvICsgXCIrKlwiICkubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCIuIy4rWyt+XVwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3ggPD0zLjYgLSA1IG9ubHlcblx0XHRcdC8vIE9sZCBGaXJlZm94IGRvZXNuJ3QgdGhyb3cgb24gYSBiYWRseS1lc2NhcGVkIGlkZW50aWZpZXIuXG5cdFx0XHRlbC5xdWVyeVNlbGVjdG9yQWxsKCBcIlxcXFxcXGZcIiApO1xuXHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiW1xcXFxyXFxcXG5cXFxcZl1cIiApO1xuXHRcdH0gKTtcblxuXHRcdGFzc2VydCggZnVuY3Rpb24oIGVsICkge1xuXHRcdFx0ZWwuaW5uZXJIVE1MID0gXCI8YSBocmVmPScnIGRpc2FibGVkPSdkaXNhYmxlZCc+PC9hPlwiICtcblx0XHRcdFx0XCI8c2VsZWN0IGRpc2FibGVkPSdkaXNhYmxlZCc+PG9wdGlvbi8+PC9zZWxlY3Q+XCI7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IFdpbmRvd3MgOCBOYXRpdmUgQXBwc1xuXHRcdFx0Ly8gVGhlIHR5cGUgYW5kIG5hbWUgYXR0cmlidXRlcyBhcmUgcmVzdHJpY3RlZCBkdXJpbmcgLmlubmVySFRNTCBhc3NpZ25tZW50XG5cdFx0XHR2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImlucHV0XCIgKTtcblx0XHRcdGlucHV0LnNldEF0dHJpYnV0ZSggXCJ0eXBlXCIsIFwiaGlkZGVuXCIgKTtcblx0XHRcdGVsLmFwcGVuZENoaWxkKCBpbnB1dCApLnNldEF0dHJpYnV0ZSggXCJuYW1lXCIsIFwiRFwiICk7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFOFxuXHRcdFx0Ly8gRW5mb3JjZSBjYXNlLXNlbnNpdGl2aXR5IG9mIG5hbWUgYXR0cmlidXRlXG5cdFx0XHRpZiAoIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiW25hbWU9ZF1cIiApLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwibmFtZVwiICsgd2hpdGVzcGFjZSArIFwiKlsqXiR8IX5dPz1cIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBGRiAzLjUgLSA6ZW5hYmxlZC86ZGlzYWJsZWQgYW5kIGhpZGRlbiBlbGVtZW50cyAoaGlkZGVuIGVsZW1lbnRzIGFyZSBzdGlsbCBlbmFibGVkKVxuXHRcdFx0Ly8gSUU4IHRocm93cyBlcnJvciBoZXJlIGFuZCB3aWxsIG5vdCBzZWUgbGF0ZXIgdGVzdHNcblx0XHRcdGlmICggZWwucXVlcnlTZWxlY3RvckFsbCggXCI6ZW5hYmxlZFwiICkubGVuZ3RoICE9PSAyICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCI6ZW5hYmxlZFwiLCBcIjpkaXNhYmxlZFwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFOS0xMStcblx0XHRcdC8vIElFJ3MgOmRpc2FibGVkIHNlbGVjdG9yIGRvZXMgbm90IHBpY2sgdXAgdGhlIGNoaWxkcmVuIG9mIGRpc2FibGVkIGZpZWxkc2V0c1xuXHRcdFx0ZG9jRWxlbS5hcHBlbmRDaGlsZCggZWwgKS5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRpZiAoIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiOmRpc2FibGVkXCIgKS5sZW5ndGggIT09IDIgKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIjplbmFibGVkXCIsIFwiOmRpc2FibGVkXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogT3BlcmEgMTAgLSAxMSBvbmx5XG5cdFx0XHQvLyBPcGVyYSAxMC0xMSBkb2VzIG5vdCB0aHJvdyBvbiBwb3N0LWNvbW1hIGludmFsaWQgcHNldWRvc1xuXHRcdFx0ZWwucXVlcnlTZWxlY3RvckFsbCggXCIqLDp4XCIgKTtcblx0XHRcdHJidWdneVFTQS5wdXNoKCBcIiwuKjpcIiApO1xuXHRcdH0gKTtcblx0fVxuXG5cdGlmICggKCBzdXBwb3J0Lm1hdGNoZXNTZWxlY3RvciA9IHJuYXRpdmUudGVzdCggKCBtYXRjaGVzID0gZG9jRWxlbS5tYXRjaGVzIHx8XG5cdFx0ZG9jRWxlbS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRkb2NFbGVtLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGRvY0VsZW0ub01hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGRvY0VsZW0ubXNNYXRjaGVzU2VsZWN0b3IgKSApICkgKSB7XG5cblx0XHRhc3NlcnQoIGZ1bmN0aW9uKCBlbCApIHtcblxuXHRcdFx0Ly8gQ2hlY2sgdG8gc2VlIGlmIGl0J3MgcG9zc2libGUgdG8gZG8gbWF0Y2hlc1NlbGVjdG9yXG5cdFx0XHQvLyBvbiBhIGRpc2Nvbm5lY3RlZCBub2RlIChJRSA5KVxuXHRcdFx0c3VwcG9ydC5kaXNjb25uZWN0ZWRNYXRjaCA9IG1hdGNoZXMuY2FsbCggZWwsIFwiKlwiICk7XG5cblx0XHRcdC8vIFRoaXMgc2hvdWxkIGZhaWwgd2l0aCBhbiBleGNlcHRpb25cblx0XHRcdC8vIEdlY2tvIGRvZXMgbm90IGVycm9yLCByZXR1cm5zIGZhbHNlIGluc3RlYWRcblx0XHRcdG1hdGNoZXMuY2FsbCggZWwsIFwiW3MhPScnXTp4XCIgKTtcblx0XHRcdHJidWdneU1hdGNoZXMucHVzaCggXCIhPVwiLCBwc2V1ZG9zICk7XG5cdFx0fSApO1xuXHR9XG5cblx0cmJ1Z2d5UVNBID0gcmJ1Z2d5UVNBLmxlbmd0aCAmJiBuZXcgUmVnRXhwKCByYnVnZ3lRU0Euam9pbiggXCJ8XCIgKSApO1xuXHRyYnVnZ3lNYXRjaGVzID0gcmJ1Z2d5TWF0Y2hlcy5sZW5ndGggJiYgbmV3IFJlZ0V4cCggcmJ1Z2d5TWF0Y2hlcy5qb2luKCBcInxcIiApICk7XG5cblx0LyogQ29udGFpbnNcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXHRoYXNDb21wYXJlID0gcm5hdGl2ZS50ZXN0KCBkb2NFbGVtLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uICk7XG5cblx0Ly8gRWxlbWVudCBjb250YWlucyBhbm90aGVyXG5cdC8vIFB1cnBvc2VmdWxseSBzZWxmLWV4Y2x1c2l2ZVxuXHQvLyBBcyBpbiwgYW4gZWxlbWVudCBkb2VzIG5vdCBjb250YWluIGl0c2VsZlxuXHRjb250YWlucyA9IGhhc0NvbXBhcmUgfHwgcm5hdGl2ZS50ZXN0KCBkb2NFbGVtLmNvbnRhaW5zICkgP1xuXHRcdGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdFx0dmFyIGFkb3duID0gYS5ub2RlVHlwZSA9PT0gOSA/IGEuZG9jdW1lbnRFbGVtZW50IDogYSxcblx0XHRcdFx0YnVwID0gYiAmJiBiLnBhcmVudE5vZGU7XG5cdFx0XHRyZXR1cm4gYSA9PT0gYnVwIHx8ICEhKCBidXAgJiYgYnVwLm5vZGVUeXBlID09PSAxICYmIChcblx0XHRcdFx0YWRvd24uY29udGFpbnMgP1xuXHRcdFx0XHRcdGFkb3duLmNvbnRhaW5zKCBidXAgKSA6XG5cdFx0XHRcdFx0YS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiAmJiBhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBidXAgKSAmIDE2XG5cdFx0XHQpICk7XG5cdFx0fSA6XG5cdFx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0XHRpZiAoIGIgKSB7XG5cdFx0XHRcdHdoaWxlICggKCBiID0gYi5wYXJlbnROb2RlICkgKSB7XG5cdFx0XHRcdFx0aWYgKCBiID09PSBhICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcblxuXHQvKiBTb3J0aW5nXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXHQvLyBEb2N1bWVudCBvcmRlciBzb3J0aW5nXG5cdHNvcnRPcmRlciA9IGhhc0NvbXBhcmUgP1xuXHRmdW5jdGlvbiggYSwgYiApIHtcblxuXHRcdC8vIEZsYWcgZm9yIGR1cGxpY2F0ZSByZW1vdmFsXG5cdFx0aWYgKCBhID09PSBiICkge1xuXHRcdFx0aGFzRHVwbGljYXRlID0gdHJ1ZTtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblxuXHRcdC8vIFNvcnQgb24gbWV0aG9kIGV4aXN0ZW5jZSBpZiBvbmx5IG9uZSBpbnB1dCBoYXMgY29tcGFyZURvY3VtZW50UG9zaXRpb25cblx0XHR2YXIgY29tcGFyZSA9ICFhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uIC0gIWIuY29tcGFyZURvY3VtZW50UG9zaXRpb247XG5cdFx0aWYgKCBjb21wYXJlICkge1xuXHRcdFx0cmV0dXJuIGNvbXBhcmU7XG5cdFx0fVxuXG5cdFx0Ly8gQ2FsY3VsYXRlIHBvc2l0aW9uIGlmIGJvdGggaW5wdXRzIGJlbG9uZyB0byB0aGUgc2FtZSBkb2N1bWVudFxuXHRcdC8vIFN1cHBvcnQ6IElFIDExKywgRWRnZSAxNyAtIDE4K1xuXHRcdC8vIElFL0VkZ2Ugc29tZXRpbWVzIHRocm93IGEgXCJQZXJtaXNzaW9uIGRlbmllZFwiIGVycm9yIHdoZW4gc3RyaWN0LWNvbXBhcmluZ1xuXHRcdC8vIHR3byBkb2N1bWVudHM7IHNoYWxsb3cgY29tcGFyaXNvbnMgd29yay5cblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG5cdFx0Y29tcGFyZSA9ICggYS5vd25lckRvY3VtZW50IHx8IGEgKSA9PSAoIGIub3duZXJEb2N1bWVudCB8fCBiICkgP1xuXHRcdFx0YS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYiApIDpcblxuXHRcdFx0Ly8gT3RoZXJ3aXNlIHdlIGtub3cgdGhleSBhcmUgZGlzY29ubmVjdGVkXG5cdFx0XHQxO1xuXG5cdFx0Ly8gRGlzY29ubmVjdGVkIG5vZGVzXG5cdFx0aWYgKCBjb21wYXJlICYgMSB8fFxuXHRcdFx0KCAhc3VwcG9ydC5zb3J0RGV0YWNoZWQgJiYgYi5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYSApID09PSBjb21wYXJlICkgKSB7XG5cblx0XHRcdC8vIENob29zZSB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IGlzIHJlbGF0ZWQgdG8gb3VyIHByZWZlcnJlZCBkb2N1bWVudFxuXHRcdFx0Ly8gU3VwcG9ydDogSUUgMTErLCBFZGdlIDE3IC0gMTgrXG5cdFx0XHQvLyBJRS9FZGdlIHNvbWV0aW1lcyB0aHJvdyBhIFwiUGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvciB3aGVuIHN0cmljdC1jb21wYXJpbmdcblx0XHRcdC8vIHR3byBkb2N1bWVudHM7IHNoYWxsb3cgY29tcGFyaXNvbnMgd29yay5cblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcblx0XHRcdGlmICggYSA9PSBkb2N1bWVudCB8fCBhLm93bmVyRG9jdW1lbnQgPT0gcHJlZmVycmVkRG9jICYmXG5cdFx0XHRcdGNvbnRhaW5zKCBwcmVmZXJyZWREb2MsIGEgKSApIHtcblx0XHRcdFx0cmV0dXJuIC0xO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTcgLSAxOCtcblx0XHRcdC8vIElFL0VkZ2Ugc29tZXRpbWVzIHRocm93IGEgXCJQZXJtaXNzaW9uIGRlbmllZFwiIGVycm9yIHdoZW4gc3RyaWN0LWNvbXBhcmluZ1xuXHRcdFx0Ly8gdHdvIGRvY3VtZW50czsgc2hhbGxvdyBjb21wYXJpc29ucyB3b3JrLlxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXHRcdFx0aWYgKCBiID09IGRvY3VtZW50IHx8IGIub3duZXJEb2N1bWVudCA9PSBwcmVmZXJyZWREb2MgJiZcblx0XHRcdFx0Y29udGFpbnMoIHByZWZlcnJlZERvYywgYiApICkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTWFpbnRhaW4gb3JpZ2luYWwgb3JkZXJcblx0XHRcdHJldHVybiBzb3J0SW5wdXQgP1xuXHRcdFx0XHQoIGluZGV4T2YoIHNvcnRJbnB1dCwgYSApIC0gaW5kZXhPZiggc29ydElucHV0LCBiICkgKSA6XG5cdFx0XHRcdDA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNvbXBhcmUgJiA0ID8gLTEgOiAxO1xuXHR9IDpcblx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cblx0XHQvLyBFeGl0IGVhcmx5IGlmIHRoZSBub2RlcyBhcmUgaWRlbnRpY2FsXG5cdFx0aWYgKCBhID09PSBiICkge1xuXHRcdFx0aGFzRHVwbGljYXRlID0gdHJ1ZTtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblxuXHRcdHZhciBjdXIsXG5cdFx0XHRpID0gMCxcblx0XHRcdGF1cCA9IGEucGFyZW50Tm9kZSxcblx0XHRcdGJ1cCA9IGIucGFyZW50Tm9kZSxcblx0XHRcdGFwID0gWyBhIF0sXG5cdFx0XHRicCA9IFsgYiBdO1xuXG5cdFx0Ly8gUGFyZW50bGVzcyBub2RlcyBhcmUgZWl0aGVyIGRvY3VtZW50cyBvciBkaXNjb25uZWN0ZWRcblx0XHRpZiAoICFhdXAgfHwgIWJ1cCApIHtcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUUgMTErLCBFZGdlIDE3IC0gMTgrXG5cdFx0XHQvLyBJRS9FZGdlIHNvbWV0aW1lcyB0aHJvdyBhIFwiUGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvciB3aGVuIHN0cmljdC1jb21wYXJpbmdcblx0XHRcdC8vIHR3byBkb2N1bWVudHM7IHNoYWxsb3cgY29tcGFyaXNvbnMgd29yay5cblx0XHRcdC8qIGVzbGludC1kaXNhYmxlIGVxZXFlcSAqL1xuXHRcdFx0cmV0dXJuIGEgPT0gZG9jdW1lbnQgPyAtMSA6XG5cdFx0XHRcdGIgPT0gZG9jdW1lbnQgPyAxIDpcblx0XHRcdFx0LyogZXNsaW50LWVuYWJsZSBlcWVxZXEgKi9cblx0XHRcdFx0YXVwID8gLTEgOlxuXHRcdFx0XHRidXAgPyAxIDpcblx0XHRcdFx0c29ydElucHV0ID9cblx0XHRcdFx0KCBpbmRleE9mKCBzb3J0SW5wdXQsIGEgKSAtIGluZGV4T2YoIHNvcnRJbnB1dCwgYiApICkgOlxuXHRcdFx0XHQwO1xuXG5cdFx0Ly8gSWYgdGhlIG5vZGVzIGFyZSBzaWJsaW5ncywgd2UgY2FuIGRvIGEgcXVpY2sgY2hlY2tcblx0XHR9IGVsc2UgaWYgKCBhdXAgPT09IGJ1cCApIHtcblx0XHRcdHJldHVybiBzaWJsaW5nQ2hlY2soIGEsIGIgKTtcblx0XHR9XG5cblx0XHQvLyBPdGhlcndpc2Ugd2UgbmVlZCBmdWxsIGxpc3RzIG9mIHRoZWlyIGFuY2VzdG9ycyBmb3IgY29tcGFyaXNvblxuXHRcdGN1ciA9IGE7XG5cdFx0d2hpbGUgKCAoIGN1ciA9IGN1ci5wYXJlbnROb2RlICkgKSB7XG5cdFx0XHRhcC51bnNoaWZ0KCBjdXIgKTtcblx0XHR9XG5cdFx0Y3VyID0gYjtcblx0XHR3aGlsZSAoICggY3VyID0gY3VyLnBhcmVudE5vZGUgKSApIHtcblx0XHRcdGJwLnVuc2hpZnQoIGN1ciApO1xuXHRcdH1cblxuXHRcdC8vIFdhbGsgZG93biB0aGUgdHJlZSBsb29raW5nIGZvciBhIGRpc2NyZXBhbmN5XG5cdFx0d2hpbGUgKCBhcFsgaSBdID09PSBicFsgaSBdICkge1xuXHRcdFx0aSsrO1xuXHRcdH1cblxuXHRcdHJldHVybiBpID9cblxuXHRcdFx0Ly8gRG8gYSBzaWJsaW5nIGNoZWNrIGlmIHRoZSBub2RlcyBoYXZlIGEgY29tbW9uIGFuY2VzdG9yXG5cdFx0XHRzaWJsaW5nQ2hlY2soIGFwWyBpIF0sIGJwWyBpIF0gKSA6XG5cblx0XHRcdC8vIE90aGVyd2lzZSBub2RlcyBpbiBvdXIgZG9jdW1lbnQgc29ydCBmaXJzdFxuXHRcdFx0Ly8gU3VwcG9ydDogSUUgMTErLCBFZGdlIDE3IC0gMTgrXG5cdFx0XHQvLyBJRS9FZGdlIHNvbWV0aW1lcyB0aHJvdyBhIFwiUGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvciB3aGVuIHN0cmljdC1jb21wYXJpbmdcblx0XHRcdC8vIHR3byBkb2N1bWVudHM7IHNoYWxsb3cgY29tcGFyaXNvbnMgd29yay5cblx0XHRcdC8qIGVzbGludC1kaXNhYmxlIGVxZXFlcSAqL1xuXHRcdFx0YXBbIGkgXSA9PSBwcmVmZXJyZWREb2MgPyAtMSA6XG5cdFx0XHRicFsgaSBdID09IHByZWZlcnJlZERvYyA/IDEgOlxuXHRcdFx0LyogZXNsaW50LWVuYWJsZSBlcWVxZXEgKi9cblx0XHRcdDA7XG5cdH07XG5cblx0cmV0dXJuIGRvY3VtZW50O1xufTtcblxuU2l6emxlLm1hdGNoZXMgPSBmdW5jdGlvbiggZXhwciwgZWxlbWVudHMgKSB7XG5cdHJldHVybiBTaXp6bGUoIGV4cHIsIG51bGwsIG51bGwsIGVsZW1lbnRzICk7XG59O1xuXG5TaXp6bGUubWF0Y2hlc1NlbGVjdG9yID0gZnVuY3Rpb24oIGVsZW0sIGV4cHIgKSB7XG5cdHNldERvY3VtZW50KCBlbGVtICk7XG5cblx0aWYgKCBzdXBwb3J0Lm1hdGNoZXNTZWxlY3RvciAmJiBkb2N1bWVudElzSFRNTCAmJlxuXHRcdCFub25uYXRpdmVTZWxlY3RvckNhY2hlWyBleHByICsgXCIgXCIgXSAmJlxuXHRcdCggIXJidWdneU1hdGNoZXMgfHwgIXJidWdneU1hdGNoZXMudGVzdCggZXhwciApICkgJiZcblx0XHQoICFyYnVnZ3lRU0EgICAgIHx8ICFyYnVnZ3lRU0EudGVzdCggZXhwciApICkgKSB7XG5cblx0XHR0cnkge1xuXHRcdFx0dmFyIHJldCA9IG1hdGNoZXMuY2FsbCggZWxlbSwgZXhwciApO1xuXG5cdFx0XHQvLyBJRSA5J3MgbWF0Y2hlc1NlbGVjdG9yIHJldHVybnMgZmFsc2Ugb24gZGlzY29ubmVjdGVkIG5vZGVzXG5cdFx0XHRpZiAoIHJldCB8fCBzdXBwb3J0LmRpc2Nvbm5lY3RlZE1hdGNoIHx8XG5cblx0XHRcdFx0Ly8gQXMgd2VsbCwgZGlzY29ubmVjdGVkIG5vZGVzIGFyZSBzYWlkIHRvIGJlIGluIGEgZG9jdW1lbnRcblx0XHRcdFx0Ly8gZnJhZ21lbnQgaW4gSUUgOVxuXHRcdFx0XHRlbGVtLmRvY3VtZW50ICYmIGVsZW0uZG9jdW1lbnQubm9kZVR5cGUgIT09IDExICkge1xuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKCBlICkge1xuXHRcdFx0bm9ubmF0aXZlU2VsZWN0b3JDYWNoZSggZXhwciwgdHJ1ZSApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBTaXp6bGUoIGV4cHIsIGRvY3VtZW50LCBudWxsLCBbIGVsZW0gXSApLmxlbmd0aCA+IDA7XG59O1xuXG5TaXp6bGUuY29udGFpbnMgPSBmdW5jdGlvbiggY29udGV4dCwgZWxlbSApIHtcblxuXHQvLyBTZXQgZG9jdW1lbnQgdmFycyBpZiBuZWVkZWRcblx0Ly8gU3VwcG9ydDogSUUgMTErLCBFZGdlIDE3IC0gMTgrXG5cdC8vIElFL0VkZ2Ugc29tZXRpbWVzIHRocm93IGEgXCJQZXJtaXNzaW9uIGRlbmllZFwiIGVycm9yIHdoZW4gc3RyaWN0LWNvbXBhcmluZ1xuXHQvLyB0d28gZG9jdW1lbnRzOyBzaGFsbG93IGNvbXBhcmlzb25zIHdvcmsuXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcblx0aWYgKCAoIGNvbnRleHQub3duZXJEb2N1bWVudCB8fCBjb250ZXh0ICkgIT0gZG9jdW1lbnQgKSB7XG5cdFx0c2V0RG9jdW1lbnQoIGNvbnRleHQgKTtcblx0fVxuXHRyZXR1cm4gY29udGFpbnMoIGNvbnRleHQsIGVsZW0gKTtcbn07XG5cblNpenpsZS5hdHRyID0gZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cblx0Ly8gU2V0IGRvY3VtZW50IHZhcnMgaWYgbmVlZGVkXG5cdC8vIFN1cHBvcnQ6IElFIDExKywgRWRnZSAxNyAtIDE4K1xuXHQvLyBJRS9FZGdlIHNvbWV0aW1lcyB0aHJvdyBhIFwiUGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvciB3aGVuIHN0cmljdC1jb21wYXJpbmdcblx0Ly8gdHdvIGRvY3VtZW50czsgc2hhbGxvdyBjb21wYXJpc29ucyB3b3JrLlxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG5cdGlmICggKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSApICE9IGRvY3VtZW50ICkge1xuXHRcdHNldERvY3VtZW50KCBlbGVtICk7XG5cdH1cblxuXHR2YXIgZm4gPSBFeHByLmF0dHJIYW5kbGVbIG5hbWUudG9Mb3dlckNhc2UoKSBdLFxuXG5cdFx0Ly8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBPYmplY3QucHJvdG90eXBlIHByb3BlcnRpZXMgKGpRdWVyeSAjMTM4MDcpXG5cdFx0dmFsID0gZm4gJiYgaGFzT3duLmNhbGwoIEV4cHIuYXR0ckhhbmRsZSwgbmFtZS50b0xvd2VyQ2FzZSgpICkgP1xuXHRcdFx0Zm4oIGVsZW0sIG5hbWUsICFkb2N1bWVudElzSFRNTCApIDpcblx0XHRcdHVuZGVmaW5lZDtcblxuXHRyZXR1cm4gdmFsICE9PSB1bmRlZmluZWQgP1xuXHRcdHZhbCA6XG5cdFx0c3VwcG9ydC5hdHRyaWJ1dGVzIHx8ICFkb2N1bWVudElzSFRNTCA/XG5cdFx0XHRlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSApIDpcblx0XHRcdCggdmFsID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKCBuYW1lICkgKSAmJiB2YWwuc3BlY2lmaWVkID9cblx0XHRcdFx0dmFsLnZhbHVlIDpcblx0XHRcdFx0bnVsbDtcbn07XG5cblNpenpsZS5lc2NhcGUgPSBmdW5jdGlvbiggc2VsICkge1xuXHRyZXR1cm4gKCBzZWwgKyBcIlwiICkucmVwbGFjZSggcmNzc2VzY2FwZSwgZmNzc2VzY2FwZSApO1xufTtcblxuU2l6emxlLmVycm9yID0gZnVuY3Rpb24oIG1zZyApIHtcblx0dGhyb3cgbmV3IEVycm9yKCBcIlN5bnRheCBlcnJvciwgdW5yZWNvZ25pemVkIGV4cHJlc3Npb246IFwiICsgbXNnICk7XG59O1xuXG4vKipcbiAqIERvY3VtZW50IHNvcnRpbmcgYW5kIHJlbW92aW5nIGR1cGxpY2F0ZXNcbiAqIEBwYXJhbSB7QXJyYXlMaWtlfSByZXN1bHRzXG4gKi9cblNpenpsZS51bmlxdWVTb3J0ID0gZnVuY3Rpb24oIHJlc3VsdHMgKSB7XG5cdHZhciBlbGVtLFxuXHRcdGR1cGxpY2F0ZXMgPSBbXSxcblx0XHRqID0gMCxcblx0XHRpID0gMDtcblxuXHQvLyBVbmxlc3Mgd2UgKmtub3cqIHdlIGNhbiBkZXRlY3QgZHVwbGljYXRlcywgYXNzdW1lIHRoZWlyIHByZXNlbmNlXG5cdGhhc0R1cGxpY2F0ZSA9ICFzdXBwb3J0LmRldGVjdER1cGxpY2F0ZXM7XG5cdHNvcnRJbnB1dCA9ICFzdXBwb3J0LnNvcnRTdGFibGUgJiYgcmVzdWx0cy5zbGljZSggMCApO1xuXHRyZXN1bHRzLnNvcnQoIHNvcnRPcmRlciApO1xuXG5cdGlmICggaGFzRHVwbGljYXRlICkge1xuXHRcdHdoaWxlICggKCBlbGVtID0gcmVzdWx0c1sgaSsrIF0gKSApIHtcblx0XHRcdGlmICggZWxlbSA9PT0gcmVzdWx0c1sgaSBdICkge1xuXHRcdFx0XHRqID0gZHVwbGljYXRlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHdoaWxlICggai0tICkge1xuXHRcdFx0cmVzdWx0cy5zcGxpY2UoIGR1cGxpY2F0ZXNbIGogXSwgMSApO1xuXHRcdH1cblx0fVxuXG5cdC8vIENsZWFyIGlucHV0IGFmdGVyIHNvcnRpbmcgdG8gcmVsZWFzZSBvYmplY3RzXG5cdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L3NpenpsZS9wdWxsLzIyNVxuXHRzb3J0SW5wdXQgPSBudWxsO1xuXG5cdHJldHVybiByZXN1bHRzO1xufTtcblxuLyoqXG4gKiBVdGlsaXR5IGZ1bmN0aW9uIGZvciByZXRyaWV2aW5nIHRoZSB0ZXh0IHZhbHVlIG9mIGFuIGFycmF5IG9mIERPTSBub2Rlc1xuICogQHBhcmFtIHtBcnJheXxFbGVtZW50fSBlbGVtXG4gKi9cbmdldFRleHQgPSBTaXp6bGUuZ2V0VGV4dCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHR2YXIgbm9kZSxcblx0XHRyZXQgPSBcIlwiLFxuXHRcdGkgPSAwLFxuXHRcdG5vZGVUeXBlID0gZWxlbS5ub2RlVHlwZTtcblxuXHRpZiAoICFub2RlVHlwZSApIHtcblxuXHRcdC8vIElmIG5vIG5vZGVUeXBlLCB0aGlzIGlzIGV4cGVjdGVkIHRvIGJlIGFuIGFycmF5XG5cdFx0d2hpbGUgKCAoIG5vZGUgPSBlbGVtWyBpKysgXSApICkge1xuXG5cdFx0XHQvLyBEbyBub3QgdHJhdmVyc2UgY29tbWVudCBub2Rlc1xuXHRcdFx0cmV0ICs9IGdldFRleHQoIG5vZGUgKTtcblx0XHR9XG5cdH0gZWxzZSBpZiAoIG5vZGVUeXBlID09PSAxIHx8IG5vZGVUeXBlID09PSA5IHx8IG5vZGVUeXBlID09PSAxMSApIHtcblxuXHRcdC8vIFVzZSB0ZXh0Q29udGVudCBmb3IgZWxlbWVudHNcblx0XHQvLyBpbm5lclRleHQgdXNhZ2UgcmVtb3ZlZCBmb3IgY29uc2lzdGVuY3kgb2YgbmV3IGxpbmVzIChqUXVlcnkgIzExMTUzKVxuXHRcdGlmICggdHlwZW9mIGVsZW0udGV4dENvbnRlbnQgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS50ZXh0Q29udGVudDtcblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBUcmF2ZXJzZSBpdHMgY2hpbGRyZW5cblx0XHRcdGZvciAoIGVsZW0gPSBlbGVtLmZpcnN0Q2hpbGQ7IGVsZW07IGVsZW0gPSBlbGVtLm5leHRTaWJsaW5nICkge1xuXHRcdFx0XHRyZXQgKz0gZ2V0VGV4dCggZWxlbSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIGlmICggbm9kZVR5cGUgPT09IDMgfHwgbm9kZVR5cGUgPT09IDQgKSB7XG5cdFx0cmV0dXJuIGVsZW0ubm9kZVZhbHVlO1xuXHR9XG5cblx0Ly8gRG8gbm90IGluY2x1ZGUgY29tbWVudCBvciBwcm9jZXNzaW5nIGluc3RydWN0aW9uIG5vZGVzXG5cblx0cmV0dXJuIHJldDtcbn07XG5cbkV4cHIgPSBTaXp6bGUuc2VsZWN0b3JzID0ge1xuXG5cdC8vIENhbiBiZSBhZGp1c3RlZCBieSB0aGUgdXNlclxuXHRjYWNoZUxlbmd0aDogNTAsXG5cblx0Y3JlYXRlUHNldWRvOiBtYXJrRnVuY3Rpb24sXG5cblx0bWF0Y2g6IG1hdGNoRXhwcixcblxuXHRhdHRySGFuZGxlOiB7fSxcblxuXHRmaW5kOiB7fSxcblxuXHRyZWxhdGl2ZToge1xuXHRcdFwiPlwiOiB7IGRpcjogXCJwYXJlbnROb2RlXCIsIGZpcnN0OiB0cnVlIH0sXG5cdFx0XCIgXCI6IHsgZGlyOiBcInBhcmVudE5vZGVcIiB9LFxuXHRcdFwiK1wiOiB7IGRpcjogXCJwcmV2aW91c1NpYmxpbmdcIiwgZmlyc3Q6IHRydWUgfSxcblx0XHRcIn5cIjogeyBkaXI6IFwicHJldmlvdXNTaWJsaW5nXCIgfVxuXHR9LFxuXG5cdHByZUZpbHRlcjoge1xuXHRcdFwiQVRUUlwiOiBmdW5jdGlvbiggbWF0Y2ggKSB7XG5cdFx0XHRtYXRjaFsgMSBdID0gbWF0Y2hbIDEgXS5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXG5cdFx0XHQvLyBNb3ZlIHRoZSBnaXZlbiB2YWx1ZSB0byBtYXRjaFszXSB3aGV0aGVyIHF1b3RlZCBvciB1bnF1b3RlZFxuXHRcdFx0bWF0Y2hbIDMgXSA9ICggbWF0Y2hbIDMgXSB8fCBtYXRjaFsgNCBdIHx8XG5cdFx0XHRcdG1hdGNoWyA1IF0gfHwgXCJcIiApLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cblx0XHRcdGlmICggbWF0Y2hbIDIgXSA9PT0gXCJ+PVwiICkge1xuXHRcdFx0XHRtYXRjaFsgMyBdID0gXCIgXCIgKyBtYXRjaFsgMyBdICsgXCIgXCI7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBtYXRjaC5zbGljZSggMCwgNCApO1xuXHRcdH0sXG5cblx0XHRcIkNISUxEXCI6IGZ1bmN0aW9uKCBtYXRjaCApIHtcblxuXHRcdFx0LyogbWF0Y2hlcyBmcm9tIG1hdGNoRXhwcltcIkNISUxEXCJdXG5cdFx0XHRcdDEgdHlwZSAob25seXxudGh8Li4uKVxuXHRcdFx0XHQyIHdoYXQgKGNoaWxkfG9mLXR5cGUpXG5cdFx0XHRcdDMgYXJndW1lbnQgKGV2ZW58b2RkfFxcZCp8XFxkKm4oWystXVxcZCspP3wuLi4pXG5cdFx0XHRcdDQgeG4tY29tcG9uZW50IG9mIHhuK3kgYXJndW1lbnQgKFsrLV0/XFxkKm58KVxuXHRcdFx0XHQ1IHNpZ24gb2YgeG4tY29tcG9uZW50XG5cdFx0XHRcdDYgeCBvZiB4bi1jb21wb25lbnRcblx0XHRcdFx0NyBzaWduIG9mIHktY29tcG9uZW50XG5cdFx0XHRcdDggeSBvZiB5LWNvbXBvbmVudFxuXHRcdFx0Ki9cblx0XHRcdG1hdGNoWyAxIF0gPSBtYXRjaFsgMSBdLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRcdGlmICggbWF0Y2hbIDEgXS5zbGljZSggMCwgMyApID09PSBcIm50aFwiICkge1xuXG5cdFx0XHRcdC8vIG50aC0qIHJlcXVpcmVzIGFyZ3VtZW50XG5cdFx0XHRcdGlmICggIW1hdGNoWyAzIF0gKSB7XG5cdFx0XHRcdFx0U2l6emxlLmVycm9yKCBtYXRjaFsgMCBdICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBudW1lcmljIHggYW5kIHkgcGFyYW1ldGVycyBmb3IgRXhwci5maWx0ZXIuQ0hJTERcblx0XHRcdFx0Ly8gcmVtZW1iZXIgdGhhdCBmYWxzZS90cnVlIGNhc3QgcmVzcGVjdGl2ZWx5IHRvIDAvMVxuXHRcdFx0XHRtYXRjaFsgNCBdID0gKyggbWF0Y2hbIDQgXSA/XG5cdFx0XHRcdFx0bWF0Y2hbIDUgXSArICggbWF0Y2hbIDYgXSB8fCAxICkgOlxuXHRcdFx0XHRcdDIgKiAoIG1hdGNoWyAzIF0gPT09IFwiZXZlblwiIHx8IG1hdGNoWyAzIF0gPT09IFwib2RkXCIgKSApO1xuXHRcdFx0XHRtYXRjaFsgNSBdID0gKyggKCBtYXRjaFsgNyBdICsgbWF0Y2hbIDggXSApIHx8IG1hdGNoWyAzIF0gPT09IFwib2RkXCIgKTtcblxuXHRcdFx0XHQvLyBvdGhlciB0eXBlcyBwcm9oaWJpdCBhcmd1bWVudHNcblx0XHRcdH0gZWxzZSBpZiAoIG1hdGNoWyAzIF0gKSB7XG5cdFx0XHRcdFNpenpsZS5lcnJvciggbWF0Y2hbIDAgXSApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbWF0Y2g7XG5cdFx0fSxcblxuXHRcdFwiUFNFVURPXCI6IGZ1bmN0aW9uKCBtYXRjaCApIHtcblx0XHRcdHZhciBleGNlc3MsXG5cdFx0XHRcdHVucXVvdGVkID0gIW1hdGNoWyA2IF0gJiYgbWF0Y2hbIDIgXTtcblxuXHRcdFx0aWYgKCBtYXRjaEV4cHJbIFwiQ0hJTERcIiBdLnRlc3QoIG1hdGNoWyAwIF0gKSApIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFjY2VwdCBxdW90ZWQgYXJndW1lbnRzIGFzLWlzXG5cdFx0XHRpZiAoIG1hdGNoWyAzIF0gKSB7XG5cdFx0XHRcdG1hdGNoWyAyIF0gPSBtYXRjaFsgNCBdIHx8IG1hdGNoWyA1IF0gfHwgXCJcIjtcblxuXHRcdFx0Ly8gU3RyaXAgZXhjZXNzIGNoYXJhY3RlcnMgZnJvbSB1bnF1b3RlZCBhcmd1bWVudHNcblx0XHRcdH0gZWxzZSBpZiAoIHVucXVvdGVkICYmIHJwc2V1ZG8udGVzdCggdW5xdW90ZWQgKSAmJlxuXG5cdFx0XHRcdC8vIEdldCBleGNlc3MgZnJvbSB0b2tlbml6ZSAocmVjdXJzaXZlbHkpXG5cdFx0XHRcdCggZXhjZXNzID0gdG9rZW5pemUoIHVucXVvdGVkLCB0cnVlICkgKSAmJlxuXG5cdFx0XHRcdC8vIGFkdmFuY2UgdG8gdGhlIG5leHQgY2xvc2luZyBwYXJlbnRoZXNpc1xuXHRcdFx0XHQoIGV4Y2VzcyA9IHVucXVvdGVkLmluZGV4T2YoIFwiKVwiLCB1bnF1b3RlZC5sZW5ndGggLSBleGNlc3MgKSAtIHVucXVvdGVkLmxlbmd0aCApICkge1xuXG5cdFx0XHRcdC8vIGV4Y2VzcyBpcyBhIG5lZ2F0aXZlIGluZGV4XG5cdFx0XHRcdG1hdGNoWyAwIF0gPSBtYXRjaFsgMCBdLnNsaWNlKCAwLCBleGNlc3MgKTtcblx0XHRcdFx0bWF0Y2hbIDIgXSA9IHVucXVvdGVkLnNsaWNlKCAwLCBleGNlc3MgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmV0dXJuIG9ubHkgY2FwdHVyZXMgbmVlZGVkIGJ5IHRoZSBwc2V1ZG8gZmlsdGVyIG1ldGhvZCAodHlwZSBhbmQgYXJndW1lbnQpXG5cdFx0XHRyZXR1cm4gbWF0Y2guc2xpY2UoIDAsIDMgKTtcblx0XHR9XG5cdH0sXG5cblx0ZmlsdGVyOiB7XG5cblx0XHRcIlRBR1wiOiBmdW5jdGlvbiggbm9kZU5hbWVTZWxlY3RvciApIHtcblx0XHRcdHZhciBub2RlTmFtZSA9IG5vZGVOYW1lU2VsZWN0b3IucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0cmV0dXJuIG5vZGVOYW1lU2VsZWN0b3IgPT09IFwiKlwiID9cblx0XHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0gOlxuXHRcdFx0XHRmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxlbS5ub2RlTmFtZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5vZGVOYW1lO1xuXHRcdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRcIkNMQVNTXCI6IGZ1bmN0aW9uKCBjbGFzc05hbWUgKSB7XG5cdFx0XHR2YXIgcGF0dGVybiA9IGNsYXNzQ2FjaGVbIGNsYXNzTmFtZSArIFwiIFwiIF07XG5cblx0XHRcdHJldHVybiBwYXR0ZXJuIHx8XG5cdFx0XHRcdCggcGF0dGVybiA9IG5ldyBSZWdFeHAoIFwiKF58XCIgKyB3aGl0ZXNwYWNlICtcblx0XHRcdFx0XHRcIilcIiArIGNsYXNzTmFtZSArIFwiKFwiICsgd2hpdGVzcGFjZSArIFwifCQpXCIgKSApICYmIGNsYXNzQ2FjaGUoXG5cdFx0XHRcdFx0XHRjbGFzc05hbWUsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcGF0dGVybi50ZXN0KFxuXHRcdFx0XHRcdFx0XHRcdHR5cGVvZiBlbGVtLmNsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBlbGVtLmNsYXNzTmFtZSB8fFxuXHRcdFx0XHRcdFx0XHRcdHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0ZWxlbS5nZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIiApIHx8XG5cdFx0XHRcdFx0XHRcdFx0XCJcIlxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9ICk7XG5cdFx0fSxcblxuXHRcdFwiQVRUUlwiOiBmdW5jdGlvbiggbmFtZSwgb3BlcmF0b3IsIGNoZWNrICkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gU2l6emxlLmF0dHIoIGVsZW0sIG5hbWUgKTtcblxuXHRcdFx0XHRpZiAoIHJlc3VsdCA9PSBudWxsICkge1xuXHRcdFx0XHRcdHJldHVybiBvcGVyYXRvciA9PT0gXCIhPVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggIW9wZXJhdG9yICkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVzdWx0ICs9IFwiXCI7XG5cblx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuXG5cdFx0XHRcdHJldHVybiBvcGVyYXRvciA9PT0gXCI9XCIgPyByZXN1bHQgPT09IGNoZWNrIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCIhPVwiID8gcmVzdWx0ICE9PSBjaGVjayA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwiXj1cIiA/IGNoZWNrICYmIHJlc3VsdC5pbmRleE9mKCBjaGVjayApID09PSAwIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCIqPVwiID8gY2hlY2sgJiYgcmVzdWx0LmluZGV4T2YoIGNoZWNrICkgPiAtMSA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwiJD1cIiA/IGNoZWNrICYmIHJlc3VsdC5zbGljZSggLWNoZWNrLmxlbmd0aCApID09PSBjaGVjayA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwifj1cIiA/ICggXCIgXCIgKyByZXN1bHQucmVwbGFjZSggcndoaXRlc3BhY2UsIFwiIFwiICkgKyBcIiBcIiApLmluZGV4T2YoIGNoZWNrICkgPiAtMSA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwifD1cIiA/IHJlc3VsdCA9PT0gY2hlY2sgfHwgcmVzdWx0LnNsaWNlKCAwLCBjaGVjay5sZW5ndGggKyAxICkgPT09IGNoZWNrICsgXCItXCIgOlxuXHRcdFx0XHRcdGZhbHNlO1xuXHRcdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG1heC1sZW4gKi9cblxuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0XCJDSElMRFwiOiBmdW5jdGlvbiggdHlwZSwgd2hhdCwgX2FyZ3VtZW50LCBmaXJzdCwgbGFzdCApIHtcblx0XHRcdHZhciBzaW1wbGUgPSB0eXBlLnNsaWNlKCAwLCAzICkgIT09IFwibnRoXCIsXG5cdFx0XHRcdGZvcndhcmQgPSB0eXBlLnNsaWNlKCAtNCApICE9PSBcImxhc3RcIixcblx0XHRcdFx0b2ZUeXBlID0gd2hhdCA9PT0gXCJvZi10eXBlXCI7XG5cblx0XHRcdHJldHVybiBmaXJzdCA9PT0gMSAmJiBsYXN0ID09PSAwID9cblxuXHRcdFx0XHQvLyBTaG9ydGN1dCBmb3IgOm50aC0qKG4pXG5cdFx0XHRcdGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRcdHJldHVybiAhIWVsZW0ucGFyZW50Tm9kZTtcblx0XHRcdFx0fSA6XG5cblx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0sIF9jb250ZXh0LCB4bWwgKSB7XG5cdFx0XHRcdFx0dmFyIGNhY2hlLCB1bmlxdWVDYWNoZSwgb3V0ZXJDYWNoZSwgbm9kZSwgbm9kZUluZGV4LCBzdGFydCxcblx0XHRcdFx0XHRcdGRpciA9IHNpbXBsZSAhPT0gZm9yd2FyZCA/IFwibmV4dFNpYmxpbmdcIiA6IFwicHJldmlvdXNTaWJsaW5nXCIsXG5cdFx0XHRcdFx0XHRwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGUsXG5cdFx0XHRcdFx0XHRuYW1lID0gb2ZUeXBlICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSxcblx0XHRcdFx0XHRcdHVzZUNhY2hlID0gIXhtbCAmJiAhb2ZUeXBlLFxuXHRcdFx0XHRcdFx0ZGlmZiA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKCBwYXJlbnQgKSB7XG5cblx0XHRcdFx0XHRcdC8vIDooZmlyc3R8bGFzdHxvbmx5KS0oY2hpbGR8b2YtdHlwZSlcblx0XHRcdFx0XHRcdGlmICggc2ltcGxlICkge1xuXHRcdFx0XHRcdFx0XHR3aGlsZSAoIGRpciApIHtcblx0XHRcdFx0XHRcdFx0XHRub2RlID0gZWxlbTtcblx0XHRcdFx0XHRcdFx0XHR3aGlsZSAoICggbm9kZSA9IG5vZGVbIGRpciBdICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIG9mVHlwZSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZSA6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG5vZGUubm9kZVR5cGUgPT09IDEgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdC8vIFJldmVyc2UgZGlyZWN0aW9uIGZvciA6b25seS0qIChpZiB3ZSBoYXZlbid0IHlldCBkb25lIHNvKVxuXHRcdFx0XHRcdFx0XHRcdHN0YXJ0ID0gZGlyID0gdHlwZSA9PT0gXCJvbmx5XCIgJiYgIXN0YXJ0ICYmIFwibmV4dFNpYmxpbmdcIjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0c3RhcnQgPSBbIGZvcndhcmQgPyBwYXJlbnQuZmlyc3RDaGlsZCA6IHBhcmVudC5sYXN0Q2hpbGQgXTtcblxuXHRcdFx0XHRcdFx0Ly8gbm9uLXhtbCA6bnRoLWNoaWxkKC4uLikgc3RvcmVzIGNhY2hlIGRhdGEgb24gYHBhcmVudGBcblx0XHRcdFx0XHRcdGlmICggZm9yd2FyZCAmJiB1c2VDYWNoZSApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBTZWVrIGBlbGVtYCBmcm9tIGEgcHJldmlvdXNseS1jYWNoZWQgaW5kZXhcblxuXHRcdFx0XHRcdFx0XHQvLyAuLi5pbiBhIGd6aXAtZnJpZW5kbHkgd2F5XG5cdFx0XHRcdFx0XHRcdG5vZGUgPSBwYXJlbnQ7XG5cdFx0XHRcdFx0XHRcdG91dGVyQ2FjaGUgPSBub2RlWyBleHBhbmRvIF0gfHwgKCBub2RlWyBleHBhbmRvIF0gPSB7fSApO1xuXG5cdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw5IG9ubHlcblx0XHRcdFx0XHRcdFx0Ly8gRGVmZW5kIGFnYWluc3QgY2xvbmVkIGF0dHJvcGVydGllcyAoalF1ZXJ5IGdoLTE3MDkpXG5cdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlID0gb3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0KCBvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gPSB7fSApO1xuXG5cdFx0XHRcdFx0XHRcdGNhY2hlID0gdW5pcXVlQ2FjaGVbIHR5cGUgXSB8fCBbXTtcblx0XHRcdFx0XHRcdFx0bm9kZUluZGV4ID0gY2FjaGVbIDAgXSA9PT0gZGlycnVucyAmJiBjYWNoZVsgMSBdO1xuXHRcdFx0XHRcdFx0XHRkaWZmID0gbm9kZUluZGV4ICYmIGNhY2hlWyAyIF07XG5cdFx0XHRcdFx0XHRcdG5vZGUgPSBub2RlSW5kZXggJiYgcGFyZW50LmNoaWxkTm9kZXNbIG5vZGVJbmRleCBdO1xuXG5cdFx0XHRcdFx0XHRcdHdoaWxlICggKCBub2RlID0gKytub2RlSW5kZXggJiYgbm9kZSAmJiBub2RlWyBkaXIgXSB8fFxuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gRmFsbGJhY2sgdG8gc2Vla2luZyBgZWxlbWAgZnJvbSB0aGUgc3RhcnRcblx0XHRcdFx0XHRcdFx0XHQoIGRpZmYgPSBub2RlSW5kZXggPSAwICkgfHwgc3RhcnQucG9wKCkgKSApIHtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIFdoZW4gZm91bmQsIGNhY2hlIGluZGV4ZXMgb24gYHBhcmVudGAgYW5kIGJyZWFrXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBub2RlLm5vZGVUeXBlID09PSAxICYmICsrZGlmZiAmJiBub2RlID09PSBlbGVtICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGVbIHR5cGUgXSA9IFsgZGlycnVucywgbm9kZUluZGV4LCBkaWZmIF07XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBVc2UgcHJldmlvdXNseS1jYWNoZWQgZWxlbWVudCBpbmRleCBpZiBhdmFpbGFibGVcblx0XHRcdFx0XHRcdFx0aWYgKCB1c2VDYWNoZSApIHtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIC4uLmluIGEgZ3ppcC1mcmllbmRseSB3YXlcblx0XHRcdFx0XHRcdFx0XHRub2RlID0gZWxlbTtcblx0XHRcdFx0XHRcdFx0XHRvdXRlckNhY2hlID0gbm9kZVsgZXhwYW5kbyBdIHx8ICggbm9kZVsgZXhwYW5kbyBdID0ge30gKTtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw5IG9ubHlcblx0XHRcdFx0XHRcdFx0XHQvLyBEZWZlbmQgYWdhaW5zdCBjbG9uZWQgYXR0cm9wZXJ0aWVzIChqUXVlcnkgZ2gtMTcwOSlcblx0XHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZSA9IG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0KCBvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gPSB7fSApO1xuXG5cdFx0XHRcdFx0XHRcdFx0Y2FjaGUgPSB1bmlxdWVDYWNoZVsgdHlwZSBdIHx8IFtdO1xuXHRcdFx0XHRcdFx0XHRcdG5vZGVJbmRleCA9IGNhY2hlWyAwIF0gPT09IGRpcnJ1bnMgJiYgY2FjaGVbIDEgXTtcblx0XHRcdFx0XHRcdFx0XHRkaWZmID0gbm9kZUluZGV4O1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Ly8geG1sIDpudGgtY2hpbGQoLi4uKVxuXHRcdFx0XHRcdFx0XHQvLyBvciA6bnRoLWxhc3QtY2hpbGQoLi4uKSBvciA6bnRoKC1sYXN0KT8tb2YtdHlwZSguLi4pXG5cdFx0XHRcdFx0XHRcdGlmICggZGlmZiA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBVc2UgdGhlIHNhbWUgbG9vcCBhcyBhYm92ZSB0byBzZWVrIGBlbGVtYCBmcm9tIHRoZSBzdGFydFxuXHRcdFx0XHRcdFx0XHRcdHdoaWxlICggKCBub2RlID0gKytub2RlSW5kZXggJiYgbm9kZSAmJiBub2RlWyBkaXIgXSB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0KCBkaWZmID0gbm9kZUluZGV4ID0gMCApIHx8IHN0YXJ0LnBvcCgpICkgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmICggKCBvZlR5cGUgP1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUgOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRub2RlLm5vZGVUeXBlID09PSAxICkgJiZcblx0XHRcdFx0XHRcdFx0XHRcdFx0KytkaWZmICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIENhY2hlIHRoZSBpbmRleCBvZiBlYWNoIGVuY291bnRlcmVkIGVsZW1lbnRcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCB1c2VDYWNoZSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvdXRlckNhY2hlID0gbm9kZVsgZXhwYW5kbyBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQoIG5vZGVbIGV4cGFuZG8gXSA9IHt9ICk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8OSBvbmx5XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gRGVmZW5kIGFnYWluc3QgY2xvbmVkIGF0dHJvcGVydGllcyAoalF1ZXJ5IGdoLTE3MDkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGUgPSBvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gfHxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCggb3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdID0ge30gKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlWyB0eXBlIF0gPSBbIGRpcnJ1bnMsIGRpZmYgXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICggbm9kZSA9PT0gZWxlbSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBJbmNvcnBvcmF0ZSB0aGUgb2Zmc2V0LCB0aGVuIGNoZWNrIGFnYWluc3QgY3ljbGUgc2l6ZVxuXHRcdFx0XHRcdFx0ZGlmZiAtPSBsYXN0O1xuXHRcdFx0XHRcdFx0cmV0dXJuIGRpZmYgPT09IGZpcnN0IHx8ICggZGlmZiAlIGZpcnN0ID09PSAwICYmIGRpZmYgLyBmaXJzdCA+PSAwICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRcIlBTRVVET1wiOiBmdW5jdGlvbiggcHNldWRvLCBhcmd1bWVudCApIHtcblxuXHRcdFx0Ly8gcHNldWRvLWNsYXNzIG5hbWVzIGFyZSBjYXNlLWluc2Vuc2l0aXZlXG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI3BzZXVkby1jbGFzc2VzXG5cdFx0XHQvLyBQcmlvcml0aXplIGJ5IGNhc2Ugc2Vuc2l0aXZpdHkgaW4gY2FzZSBjdXN0b20gcHNldWRvcyBhcmUgYWRkZWQgd2l0aCB1cHBlcmNhc2UgbGV0dGVyc1xuXHRcdFx0Ly8gUmVtZW1iZXIgdGhhdCBzZXRGaWx0ZXJzIGluaGVyaXRzIGZyb20gcHNldWRvc1xuXHRcdFx0dmFyIGFyZ3MsXG5cdFx0XHRcdGZuID0gRXhwci5wc2V1ZG9zWyBwc2V1ZG8gXSB8fCBFeHByLnNldEZpbHRlcnNbIHBzZXVkby50b0xvd2VyQ2FzZSgpIF0gfHxcblx0XHRcdFx0XHRTaXp6bGUuZXJyb3IoIFwidW5zdXBwb3J0ZWQgcHNldWRvOiBcIiArIHBzZXVkbyApO1xuXG5cdFx0XHQvLyBUaGUgdXNlciBtYXkgdXNlIGNyZWF0ZVBzZXVkbyB0byBpbmRpY2F0ZSB0aGF0XG5cdFx0XHQvLyBhcmd1bWVudHMgYXJlIG5lZWRlZCB0byBjcmVhdGUgdGhlIGZpbHRlciBmdW5jdGlvblxuXHRcdFx0Ly8ganVzdCBhcyBTaXp6bGUgZG9lc1xuXHRcdFx0aWYgKCBmblsgZXhwYW5kbyBdICkge1xuXHRcdFx0XHRyZXR1cm4gZm4oIGFyZ3VtZW50ICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEJ1dCBtYWludGFpbiBzdXBwb3J0IGZvciBvbGQgc2lnbmF0dXJlc1xuXHRcdFx0aWYgKCBmbi5sZW5ndGggPiAxICkge1xuXHRcdFx0XHRhcmdzID0gWyBwc2V1ZG8sIHBzZXVkbywgXCJcIiwgYXJndW1lbnQgXTtcblx0XHRcdFx0cmV0dXJuIEV4cHIuc2V0RmlsdGVycy5oYXNPd25Qcm9wZXJ0eSggcHNldWRvLnRvTG93ZXJDYXNlKCkgKSA/XG5cdFx0XHRcdFx0bWFya0Z1bmN0aW9uKCBmdW5jdGlvbiggc2VlZCwgbWF0Y2hlcyApIHtcblx0XHRcdFx0XHRcdHZhciBpZHgsXG5cdFx0XHRcdFx0XHRcdG1hdGNoZWQgPSBmbiggc2VlZCwgYXJndW1lbnQgKSxcblx0XHRcdFx0XHRcdFx0aSA9IG1hdGNoZWQubGVuZ3RoO1xuXHRcdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRcdGlkeCA9IGluZGV4T2YoIHNlZWQsIG1hdGNoZWRbIGkgXSApO1xuXHRcdFx0XHRcdFx0XHRzZWVkWyBpZHggXSA9ICEoIG1hdGNoZXNbIGlkeCBdID0gbWF0Y2hlZFsgaSBdICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSApIDpcblx0XHRcdFx0XHRmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbiggZWxlbSwgMCwgYXJncyApO1xuXHRcdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmbjtcblx0XHR9XG5cdH0sXG5cblx0cHNldWRvczoge1xuXG5cdFx0Ly8gUG90ZW50aWFsbHkgY29tcGxleCBwc2V1ZG9zXG5cdFx0XCJub3RcIjogbWFya0Z1bmN0aW9uKCBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cblx0XHRcdC8vIFRyaW0gdGhlIHNlbGVjdG9yIHBhc3NlZCB0byBjb21waWxlXG5cdFx0XHQvLyB0byBhdm9pZCB0cmVhdGluZyBsZWFkaW5nIGFuZCB0cmFpbGluZ1xuXHRcdFx0Ly8gc3BhY2VzIGFzIGNvbWJpbmF0b3JzXG5cdFx0XHR2YXIgaW5wdXQgPSBbXSxcblx0XHRcdFx0cmVzdWx0cyA9IFtdLFxuXHRcdFx0XHRtYXRjaGVyID0gY29tcGlsZSggc2VsZWN0b3IucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApICk7XG5cblx0XHRcdHJldHVybiBtYXRjaGVyWyBleHBhbmRvIF0gP1xuXHRcdFx0XHRtYXJrRnVuY3Rpb24oIGZ1bmN0aW9uKCBzZWVkLCBtYXRjaGVzLCBfY29udGV4dCwgeG1sICkge1xuXHRcdFx0XHRcdHZhciBlbGVtLFxuXHRcdFx0XHRcdFx0dW5tYXRjaGVkID0gbWF0Y2hlciggc2VlZCwgbnVsbCwgeG1sLCBbXSApLFxuXHRcdFx0XHRcdFx0aSA9IHNlZWQubGVuZ3RoO1xuXG5cdFx0XHRcdFx0Ly8gTWF0Y2ggZWxlbWVudHMgdW5tYXRjaGVkIGJ5IGBtYXRjaGVyYFxuXHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoIGVsZW0gPSB1bm1hdGNoZWRbIGkgXSApICkge1xuXHRcdFx0XHRcdFx0XHRzZWVkWyBpIF0gPSAhKCBtYXRjaGVzWyBpIF0gPSBlbGVtICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICkgOlxuXHRcdFx0XHRmdW5jdGlvbiggZWxlbSwgX2NvbnRleHQsIHhtbCApIHtcblx0XHRcdFx0XHRpbnB1dFsgMCBdID0gZWxlbTtcblx0XHRcdFx0XHRtYXRjaGVyKCBpbnB1dCwgbnVsbCwgeG1sLCByZXN1bHRzICk7XG5cblx0XHRcdFx0XHQvLyBEb24ndCBrZWVwIHRoZSBlbGVtZW50IChpc3N1ZSAjMjk5KVxuXHRcdFx0XHRcdGlucHV0WyAwIF0gPSBudWxsO1xuXHRcdFx0XHRcdHJldHVybiAhcmVzdWx0cy5wb3AoKTtcblx0XHRcdFx0fTtcblx0XHR9ICksXG5cblx0XHRcImhhc1wiOiBtYXJrRnVuY3Rpb24oIGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0cmV0dXJuIFNpenpsZSggc2VsZWN0b3IsIGVsZW0gKS5sZW5ndGggPiAwO1xuXHRcdFx0fTtcblx0XHR9ICksXG5cblx0XHRcImNvbnRhaW5zXCI6IG1hcmtGdW5jdGlvbiggZnVuY3Rpb24oIHRleHQgKSB7XG5cdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gKCBlbGVtLnRleHRDb250ZW50IHx8IGdldFRleHQoIGVsZW0gKSApLmluZGV4T2YoIHRleHQgKSA+IC0xO1xuXHRcdFx0fTtcblx0XHR9ICksXG5cblx0XHQvLyBcIldoZXRoZXIgYW4gZWxlbWVudCBpcyByZXByZXNlbnRlZCBieSBhIDpsYW5nKCkgc2VsZWN0b3Jcblx0XHQvLyBpcyBiYXNlZCBzb2xlbHkgb24gdGhlIGVsZW1lbnQncyBsYW5ndWFnZSB2YWx1ZVxuXHRcdC8vIGJlaW5nIGVxdWFsIHRvIHRoZSBpZGVudGlmaWVyIEMsXG5cdFx0Ly8gb3IgYmVnaW5uaW5nIHdpdGggdGhlIGlkZW50aWZpZXIgQyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSBcIi1cIi5cblx0XHQvLyBUaGUgbWF0Y2hpbmcgb2YgQyBhZ2FpbnN0IHRoZSBlbGVtZW50J3MgbGFuZ3VhZ2UgdmFsdWUgaXMgcGVyZm9ybWVkIGNhc2UtaW5zZW5zaXRpdmVseS5cblx0XHQvLyBUaGUgaWRlbnRpZmllciBDIGRvZXMgbm90IGhhdmUgdG8gYmUgYSB2YWxpZCBsYW5ndWFnZSBuYW1lLlwiXG5cdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNsYW5nLXBzZXVkb1xuXHRcdFwibGFuZ1wiOiBtYXJrRnVuY3Rpb24oIGZ1bmN0aW9uKCBsYW5nICkge1xuXG5cdFx0XHQvLyBsYW5nIHZhbHVlIG11c3QgYmUgYSB2YWxpZCBpZGVudGlmaWVyXG5cdFx0XHRpZiAoICFyaWRlbnRpZmllci50ZXN0KCBsYW5nIHx8IFwiXCIgKSApIHtcblx0XHRcdFx0U2l6emxlLmVycm9yKCBcInVuc3VwcG9ydGVkIGxhbmc6IFwiICsgbGFuZyApO1xuXHRcdFx0fVxuXHRcdFx0bGFuZyA9IGxhbmcucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHR2YXIgZWxlbUxhbmc7XG5cdFx0XHRcdGRvIHtcblx0XHRcdFx0XHRpZiAoICggZWxlbUxhbmcgPSBkb2N1bWVudElzSFRNTCA/XG5cdFx0XHRcdFx0XHRlbGVtLmxhbmcgOlxuXHRcdFx0XHRcdFx0ZWxlbS5nZXRBdHRyaWJ1dGUoIFwieG1sOmxhbmdcIiApIHx8IGVsZW0uZ2V0QXR0cmlidXRlKCBcImxhbmdcIiApICkgKSB7XG5cblx0XHRcdFx0XHRcdGVsZW1MYW5nID0gZWxlbUxhbmcudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtTGFuZyA9PT0gbGFuZyB8fCBlbGVtTGFuZy5pbmRleE9mKCBsYW5nICsgXCItXCIgKSA9PT0gMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gd2hpbGUgKCAoIGVsZW0gPSBlbGVtLnBhcmVudE5vZGUgKSAmJiBlbGVtLm5vZGVUeXBlID09PSAxICk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH07XG5cdFx0fSApLFxuXG5cdFx0Ly8gTWlzY2VsbGFuZW91c1xuXHRcdFwidGFyZ2V0XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0dmFyIGhhc2ggPSB3aW5kb3cubG9jYXRpb24gJiYgd2luZG93LmxvY2F0aW9uLmhhc2g7XG5cdFx0XHRyZXR1cm4gaGFzaCAmJiBoYXNoLnNsaWNlKCAxICkgPT09IGVsZW0uaWQ7XG5cdFx0fSxcblxuXHRcdFwicm9vdFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtID09PSBkb2NFbGVtO1xuXHRcdH0sXG5cblx0XHRcImZvY3VzXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0gPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiZcblx0XHRcdFx0KCAhZG9jdW1lbnQuaGFzRm9jdXMgfHwgZG9jdW1lbnQuaGFzRm9jdXMoKSApICYmXG5cdFx0XHRcdCEhKCBlbGVtLnR5cGUgfHwgZWxlbS5ocmVmIHx8IH5lbGVtLnRhYkluZGV4ICk7XG5cdFx0fSxcblxuXHRcdC8vIEJvb2xlYW4gcHJvcGVydGllc1xuXHRcdFwiZW5hYmxlZFwiOiBjcmVhdGVEaXNhYmxlZFBzZXVkbyggZmFsc2UgKSxcblx0XHRcImRpc2FibGVkXCI6IGNyZWF0ZURpc2FibGVkUHNldWRvKCB0cnVlICksXG5cblx0XHRcImNoZWNrZWRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHRcdC8vIEluIENTUzMsIDpjaGVja2VkIHNob3VsZCByZXR1cm4gYm90aCBjaGVja2VkIGFuZCBzZWxlY3RlZCBlbGVtZW50c1xuXHRcdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAxMS9SRUMtY3NzMy1zZWxlY3RvcnMtMjAxMTA5MjkvI2NoZWNrZWRcblx0XHRcdHZhciBub2RlTmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdHJldHVybiAoIG5vZGVOYW1lID09PSBcImlucHV0XCIgJiYgISFlbGVtLmNoZWNrZWQgKSB8fFxuXHRcdFx0XHQoIG5vZGVOYW1lID09PSBcIm9wdGlvblwiICYmICEhZWxlbS5zZWxlY3RlZCApO1xuXHRcdH0sXG5cblx0XHRcInNlbGVjdGVkXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0XHQvLyBBY2Nlc3NpbmcgdGhpcyBwcm9wZXJ0eSBtYWtlcyBzZWxlY3RlZC1ieS1kZWZhdWx0XG5cdFx0XHQvLyBvcHRpb25zIGluIFNhZmFyaSB3b3JrIHByb3Blcmx5XG5cdFx0XHRpZiAoIGVsZW0ucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuXHRcdFx0XHRlbGVtLnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGVsZW0uc2VsZWN0ZWQgPT09IHRydWU7XG5cdFx0fSxcblxuXHRcdC8vIENvbnRlbnRzXG5cdFx0XCJlbXB0eVwiOiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNlbXB0eS1wc2V1ZG9cblx0XHRcdC8vIDplbXB0eSBpcyBuZWdhdGVkIGJ5IGVsZW1lbnQgKDEpIG9yIGNvbnRlbnQgbm9kZXMgKHRleHQ6IDM7IGNkYXRhOiA0OyBlbnRpdHkgcmVmOiA1KSxcblx0XHRcdC8vICAgYnV0IG5vdCBieSBvdGhlcnMgKGNvbW1lbnQ6IDg7IHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb246IDc7IGV0Yy4pXG5cdFx0XHQvLyBub2RlVHlwZSA8IDYgd29ya3MgYmVjYXVzZSBhdHRyaWJ1dGVzICgyKSBkbyBub3QgYXBwZWFyIGFzIGNoaWxkcmVuXG5cdFx0XHRmb3IgKCBlbGVtID0gZWxlbS5maXJzdENoaWxkOyBlbGVtOyBlbGVtID0gZWxlbS5uZXh0U2libGluZyApIHtcblx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlIDwgNiApIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cblx0XHRcInBhcmVudFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiAhRXhwci5wc2V1ZG9zWyBcImVtcHR5XCIgXSggZWxlbSApO1xuXHRcdH0sXG5cblx0XHQvLyBFbGVtZW50L2lucHV0IHR5cGVzXG5cdFx0XCJoZWFkZXJcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gcmhlYWRlci50ZXN0KCBlbGVtLm5vZGVOYW1lICk7XG5cdFx0fSxcblxuXHRcdFwiaW5wdXRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gcmlucHV0cy50ZXN0KCBlbGVtLm5vZGVOYW1lICk7XG5cdFx0fSxcblxuXHRcdFwiYnV0dG9uXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0dmFyIG5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyZXR1cm4gbmFtZSA9PT0gXCJpbnB1dFwiICYmIGVsZW0udHlwZSA9PT0gXCJidXR0b25cIiB8fCBuYW1lID09PSBcImJ1dHRvblwiO1xuXHRcdH0sXG5cblx0XHRcInRleHRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHR2YXIgYXR0cjtcblx0XHRcdHJldHVybiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaW5wdXRcIiAmJlxuXHRcdFx0XHRlbGVtLnR5cGUgPT09IFwidGV4dFwiICYmXG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogSUU8OFxuXHRcdFx0XHQvLyBOZXcgSFRNTDUgYXR0cmlidXRlIHZhbHVlcyAoZS5nLiwgXCJzZWFyY2hcIikgYXBwZWFyIHdpdGggZWxlbS50eXBlID09PSBcInRleHRcIlxuXHRcdFx0XHQoICggYXR0ciA9IGVsZW0uZ2V0QXR0cmlidXRlKCBcInR5cGVcIiApICkgPT0gbnVsbCB8fFxuXHRcdFx0XHRcdGF0dHIudG9Mb3dlckNhc2UoKSA9PT0gXCJ0ZXh0XCIgKTtcblx0XHR9LFxuXG5cdFx0Ly8gUG9zaXRpb24taW4tY29sbGVjdGlvblxuXHRcdFwiZmlyc3RcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyggZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gWyAwIF07XG5cdFx0fSApLFxuXG5cdFx0XCJsYXN0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oIGZ1bmN0aW9uKCBfbWF0Y2hJbmRleGVzLCBsZW5ndGggKSB7XG5cdFx0XHRyZXR1cm4gWyBsZW5ndGggLSAxIF07XG5cdFx0fSApLFxuXG5cdFx0XCJlcVwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKCBmdW5jdGlvbiggX21hdGNoSW5kZXhlcywgbGVuZ3RoLCBhcmd1bWVudCApIHtcblx0XHRcdHJldHVybiBbIGFyZ3VtZW50IDwgMCA/IGFyZ3VtZW50ICsgbGVuZ3RoIDogYXJndW1lbnQgXTtcblx0XHR9ICksXG5cblx0XHRcImV2ZW5cIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyggZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoICkge1xuXHRcdFx0dmFyIGkgPSAwO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpICs9IDIgKSB7XG5cdFx0XHRcdG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF0Y2hJbmRleGVzO1xuXHRcdH0gKSxcblxuXHRcdFwib2RkXCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oIGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcblx0XHRcdHZhciBpID0gMTtcblx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSArPSAyICkge1xuXHRcdFx0XHRtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1hdGNoSW5kZXhlcztcblx0XHR9ICksXG5cblx0XHRcImx0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oIGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG5cdFx0XHR2YXIgaSA9IGFyZ3VtZW50IDwgMCA/XG5cdFx0XHRcdGFyZ3VtZW50ICsgbGVuZ3RoIDpcblx0XHRcdFx0YXJndW1lbnQgPiBsZW5ndGggP1xuXHRcdFx0XHRcdGxlbmd0aCA6XG5cdFx0XHRcdFx0YXJndW1lbnQ7XG5cdFx0XHRmb3IgKCA7IC0taSA+PSAwOyApIHtcblx0XHRcdFx0bWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYXRjaEluZGV4ZXM7XG5cdFx0fSApLFxuXG5cdFx0XCJndFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKCBmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGgsIGFyZ3VtZW50ICkge1xuXHRcdFx0dmFyIGkgPSBhcmd1bWVudCA8IDAgPyBhcmd1bWVudCArIGxlbmd0aCA6IGFyZ3VtZW50O1xuXHRcdFx0Zm9yICggOyArK2kgPCBsZW5ndGg7ICkge1xuXHRcdFx0XHRtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1hdGNoSW5kZXhlcztcblx0XHR9IClcblx0fVxufTtcblxuRXhwci5wc2V1ZG9zWyBcIm50aFwiIF0gPSBFeHByLnBzZXVkb3NbIFwiZXFcIiBdO1xuXG4vLyBBZGQgYnV0dG9uL2lucHV0IHR5cGUgcHNldWRvc1xuZm9yICggaSBpbiB7IHJhZGlvOiB0cnVlLCBjaGVja2JveDogdHJ1ZSwgZmlsZTogdHJ1ZSwgcGFzc3dvcmQ6IHRydWUsIGltYWdlOiB0cnVlIH0gKSB7XG5cdEV4cHIucHNldWRvc1sgaSBdID0gY3JlYXRlSW5wdXRQc2V1ZG8oIGkgKTtcbn1cbmZvciAoIGkgaW4geyBzdWJtaXQ6IHRydWUsIHJlc2V0OiB0cnVlIH0gKSB7XG5cdEV4cHIucHNldWRvc1sgaSBdID0gY3JlYXRlQnV0dG9uUHNldWRvKCBpICk7XG59XG5cbi8vIEVhc3kgQVBJIGZvciBjcmVhdGluZyBuZXcgc2V0RmlsdGVyc1xuZnVuY3Rpb24gc2V0RmlsdGVycygpIHt9XG5zZXRGaWx0ZXJzLnByb3RvdHlwZSA9IEV4cHIuZmlsdGVycyA9IEV4cHIucHNldWRvcztcbkV4cHIuc2V0RmlsdGVycyA9IG5ldyBzZXRGaWx0ZXJzKCk7XG5cbnRva2VuaXplID0gU2l6emxlLnRva2VuaXplID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBwYXJzZU9ubHkgKSB7XG5cdHZhciBtYXRjaGVkLCBtYXRjaCwgdG9rZW5zLCB0eXBlLFxuXHRcdHNvRmFyLCBncm91cHMsIHByZUZpbHRlcnMsXG5cdFx0Y2FjaGVkID0gdG9rZW5DYWNoZVsgc2VsZWN0b3IgKyBcIiBcIiBdO1xuXG5cdGlmICggY2FjaGVkICkge1xuXHRcdHJldHVybiBwYXJzZU9ubHkgPyAwIDogY2FjaGVkLnNsaWNlKCAwICk7XG5cdH1cblxuXHRzb0ZhciA9IHNlbGVjdG9yO1xuXHRncm91cHMgPSBbXTtcblx0cHJlRmlsdGVycyA9IEV4cHIucHJlRmlsdGVyO1xuXG5cdHdoaWxlICggc29GYXIgKSB7XG5cblx0XHQvLyBDb21tYSBhbmQgZmlyc3QgcnVuXG5cdFx0aWYgKCAhbWF0Y2hlZCB8fCAoIG1hdGNoID0gcmNvbW1hLmV4ZWMoIHNvRmFyICkgKSApIHtcblx0XHRcdGlmICggbWF0Y2ggKSB7XG5cblx0XHRcdFx0Ly8gRG9uJ3QgY29uc3VtZSB0cmFpbGluZyBjb21tYXMgYXMgdmFsaWRcblx0XHRcdFx0c29GYXIgPSBzb0Zhci5zbGljZSggbWF0Y2hbIDAgXS5sZW5ndGggKSB8fCBzb0Zhcjtcblx0XHRcdH1cblx0XHRcdGdyb3Vwcy5wdXNoKCAoIHRva2VucyA9IFtdICkgKTtcblx0XHR9XG5cblx0XHRtYXRjaGVkID0gZmFsc2U7XG5cblx0XHQvLyBDb21iaW5hdG9yc1xuXHRcdGlmICggKCBtYXRjaCA9IHJjb21iaW5hdG9ycy5leGVjKCBzb0ZhciApICkgKSB7XG5cdFx0XHRtYXRjaGVkID0gbWF0Y2guc2hpZnQoKTtcblx0XHRcdHRva2Vucy5wdXNoKCB7XG5cdFx0XHRcdHZhbHVlOiBtYXRjaGVkLFxuXG5cdFx0XHRcdC8vIENhc3QgZGVzY2VuZGFudCBjb21iaW5hdG9ycyB0byBzcGFjZVxuXHRcdFx0XHR0eXBlOiBtYXRjaFsgMCBdLnJlcGxhY2UoIHJ0cmltLCBcIiBcIiApXG5cdFx0XHR9ICk7XG5cdFx0XHRzb0ZhciA9IHNvRmFyLnNsaWNlKCBtYXRjaGVkLmxlbmd0aCApO1xuXHRcdH1cblxuXHRcdC8vIEZpbHRlcnNcblx0XHRmb3IgKCB0eXBlIGluIEV4cHIuZmlsdGVyICkge1xuXHRcdFx0aWYgKCAoIG1hdGNoID0gbWF0Y2hFeHByWyB0eXBlIF0uZXhlYyggc29GYXIgKSApICYmICggIXByZUZpbHRlcnNbIHR5cGUgXSB8fFxuXHRcdFx0XHQoIG1hdGNoID0gcHJlRmlsdGVyc1sgdHlwZSBdKCBtYXRjaCApICkgKSApIHtcblx0XHRcdFx0bWF0Y2hlZCA9IG1hdGNoLnNoaWZ0KCk7XG5cdFx0XHRcdHRva2Vucy5wdXNoKCB7XG5cdFx0XHRcdFx0dmFsdWU6IG1hdGNoZWQsXG5cdFx0XHRcdFx0dHlwZTogdHlwZSxcblx0XHRcdFx0XHRtYXRjaGVzOiBtYXRjaFxuXHRcdFx0XHR9ICk7XG5cdFx0XHRcdHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoZWQubGVuZ3RoICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCAhbWF0Y2hlZCApIHtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgbGVuZ3RoIG9mIHRoZSBpbnZhbGlkIGV4Y2Vzc1xuXHQvLyBpZiB3ZSdyZSBqdXN0IHBhcnNpbmdcblx0Ly8gT3RoZXJ3aXNlLCB0aHJvdyBhbiBlcnJvciBvciByZXR1cm4gdG9rZW5zXG5cdHJldHVybiBwYXJzZU9ubHkgP1xuXHRcdHNvRmFyLmxlbmd0aCA6XG5cdFx0c29GYXIgP1xuXHRcdFx0U2l6emxlLmVycm9yKCBzZWxlY3RvciApIDpcblxuXHRcdFx0Ly8gQ2FjaGUgdGhlIHRva2Vuc1xuXHRcdFx0dG9rZW5DYWNoZSggc2VsZWN0b3IsIGdyb3VwcyApLnNsaWNlKCAwICk7XG59O1xuXG5mdW5jdGlvbiB0b1NlbGVjdG9yKCB0b2tlbnMgKSB7XG5cdHZhciBpID0gMCxcblx0XHRsZW4gPSB0b2tlbnMubGVuZ3RoLFxuXHRcdHNlbGVjdG9yID0gXCJcIjtcblx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0c2VsZWN0b3IgKz0gdG9rZW5zWyBpIF0udmFsdWU7XG5cdH1cblx0cmV0dXJuIHNlbGVjdG9yO1xufVxuXG5mdW5jdGlvbiBhZGRDb21iaW5hdG9yKCBtYXRjaGVyLCBjb21iaW5hdG9yLCBiYXNlICkge1xuXHR2YXIgZGlyID0gY29tYmluYXRvci5kaXIsXG5cdFx0c2tpcCA9IGNvbWJpbmF0b3IubmV4dCxcblx0XHRrZXkgPSBza2lwIHx8IGRpcixcblx0XHRjaGVja05vbkVsZW1lbnRzID0gYmFzZSAmJiBrZXkgPT09IFwicGFyZW50Tm9kZVwiLFxuXHRcdGRvbmVOYW1lID0gZG9uZSsrO1xuXG5cdHJldHVybiBjb21iaW5hdG9yLmZpcnN0ID9cblxuXHRcdC8vIENoZWNrIGFnYWluc3QgY2xvc2VzdCBhbmNlc3Rvci9wcmVjZWRpbmcgZWxlbWVudFxuXHRcdGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHR3aGlsZSAoICggZWxlbSA9IGVsZW1bIGRpciBdICkgKSB7XG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzICkge1xuXHRcdFx0XHRcdHJldHVybiBtYXRjaGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0gOlxuXG5cdFx0Ly8gQ2hlY2sgYWdhaW5zdCBhbGwgYW5jZXN0b3IvcHJlY2VkaW5nIGVsZW1lbnRzXG5cdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdHZhciBvbGRDYWNoZSwgdW5pcXVlQ2FjaGUsIG91dGVyQ2FjaGUsXG5cdFx0XHRcdG5ld0NhY2hlID0gWyBkaXJydW5zLCBkb25lTmFtZSBdO1xuXG5cdFx0XHQvLyBXZSBjYW4ndCBzZXQgYXJiaXRyYXJ5IGRhdGEgb24gWE1MIG5vZGVzLCBzbyB0aGV5IGRvbid0IGJlbmVmaXQgZnJvbSBjb21iaW5hdG9yIGNhY2hpbmdcblx0XHRcdGlmICggeG1sICkge1xuXHRcdFx0XHR3aGlsZSAoICggZWxlbSA9IGVsZW1bIGRpciBdICkgKSB7XG5cdFx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGNoZWNrTm9uRWxlbWVudHMgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHdoaWxlICggKCBlbGVtID0gZWxlbVsgZGlyIF0gKSApIHtcblx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgY2hlY2tOb25FbGVtZW50cyApIHtcblx0XHRcdFx0XHRcdG91dGVyQ2FjaGUgPSBlbGVtWyBleHBhbmRvIF0gfHwgKCBlbGVtWyBleHBhbmRvIF0gPSB7fSApO1xuXG5cdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8OSBvbmx5XG5cdFx0XHRcdFx0XHQvLyBEZWZlbmQgYWdhaW5zdCBjbG9uZWQgYXR0cm9wZXJ0aWVzIChqUXVlcnkgZ2gtMTcwOSlcblx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlID0gb3V0ZXJDYWNoZVsgZWxlbS51bmlxdWVJRCBdIHx8XG5cdFx0XHRcdFx0XHRcdCggb3V0ZXJDYWNoZVsgZWxlbS51bmlxdWVJRCBdID0ge30gKTtcblxuXHRcdFx0XHRcdFx0aWYgKCBza2lwICYmIHNraXAgPT09IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSApIHtcblx0XHRcdFx0XHRcdFx0ZWxlbSA9IGVsZW1bIGRpciBdIHx8IGVsZW07XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCAoIG9sZENhY2hlID0gdW5pcXVlQ2FjaGVbIGtleSBdICkgJiZcblx0XHRcdFx0XHRcdFx0b2xkQ2FjaGVbIDAgXSA9PT0gZGlycnVucyAmJiBvbGRDYWNoZVsgMSBdID09PSBkb25lTmFtZSApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBBc3NpZ24gdG8gbmV3Q2FjaGUgc28gcmVzdWx0cyBiYWNrLXByb3BhZ2F0ZSB0byBwcmV2aW91cyBlbGVtZW50c1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKCBuZXdDYWNoZVsgMiBdID0gb2xkQ2FjaGVbIDIgXSApO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBSZXVzZSBuZXdjYWNoZSBzbyByZXN1bHRzIGJhY2stcHJvcGFnYXRlIHRvIHByZXZpb3VzIGVsZW1lbnRzXG5cdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlWyBrZXkgXSA9IG5ld0NhY2hlO1xuXG5cdFx0XHRcdFx0XHRcdC8vIEEgbWF0Y2ggbWVhbnMgd2UncmUgZG9uZTsgYSBmYWlsIG1lYW5zIHdlIGhhdmUgdG8ga2VlcCBjaGVja2luZ1xuXHRcdFx0XHRcdFx0XHRpZiAoICggbmV3Q2FjaGVbIDIgXSA9IG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xufVxuXG5mdW5jdGlvbiBlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKSB7XG5cdHJldHVybiBtYXRjaGVycy5sZW5ndGggPiAxID9cblx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0dmFyIGkgPSBtYXRjaGVycy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0aWYgKCAhbWF0Y2hlcnNbIGkgXSggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IDpcblx0XHRtYXRjaGVyc1sgMCBdO1xufVxuXG5mdW5jdGlvbiBtdWx0aXBsZUNvbnRleHRzKCBzZWxlY3RvciwgY29udGV4dHMsIHJlc3VsdHMgKSB7XG5cdHZhciBpID0gMCxcblx0XHRsZW4gPSBjb250ZXh0cy5sZW5ndGg7XG5cdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFNpenpsZSggc2VsZWN0b3IsIGNvbnRleHRzWyBpIF0sIHJlc3VsdHMgKTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0cztcbn1cblxuZnVuY3Rpb24gY29uZGVuc2UoIHVubWF0Y2hlZCwgbWFwLCBmaWx0ZXIsIGNvbnRleHQsIHhtbCApIHtcblx0dmFyIGVsZW0sXG5cdFx0bmV3VW5tYXRjaGVkID0gW10sXG5cdFx0aSA9IDAsXG5cdFx0bGVuID0gdW5tYXRjaGVkLmxlbmd0aCxcblx0XHRtYXBwZWQgPSBtYXAgIT0gbnVsbDtcblxuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRpZiAoICggZWxlbSA9IHVubWF0Y2hlZFsgaSBdICkgKSB7XG5cdFx0XHRpZiAoICFmaWx0ZXIgfHwgZmlsdGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcblx0XHRcdFx0bmV3VW5tYXRjaGVkLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0aWYgKCBtYXBwZWQgKSB7XG5cdFx0XHRcdFx0bWFwLnB1c2goIGkgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBuZXdVbm1hdGNoZWQ7XG59XG5cbmZ1bmN0aW9uIHNldE1hdGNoZXIoIHByZUZpbHRlciwgc2VsZWN0b3IsIG1hdGNoZXIsIHBvc3RGaWx0ZXIsIHBvc3RGaW5kZXIsIHBvc3RTZWxlY3RvciApIHtcblx0aWYgKCBwb3N0RmlsdGVyICYmICFwb3N0RmlsdGVyWyBleHBhbmRvIF0gKSB7XG5cdFx0cG9zdEZpbHRlciA9IHNldE1hdGNoZXIoIHBvc3RGaWx0ZXIgKTtcblx0fVxuXHRpZiAoIHBvc3RGaW5kZXIgJiYgIXBvc3RGaW5kZXJbIGV4cGFuZG8gXSApIHtcblx0XHRwb3N0RmluZGVyID0gc2V0TWF0Y2hlciggcG9zdEZpbmRlciwgcG9zdFNlbGVjdG9yICk7XG5cdH1cblx0cmV0dXJuIG1hcmtGdW5jdGlvbiggZnVuY3Rpb24oIHNlZWQsIHJlc3VsdHMsIGNvbnRleHQsIHhtbCApIHtcblx0XHR2YXIgdGVtcCwgaSwgZWxlbSxcblx0XHRcdHByZU1hcCA9IFtdLFxuXHRcdFx0cG9zdE1hcCA9IFtdLFxuXHRcdFx0cHJlZXhpc3RpbmcgPSByZXN1bHRzLmxlbmd0aCxcblxuXHRcdFx0Ly8gR2V0IGluaXRpYWwgZWxlbWVudHMgZnJvbSBzZWVkIG9yIGNvbnRleHRcblx0XHRcdGVsZW1zID0gc2VlZCB8fCBtdWx0aXBsZUNvbnRleHRzKFxuXHRcdFx0XHRzZWxlY3RvciB8fCBcIipcIixcblx0XHRcdFx0Y29udGV4dC5ub2RlVHlwZSA/IFsgY29udGV4dCBdIDogY29udGV4dCxcblx0XHRcdFx0W11cblx0XHRcdCksXG5cblx0XHRcdC8vIFByZWZpbHRlciB0byBnZXQgbWF0Y2hlciBpbnB1dCwgcHJlc2VydmluZyBhIG1hcCBmb3Igc2VlZC1yZXN1bHRzIHN5bmNocm9uaXphdGlvblxuXHRcdFx0bWF0Y2hlckluID0gcHJlRmlsdGVyICYmICggc2VlZCB8fCAhc2VsZWN0b3IgKSA/XG5cdFx0XHRcdGNvbmRlbnNlKCBlbGVtcywgcHJlTWFwLCBwcmVGaWx0ZXIsIGNvbnRleHQsIHhtbCApIDpcblx0XHRcdFx0ZWxlbXMsXG5cblx0XHRcdG1hdGNoZXJPdXQgPSBtYXRjaGVyID9cblxuXHRcdFx0XHQvLyBJZiB3ZSBoYXZlIGEgcG9zdEZpbmRlciwgb3IgZmlsdGVyZWQgc2VlZCwgb3Igbm9uLXNlZWQgcG9zdEZpbHRlciBvciBwcmVleGlzdGluZyByZXN1bHRzLFxuXHRcdFx0XHRwb3N0RmluZGVyIHx8ICggc2VlZCA/IHByZUZpbHRlciA6IHByZWV4aXN0aW5nIHx8IHBvc3RGaWx0ZXIgKSA/XG5cblx0XHRcdFx0XHQvLyAuLi5pbnRlcm1lZGlhdGUgcHJvY2Vzc2luZyBpcyBuZWNlc3Nhcnlcblx0XHRcdFx0XHRbXSA6XG5cblx0XHRcdFx0XHQvLyAuLi5vdGhlcndpc2UgdXNlIHJlc3VsdHMgZGlyZWN0bHlcblx0XHRcdFx0XHRyZXN1bHRzIDpcblx0XHRcdFx0bWF0Y2hlckluO1xuXG5cdFx0Ly8gRmluZCBwcmltYXJ5IG1hdGNoZXNcblx0XHRpZiAoIG1hdGNoZXIgKSB7XG5cdFx0XHRtYXRjaGVyKCBtYXRjaGVySW4sIG1hdGNoZXJPdXQsIGNvbnRleHQsIHhtbCApO1xuXHRcdH1cblxuXHRcdC8vIEFwcGx5IHBvc3RGaWx0ZXJcblx0XHRpZiAoIHBvc3RGaWx0ZXIgKSB7XG5cdFx0XHR0ZW1wID0gY29uZGVuc2UoIG1hdGNoZXJPdXQsIHBvc3RNYXAgKTtcblx0XHRcdHBvc3RGaWx0ZXIoIHRlbXAsIFtdLCBjb250ZXh0LCB4bWwgKTtcblxuXHRcdFx0Ly8gVW4tbWF0Y2ggZmFpbGluZyBlbGVtZW50cyBieSBtb3ZpbmcgdGhlbSBiYWNrIHRvIG1hdGNoZXJJblxuXHRcdFx0aSA9IHRlbXAubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdGlmICggKCBlbGVtID0gdGVtcFsgaSBdICkgKSB7XG5cdFx0XHRcdFx0bWF0Y2hlck91dFsgcG9zdE1hcFsgaSBdIF0gPSAhKCBtYXRjaGVySW5bIHBvc3RNYXBbIGkgXSBdID0gZWxlbSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCBzZWVkICkge1xuXHRcdFx0aWYgKCBwb3N0RmluZGVyIHx8IHByZUZpbHRlciApIHtcblx0XHRcdFx0aWYgKCBwb3N0RmluZGVyICkge1xuXG5cdFx0XHRcdFx0Ly8gR2V0IHRoZSBmaW5hbCBtYXRjaGVyT3V0IGJ5IGNvbmRlbnNpbmcgdGhpcyBpbnRlcm1lZGlhdGUgaW50byBwb3N0RmluZGVyIGNvbnRleHRzXG5cdFx0XHRcdFx0dGVtcCA9IFtdO1xuXHRcdFx0XHRcdGkgPSBtYXRjaGVyT3V0Lmxlbmd0aDtcblx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdGlmICggKCBlbGVtID0gbWF0Y2hlck91dFsgaSBdICkgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gUmVzdG9yZSBtYXRjaGVySW4gc2luY2UgZWxlbSBpcyBub3QgeWV0IGEgZmluYWwgbWF0Y2hcblx0XHRcdFx0XHRcdFx0dGVtcC5wdXNoKCAoIG1hdGNoZXJJblsgaSBdID0gZWxlbSApICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHBvc3RGaW5kZXIoIG51bGwsICggbWF0Y2hlck91dCA9IFtdICksIHRlbXAsIHhtbCApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gTW92ZSBtYXRjaGVkIGVsZW1lbnRzIGZyb20gc2VlZCB0byByZXN1bHRzIHRvIGtlZXAgdGhlbSBzeW5jaHJvbml6ZWRcblx0XHRcdFx0aSA9IG1hdGNoZXJPdXQubGVuZ3RoO1xuXHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRpZiAoICggZWxlbSA9IG1hdGNoZXJPdXRbIGkgXSApICYmXG5cdFx0XHRcdFx0XHQoIHRlbXAgPSBwb3N0RmluZGVyID8gaW5kZXhPZiggc2VlZCwgZWxlbSApIDogcHJlTWFwWyBpIF0gKSA+IC0xICkge1xuXG5cdFx0XHRcdFx0XHRzZWVkWyB0ZW1wIF0gPSAhKCByZXN1bHRzWyB0ZW1wIF0gPSBlbGVtICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHQvLyBBZGQgZWxlbWVudHMgdG8gcmVzdWx0cywgdGhyb3VnaCBwb3N0RmluZGVyIGlmIGRlZmluZWRcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWF0Y2hlck91dCA9IGNvbmRlbnNlKFxuXHRcdFx0XHRtYXRjaGVyT3V0ID09PSByZXN1bHRzID9cblx0XHRcdFx0XHRtYXRjaGVyT3V0LnNwbGljZSggcHJlZXhpc3RpbmcsIG1hdGNoZXJPdXQubGVuZ3RoICkgOlxuXHRcdFx0XHRcdG1hdGNoZXJPdXRcblx0XHRcdCk7XG5cdFx0XHRpZiAoIHBvc3RGaW5kZXIgKSB7XG5cdFx0XHRcdHBvc3RGaW5kZXIoIG51bGwsIHJlc3VsdHMsIG1hdGNoZXJPdXQsIHhtbCApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgbWF0Y2hlck91dCApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSApO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVyRnJvbVRva2VucyggdG9rZW5zICkge1xuXHR2YXIgY2hlY2tDb250ZXh0LCBtYXRjaGVyLCBqLFxuXHRcdGxlbiA9IHRva2Vucy5sZW5ndGgsXG5cdFx0bGVhZGluZ1JlbGF0aXZlID0gRXhwci5yZWxhdGl2ZVsgdG9rZW5zWyAwIF0udHlwZSBdLFxuXHRcdGltcGxpY2l0UmVsYXRpdmUgPSBsZWFkaW5nUmVsYXRpdmUgfHwgRXhwci5yZWxhdGl2ZVsgXCIgXCIgXSxcblx0XHRpID0gbGVhZGluZ1JlbGF0aXZlID8gMSA6IDAsXG5cblx0XHQvLyBUaGUgZm91bmRhdGlvbmFsIG1hdGNoZXIgZW5zdXJlcyB0aGF0IGVsZW1lbnRzIGFyZSByZWFjaGFibGUgZnJvbSB0b3AtbGV2ZWwgY29udGV4dChzKVxuXHRcdG1hdGNoQ29udGV4dCA9IGFkZENvbWJpbmF0b3IoIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0gPT09IGNoZWNrQ29udGV4dDtcblx0XHR9LCBpbXBsaWNpdFJlbGF0aXZlLCB0cnVlICksXG5cdFx0bWF0Y2hBbnlDb250ZXh0ID0gYWRkQ29tYmluYXRvciggZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gaW5kZXhPZiggY2hlY2tDb250ZXh0LCBlbGVtICkgPiAtMTtcblx0XHR9LCBpbXBsaWNpdFJlbGF0aXZlLCB0cnVlICksXG5cdFx0bWF0Y2hlcnMgPSBbIGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHR2YXIgcmV0ID0gKCAhbGVhZGluZ1JlbGF0aXZlICYmICggeG1sIHx8IGNvbnRleHQgIT09IG91dGVybW9zdENvbnRleHQgKSApIHx8IChcblx0XHRcdFx0KCBjaGVja0NvbnRleHQgPSBjb250ZXh0ICkubm9kZVR5cGUgP1xuXHRcdFx0XHRcdG1hdGNoQ29udGV4dCggZWxlbSwgY29udGV4dCwgeG1sICkgOlxuXHRcdFx0XHRcdG1hdGNoQW55Q29udGV4dCggZWxlbSwgY29udGV4dCwgeG1sICkgKTtcblxuXHRcdFx0Ly8gQXZvaWQgaGFuZ2luZyBvbnRvIGVsZW1lbnQgKGlzc3VlICMyOTkpXG5cdFx0XHRjaGVja0NvbnRleHQgPSBudWxsO1xuXHRcdFx0cmV0dXJuIHJldDtcblx0XHR9IF07XG5cblx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0aWYgKCAoIG1hdGNoZXIgPSBFeHByLnJlbGF0aXZlWyB0b2tlbnNbIGkgXS50eXBlIF0gKSApIHtcblx0XHRcdG1hdGNoZXJzID0gWyBhZGRDb21iaW5hdG9yKCBlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKSwgbWF0Y2hlciApIF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1hdGNoZXIgPSBFeHByLmZpbHRlclsgdG9rZW5zWyBpIF0udHlwZSBdLmFwcGx5KCBudWxsLCB0b2tlbnNbIGkgXS5tYXRjaGVzICk7XG5cblx0XHRcdC8vIFJldHVybiBzcGVjaWFsIHVwb24gc2VlaW5nIGEgcG9zaXRpb25hbCBtYXRjaGVyXG5cdFx0XHRpZiAoIG1hdGNoZXJbIGV4cGFuZG8gXSApIHtcblxuXHRcdFx0XHQvLyBGaW5kIHRoZSBuZXh0IHJlbGF0aXZlIG9wZXJhdG9yIChpZiBhbnkpIGZvciBwcm9wZXIgaGFuZGxpbmdcblx0XHRcdFx0aiA9ICsraTtcblx0XHRcdFx0Zm9yICggOyBqIDwgbGVuOyBqKysgKSB7XG5cdFx0XHRcdFx0aWYgKCBFeHByLnJlbGF0aXZlWyB0b2tlbnNbIGogXS50eXBlIF0gKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHNldE1hdGNoZXIoXG5cdFx0XHRcdFx0aSA+IDEgJiYgZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICksXG5cdFx0XHRcdFx0aSA+IDEgJiYgdG9TZWxlY3RvcihcblxuXHRcdFx0XHRcdC8vIElmIHRoZSBwcmVjZWRpbmcgdG9rZW4gd2FzIGEgZGVzY2VuZGFudCBjb21iaW5hdG9yLCBpbnNlcnQgYW4gaW1wbGljaXQgYW55LWVsZW1lbnQgYCpgXG5cdFx0XHRcdFx0dG9rZW5zXG5cdFx0XHRcdFx0XHQuc2xpY2UoIDAsIGkgLSAxIClcblx0XHRcdFx0XHRcdC5jb25jYXQoIHsgdmFsdWU6IHRva2Vuc1sgaSAtIDIgXS50eXBlID09PSBcIiBcIiA/IFwiKlwiIDogXCJcIiB9IClcblx0XHRcdFx0XHQpLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSxcblx0XHRcdFx0XHRtYXRjaGVyLFxuXHRcdFx0XHRcdGkgPCBqICYmIG1hdGNoZXJGcm9tVG9rZW5zKCB0b2tlbnMuc2xpY2UoIGksIGogKSApLFxuXHRcdFx0XHRcdGogPCBsZW4gJiYgbWF0Y2hlckZyb21Ub2tlbnMoICggdG9rZW5zID0gdG9rZW5zLnNsaWNlKCBqICkgKSApLFxuXHRcdFx0XHRcdGogPCBsZW4gJiYgdG9TZWxlY3RvciggdG9rZW5zIClcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdG1hdGNoZXJzLnB1c2goIG1hdGNoZXIgKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXJGcm9tR3JvdXBNYXRjaGVycyggZWxlbWVudE1hdGNoZXJzLCBzZXRNYXRjaGVycyApIHtcblx0dmFyIGJ5U2V0ID0gc2V0TWF0Y2hlcnMubGVuZ3RoID4gMCxcblx0XHRieUVsZW1lbnQgPSBlbGVtZW50TWF0Y2hlcnMubGVuZ3RoID4gMCxcblx0XHRzdXBlck1hdGNoZXIgPSBmdW5jdGlvbiggc2VlZCwgY29udGV4dCwgeG1sLCByZXN1bHRzLCBvdXRlcm1vc3QgKSB7XG5cdFx0XHR2YXIgZWxlbSwgaiwgbWF0Y2hlcixcblx0XHRcdFx0bWF0Y2hlZENvdW50ID0gMCxcblx0XHRcdFx0aSA9IFwiMFwiLFxuXHRcdFx0XHR1bm1hdGNoZWQgPSBzZWVkICYmIFtdLFxuXHRcdFx0XHRzZXRNYXRjaGVkID0gW10sXG5cdFx0XHRcdGNvbnRleHRCYWNrdXAgPSBvdXRlcm1vc3RDb250ZXh0LFxuXG5cdFx0XHRcdC8vIFdlIG11c3QgYWx3YXlzIGhhdmUgZWl0aGVyIHNlZWQgZWxlbWVudHMgb3Igb3V0ZXJtb3N0IGNvbnRleHRcblx0XHRcdFx0ZWxlbXMgPSBzZWVkIHx8IGJ5RWxlbWVudCAmJiBFeHByLmZpbmRbIFwiVEFHXCIgXSggXCIqXCIsIG91dGVybW9zdCApLFxuXG5cdFx0XHRcdC8vIFVzZSBpbnRlZ2VyIGRpcnJ1bnMgaWZmIHRoaXMgaXMgdGhlIG91dGVybW9zdCBtYXRjaGVyXG5cdFx0XHRcdGRpcnJ1bnNVbmlxdWUgPSAoIGRpcnJ1bnMgKz0gY29udGV4dEJhY2t1cCA9PSBudWxsID8gMSA6IE1hdGgucmFuZG9tKCkgfHwgMC4xICksXG5cdFx0XHRcdGxlbiA9IGVsZW1zLmxlbmd0aDtcblxuXHRcdFx0aWYgKCBvdXRlcm1vc3QgKSB7XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgMTErLCBFZGdlIDE3IC0gMTgrXG5cdFx0XHRcdC8vIElFL0VkZ2Ugc29tZXRpbWVzIHRocm93IGEgXCJQZXJtaXNzaW9uIGRlbmllZFwiIGVycm9yIHdoZW4gc3RyaWN0LWNvbXBhcmluZ1xuXHRcdFx0XHQvLyB0d28gZG9jdW1lbnRzOyBzaGFsbG93IGNvbXBhcmlzb25zIHdvcmsuXG5cdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcblx0XHRcdFx0b3V0ZXJtb3N0Q29udGV4dCA9IGNvbnRleHQgPT0gZG9jdW1lbnQgfHwgY29udGV4dCB8fCBvdXRlcm1vc3Q7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCBlbGVtZW50cyBwYXNzaW5nIGVsZW1lbnRNYXRjaGVycyBkaXJlY3RseSB0byByZXN1bHRzXG5cdFx0XHQvLyBTdXBwb3J0OiBJRTw5LCBTYWZhcmlcblx0XHRcdC8vIFRvbGVyYXRlIE5vZGVMaXN0IHByb3BlcnRpZXMgKElFOiBcImxlbmd0aFwiOyBTYWZhcmk6IDxudW1iZXI+KSBtYXRjaGluZyBlbGVtZW50cyBieSBpZFxuXHRcdFx0Zm9yICggOyBpICE9PSBsZW4gJiYgKCBlbGVtID0gZWxlbXNbIGkgXSApICE9IG51bGw7IGkrKyApIHtcblx0XHRcdFx0aWYgKCBieUVsZW1lbnQgJiYgZWxlbSApIHtcblx0XHRcdFx0XHRqID0gMDtcblxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDExKywgRWRnZSAxNyAtIDE4K1xuXHRcdFx0XHRcdC8vIElFL0VkZ2Ugc29tZXRpbWVzIHRocm93IGEgXCJQZXJtaXNzaW9uIGRlbmllZFwiIGVycm9yIHdoZW4gc3RyaWN0LWNvbXBhcmluZ1xuXHRcdFx0XHRcdC8vIHR3byBkb2N1bWVudHM7IHNoYWxsb3cgY29tcGFyaXNvbnMgd29yay5cblx0XHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG5cdFx0XHRcdFx0aWYgKCAhY29udGV4dCAmJiBlbGVtLm93bmVyRG9jdW1lbnQgIT0gZG9jdW1lbnQgKSB7XG5cdFx0XHRcdFx0XHRzZXREb2N1bWVudCggZWxlbSApO1xuXHRcdFx0XHRcdFx0eG1sID0gIWRvY3VtZW50SXNIVE1MO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR3aGlsZSAoICggbWF0Y2hlciA9IGVsZW1lbnRNYXRjaGVyc1sgaisrIF0gKSApIHtcblx0XHRcdFx0XHRcdGlmICggbWF0Y2hlciggZWxlbSwgY29udGV4dCB8fCBkb2N1bWVudCwgeG1sICkgKSB7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdHMucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCBvdXRlcm1vc3QgKSB7XG5cdFx0XHRcdFx0XHRkaXJydW5zID0gZGlycnVuc1VuaXF1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBUcmFjayB1bm1hdGNoZWQgZWxlbWVudHMgZm9yIHNldCBmaWx0ZXJzXG5cdFx0XHRcdGlmICggYnlTZXQgKSB7XG5cblx0XHRcdFx0XHQvLyBUaGV5IHdpbGwgaGF2ZSBnb25lIHRocm91Z2ggYWxsIHBvc3NpYmxlIG1hdGNoZXJzXG5cdFx0XHRcdFx0aWYgKCAoIGVsZW0gPSAhbWF0Y2hlciAmJiBlbGVtICkgKSB7XG5cdFx0XHRcdFx0XHRtYXRjaGVkQ291bnQtLTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBMZW5ndGhlbiB0aGUgYXJyYXkgZm9yIGV2ZXJ5IGVsZW1lbnQsIG1hdGNoZWQgb3Igbm90XG5cdFx0XHRcdFx0aWYgKCBzZWVkICkge1xuXHRcdFx0XHRcdFx0dW5tYXRjaGVkLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gYGlgIGlzIG5vdyB0aGUgY291bnQgb2YgZWxlbWVudHMgdmlzaXRlZCBhYm92ZSwgYW5kIGFkZGluZyBpdCB0byBgbWF0Y2hlZENvdW50YFxuXHRcdFx0Ly8gbWFrZXMgdGhlIGxhdHRlciBub25uZWdhdGl2ZS5cblx0XHRcdG1hdGNoZWRDb3VudCArPSBpO1xuXG5cdFx0XHQvLyBBcHBseSBzZXQgZmlsdGVycyB0byB1bm1hdGNoZWQgZWxlbWVudHNcblx0XHRcdC8vIE5PVEU6IFRoaXMgY2FuIGJlIHNraXBwZWQgaWYgdGhlcmUgYXJlIG5vIHVubWF0Y2hlZCBlbGVtZW50cyAoaS5lLiwgYG1hdGNoZWRDb3VudGBcblx0XHRcdC8vIGVxdWFscyBgaWApLCB1bmxlc3Mgd2UgZGlkbid0IHZpc2l0IF9hbnlfIGVsZW1lbnRzIGluIHRoZSBhYm92ZSBsb29wIGJlY2F1c2Ugd2UgaGF2ZVxuXHRcdFx0Ly8gbm8gZWxlbWVudCBtYXRjaGVycyBhbmQgbm8gc2VlZC5cblx0XHRcdC8vIEluY3JlbWVudGluZyBhbiBpbml0aWFsbHktc3RyaW5nIFwiMFwiIGBpYCBhbGxvd3MgYGlgIHRvIHJlbWFpbiBhIHN0cmluZyBvbmx5IGluIHRoYXRcblx0XHRcdC8vIGNhc2UsIHdoaWNoIHdpbGwgcmVzdWx0IGluIGEgXCIwMFwiIGBtYXRjaGVkQ291bnRgIHRoYXQgZGlmZmVycyBmcm9tIGBpYCBidXQgaXMgYWxzb1xuXHRcdFx0Ly8gbnVtZXJpY2FsbHkgemVyby5cblx0XHRcdGlmICggYnlTZXQgJiYgaSAhPT0gbWF0Y2hlZENvdW50ICkge1xuXHRcdFx0XHRqID0gMDtcblx0XHRcdFx0d2hpbGUgKCAoIG1hdGNoZXIgPSBzZXRNYXRjaGVyc1sgaisrIF0gKSApIHtcblx0XHRcdFx0XHRtYXRjaGVyKCB1bm1hdGNoZWQsIHNldE1hdGNoZWQsIGNvbnRleHQsIHhtbCApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCBzZWVkICkge1xuXG5cdFx0XHRcdFx0Ly8gUmVpbnRlZ3JhdGUgZWxlbWVudCBtYXRjaGVzIHRvIGVsaW1pbmF0ZSB0aGUgbmVlZCBmb3Igc29ydGluZ1xuXHRcdFx0XHRcdGlmICggbWF0Y2hlZENvdW50ID4gMCApIHtcblx0XHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoICEoIHVubWF0Y2hlZFsgaSBdIHx8IHNldE1hdGNoZWRbIGkgXSApICkge1xuXHRcdFx0XHRcdFx0XHRcdHNldE1hdGNoZWRbIGkgXSA9IHBvcC5jYWxsKCByZXN1bHRzICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBEaXNjYXJkIGluZGV4IHBsYWNlaG9sZGVyIHZhbHVlcyB0byBnZXQgb25seSBhY3R1YWwgbWF0Y2hlc1xuXHRcdFx0XHRcdHNldE1hdGNoZWQgPSBjb25kZW5zZSggc2V0TWF0Y2hlZCApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQWRkIG1hdGNoZXMgdG8gcmVzdWx0c1xuXHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBzZXRNYXRjaGVkICk7XG5cblx0XHRcdFx0Ly8gU2VlZGxlc3Mgc2V0IG1hdGNoZXMgc3VjY2VlZGluZyBtdWx0aXBsZSBzdWNjZXNzZnVsIG1hdGNoZXJzIHN0aXB1bGF0ZSBzb3J0aW5nXG5cdFx0XHRcdGlmICggb3V0ZXJtb3N0ICYmICFzZWVkICYmIHNldE1hdGNoZWQubGVuZ3RoID4gMCAmJlxuXHRcdFx0XHRcdCggbWF0Y2hlZENvdW50ICsgc2V0TWF0Y2hlcnMubGVuZ3RoICkgPiAxICkge1xuXG5cdFx0XHRcdFx0U2l6emxlLnVuaXF1ZVNvcnQoIHJlc3VsdHMgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBPdmVycmlkZSBtYW5pcHVsYXRpb24gb2YgZ2xvYmFscyBieSBuZXN0ZWQgbWF0Y2hlcnNcblx0XHRcdGlmICggb3V0ZXJtb3N0ICkge1xuXHRcdFx0XHRkaXJydW5zID0gZGlycnVuc1VuaXF1ZTtcblx0XHRcdFx0b3V0ZXJtb3N0Q29udGV4dCA9IGNvbnRleHRCYWNrdXA7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB1bm1hdGNoZWQ7XG5cdFx0fTtcblxuXHRyZXR1cm4gYnlTZXQgP1xuXHRcdG1hcmtGdW5jdGlvbiggc3VwZXJNYXRjaGVyICkgOlxuXHRcdHN1cGVyTWF0Y2hlcjtcbn1cblxuY29tcGlsZSA9IFNpenpsZS5jb21waWxlID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBtYXRjaCAvKiBJbnRlcm5hbCBVc2UgT25seSAqLyApIHtcblx0dmFyIGksXG5cdFx0c2V0TWF0Y2hlcnMgPSBbXSxcblx0XHRlbGVtZW50TWF0Y2hlcnMgPSBbXSxcblx0XHRjYWNoZWQgPSBjb21waWxlckNhY2hlWyBzZWxlY3RvciArIFwiIFwiIF07XG5cblx0aWYgKCAhY2FjaGVkICkge1xuXG5cdFx0Ly8gR2VuZXJhdGUgYSBmdW5jdGlvbiBvZiByZWN1cnNpdmUgZnVuY3Rpb25zIHRoYXQgY2FuIGJlIHVzZWQgdG8gY2hlY2sgZWFjaCBlbGVtZW50XG5cdFx0aWYgKCAhbWF0Y2ggKSB7XG5cdFx0XHRtYXRjaCA9IHRva2VuaXplKCBzZWxlY3RvciApO1xuXHRcdH1cblx0XHRpID0gbWF0Y2gubGVuZ3RoO1xuXHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0Y2FjaGVkID0gbWF0Y2hlckZyb21Ub2tlbnMoIG1hdGNoWyBpIF0gKTtcblx0XHRcdGlmICggY2FjaGVkWyBleHBhbmRvIF0gKSB7XG5cdFx0XHRcdHNldE1hdGNoZXJzLnB1c2goIGNhY2hlZCApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWxlbWVudE1hdGNoZXJzLnB1c2goIGNhY2hlZCApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENhY2hlIHRoZSBjb21waWxlZCBmdW5jdGlvblxuXHRcdGNhY2hlZCA9IGNvbXBpbGVyQ2FjaGUoXG5cdFx0XHRzZWxlY3Rvcixcblx0XHRcdG1hdGNoZXJGcm9tR3JvdXBNYXRjaGVycyggZWxlbWVudE1hdGNoZXJzLCBzZXRNYXRjaGVycyApXG5cdFx0KTtcblxuXHRcdC8vIFNhdmUgc2VsZWN0b3IgYW5kIHRva2VuaXphdGlvblxuXHRcdGNhY2hlZC5zZWxlY3RvciA9IHNlbGVjdG9yO1xuXHR9XG5cdHJldHVybiBjYWNoZWQ7XG59O1xuXG4vKipcbiAqIEEgbG93LWxldmVsIHNlbGVjdGlvbiBmdW5jdGlvbiB0aGF0IHdvcmtzIHdpdGggU2l6emxlJ3MgY29tcGlsZWRcbiAqICBzZWxlY3RvciBmdW5jdGlvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSBzZWxlY3RvciBBIHNlbGVjdG9yIG9yIGEgcHJlLWNvbXBpbGVkXG4gKiAgc2VsZWN0b3IgZnVuY3Rpb24gYnVpbHQgd2l0aCBTaXp6bGUuY29tcGlsZVxuICogQHBhcmFtIHtFbGVtZW50fSBjb250ZXh0XG4gKiBAcGFyYW0ge0FycmF5fSBbcmVzdWx0c11cbiAqIEBwYXJhbSB7QXJyYXl9IFtzZWVkXSBBIHNldCBvZiBlbGVtZW50cyB0byBtYXRjaCBhZ2FpbnN0XG4gKi9cbnNlbGVjdCA9IFNpenpsZS5zZWxlY3QgPSBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQsIHJlc3VsdHMsIHNlZWQgKSB7XG5cdHZhciBpLCB0b2tlbnMsIHRva2VuLCB0eXBlLCBmaW5kLFxuXHRcdGNvbXBpbGVkID0gdHlwZW9mIHNlbGVjdG9yID09PSBcImZ1bmN0aW9uXCIgJiYgc2VsZWN0b3IsXG5cdFx0bWF0Y2ggPSAhc2VlZCAmJiB0b2tlbml6ZSggKCBzZWxlY3RvciA9IGNvbXBpbGVkLnNlbGVjdG9yIHx8IHNlbGVjdG9yICkgKTtcblxuXHRyZXN1bHRzID0gcmVzdWx0cyB8fCBbXTtcblxuXHQvLyBUcnkgdG8gbWluaW1pemUgb3BlcmF0aW9ucyBpZiB0aGVyZSBpcyBvbmx5IG9uZSBzZWxlY3RvciBpbiB0aGUgbGlzdCBhbmQgbm8gc2VlZFxuXHQvLyAodGhlIGxhdHRlciBvZiB3aGljaCBndWFyYW50ZWVzIHVzIGNvbnRleHQpXG5cdGlmICggbWF0Y2gubGVuZ3RoID09PSAxICkge1xuXG5cdFx0Ly8gUmVkdWNlIGNvbnRleHQgaWYgdGhlIGxlYWRpbmcgY29tcG91bmQgc2VsZWN0b3IgaXMgYW4gSURcblx0XHR0b2tlbnMgPSBtYXRjaFsgMCBdID0gbWF0Y2hbIDAgXS5zbGljZSggMCApO1xuXHRcdGlmICggdG9rZW5zLmxlbmd0aCA+IDIgJiYgKCB0b2tlbiA9IHRva2Vuc1sgMCBdICkudHlwZSA9PT0gXCJJRFwiICYmXG5cdFx0XHRjb250ZXh0Lm5vZGVUeXBlID09PSA5ICYmIGRvY3VtZW50SXNIVE1MICYmIEV4cHIucmVsYXRpdmVbIHRva2Vuc1sgMSBdLnR5cGUgXSApIHtcblxuXHRcdFx0Y29udGV4dCA9ICggRXhwci5maW5kWyBcIklEXCIgXSggdG9rZW4ubWF0Y2hlc1sgMCBdXG5cdFx0XHRcdC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLCBjb250ZXh0ICkgfHwgW10gKVsgMCBdO1xuXHRcdFx0aWYgKCAhY29udGV4dCApIHtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cblx0XHRcdC8vIFByZWNvbXBpbGVkIG1hdGNoZXJzIHdpbGwgc3RpbGwgdmVyaWZ5IGFuY2VzdHJ5LCBzbyBzdGVwIHVwIGEgbGV2ZWxcblx0XHRcdH0gZWxzZSBpZiAoIGNvbXBpbGVkICkge1xuXHRcdFx0XHRjb250ZXh0ID0gY29udGV4dC5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRzZWxlY3RvciA9IHNlbGVjdG9yLnNsaWNlKCB0b2tlbnMuc2hpZnQoKS52YWx1ZS5sZW5ndGggKTtcblx0XHR9XG5cblx0XHQvLyBGZXRjaCBhIHNlZWQgc2V0IGZvciByaWdodC10by1sZWZ0IG1hdGNoaW5nXG5cdFx0aSA9IG1hdGNoRXhwclsgXCJuZWVkc0NvbnRleHRcIiBdLnRlc3QoIHNlbGVjdG9yICkgPyAwIDogdG9rZW5zLmxlbmd0aDtcblx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdHRva2VuID0gdG9rZW5zWyBpIF07XG5cblx0XHRcdC8vIEFib3J0IGlmIHdlIGhpdCBhIGNvbWJpbmF0b3Jcblx0XHRcdGlmICggRXhwci5yZWxhdGl2ZVsgKCB0eXBlID0gdG9rZW4udHlwZSApIF0gKSB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCAoIGZpbmQgPSBFeHByLmZpbmRbIHR5cGUgXSApICkge1xuXG5cdFx0XHRcdC8vIFNlYXJjaCwgZXhwYW5kaW5nIGNvbnRleHQgZm9yIGxlYWRpbmcgc2libGluZyBjb21iaW5hdG9yc1xuXHRcdFx0XHRpZiAoICggc2VlZCA9IGZpbmQoXG5cdFx0XHRcdFx0dG9rZW4ubWF0Y2hlc1sgMCBdLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICksXG5cdFx0XHRcdFx0cnNpYmxpbmcudGVzdCggdG9rZW5zWyAwIF0udHlwZSApICYmIHRlc3RDb250ZXh0KCBjb250ZXh0LnBhcmVudE5vZGUgKSB8fFxuXHRcdFx0XHRcdFx0Y29udGV4dFxuXHRcdFx0XHQpICkgKSB7XG5cblx0XHRcdFx0XHQvLyBJZiBzZWVkIGlzIGVtcHR5IG9yIG5vIHRva2VucyByZW1haW4sIHdlIGNhbiByZXR1cm4gZWFybHlcblx0XHRcdFx0XHR0b2tlbnMuc3BsaWNlKCBpLCAxICk7XG5cdFx0XHRcdFx0c2VsZWN0b3IgPSBzZWVkLmxlbmd0aCAmJiB0b1NlbGVjdG9yKCB0b2tlbnMgKTtcblx0XHRcdFx0XHRpZiAoICFzZWxlY3RvciApIHtcblx0XHRcdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIHNlZWQgKTtcblx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ29tcGlsZSBhbmQgZXhlY3V0ZSBhIGZpbHRlcmluZyBmdW5jdGlvbiBpZiBvbmUgaXMgbm90IHByb3ZpZGVkXG5cdC8vIFByb3ZpZGUgYG1hdGNoYCB0byBhdm9pZCByZXRva2VuaXphdGlvbiBpZiB3ZSBtb2RpZmllZCB0aGUgc2VsZWN0b3IgYWJvdmVcblx0KCBjb21waWxlZCB8fCBjb21waWxlKCBzZWxlY3RvciwgbWF0Y2ggKSApKFxuXHRcdHNlZWQsXG5cdFx0Y29udGV4dCxcblx0XHQhZG9jdW1lbnRJc0hUTUwsXG5cdFx0cmVzdWx0cyxcblx0XHQhY29udGV4dCB8fCByc2libGluZy50ZXN0KCBzZWxlY3RvciApICYmIHRlc3RDb250ZXh0KCBjb250ZXh0LnBhcmVudE5vZGUgKSB8fCBjb250ZXh0XG5cdCk7XG5cdHJldHVybiByZXN1bHRzO1xufTtcblxuLy8gT25lLXRpbWUgYXNzaWdubWVudHNcblxuLy8gU29ydCBzdGFiaWxpdHlcbnN1cHBvcnQuc29ydFN0YWJsZSA9IGV4cGFuZG8uc3BsaXQoIFwiXCIgKS5zb3J0KCBzb3J0T3JkZXIgKS5qb2luKCBcIlwiICkgPT09IGV4cGFuZG87XG5cbi8vIFN1cHBvcnQ6IENocm9tZSAxNC0zNStcbi8vIEFsd2F5cyBhc3N1bWUgZHVwbGljYXRlcyBpZiB0aGV5IGFyZW4ndCBwYXNzZWQgdG8gdGhlIGNvbXBhcmlzb24gZnVuY3Rpb25cbnN1cHBvcnQuZGV0ZWN0RHVwbGljYXRlcyA9ICEhaGFzRHVwbGljYXRlO1xuXG4vLyBJbml0aWFsaXplIGFnYWluc3QgdGhlIGRlZmF1bHQgZG9jdW1lbnRcbnNldERvY3VtZW50KCk7XG5cbi8vIFN1cHBvcnQ6IFdlYmtpdDw1MzcuMzIgLSBTYWZhcmkgNi4wLjMvQ2hyb21lIDI1IChmaXhlZCBpbiBDaHJvbWUgMjcpXG4vLyBEZXRhY2hlZCBub2RlcyBjb25mb3VuZGluZ2x5IGZvbGxvdyAqZWFjaCBvdGhlcipcbnN1cHBvcnQuc29ydERldGFjaGVkID0gYXNzZXJ0KCBmdW5jdGlvbiggZWwgKSB7XG5cblx0Ly8gU2hvdWxkIHJldHVybiAxLCBidXQgcmV0dXJucyA0IChmb2xsb3dpbmcpXG5cdHJldHVybiBlbC5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJmaWVsZHNldFwiICkgKSAmIDE7XG59ICk7XG5cbi8vIFN1cHBvcnQ6IElFPDhcbi8vIFByZXZlbnQgYXR0cmlidXRlL3Byb3BlcnR5IFwiaW50ZXJwb2xhdGlvblwiXG4vLyBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zNTM2NDI5JTI4VlMuODUlMjkuYXNweFxuaWYgKCAhYXNzZXJ0KCBmdW5jdGlvbiggZWwgKSB7XG5cdGVsLmlubmVySFRNTCA9IFwiPGEgaHJlZj0nIyc+PC9hPlwiO1xuXHRyZXR1cm4gZWwuZmlyc3RDaGlsZC5nZXRBdHRyaWJ1dGUoIFwiaHJlZlwiICkgPT09IFwiI1wiO1xufSApICkge1xuXHRhZGRIYW5kbGUoIFwidHlwZXxocmVmfGhlaWdodHx3aWR0aFwiLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG5cdFx0aWYgKCAhaXNYTUwgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUsIG5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJ0eXBlXCIgPyAxIDogMiApO1xuXHRcdH1cblx0fSApO1xufVxuXG4vLyBTdXBwb3J0OiBJRTw5XG4vLyBVc2UgZGVmYXVsdFZhbHVlIGluIHBsYWNlIG9mIGdldEF0dHJpYnV0ZShcInZhbHVlXCIpXG5pZiAoICFzdXBwb3J0LmF0dHJpYnV0ZXMgfHwgIWFzc2VydCggZnVuY3Rpb24oIGVsICkge1xuXHRlbC5pbm5lckhUTUwgPSBcIjxpbnB1dC8+XCI7XG5cdGVsLmZpcnN0Q2hpbGQuc2V0QXR0cmlidXRlKCBcInZhbHVlXCIsIFwiXCIgKTtcblx0cmV0dXJuIGVsLmZpcnN0Q2hpbGQuZ2V0QXR0cmlidXRlKCBcInZhbHVlXCIgKSA9PT0gXCJcIjtcbn0gKSApIHtcblx0YWRkSGFuZGxlKCBcInZhbHVlXCIsIGZ1bmN0aW9uKCBlbGVtLCBfbmFtZSwgaXNYTUwgKSB7XG5cdFx0aWYgKCAhaXNYTUwgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5kZWZhdWx0VmFsdWU7XG5cdFx0fVxuXHR9ICk7XG59XG5cbi8vIFN1cHBvcnQ6IElFPDlcbi8vIFVzZSBnZXRBdHRyaWJ1dGVOb2RlIHRvIGZldGNoIGJvb2xlYW5zIHdoZW4gZ2V0QXR0cmlidXRlIGxpZXNcbmlmICggIWFzc2VydCggZnVuY3Rpb24oIGVsICkge1xuXHRyZXR1cm4gZWwuZ2V0QXR0cmlidXRlKCBcImRpc2FibGVkXCIgKSA9PSBudWxsO1xufSApICkge1xuXHRhZGRIYW5kbGUoIGJvb2xlYW5zLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG5cdFx0dmFyIHZhbDtcblx0XHRpZiAoICFpc1hNTCApIHtcblx0XHRcdHJldHVybiBlbGVtWyBuYW1lIF0gPT09IHRydWUgPyBuYW1lLnRvTG93ZXJDYXNlKCkgOlxuXHRcdFx0XHQoIHZhbCA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZSggbmFtZSApICkgJiYgdmFsLnNwZWNpZmllZCA/XG5cdFx0XHRcdFx0dmFsLnZhbHVlIDpcblx0XHRcdFx0XHRudWxsO1xuXHRcdH1cblx0fSApO1xufVxuXG4vLyBFWFBPU0VcbnZhciBfc2l6emxlID0gd2luZG93LlNpenpsZTtcblxuU2l6emxlLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcblx0aWYgKCB3aW5kb3cuU2l6emxlID09PSBTaXp6bGUgKSB7XG5cdFx0d2luZG93LlNpenpsZSA9IF9zaXp6bGU7XG5cdH1cblxuXHRyZXR1cm4gU2l6emxlO1xufTtcblxuaWYgKCB0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCApIHtcblx0ZGVmaW5lKCBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gU2l6emxlO1xuXHR9ICk7XG5cbi8vIFNpenpsZSByZXF1aXJlcyB0aGF0IHRoZXJlIGJlIGEgZ2xvYmFsIHdpbmRvdyBpbiBDb21tb24tSlMgbGlrZSBlbnZpcm9ubWVudHNcbn0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgIT09IFwidW5kZWZpbmVkXCIgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gU2l6emxlO1xufSBlbHNlIHtcblx0d2luZG93LlNpenpsZSA9IFNpenpsZTtcbn1cblxuLy8gRVhQT1NFXG5cbn0gKSggd2luZG93ICk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3NpenpsZS9kaXN0L3NpenpsZS5qcyIsImV4cG9ydCB7IGRlZmF1bHQgYXMgc2VsZWN0LCBnZXRTaW5nbGVTZWxlY3RvciwgZ2V0TXVsdGlTZWxlY3RvciB9IGZyb20gJy4vc2VsZWN0J1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBtYXRjaCwgaW5pdE9wdGlvbnMgfSBmcm9tICcuL21hdGNoJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBvcHRpbWl6ZSB9IGZyb20gJy4vb3B0aW1pemUnXG5leHBvcnQgKiBhcyBjb21tb24gZnJvbSAnLi9jb21tb24nXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9