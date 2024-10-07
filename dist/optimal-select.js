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
exports.combinations = exports.initOptions = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * # Match
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * Retrieve selector for a node.
                                                                                                                                                                                                                                                                   */

exports.default = match;

var _pattern = __webpack_require__(2);

var _selector = __webpack_require__(3);

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
/* 2 */
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
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCommonProperties = exports.getCommonAncestor = undefined;

var _match = __webpack_require__(1);

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
        var attributeName = (0, _match.escapeValue)(attribute && attribute.name);
        var attributeValue = (0, _match.escapeValue)(attribute && attribute.value);
        var useNamedIgnore = attributeName !== 'class';
        var currentIgnore = useNamedIgnore && ignore[attributeName] || ignore.attribute;
        var currentDefaultIgnore = useNamedIgnore && _match.defaultIgnore[attributeName] || _match.defaultIgnore.attribute;
        if (attribute && attributeName !== 'class' && !(0, _match.checkIgnore)(currentIgnore, attributeName, attributeValue, currentDefaultIgnore)) {
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

var _selector = __webpack_require__(3);

var _pattern2 = __webpack_require__(2);

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

var _match = __webpack_require__(1);

var _match2 = _interopRequireDefault(_match);

var _optimize = __webpack_require__(5);

var _optimize2 = _interopRequireDefault(_optimize);

var _utilities = __webpack_require__(0);

var _common = __webpack_require__(4);

var _selector = __webpack_require__(3);

var _pattern = __webpack_require__(2);

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

var _match = __webpack_require__(1);

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

var _common2 = __webpack_require__(4);

var _common = _interopRequireWildcard(_common2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.common = _common;

/***/ }
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0ZDU5MWYxN2YyMmVlOTVjOGFhMSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbGl0aWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9tYXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGF0dGVybi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3B0aW1pemUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L3NpenpsZS9kaXN0L3NpenpsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiY29udmVydE5vZGVMaXN0Iiwibm9kZXMiLCJsZW5ndGgiLCJhcnIiLCJBcnJheSIsImkiLCJlc2NhcGVWYWx1ZSIsInZhbHVlIiwicmVwbGFjZSIsInBhcnRpdGlvbiIsImFycmF5IiwicHJlZGljYXRlIiwicmVkdWNlIiwiaXRlbSIsImlubmVyIiwib3V0ZXIiLCJjb25jYXQiLCJpc1ZhbGlkQ1NTSWRlbnRpZmllciIsInRlc3QiLCJtYXRjaCIsImRlZmF1bHRJZ25vcmUiLCJhdHRyaWJ1dGUiLCJhdHRyaWJ1dGVOYW1lIiwiaW5kZXhPZiIsImNvbnRhaW5zIiwiaW5pdE9wdGlvbnMiLCJvcHRpb25zIiwicm9vdCIsImRvY3VtZW50Iiwic2tpcCIsInByaW9yaXR5IiwiaWdub3JlIiwibm9kZSIsIm5lc3RlZCIsImZvcm1hdCIsInBhdGgiLCJlbGVtZW50Iiwic2VsZWN0IiwidG9TdHJpbmciLCJza2lwQ29tcGFyZSIsImlzQXJyYXkiLCJtYXAiLCJlbnRyeSIsInNraXBDaGVja3MiLCJzb21lIiwiY29tcGFyZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwidHlwZSIsIlJlZ0V4cCIsIm5hbWUiLCJub2RlVHlwZSIsImNoZWNrQXR0cmlidXRlcyIsImNoZWNrVGFnIiwiaW5jbHVkZXMiLCJjaGVja1JlY3Vyc2l2ZURlc2NlbmRhbnRzIiwiY2hlY2tUZXh0IiwiY2hlY2tOdGhDaGlsZCIsInBhcmVudE5vZGUiLCJwYXR0ZXJuIiwiZmluZFBhdHRlcm4iLCJ1bnNoaWZ0IiwicGFyZW50IiwiZmluZEF0dHJpYnV0ZXNQYXR0ZXJuIiwiY29tYmluYXRpb25zIiwidmFsdWVzIiwibWluIiwibWF4IiwicmVzdWx0IiwiciIsInB1c2giLCJ2Iiwic2hpZnQiLCJmaWx0ZXIiLCJtYXhTdWJzZXRTaXplIiwiaXRlbXMiLCJnZXRDbGFzc1NlbGVjdG9yIiwiY2xhc3NlcyIsImJhc2UiLCJmaW5kIiwibWF0Y2hlcyIsImF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGVOYW1lcyIsInZhbCIsImEiLCJzb3J0ZWRLZXlzIiwidGFnIiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwiaXNPcHRpbWFsIiwibCIsImtleSIsImF0dHJpYnV0ZVZhbHVlIiwidXNlTmFtZWRJZ25vcmUiLCJjdXJyZW50SWdub3JlIiwiY3VycmVudERlZmF1bHRJZ25vcmUiLCJjaGVja0lnbm9yZSIsImNsYXNzTmFtZXMiLCJ0cmltIiwic3BsaXQiLCJjbGFzc0lnbm9yZSIsImNsYXNzIiwiY2xhc3NOYW1lIiwiZmluZFRhZ1BhdHRlcm4iLCJjaGlsZHJlbiIsImNoaWxkIiwiY2hpbGRQYXR0ZXJuIiwiY29uc29sZSIsIndhcm4iLCJyZWxhdGVzIiwicHNldWRvIiwidGV4dENvbnRlbnQiLCJmaXJzdENoaWxkIiwibm9kZVZhbHVlIiwidGV4dHMiLCJ0ZXh0IiwiZGVzY2VuZGFudHMiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImRlc2NlbmRhbnRQYXRoIiwicCIsInN0YXJ0c1dpdGgiLCJwYXJlbnRFbGVtZW50IiwiZGVmYXVsdFByZWRpY2F0ZSIsImNoZWNrIiwiY3JlYXRlUGF0dGVybiIsImF0dHJpYnV0ZXNUb1NlbGVjdG9yIiwiam9pbiIsImNsYXNzZXNUb1NlbGVjdG9yIiwiYyIsInBzZXVkb1RvU2VsZWN0b3IiLCJwYXR0ZXJuVG9TZWxlY3RvciIsInBhdGhUb1NlbGVjdG9yIiwiY29udmVydEVzY2FwaW5nIiwiYXR0cmlidXRlc1RvWFBhdGgiLCJjbGFzc2VzVG9YUGF0aCIsInBzZXVkb1RvWFBhdGgiLCJwYXR0ZXJuVG9YUGF0aCIsImRlc2NlbmRhbnRzVG9YUGF0aCIsInBhdGhUb1hQYXRoIiwianF1ZXJ5IiwiY3NzIiwieHBhdGgiLCJnZXRUb1N0cmluZyIsIlNpenpsZSIsInNlbGVjdEpRdWVyeSIsInNlbGVjdG9yIiwicmVxdWlyZSIsInNlbGVjdFhQYXRoIiwiZG9jIiwiaXRlcmF0b3IiLCJldmFsdWF0ZSIsImVsZW1lbnRzIiwiaXRlcmF0ZU5leHQiLCJzZWxlY3RDU1MiLCJnZXRTZWxlY3QiLCJlcnIiLCJnZXRDb21tb25BbmNlc3RvciIsImFuY2VzdG9ycyIsImluZGV4IiwicGFyZW50cyIsInNvcnQiLCJjdXJyIiwibmV4dCIsInNoYWxsb3dBbmNlc3RvciIsImFuY2VzdG9yIiwibWlzc2luZyIsIm90aGVyUGFyZW50cyIsIm90aGVyUGFyZW50IiwiZ2V0Q29tbW9uUHJvcGVydGllcyIsImNvbW1vblByb3BlcnRpZXMiLCJjb21tb25DbGFzc2VzIiwiY29tbW9uQXR0cmlidXRlcyIsImNvbW1vblRhZyIsInVuZGVmaW5lZCIsImdldEF0dHJpYnV0ZSIsImNscyIsImVsZW1lbnRBdHRyaWJ1dGVzIiwiYXR0cmlidXRlc05hbWVzIiwiY29tbW9uQXR0cmlidXRlc05hbWVzIiwibmV4dENvbW1vbkF0dHJpYnV0ZXMiLCJvcHRpbWl6ZSIsIkVycm9yIiwib3B0aW1pemVQYXJ0IiwiZW5kT3B0aW1pemVkIiwic2xpY2UiLCJzaG9ydGVuZWQiLCJwb3AiLCJjdXJyZW50IiwiaGFzU2FtZVJlc3VsdCIsImV2ZXJ5Iiwib3B0aW1pemVUZXh0IiwicHJlIiwicG9zdCIsIm90aGVyIiwib3B0aW1pemVkIiwiY29tcGFyZVJlc3VsdHMiLCJvcHRpbWl6ZUF0dHJpYnV0ZXMiLCJzaW1wbGlmeSIsIm9yaWdpbmFsIiwiZ2V0U2ltcGxpZmllZCIsInNpbXBsaWZpZWQiLCJvcHRpbWl6ZURlc2NlbmRhbnQiLCJkZXNjZW5kYW50Iiwib3B0aW1pemVSZWN1cnNpdmVEZXNjZW5kYW50cyIsIm9wdGltaXplTnRoT2ZUeXBlIiwiZmluZEluZGV4IiwibnRoT2ZUeXBlIiwib3B0aW1pemVDbGFzc2VzIiwicmVmZXJlbmNlcyIsInJlZmVyZW5jZSIsImRlc2NyaXB0aW9uIiwib3B0aW1pemVycyIsImFjYyIsIm9wdGltaXplciIsImdldFF1ZXJ5U2VsZWN0b3IiLCJnZXRTaW5nbGVTZWxlY3RvclBhdGgiLCJvcHRpbWl6ZWRQYXRoIiwiZ2V0TXVsdGlTZWxlY3RvclBhdGgiLCJhbmNlc3RvclBhdGgiLCJjb21tb25QYXRoIiwiZ2V0Q29tbW9uUGF0aCIsImRlc2NlbmRhbnRQYXR0ZXJuIiwic2VsZWN0b3JQYXRoIiwic2VsZWN0b3JNYXRjaGVzIiwiaW5wdXQiLCJIVE1MRWxlbWVudCIsIndpbmRvdyIsInN1cHBvcnQiLCJFeHByIiwiZ2V0VGV4dCIsImlzWE1MIiwidG9rZW5pemUiLCJjb21waWxlIiwib3V0ZXJtb3N0Q29udGV4dCIsInNvcnRJbnB1dCIsImhhc0R1cGxpY2F0ZSIsInNldERvY3VtZW50IiwiZG9jRWxlbSIsImRvY3VtZW50SXNIVE1MIiwicmJ1Z2d5UVNBIiwicmJ1Z2d5TWF0Y2hlcyIsImV4cGFuZG8iLCJEYXRlIiwicHJlZmVycmVkRG9jIiwiZGlycnVucyIsImRvbmUiLCJjbGFzc0NhY2hlIiwiY3JlYXRlQ2FjaGUiLCJ0b2tlbkNhY2hlIiwiY29tcGlsZXJDYWNoZSIsIm5vbm5hdGl2ZVNlbGVjdG9yQ2FjaGUiLCJzb3J0T3JkZXIiLCJiIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJwdXNoTmF0aXZlIiwibGlzdCIsImVsZW0iLCJsZW4iLCJib29sZWFucyIsIndoaXRlc3BhY2UiLCJpZGVudGlmaWVyIiwicHNldWRvcyIsInJ3aGl0ZXNwYWNlIiwicnRyaW0iLCJyY29tbWEiLCJyY29tYmluYXRvcnMiLCJyZGVzY2VuZCIsInJwc2V1ZG8iLCJyaWRlbnRpZmllciIsIm1hdGNoRXhwciIsInJodG1sIiwicmlucHV0cyIsInJoZWFkZXIiLCJybmF0aXZlIiwicnF1aWNrRXhwciIsInJzaWJsaW5nIiwicnVuZXNjYXBlIiwiZnVuZXNjYXBlIiwiZXNjYXBlIiwibm9uSGV4IiwiaGlnaCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsInJjc3Nlc2NhcGUiLCJmY3NzZXNjYXBlIiwiY2giLCJhc0NvZGVQb2ludCIsImNoYXJDb2RlQXQiLCJ1bmxvYWRIYW5kbGVyIiwiaW5EaXNhYmxlZEZpZWxkc2V0IiwiYWRkQ29tYmluYXRvciIsImRpc2FibGVkIiwibm9kZU5hbWUiLCJkaXIiLCJhcHBseSIsImNhbGwiLCJjaGlsZE5vZGVzIiwiZSIsInRhcmdldCIsImVscyIsImoiLCJjb250ZXh0IiwicmVzdWx0cyIsInNlZWQiLCJtIiwibmlkIiwiZ3JvdXBzIiwibmV3U2VsZWN0b3IiLCJuZXdDb250ZXh0Iiwib3duZXJEb2N1bWVudCIsImV4ZWMiLCJnZXRFbGVtZW50QnlJZCIsImlkIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwicXNhIiwidGVzdENvbnRleHQiLCJzY29wZSIsInNldEF0dHJpYnV0ZSIsInRvU2VsZWN0b3IiLCJxc2FFcnJvciIsInJlbW92ZUF0dHJpYnV0ZSIsImNhY2hlIiwiY2FjaGVMZW5ndGgiLCJtYXJrRnVuY3Rpb24iLCJmbiIsImFzc2VydCIsImVsIiwiY3JlYXRlRWxlbWVudCIsInJlbW92ZUNoaWxkIiwiYWRkSGFuZGxlIiwiYXR0cnMiLCJoYW5kbGVyIiwiYXR0ckhhbmRsZSIsInNpYmxpbmdDaGVjayIsImN1ciIsImRpZmYiLCJzb3VyY2VJbmRleCIsIm5leHRTaWJsaW5nIiwiY3JlYXRlSW5wdXRQc2V1ZG8iLCJjcmVhdGVCdXR0b25Qc2V1ZG8iLCJjcmVhdGVEaXNhYmxlZFBzZXVkbyIsImlzRGlzYWJsZWQiLCJjcmVhdGVQb3NpdGlvbmFsUHNldWRvIiwiYXJndW1lbnQiLCJtYXRjaEluZGV4ZXMiLCJuYW1lc3BhY2UiLCJuYW1lc3BhY2VVUkkiLCJkb2N1bWVudEVsZW1lbnQiLCJoYXNDb21wYXJlIiwic3ViV2luZG93IiwiZGVmYXVsdFZpZXciLCJ0b3AiLCJhZGRFdmVudExpc3RlbmVyIiwiYXR0YWNoRXZlbnQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUNvbW1lbnQiLCJnZXRCeUlkIiwiZ2V0RWxlbWVudHNCeU5hbWUiLCJhdHRySWQiLCJnZXRBdHRyaWJ1dGVOb2RlIiwiZWxlbXMiLCJ0bXAiLCJpbm5lckhUTUwiLCJtYXRjaGVzU2VsZWN0b3IiLCJ3ZWJraXRNYXRjaGVzU2VsZWN0b3IiLCJtb3pNYXRjaGVzU2VsZWN0b3IiLCJvTWF0Y2hlc1NlbGVjdG9yIiwibXNNYXRjaGVzU2VsZWN0b3IiLCJkaXNjb25uZWN0ZWRNYXRjaCIsImNvbXBhcmVEb2N1bWVudFBvc2l0aW9uIiwiYWRvd24iLCJidXAiLCJzb3J0RGV0YWNoZWQiLCJhdXAiLCJhcCIsImJwIiwiZXhwciIsInJldCIsImF0dHIiLCJzcGVjaWZpZWQiLCJzZWwiLCJlcnJvciIsIm1zZyIsInVuaXF1ZVNvcnQiLCJkdXBsaWNhdGVzIiwiZGV0ZWN0RHVwbGljYXRlcyIsInNvcnRTdGFibGUiLCJzcGxpY2UiLCJzZWxlY3RvcnMiLCJjcmVhdGVQc2V1ZG8iLCJyZWxhdGl2ZSIsImZpcnN0IiwicHJlRmlsdGVyIiwiZXhjZXNzIiwidW5xdW90ZWQiLCJub2RlTmFtZVNlbGVjdG9yIiwib3BlcmF0b3IiLCJ3aGF0IiwiX2FyZ3VtZW50IiwibGFzdCIsInNpbXBsZSIsImZvcndhcmQiLCJvZlR5cGUiLCJfY29udGV4dCIsInhtbCIsInVuaXF1ZUNhY2hlIiwib3V0ZXJDYWNoZSIsIm5vZGVJbmRleCIsInN0YXJ0IiwidXNlQ2FjaGUiLCJsYXN0Q2hpbGQiLCJ1bmlxdWVJRCIsImFyZ3MiLCJzZXRGaWx0ZXJzIiwiaWR4IiwibWF0Y2hlZCIsIm1hdGNoZXIiLCJ1bm1hdGNoZWQiLCJsYW5nIiwiZWxlbUxhbmciLCJoYXNoIiwibG9jYXRpb24iLCJhY3RpdmVFbGVtZW50IiwiaGFzRm9jdXMiLCJocmVmIiwidGFiSW5kZXgiLCJjaGVja2VkIiwic2VsZWN0ZWQiLCJzZWxlY3RlZEluZGV4IiwiX21hdGNoSW5kZXhlcyIsInJhZGlvIiwiY2hlY2tib3giLCJmaWxlIiwicGFzc3dvcmQiLCJpbWFnZSIsInN1Ym1pdCIsInJlc2V0IiwicHJvdG90eXBlIiwiZmlsdGVycyIsInBhcnNlT25seSIsInRva2VucyIsInNvRmFyIiwicHJlRmlsdGVycyIsImNhY2hlZCIsImNvbWJpbmF0b3IiLCJjaGVja05vbkVsZW1lbnRzIiwiZG9uZU5hbWUiLCJvbGRDYWNoZSIsIm5ld0NhY2hlIiwiZWxlbWVudE1hdGNoZXIiLCJtYXRjaGVycyIsIm11bHRpcGxlQ29udGV4dHMiLCJjb250ZXh0cyIsImNvbmRlbnNlIiwibmV3VW5tYXRjaGVkIiwibWFwcGVkIiwic2V0TWF0Y2hlciIsInBvc3RGaWx0ZXIiLCJwb3N0RmluZGVyIiwicG9zdFNlbGVjdG9yIiwidGVtcCIsInByZU1hcCIsInBvc3RNYXAiLCJwcmVleGlzdGluZyIsIm1hdGNoZXJJbiIsIm1hdGNoZXJPdXQiLCJtYXRjaGVyRnJvbVRva2VucyIsImNoZWNrQ29udGV4dCIsImxlYWRpbmdSZWxhdGl2ZSIsImltcGxpY2l0UmVsYXRpdmUiLCJtYXRjaENvbnRleHQiLCJtYXRjaEFueUNvbnRleHQiLCJtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMiLCJlbGVtZW50TWF0Y2hlcnMiLCJzZXRNYXRjaGVycyIsImJ5U2V0IiwiYnlFbGVtZW50Iiwic3VwZXJNYXRjaGVyIiwib3V0ZXJtb3N0IiwibWF0Y2hlZENvdW50Iiwic2V0TWF0Y2hlZCIsImNvbnRleHRCYWNrdXAiLCJkaXJydW5zVW5pcXVlIiwiTWF0aCIsInJhbmRvbSIsInRva2VuIiwiY29tcGlsZWQiLCJfbmFtZSIsImRlZmF1bHRWYWx1ZSIsIl9zaXp6bGUiLCJub0NvbmZsaWN0IiwiZGVmaW5lIiwibW9kdWxlIiwiZXhwb3J0cyIsImRlZmF1bHQiLCJnZXRTaW5nbGVTZWxlY3RvciIsImdldE11bHRpU2VsZWN0b3IiLCJjb21tb24iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFQTs7Ozs7O0FBTUE7Ozs7OztBQU1PLElBQU1BLDRDQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ0MsS0FBRCxFQUFXO0FBQUEsTUFDaENDLE1BRGdDLEdBQ3JCRCxLQURxQixDQUNoQ0MsTUFEZ0M7O0FBRXhDLE1BQU1DLE1BQU0sSUFBSUMsS0FBSixDQUFVRixNQUFWLENBQVo7QUFDQSxPQUFLLElBQUlHLElBQUksQ0FBYixFQUFnQkEsSUFBSUgsTUFBcEIsRUFBNEJHLEdBQTVCLEVBQWlDO0FBQy9CRixRQUFJRSxDQUFKLElBQVNKLE1BQU1JLENBQU4sQ0FBVDtBQUNEO0FBQ0QsU0FBT0YsR0FBUDtBQUNELENBUE07O0FBU1A7Ozs7Ozs7O0FBUU8sSUFBTUcsb0NBQWMsU0FBZEEsV0FBYyxDQUFDQyxLQUFEO0FBQUEsU0FDekJBLFNBQVNBLE1BQU1DLE9BQU4sQ0FBYyxxQ0FBZCxFQUFxRCxNQUFyRCxFQUNOQSxPQURNLENBQ0UsS0FERixFQUNTLE1BRFQsQ0FEZ0I7QUFBQSxDQUFwQjs7QUFJUDs7O0FBR08sSUFBTUMsZ0NBQVksU0FBWkEsU0FBWSxDQUFDQyxLQUFELEVBQVFDLFNBQVI7QUFBQSxTQUN2QkQsTUFBTUUsTUFBTixDQUNFLGdCQUFpQkMsSUFBakI7QUFBQTtBQUFBLFFBQUVDLEtBQUY7QUFBQSxRQUFTQyxLQUFUOztBQUFBLFdBQTBCSixVQUFVRSxJQUFWLElBQWtCLENBQUNDLE1BQU1FLE1BQU4sQ0FBYUgsSUFBYixDQUFELEVBQXFCRSxLQUFyQixDQUFsQixHQUFnRCxDQUFDRCxLQUFELEVBQVFDLE1BQU1DLE1BQU4sQ0FBYUgsSUFBYixDQUFSLENBQTFFO0FBQUEsR0FERixFQUVFLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FGRixDQUR1QjtBQUFBLENBQWxCOztBQVFQOzs7Ozs7Ozs7Ozs7O0FBYU8sSUFBTUksc0RBQXVCLFNBQXZCQSxvQkFBdUIsQ0FBQ1YsS0FBRDtBQUFBLFNBQ2xDLENBQUMsQ0FBQ0EsS0FBRixJQUFXLENBQUMscUJBQXFCVyxJQUFyQixDQUEwQlgsS0FBMUIsQ0FBWixJQUFnRCxDQUFDLDRDQUE0Q1csSUFBNUMsQ0FBaURYLEtBQWpELENBRGY7QUFBQSxDQUE3QixDOzs7Ozs7Ozs7Ozs7Ozs7O2tRQ3pEUDs7Ozs7O2tCQTBDd0JZLEs7O0FBcEN4Qjs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7QUFNQSxJQUFNQyxnQkFBZ0I7QUFDcEJDLFdBRG9CLHFCQUNUQyxhQURTLEVBQ007QUFDeEIsV0FBTyxDQUNMLE9BREssRUFFTCxjQUZLLEVBR0wscUJBSEssRUFJTEMsT0FKSyxDQUlHRCxhQUpILElBSW9CLENBQUMsQ0FKNUI7QUFLRCxHQVBtQjs7QUFRcEJFLFlBQVU7QUFBQSxXQUFNLElBQU47QUFBQTtBQVJVLENBQXRCOztBQVdPLElBQU1DLG9DQUFjLFNBQWRBLFdBQWM7QUFBQSxNQUFDQyxPQUFELHVFQUFXLEVBQVg7QUFBQSxzQkFDdEJBLE9BRHNCO0FBRXpCQyxVQUFNRCxRQUFRQyxJQUFSLElBQWdCQyxRQUZHO0FBR3pCQyxVQUFNSCxRQUFRRyxJQUFSLElBQWdCLElBSEc7QUFJekJDLGNBQVVKLFFBQVFJLFFBQVIsSUFBb0IsQ0FBQyxJQUFELEVBQU8sT0FBUCxFQUFnQixNQUFoQixFQUF3QixLQUF4QixDQUpMO0FBS3pCQyxZQUFRTCxRQUFRSyxNQUFSLElBQWtCO0FBTEQ7QUFBQSxDQUFwQjs7QUFRUDs7Ozs7OztBQU9lLFNBQVNaLEtBQVQsQ0FBZ0JhLElBQWhCLEVBQW9EO0FBQUEsTUFBOUJOLE9BQThCLHVFQUFwQixFQUFvQjtBQUFBLE1BQWhCTyxNQUFnQix1RUFBUCxLQUFPOztBQUNqRVAsWUFBVUQsWUFBWUMsT0FBWixDQUFWO0FBRGlFLGlCQUUxQkEsT0FGMEI7QUFBQSxNQUV6REMsSUFGeUQsWUFFekRBLElBRnlEO0FBQUEsTUFFbkRFLElBRm1ELFlBRW5EQSxJQUZtRDtBQUFBLE1BRTdDRSxNQUY2QyxZQUU3Q0EsTUFGNkM7QUFBQSxNQUVyQ0csTUFGcUMsWUFFckNBLE1BRnFDOzs7QUFJakUsTUFBTUMsT0FBTyxFQUFiO0FBQ0EsTUFBSUMsVUFBVUosSUFBZDtBQUNBLE1BQUk5QixTQUFTaUMsS0FBS2pDLE1BQWxCO0FBQ0EsTUFBTW1DLFNBQVMseUJBQVVYLE9BQVYsQ0FBZjtBQUNBLE1BQU1ZLFdBQVcsMEJBQVlaLE9BQVosQ0FBakI7O0FBRUEsTUFBTWEsY0FBY1YsUUFBUSxDQUFDekIsTUFBTW9DLE9BQU4sQ0FBY1gsSUFBZCxJQUFzQkEsSUFBdEIsR0FBNkIsQ0FBQ0EsSUFBRCxDQUE5QixFQUFzQ1ksR0FBdEMsQ0FBMEMsVUFBQ0MsS0FBRCxFQUFXO0FBQy9FLFFBQUksT0FBT0EsS0FBUCxLQUFpQixVQUFyQixFQUFpQztBQUMvQixhQUFPLFVBQUNOLE9BQUQ7QUFBQSxlQUFhQSxZQUFZTSxLQUF6QjtBQUFBLE9BQVA7QUFDRDtBQUNELFdBQU9BLEtBQVA7QUFDRCxHQUwyQixDQUE1Qjs7QUFPQSxNQUFNQyxhQUFhLFNBQWJBLFVBQWEsQ0FBQ1AsT0FBRCxFQUFhO0FBQzlCLFdBQU9QLFFBQVFVLFlBQVlLLElBQVosQ0FBaUIsVUFBQ0MsT0FBRDtBQUFBLGFBQWFBLFFBQVFULE9BQVIsQ0FBYjtBQUFBLEtBQWpCLENBQWY7QUFDRCxHQUZEOztBQUlBVSxTQUFPQyxJQUFQLENBQVloQixNQUFaLEVBQW9CaUIsT0FBcEIsQ0FBNEIsVUFBQ0MsSUFBRCxFQUFVO0FBQ3BDLFFBQUl0QyxZQUFZb0IsT0FBT2tCLElBQVAsQ0FBaEI7QUFDQSxRQUFJLE9BQU90QyxTQUFQLEtBQXFCLFVBQXpCLEVBQXFDO0FBQ3JDLFFBQUksT0FBT0EsU0FBUCxLQUFxQixRQUF6QixFQUFtQztBQUNqQ0Esa0JBQVlBLFVBQVUyQixRQUFWLEVBQVo7QUFDRDtBQUNELFFBQUksT0FBTzNCLFNBQVAsS0FBcUIsUUFBekIsRUFBbUM7QUFDakNBLGtCQUFZLElBQUl1QyxNQUFKLENBQVcsNEJBQVl2QyxTQUFaLEVBQXVCSCxPQUF2QixDQUErQixLQUEvQixFQUFzQyxNQUF0QyxDQUFYLENBQVo7QUFDRDtBQUNELFFBQUksT0FBT0csU0FBUCxLQUFxQixTQUF6QixFQUFvQztBQUNsQ0Esa0JBQVlBLFlBQVksTUFBWixHQUFxQixJQUFqQztBQUNEO0FBQ0Q7QUFDQW9CLFdBQU9rQixJQUFQLElBQWUsVUFBQ0UsSUFBRCxFQUFPNUMsS0FBUDtBQUFBLGFBQWlCSSxVQUFVTyxJQUFWLENBQWVYLEtBQWYsQ0FBakI7QUFBQSxLQUFmO0FBQ0QsR0FkRDs7QUFnQkEsU0FBTzZCLFlBQVlULElBQVosSUFBb0JTLFFBQVFnQixRQUFSLEtBQXFCLEVBQWhELEVBQW9EO0FBQ2xELFFBQUlULFdBQVdQLE9BQVgsTUFBd0IsSUFBNUIsRUFBa0M7QUFDaEM7QUFDQSxVQUFJaUIsZ0JBQWdCakIsT0FBaEIsRUFBeUJELElBQXpCLEVBQStCVCxPQUEvQixFQUF3Q1csTUFBeEMsRUFBZ0RDLFFBQWhELEVBQTBEWCxJQUExRCxDQUFKLEVBQXFFO0FBQ3JFLFVBQUkyQixTQUFTbEIsT0FBVCxFQUFrQkQsSUFBbEIsRUFBd0JULE9BQXhCLEVBQWlDVyxNQUFqQyxFQUF5Q0MsUUFBekMsRUFBbURYLElBQW5ELENBQUosRUFBOEQ7O0FBRTlEO0FBQ0EwQixzQkFBZ0JqQixPQUFoQixFQUF5QkQsSUFBekIsRUFBK0JULE9BQS9CLEVBQXdDVyxNQUF4QyxFQUFnREMsUUFBaEQ7QUFDQSxVQUFJSCxLQUFLakMsTUFBTCxLQUFnQkEsTUFBcEIsRUFBNEI7QUFDMUJvRCxpQkFBU2xCLE9BQVQsRUFBa0JELElBQWxCLEVBQXdCVCxPQUF4QixFQUFpQ1csTUFBakMsRUFBeUNDLFFBQXpDO0FBQ0Q7O0FBRUQsVUFBSUgsS0FBS2pDLE1BQUwsS0FBZ0JBLE1BQWhCLElBQTBCLENBQUMsQ0FBRCxFQUFJLE9BQUosRUFBYXFELFFBQWIsQ0FBc0JyQixNQUF0QixDQUExQixJQUEyRCxDQUFDRCxNQUE1RCxJQUFzRUcsWUFBWUosSUFBdEYsRUFBNEY7QUFDMUZ3QixrQ0FBMEJwQixPQUExQixFQUFtQ0QsSUFBbkMsRUFBeUNULE9BQXpDLEVBQWtEVyxNQUFsRCxFQUEwREMsUUFBMUQ7QUFDRDs7QUFFRCxVQUFJSCxLQUFLakMsTUFBTCxLQUFnQkEsTUFBaEIsSUFBMEIsQ0FBQyxDQUFELEVBQUksT0FBSixFQUFhLFFBQWIsRUFBdUJxRCxRQUF2QixDQUFnQ3JCLE1BQWhDLENBQTlCLEVBQXVFO0FBQ3JFdUIsa0JBQVVyQixPQUFWLEVBQW1CRCxJQUFuQixFQUF5QlQsT0FBekIsRUFBa0NXLE1BQWxDLEVBQTBDQyxRQUExQyxFQUFvREosV0FBVyxRQUEvRDtBQUNEOztBQUVELFVBQUlDLEtBQUtqQyxNQUFMLEtBQWdCQSxNQUFwQixFQUE0QjtBQUMxQndELHNCQUFjdEIsT0FBZCxFQUF1QkQsSUFBdkIsRUFBNkJULE9BQTdCO0FBQ0Q7QUFDRjs7QUFFRFUsY0FBVUEsUUFBUXVCLFVBQWxCO0FBQ0F6RCxhQUFTaUMsS0FBS2pDLE1BQWQ7QUFDRDs7QUFFRCxNQUFJa0MsWUFBWVQsSUFBaEIsRUFBc0I7QUFDcEIsUUFBTWlDLFVBQVVDLFlBQVl6QixPQUFaLEVBQXFCVixPQUFyQixFQUE4QlcsTUFBOUIsRUFBc0NDLFFBQXRDLENBQWhCO0FBQ0FILFNBQUsyQixPQUFMLENBQWFGLE9BQWI7QUFDRDs7QUFFRCxTQUFPekIsSUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7OztBQVdBLElBQU1rQixrQkFBa0IsU0FBbEJBLGVBQWtCLENBQUNqQixPQUFELEVBQVVELElBQVYsUUFBc0NFLE1BQXRDLEVBQThDQyxRQUE5QyxFQUF3RjtBQUFBLE1BQXRFUixRQUFzRSxRQUF0RUEsUUFBc0U7QUFBQSxNQUE1REMsTUFBNEQsUUFBNURBLE1BQTREO0FBQUEsTUFBaENnQyxNQUFnQyx1RUFBdkIzQixRQUFRdUIsVUFBZTs7QUFDOUcsTUFBTUMsVUFBVUksc0JBQXNCbEMsUUFBdEIsRUFBZ0NNLE9BQWhDLEVBQXlDTCxNQUF6QyxFQUFpRE0sTUFBakQsRUFBeURDLFFBQXpELEVBQW1FeUIsTUFBbkUsQ0FBaEI7QUFDQSxNQUFJSCxPQUFKLEVBQWE7QUFDWHpCLFNBQUsyQixPQUFMLENBQWFGLE9BQWI7QUFDQSxXQUFPLElBQVA7QUFDRDtBQUNELFNBQU8sS0FBUDtBQUNELENBUEQ7O0FBU0E7Ozs7OztBQU1PLElBQU1LLHNDQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsTUFBRCxFQUFTeEMsT0FBVCxFQUFxQjtBQUFBLGNBQzFCQSxXQUFXLEVBRGU7QUFBQSxNQUN2Q3lDLEdBRHVDLFNBQ3ZDQSxHQUR1QztBQUFBLE1BQ2xDQyxHQURrQyxTQUNsQ0EsR0FEa0M7O0FBRS9DLE1BQU1DLFNBQVMsQ0FBQyxFQUFELENBQWY7O0FBRUFILFNBQU9sQixPQUFQLENBQWUsYUFBSztBQUNsQnFCLFdBQU9yQixPQUFQLENBQWUsYUFBSztBQUNsQixVQUFJLENBQUNvQixHQUFELElBQVFFLEVBQUVwRSxNQUFGLEdBQVdrRSxHQUF2QixFQUE0QjtBQUMxQkMsZUFBT0UsSUFBUCxDQUFZRCxFQUFFdEQsTUFBRixDQUFTd0QsQ0FBVCxDQUFaO0FBQ0Q7QUFDRixLQUpEO0FBS0QsR0FORDs7QUFRQUgsU0FBT0ksS0FBUDtBQUNBLFNBQU9OLE1BQU1FLE9BQU9LLE1BQVAsQ0FBYztBQUFBLFdBQUtKLEVBQUVwRSxNQUFGLElBQVlpRSxHQUFqQjtBQUFBLEdBQWQsQ0FBTixHQUE0Q0UsTUFBbkQ7QUFDRCxDQWRNOztBQWdCUDtBQUNBLElBQU1NLGdCQUFnQixDQUNwQixFQUFFQyxPQUFPLEVBQVQsRUFBYVIsS0FBSyxDQUFsQixFQURvQixFQUVwQixFQUFFUSxPQUFPLEVBQVQsRUFBYVIsS0FBSyxDQUFsQixFQUZvQixFQUdwQixFQUFFUSxPQUFPLENBQVQsRUFBWVIsS0FBSyxDQUFqQixFQUhvQixFQUlwQixFQUFFUSxPQUFPLENBQVQsRUFBWVIsS0FBSyxDQUFqQixFQUpvQixDQUF0Qjs7QUFPQTs7Ozs7Ozs7OztBQVVBLElBQU1TLG1CQUFtQixTQUFuQkEsZ0JBQW1CLEdBQWtEO0FBQUEsTUFBakRDLE9BQWlELHVFQUF2QyxFQUF1QztBQUFBLE1BQW5DekMsTUFBbUM7QUFBQSxNQUEzQkMsUUFBMkI7QUFBQSxNQUFqQnlCLE1BQWlCO0FBQUEsTUFBVGdCLElBQVM7O0FBQUEsY0FFdkVKLGNBQWNLLElBQWQsQ0FBbUI7QUFBQSxRQUFHSixLQUFILFNBQUdBLEtBQUg7QUFBQSxXQUFlRSxRQUFRNUUsTUFBUixHQUFpQjBFLEtBQWhDO0FBQUEsR0FBbkIsS0FBNkQsRUFBRVIsS0FBS1UsUUFBUTVFLE1BQWYsRUFGVTtBQUFBLE1BQ2pFa0UsR0FEaUUsU0FDakVBLEdBRGlFOztBQUl6RSxNQUFJQyxTQUFTSixhQUFhYSxPQUFiLEVBQXNCLEVBQUVWLFFBQUYsRUFBdEIsQ0FBYjs7QUFFQSxPQUFJLElBQUkvRCxJQUFJLENBQVosRUFBZUEsSUFBSWdFLE9BQU9uRSxNQUExQixFQUFrQ0csR0FBbEMsRUFBdUM7QUFDckMsUUFBTXVELFVBQVV0QixTQUFTc0IsT0FBVCxjQUFzQm1CLElBQXRCLElBQTRCRCxTQUFTVCxPQUFPaEUsQ0FBUCxDQUFyQyxJQUFoQjtBQUNBLFFBQU00RSxVQUFVNUMsT0FBT3VCLE9BQVAsRUFBZ0JHLE1BQWhCLENBQWhCO0FBQ0EsUUFBSWtCLFFBQVEvRSxNQUFSLEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGFBQU9tRSxPQUFPaEUsQ0FBUCxDQUFQO0FBQ0Q7QUFDRjs7QUFFRCxTQUFPLElBQVA7QUFDRCxDQWZEOztBQWlCQTs7Ozs7Ozs7Ozs7QUFXQSxJQUFNMkQsd0JBQXdCLFNBQXhCQSxxQkFBd0IsQ0FBQ2xDLFFBQUQsRUFBV00sT0FBWCxFQUFvQkwsTUFBcEIsRUFBNEJNLE1BQTVCLEVBQW9DQyxRQUFwQyxFQUE4RTtBQUFBLE1BQWhDeUIsTUFBZ0MsdUVBQXZCM0IsUUFBUXVCLFVBQWU7O0FBQzFHLE1BQU11QixhQUFhOUMsUUFBUThDLFVBQTNCO0FBQ0EsTUFBSUMsaUJBQWlCckMsT0FBT0MsSUFBUCxDQUFZbUMsVUFBWixFQUF3QnpDLEdBQXhCLENBQTRCLFVBQUMyQyxHQUFEO0FBQUEsV0FBU0YsV0FBV0UsR0FBWCxFQUFnQmpDLElBQXpCO0FBQUEsR0FBNUIsRUFDbEJ1QixNQURrQixDQUNYLFVBQUNXLENBQUQ7QUFBQSxXQUFPdkQsU0FBU1AsT0FBVCxDQUFpQjhELENBQWpCLElBQXNCLENBQTdCO0FBQUEsR0FEVyxDQUFyQjs7QUFHQSxNQUFJQywwQ0FBa0J4RCxRQUFsQixzQkFBK0JxRCxjQUEvQixFQUFKO0FBQ0EsTUFBSXZCLFVBQVUsNkJBQWQ7QUFDQUEsVUFBUTJCLEdBQVIsR0FBY25ELFFBQVFvRCxPQUFSLENBQWdCQyxXQUFoQixFQUFkOztBQUVBLE1BQUlDLFlBQVksU0FBWkEsU0FBWSxDQUFDOUIsT0FBRDtBQUFBLFdBQWN2QixPQUFPQyxTQUFTc0IsT0FBVCxDQUFpQkEsT0FBakIsQ0FBUCxFQUFrQ0csTUFBbEMsRUFBMEM3RCxNQUExQyxLQUFxRCxDQUFuRTtBQUFBLEdBQWhCOztBQUVBLE9BQUssSUFBSUcsSUFBSSxDQUFSLEVBQVdzRixJQUFJTCxXQUFXcEYsTUFBL0IsRUFBdUNHLElBQUlzRixDQUEzQyxFQUE4Q3RGLEdBQTlDLEVBQW1EO0FBQ2pELFFBQU11RixNQUFNTixXQUFXakYsQ0FBWCxDQUFaO0FBQ0EsUUFBTWdCLFlBQVk2RCxXQUFXVSxHQUFYLENBQWxCO0FBQ0EsUUFBTXRFLGdCQUFnQiw0QkFBWUQsYUFBYUEsVUFBVThCLElBQW5DLENBQXRCO0FBQ0EsUUFBTTBDLGlCQUFpQiw0QkFBWXhFLGFBQWFBLFVBQVVkLEtBQW5DLENBQXZCO0FBQ0EsUUFBTXVGLGlCQUFpQnhFLGtCQUFrQixPQUF6Qzs7QUFFQSxRQUFNeUUsZ0JBQWlCRCxrQkFBa0IvRCxPQUFPVCxhQUFQLENBQW5CLElBQTZDUyxPQUFPVixTQUExRTtBQUNBLFFBQU0yRSx1QkFBd0JGLGtCQUFrQjFFLGNBQWNFLGFBQWQsQ0FBbkIsSUFBb0RGLGNBQWNDLFNBQS9GO0FBQ0EsUUFBSTRFLFlBQVlGLGFBQVosRUFBMkJ6RSxhQUEzQixFQUEwQ3VFLGNBQTFDLEVBQTBERyxvQkFBMUQsQ0FBSixFQUFxRjtBQUNuRjtBQUNEOztBQUVELFlBQVExRSxhQUFSO0FBQ0UsV0FBSyxPQUFMO0FBQWM7QUFBQTtBQUNaLGdCQUFJNEUsYUFBYUwsZUFBZU0sSUFBZixHQUFzQkMsS0FBdEIsQ0FBNEIsTUFBNUIsQ0FBakI7QUFDQSxnQkFBSSxDQUFDRixXQUFXLENBQVgsQ0FBTCxFQUFvQjtBQUFFO0FBQ3BCO0FBQ0Q7QUFDRCxnQkFBTUcsY0FBY3RFLE9BQU91RSxLQUFQLElBQWdCbEYsY0FBY2tGLEtBQWxEO0FBQ0EsZ0JBQUlELFdBQUosRUFBaUI7QUFDZkgsMkJBQWFBLFdBQVd4QixNQUFYLENBQWtCO0FBQUEsdUJBQWEsQ0FBQzJCLFlBQVlFLFNBQVosQ0FBZDtBQUFBLGVBQWxCLENBQWI7QUFDRDtBQUNELGdCQUFJTCxXQUFXaEcsTUFBWCxHQUFvQixDQUF4QixFQUEyQjtBQUN6QixrQkFBTTRFLFVBQVVELGlCQUFpQnFCLFVBQWpCLEVBQTZCN0QsTUFBN0IsRUFBcUNDLFFBQXJDLEVBQStDeUIsTUFBL0MsRUFBdURILE9BQXZELENBQWhCO0FBQ0Esa0JBQUlrQixPQUFKLEVBQWE7QUFDWGxCLHdCQUFRa0IsT0FBUixHQUFrQkEsT0FBbEI7QUFDQSxvQkFBSVksVUFBVTlCLE9BQVYsQ0FBSixFQUF3QjtBQUN0QjtBQUFBLHVCQUFPQTtBQUFQO0FBQ0Q7QUFDRjtBQUNGO0FBakJXOztBQUFBO0FBQUE7QUFHVjs7QUFIVTtBQUFBO0FBQUE7QUFrQmI7QUFDQzs7QUFFRjtBQUNFQSxnQkFBUXNCLFVBQVIsQ0FBbUJYLElBQW5CLENBQXdCLEVBQUVwQixNQUFNN0IsYUFBUixFQUF1QmYsT0FBT3NGLGNBQTlCLEVBQXhCO0FBQ0EsWUFBSUgsVUFBVTlCLE9BQVYsQ0FBSixFQUF3QjtBQUN0QixpQkFBT0EsT0FBUDtBQUNEO0FBMUJMO0FBNEJEOztBQUVELFNBQU8sSUFBUDtBQUNELENBdkREOztBQTBEQTs7Ozs7Ozs7Ozs7QUFXQSxJQUFNTixXQUFXLFNBQVhBLFFBQVcsQ0FBQ2xCLE9BQUQsRUFBVUQsSUFBVixTQUE0QkUsTUFBNUIsRUFBb0NDLFFBQXBDLEVBQThFO0FBQUEsTUFBNURQLE1BQTRELFNBQTVEQSxNQUE0RDtBQUFBLE1BQWhDZ0MsTUFBZ0MsdUVBQXZCM0IsUUFBUXVCLFVBQWU7O0FBQzdGLE1BQU1DLFVBQVU0QyxlQUFlcEUsT0FBZixFQUF3QkwsTUFBeEIsQ0FBaEI7QUFDQSxNQUFJNkIsT0FBSixFQUFhO0FBQ1gsUUFBSXFCLFVBQVUsRUFBZDtBQUNBQSxjQUFVNUMsT0FBT0MsU0FBU3NCLE9BQVQsQ0FBaUJBLE9BQWpCLENBQVAsRUFBa0NHLE1BQWxDLENBQVY7QUFDQSxRQUFJa0IsUUFBUS9FLE1BQVIsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEJpQyxXQUFLMkIsT0FBTCxDQUFhRixPQUFiO0FBQ0EsVUFBSUEsUUFBUTJCLEdBQVIsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDNUIsZUFBTyxLQUFQO0FBQ0Q7QUFDRCxhQUFPLElBQVA7QUFDRDtBQUNGO0FBQ0QsU0FBTyxLQUFQO0FBQ0QsQ0FkRDs7QUFnQkE7Ozs7Ozs7QUFPQSxJQUFNaUIsaUJBQWlCLFNBQWpCQSxjQUFpQixDQUFDcEUsT0FBRCxFQUFVTCxNQUFWLEVBQXFCO0FBQzFDLE1BQU15RCxVQUFVcEQsUUFBUW9ELE9BQVIsQ0FBZ0JDLFdBQWhCLEVBQWhCO0FBQ0EsTUFBSVEsWUFBWWxFLE9BQU93RCxHQUFuQixFQUF3QixJQUF4QixFQUE4QkMsT0FBOUIsQ0FBSixFQUE0QztBQUMxQyxXQUFPLElBQVA7QUFDRDtBQUNELE1BQU01QixVQUFVLDZCQUFoQjtBQUNBQSxVQUFRMkIsR0FBUixHQUFjQyxPQUFkO0FBQ0EsU0FBTzVCLE9BQVA7QUFDRCxDQVJEOztBQVVBOzs7Ozs7OztBQVFBLElBQU1GLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBQ3RCLE9BQUQsRUFBVUQsSUFBVixTQUErQjtBQUFBLE1BQWJKLE1BQWEsU0FBYkEsTUFBYTs7QUFDbkQsTUFBTWdDLFNBQVMzQixRQUFRdUIsVUFBdkI7QUFDQSxNQUFNOEMsV0FBVzFDLE9BQU8wQyxRQUF4QjtBQUNBLE9BQUssSUFBSXBHLElBQUksQ0FBUixFQUFXc0YsSUFBSWMsU0FBU3ZHLE1BQTdCLEVBQXFDRyxJQUFJc0YsQ0FBekMsRUFBNEN0RixHQUE1QyxFQUFpRDtBQUMvQyxRQUFNcUcsUUFBUUQsU0FBU3BHLENBQVQsQ0FBZDtBQUNBLFFBQUlxRyxVQUFVdEUsT0FBZCxFQUF1QjtBQUNyQixVQUFNdUUsZUFBZUgsZUFBZUUsS0FBZixFQUFzQjNFLE1BQXRCLENBQXJCO0FBQ0EsVUFBSSxDQUFDNEUsWUFBTCxFQUFtQjtBQUNqQixlQUFPQyxRQUFRQyxJQUFSLHNGQUVKSCxLQUZJLEVBRUczRSxNQUZILEVBRVc0RSxZQUZYLENBQVA7QUFHRDtBQUNEQSxtQkFBYUcsT0FBYixHQUF1QixPQUF2QjtBQUNBSCxtQkFBYUksTUFBYixHQUFzQixpQkFBYzFHLElBQUUsQ0FBaEIsUUFBdEI7QUFDQThCLFdBQUsyQixPQUFMLENBQWE2QyxZQUFiO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7QUFDRjtBQUNELFNBQU8sS0FBUDtBQUNELENBbkJEOztBQXFCQTs7Ozs7Ozs7Ozs7QUFXQSxJQUFNbEQsWUFBWSxTQUFaQSxTQUFZLENBQUNyQixPQUFELEVBQVVELElBQVYsU0FBNEJFLE1BQTVCLEVBQW9DQyxRQUFwQyxFQUE4Q0wsTUFBOUMsRUFBeUQ7QUFBQSxNQUF2Q0YsTUFBdUMsU0FBdkNBLE1BQXVDOztBQUN6RSxNQUFNNkIsVUFBVTRDLGVBQWVwRSxPQUFmLEVBQXdCTCxNQUF4QixDQUFoQjtBQUNBLE1BQUksQ0FBQzZCLE9BQUwsRUFBYztBQUNaLFdBQU8sS0FBUDtBQUNEO0FBQ0QsTUFBTW9ELGNBQWUvRSxTQUFTRyxRQUFRNEUsV0FBakIsR0FBZ0M1RSxRQUFRNkUsVUFBUixJQUFzQjdFLFFBQVE2RSxVQUFSLENBQW1CQyxTQUExQyxJQUF3RCxFQUE1RztBQUNBLE1BQUksQ0FBQ0YsV0FBTCxFQUFrQjtBQUNoQixXQUFPLEtBQVA7QUFDRDs7QUFFRHBELFVBQVFrRCxPQUFSLEdBQWtCLE9BQWxCO0FBQ0EsTUFBTS9DLFNBQVMzQixRQUFRdUIsVUFBdkI7QUFDQSxNQUFNd0QsUUFBUUgsWUFDWHhHLE9BRFcsQ0FDSCxNQURHLEVBQ0ssSUFETCxFQUVYNEYsS0FGVyxDQUVMLElBRkssRUFHWDNELEdBSFcsQ0FHUDtBQUFBLFdBQVEyRSxLQUFLakIsSUFBTCxFQUFSO0FBQUEsR0FITyxFQUlYekIsTUFKVyxDQUlKO0FBQUEsV0FBUTBDLEtBQUtsSCxNQUFMLEdBQWMsQ0FBdEI7QUFBQSxHQUpJLENBQWQ7O0FBTUEsTUFBTXNCLFdBQVcsRUFBakI7O0FBRUEsU0FBTzJGLE1BQU1qSCxNQUFOLEdBQWUsQ0FBdEIsRUFBeUI7QUFDdkIsUUFBTWtILE9BQU9ELE1BQU0xQyxLQUFOLEVBQWI7QUFDQSxRQUFJd0IsWUFBWWxFLE9BQU9QLFFBQW5CLEVBQTZCLElBQTdCLEVBQW1DNEYsSUFBbkMsRUFBeUNoRyxjQUFjSSxRQUF2RCxDQUFKLEVBQXNFO0FBQ3BFO0FBQ0Q7QUFDREEsYUFBUytDLElBQVQsZ0JBQTJCNkMsSUFBM0I7O0FBRUEsUUFBTW5DLFVBQVU1QyxPQUFPQyxTQUFTc0IsT0FBVCxjQUFzQkEsT0FBdEIsSUFBK0JtRCxRQUFRdkYsUUFBdkMsSUFBUCxFQUEyRHVDLE1BQTNELENBQWhCO0FBQ0EsUUFBSWtCLFFBQVEvRSxNQUFSLEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCMEQsY0FBUW1ELE1BQVIsR0FBaUJ2RixRQUFqQjtBQUNBVyxXQUFLMkIsT0FBTCxDQUFhRixPQUFiO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7QUFDRCxRQUFJcUIsUUFBUS9FLE1BQVIsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEIsYUFBTyxLQUFQO0FBQ0Q7QUFDRjtBQUNELFNBQU8sS0FBUDtBQUNELENBdENEOztBQXdDQTs7Ozs7Ozs7OztBQVVBLElBQU1zRCw0QkFBNEIsU0FBNUJBLHlCQUE0QixDQUFDcEIsT0FBRCxFQUFVRCxJQUFWLEVBQWdCVCxPQUFoQixFQUF5QlcsTUFBekIsRUFBaUNDLFFBQWpDLEVBQThDO0FBQzlFLE1BQU1zQixVQUFVNEMsZUFBZXBFLE9BQWYsRUFBd0JWLFFBQVFLLE1BQWhDLENBQWhCO0FBQ0EsTUFBSSxDQUFDNkIsT0FBTCxFQUFjO0FBQ1osV0FBTyxLQUFQO0FBQ0Q7O0FBRUQsTUFBTXlELGNBQWNqSCxNQUFNa0gsSUFBTixDQUFXbEYsUUFBUW1GLGdCQUFSLENBQXlCLEdBQXpCLENBQVgsQ0FBcEI7QUFDQSxTQUFPRixZQUFZbkgsTUFBWixHQUFxQixDQUE1QixFQUErQjtBQUM3QixRQUFNc0gsaUJBQWlCckcsTUFBTWtHLFlBQVk1QyxLQUFaLEVBQU4sZUFBZ0MvQyxPQUFoQyxJQUF5Q0MsTUFBTVMsT0FBL0MsS0FBMEQsSUFBMUQsQ0FBdkI7QUFDQTtBQUNBLFFBQUksQ0FBQ29GLGVBQWU1RSxJQUFmLENBQW9CO0FBQUEsYUFBV2dCLFFBQVFtRCxNQUFSLENBQWVuRSxJQUFmLENBQW9CO0FBQUEsZUFBSzZFLEVBQUVDLFVBQUYsQ0FBYSxXQUFiLENBQUw7QUFBQSxPQUFwQixDQUFYO0FBQUEsS0FBcEIsQ0FBTCxFQUEwRjtBQUN4RixVQUFNM0QsU0FBUzNCLFFBQVF1RixhQUF2QjtBQUNBLFVBQU0xQyxVQUFVNUMsT0FBT0MsU0FBU3NCLE9BQVQsY0FBc0JBLE9BQXRCLElBQStCeUQsYUFBYSxDQUFDRyxjQUFELENBQTVDLElBQVAsRUFBd0V6RCxNQUF4RSxDQUFoQjtBQUNBLFVBQUlrQixRQUFRL0UsTUFBUixLQUFtQixDQUF2QixFQUEwQjtBQUN4QjBELGdCQUFReUQsV0FBUixHQUFzQixDQUFDRyxjQUFELENBQXRCO0FBQ0FyRixhQUFLMkIsT0FBTCxDQUFhRixPQUFiO0FBQ0EsZUFBTyxJQUFQO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFNBQU8sS0FBUDtBQUNELENBdEJEOztBQXdCQTs7Ozs7Ozs7O0FBU0EsSUFBTUMsY0FBYyxTQUFkQSxXQUFjLENBQUN6QixPQUFELFNBQWdDQyxNQUFoQyxFQUF3Q0MsUUFBeEMsRUFBcUQ7QUFBQSxNQUF6Q1IsUUFBeUMsU0FBekNBLFFBQXlDO0FBQUEsTUFBL0JDLE1BQStCLFNBQS9CQSxNQUErQjs7QUFDdkUsTUFBSTZCLFVBQVVJLHNCQUFzQmxDLFFBQXRCLEVBQWdDTSxPQUFoQyxFQUF5Q0wsTUFBekMsRUFBaURNLE1BQWpELEVBQXlEQyxRQUF6RCxDQUFkO0FBQ0EsTUFBSSxDQUFDc0IsT0FBTCxFQUFjO0FBQ1pBLGNBQVU0QyxlQUFlcEUsT0FBZixFQUF3QkwsTUFBeEIsQ0FBVjtBQUNEO0FBQ0QsU0FBTzZCLE9BQVA7QUFDRCxDQU5EOztBQVFBOzs7Ozs7Ozs7QUFTQSxJQUFNcUMsY0FBYyxTQUFkQSxXQUFjLENBQUN0RixTQUFELEVBQVl3QyxJQUFaLEVBQWtCNUMsS0FBbEIsRUFBeUJxSCxnQkFBekIsRUFBOEM7QUFDaEUsTUFBSSxDQUFDckgsS0FBTCxFQUFZO0FBQ1YsV0FBTyxJQUFQO0FBQ0Q7QUFDRCxNQUFNc0gsUUFBUWxILGFBQWFpSCxnQkFBM0I7QUFDQSxNQUFJLENBQUNDLEtBQUwsRUFBWTtBQUNWLFdBQU8sS0FBUDtBQUNEO0FBQ0QsU0FBT0EsTUFBTTFFLElBQU4sRUFBWTVDLEtBQVosRUFBbUJxSCxnQkFBbkIsQ0FBUDtBQUNELENBVEQsQzs7Ozs7Ozs7Ozs7Ozs7OztBQzliQTs7QUFDQTs7Ozs7Ozs7OztBQVVBOzs7Ozs7QUFNTyxJQUFNRSx3Q0FBZ0IsU0FBaEJBLGFBQWdCO0FBQUEsTUFBQy9DLElBQUQsdUVBQVEsRUFBUjtBQUFBLG9CQUN4QkcsWUFBWSxFQURZLEVBQ1JKLFNBQVMsRUFERCxFQUNLaUMsUUFBUSxFQURiLEVBQ2lCTSxhQUFhLEVBRDlCLElBQ3FDdEMsSUFEckM7QUFBQSxDQUF0Qjs7QUFHUDs7Ozs7O0FBTU8sSUFBTWdELHNEQUF1QixTQUF2QkEsb0JBQXVCLENBQUM3QyxVQUFEO0FBQUEsU0FDbENBLFdBQVd6QyxHQUFYLENBQWUsZ0JBQXFCO0FBQUEsUUFBbEJVLElBQWtCLFFBQWxCQSxJQUFrQjtBQUFBLFFBQVo1QyxLQUFZLFFBQVpBLEtBQVk7O0FBQ2xDLFFBQUlBLFVBQVUsSUFBZCxFQUFvQjtBQUNsQixtQkFBVzRDLElBQVg7QUFDRDtBQUNELFFBQUlBLFNBQVMsSUFBVCxJQUFpQixxQ0FBcUI1QyxLQUFyQixDQUFyQixFQUFrRDtBQUNoRCxtQkFBV0EsS0FBWDtBQUNEO0FBQ0QsaUJBQVc0QyxJQUFYLFVBQW9CNUMsS0FBcEI7QUFDRCxHQVJELEVBUUd5SCxJQVJILENBUVEsRUFSUixDQURrQztBQUFBLENBQTdCOztBQVdQOzs7Ozs7QUFNTyxJQUFNQyxnREFBb0IsU0FBcEJBLGlCQUFvQixDQUFDbkQsT0FBRDtBQUFBLFNBQy9CQSxRQUFRckMsR0FBUixDQUFZO0FBQUEsV0FBSyxxQ0FBcUJ5RixDQUFyQixVQUE4QkEsQ0FBOUIsaUJBQWdEQSxDQUFoRCxPQUFMO0FBQUEsR0FBWixFQUF3RUYsSUFBeEUsQ0FBNkUsRUFBN0UsQ0FEK0I7QUFBQSxDQUExQjs7QUFHUDs7Ozs7O0FBTU8sSUFBTUcsOENBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBQ3BCLE1BQUQ7QUFBQSxTQUFZQSxPQUFPN0csTUFBUCxTQUFvQjZHLE9BQU9pQixJQUFQLENBQVksR0FBWixDQUFwQixHQUF5QyxFQUFyRDtBQUFBLENBQXpCOztBQUVQOzs7Ozs7QUFNTyxJQUFNSSxnREFBb0IsU0FBcEJBLGlCQUFvQixDQUFDeEUsT0FBRCxFQUFhO0FBQUEsTUFDcENrRCxPQURvQyxHQUNVbEQsT0FEVixDQUNwQ2tELE9BRG9DO0FBQUEsTUFDM0J2QixHQUQyQixHQUNVM0IsT0FEVixDQUMzQjJCLEdBRDJCO0FBQUEsTUFDdEJMLFVBRHNCLEdBQ1V0QixPQURWLENBQ3RCc0IsVUFEc0I7QUFBQSxNQUNWSixPQURVLEdBQ1VsQixPQURWLENBQ1ZrQixPQURVO0FBQUEsTUFDRGlDLE1BREMsR0FDVW5ELE9BRFYsQ0FDRG1ELE1BREM7O0FBRTVDLE1BQU14RyxjQUNKdUcsWUFBWSxPQUFaLEdBQXNCLElBQXRCLEdBQTZCLEVBRHpCLEtBR0p2QixPQUFPLEVBSEgsSUFLSndDLHFCQUFxQjdDLFVBQXJCLENBTEksR0FPSitDLGtCQUFrQm5ELE9BQWxCLENBUEksR0FTSnFELGlCQUFpQnBCLE1BQWpCLENBVEY7QUFXQSxTQUFPeEcsS0FBUDtBQUNELENBZE07O0FBZ0JQOzs7Ozs7QUFNTyxJQUFNOEgsMENBQWlCLFNBQWpCQSxjQUFpQixDQUFDbEcsSUFBRDtBQUFBLFNBQzVCQSxLQUFLTSxHQUFMLENBQVMyRixpQkFBVCxFQUE0QkosSUFBNUIsQ0FBaUMsR0FBakMsQ0FENEI7QUFBQSxDQUF2Qjs7QUFJUCxJQUFNTSxrQkFBa0IsU0FBbEJBLGVBQWtCLENBQUMvSCxLQUFEO0FBQUEsU0FDdEJBLFNBQVNBLE1BQU1DLE9BQU4sQ0FBYyx1Q0FBZCxFQUF1RCxJQUF2RCxFQUNOQSxPQURNLENBQ0UsV0FERixFQUNlLE1BRGYsRUFFTkEsT0FGTSxDQUVFLE9BRkYsRUFFVyxJQUZYLENBRGE7QUFBQSxDQUF4Qjs7QUFLQTs7Ozs7O0FBTU8sSUFBTStILGdEQUFvQixTQUFwQkEsaUJBQW9CLENBQUNyRCxVQUFEO0FBQUEsU0FDL0JBLFdBQVd6QyxHQUFYLENBQWUsaUJBQXFCO0FBQUEsUUFBbEJVLElBQWtCLFNBQWxCQSxJQUFrQjtBQUFBLFFBQVo1QyxLQUFZLFNBQVpBLEtBQVk7O0FBQ2xDLFFBQUlBLFVBQVUsSUFBZCxFQUFvQjtBQUNsQixvQkFBWTRDLElBQVo7QUFDRDtBQUNELGtCQUFZQSxJQUFaLFVBQXFCbUYsZ0JBQWdCL0gsS0FBaEIsQ0FBckI7QUFDRCxHQUxELEVBS0d5SCxJQUxILENBS1EsRUFMUixDQUQrQjtBQUFBLENBQTFCOztBQVFQOzs7Ozs7QUFNTyxJQUFNUSwwQ0FBaUIsU0FBakJBLGNBQWlCLENBQUMxRCxPQUFEO0FBQUEsU0FDNUJBLFFBQVFyQyxHQUFSLENBQVk7QUFBQSxvRUFBNER5RixDQUE1RDtBQUFBLEdBQVosRUFBaUZGLElBQWpGLENBQXNGLEVBQXRGLENBRDRCO0FBQUEsQ0FBdkI7O0FBR1A7Ozs7OztBQU1PLElBQU1TLHdDQUFnQixTQUFoQkEsYUFBZ0IsQ0FBQzFCLE1BQUQ7QUFBQSxTQUMzQkEsT0FBT3RFLEdBQVAsQ0FBVyxhQUFLO0FBQ2QsUUFBTXRCLFFBQVFzRyxFQUFFdEcsS0FBRixDQUFRLDRDQUFSLENBQWQ7QUFDQSxRQUFJLENBQUNBLEtBQUwsRUFBWTtBQUNWLGFBQU8sRUFBUDtBQUNEOztBQUVELFlBQVFBLE1BQU0sQ0FBTixDQUFSO0FBQ0UsV0FBSyxXQUFMO0FBQ0UsdURBQTZDQSxNQUFNLENBQU4sQ0FBN0M7O0FBRUYsV0FBSyxhQUFMO0FBQ0UscUJBQVdBLE1BQU0sQ0FBTixDQUFYOztBQUVGLFdBQUssVUFBTDtBQUNFLHFDQUEyQkEsTUFBTSxDQUFOLENBQTNCOztBQUVGO0FBQ0UsZUFBTyxFQUFQO0FBWEo7QUFhRCxHQW5CRCxFQW1CRzZHLElBbkJILENBbUJRLEVBbkJSLENBRDJCO0FBQUEsQ0FBdEI7O0FBc0JQOzs7Ozs7QUFNTyxJQUFNVSwwQ0FBaUIsU0FBakJBLGNBQWlCLENBQUM5RSxPQUFELEVBQWE7QUFBQSxNQUNqQ2tELE9BRGlDLEdBQzBCbEQsT0FEMUIsQ0FDakNrRCxPQURpQztBQUFBLE1BQ3hCdkIsR0FEd0IsR0FDMEIzQixPQUQxQixDQUN4QjJCLEdBRHdCO0FBQUEsTUFDbkJMLFVBRG1CLEdBQzBCdEIsT0FEMUIsQ0FDbkJzQixVQURtQjtBQUFBLE1BQ1BKLE9BRE8sR0FDMEJsQixPQUQxQixDQUNQa0IsT0FETztBQUFBLE1BQ0VpQyxNQURGLEdBQzBCbkQsT0FEMUIsQ0FDRW1ELE1BREY7QUFBQSxNQUNVTSxXQURWLEdBQzBCekQsT0FEMUIsQ0FDVXlELFdBRFY7O0FBRXpDLE1BQU05RyxjQUNKdUcsWUFBWSxPQUFaLEdBQXNCLEdBQXRCLEdBQTRCLElBRHhCLEtBR0p2QixPQUFPLEdBSEgsSUFLSmdELGtCQUFrQnJELFVBQWxCLENBTEksR0FPSnNELGVBQWUxRCxPQUFmLENBUEksR0FTSjJELGNBQWMxQixNQUFkLENBVEksR0FXSjRCLG1CQUFtQnRCLFdBQW5CLENBWEY7QUFhQSxTQUFPOUcsS0FBUDtBQUNELENBaEJNOztBQWtCUDs7Ozs7O0FBTU8sSUFBTXFJLG9DQUFjLFNBQWRBLFdBQWMsQ0FBQ3pHLElBQUQ7QUFBQSxlQUFjQSxLQUFLTSxHQUFMLENBQVNpRyxjQUFULEVBQXlCVixJQUF6QixDQUE4QixFQUE5QixDQUFkO0FBQUEsQ0FBcEI7O0FBRVA7Ozs7OztBQU1PLElBQU1XLGtEQUFxQixTQUFyQkEsa0JBQXFCLENBQUNsQyxRQUFEO0FBQUEsU0FDaENBLFNBQVN2RyxNQUFULFNBQXNCdUcsU0FBU2hFLEdBQVQsQ0FBYW1HLFdBQWIsRUFBMEJaLElBQTFCLENBQStCLElBQS9CLENBQXRCLFNBQWdFLEVBRGhDO0FBQUEsQ0FBM0I7O0FBSVAsSUFBTTFGLFdBQVc7QUFDZixTQUFPO0FBQ0w0QyxnQkFBWTZDLG9CQURQO0FBRUxqRCxhQUFTbUQsaUJBRko7QUFHTGxCLFlBQVFvQixnQkFISDtBQUlMdkUsYUFBU3dFLGlCQUpKO0FBS0xqRyxVQUFNa0c7QUFMRCxHQURRO0FBUWYsV0FBUztBQUNQbkQsZ0JBQVlxRCxpQkFETDtBQUVQekQsYUFBUzBELGNBRkY7QUFHUHpCLFlBQVEwQixhQUhEO0FBSVA3RSxhQUFTOEUsY0FKRjtBQUtQdkcsVUFBTXlHO0FBTEMsR0FSTTtBQWVmLFlBQVU7QUFmSyxDQUFqQjs7QUFrQkF0RyxTQUFTdUcsTUFBVCxHQUFrQnZHLFNBQVN3RyxHQUEzQjtBQUNBeEcsU0FBUyxDQUFULElBQWNBLFNBQVN3RyxHQUF2QjtBQUNBeEcsU0FBUyxDQUFULElBQWNBLFNBQVN5RyxLQUF2Qjs7QUFFQTs7Ozs7Ozs7O0FBU0E7Ozs7O0FBS08sSUFBTUMsb0NBQWMsU0FBZEEsV0FBYztBQUFBLE1BQUN0SCxPQUFELHVFQUFXLEVBQVg7QUFBQSxTQUN6QlksU0FBU1osUUFBUVEsTUFBUixJQUFrQixLQUEzQixDQUR5QjtBQUFBLENBQXBCLEM7Ozs7Ozs7Ozs7OztBQzVOUDtBQUNBLElBQUkrRyxlQUFKOztBQUVBOzs7Ozs7QUFNQSxJQUFNQyxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsUUFBRCxFQUE2QjtBQUFBLE1BQWxCcEYsTUFBa0IsdUVBQVQsSUFBUzs7QUFDaEQsTUFBSSxDQUFDa0YsTUFBTCxFQUFhO0FBQ1hBLGFBQVMsbUJBQUFHLENBQVEsQ0FBUixDQUFUO0FBQ0Q7QUFDRCxTQUFPSCxPQUFPRSxRQUFQLEVBQWlCcEYsVUFBVW5DLFFBQTNCLENBQVA7QUFDRCxDQUxEOztBQU9BOzs7Ozs7QUFNQSxJQUFNeUgsY0FBYyxTQUFkQSxXQUFjLENBQUNGLFFBQUQsRUFBNkI7QUFBQSxNQUFsQnBGLE1BQWtCLHVFQUFULElBQVM7O0FBQy9DQSxXQUFVQSxVQUFVbkMsUUFBcEI7QUFDQSxNQUFJMEgsTUFBTXZGLE1BQVY7QUFDQSxTQUFPdUYsSUFBSTNGLFVBQVgsRUFBdUI7QUFDckIyRixVQUFNQSxJQUFJM0YsVUFBVjtBQUNEO0FBQ0QsTUFBSTJGLFFBQVF2RixNQUFSLElBQWtCLENBQUNvRixTQUFTekIsVUFBVCxDQUFvQixHQUFwQixDQUF2QixFQUFpRDtBQUMvQ3lCLHFCQUFlQSxRQUFmO0FBQ0Q7QUFDRCxNQUFJSSxXQUFXRCxJQUFJRSxRQUFKLENBQWFMLFFBQWIsRUFBdUJwRixNQUF2QixFQUErQixJQUEvQixFQUFxQyxDQUFyQyxDQUFmO0FBQ0EsTUFBSTBGLFdBQVcsRUFBZjtBQUNBLE1BQUlySCxPQUFKO0FBQ0EsU0FBUUEsVUFBVW1ILFNBQVNHLFdBQVQsRUFBbEIsRUFBMkM7QUFDekNELGFBQVNsRixJQUFULENBQWNuQyxPQUFkO0FBQ0Q7QUFDRCxTQUFPcUgsUUFBUDtBQUNELENBaEJEOztBQWtCQTs7Ozs7O0FBTUEsSUFBTUUsWUFBWSxTQUFaQSxTQUFZLENBQUNSLFFBQUQ7QUFBQSxNQUFXcEYsTUFBWCx1RUFBb0IsSUFBcEI7QUFBQSxTQUNoQixDQUFDQSxVQUFVbkMsUUFBWCxFQUFxQjJGLGdCQUFyQixDQUFzQzRCLFFBQXRDLENBRGdCO0FBQUEsQ0FBbEI7O0FBR0EsSUFBTTlHLFNBQVM7QUFDYixTQUFPc0gsU0FETTtBQUViLFdBQVNOLFdBRkk7QUFHYixZQUFVSDtBQUhHLENBQWY7O0FBTUE3RyxPQUFPLENBQVAsSUFBWUEsT0FBT3lHLEdBQW5CO0FBQ0F6RyxPQUFPLENBQVAsSUFBWUEsT0FBTzBHLEtBQW5COztBQUVBOzs7OztBQUtPLElBQU1hLGdDQUFZLFNBQVpBLFNBQVk7QUFBQSxNQUFDbEksT0FBRCx1RUFBVyxFQUFYO0FBQUEsU0FDdkIsVUFBQ3lILFFBQUQsRUFBV3BGLE1BQVgsRUFBc0I7QUFDcEIsUUFBSTtBQUNGLGFBQU8xQixPQUFPWCxRQUFRUSxNQUFSLElBQWtCLEtBQXpCLEVBQWdDaUgsUUFBaEMsRUFBMENwRixVQUFVckMsUUFBUUMsSUFBNUQsQ0FBUDtBQUNELEtBRkQsQ0FFRSxPQUFPa0ksR0FBUCxFQUFZO0FBQ1osYUFBTyxFQUFQO0FBQ0Q7QUFDRixHQVBzQjtBQUFBLENBQWxCLEM7Ozs7Ozs7Ozs7Ozs7O0FDOUNQOztBQUNPLElBQU1DLGdEQUFvQixTQUFwQkEsaUJBQW9CLENBQUNMLFFBQUQsRUFBNEI7QUFBQSxNQUFqQi9ILE9BQWlCLHVFQUFQLEVBQU87QUFBQSxzQkFJdkRBLE9BSnVELENBR3pEQyxJQUh5RDtBQUFBLE1BR3pEQSxJQUh5RCxpQ0FHbERDLFFBSGtEOzs7QUFNM0QsTUFBTW1JLFlBQVksRUFBbEI7O0FBRUFOLFdBQVN6RyxPQUFULENBQWlCLFVBQUNaLE9BQUQsRUFBVTRILEtBQVYsRUFBb0I7QUFDbkMsUUFBTUMsVUFBVSxFQUFoQjtBQUNBLFdBQU83SCxZQUFZVCxJQUFuQixFQUF5QjtBQUN2QlMsZ0JBQVVBLFFBQVF1QixVQUFsQjtBQUNBc0csY0FBUW5HLE9BQVIsQ0FBZ0IxQixPQUFoQjtBQUNEO0FBQ0QySCxjQUFVQyxLQUFWLElBQW1CQyxPQUFuQjtBQUNELEdBUEQ7O0FBU0FGLFlBQVVHLElBQVYsQ0FBZSxVQUFDQyxJQUFELEVBQU9DLElBQVA7QUFBQSxXQUFnQkQsS0FBS2pLLE1BQUwsR0FBY2tLLEtBQUtsSyxNQUFuQztBQUFBLEdBQWY7O0FBRUEsTUFBTW1LLGtCQUFrQk4sVUFBVXRGLEtBQVYsRUFBeEI7O0FBRUEsTUFBSTZGLFdBQVcsSUFBZjs7QUFyQjJEO0FBd0J6RCxRQUFNdkcsU0FBU3NHLGdCQUFnQmhLLENBQWhCLENBQWY7QUFDQSxRQUFNa0ssVUFBVVIsVUFBVW5ILElBQVYsQ0FBZSxVQUFDNEgsWUFBRCxFQUFrQjtBQUMvQyxhQUFPLENBQUNBLGFBQWE1SCxJQUFiLENBQWtCLFVBQUM2SCxXQUFEO0FBQUEsZUFBaUJBLGdCQUFnQjFHLE1BQWpDO0FBQUEsT0FBbEIsQ0FBUjtBQUNELEtBRmUsQ0FBaEI7O0FBSUEsUUFBSXdHLE9BQUosRUFBYTtBQUNYO0FBQ0E7QUFDRDs7QUFFREQsZUFBV3ZHLE1BQVg7QUFsQ3lEOztBQXVCM0QsT0FBSyxJQUFJMUQsSUFBSSxDQUFSLEVBQVdzRixJQUFJMEUsZ0JBQWdCbkssTUFBcEMsRUFBNENHLElBQUlzRixDQUFoRCxFQUFtRHRGLEdBQW5ELEVBQXdEO0FBQUE7O0FBQUEsMEJBUXBEO0FBSUg7O0FBRUQsU0FBT2lLLFFBQVA7QUFDRCxDQXRDTTs7QUF3Q1A7Ozs7OztBQTFEQTs7Ozs7O0FBTUE7Ozs7QUFJQTs7Ozs7OztBQXNETyxJQUFNSSxvREFBc0IsU0FBdEJBLG1CQUFzQixDQUFDakIsUUFBRCxFQUE0QjtBQUFBLE1BQWpCL0gsT0FBaUIsdUVBQVAsRUFBTztBQUFBLHdCQUNyQ0EsT0FEcUMsQ0FDckRLLE1BRHFEO0FBQUEsTUFDckRBLE1BRHFELG1DQUM1QyxFQUQ0Qzs7O0FBRzdELE1BQU00SSxtQkFBbUI7QUFDdkI3RixhQUFTLEVBRGM7QUFFdkJJLGdCQUFZLEVBRlc7QUFHdkJLLFNBQUs7QUFIa0IsR0FBekI7O0FBTUFrRSxXQUFTekcsT0FBVCxDQUFpQixVQUFDWixPQUFELEVBQWE7QUFBQSxRQUdqQndJLGFBSGlCLEdBTXhCRCxnQkFOd0IsQ0FHMUI3RixPQUgwQjtBQUFBLFFBSWQrRixnQkFKYyxHQU14QkYsZ0JBTndCLENBSTFCekYsVUFKMEI7QUFBQSxRQUtyQjRGLFNBTHFCLEdBTXhCSCxnQkFOd0IsQ0FLMUJwRixHQUwwQjs7QUFRNUI7O0FBQ0EsUUFBSXFGLGtCQUFrQkcsU0FBdEIsRUFBaUM7QUFDL0IsVUFBSWpHLFVBQVUxQyxRQUFRNEksWUFBUixDQUFxQixPQUFyQixDQUFkO0FBQ0EsVUFBSWxHLE9BQUosRUFBYTtBQUNYQSxrQkFBVUEsUUFBUXFCLElBQVIsR0FBZUMsS0FBZixDQUFxQixHQUFyQixFQUEwQjFCLE1BQTFCLENBQWlDO0FBQUEsaUJBQU8sQ0FBQzNDLE9BQU91RSxLQUFSLElBQWlCLENBQUN2RSxPQUFPdUUsS0FBUCxDQUFhMkUsR0FBYixDQUF6QjtBQUFBLFNBQWpDLENBQVY7QUFDQSxZQUFJLENBQUNMLGNBQWMxSyxNQUFuQixFQUEyQjtBQUN6QnlLLDJCQUFpQjdGLE9BQWpCLEdBQTJCQSxPQUEzQjtBQUNELFNBRkQsTUFFTztBQUNMOEYsMEJBQWdCQSxjQUFjbEcsTUFBZCxDQUFxQixVQUFDaEMsS0FBRDtBQUFBLG1CQUFXb0MsUUFBUWxDLElBQVIsQ0FBYSxVQUFDTyxJQUFEO0FBQUEscUJBQVVBLFNBQVNULEtBQW5CO0FBQUEsYUFBYixDQUFYO0FBQUEsV0FBckIsQ0FBaEI7QUFDQSxjQUFJa0ksY0FBYzFLLE1BQWxCLEVBQTBCO0FBQ3hCeUssNkJBQWlCN0YsT0FBakIsR0FBMkI4RixhQUEzQjtBQUNELFdBRkQsTUFFTztBQUNMLG1CQUFPRCxpQkFBaUI3RixPQUF4QjtBQUNEO0FBQ0Y7QUFDRixPQVpELE1BWU87QUFDTCxlQUFPNkYsaUJBQWlCN0YsT0FBeEI7QUFDRDtBQUNGOztBQUVEO0FBQ0EsUUFBSStGLHFCQUFxQkUsU0FBekIsRUFBb0M7QUFDbEMsVUFBTUcsb0JBQW9COUksUUFBUThDLFVBQWxDO0FBQ0EsVUFBTUEsYUFBYXBDLE9BQU9DLElBQVAsQ0FBWW1JLGlCQUFaLEVBQStCdEssTUFBL0IsQ0FBc0MsVUFBQ3NFLFVBQUQsRUFBYVUsR0FBYixFQUFxQjtBQUM1RSxZQUFNdkUsWUFBWTZKLGtCQUFrQnRGLEdBQWxCLENBQWxCO0FBQ0EsWUFBTXRFLGdCQUFnQix3QkFBWUQsYUFBYUEsVUFBVThCLElBQW5DLENBQXRCO0FBQ0EsWUFBTTBDLGlCQUFpQix3QkFBWXhFLGFBQWFBLFVBQVVkLEtBQW5DLENBQXZCO0FBQ0EsWUFBTXVGLGlCQUFpQnhFLGtCQUFrQixPQUF6QztBQUNBLFlBQU15RSxnQkFBaUJELGtCQUFrQi9ELE9BQU9ULGFBQVAsQ0FBbkIsSUFBNkNTLE9BQU9WLFNBQTFFO0FBQ0EsWUFBTTJFLHVCQUF3QkYsa0JBQWtCMUUscUJBQWNFLGFBQWQsQ0FBbkIsSUFBb0RGLHFCQUFjQyxTQUEvRjtBQUNBLFlBQUlBLGFBQWFDLGtCQUFrQixPQUEvQixJQUEwQyxDQUFDLHdCQUFZeUUsYUFBWixFQUEyQnpFLGFBQTNCLEVBQTBDdUUsY0FBMUMsRUFBMERHLG9CQUExRCxDQUEvQyxFQUFnSTtBQUM5SGQscUJBQVc1RCxhQUFYLElBQTRCRCxVQUFVZCxLQUF0QztBQUNEO0FBQ0QsZUFBTzJFLFVBQVA7QUFDRCxPQVhrQixFQVdoQixFQVhnQixDQUFuQjs7QUFhQSxVQUFNaUcsa0JBQWtCckksT0FBT0MsSUFBUCxDQUFZbUMsVUFBWixDQUF4QjtBQUNBLFVBQU1rRyx3QkFBd0J0SSxPQUFPQyxJQUFQLENBQVk4SCxnQkFBWixDQUE5Qjs7QUFFQSxVQUFJTSxnQkFBZ0JqTCxNQUFwQixFQUE0QjtBQUMxQixZQUFJLENBQUNrTCxzQkFBc0JsTCxNQUEzQixFQUFtQztBQUNqQ3lLLDJCQUFpQnpGLFVBQWpCLEdBQThCQSxVQUE5QjtBQUNELFNBRkQsTUFFTztBQUNMMkYsNkJBQW1CTyxzQkFBc0J4SyxNQUF0QixDQUE2QixVQUFDeUssb0JBQUQsRUFBdUJsSSxJQUF2QixFQUFnQztBQUM5RSxnQkFBTTVDLFFBQVFzSyxpQkFBaUIxSCxJQUFqQixDQUFkO0FBQ0EsZ0JBQUk1QyxVQUFVMkUsV0FBVy9CLElBQVgsQ0FBZCxFQUFnQztBQUM5QmtJLG1DQUFxQmxJLElBQXJCLElBQTZCNUMsS0FBN0I7QUFDRDtBQUNELG1CQUFPOEssb0JBQVA7QUFDRCxXQU5rQixFQU1oQixFQU5nQixDQUFuQjtBQU9BLGNBQUl2SSxPQUFPQyxJQUFQLENBQVk4SCxnQkFBWixFQUE4QjNLLE1BQWxDLEVBQTBDO0FBQ3hDeUssNkJBQWlCekYsVUFBakIsR0FBOEIyRixnQkFBOUI7QUFDRCxXQUZELE1BRU87QUFDTCxtQkFBT0YsaUJBQWlCekYsVUFBeEI7QUFDRDtBQUNGO0FBQ0YsT0FqQkQsTUFpQk87QUFDTCxlQUFPeUYsaUJBQWlCekYsVUFBeEI7QUFDRDtBQUNGOztBQUVEO0FBQ0EsUUFBSTRGLGNBQWNDLFNBQWxCLEVBQTZCO0FBQzNCLFVBQU14RixNQUFNbkQsUUFBUW9ELE9BQVIsQ0FBZ0JDLFdBQWhCLEVBQVo7QUFDQSxVQUFJLENBQUNxRixTQUFMLEVBQWdCO0FBQ2RILHlCQUFpQnBGLEdBQWpCLEdBQXVCQSxHQUF2QjtBQUNELE9BRkQsTUFFTyxJQUFJQSxRQUFRdUYsU0FBWixFQUF1QjtBQUM1QixlQUFPSCxpQkFBaUJwRixHQUF4QjtBQUNEO0FBQ0Y7QUFDRixHQTlFRDs7QUFnRkEsU0FBT29GLGdCQUFQO0FBQ0QsQ0ExRk0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQ3ZDaUJXLFE7O0FBbEJ4Qjs7QUFDQTs7QUFDQTs7b01BVEE7Ozs7Ozs7QUFXQTs7Ozs7O0FBTUE7Ozs7Ozs7O0FBUWUsU0FBU0EsUUFBVCxDQUFtQm5KLElBQW5CLEVBQXlCc0gsUUFBekIsRUFBaUQ7QUFBQSxNQUFkL0gsT0FBYyx1RUFBSixFQUFJOztBQUM5RCxNQUFJUyxLQUFLakMsTUFBTCxLQUFnQixDQUFwQixFQUF1QjtBQUNyQixXQUFPLEVBQVA7QUFDRDs7QUFFRCxNQUFJaUMsS0FBSyxDQUFMLEVBQVEyRSxPQUFSLEtBQW9CLE9BQXhCLEVBQWlDO0FBQy9CM0UsU0FBSyxDQUFMLEVBQVEyRSxPQUFSLEdBQWtCaUUsU0FBbEI7QUFDRDs7QUFFRDtBQUNBLE1BQUksQ0FBQzNLLE1BQU1vQyxPQUFOLENBQWNpSCxRQUFkLENBQUwsRUFBOEI7QUFDNUJBLGVBQVcsQ0FBQ0EsU0FBU3ZKLE1BQVYsR0FBbUIsQ0FBQ3VKLFFBQUQsQ0FBbkIsR0FBZ0MsZ0NBQWdCQSxRQUFoQixDQUEzQztBQUNEOztBQUVELE1BQUksQ0FBQ0EsU0FBU3ZKLE1BQVYsSUFBb0J1SixTQUFTN0csSUFBVCxDQUFjLFVBQUNSLE9BQUQ7QUFBQSxXQUFhQSxRQUFRZ0IsUUFBUixLQUFxQixDQUFsQztBQUFBLEdBQWQsQ0FBeEIsRUFBNEU7QUFDMUUsVUFBTSxJQUFJbUksS0FBSixDQUFVLDRIQUFWLENBQU47QUFDRDs7QUFFRCxNQUFNbEosU0FBUyx5QkFBVVgsT0FBVixDQUFmO0FBQ0EsTUFBTVksV0FBVywyQkFBWVosT0FBWixDQUFqQjs7QUFFQSxNQUFJUyxLQUFLakMsTUFBTCxLQUFnQixDQUFwQixFQUF1QjtBQUNyQixXQUFPLENBQUNzTCxhQUFhLEVBQWIsRUFBaUJySixLQUFLLENBQUwsQ0FBakIsRUFBMEIsRUFBMUIsRUFBOEJzSCxRQUE5QixFQUF3Q3BILE1BQXhDLEVBQWdEQyxRQUFoRCxDQUFELENBQVA7QUFDRDs7QUFFRCxNQUFJbUosZUFBZSxLQUFuQjtBQUNBLE1BQUl0SixLQUFLQSxLQUFLakMsTUFBTCxHQUFZLENBQWpCLEVBQW9CNEcsT0FBcEIsS0FBZ0MsT0FBcEMsRUFBNkM7QUFDM0MzRSxTQUFLQSxLQUFLakMsTUFBTCxHQUFZLENBQWpCLElBQXNCc0wsYUFBYXJKLEtBQUt1SixLQUFMLENBQVcsQ0FBWCxFQUFjLENBQUMsQ0FBZixDQUFiLEVBQWdDdkosS0FBS0EsS0FBS2pDLE1BQUwsR0FBWSxDQUFqQixDQUFoQyxFQUFxRCxFQUFyRCxFQUF5RHVKLFFBQXpELEVBQW1FcEgsTUFBbkUsRUFBMkVDLFFBQTNFLENBQXRCO0FBQ0FtSixtQkFBZSxJQUFmO0FBQ0Q7O0FBRUR0SixzQ0FBV0EsSUFBWDtBQUNBLE1BQU13SixZQUFZLENBQUN4SixLQUFLeUosR0FBTCxFQUFELENBQWxCOztBQWhDOEQ7QUFrQzVELFFBQU1DLFVBQVUxSixLQUFLeUosR0FBTCxFQUFoQjtBQUNBLFFBQU0zRyxVQUFVNUMsT0FBT0MsU0FBU0gsSUFBVCw4QkFBa0JBLElBQWxCLEdBQTJCd0osU0FBM0IsRUFBUCxDQUFoQjtBQUNBLFFBQU1HLGdCQUFnQjdHLFFBQVEvRSxNQUFSLEtBQW1CdUosU0FBU3ZKLE1BQTVCLElBQXNDdUosU0FBU3NDLEtBQVQsQ0FBZSxVQUFDM0osT0FBRCxFQUFVL0IsQ0FBVjtBQUFBLGFBQWdCK0IsWUFBWTZDLFFBQVE1RSxDQUFSLENBQTVCO0FBQUEsS0FBZixDQUE1RDtBQUNBLFFBQUksQ0FBQ3lMLGFBQUwsRUFBb0I7QUFDbEJILGdCQUFVN0gsT0FBVixDQUFrQjBILGFBQWFySixJQUFiLEVBQW1CMEosT0FBbkIsRUFBNEJGLFNBQTVCLEVBQXVDbEMsUUFBdkMsRUFBaURwSCxNQUFqRCxFQUF5REMsUUFBekQsQ0FBbEI7QUFDRDtBQXZDMkQ7O0FBaUM5RCxTQUFPSCxLQUFLakMsTUFBTCxHQUFjLENBQXJCLEVBQXdCO0FBQUE7QUFPdkI7QUFDRHlMLFlBQVU3SCxPQUFWLENBQWtCM0IsS0FBSyxDQUFMLENBQWxCO0FBQ0FBLFNBQU93SixTQUFQOztBQUVBO0FBQ0F4SixPQUFLLENBQUwsSUFBVXFKLGFBQWEsRUFBYixFQUFpQnJKLEtBQUssQ0FBTCxDQUFqQixFQUEwQkEsS0FBS3VKLEtBQUwsQ0FBVyxDQUFYLENBQTFCLEVBQXlDakMsUUFBekMsRUFBbURwSCxNQUFuRCxFQUEyREMsUUFBM0QsQ0FBVjtBQUNBLE1BQUksQ0FBQ21KLFlBQUwsRUFBbUI7QUFDakJ0SixTQUFLQSxLQUFLakMsTUFBTCxHQUFZLENBQWpCLElBQXNCc0wsYUFBYXJKLEtBQUt1SixLQUFMLENBQVcsQ0FBWCxFQUFjLENBQUMsQ0FBZixDQUFiLEVBQWdDdkosS0FBS0EsS0FBS2pDLE1BQUwsR0FBWSxDQUFqQixDQUFoQyxFQUFxRCxFQUFyRCxFQUF5RHVKLFFBQXpELEVBQW1FcEgsTUFBbkUsRUFBMkVDLFFBQTNFLENBQXRCO0FBQ0Q7O0FBRUQsU0FBT0gsSUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7OztBQVdBLElBQU02SixlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsR0FBRCxFQUFNSixPQUFOLEVBQWVLLElBQWYsRUFBcUJ6QyxRQUFyQixFQUErQnBILE1BQS9CLEVBQXVDQyxRQUF2QyxFQUFvRDtBQUFBLG1CQUM3QywwQkFBVXVKLFFBQVE5RSxNQUFsQixFQUEwQixVQUFDbEcsSUFBRDtBQUFBLFdBQVVBLEtBQUs2RyxVQUFMLENBQWdCLFVBQWhCLENBQVY7QUFBQSxHQUExQixDQUQ2QztBQUFBO0FBQUEsTUFDaEVsRyxRQURnRTtBQUFBLE1BQ3REMkssS0FEc0Q7O0FBR3ZFLE1BQUkzSyxTQUFTdEIsTUFBVCxHQUFrQixDQUFsQixJQUF1QmdNLEtBQUtoTSxNQUFoQyxFQUF3QztBQUN0QyxRQUFNNkUsb0JBQVk4RyxPQUFaLElBQXFCOUUscUNBQVlvRixLQUFaLHNCQUFzQjNLLFFBQXRCLEVBQXJCLEdBQU47QUFDQSxXQUFPdUQsS0FBS2dDLE1BQUwsQ0FBWTdHLE1BQVosR0FBcUJpTSxNQUFNak0sTUFBbEMsRUFBMEM7QUFDeEMsVUFBTWtNLFlBQVlySCxLQUFLZ0MsTUFBTCxDQUFZMkUsS0FBWixDQUFrQixDQUFsQixFQUFxQixDQUFDLENBQXRCLENBQWxCO0FBQ0EsVUFBSSxDQUFDVyxlQUFlaEssT0FBT0MsU0FBU0gsSUFBVCw4QkFBa0I4SixHQUFsQixpQkFBNEJsSCxJQUE1QixJQUFrQ2dDLFFBQVFxRixTQUExQyx5QkFBMERGLElBQTFELEdBQVAsQ0FBZixFQUF5RnpDLFFBQXpGLENBQUwsRUFBeUc7QUFDdkc7QUFDRDtBQUNEMUUsV0FBS2dDLE1BQUwsR0FBY3FGLFNBQWQ7QUFDRDtBQUNELFdBQU9ySCxJQUFQO0FBQ0Q7QUFDRCxTQUFPOEcsT0FBUDtBQUNELENBZkQ7O0FBaUJBOzs7Ozs7Ozs7OztBQVdBLElBQU1TLHFCQUFxQixTQUFyQkEsa0JBQXFCLENBQUNMLEdBQUQsRUFBTUosT0FBTixFQUFlSyxJQUFmLEVBQXFCekMsUUFBckIsRUFBK0JwSCxNQUEvQixFQUF1Q0MsUUFBdkMsRUFBb0Q7QUFDN0U7QUFDQSxNQUFJdUosUUFBUTNHLFVBQVIsQ0FBbUJoRixNQUFuQixHQUE0QixDQUFoQyxFQUFtQztBQUNqQyxRQUFJZ0YsMENBQWlCMkcsUUFBUTNHLFVBQXpCLEVBQUo7O0FBRUEsUUFBTXFILFdBQVcsU0FBWEEsUUFBVyxDQUFDQyxRQUFELEVBQVdDLGFBQVgsRUFBNkI7QUFDNUMsVUFBSXBNLElBQUltTSxTQUFTdE0sTUFBVCxHQUFrQixDQUExQjtBQUNBLGFBQU9HLEtBQUssQ0FBWixFQUFlO0FBQ2IsWUFBSTZFLGNBQWF1SCxjQUFjRCxRQUFkLEVBQXdCbk0sQ0FBeEIsQ0FBakI7QUFDQSxZQUFJLENBQUNnTSxlQUNIaEssT0FBT0MsU0FBU0gsSUFBVCw4QkFBa0I4SixHQUFsQixpQkFBNEJKLE9BQTVCLElBQXFDM0csdUJBQXJDLHlCQUFzRGdILElBQXRELEdBQVAsQ0FERyxFQUVIekMsUUFGRyxDQUFMLEVBR0c7QUFDRDtBQUNEO0FBQ0RwSjtBQUNBbU0sbUJBQVd0SCxXQUFYO0FBQ0Q7QUFDRCxhQUFPc0gsUUFBUDtBQUNELEtBZEQ7O0FBZ0JBLFFBQU1FLGFBQWFILFNBQVNySCxVQUFULEVBQXFCLFVBQUNBLFVBQUQsRUFBYTdFLENBQWIsRUFBbUI7QUFBQSxVQUNqRDhDLElBRGlELEdBQ3hDK0IsV0FBVzdFLENBQVgsQ0FEd0MsQ0FDakQ4QyxJQURpRDs7QUFFekQsVUFBSUEsU0FBUyxJQUFiLEVBQW1CO0FBQ2pCLGVBQU8rQixVQUFQO0FBQ0Q7QUFDRCwwQ0FBV0EsV0FBV3dHLEtBQVgsQ0FBaUIsQ0FBakIsRUFBb0JyTCxDQUFwQixDQUFYLElBQW1DLEVBQUU4QyxVQUFGLEVBQVE1QyxPQUFPLElBQWYsRUFBbkMsc0JBQTZEMkUsV0FBV3dHLEtBQVgsQ0FBaUJyTCxJQUFJLENBQXJCLENBQTdEO0FBQ0QsS0FOa0IsQ0FBbkI7QUFPQSx3QkFBWXdMLE9BQVosSUFBcUIzRyxZQUFZcUgsU0FBU0csVUFBVCxFQUFxQjtBQUFBLGVBQWN4SCxXQUFXd0csS0FBWCxDQUFpQixDQUFqQixFQUFvQixDQUFDLENBQXJCLENBQWQ7QUFBQSxPQUFyQixDQUFqQztBQUNEO0FBQ0QsU0FBT0csT0FBUDtBQUNELENBL0JEOztBQWlDQTs7Ozs7Ozs7Ozs7QUFXQSxJQUFNYyxxQkFBcUIsU0FBckJBLGtCQUFxQixDQUFDVixHQUFELEVBQU1KLE9BQU4sRUFBZUssSUFBZixFQUFxQnpDLFFBQXJCLEVBQStCcEgsTUFBL0IsRUFBdUNDLFFBQXZDLEVBQW9EO0FBQzdFO0FBQ0EsTUFBSXVKLFFBQVEvRSxPQUFSLEtBQW9CLE9BQXhCLEVBQWlDO0FBQy9CLFFBQU04RiwwQkFBa0JmLE9BQWxCLElBQTJCL0UsU0FBU2lFLFNBQXBDLEdBQU47QUFDQSxRQUFJOUYsV0FBVTVDLE9BQU9DLFNBQVNILElBQVQsOEJBQWtCOEosR0FBbEIsSUFBdUJXLFVBQXZCLHNCQUFzQ1YsSUFBdEMsR0FBUCxDQUFkO0FBQ0EsUUFBSUcsZUFBZXBILFFBQWYsRUFBd0J3RSxRQUF4QixDQUFKLEVBQXVDO0FBQ3JDLGFBQU9tRCxVQUFQO0FBQ0Q7QUFDRjtBQUNELFNBQU9mLE9BQVA7QUFDRCxDQVZEOztBQVlBOzs7Ozs7Ozs7OztBQVdBLElBQU1nQiwrQkFBK0IsU0FBL0JBLDRCQUErQixDQUFDWixHQUFELEVBQU1KLE9BQU4sRUFBZUssSUFBZixFQUFxQnpDLFFBQXJCLEVBQStCcEgsTUFBL0IsRUFBdUNDLFFBQXZDLEVBQW9EO0FBQ3ZGLE1BQUl1SixRQUFReEUsV0FBUixDQUFvQm5ILE1BQXBCLEdBQTZCLENBQTdCLElBQWtDZ00sS0FBS2hNLE1BQTNDLEVBQW1EO0FBQ2pELFFBQU02RSxvQkFBWThHLE9BQVosSUFBcUJ4RSwwQ0FBaUJ3RSxRQUFReEUsV0FBekIsRUFBckIsR0FBTjtBQUNBLFdBQU90QyxLQUFLc0MsV0FBTCxDQUFpQm5ILE1BQWpCLEdBQTBCLENBQWpDLEVBQW9DO0FBQ2xDLFVBQU1rTSxZQUFZckgsS0FBS3NDLFdBQUwsQ0FBaUJxRSxLQUFqQixDQUF1QixDQUF2QixFQUEwQixDQUFDLENBQTNCLENBQWxCO0FBQ0EsVUFBSSxDQUFDVyxlQUFlaEssT0FBT0MsU0FBU0gsSUFBVCw4QkFBa0I4SixHQUFsQixpQkFBNEJsSCxJQUE1QixJQUFrQ3NDLGFBQWErRSxTQUEvQyx5QkFBK0RGLElBQS9ELEdBQVAsQ0FBZixFQUE4RnpDLFFBQTlGLENBQUwsRUFBOEc7QUFDNUc7QUFDRDtBQUNEMUUsV0FBS3NDLFdBQUwsR0FBbUIrRSxTQUFuQjtBQUNEO0FBQ0QsV0FBT3JILElBQVA7QUFDRDtBQUNELFNBQU84RyxPQUFQO0FBQ0QsQ0FiRDs7QUFlQTs7Ozs7Ozs7Ozs7QUFXQSxJQUFNaUIsb0JBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBQ2IsR0FBRCxFQUFNSixPQUFOLEVBQWVLLElBQWYsRUFBcUJ6QyxRQUFyQixFQUErQnBILE1BQS9CLEVBQXVDQyxRQUF2QyxFQUFvRDtBQUM1RSxNQUFNakMsSUFBSXdMLFFBQVE5RSxNQUFSLENBQWVnRyxTQUFmLENBQXlCO0FBQUEsV0FBUWxNLEtBQUs2RyxVQUFMLENBQWdCLFdBQWhCLENBQVI7QUFBQSxHQUF6QixDQUFWO0FBQ0E7QUFDQSxNQUFJckgsS0FBSyxDQUFULEVBQVk7QUFDVjtBQUNBLFFBQU00QyxPQUFPNEksUUFBUTlFLE1BQVIsQ0FBZTFHLENBQWYsRUFBa0JHLE9BQWxCLENBQTBCLFlBQTFCLEVBQXdDLGFBQXhDLENBQWI7QUFDQSxRQUFNd00seUJBQWlCbkIsT0FBakIsSUFBMEI5RSxxQ0FBWThFLFFBQVE5RSxNQUFSLENBQWUyRSxLQUFmLENBQXFCLENBQXJCLEVBQXdCckwsQ0FBeEIsQ0FBWixJQUF3QzRDLElBQXhDLHNCQUFpRDRJLFFBQVE5RSxNQUFSLENBQWUyRSxLQUFmLENBQXFCckwsSUFBSSxDQUF6QixDQUFqRCxFQUExQixHQUFOO0FBQ0EsUUFBSXVELFVBQVV0QixTQUFTSCxJQUFULDhCQUFrQjhKLEdBQWxCLElBQXVCZSxTQUF2QixzQkFBcUNkLElBQXJDLEdBQWQ7QUFDQSxRQUFJakgsWUFBVTVDLE9BQU91QixPQUFQLENBQWQ7QUFDQSxRQUFJeUksZUFBZXBILFNBQWYsRUFBd0J3RSxRQUF4QixDQUFKLEVBQXVDO0FBQ3JDLGFBQU91RCxTQUFQO0FBQ0Q7QUFDRjtBQUNELFNBQU9uQixPQUFQO0FBQ0QsQ0FkRDs7QUFnQkE7Ozs7Ozs7Ozs7O0FBV0EsSUFBTW9CLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ2hCLEdBQUQsRUFBTUosT0FBTixFQUFlSyxJQUFmLEVBQXFCekMsUUFBckIsRUFBK0JwSCxNQUEvQixFQUF1Q0MsUUFBdkMsRUFBb0Q7QUFDMUU7QUFDQSxNQUFJdUosUUFBUS9HLE9BQVIsQ0FBZ0I1RSxNQUFoQixHQUF5QixDQUE3QixFQUFnQztBQUM5QixRQUFJa00sWUFBWVAsUUFBUS9HLE9BQVIsQ0FBZ0I0RyxLQUFoQixHQUF3QnhCLElBQXhCLENBQTZCLFVBQUNDLElBQUQsRUFBT0MsSUFBUDtBQUFBLGFBQWdCRCxLQUFLakssTUFBTCxHQUFja0ssS0FBS2xLLE1BQW5DO0FBQUEsS0FBN0IsQ0FBaEI7O0FBRUEsV0FBT2tNLFVBQVVsTSxNQUFWLEdBQW1CLENBQTFCLEVBQTZCO0FBQzNCa00sZ0JBQVUzSCxLQUFWO0FBQ0EsVUFBTWIsV0FBVXRCLFNBQVNILElBQVQsOEJBQWtCOEosR0FBbEIsaUJBQTRCSixPQUE1QixJQUFxQy9HLFNBQVNzSCxTQUE5Qyx5QkFBOERGLElBQTlELEdBQWhCO0FBQ0EsVUFBSSxDQUFDRyxlQUFlaEssT0FBT3VCLFFBQVAsQ0FBZixFQUFnQzZGLFFBQWhDLENBQUwsRUFBZ0Q7QUFDOUM7QUFDRDtBQUNEb0MsY0FBUS9HLE9BQVIsR0FBa0JzSCxTQUFsQjtBQUNEOztBQUVEQSxnQkFBWVAsUUFBUS9HLE9BQXBCOztBQUVBLFFBQUlzSCxVQUFVbE0sTUFBVixHQUFtQixDQUF2QixFQUEwQjtBQUN4QixVQUFNNkUsT0FBTyw2QkFBYyxFQUFFRCxTQUFTc0gsU0FBWCxFQUFkLENBQWI7QUFDQSxVQUFNYyxhQUFhN0ssT0FBT0MsU0FBU0gsSUFBVCw4QkFBa0I4SixHQUFsQixJQUF1QmxILElBQXZCLEdBQVAsQ0FBbkI7O0FBRndCO0FBSXRCLFlBQU1vSSxZQUFZRCxXQUFXN00sQ0FBWCxDQUFsQjtBQUNBLFlBQUlvSixTQUFTN0csSUFBVCxDQUFjLFVBQUNSLE9BQUQ7QUFBQSxpQkFBYStLLFVBQVUzTCxRQUFWLENBQW1CWSxPQUFuQixDQUFiO0FBQUEsU0FBZCxDQUFKLEVBQTZEO0FBQzNEO0FBQ0E7QUFDQSxjQUFNZ0wsY0FBYyw2QkFBYyxFQUFFN0gsS0FBSzRILFVBQVUzSCxPQUFqQixFQUFkLENBQXBCO0FBQ0k1QixvQkFBVXRCLFNBQVNILElBQVQsOEJBQWtCOEosR0FBbEIsSUFBdUJtQixXQUF2QixzQkFBdUNsQixJQUF2QyxHQUo2QztBQUt2RGpILG9CQUFVNUMsT0FBT3VCLE9BQVAsQ0FMNkM7O0FBTTNELGNBQUl5SSxlQUFlcEgsT0FBZixFQUF3QndFLFFBQXhCLENBQUosRUFBdUM7QUFDckNvQyxzQkFBVXVCLFdBQVY7QUFDRDtBQUNEO0FBQ0Q7QUFmcUI7O0FBR3hCLFdBQUssSUFBSS9NLElBQUksQ0FBYixFQUFnQkEsSUFBSTZNLFdBQVdoTixNQUEvQixFQUF1Q0csR0FBdkMsRUFBNEM7QUFBQSxZQU1wQ3VELE9BTm9DO0FBQUEsWUFPcENxQixPQVBvQzs7QUFBQTs7QUFBQSwrQkFXeEM7QUFFSDtBQUNGO0FBQ0Y7QUFDRCxTQUFPNEcsT0FBUDtBQUNELENBcENEOztBQXNDQSxJQUFNd0IsYUFBYSxDQUNqQnJCLFlBRGlCLEVBRWpCTSxrQkFGaUIsRUFHakJLLGtCQUhpQixFQUlqQkUsNEJBSmlCLEVBS2pCQyxpQkFMaUIsRUFNakJHLGVBTmlCLENBQW5COztBQVNBOzs7Ozs7Ozs7OztBQVdBLElBQU16QixlQUFlLFNBQWZBLFlBQWUsQ0FBQ1MsR0FBRCxFQUFNSixPQUFOLEVBQWVLLElBQWYsRUFBcUJ6QyxRQUFyQixFQUErQnBILE1BQS9CLEVBQXVDQyxRQUF2QztBQUFBLFNBQ25CK0ssV0FBV3pNLE1BQVgsQ0FBa0IsVUFBQzBNLEdBQUQsRUFBTUMsU0FBTjtBQUFBLFdBQW9CQSxVQUFVdEIsR0FBVixFQUFlcUIsR0FBZixFQUFvQnBCLElBQXBCLEVBQTBCekMsUUFBMUIsRUFBb0NwSCxNQUFwQyxFQUE0Q0MsUUFBNUMsQ0FBcEI7QUFBQSxHQUFsQixFQUE2RnVKLE9BQTdGLENBRG1CO0FBQUEsQ0FBckI7O0FBR0E7Ozs7Ozs7QUFPTyxJQUFNUSwwQ0FBaUIsU0FBakJBLGNBQWlCLENBQUNwSCxPQUFELEVBQVV3RSxRQUFWLEVBQXVCO0FBQUEsTUFDM0N2SixNQUQyQyxHQUNoQytFLE9BRGdDLENBQzNDL0UsTUFEMkM7O0FBRW5ELFNBQU9BLFdBQVd1SixTQUFTdkosTUFBcEIsSUFBOEJ1SixTQUFTc0MsS0FBVCxDQUFlLFVBQUMzSixPQUFELEVBQWE7QUFDL0QsU0FBSyxJQUFJL0IsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxNQUFwQixFQUE0QkcsR0FBNUIsRUFBaUM7QUFDL0IsVUFBSTRFLFFBQVE1RSxDQUFSLE1BQWUrQixPQUFuQixFQUE0QjtBQUMxQixlQUFPLElBQVA7QUFDRDtBQUNGO0FBQ0QsV0FBTyxLQUFQO0FBQ0QsR0FQb0MsQ0FBckM7QUFRRCxDQVZNLEM7Ozs7Ozs7Ozs7Ozs7OzhRQ2pUUDs7Ozs7Ozs7a0JBZ0l3Qm9MLGdCOztBQTFIeEI7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFFQTs7Ozs7Ozs7O0FBU0E7Ozs7QUFJQTs7Ozs7OztBQU9PLElBQU1DLHdEQUF3QixTQUF4QkEscUJBQXdCLENBQUNyTCxPQUFELEVBQTJCO0FBQUEsTUFBakJWLE9BQWlCLHVFQUFQLEVBQU87OztBQUU5RCxNQUFJVSxRQUFRZ0IsUUFBUixLQUFxQixDQUF6QixFQUE0QjtBQUMxQmhCLGNBQVVBLFFBQVF1QixVQUFsQjtBQUNEOztBQUVELE1BQUl2QixRQUFRZ0IsUUFBUixLQUFxQixDQUF6QixFQUE0QjtBQUMxQixVQUFNLElBQUltSSxLQUFKLGdHQUFzR25KLE9BQXRHLHlDQUFzR0EsT0FBdEcsVUFBTjtBQUNEOztBQUVELE1BQU1ELE9BQU8scUJBQU1DLE9BQU4sRUFBZVYsT0FBZixDQUFiO0FBQ0EsTUFBTWdNLGdCQUFnQix3QkFBU3ZMLElBQVQsRUFBZUMsT0FBZixFQUF3QlYsT0FBeEIsQ0FBdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFPZ00sYUFBUDtBQUNELENBcEJNOztBQXNCUDs7Ozs7OztBQU9PLElBQU1DLHNEQUF1QixTQUF2QkEsb0JBQXVCLENBQUNsRSxRQUFELEVBQTRCO0FBQUEsTUFBakIvSCxPQUFpQix1RUFBUCxFQUFPOzs7QUFFOUQsTUFBSSxDQUFDdEIsTUFBTW9DLE9BQU4sQ0FBY2lILFFBQWQsQ0FBTCxFQUE4QjtBQUM1QkEsZUFBVyxnQ0FBZ0JBLFFBQWhCLENBQVg7QUFDRDs7QUFFRCxNQUFJQSxTQUFTN0csSUFBVCxDQUFjLFVBQUNSLE9BQUQ7QUFBQSxXQUFhQSxRQUFRZ0IsUUFBUixLQUFxQixDQUFsQztBQUFBLEdBQWQsQ0FBSixFQUF3RDtBQUN0RCxVQUFNLElBQUltSSxLQUFKLENBQVUsd0ZBQVYsQ0FBTjtBQUNEOztBQUVELE1BQU1sSixTQUFTLHlCQUFVWCxPQUFWLENBQWY7QUFDQSxNQUFNWSxXQUFXLDBCQUFZWixPQUFaLENBQWpCOztBQUVBLE1BQU00SSxXQUFXLCtCQUFrQmIsUUFBbEIsRUFBNEIvSCxPQUE1QixDQUFqQjtBQUNBLE1BQU1rTSxlQUFlLHFCQUFNdEQsUUFBTixFQUFnQjVJLE9BQWhCLENBQXJCOztBQUVBO0FBQ0EsTUFBTW1NLGFBQWFDLGNBQWNyRSxRQUFkLEVBQXdCL0gsT0FBeEIsQ0FBbkI7QUFDQSxNQUFNcU0sb0JBQW9CRixXQUFXLENBQVgsQ0FBMUI7O0FBRUEsTUFBTUcsZUFBZSxxREFBYUosWUFBYixJQUEyQkcsaUJBQTNCLElBQStDdEUsUUFBL0MsRUFBeUQvSCxPQUF6RCxDQUFyQjtBQUNBLE1BQU11TSxrQkFBa0IsZ0NBQWdCNUwsT0FBT0MsU0FBU0gsSUFBVCxDQUFjNkwsWUFBZCxDQUFQLENBQWhCLENBQXhCOztBQUVBLE1BQUksQ0FBQ3ZFLFNBQVNzQyxLQUFULENBQWUsVUFBQzNKLE9BQUQ7QUFBQSxXQUFhNkwsZ0JBQWdCckwsSUFBaEIsQ0FBcUIsVUFBQ0YsS0FBRDtBQUFBLGFBQVdBLFVBQVVOLE9BQXJCO0FBQUEsS0FBckIsQ0FBYjtBQUFBLEdBQWYsQ0FBTCxFQUFzRjtBQUNwRjtBQUNBd0UsWUFBUUMsSUFBUjtBQUlBLFdBQU80QyxRQUFQO0FBQ0Q7O0FBRUQsU0FBT3VFLFlBQVA7QUFDRCxDQWpDTTs7QUFtQ1A7Ozs7OztBQU1BLElBQU1GLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBQ3JFLFFBQUQsRUFBVy9ILE9BQVgsRUFBdUI7QUFBQSw2QkFDTixpQ0FBb0IrSCxRQUFwQixFQUE4Qi9ILE9BQTlCLENBRE07QUFBQSxNQUNuQ29ELE9BRG1DLHdCQUNuQ0EsT0FEbUM7QUFBQSxNQUMxQkksVUFEMEIsd0JBQzFCQSxVQUQwQjtBQUFBLE1BQ2RLLEdBRGMsd0JBQ2RBLEdBRGM7O0FBSTNDLFNBQU8sQ0FDTCw0QkFBYztBQUNaQSxZQURZO0FBRVpULGFBQVNBLFdBQVcsRUFGUjtBQUdaSSxnQkFBWUEsYUFBYXBDLE9BQU9DLElBQVAsQ0FBWW1DLFVBQVosRUFBd0J6QyxHQUF4QixDQUE0QixVQUFDVSxJQUFEO0FBQUEsYUFBVztBQUM5REEsY0FBTSw0QkFBWUEsSUFBWixDQUR3RDtBQUU5RDVDLGVBQU8sNEJBQVkyRSxXQUFXL0IsSUFBWCxDQUFaO0FBRnVELE9BQVg7QUFBQSxLQUE1QixDQUFiLEdBR047QUFOTSxHQUFkLENBREssQ0FBUDtBQVVELENBZEQ7O0FBZ0JBOzs7Ozs7Ozs7QUFTZSxTQUFTcUssZ0JBQVQsQ0FBMEJVLEtBQTFCLEVBQStDO0FBQUEsTUFBZHhNLE9BQWMsdUVBQUosRUFBSTs7QUFDNUQsTUFBTVMsT0FBUStMLE1BQU1oTyxNQUFOLElBQWdCLENBQUNnTyxNQUFNL0ssSUFBeEIsR0FDVHdLLHFCQUFxQk8sS0FBckIsRUFBNEJ4TSxPQUE1QixDQURTLEdBRVQrTCxzQkFBc0JTLEtBQXRCLEVBQTZCeE0sT0FBN0IsQ0FGSjs7QUFJQSxNQUFJdEIsTUFBTW9DLE9BQU4sQ0FBY0wsSUFBZCxLQUF1QkEsS0FBS2pDLE1BQUwsR0FBYyxDQUFyQyxJQUEwQ2lDLEtBQUssQ0FBTCxhQUFtQmdNLFdBQWpFLEVBQThFO0FBQzVFLFdBQU9oTSxLQUFLTSxHQUFMLENBQVM7QUFBQSxhQUFTK0ssaUJBQWlCOUssS0FBakIsRUFBd0JoQixPQUF4QixDQUFUO0FBQUEsS0FBVCxFQUFvRHNHLElBQXBELENBQXlELEdBQXpELENBQVA7QUFDRDtBQUNELFNBQU8sMEJBQVl0RyxPQUFaLEVBQXFCUyxJQUFyQixDQUEwQkEsSUFBMUIsQ0FBUDtBQUNELEM7Ozs7Ozs7OztBQ3pJRDs7Ozs7Ozs7OztBQVVBLENBQUUsVUFBVWlNLE1BQVYsRUFBbUI7QUFDckIsS0FBSS9OLENBQUo7QUFBQSxLQUNDZ08sT0FERDtBQUFBLEtBRUNDLElBRkQ7QUFBQSxLQUdDQyxPQUhEO0FBQUEsS0FJQ0MsS0FKRDtBQUFBLEtBS0NDLFFBTEQ7QUFBQSxLQU1DQyxPQU5EO0FBQUEsS0FPQ3JNLE1BUEQ7QUFBQSxLQVFDc00sZ0JBUkQ7QUFBQSxLQVNDQyxTQVREO0FBQUEsS0FVQ0MsWUFWRDs7O0FBWUM7QUFDQUMsWUFiRDtBQUFBLEtBY0NsTixRQWREO0FBQUEsS0FlQ21OLE9BZkQ7QUFBQSxLQWdCQ0MsY0FoQkQ7QUFBQSxLQWlCQ0MsU0FqQkQ7QUFBQSxLQWtCQ0MsYUFsQkQ7QUFBQSxLQW1CQ2pLLE9BbkJEO0FBQUEsS0FvQkN6RCxRQXBCRDs7O0FBc0JDO0FBQ0EyTixXQUFVLFdBQVcsSUFBSSxJQUFJQyxJQUFKLEVBdkIxQjtBQUFBLEtBd0JDQyxlQUFlakIsT0FBT3hNLFFBeEJ2QjtBQUFBLEtBeUJDME4sVUFBVSxDQXpCWDtBQUFBLEtBMEJDQyxPQUFPLENBMUJSO0FBQUEsS0EyQkNDLGFBQWFDLGFBM0JkO0FBQUEsS0E0QkNDLGFBQWFELGFBNUJkO0FBQUEsS0E2QkNFLGdCQUFnQkYsYUE3QmpCO0FBQUEsS0E4QkNHLHlCQUF5QkgsYUE5QjFCO0FBQUEsS0ErQkNJLFlBQVksbUJBQVV4SyxDQUFWLEVBQWF5SyxDQUFiLEVBQWlCO0FBQzVCLE1BQUt6SyxNQUFNeUssQ0FBWCxFQUFlO0FBQ2RqQixrQkFBZSxJQUFmO0FBQ0E7QUFDRCxTQUFPLENBQVA7QUFDQSxFQXBDRjs7O0FBc0NDO0FBQ0FrQixVQUFXLEVBQUYsQ0FBT0MsY0F2Q2pCO0FBQUEsS0F3Q0M3UCxNQUFNLEVBeENQO0FBQUEsS0F5Q0N5TCxNQUFNekwsSUFBSXlMLEdBekNYO0FBQUEsS0EwQ0NxRSxhQUFhOVAsSUFBSW9FLElBMUNsQjtBQUFBLEtBMkNDQSxPQUFPcEUsSUFBSW9FLElBM0NaO0FBQUEsS0E0Q0NtSCxRQUFRdkwsSUFBSXVMLEtBNUNiOzs7QUE4Q0M7QUFDQTtBQUNBbkssV0FBVSxTQUFWQSxPQUFVLENBQVUyTyxJQUFWLEVBQWdCQyxJQUFoQixFQUF1QjtBQUNoQyxNQUFJOVAsSUFBSSxDQUFSO0FBQUEsTUFDQytQLE1BQU1GLEtBQUtoUSxNQURaO0FBRUEsU0FBUUcsSUFBSStQLEdBQVosRUFBaUIvUCxHQUFqQixFQUF1QjtBQUN0QixPQUFLNlAsS0FBTTdQLENBQU4sTUFBYzhQLElBQW5CLEVBQTBCO0FBQ3pCLFdBQU85UCxDQUFQO0FBQ0E7QUFDRDtBQUNELFNBQU8sQ0FBQyxDQUFSO0FBQ0EsRUF6REY7QUFBQSxLQTJEQ2dRLFdBQVcsOEVBQ1YsbURBNURGOzs7QUE4REM7O0FBRUE7QUFDQUMsY0FBYSxxQkFqRWQ7OztBQW1FQztBQUNBQyxjQUFhLDRCQUE0QkQsVUFBNUIsR0FDWix5Q0FyRUY7OztBQXVFQztBQUNBcEwsY0FBYSxRQUFRb0wsVUFBUixHQUFxQixJQUFyQixHQUE0QkMsVUFBNUIsR0FBeUMsTUFBekMsR0FBa0RELFVBQWxEOztBQUVaO0FBQ0EsZ0JBSFksR0FHTUEsVUFITjs7QUFLWjtBQUNBO0FBQ0EsMkRBUFksR0FPaURDLFVBUGpELEdBTzhELE1BUDlELEdBUVpELFVBUlksR0FRQyxNQWhGZjtBQUFBLEtBa0ZDRSxVQUFVLE9BQU9ELFVBQVAsR0FBb0IsVUFBcEI7O0FBRVQ7QUFDQTtBQUNBLHdEQUpTOztBQU1UO0FBQ0EsMkJBUFMsR0FPb0JyTCxVQVBwQixHQU9pQyxNQVBqQzs7QUFTVDtBQUNBLEtBVlMsR0FXVCxRQTdGRjs7O0FBK0ZDO0FBQ0F1TCxlQUFjLElBQUl2TixNQUFKLENBQVlvTixhQUFhLEdBQXpCLEVBQThCLEdBQTlCLENBaEdmO0FBQUEsS0FpR0NJLFFBQVEsSUFBSXhOLE1BQUosQ0FBWSxNQUFNb04sVUFBTixHQUFtQiw2QkFBbkIsR0FDbkJBLFVBRG1CLEdBQ04sSUFETixFQUNZLEdBRFosQ0FqR1Q7QUFBQSxLQW9HQ0ssU0FBUyxJQUFJek4sTUFBSixDQUFZLE1BQU1vTixVQUFOLEdBQW1CLElBQW5CLEdBQTBCQSxVQUExQixHQUF1QyxHQUFuRCxDQXBHVjtBQUFBLEtBcUdDTSxlQUFlLElBQUkxTixNQUFKLENBQVksTUFBTW9OLFVBQU4sR0FBbUIsVUFBbkIsR0FBZ0NBLFVBQWhDLEdBQTZDLEdBQTdDLEdBQW1EQSxVQUFuRCxHQUMxQixHQURjLENBckdoQjtBQUFBLEtBdUdDTyxXQUFXLElBQUkzTixNQUFKLENBQVlvTixhQUFhLElBQXpCLENBdkdaO0FBQUEsS0F5R0NRLFVBQVUsSUFBSTVOLE1BQUosQ0FBWXNOLE9BQVosQ0F6R1g7QUFBQSxLQTBHQ08sY0FBYyxJQUFJN04sTUFBSixDQUFZLE1BQU1xTixVQUFOLEdBQW1CLEdBQS9CLENBMUdmO0FBQUEsS0E0R0NTLFlBQVk7QUFDWCxRQUFNLElBQUk5TixNQUFKLENBQVksUUFBUXFOLFVBQVIsR0FBcUIsR0FBakMsQ0FESztBQUVYLFdBQVMsSUFBSXJOLE1BQUosQ0FBWSxVQUFVcU4sVUFBVixHQUF1QixHQUFuQyxDQUZFO0FBR1gsU0FBTyxJQUFJck4sTUFBSixDQUFZLE9BQU9xTixVQUFQLEdBQW9CLE9BQWhDLENBSEk7QUFJWCxVQUFRLElBQUlyTixNQUFKLENBQVksTUFBTWdDLFVBQWxCLENBSkc7QUFLWCxZQUFVLElBQUloQyxNQUFKLENBQVksTUFBTXNOLE9BQWxCLENBTEM7QUFNWCxXQUFTLElBQUl0TixNQUFKLENBQVksMkRBQ3BCb04sVUFEb0IsR0FDUCw4QkFETyxHQUMwQkEsVUFEMUIsR0FDdUMsYUFEdkMsR0FFcEJBLFVBRm9CLEdBRVAsWUFGTyxHQUVRQSxVQUZSLEdBRXFCLFFBRmpDLEVBRTJDLEdBRjNDLENBTkU7QUFTWCxVQUFRLElBQUlwTixNQUFKLENBQVksU0FBU21OLFFBQVQsR0FBb0IsSUFBaEMsRUFBc0MsR0FBdEMsQ0FURzs7QUFXWDtBQUNBO0FBQ0Esa0JBQWdCLElBQUluTixNQUFKLENBQVksTUFBTW9OLFVBQU4sR0FDM0Isa0RBRDJCLEdBQzBCQSxVQUQxQixHQUUzQixrQkFGMkIsR0FFTkEsVUFGTSxHQUVPLGtCQUZuQixFQUV1QyxHQUZ2QztBQWJMLEVBNUdiO0FBQUEsS0E4SENXLFFBQVEsUUE5SFQ7QUFBQSxLQStIQ0MsVUFBVSxxQ0EvSFg7QUFBQSxLQWdJQ0MsVUFBVSxRQWhJWDtBQUFBLEtBa0lDQyxVQUFVLHdCQWxJWDs7O0FBb0lDO0FBQ0FDLGNBQWEsa0NBcklkO0FBQUEsS0F1SUNDLFdBQVcsTUF2SVo7OztBQXlJQztBQUNBO0FBQ0FDLGFBQVksSUFBSXJPLE1BQUosQ0FBWSx5QkFBeUJvTixVQUF6QixHQUFzQyxzQkFBbEQsRUFBMEUsR0FBMUUsQ0EzSWI7QUFBQSxLQTRJQ2tCLFlBQVksU0FBWkEsU0FBWSxDQUFVQyxNQUFWLEVBQWtCQyxNQUFsQixFQUEyQjtBQUN0QyxNQUFJQyxPQUFPLE9BQU9GLE9BQU8vRixLQUFQLENBQWMsQ0FBZCxDQUFQLEdBQTJCLE9BQXRDOztBQUVBLFNBQU9nRzs7QUFFTjtBQUNBQSxRQUhNOztBQUtOO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLFNBQU8sQ0FBUCxHQUNDQyxPQUFPQyxZQUFQLENBQXFCRixPQUFPLE9BQTVCLENBREQsR0FFQ0MsT0FBT0MsWUFBUCxDQUFxQkYsUUFBUSxFQUFSLEdBQWEsTUFBbEMsRUFBMENBLE9BQU8sS0FBUCxHQUFlLE1BQXpELENBWEY7QUFZQSxFQTNKRjs7O0FBNkpDO0FBQ0E7QUFDQUcsY0FBYSxxREEvSmQ7QUFBQSxLQWdLQ0MsYUFBYSxTQUFiQSxVQUFhLENBQVVDLEVBQVYsRUFBY0MsV0FBZCxFQUE0QjtBQUN4QyxNQUFLQSxXQUFMLEVBQW1COztBQUVsQjtBQUNBLE9BQUtELE9BQU8sSUFBWixFQUFtQjtBQUNsQixXQUFPLFFBQVA7QUFDQTs7QUFFRDtBQUNBLFVBQU9BLEdBQUd0RyxLQUFILENBQVUsQ0FBVixFQUFhLENBQUMsQ0FBZCxJQUFvQixJQUFwQixHQUNOc0csR0FBR0UsVUFBSCxDQUFlRixHQUFHOVIsTUFBSCxHQUFZLENBQTNCLEVBQStCb0MsUUFBL0IsQ0FBeUMsRUFBekMsQ0FETSxHQUMwQyxHQURqRDtBQUVBOztBQUVEO0FBQ0EsU0FBTyxPQUFPMFAsRUFBZDtBQUNBLEVBL0tGOzs7QUFpTEM7QUFDQTtBQUNBO0FBQ0E7QUFDQUcsaUJBQWdCLFNBQWhCQSxhQUFnQixHQUFXO0FBQzFCckQ7QUFDQSxFQXZMRjtBQUFBLEtBeUxDc0QscUJBQXFCQyxjQUNwQixVQUFVbEMsSUFBVixFQUFpQjtBQUNoQixTQUFPQSxLQUFLbUMsUUFBTCxLQUFrQixJQUFsQixJQUEwQm5DLEtBQUtvQyxRQUFMLENBQWM5TSxXQUFkLE9BQWdDLFVBQWpFO0FBQ0EsRUFIbUIsRUFJcEIsRUFBRStNLEtBQUssWUFBUCxFQUFxQnBJLE1BQU0sUUFBM0IsRUFKb0IsQ0F6THRCOztBQWdNQTtBQUNBLEtBQUk7QUFDSDdGLE9BQUtrTyxLQUFMLENBQ0d0UyxNQUFNdUwsTUFBTWdILElBQU4sQ0FBWXJELGFBQWFzRCxVQUF6QixDQURULEVBRUN0RCxhQUFhc0QsVUFGZDs7QUFLQTtBQUNBO0FBQ0E7QUFDQXhTLE1BQUtrUCxhQUFhc0QsVUFBYixDQUF3QnpTLE1BQTdCLEVBQXNDa0QsUUFBdEM7QUFDQSxFQVZELENBVUUsT0FBUXdQLENBQVIsRUFBWTtBQUNick8sU0FBTyxFQUFFa08sT0FBT3RTLElBQUlELE1BQUo7O0FBRWY7QUFDQSxhQUFVMlMsTUFBVixFQUFrQkMsR0FBbEIsRUFBd0I7QUFDdkI3QyxlQUFXd0MsS0FBWCxDQUFrQkksTUFBbEIsRUFBMEJuSCxNQUFNZ0gsSUFBTixDQUFZSSxHQUFaLENBQTFCO0FBQ0EsSUFMYzs7QUFPZjtBQUNBO0FBQ0EsYUFBVUQsTUFBVixFQUFrQkMsR0FBbEIsRUFBd0I7QUFDdkIsUUFBSUMsSUFBSUYsT0FBTzNTLE1BQWY7QUFBQSxRQUNDRyxJQUFJLENBREw7O0FBR0E7QUFDQSxXQUFVd1MsT0FBUUUsR0FBUixJQUFnQkQsSUFBS3pTLEdBQUwsQ0FBMUIsRUFBeUMsQ0FBRTtBQUMzQ3dTLFdBQU8zUyxNQUFQLEdBQWdCNlMsSUFBSSxDQUFwQjtBQUNBO0FBaEJLLEdBQVA7QUFrQkE7O0FBRUQsVUFBUzlKLE1BQVQsQ0FBaUJFLFFBQWpCLEVBQTJCNkosT0FBM0IsRUFBb0NDLE9BQXBDLEVBQTZDQyxJQUE3QyxFQUFvRDtBQUNuRCxNQUFJQyxDQUFKO0FBQUEsTUFBTzlTLENBQVA7QUFBQSxNQUFVOFAsSUFBVjtBQUFBLE1BQWdCaUQsR0FBaEI7QUFBQSxNQUFxQmpTLEtBQXJCO0FBQUEsTUFBNEJrUyxNQUE1QjtBQUFBLE1BQW9DQyxXQUFwQztBQUFBLE1BQ0NDLGFBQWFQLFdBQVdBLFFBQVFRLGFBRGpDOzs7QUFHQztBQUNBcFEsYUFBVzRQLFVBQVVBLFFBQVE1UCxRQUFsQixHQUE2QixDQUp6Qzs7QUFNQTZQLFlBQVVBLFdBQVcsRUFBckI7O0FBRUE7QUFDQSxNQUFLLE9BQU85SixRQUFQLEtBQW9CLFFBQXBCLElBQWdDLENBQUNBLFFBQWpDLElBQ0ovRixhQUFhLENBQWIsSUFBa0JBLGFBQWEsQ0FBL0IsSUFBb0NBLGFBQWEsRUFEbEQsRUFDdUQ7O0FBRXRELFVBQU82UCxPQUFQO0FBQ0E7O0FBRUQ7QUFDQSxNQUFLLENBQUNDLElBQU4sRUFBYTtBQUNacEUsZUFBYWtFLE9BQWI7QUFDQUEsYUFBVUEsV0FBV3BSLFFBQXJCOztBQUVBLE9BQUtvTixjQUFMLEVBQXNCOztBQUVyQjtBQUNBO0FBQ0EsUUFBSzVMLGFBQWEsRUFBYixLQUFxQmpDLFFBQVFrUSxXQUFXb0MsSUFBWCxDQUFpQnRLLFFBQWpCLENBQTdCLENBQUwsRUFBa0U7O0FBRWpFO0FBQ0EsU0FBT2dLLElBQUloUyxNQUFPLENBQVAsQ0FBWCxFQUEwQjs7QUFFekI7QUFDQSxVQUFLaUMsYUFBYSxDQUFsQixFQUFzQjtBQUNyQixXQUFPK00sT0FBTzZDLFFBQVFVLGNBQVIsQ0FBd0JQLENBQXhCLENBQWQsRUFBOEM7O0FBRTdDO0FBQ0E7QUFDQTtBQUNBLFlBQUtoRCxLQUFLd0QsRUFBTCxLQUFZUixDQUFqQixFQUFxQjtBQUNwQkYsaUJBQVExTyxJQUFSLENBQWM0TCxJQUFkO0FBQ0EsZ0JBQU84QyxPQUFQO0FBQ0E7QUFDRCxRQVRELE1BU087QUFDTixlQUFPQSxPQUFQO0FBQ0E7O0FBRUY7QUFDQyxPQWZELE1BZU87O0FBRU47QUFDQTtBQUNBO0FBQ0EsV0FBS00sZUFBZ0JwRCxPQUFPb0QsV0FBV0csY0FBWCxDQUEyQlAsQ0FBM0IsQ0FBdkIsS0FDSjNSLFNBQVV3UixPQUFWLEVBQW1CN0MsSUFBbkIsQ0FESSxJQUVKQSxLQUFLd0QsRUFBTCxLQUFZUixDQUZiLEVBRWlCOztBQUVoQkYsZ0JBQVExTyxJQUFSLENBQWM0TCxJQUFkO0FBQ0EsZUFBTzhDLE9BQVA7QUFDQTtBQUNEOztBQUVGO0FBQ0MsTUFqQ0QsTUFpQ08sSUFBSzlSLE1BQU8sQ0FBUCxDQUFMLEVBQWtCO0FBQ3hCb0QsV0FBS2tPLEtBQUwsQ0FBWVEsT0FBWixFQUFxQkQsUUFBUVksb0JBQVIsQ0FBOEJ6SyxRQUE5QixDQUFyQjtBQUNBLGFBQU84SixPQUFQOztBQUVEO0FBQ0MsTUFMTSxNQUtBLElBQUssQ0FBRUUsSUFBSWhTLE1BQU8sQ0FBUCxDQUFOLEtBQXNCa04sUUFBUXdGLHNCQUE5QixJQUNYYixRQUFRYSxzQkFERixFQUMyQjs7QUFFakN0UCxXQUFLa08sS0FBTCxDQUFZUSxPQUFaLEVBQXFCRCxRQUFRYSxzQkFBUixDQUFnQ1YsQ0FBaEMsQ0FBckI7QUFDQSxhQUFPRixPQUFQO0FBQ0E7QUFDRDs7QUFFRDtBQUNBLFFBQUs1RSxRQUFReUYsR0FBUixJQUNKLENBQUNsRSx1QkFBd0J6RyxXQUFXLEdBQW5DLENBREcsS0FFRixDQUFDOEYsU0FBRCxJQUFjLENBQUNBLFVBQVUvTixJQUFWLENBQWdCaUksUUFBaEIsQ0FGYjs7QUFJSjtBQUNBO0FBQ0UvRixpQkFBYSxDQUFiLElBQWtCNFAsUUFBUVQsUUFBUixDQUFpQjlNLFdBQWpCLE9BQW1DLFFBTm5ELENBQUwsRUFNcUU7O0FBRXBFNk4sbUJBQWNuSyxRQUFkO0FBQ0FvSyxrQkFBYVAsT0FBYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQUs1UCxhQUFhLENBQWIsS0FDRnlOLFNBQVMzUCxJQUFULENBQWVpSSxRQUFmLEtBQTZCeUgsYUFBYTFQLElBQWIsQ0FBbUJpSSxRQUFuQixDQUQzQixDQUFMLEVBQ2tFOztBQUVqRTtBQUNBb0ssbUJBQWFqQyxTQUFTcFEsSUFBVCxDQUFlaUksUUFBZixLQUE2QjRLLFlBQWFmLFFBQVFyUCxVQUFyQixDQUE3QixJQUNacVAsT0FERDs7QUFHQTtBQUNBO0FBQ0EsVUFBS08sZUFBZVAsT0FBZixJQUEwQixDQUFDM0UsUUFBUTJGLEtBQXhDLEVBQWdEOztBQUUvQztBQUNBLFdBQU9aLE1BQU1KLFFBQVFoSSxZQUFSLENBQXNCLElBQXRCLENBQWIsRUFBOEM7QUFDN0NvSSxjQUFNQSxJQUFJNVMsT0FBSixDQUFhc1IsVUFBYixFQUF5QkMsVUFBekIsQ0FBTjtBQUNBLFFBRkQsTUFFTztBQUNOaUIsZ0JBQVFpQixZQUFSLENBQXNCLElBQXRCLEVBQThCYixNQUFNakUsT0FBcEM7QUFDQTtBQUNEOztBQUVEO0FBQ0FrRSxlQUFTNUUsU0FBVXRGLFFBQVYsQ0FBVDtBQUNBOUksVUFBSWdULE9BQU9uVCxNQUFYO0FBQ0EsYUFBUUcsR0FBUixFQUFjO0FBQ2JnVCxjQUFRaFQsQ0FBUixJQUFjLENBQUUrUyxNQUFNLE1BQU1BLEdBQVosR0FBa0IsUUFBcEIsSUFBaUMsR0FBakMsR0FDYmMsV0FBWWIsT0FBUWhULENBQVIsQ0FBWixDQUREO0FBRUE7QUFDRGlULG9CQUFjRCxPQUFPckwsSUFBUCxDQUFhLEdBQWIsQ0FBZDtBQUNBOztBQUVELFNBQUk7QUFDSHpELFdBQUtrTyxLQUFMLENBQVlRLE9BQVosRUFDQ00sV0FBV2hNLGdCQUFYLENBQTZCK0wsV0FBN0IsQ0FERDtBQUdBLGFBQU9MLE9BQVA7QUFDQSxNQUxELENBS0UsT0FBUWtCLFFBQVIsRUFBbUI7QUFDcEJ2RSw2QkFBd0J6RyxRQUF4QixFQUFrQyxJQUFsQztBQUNBLE1BUEQsU0FPVTtBQUNULFVBQUtpSyxRQUFRakUsT0FBYixFQUF1QjtBQUN0QjZELGVBQVFvQixlQUFSLENBQXlCLElBQXpCO0FBQ0E7QUFDRDtBQUNEO0FBQ0Q7QUFDRDs7QUFFRDtBQUNBLFNBQU8vUixPQUFROEcsU0FBUzNJLE9BQVQsQ0FBa0JrUSxLQUFsQixFQUF5QixJQUF6QixDQUFSLEVBQXlDc0MsT0FBekMsRUFBa0RDLE9BQWxELEVBQTJEQyxJQUEzRCxDQUFQO0FBQ0E7O0FBRUQ7Ozs7OztBQU1BLFVBQVN6RCxXQUFULEdBQXVCO0FBQ3RCLE1BQUkxTSxPQUFPLEVBQVg7O0FBRUEsV0FBU3NSLEtBQVQsQ0FBZ0J6TyxHQUFoQixFQUFxQnJGLEtBQXJCLEVBQTZCOztBQUU1QjtBQUNBLE9BQUt3QyxLQUFLd0IsSUFBTCxDQUFXcUIsTUFBTSxHQUFqQixJQUF5QjBJLEtBQUtnRyxXQUFuQyxFQUFpRDs7QUFFaEQ7QUFDQSxXQUFPRCxNQUFPdFIsS0FBSzBCLEtBQUwsRUFBUCxDQUFQO0FBQ0E7QUFDRCxVQUFTNFAsTUFBT3pPLE1BQU0sR0FBYixJQUFxQnJGLEtBQTlCO0FBQ0E7QUFDRCxTQUFPOFQsS0FBUDtBQUNBOztBQUVEOzs7O0FBSUEsVUFBU0UsWUFBVCxDQUF1QkMsRUFBdkIsRUFBNEI7QUFDM0JBLEtBQUlyRixPQUFKLElBQWdCLElBQWhCO0FBQ0EsU0FBT3FGLEVBQVA7QUFDQTs7QUFFRDs7OztBQUlBLFVBQVNDLE1BQVQsQ0FBaUJELEVBQWpCLEVBQXNCO0FBQ3JCLE1BQUlFLEtBQUs5UyxTQUFTK1MsYUFBVCxDQUF3QixVQUF4QixDQUFUOztBQUVBLE1BQUk7QUFDSCxVQUFPLENBQUMsQ0FBQ0gsR0FBSUUsRUFBSixDQUFUO0FBQ0EsR0FGRCxDQUVFLE9BQVE5QixDQUFSLEVBQVk7QUFDYixVQUFPLEtBQVA7QUFDQSxHQUpELFNBSVU7O0FBRVQ7QUFDQSxPQUFLOEIsR0FBRy9RLFVBQVIsRUFBcUI7QUFDcEIrUSxPQUFHL1EsVUFBSCxDQUFjaVIsV0FBZCxDQUEyQkYsRUFBM0I7QUFDQTs7QUFFRDtBQUNBQSxRQUFLLElBQUw7QUFDQTtBQUNEOztBQUVEOzs7OztBQUtBLFVBQVNHLFNBQVQsQ0FBb0JDLEtBQXBCLEVBQTJCQyxPQUEzQixFQUFxQztBQUNwQyxNQUFJNVUsTUFBTTJVLE1BQU0xTyxLQUFOLENBQWEsR0FBYixDQUFWO0FBQUEsTUFDQy9GLElBQUlGLElBQUlELE1BRFQ7O0FBR0EsU0FBUUcsR0FBUixFQUFjO0FBQ2JpTyxRQUFLMEcsVUFBTCxDQUFpQjdVLElBQUtFLENBQUwsQ0FBakIsSUFBOEIwVSxPQUE5QjtBQUNBO0FBQ0Q7O0FBRUQ7Ozs7OztBQU1BLFVBQVNFLFlBQVQsQ0FBdUI1UCxDQUF2QixFQUEwQnlLLENBQTFCLEVBQThCO0FBQzdCLE1BQUlvRixNQUFNcEYsS0FBS3pLLENBQWY7QUFBQSxNQUNDOFAsT0FBT0QsT0FBTzdQLEVBQUVqQyxRQUFGLEtBQWUsQ0FBdEIsSUFBMkIwTSxFQUFFMU0sUUFBRixLQUFlLENBQTFDLElBQ05pQyxFQUFFK1AsV0FBRixHQUFnQnRGLEVBQUVzRixXQUZwQjs7QUFJQTtBQUNBLE1BQUtELElBQUwsRUFBWTtBQUNYLFVBQU9BLElBQVA7QUFDQTs7QUFFRDtBQUNBLE1BQUtELEdBQUwsRUFBVztBQUNWLFVBQVVBLE1BQU1BLElBQUlHLFdBQXBCLEVBQW9DO0FBQ25DLFFBQUtILFFBQVFwRixDQUFiLEVBQWlCO0FBQ2hCLFlBQU8sQ0FBQyxDQUFSO0FBQ0E7QUFDRDtBQUNEOztBQUVELFNBQU96SyxJQUFJLENBQUosR0FBUSxDQUFDLENBQWhCO0FBQ0E7O0FBRUQ7Ozs7QUFJQSxVQUFTaVEsaUJBQVQsQ0FBNEJyUyxJQUE1QixFQUFtQztBQUNsQyxTQUFPLFVBQVVrTixJQUFWLEVBQWlCO0FBQ3ZCLE9BQUloTixPQUFPZ04sS0FBS29DLFFBQUwsQ0FBYzlNLFdBQWQsRUFBWDtBQUNBLFVBQU90QyxTQUFTLE9BQVQsSUFBb0JnTixLQUFLbE4sSUFBTCxLQUFjQSxJQUF6QztBQUNBLEdBSEQ7QUFJQTs7QUFFRDs7OztBQUlBLFVBQVNzUyxrQkFBVCxDQUE2QnRTLElBQTdCLEVBQW9DO0FBQ25DLFNBQU8sVUFBVWtOLElBQVYsRUFBaUI7QUFDdkIsT0FBSWhOLE9BQU9nTixLQUFLb0MsUUFBTCxDQUFjOU0sV0FBZCxFQUFYO0FBQ0EsVUFBTyxDQUFFdEMsU0FBUyxPQUFULElBQW9CQSxTQUFTLFFBQS9CLEtBQTZDZ04sS0FBS2xOLElBQUwsS0FBY0EsSUFBbEU7QUFDQSxHQUhEO0FBSUE7O0FBRUQ7Ozs7QUFJQSxVQUFTdVMsb0JBQVQsQ0FBK0JsRCxRQUEvQixFQUEwQzs7QUFFekM7QUFDQSxTQUFPLFVBQVVuQyxJQUFWLEVBQWlCOztBQUV2QjtBQUNBO0FBQ0E7QUFDQSxPQUFLLFVBQVVBLElBQWYsRUFBc0I7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBS0EsS0FBS3hNLFVBQUwsSUFBbUJ3TSxLQUFLbUMsUUFBTCxLQUFrQixLQUExQyxFQUFrRDs7QUFFakQ7QUFDQSxTQUFLLFdBQVduQyxJQUFoQixFQUF1QjtBQUN0QixVQUFLLFdBQVdBLEtBQUt4TSxVQUFyQixFQUFrQztBQUNqQyxjQUFPd00sS0FBS3hNLFVBQUwsQ0FBZ0IyTyxRQUFoQixLQUE2QkEsUUFBcEM7QUFDQSxPQUZELE1BRU87QUFDTixjQUFPbkMsS0FBS21DLFFBQUwsS0FBa0JBLFFBQXpCO0FBQ0E7QUFDRDs7QUFFRDtBQUNBO0FBQ0EsWUFBT25DLEtBQUtzRixVQUFMLEtBQW9CbkQsUUFBcEI7O0FBRU47QUFDQTtBQUNBbkMsVUFBS3NGLFVBQUwsS0FBb0IsQ0FBQ25ELFFBQXJCLElBQ0FGLG1CQUFvQmpDLElBQXBCLE1BQStCbUMsUUFMaEM7QUFNQTs7QUFFRCxXQUFPbkMsS0FBS21DLFFBQUwsS0FBa0JBLFFBQXpCOztBQUVEO0FBQ0E7QUFDQTtBQUNDLElBbkNELE1BbUNPLElBQUssV0FBV25DLElBQWhCLEVBQXVCO0FBQzdCLFdBQU9BLEtBQUttQyxRQUFMLEtBQWtCQSxRQUF6QjtBQUNBOztBQUVEO0FBQ0EsVUFBTyxLQUFQO0FBQ0EsR0E5Q0Q7QUErQ0E7O0FBRUQ7Ozs7QUFJQSxVQUFTb0Qsc0JBQVQsQ0FBaUNsQixFQUFqQyxFQUFzQztBQUNyQyxTQUFPRCxhQUFjLFVBQVVvQixRQUFWLEVBQXFCO0FBQ3pDQSxjQUFXLENBQUNBLFFBQVo7QUFDQSxVQUFPcEIsYUFBYyxVQUFVckIsSUFBVixFQUFnQmpPLE9BQWhCLEVBQTBCO0FBQzlDLFFBQUk4TixDQUFKO0FBQUEsUUFDQzZDLGVBQWVwQixHQUFJLEVBQUosRUFBUXRCLEtBQUtoVCxNQUFiLEVBQXFCeVYsUUFBckIsQ0FEaEI7QUFBQSxRQUVDdFYsSUFBSXVWLGFBQWExVixNQUZsQjs7QUFJQTtBQUNBLFdBQVFHLEdBQVIsRUFBYztBQUNiLFNBQUs2UyxLQUFRSCxJQUFJNkMsYUFBY3ZWLENBQWQsQ0FBWixDQUFMLEVBQXlDO0FBQ3hDNlMsV0FBTUgsQ0FBTixJQUFZLEVBQUc5TixRQUFTOE4sQ0FBVCxJQUFlRyxLQUFNSCxDQUFOLENBQWxCLENBQVo7QUFDQTtBQUNEO0FBQ0QsSUFYTSxDQUFQO0FBWUEsR0FkTSxDQUFQO0FBZUE7O0FBRUQ7Ozs7O0FBS0EsVUFBU2dCLFdBQVQsQ0FBc0JmLE9BQXRCLEVBQWdDO0FBQy9CLFNBQU9BLFdBQVcsT0FBT0EsUUFBUVksb0JBQWYsS0FBd0MsV0FBbkQsSUFBa0VaLE9BQXpFO0FBQ0E7O0FBRUQ7QUFDQTNFLFdBQVVwRixPQUFPb0YsT0FBUCxHQUFpQixFQUEzQjs7QUFFQTs7Ozs7QUFLQUcsU0FBUXZGLE9BQU91RixLQUFQLEdBQWUsVUFBVTJCLElBQVYsRUFBaUI7QUFDdkMsTUFBSTBGLFlBQVkxRixRQUFRQSxLQUFLMkYsWUFBN0I7QUFBQSxNQUNDL0csVUFBVW9CLFFBQVEsQ0FBRUEsS0FBS3FELGFBQUwsSUFBc0JyRCxJQUF4QixFQUErQjRGLGVBRGxEOztBQUdBO0FBQ0E7QUFDQTtBQUNBLFNBQU8sQ0FBQzlFLE1BQU0vUCxJQUFOLENBQVkyVSxhQUFhOUcsV0FBV0EsUUFBUXdELFFBQWhDLElBQTRDLE1BQXhELENBQVI7QUFDQSxFQVJEOztBQVVBOzs7OztBQUtBekQsZUFBYzdGLE9BQU82RixXQUFQLEdBQXFCLFVBQVU5TSxJQUFWLEVBQWlCO0FBQ25ELE1BQUlnVSxVQUFKO0FBQUEsTUFBZ0JDLFNBQWhCO0FBQUEsTUFDQzNNLE1BQU10SCxPQUFPQSxLQUFLd1IsYUFBTCxJQUFzQnhSLElBQTdCLEdBQW9DcU4sWUFEM0M7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUsvRixPQUFPMUgsUUFBUCxJQUFtQjBILElBQUlsRyxRQUFKLEtBQWlCLENBQXBDLElBQXlDLENBQUNrRyxJQUFJeU0sZUFBbkQsRUFBcUU7QUFDcEUsVUFBT25VLFFBQVA7QUFDQTs7QUFFRDtBQUNBQSxhQUFXMEgsR0FBWDtBQUNBeUYsWUFBVW5OLFNBQVNtVSxlQUFuQjtBQUNBL0csbUJBQWlCLENBQUNSLE1BQU81TSxRQUFQLENBQWxCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUt5TixnQkFBZ0J6TixRQUFoQixLQUNGcVUsWUFBWXJVLFNBQVNzVSxXQURuQixLQUNvQ0QsVUFBVUUsR0FBVixLQUFrQkYsU0FEM0QsRUFDdUU7O0FBRXRFO0FBQ0EsT0FBS0EsVUFBVUcsZ0JBQWYsRUFBa0M7QUFDakNILGNBQVVHLGdCQUFWLENBQTRCLFFBQTVCLEVBQXNDakUsYUFBdEMsRUFBcUQsS0FBckQ7O0FBRUQ7QUFDQyxJQUpELE1BSU8sSUFBSzhELFVBQVVJLFdBQWYsRUFBNkI7QUFDbkNKLGNBQVVJLFdBQVYsQ0FBdUIsVUFBdkIsRUFBbUNsRSxhQUFuQztBQUNBO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOUQsVUFBUTJGLEtBQVIsR0FBZ0JTLE9BQVEsVUFBVUMsRUFBVixFQUFlO0FBQ3RDM0YsV0FBUXVILFdBQVIsQ0FBcUI1QixFQUFyQixFQUEwQjRCLFdBQTFCLENBQXVDMVUsU0FBUytTLGFBQVQsQ0FBd0IsS0FBeEIsQ0FBdkM7QUFDQSxVQUFPLE9BQU9ELEdBQUduTixnQkFBVixLQUErQixXQUEvQixJQUNOLENBQUNtTixHQUFHbk4sZ0JBQUgsQ0FBcUIscUJBQXJCLEVBQTZDckgsTUFEL0M7QUFFQSxHQUplLENBQWhCOztBQU1BOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQW1PLFVBQVFuSixVQUFSLEdBQXFCdVAsT0FBUSxVQUFVQyxFQUFWLEVBQWU7QUFDM0NBLE1BQUduTyxTQUFILEdBQWUsR0FBZjtBQUNBLFVBQU8sQ0FBQ21PLEdBQUcxSixZQUFILENBQWlCLFdBQWpCLENBQVI7QUFDQSxHQUhvQixDQUFyQjs7QUFLQTs7O0FBR0E7QUFDQXFELFVBQVF1RixvQkFBUixHQUErQmEsT0FBUSxVQUFVQyxFQUFWLEVBQWU7QUFDckRBLE1BQUc0QixXQUFILENBQWdCMVUsU0FBUzJVLGFBQVQsQ0FBd0IsRUFBeEIsQ0FBaEI7QUFDQSxVQUFPLENBQUM3QixHQUFHZCxvQkFBSCxDQUF5QixHQUF6QixFQUErQjFULE1BQXZDO0FBQ0EsR0FIOEIsQ0FBL0I7O0FBS0E7QUFDQW1PLFVBQVF3RixzQkFBUixHQUFpQ3pDLFFBQVFsUSxJQUFSLENBQWNVLFNBQVNpUyxzQkFBdkIsQ0FBakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQXhGLFVBQVFtSSxPQUFSLEdBQWtCL0IsT0FBUSxVQUFVQyxFQUFWLEVBQWU7QUFDeEMzRixXQUFRdUgsV0FBUixDQUFxQjVCLEVBQXJCLEVBQTBCZixFQUExQixHQUErQnhFLE9BQS9CO0FBQ0EsVUFBTyxDQUFDdk4sU0FBUzZVLGlCQUFWLElBQStCLENBQUM3VSxTQUFTNlUsaUJBQVQsQ0FBNEJ0SCxPQUE1QixFQUFzQ2pQLE1BQTdFO0FBQ0EsR0FIaUIsQ0FBbEI7O0FBS0E7QUFDQSxNQUFLbU8sUUFBUW1JLE9BQWIsRUFBdUI7QUFDdEJsSSxRQUFLNUosTUFBTCxDQUFhLElBQWIsSUFBc0IsVUFBVWlQLEVBQVYsRUFBZTtBQUNwQyxRQUFJK0MsU0FBUy9DLEdBQUduVCxPQUFILENBQVkrUSxTQUFaLEVBQXVCQyxTQUF2QixDQUFiO0FBQ0EsV0FBTyxVQUFVckIsSUFBVixFQUFpQjtBQUN2QixZQUFPQSxLQUFLbkYsWUFBTCxDQUFtQixJQUFuQixNQUE4QjBMLE1BQXJDO0FBQ0EsS0FGRDtBQUdBLElBTEQ7QUFNQXBJLFFBQUt0SixJQUFMLENBQVcsSUFBWCxJQUFvQixVQUFVMk8sRUFBVixFQUFjWCxPQUFkLEVBQXdCO0FBQzNDLFFBQUssT0FBT0EsUUFBUVUsY0FBZixLQUFrQyxXQUFsQyxJQUFpRDFFLGNBQXRELEVBQXVFO0FBQ3RFLFNBQUltQixPQUFPNkMsUUFBUVUsY0FBUixDQUF3QkMsRUFBeEIsQ0FBWDtBQUNBLFlBQU94RCxPQUFPLENBQUVBLElBQUYsQ0FBUCxHQUFrQixFQUF6QjtBQUNBO0FBQ0QsSUFMRDtBQU1BLEdBYkQsTUFhTztBQUNON0IsUUFBSzVKLE1BQUwsQ0FBYSxJQUFiLElBQXVCLFVBQVVpUCxFQUFWLEVBQWU7QUFDckMsUUFBSStDLFNBQVMvQyxHQUFHblQsT0FBSCxDQUFZK1EsU0FBWixFQUF1QkMsU0FBdkIsQ0FBYjtBQUNBLFdBQU8sVUFBVXJCLElBQVYsRUFBaUI7QUFDdkIsU0FBSW5PLE9BQU8sT0FBT21PLEtBQUt3RyxnQkFBWixLQUFpQyxXQUFqQyxJQUNWeEcsS0FBS3dHLGdCQUFMLENBQXVCLElBQXZCLENBREQ7QUFFQSxZQUFPM1UsUUFBUUEsS0FBS3pCLEtBQUwsS0FBZW1XLE1BQTlCO0FBQ0EsS0FKRDtBQUtBLElBUEQ7O0FBU0E7QUFDQTtBQUNBcEksUUFBS3RKLElBQUwsQ0FBVyxJQUFYLElBQW9CLFVBQVUyTyxFQUFWLEVBQWNYLE9BQWQsRUFBd0I7QUFDM0MsUUFBSyxPQUFPQSxRQUFRVSxjQUFmLEtBQWtDLFdBQWxDLElBQWlEMUUsY0FBdEQsRUFBdUU7QUFDdEUsU0FBSWhOLElBQUo7QUFBQSxTQUFVM0IsQ0FBVjtBQUFBLFNBQWF1VyxLQUFiO0FBQUEsU0FDQ3pHLE9BQU82QyxRQUFRVSxjQUFSLENBQXdCQyxFQUF4QixDQURSOztBQUdBLFNBQUt4RCxJQUFMLEVBQVk7O0FBRVg7QUFDQW5PLGFBQU9tTyxLQUFLd0csZ0JBQUwsQ0FBdUIsSUFBdkIsQ0FBUDtBQUNBLFVBQUszVSxRQUFRQSxLQUFLekIsS0FBTCxLQUFlb1QsRUFBNUIsRUFBaUM7QUFDaEMsY0FBTyxDQUFFeEQsSUFBRixDQUFQO0FBQ0E7O0FBRUQ7QUFDQXlHLGNBQVE1RCxRQUFReUQsaUJBQVIsQ0FBMkI5QyxFQUEzQixDQUFSO0FBQ0F0VCxVQUFJLENBQUo7QUFDQSxhQUFVOFAsT0FBT3lHLE1BQU92VyxHQUFQLENBQWpCLEVBQWtDO0FBQ2pDMkIsY0FBT21PLEtBQUt3RyxnQkFBTCxDQUF1QixJQUF2QixDQUFQO0FBQ0EsV0FBSzNVLFFBQVFBLEtBQUt6QixLQUFMLEtBQWVvVCxFQUE1QixFQUFpQztBQUNoQyxlQUFPLENBQUV4RCxJQUFGLENBQVA7QUFDQTtBQUNEO0FBQ0Q7O0FBRUQsWUFBTyxFQUFQO0FBQ0E7QUFDRCxJQTFCRDtBQTJCQTs7QUFFRDtBQUNBN0IsT0FBS3RKLElBQUwsQ0FBVyxLQUFYLElBQXFCcUosUUFBUXVGLG9CQUFSLEdBQ3BCLFVBQVVyTyxHQUFWLEVBQWV5TixPQUFmLEVBQXlCO0FBQ3hCLE9BQUssT0FBT0EsUUFBUVksb0JBQWYsS0FBd0MsV0FBN0MsRUFBMkQ7QUFDMUQsV0FBT1osUUFBUVksb0JBQVIsQ0FBOEJyTyxHQUE5QixDQUFQOztBQUVEO0FBQ0MsSUFKRCxNQUlPLElBQUs4SSxRQUFReUYsR0FBYixFQUFtQjtBQUN6QixXQUFPZCxRQUFRekwsZ0JBQVIsQ0FBMEJoQyxHQUExQixDQUFQO0FBQ0E7QUFDRCxHQVRtQixHQVdwQixVQUFVQSxHQUFWLEVBQWV5TixPQUFmLEVBQXlCO0FBQ3hCLE9BQUk3QyxJQUFKO0FBQUEsT0FDQzBHLE1BQU0sRUFEUDtBQUFBLE9BRUN4VyxJQUFJLENBRkw7OztBQUlDO0FBQ0E0UyxhQUFVRCxRQUFRWSxvQkFBUixDQUE4QnJPLEdBQTlCLENBTFg7O0FBT0E7QUFDQSxPQUFLQSxRQUFRLEdBQWIsRUFBbUI7QUFDbEIsV0FBVTRLLE9BQU84QyxRQUFTNVMsR0FBVCxDQUFqQixFQUFvQztBQUNuQyxTQUFLOFAsS0FBSy9NLFFBQUwsS0FBa0IsQ0FBdkIsRUFBMkI7QUFDMUJ5VCxVQUFJdFMsSUFBSixDQUFVNEwsSUFBVjtBQUNBO0FBQ0Q7O0FBRUQsV0FBTzBHLEdBQVA7QUFDQTtBQUNELFVBQU81RCxPQUFQO0FBQ0EsR0E5QkY7O0FBZ0NBO0FBQ0EzRSxPQUFLdEosSUFBTCxDQUFXLE9BQVgsSUFBdUJxSixRQUFRd0Ysc0JBQVIsSUFBa0MsVUFBVXROLFNBQVYsRUFBcUJ5TSxPQUFyQixFQUErQjtBQUN2RixPQUFLLE9BQU9BLFFBQVFhLHNCQUFmLEtBQTBDLFdBQTFDLElBQXlEN0UsY0FBOUQsRUFBK0U7QUFDOUUsV0FBT2dFLFFBQVFhLHNCQUFSLENBQWdDdE4sU0FBaEMsQ0FBUDtBQUNBO0FBQ0QsR0FKRDs7QUFNQTs7O0FBR0E7O0FBRUE7QUFDQTJJLGtCQUFnQixFQUFoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FELGNBQVksRUFBWjs7QUFFQSxNQUFPWixRQUFReUYsR0FBUixHQUFjMUMsUUFBUWxRLElBQVIsQ0FBY1UsU0FBUzJGLGdCQUF2QixDQUFyQixFQUFtRTs7QUFFbEU7QUFDQTtBQUNBa04sVUFBUSxVQUFVQyxFQUFWLEVBQWU7O0FBRXRCLFFBQUl4RyxLQUFKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQWEsWUFBUXVILFdBQVIsQ0FBcUI1QixFQUFyQixFQUEwQm9DLFNBQTFCLEdBQXNDLFlBQVkzSCxPQUFaLEdBQXNCLFFBQXRCLEdBQ3JDLGNBRHFDLEdBQ3BCQSxPQURvQixHQUNWLDJCQURVLEdBRXJDLHdDQUZEOztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBS3VGLEdBQUduTixnQkFBSCxDQUFxQixzQkFBckIsRUFBOENySCxNQUFuRCxFQUE0RDtBQUMzRCtPLGVBQVUxSyxJQUFWLENBQWdCLFdBQVcrTCxVQUFYLEdBQXdCLGNBQXhDO0FBQ0E7O0FBRUQ7QUFDQTtBQUNBLFFBQUssQ0FBQ29FLEdBQUduTixnQkFBSCxDQUFxQixZQUFyQixFQUFvQ3JILE1BQTFDLEVBQW1EO0FBQ2xEK08sZUFBVTFLLElBQVYsQ0FBZ0IsUUFBUStMLFVBQVIsR0FBcUIsWUFBckIsR0FBb0NELFFBQXBDLEdBQStDLEdBQS9EO0FBQ0E7O0FBRUQ7QUFDQSxRQUFLLENBQUNxRSxHQUFHbk4sZ0JBQUgsQ0FBcUIsVUFBVTRILE9BQVYsR0FBb0IsSUFBekMsRUFBZ0RqUCxNQUF0RCxFQUErRDtBQUM5RCtPLGVBQVUxSyxJQUFWLENBQWdCLElBQWhCO0FBQ0E7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBMkosWUFBUXRNLFNBQVMrUyxhQUFULENBQXdCLE9BQXhCLENBQVI7QUFDQXpHLFVBQU0rRixZQUFOLENBQW9CLE1BQXBCLEVBQTRCLEVBQTVCO0FBQ0FTLE9BQUc0QixXQUFILENBQWdCcEksS0FBaEI7QUFDQSxRQUFLLENBQUN3RyxHQUFHbk4sZ0JBQUgsQ0FBcUIsV0FBckIsRUFBbUNySCxNQUF6QyxFQUFrRDtBQUNqRCtPLGVBQVUxSyxJQUFWLENBQWdCLFFBQVErTCxVQUFSLEdBQXFCLE9BQXJCLEdBQStCQSxVQUEvQixHQUE0QyxJQUE1QyxHQUNmQSxVQURlLEdBQ0YsY0FEZDtBQUVBOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFFBQUssQ0FBQ29FLEdBQUduTixnQkFBSCxDQUFxQixVQUFyQixFQUFrQ3JILE1BQXhDLEVBQWlEO0FBQ2hEK08sZUFBVTFLLElBQVYsQ0FBZ0IsVUFBaEI7QUFDQTs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxRQUFLLENBQUNtUSxHQUFHbk4sZ0JBQUgsQ0FBcUIsT0FBTzRILE9BQVAsR0FBaUIsSUFBdEMsRUFBNkNqUCxNQUFuRCxFQUE0RDtBQUMzRCtPLGVBQVUxSyxJQUFWLENBQWdCLFVBQWhCO0FBQ0E7O0FBRUQ7QUFDQTtBQUNBbVEsT0FBR25OLGdCQUFILENBQXFCLE1BQXJCO0FBQ0EwSCxjQUFVMUssSUFBVixDQUFnQixhQUFoQjtBQUNBLElBL0REOztBQWlFQWtRLFVBQVEsVUFBVUMsRUFBVixFQUFlO0FBQ3RCQSxPQUFHb0MsU0FBSCxHQUFlLHdDQUNkLGdEQUREOztBQUdBO0FBQ0E7QUFDQSxRQUFJNUksUUFBUXRNLFNBQVMrUyxhQUFULENBQXdCLE9BQXhCLENBQVo7QUFDQXpHLFVBQU0rRixZQUFOLENBQW9CLE1BQXBCLEVBQTRCLFFBQTVCO0FBQ0FTLE9BQUc0QixXQUFILENBQWdCcEksS0FBaEIsRUFBd0IrRixZQUF4QixDQUFzQyxNQUF0QyxFQUE4QyxHQUE5Qzs7QUFFQTtBQUNBO0FBQ0EsUUFBS1MsR0FBR25OLGdCQUFILENBQXFCLFVBQXJCLEVBQWtDckgsTUFBdkMsRUFBZ0Q7QUFDL0MrTyxlQUFVMUssSUFBVixDQUFnQixTQUFTK0wsVUFBVCxHQUFzQixhQUF0QztBQUNBOztBQUVEO0FBQ0E7QUFDQSxRQUFLb0UsR0FBR25OLGdCQUFILENBQXFCLFVBQXJCLEVBQWtDckgsTUFBbEMsS0FBNkMsQ0FBbEQsRUFBc0Q7QUFDckQrTyxlQUFVMUssSUFBVixDQUFnQixVQUFoQixFQUE0QixXQUE1QjtBQUNBOztBQUVEO0FBQ0E7QUFDQXdLLFlBQVF1SCxXQUFSLENBQXFCNUIsRUFBckIsRUFBMEJwQyxRQUExQixHQUFxQyxJQUFyQztBQUNBLFFBQUtvQyxHQUFHbk4sZ0JBQUgsQ0FBcUIsV0FBckIsRUFBbUNySCxNQUFuQyxLQUE4QyxDQUFuRCxFQUF1RDtBQUN0RCtPLGVBQVUxSyxJQUFWLENBQWdCLFVBQWhCLEVBQTRCLFdBQTVCO0FBQ0E7O0FBRUQ7QUFDQTtBQUNBbVEsT0FBR25OLGdCQUFILENBQXFCLE1BQXJCO0FBQ0EwSCxjQUFVMUssSUFBVixDQUFnQixNQUFoQjtBQUNBLElBakNEO0FBa0NBOztBQUVELE1BQU84SixRQUFRMEksZUFBUixHQUEwQjNGLFFBQVFsUSxJQUFSLENBQWdCK0QsVUFBVThKLFFBQVE5SixPQUFSLElBQzFEOEosUUFBUWlJLHFCQURrRCxJQUUxRGpJLFFBQVFrSSxrQkFGa0QsSUFHMURsSSxRQUFRbUksZ0JBSGtELElBSTFEbkksUUFBUW9JLGlCQUp3QixDQUFqQyxFQUltQzs7QUFFbEMxQyxVQUFRLFVBQVVDLEVBQVYsRUFBZTs7QUFFdEI7QUFDQTtBQUNBckcsWUFBUStJLGlCQUFSLEdBQTRCblMsUUFBUXlOLElBQVIsQ0FBY2dDLEVBQWQsRUFBa0IsR0FBbEIsQ0FBNUI7O0FBRUE7QUFDQTtBQUNBelAsWUFBUXlOLElBQVIsQ0FBY2dDLEVBQWQsRUFBa0IsV0FBbEI7QUFDQXhGLGtCQUFjM0ssSUFBZCxDQUFvQixJQUFwQixFQUEwQmlNLE9BQTFCO0FBQ0EsSUFWRDtBQVdBOztBQUVEdkIsY0FBWUEsVUFBVS9PLE1BQVYsSUFBb0IsSUFBSWdELE1BQUosQ0FBWStMLFVBQVVqSCxJQUFWLENBQWdCLEdBQWhCLENBQVosQ0FBaEM7QUFDQWtILGtCQUFnQkEsY0FBY2hQLE1BQWQsSUFBd0IsSUFBSWdELE1BQUosQ0FBWWdNLGNBQWNsSCxJQUFkLENBQW9CLEdBQXBCLENBQVosQ0FBeEM7O0FBRUE7O0FBRUFnTyxlQUFhNUUsUUFBUWxRLElBQVIsQ0FBYzZOLFFBQVFzSSx1QkFBdEIsQ0FBYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTdWLGFBQVd3VSxjQUFjNUUsUUFBUWxRLElBQVIsQ0FBYzZOLFFBQVF2TixRQUF0QixDQUFkLEdBQ1YsVUFBVTZELENBQVYsRUFBYXlLLENBQWIsRUFBaUI7QUFDaEIsT0FBSXdILFFBQVFqUyxFQUFFakMsUUFBRixLQUFlLENBQWYsR0FBbUJpQyxFQUFFMFEsZUFBckIsR0FBdUMxUSxDQUFuRDtBQUFBLE9BQ0NrUyxNQUFNekgsS0FBS0EsRUFBRW5NLFVBRGQ7QUFFQSxVQUFPMEIsTUFBTWtTLEdBQU4sSUFBYSxDQUFDLEVBQUdBLE9BQU9BLElBQUluVSxRQUFKLEtBQWlCLENBQXhCLEtBQ3ZCa1UsTUFBTTlWLFFBQU4sR0FDQzhWLE1BQU05VixRQUFOLENBQWdCK1YsR0FBaEIsQ0FERCxHQUVDbFMsRUFBRWdTLHVCQUFGLElBQTZCaFMsRUFBRWdTLHVCQUFGLENBQTJCRSxHQUEzQixJQUFtQyxFQUgxQyxDQUFILENBQXJCO0FBS0EsR0FUUyxHQVVWLFVBQVVsUyxDQUFWLEVBQWF5SyxDQUFiLEVBQWlCO0FBQ2hCLE9BQUtBLENBQUwsRUFBUztBQUNSLFdBQVVBLElBQUlBLEVBQUVuTSxVQUFoQixFQUErQjtBQUM5QixTQUFLbU0sTUFBTXpLLENBQVgsRUFBZTtBQUNkLGFBQU8sSUFBUDtBQUNBO0FBQ0Q7QUFDRDtBQUNELFVBQU8sS0FBUDtBQUNBLEdBbkJGOztBQXFCQTs7O0FBR0E7QUFDQXdLLGNBQVltRyxhQUNaLFVBQVUzUSxDQUFWLEVBQWF5SyxDQUFiLEVBQWlCOztBQUVoQjtBQUNBLE9BQUt6SyxNQUFNeUssQ0FBWCxFQUFlO0FBQ2RqQixtQkFBZSxJQUFmO0FBQ0EsV0FBTyxDQUFQO0FBQ0E7O0FBRUQ7QUFDQSxPQUFJaE0sVUFBVSxDQUFDd0MsRUFBRWdTLHVCQUFILEdBQTZCLENBQUN2SCxFQUFFdUgsdUJBQTlDO0FBQ0EsT0FBS3hVLE9BQUwsRUFBZTtBQUNkLFdBQU9BLE9BQVA7QUFDQTs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FBLGFBQVUsQ0FBRXdDLEVBQUVtTyxhQUFGLElBQW1Cbk8sQ0FBckIsTUFBOEJ5SyxFQUFFMEQsYUFBRixJQUFtQjFELENBQWpELElBQ1R6SyxFQUFFZ1MsdUJBQUYsQ0FBMkJ2SCxDQUEzQixDQURTOztBQUdUO0FBQ0EsSUFKRDs7QUFNQTtBQUNBLE9BQUtqTixVQUFVLENBQVYsSUFDRixDQUFDd0wsUUFBUW1KLFlBQVQsSUFBeUIxSCxFQUFFdUgsdUJBQUYsQ0FBMkJoUyxDQUEzQixNQUFtQ3hDLE9BRC9ELEVBQzJFOztBQUUxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBS3dDLEtBQUt6RCxRQUFMLElBQWlCeUQsRUFBRW1PLGFBQUYsSUFBbUJuRSxZQUFuQixJQUNyQjdOLFNBQVU2TixZQUFWLEVBQXdCaEssQ0FBeEIsQ0FERCxFQUMrQjtBQUM5QixZQUFPLENBQUMsQ0FBUjtBQUNBOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBS3lLLEtBQUtsTyxRQUFMLElBQWlCa08sRUFBRTBELGFBQUYsSUFBbUJuRSxZQUFuQixJQUNyQjdOLFNBQVU2TixZQUFWLEVBQXdCUyxDQUF4QixDQURELEVBQytCO0FBQzlCLFlBQU8sQ0FBUDtBQUNBOztBQUVEO0FBQ0EsV0FBT2xCLFlBQ0pyTixRQUFTcU4sU0FBVCxFQUFvQnZKLENBQXBCLElBQTBCOUQsUUFBU3FOLFNBQVQsRUFBb0JrQixDQUFwQixDQUR0QixHQUVOLENBRkQ7QUFHQTs7QUFFRCxVQUFPak4sVUFBVSxDQUFWLEdBQWMsQ0FBQyxDQUFmLEdBQW1CLENBQTFCO0FBQ0EsR0F4RFcsR0F5RFosVUFBVXdDLENBQVYsRUFBYXlLLENBQWIsRUFBaUI7O0FBRWhCO0FBQ0EsT0FBS3pLLE1BQU15SyxDQUFYLEVBQWU7QUFDZGpCLG1CQUFlLElBQWY7QUFDQSxXQUFPLENBQVA7QUFDQTs7QUFFRCxPQUFJcUcsR0FBSjtBQUFBLE9BQ0M3VSxJQUFJLENBREw7QUFBQSxPQUVDb1gsTUFBTXBTLEVBQUUxQixVQUZUO0FBQUEsT0FHQzRULE1BQU16SCxFQUFFbk0sVUFIVDtBQUFBLE9BSUMrVCxLQUFLLENBQUVyUyxDQUFGLENBSk47QUFBQSxPQUtDc1MsS0FBSyxDQUFFN0gsQ0FBRixDQUxOOztBQU9BO0FBQ0EsT0FBSyxDQUFDMkgsR0FBRCxJQUFRLENBQUNGLEdBQWQsRUFBb0I7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBT2xTLEtBQUt6RCxRQUFMLEdBQWdCLENBQUMsQ0FBakIsR0FDTmtPLEtBQUtsTyxRQUFMLEdBQWdCLENBQWhCO0FBQ0E7QUFDQTZWLFVBQU0sQ0FBQyxDQUFQLEdBQ0FGLE1BQU0sQ0FBTixHQUNBM0ksWUFDRXJOLFFBQVNxTixTQUFULEVBQW9CdkosQ0FBcEIsSUFBMEI5RCxRQUFTcU4sU0FBVCxFQUFvQmtCLENBQXBCLENBRDVCLEdBRUEsQ0FQRDs7QUFTRDtBQUNDLElBaEJELE1BZ0JPLElBQUsySCxRQUFRRixHQUFiLEVBQW1CO0FBQ3pCLFdBQU90QyxhQUFjNVAsQ0FBZCxFQUFpQnlLLENBQWpCLENBQVA7QUFDQTs7QUFFRDtBQUNBb0YsU0FBTTdQLENBQU47QUFDQSxVQUFVNlAsTUFBTUEsSUFBSXZSLFVBQXBCLEVBQW1DO0FBQ2xDK1QsT0FBRzVULE9BQUgsQ0FBWW9SLEdBQVo7QUFDQTtBQUNEQSxTQUFNcEYsQ0FBTjtBQUNBLFVBQVVvRixNQUFNQSxJQUFJdlIsVUFBcEIsRUFBbUM7QUFDbENnVSxPQUFHN1QsT0FBSCxDQUFZb1IsR0FBWjtBQUNBOztBQUVEO0FBQ0EsVUFBUXdDLEdBQUlyWCxDQUFKLE1BQVlzWCxHQUFJdFgsQ0FBSixDQUFwQixFQUE4QjtBQUM3QkE7QUFDQTs7QUFFRCxVQUFPQTs7QUFFTjtBQUNBNFUsZ0JBQWN5QyxHQUFJclgsQ0FBSixDQUFkLEVBQXVCc1gsR0FBSXRYLENBQUosQ0FBdkIsQ0FITTs7QUFLTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FxWCxNQUFJclgsQ0FBSixLQUFXZ1AsWUFBWCxHQUEwQixDQUFDLENBQTNCLEdBQ0FzSSxHQUFJdFgsQ0FBSixLQUFXZ1AsWUFBWCxHQUEwQixDQUExQjtBQUNBO0FBQ0EsSUFiRDtBQWNBLEdBMUhEOztBQTRIQSxTQUFPek4sUUFBUDtBQUNBLEVBMWREOztBQTRkQXFILFFBQU9oRSxPQUFQLEdBQWlCLFVBQVUyUyxJQUFWLEVBQWdCbk8sUUFBaEIsRUFBMkI7QUFDM0MsU0FBT1IsT0FBUTJPLElBQVIsRUFBYyxJQUFkLEVBQW9CLElBQXBCLEVBQTBCbk8sUUFBMUIsQ0FBUDtBQUNBLEVBRkQ7O0FBSUFSLFFBQU84TixlQUFQLEdBQXlCLFVBQVU1RyxJQUFWLEVBQWdCeUgsSUFBaEIsRUFBdUI7QUFDL0M5SSxjQUFhcUIsSUFBYjs7QUFFQSxNQUFLOUIsUUFBUTBJLGVBQVIsSUFBMkIvSCxjQUEzQixJQUNKLENBQUNZLHVCQUF3QmdJLE9BQU8sR0FBL0IsQ0FERyxLQUVGLENBQUMxSSxhQUFELElBQWtCLENBQUNBLGNBQWNoTyxJQUFkLENBQW9CMFcsSUFBcEIsQ0FGakIsTUFHRixDQUFDM0ksU0FBRCxJQUFrQixDQUFDQSxVQUFVL04sSUFBVixDQUFnQjBXLElBQWhCLENBSGpCLENBQUwsRUFHaUQ7O0FBRWhELE9BQUk7QUFDSCxRQUFJQyxNQUFNNVMsUUFBUXlOLElBQVIsQ0FBY3ZDLElBQWQsRUFBb0J5SCxJQUFwQixDQUFWOztBQUVBO0FBQ0EsUUFBS0MsT0FBT3hKLFFBQVErSSxpQkFBZjs7QUFFSjtBQUNBO0FBQ0FqSCxTQUFLdk8sUUFBTCxJQUFpQnVPLEtBQUt2TyxRQUFMLENBQWN3QixRQUFkLEtBQTJCLEVBSjdDLEVBSWtEO0FBQ2pELFlBQU95VSxHQUFQO0FBQ0E7QUFDRCxJQVhELENBV0UsT0FBUWpGLENBQVIsRUFBWTtBQUNiaEQsMkJBQXdCZ0ksSUFBeEIsRUFBOEIsSUFBOUI7QUFDQTtBQUNEOztBQUVELFNBQU8zTyxPQUFRMk8sSUFBUixFQUFjaFcsUUFBZCxFQUF3QixJQUF4QixFQUE4QixDQUFFdU8sSUFBRixDQUE5QixFQUF5Q2pRLE1BQXpDLEdBQWtELENBQXpEO0FBQ0EsRUF6QkQ7O0FBMkJBK0ksUUFBT3pILFFBQVAsR0FBa0IsVUFBVXdSLE9BQVYsRUFBbUI3QyxJQUFuQixFQUEwQjs7QUFFM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUssQ0FBRTZDLFFBQVFRLGFBQVIsSUFBeUJSLE9BQTNCLEtBQXdDcFIsUUFBN0MsRUFBd0Q7QUFDdkRrTixlQUFha0UsT0FBYjtBQUNBO0FBQ0QsU0FBT3hSLFNBQVV3UixPQUFWLEVBQW1CN0MsSUFBbkIsQ0FBUDtBQUNBLEVBWEQ7O0FBYUFsSCxRQUFPNk8sSUFBUCxHQUFjLFVBQVUzSCxJQUFWLEVBQWdCaE4sSUFBaEIsRUFBdUI7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLLENBQUVnTixLQUFLcUQsYUFBTCxJQUFzQnJELElBQXhCLEtBQWtDdk8sUUFBdkMsRUFBa0Q7QUFDakRrTixlQUFhcUIsSUFBYjtBQUNBOztBQUVELE1BQUlxRSxLQUFLbEcsS0FBSzBHLFVBQUwsQ0FBaUI3UixLQUFLc0MsV0FBTCxFQUFqQixDQUFUOzs7QUFFQztBQUNBTCxRQUFNb1AsTUFBTXpFLE9BQU8yQyxJQUFQLENBQWFwRSxLQUFLMEcsVUFBbEIsRUFBOEI3UixLQUFLc0MsV0FBTCxFQUE5QixDQUFOLEdBQ0wrTyxHQUFJckUsSUFBSixFQUFVaE4sSUFBVixFQUFnQixDQUFDNkwsY0FBakIsQ0FESyxHQUVMakUsU0FMRjs7QUFPQSxTQUFPM0YsUUFBUTJGLFNBQVIsR0FDTjNGLEdBRE0sR0FFTmlKLFFBQVFuSixVQUFSLElBQXNCLENBQUM4SixjQUF2QixHQUNDbUIsS0FBS25GLFlBQUwsQ0FBbUI3SCxJQUFuQixDQURELEdBRUMsQ0FBRWlDLE1BQU0rSyxLQUFLd0csZ0JBQUwsQ0FBdUJ4VCxJQUF2QixDQUFSLEtBQTJDaUMsSUFBSTJTLFNBQS9DLEdBQ0MzUyxJQUFJN0UsS0FETCxHQUVDLElBTkg7QUFPQSxFQXpCRDs7QUEyQkEwSSxRQUFPd0ksTUFBUCxHQUFnQixVQUFVdUcsR0FBVixFQUFnQjtBQUMvQixTQUFPLENBQUVBLE1BQU0sRUFBUixFQUFheFgsT0FBYixDQUFzQnNSLFVBQXRCLEVBQWtDQyxVQUFsQyxDQUFQO0FBQ0EsRUFGRDs7QUFJQTlJLFFBQU9nUCxLQUFQLEdBQWUsVUFBVUMsR0FBVixFQUFnQjtBQUM5QixRQUFNLElBQUkzTSxLQUFKLENBQVcsNENBQTRDMk0sR0FBdkQsQ0FBTjtBQUNBLEVBRkQ7O0FBSUE7Ozs7QUFJQWpQLFFBQU9rUCxVQUFQLEdBQW9CLFVBQVVsRixPQUFWLEVBQW9CO0FBQ3ZDLE1BQUk5QyxJQUFKO0FBQUEsTUFDQ2lJLGFBQWEsRUFEZDtBQUFBLE1BRUNyRixJQUFJLENBRkw7QUFBQSxNQUdDMVMsSUFBSSxDQUhMOztBQUtBO0FBQ0F3TyxpQkFBZSxDQUFDUixRQUFRZ0ssZ0JBQXhCO0FBQ0F6SixjQUFZLENBQUNQLFFBQVFpSyxVQUFULElBQXVCckYsUUFBUXZILEtBQVIsQ0FBZSxDQUFmLENBQW5DO0FBQ0F1SCxVQUFRL0ksSUFBUixDQUFjMkYsU0FBZDs7QUFFQSxNQUFLaEIsWUFBTCxFQUFvQjtBQUNuQixVQUFVc0IsT0FBTzhDLFFBQVM1UyxHQUFULENBQWpCLEVBQW9DO0FBQ25DLFFBQUs4UCxTQUFTOEMsUUFBUzVTLENBQVQsQ0FBZCxFQUE2QjtBQUM1QjBTLFNBQUlxRixXQUFXN1QsSUFBWCxDQUFpQmxFLENBQWpCLENBQUo7QUFDQTtBQUNEO0FBQ0QsVUFBUTBTLEdBQVIsRUFBYztBQUNiRSxZQUFRc0YsTUFBUixDQUFnQkgsV0FBWXJGLENBQVosQ0FBaEIsRUFBaUMsQ0FBakM7QUFDQTtBQUNEOztBQUVEO0FBQ0E7QUFDQW5FLGNBQVksSUFBWjs7QUFFQSxTQUFPcUUsT0FBUDtBQUNBLEVBM0JEOztBQTZCQTs7OztBQUlBMUUsV0FBVXRGLE9BQU9zRixPQUFQLEdBQWlCLFVBQVU0QixJQUFWLEVBQWlCO0FBQzNDLE1BQUluTyxJQUFKO0FBQUEsTUFDQzZWLE1BQU0sRUFEUDtBQUFBLE1BRUN4WCxJQUFJLENBRkw7QUFBQSxNQUdDK0MsV0FBVytNLEtBQUsvTSxRQUhqQjs7QUFLQSxNQUFLLENBQUNBLFFBQU4sRUFBaUI7O0FBRWhCO0FBQ0EsVUFBVXBCLE9BQU9tTyxLQUFNOVAsR0FBTixDQUFqQixFQUFpQzs7QUFFaEM7QUFDQXdYLFdBQU90SixRQUFTdk0sSUFBVCxDQUFQO0FBQ0E7QUFDRCxHQVJELE1BUU8sSUFBS29CLGFBQWEsQ0FBYixJQUFrQkEsYUFBYSxDQUEvQixJQUFvQ0EsYUFBYSxFQUF0RCxFQUEyRDs7QUFFakU7QUFDQTtBQUNBLE9BQUssT0FBTytNLEtBQUtuSixXQUFaLEtBQTRCLFFBQWpDLEVBQTRDO0FBQzNDLFdBQU9tSixLQUFLbkosV0FBWjtBQUNBLElBRkQsTUFFTzs7QUFFTjtBQUNBLFNBQU1tSixPQUFPQSxLQUFLbEosVUFBbEIsRUFBOEJrSixJQUE5QixFQUFvQ0EsT0FBT0EsS0FBS2tGLFdBQWhELEVBQThEO0FBQzdEd0MsWUFBT3RKLFFBQVM0QixJQUFULENBQVA7QUFDQTtBQUNEO0FBQ0QsR0FiTSxNQWFBLElBQUsvTSxhQUFhLENBQWIsSUFBa0JBLGFBQWEsQ0FBcEMsRUFBd0M7QUFDOUMsVUFBTytNLEtBQUtqSixTQUFaO0FBQ0E7O0FBRUQ7O0FBRUEsU0FBTzJRLEdBQVA7QUFDQSxFQWxDRDs7QUFvQ0F2SixRQUFPckYsT0FBT3VQLFNBQVAsR0FBbUI7O0FBRXpCO0FBQ0FsRSxlQUFhLEVBSFk7O0FBS3pCbUUsZ0JBQWNsRSxZQUxXOztBQU96QnBULFNBQU82UCxTQVBrQjs7QUFTekJnRSxjQUFZLEVBVGE7O0FBV3pCaFEsUUFBTSxFQVhtQjs7QUFhekIwVCxZQUFVO0FBQ1QsUUFBSyxFQUFFbEcsS0FBSyxZQUFQLEVBQXFCbUcsT0FBTyxJQUE1QixFQURJO0FBRVQsUUFBSyxFQUFFbkcsS0FBSyxZQUFQLEVBRkk7QUFHVCxRQUFLLEVBQUVBLEtBQUssaUJBQVAsRUFBMEJtRyxPQUFPLElBQWpDLEVBSEk7QUFJVCxRQUFLLEVBQUVuRyxLQUFLLGlCQUFQO0FBSkksR0FiZTs7QUFvQnpCb0csYUFBVztBQUNWLFdBQVEsY0FBVXpYLEtBQVYsRUFBa0I7QUFDekJBLFVBQU8sQ0FBUCxJQUFhQSxNQUFPLENBQVAsRUFBV1gsT0FBWCxDQUFvQitRLFNBQXBCLEVBQStCQyxTQUEvQixDQUFiOztBQUVBO0FBQ0FyUSxVQUFPLENBQVAsSUFBYSxDQUFFQSxNQUFPLENBQVAsS0FBY0EsTUFBTyxDQUFQLENBQWQsSUFDZEEsTUFBTyxDQUFQLENBRGMsSUFDQSxFQURGLEVBQ09YLE9BRFAsQ0FDZ0IrUSxTQURoQixFQUMyQkMsU0FEM0IsQ0FBYjs7QUFHQSxRQUFLclEsTUFBTyxDQUFQLE1BQWUsSUFBcEIsRUFBMkI7QUFDMUJBLFdBQU8sQ0FBUCxJQUFhLE1BQU1BLE1BQU8sQ0FBUCxDQUFOLEdBQW1CLEdBQWhDO0FBQ0E7O0FBRUQsV0FBT0EsTUFBTXVLLEtBQU4sQ0FBYSxDQUFiLEVBQWdCLENBQWhCLENBQVA7QUFDQSxJQWJTOztBQWVWLFlBQVMsZUFBVXZLLEtBQVYsRUFBa0I7O0FBRTFCOzs7Ozs7Ozs7O0FBVUFBLFVBQU8sQ0FBUCxJQUFhQSxNQUFPLENBQVAsRUFBV3NFLFdBQVgsRUFBYjs7QUFFQSxRQUFLdEUsTUFBTyxDQUFQLEVBQVd1SyxLQUFYLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLE1BQTZCLEtBQWxDLEVBQTBDOztBQUV6QztBQUNBLFNBQUssQ0FBQ3ZLLE1BQU8sQ0FBUCxDQUFOLEVBQW1CO0FBQ2xCOEgsYUFBT2dQLEtBQVAsQ0FBYzlXLE1BQU8sQ0FBUCxDQUFkO0FBQ0E7O0FBRUQ7QUFDQTtBQUNBQSxXQUFPLENBQVAsSUFBYSxFQUFHQSxNQUFPLENBQVAsSUFDZkEsTUFBTyxDQUFQLEtBQWVBLE1BQU8sQ0FBUCxLQUFjLENBQTdCLENBRGUsR0FFZixLQUFNQSxNQUFPLENBQVAsTUFBZSxNQUFmLElBQXlCQSxNQUFPLENBQVAsTUFBZSxLQUE5QyxDQUZZLENBQWI7QUFHQUEsV0FBTyxDQUFQLElBQWEsRUFBS0EsTUFBTyxDQUFQLElBQWFBLE1BQU8sQ0FBUCxDQUFmLElBQStCQSxNQUFPLENBQVAsTUFBZSxLQUFqRCxDQUFiOztBQUVBO0FBQ0EsS0FmRCxNQWVPLElBQUtBLE1BQU8sQ0FBUCxDQUFMLEVBQWtCO0FBQ3hCOEgsWUFBT2dQLEtBQVAsQ0FBYzlXLE1BQU8sQ0FBUCxDQUFkO0FBQ0E7O0FBRUQsV0FBT0EsS0FBUDtBQUNBLElBakRTOztBQW1EVixhQUFVLGdCQUFVQSxLQUFWLEVBQWtCO0FBQzNCLFFBQUkwWCxNQUFKO0FBQUEsUUFDQ0MsV0FBVyxDQUFDM1gsTUFBTyxDQUFQLENBQUQsSUFBZUEsTUFBTyxDQUFQLENBRDNCOztBQUdBLFFBQUs2UCxVQUFXLE9BQVgsRUFBcUI5UCxJQUFyQixDQUEyQkMsTUFBTyxDQUFQLENBQTNCLENBQUwsRUFBK0M7QUFDOUMsWUFBTyxJQUFQO0FBQ0E7O0FBRUQ7QUFDQSxRQUFLQSxNQUFPLENBQVAsQ0FBTCxFQUFrQjtBQUNqQkEsV0FBTyxDQUFQLElBQWFBLE1BQU8sQ0FBUCxLQUFjQSxNQUFPLENBQVAsQ0FBZCxJQUE0QixFQUF6Qzs7QUFFRDtBQUNDLEtBSkQsTUFJTyxJQUFLMlgsWUFBWWhJLFFBQVE1UCxJQUFSLENBQWM0WCxRQUFkLENBQVo7O0FBRVg7QUFDRUQsYUFBU3BLLFNBQVVxSyxRQUFWLEVBQW9CLElBQXBCLENBSEE7O0FBS1g7QUFDRUQsYUFBU0MsU0FBU3ZYLE9BQVQsQ0FBa0IsR0FBbEIsRUFBdUJ1WCxTQUFTNVksTUFBVCxHQUFrQjJZLE1BQXpDLElBQW9EQyxTQUFTNVksTUFON0QsQ0FBTCxFQU02RTs7QUFFbkY7QUFDQWlCLFdBQU8sQ0FBUCxJQUFhQSxNQUFPLENBQVAsRUFBV3VLLEtBQVgsQ0FBa0IsQ0FBbEIsRUFBcUJtTixNQUFyQixDQUFiO0FBQ0ExWCxXQUFPLENBQVAsSUFBYTJYLFNBQVNwTixLQUFULENBQWdCLENBQWhCLEVBQW1CbU4sTUFBbkIsQ0FBYjtBQUNBOztBQUVEO0FBQ0EsV0FBTzFYLE1BQU11SyxLQUFOLENBQWEsQ0FBYixFQUFnQixDQUFoQixDQUFQO0FBQ0E7QUEvRVMsR0FwQmM7O0FBc0d6QmhILFVBQVE7O0FBRVAsVUFBTyxhQUFVcVUsZ0JBQVYsRUFBNkI7QUFDbkMsUUFBSXhHLFdBQVd3RyxpQkFBaUJ2WSxPQUFqQixDQUEwQitRLFNBQTFCLEVBQXFDQyxTQUFyQyxFQUFpRC9MLFdBQWpELEVBQWY7QUFDQSxXQUFPc1QscUJBQXFCLEdBQXJCLEdBQ04sWUFBVztBQUNWLFlBQU8sSUFBUDtBQUNBLEtBSEssR0FJTixVQUFVNUksSUFBVixFQUFpQjtBQUNoQixZQUFPQSxLQUFLb0MsUUFBTCxJQUFpQnBDLEtBQUtvQyxRQUFMLENBQWM5TSxXQUFkLE9BQWdDOE0sUUFBeEQ7QUFDQSxLQU5GO0FBT0EsSUFYTTs7QUFhUCxZQUFTLGVBQVVoTSxTQUFWLEVBQXNCO0FBQzlCLFFBQUkzQyxVQUFVNEwsV0FBWWpKLFlBQVksR0FBeEIsQ0FBZDs7QUFFQSxXQUFPM0MsV0FDTixDQUFFQSxVQUFVLElBQUlWLE1BQUosQ0FBWSxRQUFRb04sVUFBUixHQUN2QixHQUR1QixHQUNqQi9KLFNBRGlCLEdBQ0wsR0FESyxHQUNDK0osVUFERCxHQUNjLEtBRDFCLENBQVosS0FDbURkLFdBQ2pEakosU0FEaUQsRUFDdEMsVUFBVTRKLElBQVYsRUFBaUI7QUFDM0IsWUFBT3ZNLFFBQVExQyxJQUFSLENBQ04sT0FBT2lQLEtBQUs1SixTQUFaLEtBQTBCLFFBQTFCLElBQXNDNEosS0FBSzVKLFNBQTNDLElBQ0EsT0FBTzRKLEtBQUtuRixZQUFaLEtBQTZCLFdBQTdCLElBQ0NtRixLQUFLbkYsWUFBTCxDQUFtQixPQUFuQixDQUZELElBR0EsRUFKTSxDQUFQO0FBTUYsS0FSa0QsQ0FGcEQ7QUFXQSxJQTNCTTs7QUE2QlAsV0FBUSxjQUFVN0gsSUFBVixFQUFnQjZWLFFBQWhCLEVBQTBCblIsS0FBMUIsRUFBa0M7QUFDekMsV0FBTyxVQUFVc0ksSUFBVixFQUFpQjtBQUN2QixTQUFJOUwsU0FBUzRFLE9BQU82TyxJQUFQLENBQWEzSCxJQUFiLEVBQW1CaE4sSUFBbkIsQ0FBYjs7QUFFQSxTQUFLa0IsVUFBVSxJQUFmLEVBQXNCO0FBQ3JCLGFBQU8yVSxhQUFhLElBQXBCO0FBQ0E7QUFDRCxTQUFLLENBQUNBLFFBQU4sRUFBaUI7QUFDaEIsYUFBTyxJQUFQO0FBQ0E7O0FBRUQzVSxlQUFVLEVBQVY7O0FBRUE7O0FBRUEsWUFBTzJVLGFBQWEsR0FBYixHQUFtQjNVLFdBQVd3RCxLQUE5QixHQUNObVIsYUFBYSxJQUFiLEdBQW9CM1UsV0FBV3dELEtBQS9CLEdBQ0FtUixhQUFhLElBQWIsR0FBb0JuUixTQUFTeEQsT0FBTzlDLE9BQVAsQ0FBZ0JzRyxLQUFoQixNQUE0QixDQUF6RCxHQUNBbVIsYUFBYSxJQUFiLEdBQW9CblIsU0FBU3hELE9BQU85QyxPQUFQLENBQWdCc0csS0FBaEIsSUFBMEIsQ0FBQyxDQUF4RCxHQUNBbVIsYUFBYSxJQUFiLEdBQW9CblIsU0FBU3hELE9BQU9xSCxLQUFQLENBQWMsQ0FBQzdELE1BQU0zSCxNQUFyQixNQUFrQzJILEtBQS9ELEdBQ0FtUixhQUFhLElBQWIsR0FBb0IsQ0FBRSxNQUFNM1UsT0FBTzdELE9BQVAsQ0FBZ0JpUSxXQUFoQixFQUE2QixHQUE3QixDQUFOLEdBQTJDLEdBQTdDLEVBQW1EbFAsT0FBbkQsQ0FBNERzRyxLQUE1RCxJQUFzRSxDQUFDLENBQTNGLEdBQ0FtUixhQUFhLElBQWIsR0FBb0IzVSxXQUFXd0QsS0FBWCxJQUFvQnhELE9BQU9xSCxLQUFQLENBQWMsQ0FBZCxFQUFpQjdELE1BQU0zSCxNQUFOLEdBQWUsQ0FBaEMsTUFBd0MySCxRQUFRLEdBQXhGLEdBQ0EsS0FQRDtBQVFBO0FBRUEsS0F4QkQ7QUF5QkEsSUF2RE07O0FBeURQLFlBQVMsZUFBVTVFLElBQVYsRUFBZ0JnVyxJQUFoQixFQUFzQkMsU0FBdEIsRUFBaUNQLEtBQWpDLEVBQXdDUSxJQUF4QyxFQUErQztBQUN2RCxRQUFJQyxTQUFTblcsS0FBS3lJLEtBQUwsQ0FBWSxDQUFaLEVBQWUsQ0FBZixNQUF1QixLQUFwQztBQUFBLFFBQ0MyTixVQUFVcFcsS0FBS3lJLEtBQUwsQ0FBWSxDQUFDLENBQWIsTUFBcUIsTUFEaEM7QUFBQSxRQUVDNE4sU0FBU0wsU0FBUyxTQUZuQjs7QUFJQSxXQUFPTixVQUFVLENBQVYsSUFBZVEsU0FBUyxDQUF4Qjs7QUFFTjtBQUNBLGNBQVVoSixJQUFWLEVBQWlCO0FBQ2hCLFlBQU8sQ0FBQyxDQUFDQSxLQUFLeE0sVUFBZDtBQUNBLEtBTEssR0FPTixVQUFVd00sSUFBVixFQUFnQm9KLFFBQWhCLEVBQTBCQyxHQUExQixFQUFnQztBQUMvQixTQUFJbkYsS0FBSjtBQUFBLFNBQVdvRixXQUFYO0FBQUEsU0FBd0JDLFVBQXhCO0FBQUEsU0FBb0MxWCxJQUFwQztBQUFBLFNBQTBDMlgsU0FBMUM7QUFBQSxTQUFxREMsS0FBckQ7QUFBQSxTQUNDcEgsTUFBTTRHLFdBQVdDLE9BQVgsR0FBcUIsYUFBckIsR0FBcUMsaUJBRDVDO0FBQUEsU0FFQ3RWLFNBQVNvTSxLQUFLeE0sVUFGZjtBQUFBLFNBR0NSLE9BQU9tVyxVQUFVbkosS0FBS29DLFFBQUwsQ0FBYzlNLFdBQWQsRUFIbEI7QUFBQSxTQUlDb1UsV0FBVyxDQUFDTCxHQUFELElBQVEsQ0FBQ0YsTUFKckI7QUFBQSxTQUtDbkUsT0FBTyxLQUxSOztBQU9BLFNBQUtwUixNQUFMLEVBQWM7O0FBRWI7QUFDQSxVQUFLcVYsTUFBTCxFQUFjO0FBQ2IsY0FBUTVHLEdBQVIsRUFBYztBQUNieFEsZUFBT21PLElBQVA7QUFDQSxlQUFVbk8sT0FBT0EsS0FBTXdRLEdBQU4sQ0FBakIsRUFBaUM7QUFDaEMsYUFBSzhHLFNBQ0p0WCxLQUFLdVEsUUFBTCxDQUFjOU0sV0FBZCxPQUFnQ3RDLElBRDVCLEdBRUpuQixLQUFLb0IsUUFBTCxLQUFrQixDQUZuQixFQUV1Qjs7QUFFdEIsaUJBQU8sS0FBUDtBQUNBO0FBQ0Q7O0FBRUQ7QUFDQXdXLGdCQUFRcEgsTUFBTXZQLFNBQVMsTUFBVCxJQUFtQixDQUFDMlcsS0FBcEIsSUFBNkIsYUFBM0M7QUFDQTtBQUNELGNBQU8sSUFBUDtBQUNBOztBQUVEQSxjQUFRLENBQUVQLFVBQVV0VixPQUFPa0QsVUFBakIsR0FBOEJsRCxPQUFPK1YsU0FBdkMsQ0FBUjs7QUFFQTtBQUNBLFVBQUtULFdBQVdRLFFBQWhCLEVBQTJCOztBQUUxQjs7QUFFQTtBQUNBN1gsY0FBTytCLE1BQVA7QUFDQTJWLG9CQUFhMVgsS0FBTW1OLE9BQU4sTUFBcUJuTixLQUFNbU4sT0FBTixJQUFrQixFQUF2QyxDQUFiOztBQUVBO0FBQ0E7QUFDQXNLLHFCQUFjQyxXQUFZMVgsS0FBSytYLFFBQWpCLE1BQ1hMLFdBQVkxWCxLQUFLK1gsUUFBakIsSUFBOEIsRUFEbkIsQ0FBZDs7QUFHQTFGLGVBQVFvRixZQUFheFcsSUFBYixLQUF1QixFQUEvQjtBQUNBMFcsbUJBQVl0RixNQUFPLENBQVAsTUFBZS9FLE9BQWYsSUFBMEIrRSxNQUFPLENBQVAsQ0FBdEM7QUFDQWMsY0FBT3dFLGFBQWF0RixNQUFPLENBQVAsQ0FBcEI7QUFDQXJTLGNBQU8yWCxhQUFhNVYsT0FBTzRPLFVBQVAsQ0FBbUJnSCxTQUFuQixDQUFwQjs7QUFFQSxjQUFVM1gsT0FBTyxFQUFFMlgsU0FBRixJQUFlM1gsSUFBZixJQUF1QkEsS0FBTXdRLEdBQU4sQ0FBdkI7O0FBRWhCO0FBQ0UyQyxjQUFPd0UsWUFBWSxDQUhMLEtBR1lDLE1BQU1oTyxHQUFOLEVBSDdCLEVBRzZDOztBQUU1QztBQUNBLFlBQUs1SixLQUFLb0IsUUFBTCxLQUFrQixDQUFsQixJQUF1QixFQUFFK1IsSUFBekIsSUFBaUNuVCxTQUFTbU8sSUFBL0MsRUFBc0Q7QUFDckRzSixxQkFBYXhXLElBQWIsSUFBc0IsQ0FBRXFNLE9BQUYsRUFBV3FLLFNBQVgsRUFBc0J4RSxJQUF0QixDQUF0QjtBQUNBO0FBQ0E7QUFDRDtBQUVELE9BOUJELE1BOEJPOztBQUVOO0FBQ0EsV0FBSzBFLFFBQUwsRUFBZ0I7O0FBRWY7QUFDQTdYLGVBQU9tTyxJQUFQO0FBQ0F1SixxQkFBYTFYLEtBQU1tTixPQUFOLE1BQXFCbk4sS0FBTW1OLE9BQU4sSUFBa0IsRUFBdkMsQ0FBYjs7QUFFQTtBQUNBO0FBQ0FzSyxzQkFBY0MsV0FBWTFYLEtBQUsrWCxRQUFqQixNQUNYTCxXQUFZMVgsS0FBSytYLFFBQWpCLElBQThCLEVBRG5CLENBQWQ7O0FBR0ExRixnQkFBUW9GLFlBQWF4VyxJQUFiLEtBQXVCLEVBQS9CO0FBQ0EwVyxvQkFBWXRGLE1BQU8sQ0FBUCxNQUFlL0UsT0FBZixJQUEwQitFLE1BQU8sQ0FBUCxDQUF0QztBQUNBYyxlQUFPd0UsU0FBUDtBQUNBOztBQUVEO0FBQ0E7QUFDQSxXQUFLeEUsU0FBUyxLQUFkLEVBQXNCOztBQUVyQjtBQUNBLGVBQVVuVCxPQUFPLEVBQUUyWCxTQUFGLElBQWUzWCxJQUFmLElBQXVCQSxLQUFNd1EsR0FBTixDQUF2QixLQUNkMkMsT0FBT3dFLFlBQVksQ0FETCxLQUNZQyxNQUFNaE8sR0FBTixFQUQ3QixFQUM2Qzs7QUFFNUMsYUFBSyxDQUFFME4sU0FDTnRYLEtBQUt1USxRQUFMLENBQWM5TSxXQUFkLE9BQWdDdEMsSUFEMUIsR0FFTm5CLEtBQUtvQixRQUFMLEtBQWtCLENBRmQsS0FHSixFQUFFK1IsSUFISCxFQUdVOztBQUVUO0FBQ0EsY0FBSzBFLFFBQUwsRUFBZ0I7QUFDZkgsd0JBQWExWCxLQUFNbU4sT0FBTixNQUNWbk4sS0FBTW1OLE9BQU4sSUFBa0IsRUFEUixDQUFiOztBQUdBO0FBQ0E7QUFDQXNLLHlCQUFjQyxXQUFZMVgsS0FBSytYLFFBQWpCLE1BQ1hMLFdBQVkxWCxLQUFLK1gsUUFBakIsSUFBOEIsRUFEbkIsQ0FBZDs7QUFHQU4sdUJBQWF4VyxJQUFiLElBQXNCLENBQUVxTSxPQUFGLEVBQVc2RixJQUFYLENBQXRCO0FBQ0E7O0FBRUQsY0FBS25ULFNBQVNtTyxJQUFkLEVBQXFCO0FBQ3BCO0FBQ0E7QUFDRDtBQUNEO0FBQ0Q7QUFDRDs7QUFFRDtBQUNBZ0YsY0FBUWdFLElBQVI7QUFDQSxhQUFPaEUsU0FBU3dELEtBQVQsSUFBb0J4RCxPQUFPd0QsS0FBUCxLQUFpQixDQUFqQixJQUFzQnhELE9BQU93RCxLQUFQLElBQWdCLENBQWpFO0FBQ0E7QUFDRCxLQTlIRjtBQStIQSxJQTdMTTs7QUErTFAsYUFBVSxnQkFBVTVSLE1BQVYsRUFBa0I0TyxRQUFsQixFQUE2Qjs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFJcUUsSUFBSjtBQUFBLFFBQ0N4RixLQUFLbEcsS0FBS2tDLE9BQUwsQ0FBY3pKLE1BQWQsS0FBMEJ1SCxLQUFLMkwsVUFBTCxDQUFpQmxULE9BQU90QixXQUFQLEVBQWpCLENBQTFCLElBQ0p3RCxPQUFPZ1AsS0FBUCxDQUFjLHlCQUF5QmxSLE1BQXZDLENBRkY7O0FBSUE7QUFDQTtBQUNBO0FBQ0EsUUFBS3lOLEdBQUlyRixPQUFKLENBQUwsRUFBcUI7QUFDcEIsWUFBT3FGLEdBQUltQixRQUFKLENBQVA7QUFDQTs7QUFFRDtBQUNBLFFBQUtuQixHQUFHdFUsTUFBSCxHQUFZLENBQWpCLEVBQXFCO0FBQ3BCOFosWUFBTyxDQUFFalQsTUFBRixFQUFVQSxNQUFWLEVBQWtCLEVBQWxCLEVBQXNCNE8sUUFBdEIsQ0FBUDtBQUNBLFlBQU9ySCxLQUFLMkwsVUFBTCxDQUFnQmpLLGNBQWhCLENBQWdDakosT0FBT3RCLFdBQVAsRUFBaEMsSUFDTjhPLGFBQWMsVUFBVXJCLElBQVYsRUFBZ0JqTyxPQUFoQixFQUEwQjtBQUN2QyxVQUFJaVYsR0FBSjtBQUFBLFVBQ0NDLFVBQVUzRixHQUFJdEIsSUFBSixFQUFVeUMsUUFBVixDQURYO0FBQUEsVUFFQ3RWLElBQUk4WixRQUFRamEsTUFGYjtBQUdBLGFBQVFHLEdBQVIsRUFBYztBQUNiNlosYUFBTTNZLFFBQVMyUixJQUFULEVBQWVpSCxRQUFTOVosQ0FBVCxDQUFmLENBQU47QUFDQTZTLFlBQU1nSCxHQUFOLElBQWMsRUFBR2pWLFFBQVNpVixHQUFULElBQWlCQyxRQUFTOVosQ0FBVCxDQUFwQixDQUFkO0FBQ0E7QUFDRCxNQVJELENBRE0sR0FVTixVQUFVOFAsSUFBVixFQUFpQjtBQUNoQixhQUFPcUUsR0FBSXJFLElBQUosRUFBVSxDQUFWLEVBQWE2SixJQUFiLENBQVA7QUFDQSxNQVpGO0FBYUE7O0FBRUQsV0FBT3hGLEVBQVA7QUFDQTtBQW5PTSxHQXRHaUI7O0FBNFV6QmhFLFdBQVM7O0FBRVI7QUFDQSxVQUFPK0QsYUFBYyxVQUFVcEwsUUFBVixFQUFxQjs7QUFFekM7QUFDQTtBQUNBO0FBQ0EsUUFBSStFLFFBQVEsRUFBWjtBQUFBLFFBQ0MrRSxVQUFVLEVBRFg7QUFBQSxRQUVDbUgsVUFBVTFMLFFBQVN2RixTQUFTM0ksT0FBVCxDQUFrQmtRLEtBQWxCLEVBQXlCLElBQXpCLENBQVQsQ0FGWDs7QUFJQSxXQUFPMEosUUFBU2pMLE9BQVQsSUFDTm9GLGFBQWMsVUFBVXJCLElBQVYsRUFBZ0JqTyxPQUFoQixFQUF5QnNVLFFBQXpCLEVBQW1DQyxHQUFuQyxFQUF5QztBQUN0RCxTQUFJckosSUFBSjtBQUFBLFNBQ0NrSyxZQUFZRCxRQUFTbEgsSUFBVCxFQUFlLElBQWYsRUFBcUJzRyxHQUFyQixFQUEwQixFQUExQixDQURiO0FBQUEsU0FFQ25aLElBQUk2UyxLQUFLaFQsTUFGVjs7QUFJQTtBQUNBLFlBQVFHLEdBQVIsRUFBYztBQUNiLFVBQU84UCxPQUFPa0ssVUFBV2hhLENBQVgsQ0FBZCxFQUFpQztBQUNoQzZTLFlBQU03UyxDQUFOLElBQVksRUFBRzRFLFFBQVM1RSxDQUFULElBQWU4UCxJQUFsQixDQUFaO0FBQ0E7QUFDRDtBQUNELEtBWEQsQ0FETSxHQWFOLFVBQVVBLElBQVYsRUFBZ0JvSixRQUFoQixFQUEwQkMsR0FBMUIsRUFBZ0M7QUFDL0J0TCxXQUFPLENBQVAsSUFBYWlDLElBQWI7QUFDQWlLLGFBQVNsTSxLQUFULEVBQWdCLElBQWhCLEVBQXNCc0wsR0FBdEIsRUFBMkJ2RyxPQUEzQjs7QUFFQTtBQUNBL0UsV0FBTyxDQUFQLElBQWEsSUFBYjtBQUNBLFlBQU8sQ0FBQytFLFFBQVFySCxHQUFSLEVBQVI7QUFDQSxLQXBCRjtBQXFCQSxJQTlCTSxDQUhDOztBQW1DUixVQUFPMkksYUFBYyxVQUFVcEwsUUFBVixFQUFxQjtBQUN6QyxXQUFPLFVBQVVnSCxJQUFWLEVBQWlCO0FBQ3ZCLFlBQU9sSCxPQUFRRSxRQUFSLEVBQWtCZ0gsSUFBbEIsRUFBeUJqUSxNQUF6QixHQUFrQyxDQUF6QztBQUNBLEtBRkQ7QUFHQSxJQUpNLENBbkNDOztBQXlDUixlQUFZcVUsYUFBYyxVQUFVbk4sSUFBVixFQUFpQjtBQUMxQ0EsV0FBT0EsS0FBSzVHLE9BQUwsQ0FBYytRLFNBQWQsRUFBeUJDLFNBQXpCLENBQVA7QUFDQSxXQUFPLFVBQVVyQixJQUFWLEVBQWlCO0FBQ3ZCLFlBQU8sQ0FBRUEsS0FBS25KLFdBQUwsSUFBb0J1SCxRQUFTNEIsSUFBVCxDQUF0QixFQUF3QzVPLE9BQXhDLENBQWlENkYsSUFBakQsSUFBMEQsQ0FBQyxDQUFsRTtBQUNBLEtBRkQ7QUFHQSxJQUxXLENBekNKOztBQWdEUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVFtTixhQUFjLFVBQVUrRixJQUFWLEVBQWlCOztBQUV0QztBQUNBLFFBQUssQ0FBQ3ZKLFlBQVk3UCxJQUFaLENBQWtCb1osUUFBUSxFQUExQixDQUFOLEVBQXVDO0FBQ3RDclIsWUFBT2dQLEtBQVAsQ0FBYyx1QkFBdUJxQyxJQUFyQztBQUNBO0FBQ0RBLFdBQU9BLEtBQUs5WixPQUFMLENBQWMrUSxTQUFkLEVBQXlCQyxTQUF6QixFQUFxQy9MLFdBQXJDLEVBQVA7QUFDQSxXQUFPLFVBQVUwSyxJQUFWLEVBQWlCO0FBQ3ZCLFNBQUlvSyxRQUFKO0FBQ0EsUUFBRztBQUNGLFVBQU9BLFdBQVd2TCxpQkFDakJtQixLQUFLbUssSUFEWSxHQUVqQm5LLEtBQUtuRixZQUFMLENBQW1CLFVBQW5CLEtBQW1DbUYsS0FBS25GLFlBQUwsQ0FBbUIsTUFBbkIsQ0FGcEMsRUFFb0U7O0FBRW5FdVAsa0JBQVdBLFNBQVM5VSxXQUFULEVBQVg7QUFDQSxjQUFPOFUsYUFBYUQsSUFBYixJQUFxQkMsU0FBU2haLE9BQVQsQ0FBa0IrWSxPQUFPLEdBQXpCLE1BQW1DLENBQS9EO0FBQ0E7QUFDRCxNQVJELFFBUVUsQ0FBRW5LLE9BQU9BLEtBQUt4TSxVQUFkLEtBQThCd00sS0FBSy9NLFFBQUwsS0FBa0IsQ0FSMUQ7QUFTQSxZQUFPLEtBQVA7QUFDQSxLQVpEO0FBYUEsSUFwQk8sQ0F2REE7O0FBNkVSO0FBQ0EsYUFBVSxnQkFBVStNLElBQVYsRUFBaUI7QUFDMUIsUUFBSXFLLE9BQU9wTSxPQUFPcU0sUUFBUCxJQUFtQnJNLE9BQU9xTSxRQUFQLENBQWdCRCxJQUE5QztBQUNBLFdBQU9BLFFBQVFBLEtBQUs5TyxLQUFMLENBQVksQ0FBWixNQUFvQnlFLEtBQUt3RCxFQUF4QztBQUNBLElBakZPOztBQW1GUixXQUFRLGNBQVV4RCxJQUFWLEVBQWlCO0FBQ3hCLFdBQU9BLFNBQVNwQixPQUFoQjtBQUNBLElBckZPOztBQXVGUixZQUFTLGVBQVVvQixJQUFWLEVBQWlCO0FBQ3pCLFdBQU9BLFNBQVN2TyxTQUFTOFksYUFBbEIsS0FDSixDQUFDOVksU0FBUytZLFFBQVYsSUFBc0IvWSxTQUFTK1ksUUFBVCxFQURsQixLQUVOLENBQUMsRUFBR3hLLEtBQUtsTixJQUFMLElBQWFrTixLQUFLeUssSUFBbEIsSUFBMEIsQ0FBQ3pLLEtBQUswSyxRQUFuQyxDQUZGO0FBR0EsSUEzRk87O0FBNkZSO0FBQ0EsY0FBV3JGLHFCQUFzQixLQUF0QixDQTlGSDtBQStGUixlQUFZQSxxQkFBc0IsSUFBdEIsQ0EvRko7O0FBaUdSLGNBQVcsaUJBQVVyRixJQUFWLEVBQWlCOztBQUUzQjtBQUNBO0FBQ0EsUUFBSW9DLFdBQVdwQyxLQUFLb0MsUUFBTCxDQUFjOU0sV0FBZCxFQUFmO0FBQ0EsV0FBUzhNLGFBQWEsT0FBYixJQUF3QixDQUFDLENBQUNwQyxLQUFLMkssT0FBakMsSUFDSnZJLGFBQWEsUUFBYixJQUF5QixDQUFDLENBQUNwQyxLQUFLNEssUUFEbkM7QUFFQSxJQXhHTzs7QUEwR1IsZUFBWSxrQkFBVTVLLElBQVYsRUFBaUI7O0FBRTVCO0FBQ0E7QUFDQSxRQUFLQSxLQUFLeE0sVUFBVixFQUF1QjtBQUN0QjtBQUNBd00sVUFBS3hNLFVBQUwsQ0FBZ0JxWCxhQUFoQjtBQUNBOztBQUVELFdBQU83SyxLQUFLNEssUUFBTCxLQUFrQixJQUF6QjtBQUNBLElBcEhPOztBQXNIUjtBQUNBLFlBQVMsZUFBVTVLLElBQVYsRUFBaUI7O0FBRXpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBTUEsT0FBT0EsS0FBS2xKLFVBQWxCLEVBQThCa0osSUFBOUIsRUFBb0NBLE9BQU9BLEtBQUtrRixXQUFoRCxFQUE4RDtBQUM3RCxTQUFLbEYsS0FBSy9NLFFBQUwsR0FBZ0IsQ0FBckIsRUFBeUI7QUFDeEIsYUFBTyxLQUFQO0FBQ0E7QUFDRDtBQUNELFdBQU8sSUFBUDtBQUNBLElBbklPOztBQXFJUixhQUFVLGdCQUFVK00sSUFBVixFQUFpQjtBQUMxQixXQUFPLENBQUM3QixLQUFLa0MsT0FBTCxDQUFjLE9BQWQsRUFBeUJMLElBQXpCLENBQVI7QUFDQSxJQXZJTzs7QUF5SVI7QUFDQSxhQUFVLGdCQUFVQSxJQUFWLEVBQWlCO0FBQzFCLFdBQU9nQixRQUFRalEsSUFBUixDQUFjaVAsS0FBS29DLFFBQW5CLENBQVA7QUFDQSxJQTVJTzs7QUE4SVIsWUFBUyxlQUFVcEMsSUFBVixFQUFpQjtBQUN6QixXQUFPZSxRQUFRaFEsSUFBUixDQUFjaVAsS0FBS29DLFFBQW5CLENBQVA7QUFDQSxJQWhKTzs7QUFrSlIsYUFBVSxnQkFBVXBDLElBQVYsRUFBaUI7QUFDMUIsUUFBSWhOLE9BQU9nTixLQUFLb0MsUUFBTCxDQUFjOU0sV0FBZCxFQUFYO0FBQ0EsV0FBT3RDLFNBQVMsT0FBVCxJQUFvQmdOLEtBQUtsTixJQUFMLEtBQWMsUUFBbEMsSUFBOENFLFNBQVMsUUFBOUQ7QUFDQSxJQXJKTzs7QUF1SlIsV0FBUSxjQUFVZ04sSUFBVixFQUFpQjtBQUN4QixRQUFJMkgsSUFBSjtBQUNBLFdBQU8zSCxLQUFLb0MsUUFBTCxDQUFjOU0sV0FBZCxPQUFnQyxPQUFoQyxJQUNOMEssS0FBS2xOLElBQUwsS0FBYyxNQURSOztBQUdOO0FBQ0E7QUFDRSxLQUFFNlUsT0FBTzNILEtBQUtuRixZQUFMLENBQW1CLE1BQW5CLENBQVQsS0FBMEMsSUFBMUMsSUFDRDhNLEtBQUtyUyxXQUFMLE9BQXVCLE1BTmxCLENBQVA7QUFPQSxJQWhLTzs7QUFrS1I7QUFDQSxZQUFTaVEsdUJBQXdCLFlBQVc7QUFDM0MsV0FBTyxDQUFFLENBQUYsQ0FBUDtBQUNBLElBRlEsQ0FuS0Q7O0FBdUtSLFdBQVFBLHVCQUF3QixVQUFVdUYsYUFBVixFQUF5Qi9hLE1BQXpCLEVBQWtDO0FBQ2pFLFdBQU8sQ0FBRUEsU0FBUyxDQUFYLENBQVA7QUFDQSxJQUZPLENBdktBOztBQTJLUixTQUFNd1YsdUJBQXdCLFVBQVV1RixhQUFWLEVBQXlCL2EsTUFBekIsRUFBaUN5VixRQUFqQyxFQUE0QztBQUN6RSxXQUFPLENBQUVBLFdBQVcsQ0FBWCxHQUFlQSxXQUFXelYsTUFBMUIsR0FBbUN5VixRQUFyQyxDQUFQO0FBQ0EsSUFGSyxDQTNLRTs7QUErS1IsV0FBUUQsdUJBQXdCLFVBQVVFLFlBQVYsRUFBd0IxVixNQUF4QixFQUFpQztBQUNoRSxRQUFJRyxJQUFJLENBQVI7QUFDQSxXQUFRQSxJQUFJSCxNQUFaLEVBQW9CRyxLQUFLLENBQXpCLEVBQTZCO0FBQzVCdVYsa0JBQWFyUixJQUFiLENBQW1CbEUsQ0FBbkI7QUFDQTtBQUNELFdBQU91VixZQUFQO0FBQ0EsSUFOTyxDQS9LQTs7QUF1TFIsVUFBT0YsdUJBQXdCLFVBQVVFLFlBQVYsRUFBd0IxVixNQUF4QixFQUFpQztBQUMvRCxRQUFJRyxJQUFJLENBQVI7QUFDQSxXQUFRQSxJQUFJSCxNQUFaLEVBQW9CRyxLQUFLLENBQXpCLEVBQTZCO0FBQzVCdVYsa0JBQWFyUixJQUFiLENBQW1CbEUsQ0FBbkI7QUFDQTtBQUNELFdBQU91VixZQUFQO0FBQ0EsSUFOTSxDQXZMQzs7QUErTFIsU0FBTUYsdUJBQXdCLFVBQVVFLFlBQVYsRUFBd0IxVixNQUF4QixFQUFnQ3lWLFFBQWhDLEVBQTJDO0FBQ3hFLFFBQUl0VixJQUFJc1YsV0FBVyxDQUFYLEdBQ1BBLFdBQVd6VixNQURKLEdBRVB5VixXQUFXelYsTUFBWCxHQUNDQSxNQURELEdBRUN5VixRQUpGO0FBS0EsV0FBUSxFQUFFdFYsQ0FBRixJQUFPLENBQWYsR0FBb0I7QUFDbkJ1VixrQkFBYXJSLElBQWIsQ0FBbUJsRSxDQUFuQjtBQUNBO0FBQ0QsV0FBT3VWLFlBQVA7QUFDQSxJQVZLLENBL0xFOztBQTJNUixTQUFNRix1QkFBd0IsVUFBVUUsWUFBVixFQUF3QjFWLE1BQXhCLEVBQWdDeVYsUUFBaEMsRUFBMkM7QUFDeEUsUUFBSXRWLElBQUlzVixXQUFXLENBQVgsR0FBZUEsV0FBV3pWLE1BQTFCLEdBQW1DeVYsUUFBM0M7QUFDQSxXQUFRLEVBQUV0VixDQUFGLEdBQU1ILE1BQWQsR0FBd0I7QUFDdkIwVixrQkFBYXJSLElBQWIsQ0FBbUJsRSxDQUFuQjtBQUNBO0FBQ0QsV0FBT3VWLFlBQVA7QUFDQSxJQU5LO0FBM01FO0FBNVVnQixFQUExQjs7QUFpaUJBdEgsTUFBS2tDLE9BQUwsQ0FBYyxLQUFkLElBQXdCbEMsS0FBS2tDLE9BQUwsQ0FBYyxJQUFkLENBQXhCOztBQUVBO0FBQ0EsTUFBTW5RLENBQU4sSUFBVyxFQUFFNmEsT0FBTyxJQUFULEVBQWVDLFVBQVUsSUFBekIsRUFBK0JDLE1BQU0sSUFBckMsRUFBMkNDLFVBQVUsSUFBckQsRUFBMkRDLE9BQU8sSUFBbEUsRUFBWCxFQUFzRjtBQUNyRmhOLE9BQUtrQyxPQUFMLENBQWNuUSxDQUFkLElBQW9CaVYsa0JBQW1CalYsQ0FBbkIsQ0FBcEI7QUFDQTtBQUNELE1BQU1BLENBQU4sSUFBVyxFQUFFa2IsUUFBUSxJQUFWLEVBQWdCQyxPQUFPLElBQXZCLEVBQVgsRUFBMkM7QUFDMUNsTixPQUFLa0MsT0FBTCxDQUFjblEsQ0FBZCxJQUFvQmtWLG1CQUFvQmxWLENBQXBCLENBQXBCO0FBQ0E7O0FBRUQ7QUFDQSxVQUFTNFosVUFBVCxHQUFzQixDQUFFO0FBQ3hCQSxZQUFXd0IsU0FBWCxHQUF1Qm5OLEtBQUtvTixPQUFMLEdBQWVwTixLQUFLa0MsT0FBM0M7QUFDQWxDLE1BQUsyTCxVQUFMLEdBQWtCLElBQUlBLFVBQUosRUFBbEI7O0FBRUF4TCxZQUFXeEYsT0FBT3dGLFFBQVAsR0FBa0IsVUFBVXRGLFFBQVYsRUFBb0J3UyxTQUFwQixFQUFnQztBQUM1RCxNQUFJeEIsT0FBSjtBQUFBLE1BQWFoWixLQUFiO0FBQUEsTUFBb0J5YSxNQUFwQjtBQUFBLE1BQTRCM1ksSUFBNUI7QUFBQSxNQUNDNFksS0FERDtBQUFBLE1BQ1F4SSxNQURSO0FBQUEsTUFDZ0J5SSxVQURoQjtBQUFBLE1BRUNDLFNBQVNyTSxXQUFZdkcsV0FBVyxHQUF2QixDQUZWOztBQUlBLE1BQUs0UyxNQUFMLEVBQWM7QUFDYixVQUFPSixZQUFZLENBQVosR0FBZ0JJLE9BQU9yUSxLQUFQLENBQWMsQ0FBZCxDQUF2QjtBQUNBOztBQUVEbVEsVUFBUTFTLFFBQVI7QUFDQWtLLFdBQVMsRUFBVDtBQUNBeUksZUFBYXhOLEtBQUtzSyxTQUFsQjs7QUFFQSxTQUFRaUQsS0FBUixFQUFnQjs7QUFFZjtBQUNBLE9BQUssQ0FBQzFCLE9BQUQsS0FBY2haLFFBQVF3UCxPQUFPOEMsSUFBUCxDQUFhb0ksS0FBYixDQUF0QixDQUFMLEVBQW9EO0FBQ25ELFFBQUsxYSxLQUFMLEVBQWE7O0FBRVo7QUFDQTBhLGFBQVFBLE1BQU1uUSxLQUFOLENBQWF2SyxNQUFPLENBQVAsRUFBV2pCLE1BQXhCLEtBQW9DMmIsS0FBNUM7QUFDQTtBQUNEeEksV0FBTzlPLElBQVAsQ0FBZXFYLFNBQVMsRUFBeEI7QUFDQTs7QUFFRHpCLGFBQVUsS0FBVjs7QUFFQTtBQUNBLE9BQU9oWixRQUFReVAsYUFBYTZDLElBQWIsQ0FBbUJvSSxLQUFuQixDQUFmLEVBQThDO0FBQzdDMUIsY0FBVWhaLE1BQU1zRCxLQUFOLEVBQVY7QUFDQW1YLFdBQU9yWCxJQUFQLENBQWE7QUFDWmhFLFlBQU80WixPQURLOztBQUdaO0FBQ0FsWCxXQUFNOUIsTUFBTyxDQUFQLEVBQVdYLE9BQVgsQ0FBb0JrUSxLQUFwQixFQUEyQixHQUEzQjtBQUpNLEtBQWI7QUFNQW1MLFlBQVFBLE1BQU1uUSxLQUFOLENBQWF5TyxRQUFRamEsTUFBckIsQ0FBUjtBQUNBOztBQUVEO0FBQ0EsUUFBTStDLElBQU4sSUFBY3FMLEtBQUs1SixNQUFuQixFQUE0QjtBQUMzQixRQUFLLENBQUV2RCxRQUFRNlAsVUFBVy9OLElBQVgsRUFBa0J3USxJQUFsQixDQUF3Qm9JLEtBQXhCLENBQVYsTUFBaUQsQ0FBQ0MsV0FBWTdZLElBQVosQ0FBRCxLQUNuRDlCLFFBQVEyYSxXQUFZN1ksSUFBWixFQUFvQjlCLEtBQXBCLENBRDJDLENBQWpELENBQUwsRUFDNkM7QUFDNUNnWixlQUFVaFosTUFBTXNELEtBQU4sRUFBVjtBQUNBbVgsWUFBT3JYLElBQVAsQ0FBYTtBQUNaaEUsYUFBTzRaLE9BREs7QUFFWmxYLFlBQU1BLElBRk07QUFHWmdDLGVBQVM5RDtBQUhHLE1BQWI7QUFLQTBhLGFBQVFBLE1BQU1uUSxLQUFOLENBQWF5TyxRQUFRamEsTUFBckIsQ0FBUjtBQUNBO0FBQ0Q7O0FBRUQsT0FBSyxDQUFDaWEsT0FBTixFQUFnQjtBQUNmO0FBQ0E7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxTQUFPd0IsWUFDTkUsTUFBTTNiLE1BREEsR0FFTjJiLFFBQ0M1UyxPQUFPZ1AsS0FBUCxDQUFjOU8sUUFBZCxDQUREOztBQUdDO0FBQ0F1RyxhQUFZdkcsUUFBWixFQUFzQmtLLE1BQXRCLEVBQStCM0gsS0FBL0IsQ0FBc0MsQ0FBdEMsQ0FORjtBQU9BLEVBcEVEOztBQXNFQSxVQUFTd0ksVUFBVCxDQUFxQjBILE1BQXJCLEVBQThCO0FBQzdCLE1BQUl2YixJQUFJLENBQVI7QUFBQSxNQUNDK1AsTUFBTXdMLE9BQU8xYixNQURkO0FBQUEsTUFFQ2lKLFdBQVcsRUFGWjtBQUdBLFNBQVE5SSxJQUFJK1AsR0FBWixFQUFpQi9QLEdBQWpCLEVBQXVCO0FBQ3RCOEksZUFBWXlTLE9BQVF2YixDQUFSLEVBQVlFLEtBQXhCO0FBQ0E7QUFDRCxTQUFPNEksUUFBUDtBQUNBOztBQUVELFVBQVNrSixhQUFULENBQXdCK0gsT0FBeEIsRUFBaUM0QixVQUFqQyxFQUE2Q2pYLElBQTdDLEVBQW9EO0FBQ25ELE1BQUl5TixNQUFNd0osV0FBV3hKLEdBQXJCO0FBQUEsTUFDQzNRLE9BQU9tYSxXQUFXNVIsSUFEbkI7QUFBQSxNQUVDeEUsTUFBTS9ELFFBQVEyUSxHQUZmO0FBQUEsTUFHQ3lKLG1CQUFtQmxYLFFBQVFhLFFBQVEsWUFIcEM7QUFBQSxNQUlDc1csV0FBVzNNLE1BSlo7O0FBTUEsU0FBT3lNLFdBQVdyRCxLQUFYOztBQUVOO0FBQ0EsWUFBVXhJLElBQVYsRUFBZ0I2QyxPQUFoQixFQUF5QndHLEdBQXpCLEVBQStCO0FBQzlCLFVBQVVySixPQUFPQSxLQUFNcUMsR0FBTixDQUFqQixFQUFpQztBQUNoQyxRQUFLckMsS0FBSy9NLFFBQUwsS0FBa0IsQ0FBbEIsSUFBdUI2WSxnQkFBNUIsRUFBK0M7QUFDOUMsWUFBTzdCLFFBQVNqSyxJQUFULEVBQWU2QyxPQUFmLEVBQXdCd0csR0FBeEIsQ0FBUDtBQUNBO0FBQ0Q7QUFDRCxVQUFPLEtBQVA7QUFDQSxHQVZLOztBQVlOO0FBQ0EsWUFBVXJKLElBQVYsRUFBZ0I2QyxPQUFoQixFQUF5QndHLEdBQXpCLEVBQStCO0FBQzlCLE9BQUkyQyxRQUFKO0FBQUEsT0FBYzFDLFdBQWQ7QUFBQSxPQUEyQkMsVUFBM0I7QUFBQSxPQUNDMEMsV0FBVyxDQUFFOU0sT0FBRixFQUFXNE0sUUFBWCxDQURaOztBQUdBO0FBQ0EsT0FBSzFDLEdBQUwsRUFBVztBQUNWLFdBQVVySixPQUFPQSxLQUFNcUMsR0FBTixDQUFqQixFQUFpQztBQUNoQyxTQUFLckMsS0FBSy9NLFFBQUwsS0FBa0IsQ0FBbEIsSUFBdUI2WSxnQkFBNUIsRUFBK0M7QUFDOUMsVUFBSzdCLFFBQVNqSyxJQUFULEVBQWU2QyxPQUFmLEVBQXdCd0csR0FBeEIsQ0FBTCxFQUFxQztBQUNwQyxjQUFPLElBQVA7QUFDQTtBQUNEO0FBQ0Q7QUFDRCxJQVJELE1BUU87QUFDTixXQUFVckosT0FBT0EsS0FBTXFDLEdBQU4sQ0FBakIsRUFBaUM7QUFDaEMsU0FBS3JDLEtBQUsvTSxRQUFMLEtBQWtCLENBQWxCLElBQXVCNlksZ0JBQTVCLEVBQStDO0FBQzlDdkMsbUJBQWF2SixLQUFNaEIsT0FBTixNQUFxQmdCLEtBQU1oQixPQUFOLElBQWtCLEVBQXZDLENBQWI7O0FBRUE7QUFDQTtBQUNBc0ssb0JBQWNDLFdBQVl2SixLQUFLNEosUUFBakIsTUFDWEwsV0FBWXZKLEtBQUs0SixRQUFqQixJQUE4QixFQURuQixDQUFkOztBQUdBLFVBQUtsWSxRQUFRQSxTQUFTc08sS0FBS29DLFFBQUwsQ0FBYzlNLFdBQWQsRUFBdEIsRUFBb0Q7QUFDbkQwSyxjQUFPQSxLQUFNcUMsR0FBTixLQUFlckMsSUFBdEI7QUFDQSxPQUZELE1BRU8sSUFBSyxDQUFFZ00sV0FBVzFDLFlBQWE3VCxHQUFiLENBQWIsS0FDWHVXLFNBQVUsQ0FBVixNQUFrQjdNLE9BRFAsSUFDa0I2TSxTQUFVLENBQVYsTUFBa0JELFFBRHpDLEVBQ29EOztBQUUxRDtBQUNBLGNBQVNFLFNBQVUsQ0FBVixJQUFnQkQsU0FBVSxDQUFWLENBQXpCO0FBQ0EsT0FMTSxNQUtBOztBQUVOO0FBQ0ExQyxtQkFBYTdULEdBQWIsSUFBcUJ3VyxRQUFyQjs7QUFFQTtBQUNBLFdBQU9BLFNBQVUsQ0FBVixJQUFnQmhDLFFBQVNqSyxJQUFULEVBQWU2QyxPQUFmLEVBQXdCd0csR0FBeEIsQ0FBdkIsRUFBeUQ7QUFDeEQsZUFBTyxJQUFQO0FBQ0E7QUFDRDtBQUNEO0FBQ0Q7QUFDRDtBQUNELFVBQU8sS0FBUDtBQUNBLEdBekRGO0FBMERBOztBQUVELFVBQVM2QyxjQUFULENBQXlCQyxRQUF6QixFQUFvQztBQUNuQyxTQUFPQSxTQUFTcGMsTUFBVCxHQUFrQixDQUFsQixHQUNOLFVBQVVpUSxJQUFWLEVBQWdCNkMsT0FBaEIsRUFBeUJ3RyxHQUF6QixFQUErQjtBQUM5QixPQUFJblosSUFBSWljLFNBQVNwYyxNQUFqQjtBQUNBLFVBQVFHLEdBQVIsRUFBYztBQUNiLFFBQUssQ0FBQ2ljLFNBQVVqYyxDQUFWLEVBQWU4UCxJQUFmLEVBQXFCNkMsT0FBckIsRUFBOEJ3RyxHQUE5QixDQUFOLEVBQTRDO0FBQzNDLFlBQU8sS0FBUDtBQUNBO0FBQ0Q7QUFDRCxVQUFPLElBQVA7QUFDQSxHQVRLLEdBVU44QyxTQUFVLENBQVYsQ0FWRDtBQVdBOztBQUVELFVBQVNDLGdCQUFULENBQTJCcFQsUUFBM0IsRUFBcUNxVCxRQUFyQyxFQUErQ3ZKLE9BQS9DLEVBQXlEO0FBQ3hELE1BQUk1UyxJQUFJLENBQVI7QUFBQSxNQUNDK1AsTUFBTW9NLFNBQVN0YyxNQURoQjtBQUVBLFNBQVFHLElBQUkrUCxHQUFaLEVBQWlCL1AsR0FBakIsRUFBdUI7QUFDdEI0SSxVQUFRRSxRQUFSLEVBQWtCcVQsU0FBVW5jLENBQVYsQ0FBbEIsRUFBaUM0UyxPQUFqQztBQUNBO0FBQ0QsU0FBT0EsT0FBUDtBQUNBOztBQUVELFVBQVN3SixRQUFULENBQW1CcEMsU0FBbkIsRUFBOEI1WCxHQUE5QixFQUFtQ2lDLE1BQW5DLEVBQTJDc08sT0FBM0MsRUFBb0R3RyxHQUFwRCxFQUEwRDtBQUN6RCxNQUFJckosSUFBSjtBQUFBLE1BQ0N1TSxlQUFlLEVBRGhCO0FBQUEsTUFFQ3JjLElBQUksQ0FGTDtBQUFBLE1BR0MrUCxNQUFNaUssVUFBVW5hLE1BSGpCO0FBQUEsTUFJQ3ljLFNBQVNsYSxPQUFPLElBSmpCOztBQU1BLFNBQVFwQyxJQUFJK1AsR0FBWixFQUFpQi9QLEdBQWpCLEVBQXVCO0FBQ3RCLE9BQU84UCxPQUFPa0ssVUFBV2hhLENBQVgsQ0FBZCxFQUFpQztBQUNoQyxRQUFLLENBQUNxRSxNQUFELElBQVdBLE9BQVF5TCxJQUFSLEVBQWM2QyxPQUFkLEVBQXVCd0csR0FBdkIsQ0FBaEIsRUFBK0M7QUFDOUNrRCxrQkFBYW5ZLElBQWIsQ0FBbUI0TCxJQUFuQjtBQUNBLFNBQUt3TSxNQUFMLEVBQWM7QUFDYmxhLFVBQUk4QixJQUFKLENBQVVsRSxDQUFWO0FBQ0E7QUFDRDtBQUNEO0FBQ0Q7O0FBRUQsU0FBT3FjLFlBQVA7QUFDQTs7QUFFRCxVQUFTRSxVQUFULENBQXFCaEUsU0FBckIsRUFBZ0N6UCxRQUFoQyxFQUEwQ2lSLE9BQTFDLEVBQW1EeUMsVUFBbkQsRUFBK0RDLFVBQS9ELEVBQTJFQyxZQUEzRSxFQUEwRjtBQUN6RixNQUFLRixjQUFjLENBQUNBLFdBQVkxTixPQUFaLENBQXBCLEVBQTRDO0FBQzNDME4sZ0JBQWFELFdBQVlDLFVBQVosQ0FBYjtBQUNBO0FBQ0QsTUFBS0MsY0FBYyxDQUFDQSxXQUFZM04sT0FBWixDQUFwQixFQUE0QztBQUMzQzJOLGdCQUFhRixXQUFZRSxVQUFaLEVBQXdCQyxZQUF4QixDQUFiO0FBQ0E7QUFDRCxTQUFPeEksYUFBYyxVQUFVckIsSUFBVixFQUFnQkQsT0FBaEIsRUFBeUJELE9BQXpCLEVBQWtDd0csR0FBbEMsRUFBd0M7QUFDNUQsT0FBSXdELElBQUo7QUFBQSxPQUFVM2MsQ0FBVjtBQUFBLE9BQWE4UCxJQUFiO0FBQUEsT0FDQzhNLFNBQVMsRUFEVjtBQUFBLE9BRUNDLFVBQVUsRUFGWDtBQUFBLE9BR0NDLGNBQWNsSyxRQUFRL1MsTUFIdkI7OztBQUtDO0FBQ0EwVyxXQUFRMUQsUUFBUXFKLGlCQUNmcFQsWUFBWSxHQURHLEVBRWY2SixRQUFRNVAsUUFBUixHQUFtQixDQUFFNFAsT0FBRixDQUFuQixHQUFpQ0EsT0FGbEIsRUFHZixFQUhlLENBTmpCOzs7QUFZQztBQUNBb0ssZUFBWXhFLGNBQWUxRixRQUFRLENBQUMvSixRQUF4QixJQUNYc1QsU0FBVTdGLEtBQVYsRUFBaUJxRyxNQUFqQixFQUF5QnJFLFNBQXpCLEVBQW9DNUYsT0FBcEMsRUFBNkN3RyxHQUE3QyxDQURXLEdBRVg1QyxLQWZGO0FBQUEsT0FpQkN5RyxhQUFhakQ7O0FBRVo7QUFDQTBDLGtCQUFnQjVKLE9BQU8wRixTQUFQLEdBQW1CdUUsZUFBZU4sVUFBbEQ7O0FBRUM7QUFDQSxLQUhEOztBQUtDO0FBQ0E1SixVQVRXLEdBVVptSyxTQTNCRjs7QUE2QkE7QUFDQSxPQUFLaEQsT0FBTCxFQUFlO0FBQ2RBLFlBQVNnRCxTQUFULEVBQW9CQyxVQUFwQixFQUFnQ3JLLE9BQWhDLEVBQXlDd0csR0FBekM7QUFDQTs7QUFFRDtBQUNBLE9BQUtxRCxVQUFMLEVBQWtCO0FBQ2pCRyxXQUFPUCxTQUFVWSxVQUFWLEVBQXNCSCxPQUF0QixDQUFQO0FBQ0FMLGVBQVlHLElBQVosRUFBa0IsRUFBbEIsRUFBc0JoSyxPQUF0QixFQUErQndHLEdBQS9COztBQUVBO0FBQ0FuWixRQUFJMmMsS0FBSzljLE1BQVQ7QUFDQSxXQUFRRyxHQUFSLEVBQWM7QUFDYixTQUFPOFAsT0FBTzZNLEtBQU0zYyxDQUFOLENBQWQsRUFBNEI7QUFDM0JnZCxpQkFBWUgsUUFBUzdjLENBQVQsQ0FBWixJQUE2QixFQUFHK2MsVUFBV0YsUUFBUzdjLENBQVQsQ0FBWCxJQUE0QjhQLElBQS9CLENBQTdCO0FBQ0E7QUFDRDtBQUNEOztBQUVELE9BQUsrQyxJQUFMLEVBQVk7QUFDWCxRQUFLNEosY0FBY2xFLFNBQW5CLEVBQStCO0FBQzlCLFNBQUtrRSxVQUFMLEVBQWtCOztBQUVqQjtBQUNBRSxhQUFPLEVBQVA7QUFDQTNjLFVBQUlnZCxXQUFXbmQsTUFBZjtBQUNBLGFBQVFHLEdBQVIsRUFBYztBQUNiLFdBQU84UCxPQUFPa04sV0FBWWhkLENBQVosQ0FBZCxFQUFrQzs7QUFFakM7QUFDQTJjLGFBQUt6WSxJQUFMLENBQWE2WSxVQUFXL2MsQ0FBWCxJQUFpQjhQLElBQTlCO0FBQ0E7QUFDRDtBQUNEMk0saUJBQVksSUFBWixFQUFvQk8sYUFBYSxFQUFqQyxFQUF1Q0wsSUFBdkMsRUFBNkN4RCxHQUE3QztBQUNBOztBQUVEO0FBQ0FuWixTQUFJZ2QsV0FBV25kLE1BQWY7QUFDQSxZQUFRRyxHQUFSLEVBQWM7QUFDYixVQUFLLENBQUU4UCxPQUFPa04sV0FBWWhkLENBQVosQ0FBVCxLQUNKLENBQUUyYyxPQUFPRixhQUFhdmIsUUFBUzJSLElBQVQsRUFBZS9DLElBQWYsQ0FBYixHQUFxQzhNLE9BQVE1YyxDQUFSLENBQTlDLElBQThELENBQUMsQ0FEaEUsRUFDb0U7O0FBRW5FNlMsWUFBTThKLElBQU4sSUFBZSxFQUFHL0osUUFBUytKLElBQVQsSUFBa0I3TSxJQUFyQixDQUFmO0FBQ0E7QUFDRDtBQUNEOztBQUVGO0FBQ0MsSUE3QkQsTUE2Qk87QUFDTmtOLGlCQUFhWixTQUNaWSxlQUFlcEssT0FBZixHQUNDb0ssV0FBVzlFLE1BQVgsQ0FBbUI0RSxXQUFuQixFQUFnQ0UsV0FBV25kLE1BQTNDLENBREQsR0FFQ21kLFVBSFcsQ0FBYjtBQUtBLFFBQUtQLFVBQUwsRUFBa0I7QUFDakJBLGdCQUFZLElBQVosRUFBa0I3SixPQUFsQixFQUEyQm9LLFVBQTNCLEVBQXVDN0QsR0FBdkM7QUFDQSxLQUZELE1BRU87QUFDTmpWLFVBQUtrTyxLQUFMLENBQVlRLE9BQVosRUFBcUJvSyxVQUFyQjtBQUNBO0FBQ0Q7QUFDRCxHQTFGTSxDQUFQO0FBMkZBOztBQUVELFVBQVNDLGlCQUFULENBQTRCMUIsTUFBNUIsRUFBcUM7QUFDcEMsTUFBSTJCLFlBQUo7QUFBQSxNQUFrQm5ELE9BQWxCO0FBQUEsTUFBMkJySCxDQUEzQjtBQUFBLE1BQ0MzQyxNQUFNd0wsT0FBTzFiLE1BRGQ7QUFBQSxNQUVDc2Qsa0JBQWtCbFAsS0FBS29LLFFBQUwsQ0FBZWtELE9BQVEsQ0FBUixFQUFZM1ksSUFBM0IsQ0FGbkI7QUFBQSxNQUdDd2EsbUJBQW1CRCxtQkFBbUJsUCxLQUFLb0ssUUFBTCxDQUFlLEdBQWYsQ0FIdkM7QUFBQSxNQUlDclksSUFBSW1kLGtCQUFrQixDQUFsQixHQUFzQixDQUozQjs7O0FBTUM7QUFDQUUsaUJBQWVyTCxjQUFlLFVBQVVsQyxJQUFWLEVBQWlCO0FBQzlDLFVBQU9BLFNBQVNvTixZQUFoQjtBQUNBLEdBRmMsRUFFWkUsZ0JBRlksRUFFTSxJQUZOLENBUGhCO0FBQUEsTUFVQ0Usa0JBQWtCdEwsY0FBZSxVQUFVbEMsSUFBVixFQUFpQjtBQUNqRCxVQUFPNU8sUUFBU2djLFlBQVQsRUFBdUJwTixJQUF2QixJQUFnQyxDQUFDLENBQXhDO0FBQ0EsR0FGaUIsRUFFZnNOLGdCQUZlLEVBRUcsSUFGSCxDQVZuQjtBQUFBLE1BYUNuQixXQUFXLENBQUUsVUFBVW5NLElBQVYsRUFBZ0I2QyxPQUFoQixFQUF5QndHLEdBQXpCLEVBQStCO0FBQzNDLE9BQUkzQixNQUFRLENBQUMyRixlQUFELEtBQXNCaEUsT0FBT3hHLFlBQVlyRSxnQkFBekMsQ0FBRixLQUNULENBQUU0TyxlQUFldkssT0FBakIsRUFBMkI1UCxRQUEzQixHQUNDc2EsYUFBY3ZOLElBQWQsRUFBb0I2QyxPQUFwQixFQUE2QndHLEdBQTdCLENBREQsR0FFQ21FLGdCQUFpQnhOLElBQWpCLEVBQXVCNkMsT0FBdkIsRUFBZ0N3RyxHQUFoQyxDQUhRLENBQVY7O0FBS0E7QUFDQStELGtCQUFlLElBQWY7QUFDQSxVQUFPMUYsR0FBUDtBQUNBLEdBVFUsQ0FiWjs7QUF3QkEsU0FBUXhYLElBQUkrUCxHQUFaLEVBQWlCL1AsR0FBakIsRUFBdUI7QUFDdEIsT0FBTytaLFVBQVU5TCxLQUFLb0ssUUFBTCxDQUFla0QsT0FBUXZiLENBQVIsRUFBWTRDLElBQTNCLENBQWpCLEVBQXVEO0FBQ3REcVosZUFBVyxDQUFFakssY0FBZWdLLGVBQWdCQyxRQUFoQixDQUFmLEVBQTJDbEMsT0FBM0MsQ0FBRixDQUFYO0FBQ0EsSUFGRCxNQUVPO0FBQ05BLGNBQVU5TCxLQUFLNUosTUFBTCxDQUFha1gsT0FBUXZiLENBQVIsRUFBWTRDLElBQXpCLEVBQWdDd1AsS0FBaEMsQ0FBdUMsSUFBdkMsRUFBNkNtSixPQUFRdmIsQ0FBUixFQUFZNEUsT0FBekQsQ0FBVjs7QUFFQTtBQUNBLFFBQUttVixRQUFTakwsT0FBVCxDQUFMLEVBQTBCOztBQUV6QjtBQUNBNEQsU0FBSSxFQUFFMVMsQ0FBTjtBQUNBLFlBQVEwUyxJQUFJM0MsR0FBWixFQUFpQjJDLEdBQWpCLEVBQXVCO0FBQ3RCLFVBQUt6RSxLQUFLb0ssUUFBTCxDQUFla0QsT0FBUTdJLENBQVIsRUFBWTlQLElBQTNCLENBQUwsRUFBeUM7QUFDeEM7QUFDQTtBQUNEO0FBQ0QsWUFBTzJaLFdBQ052YyxJQUFJLENBQUosSUFBU2djLGVBQWdCQyxRQUFoQixDQURILEVBRU5qYyxJQUFJLENBQUosSUFBUzZUOztBQUVUO0FBQ0EwSCxZQUNFbFEsS0FERixDQUNTLENBRFQsRUFDWXJMLElBQUksQ0FEaEIsRUFFRVcsTUFGRixDQUVVLEVBQUVULE9BQU9xYixPQUFRdmIsSUFBSSxDQUFaLEVBQWdCNEMsSUFBaEIsS0FBeUIsR0FBekIsR0FBK0IsR0FBL0IsR0FBcUMsRUFBOUMsRUFGVixDQUhTLEVBTVB6QyxPQU5PLENBTUVrUSxLQU5GLEVBTVMsSUFOVCxDQUZILEVBU04wSixPQVRNLEVBVU4vWixJQUFJMFMsQ0FBSixJQUFTdUssa0JBQW1CMUIsT0FBT2xRLEtBQVAsQ0FBY3JMLENBQWQsRUFBaUIwUyxDQUFqQixDQUFuQixDQVZILEVBV05BLElBQUkzQyxHQUFKLElBQVdrTixrQkFBcUIxQixTQUFTQSxPQUFPbFEsS0FBUCxDQUFjcUgsQ0FBZCxDQUE5QixDQVhMLEVBWU5BLElBQUkzQyxHQUFKLElBQVc4RCxXQUFZMEgsTUFBWixDQVpMLENBQVA7QUFjQTtBQUNEVSxhQUFTL1gsSUFBVCxDQUFlNlYsT0FBZjtBQUNBO0FBQ0Q7O0FBRUQsU0FBT2lDLGVBQWdCQyxRQUFoQixDQUFQO0FBQ0E7O0FBRUQsVUFBU3NCLHdCQUFULENBQW1DQyxlQUFuQyxFQUFvREMsV0FBcEQsRUFBa0U7QUFDakUsTUFBSUMsUUFBUUQsWUFBWTVkLE1BQVosR0FBcUIsQ0FBakM7QUFBQSxNQUNDOGQsWUFBWUgsZ0JBQWdCM2QsTUFBaEIsR0FBeUIsQ0FEdEM7QUFBQSxNQUVDK2QsZUFBZSxTQUFmQSxZQUFlLENBQVUvSyxJQUFWLEVBQWdCRixPQUFoQixFQUF5QndHLEdBQXpCLEVBQThCdkcsT0FBOUIsRUFBdUNpTCxTQUF2QyxFQUFtRDtBQUNqRSxPQUFJL04sSUFBSjtBQUFBLE9BQVU0QyxDQUFWO0FBQUEsT0FBYXFILE9BQWI7QUFBQSxPQUNDK0QsZUFBZSxDQURoQjtBQUFBLE9BRUM5ZCxJQUFJLEdBRkw7QUFBQSxPQUdDZ2EsWUFBWW5ILFFBQVEsRUFIckI7QUFBQSxPQUlDa0wsYUFBYSxFQUpkO0FBQUEsT0FLQ0MsZ0JBQWdCMVAsZ0JBTGpCOzs7QUFPQztBQUNBaUksV0FBUTFELFFBQVE4SyxhQUFhMVAsS0FBS3RKLElBQUwsQ0FBVyxLQUFYLEVBQW9CLEdBQXBCLEVBQXlCa1osU0FBekIsQ0FSOUI7OztBQVVDO0FBQ0FJLG1CQUFrQmhQLFdBQVcrTyxpQkFBaUIsSUFBakIsR0FBd0IsQ0FBeEIsR0FBNEJFLEtBQUtDLE1BQUwsTUFBaUIsR0FYM0U7QUFBQSxPQVlDcE8sTUFBTXdHLE1BQU0xVyxNQVpiOztBQWNBLE9BQUtnZSxTQUFMLEVBQWlCOztBQUVoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBdlAsdUJBQW1CcUUsV0FBV3BSLFFBQVgsSUFBdUJvUixPQUF2QixJQUFrQ2tMLFNBQXJEO0FBQ0E7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsVUFBUTdkLE1BQU0rUCxHQUFOLElBQWEsQ0FBRUQsT0FBT3lHLE1BQU92VyxDQUFQLENBQVQsS0FBeUIsSUFBOUMsRUFBb0RBLEdBQXBELEVBQTBEO0FBQ3pELFFBQUsyZCxhQUFhN04sSUFBbEIsRUFBeUI7QUFDeEI0QyxTQUFJLENBQUo7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFLLENBQUNDLE9BQUQsSUFBWTdDLEtBQUtxRCxhQUFMLElBQXNCNVIsUUFBdkMsRUFBa0Q7QUFDakRrTixrQkFBYXFCLElBQWI7QUFDQXFKLFlBQU0sQ0FBQ3hLLGNBQVA7QUFDQTtBQUNELFlBQVVvTCxVQUFVeUQsZ0JBQWlCOUssR0FBakIsQ0FBcEIsRUFBK0M7QUFDOUMsVUFBS3FILFFBQVNqSyxJQUFULEVBQWU2QyxXQUFXcFIsUUFBMUIsRUFBb0M0WCxHQUFwQyxDQUFMLEVBQWlEO0FBQ2hEdkcsZUFBUTFPLElBQVIsQ0FBYzRMLElBQWQ7QUFDQTtBQUNBO0FBQ0Q7QUFDRCxTQUFLK04sU0FBTCxFQUFpQjtBQUNoQjVPLGdCQUFVZ1AsYUFBVjtBQUNBO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFLUCxLQUFMLEVBQWE7O0FBRVo7QUFDQSxTQUFPNU4sT0FBTyxDQUFDaUssT0FBRCxJQUFZakssSUFBMUIsRUFBbUM7QUFDbENnTztBQUNBOztBQUVEO0FBQ0EsU0FBS2pMLElBQUwsRUFBWTtBQUNYbUgsZ0JBQVU5VixJQUFWLENBQWdCNEwsSUFBaEI7QUFDQTtBQUNEO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBZ08sbUJBQWdCOWQsQ0FBaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFLMGQsU0FBUzFkLE1BQU04ZCxZQUFwQixFQUFtQztBQUNsQ3BMLFFBQUksQ0FBSjtBQUNBLFdBQVVxSCxVQUFVMEQsWUFBYS9LLEdBQWIsQ0FBcEIsRUFBMkM7QUFDMUNxSCxhQUFTQyxTQUFULEVBQW9CK0QsVUFBcEIsRUFBZ0NwTCxPQUFoQyxFQUF5Q3dHLEdBQXpDO0FBQ0E7O0FBRUQsUUFBS3RHLElBQUwsRUFBWTs7QUFFWDtBQUNBLFNBQUtpTCxlQUFlLENBQXBCLEVBQXdCO0FBQ3ZCLGFBQVE5ZCxHQUFSLEVBQWM7QUFDYixXQUFLLEVBQUdnYSxVQUFXaGEsQ0FBWCxLQUFrQitkLFdBQVkvZCxDQUFaLENBQXJCLENBQUwsRUFBOEM7QUFDN0MrZCxtQkFBWS9kLENBQVosSUFBa0J1TCxJQUFJOEcsSUFBSixDQUFVTyxPQUFWLENBQWxCO0FBQ0E7QUFDRDtBQUNEOztBQUVEO0FBQ0FtTCxrQkFBYTNCLFNBQVUyQixVQUFWLENBQWI7QUFDQTs7QUFFRDtBQUNBN1osU0FBS2tPLEtBQUwsQ0FBWVEsT0FBWixFQUFxQm1MLFVBQXJCOztBQUVBO0FBQ0EsUUFBS0YsYUFBYSxDQUFDaEwsSUFBZCxJQUFzQmtMLFdBQVdsZSxNQUFYLEdBQW9CLENBQTFDLElBQ0ZpZSxlQUFlTCxZQUFZNWQsTUFBN0IsR0FBd0MsQ0FEekMsRUFDNkM7O0FBRTVDK0ksWUFBT2tQLFVBQVAsQ0FBbUJsRixPQUFuQjtBQUNBO0FBQ0Q7O0FBRUQ7QUFDQSxPQUFLaUwsU0FBTCxFQUFpQjtBQUNoQjVPLGNBQVVnUCxhQUFWO0FBQ0EzUCx1QkFBbUIwUCxhQUFuQjtBQUNBOztBQUVELFVBQU9oRSxTQUFQO0FBQ0EsR0FySEY7O0FBdUhBLFNBQU8wRCxRQUNOeEosYUFBYzBKLFlBQWQsQ0FETSxHQUVOQSxZQUZEO0FBR0E7O0FBRUR2UCxXQUFVekYsT0FBT3lGLE9BQVAsR0FBaUIsVUFBVXZGLFFBQVYsRUFBb0JoSSxLQUFwQixDQUEwQix1QkFBMUIsRUFBb0Q7QUFDOUUsTUFBSWQsQ0FBSjtBQUFBLE1BQ0N5ZCxjQUFjLEVBRGY7QUFBQSxNQUVDRCxrQkFBa0IsRUFGbkI7QUFBQSxNQUdDOUIsU0FBU3BNLGNBQWV4RyxXQUFXLEdBQTFCLENBSFY7O0FBS0EsTUFBSyxDQUFDNFMsTUFBTixFQUFlOztBQUVkO0FBQ0EsT0FBSyxDQUFDNWEsS0FBTixFQUFjO0FBQ2JBLFlBQVFzTixTQUFVdEYsUUFBVixDQUFSO0FBQ0E7QUFDRDlJLE9BQUljLE1BQU1qQixNQUFWO0FBQ0EsVUFBUUcsR0FBUixFQUFjO0FBQ2IwYixhQUFTdUIsa0JBQW1CbmMsTUFBT2QsQ0FBUCxDQUFuQixDQUFUO0FBQ0EsUUFBSzBiLE9BQVE1TSxPQUFSLENBQUwsRUFBeUI7QUFDeEIyTyxpQkFBWXZaLElBQVosQ0FBa0J3WCxNQUFsQjtBQUNBLEtBRkQsTUFFTztBQUNOOEIscUJBQWdCdFosSUFBaEIsQ0FBc0J3WCxNQUF0QjtBQUNBO0FBQ0Q7O0FBRUQ7QUFDQUEsWUFBU3BNLGNBQ1J4RyxRQURRLEVBRVJ5VSx5QkFBMEJDLGVBQTFCLEVBQTJDQyxXQUEzQyxDQUZRLENBQVQ7O0FBS0E7QUFDQS9CLFVBQU81UyxRQUFQLEdBQWtCQSxRQUFsQjtBQUNBO0FBQ0QsU0FBTzRTLE1BQVA7QUFDQSxFQWhDRDs7QUFrQ0E7Ozs7Ozs7OztBQVNBMVosVUFBUzRHLE9BQU81RyxNQUFQLEdBQWdCLFVBQVU4RyxRQUFWLEVBQW9CNkosT0FBcEIsRUFBNkJDLE9BQTdCLEVBQXNDQyxJQUF0QyxFQUE2QztBQUNyRSxNQUFJN1MsQ0FBSjtBQUFBLE1BQU91YixNQUFQO0FBQUEsTUFBZTZDLEtBQWY7QUFBQSxNQUFzQnhiLElBQXRCO0FBQUEsTUFBNEIrQixJQUE1QjtBQUFBLE1BQ0MwWixXQUFXLE9BQU92VixRQUFQLEtBQW9CLFVBQXBCLElBQWtDQSxRQUQ5QztBQUFBLE1BRUNoSSxRQUFRLENBQUMrUixJQUFELElBQVN6RSxTQUFZdEYsV0FBV3VWLFNBQVN2VixRQUFULElBQXFCQSxRQUE1QyxDQUZsQjs7QUFJQThKLFlBQVVBLFdBQVcsRUFBckI7O0FBRUE7QUFDQTtBQUNBLE1BQUs5UixNQUFNakIsTUFBTixLQUFpQixDQUF0QixFQUEwQjs7QUFFekI7QUFDQTBiLFlBQVN6YSxNQUFPLENBQVAsSUFBYUEsTUFBTyxDQUFQLEVBQVd1SyxLQUFYLENBQWtCLENBQWxCLENBQXRCO0FBQ0EsT0FBS2tRLE9BQU8xYixNQUFQLEdBQWdCLENBQWhCLElBQXFCLENBQUV1ZSxRQUFRN0MsT0FBUSxDQUFSLENBQVYsRUFBd0IzWSxJQUF4QixLQUFpQyxJQUF0RCxJQUNKK1AsUUFBUTVQLFFBQVIsS0FBcUIsQ0FEakIsSUFDc0I0TCxjQUR0QixJQUN3Q1YsS0FBS29LLFFBQUwsQ0FBZWtELE9BQVEsQ0FBUixFQUFZM1ksSUFBM0IsQ0FEN0MsRUFDaUY7O0FBRWhGK1AsY0FBVSxDQUFFMUUsS0FBS3RKLElBQUwsQ0FBVyxJQUFYLEVBQW1CeVosTUFBTXhaLE9BQU4sQ0FBZSxDQUFmLEVBQzdCekUsT0FENkIsQ0FDcEIrUSxTQURvQixFQUNUQyxTQURTLENBQW5CLEVBQ3VCd0IsT0FEdkIsS0FDb0MsRUFEdEMsRUFDNEMsQ0FENUMsQ0FBVjtBQUVBLFFBQUssQ0FBQ0EsT0FBTixFQUFnQjtBQUNmLFlBQU9DLE9BQVA7O0FBRUQ7QUFDQyxLQUpELE1BSU8sSUFBS3lMLFFBQUwsRUFBZ0I7QUFDdEIxTCxlQUFVQSxRQUFRclAsVUFBbEI7QUFDQTs7QUFFRHdGLGVBQVdBLFNBQVN1QyxLQUFULENBQWdCa1EsT0FBT25YLEtBQVAsR0FBZWxFLEtBQWYsQ0FBcUJMLE1BQXJDLENBQVg7QUFDQTs7QUFFRDtBQUNBRyxPQUFJMlEsVUFBVyxjQUFYLEVBQTRCOVAsSUFBNUIsQ0FBa0NpSSxRQUFsQyxJQUErQyxDQUEvQyxHQUFtRHlTLE9BQU8xYixNQUE5RDtBQUNBLFVBQVFHLEdBQVIsRUFBYztBQUNib2UsWUFBUTdDLE9BQVF2YixDQUFSLENBQVI7O0FBRUE7QUFDQSxRQUFLaU8sS0FBS29LLFFBQUwsQ0FBaUJ6VixPQUFPd2IsTUFBTXhiLElBQTlCLENBQUwsRUFBOEM7QUFDN0M7QUFDQTtBQUNELFFBQU8rQixPQUFPc0osS0FBS3RKLElBQUwsQ0FBVy9CLElBQVgsQ0FBZCxFQUFvQzs7QUFFbkM7QUFDQSxTQUFPaVEsT0FBT2xPLEtBQ2J5WixNQUFNeFosT0FBTixDQUFlLENBQWYsRUFBbUJ6RSxPQUFuQixDQUE0QitRLFNBQTVCLEVBQXVDQyxTQUF2QyxDQURhLEVBRWJGLFNBQVNwUSxJQUFULENBQWUwYSxPQUFRLENBQVIsRUFBWTNZLElBQTNCLEtBQXFDOFEsWUFBYWYsUUFBUXJQLFVBQXJCLENBQXJDLElBQ0NxUCxPQUhZLENBQWQsRUFJTTs7QUFFTDtBQUNBNEksYUFBT3JELE1BQVAsQ0FBZWxZLENBQWYsRUFBa0IsQ0FBbEI7QUFDQThJLGlCQUFXK0osS0FBS2hULE1BQUwsSUFBZWdVLFdBQVkwSCxNQUFaLENBQTFCO0FBQ0EsVUFBSyxDQUFDelMsUUFBTixFQUFpQjtBQUNoQjVFLFlBQUtrTyxLQUFMLENBQVlRLE9BQVosRUFBcUJDLElBQXJCO0FBQ0EsY0FBT0QsT0FBUDtBQUNBOztBQUVEO0FBQ0E7QUFDRDtBQUNEO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBLEdBQUV5TCxZQUFZaFEsUUFBU3ZGLFFBQVQsRUFBbUJoSSxLQUFuQixDQUFkLEVBQ0MrUixJQURELEVBRUNGLE9BRkQsRUFHQyxDQUFDaEUsY0FIRixFQUlDaUUsT0FKRCxFQUtDLENBQUNELE9BQUQsSUFBWTFCLFNBQVNwUSxJQUFULENBQWVpSSxRQUFmLEtBQTZCNEssWUFBYWYsUUFBUXJQLFVBQXJCLENBQXpDLElBQThFcVAsT0FML0U7QUFPQSxTQUFPQyxPQUFQO0FBQ0EsRUF2RUQ7O0FBeUVBOztBQUVBO0FBQ0E1RSxTQUFRaUssVUFBUixHQUFxQm5KLFFBQVEvSSxLQUFSLENBQWUsRUFBZixFQUFvQjhELElBQXBCLENBQTBCMkYsU0FBMUIsRUFBc0M3SCxJQUF0QyxDQUE0QyxFQUE1QyxNQUFxRG1ILE9BQTFFOztBQUVBO0FBQ0E7QUFDQWQsU0FBUWdLLGdCQUFSLEdBQTJCLENBQUMsQ0FBQ3hKLFlBQTdCOztBQUVBO0FBQ0FDOztBQUVBO0FBQ0E7QUFDQVQsU0FBUW1KLFlBQVIsR0FBdUIvQyxPQUFRLFVBQVVDLEVBQVYsRUFBZTs7QUFFN0M7QUFDQSxTQUFPQSxHQUFHMkMsdUJBQUgsQ0FBNEJ6VixTQUFTK1MsYUFBVCxDQUF3QixVQUF4QixDQUE1QixJQUFxRSxDQUE1RTtBQUNBLEVBSnNCLENBQXZCOztBQU1BO0FBQ0E7QUFDQTtBQUNBLEtBQUssQ0FBQ0YsT0FBUSxVQUFVQyxFQUFWLEVBQWU7QUFDNUJBLEtBQUdvQyxTQUFILEdBQWUsa0JBQWY7QUFDQSxTQUFPcEMsR0FBR3pOLFVBQUgsQ0FBYytELFlBQWQsQ0FBNEIsTUFBNUIsTUFBeUMsR0FBaEQ7QUFDQSxFQUhLLENBQU4sRUFHTTtBQUNMNkosWUFBVyx3QkFBWCxFQUFxQyxVQUFVMUUsSUFBVixFQUFnQmhOLElBQWhCLEVBQXNCcUwsS0FBdEIsRUFBOEI7QUFDbEUsT0FBSyxDQUFDQSxLQUFOLEVBQWM7QUFDYixXQUFPMkIsS0FBS25GLFlBQUwsQ0FBbUI3SCxJQUFuQixFQUF5QkEsS0FBS3NDLFdBQUwsT0FBdUIsTUFBdkIsR0FBZ0MsQ0FBaEMsR0FBb0MsQ0FBN0QsQ0FBUDtBQUNBO0FBQ0QsR0FKRDtBQUtBOztBQUVEO0FBQ0E7QUFDQSxLQUFLLENBQUM0SSxRQUFRbkosVUFBVCxJQUF1QixDQUFDdVAsT0FBUSxVQUFVQyxFQUFWLEVBQWU7QUFDbkRBLEtBQUdvQyxTQUFILEdBQWUsVUFBZjtBQUNBcEMsS0FBR3pOLFVBQUgsQ0FBY2dOLFlBQWQsQ0FBNEIsT0FBNUIsRUFBcUMsRUFBckM7QUFDQSxTQUFPUyxHQUFHek4sVUFBSCxDQUFjK0QsWUFBZCxDQUE0QixPQUE1QixNQUEwQyxFQUFqRDtBQUNBLEVBSjRCLENBQTdCLEVBSU07QUFDTDZKLFlBQVcsT0FBWCxFQUFvQixVQUFVMUUsSUFBVixFQUFnQndPLEtBQWhCLEVBQXVCblEsS0FBdkIsRUFBK0I7QUFDbEQsT0FBSyxDQUFDQSxLQUFELElBQVUyQixLQUFLb0MsUUFBTCxDQUFjOU0sV0FBZCxPQUFnQyxPQUEvQyxFQUF5RDtBQUN4RCxXQUFPMEssS0FBS3lPLFlBQVo7QUFDQTtBQUNELEdBSkQ7QUFLQTs7QUFFRDtBQUNBO0FBQ0EsS0FBSyxDQUFDbkssT0FBUSxVQUFVQyxFQUFWLEVBQWU7QUFDNUIsU0FBT0EsR0FBRzFKLFlBQUgsQ0FBaUIsVUFBakIsS0FBaUMsSUFBeEM7QUFDQSxFQUZLLENBQU4sRUFFTTtBQUNMNkosWUFBV3hFLFFBQVgsRUFBcUIsVUFBVUYsSUFBVixFQUFnQmhOLElBQWhCLEVBQXNCcUwsS0FBdEIsRUFBOEI7QUFDbEQsT0FBSXBKLEdBQUo7QUFDQSxPQUFLLENBQUNvSixLQUFOLEVBQWM7QUFDYixXQUFPMkIsS0FBTWhOLElBQU4sTUFBaUIsSUFBakIsR0FBd0JBLEtBQUtzQyxXQUFMLEVBQXhCLEdBQ04sQ0FBRUwsTUFBTStLLEtBQUt3RyxnQkFBTCxDQUF1QnhULElBQXZCLENBQVIsS0FBMkNpQyxJQUFJMlMsU0FBL0MsR0FDQzNTLElBQUk3RSxLQURMLEdBRUMsSUFIRjtBQUlBO0FBQ0QsR0FSRDtBQVNBOztBQUVEO0FBQ0EsS0FBSXNlLFVBQVV6USxPQUFPbkYsTUFBckI7O0FBRUFBLFFBQU82VixVQUFQLEdBQW9CLFlBQVc7QUFDOUIsTUFBSzFRLE9BQU9uRixNQUFQLEtBQWtCQSxNQUF2QixFQUFnQztBQUMvQm1GLFVBQU9uRixNQUFQLEdBQWdCNFYsT0FBaEI7QUFDQTs7QUFFRCxTQUFPNVYsTUFBUDtBQUNBLEVBTkQ7O0FBUUEsS0FBSyxJQUFMLEVBQWtEO0FBQ2pEOFYsRUFBQSxrQ0FBUSxZQUFXO0FBQ2xCLFVBQU85VixNQUFQO0FBQ0EsR0FGRDs7QUFJRDtBQUNDLEVBTkQsTUFNTyxJQUFLLE9BQU8rVixNQUFQLEtBQWtCLFdBQWxCLElBQWlDQSxPQUFPQyxPQUE3QyxFQUF1RDtBQUM3REQsU0FBT0MsT0FBUCxHQUFpQmhXLE1BQWpCO0FBQ0EsRUFGTSxNQUVBO0FBQ05tRixTQUFPbkYsTUFBUCxHQUFnQkEsTUFBaEI7QUFDQTs7QUFFRDtBQUVDLENBbjZFRCxFQW02RUttRixNQW42RUwsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQ0NWUzhRLE87Ozs7OzttQkFBbUJDLGlCOzs7Ozs7bUJBQW1CQyxnQjs7Ozs7Ozs7OzBDQUN0Q0YsTzs7Ozs7O2tCQUFrQnpkLFc7Ozs7Ozs7Ozs2Q0FDbEJ5ZCxPOzs7Ozs7Ozs7Ozs7UUFDR0csTSIsImZpbGUiOiJvcHRpbWFsLXNlbGVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIk9wdGltYWxTZWxlY3RcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiT3B0aW1hbFNlbGVjdFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0ZDU5MWYxN2YyMmVlOTVjOGFhMSIsIi8qKlxuICogIyBVdGlsaXRpZXNcbiAqXG4gKiBDb252ZW5pZW5jZSBoZWxwZXJzLlxuICovXG5cbi8qKlxuICogQ3JlYXRlIGFuIGFycmF5IHdpdGggdGhlIERPTSBub2RlcyBvZiB0aGUgbGlzdFxuICpcbiAqIEBwYXJhbSAge05vZGVMaXN0fSAgICAgICAgICAgICBub2RlcyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge0FycmF5LjxIVE1MRWxlbWVudD59ICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnROb2RlTGlzdCA9IChub2RlcykgPT4ge1xuICBjb25zdCB7IGxlbmd0aCB9ID0gbm9kZXNcbiAgY29uc3QgYXJyID0gbmV3IEFycmF5KGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGFycltpXSA9IG5vZGVzW2ldXG4gIH1cbiAgcmV0dXJuIGFyclxufVxuXG4vKipcbiAqIEVzY2FwZSBzcGVjaWFsIGNoYXJhY3RlcnMgYW5kIGxpbmUgYnJlYWtzIGFzIGEgc2ltcGxpZmllZCB2ZXJzaW9uIG9mICdDU1MuZXNjYXBlKCknXG4gKlxuICogRGVzY3JpcHRpb24gb2YgdmFsaWQgY2hhcmFjdGVyczogaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2Nzcy1lc2NhcGVzXG4gKlxuICogQHBhcmFtICB7U3RyaW5nP30gdmFsdWUgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGNvbnN0IGVzY2FwZVZhbHVlID0gKHZhbHVlKSA9PlxuICB2YWx1ZSAmJiB2YWx1ZS5yZXBsYWNlKC9bJ1wiYFxcXFwvOj8mISMkJV4oKVtcXF17fH0qKzssLjw9PkB+XS9nLCAnXFxcXCQmJylcbiAgICAucmVwbGFjZSgvXFxuL2csICdcXHUwMGEwJylcblxuLyoqXG4gKiBQYXJ0aXRpb24gYXJyYXkgaW50byB0d28gZ3JvdXBzIGRldGVybWluZWQgYnkgcHJlZGljYXRlXG4gKi9cbmV4cG9ydCBjb25zdCBwYXJ0aXRpb24gPSAoYXJyYXksIHByZWRpY2F0ZSkgPT5cbiAgYXJyYXkucmVkdWNlKFxuICAgIChbaW5uZXIsIG91dGVyXSwgaXRlbSkgPT4gcHJlZGljYXRlKGl0ZW0pID8gW2lubmVyLmNvbmNhdChpdGVtKSwgb3V0ZXJdIDogW2lubmVyLCBvdXRlci5jb25jYXQoaXRlbSldLFxuICAgIFtbXSwgW11dXG4gIClcblxuXG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHN0cmluZyBpcyB2YWxpZCBDU1MgaWRlbnRpZmllclxuICogXG4gKiBJbiBDU1MsIGlkZW50aWZpZXJzIChpbmNsdWRpbmcgZWxlbWVudCBuYW1lcywgY2xhc3NlcywgYW5kIElEcyBpbiBzZWxlY3RvcnMpIGNhbiBjb250YWluXG4gKiBvbmx5IHRoZSBjaGFyYWN0ZXJzIFthLXpBLVowLTldIGFuZCBJU08gMTA2NDYgY2hhcmFjdGVycyBVKzAwQTAgYW5kIGhpZ2hlciwgcGx1cyB0aGUgaHlwaGVuICgtKVxuICogYW5kIHRoZSB1bmRlcnNjb3JlIChfKTsgdGhleSBjYW5ub3Qgc3RhcnQgd2l0aCBhIGRpZ2l0LCB0d28gaHlwaGVucywgb3IgYSBoeXBoZW4gZm9sbG93ZWQgYnlcbiAqIGEgZGlnaXQuXG4gKiBcbiAqIElkZW50aWZpZXJzIGNhbiBhbHNvIGNvbnRhaW4gZXNjYXBlZCBjaGFyYWN0ZXJzIGFuZCBhbnkgSVNPIDEwNjQ2IGNoYXJhY3RlciBhcyBhIG51bWVyaWNcbiAqIGNvZGUgKHNlZSBuZXh0IGl0ZW0pLiBGb3IgaW5zdGFuY2UsIHRoZSBpZGVudGlmaWVyIFwiQiZXP1wiIG1heSBiZSB3cml0dGVuIGFzIFwiQlxcJldcXD9cIiBvciBcIkJcXDI2IFdcXDNGXCIuXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaXNWYWxpZENTU0lkZW50aWZpZXIgPSAodmFsdWUpID0+XG4gICEhdmFsdWUgJiYgIS8oXlxcZCl8KF4tLSl8KF4tXFxkKS8udGVzdCh2YWx1ZSkgJiYgIS8oW15cXFxcXXxeKVsnXCJgLzo/JiEjJCVeKClbXFxde3x9Kis7LC48PT5Afl0vLnRlc3QodmFsdWUpXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxpdGllcy5qcyIsIi8qKlxuICogIyBNYXRjaFxuICpcbiAqIFJldHJpZXZlIHNlbGVjdG9yIGZvciBhIG5vZGUuXG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlUGF0dGVybiwgZ2V0VG9TdHJpbmcgfSBmcm9tICcuL3BhdHRlcm4nXG5pbXBvcnQgeyBnZXRTZWxlY3QgfSBmcm9tICcuL3NlbGVjdG9yJ1xuaW1wb3J0IHsgZXNjYXBlVmFsdWUgfSBmcm9tICcuL3V0aWxpdGllcydcblxuLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3NlbGVjdCcpLk9wdGlvbnN9IE9wdGlvbnNcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vcGF0dGVybicpLlBhdHRlcm59IFBhdHRlcm5cbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vcGF0dGVybicpLlRvU3RyaW5nQXBpfSBQYXR0ZXJuXG4gKi9cblxuY29uc3QgZGVmYXVsdElnbm9yZSA9IHtcbiAgYXR0cmlidXRlIChhdHRyaWJ1dGVOYW1lKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdzdHlsZScsXG4gICAgICAnZGF0YS1yZWFjdGlkJyxcbiAgICAgICdkYXRhLXJlYWN0LWNoZWNrc3VtJ1xuICAgIF0uaW5kZXhPZihhdHRyaWJ1dGVOYW1lKSA+IC0xXG4gIH0sXG4gIGNvbnRhaW5zOiAoKSA9PiB0cnVlXG59XG5cbmV4cG9ydCBjb25zdCBpbml0T3B0aW9ucyA9IChvcHRpb25zID0ge30pID0+ICh7XG4gIC4uLm9wdGlvbnMsXG4gIHJvb3Q6IG9wdGlvbnMucm9vdCB8fCBkb2N1bWVudCxcbiAgc2tpcDogb3B0aW9ucy5za2lwIHx8IG51bGwsXG4gIHByaW9yaXR5OiBvcHRpb25zLnByaW9yaXR5IHx8IFsnaWQnLCAnY2xhc3MnLCAnaHJlZicsICdzcmMnXSxcbiAgaWdub3JlOiBvcHRpb25zLmlnbm9yZSB8fCB7fVxufSlcblxuLyoqXG4gKiBHZXQgdGhlIHBhdGggb2YgdGhlIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gbm9kZSAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T3B0aW9uc30gICAgIFtvcHRpb25zXSAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge0FycmF5LjxQYXR0ZXJuPn0gICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1hdGNoIChub2RlLCBvcHRpb25zID0ge30sIG5lc3RlZCA9IGZhbHNlKSB7XG4gIG9wdGlvbnMgPSBpbml0T3B0aW9ucyhvcHRpb25zKVxuICBjb25zdCB7IHJvb3QsIHNraXAsIGlnbm9yZSwgZm9ybWF0IH0gPSBvcHRpb25zXG5cbiAgY29uc3QgcGF0aCA9IFtdXG4gIGxldCBlbGVtZW50ID0gbm9kZVxuICBsZXQgbGVuZ3RoID0gcGF0aC5sZW5ndGhcbiAgY29uc3Qgc2VsZWN0ID0gZ2V0U2VsZWN0KG9wdGlvbnMpXG4gIGNvbnN0IHRvU3RyaW5nID0gZ2V0VG9TdHJpbmcob3B0aW9ucylcblxuICBjb25zdCBza2lwQ29tcGFyZSA9IHNraXAgJiYgKEFycmF5LmlzQXJyYXkoc2tpcCkgPyBza2lwIDogW3NraXBdKS5tYXAoKGVudHJ5KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBlbnRyeSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIChlbGVtZW50KSA9PiBlbGVtZW50ID09PSBlbnRyeVxuICAgIH1cbiAgICByZXR1cm4gZW50cnlcbiAgfSlcblxuICBjb25zdCBza2lwQ2hlY2tzID0gKGVsZW1lbnQpID0+IHtcbiAgICByZXR1cm4gc2tpcCAmJiBza2lwQ29tcGFyZS5zb21lKChjb21wYXJlKSA9PiBjb21wYXJlKGVsZW1lbnQpKVxuICB9XG5cbiAgT2JqZWN0LmtleXMoaWdub3JlKS5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgdmFyIHByZWRpY2F0ZSA9IGlnbm9yZVt0eXBlXVxuICAgIGlmICh0eXBlb2YgcHJlZGljYXRlID09PSAnZnVuY3Rpb24nKSByZXR1cm5cbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHByZWRpY2F0ZSA9IHByZWRpY2F0ZS50b1N0cmluZygpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgcHJlZGljYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgcHJlZGljYXRlID0gbmV3IFJlZ0V4cChlc2NhcGVWYWx1ZShwcmVkaWNhdGUpLnJlcGxhY2UoL1xcXFwvZywgJ1xcXFxcXFxcJykpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgcHJlZGljYXRlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHByZWRpY2F0ZSA9IHByZWRpY2F0ZSA/IC8oPzopLyA6IC8uXi9cbiAgICB9XG4gICAgLy8gY2hlY2sgY2xhc3MtL2F0dHJpYnV0ZW5hbWUgZm9yIHJlZ2V4XG4gICAgaWdub3JlW3R5cGVdID0gKG5hbWUsIHZhbHVlKSA9PiBwcmVkaWNhdGUudGVzdCh2YWx1ZSlcbiAgfSlcblxuICB3aGlsZSAoZWxlbWVudCAhPT0gcm9vdCAmJiBlbGVtZW50Lm5vZGVUeXBlICE9PSAxMSkge1xuICAgIGlmIChza2lwQ2hlY2tzKGVsZW1lbnQpICE9PSB0cnVlKSB7XG4gICAgICAvLyB+IGdsb2JhbFxuICAgICAgaWYgKGNoZWNrQXR0cmlidXRlcyhlbGVtZW50LCBwYXRoLCBvcHRpb25zLCBzZWxlY3QsIHRvU3RyaW5nLCByb290KSkgYnJlYWtcbiAgICAgIGlmIChjaGVja1RhZyhlbGVtZW50LCBwYXRoLCBvcHRpb25zLCBzZWxlY3QsIHRvU3RyaW5nLCByb290KSkgYnJlYWtcblxuICAgICAgLy8gfiBsb2NhbFxuICAgICAgY2hlY2tBdHRyaWJ1dGVzKGVsZW1lbnQsIHBhdGgsIG9wdGlvbnMsIHNlbGVjdCwgdG9TdHJpbmcpXG4gICAgICBpZiAocGF0aC5sZW5ndGggPT09IGxlbmd0aCkge1xuICAgICAgICBjaGVja1RhZyhlbGVtZW50LCBwYXRoLCBvcHRpb25zLCBzZWxlY3QsIHRvU3RyaW5nKVxuICAgICAgfVxuXG4gICAgICBpZiAocGF0aC5sZW5ndGggPT09IGxlbmd0aCAmJiBbMSwgJ3hwYXRoJ10uaW5jbHVkZXMoZm9ybWF0KSAmJiAhbmVzdGVkICYmIGVsZW1lbnQgPT09IG5vZGUpIHtcbiAgICAgICAgY2hlY2tSZWN1cnNpdmVEZXNjZW5kYW50cyhlbGVtZW50LCBwYXRoLCBvcHRpb25zLCBzZWxlY3QsIHRvU3RyaW5nKVxuICAgICAgfVxuXG4gICAgICBpZiAocGF0aC5sZW5ndGggPT09IGxlbmd0aCAmJiBbMSwgJ3hwYXRoJywgJ2pxdWVyeSddLmluY2x1ZGVzKGZvcm1hdCkpIHtcbiAgICAgICAgY2hlY2tUZXh0KGVsZW1lbnQsIHBhdGgsIG9wdGlvbnMsIHNlbGVjdCwgdG9TdHJpbmcsIGZvcm1hdCA9PT0gJ2pxdWVyeScpXG4gICAgICB9XG5cbiAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgIGNoZWNrTnRoQ2hpbGQoZWxlbWVudCwgcGF0aCwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlXG4gICAgbGVuZ3RoID0gcGF0aC5sZW5ndGhcbiAgfVxuXG4gIGlmIChlbGVtZW50ID09PSByb290KSB7XG4gICAgY29uc3QgcGF0dGVybiA9IGZpbmRQYXR0ZXJuKGVsZW1lbnQsIG9wdGlvbnMsIHNlbGVjdCwgdG9TdHJpbmcpXG4gICAgcGF0aC51bnNoaWZ0KHBhdHRlcm4pXG4gIH1cblxuICByZXR1cm4gcGF0aFxufVxuXG4vKipcbiAqIEV4dGVuZCBwYXRoIHdpdGggYXR0cmlidXRlIGlkZW50aWZpZXJcbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgIGVsZW1lbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSBwYXRoICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICAgb3B0aW9ucyAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgIHNlbGVjdCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7VG9TdHJpbmdBcGl9ICAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICAgcGFyZW50ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBjaGVja0F0dHJpYnV0ZXMgPSAoZWxlbWVudCwgcGF0aCwgeyBwcmlvcml0eSwgaWdub3JlIH0sIHNlbGVjdCwgdG9TdHJpbmcsIHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSkgPT4ge1xuICBjb25zdCBwYXR0ZXJuID0gZmluZEF0dHJpYnV0ZXNQYXR0ZXJuKHByaW9yaXR5LCBlbGVtZW50LCBpZ25vcmUsIHNlbGVjdCwgdG9TdHJpbmcsIHBhcmVudClcbiAgaWYgKHBhdHRlcm4pIHtcbiAgICBwYXRoLnVuc2hpZnQocGF0dGVybilcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgYXJyYXkgb2YgY29tYmluYXRpb25zIG9mIGl0ZW1zIGluIGlucHV0IGFycmF5LlxuICogQHBhcmFtICB7QXJyYXkuPGFueT59IHZhbHVlcyAgIC0gYXJyYXkgb2YgdmFsdWVzXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnMgICAgICAgLSBvcHRpb25zOiBtaW4gLSBtaW5pbXVtIHN1YnNldCBzaXplOyBtYXggLSBtYXhpbXVtIHN1YnNldCBzaXplXG4gKiBAcmV0dXJuIHtBcnJheS48QXJyYXkuPGFueT4+P30gICBhcnJheSBvZiBzdWJzZXRzXG4gKi9cbmV4cG9ydCBjb25zdCBjb21iaW5hdGlvbnMgPSAodmFsdWVzLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHsgbWluLCBtYXggfSA9IG9wdGlvbnMgfHwge31cbiAgY29uc3QgcmVzdWx0ID0gW1tdXVxuXG4gIHZhbHVlcy5mb3JFYWNoKHYgPT4ge1xuICAgIHJlc3VsdC5mb3JFYWNoKHIgPT4ge1xuICAgICAgaWYgKCFtYXggfHwgci5sZW5ndGggPCBtYXgpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goci5jb25jYXQodikpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcblxuICByZXN1bHQuc2hpZnQoKVxuICByZXR1cm4gbWluID8gcmVzdWx0LmZpbHRlcihyID0+IHIubGVuZ3RoID49IG1pbikgOiByZXN1bHRcbn1cblxuLy8gbGltaXQgc3Vic2V0IHNpemUgdG8gaW5jcmVhc2UgcGVyZm9ybWFuY2VcbmNvbnN0IG1heFN1YnNldFNpemUgPSBbXG4gIHsgaXRlbXM6IDEzLCBtYXg6IDEgfSxcbiAgeyBpdGVtczogMTAsIG1heDogMiB9LFxuICB7IGl0ZW1zOiA4LCBtYXg6IDMgfSxcbiAgeyBpdGVtczogNSwgbWF4OiA0IH1cbl1cblxuLyoqXG4gKiBHZXQgY2xhc3Mgc2VsZWN0b3JcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48c3RyaW5nPn0gY2xhc3NlcyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICBzZWxlY3QgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7VG9TdHJpbmdBcGl9ICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIHBhcmVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtQYXR0ZXJufSAgICAgICAgYmFzZSAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge0FycmF5LjxzdHJpbmc+P30gICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBnZXRDbGFzc1NlbGVjdG9yID0gKGNsYXNzZXMgPSBbXSwgc2VsZWN0LCB0b1N0cmluZywgcGFyZW50LCBiYXNlKSA9PiB7XG4gIGNvbnN0IHsgbWF4IH0gPVxuICAgIG1heFN1YnNldFNpemUuZmluZCgoeyBpdGVtcyB9KSA9PiBjbGFzc2VzLmxlbmd0aCA+IGl0ZW1zKSB8fCB7IG1heDogY2xhc3Nlcy5sZW5ndGggfVxuXG4gIGxldCByZXN1bHQgPSBjb21iaW5hdGlvbnMoY2xhc3NlcywgeyBtYXggfSlcblxuICBmb3IobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcGF0dGVybiA9IHRvU3RyaW5nLnBhdHRlcm4oeyAuLi5iYXNlLCBjbGFzc2VzOiByZXN1bHRbaV0gfSlcbiAgICBjb25zdCBtYXRjaGVzID0gc2VsZWN0KHBhdHRlcm4sIHBhcmVudClcbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiByZXN1bHRbaV1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbFxufVxuXG4vKipcbiAqIExvb2t1cCBhdHRyaWJ1dGUgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSAge0FycmF5LjxzdHJpbmc+fSBwcmlvcml0eSAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgZWxlbWVudCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgIGlnbm9yZSAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICBzZWxlY3QgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgdG9TdHJpbmcgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UGFyZW50Tm9kZX0gICAgIHBhcmVudCAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1BhdHRlcm4/fSAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IGZpbmRBdHRyaWJ1dGVzUGF0dGVybiA9IChwcmlvcml0eSwgZWxlbWVudCwgaWdub3JlLCBzZWxlY3QsIHRvU3RyaW5nLCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGUpID0+IHtcbiAgY29uc3QgYXR0cmlidXRlcyA9IGVsZW1lbnQuYXR0cmlidXRlc1xuICB2YXIgYXR0cmlidXRlTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5tYXAoKHZhbCkgPT4gYXR0cmlidXRlc1t2YWxdLm5hbWUpXG4gICAgLmZpbHRlcigoYSkgPT4gcHJpb3JpdHkuaW5kZXhPZihhKSA8IDApXG5cbiAgdmFyIHNvcnRlZEtleXMgPSBbIC4uLnByaW9yaXR5LCAuLi5hdHRyaWJ1dGVOYW1lcyBdXG4gIHZhciBwYXR0ZXJuID0gY3JlYXRlUGF0dGVybigpXG4gIHBhdHRlcm4udGFnID0gZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKClcblxuICB2YXIgaXNPcHRpbWFsID0gKHBhdHRlcm4pID0+IChzZWxlY3QodG9TdHJpbmcucGF0dGVybihwYXR0ZXJuKSwgcGFyZW50KS5sZW5ndGggPT09IDEpXG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBzb3J0ZWRLZXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGNvbnN0IGtleSA9IHNvcnRlZEtleXNbaV1cbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2tleV1cbiAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gZXNjYXBlVmFsdWUoYXR0cmlidXRlICYmIGF0dHJpYnV0ZS5uYW1lKVxuICAgIGNvbnN0IGF0dHJpYnV0ZVZhbHVlID0gZXNjYXBlVmFsdWUoYXR0cmlidXRlICYmIGF0dHJpYnV0ZS52YWx1ZSlcbiAgICBjb25zdCB1c2VOYW1lZElnbm9yZSA9IGF0dHJpYnV0ZU5hbWUgIT09ICdjbGFzcydcblxuICAgIGNvbnN0IGN1cnJlbnRJZ25vcmUgPSAodXNlTmFtZWRJZ25vcmUgJiYgaWdub3JlW2F0dHJpYnV0ZU5hbWVdKSB8fCBpZ25vcmUuYXR0cmlidXRlXG4gICAgY29uc3QgY3VycmVudERlZmF1bHRJZ25vcmUgPSAodXNlTmFtZWRJZ25vcmUgJiYgZGVmYXVsdElnbm9yZVthdHRyaWJ1dGVOYW1lXSkgfHwgZGVmYXVsdElnbm9yZS5hdHRyaWJ1dGVcbiAgICBpZiAoY2hlY2tJZ25vcmUoY3VycmVudElnbm9yZSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUsIGN1cnJlbnREZWZhdWx0SWdub3JlKSkge1xuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGF0dHJpYnV0ZU5hbWUpIHtcbiAgICAgIGNhc2UgJ2NsYXNzJzoge1xuICAgICAgICBsZXQgY2xhc3NOYW1lcyA9IGF0dHJpYnV0ZVZhbHVlLnRyaW0oKS5zcGxpdCgvXFxzKy9nKVxuICAgICAgICBpZiAoIWNsYXNzTmFtZXNbMF0pIHsgLy8gZW1wdHkgc3RyaW5nXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjbGFzc0lnbm9yZSA9IGlnbm9yZS5jbGFzcyB8fCBkZWZhdWx0SWdub3JlLmNsYXNzXG4gICAgICAgIGlmIChjbGFzc0lnbm9yZSkge1xuICAgICAgICAgIGNsYXNzTmFtZXMgPSBjbGFzc05hbWVzLmZpbHRlcihjbGFzc05hbWUgPT4gIWNsYXNzSWdub3JlKGNsYXNzTmFtZSkpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNsYXNzTmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBnZXRDbGFzc1NlbGVjdG9yKGNsYXNzTmFtZXMsIHNlbGVjdCwgdG9TdHJpbmcsIHBhcmVudCwgcGF0dGVybilcbiAgICAgICAgICBpZiAoY2xhc3Nlcykge1xuICAgICAgICAgICAgcGF0dGVybi5jbGFzc2VzID0gY2xhc3Nlc1xuICAgICAgICAgICAgaWYgKGlzT3B0aW1hbChwYXR0ZXJuKSkge1xuICAgICAgICAgICAgICByZXR1cm4gcGF0dGVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgICBicmVha1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBwYXR0ZXJuLmF0dHJpYnV0ZXMucHVzaCh7IG5hbWU6IGF0dHJpYnV0ZU5hbWUsIHZhbHVlOiBhdHRyaWJ1dGVWYWx1ZSB9KVxuICAgICAgICBpZiAoaXNPcHRpbWFsKHBhdHRlcm4pKSB7XG4gICAgICAgICAgcmV0dXJuIHBhdHRlcm5cbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsXG59XG5cblxuLyoqXG4gKiBFeHRlbmQgcGF0aCB3aXRoIHRhZyBpZGVudGlmaWVyXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgICBlbGVtZW50IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T3B0aW9uc30gICAgICAgICBvcHRpb25zICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gcGF0aCAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICAgc2VsZWN0ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICAgdG9TdHJpbmcgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgIHBhcmVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IGNoZWNrVGFnID0gKGVsZW1lbnQsIHBhdGgsIHsgaWdub3JlIH0sIHNlbGVjdCwgdG9TdHJpbmcsIHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSkgPT4ge1xuICBjb25zdCBwYXR0ZXJuID0gZmluZFRhZ1BhdHRlcm4oZWxlbWVudCwgaWdub3JlKVxuICBpZiAocGF0dGVybikge1xuICAgIGxldCBtYXRjaGVzID0gW11cbiAgICBtYXRjaGVzID0gc2VsZWN0KHRvU3RyaW5nLnBhdHRlcm4ocGF0dGVybiksIHBhcmVudClcbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHBhdGgudW5zaGlmdChwYXR0ZXJuKVxuICAgICAgaWYgKHBhdHRlcm4udGFnID09PSAnaWZyYW1lJykge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIExvb2t1cCB0YWcgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgIGlnbm9yZSAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtQYXR0ZXJuP30gICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3QgZmluZFRhZ1BhdHRlcm4gPSAoZWxlbWVudCwgaWdub3JlKSA9PiB7XG4gIGNvbnN0IHRhZ05hbWUgPSBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKVxuICBpZiAoY2hlY2tJZ25vcmUoaWdub3JlLnRhZywgbnVsbCwgdGFnTmFtZSkpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIGNvbnN0IHBhdHRlcm4gPSBjcmVhdGVQYXR0ZXJuKClcbiAgcGF0dGVybi50YWcgPSB0YWdOYW1lXG4gIHJldHVybiBwYXR0ZXJuXG59XG5cbi8qKlxuICogRXh0ZW5kIHBhdGggd2l0aCBzcGVjaWZpYyBjaGlsZCBpZGVudGlmaWVyXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgICBlbGVtZW50IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T3B0aW9uc30gICAgICAgICBvcHRpb25zIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSBwYXRoICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBjaGVja050aENoaWxkID0gKGVsZW1lbnQsIHBhdGgsIHsgaWdub3JlIH0pID0+IHtcbiAgY29uc3QgcGFyZW50ID0gZWxlbWVudC5wYXJlbnROb2RlXG4gIGNvbnN0IGNoaWxkcmVuID0gcGFyZW50LmNoaWxkcmVuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltpXVxuICAgIGlmIChjaGlsZCA9PT0gZWxlbWVudCkge1xuICAgICAgY29uc3QgY2hpbGRQYXR0ZXJuID0gZmluZFRhZ1BhdHRlcm4oY2hpbGQsIGlnbm9yZSlcbiAgICAgIGlmICghY2hpbGRQYXR0ZXJuKSB7XG4gICAgICAgIHJldHVybiBjb25zb2xlLndhcm4oYFxuICAgICAgICAgIEVsZW1lbnQgY291bGRuJ3QgYmUgbWF0Y2hlZCB0aHJvdWdoIHN0cmljdCBpZ25vcmUgcGF0dGVybiFcbiAgICAgICAgYCwgY2hpbGQsIGlnbm9yZSwgY2hpbGRQYXR0ZXJuKVxuICAgICAgfVxuICAgICAgY2hpbGRQYXR0ZXJuLnJlbGF0ZXMgPSAnY2hpbGQnXG4gICAgICBjaGlsZFBhdHRlcm4ucHNldWRvID0gW2BudGgtY2hpbGQoJHtpKzF9KWBdXG4gICAgICBwYXRoLnVuc2hpZnQoY2hpbGRQYXR0ZXJuKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qKlxuICogRXh0ZW5kIHBhdGggd2l0aCBjb250YWluc1xuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICAgZWxlbWVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59IHBhdGggICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T3B0aW9uc30gICAgICAgICBvcHRpb25zICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7Ym9vbGVhbn0gICAgICAgICBuZXN0ZWQgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IGNoZWNrVGV4dCA9IChlbGVtZW50LCBwYXRoLCB7IGlnbm9yZSB9LCBzZWxlY3QsIHRvU3RyaW5nLCBuZXN0ZWQpID0+IHtcbiAgY29uc3QgcGF0dGVybiA9IGZpbmRUYWdQYXR0ZXJuKGVsZW1lbnQsIGlnbm9yZSlcbiAgaWYgKCFwYXR0ZXJuKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgY29uc3QgdGV4dENvbnRlbnQgPSAobmVzdGVkID8gZWxlbWVudC50ZXh0Q29udGVudCA6IChlbGVtZW50LmZpcnN0Q2hpbGQgJiYgZWxlbWVudC5maXJzdENoaWxkLm5vZGVWYWx1ZSkgfHwgJycpXG4gIGlmICghdGV4dENvbnRlbnQpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHBhdHRlcm4ucmVsYXRlcyA9ICdjaGlsZCdcbiAgY29uc3QgcGFyZW50ID0gZWxlbWVudC5wYXJlbnROb2RlXG4gIGNvbnN0IHRleHRzID0gdGV4dENvbnRlbnRcbiAgICAucmVwbGFjZSgvXFxuKy9nLCAnXFxuJylcbiAgICAuc3BsaXQoJ1xcbicpXG4gICAgLm1hcCh0ZXh0ID0+IHRleHQudHJpbSgpKVxuICAgIC5maWx0ZXIodGV4dCA9PiB0ZXh0Lmxlbmd0aCA+IDApXG5cbiAgY29uc3QgY29udGFpbnMgPSBbXVxuXG4gIHdoaWxlICh0ZXh0cy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgdGV4dCA9IHRleHRzLnNoaWZ0KClcbiAgICBpZiAoY2hlY2tJZ25vcmUoaWdub3JlLmNvbnRhaW5zLCBudWxsLCB0ZXh0LCBkZWZhdWx0SWdub3JlLmNvbnRhaW5zKSkge1xuICAgICAgYnJlYWtcbiAgICB9XG4gICAgY29udGFpbnMucHVzaChgY29udGFpbnMoXCIke3RleHR9XCIpYClcbiAgXG4gICAgY29uc3QgbWF0Y2hlcyA9IHNlbGVjdCh0b1N0cmluZy5wYXR0ZXJuKHsgLi4ucGF0dGVybiwgcHNldWRvOiBjb250YWlucyB9KSwgcGFyZW50KVxuICAgIGlmIChtYXRjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcGF0dGVybi5wc2V1ZG8gPSBjb250YWluc1xuICAgICAgcGF0aC51bnNoaWZ0KHBhdHRlcm4pXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBFeHRlbmQgcGF0aCB3aXRoIGRlc2NlbmRhbnQgdGFnXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgICBlbGVtZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gcGF0aCAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPcHRpb25zfSAgICAgICAgIG9wdGlvbnMgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgICBzZWxlY3QgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICAgdG9TdHJpbmcgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBjaGVja1JlY3Vyc2l2ZURlc2NlbmRhbnRzID0gKGVsZW1lbnQsIHBhdGgsIG9wdGlvbnMsIHNlbGVjdCwgdG9TdHJpbmcpID0+IHtcbiAgY29uc3QgcGF0dGVybiA9IGZpbmRUYWdQYXR0ZXJuKGVsZW1lbnQsIG9wdGlvbnMuaWdub3JlKVxuICBpZiAoIXBhdHRlcm4pIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IGRlc2NlbmRhbnRzID0gQXJyYXkuZnJvbShlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKSlcbiAgd2hpbGUgKGRlc2NlbmRhbnRzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBkZXNjZW5kYW50UGF0aCA9IG1hdGNoKGRlc2NlbmRhbnRzLnNoaWZ0KCksIHsgLi4ub3B0aW9ucywgcm9vdDogZWxlbWVudCB9LCB0cnVlKVxuICAgIC8vIGF2b2lkIGRlc2NlbmRhbnQgc2VsZWN0b3JzIHdpdGggbnRoLWNoaWxkXG4gICAgaWYgKCFkZXNjZW5kYW50UGF0aC5zb21lKHBhdHRlcm4gPT4gcGF0dGVybi5wc2V1ZG8uc29tZShwID0+IHAuc3RhcnRzV2l0aCgnbnRoLWNoaWxkJykpKSkge1xuICAgICAgY29uc3QgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50XG4gICAgICBjb25zdCBtYXRjaGVzID0gc2VsZWN0KHRvU3RyaW5nLnBhdHRlcm4oeyAuLi5wYXR0ZXJuLCBkZXNjZW5kYW50czogW2Rlc2NlbmRhbnRQYXRoXSB9KSwgcGFyZW50KVxuICAgICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHBhdHRlcm4uZGVzY2VuZGFudHMgPSBbZGVzY2VuZGFudFBhdGhdXG4gICAgICAgIHBhdGgudW5zaGlmdChwYXR0ZXJuKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIExvb2t1cCBpZGVudGlmaWVyXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIGVsZW1lbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T3B0aW9uc30gICAgICAgIG9wdGlvbnMgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICBzZWxlY3QgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1BhdHRlcm59ICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3QgZmluZFBhdHRlcm4gPSAoZWxlbWVudCwgeyBwcmlvcml0eSwgaWdub3JlIH0sIHNlbGVjdCwgdG9TdHJpbmcpID0+IHtcbiAgdmFyIHBhdHRlcm4gPSBmaW5kQXR0cmlidXRlc1BhdHRlcm4ocHJpb3JpdHksIGVsZW1lbnQsIGlnbm9yZSwgc2VsZWN0LCB0b1N0cmluZylcbiAgaWYgKCFwYXR0ZXJuKSB7XG4gICAgcGF0dGVybiA9IGZpbmRUYWdQYXR0ZXJuKGVsZW1lbnQsIGlnbm9yZSlcbiAgfVxuICByZXR1cm4gcGF0dGVyblxufVxuXG4vKipcbiAqIFZhbGlkYXRlIHdpdGggY3VzdG9tIGFuZCBkZWZhdWx0IGZ1bmN0aW9uc1xuICpcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBwcmVkaWNhdGUgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7c3RyaW5nP30gIG5hbWUgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgdmFsdWUgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBkZWZhdWx0UHJlZGljYXRlIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IGNoZWNrSWdub3JlID0gKHByZWRpY2F0ZSwgbmFtZSwgdmFsdWUsIGRlZmF1bHRQcmVkaWNhdGUpID0+IHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgY29uc3QgY2hlY2sgPSBwcmVkaWNhdGUgfHwgZGVmYXVsdFByZWRpY2F0ZVxuICBpZiAoIWNoZWNrKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIGNoZWNrKG5hbWUsIHZhbHVlLCBkZWZhdWx0UHJlZGljYXRlKVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hdGNoLmpzIiwiaW1wb3J0IHsgaXNWYWxpZENTU0lkZW50aWZpZXIgfSBmcm9tICcuL3V0aWxpdGllcydcbi8qKlxuICogQHR5cGVkZWYgIHtPYmplY3R9IFBhdHRlcm5cbiAqIEBwcm9wZXJ0eSB7KCdkZXNjZW5kYW50JyB8ICdjaGlsZCcpfSAgICAgICAgICAgICAgICAgIFtyZWxhdGVzXVxuICogQHByb3BlcnR5IHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RhZ11cbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPHsgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nPyB9Pn0gIGF0dHJpYnV0ZXNcbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPHN0cmluZz59ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXNcbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPHN0cmluZz59ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBzZXVkb1xuICogQHByb3BlcnR5IHtBcnJheS48QXJyYXkuPFBhdHRlcm4+Pn0gICAgICAgICAgICAgICAgICAgZGVzY2VuZGFudHNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgcGF0dGVybiBzdHJ1Y3R1cmVcbiAqIFxuICogQHBhcmFtIHtQYXJ0aWFsPFBhdHRlcm4+fSBwYXR0ZXJuXG4gKiBAcmV0dXJucyB7UGF0dGVybn1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVBhdHRlcm4gPSAoYmFzZSA9IHt9KSA9PlxuICAoeyBhdHRyaWJ1dGVzOiBbXSwgY2xhc3NlczogW10sIHBzZXVkbzogW10sIGRlc2NlbmRhbnRzOiBbXSwgLi4uYmFzZSB9KVxuXG4vKipcbiAqIENvbnZlcnQgYXR0cmlidXRlcyB0byBDU1Mgc2VsZWN0b3JcbiAqIFxuICogQHBhcmFtIHtBcnJheS48eyBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmc/IH0+fSBhdHRyaWJ1dGVzIFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZXNUb1NlbGVjdG9yID0gKGF0dHJpYnV0ZXMpID0+XG4gIGF0dHJpYnV0ZXMubWFwKCh7IG5hbWUsIHZhbHVlIH0pID0+IHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBgWyR7bmFtZX1dYFxuICAgIH1cbiAgICBpZiAobmFtZSA9PT0gJ2lkJyAmJiBpc1ZhbGlkQ1NTSWRlbnRpZmllcih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBgIyR7dmFsdWV9YFxuICAgIH1cbiAgICByZXR1cm4gYFske25hbWV9PVwiJHt2YWx1ZX1cIl1gXG4gIH0pLmpvaW4oJycpXG5cbi8qKlxuICogQ29udmVydCBjbGFzc2VzIHRvIENTUyBzZWxlY3RvclxuICogXG4gKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fSBjbGFzc2VzIFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGNsYXNzZXNUb1NlbGVjdG9yID0gKGNsYXNzZXMpID0+XG4gIGNsYXNzZXMubWFwKGMgPT4gaXNWYWxpZENTU0lkZW50aWZpZXIoYykgPyBgLiR7Y31gIDogYFtjbGFzc349XCIke2N9XCJdYCkuam9pbignJylcblxuLyoqXG4gKiBDb252ZXJ0IHBzZXVkbyBzZWxlY3RvcnMgdG8gQ1NTIHNlbGVjdG9yXG4gKiBcbiAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IHBzZXVkbyBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBwc2V1ZG9Ub1NlbGVjdG9yID0gKHBzZXVkbykgPT4gcHNldWRvLmxlbmd0aCA/IGA6JHtwc2V1ZG8uam9pbignOicpfWAgOiAnJ1xuXG4vKipcbiAqIENvbnZlcnQgcGF0dGVybiB0byBDU1Mgc2VsZWN0b3JcbiAqIFxuICogQHBhcmFtIHtQYXR0ZXJufSBwYXR0ZXJuIFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IHBhdHRlcm5Ub1NlbGVjdG9yID0gKHBhdHRlcm4pID0+IHtcbiAgY29uc3QgeyByZWxhdGVzLCB0YWcsIGF0dHJpYnV0ZXMsIGNsYXNzZXMsIHBzZXVkbyB9ID0gcGF0dGVyblxuICBjb25zdCB2YWx1ZSA9IGAke1xuICAgIHJlbGF0ZXMgPT09ICdjaGlsZCcgPyAnPiAnIDogJydcbiAgfSR7XG4gICAgdGFnIHx8ICcnXG4gIH0ke1xuICAgIGF0dHJpYnV0ZXNUb1NlbGVjdG9yKGF0dHJpYnV0ZXMpXG4gIH0ke1xuICAgIGNsYXNzZXNUb1NlbGVjdG9yKGNsYXNzZXMpXG4gIH0ke1xuICAgIHBzZXVkb1RvU2VsZWN0b3IocHNldWRvKVxuICB9YFxuICByZXR1cm4gdmFsdWVcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBwYXRoIHRvIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7QXJyYXkuPFBhdHRlcm4+fSBwYXRoIFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IHBhdGhUb1NlbGVjdG9yID0gKHBhdGgpID0+XG4gIHBhdGgubWFwKHBhdHRlcm5Ub1NlbGVjdG9yKS5qb2luKCcgJylcblxuXG5jb25zdCBjb252ZXJ0RXNjYXBpbmcgPSAodmFsdWUpID0+XG4gIHZhbHVlICYmIHZhbHVlLnJlcGxhY2UoL1xcXFwoW2BcXFxcLzo/JiEjJCVeKClbXFxde3x9Kis7LC48PT5Afl0pL2csICckMScpXG4gICAgLnJlcGxhY2UoL1xcXFwoWydcIl0pL2csICckMSQxJylcbiAgICAucmVwbGFjZSgvXFxcXEEgL2csICdcXG4nKVxuXG4vKipcbiogQ29udmVydCBhdHRyaWJ1dGVzIHRvIFhQYXRoIHN0cmluZ1xuKiBcbiogQHBhcmFtIHtBcnJheS48eyBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmc/IH0+fSBhdHRyaWJ1dGVzIFxuKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmV4cG9ydCBjb25zdCBhdHRyaWJ1dGVzVG9YUGF0aCA9IChhdHRyaWJ1dGVzKSA9PlxuICBhdHRyaWJ1dGVzLm1hcCgoeyBuYW1lLCB2YWx1ZSB9KSA9PiB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gYFtAJHtuYW1lfV1gXG4gICAgfVxuICAgIHJldHVybiBgW0Ake25hbWV9PVwiJHtjb252ZXJ0RXNjYXBpbmcodmFsdWUpfVwiXWBcbiAgfSkuam9pbignJylcblxuLyoqXG4qIENvbnZlcnQgY2xhc3NlcyB0byBYUGF0aCBzdHJpbmdcbiogXG4qIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IGNsYXNzZXMgXG4qIEByZXR1cm5zIHtzdHJpbmd9XG4qL1xuZXhwb3J0IGNvbnN0IGNsYXNzZXNUb1hQYXRoID0gKGNsYXNzZXMpID0+XG4gIGNsYXNzZXMubWFwKGMgPT4gYFtjb250YWlucyhjb25jYXQoXCIgXCIsbm9ybWFsaXplLXNwYWNlKEBjbGFzcyksXCIgXCIpLFwiICR7Y30gXCIpXWApLmpvaW4oJycpXG5cbi8qKlxuKiBDb252ZXJ0IHBzZXVkbyBzZWxlY3RvcnMgdG8gWFBhdGggc3RyaW5nXG4qIFxuKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fSBwc2V1ZG8gXG4qIEByZXR1cm5zIHtzdHJpbmd9XG4qL1xuZXhwb3J0IGNvbnN0IHBzZXVkb1RvWFBhdGggPSAocHNldWRvKSA9PlxuICBwc2V1ZG8ubWFwKHAgPT4ge1xuICAgIGNvbnN0IG1hdGNoID0gcC5tYXRjaCgvXihudGgtY2hpbGR8bnRoLW9mLXR5cGV8Y29udGFpbnMpXFwoKC4rKVxcKSQvKVxuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cblxuICAgIHN3aXRjaCAobWF0Y2hbMV0pIHtcbiAgICAgIGNhc2UgJ250aC1jaGlsZCc6XG4gICAgICAgIHJldHVybiBgWyhjb3VudChwcmVjZWRpbmctc2libGluZzo6KikrMSkgPSAke21hdGNoWzJdfV1gXG5cbiAgICAgIGNhc2UgJ250aC1vZi10eXBlJzpcbiAgICAgICAgcmV0dXJuIGBbJHttYXRjaFsyXX1dYFxuXG4gICAgICBjYXNlICdjb250YWlucyc6XG4gICAgICAgIHJldHVybiBgW2NvbnRhaW5zKHRleHQoKSwke21hdGNoWzJdfSldYFxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJydcbiAgICB9XG4gIH0pLmpvaW4oJycpXG5cbi8qKlxuKiBDb252ZXJ0IHBhdHRlcm4gdG8gWFBhdGggc3RyaW5nXG4qIFxuKiBAcGFyYW0ge1BhdHRlcm59IHBhdHRlcm4gXG4qIEByZXR1cm5zIHtzdHJpbmd9XG4qL1xuZXhwb3J0IGNvbnN0IHBhdHRlcm5Ub1hQYXRoID0gKHBhdHRlcm4pID0+IHtcbiAgY29uc3QgeyByZWxhdGVzLCB0YWcsIGF0dHJpYnV0ZXMsIGNsYXNzZXMsIHBzZXVkbywgZGVzY2VuZGFudHMgfSA9IHBhdHRlcm5cbiAgY29uc3QgdmFsdWUgPSBgJHtcbiAgICByZWxhdGVzID09PSAnY2hpbGQnID8gJy8nIDogJy8vJ1xuICB9JHtcbiAgICB0YWcgfHwgJyonXG4gIH0ke1xuICAgIGF0dHJpYnV0ZXNUb1hQYXRoKGF0dHJpYnV0ZXMpXG4gIH0ke1xuICAgIGNsYXNzZXNUb1hQYXRoKGNsYXNzZXMpXG4gIH0ke1xuICAgIHBzZXVkb1RvWFBhdGgocHNldWRvKVxuICB9JHtcbiAgICBkZXNjZW5kYW50c1RvWFBhdGgoZGVzY2VuZGFudHMpXG4gIH1gXG4gIHJldHVybiB2YWx1ZVxufVxuXG4vKipcbiogQ29udmVydHMgcGF0aCB0byBYUGF0aCBzdHJpbmdcbipcbiogQHBhcmFtIHtBcnJheS48UGF0dGVybj59IHBhdGggXG4qIEByZXR1cm5zIHtzdHJpbmd9XG4qL1xuZXhwb3J0IGNvbnN0IHBhdGhUb1hQYXRoID0gKHBhdGgpID0+IGAuJHtwYXRoLm1hcChwYXR0ZXJuVG9YUGF0aCkuam9pbignJyl9YFxuXG4vKipcbiogQ29udmVydCBjaGlsZCBzZWxlY3RvcnMgdG8gWFBhdGggc3RyaW5nXG4qIFxuKiBAcGFyYW0ge0FycmF5LjxBcnJheS48UGF0dGVybj4+fSBjaGlsZHJlbiBcbiogQHJldHVybnMge3N0cmluZ31cbiovXG5leHBvcnQgY29uc3QgZGVzY2VuZGFudHNUb1hQYXRoID0gKGNoaWxkcmVuKSA9PlxuICBjaGlsZHJlbi5sZW5ndGggPyBgWyR7Y2hpbGRyZW4ubWFwKHBhdGhUb1hQYXRoKS5qb2luKCddWycpfV1gIDogJydcblxuICBcbmNvbnN0IHRvU3RyaW5nID0ge1xuICAnY3NzJzoge1xuICAgIGF0dHJpYnV0ZXM6IGF0dHJpYnV0ZXNUb1NlbGVjdG9yLFxuICAgIGNsYXNzZXM6IGNsYXNzZXNUb1NlbGVjdG9yLFxuICAgIHBzZXVkbzogcHNldWRvVG9TZWxlY3RvcixcbiAgICBwYXR0ZXJuOiBwYXR0ZXJuVG9TZWxlY3RvcixcbiAgICBwYXRoOiBwYXRoVG9TZWxlY3RvclxuICB9LFxuICAneHBhdGgnOiB7XG4gICAgYXR0cmlidXRlczogYXR0cmlidXRlc1RvWFBhdGgsXG4gICAgY2xhc3NlczogY2xhc3Nlc1RvWFBhdGgsXG4gICAgcHNldWRvOiBwc2V1ZG9Ub1hQYXRoLFxuICAgIHBhdHRlcm46IHBhdHRlcm5Ub1hQYXRoLFxuICAgIHBhdGg6IHBhdGhUb1hQYXRoXG4gIH0sXG4gICdqcXVlcnknOiB7fVxufVxuXG50b1N0cmluZy5qcXVlcnkgPSB0b1N0cmluZy5jc3NcbnRvU3RyaW5nWzBdID0gdG9TdHJpbmcuY3NzXG50b1N0cmluZ1sxXSA9IHRvU3RyaW5nLnhwYXRoXG4gIFxuLyoqXG4gKiBAdHlwZWRlZiAge09iamVjdH0gVG9TdHJpbmdBcGlcbiAqIEBwcm9wZXJ0eSB7KGF0dHJpYnV0ZXM6IEFycmF5Ljx7IG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZz8gfT4pID0+IHN0cmluZ30gYXR0cmlidXRlc1xuICogQHByb3BlcnR5IHsoY2xhc3NlczogQXJyYXkuPHN0cmluZz4pID0+IHN0cmluZ30gIGNsYXNzZXNcbiAqIEBwcm9wZXJ0eSB7KHBzZXVkbzogQXJyYXkuPHN0cmluZz4pID0+IHN0cmluZ30gICBwc2V1ZG9cbiAqIEBwcm9wZXJ0eSB7KHBhdHRlcm46IFBhdHRlcm4pID0+IHN0cmluZ30gICAgICAgICBwYXR0ZXJuXG4gKiBAcHJvcGVydHkgeyhwYXRoOiBBcnJheS48UGF0dGVybj4pID0+IHN0cmluZ30gICAgcGF0aFxuICovXG5cbi8qKlxuICogXG4gKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnMgXG4gKiBAcmV0dXJucyB7VG9TdHJpbmdBcGl9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRUb1N0cmluZyA9IChvcHRpb25zID0ge30pID0+XG4gIHRvU3RyaW5nW29wdGlvbnMuZm9ybWF0IHx8ICdjc3MnXVxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXR0ZXJuLmpzIiwiLy8gaW1wb3J0IFNpenpsZSBmcm9tICdzaXp6bGUnXG5sZXQgU2l6emxlXG5cbi8qKlxuICogU2VsZWN0IGVsZW1lbnQgdXNpbmcgalF1ZXJ5XG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgc2VsZWN0b3JcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBwYXJlbnRcbiAqIEByZXR1cm4gQXJyYXkuPEhUTUxFbGVtZW50PlxuICovXG5jb25zdCBzZWxlY3RKUXVlcnkgPSAoc2VsZWN0b3IsIHBhcmVudCA9IG51bGwpID0+IHtcbiAgaWYgKCFTaXp6bGUpIHtcbiAgICBTaXp6bGUgPSByZXF1aXJlKCdzaXp6bGUnKVxuICB9XG4gIHJldHVybiBTaXp6bGUoc2VsZWN0b3IsIHBhcmVudCB8fCBkb2N1bWVudClcbn1cbiAgXG4vKipcbiAqIFNlbGVjdCBlbGVtZW50IHVzaW5nIFhQYXRoXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgc2VsZWN0b3JcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBwYXJlbnRcbiAqIEByZXR1cm4gQXJyYXkuPEhUTUxFbGVtZW50PlxuICovXG5jb25zdCBzZWxlY3RYUGF0aCA9IChzZWxlY3RvciwgcGFyZW50ID0gbnVsbCkgPT4ge1xuICBwYXJlbnQgPSAocGFyZW50IHx8IGRvY3VtZW50KVxuICB2YXIgZG9jID0gcGFyZW50XG4gIHdoaWxlIChkb2MucGFyZW50Tm9kZSkge1xuICAgIGRvYyA9IGRvYy5wYXJlbnROb2RlXG4gIH1cbiAgaWYgKGRvYyAhPT0gcGFyZW50ICYmICFzZWxlY3Rvci5zdGFydHNXaXRoKCcuJykpIHtcbiAgICBzZWxlY3RvciA9IGAuJHtzZWxlY3Rvcn1gXG4gIH1cbiAgdmFyIGl0ZXJhdG9yID0gZG9jLmV2YWx1YXRlKHNlbGVjdG9yLCBwYXJlbnQsIG51bGwsIDApXG4gIHZhciBlbGVtZW50cyA9IFtdXG4gIHZhciBlbGVtZW50XG4gIHdoaWxlICgoZWxlbWVudCA9IGl0ZXJhdG9yLml0ZXJhdGVOZXh0KCkpKSB7XG4gICAgZWxlbWVudHMucHVzaChlbGVtZW50KVxuICB9XG4gIHJldHVybiBlbGVtZW50c1xufVxuICBcbi8qKlxuICogU2VsZWN0IGVsZW1lbnQgdXNpbmcgQ1NTXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgc2VsZWN0b3JcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBwYXJlbnRcbiAqIEByZXR1cm4gQXJyYXkuPEhUTUxFbGVtZW50PlxuICovXG5jb25zdCBzZWxlY3RDU1MgPSAoc2VsZWN0b3IsIHBhcmVudCA9IG51bGwpID0+XG4gIChwYXJlbnQgfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG5cbmNvbnN0IHNlbGVjdCA9IHtcbiAgJ2Nzcyc6IHNlbGVjdENTUyxcbiAgJ3hwYXRoJzogc2VsZWN0WFBhdGgsXG4gICdqcXVlcnknOiBzZWxlY3RKUXVlcnlcbn1cblxuc2VsZWN0WzBdID0gc2VsZWN0LmNzc1xuc2VsZWN0WzFdID0gc2VsZWN0LnhwYXRoXG5cbi8qKlxuKiBcbiogQHBhcmFtIHtPcHRpb25zfSBvcHRpb25zIFxuKiBAcmV0dXJucyB7KHNlbGVjdG9yOiBzdHJpbmcsIHBhcmVudDogSFRNTEVsZW1lbnQpID0+IEFycmF5LjxIVE1MRWxlbWVudD59XG4qL1xuZXhwb3J0IGNvbnN0IGdldFNlbGVjdCA9IChvcHRpb25zID0ge30pID0+XG4gIChzZWxlY3RvciwgcGFyZW50KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBzZWxlY3Rbb3B0aW9ucy5mb3JtYXQgfHwgJ2NzcyddKHNlbGVjdG9yLCBwYXJlbnQgfHwgb3B0aW9ucy5yb290KVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIFtdXG4gICAgfVxuICB9XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZWxlY3Rvci5qcyIsIi8qKlxuICogIyBDb21tb25cbiAqXG4gKiBQcm9jZXNzIGNvbGxlY3Rpb25zIGZvciBzaW1pbGFyaXRpZXMuXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3NlbGVjdCcpLk9wdGlvbnN9IE9wdGlvbnNcbiAqL1xuXG4vKipcbiAqIEZpbmQgdGhlIGxhc3QgY29tbW9uIGFuY2VzdG9yIG9mIGVsZW1lbnRzXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T3B0aW9uc30gICAgICAgICAgICAgIG9wdGlvbnMgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9ICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5pbXBvcnQgeyBkZWZhdWx0SWdub3JlLCBjaGVja0lnbm9yZSwgZXNjYXBlVmFsdWUgfSBmcm9tICcuL21hdGNoJ1xuZXhwb3J0IGNvbnN0IGdldENvbW1vbkFuY2VzdG9yID0gKGVsZW1lbnRzLCBvcHRpb25zID0ge30pID0+IHtcblxuICBjb25zdCB7XG4gICAgcm9vdCA9IGRvY3VtZW50XG4gIH0gPSBvcHRpb25zXG5cbiAgY29uc3QgYW5jZXN0b3JzID0gW11cblxuICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHBhcmVudHMgPSBbXVxuICAgIHdoaWxlIChlbGVtZW50ICE9PSByb290KSB7XG4gICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlXG4gICAgICBwYXJlbnRzLnVuc2hpZnQoZWxlbWVudClcbiAgICB9XG4gICAgYW5jZXN0b3JzW2luZGV4XSA9IHBhcmVudHNcbiAgfSlcblxuICBhbmNlc3RvcnMuc29ydCgoY3VyciwgbmV4dCkgPT4gY3Vyci5sZW5ndGggLSBuZXh0Lmxlbmd0aClcblxuICBjb25zdCBzaGFsbG93QW5jZXN0b3IgPSBhbmNlc3RvcnMuc2hpZnQoKVxuXG4gIHZhciBhbmNlc3RvciA9IG51bGxcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IHNoYWxsb3dBbmNlc3Rvci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCBwYXJlbnQgPSBzaGFsbG93QW5jZXN0b3JbaV1cbiAgICBjb25zdCBtaXNzaW5nID0gYW5jZXN0b3JzLnNvbWUoKG90aGVyUGFyZW50cykgPT4ge1xuICAgICAgcmV0dXJuICFvdGhlclBhcmVudHMuc29tZSgob3RoZXJQYXJlbnQpID0+IG90aGVyUGFyZW50ID09PSBwYXJlbnQpXG4gICAgfSlcblxuICAgIGlmIChtaXNzaW5nKSB7XG4gICAgICAvLyBUT0RPOiBmaW5kIHNpbWlsYXIgc3ViLXBhcmVudHMsIG5vdCB0aGUgdG9wIHJvb3QsIGUuZy4gc2hhcmluZyBhIGNsYXNzIHNlbGVjdG9yXG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGFuY2VzdG9yID0gcGFyZW50XG4gIH1cblxuICByZXR1cm4gYW5jZXN0b3Jcbn1cblxuLyoqXG4gKiBHZXQgYSBzZXQgb2YgY29tbW9uIHByb3BlcnRpZXMgb2YgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgY29uc3QgZ2V0Q29tbW9uUHJvcGVydGllcyA9IChlbGVtZW50cywgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGNvbnN0IHsgaWdub3JlID0ge30gfSA9IG9wdGlvbnNcblxuICBjb25zdCBjb21tb25Qcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzZXM6IFtdLFxuICAgIGF0dHJpYnV0ZXM6IHt9LFxuICAgIHRhZzogbnVsbFxuICB9XG5cbiAgZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXG4gICAgdmFyIHtcbiAgICAgIGNsYXNzZXM6IGNvbW1vbkNsYXNzZXMsXG4gICAgICBhdHRyaWJ1dGVzOiBjb21tb25BdHRyaWJ1dGVzLFxuICAgICAgdGFnOiBjb21tb25UYWdcbiAgICB9ID0gY29tbW9uUHJvcGVydGllc1xuXG4gICAgLy8gfiBjbGFzc2VzXG4gICAgaWYgKGNvbW1vbkNsYXNzZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnY2xhc3MnKVxuICAgICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMudHJpbSgpLnNwbGl0KCcgJykuZmlsdGVyKGNscyA9PiAhaWdub3JlLmNsYXNzIHx8ICFpZ25vcmUuY2xhc3MoY2xzKSlcbiAgICAgICAgaWYgKCFjb21tb25DbGFzc2VzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbW1vblByb3BlcnRpZXMuY2xhc3NlcyA9IGNsYXNzZXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21tb25DbGFzc2VzID0gY29tbW9uQ2xhc3Nlcy5maWx0ZXIoKGVudHJ5KSA9PiBjbGFzc2VzLnNvbWUoKG5hbWUpID0+IG5hbWUgPT09IGVudHJ5KSlcbiAgICAgICAgICBpZiAoY29tbW9uQ2xhc3Nlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbW1vblByb3BlcnRpZXMuY2xhc3NlcyA9IGNvbW1vbkNsYXNzZXNcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIGNvbW1vblByb3BlcnRpZXMuY2xhc3Nlc1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIGNvbW1vblByb3BlcnRpZXMuY2xhc3Nlc1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIH4gYXR0cmlidXRlc1xuICAgIGlmIChjb21tb25BdHRyaWJ1dGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnRBdHRyaWJ1dGVzID0gZWxlbWVudC5hdHRyaWJ1dGVzXG4gICAgICBjb25zdCBhdHRyaWJ1dGVzID0gT2JqZWN0LmtleXMoZWxlbWVudEF0dHJpYnV0ZXMpLnJlZHVjZSgoYXR0cmlidXRlcywga2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGVsZW1lbnRBdHRyaWJ1dGVzW2tleV1cbiAgICAgICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGVzY2FwZVZhbHVlKGF0dHJpYnV0ZSAmJiBhdHRyaWJ1dGUubmFtZSlcbiAgICAgICAgY29uc3QgYXR0cmlidXRlVmFsdWUgPSBlc2NhcGVWYWx1ZShhdHRyaWJ1dGUgJiYgYXR0cmlidXRlLnZhbHVlKVxuICAgICAgICBjb25zdCB1c2VOYW1lZElnbm9yZSA9IGF0dHJpYnV0ZU5hbWUgIT09ICdjbGFzcydcbiAgICAgICAgY29uc3QgY3VycmVudElnbm9yZSA9ICh1c2VOYW1lZElnbm9yZSAmJiBpZ25vcmVbYXR0cmlidXRlTmFtZV0pIHx8IGlnbm9yZS5hdHRyaWJ1dGVcbiAgICAgICAgY29uc3QgY3VycmVudERlZmF1bHRJZ25vcmUgPSAodXNlTmFtZWRJZ25vcmUgJiYgZGVmYXVsdElnbm9yZVthdHRyaWJ1dGVOYW1lXSkgfHwgZGVmYXVsdElnbm9yZS5hdHRyaWJ1dGVcbiAgICAgICAgaWYgKGF0dHJpYnV0ZSAmJiBhdHRyaWJ1dGVOYW1lICE9PSAnY2xhc3MnICYmICFjaGVja0lnbm9yZShjdXJyZW50SWdub3JlLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSwgY3VycmVudERlZmF1bHRJZ25vcmUpKSB7XG4gICAgICAgICAgYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSA9IGF0dHJpYnV0ZS52YWx1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhdHRyaWJ1dGVzXG4gICAgICB9LCB7fSlcblxuICAgICAgY29uc3QgYXR0cmlidXRlc05hbWVzID0gT2JqZWN0LmtleXMoYXR0cmlidXRlcylcbiAgICAgIGNvbnN0IGNvbW1vbkF0dHJpYnV0ZXNOYW1lcyA9IE9iamVjdC5rZXlzKGNvbW1vbkF0dHJpYnV0ZXMpXG5cbiAgICAgIGlmIChhdHRyaWJ1dGVzTmFtZXMubGVuZ3RoKSB7XG4gICAgICAgIGlmICghY29tbW9uQXR0cmlidXRlc05hbWVzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbW1vblByb3BlcnRpZXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21tb25BdHRyaWJ1dGVzID0gY29tbW9uQXR0cmlidXRlc05hbWVzLnJlZHVjZSgobmV4dENvbW1vbkF0dHJpYnV0ZXMsIG5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY29tbW9uQXR0cmlidXRlc1tuYW1lXVxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBhdHRyaWJ1dGVzW25hbWVdKSB7XG4gICAgICAgICAgICAgIG5leHRDb21tb25BdHRyaWJ1dGVzW25hbWVdID0gdmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXh0Q29tbW9uQXR0cmlidXRlc1xuICAgICAgICAgIH0sIHt9KVxuICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhjb21tb25BdHRyaWJ1dGVzKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbW1vblByb3BlcnRpZXMuYXR0cmlidXRlcyA9IGNvbW1vbkF0dHJpYnV0ZXNcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIGNvbW1vblByb3BlcnRpZXMuYXR0cmlidXRlc1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIGNvbW1vblByb3BlcnRpZXMuYXR0cmlidXRlc1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIH4gdGFnXG4gICAgaWYgKGNvbW1vblRhZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCB0YWcgPSBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKVxuICAgICAgaWYgKCFjb21tb25UYWcpIHtcbiAgICAgICAgY29tbW9uUHJvcGVydGllcy50YWcgPSB0YWdcbiAgICAgIH0gZWxzZSBpZiAodGFnICE9PSBjb21tb25UYWcpIHtcbiAgICAgICAgZGVsZXRlIGNvbW1vblByb3BlcnRpZXMudGFnXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBjb21tb25Qcm9wZXJ0aWVzXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uLmpzIiwiLyoqXG4gKiAjIE9wdGltaXplXG4gKlxuICogMS4pIEltcHJvdmUgZWZmaWNpZW5jeSB0aHJvdWdoIHNob3J0ZXIgc2VsZWN0b3JzIGJ5IHJlbW92aW5nIHJlZHVuZGFuY3lcbiAqIDIuKSBJbXByb3ZlIHJvYnVzdG5lc3MgdGhyb3VnaCBzZWxlY3RvciB0cmFuc2Zvcm1hdGlvblxuICovXG5cbmltcG9ydCB7IGdldFNlbGVjdCB9IGZyb20gJy4vc2VsZWN0b3InXG5pbXBvcnQgeyBjcmVhdGVQYXR0ZXJuLCBnZXRUb1N0cmluZyB9IGZyb20gJy4vcGF0dGVybidcbmltcG9ydCB7IGNvbnZlcnROb2RlTGlzdCwgcGFydGl0aW9uIH0gZnJvbSAnLi91dGlsaXRpZXMnXG5cbi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnLi9zZWxlY3QnKS5PcHRpb25zfSBPcHRpb25zXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3BhdHRlcm4nKS5QYXR0ZXJufSBQYXR0ZXJuXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3BhdHRlcm4nKS5Ub1N0cmluZ0FwaX0gUGF0dGVyblxuICovXG5cbi8qKlxuICogQXBwbHkgZGlmZmVyZW50IG9wdGltaXphdGlvbiB0ZWNobmlxdWVzXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgICAgICAgICAgICAgcGF0aCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR8QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudCAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICAgICAgICAgICAgICAgICAgIFtvcHRpb25zXSAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtBcnJheS48UGF0dGVybj59ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvcHRpbWl6ZSAocGF0aCwgZWxlbWVudHMsIG9wdGlvbnMgPSB7fSkge1xuICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW11cbiAgfVxuXG4gIGlmIChwYXRoWzBdLnJlbGF0ZXMgPT09ICdjaGlsZCcpIHtcbiAgICBwYXRoWzBdLnJlbGF0ZXMgPSB1bmRlZmluZWRcbiAgfVxuXG4gIC8vIGNvbnZlcnQgc2luZ2xlIGVudHJ5IGFuZCBOb2RlTGlzdFxuICBpZiAoIUFycmF5LmlzQXJyYXkoZWxlbWVudHMpKSB7XG4gICAgZWxlbWVudHMgPSAhZWxlbWVudHMubGVuZ3RoID8gW2VsZW1lbnRzXSA6IGNvbnZlcnROb2RlTGlzdChlbGVtZW50cylcbiAgfVxuXG4gIGlmICghZWxlbWVudHMubGVuZ3RoIHx8IGVsZW1lbnRzLnNvbWUoKGVsZW1lbnQpID0+IGVsZW1lbnQubm9kZVR5cGUgIT09IDEpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGlucHV0IC0gdG8gY29tcGFyZSBIVE1MRWxlbWVudHMgaXRzIG5lY2Vzc2FyeSB0byBwcm92aWRlIGEgcmVmZXJlbmNlIG9mIHRoZSBzZWxlY3RlZCBub2RlKHMpISAobWlzc2luZyBcImVsZW1lbnRzXCIpJylcbiAgfVxuXG4gIGNvbnN0IHNlbGVjdCA9IGdldFNlbGVjdChvcHRpb25zKVxuICBjb25zdCB0b1N0cmluZyA9IGdldFRvU3RyaW5nKG9wdGlvbnMpXG5cbiAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIFtvcHRpbWl6ZVBhcnQoW10sIHBhdGhbMF0sIFtdLCBlbGVtZW50cywgc2VsZWN0LCB0b1N0cmluZyldXG4gIH1cblxuICB2YXIgZW5kT3B0aW1pemVkID0gZmFsc2VcbiAgaWYgKHBhdGhbcGF0aC5sZW5ndGgtMV0ucmVsYXRlcyA9PT0gJ2NoaWxkJykge1xuICAgIHBhdGhbcGF0aC5sZW5ndGgtMV0gPSBvcHRpbWl6ZVBhcnQocGF0aC5zbGljZSgwLCAtMSksIHBhdGhbcGF0aC5sZW5ndGgtMV0sIFtdLCBlbGVtZW50cywgc2VsZWN0LCB0b1N0cmluZylcbiAgICBlbmRPcHRpbWl6ZWQgPSB0cnVlXG4gIH1cblxuICBwYXRoID0gWy4uLnBhdGhdXG4gIGNvbnN0IHNob3J0ZW5lZCA9IFtwYXRoLnBvcCgpXVxuICB3aGlsZSAocGF0aC5sZW5ndGggPiAxKSB7XG4gICAgY29uc3QgY3VycmVudCA9IHBhdGgucG9wKClcbiAgICBjb25zdCBtYXRjaGVzID0gc2VsZWN0KHRvU3RyaW5nLnBhdGgoWy4uLnBhdGgsIC4uLnNob3J0ZW5lZF0pKVxuICAgIGNvbnN0IGhhc1NhbWVSZXN1bHQgPSBtYXRjaGVzLmxlbmd0aCA9PT0gZWxlbWVudHMubGVuZ3RoICYmIGVsZW1lbnRzLmV2ZXJ5KChlbGVtZW50LCBpKSA9PiBlbGVtZW50ID09PSBtYXRjaGVzW2ldKVxuICAgIGlmICghaGFzU2FtZVJlc3VsdCkge1xuICAgICAgc2hvcnRlbmVkLnVuc2hpZnQob3B0aW1pemVQYXJ0KHBhdGgsIGN1cnJlbnQsIHNob3J0ZW5lZCwgZWxlbWVudHMsIHNlbGVjdCwgdG9TdHJpbmcpKVxuICAgIH1cbiAgfVxuICBzaG9ydGVuZWQudW5zaGlmdChwYXRoWzBdKVxuICBwYXRoID0gc2hvcnRlbmVkXG5cbiAgLy8gb3B0aW1pemUgc3RhcnQgKyBlbmRcbiAgcGF0aFswXSA9IG9wdGltaXplUGFydChbXSwgcGF0aFswXSwgcGF0aC5zbGljZSgxKSwgZWxlbWVudHMsIHNlbGVjdCwgdG9TdHJpbmcpXG4gIGlmICghZW5kT3B0aW1pemVkKSB7XG4gICAgcGF0aFtwYXRoLmxlbmd0aC0xXSA9IG9wdGltaXplUGFydChwYXRoLnNsaWNlKDAsIC0xKSwgcGF0aFtwYXRoLmxlbmd0aC0xXSwgW10sIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKVxuICB9XG5cbiAgcmV0dXJuIHBhdGhcbn1cblxuLyoqXG4gKiBPcHRpbWl6ZSA6Y29udGFpbnNcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwcmUgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1BhdHRlcm59ICAgICAgICAgICAgIGN1cnJlbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgcG9zdCAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICAgICAgIHNlbGVjdCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7VG9TdHJpbmdBcGl9ICAgICAgICAgdG9TdHJpbmcgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtQYXR0ZXJufSAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3Qgb3B0aW1pemVUZXh0ID0gKHByZSwgY3VycmVudCwgcG9zdCwgZWxlbWVudHMsIHNlbGVjdCwgdG9TdHJpbmcpID0+IHtcbiAgY29uc3QgW2NvbnRhaW5zLCBvdGhlcl0gPSBwYXJ0aXRpb24oY3VycmVudC5wc2V1ZG8sIChpdGVtKSA9PiBpdGVtLnN0YXJ0c1dpdGgoJ2NvbnRhaW5zJykpXG5cbiAgaWYgKGNvbnRhaW5zLmxlbmd0aCA+IDAgJiYgcG9zdC5sZW5ndGgpIHtcbiAgICBjb25zdCBiYXNlID0geyAuLi5jdXJyZW50LCBwc2V1ZG86IFsuLi5vdGhlciwgLi4uY29udGFpbnNdIH1cbiAgICB3aGlsZSAoYmFzZS5wc2V1ZG8ubGVuZ3RoID4gb3RoZXIubGVuZ3RoKSB7XG4gICAgICBjb25zdCBvcHRpbWl6ZWQgPSBiYXNlLnBzZXVkby5zbGljZSgwLCAtMSlcbiAgICAgIGlmICghY29tcGFyZVJlc3VsdHMoc2VsZWN0KHRvU3RyaW5nLnBhdGgoWy4uLnByZSwgeyAuLi5iYXNlLCBwc2V1ZG86IG9wdGltaXplZCB9LCAuLi5wb3N0XSkpLCBlbGVtZW50cykpIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGJhc2UucHNldWRvID0gb3B0aW1pemVkXG4gICAgfVxuICAgIHJldHVybiBiYXNlXG4gIH1cbiAgcmV0dXJuIGN1cnJlbnRcbn1cblxuLyoqXG4gKiBPcHRpbWl6ZSBhdHRyaWJ1dGVzXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgcHJlICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtQYXR0ZXJufSAgICAgICAgICAgICBjdXJyZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHBvc3QgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgICAgICBzZWxlY3QgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICAgICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7UGF0dGVybn0gICAgICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IG9wdGltaXplQXR0cmlidXRlcyA9IChwcmUsIGN1cnJlbnQsIHBvc3QsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIC8vIHJlZHVjZSBhdHRyaWJ1dGVzOiBmaXJzdCB0cnkgd2l0aG91dCB2YWx1ZSwgdGhlbiByZW1vdmluZyBjb21wbGV0ZWx5XG4gIGlmIChjdXJyZW50LmF0dHJpYnV0ZXMubGVuZ3RoID4gMCkge1xuICAgIGxldCBhdHRyaWJ1dGVzID0gWy4uLmN1cnJlbnQuYXR0cmlidXRlc11cblxuICAgIGNvbnN0IHNpbXBsaWZ5ID0gKG9yaWdpbmFsLCBnZXRTaW1wbGlmaWVkKSA9PiB7XG4gICAgICBsZXQgaSA9IG9yaWdpbmFsLmxlbmd0aCAtIDFcbiAgICAgIHdoaWxlIChpID49IDApIHtcbiAgICAgICAgbGV0IGF0dHJpYnV0ZXMgPSBnZXRTaW1wbGlmaWVkKG9yaWdpbmFsLCBpKVxuICAgICAgICBpZiAoIWNvbXBhcmVSZXN1bHRzKFxuICAgICAgICAgIHNlbGVjdCh0b1N0cmluZy5wYXRoKFsuLi5wcmUsIHsgLi4uY3VycmVudCwgYXR0cmlidXRlcyB9LCAuLi5wb3N0XSkpLFxuICAgICAgICAgIGVsZW1lbnRzXG4gICAgICAgICkpIHtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIGktLVxuICAgICAgICBvcmlnaW5hbCA9IGF0dHJpYnV0ZXNcbiAgICAgIH1cbiAgICAgIHJldHVybiBvcmlnaW5hbFxuICAgIH1cblxuICAgIGNvbnN0IHNpbXBsaWZpZWQgPSBzaW1wbGlmeShhdHRyaWJ1dGVzLCAoYXR0cmlidXRlcywgaSkgPT4ge1xuICAgICAgY29uc3QgeyBuYW1lIH0gPSBhdHRyaWJ1dGVzW2ldXG4gICAgICBpZiAobmFtZSA9PT0gJ2lkJykge1xuICAgICAgICByZXR1cm4gYXR0cmlidXRlc1xuICAgICAgfVxuICAgICAgcmV0dXJuIFsuLi5hdHRyaWJ1dGVzLnNsaWNlKDAsIGkpLCB7IG5hbWUsIHZhbHVlOiBudWxsIH0sIC4uLmF0dHJpYnV0ZXMuc2xpY2UoaSArIDEpXVxuICAgIH0pXG4gICAgcmV0dXJuIHsgLi4uY3VycmVudCwgYXR0cmlidXRlczogc2ltcGxpZnkoc2ltcGxpZmllZCwgYXR0cmlidXRlcyA9PiBhdHRyaWJ1dGVzLnNsaWNlKDAsIC0xKSkgfSAgICBcbiAgfVxuICByZXR1cm4gY3VycmVudFxufVxuXG4vKipcbiAqIE9wdGltaXplIGRlc2NlbmRhbnRcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwcmUgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1BhdHRlcm59ICAgICAgICAgICAgIGN1cnJlbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgcG9zdCAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICAgICAgIHNlbGVjdCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7VG9TdHJpbmdBcGl9ICAgICAgICAgdG9TdHJpbmcgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtQYXR0ZXJufSAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3Qgb3B0aW1pemVEZXNjZW5kYW50ID0gKHByZSwgY3VycmVudCwgcG9zdCwgZWxlbWVudHMsIHNlbGVjdCwgdG9TdHJpbmcpID0+IHtcbiAgLy8gcm9idXN0bmVzczogZGVzY2VuZGFudCBpbnN0ZWFkIGNoaWxkIChoZXVyaXN0aWMpXG4gIGlmIChjdXJyZW50LnJlbGF0ZXMgPT09ICdjaGlsZCcpIHtcbiAgICBjb25zdCBkZXNjZW5kYW50ID0geyAuLi5jdXJyZW50LCByZWxhdGVzOiB1bmRlZmluZWQgfVxuICAgIGxldCBtYXRjaGVzID0gc2VsZWN0KHRvU3RyaW5nLnBhdGgoWy4uLnByZSwgZGVzY2VuZGFudCwgLi4ucG9zdF0pKVxuICAgIGlmIChjb21wYXJlUmVzdWx0cyhtYXRjaGVzLCBlbGVtZW50cykpIHtcbiAgICAgIHJldHVybiBkZXNjZW5kYW50XG4gICAgfVxuICB9XG4gIHJldHVybiBjdXJyZW50XG59XG5cbi8qKlxuICogT3B0aW1pemUgcmVjdXJzaXZlIGRlc2NlbmRhbnRzXG4gKiBcbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHByZSAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UGF0dGVybn0gICAgICAgICAgICAgY3VycmVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwb3N0ICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgICAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1BhdHRlcm59ICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBvcHRpbWl6ZVJlY3Vyc2l2ZURlc2NlbmRhbnRzID0gKHByZSwgY3VycmVudCwgcG9zdCwgZWxlbWVudHMsIHNlbGVjdCwgdG9TdHJpbmcpID0+IHtcbiAgaWYgKGN1cnJlbnQuZGVzY2VuZGFudHMubGVuZ3RoID4gMCAmJiBwb3N0Lmxlbmd0aCkge1xuICAgIGNvbnN0IGJhc2UgPSB7IC4uLmN1cnJlbnQsIGRlc2NlbmRhbnRzOiBbLi4uY3VycmVudC5kZXNjZW5kYW50c10gfVxuICAgIHdoaWxlIChiYXNlLmRlc2NlbmRhbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IG9wdGltaXplZCA9IGJhc2UuZGVzY2VuZGFudHMuc2xpY2UoMCwgLTEpXG4gICAgICBpZiAoIWNvbXBhcmVSZXN1bHRzKHNlbGVjdCh0b1N0cmluZy5wYXRoKFsuLi5wcmUsIHsgLi4uYmFzZSwgZGVzY2VuZGFudHM6IG9wdGltaXplZCB9LCAuLi5wb3N0XSkpLCBlbGVtZW50cykpIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGJhc2UuZGVzY2VuZGFudHMgPSBvcHRpbWl6ZWRcbiAgICB9XG4gICAgcmV0dXJuIGJhc2VcbiAgfVxuICByZXR1cm4gY3VycmVudFxufVxuXG4vKipcbiAqIE9wdGltaXplIG50aCBvZiB0eXBlXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgcHJlICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtQYXR0ZXJufSAgICAgICAgICAgICBjdXJyZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHBvc3QgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgICAgICBzZWxlY3QgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICAgICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7UGF0dGVybn0gICAgICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IG9wdGltaXplTnRoT2ZUeXBlID0gKHByZSwgY3VycmVudCwgcG9zdCwgZWxlbWVudHMsIHNlbGVjdCwgdG9TdHJpbmcpID0+IHtcbiAgY29uc3QgaSA9IGN1cnJlbnQucHNldWRvLmZpbmRJbmRleChpdGVtID0+IGl0ZW0uc3RhcnRzV2l0aCgnbnRoLWNoaWxkJykpXG4gIC8vIHJvYnVzdG5lc3M6ICdudGgtb2YtdHlwZScgaW5zdGVhZCAnbnRoLWNoaWxkJyAoaGV1cmlzdGljKVxuICBpZiAoaSA+PSAwKSB7XG4gICAgLy8gVE9ETzogY29uc2lkZXIgY29tcGxldGUgY292ZXJhZ2Ugb2YgJ250aC1vZi10eXBlJyByZXBsYWNlbWVudFxuICAgIGNvbnN0IHR5cGUgPSBjdXJyZW50LnBzZXVkb1tpXS5yZXBsYWNlKC9ebnRoLWNoaWxkLywgJ250aC1vZi10eXBlJylcbiAgICBjb25zdCBudGhPZlR5cGUgPSB7IC4uLmN1cnJlbnQsIHBzZXVkbzogWy4uLmN1cnJlbnQucHNldWRvLnNsaWNlKDAsIGkpLCB0eXBlLCAuLi5jdXJyZW50LnBzZXVkby5zbGljZShpICsgMSldIH1cbiAgICBsZXQgcGF0dGVybiA9IHRvU3RyaW5nLnBhdGgoWy4uLnByZSwgbnRoT2ZUeXBlLCAuLi5wb3N0XSlcbiAgICBsZXQgbWF0Y2hlcyA9IHNlbGVjdChwYXR0ZXJuKVxuICAgIGlmIChjb21wYXJlUmVzdWx0cyhtYXRjaGVzLCBlbGVtZW50cykpIHtcbiAgICAgIHJldHVybiBudGhPZlR5cGVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGN1cnJlbnRcbn1cblxuLyoqXG4gKiBPcHRpbWl6ZSBjbGFzc2VzXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgcHJlICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtQYXR0ZXJufSAgICAgICAgICAgICBjdXJyZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHBvc3QgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgICAgICBzZWxlY3QgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICAgICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7UGF0dGVybn0gICAgICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IG9wdGltaXplQ2xhc3NlcyA9IChwcmUsIGN1cnJlbnQsIHBvc3QsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIC8vIGVmZmljaWVuY3k6IGNvbWJpbmF0aW9ucyBvZiBjbGFzc25hbWUgKHBhcnRpYWwgcGVybXV0YXRpb25zKVxuICBpZiAoY3VycmVudC5jbGFzc2VzLmxlbmd0aCA+IDEpIHtcbiAgICBsZXQgb3B0aW1pemVkID0gY3VycmVudC5jbGFzc2VzLnNsaWNlKCkuc29ydCgoY3VyciwgbmV4dCkgPT4gY3Vyci5sZW5ndGggLSBuZXh0Lmxlbmd0aClcblxuICAgIHdoaWxlIChvcHRpbWl6ZWQubGVuZ3RoID4gMSkge1xuICAgICAgb3B0aW1pemVkLnNoaWZ0KClcbiAgICAgIGNvbnN0IHBhdHRlcm4gPSB0b1N0cmluZy5wYXRoKFsuLi5wcmUsIHsgLi4uY3VycmVudCwgY2xhc3Nlczogb3B0aW1pemVkIH0sIC4uLnBvc3RdKVxuICAgICAgaWYgKCFjb21wYXJlUmVzdWx0cyhzZWxlY3QocGF0dGVybiksIGVsZW1lbnRzKSkge1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY3VycmVudC5jbGFzc2VzID0gb3B0aW1pemVkXG4gICAgfVxuXG4gICAgb3B0aW1pemVkID0gY3VycmVudC5jbGFzc2VzXG5cbiAgICBpZiAob3B0aW1pemVkLmxlbmd0aCA+IDIpIHtcbiAgICAgIGNvbnN0IGJhc2UgPSBjcmVhdGVQYXR0ZXJuKHsgY2xhc3Nlczogb3B0aW1pemVkIH0pXG4gICAgICBjb25zdCByZWZlcmVuY2VzID0gc2VsZWN0KHRvU3RyaW5nLnBhdGgoWy4uLnByZSwgYmFzZV0pKVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWZlcmVuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHJlZmVyZW5jZSA9IHJlZmVyZW5jZXNbaV1cbiAgICAgICAgaWYgKGVsZW1lbnRzLnNvbWUoKGVsZW1lbnQpID0+IHJlZmVyZW5jZS5jb250YWlucyhlbGVtZW50KSkpIHtcbiAgICAgICAgICAvLyBUT0RPOlxuICAgICAgICAgIC8vIC0gY2hlY2sgdXNpbmcgYXR0cmlidXRlcyArIHJlZ2FyZCBleGNsdWRlc1xuICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gY3JlYXRlUGF0dGVybih7IHRhZzogcmVmZXJlbmNlLnRhZ05hbWUgfSlcbiAgICAgICAgICB2YXIgcGF0dGVybiA9IHRvU3RyaW5nLnBhdGgoWy4uLnByZSwgZGVzY3JpcHRpb24sIC4uLnBvc3RdKVxuICAgICAgICAgIHZhciBtYXRjaGVzID0gc2VsZWN0KHBhdHRlcm4pXG4gICAgICAgICAgaWYgKGNvbXBhcmVSZXN1bHRzKG1hdGNoZXMsIGVsZW1lbnRzKSkge1xuICAgICAgICAgICAgY3VycmVudCA9IGRlc2NyaXB0aW9uXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGN1cnJlbnRcbn1cblxuY29uc3Qgb3B0aW1pemVycyA9IFtcbiAgb3B0aW1pemVUZXh0LFxuICBvcHRpbWl6ZUF0dHJpYnV0ZXMsXG4gIG9wdGltaXplRGVzY2VuZGFudCxcbiAgb3B0aW1pemVSZWN1cnNpdmVEZXNjZW5kYW50cyxcbiAgb3B0aW1pemVOdGhPZlR5cGUsXG4gIG9wdGltaXplQ2xhc3Nlcyxcbl1cblxuLyoqXG4gKiBJbXByb3ZlIGEgY2h1bmsgb2YgdGhlIHNlbGVjdG9yXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgcHJlICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtQYXR0ZXJufSAgICAgICAgICAgICBjdXJyZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHBvc3QgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgICAgICBzZWxlY3QgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICAgICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7UGF0dGVybn0gICAgICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IG9wdGltaXplUGFydCA9IChwcmUsIGN1cnJlbnQsIHBvc3QsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSA9PlxuICBvcHRpbWl6ZXJzLnJlZHVjZSgoYWNjLCBvcHRpbWl6ZXIpID0+IG9wdGltaXplcihwcmUsIGFjYywgcG9zdCwgZWxlbWVudHMsIHNlbGVjdCwgdG9TdHJpbmcpLCBjdXJyZW50KVxuXG4vKipcbiAqIEV2YWx1YXRlIG1hdGNoZXMgd2l0aCBleHBlY3RlZCBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IG1hdGNoZXMgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtCb29sZWFufSAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbXBhcmVSZXN1bHRzID0gKG1hdGNoZXMsIGVsZW1lbnRzKSA9PiB7XG4gIGNvbnN0IHsgbGVuZ3RoIH0gPSBtYXRjaGVzXG4gIHJldHVybiBsZW5ndGggPT09IGVsZW1lbnRzLmxlbmd0aCAmJiBlbGVtZW50cy5ldmVyeSgoZWxlbWVudCkgPT4ge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChtYXRjaGVzW2ldID09PSBlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL29wdGltaXplLmpzIiwiLyoqXG4gKiAjIFNlbGVjdFxuICpcbiAqIENvbnN0cnVjdCBhIHVuaXF1ZSBDU1MgcXVlcnkgc2VsZWN0b3IgdG8gYWNjZXNzIHRoZSBzZWxlY3RlZCBET00gZWxlbWVudChzKS5cbiAqIEZvciBsb25nZXZpdHkgaXQgYXBwbGllcyBkaWZmZXJlbnQgbWF0Y2hpbmcgYW5kIG9wdGltaXphdGlvbiBzdHJhdGVnaWVzLlxuICovXG5pbXBvcnQgbWF0Y2ggZnJvbSAnLi9tYXRjaCdcbmltcG9ydCBvcHRpbWl6ZSBmcm9tICcuL29wdGltaXplJ1xuaW1wb3J0IHsgY29udmVydE5vZGVMaXN0LCBlc2NhcGVWYWx1ZSB9IGZyb20gJy4vdXRpbGl0aWVzJ1xuaW1wb3J0IHsgZ2V0Q29tbW9uQW5jZXN0b3IsIGdldENvbW1vblByb3BlcnRpZXMgfSBmcm9tICcuL2NvbW1vbidcbmltcG9ydCB7IGdldFNlbGVjdCB9IGZyb20gJy4vc2VsZWN0b3InXG5pbXBvcnQgeyBjcmVhdGVQYXR0ZXJuLCBnZXRUb1N0cmluZyB9IGZyb20gJy4vcGF0dGVybidcblxuLyoqXG4gKiBAdHlwZWRlZiAge09iamVjdH0gT3B0aW9uc1xuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gW3Jvb3RdICAgICAgICAgICAgICAgICAgICAgT3B0aW9uYWxseSBzcGVjaWZ5IHRoZSByb290IGVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb24gfCBBcnJheS48SFRNTEVsZW1lbnQ+fSBbc2tpcF0gIFNwZWNpZnkgZWxlbWVudHMgdG8gc2tpcFxuICogQHByb3BlcnR5IHtBcnJheS48c3RyaW5nPn0gW3ByaW9yaXR5XSAgICAgICAgICAgICAgT3JkZXIgb2YgYXR0cmlidXRlIHByb2Nlc3NpbmdcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0PHN0cmluZywgZnVuY3Rpb24gfCBudW1iZXIgfCBzdHJpbmcgfCBib29sZWFufSBbaWdub3JlXSBEZWZpbmUgcGF0dGVybnMgd2hpY2ggc2hvdWxkbid0IGJlIGluY2x1ZGVkXG4gKiBAcHJvcGVydHkgeygnY3NzJ3wneHBhdGgnfCdqcXVlcnknKX0gW2Zvcm1hdF0gICAgICBPdXRwdXQgZm9ybWF0ICAgIFxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnLi9wYXR0ZXJuJykuUGF0dGVybn0gUGF0dGVyblxuICovXG5cbi8qKlxuICogR2V0IGEgc2VsZWN0b3IgZm9yIHRoZSBwcm92aWRlZCBlbGVtZW50XG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICBbb3B0aW9uc10gLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtBcnJheS48UGF0dGVybj59ICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgY29uc3QgZ2V0U2luZ2xlU2VsZWN0b3JQYXRoID0gKGVsZW1lbnQsIG9wdGlvbnMgPSB7fSkgPT4ge1xuXG4gIGlmIChlbGVtZW50Lm5vZGVUeXBlID09PSAzKSB7XG4gICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZVxuICB9XG5cbiAgaWYgKGVsZW1lbnQubm9kZVR5cGUgIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgaW5wdXQgLSBvbmx5IEhUTUxFbGVtZW50cyBvciByZXByZXNlbnRhdGlvbnMgb2YgdGhlbSBhcmUgc3VwcG9ydGVkISAobm90IFwiJHt0eXBlb2YgZWxlbWVudH1cIilgKVxuICB9XG5cbiAgY29uc3QgcGF0aCA9IG1hdGNoKGVsZW1lbnQsIG9wdGlvbnMpXG4gIGNvbnN0IG9wdGltaXplZFBhdGggPSBvcHRpbWl6ZShwYXRoLCBlbGVtZW50LCBvcHRpb25zKVxuXG4gIC8vIGRlYnVnXG4gIC8vIGNvbnNvbGUubG9nKGBcbiAgLy8gICBzZWxlY3RvcjogICR7cGF0aH1cbiAgLy8gICBvcHRpbWl6ZWQ6ICR7b3B0aW1pemVkUGF0aH1cbiAgLy8gYClcblxuICByZXR1cm4gb3B0aW1pemVkUGF0aFxufVxuXG4vKipcbiAqIEdldCBhIHNlbGVjdG9yIHRvIG1hdGNoIG11bHRpcGxlIGRlc2NlbmRhbnRzIGZyb20gYW4gYW5jZXN0b3JcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fE5vZGVMaXN0fSBlbGVtZW50cyAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T3B0aW9uc30gICAgICAgICAgICAgICAgICAgICAgW29wdGlvbnNdICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge0FycmF5LjxQYXR0ZXJuPn0gICAgICAgICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRNdWx0aVNlbGVjdG9yUGF0aCA9IChlbGVtZW50cywgb3B0aW9ucyA9IHt9KSA9PiB7XG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KGVsZW1lbnRzKSkge1xuICAgIGVsZW1lbnRzID0gY29udmVydE5vZGVMaXN0KGVsZW1lbnRzKVxuICB9XG5cbiAgaWYgKGVsZW1lbnRzLnNvbWUoKGVsZW1lbnQpID0+IGVsZW1lbnQubm9kZVR5cGUgIT09IDEpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGlucHV0IC0gb25seSBhbiBBcnJheSBvZiBIVE1MRWxlbWVudHMgb3IgcmVwcmVzZW50YXRpb25zIG9mIHRoZW0gaXMgc3VwcG9ydGVkIScpXG4gIH1cblxuICBjb25zdCBzZWxlY3QgPSBnZXRTZWxlY3Qob3B0aW9ucylcbiAgY29uc3QgdG9TdHJpbmcgPSBnZXRUb1N0cmluZyhvcHRpb25zKVxuXG4gIGNvbnN0IGFuY2VzdG9yID0gZ2V0Q29tbW9uQW5jZXN0b3IoZWxlbWVudHMsIG9wdGlvbnMpXG4gIGNvbnN0IGFuY2VzdG9yUGF0aCA9IG1hdGNoKGFuY2VzdG9yLCBvcHRpb25zKVxuXG4gIC8vIFRPRE86IGNvbnNpZGVyIHVzYWdlIG9mIG11bHRpcGxlIHNlbGVjdG9ycyArIHBhcmVudC1jaGlsZCByZWxhdGlvbiArIGNoZWNrIGZvciBwYXJ0IHJlZHVuZGFuY3lcbiAgY29uc3QgY29tbW9uUGF0aCA9IGdldENvbW1vblBhdGgoZWxlbWVudHMsIG9wdGlvbnMpXG4gIGNvbnN0IGRlc2NlbmRhbnRQYXR0ZXJuID0gY29tbW9uUGF0aFswXVxuXG4gIGNvbnN0IHNlbGVjdG9yUGF0aCA9IG9wdGltaXplKFsuLi5hbmNlc3RvclBhdGgsIGRlc2NlbmRhbnRQYXR0ZXJuXSwgZWxlbWVudHMsIG9wdGlvbnMpXG4gIGNvbnN0IHNlbGVjdG9yTWF0Y2hlcyA9IGNvbnZlcnROb2RlTGlzdChzZWxlY3QodG9TdHJpbmcucGF0aChzZWxlY3RvclBhdGgpKSlcblxuICBpZiAoIWVsZW1lbnRzLmV2ZXJ5KChlbGVtZW50KSA9PiBzZWxlY3Rvck1hdGNoZXMuc29tZSgoZW50cnkpID0+IGVudHJ5ID09PSBlbGVtZW50KSkpIHtcbiAgICAvLyBUT0RPOiBjbHVzdGVyIG1hdGNoZXMgdG8gc3BsaXQgaW50byBzaW1pbGFyIGdyb3VwcyBmb3Igc3ViIHNlbGVjdGlvbnNcbiAgICBjb25zb2xlLndhcm4oYFxuICAgICAgVGhlIHNlbGVjdGVkIGVsZW1lbnRzIGNhbid0IGJlIGVmZmljaWVudGx5IG1hcHBlZC5cbiAgICAgIEl0cyBwcm9iYWJseSBiZXN0IHRvIHVzZSBtdWx0aXBsZSBzaW5nbGUgc2VsZWN0b3JzIGluc3RlYWQhXG4gICAgYClcbiAgICByZXR1cm4gZWxlbWVudHNcbiAgfVxuXG4gIHJldHVybiBzZWxlY3RvclBhdGhcbn1cblxuLyoqXG4gKiBHZXQgc2VsZWN0b3JzIHRvIGRlc2NyaWJlIGEgc2V0IG9mIGVsZW1lbnRzXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7QXJyYXkuPFBhdHRlcm4+fSAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBnZXRDb21tb25QYXRoID0gKGVsZW1lbnRzLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHsgY2xhc3NlcywgYXR0cmlidXRlcywgdGFnIH0gPSBnZXRDb21tb25Qcm9wZXJ0aWVzKGVsZW1lbnRzLCBvcHRpb25zKVxuXG5cbiAgcmV0dXJuIFtcbiAgICBjcmVhdGVQYXR0ZXJuKHtcbiAgICAgIHRhZyxcbiAgICAgIGNsYXNzZXM6IGNsYXNzZXMgfHwgW10sXG4gICAgICBhdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzID8gT2JqZWN0LmtleXMoYXR0cmlidXRlcykubWFwKChuYW1lKSA9PiAoe1xuICAgICAgICBuYW1lOiBlc2NhcGVWYWx1ZShuYW1lKSxcbiAgICAgICAgdmFsdWU6IGVzY2FwZVZhbHVlKGF0dHJpYnV0ZXNbbmFtZV0pXG4gICAgICB9KSkgOiBbXVxuICAgIH0pXG4gIF1cbn1cblxuLyoqXG4gKiBDaG9vc2UgYWN0aW9uIGRlcGVuZGluZyBvbiB0aGUgaW5wdXQgKG11bHRpcGxlL3NpbmdsZSlcbiAqXG4gKiBOT1RFOiBleHRlbmRlZCBkZXRlY3Rpb24gaXMgdXNlZCBmb3Igc3BlY2lhbCBjYXNlcyBsaWtlIHRoZSA8c2VsZWN0PiBlbGVtZW50IHdpdGggPG9wdGlvbnM+XG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR8Tm9kZUxpc3R8QXJyYXkuPEhUTUxFbGVtZW50Pn0gaW5wdXQgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T3B0aW9uc30gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW29wdGlvbnNdIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRRdWVyeVNlbGVjdG9yKGlucHV0LCBvcHRpb25zID0ge30pIHtcbiAgY29uc3QgcGF0aCA9IChpbnB1dC5sZW5ndGggJiYgIWlucHV0Lm5hbWUpXG4gICAgPyBnZXRNdWx0aVNlbGVjdG9yUGF0aChpbnB1dCwgb3B0aW9ucylcbiAgICA6IGdldFNpbmdsZVNlbGVjdG9yUGF0aChpbnB1dCwgb3B0aW9ucylcblxuICBpZiAoQXJyYXkuaXNBcnJheShwYXRoKSAmJiBwYXRoLmxlbmd0aCA+IDAgJiYgcGF0aFswXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIHBhdGgubWFwKGVudHJ5ID0+IGdldFF1ZXJ5U2VsZWN0b3IoZW50cnksIG9wdGlvbnMpKS5qb2luKCcsJylcbiAgfVxuICByZXR1cm4gZ2V0VG9TdHJpbmcob3B0aW9ucykucGF0aChwYXRoKVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlbGVjdC5qcyIsIi8qIVxuICogU2l6emxlIENTUyBTZWxlY3RvciBFbmdpbmUgdjIuMy42XG4gKiBodHRwczovL3NpenpsZWpzLmNvbS9cbiAqXG4gKiBDb3B5cmlnaHQgSlMgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vanMuZm91bmRhdGlvbi9cbiAqXG4gKiBEYXRlOiAyMDIxLTAyLTE2XG4gKi9cbiggZnVuY3Rpb24oIHdpbmRvdyApIHtcbnZhciBpLFxuXHRzdXBwb3J0LFxuXHRFeHByLFxuXHRnZXRUZXh0LFxuXHRpc1hNTCxcblx0dG9rZW5pemUsXG5cdGNvbXBpbGUsXG5cdHNlbGVjdCxcblx0b3V0ZXJtb3N0Q29udGV4dCxcblx0c29ydElucHV0LFxuXHRoYXNEdXBsaWNhdGUsXG5cblx0Ly8gTG9jYWwgZG9jdW1lbnQgdmFyc1xuXHRzZXREb2N1bWVudCxcblx0ZG9jdW1lbnQsXG5cdGRvY0VsZW0sXG5cdGRvY3VtZW50SXNIVE1MLFxuXHRyYnVnZ3lRU0EsXG5cdHJidWdneU1hdGNoZXMsXG5cdG1hdGNoZXMsXG5cdGNvbnRhaW5zLFxuXG5cdC8vIEluc3RhbmNlLXNwZWNpZmljIGRhdGFcblx0ZXhwYW5kbyA9IFwic2l6emxlXCIgKyAxICogbmV3IERhdGUoKSxcblx0cHJlZmVycmVkRG9jID0gd2luZG93LmRvY3VtZW50LFxuXHRkaXJydW5zID0gMCxcblx0ZG9uZSA9IDAsXG5cdGNsYXNzQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuXHR0b2tlbkNhY2hlID0gY3JlYXRlQ2FjaGUoKSxcblx0Y29tcGlsZXJDYWNoZSA9IGNyZWF0ZUNhY2hlKCksXG5cdG5vbm5hdGl2ZVNlbGVjdG9yQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuXHRzb3J0T3JkZXIgPSBmdW5jdGlvbiggYSwgYiApIHtcblx0XHRpZiAoIGEgPT09IGIgKSB7XG5cdFx0XHRoYXNEdXBsaWNhdGUgPSB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gMDtcblx0fSxcblxuXHQvLyBJbnN0YW5jZSBtZXRob2RzXG5cdGhhc093biA9ICgge30gKS5oYXNPd25Qcm9wZXJ0eSxcblx0YXJyID0gW10sXG5cdHBvcCA9IGFyci5wb3AsXG5cdHB1c2hOYXRpdmUgPSBhcnIucHVzaCxcblx0cHVzaCA9IGFyci5wdXNoLFxuXHRzbGljZSA9IGFyci5zbGljZSxcblxuXHQvLyBVc2UgYSBzdHJpcHBlZC1kb3duIGluZGV4T2YgYXMgaXQncyBmYXN0ZXIgdGhhbiBuYXRpdmVcblx0Ly8gaHR0cHM6Ly9qc3BlcmYuY29tL3Rob3ItaW5kZXhvZi12cy1mb3IvNVxuXHRpbmRleE9mID0gZnVuY3Rpb24oIGxpc3QsIGVsZW0gKSB7XG5cdFx0dmFyIGkgPSAwLFxuXHRcdFx0bGVuID0gbGlzdC5sZW5ndGg7XG5cdFx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRpZiAoIGxpc3RbIGkgXSA9PT0gZWxlbSApIHtcblx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiAtMTtcblx0fSxcblxuXHRib29sZWFucyA9IFwiY2hlY2tlZHxzZWxlY3RlZHxhc3luY3xhdXRvZm9jdXN8YXV0b3BsYXl8Y29udHJvbHN8ZGVmZXJ8ZGlzYWJsZWR8aGlkZGVufFwiICtcblx0XHRcImlzbWFwfGxvb3B8bXVsdGlwbGV8b3BlbnxyZWFkb25seXxyZXF1aXJlZHxzY29wZWRcIixcblxuXHQvLyBSZWd1bGFyIGV4cHJlc3Npb25zXG5cblx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1zZWxlY3RvcnMvI3doaXRlc3BhY2Vcblx0d2hpdGVzcGFjZSA9IFwiW1xcXFx4MjBcXFxcdFxcXFxyXFxcXG5cXFxcZl1cIixcblxuXHQvLyBodHRwczovL3d3dy53My5vcmcvVFIvY3NzLXN5bnRheC0zLyNpZGVudC10b2tlbi1kaWFncmFtXG5cdGlkZW50aWZpZXIgPSBcIig/OlxcXFxcXFxcW1xcXFxkYS1mQS1GXXsxLDZ9XCIgKyB3aGl0ZXNwYWNlICtcblx0XHRcIj98XFxcXFxcXFxbXlxcXFxyXFxcXG5cXFxcZl18W1xcXFx3LV18W15cXDAtXFxcXHg3Zl0pK1wiLFxuXG5cdC8vIEF0dHJpYnV0ZSBzZWxlY3RvcnM6IGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jYXR0cmlidXRlLXNlbGVjdG9yc1xuXHRhdHRyaWJ1dGVzID0gXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKihcIiArIGlkZW50aWZpZXIgKyBcIikoPzpcIiArIHdoaXRlc3BhY2UgK1xuXG5cdFx0Ly8gT3BlcmF0b3IgKGNhcHR1cmUgMilcblx0XHRcIiooWypeJHwhfl0/PSlcIiArIHdoaXRlc3BhY2UgK1xuXG5cdFx0Ly8gXCJBdHRyaWJ1dGUgdmFsdWVzIG11c3QgYmUgQ1NTIGlkZW50aWZpZXJzIFtjYXB0dXJlIDVdXG5cdFx0Ly8gb3Igc3RyaW5ncyBbY2FwdHVyZSAzIG9yIGNhcHR1cmUgNF1cIlxuXHRcdFwiKig/OicoKD86XFxcXFxcXFwufFteXFxcXFxcXFwnXSkqKSd8XFxcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXFxcXCJdKSopXFxcInwoXCIgKyBpZGVudGlmaWVyICsgXCIpKXwpXCIgK1xuXHRcdHdoaXRlc3BhY2UgKyBcIipcXFxcXVwiLFxuXG5cdHBzZXVkb3MgPSBcIjooXCIgKyBpZGVudGlmaWVyICsgXCIpKD86XFxcXCgoXCIgK1xuXG5cdFx0Ly8gVG8gcmVkdWNlIHRoZSBudW1iZXIgb2Ygc2VsZWN0b3JzIG5lZWRpbmcgdG9rZW5pemUgaW4gdGhlIHByZUZpbHRlciwgcHJlZmVyIGFyZ3VtZW50czpcblx0XHQvLyAxLiBxdW90ZWQgKGNhcHR1cmUgMzsgY2FwdHVyZSA0IG9yIGNhcHR1cmUgNSlcblx0XHRcIignKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcJ10pKiknfFxcXCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFxcXFwiXSkqKVxcXCIpfFwiICtcblxuXHRcdC8vIDIuIHNpbXBsZSAoY2FwdHVyZSA2KVxuXHRcdFwiKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcKClbXFxcXF1dfFwiICsgYXR0cmlidXRlcyArIFwiKSopfFwiICtcblxuXHRcdC8vIDMuIGFueXRoaW5nIGVsc2UgKGNhcHR1cmUgMilcblx0XHRcIi4qXCIgK1xuXHRcdFwiKVxcXFwpfClcIixcblxuXHQvLyBMZWFkaW5nIGFuZCBub24tZXNjYXBlZCB0cmFpbGluZyB3aGl0ZXNwYWNlLCBjYXB0dXJpbmcgc29tZSBub24td2hpdGVzcGFjZSBjaGFyYWN0ZXJzIHByZWNlZGluZyB0aGUgbGF0dGVyXG5cdHJ3aGl0ZXNwYWNlID0gbmV3IFJlZ0V4cCggd2hpdGVzcGFjZSArIFwiK1wiLCBcImdcIiApLFxuXHRydHJpbSA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiK3woKD86XnxbXlxcXFxcXFxcXSkoPzpcXFxcXFxcXC4pKilcIiArXG5cdFx0d2hpdGVzcGFjZSArIFwiKyRcIiwgXCJnXCIgKSxcblxuXHRyY29tbWEgPSBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIiosXCIgKyB3aGl0ZXNwYWNlICsgXCIqXCIgKSxcblx0cmNvbWJpbmF0b3JzID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIqKFs+K35dfFwiICsgd2hpdGVzcGFjZSArIFwiKVwiICsgd2hpdGVzcGFjZSArXG5cdFx0XCIqXCIgKSxcblx0cmRlc2NlbmQgPSBuZXcgUmVnRXhwKCB3aGl0ZXNwYWNlICsgXCJ8PlwiICksXG5cblx0cnBzZXVkbyA9IG5ldyBSZWdFeHAoIHBzZXVkb3MgKSxcblx0cmlkZW50aWZpZXIgPSBuZXcgUmVnRXhwKCBcIl5cIiArIGlkZW50aWZpZXIgKyBcIiRcIiApLFxuXG5cdG1hdGNoRXhwciA9IHtcblx0XHRcIklEXCI6IG5ldyBSZWdFeHAoIFwiXiMoXCIgKyBpZGVudGlmaWVyICsgXCIpXCIgKSxcblx0XHRcIkNMQVNTXCI6IG5ldyBSZWdFeHAoIFwiXlxcXFwuKFwiICsgaWRlbnRpZmllciArIFwiKVwiICksXG5cdFx0XCJUQUdcIjogbmV3IFJlZ0V4cCggXCJeKFwiICsgaWRlbnRpZmllciArIFwifFsqXSlcIiApLFxuXHRcdFwiQVRUUlwiOiBuZXcgUmVnRXhwKCBcIl5cIiArIGF0dHJpYnV0ZXMgKSxcblx0XHRcIlBTRVVET1wiOiBuZXcgUmVnRXhwKCBcIl5cIiArIHBzZXVkb3MgKSxcblx0XHRcIkNISUxEXCI6IG5ldyBSZWdFeHAoIFwiXjoob25seXxmaXJzdHxsYXN0fG50aHxudGgtbGFzdCktKGNoaWxkfG9mLXR5cGUpKD86XFxcXChcIiArXG5cdFx0XHR3aGl0ZXNwYWNlICsgXCIqKGV2ZW58b2RkfCgoWystXXwpKFxcXFxkKilufClcIiArIHdoaXRlc3BhY2UgKyBcIiooPzooWystXXwpXCIgK1xuXHRcdFx0d2hpdGVzcGFjZSArIFwiKihcXFxcZCspfCkpXCIgKyB3aGl0ZXNwYWNlICsgXCIqXFxcXCl8KVwiLCBcImlcIiApLFxuXHRcdFwiYm9vbFwiOiBuZXcgUmVnRXhwKCBcIl4oPzpcIiArIGJvb2xlYW5zICsgXCIpJFwiLCBcImlcIiApLFxuXG5cdFx0Ly8gRm9yIHVzZSBpbiBsaWJyYXJpZXMgaW1wbGVtZW50aW5nIC5pcygpXG5cdFx0Ly8gV2UgdXNlIHRoaXMgZm9yIFBPUyBtYXRjaGluZyBpbiBgc2VsZWN0YFxuXHRcdFwibmVlZHNDb250ZXh0XCI6IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArXG5cdFx0XHRcIipbPit+XXw6KGV2ZW58b2RkfGVxfGd0fGx0fG50aHxmaXJzdHxsYXN0KSg/OlxcXFwoXCIgKyB3aGl0ZXNwYWNlICtcblx0XHRcdFwiKigoPzotXFxcXGQpP1xcXFxkKilcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcKXwpKD89W14tXXwkKVwiLCBcImlcIiApXG5cdH0sXG5cblx0cmh0bWwgPSAvSFRNTCQvaSxcblx0cmlucHV0cyA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGJ1dHRvbikkL2ksXG5cdHJoZWFkZXIgPSAvXmhcXGQkL2ksXG5cblx0cm5hdGl2ZSA9IC9eW157XStcXHtcXHMqXFxbbmF0aXZlIFxcdy8sXG5cblx0Ly8gRWFzaWx5LXBhcnNlYWJsZS9yZXRyaWV2YWJsZSBJRCBvciBUQUcgb3IgQ0xBU1Mgc2VsZWN0b3JzXG5cdHJxdWlja0V4cHIgPSAvXig/OiMoW1xcdy1dKyl8KFxcdyspfFxcLihbXFx3LV0rKSkkLyxcblxuXHRyc2libGluZyA9IC9bK35dLyxcblxuXHQvLyBDU1MgZXNjYXBlc1xuXHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9DU1MyMS9zeW5kYXRhLmh0bWwjZXNjYXBlZC1jaGFyYWN0ZXJzXG5cdHJ1bmVzY2FwZSA9IG5ldyBSZWdFeHAoIFwiXFxcXFxcXFxbXFxcXGRhLWZBLUZdezEsNn1cIiArIHdoaXRlc3BhY2UgKyBcIj98XFxcXFxcXFwoW15cXFxcclxcXFxuXFxcXGZdKVwiLCBcImdcIiApLFxuXHRmdW5lc2NhcGUgPSBmdW5jdGlvbiggZXNjYXBlLCBub25IZXggKSB7XG5cdFx0dmFyIGhpZ2ggPSBcIjB4XCIgKyBlc2NhcGUuc2xpY2UoIDEgKSAtIDB4MTAwMDA7XG5cblx0XHRyZXR1cm4gbm9uSGV4ID9cblxuXHRcdFx0Ly8gU3RyaXAgdGhlIGJhY2tzbGFzaCBwcmVmaXggZnJvbSBhIG5vbi1oZXggZXNjYXBlIHNlcXVlbmNlXG5cdFx0XHRub25IZXggOlxuXG5cdFx0XHQvLyBSZXBsYWNlIGEgaGV4YWRlY2ltYWwgZXNjYXBlIHNlcXVlbmNlIHdpdGggdGhlIGVuY29kZWQgVW5pY29kZSBjb2RlIHBvaW50XG5cdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTExK1xuXHRcdFx0Ly8gRm9yIHZhbHVlcyBvdXRzaWRlIHRoZSBCYXNpYyBNdWx0aWxpbmd1YWwgUGxhbmUgKEJNUCksIG1hbnVhbGx5IGNvbnN0cnVjdCBhXG5cdFx0XHQvLyBzdXJyb2dhdGUgcGFpclxuXHRcdFx0aGlnaCA8IDAgP1xuXHRcdFx0XHRTdHJpbmcuZnJvbUNoYXJDb2RlKCBoaWdoICsgMHgxMDAwMCApIDpcblx0XHRcdFx0U3RyaW5nLmZyb21DaGFyQ29kZSggaGlnaCA+PiAxMCB8IDB4RDgwMCwgaGlnaCAmIDB4M0ZGIHwgMHhEQzAwICk7XG5cdH0sXG5cblx0Ly8gQ1NTIHN0cmluZy9pZGVudGlmaWVyIHNlcmlhbGl6YXRpb25cblx0Ly8gaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzc29tLyNjb21tb24tc2VyaWFsaXppbmctaWRpb21zXG5cdHJjc3Nlc2NhcGUgPSAvKFtcXDAtXFx4MWZcXHg3Zl18Xi0/XFxkKXxeLSR8W15cXDAtXFx4MWZcXHg3Zi1cXHVGRkZGXFx3LV0vZyxcblx0ZmNzc2VzY2FwZSA9IGZ1bmN0aW9uKCBjaCwgYXNDb2RlUG9pbnQgKSB7XG5cdFx0aWYgKCBhc0NvZGVQb2ludCApIHtcblxuXHRcdFx0Ly8gVSswMDAwIE5VTEwgYmVjb21lcyBVK0ZGRkQgUkVQTEFDRU1FTlQgQ0hBUkFDVEVSXG5cdFx0XHRpZiAoIGNoID09PSBcIlxcMFwiICkge1xuXHRcdFx0XHRyZXR1cm4gXCJcXHVGRkZEXCI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbnRyb2wgY2hhcmFjdGVycyBhbmQgKGRlcGVuZGVudCB1cG9uIHBvc2l0aW9uKSBudW1iZXJzIGdldCBlc2NhcGVkIGFzIGNvZGUgcG9pbnRzXG5cdFx0XHRyZXR1cm4gY2guc2xpY2UoIDAsIC0xICkgKyBcIlxcXFxcIiArXG5cdFx0XHRcdGNoLmNoYXJDb2RlQXQoIGNoLmxlbmd0aCAtIDEgKS50b1N0cmluZyggMTYgKSArIFwiIFwiO1xuXHRcdH1cblxuXHRcdC8vIE90aGVyIHBvdGVudGlhbGx5LXNwZWNpYWwgQVNDSUkgY2hhcmFjdGVycyBnZXQgYmFja3NsYXNoLWVzY2FwZWRcblx0XHRyZXR1cm4gXCJcXFxcXCIgKyBjaDtcblx0fSxcblxuXHQvLyBVc2VkIGZvciBpZnJhbWVzXG5cdC8vIFNlZSBzZXREb2N1bWVudCgpXG5cdC8vIFJlbW92aW5nIHRoZSBmdW5jdGlvbiB3cmFwcGVyIGNhdXNlcyBhIFwiUGVybWlzc2lvbiBEZW5pZWRcIlxuXHQvLyBlcnJvciBpbiBJRVxuXHR1bmxvYWRIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0c2V0RG9jdW1lbnQoKTtcblx0fSxcblxuXHRpbkRpc2FibGVkRmllbGRzZXQgPSBhZGRDb21iaW5hdG9yKFxuXHRcdGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IHRydWUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImZpZWxkc2V0XCI7XG5cdFx0fSxcblx0XHR7IGRpcjogXCJwYXJlbnROb2RlXCIsIG5leHQ6IFwibGVnZW5kXCIgfVxuXHQpO1xuXG4vLyBPcHRpbWl6ZSBmb3IgcHVzaC5hcHBseSggXywgTm9kZUxpc3QgKVxudHJ5IHtcblx0cHVzaC5hcHBseShcblx0XHQoIGFyciA9IHNsaWNlLmNhbGwoIHByZWZlcnJlZERvYy5jaGlsZE5vZGVzICkgKSxcblx0XHRwcmVmZXJyZWREb2MuY2hpbGROb2Rlc1xuXHQpO1xuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQ8NC4wXG5cdC8vIERldGVjdCBzaWxlbnRseSBmYWlsaW5nIHB1c2guYXBwbHlcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuXHRhcnJbIHByZWZlcnJlZERvYy5jaGlsZE5vZGVzLmxlbmd0aCBdLm5vZGVUeXBlO1xufSBjYXRjaCAoIGUgKSB7XG5cdHB1c2ggPSB7IGFwcGx5OiBhcnIubGVuZ3RoID9cblxuXHRcdC8vIExldmVyYWdlIHNsaWNlIGlmIHBvc3NpYmxlXG5cdFx0ZnVuY3Rpb24oIHRhcmdldCwgZWxzICkge1xuXHRcdFx0cHVzaE5hdGl2ZS5hcHBseSggdGFyZ2V0LCBzbGljZS5jYWxsKCBlbHMgKSApO1xuXHRcdH0gOlxuXG5cdFx0Ly8gU3VwcG9ydDogSUU8OVxuXHRcdC8vIE90aGVyd2lzZSBhcHBlbmQgZGlyZWN0bHlcblx0XHRmdW5jdGlvbiggdGFyZ2V0LCBlbHMgKSB7XG5cdFx0XHR2YXIgaiA9IHRhcmdldC5sZW5ndGgsXG5cdFx0XHRcdGkgPSAwO1xuXG5cdFx0XHQvLyBDYW4ndCB0cnVzdCBOb2RlTGlzdC5sZW5ndGhcblx0XHRcdHdoaWxlICggKCB0YXJnZXRbIGorKyBdID0gZWxzWyBpKysgXSApICkge31cblx0XHRcdHRhcmdldC5sZW5ndGggPSBqIC0gMTtcblx0XHR9XG5cdH07XG59XG5cbmZ1bmN0aW9uIFNpenpsZSggc2VsZWN0b3IsIGNvbnRleHQsIHJlc3VsdHMsIHNlZWQgKSB7XG5cdHZhciBtLCBpLCBlbGVtLCBuaWQsIG1hdGNoLCBncm91cHMsIG5ld1NlbGVjdG9yLFxuXHRcdG5ld0NvbnRleHQgPSBjb250ZXh0ICYmIGNvbnRleHQub3duZXJEb2N1bWVudCxcblxuXHRcdC8vIG5vZGVUeXBlIGRlZmF1bHRzIHRvIDksIHNpbmNlIGNvbnRleHQgZGVmYXVsdHMgdG8gZG9jdW1lbnRcblx0XHRub2RlVHlwZSA9IGNvbnRleHQgPyBjb250ZXh0Lm5vZGVUeXBlIDogOTtcblxuXHRyZXN1bHRzID0gcmVzdWx0cyB8fCBbXTtcblxuXHQvLyBSZXR1cm4gZWFybHkgZnJvbSBjYWxscyB3aXRoIGludmFsaWQgc2VsZWN0b3Igb3IgY29udGV4dFxuXHRpZiAoIHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiB8fCAhc2VsZWN0b3IgfHxcblx0XHRub2RlVHlwZSAhPT0gMSAmJiBub2RlVHlwZSAhPT0gOSAmJiBub2RlVHlwZSAhPT0gMTEgKSB7XG5cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxuXG5cdC8vIFRyeSB0byBzaG9ydGN1dCBmaW5kIG9wZXJhdGlvbnMgKGFzIG9wcG9zZWQgdG8gZmlsdGVycykgaW4gSFRNTCBkb2N1bWVudHNcblx0aWYgKCAhc2VlZCApIHtcblx0XHRzZXREb2N1bWVudCggY29udGV4dCApO1xuXHRcdGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xuXG5cdFx0aWYgKCBkb2N1bWVudElzSFRNTCApIHtcblxuXHRcdFx0Ly8gSWYgdGhlIHNlbGVjdG9yIGlzIHN1ZmZpY2llbnRseSBzaW1wbGUsIHRyeSB1c2luZyBhIFwiZ2V0KkJ5KlwiIERPTSBtZXRob2Rcblx0XHRcdC8vIChleGNlcHRpbmcgRG9jdW1lbnRGcmFnbWVudCBjb250ZXh0LCB3aGVyZSB0aGUgbWV0aG9kcyBkb24ndCBleGlzdClcblx0XHRcdGlmICggbm9kZVR5cGUgIT09IDExICYmICggbWF0Y2ggPSBycXVpY2tFeHByLmV4ZWMoIHNlbGVjdG9yICkgKSApIHtcblxuXHRcdFx0XHQvLyBJRCBzZWxlY3RvclxuXHRcdFx0XHRpZiAoICggbSA9IG1hdGNoWyAxIF0gKSApIHtcblxuXHRcdFx0XHRcdC8vIERvY3VtZW50IGNvbnRleHRcblx0XHRcdFx0XHRpZiAoIG5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoIGVsZW0gPSBjb250ZXh0LmdldEVsZW1lbnRCeUlkKCBtICkgKSApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSwgT3BlcmEsIFdlYmtpdFxuXHRcdFx0XHRcdFx0XHQvLyBUT0RPOiBpZGVudGlmeSB2ZXJzaW9uc1xuXHRcdFx0XHRcdFx0XHQvLyBnZXRFbGVtZW50QnlJZCBjYW4gbWF0Y2ggZWxlbWVudHMgYnkgbmFtZSBpbnN0ZWFkIG9mIElEXG5cdFx0XHRcdFx0XHRcdGlmICggZWxlbS5pZCA9PT0gbSApIHtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBFbGVtZW50IGNvbnRleHRcblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSwgT3BlcmEsIFdlYmtpdFxuXHRcdFx0XHRcdFx0Ly8gVE9ETzogaWRlbnRpZnkgdmVyc2lvbnNcblx0XHRcdFx0XHRcdC8vIGdldEVsZW1lbnRCeUlkIGNhbiBtYXRjaCBlbGVtZW50cyBieSBuYW1lIGluc3RlYWQgb2YgSURcblx0XHRcdFx0XHRcdGlmICggbmV3Q29udGV4dCAmJiAoIGVsZW0gPSBuZXdDb250ZXh0LmdldEVsZW1lbnRCeUlkKCBtICkgKSAmJlxuXHRcdFx0XHRcdFx0XHRjb250YWlucyggY29udGV4dCwgZWxlbSApICYmXG5cdFx0XHRcdFx0XHRcdGVsZW0uaWQgPT09IG0gKSB7XG5cblx0XHRcdFx0XHRcdFx0cmVzdWx0cy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBUeXBlIHNlbGVjdG9yXG5cdFx0XHRcdH0gZWxzZSBpZiAoIG1hdGNoWyAyIF0gKSB7XG5cdFx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggc2VsZWN0b3IgKSApO1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXG5cdFx0XHRcdC8vIENsYXNzIHNlbGVjdG9yXG5cdFx0XHRcdH0gZWxzZSBpZiAoICggbSA9IG1hdGNoWyAzIF0gKSAmJiBzdXBwb3J0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgJiZcblx0XHRcdFx0XHRjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgKSB7XG5cblx0XHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoIG0gKSApO1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRha2UgYWR2YW50YWdlIG9mIHF1ZXJ5U2VsZWN0b3JBbGxcblx0XHRcdGlmICggc3VwcG9ydC5xc2EgJiZcblx0XHRcdFx0IW5vbm5hdGl2ZVNlbGVjdG9yQ2FjaGVbIHNlbGVjdG9yICsgXCIgXCIgXSAmJlxuXHRcdFx0XHQoICFyYnVnZ3lRU0EgfHwgIXJidWdneVFTQS50ZXN0KCBzZWxlY3RvciApICkgJiZcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA4IG9ubHlcblx0XHRcdFx0Ly8gRXhjbHVkZSBvYmplY3QgZWxlbWVudHNcblx0XHRcdFx0KCBub2RlVHlwZSAhPT0gMSB8fCBjb250ZXh0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09IFwib2JqZWN0XCIgKSApIHtcblxuXHRcdFx0XHRuZXdTZWxlY3RvciA9IHNlbGVjdG9yO1xuXHRcdFx0XHRuZXdDb250ZXh0ID0gY29udGV4dDtcblxuXHRcdFx0XHQvLyBxU0EgY29uc2lkZXJzIGVsZW1lbnRzIG91dHNpZGUgYSBzY29waW5nIHJvb3Qgd2hlbiBldmFsdWF0aW5nIGNoaWxkIG9yXG5cdFx0XHRcdC8vIGRlc2NlbmRhbnQgY29tYmluYXRvcnMsIHdoaWNoIGlzIG5vdCB3aGF0IHdlIHdhbnQuXG5cdFx0XHRcdC8vIEluIHN1Y2ggY2FzZXMsIHdlIHdvcmsgYXJvdW5kIHRoZSBiZWhhdmlvciBieSBwcmVmaXhpbmcgZXZlcnkgc2VsZWN0b3IgaW4gdGhlXG5cdFx0XHRcdC8vIGxpc3Qgd2l0aCBhbiBJRCBzZWxlY3RvciByZWZlcmVuY2luZyB0aGUgc2NvcGUgY29udGV4dC5cblx0XHRcdFx0Ly8gVGhlIHRlY2huaXF1ZSBoYXMgdG8gYmUgdXNlZCBhcyB3ZWxsIHdoZW4gYSBsZWFkaW5nIGNvbWJpbmF0b3IgaXMgdXNlZFxuXHRcdFx0XHQvLyBhcyBzdWNoIHNlbGVjdG9ycyBhcmUgbm90IHJlY29nbml6ZWQgYnkgcXVlcnlTZWxlY3RvckFsbC5cblx0XHRcdFx0Ly8gVGhhbmtzIHRvIEFuZHJldyBEdXBvbnQgZm9yIHRoaXMgdGVjaG5pcXVlLlxuXHRcdFx0XHRpZiAoIG5vZGVUeXBlID09PSAxICYmXG5cdFx0XHRcdFx0KCByZGVzY2VuZC50ZXN0KCBzZWxlY3RvciApIHx8IHJjb21iaW5hdG9ycy50ZXN0KCBzZWxlY3RvciApICkgKSB7XG5cblx0XHRcdFx0XHQvLyBFeHBhbmQgY29udGV4dCBmb3Igc2libGluZyBzZWxlY3RvcnNcblx0XHRcdFx0XHRuZXdDb250ZXh0ID0gcnNpYmxpbmcudGVzdCggc2VsZWN0b3IgKSAmJiB0ZXN0Q29udGV4dCggY29udGV4dC5wYXJlbnROb2RlICkgfHxcblx0XHRcdFx0XHRcdGNvbnRleHQ7XG5cblx0XHRcdFx0XHQvLyBXZSBjYW4gdXNlIDpzY29wZSBpbnN0ZWFkIG9mIHRoZSBJRCBoYWNrIGlmIHRoZSBicm93c2VyXG5cdFx0XHRcdFx0Ly8gc3VwcG9ydHMgaXQgJiBpZiB3ZSdyZSBub3QgY2hhbmdpbmcgdGhlIGNvbnRleHQuXG5cdFx0XHRcdFx0aWYgKCBuZXdDb250ZXh0ICE9PSBjb250ZXh0IHx8ICFzdXBwb3J0LnNjb3BlICkge1xuXG5cdFx0XHRcdFx0XHQvLyBDYXB0dXJlIHRoZSBjb250ZXh0IElELCBzZXR0aW5nIGl0IGZpcnN0IGlmIG5lY2Vzc2FyeVxuXHRcdFx0XHRcdFx0aWYgKCAoIG5pZCA9IGNvbnRleHQuZ2V0QXR0cmlidXRlKCBcImlkXCIgKSApICkge1xuXHRcdFx0XHRcdFx0XHRuaWQgPSBuaWQucmVwbGFjZSggcmNzc2VzY2FwZSwgZmNzc2VzY2FwZSApO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Y29udGV4dC5zZXRBdHRyaWJ1dGUoIFwiaWRcIiwgKCBuaWQgPSBleHBhbmRvICkgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBQcmVmaXggZXZlcnkgc2VsZWN0b3IgaW4gdGhlIGxpc3Rcblx0XHRcdFx0XHRncm91cHMgPSB0b2tlbml6ZSggc2VsZWN0b3IgKTtcblx0XHRcdFx0XHRpID0gZ3JvdXBzLmxlbmd0aDtcblx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdGdyb3Vwc1sgaSBdID0gKCBuaWQgPyBcIiNcIiArIG5pZCA6IFwiOnNjb3BlXCIgKSArIFwiIFwiICtcblx0XHRcdFx0XHRcdFx0dG9TZWxlY3RvciggZ3JvdXBzWyBpIF0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bmV3U2VsZWN0b3IgPSBncm91cHMuam9pbiggXCIsXCIgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cyxcblx0XHRcdFx0XHRcdG5ld0NvbnRleHQucXVlcnlTZWxlY3RvckFsbCggbmV3U2VsZWN0b3IgKVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdH0gY2F0Y2ggKCBxc2FFcnJvciApIHtcblx0XHRcdFx0XHRub25uYXRpdmVTZWxlY3RvckNhY2hlKCBzZWxlY3RvciwgdHJ1ZSApO1xuXHRcdFx0XHR9IGZpbmFsbHkge1xuXHRcdFx0XHRcdGlmICggbmlkID09PSBleHBhbmRvICkge1xuXHRcdFx0XHRcdFx0Y29udGV4dC5yZW1vdmVBdHRyaWJ1dGUoIFwiaWRcIiApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIEFsbCBvdGhlcnNcblx0cmV0dXJuIHNlbGVjdCggc2VsZWN0b3IucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICk7XG59XG5cbi8qKlxuICogQ3JlYXRlIGtleS12YWx1ZSBjYWNoZXMgb2YgbGltaXRlZCBzaXplXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb24oc3RyaW5nLCBvYmplY3QpfSBSZXR1cm5zIHRoZSBPYmplY3QgZGF0YSBhZnRlciBzdG9yaW5nIGl0IG9uIGl0c2VsZiB3aXRoXG4gKlx0cHJvcGVydHkgbmFtZSB0aGUgKHNwYWNlLXN1ZmZpeGVkKSBzdHJpbmcgYW5kIChpZiB0aGUgY2FjaGUgaXMgbGFyZ2VyIHRoYW4gRXhwci5jYWNoZUxlbmd0aClcbiAqXHRkZWxldGluZyB0aGUgb2xkZXN0IGVudHJ5XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNhY2hlKCkge1xuXHR2YXIga2V5cyA9IFtdO1xuXG5cdGZ1bmN0aW9uIGNhY2hlKCBrZXksIHZhbHVlICkge1xuXG5cdFx0Ly8gVXNlIChrZXkgKyBcIiBcIikgdG8gYXZvaWQgY29sbGlzaW9uIHdpdGggbmF0aXZlIHByb3RvdHlwZSBwcm9wZXJ0aWVzIChzZWUgSXNzdWUgIzE1Nylcblx0XHRpZiAoIGtleXMucHVzaCgga2V5ICsgXCIgXCIgKSA+IEV4cHIuY2FjaGVMZW5ndGggKSB7XG5cblx0XHRcdC8vIE9ubHkga2VlcCB0aGUgbW9zdCByZWNlbnQgZW50cmllc1xuXHRcdFx0ZGVsZXRlIGNhY2hlWyBrZXlzLnNoaWZ0KCkgXTtcblx0XHR9XG5cdFx0cmV0dXJuICggY2FjaGVbIGtleSArIFwiIFwiIF0gPSB2YWx1ZSApO1xuXHR9XG5cdHJldHVybiBjYWNoZTtcbn1cblxuLyoqXG4gKiBNYXJrIGEgZnVuY3Rpb24gZm9yIHNwZWNpYWwgdXNlIGJ5IFNpenpsZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIG1hcmtcbiAqL1xuZnVuY3Rpb24gbWFya0Z1bmN0aW9uKCBmbiApIHtcblx0Zm5bIGV4cGFuZG8gXSA9IHRydWU7XG5cdHJldHVybiBmbjtcbn1cblxuLyoqXG4gKiBTdXBwb3J0IHRlc3RpbmcgdXNpbmcgYW4gZWxlbWVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gUGFzc2VkIHRoZSBjcmVhdGVkIGVsZW1lbnQgYW5kIHJldHVybnMgYSBib29sZWFuIHJlc3VsdFxuICovXG5mdW5jdGlvbiBhc3NlcnQoIGZuICkge1xuXHR2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImZpZWxkc2V0XCIgKTtcblxuXHR0cnkge1xuXHRcdHJldHVybiAhIWZuKCBlbCApO1xuXHR9IGNhdGNoICggZSApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0gZmluYWxseSB7XG5cblx0XHQvLyBSZW1vdmUgZnJvbSBpdHMgcGFyZW50IGJ5IGRlZmF1bHRcblx0XHRpZiAoIGVsLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBlbCApO1xuXHRcdH1cblxuXHRcdC8vIHJlbGVhc2UgbWVtb3J5IGluIElFXG5cdFx0ZWwgPSBudWxsO1xuXHR9XG59XG5cbi8qKlxuICogQWRkcyB0aGUgc2FtZSBoYW5kbGVyIGZvciBhbGwgb2YgdGhlIHNwZWNpZmllZCBhdHRyc1xuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJzIFBpcGUtc2VwYXJhdGVkIGxpc3Qgb2YgYXR0cmlidXRlc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlciBUaGUgbWV0aG9kIHRoYXQgd2lsbCBiZSBhcHBsaWVkXG4gKi9cbmZ1bmN0aW9uIGFkZEhhbmRsZSggYXR0cnMsIGhhbmRsZXIgKSB7XG5cdHZhciBhcnIgPSBhdHRycy5zcGxpdCggXCJ8XCIgKSxcblx0XHRpID0gYXJyLmxlbmd0aDtcblxuXHR3aGlsZSAoIGktLSApIHtcblx0XHRFeHByLmF0dHJIYW5kbGVbIGFyclsgaSBdIF0gPSBoYW5kbGVyO1xuXHR9XG59XG5cbi8qKlxuICogQ2hlY2tzIGRvY3VtZW50IG9yZGVyIG9mIHR3byBzaWJsaW5nc1xuICogQHBhcmFtIHtFbGVtZW50fSBhXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgbGVzcyB0aGFuIDAgaWYgYSBwcmVjZWRlcyBiLCBncmVhdGVyIHRoYW4gMCBpZiBhIGZvbGxvd3MgYlxuICovXG5mdW5jdGlvbiBzaWJsaW5nQ2hlY2soIGEsIGIgKSB7XG5cdHZhciBjdXIgPSBiICYmIGEsXG5cdFx0ZGlmZiA9IGN1ciAmJiBhLm5vZGVUeXBlID09PSAxICYmIGIubm9kZVR5cGUgPT09IDEgJiZcblx0XHRcdGEuc291cmNlSW5kZXggLSBiLnNvdXJjZUluZGV4O1xuXG5cdC8vIFVzZSBJRSBzb3VyY2VJbmRleCBpZiBhdmFpbGFibGUgb24gYm90aCBub2Rlc1xuXHRpZiAoIGRpZmYgKSB7XG5cdFx0cmV0dXJuIGRpZmY7XG5cdH1cblxuXHQvLyBDaGVjayBpZiBiIGZvbGxvd3MgYVxuXHRpZiAoIGN1ciApIHtcblx0XHR3aGlsZSAoICggY3VyID0gY3VyLm5leHRTaWJsaW5nICkgKSB7XG5cdFx0XHRpZiAoIGN1ciA9PT0gYiApIHtcblx0XHRcdFx0cmV0dXJuIC0xO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBhID8gMSA6IC0xO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgaW5wdXQgdHlwZXNcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUlucHV0UHNldWRvKCB0eXBlICkge1xuXHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0dmFyIG5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0cmV0dXJuIG5hbWUgPT09IFwiaW5wdXRcIiAmJiBlbGVtLnR5cGUgPT09IHR5cGU7XG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIHVzZSBpbiBwc2V1ZG9zIGZvciBidXR0b25zXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICovXG5mdW5jdGlvbiBjcmVhdGVCdXR0b25Qc2V1ZG8oIHR5cGUgKSB7XG5cdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHR2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRyZXR1cm4gKCBuYW1lID09PSBcImlucHV0XCIgfHwgbmFtZSA9PT0gXCJidXR0b25cIiApICYmIGVsZW0udHlwZSA9PT0gdHlwZTtcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIDplbmFibGVkLzpkaXNhYmxlZFxuICogQHBhcmFtIHtCb29sZWFufSBkaXNhYmxlZCB0cnVlIGZvciA6ZGlzYWJsZWQ7IGZhbHNlIGZvciA6ZW5hYmxlZFxuICovXG5mdW5jdGlvbiBjcmVhdGVEaXNhYmxlZFBzZXVkbyggZGlzYWJsZWQgKSB7XG5cblx0Ly8gS25vd24gOmRpc2FibGVkIGZhbHNlIHBvc2l0aXZlczogZmllbGRzZXRbZGlzYWJsZWRdID4gbGVnZW5kOm50aC1vZi10eXBlKG4rMikgOmNhbi1kaXNhYmxlXG5cdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdC8vIE9ubHkgY2VydGFpbiBlbGVtZW50cyBjYW4gbWF0Y2ggOmVuYWJsZWQgb3IgOmRpc2FibGVkXG5cdFx0Ly8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc2NyaXB0aW5nLmh0bWwjc2VsZWN0b3ItZW5hYmxlZFxuXHRcdC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3NjcmlwdGluZy5odG1sI3NlbGVjdG9yLWRpc2FibGVkXG5cdFx0aWYgKCBcImZvcm1cIiBpbiBlbGVtICkge1xuXG5cdFx0XHQvLyBDaGVjayBmb3IgaW5oZXJpdGVkIGRpc2FibGVkbmVzcyBvbiByZWxldmFudCBub24tZGlzYWJsZWQgZWxlbWVudHM6XG5cdFx0XHQvLyAqIGxpc3RlZCBmb3JtLWFzc29jaWF0ZWQgZWxlbWVudHMgaW4gYSBkaXNhYmxlZCBmaWVsZHNldFxuXHRcdFx0Ly8gICBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9mb3Jtcy5odG1sI2NhdGVnb3J5LWxpc3RlZFxuXHRcdFx0Ly8gICBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9mb3Jtcy5odG1sI2NvbmNlcHQtZmUtZGlzYWJsZWRcblx0XHRcdC8vICogb3B0aW9uIGVsZW1lbnRzIGluIGEgZGlzYWJsZWQgb3B0Z3JvdXBcblx0XHRcdC8vICAgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZm9ybXMuaHRtbCNjb25jZXB0LW9wdGlvbi1kaXNhYmxlZFxuXHRcdFx0Ly8gQWxsIHN1Y2ggZWxlbWVudHMgaGF2ZSBhIFwiZm9ybVwiIHByb3BlcnR5LlxuXHRcdFx0aWYgKCBlbGVtLnBhcmVudE5vZGUgJiYgZWxlbS5kaXNhYmxlZCA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdFx0Ly8gT3B0aW9uIGVsZW1lbnRzIGRlZmVyIHRvIGEgcGFyZW50IG9wdGdyb3VwIGlmIHByZXNlbnRcblx0XHRcdFx0aWYgKCBcImxhYmVsXCIgaW4gZWxlbSApIHtcblx0XHRcdFx0XHRpZiAoIFwibGFiZWxcIiBpbiBlbGVtLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbS5wYXJlbnROb2RlLmRpc2FibGVkID09PSBkaXNhYmxlZDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IGRpc2FibGVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDYgLSAxMVxuXHRcdFx0XHQvLyBVc2UgdGhlIGlzRGlzYWJsZWQgc2hvcnRjdXQgcHJvcGVydHkgdG8gY2hlY2sgZm9yIGRpc2FibGVkIGZpZWxkc2V0IGFuY2VzdG9yc1xuXHRcdFx0XHRyZXR1cm4gZWxlbS5pc0Rpc2FibGVkID09PSBkaXNhYmxlZCB8fFxuXG5cdFx0XHRcdFx0Ly8gV2hlcmUgdGhlcmUgaXMgbm8gaXNEaXNhYmxlZCwgY2hlY2sgbWFudWFsbHlcblx0XHRcdFx0XHQvKiBqc2hpbnQgLVcwMTggKi9cblx0XHRcdFx0XHRlbGVtLmlzRGlzYWJsZWQgIT09ICFkaXNhYmxlZCAmJlxuXHRcdFx0XHRcdGluRGlzYWJsZWRGaWVsZHNldCggZWxlbSApID09PSBkaXNhYmxlZDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IGRpc2FibGVkO1xuXG5cdFx0Ly8gVHJ5IHRvIHdpbm5vdyBvdXQgZWxlbWVudHMgdGhhdCBjYW4ndCBiZSBkaXNhYmxlZCBiZWZvcmUgdHJ1c3RpbmcgdGhlIGRpc2FibGVkIHByb3BlcnR5LlxuXHRcdC8vIFNvbWUgdmljdGltcyBnZXQgY2F1Z2h0IGluIG91ciBuZXQgKGxhYmVsLCBsZWdlbmQsIG1lbnUsIHRyYWNrKSwgYnV0IGl0IHNob3VsZG4ndFxuXHRcdC8vIGV2ZW4gZXhpc3Qgb24gdGhlbSwgbGV0IGFsb25lIGhhdmUgYSBib29sZWFuIHZhbHVlLlxuXHRcdH0gZWxzZSBpZiAoIFwibGFiZWxcIiBpbiBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IGRpc2FibGVkO1xuXHRcdH1cblxuXHRcdC8vIFJlbWFpbmluZyBlbGVtZW50cyBhcmUgbmVpdGhlciA6ZW5hYmxlZCBub3IgOmRpc2FibGVkXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgcG9zaXRpb25hbHNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oIGZuICkge1xuXHRyZXR1cm4gbWFya0Z1bmN0aW9uKCBmdW5jdGlvbiggYXJndW1lbnQgKSB7XG5cdFx0YXJndW1lbnQgPSArYXJndW1lbnQ7XG5cdFx0cmV0dXJuIG1hcmtGdW5jdGlvbiggZnVuY3Rpb24oIHNlZWQsIG1hdGNoZXMgKSB7XG5cdFx0XHR2YXIgaixcblx0XHRcdFx0bWF0Y2hJbmRleGVzID0gZm4oIFtdLCBzZWVkLmxlbmd0aCwgYXJndW1lbnQgKSxcblx0XHRcdFx0aSA9IG1hdGNoSW5kZXhlcy5sZW5ndGg7XG5cblx0XHRcdC8vIE1hdGNoIGVsZW1lbnRzIGZvdW5kIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXhlc1xuXHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdGlmICggc2VlZFsgKCBqID0gbWF0Y2hJbmRleGVzWyBpIF0gKSBdICkge1xuXHRcdFx0XHRcdHNlZWRbIGogXSA9ICEoIG1hdGNoZXNbIGogXSA9IHNlZWRbIGogXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9ICk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGEgbm9kZSBmb3IgdmFsaWRpdHkgYXMgYSBTaXp6bGUgY29udGV4dFxuICogQHBhcmFtIHtFbGVtZW50fE9iamVjdD19IGNvbnRleHRcbiAqIEByZXR1cm5zIHtFbGVtZW50fE9iamVjdHxCb29sZWFufSBUaGUgaW5wdXQgbm9kZSBpZiBhY2NlcHRhYmxlLCBvdGhlcndpc2UgYSBmYWxzeSB2YWx1ZVxuICovXG5mdW5jdGlvbiB0ZXN0Q29udGV4dCggY29udGV4dCApIHtcblx0cmV0dXJuIGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29udGV4dDtcbn1cblxuLy8gRXhwb3NlIHN1cHBvcnQgdmFycyBmb3IgY29udmVuaWVuY2VcbnN1cHBvcnQgPSBTaXp6bGUuc3VwcG9ydCA9IHt9O1xuXG4vKipcbiAqIERldGVjdHMgWE1MIG5vZGVzXG4gKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0fSBlbGVtIEFuIGVsZW1lbnQgb3IgYSBkb2N1bWVudFxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWZmIGVsZW0gaXMgYSBub24tSFRNTCBYTUwgbm9kZVxuICovXG5pc1hNTCA9IFNpenpsZS5pc1hNTCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHR2YXIgbmFtZXNwYWNlID0gZWxlbSAmJiBlbGVtLm5hbWVzcGFjZVVSSSxcblx0XHRkb2NFbGVtID0gZWxlbSAmJiAoIGVsZW0ub3duZXJEb2N1bWVudCB8fCBlbGVtICkuZG9jdW1lbnRFbGVtZW50O1xuXG5cdC8vIFN1cHBvcnQ6IElFIDw9OFxuXHQvLyBBc3N1bWUgSFRNTCB3aGVuIGRvY3VtZW50RWxlbWVudCBkb2Vzbid0IHlldCBleGlzdCwgc3VjaCBhcyBpbnNpZGUgbG9hZGluZyBpZnJhbWVzXG5cdC8vIGh0dHBzOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC80ODMzXG5cdHJldHVybiAhcmh0bWwudGVzdCggbmFtZXNwYWNlIHx8IGRvY0VsZW0gJiYgZG9jRWxlbS5ub2RlTmFtZSB8fCBcIkhUTUxcIiApO1xufTtcblxuLyoqXG4gKiBTZXRzIGRvY3VtZW50LXJlbGF0ZWQgdmFyaWFibGVzIG9uY2UgYmFzZWQgb24gdGhlIGN1cnJlbnQgZG9jdW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3R9IFtkb2NdIEFuIGVsZW1lbnQgb3IgZG9jdW1lbnQgb2JqZWN0IHRvIHVzZSB0byBzZXQgdGhlIGRvY3VtZW50XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjdXJyZW50IGRvY3VtZW50XG4gKi9cbnNldERvY3VtZW50ID0gU2l6emxlLnNldERvY3VtZW50ID0gZnVuY3Rpb24oIG5vZGUgKSB7XG5cdHZhciBoYXNDb21wYXJlLCBzdWJXaW5kb3csXG5cdFx0ZG9jID0gbm9kZSA/IG5vZGUub3duZXJEb2N1bWVudCB8fCBub2RlIDogcHJlZmVycmVkRG9jO1xuXG5cdC8vIFJldHVybiBlYXJseSBpZiBkb2MgaXMgaW52YWxpZCBvciBhbHJlYWR5IHNlbGVjdGVkXG5cdC8vIFN1cHBvcnQ6IElFIDExKywgRWRnZSAxNyAtIDE4K1xuXHQvLyBJRS9FZGdlIHNvbWV0aW1lcyB0aHJvdyBhIFwiUGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvciB3aGVuIHN0cmljdC1jb21wYXJpbmdcblx0Ly8gdHdvIGRvY3VtZW50czsgc2hhbGxvdyBjb21wYXJpc29ucyB3b3JrLlxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG5cdGlmICggZG9jID09IGRvY3VtZW50IHx8IGRvYy5ub2RlVHlwZSAhPT0gOSB8fCAhZG9jLmRvY3VtZW50RWxlbWVudCApIHtcblx0XHRyZXR1cm4gZG9jdW1lbnQ7XG5cdH1cblxuXHQvLyBVcGRhdGUgZ2xvYmFsIHZhcmlhYmxlc1xuXHRkb2N1bWVudCA9IGRvYztcblx0ZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblx0ZG9jdW1lbnRJc0hUTUwgPSAhaXNYTUwoIGRvY3VtZW50ICk7XG5cblx0Ly8gU3VwcG9ydDogSUUgOSAtIDExKywgRWRnZSAxMiAtIDE4K1xuXHQvLyBBY2Nlc3NpbmcgaWZyYW1lIGRvY3VtZW50cyBhZnRlciB1bmxvYWQgdGhyb3dzIFwicGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvcnMgKGpRdWVyeSAjMTM5MzYpXG5cdC8vIFN1cHBvcnQ6IElFIDExKywgRWRnZSAxNyAtIDE4K1xuXHQvLyBJRS9FZGdlIHNvbWV0aW1lcyB0aHJvdyBhIFwiUGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvciB3aGVuIHN0cmljdC1jb21wYXJpbmdcblx0Ly8gdHdvIGRvY3VtZW50czsgc2hhbGxvdyBjb21wYXJpc29ucyB3b3JrLlxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG5cdGlmICggcHJlZmVycmVkRG9jICE9IGRvY3VtZW50ICYmXG5cdFx0KCBzdWJXaW5kb3cgPSBkb2N1bWVudC5kZWZhdWx0VmlldyApICYmIHN1YldpbmRvdy50b3AgIT09IHN1YldpbmRvdyApIHtcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDExLCBFZGdlXG5cdFx0aWYgKCBzdWJXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lciApIHtcblx0XHRcdHN1YldpbmRvdy5hZGRFdmVudExpc3RlbmVyKCBcInVubG9hZFwiLCB1bmxvYWRIYW5kbGVyLCBmYWxzZSApO1xuXG5cdFx0Ly8gU3VwcG9ydDogSUUgOSAtIDEwIG9ubHlcblx0XHR9IGVsc2UgaWYgKCBzdWJXaW5kb3cuYXR0YWNoRXZlbnQgKSB7XG5cdFx0XHRzdWJXaW5kb3cuYXR0YWNoRXZlbnQoIFwib251bmxvYWRcIiwgdW5sb2FkSGFuZGxlciApO1xuXHRcdH1cblx0fVxuXG5cdC8vIFN1cHBvcnQ6IElFIDggLSAxMSssIEVkZ2UgMTIgLSAxOCssIENocm9tZSA8PTE2IC0gMjUgb25seSwgRmlyZWZveCA8PTMuNiAtIDMxIG9ubHksXG5cdC8vIFNhZmFyaSA0IC0gNSBvbmx5LCBPcGVyYSA8PTExLjYgLSAxMi54IG9ubHlcblx0Ly8gSUUvRWRnZSAmIG9sZGVyIGJyb3dzZXJzIGRvbid0IHN1cHBvcnQgdGhlIDpzY29wZSBwc2V1ZG8tY2xhc3MuXG5cdC8vIFN1cHBvcnQ6IFNhZmFyaSA2LjAgb25seVxuXHQvLyBTYWZhcmkgNi4wIHN1cHBvcnRzIDpzY29wZSBidXQgaXQncyBhbiBhbGlhcyBvZiA6cm9vdCB0aGVyZS5cblx0c3VwcG9ydC5zY29wZSA9IGFzc2VydCggZnVuY3Rpb24oIGVsICkge1xuXHRcdGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGVsICkuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKSApO1xuXHRcdHJldHVybiB0eXBlb2YgZWwucXVlcnlTZWxlY3RvckFsbCAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuXHRcdFx0IWVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiOnNjb3BlIGZpZWxkc2V0IGRpdlwiICkubGVuZ3RoO1xuXHR9ICk7XG5cblx0LyogQXR0cmlidXRlc1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gU3VwcG9ydDogSUU8OFxuXHQvLyBWZXJpZnkgdGhhdCBnZXRBdHRyaWJ1dGUgcmVhbGx5IHJldHVybnMgYXR0cmlidXRlcyBhbmQgbm90IHByb3BlcnRpZXNcblx0Ly8gKGV4Y2VwdGluZyBJRTggYm9vbGVhbnMpXG5cdHN1cHBvcnQuYXR0cmlidXRlcyA9IGFzc2VydCggZnVuY3Rpb24oIGVsICkge1xuXHRcdGVsLmNsYXNzTmFtZSA9IFwiaVwiO1xuXHRcdHJldHVybiAhZWwuZ2V0QXR0cmlidXRlKCBcImNsYXNzTmFtZVwiICk7XG5cdH0gKTtcblxuXHQvKiBnZXRFbGVtZW50KHMpQnkqXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXHQvLyBDaGVjayBpZiBnZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIikgcmV0dXJucyBvbmx5IGVsZW1lbnRzXG5cdHN1cHBvcnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgPSBhc3NlcnQoIGZ1bmN0aW9uKCBlbCApIHtcblx0XHRlbC5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlQ29tbWVudCggXCJcIiApICk7XG5cdFx0cmV0dXJuICFlbC5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCIqXCIgKS5sZW5ndGg7XG5cdH0gKTtcblxuXHQvLyBTdXBwb3J0OiBJRTw5XG5cdHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSA9IHJuYXRpdmUudGVzdCggZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSApO1xuXG5cdC8vIFN1cHBvcnQ6IElFPDEwXG5cdC8vIENoZWNrIGlmIGdldEVsZW1lbnRCeUlkIHJldHVybnMgZWxlbWVudHMgYnkgbmFtZVxuXHQvLyBUaGUgYnJva2VuIGdldEVsZW1lbnRCeUlkIG1ldGhvZHMgZG9uJ3QgcGljayB1cCBwcm9ncmFtbWF0aWNhbGx5LXNldCBuYW1lcyxcblx0Ly8gc28gdXNlIGEgcm91bmRhYm91dCBnZXRFbGVtZW50c0J5TmFtZSB0ZXN0XG5cdHN1cHBvcnQuZ2V0QnlJZCA9IGFzc2VydCggZnVuY3Rpb24oIGVsICkge1xuXHRcdGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGVsICkuaWQgPSBleHBhbmRvO1xuXHRcdHJldHVybiAhZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUgfHwgIWRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCBleHBhbmRvICkubGVuZ3RoO1xuXHR9ICk7XG5cblx0Ly8gSUQgZmlsdGVyIGFuZCBmaW5kXG5cdGlmICggc3VwcG9ydC5nZXRCeUlkICkge1xuXHRcdEV4cHIuZmlsdGVyWyBcIklEXCIgXSA9IGZ1bmN0aW9uKCBpZCApIHtcblx0XHRcdHZhciBhdHRySWQgPSBpZC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoIFwiaWRcIiApID09PSBhdHRySWQ7XG5cdFx0XHR9O1xuXHRcdH07XG5cdFx0RXhwci5maW5kWyBcIklEXCIgXSA9IGZ1bmN0aW9uKCBpZCwgY29udGV4dCApIHtcblx0XHRcdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnRJc0hUTUwgKSB7XG5cdFx0XHRcdHZhciBlbGVtID0gY29udGV4dC5nZXRFbGVtZW50QnlJZCggaWQgKTtcblx0XHRcdFx0cmV0dXJuIGVsZW0gPyBbIGVsZW0gXSA6IFtdO1xuXHRcdFx0fVxuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0RXhwci5maWx0ZXJbIFwiSURcIiBdID0gIGZ1bmN0aW9uKCBpZCApIHtcblx0XHRcdHZhciBhdHRySWQgPSBpZC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHR2YXIgbm9kZSA9IHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZU5vZGUgIT09IFwidW5kZWZpbmVkXCIgJiZcblx0XHRcdFx0XHRlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIFwiaWRcIiApO1xuXHRcdFx0XHRyZXR1cm4gbm9kZSAmJiBub2RlLnZhbHVlID09PSBhdHRySWQ7XG5cdFx0XHR9O1xuXHRcdH07XG5cblx0XHQvLyBTdXBwb3J0OiBJRSA2IC0gNyBvbmx5XG5cdFx0Ly8gZ2V0RWxlbWVudEJ5SWQgaXMgbm90IHJlbGlhYmxlIGFzIGEgZmluZCBzaG9ydGN1dFxuXHRcdEV4cHIuZmluZFsgXCJJRFwiIF0gPSBmdW5jdGlvbiggaWQsIGNvbnRleHQgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRCeUlkICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50SXNIVE1MICkge1xuXHRcdFx0XHR2YXIgbm9kZSwgaSwgZWxlbXMsXG5cdFx0XHRcdFx0ZWxlbSA9IGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIGlkICk7XG5cblx0XHRcdFx0aWYgKCBlbGVtICkge1xuXG5cdFx0XHRcdFx0Ly8gVmVyaWZ5IHRoZSBpZCBhdHRyaWJ1dGVcblx0XHRcdFx0XHRub2RlID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKCBcImlkXCIgKTtcblx0XHRcdFx0XHRpZiAoIG5vZGUgJiYgbm9kZS52YWx1ZSA9PT0gaWQgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gWyBlbGVtIF07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gRmFsbCBiYWNrIG9uIGdldEVsZW1lbnRzQnlOYW1lXG5cdFx0XHRcdFx0ZWxlbXMgPSBjb250ZXh0LmdldEVsZW1lbnRzQnlOYW1lKCBpZCApO1xuXHRcdFx0XHRcdGkgPSAwO1xuXHRcdFx0XHRcdHdoaWxlICggKCBlbGVtID0gZWxlbXNbIGkrKyBdICkgKSB7XG5cdFx0XHRcdFx0XHRub2RlID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKCBcImlkXCIgKTtcblx0XHRcdFx0XHRcdGlmICggbm9kZSAmJiBub2RlLnZhbHVlID09PSBpZCApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFsgZWxlbSBdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG5cblx0Ly8gVGFnXG5cdEV4cHIuZmluZFsgXCJUQUdcIiBdID0gc3VwcG9ydC5nZXRFbGVtZW50c0J5VGFnTmFtZSA/XG5cdFx0ZnVuY3Rpb24oIHRhZywgY29udGV4dCApIHtcblx0XHRcdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IFwidW5kZWZpbmVkXCIgKSB7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgKTtcblxuXHRcdFx0Ly8gRG9jdW1lbnRGcmFnbWVudCBub2RlcyBkb24ndCBoYXZlIGdFQlROXG5cdFx0XHR9IGVsc2UgaWYgKCBzdXBwb3J0LnFzYSApIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQucXVlcnlTZWxlY3RvckFsbCggdGFnICk7XG5cdFx0XHR9XG5cdFx0fSA6XG5cblx0XHRmdW5jdGlvbiggdGFnLCBjb250ZXh0ICkge1xuXHRcdFx0dmFyIGVsZW0sXG5cdFx0XHRcdHRtcCA9IFtdLFxuXHRcdFx0XHRpID0gMCxcblxuXHRcdFx0XHQvLyBCeSBoYXBweSBjb2luY2lkZW5jZSwgYSAoYnJva2VuKSBnRUJUTiBhcHBlYXJzIG9uIERvY3VtZW50RnJhZ21lbnQgbm9kZXMgdG9vXG5cdFx0XHRcdHJlc3VsdHMgPSBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgKTtcblxuXHRcdFx0Ly8gRmlsdGVyIG91dCBwb3NzaWJsZSBjb21tZW50c1xuXHRcdFx0aWYgKCB0YWcgPT09IFwiKlwiICkge1xuXHRcdFx0XHR3aGlsZSAoICggZWxlbSA9IHJlc3VsdHNbIGkrKyBdICkgKSB7XG5cdFx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRcdFx0dG1wLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdG1wO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0fTtcblxuXHQvLyBDbGFzc1xuXHRFeHByLmZpbmRbIFwiQ0xBU1NcIiBdID0gc3VwcG9ydC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICYmIGZ1bmN0aW9uKCBjbGFzc05hbWUsIGNvbnRleHQgKSB7XG5cdFx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50SXNIVE1MICkge1xuXHRcdFx0cmV0dXJuIGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggY2xhc3NOYW1lICk7XG5cdFx0fVxuXHR9O1xuXG5cdC8qIFFTQS9tYXRjaGVzU2VsZWN0b3Jcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8vIFFTQSBhbmQgbWF0Y2hlc1NlbGVjdG9yIHN1cHBvcnRcblxuXHQvLyBtYXRjaGVzU2VsZWN0b3IoOmFjdGl2ZSkgcmVwb3J0cyBmYWxzZSB3aGVuIHRydWUgKElFOS9PcGVyYSAxMS41KVxuXHRyYnVnZ3lNYXRjaGVzID0gW107XG5cblx0Ly8gcVNhKDpmb2N1cykgcmVwb3J0cyBmYWxzZSB3aGVuIHRydWUgKENocm9tZSAyMSlcblx0Ly8gV2UgYWxsb3cgdGhpcyBiZWNhdXNlIG9mIGEgYnVnIGluIElFOC85IHRoYXQgdGhyb3dzIGFuIGVycm9yXG5cdC8vIHdoZW5ldmVyIGBkb2N1bWVudC5hY3RpdmVFbGVtZW50YCBpcyBhY2Nlc3NlZCBvbiBhbiBpZnJhbWVcblx0Ly8gU28sIHdlIGFsbG93IDpmb2N1cyB0byBwYXNzIHRocm91Z2ggUVNBIGFsbCB0aGUgdGltZSB0byBhdm9pZCB0aGUgSUUgZXJyb3Jcblx0Ly8gU2VlIGh0dHBzOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMzM3OFxuXHRyYnVnZ3lRU0EgPSBbXTtcblxuXHRpZiAoICggc3VwcG9ydC5xc2EgPSBybmF0aXZlLnRlc3QoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwgKSApICkge1xuXG5cdFx0Ly8gQnVpbGQgUVNBIHJlZ2V4XG5cdFx0Ly8gUmVnZXggc3RyYXRlZ3kgYWRvcHRlZCBmcm9tIERpZWdvIFBlcmluaVxuXHRcdGFzc2VydCggZnVuY3Rpb24oIGVsICkge1xuXG5cdFx0XHR2YXIgaW5wdXQ7XG5cblx0XHRcdC8vIFNlbGVjdCBpcyBzZXQgdG8gZW1wdHkgc3RyaW5nIG9uIHB1cnBvc2Vcblx0XHRcdC8vIFRoaXMgaXMgdG8gdGVzdCBJRSdzIHRyZWF0bWVudCBvZiBub3QgZXhwbGljaXRseVxuXHRcdFx0Ly8gc2V0dGluZyBhIGJvb2xlYW4gY29udGVudCBhdHRyaWJ1dGUsXG5cdFx0XHQvLyBzaW5jZSBpdHMgcHJlc2VuY2Ugc2hvdWxkIGJlIGVub3VnaFxuXHRcdFx0Ly8gaHR0cHM6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzEyMzU5XG5cdFx0XHRkb2NFbGVtLmFwcGVuZENoaWxkKCBlbCApLmlubmVySFRNTCA9IFwiPGEgaWQ9J1wiICsgZXhwYW5kbyArIFwiJz48L2E+XCIgK1xuXHRcdFx0XHRcIjxzZWxlY3QgaWQ9J1wiICsgZXhwYW5kbyArIFwiLVxcclxcXFwnIG1zYWxsb3djYXB0dXJlPScnPlwiICtcblx0XHRcdFx0XCI8b3B0aW9uIHNlbGVjdGVkPScnPjwvb3B0aW9uPjwvc2VsZWN0PlwiO1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRTgsIE9wZXJhIDExLTEyLjE2XG5cdFx0XHQvLyBOb3RoaW5nIHNob3VsZCBiZSBzZWxlY3RlZCB3aGVuIGVtcHR5IHN0cmluZ3MgZm9sbG93IF49IG9yICQ9IG9yICo9XG5cdFx0XHQvLyBUaGUgdGVzdCBhdHRyaWJ1dGUgbXVzdCBiZSB1bmtub3duIGluIE9wZXJhIGJ1dCBcInNhZmVcIiBmb3IgV2luUlRcblx0XHRcdC8vIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvaGg0NjUzODguYXNweCNhdHRyaWJ1dGVfc2VjdGlvblxuXHRcdFx0aWYgKCBlbC5xdWVyeVNlbGVjdG9yQWxsKCBcIlttc2FsbG93Y2FwdHVyZV49JyddXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIlsqXiRdPVwiICsgd2hpdGVzcGFjZSArIFwiKig/OicnfFxcXCJcXFwiKVwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFOFxuXHRcdFx0Ly8gQm9vbGVhbiBhdHRyaWJ1dGVzIGFuZCBcInZhbHVlXCIgYXJlIG5vdCB0cmVhdGVkIGNvcnJlY3RseVxuXHRcdFx0aWYgKCAhZWwucXVlcnlTZWxlY3RvckFsbCggXCJbc2VsZWN0ZWRdXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIlxcXFxbXCIgKyB3aGl0ZXNwYWNlICsgXCIqKD86dmFsdWV8XCIgKyBib29sZWFucyArIFwiKVwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IENocm9tZTwyOSwgQW5kcm9pZDw0LjQsIFNhZmFyaTw3LjArLCBpT1M8Ny4wKywgUGhhbnRvbUpTPDEuOS44K1xuXHRcdFx0aWYgKCAhZWwucXVlcnlTZWxlY3RvckFsbCggXCJbaWR+PVwiICsgZXhwYW5kbyArIFwiLV1cIiApLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwifj1cIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTUgLSAxOCtcblx0XHRcdC8vIElFIDExL0VkZ2UgZG9uJ3QgZmluZCBlbGVtZW50cyBvbiBhIGBbbmFtZT0nJ11gIHF1ZXJ5IGluIHNvbWUgY2FzZXMuXG5cdFx0XHQvLyBBZGRpbmcgYSB0ZW1wb3JhcnkgYXR0cmlidXRlIHRvIHRoZSBkb2N1bWVudCBiZWZvcmUgdGhlIHNlbGVjdGlvbiB3b3Jrc1xuXHRcdFx0Ly8gYXJvdW5kIHRoZSBpc3N1ZS5cblx0XHRcdC8vIEludGVyZXN0aW5nbHksIElFIDEwICYgb2xkZXIgZG9uJ3Qgc2VlbSB0byBoYXZlIHRoZSBpc3N1ZS5cblx0XHRcdGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJpbnB1dFwiICk7XG5cdFx0XHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwibmFtZVwiLCBcIlwiICk7XG5cdFx0XHRlbC5hcHBlbmRDaGlsZCggaW5wdXQgKTtcblx0XHRcdGlmICggIWVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiW25hbWU9JyddXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIlxcXFxbXCIgKyB3aGl0ZXNwYWNlICsgXCIqbmFtZVwiICsgd2hpdGVzcGFjZSArIFwiKj1cIiArXG5cdFx0XHRcdFx0d2hpdGVzcGFjZSArIFwiKig/OicnfFxcXCJcXFwiKVwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFdlYmtpdC9PcGVyYSAtIDpjaGVja2VkIHNob3VsZCByZXR1cm4gc2VsZWN0ZWQgb3B0aW9uIGVsZW1lbnRzXG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1JFQy1jc3MzLXNlbGVjdG9ycy0yMDExMDkyOS8jY2hlY2tlZFxuXHRcdFx0Ly8gSUU4IHRocm93cyBlcnJvciBoZXJlIGFuZCB3aWxsIG5vdCBzZWUgbGF0ZXIgdGVzdHNcblx0XHRcdGlmICggIWVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiOmNoZWNrZWRcIiApLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiOmNoZWNrZWRcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBTYWZhcmkgOCssIGlPUyA4K1xuXHRcdFx0Ly8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTEzNjg1MVxuXHRcdFx0Ly8gSW4tcGFnZSBgc2VsZWN0b3IjaWQgc2libGluZy1jb21iaW5hdG9yIHNlbGVjdG9yYCBmYWlsc1xuXHRcdFx0aWYgKCAhZWwucXVlcnlTZWxlY3RvckFsbCggXCJhI1wiICsgZXhwYW5kbyArIFwiKypcIiApLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiLiMuK1srfl1cIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBGaXJlZm94IDw9My42IC0gNSBvbmx5XG5cdFx0XHQvLyBPbGQgRmlyZWZveCBkb2Vzbid0IHRocm93IG9uIGEgYmFkbHktZXNjYXBlZCBpZGVudGlmaWVyLlxuXHRcdFx0ZWwucXVlcnlTZWxlY3RvckFsbCggXCJcXFxcXFxmXCIgKTtcblx0XHRcdHJidWdneVFTQS5wdXNoKCBcIltcXFxcclxcXFxuXFxcXGZdXCIgKTtcblx0XHR9ICk7XG5cblx0XHRhc3NlcnQoIGZ1bmN0aW9uKCBlbCApIHtcblx0XHRcdGVsLmlubmVySFRNTCA9IFwiPGEgaHJlZj0nJyBkaXNhYmxlZD0nZGlzYWJsZWQnPjwvYT5cIiArXG5cdFx0XHRcdFwiPHNlbGVjdCBkaXNhYmxlZD0nZGlzYWJsZWQnPjxvcHRpb24vPjwvc2VsZWN0PlwiO1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBXaW5kb3dzIDggTmF0aXZlIEFwcHNcblx0XHRcdC8vIFRoZSB0eXBlIGFuZCBuYW1lIGF0dHJpYnV0ZXMgYXJlIHJlc3RyaWN0ZWQgZHVyaW5nIC5pbm5lckhUTUwgYXNzaWdubWVudFxuXHRcdFx0dmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJpbnB1dFwiICk7XG5cdFx0XHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCBcImhpZGRlblwiICk7XG5cdFx0XHRlbC5hcHBlbmRDaGlsZCggaW5wdXQgKS5zZXRBdHRyaWJ1dGUoIFwibmFtZVwiLCBcIkRcIiApO1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRThcblx0XHRcdC8vIEVuZm9yY2UgY2FzZS1zZW5zaXRpdml0eSBvZiBuYW1lIGF0dHJpYnV0ZVxuXHRcdFx0aWYgKCBlbC5xdWVyeVNlbGVjdG9yQWxsKCBcIltuYW1lPWRdXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIm5hbWVcIiArIHdoaXRlc3BhY2UgKyBcIipbKl4kfCF+XT89XCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRkYgMy41IC0gOmVuYWJsZWQvOmRpc2FibGVkIGFuZCBoaWRkZW4gZWxlbWVudHMgKGhpZGRlbiBlbGVtZW50cyBhcmUgc3RpbGwgZW5hYmxlZClcblx0XHRcdC8vIElFOCB0aHJvd3MgZXJyb3IgaGVyZSBhbmQgd2lsbCBub3Qgc2VlIGxhdGVyIHRlc3RzXG5cdFx0XHRpZiAoIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiOmVuYWJsZWRcIiApLmxlbmd0aCAhPT0gMiApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiOmVuYWJsZWRcIiwgXCI6ZGlzYWJsZWRcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRTktMTErXG5cdFx0XHQvLyBJRSdzIDpkaXNhYmxlZCBzZWxlY3RvciBkb2VzIG5vdCBwaWNrIHVwIHRoZSBjaGlsZHJlbiBvZiBkaXNhYmxlZCBmaWVsZHNldHNcblx0XHRcdGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGVsICkuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0aWYgKCBlbC5xdWVyeVNlbGVjdG9yQWxsKCBcIjpkaXNhYmxlZFwiICkubGVuZ3RoICE9PSAyICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCI6ZW5hYmxlZFwiLCBcIjpkaXNhYmxlZFwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IE9wZXJhIDEwIC0gMTEgb25seVxuXHRcdFx0Ly8gT3BlcmEgMTAtMTEgZG9lcyBub3QgdGhyb3cgb24gcG9zdC1jb21tYSBpbnZhbGlkIHBzZXVkb3Ncblx0XHRcdGVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiKiw6eFwiICk7XG5cdFx0XHRyYnVnZ3lRU0EucHVzaCggXCIsLio6XCIgKTtcblx0XHR9ICk7XG5cdH1cblxuXHRpZiAoICggc3VwcG9ydC5tYXRjaGVzU2VsZWN0b3IgPSBybmF0aXZlLnRlc3QoICggbWF0Y2hlcyA9IGRvY0VsZW0ubWF0Y2hlcyB8fFxuXHRcdGRvY0VsZW0ud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZG9jRWxlbS5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRkb2NFbGVtLm9NYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRkb2NFbGVtLm1zTWF0Y2hlc1NlbGVjdG9yICkgKSApICkge1xuXG5cdFx0YXNzZXJ0KCBmdW5jdGlvbiggZWwgKSB7XG5cblx0XHRcdC8vIENoZWNrIHRvIHNlZSBpZiBpdCdzIHBvc3NpYmxlIHRvIGRvIG1hdGNoZXNTZWxlY3RvclxuXHRcdFx0Ly8gb24gYSBkaXNjb25uZWN0ZWQgbm9kZSAoSUUgOSlcblx0XHRcdHN1cHBvcnQuZGlzY29ubmVjdGVkTWF0Y2ggPSBtYXRjaGVzLmNhbGwoIGVsLCBcIipcIiApO1xuXG5cdFx0XHQvLyBUaGlzIHNob3VsZCBmYWlsIHdpdGggYW4gZXhjZXB0aW9uXG5cdFx0XHQvLyBHZWNrbyBkb2VzIG5vdCBlcnJvciwgcmV0dXJucyBmYWxzZSBpbnN0ZWFkXG5cdFx0XHRtYXRjaGVzLmNhbGwoIGVsLCBcIltzIT0nJ106eFwiICk7XG5cdFx0XHRyYnVnZ3lNYXRjaGVzLnB1c2goIFwiIT1cIiwgcHNldWRvcyApO1xuXHRcdH0gKTtcblx0fVxuXG5cdHJidWdneVFTQSA9IHJidWdneVFTQS5sZW5ndGggJiYgbmV3IFJlZ0V4cCggcmJ1Z2d5UVNBLmpvaW4oIFwifFwiICkgKTtcblx0cmJ1Z2d5TWF0Y2hlcyA9IHJidWdneU1hdGNoZXMubGVuZ3RoICYmIG5ldyBSZWdFeHAoIHJidWdneU1hdGNoZXMuam9pbiggXCJ8XCIgKSApO1xuXG5cdC8qIENvbnRhaW5zXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0aGFzQ29tcGFyZSA9IHJuYXRpdmUudGVzdCggZG9jRWxlbS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiApO1xuXG5cdC8vIEVsZW1lbnQgY29udGFpbnMgYW5vdGhlclxuXHQvLyBQdXJwb3NlZnVsbHkgc2VsZi1leGNsdXNpdmVcblx0Ly8gQXMgaW4sIGFuIGVsZW1lbnQgZG9lcyBub3QgY29udGFpbiBpdHNlbGZcblx0Y29udGFpbnMgPSBoYXNDb21wYXJlIHx8IHJuYXRpdmUudGVzdCggZG9jRWxlbS5jb250YWlucyApID9cblx0XHRmdW5jdGlvbiggYSwgYiApIHtcblx0XHRcdHZhciBhZG93biA9IGEubm9kZVR5cGUgPT09IDkgPyBhLmRvY3VtZW50RWxlbWVudCA6IGEsXG5cdFx0XHRcdGJ1cCA9IGIgJiYgYi5wYXJlbnROb2RlO1xuXHRcdFx0cmV0dXJuIGEgPT09IGJ1cCB8fCAhISggYnVwICYmIGJ1cC5ub2RlVHlwZSA9PT0gMSAmJiAoXG5cdFx0XHRcdGFkb3duLmNvbnRhaW5zID9cblx0XHRcdFx0XHRhZG93bi5jb250YWlucyggYnVwICkgOlxuXHRcdFx0XHRcdGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24gJiYgYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYnVwICkgJiAxNlxuXHRcdFx0KSApO1xuXHRcdH0gOlxuXHRcdGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdFx0aWYgKCBiICkge1xuXHRcdFx0XHR3aGlsZSAoICggYiA9IGIucGFyZW50Tm9kZSApICkge1xuXHRcdFx0XHRcdGlmICggYiA9PT0gYSApIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG5cblx0LyogU29ydGluZ1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gRG9jdW1lbnQgb3JkZXIgc29ydGluZ1xuXHRzb3J0T3JkZXIgPSBoYXNDb21wYXJlID9cblx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cblx0XHQvLyBGbGFnIGZvciBkdXBsaWNhdGUgcmVtb3ZhbFxuXHRcdGlmICggYSA9PT0gYiApIHtcblx0XHRcdGhhc0R1cGxpY2F0ZSA9IHRydWU7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHQvLyBTb3J0IG9uIG1ldGhvZCBleGlzdGVuY2UgaWYgb25seSBvbmUgaW5wdXQgaGFzIGNvbXBhcmVEb2N1bWVudFBvc2l0aW9uXG5cdFx0dmFyIGNvbXBhcmUgPSAhYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiAtICFiLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uO1xuXHRcdGlmICggY29tcGFyZSApIHtcblx0XHRcdHJldHVybiBjb21wYXJlO1xuXHRcdH1cblxuXHRcdC8vIENhbGN1bGF0ZSBwb3NpdGlvbiBpZiBib3RoIGlucHV0cyBiZWxvbmcgdG8gdGhlIHNhbWUgZG9jdW1lbnRcblx0XHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTcgLSAxOCtcblx0XHQvLyBJRS9FZGdlIHNvbWV0aW1lcyB0aHJvdyBhIFwiUGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvciB3aGVuIHN0cmljdC1jb21wYXJpbmdcblx0XHQvLyB0d28gZG9jdW1lbnRzOyBzaGFsbG93IGNvbXBhcmlzb25zIHdvcmsuXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXHRcdGNvbXBhcmUgPSAoIGEub3duZXJEb2N1bWVudCB8fCBhICkgPT0gKCBiLm93bmVyRG9jdW1lbnQgfHwgYiApID9cblx0XHRcdGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGIgKSA6XG5cblx0XHRcdC8vIE90aGVyd2lzZSB3ZSBrbm93IHRoZXkgYXJlIGRpc2Nvbm5lY3RlZFxuXHRcdFx0MTtcblxuXHRcdC8vIERpc2Nvbm5lY3RlZCBub2Rlc1xuXHRcdGlmICggY29tcGFyZSAmIDEgfHxcblx0XHRcdCggIXN1cHBvcnQuc29ydERldGFjaGVkICYmIGIuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGEgKSA9PT0gY29tcGFyZSApICkge1xuXG5cdFx0XHQvLyBDaG9vc2UgdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBpcyByZWxhdGVkIHRvIG91ciBwcmVmZXJyZWQgZG9jdW1lbnRcblx0XHRcdC8vIFN1cHBvcnQ6IElFIDExKywgRWRnZSAxNyAtIDE4K1xuXHRcdFx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdFx0XHQvLyB0d28gZG9jdW1lbnRzOyBzaGFsbG93IGNvbXBhcmlzb25zIHdvcmsuXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG5cdFx0XHRpZiAoIGEgPT0gZG9jdW1lbnQgfHwgYS5vd25lckRvY3VtZW50ID09IHByZWZlcnJlZERvYyAmJlxuXHRcdFx0XHRjb250YWlucyggcHJlZmVycmVkRG9jLCBhICkgKSB7XG5cdFx0XHRcdHJldHVybiAtMTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogSUUgMTErLCBFZGdlIDE3IC0gMTgrXG5cdFx0XHQvLyBJRS9FZGdlIHNvbWV0aW1lcyB0aHJvdyBhIFwiUGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvciB3aGVuIHN0cmljdC1jb21wYXJpbmdcblx0XHRcdC8vIHR3byBkb2N1bWVudHM7IHNoYWxsb3cgY29tcGFyaXNvbnMgd29yay5cblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcblx0XHRcdGlmICggYiA9PSBkb2N1bWVudCB8fCBiLm93bmVyRG9jdW1lbnQgPT0gcHJlZmVycmVkRG9jICYmXG5cdFx0XHRcdGNvbnRhaW5zKCBwcmVmZXJyZWREb2MsIGIgKSApIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE1haW50YWluIG9yaWdpbmFsIG9yZGVyXG5cdFx0XHRyZXR1cm4gc29ydElucHV0ID9cblx0XHRcdFx0KCBpbmRleE9mKCBzb3J0SW5wdXQsIGEgKSAtIGluZGV4T2YoIHNvcnRJbnB1dCwgYiApICkgOlxuXHRcdFx0XHQwO1xuXHRcdH1cblxuXHRcdHJldHVybiBjb21wYXJlICYgNCA/IC0xIDogMTtcblx0fSA6XG5cdGZ1bmN0aW9uKCBhLCBiICkge1xuXG5cdFx0Ly8gRXhpdCBlYXJseSBpZiB0aGUgbm9kZXMgYXJlIGlkZW50aWNhbFxuXHRcdGlmICggYSA9PT0gYiApIHtcblx0XHRcdGhhc0R1cGxpY2F0ZSA9IHRydWU7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHR2YXIgY3VyLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRhdXAgPSBhLnBhcmVudE5vZGUsXG5cdFx0XHRidXAgPSBiLnBhcmVudE5vZGUsXG5cdFx0XHRhcCA9IFsgYSBdLFxuXHRcdFx0YnAgPSBbIGIgXTtcblxuXHRcdC8vIFBhcmVudGxlc3Mgbm9kZXMgYXJlIGVpdGhlciBkb2N1bWVudHMgb3IgZGlzY29ubmVjdGVkXG5cdFx0aWYgKCAhYXVwIHx8ICFidXAgKSB7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFIDExKywgRWRnZSAxNyAtIDE4K1xuXHRcdFx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdFx0XHQvLyB0d28gZG9jdW1lbnRzOyBzaGFsbG93IGNvbXBhcmlzb25zIHdvcmsuXG5cdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBlcWVxZXEgKi9cblx0XHRcdHJldHVybiBhID09IGRvY3VtZW50ID8gLTEgOlxuXHRcdFx0XHRiID09IGRvY3VtZW50ID8gMSA6XG5cdFx0XHRcdC8qIGVzbGludC1lbmFibGUgZXFlcWVxICovXG5cdFx0XHRcdGF1cCA/IC0xIDpcblx0XHRcdFx0YnVwID8gMSA6XG5cdFx0XHRcdHNvcnRJbnB1dCA/XG5cdFx0XHRcdCggaW5kZXhPZiggc29ydElucHV0LCBhICkgLSBpbmRleE9mKCBzb3J0SW5wdXQsIGIgKSApIDpcblx0XHRcdFx0MDtcblxuXHRcdC8vIElmIHRoZSBub2RlcyBhcmUgc2libGluZ3MsIHdlIGNhbiBkbyBhIHF1aWNrIGNoZWNrXG5cdFx0fSBlbHNlIGlmICggYXVwID09PSBidXAgKSB7XG5cdFx0XHRyZXR1cm4gc2libGluZ0NoZWNrKCBhLCBiICk7XG5cdFx0fVxuXG5cdFx0Ly8gT3RoZXJ3aXNlIHdlIG5lZWQgZnVsbCBsaXN0cyBvZiB0aGVpciBhbmNlc3RvcnMgZm9yIGNvbXBhcmlzb25cblx0XHRjdXIgPSBhO1xuXHRcdHdoaWxlICggKCBjdXIgPSBjdXIucGFyZW50Tm9kZSApICkge1xuXHRcdFx0YXAudW5zaGlmdCggY3VyICk7XG5cdFx0fVxuXHRcdGN1ciA9IGI7XG5cdFx0d2hpbGUgKCAoIGN1ciA9IGN1ci5wYXJlbnROb2RlICkgKSB7XG5cdFx0XHRicC51bnNoaWZ0KCBjdXIgKTtcblx0XHR9XG5cblx0XHQvLyBXYWxrIGRvd24gdGhlIHRyZWUgbG9va2luZyBmb3IgYSBkaXNjcmVwYW5jeVxuXHRcdHdoaWxlICggYXBbIGkgXSA9PT0gYnBbIGkgXSApIHtcblx0XHRcdGkrKztcblx0XHR9XG5cblx0XHRyZXR1cm4gaSA/XG5cblx0XHRcdC8vIERvIGEgc2libGluZyBjaGVjayBpZiB0aGUgbm9kZXMgaGF2ZSBhIGNvbW1vbiBhbmNlc3RvclxuXHRcdFx0c2libGluZ0NoZWNrKCBhcFsgaSBdLCBicFsgaSBdICkgOlxuXG5cdFx0XHQvLyBPdGhlcndpc2Ugbm9kZXMgaW4gb3VyIGRvY3VtZW50IHNvcnQgZmlyc3Rcblx0XHRcdC8vIFN1cHBvcnQ6IElFIDExKywgRWRnZSAxNyAtIDE4K1xuXHRcdFx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdFx0XHQvLyB0d28gZG9jdW1lbnRzOyBzaGFsbG93IGNvbXBhcmlzb25zIHdvcmsuXG5cdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBlcWVxZXEgKi9cblx0XHRcdGFwWyBpIF0gPT0gcHJlZmVycmVkRG9jID8gLTEgOlxuXHRcdFx0YnBbIGkgXSA9PSBwcmVmZXJyZWREb2MgPyAxIDpcblx0XHRcdC8qIGVzbGludC1lbmFibGUgZXFlcWVxICovXG5cdFx0XHQwO1xuXHR9O1xuXG5cdHJldHVybiBkb2N1bWVudDtcbn07XG5cblNpenpsZS5tYXRjaGVzID0gZnVuY3Rpb24oIGV4cHIsIGVsZW1lbnRzICkge1xuXHRyZXR1cm4gU2l6emxlKCBleHByLCBudWxsLCBudWxsLCBlbGVtZW50cyApO1xufTtcblxuU2l6emxlLm1hdGNoZXNTZWxlY3RvciA9IGZ1bmN0aW9uKCBlbGVtLCBleHByICkge1xuXHRzZXREb2N1bWVudCggZWxlbSApO1xuXG5cdGlmICggc3VwcG9ydC5tYXRjaGVzU2VsZWN0b3IgJiYgZG9jdW1lbnRJc0hUTUwgJiZcblx0XHQhbm9ubmF0aXZlU2VsZWN0b3JDYWNoZVsgZXhwciArIFwiIFwiIF0gJiZcblx0XHQoICFyYnVnZ3lNYXRjaGVzIHx8ICFyYnVnZ3lNYXRjaGVzLnRlc3QoIGV4cHIgKSApICYmXG5cdFx0KCAhcmJ1Z2d5UVNBICAgICB8fCAhcmJ1Z2d5UVNBLnRlc3QoIGV4cHIgKSApICkge1xuXG5cdFx0dHJ5IHtcblx0XHRcdHZhciByZXQgPSBtYXRjaGVzLmNhbGwoIGVsZW0sIGV4cHIgKTtcblxuXHRcdFx0Ly8gSUUgOSdzIG1hdGNoZXNTZWxlY3RvciByZXR1cm5zIGZhbHNlIG9uIGRpc2Nvbm5lY3RlZCBub2Rlc1xuXHRcdFx0aWYgKCByZXQgfHwgc3VwcG9ydC5kaXNjb25uZWN0ZWRNYXRjaCB8fFxuXG5cdFx0XHRcdC8vIEFzIHdlbGwsIGRpc2Nvbm5lY3RlZCBub2RlcyBhcmUgc2FpZCB0byBiZSBpbiBhIGRvY3VtZW50XG5cdFx0XHRcdC8vIGZyYWdtZW50IGluIElFIDlcblx0XHRcdFx0ZWxlbS5kb2N1bWVudCAmJiBlbGVtLmRvY3VtZW50Lm5vZGVUeXBlICE9PSAxMSApIHtcblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH1cblx0XHR9IGNhdGNoICggZSApIHtcblx0XHRcdG5vbm5hdGl2ZVNlbGVjdG9yQ2FjaGUoIGV4cHIsIHRydWUgKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gU2l6emxlKCBleHByLCBkb2N1bWVudCwgbnVsbCwgWyBlbGVtIF0gKS5sZW5ndGggPiAwO1xufTtcblxuU2l6emxlLmNvbnRhaW5zID0gZnVuY3Rpb24oIGNvbnRleHQsIGVsZW0gKSB7XG5cblx0Ly8gU2V0IGRvY3VtZW50IHZhcnMgaWYgbmVlZGVkXG5cdC8vIFN1cHBvcnQ6IElFIDExKywgRWRnZSAxNyAtIDE4K1xuXHQvLyBJRS9FZGdlIHNvbWV0aW1lcyB0aHJvdyBhIFwiUGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvciB3aGVuIHN0cmljdC1jb21wYXJpbmdcblx0Ly8gdHdvIGRvY3VtZW50czsgc2hhbGxvdyBjb21wYXJpc29ucyB3b3JrLlxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG5cdGlmICggKCBjb250ZXh0Lm93bmVyRG9jdW1lbnQgfHwgY29udGV4dCApICE9IGRvY3VtZW50ICkge1xuXHRcdHNldERvY3VtZW50KCBjb250ZXh0ICk7XG5cdH1cblx0cmV0dXJuIGNvbnRhaW5zKCBjb250ZXh0LCBlbGVtICk7XG59O1xuXG5TaXp6bGUuYXR0ciA9IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuXG5cdC8vIFNldCBkb2N1bWVudCB2YXJzIGlmIG5lZWRlZFxuXHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTcgLSAxOCtcblx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdC8vIHR3byBkb2N1bWVudHM7IHNoYWxsb3cgY29tcGFyaXNvbnMgd29yay5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXHRpZiAoICggZWxlbS5vd25lckRvY3VtZW50IHx8IGVsZW0gKSAhPSBkb2N1bWVudCApIHtcblx0XHRzZXREb2N1bWVudCggZWxlbSApO1xuXHR9XG5cblx0dmFyIGZuID0gRXhwci5hdHRySGFuZGxlWyBuYW1lLnRvTG93ZXJDYXNlKCkgXSxcblxuXHRcdC8vIERvbid0IGdldCBmb29sZWQgYnkgT2JqZWN0LnByb3RvdHlwZSBwcm9wZXJ0aWVzIChqUXVlcnkgIzEzODA3KVxuXHRcdHZhbCA9IGZuICYmIGhhc093bi5jYWxsKCBFeHByLmF0dHJIYW5kbGUsIG5hbWUudG9Mb3dlckNhc2UoKSApID9cblx0XHRcdGZuKCBlbGVtLCBuYW1lLCAhZG9jdW1lbnRJc0hUTUwgKSA6XG5cdFx0XHR1bmRlZmluZWQ7XG5cblx0cmV0dXJuIHZhbCAhPT0gdW5kZWZpbmVkID9cblx0XHR2YWwgOlxuXHRcdHN1cHBvcnQuYXR0cmlidXRlcyB8fCAhZG9jdW1lbnRJc0hUTUwgP1xuXHRcdFx0ZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUgKSA6XG5cdFx0XHQoIHZhbCA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZSggbmFtZSApICkgJiYgdmFsLnNwZWNpZmllZCA/XG5cdFx0XHRcdHZhbC52YWx1ZSA6XG5cdFx0XHRcdG51bGw7XG59O1xuXG5TaXp6bGUuZXNjYXBlID0gZnVuY3Rpb24oIHNlbCApIHtcblx0cmV0dXJuICggc2VsICsgXCJcIiApLnJlcGxhY2UoIHJjc3Nlc2NhcGUsIGZjc3Nlc2NhcGUgKTtcbn07XG5cblNpenpsZS5lcnJvciA9IGZ1bmN0aW9uKCBtc2cgKSB7XG5cdHRocm93IG5ldyBFcnJvciggXCJTeW50YXggZXJyb3IsIHVucmVjb2duaXplZCBleHByZXNzaW9uOiBcIiArIG1zZyApO1xufTtcblxuLyoqXG4gKiBEb2N1bWVudCBzb3J0aW5nIGFuZCByZW1vdmluZyBkdXBsaWNhdGVzXG4gKiBAcGFyYW0ge0FycmF5TGlrZX0gcmVzdWx0c1xuICovXG5TaXp6bGUudW5pcXVlU29ydCA9IGZ1bmN0aW9uKCByZXN1bHRzICkge1xuXHR2YXIgZWxlbSxcblx0XHRkdXBsaWNhdGVzID0gW10sXG5cdFx0aiA9IDAsXG5cdFx0aSA9IDA7XG5cblx0Ly8gVW5sZXNzIHdlICprbm93KiB3ZSBjYW4gZGV0ZWN0IGR1cGxpY2F0ZXMsIGFzc3VtZSB0aGVpciBwcmVzZW5jZVxuXHRoYXNEdXBsaWNhdGUgPSAhc3VwcG9ydC5kZXRlY3REdXBsaWNhdGVzO1xuXHRzb3J0SW5wdXQgPSAhc3VwcG9ydC5zb3J0U3RhYmxlICYmIHJlc3VsdHMuc2xpY2UoIDAgKTtcblx0cmVzdWx0cy5zb3J0KCBzb3J0T3JkZXIgKTtcblxuXHRpZiAoIGhhc0R1cGxpY2F0ZSApIHtcblx0XHR3aGlsZSAoICggZWxlbSA9IHJlc3VsdHNbIGkrKyBdICkgKSB7XG5cdFx0XHRpZiAoIGVsZW0gPT09IHJlc3VsdHNbIGkgXSApIHtcblx0XHRcdFx0aiA9IGR1cGxpY2F0ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR3aGlsZSAoIGotLSApIHtcblx0XHRcdHJlc3VsdHMuc3BsaWNlKCBkdXBsaWNhdGVzWyBqIF0sIDEgKTtcblx0XHR9XG5cdH1cblxuXHQvLyBDbGVhciBpbnB1dCBhZnRlciBzb3J0aW5nIHRvIHJlbGVhc2Ugb2JqZWN0c1xuXHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9zaXp6bGUvcHVsbC8yMjVcblx0c29ydElucHV0ID0gbnVsbDtcblxuXHRyZXR1cm4gcmVzdWx0cztcbn07XG5cbi8qKlxuICogVXRpbGl0eSBmdW5jdGlvbiBmb3IgcmV0cmlldmluZyB0aGUgdGV4dCB2YWx1ZSBvZiBhbiBhcnJheSBvZiBET00gbm9kZXNcbiAqIEBwYXJhbSB7QXJyYXl8RWxlbWVudH0gZWxlbVxuICovXG5nZXRUZXh0ID0gU2l6emxlLmdldFRleHQgPSBmdW5jdGlvbiggZWxlbSApIHtcblx0dmFyIG5vZGUsXG5cdFx0cmV0ID0gXCJcIixcblx0XHRpID0gMCxcblx0XHRub2RlVHlwZSA9IGVsZW0ubm9kZVR5cGU7XG5cblx0aWYgKCAhbm9kZVR5cGUgKSB7XG5cblx0XHQvLyBJZiBubyBub2RlVHlwZSwgdGhpcyBpcyBleHBlY3RlZCB0byBiZSBhbiBhcnJheVxuXHRcdHdoaWxlICggKCBub2RlID0gZWxlbVsgaSsrIF0gKSApIHtcblxuXHRcdFx0Ly8gRG8gbm90IHRyYXZlcnNlIGNvbW1lbnQgbm9kZXNcblx0XHRcdHJldCArPSBnZXRUZXh0KCBub2RlICk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKCBub2RlVHlwZSA9PT0gMSB8fCBub2RlVHlwZSA9PT0gOSB8fCBub2RlVHlwZSA9PT0gMTEgKSB7XG5cblx0XHQvLyBVc2UgdGV4dENvbnRlbnQgZm9yIGVsZW1lbnRzXG5cdFx0Ly8gaW5uZXJUZXh0IHVzYWdlIHJlbW92ZWQgZm9yIGNvbnNpc3RlbmN5IG9mIG5ldyBsaW5lcyAoalF1ZXJ5ICMxMTE1Mylcblx0XHRpZiAoIHR5cGVvZiBlbGVtLnRleHRDb250ZW50ID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIGVsZW0udGV4dENvbnRlbnQ7XG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gVHJhdmVyc2UgaXRzIGNoaWxkcmVuXG5cdFx0XHRmb3IgKCBlbGVtID0gZWxlbS5maXJzdENoaWxkOyBlbGVtOyBlbGVtID0gZWxlbS5uZXh0U2libGluZyApIHtcblx0XHRcdFx0cmV0ICs9IGdldFRleHQoIGVsZW0gKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSBpZiAoIG5vZGVUeXBlID09PSAzIHx8IG5vZGVUeXBlID09PSA0ICkge1xuXHRcdHJldHVybiBlbGVtLm5vZGVWYWx1ZTtcblx0fVxuXG5cdC8vIERvIG5vdCBpbmNsdWRlIGNvbW1lbnQgb3IgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbiBub2Rlc1xuXG5cdHJldHVybiByZXQ7XG59O1xuXG5FeHByID0gU2l6emxlLnNlbGVjdG9ycyA9IHtcblxuXHQvLyBDYW4gYmUgYWRqdXN0ZWQgYnkgdGhlIHVzZXJcblx0Y2FjaGVMZW5ndGg6IDUwLFxuXG5cdGNyZWF0ZVBzZXVkbzogbWFya0Z1bmN0aW9uLFxuXG5cdG1hdGNoOiBtYXRjaEV4cHIsXG5cblx0YXR0ckhhbmRsZToge30sXG5cblx0ZmluZDoge30sXG5cblx0cmVsYXRpdmU6IHtcblx0XHRcIj5cIjogeyBkaXI6IFwicGFyZW50Tm9kZVwiLCBmaXJzdDogdHJ1ZSB9LFxuXHRcdFwiIFwiOiB7IGRpcjogXCJwYXJlbnROb2RlXCIgfSxcblx0XHRcIitcIjogeyBkaXI6IFwicHJldmlvdXNTaWJsaW5nXCIsIGZpcnN0OiB0cnVlIH0sXG5cdFx0XCJ+XCI6IHsgZGlyOiBcInByZXZpb3VzU2libGluZ1wiIH1cblx0fSxcblxuXHRwcmVGaWx0ZXI6IHtcblx0XHRcIkFUVFJcIjogZnVuY3Rpb24oIG1hdGNoICkge1xuXHRcdFx0bWF0Y2hbIDEgXSA9IG1hdGNoWyAxIF0ucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblxuXHRcdFx0Ly8gTW92ZSB0aGUgZ2l2ZW4gdmFsdWUgdG8gbWF0Y2hbM10gd2hldGhlciBxdW90ZWQgb3IgdW5xdW90ZWRcblx0XHRcdG1hdGNoWyAzIF0gPSAoIG1hdGNoWyAzIF0gfHwgbWF0Y2hbIDQgXSB8fFxuXHRcdFx0XHRtYXRjaFsgNSBdIHx8IFwiXCIgKS5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXG5cdFx0XHRpZiAoIG1hdGNoWyAyIF0gPT09IFwifj1cIiApIHtcblx0XHRcdFx0bWF0Y2hbIDMgXSA9IFwiIFwiICsgbWF0Y2hbIDMgXSArIFwiIFwiO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbWF0Y2guc2xpY2UoIDAsIDQgKTtcblx0XHR9LFxuXG5cdFx0XCJDSElMRFwiOiBmdW5jdGlvbiggbWF0Y2ggKSB7XG5cblx0XHRcdC8qIG1hdGNoZXMgZnJvbSBtYXRjaEV4cHJbXCJDSElMRFwiXVxuXHRcdFx0XHQxIHR5cGUgKG9ubHl8bnRofC4uLilcblx0XHRcdFx0MiB3aGF0IChjaGlsZHxvZi10eXBlKVxuXHRcdFx0XHQzIGFyZ3VtZW50IChldmVufG9kZHxcXGQqfFxcZCpuKFsrLV1cXGQrKT98Li4uKVxuXHRcdFx0XHQ0IHhuLWNvbXBvbmVudCBvZiB4bit5IGFyZ3VtZW50IChbKy1dP1xcZCpufClcblx0XHRcdFx0NSBzaWduIG9mIHhuLWNvbXBvbmVudFxuXHRcdFx0XHQ2IHggb2YgeG4tY29tcG9uZW50XG5cdFx0XHRcdDcgc2lnbiBvZiB5LWNvbXBvbmVudFxuXHRcdFx0XHQ4IHkgb2YgeS1jb21wb25lbnRcblx0XHRcdCovXG5cdFx0XHRtYXRjaFsgMSBdID0gbWF0Y2hbIDEgXS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0XHRpZiAoIG1hdGNoWyAxIF0uc2xpY2UoIDAsIDMgKSA9PT0gXCJudGhcIiApIHtcblxuXHRcdFx0XHQvLyBudGgtKiByZXF1aXJlcyBhcmd1bWVudFxuXHRcdFx0XHRpZiAoICFtYXRjaFsgMyBdICkge1xuXHRcdFx0XHRcdFNpenpsZS5lcnJvciggbWF0Y2hbIDAgXSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gbnVtZXJpYyB4IGFuZCB5IHBhcmFtZXRlcnMgZm9yIEV4cHIuZmlsdGVyLkNISUxEXG5cdFx0XHRcdC8vIHJlbWVtYmVyIHRoYXQgZmFsc2UvdHJ1ZSBjYXN0IHJlc3BlY3RpdmVseSB0byAwLzFcblx0XHRcdFx0bWF0Y2hbIDQgXSA9ICsoIG1hdGNoWyA0IF0gP1xuXHRcdFx0XHRcdG1hdGNoWyA1IF0gKyAoIG1hdGNoWyA2IF0gfHwgMSApIDpcblx0XHRcdFx0XHQyICogKCBtYXRjaFsgMyBdID09PSBcImV2ZW5cIiB8fCBtYXRjaFsgMyBdID09PSBcIm9kZFwiICkgKTtcblx0XHRcdFx0bWF0Y2hbIDUgXSA9ICsoICggbWF0Y2hbIDcgXSArIG1hdGNoWyA4IF0gKSB8fCBtYXRjaFsgMyBdID09PSBcIm9kZFwiICk7XG5cblx0XHRcdFx0Ly8gb3RoZXIgdHlwZXMgcHJvaGliaXQgYXJndW1lbnRzXG5cdFx0XHR9IGVsc2UgaWYgKCBtYXRjaFsgMyBdICkge1xuXHRcdFx0XHRTaXp6bGUuZXJyb3IoIG1hdGNoWyAwIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG1hdGNoO1xuXHRcdH0sXG5cblx0XHRcIlBTRVVET1wiOiBmdW5jdGlvbiggbWF0Y2ggKSB7XG5cdFx0XHR2YXIgZXhjZXNzLFxuXHRcdFx0XHR1bnF1b3RlZCA9ICFtYXRjaFsgNiBdICYmIG1hdGNoWyAyIF07XG5cblx0XHRcdGlmICggbWF0Y2hFeHByWyBcIkNISUxEXCIgXS50ZXN0KCBtYXRjaFsgMCBdICkgKSB7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBY2NlcHQgcXVvdGVkIGFyZ3VtZW50cyBhcy1pc1xuXHRcdFx0aWYgKCBtYXRjaFsgMyBdICkge1xuXHRcdFx0XHRtYXRjaFsgMiBdID0gbWF0Y2hbIDQgXSB8fCBtYXRjaFsgNSBdIHx8IFwiXCI7XG5cblx0XHRcdC8vIFN0cmlwIGV4Y2VzcyBjaGFyYWN0ZXJzIGZyb20gdW5xdW90ZWQgYXJndW1lbnRzXG5cdFx0XHR9IGVsc2UgaWYgKCB1bnF1b3RlZCAmJiBycHNldWRvLnRlc3QoIHVucXVvdGVkICkgJiZcblxuXHRcdFx0XHQvLyBHZXQgZXhjZXNzIGZyb20gdG9rZW5pemUgKHJlY3Vyc2l2ZWx5KVxuXHRcdFx0XHQoIGV4Y2VzcyA9IHRva2VuaXplKCB1bnF1b3RlZCwgdHJ1ZSApICkgJiZcblxuXHRcdFx0XHQvLyBhZHZhbmNlIHRvIHRoZSBuZXh0IGNsb3NpbmcgcGFyZW50aGVzaXNcblx0XHRcdFx0KCBleGNlc3MgPSB1bnF1b3RlZC5pbmRleE9mKCBcIilcIiwgdW5xdW90ZWQubGVuZ3RoIC0gZXhjZXNzICkgLSB1bnF1b3RlZC5sZW5ndGggKSApIHtcblxuXHRcdFx0XHQvLyBleGNlc3MgaXMgYSBuZWdhdGl2ZSBpbmRleFxuXHRcdFx0XHRtYXRjaFsgMCBdID0gbWF0Y2hbIDAgXS5zbGljZSggMCwgZXhjZXNzICk7XG5cdFx0XHRcdG1hdGNoWyAyIF0gPSB1bnF1b3RlZC5zbGljZSggMCwgZXhjZXNzICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJldHVybiBvbmx5IGNhcHR1cmVzIG5lZWRlZCBieSB0aGUgcHNldWRvIGZpbHRlciBtZXRob2QgKHR5cGUgYW5kIGFyZ3VtZW50KVxuXHRcdFx0cmV0dXJuIG1hdGNoLnNsaWNlKCAwLCAzICk7XG5cdFx0fVxuXHR9LFxuXG5cdGZpbHRlcjoge1xuXG5cdFx0XCJUQUdcIjogZnVuY3Rpb24oIG5vZGVOYW1lU2VsZWN0b3IgKSB7XG5cdFx0XHR2YXIgbm9kZU5hbWUgPSBub2RlTmFtZVNlbGVjdG9yLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICkudG9Mb3dlckNhc2UoKTtcblx0XHRcdHJldHVybiBub2RlTmFtZVNlbGVjdG9yID09PSBcIipcIiA/XG5cdFx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9IDpcblx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVsZW0ubm9kZU5hbWUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBub2RlTmFtZTtcblx0XHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0XCJDTEFTU1wiOiBmdW5jdGlvbiggY2xhc3NOYW1lICkge1xuXHRcdFx0dmFyIHBhdHRlcm4gPSBjbGFzc0NhY2hlWyBjbGFzc05hbWUgKyBcIiBcIiBdO1xuXG5cdFx0XHRyZXR1cm4gcGF0dGVybiB8fFxuXHRcdFx0XHQoIHBhdHRlcm4gPSBuZXcgUmVnRXhwKCBcIihefFwiICsgd2hpdGVzcGFjZSArXG5cdFx0XHRcdFx0XCIpXCIgKyBjbGFzc05hbWUgKyBcIihcIiArIHdoaXRlc3BhY2UgKyBcInwkKVwiICkgKSAmJiBjbGFzc0NhY2hlKFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHBhdHRlcm4udGVzdChcblx0XHRcdFx0XHRcdFx0XHR0eXBlb2YgZWxlbS5jbGFzc05hbWUgPT09IFwic3RyaW5nXCIgJiYgZWxlbS5jbGFzc05hbWUgfHxcblx0XHRcdFx0XHRcdFx0XHR0eXBlb2YgZWxlbS5nZXRBdHRyaWJ1dGUgIT09IFwidW5kZWZpbmVkXCIgJiZcblx0XHRcdFx0XHRcdFx0XHRcdGVsZW0uZ2V0QXR0cmlidXRlKCBcImNsYXNzXCIgKSB8fFxuXHRcdFx0XHRcdFx0XHRcdFwiXCJcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0fSApO1xuXHRcdH0sXG5cblx0XHRcIkFUVFJcIjogZnVuY3Rpb24oIG5hbWUsIG9wZXJhdG9yLCBjaGVjayApIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IFNpenpsZS5hdHRyKCBlbGVtLCBuYW1lICk7XG5cblx0XHRcdFx0aWYgKCByZXN1bHQgPT0gbnVsbCApIHtcblx0XHRcdFx0XHRyZXR1cm4gb3BlcmF0b3IgPT09IFwiIT1cIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoICFvcGVyYXRvciApIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlc3VsdCArPSBcIlwiO1xuXG5cdFx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cblxuXHRcdFx0XHRyZXR1cm4gb3BlcmF0b3IgPT09IFwiPVwiID8gcmVzdWx0ID09PSBjaGVjayA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwiIT1cIiA/IHJlc3VsdCAhPT0gY2hlY2sgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIl49XCIgPyBjaGVjayAmJiByZXN1bHQuaW5kZXhPZiggY2hlY2sgKSA9PT0gMCA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwiKj1cIiA/IGNoZWNrICYmIHJlc3VsdC5pbmRleE9mKCBjaGVjayApID4gLTEgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIiQ9XCIgPyBjaGVjayAmJiByZXN1bHQuc2xpY2UoIC1jaGVjay5sZW5ndGggKSA9PT0gY2hlY2sgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIn49XCIgPyAoIFwiIFwiICsgcmVzdWx0LnJlcGxhY2UoIHJ3aGl0ZXNwYWNlLCBcIiBcIiApICsgXCIgXCIgKS5pbmRleE9mKCBjaGVjayApID4gLTEgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcInw9XCIgPyByZXN1bHQgPT09IGNoZWNrIHx8IHJlc3VsdC5zbGljZSggMCwgY2hlY2subGVuZ3RoICsgMSApID09PSBjaGVjayArIFwiLVwiIDpcblx0XHRcdFx0XHRmYWxzZTtcblx0XHRcdFx0LyogZXNsaW50LWVuYWJsZSBtYXgtbGVuICovXG5cblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdFwiQ0hJTERcIjogZnVuY3Rpb24oIHR5cGUsIHdoYXQsIF9hcmd1bWVudCwgZmlyc3QsIGxhc3QgKSB7XG5cdFx0XHR2YXIgc2ltcGxlID0gdHlwZS5zbGljZSggMCwgMyApICE9PSBcIm50aFwiLFxuXHRcdFx0XHRmb3J3YXJkID0gdHlwZS5zbGljZSggLTQgKSAhPT0gXCJsYXN0XCIsXG5cdFx0XHRcdG9mVHlwZSA9IHdoYXQgPT09IFwib2YtdHlwZVwiO1xuXG5cdFx0XHRyZXR1cm4gZmlyc3QgPT09IDEgJiYgbGFzdCA9PT0gMCA/XG5cblx0XHRcdFx0Ly8gU2hvcnRjdXQgZm9yIDpudGgtKihuKVxuXHRcdFx0XHRmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0XHRyZXR1cm4gISFlbGVtLnBhcmVudE5vZGU7XG5cdFx0XHRcdH0gOlxuXG5cdFx0XHRcdGZ1bmN0aW9uKCBlbGVtLCBfY29udGV4dCwgeG1sICkge1xuXHRcdFx0XHRcdHZhciBjYWNoZSwgdW5pcXVlQ2FjaGUsIG91dGVyQ2FjaGUsIG5vZGUsIG5vZGVJbmRleCwgc3RhcnQsXG5cdFx0XHRcdFx0XHRkaXIgPSBzaW1wbGUgIT09IGZvcndhcmQgPyBcIm5leHRTaWJsaW5nXCIgOiBcInByZXZpb3VzU2libGluZ1wiLFxuXHRcdFx0XHRcdFx0cGFyZW50ID0gZWxlbS5wYXJlbnROb2RlLFxuXHRcdFx0XHRcdFx0bmFtZSA9IG9mVHlwZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCksXG5cdFx0XHRcdFx0XHR1c2VDYWNoZSA9ICF4bWwgJiYgIW9mVHlwZSxcblx0XHRcdFx0XHRcdGRpZmYgPSBmYWxzZTtcblxuXHRcdFx0XHRcdGlmICggcGFyZW50ICkge1xuXG5cdFx0XHRcdFx0XHQvLyA6KGZpcnN0fGxhc3R8b25seSktKGNoaWxkfG9mLXR5cGUpXG5cdFx0XHRcdFx0XHRpZiAoIHNpbXBsZSApIHtcblx0XHRcdFx0XHRcdFx0d2hpbGUgKCBkaXIgKSB7XG5cdFx0XHRcdFx0XHRcdFx0bm9kZSA9IGVsZW07XG5cdFx0XHRcdFx0XHRcdFx0d2hpbGUgKCAoIG5vZGUgPSBub2RlWyBkaXIgXSApICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBvZlR5cGUgP1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUgOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRub2RlLm5vZGVUeXBlID09PSAxICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBSZXZlcnNlIGRpcmVjdGlvbiBmb3IgOm9ubHktKiAoaWYgd2UgaGF2ZW4ndCB5ZXQgZG9uZSBzbylcblx0XHRcdFx0XHRcdFx0XHRzdGFydCA9IGRpciA9IHR5cGUgPT09IFwib25seVwiICYmICFzdGFydCAmJiBcIm5leHRTaWJsaW5nXCI7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHN0YXJ0ID0gWyBmb3J3YXJkID8gcGFyZW50LmZpcnN0Q2hpbGQgOiBwYXJlbnQubGFzdENoaWxkIF07XG5cblx0XHRcdFx0XHRcdC8vIG5vbi14bWwgOm50aC1jaGlsZCguLi4pIHN0b3JlcyBjYWNoZSBkYXRhIG9uIGBwYXJlbnRgXG5cdFx0XHRcdFx0XHRpZiAoIGZvcndhcmQgJiYgdXNlQ2FjaGUgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gU2VlayBgZWxlbWAgZnJvbSBhIHByZXZpb3VzbHktY2FjaGVkIGluZGV4XG5cblx0XHRcdFx0XHRcdFx0Ly8gLi4uaW4gYSBnemlwLWZyaWVuZGx5IHdheVxuXHRcdFx0XHRcdFx0XHRub2RlID0gcGFyZW50O1xuXHRcdFx0XHRcdFx0XHRvdXRlckNhY2hlID0gbm9kZVsgZXhwYW5kbyBdIHx8ICggbm9kZVsgZXhwYW5kbyBdID0ge30gKTtcblxuXHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8OSBvbmx5XG5cdFx0XHRcdFx0XHRcdC8vIERlZmVuZCBhZ2FpbnN0IGNsb25lZCBhdHRyb3BlcnRpZXMgKGpRdWVyeSBnaC0xNzA5KVxuXHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZSA9IG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSB8fFxuXHRcdFx0XHRcdFx0XHRcdCggb3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdID0ge30gKTtcblxuXHRcdFx0XHRcdFx0XHRjYWNoZSA9IHVuaXF1ZUNhY2hlWyB0eXBlIF0gfHwgW107XG5cdFx0XHRcdFx0XHRcdG5vZGVJbmRleCA9IGNhY2hlWyAwIF0gPT09IGRpcnJ1bnMgJiYgY2FjaGVbIDEgXTtcblx0XHRcdFx0XHRcdFx0ZGlmZiA9IG5vZGVJbmRleCAmJiBjYWNoZVsgMiBdO1xuXHRcdFx0XHRcdFx0XHRub2RlID0gbm9kZUluZGV4ICYmIHBhcmVudC5jaGlsZE5vZGVzWyBub2RlSW5kZXggXTtcblxuXHRcdFx0XHRcdFx0XHR3aGlsZSAoICggbm9kZSA9ICsrbm9kZUluZGV4ICYmIG5vZGUgJiYgbm9kZVsgZGlyIF0gfHxcblxuXHRcdFx0XHRcdFx0XHRcdC8vIEZhbGxiYWNrIHRvIHNlZWtpbmcgYGVsZW1gIGZyb20gdGhlIHN0YXJ0XG5cdFx0XHRcdFx0XHRcdFx0KCBkaWZmID0gbm9kZUluZGV4ID0gMCApIHx8IHN0YXJ0LnBvcCgpICkgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBXaGVuIGZvdW5kLCBjYWNoZSBpbmRleGVzIG9uIGBwYXJlbnRgIGFuZCBicmVha1xuXHRcdFx0XHRcdFx0XHRcdGlmICggbm9kZS5ub2RlVHlwZSA9PT0gMSAmJiArK2RpZmYgJiYgbm9kZSA9PT0gZWxlbSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlWyB0eXBlIF0gPSBbIGRpcnJ1bnMsIG5vZGVJbmRleCwgZGlmZiBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gVXNlIHByZXZpb3VzbHktY2FjaGVkIGVsZW1lbnQgaW5kZXggaWYgYXZhaWxhYmxlXG5cdFx0XHRcdFx0XHRcdGlmICggdXNlQ2FjaGUgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyAuLi5pbiBhIGd6aXAtZnJpZW5kbHkgd2F5XG5cdFx0XHRcdFx0XHRcdFx0bm9kZSA9IGVsZW07XG5cdFx0XHRcdFx0XHRcdFx0b3V0ZXJDYWNoZSA9IG5vZGVbIGV4cGFuZG8gXSB8fCAoIG5vZGVbIGV4cGFuZG8gXSA9IHt9ICk7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8OSBvbmx5XG5cdFx0XHRcdFx0XHRcdFx0Ly8gRGVmZW5kIGFnYWluc3QgY2xvbmVkIGF0dHJvcGVydGllcyAoalF1ZXJ5IGdoLTE3MDkpXG5cdFx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGUgPSBvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gfHxcblx0XHRcdFx0XHRcdFx0XHRcdCggb3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdID0ge30gKTtcblxuXHRcdFx0XHRcdFx0XHRcdGNhY2hlID0gdW5pcXVlQ2FjaGVbIHR5cGUgXSB8fCBbXTtcblx0XHRcdFx0XHRcdFx0XHRub2RlSW5kZXggPSBjYWNoZVsgMCBdID09PSBkaXJydW5zICYmIGNhY2hlWyAxIF07XG5cdFx0XHRcdFx0XHRcdFx0ZGlmZiA9IG5vZGVJbmRleDtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdC8vIHhtbCA6bnRoLWNoaWxkKC4uLilcblx0XHRcdFx0XHRcdFx0Ly8gb3IgOm50aC1sYXN0LWNoaWxkKC4uLikgb3IgOm50aCgtbGFzdCk/LW9mLXR5cGUoLi4uKVxuXHRcdFx0XHRcdFx0XHRpZiAoIGRpZmYgPT09IGZhbHNlICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gVXNlIHRoZSBzYW1lIGxvb3AgYXMgYWJvdmUgdG8gc2VlayBgZWxlbWAgZnJvbSB0aGUgc3RhcnRcblx0XHRcdFx0XHRcdFx0XHR3aGlsZSAoICggbm9kZSA9ICsrbm9kZUluZGV4ICYmIG5vZGUgJiYgbm9kZVsgZGlyIF0gfHxcblx0XHRcdFx0XHRcdFx0XHRcdCggZGlmZiA9IG5vZGVJbmRleCA9IDAgKSB8fCBzdGFydC5wb3AoKSApICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoICggb2ZUeXBlID9cblx0XHRcdFx0XHRcdFx0XHRcdFx0bm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lIDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0bm9kZS5ub2RlVHlwZSA9PT0gMSApICYmXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCsrZGlmZiApIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBDYWNoZSB0aGUgaW5kZXggb2YgZWFjaCBlbmNvdW50ZXJlZCBlbGVtZW50XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICggdXNlQ2FjaGUgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3V0ZXJDYWNoZSA9IG5vZGVbIGV4cGFuZG8gXSB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KCBub2RlWyBleHBhbmRvIF0gPSB7fSApO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPDkgb25seVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIERlZmVuZCBhZ2FpbnN0IGNsb25lZCBhdHRyb3BlcnRpZXMgKGpRdWVyeSBnaC0xNzA5KVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlID0gb3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQoIG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSA9IHt9ICk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZVsgdHlwZSBdID0gWyBkaXJydW5zLCBkaWZmIF07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIG5vZGUgPT09IGVsZW0gKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSW5jb3Jwb3JhdGUgdGhlIG9mZnNldCwgdGhlbiBjaGVjayBhZ2FpbnN0IGN5Y2xlIHNpemVcblx0XHRcdFx0XHRcdGRpZmYgLT0gbGFzdDtcblx0XHRcdFx0XHRcdHJldHVybiBkaWZmID09PSBmaXJzdCB8fCAoIGRpZmYgJSBmaXJzdCA9PT0gMCAmJiBkaWZmIC8gZmlyc3QgPj0gMCApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0XCJQU0VVRE9cIjogZnVuY3Rpb24oIHBzZXVkbywgYXJndW1lbnQgKSB7XG5cblx0XHRcdC8vIHBzZXVkby1jbGFzcyBuYW1lcyBhcmUgY2FzZS1pbnNlbnNpdGl2ZVxuXHRcdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNwc2V1ZG8tY2xhc3Nlc1xuXHRcdFx0Ly8gUHJpb3JpdGl6ZSBieSBjYXNlIHNlbnNpdGl2aXR5IGluIGNhc2UgY3VzdG9tIHBzZXVkb3MgYXJlIGFkZGVkIHdpdGggdXBwZXJjYXNlIGxldHRlcnNcblx0XHRcdC8vIFJlbWVtYmVyIHRoYXQgc2V0RmlsdGVycyBpbmhlcml0cyBmcm9tIHBzZXVkb3Ncblx0XHRcdHZhciBhcmdzLFxuXHRcdFx0XHRmbiA9IEV4cHIucHNldWRvc1sgcHNldWRvIF0gfHwgRXhwci5zZXRGaWx0ZXJzWyBwc2V1ZG8udG9Mb3dlckNhc2UoKSBdIHx8XG5cdFx0XHRcdFx0U2l6emxlLmVycm9yKCBcInVuc3VwcG9ydGVkIHBzZXVkbzogXCIgKyBwc2V1ZG8gKTtcblxuXHRcdFx0Ly8gVGhlIHVzZXIgbWF5IHVzZSBjcmVhdGVQc2V1ZG8gdG8gaW5kaWNhdGUgdGhhdFxuXHRcdFx0Ly8gYXJndW1lbnRzIGFyZSBuZWVkZWQgdG8gY3JlYXRlIHRoZSBmaWx0ZXIgZnVuY3Rpb25cblx0XHRcdC8vIGp1c3QgYXMgU2l6emxlIGRvZXNcblx0XHRcdGlmICggZm5bIGV4cGFuZG8gXSApIHtcblx0XHRcdFx0cmV0dXJuIGZuKCBhcmd1bWVudCApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBCdXQgbWFpbnRhaW4gc3VwcG9ydCBmb3Igb2xkIHNpZ25hdHVyZXNcblx0XHRcdGlmICggZm4ubGVuZ3RoID4gMSApIHtcblx0XHRcdFx0YXJncyA9IFsgcHNldWRvLCBwc2V1ZG8sIFwiXCIsIGFyZ3VtZW50IF07XG5cdFx0XHRcdHJldHVybiBFeHByLnNldEZpbHRlcnMuaGFzT3duUHJvcGVydHkoIHBzZXVkby50b0xvd2VyQ2FzZSgpICkgP1xuXHRcdFx0XHRcdG1hcmtGdW5jdGlvbiggZnVuY3Rpb24oIHNlZWQsIG1hdGNoZXMgKSB7XG5cdFx0XHRcdFx0XHR2YXIgaWR4LFxuXHRcdFx0XHRcdFx0XHRtYXRjaGVkID0gZm4oIHNlZWQsIGFyZ3VtZW50ICksXG5cdFx0XHRcdFx0XHRcdGkgPSBtYXRjaGVkLmxlbmd0aDtcblx0XHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdFx0XHRpZHggPSBpbmRleE9mKCBzZWVkLCBtYXRjaGVkWyBpIF0gKTtcblx0XHRcdFx0XHRcdFx0c2VlZFsgaWR4IF0gPSAhKCBtYXRjaGVzWyBpZHggXSA9IG1hdGNoZWRbIGkgXSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gKSA6XG5cdFx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4oIGVsZW0sIDAsIGFyZ3MgKTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZm47XG5cdFx0fVxuXHR9LFxuXG5cdHBzZXVkb3M6IHtcblxuXHRcdC8vIFBvdGVudGlhbGx5IGNvbXBsZXggcHNldWRvc1xuXHRcdFwibm90XCI6IG1hcmtGdW5jdGlvbiggZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXG5cdFx0XHQvLyBUcmltIHRoZSBzZWxlY3RvciBwYXNzZWQgdG8gY29tcGlsZVxuXHRcdFx0Ly8gdG8gYXZvaWQgdHJlYXRpbmcgbGVhZGluZyBhbmQgdHJhaWxpbmdcblx0XHRcdC8vIHNwYWNlcyBhcyBjb21iaW5hdG9yc1xuXHRcdFx0dmFyIGlucHV0ID0gW10sXG5cdFx0XHRcdHJlc3VsdHMgPSBbXSxcblx0XHRcdFx0bWF0Y2hlciA9IGNvbXBpbGUoIHNlbGVjdG9yLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSApO1xuXG5cdFx0XHRyZXR1cm4gbWF0Y2hlclsgZXhwYW5kbyBdID9cblx0XHRcdFx0bWFya0Z1bmN0aW9uKCBmdW5jdGlvbiggc2VlZCwgbWF0Y2hlcywgX2NvbnRleHQsIHhtbCApIHtcblx0XHRcdFx0XHR2YXIgZWxlbSxcblx0XHRcdFx0XHRcdHVubWF0Y2hlZCA9IG1hdGNoZXIoIHNlZWQsIG51bGwsIHhtbCwgW10gKSxcblx0XHRcdFx0XHRcdGkgPSBzZWVkLmxlbmd0aDtcblxuXHRcdFx0XHRcdC8vIE1hdGNoIGVsZW1lbnRzIHVubWF0Y2hlZCBieSBgbWF0Y2hlcmBcblx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdGlmICggKCBlbGVtID0gdW5tYXRjaGVkWyBpIF0gKSApIHtcblx0XHRcdFx0XHRcdFx0c2VlZFsgaSBdID0gISggbWF0Y2hlc1sgaSBdID0gZWxlbSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApIDpcblx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0sIF9jb250ZXh0LCB4bWwgKSB7XG5cdFx0XHRcdFx0aW5wdXRbIDAgXSA9IGVsZW07XG5cdFx0XHRcdFx0bWF0Y2hlciggaW5wdXQsIG51bGwsIHhtbCwgcmVzdWx0cyApO1xuXG5cdFx0XHRcdFx0Ly8gRG9uJ3Qga2VlcCB0aGUgZWxlbWVudCAoaXNzdWUgIzI5OSlcblx0XHRcdFx0XHRpbnB1dFsgMCBdID0gbnVsbDtcblx0XHRcdFx0XHRyZXR1cm4gIXJlc3VsdHMucG9wKCk7XG5cdFx0XHRcdH07XG5cdFx0fSApLFxuXG5cdFx0XCJoYXNcIjogbWFya0Z1bmN0aW9uKCBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHJldHVybiBTaXp6bGUoIHNlbGVjdG9yLCBlbGVtICkubGVuZ3RoID4gMDtcblx0XHRcdH07XG5cdFx0fSApLFxuXG5cdFx0XCJjb250YWluc1wiOiBtYXJrRnVuY3Rpb24oIGZ1bmN0aW9uKCB0ZXh0ICkge1xuXHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0cmV0dXJuICggZWxlbS50ZXh0Q29udGVudCB8fCBnZXRUZXh0KCBlbGVtICkgKS5pbmRleE9mKCB0ZXh0ICkgPiAtMTtcblx0XHRcdH07XG5cdFx0fSApLFxuXG5cdFx0Ly8gXCJXaGV0aGVyIGFuIGVsZW1lbnQgaXMgcmVwcmVzZW50ZWQgYnkgYSA6bGFuZygpIHNlbGVjdG9yXG5cdFx0Ly8gaXMgYmFzZWQgc29sZWx5IG9uIHRoZSBlbGVtZW50J3MgbGFuZ3VhZ2UgdmFsdWVcblx0XHQvLyBiZWluZyBlcXVhbCB0byB0aGUgaWRlbnRpZmllciBDLFxuXHRcdC8vIG9yIGJlZ2lubmluZyB3aXRoIHRoZSBpZGVudGlmaWVyIEMgaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgXCItXCIuXG5cdFx0Ly8gVGhlIG1hdGNoaW5nIG9mIEMgYWdhaW5zdCB0aGUgZWxlbWVudCdzIGxhbmd1YWdlIHZhbHVlIGlzIHBlcmZvcm1lZCBjYXNlLWluc2Vuc2l0aXZlbHkuXG5cdFx0Ly8gVGhlIGlkZW50aWZpZXIgQyBkb2VzIG5vdCBoYXZlIHRvIGJlIGEgdmFsaWQgbGFuZ3VhZ2UgbmFtZS5cIlxuXHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jbGFuZy1wc2V1ZG9cblx0XHRcImxhbmdcIjogbWFya0Z1bmN0aW9uKCBmdW5jdGlvbiggbGFuZyApIHtcblxuXHRcdFx0Ly8gbGFuZyB2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgaWRlbnRpZmllclxuXHRcdFx0aWYgKCAhcmlkZW50aWZpZXIudGVzdCggbGFuZyB8fCBcIlwiICkgKSB7XG5cdFx0XHRcdFNpenpsZS5lcnJvciggXCJ1bnN1cHBvcnRlZCBsYW5nOiBcIiArIGxhbmcgKTtcblx0XHRcdH1cblx0XHRcdGxhbmcgPSBsYW5nLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICkudG9Mb3dlckNhc2UoKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0dmFyIGVsZW1MYW5nO1xuXHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0aWYgKCAoIGVsZW1MYW5nID0gZG9jdW1lbnRJc0hUTUwgP1xuXHRcdFx0XHRcdFx0ZWxlbS5sYW5nIDpcblx0XHRcdFx0XHRcdGVsZW0uZ2V0QXR0cmlidXRlKCBcInhtbDpsYW5nXCIgKSB8fCBlbGVtLmdldEF0dHJpYnV0ZSggXCJsYW5nXCIgKSApICkge1xuXG5cdFx0XHRcdFx0XHRlbGVtTGFuZyA9IGVsZW1MYW5nLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbUxhbmcgPT09IGxhbmcgfHwgZWxlbUxhbmcuaW5kZXhPZiggbGFuZyArIFwiLVwiICkgPT09IDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IHdoaWxlICggKCBlbGVtID0gZWxlbS5wYXJlbnROb2RlICkgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9O1xuXHRcdH0gKSxcblxuXHRcdC8vIE1pc2NlbGxhbmVvdXNcblx0XHRcInRhcmdldFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBoYXNoID0gd2luZG93LmxvY2F0aW9uICYmIHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuXHRcdFx0cmV0dXJuIGhhc2ggJiYgaGFzaC5zbGljZSggMSApID09PSBlbGVtLmlkO1xuXHRcdH0sXG5cblx0XHRcInJvb3RcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbSA9PT0gZG9jRWxlbTtcblx0XHR9LFxuXG5cdFx0XCJmb2N1c1wiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmXG5cdFx0XHRcdCggIWRvY3VtZW50Lmhhc0ZvY3VzIHx8IGRvY3VtZW50Lmhhc0ZvY3VzKCkgKSAmJlxuXHRcdFx0XHQhISggZWxlbS50eXBlIHx8IGVsZW0uaHJlZiB8fCB+ZWxlbS50YWJJbmRleCApO1xuXHRcdH0sXG5cblx0XHQvLyBCb29sZWFuIHByb3BlcnRpZXNcblx0XHRcImVuYWJsZWRcIjogY3JlYXRlRGlzYWJsZWRQc2V1ZG8oIGZhbHNlICksXG5cdFx0XCJkaXNhYmxlZFwiOiBjcmVhdGVEaXNhYmxlZFBzZXVkbyggdHJ1ZSApLFxuXG5cdFx0XCJjaGVja2VkXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0XHQvLyBJbiBDU1MzLCA6Y2hlY2tlZCBzaG91bGQgcmV0dXJuIGJvdGggY2hlY2tlZCBhbmQgc2VsZWN0ZWQgZWxlbWVudHNcblx0XHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTEvUkVDLWNzczMtc2VsZWN0b3JzLTIwMTEwOTI5LyNjaGVja2VkXG5cdFx0XHR2YXIgbm9kZU5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyZXR1cm4gKCBub2RlTmFtZSA9PT0gXCJpbnB1dFwiICYmICEhZWxlbS5jaGVja2VkICkgfHxcblx0XHRcdFx0KCBub2RlTmFtZSA9PT0gXCJvcHRpb25cIiAmJiAhIWVsZW0uc2VsZWN0ZWQgKTtcblx0XHR9LFxuXG5cdFx0XCJzZWxlY3RlZFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdFx0Ly8gQWNjZXNzaW5nIHRoaXMgcHJvcGVydHkgbWFrZXMgc2VsZWN0ZWQtYnktZGVmYXVsdFxuXHRcdFx0Ly8gb3B0aW9ucyBpbiBTYWZhcmkgd29yayBwcm9wZXJseVxuXHRcdFx0aWYgKCBlbGVtLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcblx0XHRcdFx0ZWxlbS5wYXJlbnROb2RlLnNlbGVjdGVkSW5kZXg7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBlbGVtLnNlbGVjdGVkID09PSB0cnVlO1xuXHRcdH0sXG5cblx0XHQvLyBDb250ZW50c1xuXHRcdFwiZW1wdHlcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jZW1wdHktcHNldWRvXG5cdFx0XHQvLyA6ZW1wdHkgaXMgbmVnYXRlZCBieSBlbGVtZW50ICgxKSBvciBjb250ZW50IG5vZGVzICh0ZXh0OiAzOyBjZGF0YTogNDsgZW50aXR5IHJlZjogNSksXG5cdFx0XHQvLyAgIGJ1dCBub3QgYnkgb3RoZXJzIChjb21tZW50OiA4OyBwcm9jZXNzaW5nIGluc3RydWN0aW9uOiA3OyBldGMuKVxuXHRcdFx0Ly8gbm9kZVR5cGUgPCA2IHdvcmtzIGJlY2F1c2UgYXR0cmlidXRlcyAoMikgZG8gbm90IGFwcGVhciBhcyBjaGlsZHJlblxuXHRcdFx0Zm9yICggZWxlbSA9IGVsZW0uZmlyc3RDaGlsZDsgZWxlbTsgZWxlbSA9IGVsZW0ubmV4dFNpYmxpbmcgKSB7XG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA8IDYgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0XCJwYXJlbnRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gIUV4cHIucHNldWRvc1sgXCJlbXB0eVwiIF0oIGVsZW0gKTtcblx0XHR9LFxuXG5cdFx0Ly8gRWxlbWVudC9pbnB1dCB0eXBlc1xuXHRcdFwiaGVhZGVyXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIHJoZWFkZXIudGVzdCggZWxlbS5ub2RlTmFtZSApO1xuXHRcdH0sXG5cblx0XHRcImlucHV0XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIHJpbnB1dHMudGVzdCggZWxlbS5ub2RlTmFtZSApO1xuXHRcdH0sXG5cblx0XHRcImJ1dHRvblwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0cmV0dXJuIG5hbWUgPT09IFwiaW5wdXRcIiAmJiBlbGVtLnR5cGUgPT09IFwiYnV0dG9uXCIgfHwgbmFtZSA9PT0gXCJidXR0b25cIjtcblx0XHR9LFxuXG5cdFx0XCJ0ZXh0XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0dmFyIGF0dHI7XG5cdFx0XHRyZXR1cm4gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIgJiZcblx0XHRcdFx0ZWxlbS50eXBlID09PSBcInRleHRcIiAmJlxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IElFPDhcblx0XHRcdFx0Ly8gTmV3IEhUTUw1IGF0dHJpYnV0ZSB2YWx1ZXMgKGUuZy4sIFwic2VhcmNoXCIpIGFwcGVhciB3aXRoIGVsZW0udHlwZSA9PT0gXCJ0ZXh0XCJcblx0XHRcdFx0KCAoIGF0dHIgPSBlbGVtLmdldEF0dHJpYnV0ZSggXCJ0eXBlXCIgKSApID09IG51bGwgfHxcblx0XHRcdFx0XHRhdHRyLnRvTG93ZXJDYXNlKCkgPT09IFwidGV4dFwiICk7XG5cdFx0fSxcblxuXHRcdC8vIFBvc2l0aW9uLWluLWNvbGxlY3Rpb25cblx0XHRcImZpcnN0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oIGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIFsgMCBdO1xuXHRcdH0gKSxcblxuXHRcdFwibGFzdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKCBmdW5jdGlvbiggX21hdGNoSW5kZXhlcywgbGVuZ3RoICkge1xuXHRcdFx0cmV0dXJuIFsgbGVuZ3RoIC0gMSBdO1xuXHRcdH0gKSxcblxuXHRcdFwiZXFcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyggZnVuY3Rpb24oIF9tYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG5cdFx0XHRyZXR1cm4gWyBhcmd1bWVudCA8IDAgPyBhcmd1bWVudCArIGxlbmd0aCA6IGFyZ3VtZW50IF07XG5cdFx0fSApLFxuXG5cdFx0XCJldmVuXCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oIGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcblx0XHRcdHZhciBpID0gMDtcblx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSArPSAyICkge1xuXHRcdFx0XHRtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1hdGNoSW5kZXhlcztcblx0XHR9ICksXG5cblx0XHRcIm9kZFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKCBmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGggKSB7XG5cdFx0XHR2YXIgaSA9IDE7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkgKz0gMiApIHtcblx0XHRcdFx0bWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYXRjaEluZGV4ZXM7XG5cdFx0fSApLFxuXG5cdFx0XCJsdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKCBmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGgsIGFyZ3VtZW50ICkge1xuXHRcdFx0dmFyIGkgPSBhcmd1bWVudCA8IDAgP1xuXHRcdFx0XHRhcmd1bWVudCArIGxlbmd0aCA6XG5cdFx0XHRcdGFyZ3VtZW50ID4gbGVuZ3RoID9cblx0XHRcdFx0XHRsZW5ndGggOlxuXHRcdFx0XHRcdGFyZ3VtZW50O1xuXHRcdFx0Zm9yICggOyAtLWkgPj0gMDsgKSB7XG5cdFx0XHRcdG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF0Y2hJbmRleGVzO1xuXHRcdH0gKSxcblxuXHRcdFwiZ3RcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyggZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoLCBhcmd1bWVudCApIHtcblx0XHRcdHZhciBpID0gYXJndW1lbnQgPCAwID8gYXJndW1lbnQgKyBsZW5ndGggOiBhcmd1bWVudDtcblx0XHRcdGZvciAoIDsgKytpIDwgbGVuZ3RoOyApIHtcblx0XHRcdFx0bWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYXRjaEluZGV4ZXM7XG5cdFx0fSApXG5cdH1cbn07XG5cbkV4cHIucHNldWRvc1sgXCJudGhcIiBdID0gRXhwci5wc2V1ZG9zWyBcImVxXCIgXTtcblxuLy8gQWRkIGJ1dHRvbi9pbnB1dCB0eXBlIHBzZXVkb3NcbmZvciAoIGkgaW4geyByYWRpbzogdHJ1ZSwgY2hlY2tib3g6IHRydWUsIGZpbGU6IHRydWUsIHBhc3N3b3JkOiB0cnVlLCBpbWFnZTogdHJ1ZSB9ICkge1xuXHRFeHByLnBzZXVkb3NbIGkgXSA9IGNyZWF0ZUlucHV0UHNldWRvKCBpICk7XG59XG5mb3IgKCBpIGluIHsgc3VibWl0OiB0cnVlLCByZXNldDogdHJ1ZSB9ICkge1xuXHRFeHByLnBzZXVkb3NbIGkgXSA9IGNyZWF0ZUJ1dHRvblBzZXVkbyggaSApO1xufVxuXG4vLyBFYXN5IEFQSSBmb3IgY3JlYXRpbmcgbmV3IHNldEZpbHRlcnNcbmZ1bmN0aW9uIHNldEZpbHRlcnMoKSB7fVxuc2V0RmlsdGVycy5wcm90b3R5cGUgPSBFeHByLmZpbHRlcnMgPSBFeHByLnBzZXVkb3M7XG5FeHByLnNldEZpbHRlcnMgPSBuZXcgc2V0RmlsdGVycygpO1xuXG50b2tlbml6ZSA9IFNpenpsZS50b2tlbml6ZSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgcGFyc2VPbmx5ICkge1xuXHR2YXIgbWF0Y2hlZCwgbWF0Y2gsIHRva2VucywgdHlwZSxcblx0XHRzb0ZhciwgZ3JvdXBzLCBwcmVGaWx0ZXJzLFxuXHRcdGNhY2hlZCA9IHRva2VuQ2FjaGVbIHNlbGVjdG9yICsgXCIgXCIgXTtcblxuXHRpZiAoIGNhY2hlZCApIHtcblx0XHRyZXR1cm4gcGFyc2VPbmx5ID8gMCA6IGNhY2hlZC5zbGljZSggMCApO1xuXHR9XG5cblx0c29GYXIgPSBzZWxlY3Rvcjtcblx0Z3JvdXBzID0gW107XG5cdHByZUZpbHRlcnMgPSBFeHByLnByZUZpbHRlcjtcblxuXHR3aGlsZSAoIHNvRmFyICkge1xuXG5cdFx0Ly8gQ29tbWEgYW5kIGZpcnN0IHJ1blxuXHRcdGlmICggIW1hdGNoZWQgfHwgKCBtYXRjaCA9IHJjb21tYS5leGVjKCBzb0ZhciApICkgKSB7XG5cdFx0XHRpZiAoIG1hdGNoICkge1xuXG5cdFx0XHRcdC8vIERvbid0IGNvbnN1bWUgdHJhaWxpbmcgY29tbWFzIGFzIHZhbGlkXG5cdFx0XHRcdHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoWyAwIF0ubGVuZ3RoICkgfHwgc29GYXI7XG5cdFx0XHR9XG5cdFx0XHRncm91cHMucHVzaCggKCB0b2tlbnMgPSBbXSApICk7XG5cdFx0fVxuXG5cdFx0bWF0Y2hlZCA9IGZhbHNlO1xuXG5cdFx0Ly8gQ29tYmluYXRvcnNcblx0XHRpZiAoICggbWF0Y2ggPSByY29tYmluYXRvcnMuZXhlYyggc29GYXIgKSApICkge1xuXHRcdFx0bWF0Y2hlZCA9IG1hdGNoLnNoaWZ0KCk7XG5cdFx0XHR0b2tlbnMucHVzaCgge1xuXHRcdFx0XHR2YWx1ZTogbWF0Y2hlZCxcblxuXHRcdFx0XHQvLyBDYXN0IGRlc2NlbmRhbnQgY29tYmluYXRvcnMgdG8gc3BhY2Vcblx0XHRcdFx0dHlwZTogbWF0Y2hbIDAgXS5yZXBsYWNlKCBydHJpbSwgXCIgXCIgKVxuXHRcdFx0fSApO1xuXHRcdFx0c29GYXIgPSBzb0Zhci5zbGljZSggbWF0Y2hlZC5sZW5ndGggKTtcblx0XHR9XG5cblx0XHQvLyBGaWx0ZXJzXG5cdFx0Zm9yICggdHlwZSBpbiBFeHByLmZpbHRlciApIHtcblx0XHRcdGlmICggKCBtYXRjaCA9IG1hdGNoRXhwclsgdHlwZSBdLmV4ZWMoIHNvRmFyICkgKSAmJiAoICFwcmVGaWx0ZXJzWyB0eXBlIF0gfHxcblx0XHRcdFx0KCBtYXRjaCA9IHByZUZpbHRlcnNbIHR5cGUgXSggbWF0Y2ggKSApICkgKSB7XG5cdFx0XHRcdG1hdGNoZWQgPSBtYXRjaC5zaGlmdCgpO1xuXHRcdFx0XHR0b2tlbnMucHVzaCgge1xuXHRcdFx0XHRcdHZhbHVlOiBtYXRjaGVkLFxuXHRcdFx0XHRcdHR5cGU6IHR5cGUsXG5cdFx0XHRcdFx0bWF0Y2hlczogbWF0Y2hcblx0XHRcdFx0fSApO1xuXHRcdFx0XHRzb0ZhciA9IHNvRmFyLnNsaWNlKCBtYXRjaGVkLmxlbmd0aCApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICggIW1hdGNoZWQgKSB7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIGxlbmd0aCBvZiB0aGUgaW52YWxpZCBleGNlc3Ncblx0Ly8gaWYgd2UncmUganVzdCBwYXJzaW5nXG5cdC8vIE90aGVyd2lzZSwgdGhyb3cgYW4gZXJyb3Igb3IgcmV0dXJuIHRva2Vuc1xuXHRyZXR1cm4gcGFyc2VPbmx5ID9cblx0XHRzb0Zhci5sZW5ndGggOlxuXHRcdHNvRmFyID9cblx0XHRcdFNpenpsZS5lcnJvciggc2VsZWN0b3IgKSA6XG5cblx0XHRcdC8vIENhY2hlIHRoZSB0b2tlbnNcblx0XHRcdHRva2VuQ2FjaGUoIHNlbGVjdG9yLCBncm91cHMgKS5zbGljZSggMCApO1xufTtcblxuZnVuY3Rpb24gdG9TZWxlY3RvciggdG9rZW5zICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bGVuID0gdG9rZW5zLmxlbmd0aCxcblx0XHRzZWxlY3RvciA9IFwiXCI7XG5cdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdHNlbGVjdG9yICs9IHRva2Vuc1sgaSBdLnZhbHVlO1xuXHR9XG5cdHJldHVybiBzZWxlY3Rvcjtcbn1cblxuZnVuY3Rpb24gYWRkQ29tYmluYXRvciggbWF0Y2hlciwgY29tYmluYXRvciwgYmFzZSApIHtcblx0dmFyIGRpciA9IGNvbWJpbmF0b3IuZGlyLFxuXHRcdHNraXAgPSBjb21iaW5hdG9yLm5leHQsXG5cdFx0a2V5ID0gc2tpcCB8fCBkaXIsXG5cdFx0Y2hlY2tOb25FbGVtZW50cyA9IGJhc2UgJiYga2V5ID09PSBcInBhcmVudE5vZGVcIixcblx0XHRkb25lTmFtZSA9IGRvbmUrKztcblxuXHRyZXR1cm4gY29tYmluYXRvci5maXJzdCA/XG5cblx0XHQvLyBDaGVjayBhZ2FpbnN0IGNsb3Nlc3QgYW5jZXN0b3IvcHJlY2VkaW5nIGVsZW1lbnRcblx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0d2hpbGUgKCAoIGVsZW0gPSBlbGVtWyBkaXIgXSApICkge1xuXHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgY2hlY2tOb25FbGVtZW50cyApIHtcblx0XHRcdFx0XHRyZXR1cm4gbWF0Y2hlciggZWxlbSwgY29udGV4dCwgeG1sICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9IDpcblxuXHRcdC8vIENoZWNrIGFnYWluc3QgYWxsIGFuY2VzdG9yL3ByZWNlZGluZyBlbGVtZW50c1xuXHRcdGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHR2YXIgb2xkQ2FjaGUsIHVuaXF1ZUNhY2hlLCBvdXRlckNhY2hlLFxuXHRcdFx0XHRuZXdDYWNoZSA9IFsgZGlycnVucywgZG9uZU5hbWUgXTtcblxuXHRcdFx0Ly8gV2UgY2FuJ3Qgc2V0IGFyYml0cmFyeSBkYXRhIG9uIFhNTCBub2Rlcywgc28gdGhleSBkb24ndCBiZW5lZml0IGZyb20gY29tYmluYXRvciBjYWNoaW5nXG5cdFx0XHRpZiAoIHhtbCApIHtcblx0XHRcdFx0d2hpbGUgKCAoIGVsZW0gPSBlbGVtWyBkaXIgXSApICkge1xuXHRcdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzICkge1xuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR3aGlsZSAoICggZWxlbSA9IGVsZW1bIGRpciBdICkgKSB7XG5cdFx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGNoZWNrTm9uRWxlbWVudHMgKSB7XG5cdFx0XHRcdFx0XHRvdXRlckNhY2hlID0gZWxlbVsgZXhwYW5kbyBdIHx8ICggZWxlbVsgZXhwYW5kbyBdID0ge30gKTtcblxuXHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPDkgb25seVxuXHRcdFx0XHRcdFx0Ly8gRGVmZW5kIGFnYWluc3QgY2xvbmVkIGF0dHJvcGVydGllcyAoalF1ZXJ5IGdoLTE3MDkpXG5cdFx0XHRcdFx0XHR1bmlxdWVDYWNoZSA9IG91dGVyQ2FjaGVbIGVsZW0udW5pcXVlSUQgXSB8fFxuXHRcdFx0XHRcdFx0XHQoIG91dGVyQ2FjaGVbIGVsZW0udW5pcXVlSUQgXSA9IHt9ICk7XG5cblx0XHRcdFx0XHRcdGlmICggc2tpcCAmJiBza2lwID09PSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgKSB7XG5cdFx0XHRcdFx0XHRcdGVsZW0gPSBlbGVtWyBkaXIgXSB8fCBlbGVtO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICggKCBvbGRDYWNoZSA9IHVuaXF1ZUNhY2hlWyBrZXkgXSApICYmXG5cdFx0XHRcdFx0XHRcdG9sZENhY2hlWyAwIF0gPT09IGRpcnJ1bnMgJiYgb2xkQ2FjaGVbIDEgXSA9PT0gZG9uZU5hbWUgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gQXNzaWduIHRvIG5ld0NhY2hlIHNvIHJlc3VsdHMgYmFjay1wcm9wYWdhdGUgdG8gcHJldmlvdXMgZWxlbWVudHNcblx0XHRcdFx0XHRcdFx0cmV0dXJuICggbmV3Q2FjaGVbIDIgXSA9IG9sZENhY2hlWyAyIF0gKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gUmV1c2UgbmV3Y2FjaGUgc28gcmVzdWx0cyBiYWNrLXByb3BhZ2F0ZSB0byBwcmV2aW91cyBlbGVtZW50c1xuXHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZVsga2V5IF0gPSBuZXdDYWNoZTtcblxuXHRcdFx0XHRcdFx0XHQvLyBBIG1hdGNoIG1lYW5zIHdlJ3JlIGRvbmU7IGEgZmFpbCBtZWFucyB3ZSBoYXZlIHRvIGtlZXAgY2hlY2tpbmdcblx0XHRcdFx0XHRcdFx0aWYgKCAoIG5ld0NhY2hlWyAyIF0gPSBtYXRjaGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApICkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcbn1cblxuZnVuY3Rpb24gZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICkge1xuXHRyZXR1cm4gbWF0Y2hlcnMubGVuZ3RoID4gMSA/XG5cdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdHZhciBpID0gbWF0Y2hlcnMubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdGlmICggIW1hdGNoZXJzWyBpIF0oIGVsZW0sIGNvbnRleHQsIHhtbCApICkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSA6XG5cdFx0bWF0Y2hlcnNbIDAgXTtcbn1cblxuZnVuY3Rpb24gbXVsdGlwbGVDb250ZXh0cyggc2VsZWN0b3IsIGNvbnRleHRzLCByZXN1bHRzICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bGVuID0gY29udGV4dHMubGVuZ3RoO1xuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRTaXp6bGUoIHNlbGVjdG9yLCBjb250ZXh0c1sgaSBdLCByZXN1bHRzICk7XG5cdH1cblx0cmV0dXJuIHJlc3VsdHM7XG59XG5cbmZ1bmN0aW9uIGNvbmRlbnNlKCB1bm1hdGNoZWQsIG1hcCwgZmlsdGVyLCBjb250ZXh0LCB4bWwgKSB7XG5cdHZhciBlbGVtLFxuXHRcdG5ld1VubWF0Y2hlZCA9IFtdLFxuXHRcdGkgPSAwLFxuXHRcdGxlbiA9IHVubWF0Y2hlZC5sZW5ndGgsXG5cdFx0bWFwcGVkID0gbWFwICE9IG51bGw7XG5cblx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0aWYgKCAoIGVsZW0gPSB1bm1hdGNoZWRbIGkgXSApICkge1xuXHRcdFx0aWYgKCAhZmlsdGVyIHx8IGZpbHRlciggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XG5cdFx0XHRcdG5ld1VubWF0Y2hlZC5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdGlmICggbWFwcGVkICkge1xuXHRcdFx0XHRcdG1hcC5wdXNoKCBpICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbmV3VW5tYXRjaGVkO1xufVxuXG5mdW5jdGlvbiBzZXRNYXRjaGVyKCBwcmVGaWx0ZXIsIHNlbGVjdG9yLCBtYXRjaGVyLCBwb3N0RmlsdGVyLCBwb3N0RmluZGVyLCBwb3N0U2VsZWN0b3IgKSB7XG5cdGlmICggcG9zdEZpbHRlciAmJiAhcG9zdEZpbHRlclsgZXhwYW5kbyBdICkge1xuXHRcdHBvc3RGaWx0ZXIgPSBzZXRNYXRjaGVyKCBwb3N0RmlsdGVyICk7XG5cdH1cblx0aWYgKCBwb3N0RmluZGVyICYmICFwb3N0RmluZGVyWyBleHBhbmRvIF0gKSB7XG5cdFx0cG9zdEZpbmRlciA9IHNldE1hdGNoZXIoIHBvc3RGaW5kZXIsIHBvc3RTZWxlY3RvciApO1xuXHR9XG5cdHJldHVybiBtYXJrRnVuY3Rpb24oIGZ1bmN0aW9uKCBzZWVkLCByZXN1bHRzLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0dmFyIHRlbXAsIGksIGVsZW0sXG5cdFx0XHRwcmVNYXAgPSBbXSxcblx0XHRcdHBvc3RNYXAgPSBbXSxcblx0XHRcdHByZWV4aXN0aW5nID0gcmVzdWx0cy5sZW5ndGgsXG5cblx0XHRcdC8vIEdldCBpbml0aWFsIGVsZW1lbnRzIGZyb20gc2VlZCBvciBjb250ZXh0XG5cdFx0XHRlbGVtcyA9IHNlZWQgfHwgbXVsdGlwbGVDb250ZXh0cyhcblx0XHRcdFx0c2VsZWN0b3IgfHwgXCIqXCIsXG5cdFx0XHRcdGNvbnRleHQubm9kZVR5cGUgPyBbIGNvbnRleHQgXSA6IGNvbnRleHQsXG5cdFx0XHRcdFtdXG5cdFx0XHQpLFxuXG5cdFx0XHQvLyBQcmVmaWx0ZXIgdG8gZ2V0IG1hdGNoZXIgaW5wdXQsIHByZXNlcnZpbmcgYSBtYXAgZm9yIHNlZWQtcmVzdWx0cyBzeW5jaHJvbml6YXRpb25cblx0XHRcdG1hdGNoZXJJbiA9IHByZUZpbHRlciAmJiAoIHNlZWQgfHwgIXNlbGVjdG9yICkgP1xuXHRcdFx0XHRjb25kZW5zZSggZWxlbXMsIHByZU1hcCwgcHJlRmlsdGVyLCBjb250ZXh0LCB4bWwgKSA6XG5cdFx0XHRcdGVsZW1zLFxuXG5cdFx0XHRtYXRjaGVyT3V0ID0gbWF0Y2hlciA/XG5cblx0XHRcdFx0Ly8gSWYgd2UgaGF2ZSBhIHBvc3RGaW5kZXIsIG9yIGZpbHRlcmVkIHNlZWQsIG9yIG5vbi1zZWVkIHBvc3RGaWx0ZXIgb3IgcHJlZXhpc3RpbmcgcmVzdWx0cyxcblx0XHRcdFx0cG9zdEZpbmRlciB8fCAoIHNlZWQgPyBwcmVGaWx0ZXIgOiBwcmVleGlzdGluZyB8fCBwb3N0RmlsdGVyICkgP1xuXG5cdFx0XHRcdFx0Ly8gLi4uaW50ZXJtZWRpYXRlIHByb2Nlc3NpbmcgaXMgbmVjZXNzYXJ5XG5cdFx0XHRcdFx0W10gOlxuXG5cdFx0XHRcdFx0Ly8gLi4ub3RoZXJ3aXNlIHVzZSByZXN1bHRzIGRpcmVjdGx5XG5cdFx0XHRcdFx0cmVzdWx0cyA6XG5cdFx0XHRcdG1hdGNoZXJJbjtcblxuXHRcdC8vIEZpbmQgcHJpbWFyeSBtYXRjaGVzXG5cdFx0aWYgKCBtYXRjaGVyICkge1xuXHRcdFx0bWF0Y2hlciggbWF0Y2hlckluLCBtYXRjaGVyT3V0LCBjb250ZXh0LCB4bWwgKTtcblx0XHR9XG5cblx0XHQvLyBBcHBseSBwb3N0RmlsdGVyXG5cdFx0aWYgKCBwb3N0RmlsdGVyICkge1xuXHRcdFx0dGVtcCA9IGNvbmRlbnNlKCBtYXRjaGVyT3V0LCBwb3N0TWFwICk7XG5cdFx0XHRwb3N0RmlsdGVyKCB0ZW1wLCBbXSwgY29udGV4dCwgeG1sICk7XG5cblx0XHRcdC8vIFVuLW1hdGNoIGZhaWxpbmcgZWxlbWVudHMgYnkgbW92aW5nIHRoZW0gYmFjayB0byBtYXRjaGVySW5cblx0XHRcdGkgPSB0ZW1wLmxlbmd0aDtcblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRpZiAoICggZWxlbSA9IHRlbXBbIGkgXSApICkge1xuXHRcdFx0XHRcdG1hdGNoZXJPdXRbIHBvc3RNYXBbIGkgXSBdID0gISggbWF0Y2hlckluWyBwb3N0TWFwWyBpIF0gXSA9IGVsZW0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICggc2VlZCApIHtcblx0XHRcdGlmICggcG9zdEZpbmRlciB8fCBwcmVGaWx0ZXIgKSB7XG5cdFx0XHRcdGlmICggcG9zdEZpbmRlciApIHtcblxuXHRcdFx0XHRcdC8vIEdldCB0aGUgZmluYWwgbWF0Y2hlck91dCBieSBjb25kZW5zaW5nIHRoaXMgaW50ZXJtZWRpYXRlIGludG8gcG9zdEZpbmRlciBjb250ZXh0c1xuXHRcdFx0XHRcdHRlbXAgPSBbXTtcblx0XHRcdFx0XHRpID0gbWF0Y2hlck91dC5sZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRpZiAoICggZWxlbSA9IG1hdGNoZXJPdXRbIGkgXSApICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIFJlc3RvcmUgbWF0Y2hlckluIHNpbmNlIGVsZW0gaXMgbm90IHlldCBhIGZpbmFsIG1hdGNoXG5cdFx0XHRcdFx0XHRcdHRlbXAucHVzaCggKCBtYXRjaGVySW5bIGkgXSA9IGVsZW0gKSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwb3N0RmluZGVyKCBudWxsLCAoIG1hdGNoZXJPdXQgPSBbXSApLCB0ZW1wLCB4bWwgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIE1vdmUgbWF0Y2hlZCBlbGVtZW50cyBmcm9tIHNlZWQgdG8gcmVzdWx0cyB0byBrZWVwIHRoZW0gc3luY2hyb25pemVkXG5cdFx0XHRcdGkgPSBtYXRjaGVyT3V0Lmxlbmd0aDtcblx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0aWYgKCAoIGVsZW0gPSBtYXRjaGVyT3V0WyBpIF0gKSAmJlxuXHRcdFx0XHRcdFx0KCB0ZW1wID0gcG9zdEZpbmRlciA/IGluZGV4T2YoIHNlZWQsIGVsZW0gKSA6IHByZU1hcFsgaSBdICkgPiAtMSApIHtcblxuXHRcdFx0XHRcdFx0c2VlZFsgdGVtcCBdID0gISggcmVzdWx0c1sgdGVtcCBdID0gZWxlbSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0Ly8gQWRkIGVsZW1lbnRzIHRvIHJlc3VsdHMsIHRocm91Z2ggcG9zdEZpbmRlciBpZiBkZWZpbmVkXG5cdFx0fSBlbHNlIHtcblx0XHRcdG1hdGNoZXJPdXQgPSBjb25kZW5zZShcblx0XHRcdFx0bWF0Y2hlck91dCA9PT0gcmVzdWx0cyA/XG5cdFx0XHRcdFx0bWF0Y2hlck91dC5zcGxpY2UoIHByZWV4aXN0aW5nLCBtYXRjaGVyT3V0Lmxlbmd0aCApIDpcblx0XHRcdFx0XHRtYXRjaGVyT3V0XG5cdFx0XHQpO1xuXHRcdFx0aWYgKCBwb3N0RmluZGVyICkge1xuXHRcdFx0XHRwb3N0RmluZGVyKCBudWxsLCByZXN1bHRzLCBtYXRjaGVyT3V0LCB4bWwgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIG1hdGNoZXJPdXQgKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gKTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hlckZyb21Ub2tlbnMoIHRva2VucyApIHtcblx0dmFyIGNoZWNrQ29udGV4dCwgbWF0Y2hlciwgaixcblx0XHRsZW4gPSB0b2tlbnMubGVuZ3RoLFxuXHRcdGxlYWRpbmdSZWxhdGl2ZSA9IEV4cHIucmVsYXRpdmVbIHRva2Vuc1sgMCBdLnR5cGUgXSxcblx0XHRpbXBsaWNpdFJlbGF0aXZlID0gbGVhZGluZ1JlbGF0aXZlIHx8IEV4cHIucmVsYXRpdmVbIFwiIFwiIF0sXG5cdFx0aSA9IGxlYWRpbmdSZWxhdGl2ZSA/IDEgOiAwLFxuXG5cdFx0Ly8gVGhlIGZvdW5kYXRpb25hbCBtYXRjaGVyIGVuc3VyZXMgdGhhdCBlbGVtZW50cyBhcmUgcmVhY2hhYmxlIGZyb20gdG9wLWxldmVsIGNvbnRleHQocylcblx0XHRtYXRjaENvbnRleHQgPSBhZGRDb21iaW5hdG9yKCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtID09PSBjaGVja0NvbnRleHQ7XG5cdFx0fSwgaW1wbGljaXRSZWxhdGl2ZSwgdHJ1ZSApLFxuXHRcdG1hdGNoQW55Q29udGV4dCA9IGFkZENvbWJpbmF0b3IoIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGluZGV4T2YoIGNoZWNrQ29udGV4dCwgZWxlbSApID4gLTE7XG5cdFx0fSwgaW1wbGljaXRSZWxhdGl2ZSwgdHJ1ZSApLFxuXHRcdG1hdGNoZXJzID0gWyBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0dmFyIHJldCA9ICggIWxlYWRpbmdSZWxhdGl2ZSAmJiAoIHhtbCB8fCBjb250ZXh0ICE9PSBvdXRlcm1vc3RDb250ZXh0ICkgKSB8fCAoXG5cdFx0XHRcdCggY2hlY2tDb250ZXh0ID0gY29udGV4dCApLm5vZGVUeXBlID9cblx0XHRcdFx0XHRtYXRjaENvbnRleHQoIGVsZW0sIGNvbnRleHQsIHhtbCApIDpcblx0XHRcdFx0XHRtYXRjaEFueUNvbnRleHQoIGVsZW0sIGNvbnRleHQsIHhtbCApICk7XG5cblx0XHRcdC8vIEF2b2lkIGhhbmdpbmcgb250byBlbGVtZW50IChpc3N1ZSAjMjk5KVxuXHRcdFx0Y2hlY2tDb250ZXh0ID0gbnVsbDtcblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fSBdO1xuXG5cdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdGlmICggKCBtYXRjaGVyID0gRXhwci5yZWxhdGl2ZVsgdG9rZW5zWyBpIF0udHlwZSBdICkgKSB7XG5cdFx0XHRtYXRjaGVycyA9IFsgYWRkQ29tYmluYXRvciggZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICksIG1hdGNoZXIgKSBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtYXRjaGVyID0gRXhwci5maWx0ZXJbIHRva2Vuc1sgaSBdLnR5cGUgXS5hcHBseSggbnVsbCwgdG9rZW5zWyBpIF0ubWF0Y2hlcyApO1xuXG5cdFx0XHQvLyBSZXR1cm4gc3BlY2lhbCB1cG9uIHNlZWluZyBhIHBvc2l0aW9uYWwgbWF0Y2hlclxuXHRcdFx0aWYgKCBtYXRjaGVyWyBleHBhbmRvIF0gKSB7XG5cblx0XHRcdFx0Ly8gRmluZCB0aGUgbmV4dCByZWxhdGl2ZSBvcGVyYXRvciAoaWYgYW55KSBmb3IgcHJvcGVyIGhhbmRsaW5nXG5cdFx0XHRcdGogPSArK2k7XG5cdFx0XHRcdGZvciAoIDsgaiA8IGxlbjsgaisrICkge1xuXHRcdFx0XHRcdGlmICggRXhwci5yZWxhdGl2ZVsgdG9rZW5zWyBqIF0udHlwZSBdICkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBzZXRNYXRjaGVyKFxuXHRcdFx0XHRcdGkgPiAxICYmIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApLFxuXHRcdFx0XHRcdGkgPiAxICYmIHRvU2VsZWN0b3IoXG5cblx0XHRcdFx0XHQvLyBJZiB0aGUgcHJlY2VkaW5nIHRva2VuIHdhcyBhIGRlc2NlbmRhbnQgY29tYmluYXRvciwgaW5zZXJ0IGFuIGltcGxpY2l0IGFueS1lbGVtZW50IGAqYFxuXHRcdFx0XHRcdHRva2Vuc1xuXHRcdFx0XHRcdFx0LnNsaWNlKCAwLCBpIC0gMSApXG5cdFx0XHRcdFx0XHQuY29uY2F0KCB7IHZhbHVlOiB0b2tlbnNbIGkgLSAyIF0udHlwZSA9PT0gXCIgXCIgPyBcIipcIiA6IFwiXCIgfSApXG5cdFx0XHRcdFx0KS5yZXBsYWNlKCBydHJpbSwgXCIkMVwiICksXG5cdFx0XHRcdFx0bWF0Y2hlcixcblx0XHRcdFx0XHRpIDwgaiAmJiBtYXRjaGVyRnJvbVRva2VucyggdG9rZW5zLnNsaWNlKCBpLCBqICkgKSxcblx0XHRcdFx0XHRqIDwgbGVuICYmIG1hdGNoZXJGcm9tVG9rZW5zKCAoIHRva2VucyA9IHRva2Vucy5zbGljZSggaiApICkgKSxcblx0XHRcdFx0XHRqIDwgbGVuICYmIHRvU2VsZWN0b3IoIHRva2VucyApXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRtYXRjaGVycy5wdXNoKCBtYXRjaGVyICk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMoIGVsZW1lbnRNYXRjaGVycywgc2V0TWF0Y2hlcnMgKSB7XG5cdHZhciBieVNldCA9IHNldE1hdGNoZXJzLmxlbmd0aCA+IDAsXG5cdFx0YnlFbGVtZW50ID0gZWxlbWVudE1hdGNoZXJzLmxlbmd0aCA+IDAsXG5cdFx0c3VwZXJNYXRjaGVyID0gZnVuY3Rpb24oIHNlZWQsIGNvbnRleHQsIHhtbCwgcmVzdWx0cywgb3V0ZXJtb3N0ICkge1xuXHRcdFx0dmFyIGVsZW0sIGosIG1hdGNoZXIsXG5cdFx0XHRcdG1hdGNoZWRDb3VudCA9IDAsXG5cdFx0XHRcdGkgPSBcIjBcIixcblx0XHRcdFx0dW5tYXRjaGVkID0gc2VlZCAmJiBbXSxcblx0XHRcdFx0c2V0TWF0Y2hlZCA9IFtdLFxuXHRcdFx0XHRjb250ZXh0QmFja3VwID0gb3V0ZXJtb3N0Q29udGV4dCxcblxuXHRcdFx0XHQvLyBXZSBtdXN0IGFsd2F5cyBoYXZlIGVpdGhlciBzZWVkIGVsZW1lbnRzIG9yIG91dGVybW9zdCBjb250ZXh0XG5cdFx0XHRcdGVsZW1zID0gc2VlZCB8fCBieUVsZW1lbnQgJiYgRXhwci5maW5kWyBcIlRBR1wiIF0oIFwiKlwiLCBvdXRlcm1vc3QgKSxcblxuXHRcdFx0XHQvLyBVc2UgaW50ZWdlciBkaXJydW5zIGlmZiB0aGlzIGlzIHRoZSBvdXRlcm1vc3QgbWF0Y2hlclxuXHRcdFx0XHRkaXJydW5zVW5pcXVlID0gKCBkaXJydW5zICs9IGNvbnRleHRCYWNrdXAgPT0gbnVsbCA/IDEgOiBNYXRoLnJhbmRvbSgpIHx8IDAuMSApLFxuXHRcdFx0XHRsZW4gPSBlbGVtcy5sZW5ndGg7XG5cblx0XHRcdGlmICggb3V0ZXJtb3N0ICkge1xuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDExKywgRWRnZSAxNyAtIDE4K1xuXHRcdFx0XHQvLyBJRS9FZGdlIHNvbWV0aW1lcyB0aHJvdyBhIFwiUGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvciB3aGVuIHN0cmljdC1jb21wYXJpbmdcblx0XHRcdFx0Ly8gdHdvIGRvY3VtZW50czsgc2hhbGxvdyBjb21wYXJpc29ucyB3b3JrLlxuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG5cdFx0XHRcdG91dGVybW9zdENvbnRleHQgPSBjb250ZXh0ID09IGRvY3VtZW50IHx8IGNvbnRleHQgfHwgb3V0ZXJtb3N0O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgZWxlbWVudHMgcGFzc2luZyBlbGVtZW50TWF0Y2hlcnMgZGlyZWN0bHkgdG8gcmVzdWx0c1xuXHRcdFx0Ly8gU3VwcG9ydDogSUU8OSwgU2FmYXJpXG5cdFx0XHQvLyBUb2xlcmF0ZSBOb2RlTGlzdCBwcm9wZXJ0aWVzIChJRTogXCJsZW5ndGhcIjsgU2FmYXJpOiA8bnVtYmVyPikgbWF0Y2hpbmcgZWxlbWVudHMgYnkgaWRcblx0XHRcdGZvciAoIDsgaSAhPT0gbGVuICYmICggZWxlbSA9IGVsZW1zWyBpIF0gKSAhPSBudWxsOyBpKysgKSB7XG5cdFx0XHRcdGlmICggYnlFbGVtZW50ICYmIGVsZW0gKSB7XG5cdFx0XHRcdFx0aiA9IDA7XG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTcgLSAxOCtcblx0XHRcdFx0XHQvLyBJRS9FZGdlIHNvbWV0aW1lcyB0aHJvdyBhIFwiUGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvciB3aGVuIHN0cmljdC1jb21wYXJpbmdcblx0XHRcdFx0XHQvLyB0d28gZG9jdW1lbnRzOyBzaGFsbG93IGNvbXBhcmlzb25zIHdvcmsuXG5cdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXHRcdFx0XHRcdGlmICggIWNvbnRleHQgJiYgZWxlbS5vd25lckRvY3VtZW50ICE9IGRvY3VtZW50ICkge1xuXHRcdFx0XHRcdFx0c2V0RG9jdW1lbnQoIGVsZW0gKTtcblx0XHRcdFx0XHRcdHhtbCA9ICFkb2N1bWVudElzSFRNTDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0d2hpbGUgKCAoIG1hdGNoZXIgPSBlbGVtZW50TWF0Y2hlcnNbIGorKyBdICkgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQgfHwgZG9jdW1lbnQsIHhtbCApICkge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggb3V0ZXJtb3N0ICkge1xuXHRcdFx0XHRcdFx0ZGlycnVucyA9IGRpcnJ1bnNVbmlxdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gVHJhY2sgdW5tYXRjaGVkIGVsZW1lbnRzIGZvciBzZXQgZmlsdGVyc1xuXHRcdFx0XHRpZiAoIGJ5U2V0ICkge1xuXG5cdFx0XHRcdFx0Ly8gVGhleSB3aWxsIGhhdmUgZ29uZSB0aHJvdWdoIGFsbCBwb3NzaWJsZSBtYXRjaGVyc1xuXHRcdFx0XHRcdGlmICggKCBlbGVtID0gIW1hdGNoZXIgJiYgZWxlbSApICkge1xuXHRcdFx0XHRcdFx0bWF0Y2hlZENvdW50LS07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gTGVuZ3RoZW4gdGhlIGFycmF5IGZvciBldmVyeSBlbGVtZW50LCBtYXRjaGVkIG9yIG5vdFxuXHRcdFx0XHRcdGlmICggc2VlZCApIHtcblx0XHRcdFx0XHRcdHVubWF0Y2hlZC5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGBpYCBpcyBub3cgdGhlIGNvdW50IG9mIGVsZW1lbnRzIHZpc2l0ZWQgYWJvdmUsIGFuZCBhZGRpbmcgaXQgdG8gYG1hdGNoZWRDb3VudGBcblx0XHRcdC8vIG1ha2VzIHRoZSBsYXR0ZXIgbm9ubmVnYXRpdmUuXG5cdFx0XHRtYXRjaGVkQ291bnQgKz0gaTtcblxuXHRcdFx0Ly8gQXBwbHkgc2V0IGZpbHRlcnMgdG8gdW5tYXRjaGVkIGVsZW1lbnRzXG5cdFx0XHQvLyBOT1RFOiBUaGlzIGNhbiBiZSBza2lwcGVkIGlmIHRoZXJlIGFyZSBubyB1bm1hdGNoZWQgZWxlbWVudHMgKGkuZS4sIGBtYXRjaGVkQ291bnRgXG5cdFx0XHQvLyBlcXVhbHMgYGlgKSwgdW5sZXNzIHdlIGRpZG4ndCB2aXNpdCBfYW55XyBlbGVtZW50cyBpbiB0aGUgYWJvdmUgbG9vcCBiZWNhdXNlIHdlIGhhdmVcblx0XHRcdC8vIG5vIGVsZW1lbnQgbWF0Y2hlcnMgYW5kIG5vIHNlZWQuXG5cdFx0XHQvLyBJbmNyZW1lbnRpbmcgYW4gaW5pdGlhbGx5LXN0cmluZyBcIjBcIiBgaWAgYWxsb3dzIGBpYCB0byByZW1haW4gYSBzdHJpbmcgb25seSBpbiB0aGF0XG5cdFx0XHQvLyBjYXNlLCB3aGljaCB3aWxsIHJlc3VsdCBpbiBhIFwiMDBcIiBgbWF0Y2hlZENvdW50YCB0aGF0IGRpZmZlcnMgZnJvbSBgaWAgYnV0IGlzIGFsc29cblx0XHRcdC8vIG51bWVyaWNhbGx5IHplcm8uXG5cdFx0XHRpZiAoIGJ5U2V0ICYmIGkgIT09IG1hdGNoZWRDb3VudCApIHtcblx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdHdoaWxlICggKCBtYXRjaGVyID0gc2V0TWF0Y2hlcnNbIGorKyBdICkgKSB7XG5cdFx0XHRcdFx0bWF0Y2hlciggdW5tYXRjaGVkLCBzZXRNYXRjaGVkLCBjb250ZXh0LCB4bWwgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggc2VlZCApIHtcblxuXHRcdFx0XHRcdC8vIFJlaW50ZWdyYXRlIGVsZW1lbnQgbWF0Y2hlcyB0byBlbGltaW5hdGUgdGhlIG5lZWQgZm9yIHNvcnRpbmdcblx0XHRcdFx0XHRpZiAoIG1hdGNoZWRDb3VudCA+IDAgKSB7XG5cdFx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCAhKCB1bm1hdGNoZWRbIGkgXSB8fCBzZXRNYXRjaGVkWyBpIF0gKSApIHtcblx0XHRcdFx0XHRcdFx0XHRzZXRNYXRjaGVkWyBpIF0gPSBwb3AuY2FsbCggcmVzdWx0cyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gRGlzY2FyZCBpbmRleCBwbGFjZWhvbGRlciB2YWx1ZXMgdG8gZ2V0IG9ubHkgYWN0dWFsIG1hdGNoZXNcblx0XHRcdFx0XHRzZXRNYXRjaGVkID0gY29uZGVuc2UoIHNldE1hdGNoZWQgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFkZCBtYXRjaGVzIHRvIHJlc3VsdHNcblx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgc2V0TWF0Y2hlZCApO1xuXG5cdFx0XHRcdC8vIFNlZWRsZXNzIHNldCBtYXRjaGVzIHN1Y2NlZWRpbmcgbXVsdGlwbGUgc3VjY2Vzc2Z1bCBtYXRjaGVycyBzdGlwdWxhdGUgc29ydGluZ1xuXHRcdFx0XHRpZiAoIG91dGVybW9zdCAmJiAhc2VlZCAmJiBzZXRNYXRjaGVkLmxlbmd0aCA+IDAgJiZcblx0XHRcdFx0XHQoIG1hdGNoZWRDb3VudCArIHNldE1hdGNoZXJzLmxlbmd0aCApID4gMSApIHtcblxuXHRcdFx0XHRcdFNpenpsZS51bmlxdWVTb3J0KCByZXN1bHRzICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gT3ZlcnJpZGUgbWFuaXB1bGF0aW9uIG9mIGdsb2JhbHMgYnkgbmVzdGVkIG1hdGNoZXJzXG5cdFx0XHRpZiAoIG91dGVybW9zdCApIHtcblx0XHRcdFx0ZGlycnVucyA9IGRpcnJ1bnNVbmlxdWU7XG5cdFx0XHRcdG91dGVybW9zdENvbnRleHQgPSBjb250ZXh0QmFja3VwO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdW5tYXRjaGVkO1xuXHRcdH07XG5cblx0cmV0dXJuIGJ5U2V0ID9cblx0XHRtYXJrRnVuY3Rpb24oIHN1cGVyTWF0Y2hlciApIDpcblx0XHRzdXBlck1hdGNoZXI7XG59XG5cbmNvbXBpbGUgPSBTaXp6bGUuY29tcGlsZSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgbWF0Y2ggLyogSW50ZXJuYWwgVXNlIE9ubHkgKi8gKSB7XG5cdHZhciBpLFxuXHRcdHNldE1hdGNoZXJzID0gW10sXG5cdFx0ZWxlbWVudE1hdGNoZXJzID0gW10sXG5cdFx0Y2FjaGVkID0gY29tcGlsZXJDYWNoZVsgc2VsZWN0b3IgKyBcIiBcIiBdO1xuXG5cdGlmICggIWNhY2hlZCApIHtcblxuXHRcdC8vIEdlbmVyYXRlIGEgZnVuY3Rpb24gb2YgcmVjdXJzaXZlIGZ1bmN0aW9ucyB0aGF0IGNhbiBiZSB1c2VkIHRvIGNoZWNrIGVhY2ggZWxlbWVudFxuXHRcdGlmICggIW1hdGNoICkge1xuXHRcdFx0bWF0Y2ggPSB0b2tlbml6ZSggc2VsZWN0b3IgKTtcblx0XHR9XG5cdFx0aSA9IG1hdGNoLmxlbmd0aDtcblx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdGNhY2hlZCA9IG1hdGNoZXJGcm9tVG9rZW5zKCBtYXRjaFsgaSBdICk7XG5cdFx0XHRpZiAoIGNhY2hlZFsgZXhwYW5kbyBdICkge1xuXHRcdFx0XHRzZXRNYXRjaGVycy5wdXNoKCBjYWNoZWQgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1lbnRNYXRjaGVycy5wdXNoKCBjYWNoZWQgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDYWNoZSB0aGUgY29tcGlsZWQgZnVuY3Rpb25cblx0XHRjYWNoZWQgPSBjb21waWxlckNhY2hlKFxuXHRcdFx0c2VsZWN0b3IsXG5cdFx0XHRtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMoIGVsZW1lbnRNYXRjaGVycywgc2V0TWF0Y2hlcnMgKVxuXHRcdCk7XG5cblx0XHQvLyBTYXZlIHNlbGVjdG9yIGFuZCB0b2tlbml6YXRpb25cblx0XHRjYWNoZWQuc2VsZWN0b3IgPSBzZWxlY3Rvcjtcblx0fVxuXHRyZXR1cm4gY2FjaGVkO1xufTtcblxuLyoqXG4gKiBBIGxvdy1sZXZlbCBzZWxlY3Rpb24gZnVuY3Rpb24gdGhhdCB3b3JrcyB3aXRoIFNpenpsZSdzIGNvbXBpbGVkXG4gKiAgc2VsZWN0b3IgZnVuY3Rpb25zXG4gKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gc2VsZWN0b3IgQSBzZWxlY3RvciBvciBhIHByZS1jb21waWxlZFxuICogIHNlbGVjdG9yIGZ1bmN0aW9uIGJ1aWx0IHdpdGggU2l6emxlLmNvbXBpbGVcbiAqIEBwYXJhbSB7RWxlbWVudH0gY29udGV4dFxuICogQHBhcmFtIHtBcnJheX0gW3Jlc3VsdHNdXG4gKiBAcGFyYW0ge0FycmF5fSBbc2VlZF0gQSBzZXQgb2YgZWxlbWVudHMgdG8gbWF0Y2ggYWdhaW5zdFxuICovXG5zZWxlY3QgPSBTaXp6bGUuc2VsZWN0ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICkge1xuXHR2YXIgaSwgdG9rZW5zLCB0b2tlbiwgdHlwZSwgZmluZCxcblx0XHRjb21waWxlZCA9IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJmdW5jdGlvblwiICYmIHNlbGVjdG9yLFxuXHRcdG1hdGNoID0gIXNlZWQgJiYgdG9rZW5pemUoICggc2VsZWN0b3IgPSBjb21waWxlZC5zZWxlY3RvciB8fCBzZWxlY3RvciApICk7XG5cblx0cmVzdWx0cyA9IHJlc3VsdHMgfHwgW107XG5cblx0Ly8gVHJ5IHRvIG1pbmltaXplIG9wZXJhdGlvbnMgaWYgdGhlcmUgaXMgb25seSBvbmUgc2VsZWN0b3IgaW4gdGhlIGxpc3QgYW5kIG5vIHNlZWRcblx0Ly8gKHRoZSBsYXR0ZXIgb2Ygd2hpY2ggZ3VhcmFudGVlcyB1cyBjb250ZXh0KVxuXHRpZiAoIG1hdGNoLmxlbmd0aCA9PT0gMSApIHtcblxuXHRcdC8vIFJlZHVjZSBjb250ZXh0IGlmIHRoZSBsZWFkaW5nIGNvbXBvdW5kIHNlbGVjdG9yIGlzIGFuIElEXG5cdFx0dG9rZW5zID0gbWF0Y2hbIDAgXSA9IG1hdGNoWyAwIF0uc2xpY2UoIDAgKTtcblx0XHRpZiAoIHRva2Vucy5sZW5ndGggPiAyICYmICggdG9rZW4gPSB0b2tlbnNbIDAgXSApLnR5cGUgPT09IFwiSURcIiAmJlxuXHRcdFx0Y29udGV4dC5ub2RlVHlwZSA9PT0gOSAmJiBkb2N1bWVudElzSFRNTCAmJiBFeHByLnJlbGF0aXZlWyB0b2tlbnNbIDEgXS50eXBlIF0gKSB7XG5cblx0XHRcdGNvbnRleHQgPSAoIEV4cHIuZmluZFsgXCJJRFwiIF0oIHRva2VuLm1hdGNoZXNbIDAgXVxuXHRcdFx0XHQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKSwgY29udGV4dCApIHx8IFtdIClbIDAgXTtcblx0XHRcdGlmICggIWNvbnRleHQgKSB7XG5cdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXG5cdFx0XHQvLyBQcmVjb21waWxlZCBtYXRjaGVycyB3aWxsIHN0aWxsIHZlcmlmeSBhbmNlc3RyeSwgc28gc3RlcCB1cCBhIGxldmVsXG5cdFx0XHR9IGVsc2UgaWYgKCBjb21waWxlZCApIHtcblx0XHRcdFx0Y29udGV4dCA9IGNvbnRleHQucGFyZW50Tm9kZTtcblx0XHRcdH1cblxuXHRcdFx0c2VsZWN0b3IgPSBzZWxlY3Rvci5zbGljZSggdG9rZW5zLnNoaWZ0KCkudmFsdWUubGVuZ3RoICk7XG5cdFx0fVxuXG5cdFx0Ly8gRmV0Y2ggYSBzZWVkIHNldCBmb3IgcmlnaHQtdG8tbGVmdCBtYXRjaGluZ1xuXHRcdGkgPSBtYXRjaEV4cHJbIFwibmVlZHNDb250ZXh0XCIgXS50ZXN0KCBzZWxlY3RvciApID8gMCA6IHRva2Vucy5sZW5ndGg7XG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHR0b2tlbiA9IHRva2Vuc1sgaSBdO1xuXG5cdFx0XHQvLyBBYm9ydCBpZiB3ZSBoaXQgYSBjb21iaW5hdG9yXG5cdFx0XHRpZiAoIEV4cHIucmVsYXRpdmVbICggdHlwZSA9IHRva2VuLnR5cGUgKSBdICkge1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGlmICggKCBmaW5kID0gRXhwci5maW5kWyB0eXBlIF0gKSApIHtcblxuXHRcdFx0XHQvLyBTZWFyY2gsIGV4cGFuZGluZyBjb250ZXh0IGZvciBsZWFkaW5nIHNpYmxpbmcgY29tYmluYXRvcnNcblx0XHRcdFx0aWYgKCAoIHNlZWQgPSBmaW5kKFxuXHRcdFx0XHRcdHRva2VuLm1hdGNoZXNbIDAgXS5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLFxuXHRcdFx0XHRcdHJzaWJsaW5nLnRlc3QoIHRva2Vuc1sgMCBdLnR5cGUgKSAmJiB0ZXN0Q29udGV4dCggY29udGV4dC5wYXJlbnROb2RlICkgfHxcblx0XHRcdFx0XHRcdGNvbnRleHRcblx0XHRcdFx0KSApICkge1xuXG5cdFx0XHRcdFx0Ly8gSWYgc2VlZCBpcyBlbXB0eSBvciBubyB0b2tlbnMgcmVtYWluLCB3ZSBjYW4gcmV0dXJuIGVhcmx5XG5cdFx0XHRcdFx0dG9rZW5zLnNwbGljZSggaSwgMSApO1xuXHRcdFx0XHRcdHNlbGVjdG9yID0gc2VlZC5sZW5ndGggJiYgdG9TZWxlY3RvciggdG9rZW5zICk7XG5cdFx0XHRcdFx0aWYgKCAhc2VsZWN0b3IgKSB7XG5cdFx0XHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBzZWVkICk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIENvbXBpbGUgYW5kIGV4ZWN1dGUgYSBmaWx0ZXJpbmcgZnVuY3Rpb24gaWYgb25lIGlzIG5vdCBwcm92aWRlZFxuXHQvLyBQcm92aWRlIGBtYXRjaGAgdG8gYXZvaWQgcmV0b2tlbml6YXRpb24gaWYgd2UgbW9kaWZpZWQgdGhlIHNlbGVjdG9yIGFib3ZlXG5cdCggY29tcGlsZWQgfHwgY29tcGlsZSggc2VsZWN0b3IsIG1hdGNoICkgKShcblx0XHRzZWVkLFxuXHRcdGNvbnRleHQsXG5cdFx0IWRvY3VtZW50SXNIVE1MLFxuXHRcdHJlc3VsdHMsXG5cdFx0IWNvbnRleHQgfHwgcnNpYmxpbmcudGVzdCggc2VsZWN0b3IgKSAmJiB0ZXN0Q29udGV4dCggY29udGV4dC5wYXJlbnROb2RlICkgfHwgY29udGV4dFxuXHQpO1xuXHRyZXR1cm4gcmVzdWx0cztcbn07XG5cbi8vIE9uZS10aW1lIGFzc2lnbm1lbnRzXG5cbi8vIFNvcnQgc3RhYmlsaXR5XG5zdXBwb3J0LnNvcnRTdGFibGUgPSBleHBhbmRvLnNwbGl0KCBcIlwiICkuc29ydCggc29ydE9yZGVyICkuam9pbiggXCJcIiApID09PSBleHBhbmRvO1xuXG4vLyBTdXBwb3J0OiBDaHJvbWUgMTQtMzUrXG4vLyBBbHdheXMgYXNzdW1lIGR1cGxpY2F0ZXMgaWYgdGhleSBhcmVuJ3QgcGFzc2VkIHRvIHRoZSBjb21wYXJpc29uIGZ1bmN0aW9uXG5zdXBwb3J0LmRldGVjdER1cGxpY2F0ZXMgPSAhIWhhc0R1cGxpY2F0ZTtcblxuLy8gSW5pdGlhbGl6ZSBhZ2FpbnN0IHRoZSBkZWZhdWx0IGRvY3VtZW50XG5zZXREb2N1bWVudCgpO1xuXG4vLyBTdXBwb3J0OiBXZWJraXQ8NTM3LjMyIC0gU2FmYXJpIDYuMC4zL0Nocm9tZSAyNSAoZml4ZWQgaW4gQ2hyb21lIDI3KVxuLy8gRGV0YWNoZWQgbm9kZXMgY29uZm91bmRpbmdseSBmb2xsb3cgKmVhY2ggb3RoZXIqXG5zdXBwb3J0LnNvcnREZXRhY2hlZCA9IGFzc2VydCggZnVuY3Rpb24oIGVsICkge1xuXG5cdC8vIFNob3VsZCByZXR1cm4gMSwgYnV0IHJldHVybnMgNCAoZm9sbG93aW5nKVxuXHRyZXR1cm4gZWwuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZmllbGRzZXRcIiApICkgJiAxO1xufSApO1xuXG4vLyBTdXBwb3J0OiBJRTw4XG4vLyBQcmV2ZW50IGF0dHJpYnV0ZS9wcm9wZXJ0eSBcImludGVycG9sYXRpb25cIlxuLy8gaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzNjQyOSUyOFZTLjg1JTI5LmFzcHhcbmlmICggIWFzc2VydCggZnVuY3Rpb24oIGVsICkge1xuXHRlbC5pbm5lckhUTUwgPSBcIjxhIGhyZWY9JyMnPjwvYT5cIjtcblx0cmV0dXJuIGVsLmZpcnN0Q2hpbGQuZ2V0QXR0cmlidXRlKCBcImhyZWZcIiApID09PSBcIiNcIjtcbn0gKSApIHtcblx0YWRkSGFuZGxlKCBcInR5cGV8aHJlZnxoZWlnaHR8d2lkdGhcIiwgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdGlmICggIWlzWE1MICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lLCBuYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwidHlwZVwiID8gMSA6IDIgKTtcblx0XHR9XG5cdH0gKTtcbn1cblxuLy8gU3VwcG9ydDogSUU8OVxuLy8gVXNlIGRlZmF1bHRWYWx1ZSBpbiBwbGFjZSBvZiBnZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKVxuaWYgKCAhc3VwcG9ydC5hdHRyaWJ1dGVzIHx8ICFhc3NlcnQoIGZ1bmN0aW9uKCBlbCApIHtcblx0ZWwuaW5uZXJIVE1MID0gXCI8aW5wdXQvPlwiO1xuXHRlbC5maXJzdENoaWxkLnNldEF0dHJpYnV0ZSggXCJ2YWx1ZVwiLCBcIlwiICk7XG5cdHJldHVybiBlbC5maXJzdENoaWxkLmdldEF0dHJpYnV0ZSggXCJ2YWx1ZVwiICkgPT09IFwiXCI7XG59ICkgKSB7XG5cdGFkZEhhbmRsZSggXCJ2YWx1ZVwiLCBmdW5jdGlvbiggZWxlbSwgX25hbWUsIGlzWE1MICkge1xuXHRcdGlmICggIWlzWE1MICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnB1dFwiICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0fSApO1xufVxuXG4vLyBTdXBwb3J0OiBJRTw5XG4vLyBVc2UgZ2V0QXR0cmlidXRlTm9kZSB0byBmZXRjaCBib29sZWFucyB3aGVuIGdldEF0dHJpYnV0ZSBsaWVzXG5pZiAoICFhc3NlcnQoIGZ1bmN0aW9uKCBlbCApIHtcblx0cmV0dXJuIGVsLmdldEF0dHJpYnV0ZSggXCJkaXNhYmxlZFwiICkgPT0gbnVsbDtcbn0gKSApIHtcblx0YWRkSGFuZGxlKCBib29sZWFucywgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdHZhciB2YWw7XG5cdFx0aWYgKCAhaXNYTUwgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbVsgbmFtZSBdID09PSB0cnVlID8gbmFtZS50b0xvd2VyQ2FzZSgpIDpcblx0XHRcdFx0KCB2YWwgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIG5hbWUgKSApICYmIHZhbC5zcGVjaWZpZWQgP1xuXHRcdFx0XHRcdHZhbC52YWx1ZSA6XG5cdFx0XHRcdFx0bnVsbDtcblx0XHR9XG5cdH0gKTtcbn1cblxuLy8gRVhQT1NFXG52YXIgX3NpenpsZSA9IHdpbmRvdy5TaXp6bGU7XG5cblNpenpsZS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG5cdGlmICggd2luZG93LlNpenpsZSA9PT0gU2l6emxlICkge1xuXHRcdHdpbmRvdy5TaXp6bGUgPSBfc2l6emxlO1xuXHR9XG5cblx0cmV0dXJuIFNpenpsZTtcbn07XG5cbmlmICggdHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQgKSB7XG5cdGRlZmluZSggZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIFNpenpsZTtcblx0fSApO1xuXG4vLyBTaXp6bGUgcmVxdWlyZXMgdGhhdCB0aGVyZSBiZSBhIGdsb2JhbCB3aW5kb3cgaW4gQ29tbW9uLUpTIGxpa2UgZW52aXJvbm1lbnRzXG59IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmIG1vZHVsZS5leHBvcnRzICkge1xuXHRtb2R1bGUuZXhwb3J0cyA9IFNpenpsZTtcbn0gZWxzZSB7XG5cdHdpbmRvdy5TaXp6bGUgPSBTaXp6bGU7XG59XG5cbi8vIEVYUE9TRVxuXG59ICkoIHdpbmRvdyApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi9zaXp6bGUvZGlzdC9zaXp6bGUuanMiLCJleHBvcnQgeyBkZWZhdWx0IGFzIHNlbGVjdCwgZ2V0U2luZ2xlU2VsZWN0b3IsIGdldE11bHRpU2VsZWN0b3IgfSBmcm9tICcuL3NlbGVjdCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgbWF0Y2gsIGluaXRPcHRpb25zIH0gZnJvbSAnLi9tYXRjaCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgb3B0aW1pemUgfSBmcm9tICcuL29wdGltaXplJ1xuZXhwb3J0ICogYXMgY29tbW9uIGZyb20gJy4vY29tbW9uJ1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==