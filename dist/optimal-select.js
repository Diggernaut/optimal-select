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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

    if (name === 'id') {
      return '#' + value;
    }
    if (value === null) {
      return '[' + name + ']';
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
  return classes.length ? '.' + classes.join('.') : '';
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
/* 1 */
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
* @returns {(selector: string, parent: HTMLElement) => string}
*/
var getSelect = exports.getSelect = function getSelect() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (selector, parent) {
    return select[options.format || 'css'](selector, parent || options.root);
  };
};

/***/ },
/* 2 */
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
        classes = classes.trim().split(' ');
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
        // TODO: restructure removal as 2x set / 2x delete, instead of modify always replacing with new collection
        delete commonProperties.classes;
      }
    }

    // ~ attributes
    if (commonAttributes !== undefined) {
      var elementAttributes = element.attributes;
      var attributes = Object.keys(elementAttributes).reduce(function (attributes, key) {
        var attribute = elementAttributes[key];
        var attributeName = attribute.name;
        // NOTE: workaround detection for non-standard phantomjs NamedNodeMap behaviour
        // (issue: https://github.com/ariya/phantomjs/issues/14634)
        if (attribute && attributeName !== 'class') {
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
exports.initOptions = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * # Match
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * Retrieve selector for a node.
                                                                                                                                                                                                                                                                   */

exports.default = match;

var _pattern = __webpack_require__(0);

var _selector = __webpack_require__(1);

var _utilities = __webpack_require__(2);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @typedef {import('./select').Options} Options
 * @typedef {import('./pattern').Pattern} Pattern
 * @typedef {import('./pattern').ToStringApi} Pattern
 */

var defaultIgnore = {
  attribute: function attribute(attributeName) {
    return ['style', 'data-reactid', 'data-react-checksum'].indexOf(attributeName) > -1;
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

      if (path.length === length && [1, 'xpath'].includes(format)) {
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
 * Get combinations
 *
 * @param  {Array.<string>} values   - [description]
 * @return {Array.<string>?}        - [description]
 */
var combinations = function combinations(values) {
  var result = [[]];

  values.forEach(function (c) {
    result.forEach(function (r) {
      return result.push(r.concat(c));
    });
  });

  result.shift();
  return result;
};

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

  var result = combinations(classes);

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

          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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
var checkTag = function checkTag(element, path, _ref2, select, toString) {
  var ignore = _ref2.ignore;
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
var checkNthChild = function checkNthChild(element, path, _ref3) {
  var ignore = _ref3.ignore;

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
var checkText = function checkText(element, path, _ref4, select, toString, nested) {
  var ignore = _ref4.ignore;

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
    if (checkIgnore(ignore.contains, null, text)) {
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
    var descendantPath = match(descendants.shift(), _extends({}, options, { root: element }));
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
var findPattern = function findPattern(element, _ref5, select, toString) {
  var priority = _ref5.priority,
      ignore = _ref5.ignore;

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

var _selector = __webpack_require__(1);

var _pattern2 = __webpack_require__(0);

var _utilities = __webpack_require__(2);

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
          var description = (0, _pattern2.createPattern)({ tagName: reference.tagName });
          pattern = toString.path([].concat(_toConsumableArray(pre), [(0, _pattern2.createPattern)({ tagName: reference.tagName })], _toConsumableArray(post)));
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

var _utilities = __webpack_require__(2);

var _common = __webpack_require__(3);

var _selector = __webpack_require__(1);

var _pattern = __webpack_require__(0);

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
  var commonPath = getCommonPath(elements);
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
var getCommonPath = function getCommonPath(elements) {
  var _getCommonProperties = (0, _common.getCommonProperties)(elements),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4NTVjYmI0ZDlhNzZjZDk4MjRmMyIsIndlYnBhY2s6Ly8vLi9zcmMvcGF0dGVybi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9tYXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb3B0aW1pemUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L3NpenpsZS9kaXN0L3NpenpsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiY3JlYXRlUGF0dGVybiIsImJhc2UiLCJhdHRyaWJ1dGVzIiwiY2xhc3NlcyIsInBzZXVkbyIsImRlc2NlbmRhbnRzIiwiYXR0cmlidXRlc1RvU2VsZWN0b3IiLCJtYXAiLCJuYW1lIiwidmFsdWUiLCJqb2luIiwiY2xhc3Nlc1RvU2VsZWN0b3IiLCJsZW5ndGgiLCJwc2V1ZG9Ub1NlbGVjdG9yIiwicGF0dGVyblRvU2VsZWN0b3IiLCJwYXR0ZXJuIiwicmVsYXRlcyIsInRhZyIsInBhdGhUb1NlbGVjdG9yIiwicGF0aCIsImNvbnZlcnRFc2NhcGluZyIsInJlcGxhY2UiLCJhdHRyaWJ1dGVzVG9YUGF0aCIsImNsYXNzZXNUb1hQYXRoIiwiYyIsInBzZXVkb1RvWFBhdGgiLCJtYXRjaCIsInAiLCJwYXR0ZXJuVG9YUGF0aCIsImRlc2NlbmRhbnRzVG9YUGF0aCIsInBhdGhUb1hQYXRoIiwiY2hpbGRyZW4iLCJ0b1N0cmluZyIsImpxdWVyeSIsImNzcyIsInhwYXRoIiwiZ2V0VG9TdHJpbmciLCJvcHRpb25zIiwiZm9ybWF0IiwiU2l6emxlIiwic2VsZWN0SlF1ZXJ5Iiwic2VsZWN0b3IiLCJwYXJlbnQiLCJyZXF1aXJlIiwiZG9jdW1lbnQiLCJzZWxlY3RYUGF0aCIsImRvYyIsInBhcmVudE5vZGUiLCJzdGFydHNXaXRoIiwiaXRlcmF0b3IiLCJldmFsdWF0ZSIsImVsZW1lbnRzIiwiZWxlbWVudCIsIml0ZXJhdGVOZXh0IiwicHVzaCIsInNlbGVjdENTUyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzZWxlY3QiLCJnZXRTZWxlY3QiLCJyb290IiwiY29udmVydE5vZGVMaXN0Iiwibm9kZXMiLCJhcnIiLCJBcnJheSIsImkiLCJlc2NhcGVWYWx1ZSIsInBhcnRpdGlvbiIsImFycmF5IiwicHJlZGljYXRlIiwicmVkdWNlIiwiaXRlbSIsImlubmVyIiwib3V0ZXIiLCJjb25jYXQiLCJnZXRDb21tb25BbmNlc3RvciIsImFuY2VzdG9ycyIsImZvckVhY2giLCJpbmRleCIsInBhcmVudHMiLCJ1bnNoaWZ0Iiwic29ydCIsImN1cnIiLCJuZXh0Iiwic2hhbGxvd0FuY2VzdG9yIiwic2hpZnQiLCJhbmNlc3RvciIsIm1pc3NpbmciLCJzb21lIiwib3RoZXJQYXJlbnRzIiwib3RoZXJQYXJlbnQiLCJsIiwiZ2V0Q29tbW9uUHJvcGVydGllcyIsImNvbW1vblByb3BlcnRpZXMiLCJjb21tb25DbGFzc2VzIiwiY29tbW9uQXR0cmlidXRlcyIsImNvbW1vblRhZyIsInVuZGVmaW5lZCIsImdldEF0dHJpYnV0ZSIsInRyaW0iLCJzcGxpdCIsImZpbHRlciIsImVudHJ5IiwiZWxlbWVudEF0dHJpYnV0ZXMiLCJPYmplY3QiLCJrZXlzIiwia2V5IiwiYXR0cmlidXRlIiwiYXR0cmlidXRlTmFtZSIsImF0dHJpYnV0ZXNOYW1lcyIsImNvbW1vbkF0dHJpYnV0ZXNOYW1lcyIsIm5leHRDb21tb25BdHRyaWJ1dGVzIiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwiZGVmYXVsdElnbm9yZSIsImluZGV4T2YiLCJpbml0T3B0aW9ucyIsInNraXAiLCJwcmlvcml0eSIsImlnbm9yZSIsIm5vZGUiLCJza2lwQ29tcGFyZSIsImlzQXJyYXkiLCJza2lwQ2hlY2tzIiwiY29tcGFyZSIsInR5cGUiLCJSZWdFeHAiLCJ0ZXN0Iiwibm9kZVR5cGUiLCJjaGVja0F0dHJpYnV0ZXMiLCJjaGVja1RhZyIsImluY2x1ZGVzIiwiY2hlY2tSZWN1cnNpdmVEZXNjZW5kYW50cyIsImNoZWNrVGV4dCIsImNoZWNrTnRoQ2hpbGQiLCJmaW5kUGF0dGVybiIsImZpbmRBdHRyaWJ1dGVzUGF0dGVybiIsImNvbWJpbmF0aW9ucyIsInZhbHVlcyIsInJlc3VsdCIsInIiLCJnZXRDbGFzc1NlbGVjdG9yIiwibWF0Y2hlcyIsImF0dHJpYnV0ZU5hbWVzIiwidmFsIiwiYSIsInNvcnRlZEtleXMiLCJpc09wdGltYWwiLCJhdHRyaWJ1dGVWYWx1ZSIsInVzZU5hbWVkSWdub3JlIiwiY3VycmVudElnbm9yZSIsImN1cnJlbnREZWZhdWx0SWdub3JlIiwiY2hlY2tJZ25vcmUiLCJjbGFzc05hbWVzIiwiY2xhc3NJZ25vcmUiLCJjbGFzcyIsImNsYXNzTmFtZSIsImZpbmRUYWdQYXR0ZXJuIiwiY2hpbGQiLCJjaGlsZFBhdHRlcm4iLCJjb25zb2xlIiwid2FybiIsIm5lc3RlZCIsInRleHRDb250ZW50IiwiZmlyc3RDaGlsZCIsIm5vZGVWYWx1ZSIsInRleHRzIiwidGV4dCIsImNvbnRhaW5zIiwiZnJvbSIsImRlc2NlbmRhbnRQYXRoIiwicGFyZW50RWxlbWVudCIsImRlZmF1bHRQcmVkaWNhdGUiLCJjaGVjayIsIm9wdGltaXplIiwiRXJyb3IiLCJvcHRpbWl6ZVBhcnQiLCJlbmRPcHRpbWl6ZWQiLCJzbGljZSIsInNob3J0ZW5lZCIsInBvcCIsImN1cnJlbnQiLCJoYXNTYW1lUmVzdWx0IiwiZXZlcnkiLCJvcHRpbWl6ZVRleHQiLCJwcmUiLCJwb3N0Iiwib3RoZXIiLCJvcHRpbWl6ZWQiLCJjb21wYXJlUmVzdWx0cyIsIm9wdGltaXplQXR0cmlidXRlcyIsInNpbXBsaWZ5Iiwib3JpZ2luYWwiLCJnZXRTaW1wbGlmaWVkIiwic2ltcGxpZmllZCIsIm9wdGltaXplRGVzY2VuZGFudCIsImRlc2NlbmRhbnQiLCJvcHRpbWl6ZVJlY3Vyc2l2ZURlc2NlbmRhbnRzIiwib3B0aW1pemVOdGhPZlR5cGUiLCJmaW5kSW5kZXgiLCJudGhPZlR5cGUiLCJvcHRpbWl6ZUNsYXNzZXMiLCJyZWZlcmVuY2VzIiwicmVmZXJlbmNlIiwiZGVzY3JpcHRpb24iLCJvcHRpbWl6ZXJzIiwiYWNjIiwib3B0aW1pemVyIiwiZ2V0UXVlcnlTZWxlY3RvciIsImdldFNpbmdsZVNlbGVjdG9yUGF0aCIsIm9wdGltaXplZFBhdGgiLCJnZXRNdWx0aVNlbGVjdG9yUGF0aCIsImFuY2VzdG9yUGF0aCIsImNvbW1vblBhdGgiLCJnZXRDb21tb25QYXRoIiwiZGVzY2VuZGFudFBhdHRlcm4iLCJzZWxlY3RvclBhdGgiLCJzZWxlY3Rvck1hdGNoZXMiLCJpbnB1dCIsIndpbmRvdyIsInN1cHBvcnQiLCJFeHByIiwiZ2V0VGV4dCIsImlzWE1MIiwidG9rZW5pemUiLCJjb21waWxlIiwib3V0ZXJtb3N0Q29udGV4dCIsInNvcnRJbnB1dCIsImhhc0R1cGxpY2F0ZSIsInNldERvY3VtZW50IiwiZG9jRWxlbSIsImRvY3VtZW50SXNIVE1MIiwicmJ1Z2d5UVNBIiwicmJ1Z2d5TWF0Y2hlcyIsImV4cGFuZG8iLCJEYXRlIiwicHJlZmVycmVkRG9jIiwiZGlycnVucyIsImRvbmUiLCJjbGFzc0NhY2hlIiwiY3JlYXRlQ2FjaGUiLCJ0b2tlbkNhY2hlIiwiY29tcGlsZXJDYWNoZSIsIm5vbm5hdGl2ZVNlbGVjdG9yQ2FjaGUiLCJzb3J0T3JkZXIiLCJiIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJwdXNoTmF0aXZlIiwibGlzdCIsImVsZW0iLCJsZW4iLCJib29sZWFucyIsIndoaXRlc3BhY2UiLCJpZGVudGlmaWVyIiwicHNldWRvcyIsInJ3aGl0ZXNwYWNlIiwicnRyaW0iLCJyY29tbWEiLCJyY29tYmluYXRvcnMiLCJyZGVzY2VuZCIsInJwc2V1ZG8iLCJyaWRlbnRpZmllciIsIm1hdGNoRXhwciIsInJodG1sIiwicmlucHV0cyIsInJoZWFkZXIiLCJybmF0aXZlIiwicnF1aWNrRXhwciIsInJzaWJsaW5nIiwicnVuZXNjYXBlIiwiZnVuZXNjYXBlIiwiZXNjYXBlIiwibm9uSGV4IiwiaGlnaCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsInJjc3Nlc2NhcGUiLCJmY3NzZXNjYXBlIiwiY2giLCJhc0NvZGVQb2ludCIsImNoYXJDb2RlQXQiLCJ1bmxvYWRIYW5kbGVyIiwiaW5EaXNhYmxlZEZpZWxkc2V0IiwiYWRkQ29tYmluYXRvciIsImRpc2FibGVkIiwibm9kZU5hbWUiLCJkaXIiLCJhcHBseSIsImNhbGwiLCJjaGlsZE5vZGVzIiwiZSIsInRhcmdldCIsImVscyIsImoiLCJjb250ZXh0IiwicmVzdWx0cyIsInNlZWQiLCJtIiwibmlkIiwiZ3JvdXBzIiwibmV3U2VsZWN0b3IiLCJuZXdDb250ZXh0Iiwib3duZXJEb2N1bWVudCIsImV4ZWMiLCJnZXRFbGVtZW50QnlJZCIsImlkIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwicXNhIiwidGVzdENvbnRleHQiLCJzY29wZSIsInNldEF0dHJpYnV0ZSIsInRvU2VsZWN0b3IiLCJxc2FFcnJvciIsInJlbW92ZUF0dHJpYnV0ZSIsImNhY2hlIiwiY2FjaGVMZW5ndGgiLCJtYXJrRnVuY3Rpb24iLCJmbiIsImFzc2VydCIsImVsIiwiY3JlYXRlRWxlbWVudCIsInJlbW92ZUNoaWxkIiwiYWRkSGFuZGxlIiwiYXR0cnMiLCJoYW5kbGVyIiwiYXR0ckhhbmRsZSIsInNpYmxpbmdDaGVjayIsImN1ciIsImRpZmYiLCJzb3VyY2VJbmRleCIsIm5leHRTaWJsaW5nIiwiY3JlYXRlSW5wdXRQc2V1ZG8iLCJjcmVhdGVCdXR0b25Qc2V1ZG8iLCJjcmVhdGVEaXNhYmxlZFBzZXVkbyIsImlzRGlzYWJsZWQiLCJjcmVhdGVQb3NpdGlvbmFsUHNldWRvIiwiYXJndW1lbnQiLCJtYXRjaEluZGV4ZXMiLCJuYW1lc3BhY2UiLCJuYW1lc3BhY2VVUkkiLCJkb2N1bWVudEVsZW1lbnQiLCJoYXNDb21wYXJlIiwic3ViV2luZG93IiwiZGVmYXVsdFZpZXciLCJ0b3AiLCJhZGRFdmVudExpc3RlbmVyIiwiYXR0YWNoRXZlbnQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUNvbW1lbnQiLCJnZXRCeUlkIiwiZ2V0RWxlbWVudHNCeU5hbWUiLCJhdHRySWQiLCJmaW5kIiwiZ2V0QXR0cmlidXRlTm9kZSIsImVsZW1zIiwidG1wIiwiaW5uZXJIVE1MIiwibWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwibW96TWF0Y2hlc1NlbGVjdG9yIiwib01hdGNoZXNTZWxlY3RvciIsIm1zTWF0Y2hlc1NlbGVjdG9yIiwiZGlzY29ubmVjdGVkTWF0Y2giLCJjb21wYXJlRG9jdW1lbnRQb3NpdGlvbiIsImFkb3duIiwiYnVwIiwic29ydERldGFjaGVkIiwiYXVwIiwiYXAiLCJicCIsImV4cHIiLCJyZXQiLCJhdHRyIiwic3BlY2lmaWVkIiwic2VsIiwiZXJyb3IiLCJtc2ciLCJ1bmlxdWVTb3J0IiwiZHVwbGljYXRlcyIsImRldGVjdER1cGxpY2F0ZXMiLCJzb3J0U3RhYmxlIiwic3BsaWNlIiwic2VsZWN0b3JzIiwiY3JlYXRlUHNldWRvIiwicmVsYXRpdmUiLCJmaXJzdCIsInByZUZpbHRlciIsImV4Y2VzcyIsInVucXVvdGVkIiwibm9kZU5hbWVTZWxlY3RvciIsIm9wZXJhdG9yIiwid2hhdCIsIl9hcmd1bWVudCIsImxhc3QiLCJzaW1wbGUiLCJmb3J3YXJkIiwib2ZUeXBlIiwiX2NvbnRleHQiLCJ4bWwiLCJ1bmlxdWVDYWNoZSIsIm91dGVyQ2FjaGUiLCJub2RlSW5kZXgiLCJzdGFydCIsInVzZUNhY2hlIiwibGFzdENoaWxkIiwidW5pcXVlSUQiLCJhcmdzIiwic2V0RmlsdGVycyIsImlkeCIsIm1hdGNoZWQiLCJtYXRjaGVyIiwidW5tYXRjaGVkIiwibGFuZyIsImVsZW1MYW5nIiwiaGFzaCIsImxvY2F0aW9uIiwiYWN0aXZlRWxlbWVudCIsImhhc0ZvY3VzIiwiaHJlZiIsInRhYkluZGV4IiwiY2hlY2tlZCIsInNlbGVjdGVkIiwic2VsZWN0ZWRJbmRleCIsIl9tYXRjaEluZGV4ZXMiLCJyYWRpbyIsImNoZWNrYm94IiwiZmlsZSIsInBhc3N3b3JkIiwiaW1hZ2UiLCJzdWJtaXQiLCJyZXNldCIsInByb3RvdHlwZSIsImZpbHRlcnMiLCJwYXJzZU9ubHkiLCJ0b2tlbnMiLCJzb0ZhciIsInByZUZpbHRlcnMiLCJjYWNoZWQiLCJjb21iaW5hdG9yIiwiY2hlY2tOb25FbGVtZW50cyIsImRvbmVOYW1lIiwib2xkQ2FjaGUiLCJuZXdDYWNoZSIsImVsZW1lbnRNYXRjaGVyIiwibWF0Y2hlcnMiLCJtdWx0aXBsZUNvbnRleHRzIiwiY29udGV4dHMiLCJjb25kZW5zZSIsIm5ld1VubWF0Y2hlZCIsIm1hcHBlZCIsInNldE1hdGNoZXIiLCJwb3N0RmlsdGVyIiwicG9zdEZpbmRlciIsInBvc3RTZWxlY3RvciIsInRlbXAiLCJwcmVNYXAiLCJwb3N0TWFwIiwicHJlZXhpc3RpbmciLCJtYXRjaGVySW4iLCJtYXRjaGVyT3V0IiwibWF0Y2hlckZyb21Ub2tlbnMiLCJjaGVja0NvbnRleHQiLCJsZWFkaW5nUmVsYXRpdmUiLCJpbXBsaWNpdFJlbGF0aXZlIiwibWF0Y2hDb250ZXh0IiwibWF0Y2hBbnlDb250ZXh0IiwibWF0Y2hlckZyb21Hcm91cE1hdGNoZXJzIiwiZWxlbWVudE1hdGNoZXJzIiwic2V0TWF0Y2hlcnMiLCJieVNldCIsImJ5RWxlbWVudCIsInN1cGVyTWF0Y2hlciIsIm91dGVybW9zdCIsIm1hdGNoZWRDb3VudCIsInNldE1hdGNoZWQiLCJjb250ZXh0QmFja3VwIiwiZGlycnVuc1VuaXF1ZSIsIk1hdGgiLCJyYW5kb20iLCJ0b2tlbiIsImNvbXBpbGVkIiwiX25hbWUiLCJkZWZhdWx0VmFsdWUiLCJfc2l6emxlIiwibm9Db25mbGljdCIsImRlZmluZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJkZWZhdWx0IiwiZ2V0U2luZ2xlU2VsZWN0b3IiLCJnZXRNdWx0aVNlbGVjdG9yIiwiY29tbW9uIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRUE7Ozs7Ozs7Ozs7QUFVQTs7Ozs7O0FBTU8sSUFBTUEsd0NBQWdCLFNBQWhCQSxhQUFnQjtBQUFBLE1BQUNDLElBQUQsdUVBQVEsRUFBUjtBQUFBLG9CQUN4QkMsWUFBWSxFQURZLEVBQ1JDLFNBQVMsRUFERCxFQUNLQyxRQUFRLEVBRGIsRUFDaUJDLGFBQWEsRUFEOUIsSUFDcUNKLElBRHJDO0FBQUEsQ0FBdEI7O0FBR1A7Ozs7OztBQU1PLElBQU1LLHNEQUF1QixTQUF2QkEsb0JBQXVCLENBQUNKLFVBQUQ7QUFBQSxTQUNsQ0EsV0FBV0ssR0FBWCxDQUFlLGdCQUFxQjtBQUFBLFFBQWxCQyxJQUFrQixRQUFsQkEsSUFBa0I7QUFBQSxRQUFaQyxLQUFZLFFBQVpBLEtBQVk7O0FBQ2xDLFFBQUlELFNBQVMsSUFBYixFQUFtQjtBQUNqQixtQkFBV0MsS0FBWDtBQUNEO0FBQ0QsUUFBSUEsVUFBVSxJQUFkLEVBQW9CO0FBQ2xCLG1C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LEdBQWdCNmIsT0FBaEI7QUFDQTs7QUFFRCxTQUFPN2IsTUFBUDtBQUNBLEVBTkQ7O0FBUUEsS0FBSyxJQUFMLEVBQWtEO0FBQ2pEK2IsRUFBQSxrQ0FBUSxZQUFXO0FBQ2xCLFVBQU8vYixNQUFQO0FBQ0EsR0FGRDs7QUFJRDtBQUNDLEVBTkQsTUFNTyxJQUFLLE9BQU9nYyxNQUFQLEtBQWtCLFdBQWxCLElBQWlDQSxPQUFPQyxPQUE3QyxFQUF1RDtBQUM3REQsU0FBT0MsT0FBUCxHQUFpQmpjLE1BQWpCO0FBQ0EsRUFGTSxNQUVBO0FBQ05tTCxTQUFPbkwsTUFBUCxHQUFnQkEsTUFBaEI7QUFDQTs7QUFFRDtBQUVDLENBbjZFRCxFQW02RUttTCxNQW42RUwsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQ0NWUytRLE87Ozs7OzttQkFBbUJDLGlCOzs7Ozs7bUJBQW1CQyxnQjs7Ozs7Ozs7OzBDQUN0Q0YsTzs7Ozs7O2tCQUFrQnRYLFc7Ozs7Ozs7Ozs2Q0FDbEJzWCxPOzs7Ozs7Ozs7Ozs7UUFDR0csTSIsImZpbGUiOiJvcHRpbWFsLXNlbGVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIk9wdGltYWxTZWxlY3RcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiT3B0aW1hbFNlbGVjdFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4NTVjYmI0ZDlhNzZjZDk4MjRmMyIsIi8qKlxuICogQHR5cGVkZWYgIHtPYmplY3R9IFBhdHRlcm5cbiAqIEBwcm9wZXJ0eSB7KCdkZXNjZW5kYW50JyB8ICdjaGlsZCcpfSAgICAgICAgICAgICAgICAgIFtyZWxhdGVzXVxuICogQHByb3BlcnR5IHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RhZ11cbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPHsgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nPyB9Pn0gIGF0dHJpYnV0ZXNcbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPHN0cmluZz59ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXNcbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPHN0cmluZz59ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBzZXVkb1xuICogQHByb3BlcnR5IHtBcnJheS48QXJyYXkuPFBhdHRlcm4+Pn0gICAgICAgICAgICAgICAgICAgZGVzY2VuZGFudHNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgcGF0dGVybiBzdHJ1Y3R1cmVcbiAqIFxuICogQHBhcmFtIHtQYXJ0aWFsPFBhdHRlcm4+fSBwYXR0ZXJuXG4gKiBAcmV0dXJucyB7UGF0dGVybn1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVBhdHRlcm4gPSAoYmFzZSA9IHt9KSA9PlxuICAoeyBhdHRyaWJ1dGVzOiBbXSwgY2xhc3NlczogW10sIHBzZXVkbzogW10sIGRlc2NlbmRhbnRzOiBbXSwgLi4uYmFzZSB9KVxuXG4vKipcbiAqIENvbnZlcnQgYXR0cmlidXRlcyB0byBDU1Mgc2VsZWN0b3JcbiAqIFxuICogQHBhcmFtIHtBcnJheS48eyBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmc/IH0+fSBhdHRyaWJ1dGVzIFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZXNUb1NlbGVjdG9yID0gKGF0dHJpYnV0ZXMpID0+XG4gIGF0dHJpYnV0ZXMubWFwKCh7IG5hbWUsIHZhbHVlIH0pID0+IHtcbiAgICBpZiAobmFtZSA9PT0gJ2lkJykge1xuICAgICAgcmV0dXJuIGAjJHt2YWx1ZX1gXG4gICAgfVxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGBbJHtuYW1lfV1gXG4gICAgfVxuICAgIHJldHVybiBgWyR7bmFtZX09XCIke3ZhbHVlfVwiXWBcbiAgfSkuam9pbignJylcblxuLyoqXG4gKiBDb252ZXJ0IGNsYXNzZXMgdG8gQ1NTIHNlbGVjdG9yXG4gKiBcbiAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IGNsYXNzZXMgXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgY2xhc3Nlc1RvU2VsZWN0b3IgPSAoY2xhc3NlcykgPT4gY2xhc3Nlcy5sZW5ndGggPyBgLiR7Y2xhc3Nlcy5qb2luKCcuJyl9YCA6ICcnXG5cbi8qKlxuICogQ29udmVydCBwc2V1ZG8gc2VsZWN0b3JzIHRvIENTUyBzZWxlY3RvclxuICogXG4gKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fSBwc2V1ZG8gXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgcHNldWRvVG9TZWxlY3RvciA9IChwc2V1ZG8pID0+IHBzZXVkby5sZW5ndGggPyBgOiR7cHNldWRvLmpvaW4oJzonKX1gIDogJydcblxuLyoqXG4gKiBDb252ZXJ0IHBhdHRlcm4gdG8gQ1NTIHNlbGVjdG9yXG4gKiBcbiAqIEBwYXJhbSB7UGF0dGVybn0gcGF0dGVybiBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBwYXR0ZXJuVG9TZWxlY3RvciA9IChwYXR0ZXJuKSA9PiB7XG4gIGNvbnN0IHsgcmVsYXRlcywgdGFnLCBhdHRyaWJ1dGVzLCBjbGFzc2VzLCBwc2V1ZG8gfSA9IHBhdHRlcm5cbiAgY29uc3QgdmFsdWUgPSBgJHtcbiAgICByZWxhdGVzID09PSAnY2hpbGQnID8gJz4gJyA6ICcnXG4gIH0ke1xuICAgIHRhZyB8fCAnJ1xuICB9JHtcbiAgICBhdHRyaWJ1dGVzVG9TZWxlY3RvcihhdHRyaWJ1dGVzKVxuICB9JHtcbiAgICBjbGFzc2VzVG9TZWxlY3RvcihjbGFzc2VzKVxuICB9JHtcbiAgICBwc2V1ZG9Ub1NlbGVjdG9yKHBzZXVkbylcbiAgfWBcbiAgcmV0dXJuIHZhbHVlXG59XG5cbi8qKlxuICogQ29udmVydHMgcGF0aCB0byBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge0FycmF5LjxQYXR0ZXJuPn0gcGF0aCBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBwYXRoVG9TZWxlY3RvciA9IChwYXRoKSA9PlxuICBwYXRoLm1hcChwYXR0ZXJuVG9TZWxlY3Rvcikuam9pbignICcpXG5cblxuY29uc3QgY29udmVydEVzY2FwaW5nID0gKHZhbHVlKSA9PlxuICB2YWx1ZSAmJiB2YWx1ZS5yZXBsYWNlKC9cXFxcKFtgXFxcXC86PyYhIyQlXigpW1xcXXt8fSorOywuPD0+QH5dKS9nLCAnJDEnKVxuICAgIC5yZXBsYWNlKC9cXFxcKFsnXCJdKS9nLCAnJDEkMScpXG4gICAgLnJlcGxhY2UoL1xcXFxBIC9nLCAnXFxuJylcblxuLyoqXG4qIENvbnZlcnQgYXR0cmlidXRlcyB0byBYUGF0aCBzdHJpbmdcbiogXG4qIEBwYXJhbSB7QXJyYXkuPHsgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nPyB9Pn0gYXR0cmlidXRlcyBcbiogQHJldHVybnMge3N0cmluZ31cbiovXG5leHBvcnQgY29uc3QgYXR0cmlidXRlc1RvWFBhdGggPSAoYXR0cmlidXRlcykgPT5cbiAgYXR0cmlidXRlcy5tYXAoKHsgbmFtZSwgdmFsdWUgfSkgPT4ge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGBbQCR7bmFtZX1dYFxuICAgIH1cbiAgICByZXR1cm4gYFtAJHtuYW1lfT1cIiR7Y29udmVydEVzY2FwaW5nKHZhbHVlKX1cIl1gXG4gIH0pLmpvaW4oJycpXG5cbi8qKlxuKiBDb252ZXJ0IGNsYXNzZXMgdG8gWFBhdGggc3RyaW5nXG4qIFxuKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fSBjbGFzc2VzIFxuKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmV4cG9ydCBjb25zdCBjbGFzc2VzVG9YUGF0aCA9IChjbGFzc2VzKSA9PlxuICBjbGFzc2VzLm1hcChjID0+IGBbY29udGFpbnMoY29uY2F0KFwiIFwiLG5vcm1hbGl6ZS1zcGFjZShAY2xhc3MpLFwiIFwiKSxcIiAke2N9IFwiKV1gKS5qb2luKCcnKVxuXG4vKipcbiogQ29udmVydCBwc2V1ZG8gc2VsZWN0b3JzIHRvIFhQYXRoIHN0cmluZ1xuKiBcbiogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gcHNldWRvIFxuKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmV4cG9ydCBjb25zdCBwc2V1ZG9Ub1hQYXRoID0gKHBzZXVkbykgPT5cbiAgcHNldWRvLm1hcChwID0+IHtcbiAgICBjb25zdCBtYXRjaCA9IHAubWF0Y2goL14obnRoLWNoaWxkfG50aC1vZi10eXBlfGNvbnRhaW5zKVxcKCguKylcXCkkLylcbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICByZXR1cm4gJydcbiAgICB9XG5cbiAgICBzd2l0Y2ggKG1hdGNoWzFdKSB7XG4gICAgICBjYXNlICdudGgtY2hpbGQnOlxuICAgICAgICByZXR1cm4gYFsoY291bnQocHJlY2VkaW5nLXNpYmxpbmc6OiopKzEpID0gJHttYXRjaFsyXX1dYFxuXG4gICAgICBjYXNlICdudGgtb2YtdHlwZSc6XG4gICAgICAgIHJldHVybiBgWyR7bWF0Y2hbMl19XWBcblxuICAgICAgY2FzZSAnY29udGFpbnMnOlxuICAgICAgICByZXR1cm4gYFtjb250YWlucyh0ZXh0KCksJHttYXRjaFsyXX0pXWBcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICcnXG4gICAgfVxuICB9KS5qb2luKCcnKVxuXG4vKipcbiogQ29udmVydCBwYXR0ZXJuIHRvIFhQYXRoIHN0cmluZ1xuKiBcbiogQHBhcmFtIHtQYXR0ZXJufSBwYXR0ZXJuIFxuKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmV4cG9ydCBjb25zdCBwYXR0ZXJuVG9YUGF0aCA9IChwYXR0ZXJuKSA9PiB7XG4gIGNvbnN0IHsgcmVsYXRlcywgdGFnLCBhdHRyaWJ1dGVzLCBjbGFzc2VzLCBwc2V1ZG8sIGRlc2NlbmRhbnRzIH0gPSBwYXR0ZXJuXG4gIGNvbnN0IHZhbHVlID0gYCR7XG4gICAgcmVsYXRlcyA9PT0gJ2NoaWxkJyA/ICcvJyA6ICcvLydcbiAgfSR7XG4gICAgdGFnIHx8ICcqJ1xuICB9JHtcbiAgICBhdHRyaWJ1dGVzVG9YUGF0aChhdHRyaWJ1dGVzKVxuICB9JHtcbiAgICBjbGFzc2VzVG9YUGF0aChjbGFzc2VzKVxuICB9JHtcbiAgICBwc2V1ZG9Ub1hQYXRoKHBzZXVkbylcbiAgfSR7XG4gICAgZGVzY2VuZGFudHNUb1hQYXRoKGRlc2NlbmRhbnRzKVxuICB9YFxuICByZXR1cm4gdmFsdWVcbn1cblxuLyoqXG4qIENvbnZlcnRzIHBhdGggdG8gWFBhdGggc3RyaW5nXG4qXG4qIEBwYXJhbSB7QXJyYXkuPFBhdHRlcm4+fSBwYXRoIFxuKiBAcmV0dXJucyB7c3RyaW5nfVxuKi9cbmV4cG9ydCBjb25zdCBwYXRoVG9YUGF0aCA9IChwYXRoKSA9PiBgLiR7cGF0aC5tYXAocGF0dGVyblRvWFBhdGgpLmpvaW4oJycpfWBcblxuLyoqXG4qIENvbnZlcnQgY2hpbGQgc2VsZWN0b3JzIHRvIFhQYXRoIHN0cmluZ1xuKiBcbiogQHBhcmFtIHtBcnJheS48QXJyYXkuPFBhdHRlcm4+Pn0gY2hpbGRyZW4gXG4qIEByZXR1cm5zIHtzdHJpbmd9XG4qL1xuZXhwb3J0IGNvbnN0IGRlc2NlbmRhbnRzVG9YUGF0aCA9IChjaGlsZHJlbikgPT5cbiAgY2hpbGRyZW4ubGVuZ3RoID8gYFske2NoaWxkcmVuLm1hcChwYXRoVG9YUGF0aCkuam9pbignXVsnKX1dYCA6ICcnXG5cbiAgXG5jb25zdCB0b1N0cmluZyA9IHtcbiAgJ2Nzcyc6IHtcbiAgICBhdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzVG9TZWxlY3RvcixcbiAgICBjbGFzc2VzOiBjbGFzc2VzVG9TZWxlY3RvcixcbiAgICBwc2V1ZG86IHBzZXVkb1RvU2VsZWN0b3IsXG4gICAgcGF0dGVybjogcGF0dGVyblRvU2VsZWN0b3IsXG4gICAgcGF0aDogcGF0aFRvU2VsZWN0b3JcbiAgfSxcbiAgJ3hwYXRoJzoge1xuICAgIGF0dHJpYnV0ZXM6IGF0dHJpYnV0ZXNUb1hQYXRoLFxuICAgIGNsYXNzZXM6IGNsYXNzZXNUb1hQYXRoLFxuICAgIHBzZXVkbzogcHNldWRvVG9YUGF0aCxcbiAgICBwYXR0ZXJuOiBwYXR0ZXJuVG9YUGF0aCxcbiAgICBwYXRoOiBwYXRoVG9YUGF0aFxuICB9LFxuICAnanF1ZXJ5Jzoge31cbn1cblxudG9TdHJpbmcuanF1ZXJ5ID0gdG9TdHJpbmcuY3NzXG50b1N0cmluZ1swXSA9IHRvU3RyaW5nLmNzc1xudG9TdHJpbmdbMV0gPSB0b1N0cmluZy54cGF0aFxuICBcbi8qKlxuICogQHR5cGVkZWYgIHtPYmplY3R9IFRvU3RyaW5nQXBpXG4gKiBAcHJvcGVydHkgeyhhdHRyaWJ1dGVzOiBBcnJheS48eyBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmc/IH0+KSA9PiBzdHJpbmd9IGF0dHJpYnV0ZXNcbiAqIEBwcm9wZXJ0eSB7KGNsYXNzZXM6IEFycmF5LjxzdHJpbmc+KSA9PiBzdHJpbmd9ICBjbGFzc2VzXG4gKiBAcHJvcGVydHkgeyhwc2V1ZG86IEFycmF5LjxzdHJpbmc+KSA9PiBzdHJpbmd9ICAgcHNldWRvXG4gKiBAcHJvcGVydHkgeyhwYXR0ZXJuOiBQYXR0ZXJuKSA9PiBzdHJpbmd9ICAgICAgICAgcGF0dGVyblxuICogQHByb3BlcnR5IHsocGF0aDogQXJyYXkuPFBhdHRlcm4+KSA9PiBzdHJpbmd9ICAgIHBhdGhcbiAqL1xuXG4vKipcbiAqIFxuICogQHBhcmFtIHtPcHRpb25zfSBvcHRpb25zIFxuICogQHJldHVybnMge1RvU3RyaW5nQXBpfVxuICovXG5leHBvcnQgY29uc3QgZ2V0VG9TdHJpbmcgPSAob3B0aW9ucyA9IHt9KSA9PlxuICB0b1N0cmluZ1tvcHRpb25zLmZvcm1hdCB8fCAnY3NzJ11cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcGF0dGVybi5qcyIsIi8vIGltcG9ydCBTaXp6bGUgZnJvbSAnc2l6emxlJ1xubGV0IFNpenpsZVxuXG4vKipcbiAqIFNlbGVjdCBlbGVtZW50IHVzaW5nIGpRdWVyeVxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgIHNlbGVjdG9yXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgcGFyZW50XG4gKiBAcmV0dXJuIEFycmF5LjxIVE1MRWxlbWVudD5cbiAqL1xuY29uc3Qgc2VsZWN0SlF1ZXJ5ID0gKHNlbGVjdG9yLCBwYXJlbnQgPSBudWxsKSA9PiB7XG4gIGlmICghU2l6emxlKSB7XG4gICAgU2l6emxlID0gcmVxdWlyZSgnc2l6emxlJylcbiAgfVxuICByZXR1cm4gU2l6emxlKHNlbGVjdG9yLCBwYXJlbnQgfHwgZG9jdW1lbnQpXG59XG4gIFxuLyoqXG4gKiBTZWxlY3QgZWxlbWVudCB1c2luZyBYUGF0aFxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgIHNlbGVjdG9yXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgcGFyZW50XG4gKiBAcmV0dXJuIEFycmF5LjxIVE1MRWxlbWVudD5cbiAqL1xuY29uc3Qgc2VsZWN0WFBhdGggPSAoc2VsZWN0b3IsIHBhcmVudCA9IG51bGwpID0+IHtcbiAgcGFyZW50ID0gKHBhcmVudCB8fCBkb2N1bWVudClcbiAgdmFyIGRvYyA9IHBhcmVudFxuICB3aGlsZSAoZG9jLnBhcmVudE5vZGUpIHtcbiAgICBkb2MgPSBkb2MucGFyZW50Tm9kZVxuICB9XG4gIGlmIChkb2MgIT09IHBhcmVudCAmJiAhc2VsZWN0b3Iuc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgc2VsZWN0b3IgPSBgLiR7c2VsZWN0b3J9YFxuICB9XG4gIHZhciBpdGVyYXRvciA9IGRvYy5ldmFsdWF0ZShzZWxlY3RvciwgcGFyZW50LCBudWxsLCAwKVxuICB2YXIgZWxlbWVudHMgPSBbXVxuICB2YXIgZWxlbWVudFxuICB3aGlsZSAoKGVsZW1lbnQgPSBpdGVyYXRvci5pdGVyYXRlTmV4dCgpKSkge1xuICAgIGVsZW1lbnRzLnB1c2goZWxlbWVudClcbiAgfVxuICByZXR1cm4gZWxlbWVudHNcbn1cbiAgXG4vKipcbiAqIFNlbGVjdCBlbGVtZW50IHVzaW5nIENTU1xuICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgIHNlbGVjdG9yXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgcGFyZW50XG4gKiBAcmV0dXJuIEFycmF5LjxIVE1MRWxlbWVudD5cbiAqL1xuY29uc3Qgc2VsZWN0Q1NTID0gKHNlbGVjdG9yLCBwYXJlbnQgPSBudWxsKSA9PlxuICAocGFyZW50IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuXG5jb25zdCBzZWxlY3QgPSB7XG4gICdjc3MnOiBzZWxlY3RDU1MsXG4gICd4cGF0aCc6IHNlbGVjdFhQYXRoLFxuICAnanF1ZXJ5Jzogc2VsZWN0SlF1ZXJ5XG59XG5cbnNlbGVjdFswXSA9IHNlbGVjdC5jc3NcbnNlbGVjdFsxXSA9IHNlbGVjdC54cGF0aFxuXG4vKipcbiogXG4qIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9ucyBcbiogQHJldHVybnMgeyhzZWxlY3Rvcjogc3RyaW5nLCBwYXJlbnQ6IEhUTUxFbGVtZW50KSA9PiBzdHJpbmd9XG4qL1xuZXhwb3J0IGNvbnN0IGdldFNlbGVjdCA9IChvcHRpb25zID0ge30pID0+XG4gIChzZWxlY3RvciwgcGFyZW50KSA9PiBzZWxlY3Rbb3B0aW9ucy5mb3JtYXQgfHwgJ2NzcyddKHNlbGVjdG9yLCBwYXJlbnQgfHwgb3B0aW9ucy5yb290KVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VsZWN0b3IuanMiLCIvKipcbiAqICMgVXRpbGl0aWVzXG4gKlxuICogQ29udmVuaWVuY2UgaGVscGVycy5cbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBhbiBhcnJheSB3aXRoIHRoZSBET00gbm9kZXMgb2YgdGhlIGxpc3RcbiAqXG4gKiBAcGFyYW0gIHtOb2RlTGlzdH0gICAgICAgICAgICAgbm9kZXMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtBcnJheS48SFRNTEVsZW1lbnQ+fSAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXJ0Tm9kZUxpc3QgPSAobm9kZXMpID0+IHtcbiAgY29uc3QgeyBsZW5ndGggfSA9IG5vZGVzXG4gIGNvbnN0IGFyciA9IG5ldyBBcnJheShsZW5ndGgpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBhcnJbaV0gPSBub2Rlc1tpXVxuICB9XG4gIHJldHVybiBhcnJcbn1cblxuLyoqXG4gKiBFc2NhcGUgc3BlY2lhbCBjaGFyYWN0ZXJzIGFuZCBsaW5lIGJyZWFrcyBhcyBhIHNpbXBsaWZpZWQgdmVyc2lvbiBvZiAnQ1NTLmVzY2FwZSgpJ1xuICpcbiAqIERlc2NyaXB0aW9uIG9mIHZhbGlkIGNoYXJhY3RlcnM6IGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9jc3MtZXNjYXBlc1xuICpcbiAqIEBwYXJhbSAge1N0cmluZz99IHZhbHVlIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBjb25zdCBlc2NhcGVWYWx1ZSA9ICh2YWx1ZSkgPT5cbiAgdmFsdWUgJiYgdmFsdWUucmVwbGFjZSgvWydcImBcXFxcLzo/JiEjJCVeKClbXFxde3x9Kis7LC48PT5Afl0vZywgJ1xcXFwkJicpXG4gICAgLnJlcGxhY2UoL1xcbi9nLCAnXFx1MDBhMCcpXG5cbi8qKlxuICogUGFydGl0aW9uIGFycmF5IGludG8gdHdvIGdyb3VwcyBkZXRlcm1pbmVkIGJ5IHByZWRpY2F0ZVxuICovXG5leHBvcnQgY29uc3QgcGFydGl0aW9uID0gKGFycmF5LCBwcmVkaWNhdGUpID0+XG4gIGFycmF5LnJlZHVjZShcbiAgICAoW2lubmVyLCBvdXRlcl0sIGl0ZW0pID0+IHByZWRpY2F0ZShpdGVtKSA/IFtpbm5lci5jb25jYXQoaXRlbSksIG91dGVyXSA6IFtpbm5lciwgb3V0ZXIuY29uY2F0KGl0ZW0pXSxcbiAgICBbW10sIFtdXVxuICApXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbGl0aWVzLmpzIiwiLyoqXG4gKiAjIENvbW1vblxuICpcbiAqIFByb2Nlc3MgY29sbGVjdGlvbnMgZm9yIHNpbWlsYXJpdGllcy5cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vc2VsZWN0JykuT3B0aW9uc30gT3B0aW9uc1xuICovXG5cbi8qKlxuICogRmluZCB0aGUgbGFzdCBjb21tb24gYW5jZXN0b3Igb2YgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPcHRpb25zfSAgICAgICAgICAgICAgb3B0aW9ucyAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRDb21tb25BbmNlc3RvciA9IChlbGVtZW50cywgb3B0aW9ucyA9IHt9KSA9PiB7XG5cbiAgY29uc3Qge1xuICAgIHJvb3QgPSBkb2N1bWVudFxuICB9ID0gb3B0aW9uc1xuXG4gIGNvbnN0IGFuY2VzdG9ycyA9IFtdXG5cbiAgZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBwYXJlbnRzID0gW11cbiAgICB3aGlsZSAoZWxlbWVudCAhPT0gcm9vdCkge1xuICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZVxuICAgICAgcGFyZW50cy51bnNoaWZ0KGVsZW1lbnQpXG4gICAgfVxuICAgIGFuY2VzdG9yc1tpbmRleF0gPSBwYXJlbnRzXG4gIH0pXG5cbiAgYW5jZXN0b3JzLnNvcnQoKGN1cnIsIG5leHQpID0+IGN1cnIubGVuZ3RoIC0gbmV4dC5sZW5ndGgpXG5cbiAgY29uc3Qgc2hhbGxvd0FuY2VzdG9yID0gYW5jZXN0b3JzLnNoaWZ0KClcblxuICB2YXIgYW5jZXN0b3IgPSBudWxsXG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBzaGFsbG93QW5jZXN0b3IubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgY29uc3QgcGFyZW50ID0gc2hhbGxvd0FuY2VzdG9yW2ldXG4gICAgY29uc3QgbWlzc2luZyA9IGFuY2VzdG9ycy5zb21lKChvdGhlclBhcmVudHMpID0+IHtcbiAgICAgIHJldHVybiAhb3RoZXJQYXJlbnRzLnNvbWUoKG90aGVyUGFyZW50KSA9PiBvdGhlclBhcmVudCA9PT0gcGFyZW50KVxuICAgIH0pXG5cbiAgICBpZiAobWlzc2luZykge1xuICAgICAgLy8gVE9ETzogZmluZCBzaW1pbGFyIHN1Yi1wYXJlbnRzLCBub3QgdGhlIHRvcCByb290LCBlLmcuIHNoYXJpbmcgYSBjbGFzcyBzZWxlY3RvclxuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICBhbmNlc3RvciA9IHBhcmVudFxuICB9XG5cbiAgcmV0dXJuIGFuY2VzdG9yXG59XG5cbi8qKlxuICogR2V0IGEgc2V0IG9mIGNvbW1vbiBwcm9wZXJ0aWVzIG9mIGVsZW1lbnRzXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldENvbW1vblByb3BlcnRpZXMgPSAoZWxlbWVudHMpID0+IHtcblxuICBjb25zdCBjb21tb25Qcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzZXM6IFtdLFxuICAgIGF0dHJpYnV0ZXM6IHt9LFxuICAgIHRhZzogbnVsbFxuICB9XG5cbiAgZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXG4gICAgdmFyIHtcbiAgICAgIGNsYXNzZXM6IGNvbW1vbkNsYXNzZXMsXG4gICAgICBhdHRyaWJ1dGVzOiBjb21tb25BdHRyaWJ1dGVzLFxuICAgICAgdGFnOiBjb21tb25UYWdcbiAgICB9ID0gY29tbW9uUHJvcGVydGllc1xuXG4gICAgLy8gfiBjbGFzc2VzXG4gICAgaWYgKGNvbW1vbkNsYXNzZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnY2xhc3MnKVxuICAgICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMudHJpbSgpLnNwbGl0KCcgJylcbiAgICAgICAgaWYgKCFjb21tb25DbGFzc2VzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbW1vblByb3BlcnRpZXMuY2xhc3NlcyA9IGNsYXNzZXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21tb25DbGFzc2VzID0gY29tbW9uQ2xhc3Nlcy5maWx0ZXIoKGVudHJ5KSA9PiBjbGFzc2VzLnNvbWUoKG5hbWUpID0+IG5hbWUgPT09IGVudHJ5KSlcbiAgICAgICAgICBpZiAoY29tbW9uQ2xhc3Nlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbW1vblByb3BlcnRpZXMuY2xhc3NlcyA9IGNvbW1vbkNsYXNzZXNcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIGNvbW1vblByb3BlcnRpZXMuY2xhc3Nlc1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETzogcmVzdHJ1Y3R1cmUgcmVtb3ZhbCBhcyAyeCBzZXQgLyAyeCBkZWxldGUsIGluc3RlYWQgb2YgbW9kaWZ5IGFsd2F5cyByZXBsYWNpbmcgd2l0aCBuZXcgY29sbGVjdGlvblxuICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy5jbGFzc2VzXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gfiBhdHRyaWJ1dGVzXG4gICAgaWYgKGNvbW1vbkF0dHJpYnV0ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgZWxlbWVudEF0dHJpYnV0ZXMgPSBlbGVtZW50LmF0dHJpYnV0ZXNcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3Qua2V5cyhlbGVtZW50QXR0cmlidXRlcykucmVkdWNlKChhdHRyaWJ1dGVzLCBrZXkpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlID0gZWxlbWVudEF0dHJpYnV0ZXNba2V5XVxuICAgICAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gYXR0cmlidXRlLm5hbWVcbiAgICAgICAgLy8gTk9URTogd29ya2Fyb3VuZCBkZXRlY3Rpb24gZm9yIG5vbi1zdGFuZGFyZCBwaGFudG9tanMgTmFtZWROb2RlTWFwIGJlaGF2aW91clxuICAgICAgICAvLyAoaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hcml5YS9waGFudG9tanMvaXNzdWVzLzE0NjM0KVxuICAgICAgICBpZiAoYXR0cmlidXRlICYmIGF0dHJpYnV0ZU5hbWUgIT09ICdjbGFzcycpIHtcbiAgICAgICAgICBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID0gYXR0cmlidXRlLnZhbHVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXNcbiAgICAgIH0sIHt9KVxuXG4gICAgICBjb25zdCBhdHRyaWJ1dGVzTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKVxuICAgICAgY29uc3QgY29tbW9uQXR0cmlidXRlc05hbWVzID0gT2JqZWN0LmtleXMoY29tbW9uQXR0cmlidXRlcylcblxuICAgICAgaWYgKGF0dHJpYnV0ZXNOYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCFjb21tb25BdHRyaWJ1dGVzTmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbW1vbkF0dHJpYnV0ZXMgPSBjb21tb25BdHRyaWJ1dGVzTmFtZXMucmVkdWNlKChuZXh0Q29tbW9uQXR0cmlidXRlcywgbmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjb21tb25BdHRyaWJ1dGVzW25hbWVdXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IGF0dHJpYnV0ZXNbbmFtZV0pIHtcbiAgICAgICAgICAgICAgbmV4dENvbW1vbkF0dHJpYnV0ZXNbbmFtZV0gPSB2YWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5leHRDb21tb25BdHRyaWJ1dGVzXG4gICAgICAgICAgfSwge30pXG4gICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGNvbW1vbkF0dHJpYnV0ZXMpLmxlbmd0aCkge1xuICAgICAgICAgICAgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzID0gY29tbW9uQXR0cmlidXRlc1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gfiB0YWdcbiAgICBpZiAoY29tbW9uVGFnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHRhZyA9IGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICBpZiAoIWNvbW1vblRhZykge1xuICAgICAgICBjb21tb25Qcm9wZXJ0aWVzLnRhZyA9IHRhZ1xuICAgICAgfSBlbHNlIGlmICh0YWcgIT09IGNvbW1vblRhZykge1xuICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy50YWdcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIGNvbW1vblByb3BlcnRpZXNcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi5qcyIsIi8qKlxuICogIyBNYXRjaFxuICpcbiAqIFJldHJpZXZlIHNlbGVjdG9yIGZvciBhIG5vZGUuXG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlUGF0dGVybiwgZ2V0VG9TdHJpbmcgfSBmcm9tICcuL3BhdHRlcm4nXG5pbXBvcnQgeyBnZXRTZWxlY3QgfSBmcm9tICcuL3NlbGVjdG9yJ1xuaW1wb3J0IHsgZXNjYXBlVmFsdWUgfSBmcm9tICcuL3V0aWxpdGllcydcblxuLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3NlbGVjdCcpLk9wdGlvbnN9IE9wdGlvbnNcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vcGF0dGVybicpLlBhdHRlcm59IFBhdHRlcm5cbiAqIEB0eXBlZGVmIHtpbXBvcnQoJy4vcGF0dGVybicpLlRvU3RyaW5nQXBpfSBQYXR0ZXJuXG4gKi9cblxuY29uc3QgZGVmYXVsdElnbm9yZSA9IHtcbiAgYXR0cmlidXRlIChhdHRyaWJ1dGVOYW1lKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdzdHlsZScsXG4gICAgICAnZGF0YS1yZWFjdGlkJyxcbiAgICAgICdkYXRhLXJlYWN0LWNoZWNrc3VtJ1xuICAgIF0uaW5kZXhPZihhdHRyaWJ1dGVOYW1lKSA+IC0xXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGluaXRPcHRpb25zID0gKG9wdGlvbnMgPSB7fSkgPT4gKHtcbiAgLi4ub3B0aW9ucyxcbiAgcm9vdDogb3B0aW9ucy5yb290IHx8IGRvY3VtZW50LFxuICBza2lwOiBvcHRpb25zLnNraXAgfHwgbnVsbCxcbiAgcHJpb3JpdHk6IG9wdGlvbnMucHJpb3JpdHkgfHwgWydpZCcsICdjbGFzcycsICdocmVmJywgJ3NyYyddLFxuICBpZ25vcmU6IG9wdGlvbnMuaWdub3JlIHx8IHt9XG59KVxuXG4vKipcbiAqIEdldCB0aGUgcGF0aCBvZiB0aGUgZWxlbWVudFxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBub2RlICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPcHRpb25zfSAgICAgW29wdGlvbnNdIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7QXJyYXkuPFBhdHRlcm4+fSAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWF0Y2ggKG5vZGUsIG9wdGlvbnMgPSB7fSkge1xuICBvcHRpb25zID0gaW5pdE9wdGlvbnMob3B0aW9ucylcbiAgY29uc3QgeyByb290LCBza2lwLCBpZ25vcmUsIGZvcm1hdCB9ID0gb3B0aW9uc1xuXG4gIGNvbnN0IHBhdGggPSBbXVxuICBsZXQgZWxlbWVudCA9IG5vZGVcbiAgbGV0IGxlbmd0aCA9IHBhdGgubGVuZ3RoXG4gIGNvbnN0IHNlbGVjdCA9IGdldFNlbGVjdChvcHRpb25zKVxuICBjb25zdCB0b1N0cmluZyA9IGdldFRvU3RyaW5nKG9wdGlvbnMpXG5cbiAgY29uc3Qgc2tpcENvbXBhcmUgPSBza2lwICYmIChBcnJheS5pc0FycmF5KHNraXApID8gc2tpcCA6IFtza2lwXSkubWFwKChlbnRyeSkgPT4ge1xuICAgIGlmICh0eXBlb2YgZW50cnkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAoZWxlbWVudCkgPT4gZWxlbWVudCA9PT0gZW50cnlcbiAgICB9XG4gICAgcmV0dXJuIGVudHJ5XG4gIH0pXG5cbiAgY29uc3Qgc2tpcENoZWNrcyA9IChlbGVtZW50KSA9PiB7XG4gICAgcmV0dXJuIHNraXAgJiYgc2tpcENvbXBhcmUuc29tZSgoY29tcGFyZSkgPT4gY29tcGFyZShlbGVtZW50KSlcbiAgfVxuXG4gIE9iamVjdC5rZXlzKGlnbm9yZSkuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgIHZhciBwcmVkaWNhdGUgPSBpZ25vcmVbdHlwZV1cbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuXG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgPT09ICdudW1iZXInKSB7XG4gICAgICBwcmVkaWNhdGUgPSBwcmVkaWNhdGUudG9TdHJpbmcoKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHByZWRpY2F0ZSA9IG5ldyBSZWdFeHAoZXNjYXBlVmFsdWUocHJlZGljYXRlKS5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBwcmVkaWNhdGUgPSBwcmVkaWNhdGUgPyAvKD86KS8gOiAvLl4vXG4gICAgfVxuICAgIC8vIGNoZWNrIGNsYXNzLS9hdHRyaWJ1dGVuYW1lIGZvciByZWdleFxuICAgIGlnbm9yZVt0eXBlXSA9IChuYW1lLCB2YWx1ZSkgPT4gcHJlZGljYXRlLnRlc3QodmFsdWUpXG4gIH0pXG5cbiAgd2hpbGUgKGVsZW1lbnQgIT09IHJvb3QgJiYgZWxlbWVudC5ub2RlVHlwZSAhPT0gMTEpIHtcbiAgICBpZiAoc2tpcENoZWNrcyhlbGVtZW50KSAhPT0gdHJ1ZSkge1xuICAgICAgLy8gfiBnbG9iYWxcbiAgICAgIGlmIChjaGVja0F0dHJpYnV0ZXMoZWxlbWVudCwgcGF0aCwgb3B0aW9ucywgc2VsZWN0LCB0b1N0cmluZywgcm9vdCkpIGJyZWFrXG4gICAgICBpZiAoY2hlY2tUYWcoZWxlbWVudCwgcGF0aCwgb3B0aW9ucywgc2VsZWN0LCB0b1N0cmluZywgcm9vdCkpIGJyZWFrXG5cbiAgICAgIC8vIH4gbG9jYWxcbiAgICAgIGNoZWNrQXR0cmlidXRlcyhlbGVtZW50LCBwYXRoLCBvcHRpb25zLCBzZWxlY3QsIHRvU3RyaW5nKVxuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSBsZW5ndGgpIHtcbiAgICAgICAgY2hlY2tUYWcoZWxlbWVudCwgcGF0aCwgb3B0aW9ucywgc2VsZWN0LCB0b1N0cmluZylcbiAgICAgIH1cblxuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSBsZW5ndGggJiYgWzEsICd4cGF0aCddLmluY2x1ZGVzKGZvcm1hdCkpIHtcbiAgICAgICAgY2hlY2tSZWN1cnNpdmVEZXNjZW5kYW50cyhlbGVtZW50LCBwYXRoLCBvcHRpb25zLCBzZWxlY3QsIHRvU3RyaW5nKVxuICAgICAgfVxuXG4gICAgICBpZiAocGF0aC5sZW5ndGggPT09IGxlbmd0aCAmJiBbMSwgJ3hwYXRoJywgJ2pxdWVyeSddLmluY2x1ZGVzKGZvcm1hdCkpIHtcbiAgICAgICAgY2hlY2tUZXh0KGVsZW1lbnQsIHBhdGgsIG9wdGlvbnMsIHNlbGVjdCwgdG9TdHJpbmcsIGZvcm1hdCA9PT0gJ2pxdWVyeScpXG4gICAgICB9XG5cbiAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgIGNoZWNrTnRoQ2hpbGQoZWxlbWVudCwgcGF0aCwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlXG4gICAgbGVuZ3RoID0gcGF0aC5sZW5ndGhcbiAgfVxuXG4gIGlmIChlbGVtZW50ID09PSByb290KSB7XG4gICAgY29uc3QgcGF0dGVybiA9IGZpbmRQYXR0ZXJuKGVsZW1lbnQsIG9wdGlvbnMsIHNlbGVjdCwgdG9TdHJpbmcpXG4gICAgcGF0aC51bnNoaWZ0KHBhdHRlcm4pXG4gIH1cblxuICByZXR1cm4gcGF0aFxufVxuXG4vKipcbiAqIEV4dGVuZCBwYXRoIHdpdGggYXR0cmlidXRlIGlkZW50aWZpZXJcbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgIGVsZW1lbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSBwYXRoICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICAgb3B0aW9ucyAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgIHNlbGVjdCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7VG9TdHJpbmdBcGl9ICAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICAgcGFyZW50ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBjaGVja0F0dHJpYnV0ZXMgPSAoZWxlbWVudCwgcGF0aCwgeyBwcmlvcml0eSwgaWdub3JlIH0sIHNlbGVjdCwgdG9TdHJpbmcsIHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSkgPT4ge1xuICBjb25zdCBwYXR0ZXJuID0gZmluZEF0dHJpYnV0ZXNQYXR0ZXJuKHByaW9yaXR5LCBlbGVtZW50LCBpZ25vcmUsIHNlbGVjdCwgdG9TdHJpbmcsIHBhcmVudClcbiAgaWYgKHBhdHRlcm4pIHtcbiAgICBwYXRoLnVuc2hpZnQocGF0dGVybilcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIEdldCBjb21iaW5hdGlvbnNcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48c3RyaW5nPn0gdmFsdWVzICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtBcnJheS48c3RyaW5nPj99ICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3QgY29tYmluYXRpb25zID0gKHZhbHVlcykgPT4ge1xuICBsZXQgcmVzdWx0ID0gW1tdXVxuXG4gIHZhbHVlcy5mb3JFYWNoKGMgPT4ge1xuICAgIHJlc3VsdC5mb3JFYWNoKHIgPT4gcmVzdWx0LnB1c2goci5jb25jYXQoYykpKVxuICB9KVxuXG4gIHJlc3VsdC5zaGlmdCgpXG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiBHZXQgY2xhc3Mgc2VsZWN0b3JcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48c3RyaW5nPn0gY2xhc3NlcyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICBzZWxlY3QgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7VG9TdHJpbmdBcGl9ICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIHBhcmVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtQYXR0ZXJufSAgICAgICAgYmFzZSAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge0FycmF5LjxzdHJpbmc+P30gICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBnZXRDbGFzc1NlbGVjdG9yID0gKGNsYXNzZXMgPSBbXSwgc2VsZWN0LCB0b1N0cmluZywgcGFyZW50LCBiYXNlKSA9PiB7XG4gIGxldCByZXN1bHQgPSBjb21iaW5hdGlvbnMoY2xhc3NlcylcblxuICBmb3IobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcGF0dGVybiA9IHRvU3RyaW5nLnBhdHRlcm4oeyAuLi5iYXNlLCBjbGFzc2VzOiByZXN1bHRbaV0gfSlcbiAgICBjb25zdCBtYXRjaGVzID0gc2VsZWN0KHBhdHRlcm4sIHBhcmVudClcbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiByZXN1bHRbaV1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbFxufVxuXG4vKipcbiAqIExvb2t1cCBhdHRyaWJ1dGUgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSAge0FycmF5LjxzdHJpbmc+fSBwcmlvcml0eSAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgZWxlbWVudCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgIGlnbm9yZSAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICBzZWxlY3QgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgdG9TdHJpbmcgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UGFyZW50Tm9kZX0gICAgIHBhcmVudCAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1BhdHRlcm4/fSAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IGZpbmRBdHRyaWJ1dGVzUGF0dGVybiA9IChwcmlvcml0eSwgZWxlbWVudCwgaWdub3JlLCBzZWxlY3QsIHRvU3RyaW5nLCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGUpID0+IHtcbiAgY29uc3QgYXR0cmlidXRlcyA9IGVsZW1lbnQuYXR0cmlidXRlc1xuICB2YXIgYXR0cmlidXRlTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5tYXAoKHZhbCkgPT4gYXR0cmlidXRlc1t2YWxdLm5hbWUpXG4gICAgLmZpbHRlcigoYSkgPT4gcHJpb3JpdHkuaW5kZXhPZihhKSA8IDApXG5cbiAgdmFyIHNvcnRlZEtleXMgPSBbIC4uLnByaW9yaXR5LCAuLi5hdHRyaWJ1dGVOYW1lcyBdXG4gIHZhciBwYXR0ZXJuID0gY3JlYXRlUGF0dGVybigpXG4gIHBhdHRlcm4udGFnID0gZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKClcblxuICB2YXIgaXNPcHRpbWFsID0gKHBhdHRlcm4pID0+IChzZWxlY3QodG9TdHJpbmcucGF0dGVybihwYXR0ZXJuKSwgcGFyZW50KS5sZW5ndGggPT09IDEpXG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBzb3J0ZWRLZXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGNvbnN0IGtleSA9IHNvcnRlZEtleXNbaV1cbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2tleV1cbiAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gZXNjYXBlVmFsdWUoYXR0cmlidXRlICYmIGF0dHJpYnV0ZS5uYW1lKVxuICAgIGNvbnN0IGF0dHJpYnV0ZVZhbHVlID0gZXNjYXBlVmFsdWUoYXR0cmlidXRlICYmIGF0dHJpYnV0ZS52YWx1ZSlcbiAgICBjb25zdCB1c2VOYW1lZElnbm9yZSA9IGF0dHJpYnV0ZU5hbWUgIT09ICdjbGFzcydcblxuICAgIGNvbnN0IGN1cnJlbnRJZ25vcmUgPSAodXNlTmFtZWRJZ25vcmUgJiYgaWdub3JlW2F0dHJpYnV0ZU5hbWVdKSB8fCBpZ25vcmUuYXR0cmlidXRlXG4gICAgY29uc3QgY3VycmVudERlZmF1bHRJZ25vcmUgPSAodXNlTmFtZWRJZ25vcmUgJiYgZGVmYXVsdElnbm9yZVthdHRyaWJ1dGVOYW1lXSkgfHwgZGVmYXVsdElnbm9yZS5hdHRyaWJ1dGVcbiAgICBpZiAoY2hlY2tJZ25vcmUoY3VycmVudElnbm9yZSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUsIGN1cnJlbnREZWZhdWx0SWdub3JlKSkge1xuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGF0dHJpYnV0ZU5hbWUpIHtcbiAgICAgIGNhc2UgJ2NsYXNzJzoge1xuICAgICAgICBsZXQgY2xhc3NOYW1lcyA9IGF0dHJpYnV0ZVZhbHVlLnRyaW0oKS5zcGxpdCgvXFxzKy9nKVxuICAgICAgICBjb25zdCBjbGFzc0lnbm9yZSA9IGlnbm9yZS5jbGFzcyB8fCBkZWZhdWx0SWdub3JlLmNsYXNzXG4gICAgICAgIGlmIChjbGFzc0lnbm9yZSkge1xuICAgICAgICAgIGNsYXNzTmFtZXMgPSBjbGFzc05hbWVzLmZpbHRlcihjbGFzc05hbWUgPT4gIWNsYXNzSWdub3JlKGNsYXNzTmFtZSkpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNsYXNzTmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBnZXRDbGFzc1NlbGVjdG9yKGNsYXNzTmFtZXMsIHNlbGVjdCwgdG9TdHJpbmcsIHBhcmVudCwgcGF0dGVybilcbiAgICAgICAgICBpZiAoY2xhc3Nlcykge1xuICAgICAgICAgICAgcGF0dGVybi5jbGFzc2VzID0gY2xhc3Nlc1xuICAgICAgICAgICAgaWYgKGlzT3B0aW1hbChwYXR0ZXJuKSkge1xuICAgICAgICAgICAgICByZXR1cm4gcGF0dGVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgICBicmVha1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBwYXR0ZXJuLmF0dHJpYnV0ZXMucHVzaCh7IG5hbWU6IGF0dHJpYnV0ZU5hbWUsIHZhbHVlOiBhdHRyaWJ1dGVWYWx1ZSB9KVxuICAgICAgICBpZiAoaXNPcHRpbWFsKHBhdHRlcm4pKSB7XG4gICAgICAgICAgcmV0dXJuIHBhdHRlcm5cbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsXG59XG5cblxuLyoqXG4gKiBFeHRlbmQgcGF0aCB3aXRoIHRhZyBpZGVudGlmaWVyXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgICBlbGVtZW50IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T3B0aW9uc30gICAgICAgICBvcHRpb25zICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gcGF0aCAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICAgc2VsZWN0ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICAgdG9TdHJpbmcgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgIHBhcmVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IGNoZWNrVGFnID0gKGVsZW1lbnQsIHBhdGgsIHsgaWdub3JlIH0sIHNlbGVjdCwgdG9TdHJpbmcsIHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSkgPT4ge1xuICBjb25zdCBwYXR0ZXJuID0gZmluZFRhZ1BhdHRlcm4oZWxlbWVudCwgaWdub3JlKVxuICBpZiAocGF0dGVybikge1xuICAgIGxldCBtYXRjaGVzID0gW11cbiAgICBtYXRjaGVzID0gc2VsZWN0KHRvU3RyaW5nLnBhdHRlcm4ocGF0dGVybiksIHBhcmVudClcbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHBhdGgudW5zaGlmdChwYXR0ZXJuKVxuICAgICAgaWYgKHBhdHRlcm4udGFnID09PSAnaWZyYW1lJykge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIExvb2t1cCB0YWcgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgIGlnbm9yZSAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtQYXR0ZXJuP30gICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3QgZmluZFRhZ1BhdHRlcm4gPSAoZWxlbWVudCwgaWdub3JlKSA9PiB7XG4gIGNvbnN0IHRhZ05hbWUgPSBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKVxuICBpZiAoY2hlY2tJZ25vcmUoaWdub3JlLnRhZywgbnVsbCwgdGFnTmFtZSkpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIGNvbnN0IHBhdHRlcm4gPSBjcmVhdGVQYXR0ZXJuKClcbiAgcGF0dGVybi50YWcgPSB0YWdOYW1lXG4gIHJldHVybiBwYXR0ZXJuXG59XG5cbi8qKlxuICogRXh0ZW5kIHBhdGggd2l0aCBzcGVjaWZpYyBjaGlsZCBpZGVudGlmaWVyXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgICBlbGVtZW50IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T3B0aW9uc30gICAgICAgICBvcHRpb25zIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSBwYXRoICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBjaGVja050aENoaWxkID0gKGVsZW1lbnQsIHBhdGgsIHsgaWdub3JlIH0pID0+IHtcbiAgY29uc3QgcGFyZW50ID0gZWxlbWVudC5wYXJlbnROb2RlXG4gIGNvbnN0IGNoaWxkcmVuID0gcGFyZW50LmNoaWxkcmVuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltpXVxuICAgIGlmIChjaGlsZCA9PT0gZWxlbWVudCkge1xuICAgICAgY29uc3QgY2hpbGRQYXR0ZXJuID0gZmluZFRhZ1BhdHRlcm4oY2hpbGQsIGlnbm9yZSlcbiAgICAgIGlmICghY2hpbGRQYXR0ZXJuKSB7XG4gICAgICAgIHJldHVybiBjb25zb2xlLndhcm4oYFxuICAgICAgICAgIEVsZW1lbnQgY291bGRuJ3QgYmUgbWF0Y2hlZCB0aHJvdWdoIHN0cmljdCBpZ25vcmUgcGF0dGVybiFcbiAgICAgICAgYCwgY2hpbGQsIGlnbm9yZSwgY2hpbGRQYXR0ZXJuKVxuICAgICAgfVxuICAgICAgY2hpbGRQYXR0ZXJuLnJlbGF0ZXMgPSAnY2hpbGQnXG4gICAgICBjaGlsZFBhdHRlcm4ucHNldWRvID0gW2BudGgtY2hpbGQoJHtpKzF9KWBdXG4gICAgICBwYXRoLnVuc2hpZnQoY2hpbGRQYXR0ZXJuKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qKlxuICogRXh0ZW5kIHBhdGggd2l0aCBjb250YWluc1xuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICAgZWxlbWVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59IHBhdGggICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T3B0aW9uc30gICAgICAgICBvcHRpb25zICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7Ym9vbGVhbn0gICAgICAgICBuZXN0ZWQgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IGNoZWNrVGV4dCA9IChlbGVtZW50LCBwYXRoLCB7IGlnbm9yZSB9LCBzZWxlY3QsIHRvU3RyaW5nLCBuZXN0ZWQpID0+IHtcbiAgY29uc3QgcGF0dGVybiA9IGZpbmRUYWdQYXR0ZXJuKGVsZW1lbnQsIGlnbm9yZSlcbiAgaWYgKCFwYXR0ZXJuKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgY29uc3QgdGV4dENvbnRlbnQgPSAobmVzdGVkID8gZWxlbWVudC50ZXh0Q29udGVudCA6IChlbGVtZW50LmZpcnN0Q2hpbGQgJiYgZWxlbWVudC5maXJzdENoaWxkLm5vZGVWYWx1ZSkgfHwgJycpXG4gIGlmICghdGV4dENvbnRlbnQpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHBhdHRlcm4ucmVsYXRlcyA9ICdjaGlsZCdcbiAgY29uc3QgcGFyZW50ID0gZWxlbWVudC5wYXJlbnROb2RlXG4gIGNvbnN0IHRleHRzID0gdGV4dENvbnRlbnRcbiAgICAucmVwbGFjZSgvXFxuKy9nLCAnXFxuJylcbiAgICAuc3BsaXQoJ1xcbicpXG4gICAgLm1hcCh0ZXh0ID0+IHRleHQudHJpbSgpKVxuICAgIC5maWx0ZXIodGV4dCA9PiB0ZXh0Lmxlbmd0aCA+IDApXG5cbiAgY29uc3QgY29udGFpbnMgPSBbXVxuXG4gIHdoaWxlICh0ZXh0cy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgdGV4dCA9IHRleHRzLnNoaWZ0KClcbiAgICBpZiAoY2hlY2tJZ25vcmUoaWdub3JlLmNvbnRhaW5zLCBudWxsLCB0ZXh0KSkge1xuICAgICAgYnJlYWtcbiAgICB9XG4gICAgY29udGFpbnMucHVzaChgY29udGFpbnMoXCIke3RleHR9XCIpYClcbiAgXG4gICAgY29uc3QgbWF0Y2hlcyA9IHNlbGVjdCh0b1N0cmluZy5wYXR0ZXJuKHsgLi4ucGF0dGVybiwgcHNldWRvOiBjb250YWlucyB9KSwgcGFyZW50KVxuICAgIGlmIChtYXRjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcGF0dGVybi5wc2V1ZG8gPSBjb250YWluc1xuICAgICAgcGF0aC51bnNoaWZ0KHBhdHRlcm4pXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBFeHRlbmQgcGF0aCB3aXRoIGRlc2NlbmRhbnQgdGFnXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgICBlbGVtZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gcGF0aCAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPcHRpb25zfSAgICAgICAgIG9wdGlvbnMgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgICBzZWxlY3QgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICAgdG9TdHJpbmcgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBjaGVja1JlY3Vyc2l2ZURlc2NlbmRhbnRzID0gKGVsZW1lbnQsIHBhdGgsIG9wdGlvbnMsIHNlbGVjdCwgdG9TdHJpbmcpID0+IHtcbiAgY29uc3QgcGF0dGVybiA9IGZpbmRUYWdQYXR0ZXJuKGVsZW1lbnQsIG9wdGlvbnMuaWdub3JlKVxuICBpZiAoIXBhdHRlcm4pIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IGRlc2NlbmRhbnRzID0gQXJyYXkuZnJvbShlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKSlcbiAgd2hpbGUgKGRlc2NlbmRhbnRzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBkZXNjZW5kYW50UGF0aCA9IG1hdGNoKGRlc2NlbmRhbnRzLnNoaWZ0KCksIHsgLi4ub3B0aW9ucywgcm9vdDogZWxlbWVudCB9KVxuICAgIC8vIGF2b2lkIGRlc2NlbmRhbnQgc2VsZWN0b3JzIHdpdGggbnRoLWNoaWxkXG4gICAgaWYgKCFkZXNjZW5kYW50UGF0aC5zb21lKHBhdHRlcm4gPT4gcGF0dGVybi5wc2V1ZG8uc29tZShwID0+IHAuc3RhcnRzV2l0aCgnbnRoLWNoaWxkJykpKSkge1xuICAgICAgY29uc3QgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50XG4gICAgICBjb25zdCBtYXRjaGVzID0gc2VsZWN0KHRvU3RyaW5nLnBhdHRlcm4oeyAuLi5wYXR0ZXJuLCBkZXNjZW5kYW50czogW2Rlc2NlbmRhbnRQYXRoXSB9KSwgcGFyZW50KVxuICAgICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHBhdHRlcm4uZGVzY2VuZGFudHMgPSBbZGVzY2VuZGFudFBhdGhdXG4gICAgICAgIHBhdGgudW5zaGlmdChwYXR0ZXJuKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIExvb2t1cCBpZGVudGlmaWVyXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIGVsZW1lbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T3B0aW9uc30gICAgICAgIG9wdGlvbnMgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICBzZWxlY3QgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1BhdHRlcm59ICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3QgZmluZFBhdHRlcm4gPSAoZWxlbWVudCwgeyBwcmlvcml0eSwgaWdub3JlIH0sIHNlbGVjdCwgdG9TdHJpbmcpID0+IHtcbiAgdmFyIHBhdHRlcm4gPSBmaW5kQXR0cmlidXRlc1BhdHRlcm4ocHJpb3JpdHksIGVsZW1lbnQsIGlnbm9yZSwgc2VsZWN0LCB0b1N0cmluZylcbiAgaWYgKCFwYXR0ZXJuKSB7XG4gICAgcGF0dGVybiA9IGZpbmRUYWdQYXR0ZXJuKGVsZW1lbnQsIGlnbm9yZSlcbiAgfVxuICByZXR1cm4gcGF0dGVyblxufVxuXG4vKipcbiAqIFZhbGlkYXRlIHdpdGggY3VzdG9tIGFuZCBkZWZhdWx0IGZ1bmN0aW9uc1xuICpcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBwcmVkaWNhdGUgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7c3RyaW5nP30gIG5hbWUgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgdmFsdWUgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBkZWZhdWx0UHJlZGljYXRlIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IGNoZWNrSWdub3JlID0gKHByZWRpY2F0ZSwgbmFtZSwgdmFsdWUsIGRlZmF1bHRQcmVkaWNhdGUpID0+IHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgY29uc3QgY2hlY2sgPSBwcmVkaWNhdGUgfHwgZGVmYXVsdFByZWRpY2F0ZVxuICBpZiAoIWNoZWNrKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIGNoZWNrKG5hbWUsIHZhbHVlLCBkZWZhdWx0UHJlZGljYXRlKVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hdGNoLmpzIiwiLyoqXG4gKiAjIE9wdGltaXplXG4gKlxuICogMS4pIEltcHJvdmUgZWZmaWNpZW5jeSB0aHJvdWdoIHNob3J0ZXIgc2VsZWN0b3JzIGJ5IHJlbW92aW5nIHJlZHVuZGFuY3lcbiAqIDIuKSBJbXByb3ZlIHJvYnVzdG5lc3MgdGhyb3VnaCBzZWxlY3RvciB0cmFuc2Zvcm1hdGlvblxuICovXG5cbmltcG9ydCB7IGdldFNlbGVjdCB9IGZyb20gJy4vc2VsZWN0b3InXG5pbXBvcnQgeyBjcmVhdGVQYXR0ZXJuLCBnZXRUb1N0cmluZyB9IGZyb20gJy4vcGF0dGVybidcbmltcG9ydCB7IGNvbnZlcnROb2RlTGlzdCwgcGFydGl0aW9uIH0gZnJvbSAnLi91dGlsaXRpZXMnXG5cbi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnLi9zZWxlY3QnKS5PcHRpb25zfSBPcHRpb25zXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3BhdHRlcm4nKS5QYXR0ZXJufSBQYXR0ZXJuXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3BhdHRlcm4nKS5Ub1N0cmluZ0FwaX0gUGF0dGVyblxuICovXG5cbi8qKlxuICogQXBwbHkgZGlmZmVyZW50IG9wdGltaXphdGlvbiB0ZWNobmlxdWVzXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgICAgICAgICAgICAgcGF0aCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR8QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudCAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09wdGlvbnN9ICAgICAgICAgICAgICAgICAgICAgICAgIFtvcHRpb25zXSAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtBcnJheS48UGF0dGVybj59ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvcHRpbWl6ZSAocGF0aCwgZWxlbWVudHMsIG9wdGlvbnMgPSB7fSkge1xuICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW11cbiAgfVxuXG4gIGlmIChwYXRoWzBdLnJlbGF0ZXMgPT09ICdjaGlsZCcpIHtcbiAgICBwYXRoWzBdLnJlbGF0ZXMgPSB1bmRlZmluZWRcbiAgfVxuXG4gIC8vIGNvbnZlcnQgc2luZ2xlIGVudHJ5IGFuZCBOb2RlTGlzdFxuICBpZiAoIUFycmF5LmlzQXJyYXkoZWxlbWVudHMpKSB7XG4gICAgZWxlbWVudHMgPSAhZWxlbWVudHMubGVuZ3RoID8gW2VsZW1lbnRzXSA6IGNvbnZlcnROb2RlTGlzdChlbGVtZW50cylcbiAgfVxuXG4gIGlmICghZWxlbWVudHMubGVuZ3RoIHx8IGVsZW1lbnRzLnNvbWUoKGVsZW1lbnQpID0+IGVsZW1lbnQubm9kZVR5cGUgIT09IDEpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGlucHV0IC0gdG8gY29tcGFyZSBIVE1MRWxlbWVudHMgaXRzIG5lY2Vzc2FyeSB0byBwcm92aWRlIGEgcmVmZXJlbmNlIG9mIHRoZSBzZWxlY3RlZCBub2RlKHMpISAobWlzc2luZyBcImVsZW1lbnRzXCIpJylcbiAgfVxuXG4gIGNvbnN0IHNlbGVjdCA9IGdldFNlbGVjdChvcHRpb25zKVxuICBjb25zdCB0b1N0cmluZyA9IGdldFRvU3RyaW5nKG9wdGlvbnMpXG5cbiAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIFtvcHRpbWl6ZVBhcnQoW10sIHBhdGhbMF0sIFtdLCBlbGVtZW50cywgc2VsZWN0LCB0b1N0cmluZyldXG4gIH1cblxuICB2YXIgZW5kT3B0aW1pemVkID0gZmFsc2VcbiAgaWYgKHBhdGhbcGF0aC5sZW5ndGgtMV0ucmVsYXRlcyA9PT0gJ2NoaWxkJykge1xuICAgIHBhdGhbcGF0aC5sZW5ndGgtMV0gPSBvcHRpbWl6ZVBhcnQocGF0aC5zbGljZSgwLCAtMSksIHBhdGhbcGF0aC5sZW5ndGgtMV0sIFtdLCBlbGVtZW50cywgc2VsZWN0LCB0b1N0cmluZylcbiAgICBlbmRPcHRpbWl6ZWQgPSB0cnVlXG4gIH1cblxuICBwYXRoID0gWy4uLnBhdGhdXG4gIGNvbnN0IHNob3J0ZW5lZCA9IFtwYXRoLnBvcCgpXVxuICB3aGlsZSAocGF0aC5sZW5ndGggPiAxKSB7XG4gICAgY29uc3QgY3VycmVudCA9IHBhdGgucG9wKClcbiAgICBjb25zdCBtYXRjaGVzID0gc2VsZWN0KHRvU3RyaW5nLnBhdGgoWy4uLnBhdGgsIC4uLnNob3J0ZW5lZF0pKVxuICAgIGNvbnN0IGhhc1NhbWVSZXN1bHQgPSBtYXRjaGVzLmxlbmd0aCA9PT0gZWxlbWVudHMubGVuZ3RoICYmIGVsZW1lbnRzLmV2ZXJ5KChlbGVtZW50LCBpKSA9PiBlbGVtZW50ID09PSBtYXRjaGVzW2ldKVxuICAgIGlmICghaGFzU2FtZVJlc3VsdCkge1xuICAgICAgc2hvcnRlbmVkLnVuc2hpZnQob3B0aW1pemVQYXJ0KHBhdGgsIGN1cnJlbnQsIHNob3J0ZW5lZCwgZWxlbWVudHMsIHNlbGVjdCwgdG9TdHJpbmcpKVxuICAgIH1cbiAgfVxuICBzaG9ydGVuZWQudW5zaGlmdChwYXRoWzBdKVxuICBwYXRoID0gc2hvcnRlbmVkXG5cbiAgLy8gb3B0aW1pemUgc3RhcnQgKyBlbmRcbiAgcGF0aFswXSA9IG9wdGltaXplUGFydChbXSwgcGF0aFswXSwgcGF0aC5zbGljZSgxKSwgZWxlbWVudHMsIHNlbGVjdCwgdG9TdHJpbmcpXG4gIGlmICghZW5kT3B0aW1pemVkKSB7XG4gICAgcGF0aFtwYXRoLmxlbmd0aC0xXSA9IG9wdGltaXplUGFydChwYXRoLnNsaWNlKDAsIC0xKSwgcGF0aFtwYXRoLmxlbmd0aC0xXSwgW10sIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKVxuICB9XG5cbiAgcmV0dXJuIHBhdGhcbn1cblxuLyoqXG4gKiBPcHRpbWl6ZSA6Y29udGFpbnNcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwcmUgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1BhdHRlcm59ICAgICAgICAgICAgIGN1cnJlbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgcG9zdCAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICAgICAgIHNlbGVjdCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7VG9TdHJpbmdBcGl9ICAgICAgICAgdG9TdHJpbmcgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtQYXR0ZXJufSAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3Qgb3B0aW1pemVUZXh0ID0gKHByZSwgY3VycmVudCwgcG9zdCwgZWxlbWVudHMsIHNlbGVjdCwgdG9TdHJpbmcpID0+IHtcbiAgY29uc3QgW2NvbnRhaW5zLCBvdGhlcl0gPSBwYXJ0aXRpb24oY3VycmVudC5wc2V1ZG8sIChpdGVtKSA9PiBpdGVtLnN0YXJ0c1dpdGgoJ2NvbnRhaW5zJykpXG5cbiAgaWYgKGNvbnRhaW5zLmxlbmd0aCA+IDAgJiYgcG9zdC5sZW5ndGgpIHtcbiAgICBjb25zdCBiYXNlID0geyAuLi5jdXJyZW50LCBwc2V1ZG86IFsuLi5vdGhlciwgLi4uY29udGFpbnNdIH1cbiAgICB3aGlsZSAoYmFzZS5wc2V1ZG8ubGVuZ3RoID4gb3RoZXIubGVuZ3RoKSB7XG4gICAgICBjb25zdCBvcHRpbWl6ZWQgPSBiYXNlLnBzZXVkby5zbGljZSgwLCAtMSlcbiAgICAgIGlmICghY29tcGFyZVJlc3VsdHMoc2VsZWN0KHRvU3RyaW5nLnBhdGgoWy4uLnByZSwgeyAuLi5iYXNlLCBwc2V1ZG86IG9wdGltaXplZCB9LCAuLi5wb3N0XSkpLCBlbGVtZW50cykpIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGJhc2UucHNldWRvID0gb3B0aW1pemVkXG4gICAgfVxuICAgIHJldHVybiBiYXNlXG4gIH1cbiAgcmV0dXJuIGN1cnJlbnRcbn1cblxuLyoqXG4gKiBPcHRpbWl6ZSBhdHRyaWJ1dGVzXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgcHJlICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtQYXR0ZXJufSAgICAgICAgICAgICBjdXJyZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHBvc3QgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgICAgICBzZWxlY3QgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICAgICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7UGF0dGVybn0gICAgICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IG9wdGltaXplQXR0cmlidXRlcyA9IChwcmUsIGN1cnJlbnQsIHBvc3QsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIC8vIHJlZHVjZSBhdHRyaWJ1dGVzOiBmaXJzdCB0cnkgd2l0aG91dCB2YWx1ZSwgdGhlbiByZW1vdmluZyBjb21wbGV0ZWx5XG4gIGlmIChjdXJyZW50LmF0dHJpYnV0ZXMubGVuZ3RoID4gMCkge1xuICAgIGxldCBhdHRyaWJ1dGVzID0gWy4uLmN1cnJlbnQuYXR0cmlidXRlc11cblxuICAgIGNvbnN0IHNpbXBsaWZ5ID0gKG9yaWdpbmFsLCBnZXRTaW1wbGlmaWVkKSA9PiB7XG4gICAgICBsZXQgaSA9IG9yaWdpbmFsLmxlbmd0aCAtIDFcbiAgICAgIHdoaWxlIChpID49IDApIHtcbiAgICAgICAgbGV0IGF0dHJpYnV0ZXMgPSBnZXRTaW1wbGlmaWVkKG9yaWdpbmFsLCBpKVxuICAgICAgICBpZiAoIWNvbXBhcmVSZXN1bHRzKFxuICAgICAgICAgIHNlbGVjdCh0b1N0cmluZy5wYXRoKFsuLi5wcmUsIHsgLi4uY3VycmVudCwgYXR0cmlidXRlcyB9LCAuLi5wb3N0XSkpLFxuICAgICAgICAgIGVsZW1lbnRzXG4gICAgICAgICkpIHtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIGktLVxuICAgICAgICBvcmlnaW5hbCA9IGF0dHJpYnV0ZXNcbiAgICAgIH1cbiAgICAgIHJldHVybiBvcmlnaW5hbFxuICAgIH1cblxuICAgIGNvbnN0IHNpbXBsaWZpZWQgPSBzaW1wbGlmeShhdHRyaWJ1dGVzLCAoYXR0cmlidXRlcywgaSkgPT4ge1xuICAgICAgY29uc3QgeyBuYW1lIH0gPSBhdHRyaWJ1dGVzW2ldXG4gICAgICBpZiAobmFtZSA9PT0gJ2lkJykge1xuICAgICAgICByZXR1cm4gYXR0cmlidXRlc1xuICAgICAgfVxuICAgICAgcmV0dXJuIFsuLi5hdHRyaWJ1dGVzLnNsaWNlKDAsIGkpLCB7IG5hbWUsIHZhbHVlOiBudWxsIH0sIC4uLmF0dHJpYnV0ZXMuc2xpY2UoaSArIDEpXVxuICAgIH0pXG4gICAgcmV0dXJuIHsgLi4uY3VycmVudCwgYXR0cmlidXRlczogc2ltcGxpZnkoc2ltcGxpZmllZCwgYXR0cmlidXRlcyA9PiBhdHRyaWJ1dGVzLnNsaWNlKDAsIC0xKSkgfSAgICBcbiAgfVxuICByZXR1cm4gY3VycmVudFxufVxuXG4vKipcbiAqIE9wdGltaXplIGRlc2NlbmRhbnRcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwcmUgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1BhdHRlcm59ICAgICAgICAgICAgIGN1cnJlbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgcG9zdCAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICAgICAgIHNlbGVjdCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7VG9TdHJpbmdBcGl9ICAgICAgICAgdG9TdHJpbmcgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtQYXR0ZXJufSAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3Qgb3B0aW1pemVEZXNjZW5kYW50ID0gKHByZSwgY3VycmVudCwgcG9zdCwgZWxlbWVudHMsIHNlbGVjdCwgdG9TdHJpbmcpID0+IHtcbiAgLy8gcm9idXN0bmVzczogZGVzY2VuZGFudCBpbnN0ZWFkIGNoaWxkIChoZXVyaXN0aWMpXG4gIGlmIChjdXJyZW50LnJlbGF0ZXMgPT09ICdjaGlsZCcpIHtcbiAgICBjb25zdCBkZXNjZW5kYW50ID0geyAuLi5jdXJyZW50LCByZWxhdGVzOiB1bmRlZmluZWQgfVxuICAgIGxldCBtYXRjaGVzID0gc2VsZWN0KHRvU3RyaW5nLnBhdGgoWy4uLnByZSwgZGVzY2VuZGFudCwgLi4ucG9zdF0pKVxuICAgIGlmIChjb21wYXJlUmVzdWx0cyhtYXRjaGVzLCBlbGVtZW50cykpIHtcbiAgICAgIHJldHVybiBkZXNjZW5kYW50XG4gICAgfVxuICB9XG4gIHJldHVybiBjdXJyZW50XG59XG5cbi8qKlxuICogT3B0aW1pemUgcmVjdXJzaXZlIGRlc2NlbmRhbnRzXG4gKiBcbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHByZSAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7UGF0dGVybn0gICAgICAgICAgICAgY3VycmVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwb3N0ICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgICAgICAgc2VsZWN0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtUb1N0cmluZ0FwaX0gICAgICAgICB0b1N0cmluZyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1BhdHRlcm59ICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5jb25zdCBvcHRpbWl6ZVJlY3Vyc2l2ZURlc2NlbmRhbnRzID0gKHByZSwgY3VycmVudCwgcG9zdCwgZWxlbWVudHMsIHNlbGVjdCwgdG9TdHJpbmcpID0+IHtcbiAgaWYgKGN1cnJlbnQuZGVzY2VuZGFudHMubGVuZ3RoID4gMCAmJiBwb3N0Lmxlbmd0aCkge1xuICAgIGNvbnN0IGJhc2UgPSB7IC4uLmN1cnJlbnQsIGRlc2NlbmRhbnRzOiBbLi4uY3VycmVudC5kZXNjZW5kYW50c10gfVxuICAgIHdoaWxlIChiYXNlLmRlc2NlbmRhbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IG9wdGltaXplZCA9IGJhc2UuZGVzY2VuZGFudHMuc2xpY2UoMCwgLTEpXG4gICAgICBpZiAoIWNvbXBhcmVSZXN1bHRzKHNlbGVjdCh0b1N0cmluZy5wYXRoKFsuLi5wcmUsIHsgLi4uYmFzZSwgZGVzY2VuZGFudHM6IG9wdGltaXplZCB9LCAuLi5wb3N0XSkpLCBlbGVtZW50cykpIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGJhc2UuZGVzY2VuZGFudHMgPSBvcHRpbWl6ZWRcbiAgICB9XG4gICAgcmV0dXJuIGJhc2VcbiAgfVxuICByZXR1cm4gY3VycmVudFxufVxuXG4vKipcbiAqIE9wdGltaXplIG50aCBvZiB0eXBlXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgcHJlICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtQYXR0ZXJufSAgICAgICAgICAgICBjdXJyZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHBvc3QgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgICAgICBzZWxlY3QgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICAgICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7UGF0dGVybn0gICAgICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IG9wdGltaXplTnRoT2ZUeXBlID0gKHByZSwgY3VycmVudCwgcG9zdCwgZWxlbWVudHMsIHNlbGVjdCwgdG9TdHJpbmcpID0+IHtcbiAgY29uc3QgaSA9IGN1cnJlbnQucHNldWRvLmZpbmRJbmRleChpdGVtID0+IGl0ZW0uc3RhcnRzV2l0aCgnbnRoLWNoaWxkJykpXG4gIC8vIHJvYnVzdG5lc3M6ICdudGgtb2YtdHlwZScgaW5zdGVhZCAnbnRoLWNoaWxkJyAoaGV1cmlzdGljKVxuICBpZiAoaSA+PSAwKSB7XG4gICAgLy8gVE9ETzogY29uc2lkZXIgY29tcGxldGUgY292ZXJhZ2Ugb2YgJ250aC1vZi10eXBlJyByZXBsYWNlbWVudFxuICAgIGNvbnN0IHR5cGUgPSBjdXJyZW50LnBzZXVkb1tpXS5yZXBsYWNlKC9ebnRoLWNoaWxkLywgJ250aC1vZi10eXBlJylcbiAgICBjb25zdCBudGhPZlR5cGUgPSB7IC4uLmN1cnJlbnQsIHBzZXVkbzogWy4uLmN1cnJlbnQucHNldWRvLnNsaWNlKDAsIGkpLCB0eXBlLCAuLi5jdXJyZW50LnBzZXVkby5zbGljZShpICsgMSldIH1cbiAgICBsZXQgcGF0dGVybiA9IHRvU3RyaW5nLnBhdGgoWy4uLnByZSwgbnRoT2ZUeXBlLCAuLi5wb3N0XSlcbiAgICBsZXQgbWF0Y2hlcyA9IHNlbGVjdChwYXR0ZXJuKVxuICAgIGlmIChjb21wYXJlUmVzdWx0cyhtYXRjaGVzLCBlbGVtZW50cykpIHtcbiAgICAgIHJldHVybiBudGhPZlR5cGVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGN1cnJlbnRcbn1cblxuLyoqXG4gKiBPcHRpbWl6ZSBjbGFzc2VzXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgcHJlICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtQYXR0ZXJufSAgICAgICAgICAgICBjdXJyZW50ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxQYXR0ZXJuPn0gICAgIHBvc3QgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gZWxlbWVudHMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgICAgICBzZWxlY3QgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1RvU3RyaW5nQXBpfSAgICAgICAgIHRvU3RyaW5nIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7UGF0dGVybn0gICAgICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IG9wdGltaXplQ2xhc3NlcyA9IChwcmUsIGN1cnJlbnQsIHBvc3QsIGVsZW1lbnRzLCBzZWxlY3QsIHRvU3RyaW5nKSA9PiB7XG4gIC8vIGVmZmljaWVuY3k6IGNvbWJpbmF0aW9ucyBvZiBjbGFzc25hbWUgKHBhcnRpYWwgcGVybXV0YXRpb25zKVxuICBpZiAoY3VycmVudC5jbGFzc2VzLmxlbmd0aCA+IDEpIHtcbiAgICBsZXQgb3B0aW1pemVkID0gY3VycmVudC5jbGFzc2VzLnNsaWNlKCkuc29ydCgoY3VyciwgbmV4dCkgPT4gY3Vyci5sZW5ndGggLSBuZXh0Lmxlbmd0aClcblxuICAgIHdoaWxlIChvcHRpbWl6ZWQubGVuZ3RoID4gMSkge1xuICAgICAgb3B0aW1pemVkLnNoaWZ0KClcbiAgICAgIGNvbnN0IHBhdHRlcm4gPSB0b1N0cmluZy5wYXRoKFsuLi5wcmUsIHsgLi4uY3VycmVudCwgY2xhc3Nlczogb3B0aW1pemVkIH0sIC4uLnBvc3RdKVxuICAgICAgaWYgKCFjb21wYXJlUmVzdWx0cyhzZWxlY3QocGF0dGVybiksIGVsZW1lbnRzKSkge1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY3VycmVudC5jbGFzc2VzID0gb3B0aW1pemVkXG4gICAgfVxuXG4gICAgb3B0aW1pemVkID0gY3VycmVudC5jbGFzc2VzXG5cbiAgICBpZiAob3B0aW1pemVkLmxlbmd0aCA+IDIpIHtcbiAgICAgIGNvbnN0IGJhc2UgPSBjcmVhdGVQYXR0ZXJuKHsgY2xhc3Nlczogb3B0aW1pemVkIH0pXG4gICAgICBjb25zdCByZWZlcmVuY2VzID0gc2VsZWN0KHRvU3RyaW5nLnBhdGgoWy4uLnByZSwgYmFzZV0pKVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWZlcmVuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHJlZmVyZW5jZSA9IHJlZmVyZW5jZXNbaV1cbiAgICAgICAgaWYgKGVsZW1lbnRzLnNvbWUoKGVsZW1lbnQpID0+IHJlZmVyZW5jZS5jb250YWlucyhlbGVtZW50KSkpIHtcbiAgICAgICAgICAvLyBUT0RPOlxuICAgICAgICAgIC8vIC0gY2hlY2sgdXNpbmcgYXR0cmlidXRlcyArIHJlZ2FyZCBleGNsdWRlc1xuICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gY3JlYXRlUGF0dGVybih7IHRhZ05hbWU6IHJlZmVyZW5jZS50YWdOYW1lIH0pXG4gICAgICAgICAgdmFyIHBhdHRlcm4gPSB0b1N0cmluZy5wYXRoKFsuLi5wcmUsIGNyZWF0ZVBhdHRlcm4oeyB0YWdOYW1lOiByZWZlcmVuY2UudGFnTmFtZSB9KSwgLi4ucG9zdF0pXG4gICAgICAgICAgdmFyIG1hdGNoZXMgPSBzZWxlY3QocGF0dGVybilcbiAgICAgICAgICBpZiAoY29tcGFyZVJlc3VsdHMobWF0Y2hlcywgZWxlbWVudHMpKSB7XG4gICAgICAgICAgICBjdXJyZW50ID0gZGVzY3JpcHRpb25cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY3VycmVudFxufVxuXG5jb25zdCBvcHRpbWl6ZXJzID0gW1xuICBvcHRpbWl6ZVRleHQsXG4gIG9wdGltaXplQXR0cmlidXRlcyxcbiAgb3B0aW1pemVEZXNjZW5kYW50LFxuICBvcHRpbWl6ZVJlY3Vyc2l2ZURlc2NlbmRhbnRzLFxuICBvcHRpbWl6ZU50aE9mVHlwZSxcbiAgb3B0aW1pemVDbGFzc2VzLFxuXVxuXG4vKipcbiAqIEltcHJvdmUgYSBjaHVuayBvZiB0aGUgc2VsZWN0b3JcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48UGF0dGVybj59ICAgICBwcmUgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1BhdHRlcm59ICAgICAgICAgICAgIGN1cnJlbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPFBhdHRlcm4+fSAgICAgcG9zdCAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICAgICAgIHNlbGVjdCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7VG9TdHJpbmdBcGl9ICAgICAgICAgdG9TdHJpbmcgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtQYXR0ZXJufSAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuY29uc3Qgb3B0aW1pemVQYXJ0ID0gKHByZSwgY3VycmVudCwgcG9zdCwgZWxlbWVudHMsIHNlbGVjdCwgdG9TdHJpbmcpID0+XG4gIG9wdGltaXplcnMucmVkdWNlKChhY2MsIG9wdGltaXplcikgPT4gb3B0aW1pemVyKHByZSwgYWNjLCBwb3N0LCBlbGVtZW50cywgc2VsZWN0LCB0b1N0cmluZyksIGN1cnJlbnQpXG5cbi8qKlxuICogRXZhbHVhdGUgbWF0Y2hlcyB3aXRoIGV4cGVjdGVkIGVsZW1lbnRzXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gbWF0Y2hlcyAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgY29uc3QgY29tcGFyZVJlc3VsdHMgPSAobWF0Y2hlcywgZWxlbWVudHMpID0+IHtcbiAgY29uc3QgeyBsZW5ndGggfSA9IG1hdGNoZXNcbiAgcmV0dXJuIGxlbmd0aCA9PT0gZWxlbWVudHMubGVuZ3RoICYmIGVsZW1lbnRzLmV2ZXJ5KChlbGVtZW50KSA9PiB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKG1hdGNoZXNbaV0gPT09IGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH0pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvb3B0aW1pemUuanMiLCIvKipcbiAqICMgU2VsZWN0XG4gKlxuICogQ29uc3RydWN0IGEgdW5pcXVlIENTUyBxdWVyeSBzZWxlY3RvciB0byBhY2Nlc3MgdGhlIHNlbGVjdGVkIERPTSBlbGVtZW50KHMpLlxuICogRm9yIGxvbmdldml0eSBpdCBhcHBsaWVzIGRpZmZlcmVudCBtYXRjaGluZyBhbmQgb3B0aW1pemF0aW9uIHN0cmF0ZWdpZXMuXG4gKi9cbmltcG9ydCBtYXRjaCBmcm9tICcuL21hdGNoJ1xuaW1wb3J0IG9wdGltaXplIGZyb20gJy4vb3B0aW1pemUnXG5pbXBvcnQgeyBjb252ZXJ0Tm9kZUxpc3QsIGVzY2FwZVZhbHVlIH0gZnJvbSAnLi91dGlsaXRpZXMnXG5pbXBvcnQgeyBnZXRDb21tb25BbmNlc3RvciwgZ2V0Q29tbW9uUHJvcGVydGllcyB9IGZyb20gJy4vY29tbW9uJ1xuaW1wb3J0IHsgZ2V0U2VsZWN0IH0gZnJvbSAnLi9zZWxlY3RvcidcbmltcG9ydCB7IGNyZWF0ZVBhdHRlcm4sIGdldFRvU3RyaW5nIH0gZnJvbSAnLi9wYXR0ZXJuJ1xuXG4vKipcbiAqIEB0eXBlZGVmICB7T2JqZWN0fSBPcHRpb25zXG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBbcm9vdF0gICAgICAgICAgICAgICAgICAgICBPcHRpb25hbGx5IHNwZWNpZnkgdGhlIHJvb3QgZWxlbWVudFxuICogQHByb3BlcnR5IHtmdW5jdGlvbiB8IEFycmF5LjxIVE1MRWxlbWVudD59IFtza2lwXSAgU3BlY2lmeSBlbGVtZW50cyB0byBza2lwXG4gKiBAcHJvcGVydHkge0FycmF5LjxzdHJpbmc+fSBbcHJpb3JpdHldICAgICAgICAgICAgICBPcmRlciBvZiBhdHRyaWJ1dGUgcHJvY2Vzc2luZ1xuICogQHByb3BlcnR5IHtPYmplY3Q8c3RyaW5nLCBmdW5jdGlvbiB8IG51bWJlciB8IHN0cmluZyB8IGJvb2xlYW59IFtpZ25vcmVdIERlZmluZSBwYXR0ZXJucyB3aGljaCBzaG91bGRuJ3QgYmUgaW5jbHVkZWRcbiAqIEBwcm9wZXJ0eSB7KCdjc3MnfCd4cGF0aCd8J2pxdWVyeScpfSBbZm9ybWF0XSAgICAgIE91dHB1dCBmb3JtYXQgICAgXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCcuL3BhdHRlcm4nKS5QYXR0ZXJufSBQYXR0ZXJuXG4gKi9cblxuLyoqXG4gKiBHZXQgYSBzZWxlY3RvciBmb3IgdGhlIHByb3ZpZGVkIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudCAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T3B0aW9uc30gICAgIFtvcHRpb25zXSAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge0FycmF5LjxQYXR0ZXJuPn0gICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRTaW5nbGVTZWxlY3RvclBhdGggPSAoZWxlbWVudCwgb3B0aW9ucyA9IHt9KSA9PiB7XG5cbiAgaWYgKGVsZW1lbnQubm9kZVR5cGUgPT09IDMpIHtcbiAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlXG4gIH1cblxuICBpZiAoZWxlbWVudC5ub2RlVHlwZSAhPT0gMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBpbnB1dCAtIG9ubHkgSFRNTEVsZW1lbnRzIG9yIHJlcHJlc2VudGF0aW9ucyBvZiB0aGVtIGFyZSBzdXBwb3J0ZWQhIChub3QgXCIke3R5cGVvZiBlbGVtZW50fVwiKWApXG4gIH1cblxuICBjb25zdCBwYXRoID0gbWF0Y2goZWxlbWVudCwgb3B0aW9ucylcbiAgY29uc3Qgb3B0aW1pemVkUGF0aCA9IG9wdGltaXplKHBhdGgsIGVsZW1lbnQsIG9wdGlvbnMpXG5cbiAgLy8gZGVidWdcbiAgLy8gY29uc29sZS5sb2coYFxuICAvLyAgIHNlbGVjdG9yOiAgJHtwYXRofVxuICAvLyAgIG9wdGltaXplZDogJHtvcHRpbWl6ZWRQYXRofVxuICAvLyBgKVxuXG4gIHJldHVybiBvcHRpbWl6ZWRQYXRoXG59XG5cbi8qKlxuICogR2V0IGEgc2VsZWN0b3IgdG8gbWF0Y2ggbXVsdGlwbGUgZGVzY2VuZGFudHMgZnJvbSBhbiBhbmNlc3RvclxuICpcbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD58Tm9kZUxpc3R9IGVsZW1lbnRzICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPcHRpb25zfSAgICAgICAgICAgICAgICAgICAgICBbb3B0aW9uc10gIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7QXJyYXkuPFBhdHRlcm4+fSAgICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldE11bHRpU2VsZWN0b3JQYXRoID0gKGVsZW1lbnRzLCBvcHRpb25zID0ge30pID0+IHtcblxuICBpZiAoIUFycmF5LmlzQXJyYXkoZWxlbWVudHMpKSB7XG4gICAgZWxlbWVudHMgPSBjb252ZXJ0Tm9kZUxpc3QoZWxlbWVudHMpXG4gIH1cblxuICBpZiAoZWxlbWVudHMuc29tZSgoZWxlbWVudCkgPT4gZWxlbWVudC5ub2RlVHlwZSAhPT0gMSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaW5wdXQgLSBvbmx5IGFuIEFycmF5IG9mIEhUTUxFbGVtZW50cyBvciByZXByZXNlbnRhdGlvbnMgb2YgdGhlbSBpcyBzdXBwb3J0ZWQhJylcbiAgfVxuXG4gIGNvbnN0IHNlbGVjdCA9IGdldFNlbGVjdChvcHRpb25zKVxuICBjb25zdCB0b1N0cmluZyA9IGdldFRvU3RyaW5nKG9wdGlvbnMpXG5cbiAgY29uc3QgYW5jZXN0b3IgPSBnZXRDb21tb25BbmNlc3RvcihlbGVtZW50cywgb3B0aW9ucylcbiAgY29uc3QgYW5jZXN0b3JQYXRoID0gbWF0Y2goYW5jZXN0b3IsIG9wdGlvbnMpXG5cbiAgLy8gVE9ETzogY29uc2lkZXIgdXNhZ2Ugb2YgbXVsdGlwbGUgc2VsZWN0b3JzICsgcGFyZW50LWNoaWxkIHJlbGF0aW9uICsgY2hlY2sgZm9yIHBhcnQgcmVkdW5kYW5jeVxuICBjb25zdCBjb21tb25QYXRoID0gZ2V0Q29tbW9uUGF0aChlbGVtZW50cylcbiAgY29uc3QgZGVzY2VuZGFudFBhdHRlcm4gPSBjb21tb25QYXRoWzBdXG5cbiAgY29uc3Qgc2VsZWN0b3JQYXRoID0gb3B0aW1pemUoWy4uLmFuY2VzdG9yUGF0aCwgZGVzY2VuZGFudFBhdHRlcm5dLCBlbGVtZW50cywgb3B0aW9ucylcbiAgY29uc3Qgc2VsZWN0b3JNYXRjaGVzID0gY29udmVydE5vZGVMaXN0KHNlbGVjdCh0b1N0cmluZy5wYXRoKHNlbGVjdG9yUGF0aCkpKVxuXG4gIGlmICghZWxlbWVudHMuZXZlcnkoKGVsZW1lbnQpID0+IHNlbGVjdG9yTWF0Y2hlcy5zb21lKChlbnRyeSkgPT4gZW50cnkgPT09IGVsZW1lbnQpICkpIHtcbiAgICAvLyBUT0RPOiBjbHVzdGVyIG1hdGNoZXMgdG8gc3BsaXQgaW50byBzaW1pbGFyIGdyb3VwcyBmb3Igc3ViIHNlbGVjdGlvbnNcbiAgICByZXR1cm4gY29uc29sZS53YXJuKGBcbiAgICAgIFRoZSBzZWxlY3RlZCBlbGVtZW50cyBjYW4ndCBiZSBlZmZpY2llbnRseSBtYXBwZWQuXG4gICAgICBJdHMgcHJvYmFibHkgYmVzdCB0byB1c2UgbXVsdGlwbGUgc2luZ2xlIHNlbGVjdG9ycyBpbnN0ZWFkIVxuICAgIGAsIGVsZW1lbnRzKVxuICB9XG5cbiAgcmV0dXJuIHNlbGVjdG9yUGF0aFxufVxuXG4vKipcbiAqIEdldCBzZWxlY3RvcnMgdG8gZGVzY3JpYmUgYSBzZXQgb2YgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtBcnJheS48UGF0dGVybj59ICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmNvbnN0IGdldENvbW1vblBhdGggPSAoZWxlbWVudHMpID0+IHtcbiAgY29uc3QgeyBjbGFzc2VzLCBhdHRyaWJ1dGVzLCB0YWcgfSA9IGdldENvbW1vblByb3BlcnRpZXMoZWxlbWVudHMpXG5cbiAgcmV0dXJuIFtcbiAgICBjcmVhdGVQYXR0ZXJuKHtcbiAgICAgIHRhZyxcbiAgICAgIGNsYXNzZXM6IGNsYXNzZXMgfHwgW10sXG4gICAgICBhdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzID8gT2JqZWN0LmtleXMoYXR0cmlidXRlcykubWFwKChuYW1lKSA9PiAoe1xuICAgICAgICBuYW1lOiBlc2NhcGVWYWx1ZShuYW1lKSxcbiAgICAgICAgdmFsdWU6IGVzY2FwZVZhbHVlKGF0dHJpYnV0ZXNbbmFtZV0pXG4gICAgICB9KSkgOiBbXVxuICAgIH0pXG4gIF1cbn1cblxuLyoqXG4gKiBDaG9vc2UgYWN0aW9uIGRlcGVuZGluZyBvbiB0aGUgaW5wdXQgKG11bHRpcGxlL3NpbmdsZSlcbiAqXG4gKiBOT1RFOiBleHRlbmRlZCBkZXRlY3Rpb24gaXMgdXNlZCBmb3Igc3BlY2lhbCBjYXNlcyBsaWtlIHRoZSA8c2VsZWN0PiBlbGVtZW50IHdpdGggPG9wdGlvbnM+XG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR8Tm9kZUxpc3R8QXJyYXkuPEhUTUxFbGVtZW50Pn0gaW5wdXQgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T3B0aW9uc30gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW29wdGlvbnNdIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRRdWVyeVNlbGVjdG9yIChpbnB1dCwgb3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IHBhdGggPSAoaW5wdXQubGVuZ3RoICYmICFpbnB1dC5uYW1lKVxuICAgID8gZ2V0TXVsdGlTZWxlY3RvclBhdGgoaW5wdXQsIG9wdGlvbnMpXG4gICAgOiBnZXRTaW5nbGVTZWxlY3RvclBhdGgoaW5wdXQsIG9wdGlvbnMpXG5cbiAgcmV0dXJuIGdldFRvU3RyaW5nKG9wdGlvbnMpLnBhdGgocGF0aClcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZWxlY3QuanMiLCIvKiFcbiAqIFNpenpsZSBDU1MgU2VsZWN0b3IgRW5naW5lIHYyLjMuNlxuICogaHR0cHM6Ly9zaXp6bGVqcy5jb20vXG4gKlxuICogQ29weXJpZ2h0IEpTIEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwczovL2pzLmZvdW5kYXRpb24vXG4gKlxuICogRGF0ZTogMjAyMS0wMi0xNlxuICovXG4oIGZ1bmN0aW9uKCB3aW5kb3cgKSB7XG52YXIgaSxcblx0c3VwcG9ydCxcblx0RXhwcixcblx0Z2V0VGV4dCxcblx0aXNYTUwsXG5cdHRva2VuaXplLFxuXHRjb21waWxlLFxuXHRzZWxlY3QsXG5cdG91dGVybW9zdENvbnRleHQsXG5cdHNvcnRJbnB1dCxcblx0aGFzRHVwbGljYXRlLFxuXG5cdC8vIExvY2FsIGRvY3VtZW50IHZhcnNcblx0c2V0RG9jdW1lbnQsXG5cdGRvY3VtZW50LFxuXHRkb2NFbGVtLFxuXHRkb2N1bWVudElzSFRNTCxcblx0cmJ1Z2d5UVNBLFxuXHRyYnVnZ3lNYXRjaGVzLFxuXHRtYXRjaGVzLFxuXHRjb250YWlucyxcblxuXHQvLyBJbnN0YW5jZS1zcGVjaWZpYyBkYXRhXG5cdGV4cGFuZG8gPSBcInNpenpsZVwiICsgMSAqIG5ldyBEYXRlKCksXG5cdHByZWZlcnJlZERvYyA9IHdpbmRvdy5kb2N1bWVudCxcblx0ZGlycnVucyA9IDAsXG5cdGRvbmUgPSAwLFxuXHRjbGFzc0NhY2hlID0gY3JlYXRlQ2FjaGUoKSxcblx0dG9rZW5DYWNoZSA9IGNyZWF0ZUNhY2hlKCksXG5cdGNvbXBpbGVyQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuXHRub25uYXRpdmVTZWxlY3RvckNhY2hlID0gY3JlYXRlQ2FjaGUoKSxcblx0c29ydE9yZGVyID0gZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0aWYgKCBhID09PSBiICkge1xuXHRcdFx0aGFzRHVwbGljYXRlID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIDA7XG5cdH0sXG5cblx0Ly8gSW5zdGFuY2UgbWV0aG9kc1xuXHRoYXNPd24gPSAoIHt9ICkuaGFzT3duUHJvcGVydHksXG5cdGFyciA9IFtdLFxuXHRwb3AgPSBhcnIucG9wLFxuXHRwdXNoTmF0aXZlID0gYXJyLnB1c2gsXG5cdHB1c2ggPSBhcnIucHVzaCxcblx0c2xpY2UgPSBhcnIuc2xpY2UsXG5cblx0Ly8gVXNlIGEgc3RyaXBwZWQtZG93biBpbmRleE9mIGFzIGl0J3MgZmFzdGVyIHRoYW4gbmF0aXZlXG5cdC8vIGh0dHBzOi8vanNwZXJmLmNvbS90aG9yLWluZGV4b2YtdnMtZm9yLzVcblx0aW5kZXhPZiA9IGZ1bmN0aW9uKCBsaXN0LCBlbGVtICkge1xuXHRcdHZhciBpID0gMCxcblx0XHRcdGxlbiA9IGxpc3QubGVuZ3RoO1xuXHRcdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0aWYgKCBsaXN0WyBpIF0gPT09IGVsZW0gKSB7XG5cdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gLTE7XG5cdH0sXG5cblx0Ym9vbGVhbnMgPSBcImNoZWNrZWR8c2VsZWN0ZWR8YXN5bmN8YXV0b2ZvY3VzfGF1dG9wbGF5fGNvbnRyb2xzfGRlZmVyfGRpc2FibGVkfGhpZGRlbnxcIiArXG5cdFx0XCJpc21hcHxsb29wfG11bHRpcGxlfG9wZW58cmVhZG9ubHl8cmVxdWlyZWR8c2NvcGVkXCIsXG5cblx0Ly8gUmVndWxhciBleHByZXNzaW9uc1xuXG5cdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtc2VsZWN0b3JzLyN3aGl0ZXNwYWNlXG5cdHdoaXRlc3BhY2UgPSBcIltcXFxceDIwXFxcXHRcXFxcclxcXFxuXFxcXGZdXCIsXG5cblx0Ly8gaHR0cHM6Ly93d3cudzMub3JnL1RSL2Nzcy1zeW50YXgtMy8jaWRlbnQtdG9rZW4tZGlhZ3JhbVxuXHRpZGVudGlmaWVyID0gXCIoPzpcXFxcXFxcXFtcXFxcZGEtZkEtRl17MSw2fVwiICsgd2hpdGVzcGFjZSArXG5cdFx0XCI/fFxcXFxcXFxcW15cXFxcclxcXFxuXFxcXGZdfFtcXFxcdy1dfFteXFwwLVxcXFx4N2ZdKStcIixcblxuXHQvLyBBdHRyaWJ1dGUgc2VsZWN0b3JzOiBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI2F0dHJpYnV0ZS1zZWxlY3RvcnNcblx0YXR0cmlidXRlcyA9IFwiXFxcXFtcIiArIHdoaXRlc3BhY2UgKyBcIiooXCIgKyBpZGVudGlmaWVyICsgXCIpKD86XCIgKyB3aGl0ZXNwYWNlICtcblxuXHRcdC8vIE9wZXJhdG9yIChjYXB0dXJlIDIpXG5cdFx0XCIqKFsqXiR8IX5dPz0pXCIgKyB3aGl0ZXNwYWNlICtcblxuXHRcdC8vIFwiQXR0cmlidXRlIHZhbHVlcyBtdXN0IGJlIENTUyBpZGVudGlmaWVycyBbY2FwdHVyZSA1XVxuXHRcdC8vIG9yIHN0cmluZ3MgW2NhcHR1cmUgMyBvciBjYXB0dXJlIDRdXCJcblx0XHRcIiooPzonKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcJ10pKiknfFxcXCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFxcXFwiXSkqKVxcXCJ8KFwiICsgaWRlbnRpZmllciArIFwiKSl8KVwiICtcblx0XHR3aGl0ZXNwYWNlICsgXCIqXFxcXF1cIixcblxuXHRwc2V1ZG9zID0gXCI6KFwiICsgaWRlbnRpZmllciArIFwiKSg/OlxcXFwoKFwiICtcblxuXHRcdC8vIFRvIHJlZHVjZSB0aGUgbnVtYmVyIG9mIHNlbGVjdG9ycyBuZWVkaW5nIHRva2VuaXplIGluIHRoZSBwcmVGaWx0ZXIsIHByZWZlciBhcmd1bWVudHM6XG5cdFx0Ly8gMS4gcXVvdGVkIChjYXB0dXJlIDM7IGNhcHR1cmUgNCBvciBjYXB0dXJlIDUpXG5cdFx0XCIoJygoPzpcXFxcXFxcXC58W15cXFxcXFxcXCddKSopJ3xcXFwiKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcXFxcIl0pKilcXFwiKXxcIiArXG5cblx0XHQvLyAyLiBzaW1wbGUgKGNhcHR1cmUgNilcblx0XHRcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXCgpW1xcXFxdXXxcIiArIGF0dHJpYnV0ZXMgKyBcIikqKXxcIiArXG5cblx0XHQvLyAzLiBhbnl0aGluZyBlbHNlIChjYXB0dXJlIDIpXG5cdFx0XCIuKlwiICtcblx0XHRcIilcXFxcKXwpXCIsXG5cblx0Ly8gTGVhZGluZyBhbmQgbm9uLWVzY2FwZWQgdHJhaWxpbmcgd2hpdGVzcGFjZSwgY2FwdHVyaW5nIHNvbWUgbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVycyBwcmVjZWRpbmcgdGhlIGxhdHRlclxuXHRyd2hpdGVzcGFjZSA9IG5ldyBSZWdFeHAoIHdoaXRlc3BhY2UgKyBcIitcIiwgXCJnXCIgKSxcblx0cnRyaW0gPSBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIit8KCg/Ol58W15cXFxcXFxcXF0pKD86XFxcXFxcXFwuKSopXCIgK1xuXHRcdHdoaXRlc3BhY2UgKyBcIiskXCIsIFwiZ1wiICksXG5cblx0cmNvbW1hID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIqLFwiICsgd2hpdGVzcGFjZSArIFwiKlwiICksXG5cdHJjb21iaW5hdG9ycyA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKihbPit+XXxcIiArIHdoaXRlc3BhY2UgKyBcIilcIiArIHdoaXRlc3BhY2UgK1xuXHRcdFwiKlwiICksXG5cdHJkZXNjZW5kID0gbmV3IFJlZ0V4cCggd2hpdGVzcGFjZSArIFwifD5cIiApLFxuXG5cdHJwc2V1ZG8gPSBuZXcgUmVnRXhwKCBwc2V1ZG9zICksXG5cdHJpZGVudGlmaWVyID0gbmV3IFJlZ0V4cCggXCJeXCIgKyBpZGVudGlmaWVyICsgXCIkXCIgKSxcblxuXHRtYXRjaEV4cHIgPSB7XG5cdFx0XCJJRFwiOiBuZXcgUmVnRXhwKCBcIl4jKFwiICsgaWRlbnRpZmllciArIFwiKVwiICksXG5cdFx0XCJDTEFTU1wiOiBuZXcgUmVnRXhwKCBcIl5cXFxcLihcIiArIGlkZW50aWZpZXIgKyBcIilcIiApLFxuXHRcdFwiVEFHXCI6IG5ldyBSZWdFeHAoIFwiXihcIiArIGlkZW50aWZpZXIgKyBcInxbKl0pXCIgKSxcblx0XHRcIkFUVFJcIjogbmV3IFJlZ0V4cCggXCJeXCIgKyBhdHRyaWJ1dGVzICksXG5cdFx0XCJQU0VVRE9cIjogbmV3IFJlZ0V4cCggXCJeXCIgKyBwc2V1ZG9zICksXG5cdFx0XCJDSElMRFwiOiBuZXcgUmVnRXhwKCBcIl46KG9ubHl8Zmlyc3R8bGFzdHxudGh8bnRoLWxhc3QpLShjaGlsZHxvZi10eXBlKSg/OlxcXFwoXCIgK1xuXHRcdFx0d2hpdGVzcGFjZSArIFwiKihldmVufG9kZHwoKFsrLV18KShcXFxcZCopbnwpXCIgKyB3aGl0ZXNwYWNlICsgXCIqKD86KFsrLV18KVwiICtcblx0XHRcdHdoaXRlc3BhY2UgKyBcIiooXFxcXGQrKXwpKVwiICsgd2hpdGVzcGFjZSArIFwiKlxcXFwpfClcIiwgXCJpXCIgKSxcblx0XHRcImJvb2xcIjogbmV3IFJlZ0V4cCggXCJeKD86XCIgKyBib29sZWFucyArIFwiKSRcIiwgXCJpXCIgKSxcblxuXHRcdC8vIEZvciB1c2UgaW4gbGlicmFyaWVzIGltcGxlbWVudGluZyAuaXMoKVxuXHRcdC8vIFdlIHVzZSB0aGlzIGZvciBQT1MgbWF0Y2hpbmcgaW4gYHNlbGVjdGBcblx0XHRcIm5lZWRzQ29udGV4dFwiOiBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgK1xuXHRcdFx0XCIqWz4rfl18OihldmVufG9kZHxlcXxndHxsdHxudGh8Zmlyc3R8bGFzdCkoPzpcXFxcKFwiICsgd2hpdGVzcGFjZSArXG5cdFx0XHRcIiooKD86LVxcXFxkKT9cXFxcZCopXCIgKyB3aGl0ZXNwYWNlICsgXCIqXFxcXCl8KSg/PVteLV18JClcIiwgXCJpXCIgKVxuXHR9LFxuXG5cdHJodG1sID0gL0hUTUwkL2ksXG5cdHJpbnB1dHMgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b24pJC9pLFxuXHRyaGVhZGVyID0gL15oXFxkJC9pLFxuXG5cdHJuYXRpdmUgPSAvXltee10rXFx7XFxzKlxcW25hdGl2ZSBcXHcvLFxuXG5cdC8vIEVhc2lseS1wYXJzZWFibGUvcmV0cmlldmFibGUgSUQgb3IgVEFHIG9yIENMQVNTIHNlbGVjdG9yc1xuXHRycXVpY2tFeHByID0gL14oPzojKFtcXHctXSspfChcXHcrKXxcXC4oW1xcdy1dKykpJC8sXG5cblx0cnNpYmxpbmcgPSAvWyt+XS8sXG5cblx0Ly8gQ1NTIGVzY2FwZXNcblx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvQ1NTMjEvc3luZGF0YS5odG1sI2VzY2FwZWQtY2hhcmFjdGVyc1xuXHRydW5lc2NhcGUgPSBuZXcgUmVnRXhwKCBcIlxcXFxcXFxcW1xcXFxkYS1mQS1GXXsxLDZ9XCIgKyB3aGl0ZXNwYWNlICsgXCI/fFxcXFxcXFxcKFteXFxcXHJcXFxcblxcXFxmXSlcIiwgXCJnXCIgKSxcblx0ZnVuZXNjYXBlID0gZnVuY3Rpb24oIGVzY2FwZSwgbm9uSGV4ICkge1xuXHRcdHZhciBoaWdoID0gXCIweFwiICsgZXNjYXBlLnNsaWNlKCAxICkgLSAweDEwMDAwO1xuXG5cdFx0cmV0dXJuIG5vbkhleCA/XG5cblx0XHRcdC8vIFN0cmlwIHRoZSBiYWNrc2xhc2ggcHJlZml4IGZyb20gYSBub24taGV4IGVzY2FwZSBzZXF1ZW5jZVxuXHRcdFx0bm9uSGV4IDpcblxuXHRcdFx0Ly8gUmVwbGFjZSBhIGhleGFkZWNpbWFsIGVzY2FwZSBzZXF1ZW5jZSB3aXRoIHRoZSBlbmNvZGVkIFVuaWNvZGUgY29kZSBwb2ludFxuXHRcdFx0Ly8gU3VwcG9ydDogSUUgPD0xMStcblx0XHRcdC8vIEZvciB2YWx1ZXMgb3V0c2lkZSB0aGUgQmFzaWMgTXVsdGlsaW5ndWFsIFBsYW5lIChCTVApLCBtYW51YWxseSBjb25zdHJ1Y3QgYVxuXHRcdFx0Ly8gc3Vycm9nYXRlIHBhaXJcblx0XHRcdGhpZ2ggPCAwID9cblx0XHRcdFx0U3RyaW5nLmZyb21DaGFyQ29kZSggaGlnaCArIDB4MTAwMDAgKSA6XG5cdFx0XHRcdFN0cmluZy5mcm9tQ2hhckNvZGUoIGhpZ2ggPj4gMTAgfCAweEQ4MDAsIGhpZ2ggJiAweDNGRiB8IDB4REMwMCApO1xuXHR9LFxuXG5cdC8vIENTUyBzdHJpbmcvaWRlbnRpZmllciBzZXJpYWxpemF0aW9uXG5cdC8vIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3NvbS8jY29tbW9uLXNlcmlhbGl6aW5nLWlkaW9tc1xuXHRyY3NzZXNjYXBlID0gLyhbXFwwLVxceDFmXFx4N2ZdfF4tP1xcZCl8Xi0kfFteXFwwLVxceDFmXFx4N2YtXFx1RkZGRlxcdy1dL2csXG5cdGZjc3Nlc2NhcGUgPSBmdW5jdGlvbiggY2gsIGFzQ29kZVBvaW50ICkge1xuXHRcdGlmICggYXNDb2RlUG9pbnQgKSB7XG5cblx0XHRcdC8vIFUrMDAwMCBOVUxMIGJlY29tZXMgVStGRkZEIFJFUExBQ0VNRU5UIENIQVJBQ1RFUlxuXHRcdFx0aWYgKCBjaCA9PT0gXCJcXDBcIiApIHtcblx0XHRcdFx0cmV0dXJuIFwiXFx1RkZGRFwiO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb250cm9sIGNoYXJhY3RlcnMgYW5kIChkZXBlbmRlbnQgdXBvbiBwb3NpdGlvbikgbnVtYmVycyBnZXQgZXNjYXBlZCBhcyBjb2RlIHBvaW50c1xuXHRcdFx0cmV0dXJuIGNoLnNsaWNlKCAwLCAtMSApICsgXCJcXFxcXCIgK1xuXHRcdFx0XHRjaC5jaGFyQ29kZUF0KCBjaC5sZW5ndGggLSAxICkudG9TdHJpbmcoIDE2ICkgKyBcIiBcIjtcblx0XHR9XG5cblx0XHQvLyBPdGhlciBwb3RlbnRpYWxseS1zcGVjaWFsIEFTQ0lJIGNoYXJhY3RlcnMgZ2V0IGJhY2tzbGFzaC1lc2NhcGVkXG5cdFx0cmV0dXJuIFwiXFxcXFwiICsgY2g7XG5cdH0sXG5cblx0Ly8gVXNlZCBmb3IgaWZyYW1lc1xuXHQvLyBTZWUgc2V0RG9jdW1lbnQoKVxuXHQvLyBSZW1vdmluZyB0aGUgZnVuY3Rpb24gd3JhcHBlciBjYXVzZXMgYSBcIlBlcm1pc3Npb24gRGVuaWVkXCJcblx0Ly8gZXJyb3IgaW4gSUVcblx0dW5sb2FkSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuXHRcdHNldERvY3VtZW50KCk7XG5cdH0sXG5cblx0aW5EaXNhYmxlZEZpZWxkc2V0ID0gYWRkQ29tYmluYXRvcihcblx0XHRmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtLmRpc2FibGVkID09PSB0cnVlICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJmaWVsZHNldFwiO1xuXHRcdH0sXG5cdFx0eyBkaXI6IFwicGFyZW50Tm9kZVwiLCBuZXh0OiBcImxlZ2VuZFwiIH1cblx0KTtcblxuLy8gT3B0aW1pemUgZm9yIHB1c2guYXBwbHkoIF8sIE5vZGVMaXN0IClcbnRyeSB7XG5cdHB1c2guYXBwbHkoXG5cdFx0KCBhcnIgPSBzbGljZS5jYWxsKCBwcmVmZXJyZWREb2MuY2hpbGROb2RlcyApICksXG5cdFx0cHJlZmVycmVkRG9jLmNoaWxkTm9kZXNcblx0KTtcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkPDQuMFxuXHQvLyBEZXRlY3Qgc2lsZW50bHkgZmFpbGluZyBwdXNoLmFwcGx5XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcblx0YXJyWyBwcmVmZXJyZWREb2MuY2hpbGROb2Rlcy5sZW5ndGggXS5ub2RlVHlwZTtcbn0gY2F0Y2ggKCBlICkge1xuXHRwdXNoID0geyBhcHBseTogYXJyLmxlbmd0aCA/XG5cblx0XHQvLyBMZXZlcmFnZSBzbGljZSBpZiBwb3NzaWJsZVxuXHRcdGZ1bmN0aW9uKCB0YXJnZXQsIGVscyApIHtcblx0XHRcdHB1c2hOYXRpdmUuYXBwbHkoIHRhcmdldCwgc2xpY2UuY2FsbCggZWxzICkgKTtcblx0XHR9IDpcblxuXHRcdC8vIFN1cHBvcnQ6IElFPDlcblx0XHQvLyBPdGhlcndpc2UgYXBwZW5kIGRpcmVjdGx5XG5cdFx0ZnVuY3Rpb24oIHRhcmdldCwgZWxzICkge1xuXHRcdFx0dmFyIGogPSB0YXJnZXQubGVuZ3RoLFxuXHRcdFx0XHRpID0gMDtcblxuXHRcdFx0Ly8gQ2FuJ3QgdHJ1c3QgTm9kZUxpc3QubGVuZ3RoXG5cdFx0XHR3aGlsZSAoICggdGFyZ2V0WyBqKysgXSA9IGVsc1sgaSsrIF0gKSApIHt9XG5cdFx0XHR0YXJnZXQubGVuZ3RoID0gaiAtIDE7XG5cdFx0fVxuXHR9O1xufVxuXG5mdW5jdGlvbiBTaXp6bGUoIHNlbGVjdG9yLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICkge1xuXHR2YXIgbSwgaSwgZWxlbSwgbmlkLCBtYXRjaCwgZ3JvdXBzLCBuZXdTZWxlY3Rvcixcblx0XHRuZXdDb250ZXh0ID0gY29udGV4dCAmJiBjb250ZXh0Lm93bmVyRG9jdW1lbnQsXG5cblx0XHQvLyBub2RlVHlwZSBkZWZhdWx0cyB0byA5LCBzaW5jZSBjb250ZXh0IGRlZmF1bHRzIHRvIGRvY3VtZW50XG5cdFx0bm9kZVR5cGUgPSBjb250ZXh0ID8gY29udGV4dC5ub2RlVHlwZSA6IDk7XG5cblx0cmVzdWx0cyA9IHJlc3VsdHMgfHwgW107XG5cblx0Ly8gUmV0dXJuIGVhcmx5IGZyb20gY2FsbHMgd2l0aCBpbnZhbGlkIHNlbGVjdG9yIG9yIGNvbnRleHRcblx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgfHwgIXNlbGVjdG9yIHx8XG5cdFx0bm9kZVR5cGUgIT09IDEgJiYgbm9kZVR5cGUgIT09IDkgJiYgbm9kZVR5cGUgIT09IDExICkge1xuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHQvLyBUcnkgdG8gc2hvcnRjdXQgZmluZCBvcGVyYXRpb25zIChhcyBvcHBvc2VkIHRvIGZpbHRlcnMpIGluIEhUTUwgZG9jdW1lbnRzXG5cdGlmICggIXNlZWQgKSB7XG5cdFx0c2V0RG9jdW1lbnQoIGNvbnRleHQgKTtcblx0XHRjb250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcblxuXHRcdGlmICggZG9jdW1lbnRJc0hUTUwgKSB7XG5cblx0XHRcdC8vIElmIHRoZSBzZWxlY3RvciBpcyBzdWZmaWNpZW50bHkgc2ltcGxlLCB0cnkgdXNpbmcgYSBcImdldCpCeSpcIiBET00gbWV0aG9kXG5cdFx0XHQvLyAoZXhjZXB0aW5nIERvY3VtZW50RnJhZ21lbnQgY29udGV4dCwgd2hlcmUgdGhlIG1ldGhvZHMgZG9uJ3QgZXhpc3QpXG5cdFx0XHRpZiAoIG5vZGVUeXBlICE9PSAxMSAmJiAoIG1hdGNoID0gcnF1aWNrRXhwci5leGVjKCBzZWxlY3RvciApICkgKSB7XG5cblx0XHRcdFx0Ly8gSUQgc2VsZWN0b3Jcblx0XHRcdFx0aWYgKCAoIG0gPSBtYXRjaFsgMSBdICkgKSB7XG5cblx0XHRcdFx0XHQvLyBEb2N1bWVudCBjb250ZXh0XG5cdFx0XHRcdFx0aWYgKCBub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0XHRcdGlmICggKCBlbGVtID0gY29udGV4dC5nZXRFbGVtZW50QnlJZCggbSApICkgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUsIE9wZXJhLCBXZWJraXRcblx0XHRcdFx0XHRcdFx0Ly8gVE9ETzogaWRlbnRpZnkgdmVyc2lvbnNcblx0XHRcdFx0XHRcdFx0Ly8gZ2V0RWxlbWVudEJ5SWQgY2FuIG1hdGNoIGVsZW1lbnRzIGJ5IG5hbWUgaW5zdGVhZCBvZiBJRFxuXHRcdFx0XHRcdFx0XHRpZiAoIGVsZW0uaWQgPT09IG0gKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0cy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gRWxlbWVudCBjb250ZXh0XG5cdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUsIE9wZXJhLCBXZWJraXRcblx0XHRcdFx0XHRcdC8vIFRPRE86IGlkZW50aWZ5IHZlcnNpb25zXG5cdFx0XHRcdFx0XHQvLyBnZXRFbGVtZW50QnlJZCBjYW4gbWF0Y2ggZWxlbWVudHMgYnkgbmFtZSBpbnN0ZWFkIG9mIElEXG5cdFx0XHRcdFx0XHRpZiAoIG5ld0NvbnRleHQgJiYgKCBlbGVtID0gbmV3Q29udGV4dC5nZXRFbGVtZW50QnlJZCggbSApICkgJiZcblx0XHRcdFx0XHRcdFx0Y29udGFpbnMoIGNvbnRleHQsIGVsZW0gKSAmJlxuXHRcdFx0XHRcdFx0XHRlbGVtLmlkID09PSBtICkge1xuXG5cdFx0XHRcdFx0XHRcdHJlc3VsdHMucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gVHlwZSBzZWxlY3RvclxuXHRcdFx0XHR9IGVsc2UgaWYgKCBtYXRjaFsgMiBdICkge1xuXHRcdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHNlbGVjdG9yICkgKTtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblxuXHRcdFx0XHQvLyBDbGFzcyBzZWxlY3RvclxuXHRcdFx0XHR9IGVsc2UgaWYgKCAoIG0gPSBtYXRjaFsgMyBdICkgJiYgc3VwcG9ydC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICYmXG5cdFx0XHRcdFx0Y29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICkge1xuXG5cdFx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBtICkgKTtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBUYWtlIGFkdmFudGFnZSBvZiBxdWVyeVNlbGVjdG9yQWxsXG5cdFx0XHRpZiAoIHN1cHBvcnQucXNhICYmXG5cdFx0XHRcdCFub25uYXRpdmVTZWxlY3RvckNhY2hlWyBzZWxlY3RvciArIFwiIFwiIF0gJiZcblx0XHRcdFx0KCAhcmJ1Z2d5UVNBIHx8ICFyYnVnZ3lRU0EudGVzdCggc2VsZWN0b3IgKSApICYmXG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgOCBvbmx5XG5cdFx0XHRcdC8vIEV4Y2x1ZGUgb2JqZWN0IGVsZW1lbnRzXG5cdFx0XHRcdCggbm9kZVR5cGUgIT09IDEgfHwgY29udGV4dC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSBcIm9iamVjdFwiICkgKSB7XG5cblx0XHRcdFx0bmV3U2VsZWN0b3IgPSBzZWxlY3Rvcjtcblx0XHRcdFx0bmV3Q29udGV4dCA9IGNvbnRleHQ7XG5cblx0XHRcdFx0Ly8gcVNBIGNvbnNpZGVycyBlbGVtZW50cyBvdXRzaWRlIGEgc2NvcGluZyByb290IHdoZW4gZXZhbHVhdGluZyBjaGlsZCBvclxuXHRcdFx0XHQvLyBkZXNjZW5kYW50IGNvbWJpbmF0b3JzLCB3aGljaCBpcyBub3Qgd2hhdCB3ZSB3YW50LlxuXHRcdFx0XHQvLyBJbiBzdWNoIGNhc2VzLCB3ZSB3b3JrIGFyb3VuZCB0aGUgYmVoYXZpb3IgYnkgcHJlZml4aW5nIGV2ZXJ5IHNlbGVjdG9yIGluIHRoZVxuXHRcdFx0XHQvLyBsaXN0IHdpdGggYW4gSUQgc2VsZWN0b3IgcmVmZXJlbmNpbmcgdGhlIHNjb3BlIGNvbnRleHQuXG5cdFx0XHRcdC8vIFRoZSB0ZWNobmlxdWUgaGFzIHRvIGJlIHVzZWQgYXMgd2VsbCB3aGVuIGEgbGVhZGluZyBjb21iaW5hdG9yIGlzIHVzZWRcblx0XHRcdFx0Ly8gYXMgc3VjaCBzZWxlY3RvcnMgYXJlIG5vdCByZWNvZ25pemVkIGJ5IHF1ZXJ5U2VsZWN0b3JBbGwuXG5cdFx0XHRcdC8vIFRoYW5rcyB0byBBbmRyZXcgRHVwb250IGZvciB0aGlzIHRlY2huaXF1ZS5cblx0XHRcdFx0aWYgKCBub2RlVHlwZSA9PT0gMSAmJlxuXHRcdFx0XHRcdCggcmRlc2NlbmQudGVzdCggc2VsZWN0b3IgKSB8fCByY29tYmluYXRvcnMudGVzdCggc2VsZWN0b3IgKSApICkge1xuXG5cdFx0XHRcdFx0Ly8gRXhwYW5kIGNvbnRleHQgZm9yIHNpYmxpbmcgc2VsZWN0b3JzXG5cdFx0XHRcdFx0bmV3Q29udGV4dCA9IHJzaWJsaW5nLnRlc3QoIHNlbGVjdG9yICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8XG5cdFx0XHRcdFx0XHRjb250ZXh0O1xuXG5cdFx0XHRcdFx0Ly8gV2UgY2FuIHVzZSA6c2NvcGUgaW5zdGVhZCBvZiB0aGUgSUQgaGFjayBpZiB0aGUgYnJvd3NlclxuXHRcdFx0XHRcdC8vIHN1cHBvcnRzIGl0ICYgaWYgd2UncmUgbm90IGNoYW5naW5nIHRoZSBjb250ZXh0LlxuXHRcdFx0XHRcdGlmICggbmV3Q29udGV4dCAhPT0gY29udGV4dCB8fCAhc3VwcG9ydC5zY29wZSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gQ2FwdHVyZSB0aGUgY29udGV4dCBJRCwgc2V0dGluZyBpdCBmaXJzdCBpZiBuZWNlc3Nhcnlcblx0XHRcdFx0XHRcdGlmICggKCBuaWQgPSBjb250ZXh0LmdldEF0dHJpYnV0ZSggXCJpZFwiICkgKSApIHtcblx0XHRcdFx0XHRcdFx0bmlkID0gbmlkLnJlcGxhY2UoIHJjc3Nlc2NhcGUsIGZjc3Nlc2NhcGUgKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRleHQuc2V0QXR0cmlidXRlKCBcImlkXCIsICggbmlkID0gZXhwYW5kbyApICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gUHJlZml4IGV2ZXJ5IHNlbGVjdG9yIGluIHRoZSBsaXN0XG5cdFx0XHRcdFx0Z3JvdXBzID0gdG9rZW5pemUoIHNlbGVjdG9yICk7XG5cdFx0XHRcdFx0aSA9IGdyb3Vwcy5sZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRncm91cHNbIGkgXSA9ICggbmlkID8gXCIjXCIgKyBuaWQgOiBcIjpzY29wZVwiICkgKyBcIiBcIiArXG5cdFx0XHRcdFx0XHRcdHRvU2VsZWN0b3IoIGdyb3Vwc1sgaSBdICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG5ld1NlbGVjdG9yID0gZ3JvdXBzLmpvaW4oIFwiLFwiICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsXG5cdFx0XHRcdFx0XHRuZXdDb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIG5ld1NlbGVjdG9yIClcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHR9IGNhdGNoICggcXNhRXJyb3IgKSB7XG5cdFx0XHRcdFx0bm9ubmF0aXZlU2VsZWN0b3JDYWNoZSggc2VsZWN0b3IsIHRydWUgKTtcblx0XHRcdFx0fSBmaW5hbGx5IHtcblx0XHRcdFx0XHRpZiAoIG5pZCA9PT0gZXhwYW5kbyApIHtcblx0XHRcdFx0XHRcdGNvbnRleHQucmVtb3ZlQXR0cmlidXRlKCBcImlkXCIgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBBbGwgb3RoZXJzXG5cdHJldHVybiBzZWxlY3QoIHNlbGVjdG9yLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApO1xufVxuXG4vKipcbiAqIENyZWF0ZSBrZXktdmFsdWUgY2FjaGVzIG9mIGxpbWl0ZWQgc2l6ZVxuICogQHJldHVybnMge2Z1bmN0aW9uKHN0cmluZywgb2JqZWN0KX0gUmV0dXJucyB0aGUgT2JqZWN0IGRhdGEgYWZ0ZXIgc3RvcmluZyBpdCBvbiBpdHNlbGYgd2l0aFxuICpcdHByb3BlcnR5IG5hbWUgdGhlIChzcGFjZS1zdWZmaXhlZCkgc3RyaW5nIGFuZCAoaWYgdGhlIGNhY2hlIGlzIGxhcmdlciB0aGFuIEV4cHIuY2FjaGVMZW5ndGgpXG4gKlx0ZGVsZXRpbmcgdGhlIG9sZGVzdCBlbnRyeVxuICovXG5mdW5jdGlvbiBjcmVhdGVDYWNoZSgpIHtcblx0dmFyIGtleXMgPSBbXTtcblxuXHRmdW5jdGlvbiBjYWNoZSgga2V5LCB2YWx1ZSApIHtcblxuXHRcdC8vIFVzZSAoa2V5ICsgXCIgXCIpIHRvIGF2b2lkIGNvbGxpc2lvbiB3aXRoIG5hdGl2ZSBwcm90b3R5cGUgcHJvcGVydGllcyAoc2VlIElzc3VlICMxNTcpXG5cdFx0aWYgKCBrZXlzLnB1c2goIGtleSArIFwiIFwiICkgPiBFeHByLmNhY2hlTGVuZ3RoICkge1xuXG5cdFx0XHQvLyBPbmx5IGtlZXAgdGhlIG1vc3QgcmVjZW50IGVudHJpZXNcblx0XHRcdGRlbGV0ZSBjYWNoZVsga2V5cy5zaGlmdCgpIF07XG5cdFx0fVxuXHRcdHJldHVybiAoIGNhY2hlWyBrZXkgKyBcIiBcIiBdID0gdmFsdWUgKTtcblx0fVxuXHRyZXR1cm4gY2FjaGU7XG59XG5cbi8qKlxuICogTWFyayBhIGZ1bmN0aW9uIGZvciBzcGVjaWFsIHVzZSBieSBTaXp6bGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBtYXJrXG4gKi9cbmZ1bmN0aW9uIG1hcmtGdW5jdGlvbiggZm4gKSB7XG5cdGZuWyBleHBhbmRvIF0gPSB0cnVlO1xuXHRyZXR1cm4gZm47XG59XG5cbi8qKlxuICogU3VwcG9ydCB0ZXN0aW5nIHVzaW5nIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFBhc3NlZCB0aGUgY3JlYXRlZCBlbGVtZW50IGFuZCByZXR1cm5zIGEgYm9vbGVhbiByZXN1bHRcbiAqL1xuZnVuY3Rpb24gYXNzZXJ0KCBmbiApIHtcblx0dmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJmaWVsZHNldFwiICk7XG5cblx0dHJ5IHtcblx0XHRyZXR1cm4gISFmbiggZWwgKTtcblx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9IGZpbmFsbHkge1xuXG5cdFx0Ly8gUmVtb3ZlIGZyb20gaXRzIHBhcmVudCBieSBkZWZhdWx0XG5cdFx0aWYgKCBlbC5wYXJlbnROb2RlICkge1xuXHRcdFx0ZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggZWwgKTtcblx0XHR9XG5cblx0XHQvLyByZWxlYXNlIG1lbW9yeSBpbiBJRVxuXHRcdGVsID0gbnVsbDtcblx0fVxufVxuXG4vKipcbiAqIEFkZHMgdGhlIHNhbWUgaGFuZGxlciBmb3IgYWxsIG9mIHRoZSBzcGVjaWZpZWQgYXR0cnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBhdHRycyBQaXBlLXNlcGFyYXRlZCBsaXN0IG9mIGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXIgVGhlIG1ldGhvZCB0aGF0IHdpbGwgYmUgYXBwbGllZFxuICovXG5mdW5jdGlvbiBhZGRIYW5kbGUoIGF0dHJzLCBoYW5kbGVyICkge1xuXHR2YXIgYXJyID0gYXR0cnMuc3BsaXQoIFwifFwiICksXG5cdFx0aSA9IGFyci5sZW5ndGg7XG5cblx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0RXhwci5hdHRySGFuZGxlWyBhcnJbIGkgXSBdID0gaGFuZGxlcjtcblx0fVxufVxuXG4vKipcbiAqIENoZWNrcyBkb2N1bWVudCBvcmRlciBvZiB0d28gc2libGluZ3NcbiAqIEBwYXJhbSB7RWxlbWVudH0gYVxuICogQHBhcmFtIHtFbGVtZW50fSBiXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIGxlc3MgdGhhbiAwIGlmIGEgcHJlY2VkZXMgYiwgZ3JlYXRlciB0aGFuIDAgaWYgYSBmb2xsb3dzIGJcbiAqL1xuZnVuY3Rpb24gc2libGluZ0NoZWNrKCBhLCBiICkge1xuXHR2YXIgY3VyID0gYiAmJiBhLFxuXHRcdGRpZmYgPSBjdXIgJiYgYS5ub2RlVHlwZSA9PT0gMSAmJiBiLm5vZGVUeXBlID09PSAxICYmXG5cdFx0XHRhLnNvdXJjZUluZGV4IC0gYi5zb3VyY2VJbmRleDtcblxuXHQvLyBVc2UgSUUgc291cmNlSW5kZXggaWYgYXZhaWxhYmxlIG9uIGJvdGggbm9kZXNcblx0aWYgKCBkaWZmICkge1xuXHRcdHJldHVybiBkaWZmO1xuXHR9XG5cblx0Ly8gQ2hlY2sgaWYgYiBmb2xsb3dzIGFcblx0aWYgKCBjdXIgKSB7XG5cdFx0d2hpbGUgKCAoIGN1ciA9IGN1ci5uZXh0U2libGluZyApICkge1xuXHRcdFx0aWYgKCBjdXIgPT09IGIgKSB7XG5cdFx0XHRcdHJldHVybiAtMTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gYSA/IDEgOiAtMTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIGlucHV0IHR5cGVzXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICovXG5mdW5jdGlvbiBjcmVhdGVJbnB1dFBzZXVkbyggdHlwZSApIHtcblx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdHJldHVybiBuYW1lID09PSBcImlucHV0XCIgJiYgZWxlbS50eXBlID09PSB0eXBlO1xuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgYnV0dG9uc1xuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQnV0dG9uUHNldWRvKCB0eXBlICkge1xuXHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0dmFyIG5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0cmV0dXJuICggbmFtZSA9PT0gXCJpbnB1dFwiIHx8IG5hbWUgPT09IFwiYnV0dG9uXCIgKSAmJiBlbGVtLnR5cGUgPT09IHR5cGU7XG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIHVzZSBpbiBwc2V1ZG9zIGZvciA6ZW5hYmxlZC86ZGlzYWJsZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZGlzYWJsZWQgdHJ1ZSBmb3IgOmRpc2FibGVkOyBmYWxzZSBmb3IgOmVuYWJsZWRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlRGlzYWJsZWRQc2V1ZG8oIGRpc2FibGVkICkge1xuXG5cdC8vIEtub3duIDpkaXNhYmxlZCBmYWxzZSBwb3NpdGl2ZXM6IGZpZWxkc2V0W2Rpc2FibGVkXSA+IGxlZ2VuZDpudGgtb2YtdHlwZShuKzIpIDpjYW4tZGlzYWJsZVxuXHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHQvLyBPbmx5IGNlcnRhaW4gZWxlbWVudHMgY2FuIG1hdGNoIDplbmFibGVkIG9yIDpkaXNhYmxlZFxuXHRcdC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3NjcmlwdGluZy5odG1sI3NlbGVjdG9yLWVuYWJsZWRcblx0XHQvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zY3JpcHRpbmcuaHRtbCNzZWxlY3Rvci1kaXNhYmxlZFxuXHRcdGlmICggXCJmb3JtXCIgaW4gZWxlbSApIHtcblxuXHRcdFx0Ly8gQ2hlY2sgZm9yIGluaGVyaXRlZCBkaXNhYmxlZG5lc3Mgb24gcmVsZXZhbnQgbm9uLWRpc2FibGVkIGVsZW1lbnRzOlxuXHRcdFx0Ly8gKiBsaXN0ZWQgZm9ybS1hc3NvY2lhdGVkIGVsZW1lbnRzIGluIGEgZGlzYWJsZWQgZmllbGRzZXRcblx0XHRcdC8vICAgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZm9ybXMuaHRtbCNjYXRlZ29yeS1saXN0ZWRcblx0XHRcdC8vICAgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZm9ybXMuaHRtbCNjb25jZXB0LWZlLWRpc2FibGVkXG5cdFx0XHQvLyAqIG9wdGlvbiBlbGVtZW50cyBpbiBhIGRpc2FibGVkIG9wdGdyb3VwXG5cdFx0XHQvLyAgIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2Zvcm1zLmh0bWwjY29uY2VwdC1vcHRpb24tZGlzYWJsZWRcblx0XHRcdC8vIEFsbCBzdWNoIGVsZW1lbnRzIGhhdmUgYSBcImZvcm1cIiBwcm9wZXJ0eS5cblx0XHRcdGlmICggZWxlbS5wYXJlbnROb2RlICYmIGVsZW0uZGlzYWJsZWQgPT09IGZhbHNlICkge1xuXG5cdFx0XHRcdC8vIE9wdGlvbiBlbGVtZW50cyBkZWZlciB0byBhIHBhcmVudCBvcHRncm91cCBpZiBwcmVzZW50XG5cdFx0XHRcdGlmICggXCJsYWJlbFwiIGluIGVsZW0gKSB7XG5cdFx0XHRcdFx0aWYgKCBcImxhYmVsXCIgaW4gZWxlbS5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW0ucGFyZW50Tm9kZS5kaXNhYmxlZCA9PT0gZGlzYWJsZWQ7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtLmRpc2FibGVkID09PSBkaXNhYmxlZDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA2IC0gMTFcblx0XHRcdFx0Ly8gVXNlIHRoZSBpc0Rpc2FibGVkIHNob3J0Y3V0IHByb3BlcnR5IHRvIGNoZWNrIGZvciBkaXNhYmxlZCBmaWVsZHNldCBhbmNlc3RvcnNcblx0XHRcdFx0cmV0dXJuIGVsZW0uaXNEaXNhYmxlZCA9PT0gZGlzYWJsZWQgfHxcblxuXHRcdFx0XHRcdC8vIFdoZXJlIHRoZXJlIGlzIG5vIGlzRGlzYWJsZWQsIGNoZWNrIG1hbnVhbGx5XG5cdFx0XHRcdFx0LyoganNoaW50IC1XMDE4ICovXG5cdFx0XHRcdFx0ZWxlbS5pc0Rpc2FibGVkICE9PSAhZGlzYWJsZWQgJiZcblx0XHRcdFx0XHRpbkRpc2FibGVkRmllbGRzZXQoIGVsZW0gKSA9PT0gZGlzYWJsZWQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBlbGVtLmRpc2FibGVkID09PSBkaXNhYmxlZDtcblxuXHRcdC8vIFRyeSB0byB3aW5ub3cgb3V0IGVsZW1lbnRzIHRoYXQgY2FuJ3QgYmUgZGlzYWJsZWQgYmVmb3JlIHRydXN0aW5nIHRoZSBkaXNhYmxlZCBwcm9wZXJ0eS5cblx0XHQvLyBTb21lIHZpY3RpbXMgZ2V0IGNhdWdodCBpbiBvdXIgbmV0IChsYWJlbCwgbGVnZW5kLCBtZW51LCB0cmFjayksIGJ1dCBpdCBzaG91bGRuJ3Rcblx0XHQvLyBldmVuIGV4aXN0IG9uIHRoZW0sIGxldCBhbG9uZSBoYXZlIGEgYm9vbGVhbiB2YWx1ZS5cblx0XHR9IGVsc2UgaWYgKCBcImxhYmVsXCIgaW4gZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtLmRpc2FibGVkID09PSBkaXNhYmxlZDtcblx0XHR9XG5cblx0XHQvLyBSZW1haW5pbmcgZWxlbWVudHMgYXJlIG5laXRoZXIgOmVuYWJsZWQgbm9yIDpkaXNhYmxlZFxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIHBvc2l0aW9uYWxzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICovXG5mdW5jdGlvbiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKCBmbiApIHtcblx0cmV0dXJuIG1hcmtGdW5jdGlvbiggZnVuY3Rpb24oIGFyZ3VtZW50ICkge1xuXHRcdGFyZ3VtZW50ID0gK2FyZ3VtZW50O1xuXHRcdHJldHVybiBtYXJrRnVuY3Rpb24oIGZ1bmN0aW9uKCBzZWVkLCBtYXRjaGVzICkge1xuXHRcdFx0dmFyIGosXG5cdFx0XHRcdG1hdGNoSW5kZXhlcyA9IGZuKCBbXSwgc2VlZC5sZW5ndGgsIGFyZ3VtZW50ICksXG5cdFx0XHRcdGkgPSBtYXRjaEluZGV4ZXMubGVuZ3RoO1xuXG5cdFx0XHQvLyBNYXRjaCBlbGVtZW50cyBmb3VuZCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4ZXNcblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRpZiAoIHNlZWRbICggaiA9IG1hdGNoSW5kZXhlc1sgaSBdICkgXSApIHtcblx0XHRcdFx0XHRzZWVkWyBqIF0gPSAhKCBtYXRjaGVzWyBqIF0gPSBzZWVkWyBqIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSApO1xufVxuXG4vKipcbiAqIENoZWNrcyBhIG5vZGUgZm9yIHZhbGlkaXR5IGFzIGEgU2l6emxlIGNvbnRleHRcbiAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3Q9fSBjb250ZXh0XG4gKiBAcmV0dXJucyB7RWxlbWVudHxPYmplY3R8Qm9vbGVhbn0gVGhlIGlucHV0IG5vZGUgaWYgYWNjZXB0YWJsZSwgb3RoZXJ3aXNlIGEgZmFsc3kgdmFsdWVcbiAqL1xuZnVuY3Rpb24gdGVzdENvbnRleHQoIGNvbnRleHQgKSB7XG5cdHJldHVybiBjb250ZXh0ICYmIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnRleHQ7XG59XG5cbi8vIEV4cG9zZSBzdXBwb3J0IHZhcnMgZm9yIGNvbnZlbmllbmNlXG5zdXBwb3J0ID0gU2l6emxlLnN1cHBvcnQgPSB7fTtcblxuLyoqXG4gKiBEZXRlY3RzIFhNTCBub2Rlc1xuICogQHBhcmFtIHtFbGVtZW50fE9iamVjdH0gZWxlbSBBbiBlbGVtZW50IG9yIGEgZG9jdW1lbnRcbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmZiBlbGVtIGlzIGEgbm9uLUhUTUwgWE1MIG5vZGVcbiAqL1xuaXNYTUwgPSBTaXp6bGUuaXNYTUwgPSBmdW5jdGlvbiggZWxlbSApIHtcblx0dmFyIG5hbWVzcGFjZSA9IGVsZW0gJiYgZWxlbS5uYW1lc3BhY2VVUkksXG5cdFx0ZG9jRWxlbSA9IGVsZW0gJiYgKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSApLmRvY3VtZW50RWxlbWVudDtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PThcblx0Ly8gQXNzdW1lIEhUTUwgd2hlbiBkb2N1bWVudEVsZW1lbnQgZG9lc24ndCB5ZXQgZXhpc3QsIHN1Y2ggYXMgaW5zaWRlIGxvYWRpbmcgaWZyYW1lc1xuXHQvLyBodHRwczovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvNDgzM1xuXHRyZXR1cm4gIXJodG1sLnRlc3QoIG5hbWVzcGFjZSB8fCBkb2NFbGVtICYmIGRvY0VsZW0ubm9kZU5hbWUgfHwgXCJIVE1MXCIgKTtcbn07XG5cbi8qKlxuICogU2V0cyBkb2N1bWVudC1yZWxhdGVkIHZhcmlhYmxlcyBvbmNlIGJhc2VkIG9uIHRoZSBjdXJyZW50IGRvY3VtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0fSBbZG9jXSBBbiBlbGVtZW50IG9yIGRvY3VtZW50IG9iamVjdCB0byB1c2UgdG8gc2V0IHRoZSBkb2N1bWVudFxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY3VycmVudCBkb2N1bWVudFxuICovXG5zZXREb2N1bWVudCA9IFNpenpsZS5zZXREb2N1bWVudCA9IGZ1bmN0aW9uKCBub2RlICkge1xuXHR2YXIgaGFzQ29tcGFyZSwgc3ViV2luZG93LFxuXHRcdGRvYyA9IG5vZGUgPyBub2RlLm93bmVyRG9jdW1lbnQgfHwgbm9kZSA6IHByZWZlcnJlZERvYztcblxuXHQvLyBSZXR1cm4gZWFybHkgaWYgZG9jIGlzIGludmFsaWQgb3IgYWxyZWFkeSBzZWxlY3RlZFxuXHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTcgLSAxOCtcblx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdC8vIHR3byBkb2N1bWVudHM7IHNoYWxsb3cgY29tcGFyaXNvbnMgd29yay5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXHRpZiAoIGRvYyA9PSBkb2N1bWVudCB8fCBkb2Mubm9kZVR5cGUgIT09IDkgfHwgIWRvYy5kb2N1bWVudEVsZW1lbnQgKSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50O1xuXHR9XG5cblx0Ly8gVXBkYXRlIGdsb2JhbCB2YXJpYWJsZXNcblx0ZG9jdW1lbnQgPSBkb2M7XG5cdGRvY0VsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cdGRvY3VtZW50SXNIVE1MID0gIWlzWE1MKCBkb2N1bWVudCApO1xuXG5cdC8vIFN1cHBvcnQ6IElFIDkgLSAxMSssIEVkZ2UgMTIgLSAxOCtcblx0Ly8gQWNjZXNzaW5nIGlmcmFtZSBkb2N1bWVudHMgYWZ0ZXIgdW5sb2FkIHRocm93cyBcInBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3JzIChqUXVlcnkgIzEzOTM2KVxuXHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTcgLSAxOCtcblx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdC8vIHR3byBkb2N1bWVudHM7IHNoYWxsb3cgY29tcGFyaXNvbnMgd29yay5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXHRpZiAoIHByZWZlcnJlZERvYyAhPSBkb2N1bWVudCAmJlxuXHRcdCggc3ViV2luZG93ID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcgKSAmJiBzdWJXaW5kb3cudG9wICE9PSBzdWJXaW5kb3cgKSB7XG5cblx0XHQvLyBTdXBwb3J0OiBJRSAxMSwgRWRnZVxuXHRcdGlmICggc3ViV2luZG93LmFkZEV2ZW50TGlzdGVuZXIgKSB7XG5cdFx0XHRzdWJXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggXCJ1bmxvYWRcIiwgdW5sb2FkSGFuZGxlciwgZmFsc2UgKTtcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDkgLSAxMCBvbmx5XG5cdFx0fSBlbHNlIGlmICggc3ViV2luZG93LmF0dGFjaEV2ZW50ICkge1xuXHRcdFx0c3ViV2luZG93LmF0dGFjaEV2ZW50KCBcIm9udW5sb2FkXCIsIHVubG9hZEhhbmRsZXIgKTtcblx0XHR9XG5cdH1cblxuXHQvLyBTdXBwb3J0OiBJRSA4IC0gMTErLCBFZGdlIDEyIC0gMTgrLCBDaHJvbWUgPD0xNiAtIDI1IG9ubHksIEZpcmVmb3ggPD0zLjYgLSAzMSBvbmx5LFxuXHQvLyBTYWZhcmkgNCAtIDUgb25seSwgT3BlcmEgPD0xMS42IC0gMTIueCBvbmx5XG5cdC8vIElFL0VkZ2UgJiBvbGRlciBicm93c2VycyBkb24ndCBzdXBwb3J0IHRoZSA6c2NvcGUgcHNldWRvLWNsYXNzLlxuXHQvLyBTdXBwb3J0OiBTYWZhcmkgNi4wIG9ubHlcblx0Ly8gU2FmYXJpIDYuMCBzdXBwb3J0cyA6c2NvcGUgYnV0IGl0J3MgYW4gYWxpYXMgb2YgOnJvb3QgdGhlcmUuXG5cdHN1cHBvcnQuc2NvcGUgPSBhc3NlcnQoIGZ1bmN0aW9uKCBlbCApIHtcblx0XHRkb2NFbGVtLmFwcGVuZENoaWxkKCBlbCApLmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkgKTtcblx0XHRyZXR1cm4gdHlwZW9mIGVsLnF1ZXJ5U2VsZWN0b3JBbGwgIT09IFwidW5kZWZpbmVkXCIgJiZcblx0XHRcdCFlbC5xdWVyeVNlbGVjdG9yQWxsKCBcIjpzY29wZSBmaWVsZHNldCBkaXZcIiApLmxlbmd0aDtcblx0fSApO1xuXG5cdC8qIEF0dHJpYnV0ZXNcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8vIFN1cHBvcnQ6IElFPDhcblx0Ly8gVmVyaWZ5IHRoYXQgZ2V0QXR0cmlidXRlIHJlYWxseSByZXR1cm5zIGF0dHJpYnV0ZXMgYW5kIG5vdCBwcm9wZXJ0aWVzXG5cdC8vIChleGNlcHRpbmcgSUU4IGJvb2xlYW5zKVxuXHRzdXBwb3J0LmF0dHJpYnV0ZXMgPSBhc3NlcnQoIGZ1bmN0aW9uKCBlbCApIHtcblx0XHRlbC5jbGFzc05hbWUgPSBcImlcIjtcblx0XHRyZXR1cm4gIWVsLmdldEF0dHJpYnV0ZSggXCJjbGFzc05hbWVcIiApO1xuXHR9ICk7XG5cblx0LyogZ2V0RWxlbWVudChzKUJ5KlxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gQ2hlY2sgaWYgZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpIHJldHVybnMgb25seSBlbGVtZW50c1xuXHRzdXBwb3J0LmdldEVsZW1lbnRzQnlUYWdOYW1lID0gYXNzZXJ0KCBmdW5jdGlvbiggZWwgKSB7XG5cdFx0ZWwuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoIFwiXCIgKSApO1xuXHRcdHJldHVybiAhZWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwiKlwiICkubGVuZ3RoO1xuXHR9ICk7XG5cblx0Ly8gU3VwcG9ydDogSUU8OVxuXHRzdXBwb3J0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgPSBybmF0aXZlLnRlc3QoIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgKTtcblxuXHQvLyBTdXBwb3J0OiBJRTwxMFxuXHQvLyBDaGVjayBpZiBnZXRFbGVtZW50QnlJZCByZXR1cm5zIGVsZW1lbnRzIGJ5IG5hbWVcblx0Ly8gVGhlIGJyb2tlbiBnZXRFbGVtZW50QnlJZCBtZXRob2RzIGRvbid0IHBpY2sgdXAgcHJvZ3JhbW1hdGljYWxseS1zZXQgbmFtZXMsXG5cdC8vIHNvIHVzZSBhIHJvdW5kYWJvdXQgZ2V0RWxlbWVudHNCeU5hbWUgdGVzdFxuXHRzdXBwb3J0LmdldEJ5SWQgPSBhc3NlcnQoIGZ1bmN0aW9uKCBlbCApIHtcblx0XHRkb2NFbGVtLmFwcGVuZENoaWxkKCBlbCApLmlkID0gZXhwYW5kbztcblx0XHRyZXR1cm4gIWRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lIHx8ICFkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSggZXhwYW5kbyApLmxlbmd0aDtcblx0fSApO1xuXG5cdC8vIElEIGZpbHRlciBhbmQgZmluZFxuXHRpZiAoIHN1cHBvcnQuZ2V0QnlJZCApIHtcblx0XHRFeHByLmZpbHRlclsgXCJJRFwiIF0gPSBmdW5jdGlvbiggaWQgKSB7XG5cdFx0XHR2YXIgYXR0cklkID0gaWQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0cmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKCBcImlkXCIgKSA9PT0gYXR0cklkO1xuXHRcdFx0fTtcblx0XHR9O1xuXHRcdEV4cHIuZmluZFsgXCJJRFwiIF0gPSBmdW5jdGlvbiggaWQsIGNvbnRleHQgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRCeUlkICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50SXNIVE1MICkge1xuXHRcdFx0XHR2YXIgZWxlbSA9IGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIGlkICk7XG5cdFx0XHRcdHJldHVybiBlbGVtID8gWyBlbGVtIF0gOiBbXTtcblx0XHRcdH1cblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdEV4cHIuZmlsdGVyWyBcIklEXCIgXSA9ICBmdW5jdGlvbiggaWQgKSB7XG5cdFx0XHR2YXIgYXR0cklkID0gaWQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0dmFyIG5vZGUgPSB0eXBlb2YgZWxlbS5nZXRBdHRyaWJ1dGVOb2RlICE9PSBcInVuZGVmaW5lZFwiICYmXG5cdFx0XHRcdFx0ZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKCBcImlkXCIgKTtcblx0XHRcdFx0cmV0dXJuIG5vZGUgJiYgbm9kZS52YWx1ZSA9PT0gYXR0cklkO1xuXHRcdFx0fTtcblx0XHR9O1xuXG5cdFx0Ly8gU3VwcG9ydDogSUUgNiAtIDcgb25seVxuXHRcdC8vIGdldEVsZW1lbnRCeUlkIGlzIG5vdCByZWxpYWJsZSBhcyBhIGZpbmQgc2hvcnRjdXRcblx0XHRFeHByLmZpbmRbIFwiSURcIiBdID0gZnVuY3Rpb24oIGlkLCBjb250ZXh0ICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50QnlJZCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudElzSFRNTCApIHtcblx0XHRcdFx0dmFyIG5vZGUsIGksIGVsZW1zLFxuXHRcdFx0XHRcdGVsZW0gPSBjb250ZXh0LmdldEVsZW1lbnRCeUlkKCBpZCApO1xuXG5cdFx0XHRcdGlmICggZWxlbSApIHtcblxuXHRcdFx0XHRcdC8vIFZlcmlmeSB0aGUgaWQgYXR0cmlidXRlXG5cdFx0XHRcdFx0bm9kZSA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZSggXCJpZFwiICk7XG5cdFx0XHRcdFx0aWYgKCBub2RlICYmIG5vZGUudmFsdWUgPT09IGlkICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIFsgZWxlbSBdO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIEZhbGwgYmFjayBvbiBnZXRFbGVtZW50c0J5TmFtZVxuXHRcdFx0XHRcdGVsZW1zID0gY29udGV4dC5nZXRFbGVtZW50c0J5TmFtZSggaWQgKTtcblx0XHRcdFx0XHRpID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoICggZWxlbSA9IGVsZW1zWyBpKysgXSApICkge1xuXHRcdFx0XHRcdFx0bm9kZSA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZSggXCJpZFwiICk7XG5cdFx0XHRcdFx0XHRpZiAoIG5vZGUgJiYgbm9kZS52YWx1ZSA9PT0gaWQgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBbIGVsZW0gXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG5cdC8vIFRhZ1xuXHRFeHByLmZpbmRbIFwiVEFHXCIgXSA9IHN1cHBvcnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgP1xuXHRcdGZ1bmN0aW9uKCB0YWcsIGNvbnRleHQgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lICE9PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggdGFnICk7XG5cblx0XHRcdC8vIERvY3VtZW50RnJhZ21lbnQgbm9kZXMgZG9uJ3QgaGF2ZSBnRUJUTlxuXHRcdFx0fSBlbHNlIGlmICggc3VwcG9ydC5xc2EgKSB7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIHRhZyApO1xuXHRcdFx0fVxuXHRcdH0gOlxuXG5cdFx0ZnVuY3Rpb24oIHRhZywgY29udGV4dCApIHtcblx0XHRcdHZhciBlbGVtLFxuXHRcdFx0XHR0bXAgPSBbXSxcblx0XHRcdFx0aSA9IDAsXG5cblx0XHRcdFx0Ly8gQnkgaGFwcHkgY29pbmNpZGVuY2UsIGEgKGJyb2tlbikgZ0VCVE4gYXBwZWFycyBvbiBEb2N1bWVudEZyYWdtZW50IG5vZGVzIHRvb1xuXHRcdFx0XHRyZXN1bHRzID0gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggdGFnICk7XG5cblx0XHRcdC8vIEZpbHRlciBvdXQgcG9zc2libGUgY29tbWVudHNcblx0XHRcdGlmICggdGFnID09PSBcIipcIiApIHtcblx0XHRcdFx0d2hpbGUgKCAoIGVsZW0gPSByZXN1bHRzWyBpKysgXSApICkge1xuXHRcdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdFx0XHRcdHRtcC5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRtcDtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdH07XG5cblx0Ly8gQ2xhc3Ncblx0RXhwci5maW5kWyBcIkNMQVNTXCIgXSA9IHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSAmJiBmdW5jdGlvbiggY2xhc3NOYW1lLCBjb250ZXh0ICkge1xuXHRcdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudElzSFRNTCApIHtcblx0XHRcdHJldHVybiBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoIGNsYXNzTmFtZSApO1xuXHRcdH1cblx0fTtcblxuXHQvKiBRU0EvbWF0Y2hlc1NlbGVjdG9yXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXHQvLyBRU0EgYW5kIG1hdGNoZXNTZWxlY3RvciBzdXBwb3J0XG5cblx0Ly8gbWF0Y2hlc1NlbGVjdG9yKDphY3RpdmUpIHJlcG9ydHMgZmFsc2Ugd2hlbiB0cnVlIChJRTkvT3BlcmEgMTEuNSlcblx0cmJ1Z2d5TWF0Y2hlcyA9IFtdO1xuXG5cdC8vIHFTYSg6Zm9jdXMpIHJlcG9ydHMgZmFsc2Ugd2hlbiB0cnVlIChDaHJvbWUgMjEpXG5cdC8vIFdlIGFsbG93IHRoaXMgYmVjYXVzZSBvZiBhIGJ1ZyBpbiBJRTgvOSB0aGF0IHRocm93cyBhbiBlcnJvclxuXHQvLyB3aGVuZXZlciBgZG9jdW1lbnQuYWN0aXZlRWxlbWVudGAgaXMgYWNjZXNzZWQgb24gYW4gaWZyYW1lXG5cdC8vIFNvLCB3ZSBhbGxvdyA6Zm9jdXMgdG8gcGFzcyB0aHJvdWdoIFFTQSBhbGwgdGhlIHRpbWUgdG8gYXZvaWQgdGhlIElFIGVycm9yXG5cdC8vIFNlZSBodHRwczovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTMzNzhcblx0cmJ1Z2d5UVNBID0gW107XG5cblx0aWYgKCAoIHN1cHBvcnQucXNhID0gcm5hdGl2ZS50ZXN0KCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsICkgKSApIHtcblxuXHRcdC8vIEJ1aWxkIFFTQSByZWdleFxuXHRcdC8vIFJlZ2V4IHN0cmF0ZWd5IGFkb3B0ZWQgZnJvbSBEaWVnbyBQZXJpbmlcblx0XHRhc3NlcnQoIGZ1bmN0aW9uKCBlbCApIHtcblxuXHRcdFx0dmFyIGlucHV0O1xuXG5cdFx0XHQvLyBTZWxlY3QgaXMgc2V0IHRvIGVtcHR5IHN0cmluZyBvbiBwdXJwb3NlXG5cdFx0XHQvLyBUaGlzIGlzIHRvIHRlc3QgSUUncyB0cmVhdG1lbnQgb2Ygbm90IGV4cGxpY2l0bHlcblx0XHRcdC8vIHNldHRpbmcgYSBib29sZWFuIGNvbnRlbnQgYXR0cmlidXRlLFxuXHRcdFx0Ly8gc2luY2UgaXRzIHByZXNlbmNlIHNob3VsZCBiZSBlbm91Z2hcblx0XHRcdC8vIGh0dHBzOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMjM1OVxuXHRcdFx0ZG9jRWxlbS5hcHBlbmRDaGlsZCggZWwgKS5pbm5lckhUTUwgPSBcIjxhIGlkPSdcIiArIGV4cGFuZG8gKyBcIic+PC9hPlwiICtcblx0XHRcdFx0XCI8c2VsZWN0IGlkPSdcIiArIGV4cGFuZG8gKyBcIi1cXHJcXFxcJyBtc2FsbG93Y2FwdHVyZT0nJz5cIiArXG5cdFx0XHRcdFwiPG9wdGlvbiBzZWxlY3RlZD0nJz48L29wdGlvbj48L3NlbGVjdD5cIjtcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU4LCBPcGVyYSAxMS0xMi4xNlxuXHRcdFx0Ly8gTm90aGluZyBzaG91bGQgYmUgc2VsZWN0ZWQgd2hlbiBlbXB0eSBzdHJpbmdzIGZvbGxvdyBePSBvciAkPSBvciAqPVxuXHRcdFx0Ly8gVGhlIHRlc3QgYXR0cmlidXRlIG11c3QgYmUgdW5rbm93biBpbiBPcGVyYSBidXQgXCJzYWZlXCIgZm9yIFdpblJUXG5cdFx0XHQvLyBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL2hoNDY1Mzg4LmFzcHgjYXR0cmlidXRlX3NlY3Rpb25cblx0XHRcdGlmICggZWwucXVlcnlTZWxlY3RvckFsbCggXCJbbXNhbGxvd2NhcHR1cmVePScnXVwiICkubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCJbKl4kXT1cIiArIHdoaXRlc3BhY2UgKyBcIiooPzonJ3xcXFwiXFxcIilcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRThcblx0XHRcdC8vIEJvb2xlYW4gYXR0cmlidXRlcyBhbmQgXCJ2YWx1ZVwiIGFyZSBub3QgdHJlYXRlZCBjb3JyZWN0bHlcblx0XHRcdGlmICggIWVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiW3NlbGVjdGVkXVwiICkubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKig/OnZhbHVlfFwiICsgYm9vbGVhbnMgKyBcIilcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBDaHJvbWU8MjksIEFuZHJvaWQ8NC40LCBTYWZhcmk8Ny4wKywgaU9TPDcuMCssIFBoYW50b21KUzwxLjkuOCtcblx0XHRcdGlmICggIWVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiW2lkfj1cIiArIGV4cGFuZG8gKyBcIi1dXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIn49XCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogSUUgMTErLCBFZGdlIDE1IC0gMTgrXG5cdFx0XHQvLyBJRSAxMS9FZGdlIGRvbid0IGZpbmQgZWxlbWVudHMgb24gYSBgW25hbWU9JyddYCBxdWVyeSBpbiBzb21lIGNhc2VzLlxuXHRcdFx0Ly8gQWRkaW5nIGEgdGVtcG9yYXJ5IGF0dHJpYnV0ZSB0byB0aGUgZG9jdW1lbnQgYmVmb3JlIHRoZSBzZWxlY3Rpb24gd29ya3Ncblx0XHRcdC8vIGFyb3VuZCB0aGUgaXNzdWUuXG5cdFx0XHQvLyBJbnRlcmVzdGluZ2x5LCBJRSAxMCAmIG9sZGVyIGRvbid0IHNlZW0gdG8gaGF2ZSB0aGUgaXNzdWUuXG5cdFx0XHRpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiaW5wdXRcIiApO1xuXHRcdFx0aW5wdXQuc2V0QXR0cmlidXRlKCBcIm5hbWVcIiwgXCJcIiApO1xuXHRcdFx0ZWwuYXBwZW5kQ2hpbGQoIGlucHV0ICk7XG5cdFx0XHRpZiAoICFlbC5xdWVyeVNlbGVjdG9yQWxsKCBcIltuYW1lPScnXVwiICkubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKm5hbWVcIiArIHdoaXRlc3BhY2UgKyBcIio9XCIgK1xuXHRcdFx0XHRcdHdoaXRlc3BhY2UgKyBcIiooPzonJ3xcXFwiXFxcIilcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBXZWJraXQvT3BlcmEgLSA6Y2hlY2tlZCBzaG91bGQgcmV0dXJuIHNlbGVjdGVkIG9wdGlvbiBlbGVtZW50c1xuXHRcdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAxMS9SRUMtY3NzMy1zZWxlY3RvcnMtMjAxMTA5MjkvI2NoZWNrZWRcblx0XHRcdC8vIElFOCB0aHJvd3MgZXJyb3IgaGVyZSBhbmQgd2lsbCBub3Qgc2VlIGxhdGVyIHRlc3RzXG5cdFx0XHRpZiAoICFlbC5xdWVyeVNlbGVjdG9yQWxsKCBcIjpjaGVja2VkXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIjpjaGVja2VkXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogU2FmYXJpIDgrLCBpT1MgOCtcblx0XHRcdC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzY4NTFcblx0XHRcdC8vIEluLXBhZ2UgYHNlbGVjdG9yI2lkIHNpYmxpbmctY29tYmluYXRvciBzZWxlY3RvcmAgZmFpbHNcblx0XHRcdGlmICggIWVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiYSNcIiArIGV4cGFuZG8gKyBcIisqXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIi4jLitbK35dXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogRmlyZWZveCA8PTMuNiAtIDUgb25seVxuXHRcdFx0Ly8gT2xkIEZpcmVmb3ggZG9lc24ndCB0aHJvdyBvbiBhIGJhZGx5LWVzY2FwZWQgaWRlbnRpZmllci5cblx0XHRcdGVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiXFxcXFxcZlwiICk7XG5cdFx0XHRyYnVnZ3lRU0EucHVzaCggXCJbXFxcXHJcXFxcblxcXFxmXVwiICk7XG5cdFx0fSApO1xuXG5cdFx0YXNzZXJ0KCBmdW5jdGlvbiggZWwgKSB7XG5cdFx0XHRlbC5pbm5lckhUTUwgPSBcIjxhIGhyZWY9JycgZGlzYWJsZWQ9J2Rpc2FibGVkJz48L2E+XCIgK1xuXHRcdFx0XHRcIjxzZWxlY3QgZGlzYWJsZWQ9J2Rpc2FibGVkJz48b3B0aW9uLz48L3NlbGVjdD5cIjtcblxuXHRcdFx0Ly8gU3VwcG9ydDogV2luZG93cyA4IE5hdGl2ZSBBcHBzXG5cdFx0XHQvLyBUaGUgdHlwZSBhbmQgbmFtZSBhdHRyaWJ1dGVzIGFyZSByZXN0cmljdGVkIGR1cmluZyAuaW5uZXJIVE1MIGFzc2lnbm1lbnRcblx0XHRcdHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiaW5wdXRcIiApO1xuXHRcdFx0aW5wdXQuc2V0QXR0cmlidXRlKCBcInR5cGVcIiwgXCJoaWRkZW5cIiApO1xuXHRcdFx0ZWwuYXBwZW5kQ2hpbGQoIGlucHV0ICkuc2V0QXR0cmlidXRlKCBcIm5hbWVcIiwgXCJEXCIgKTtcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU4XG5cdFx0XHQvLyBFbmZvcmNlIGNhc2Utc2Vuc2l0aXZpdHkgb2YgbmFtZSBhdHRyaWJ1dGVcblx0XHRcdGlmICggZWwucXVlcnlTZWxlY3RvckFsbCggXCJbbmFtZT1kXVwiICkubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCJuYW1lXCIgKyB3aGl0ZXNwYWNlICsgXCIqWypeJHwhfl0/PVwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZGIDMuNSAtIDplbmFibGVkLzpkaXNhYmxlZCBhbmQgaGlkZGVuIGVsZW1lbnRzIChoaWRkZW4gZWxlbWVudHMgYXJlIHN0aWxsIGVuYWJsZWQpXG5cdFx0XHQvLyBJRTggdGhyb3dzIGVycm9yIGhlcmUgYW5kIHdpbGwgbm90IHNlZSBsYXRlciB0ZXN0c1xuXHRcdFx0aWYgKCBlbC5xdWVyeVNlbGVjdG9yQWxsKCBcIjplbmFibGVkXCIgKS5sZW5ndGggIT09IDIgKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIjplbmFibGVkXCIsIFwiOmRpc2FibGVkXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU5LTExK1xuXHRcdFx0Ly8gSUUncyA6ZGlzYWJsZWQgc2VsZWN0b3IgZG9lcyBub3QgcGljayB1cCB0aGUgY2hpbGRyZW4gb2YgZGlzYWJsZWQgZmllbGRzZXRzXG5cdFx0XHRkb2NFbGVtLmFwcGVuZENoaWxkKCBlbCApLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGlmICggZWwucXVlcnlTZWxlY3RvckFsbCggXCI6ZGlzYWJsZWRcIiApLmxlbmd0aCAhPT0gMiApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiOmVuYWJsZWRcIiwgXCI6ZGlzYWJsZWRcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBPcGVyYSAxMCAtIDExIG9ubHlcblx0XHRcdC8vIE9wZXJhIDEwLTExIGRvZXMgbm90IHRocm93IG9uIHBvc3QtY29tbWEgaW52YWxpZCBwc2V1ZG9zXG5cdFx0XHRlbC5xdWVyeVNlbGVjdG9yQWxsKCBcIiosOnhcIiApO1xuXHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiLC4qOlwiICk7XG5cdFx0fSApO1xuXHR9XG5cblx0aWYgKCAoIHN1cHBvcnQubWF0Y2hlc1NlbGVjdG9yID0gcm5hdGl2ZS50ZXN0KCAoIG1hdGNoZXMgPSBkb2NFbGVtLm1hdGNoZXMgfHxcblx0XHRkb2NFbGVtLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGRvY0VsZW0ubW96TWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZG9jRWxlbS5vTWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZG9jRWxlbS5tc01hdGNoZXNTZWxlY3RvciApICkgKSApIHtcblxuXHRcdGFzc2VydCggZnVuY3Rpb24oIGVsICkge1xuXG5cdFx0XHQvLyBDaGVjayB0byBzZWUgaWYgaXQncyBwb3NzaWJsZSB0byBkbyBtYXRjaGVzU2VsZWN0b3Jcblx0XHRcdC8vIG9uIGEgZGlzY29ubmVjdGVkIG5vZGUgKElFIDkpXG5cdFx0XHRzdXBwb3J0LmRpc2Nvbm5lY3RlZE1hdGNoID0gbWF0Y2hlcy5jYWxsKCBlbCwgXCIqXCIgKTtcblxuXHRcdFx0Ly8gVGhpcyBzaG91bGQgZmFpbCB3aXRoIGFuIGV4Y2VwdGlvblxuXHRcdFx0Ly8gR2Vja28gZG9lcyBub3QgZXJyb3IsIHJldHVybnMgZmFsc2UgaW5zdGVhZFxuXHRcdFx0bWF0Y2hlcy5jYWxsKCBlbCwgXCJbcyE9JyddOnhcIiApO1xuXHRcdFx0cmJ1Z2d5TWF0Y2hlcy5wdXNoKCBcIiE9XCIsIHBzZXVkb3MgKTtcblx0XHR9ICk7XG5cdH1cblxuXHRyYnVnZ3lRU0EgPSByYnVnZ3lRU0EubGVuZ3RoICYmIG5ldyBSZWdFeHAoIHJidWdneVFTQS5qb2luKCBcInxcIiApICk7XG5cdHJidWdneU1hdGNoZXMgPSByYnVnZ3lNYXRjaGVzLmxlbmd0aCAmJiBuZXcgUmVnRXhwKCByYnVnZ3lNYXRjaGVzLmpvaW4oIFwifFwiICkgKTtcblxuXHQvKiBDb250YWluc1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cdGhhc0NvbXBhcmUgPSBybmF0aXZlLnRlc3QoIGRvY0VsZW0uY29tcGFyZURvY3VtZW50UG9zaXRpb24gKTtcblxuXHQvLyBFbGVtZW50IGNvbnRhaW5zIGFub3RoZXJcblx0Ly8gUHVycG9zZWZ1bGx5IHNlbGYtZXhjbHVzaXZlXG5cdC8vIEFzIGluLCBhbiBlbGVtZW50IGRvZXMgbm90IGNvbnRhaW4gaXRzZWxmXG5cdGNvbnRhaW5zID0gaGFzQ29tcGFyZSB8fCBybmF0aXZlLnRlc3QoIGRvY0VsZW0uY29udGFpbnMgKSA/XG5cdFx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0XHR2YXIgYWRvd24gPSBhLm5vZGVUeXBlID09PSA5ID8gYS5kb2N1bWVudEVsZW1lbnQgOiBhLFxuXHRcdFx0XHRidXAgPSBiICYmIGIucGFyZW50Tm9kZTtcblx0XHRcdHJldHVybiBhID09PSBidXAgfHwgISEoIGJ1cCAmJiBidXAubm9kZVR5cGUgPT09IDEgJiYgKFxuXHRcdFx0XHRhZG93bi5jb250YWlucyA/XG5cdFx0XHRcdFx0YWRvd24uY29udGFpbnMoIGJ1cCApIDpcblx0XHRcdFx0XHRhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uICYmIGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGJ1cCApICYgMTZcblx0XHRcdCkgKTtcblx0XHR9IDpcblx0XHRmdW5jdGlvbiggYSwgYiApIHtcblx0XHRcdGlmICggYiApIHtcblx0XHRcdFx0d2hpbGUgKCAoIGIgPSBiLnBhcmVudE5vZGUgKSApIHtcblx0XHRcdFx0XHRpZiAoIGIgPT09IGEgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXG5cdC8qIFNvcnRpbmdcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8vIERvY3VtZW50IG9yZGVyIHNvcnRpbmdcblx0c29ydE9yZGVyID0gaGFzQ29tcGFyZSA/XG5cdGZ1bmN0aW9uKCBhLCBiICkge1xuXG5cdFx0Ly8gRmxhZyBmb3IgZHVwbGljYXRlIHJlbW92YWxcblx0XHRpZiAoIGEgPT09IGIgKSB7XG5cdFx0XHRoYXNEdXBsaWNhdGUgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXG5cdFx0Ly8gU29ydCBvbiBtZXRob2QgZXhpc3RlbmNlIGlmIG9ubHkgb25lIGlucHV0IGhhcyBjb21wYXJlRG9jdW1lbnRQb3NpdGlvblxuXHRcdHZhciBjb21wYXJlID0gIWEuY29tcGFyZURvY3VtZW50UG9zaXRpb24gLSAhYi5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbjtcblx0XHRpZiAoIGNvbXBhcmUgKSB7XG5cdFx0XHRyZXR1cm4gY29tcGFyZTtcblx0XHR9XG5cblx0XHQvLyBDYWxjdWxhdGUgcG9zaXRpb24gaWYgYm90aCBpbnB1dHMgYmVsb25nIHRvIHRoZSBzYW1lIGRvY3VtZW50XG5cdFx0Ly8gU3VwcG9ydDogSUUgMTErLCBFZGdlIDE3IC0gMTgrXG5cdFx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdFx0Ly8gdHdvIGRvY3VtZW50czsgc2hhbGxvdyBjb21wYXJpc29ucyB3b3JrLlxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcblx0XHRjb21wYXJlID0gKCBhLm93bmVyRG9jdW1lbnQgfHwgYSApID09ICggYi5vd25lckRvY3VtZW50IHx8IGIgKSA/XG5cdFx0XHRhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBiICkgOlxuXG5cdFx0XHQvLyBPdGhlcndpc2Ugd2Uga25vdyB0aGV5IGFyZSBkaXNjb25uZWN0ZWRcblx0XHRcdDE7XG5cblx0XHQvLyBEaXNjb25uZWN0ZWQgbm9kZXNcblx0XHRpZiAoIGNvbXBhcmUgJiAxIHx8XG5cdFx0XHQoICFzdXBwb3J0LnNvcnREZXRhY2hlZCAmJiBiLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBhICkgPT09IGNvbXBhcmUgKSApIHtcblxuXHRcdFx0Ly8gQ2hvb3NlIHRoZSBmaXJzdCBlbGVtZW50IHRoYXQgaXMgcmVsYXRlZCB0byBvdXIgcHJlZmVycmVkIGRvY3VtZW50XG5cdFx0XHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTcgLSAxOCtcblx0XHRcdC8vIElFL0VkZ2Ugc29tZXRpbWVzIHRocm93IGEgXCJQZXJtaXNzaW9uIGRlbmllZFwiIGVycm9yIHdoZW4gc3RyaWN0LWNvbXBhcmluZ1xuXHRcdFx0Ly8gdHdvIGRvY3VtZW50czsgc2hhbGxvdyBjb21wYXJpc29ucyB3b3JrLlxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXHRcdFx0aWYgKCBhID09IGRvY3VtZW50IHx8IGEub3duZXJEb2N1bWVudCA9PSBwcmVmZXJyZWREb2MgJiZcblx0XHRcdFx0Y29udGFpbnMoIHByZWZlcnJlZERvYywgYSApICkge1xuXHRcdFx0XHRyZXR1cm4gLTE7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFIDExKywgRWRnZSAxNyAtIDE4K1xuXHRcdFx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdFx0XHQvLyB0d28gZG9jdW1lbnRzOyBzaGFsbG93IGNvbXBhcmlzb25zIHdvcmsuXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG5cdFx0XHRpZiAoIGIgPT0gZG9jdW1lbnQgfHwgYi5vd25lckRvY3VtZW50ID09IHByZWZlcnJlZERvYyAmJlxuXHRcdFx0XHRjb250YWlucyggcHJlZmVycmVkRG9jLCBiICkgKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNYWludGFpbiBvcmlnaW5hbCBvcmRlclxuXHRcdFx0cmV0dXJuIHNvcnRJbnB1dCA/XG5cdFx0XHRcdCggaW5kZXhPZiggc29ydElucHV0LCBhICkgLSBpbmRleE9mKCBzb3J0SW5wdXQsIGIgKSApIDpcblx0XHRcdFx0MDtcblx0XHR9XG5cblx0XHRyZXR1cm4gY29tcGFyZSAmIDQgPyAtMSA6IDE7XG5cdH0gOlxuXHRmdW5jdGlvbiggYSwgYiApIHtcblxuXHRcdC8vIEV4aXQgZWFybHkgaWYgdGhlIG5vZGVzIGFyZSBpZGVudGljYWxcblx0XHRpZiAoIGEgPT09IGIgKSB7XG5cdFx0XHRoYXNEdXBsaWNhdGUgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXG5cdFx0dmFyIGN1cixcblx0XHRcdGkgPSAwLFxuXHRcdFx0YXVwID0gYS5wYXJlbnROb2RlLFxuXHRcdFx0YnVwID0gYi5wYXJlbnROb2RlLFxuXHRcdFx0YXAgPSBbIGEgXSxcblx0XHRcdGJwID0gWyBiIF07XG5cblx0XHQvLyBQYXJlbnRsZXNzIG5vZGVzIGFyZSBlaXRoZXIgZG9jdW1lbnRzIG9yIGRpc2Nvbm5lY3RlZFxuXHRcdGlmICggIWF1cCB8fCAhYnVwICkge1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTcgLSAxOCtcblx0XHRcdC8vIElFL0VkZ2Ugc29tZXRpbWVzIHRocm93IGEgXCJQZXJtaXNzaW9uIGRlbmllZFwiIGVycm9yIHdoZW4gc3RyaWN0LWNvbXBhcmluZ1xuXHRcdFx0Ly8gdHdvIGRvY3VtZW50czsgc2hhbGxvdyBjb21wYXJpc29ucyB3b3JrLlxuXHRcdFx0LyogZXNsaW50LWRpc2FibGUgZXFlcWVxICovXG5cdFx0XHRyZXR1cm4gYSA9PSBkb2N1bWVudCA/IC0xIDpcblx0XHRcdFx0YiA9PSBkb2N1bWVudCA/IDEgOlxuXHRcdFx0XHQvKiBlc2xpbnQtZW5hYmxlIGVxZXFlcSAqL1xuXHRcdFx0XHRhdXAgPyAtMSA6XG5cdFx0XHRcdGJ1cCA/IDEgOlxuXHRcdFx0XHRzb3J0SW5wdXQgP1xuXHRcdFx0XHQoIGluZGV4T2YoIHNvcnRJbnB1dCwgYSApIC0gaW5kZXhPZiggc29ydElucHV0LCBiICkgKSA6XG5cdFx0XHRcdDA7XG5cblx0XHQvLyBJZiB0aGUgbm9kZXMgYXJlIHNpYmxpbmdzLCB3ZSBjYW4gZG8gYSBxdWljayBjaGVja1xuXHRcdH0gZWxzZSBpZiAoIGF1cCA9PT0gYnVwICkge1xuXHRcdFx0cmV0dXJuIHNpYmxpbmdDaGVjayggYSwgYiApO1xuXHRcdH1cblxuXHRcdC8vIE90aGVyd2lzZSB3ZSBuZWVkIGZ1bGwgbGlzdHMgb2YgdGhlaXIgYW5jZXN0b3JzIGZvciBjb21wYXJpc29uXG5cdFx0Y3VyID0gYTtcblx0XHR3aGlsZSAoICggY3VyID0gY3VyLnBhcmVudE5vZGUgKSApIHtcblx0XHRcdGFwLnVuc2hpZnQoIGN1ciApO1xuXHRcdH1cblx0XHRjdXIgPSBiO1xuXHRcdHdoaWxlICggKCBjdXIgPSBjdXIucGFyZW50Tm9kZSApICkge1xuXHRcdFx0YnAudW5zaGlmdCggY3VyICk7XG5cdFx0fVxuXG5cdFx0Ly8gV2FsayBkb3duIHRoZSB0cmVlIGxvb2tpbmcgZm9yIGEgZGlzY3JlcGFuY3lcblx0XHR3aGlsZSAoIGFwWyBpIF0gPT09IGJwWyBpIF0gKSB7XG5cdFx0XHRpKys7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGkgP1xuXG5cdFx0XHQvLyBEbyBhIHNpYmxpbmcgY2hlY2sgaWYgdGhlIG5vZGVzIGhhdmUgYSBjb21tb24gYW5jZXN0b3Jcblx0XHRcdHNpYmxpbmdDaGVjayggYXBbIGkgXSwgYnBbIGkgXSApIDpcblxuXHRcdFx0Ly8gT3RoZXJ3aXNlIG5vZGVzIGluIG91ciBkb2N1bWVudCBzb3J0IGZpcnN0XG5cdFx0XHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTcgLSAxOCtcblx0XHRcdC8vIElFL0VkZ2Ugc29tZXRpbWVzIHRocm93IGEgXCJQZXJtaXNzaW9uIGRlbmllZFwiIGVycm9yIHdoZW4gc3RyaWN0LWNvbXBhcmluZ1xuXHRcdFx0Ly8gdHdvIGRvY3VtZW50czsgc2hhbGxvdyBjb21wYXJpc29ucyB3b3JrLlxuXHRcdFx0LyogZXNsaW50LWRpc2FibGUgZXFlcWVxICovXG5cdFx0XHRhcFsgaSBdID09IHByZWZlcnJlZERvYyA/IC0xIDpcblx0XHRcdGJwWyBpIF0gPT0gcHJlZmVycmVkRG9jID8gMSA6XG5cdFx0XHQvKiBlc2xpbnQtZW5hYmxlIGVxZXFlcSAqL1xuXHRcdFx0MDtcblx0fTtcblxuXHRyZXR1cm4gZG9jdW1lbnQ7XG59O1xuXG5TaXp6bGUubWF0Y2hlcyA9IGZ1bmN0aW9uKCBleHByLCBlbGVtZW50cyApIHtcblx0cmV0dXJuIFNpenpsZSggZXhwciwgbnVsbCwgbnVsbCwgZWxlbWVudHMgKTtcbn07XG5cblNpenpsZS5tYXRjaGVzU2VsZWN0b3IgPSBmdW5jdGlvbiggZWxlbSwgZXhwciApIHtcblx0c2V0RG9jdW1lbnQoIGVsZW0gKTtcblxuXHRpZiAoIHN1cHBvcnQubWF0Y2hlc1NlbGVjdG9yICYmIGRvY3VtZW50SXNIVE1MICYmXG5cdFx0IW5vbm5hdGl2ZVNlbGVjdG9yQ2FjaGVbIGV4cHIgKyBcIiBcIiBdICYmXG5cdFx0KCAhcmJ1Z2d5TWF0Y2hlcyB8fCAhcmJ1Z2d5TWF0Y2hlcy50ZXN0KCBleHByICkgKSAmJlxuXHRcdCggIXJidWdneVFTQSAgICAgfHwgIXJidWdneVFTQS50ZXN0KCBleHByICkgKSApIHtcblxuXHRcdHRyeSB7XG5cdFx0XHR2YXIgcmV0ID0gbWF0Y2hlcy5jYWxsKCBlbGVtLCBleHByICk7XG5cblx0XHRcdC8vIElFIDkncyBtYXRjaGVzU2VsZWN0b3IgcmV0dXJucyBmYWxzZSBvbiBkaXNjb25uZWN0ZWQgbm9kZXNcblx0XHRcdGlmICggcmV0IHx8IHN1cHBvcnQuZGlzY29ubmVjdGVkTWF0Y2ggfHxcblxuXHRcdFx0XHQvLyBBcyB3ZWxsLCBkaXNjb25uZWN0ZWQgbm9kZXMgYXJlIHNhaWQgdG8gYmUgaW4gYSBkb2N1bWVudFxuXHRcdFx0XHQvLyBmcmFnbWVudCBpbiBJRSA5XG5cdFx0XHRcdGVsZW0uZG9jdW1lbnQgJiYgZWxlbS5kb2N1bWVudC5ub2RlVHlwZSAhPT0gMTEgKSB7XG5cdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0XHRub25uYXRpdmVTZWxlY3RvckNhY2hlKCBleHByLCB0cnVlICk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIFNpenpsZSggZXhwciwgZG9jdW1lbnQsIG51bGwsIFsgZWxlbSBdICkubGVuZ3RoID4gMDtcbn07XG5cblNpenpsZS5jb250YWlucyA9IGZ1bmN0aW9uKCBjb250ZXh0LCBlbGVtICkge1xuXG5cdC8vIFNldCBkb2N1bWVudCB2YXJzIGlmIG5lZWRlZFxuXHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTcgLSAxOCtcblx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdC8vIHR3byBkb2N1bWVudHM7IHNoYWxsb3cgY29tcGFyaXNvbnMgd29yay5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXHRpZiAoICggY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgKSAhPSBkb2N1bWVudCApIHtcblx0XHRzZXREb2N1bWVudCggY29udGV4dCApO1xuXHR9XG5cdHJldHVybiBjb250YWlucyggY29udGV4dCwgZWxlbSApO1xufTtcblxuU2l6emxlLmF0dHIgPSBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcblxuXHQvLyBTZXQgZG9jdW1lbnQgdmFycyBpZiBuZWVkZWRcblx0Ly8gU3VwcG9ydDogSUUgMTErLCBFZGdlIDE3IC0gMTgrXG5cdC8vIElFL0VkZ2Ugc29tZXRpbWVzIHRocm93IGEgXCJQZXJtaXNzaW9uIGRlbmllZFwiIGVycm9yIHdoZW4gc3RyaWN0LWNvbXBhcmluZ1xuXHQvLyB0d28gZG9jdW1lbnRzOyBzaGFsbG93IGNvbXBhcmlzb25zIHdvcmsuXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcblx0aWYgKCAoIGVsZW0ub3duZXJEb2N1bWVudCB8fCBlbGVtICkgIT0gZG9jdW1lbnQgKSB7XG5cdFx0c2V0RG9jdW1lbnQoIGVsZW0gKTtcblx0fVxuXG5cdHZhciBmbiA9IEV4cHIuYXR0ckhhbmRsZVsgbmFtZS50b0xvd2VyQ2FzZSgpIF0sXG5cblx0XHQvLyBEb24ndCBnZXQgZm9vbGVkIGJ5IE9iamVjdC5wcm90b3R5cGUgcHJvcGVydGllcyAoalF1ZXJ5ICMxMzgwNylcblx0XHR2YWwgPSBmbiAmJiBoYXNPd24uY2FsbCggRXhwci5hdHRySGFuZGxlLCBuYW1lLnRvTG93ZXJDYXNlKCkgKSA/XG5cdFx0XHRmbiggZWxlbSwgbmFtZSwgIWRvY3VtZW50SXNIVE1MICkgOlxuXHRcdFx0dW5kZWZpbmVkO1xuXG5cdHJldHVybiB2YWwgIT09IHVuZGVmaW5lZCA/XG5cdFx0dmFsIDpcblx0XHRzdXBwb3J0LmF0dHJpYnV0ZXMgfHwgIWRvY3VtZW50SXNIVE1MID9cblx0XHRcdGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lICkgOlxuXHRcdFx0KCB2YWwgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIG5hbWUgKSApICYmIHZhbC5zcGVjaWZpZWQgP1xuXHRcdFx0XHR2YWwudmFsdWUgOlxuXHRcdFx0XHRudWxsO1xufTtcblxuU2l6emxlLmVzY2FwZSA9IGZ1bmN0aW9uKCBzZWwgKSB7XG5cdHJldHVybiAoIHNlbCArIFwiXCIgKS5yZXBsYWNlKCByY3NzZXNjYXBlLCBmY3NzZXNjYXBlICk7XG59O1xuXG5TaXp6bGUuZXJyb3IgPSBmdW5jdGlvbiggbXNnICkge1xuXHR0aHJvdyBuZXcgRXJyb3IoIFwiU3ludGF4IGVycm9yLCB1bnJlY29nbml6ZWQgZXhwcmVzc2lvbjogXCIgKyBtc2cgKTtcbn07XG5cbi8qKlxuICogRG9jdW1lbnQgc29ydGluZyBhbmQgcmVtb3ZpbmcgZHVwbGljYXRlc1xuICogQHBhcmFtIHtBcnJheUxpa2V9IHJlc3VsdHNcbiAqL1xuU2l6emxlLnVuaXF1ZVNvcnQgPSBmdW5jdGlvbiggcmVzdWx0cyApIHtcblx0dmFyIGVsZW0sXG5cdFx0ZHVwbGljYXRlcyA9IFtdLFxuXHRcdGogPSAwLFxuXHRcdGkgPSAwO1xuXG5cdC8vIFVubGVzcyB3ZSAqa25vdyogd2UgY2FuIGRldGVjdCBkdXBsaWNhdGVzLCBhc3N1bWUgdGhlaXIgcHJlc2VuY2Vcblx0aGFzRHVwbGljYXRlID0gIXN1cHBvcnQuZGV0ZWN0RHVwbGljYXRlcztcblx0c29ydElucHV0ID0gIXN1cHBvcnQuc29ydFN0YWJsZSAmJiByZXN1bHRzLnNsaWNlKCAwICk7XG5cdHJlc3VsdHMuc29ydCggc29ydE9yZGVyICk7XG5cblx0aWYgKCBoYXNEdXBsaWNhdGUgKSB7XG5cdFx0d2hpbGUgKCAoIGVsZW0gPSByZXN1bHRzWyBpKysgXSApICkge1xuXHRcdFx0aWYgKCBlbGVtID09PSByZXN1bHRzWyBpIF0gKSB7XG5cdFx0XHRcdGogPSBkdXBsaWNhdGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0d2hpbGUgKCBqLS0gKSB7XG5cdFx0XHRyZXN1bHRzLnNwbGljZSggZHVwbGljYXRlc1sgaiBdLCAxICk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ2xlYXIgaW5wdXQgYWZ0ZXIgc29ydGluZyB0byByZWxlYXNlIG9iamVjdHNcblx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvc2l6emxlL3B1bGwvMjI1XG5cdHNvcnRJbnB1dCA9IG51bGw7XG5cblx0cmV0dXJuIHJlc3VsdHM7XG59O1xuXG4vKipcbiAqIFV0aWxpdHkgZnVuY3Rpb24gZm9yIHJldHJpZXZpbmcgdGhlIHRleHQgdmFsdWUgb2YgYW4gYXJyYXkgb2YgRE9NIG5vZGVzXG4gKiBAcGFyYW0ge0FycmF5fEVsZW1lbnR9IGVsZW1cbiAqL1xuZ2V0VGV4dCA9IFNpenpsZS5nZXRUZXh0ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdHZhciBub2RlLFxuXHRcdHJldCA9IFwiXCIsXG5cdFx0aSA9IDAsXG5cdFx0bm9kZVR5cGUgPSBlbGVtLm5vZGVUeXBlO1xuXG5cdGlmICggIW5vZGVUeXBlICkge1xuXG5cdFx0Ly8gSWYgbm8gbm9kZVR5cGUsIHRoaXMgaXMgZXhwZWN0ZWQgdG8gYmUgYW4gYXJyYXlcblx0XHR3aGlsZSAoICggbm9kZSA9IGVsZW1bIGkrKyBdICkgKSB7XG5cblx0XHRcdC8vIERvIG5vdCB0cmF2ZXJzZSBjb21tZW50IG5vZGVzXG5cdFx0XHRyZXQgKz0gZ2V0VGV4dCggbm9kZSApO1xuXHRcdH1cblx0fSBlbHNlIGlmICggbm9kZVR5cGUgPT09IDEgfHwgbm9kZVR5cGUgPT09IDkgfHwgbm9kZVR5cGUgPT09IDExICkge1xuXG5cdFx0Ly8gVXNlIHRleHRDb250ZW50IGZvciBlbGVtZW50c1xuXHRcdC8vIGlubmVyVGV4dCB1c2FnZSByZW1vdmVkIGZvciBjb25zaXN0ZW5jeSBvZiBuZXcgbGluZXMgKGpRdWVyeSAjMTExNTMpXG5cdFx0aWYgKCB0eXBlb2YgZWxlbS50ZXh0Q29udGVudCA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiBlbGVtLnRleHRDb250ZW50O1xuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIFRyYXZlcnNlIGl0cyBjaGlsZHJlblxuXHRcdFx0Zm9yICggZWxlbSA9IGVsZW0uZmlyc3RDaGlsZDsgZWxlbTsgZWxlbSA9IGVsZW0ubmV4dFNpYmxpbmcgKSB7XG5cdFx0XHRcdHJldCArPSBnZXRUZXh0KCBlbGVtICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2UgaWYgKCBub2RlVHlwZSA9PT0gMyB8fCBub2RlVHlwZSA9PT0gNCApIHtcblx0XHRyZXR1cm4gZWxlbS5ub2RlVmFsdWU7XG5cdH1cblxuXHQvLyBEbyBub3QgaW5jbHVkZSBjb21tZW50IG9yIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24gbm9kZXNcblxuXHRyZXR1cm4gcmV0O1xufTtcblxuRXhwciA9IFNpenpsZS5zZWxlY3RvcnMgPSB7XG5cblx0Ly8gQ2FuIGJlIGFkanVzdGVkIGJ5IHRoZSB1c2VyXG5cdGNhY2hlTGVuZ3RoOiA1MCxcblxuXHRjcmVhdGVQc2V1ZG86IG1hcmtGdW5jdGlvbixcblxuXHRtYXRjaDogbWF0Y2hFeHByLFxuXG5cdGF0dHJIYW5kbGU6IHt9LFxuXG5cdGZpbmQ6IHt9LFxuXG5cdHJlbGF0aXZlOiB7XG5cdFx0XCI+XCI6IHsgZGlyOiBcInBhcmVudE5vZGVcIiwgZmlyc3Q6IHRydWUgfSxcblx0XHRcIiBcIjogeyBkaXI6IFwicGFyZW50Tm9kZVwiIH0sXG5cdFx0XCIrXCI6IHsgZGlyOiBcInByZXZpb3VzU2libGluZ1wiLCBmaXJzdDogdHJ1ZSB9LFxuXHRcdFwiflwiOiB7IGRpcjogXCJwcmV2aW91c1NpYmxpbmdcIiB9XG5cdH0sXG5cblx0cHJlRmlsdGVyOiB7XG5cdFx0XCJBVFRSXCI6IGZ1bmN0aW9uKCBtYXRjaCApIHtcblx0XHRcdG1hdGNoWyAxIF0gPSBtYXRjaFsgMSBdLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cblx0XHRcdC8vIE1vdmUgdGhlIGdpdmVuIHZhbHVlIHRvIG1hdGNoWzNdIHdoZXRoZXIgcXVvdGVkIG9yIHVucXVvdGVkXG5cdFx0XHRtYXRjaFsgMyBdID0gKCBtYXRjaFsgMyBdIHx8IG1hdGNoWyA0IF0gfHxcblx0XHRcdFx0bWF0Y2hbIDUgXSB8fCBcIlwiICkucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblxuXHRcdFx0aWYgKCBtYXRjaFsgMiBdID09PSBcIn49XCIgKSB7XG5cdFx0XHRcdG1hdGNoWyAzIF0gPSBcIiBcIiArIG1hdGNoWyAzIF0gKyBcIiBcIjtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG1hdGNoLnNsaWNlKCAwLCA0ICk7XG5cdFx0fSxcblxuXHRcdFwiQ0hJTERcIjogZnVuY3Rpb24oIG1hdGNoICkge1xuXG5cdFx0XHQvKiBtYXRjaGVzIGZyb20gbWF0Y2hFeHByW1wiQ0hJTERcIl1cblx0XHRcdFx0MSB0eXBlIChvbmx5fG50aHwuLi4pXG5cdFx0XHRcdDIgd2hhdCAoY2hpbGR8b2YtdHlwZSlcblx0XHRcdFx0MyBhcmd1bWVudCAoZXZlbnxvZGR8XFxkKnxcXGQqbihbKy1dXFxkKyk/fC4uLilcblx0XHRcdFx0NCB4bi1jb21wb25lbnQgb2YgeG4reSBhcmd1bWVudCAoWystXT9cXGQqbnwpXG5cdFx0XHRcdDUgc2lnbiBvZiB4bi1jb21wb25lbnRcblx0XHRcdFx0NiB4IG9mIHhuLWNvbXBvbmVudFxuXHRcdFx0XHQ3IHNpZ24gb2YgeS1jb21wb25lbnRcblx0XHRcdFx0OCB5IG9mIHktY29tcG9uZW50XG5cdFx0XHQqL1xuXHRcdFx0bWF0Y2hbIDEgXSA9IG1hdGNoWyAxIF0udG9Mb3dlckNhc2UoKTtcblxuXHRcdFx0aWYgKCBtYXRjaFsgMSBdLnNsaWNlKCAwLCAzICkgPT09IFwibnRoXCIgKSB7XG5cblx0XHRcdFx0Ly8gbnRoLSogcmVxdWlyZXMgYXJndW1lbnRcblx0XHRcdFx0aWYgKCAhbWF0Y2hbIDMgXSApIHtcblx0XHRcdFx0XHRTaXp6bGUuZXJyb3IoIG1hdGNoWyAwIF0gKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIG51bWVyaWMgeCBhbmQgeSBwYXJhbWV0ZXJzIGZvciBFeHByLmZpbHRlci5DSElMRFxuXHRcdFx0XHQvLyByZW1lbWJlciB0aGF0IGZhbHNlL3RydWUgY2FzdCByZXNwZWN0aXZlbHkgdG8gMC8xXG5cdFx0XHRcdG1hdGNoWyA0IF0gPSArKCBtYXRjaFsgNCBdID9cblx0XHRcdFx0XHRtYXRjaFsgNSBdICsgKCBtYXRjaFsgNiBdIHx8IDEgKSA6XG5cdFx0XHRcdFx0MiAqICggbWF0Y2hbIDMgXSA9PT0gXCJldmVuXCIgfHwgbWF0Y2hbIDMgXSA9PT0gXCJvZGRcIiApICk7XG5cdFx0XHRcdG1hdGNoWyA1IF0gPSArKCAoIG1hdGNoWyA3IF0gKyBtYXRjaFsgOCBdICkgfHwgbWF0Y2hbIDMgXSA9PT0gXCJvZGRcIiApO1xuXG5cdFx0XHRcdC8vIG90aGVyIHR5cGVzIHByb2hpYml0IGFyZ3VtZW50c1xuXHRcdFx0fSBlbHNlIGlmICggbWF0Y2hbIDMgXSApIHtcblx0XHRcdFx0U2l6emxlLmVycm9yKCBtYXRjaFsgMCBdICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBtYXRjaDtcblx0XHR9LFxuXG5cdFx0XCJQU0VVRE9cIjogZnVuY3Rpb24oIG1hdGNoICkge1xuXHRcdFx0dmFyIGV4Y2Vzcyxcblx0XHRcdFx0dW5xdW90ZWQgPSAhbWF0Y2hbIDYgXSAmJiBtYXRjaFsgMiBdO1xuXG5cdFx0XHRpZiAoIG1hdGNoRXhwclsgXCJDSElMRFwiIF0udGVzdCggbWF0Y2hbIDAgXSApICkge1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWNjZXB0IHF1b3RlZCBhcmd1bWVudHMgYXMtaXNcblx0XHRcdGlmICggbWF0Y2hbIDMgXSApIHtcblx0XHRcdFx0bWF0Y2hbIDIgXSA9IG1hdGNoWyA0IF0gfHwgbWF0Y2hbIDUgXSB8fCBcIlwiO1xuXG5cdFx0XHQvLyBTdHJpcCBleGNlc3MgY2hhcmFjdGVycyBmcm9tIHVucXVvdGVkIGFyZ3VtZW50c1xuXHRcdFx0fSBlbHNlIGlmICggdW5xdW90ZWQgJiYgcnBzZXVkby50ZXN0KCB1bnF1b3RlZCApICYmXG5cblx0XHRcdFx0Ly8gR2V0IGV4Y2VzcyBmcm9tIHRva2VuaXplIChyZWN1cnNpdmVseSlcblx0XHRcdFx0KCBleGNlc3MgPSB0b2tlbml6ZSggdW5xdW90ZWQsIHRydWUgKSApICYmXG5cblx0XHRcdFx0Ly8gYWR2YW5jZSB0byB0aGUgbmV4dCBjbG9zaW5nIHBhcmVudGhlc2lzXG5cdFx0XHRcdCggZXhjZXNzID0gdW5xdW90ZWQuaW5kZXhPZiggXCIpXCIsIHVucXVvdGVkLmxlbmd0aCAtIGV4Y2VzcyApIC0gdW5xdW90ZWQubGVuZ3RoICkgKSB7XG5cblx0XHRcdFx0Ly8gZXhjZXNzIGlzIGEgbmVnYXRpdmUgaW5kZXhcblx0XHRcdFx0bWF0Y2hbIDAgXSA9IG1hdGNoWyAwIF0uc2xpY2UoIDAsIGV4Y2VzcyApO1xuXHRcdFx0XHRtYXRjaFsgMiBdID0gdW5xdW90ZWQuc2xpY2UoIDAsIGV4Y2VzcyApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZXR1cm4gb25seSBjYXB0dXJlcyBuZWVkZWQgYnkgdGhlIHBzZXVkbyBmaWx0ZXIgbWV0aG9kICh0eXBlIGFuZCBhcmd1bWVudClcblx0XHRcdHJldHVybiBtYXRjaC5zbGljZSggMCwgMyApO1xuXHRcdH1cblx0fSxcblxuXHRmaWx0ZXI6IHtcblxuXHRcdFwiVEFHXCI6IGZ1bmN0aW9uKCBub2RlTmFtZVNlbGVjdG9yICkge1xuXHRcdFx0dmFyIG5vZGVOYW1lID0gbm9kZU5hbWVTZWxlY3Rvci5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyZXR1cm4gbm9kZU5hbWVTZWxlY3RvciA9PT0gXCIqXCIgP1xuXHRcdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSA6XG5cdFx0XHRcdGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRcdHJldHVybiBlbGVtLm5vZGVOYW1lICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbm9kZU5hbWU7XG5cdFx0XHRcdH07XG5cdFx0fSxcblxuXHRcdFwiQ0xBU1NcIjogZnVuY3Rpb24oIGNsYXNzTmFtZSApIHtcblx0XHRcdHZhciBwYXR0ZXJuID0gY2xhc3NDYWNoZVsgY2xhc3NOYW1lICsgXCIgXCIgXTtcblxuXHRcdFx0cmV0dXJuIHBhdHRlcm4gfHxcblx0XHRcdFx0KCBwYXR0ZXJuID0gbmV3IFJlZ0V4cCggXCIoXnxcIiArIHdoaXRlc3BhY2UgK1xuXHRcdFx0XHRcdFwiKVwiICsgY2xhc3NOYW1lICsgXCIoXCIgKyB3aGl0ZXNwYWNlICsgXCJ8JClcIiApICkgJiYgY2xhc3NDYWNoZShcblx0XHRcdFx0XHRcdGNsYXNzTmFtZSwgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBwYXR0ZXJuLnRlc3QoXG5cdFx0XHRcdFx0XHRcdFx0dHlwZW9mIGVsZW0uY2xhc3NOYW1lID09PSBcInN0cmluZ1wiICYmIGVsZW0uY2xhc3NOYW1lIHx8XG5cdFx0XHRcdFx0XHRcdFx0dHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlICE9PSBcInVuZGVmaW5lZFwiICYmXG5cdFx0XHRcdFx0XHRcdFx0XHRlbGVtLmdldEF0dHJpYnV0ZSggXCJjbGFzc1wiICkgfHxcblx0XHRcdFx0XHRcdFx0XHRcIlwiXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0gKTtcblx0XHR9LFxuXG5cdFx0XCJBVFRSXCI6IGZ1bmN0aW9uKCBuYW1lLCBvcGVyYXRvciwgY2hlY2sgKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBTaXp6bGUuYXR0ciggZWxlbSwgbmFtZSApO1xuXG5cdFx0XHRcdGlmICggcmVzdWx0ID09IG51bGwgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9wZXJhdG9yID09PSBcIiE9XCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCAhb3BlcmF0b3IgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXN1bHQgKz0gXCJcIjtcblxuXHRcdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5cblx0XHRcdFx0cmV0dXJuIG9wZXJhdG9yID09PSBcIj1cIiA/IHJlc3VsdCA9PT0gY2hlY2sgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIiE9XCIgPyByZXN1bHQgIT09IGNoZWNrIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCJePVwiID8gY2hlY2sgJiYgcmVzdWx0LmluZGV4T2YoIGNoZWNrICkgPT09IDAgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIio9XCIgPyBjaGVjayAmJiByZXN1bHQuaW5kZXhPZiggY2hlY2sgKSA+IC0xIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCIkPVwiID8gY2hlY2sgJiYgcmVzdWx0LnNsaWNlKCAtY2hlY2subGVuZ3RoICkgPT09IGNoZWNrIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCJ+PVwiID8gKCBcIiBcIiArIHJlc3VsdC5yZXBsYWNlKCByd2hpdGVzcGFjZSwgXCIgXCIgKSArIFwiIFwiICkuaW5kZXhPZiggY2hlY2sgKSA+IC0xIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCJ8PVwiID8gcmVzdWx0ID09PSBjaGVjayB8fCByZXN1bHQuc2xpY2UoIDAsIGNoZWNrLmxlbmd0aCArIDEgKSA9PT0gY2hlY2sgKyBcIi1cIiA6XG5cdFx0XHRcdFx0ZmFsc2U7XG5cdFx0XHRcdC8qIGVzbGludC1lbmFibGUgbWF4LWxlbiAqL1xuXG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRcIkNISUxEXCI6IGZ1bmN0aW9uKCB0eXBlLCB3aGF0LCBfYXJndW1lbnQsIGZpcnN0LCBsYXN0ICkge1xuXHRcdFx0dmFyIHNpbXBsZSA9IHR5cGUuc2xpY2UoIDAsIDMgKSAhPT0gXCJudGhcIixcblx0XHRcdFx0Zm9yd2FyZCA9IHR5cGUuc2xpY2UoIC00ICkgIT09IFwibGFzdFwiLFxuXHRcdFx0XHRvZlR5cGUgPSB3aGF0ID09PSBcIm9mLXR5cGVcIjtcblxuXHRcdFx0cmV0dXJuIGZpcnN0ID09PSAxICYmIGxhc3QgPT09IDAgP1xuXG5cdFx0XHRcdC8vIFNob3J0Y3V0IGZvciA6bnRoLSoobilcblx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdFx0cmV0dXJuICEhZWxlbS5wYXJlbnROb2RlO1xuXHRcdFx0XHR9IDpcblxuXHRcdFx0XHRmdW5jdGlvbiggZWxlbSwgX2NvbnRleHQsIHhtbCApIHtcblx0XHRcdFx0XHR2YXIgY2FjaGUsIHVuaXF1ZUNhY2hlLCBvdXRlckNhY2hlLCBub2RlLCBub2RlSW5kZXgsIHN0YXJ0LFxuXHRcdFx0XHRcdFx0ZGlyID0gc2ltcGxlICE9PSBmb3J3YXJkID8gXCJuZXh0U2libGluZ1wiIDogXCJwcmV2aW91c1NpYmxpbmdcIixcblx0XHRcdFx0XHRcdHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZSxcblx0XHRcdFx0XHRcdG5hbWUgPSBvZlR5cGUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpLFxuXHRcdFx0XHRcdFx0dXNlQ2FjaGUgPSAheG1sICYmICFvZlR5cGUsXG5cdFx0XHRcdFx0XHRkaWZmID0gZmFsc2U7XG5cblx0XHRcdFx0XHRpZiAoIHBhcmVudCApIHtcblxuXHRcdFx0XHRcdFx0Ly8gOihmaXJzdHxsYXN0fG9ubHkpLShjaGlsZHxvZi10eXBlKVxuXHRcdFx0XHRcdFx0aWYgKCBzaW1wbGUgKSB7XG5cdFx0XHRcdFx0XHRcdHdoaWxlICggZGlyICkge1xuXHRcdFx0XHRcdFx0XHRcdG5vZGUgPSBlbGVtO1xuXHRcdFx0XHRcdFx0XHRcdHdoaWxlICggKCBub2RlID0gbm9kZVsgZGlyIF0gKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICggb2ZUeXBlID9cblx0XHRcdFx0XHRcdFx0XHRcdFx0bm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lIDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0bm9kZS5ub2RlVHlwZSA9PT0gMSApIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gUmV2ZXJzZSBkaXJlY3Rpb24gZm9yIDpvbmx5LSogKGlmIHdlIGhhdmVuJ3QgeWV0IGRvbmUgc28pXG5cdFx0XHRcdFx0XHRcdFx0c3RhcnQgPSBkaXIgPSB0eXBlID09PSBcIm9ubHlcIiAmJiAhc3RhcnQgJiYgXCJuZXh0U2libGluZ1wiO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRzdGFydCA9IFsgZm9yd2FyZCA/IHBhcmVudC5maXJzdENoaWxkIDogcGFyZW50Lmxhc3RDaGlsZCBdO1xuXG5cdFx0XHRcdFx0XHQvLyBub24teG1sIDpudGgtY2hpbGQoLi4uKSBzdG9yZXMgY2FjaGUgZGF0YSBvbiBgcGFyZW50YFxuXHRcdFx0XHRcdFx0aWYgKCBmb3J3YXJkICYmIHVzZUNhY2hlICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIFNlZWsgYGVsZW1gIGZyb20gYSBwcmV2aW91c2x5LWNhY2hlZCBpbmRleFxuXG5cdFx0XHRcdFx0XHRcdC8vIC4uLmluIGEgZ3ppcC1mcmllbmRseSB3YXlcblx0XHRcdFx0XHRcdFx0bm9kZSA9IHBhcmVudDtcblx0XHRcdFx0XHRcdFx0b3V0ZXJDYWNoZSA9IG5vZGVbIGV4cGFuZG8gXSB8fCAoIG5vZGVbIGV4cGFuZG8gXSA9IHt9ICk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPDkgb25seVxuXHRcdFx0XHRcdFx0XHQvLyBEZWZlbmQgYWdhaW5zdCBjbG9uZWQgYXR0cm9wZXJ0aWVzIChqUXVlcnkgZ2gtMTcwOSlcblx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGUgPSBvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gfHxcblx0XHRcdFx0XHRcdFx0XHQoIG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSA9IHt9ICk7XG5cblx0XHRcdFx0XHRcdFx0Y2FjaGUgPSB1bmlxdWVDYWNoZVsgdHlwZSBdIHx8IFtdO1xuXHRcdFx0XHRcdFx0XHRub2RlSW5kZXggPSBjYWNoZVsgMCBdID09PSBkaXJydW5zICYmIGNhY2hlWyAxIF07XG5cdFx0XHRcdFx0XHRcdGRpZmYgPSBub2RlSW5kZXggJiYgY2FjaGVbIDIgXTtcblx0XHRcdFx0XHRcdFx0bm9kZSA9IG5vZGVJbmRleCAmJiBwYXJlbnQuY2hpbGROb2Rlc1sgbm9kZUluZGV4IF07XG5cblx0XHRcdFx0XHRcdFx0d2hpbGUgKCAoIG5vZGUgPSArK25vZGVJbmRleCAmJiBub2RlICYmIG5vZGVbIGRpciBdIHx8XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBGYWxsYmFjayB0byBzZWVraW5nIGBlbGVtYCBmcm9tIHRoZSBzdGFydFxuXHRcdFx0XHRcdFx0XHRcdCggZGlmZiA9IG5vZGVJbmRleCA9IDAgKSB8fCBzdGFydC5wb3AoKSApICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gV2hlbiBmb3VuZCwgY2FjaGUgaW5kZXhlcyBvbiBgcGFyZW50YCBhbmQgYnJlYWtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIG5vZGUubm9kZVR5cGUgPT09IDEgJiYgKytkaWZmICYmIG5vZGUgPT09IGVsZW0gKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZVsgdHlwZSBdID0gWyBkaXJydW5zLCBub2RlSW5kZXgsIGRpZmYgXTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRcdC8vIFVzZSBwcmV2aW91c2x5LWNhY2hlZCBlbGVtZW50IGluZGV4IGlmIGF2YWlsYWJsZVxuXHRcdFx0XHRcdFx0XHRpZiAoIHVzZUNhY2hlICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gLi4uaW4gYSBnemlwLWZyaWVuZGx5IHdheVxuXHRcdFx0XHRcdFx0XHRcdG5vZGUgPSBlbGVtO1xuXHRcdFx0XHRcdFx0XHRcdG91dGVyQ2FjaGUgPSBub2RlWyBleHBhbmRvIF0gfHwgKCBub2RlWyBleHBhbmRvIF0gPSB7fSApO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPDkgb25seVxuXHRcdFx0XHRcdFx0XHRcdC8vIERlZmVuZCBhZ2FpbnN0IGNsb25lZCBhdHRyb3BlcnRpZXMgKGpRdWVyeSBnaC0xNzA5KVxuXHRcdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlID0gb3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHQoIG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSA9IHt9ICk7XG5cblx0XHRcdFx0XHRcdFx0XHRjYWNoZSA9IHVuaXF1ZUNhY2hlWyB0eXBlIF0gfHwgW107XG5cdFx0XHRcdFx0XHRcdFx0bm9kZUluZGV4ID0gY2FjaGVbIDAgXSA9PT0gZGlycnVucyAmJiBjYWNoZVsgMSBdO1xuXHRcdFx0XHRcdFx0XHRcdGRpZmYgPSBub2RlSW5kZXg7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQvLyB4bWwgOm50aC1jaGlsZCguLi4pXG5cdFx0XHRcdFx0XHRcdC8vIG9yIDpudGgtbGFzdC1jaGlsZCguLi4pIG9yIDpudGgoLWxhc3QpPy1vZi10eXBlKC4uLilcblx0XHRcdFx0XHRcdFx0aWYgKCBkaWZmID09PSBmYWxzZSApIHtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIFVzZSB0aGUgc2FtZSBsb29wIGFzIGFib3ZlIHRvIHNlZWsgYGVsZW1gIGZyb20gdGhlIHN0YXJ0XG5cdFx0XHRcdFx0XHRcdFx0d2hpbGUgKCAoIG5vZGUgPSArK25vZGVJbmRleCAmJiBub2RlICYmIG5vZGVbIGRpciBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHQoIGRpZmYgPSBub2RlSW5kZXggPSAwICkgfHwgc3RhcnQucG9wKCkgKSApIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCAoIG9mVHlwZSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZSA6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG5vZGUubm9kZVR5cGUgPT09IDEgKSAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQrK2RpZmYgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gQ2FjaGUgdGhlIGluZGV4IG9mIGVhY2ggZW5jb3VudGVyZWQgZWxlbWVudFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIHVzZUNhY2hlICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG91dGVyQ2FjaGUgPSBub2RlWyBleHBhbmRvIF0gfHxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCggbm9kZVsgZXhwYW5kbyBdID0ge30gKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw5IG9ubHlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBEZWZlbmQgYWdhaW5zdCBjbG9uZWQgYXR0cm9wZXJ0aWVzIChqUXVlcnkgZ2gtMTcwOSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZSA9IG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KCBvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gPSB7fSApO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGVbIHR5cGUgXSA9IFsgZGlycnVucywgZGlmZiBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBub2RlID09PSBlbGVtICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEluY29ycG9yYXRlIHRoZSBvZmZzZXQsIHRoZW4gY2hlY2sgYWdhaW5zdCBjeWNsZSBzaXplXG5cdFx0XHRcdFx0XHRkaWZmIC09IGxhc3Q7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZGlmZiA9PT0gZmlyc3QgfHwgKCBkaWZmICUgZmlyc3QgPT09IDAgJiYgZGlmZiAvIGZpcnN0ID49IDAgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0fSxcblxuXHRcdFwiUFNFVURPXCI6IGZ1bmN0aW9uKCBwc2V1ZG8sIGFyZ3VtZW50ICkge1xuXG5cdFx0XHQvLyBwc2V1ZG8tY2xhc3MgbmFtZXMgYXJlIGNhc2UtaW5zZW5zaXRpdmVcblx0XHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jcHNldWRvLWNsYXNzZXNcblx0XHRcdC8vIFByaW9yaXRpemUgYnkgY2FzZSBzZW5zaXRpdml0eSBpbiBjYXNlIGN1c3RvbSBwc2V1ZG9zIGFyZSBhZGRlZCB3aXRoIHVwcGVyY2FzZSBsZXR0ZXJzXG5cdFx0XHQvLyBSZW1lbWJlciB0aGF0IHNldEZpbHRlcnMgaW5oZXJpdHMgZnJvbSBwc2V1ZG9zXG5cdFx0XHR2YXIgYXJncyxcblx0XHRcdFx0Zm4gPSBFeHByLnBzZXVkb3NbIHBzZXVkbyBdIHx8IEV4cHIuc2V0RmlsdGVyc1sgcHNldWRvLnRvTG93ZXJDYXNlKCkgXSB8fFxuXHRcdFx0XHRcdFNpenpsZS5lcnJvciggXCJ1bnN1cHBvcnRlZCBwc2V1ZG86IFwiICsgcHNldWRvICk7XG5cblx0XHRcdC8vIFRoZSB1c2VyIG1heSB1c2UgY3JlYXRlUHNldWRvIHRvIGluZGljYXRlIHRoYXRcblx0XHRcdC8vIGFyZ3VtZW50cyBhcmUgbmVlZGVkIHRvIGNyZWF0ZSB0aGUgZmlsdGVyIGZ1bmN0aW9uXG5cdFx0XHQvLyBqdXN0IGFzIFNpenpsZSBkb2VzXG5cdFx0XHRpZiAoIGZuWyBleHBhbmRvIF0gKSB7XG5cdFx0XHRcdHJldHVybiBmbiggYXJndW1lbnQgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQnV0IG1haW50YWluIHN1cHBvcnQgZm9yIG9sZCBzaWduYXR1cmVzXG5cdFx0XHRpZiAoIGZuLmxlbmd0aCA+IDEgKSB7XG5cdFx0XHRcdGFyZ3MgPSBbIHBzZXVkbywgcHNldWRvLCBcIlwiLCBhcmd1bWVudCBdO1xuXHRcdFx0XHRyZXR1cm4gRXhwci5zZXRGaWx0ZXJzLmhhc093blByb3BlcnR5KCBwc2V1ZG8udG9Mb3dlckNhc2UoKSApID9cblx0XHRcdFx0XHRtYXJrRnVuY3Rpb24oIGZ1bmN0aW9uKCBzZWVkLCBtYXRjaGVzICkge1xuXHRcdFx0XHRcdFx0dmFyIGlkeCxcblx0XHRcdFx0XHRcdFx0bWF0Y2hlZCA9IGZuKCBzZWVkLCBhcmd1bWVudCApLFxuXHRcdFx0XHRcdFx0XHRpID0gbWF0Y2hlZC5sZW5ndGg7XG5cdFx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdFx0aWR4ID0gaW5kZXhPZiggc2VlZCwgbWF0Y2hlZFsgaSBdICk7XG5cdFx0XHRcdFx0XHRcdHNlZWRbIGlkeCBdID0gISggbWF0Y2hlc1sgaWR4IF0gPSBtYXRjaGVkWyBpIF0gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9ICkgOlxuXHRcdFx0XHRcdGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuKCBlbGVtLCAwLCBhcmdzICk7XG5cdFx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZuO1xuXHRcdH1cblx0fSxcblxuXHRwc2V1ZG9zOiB7XG5cblx0XHQvLyBQb3RlbnRpYWxseSBjb21wbGV4IHBzZXVkb3Ncblx0XHRcIm5vdFwiOiBtYXJrRnVuY3Rpb24oIGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblxuXHRcdFx0Ly8gVHJpbSB0aGUgc2VsZWN0b3IgcGFzc2VkIHRvIGNvbXBpbGVcblx0XHRcdC8vIHRvIGF2b2lkIHRyZWF0aW5nIGxlYWRpbmcgYW5kIHRyYWlsaW5nXG5cdFx0XHQvLyBzcGFjZXMgYXMgY29tYmluYXRvcnNcblx0XHRcdHZhciBpbnB1dCA9IFtdLFxuXHRcdFx0XHRyZXN1bHRzID0gW10sXG5cdFx0XHRcdG1hdGNoZXIgPSBjb21waWxlKCBzZWxlY3Rvci5yZXBsYWNlKCBydHJpbSwgXCIkMVwiICkgKTtcblxuXHRcdFx0cmV0dXJuIG1hdGNoZXJbIGV4cGFuZG8gXSA/XG5cdFx0XHRcdG1hcmtGdW5jdGlvbiggZnVuY3Rpb24oIHNlZWQsIG1hdGNoZXMsIF9jb250ZXh0LCB4bWwgKSB7XG5cdFx0XHRcdFx0dmFyIGVsZW0sXG5cdFx0XHRcdFx0XHR1bm1hdGNoZWQgPSBtYXRjaGVyKCBzZWVkLCBudWxsLCB4bWwsIFtdICksXG5cdFx0XHRcdFx0XHRpID0gc2VlZC5sZW5ndGg7XG5cblx0XHRcdFx0XHQvLyBNYXRjaCBlbGVtZW50cyB1bm1hdGNoZWQgYnkgYG1hdGNoZXJgXG5cdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRpZiAoICggZWxlbSA9IHVubWF0Y2hlZFsgaSBdICkgKSB7XG5cdFx0XHRcdFx0XHRcdHNlZWRbIGkgXSA9ICEoIG1hdGNoZXNbIGkgXSA9IGVsZW0gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKSA6XG5cdFx0XHRcdGZ1bmN0aW9uKCBlbGVtLCBfY29udGV4dCwgeG1sICkge1xuXHRcdFx0XHRcdGlucHV0WyAwIF0gPSBlbGVtO1xuXHRcdFx0XHRcdG1hdGNoZXIoIGlucHV0LCBudWxsLCB4bWwsIHJlc3VsdHMgKTtcblxuXHRcdFx0XHRcdC8vIERvbid0IGtlZXAgdGhlIGVsZW1lbnQgKGlzc3VlICMyOTkpXG5cdFx0XHRcdFx0aW5wdXRbIDAgXSA9IG51bGw7XG5cdFx0XHRcdFx0cmV0dXJuICFyZXN1bHRzLnBvcCgpO1xuXHRcdFx0XHR9O1xuXHRcdH0gKSxcblxuXHRcdFwiaGFzXCI6IG1hcmtGdW5jdGlvbiggZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gU2l6emxlKCBzZWxlY3RvciwgZWxlbSApLmxlbmd0aCA+IDA7XG5cdFx0XHR9O1xuXHRcdH0gKSxcblxuXHRcdFwiY29udGFpbnNcIjogbWFya0Z1bmN0aW9uKCBmdW5jdGlvbiggdGV4dCApIHtcblx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHJldHVybiAoIGVsZW0udGV4dENvbnRlbnQgfHwgZ2V0VGV4dCggZWxlbSApICkuaW5kZXhPZiggdGV4dCApID4gLTE7XG5cdFx0XHR9O1xuXHRcdH0gKSxcblxuXHRcdC8vIFwiV2hldGhlciBhbiBlbGVtZW50IGlzIHJlcHJlc2VudGVkIGJ5IGEgOmxhbmcoKSBzZWxlY3RvclxuXHRcdC8vIGlzIGJhc2VkIHNvbGVseSBvbiB0aGUgZWxlbWVudCdzIGxhbmd1YWdlIHZhbHVlXG5cdFx0Ly8gYmVpbmcgZXF1YWwgdG8gdGhlIGlkZW50aWZpZXIgQyxcblx0XHQvLyBvciBiZWdpbm5pbmcgd2l0aCB0aGUgaWRlbnRpZmllciBDIGltbWVkaWF0ZWx5IGZvbGxvd2VkIGJ5IFwiLVwiLlxuXHRcdC8vIFRoZSBtYXRjaGluZyBvZiBDIGFnYWluc3QgdGhlIGVsZW1lbnQncyBsYW5ndWFnZSB2YWx1ZSBpcyBwZXJmb3JtZWQgY2FzZS1pbnNlbnNpdGl2ZWx5LlxuXHRcdC8vIFRoZSBpZGVudGlmaWVyIEMgZG9lcyBub3QgaGF2ZSB0byBiZSBhIHZhbGlkIGxhbmd1YWdlIG5hbWUuXCJcblx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI2xhbmctcHNldWRvXG5cdFx0XCJsYW5nXCI6IG1hcmtGdW5jdGlvbiggZnVuY3Rpb24oIGxhbmcgKSB7XG5cblx0XHRcdC8vIGxhbmcgdmFsdWUgbXVzdCBiZSBhIHZhbGlkIGlkZW50aWZpZXJcblx0XHRcdGlmICggIXJpZGVudGlmaWVyLnRlc3QoIGxhbmcgfHwgXCJcIiApICkge1xuXHRcdFx0XHRTaXp6bGUuZXJyb3IoIFwidW5zdXBwb3J0ZWQgbGFuZzogXCIgKyBsYW5nICk7XG5cdFx0XHR9XG5cdFx0XHRsYW5nID0gbGFuZy5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciBlbGVtTGFuZztcblx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdGlmICggKCBlbGVtTGFuZyA9IGRvY3VtZW50SXNIVE1MID9cblx0XHRcdFx0XHRcdGVsZW0ubGFuZyA6XG5cdFx0XHRcdFx0XHRlbGVtLmdldEF0dHJpYnV0ZSggXCJ4bWw6bGFuZ1wiICkgfHwgZWxlbS5nZXRBdHRyaWJ1dGUoIFwibGFuZ1wiICkgKSApIHtcblxuXHRcdFx0XHRcdFx0ZWxlbUxhbmcgPSBlbGVtTGFuZy50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW1MYW5nID09PSBsYW5nIHx8IGVsZW1MYW5nLmluZGV4T2YoIGxhbmcgKyBcIi1cIiApID09PSAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSB3aGlsZSAoICggZWxlbSA9IGVsZW0ucGFyZW50Tm9kZSApICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fTtcblx0XHR9ICksXG5cblx0XHQvLyBNaXNjZWxsYW5lb3VzXG5cdFx0XCJ0YXJnZXRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHR2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbiAmJiB3aW5kb3cubG9jYXRpb24uaGFzaDtcblx0XHRcdHJldHVybiBoYXNoICYmIGhhc2guc2xpY2UoIDEgKSA9PT0gZWxlbS5pZDtcblx0XHR9LFxuXG5cdFx0XCJyb290XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0gPT09IGRvY0VsZW07XG5cdFx0fSxcblxuXHRcdFwiZm9jdXNcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJlxuXHRcdFx0XHQoICFkb2N1bWVudC5oYXNGb2N1cyB8fCBkb2N1bWVudC5oYXNGb2N1cygpICkgJiZcblx0XHRcdFx0ISEoIGVsZW0udHlwZSB8fCBlbGVtLmhyZWYgfHwgfmVsZW0udGFiSW5kZXggKTtcblx0XHR9LFxuXG5cdFx0Ly8gQm9vbGVhbiBwcm9wZXJ0aWVzXG5cdFx0XCJlbmFibGVkXCI6IGNyZWF0ZURpc2FibGVkUHNldWRvKCBmYWxzZSApLFxuXHRcdFwiZGlzYWJsZWRcIjogY3JlYXRlRGlzYWJsZWRQc2V1ZG8oIHRydWUgKSxcblxuXHRcdFwiY2hlY2tlZFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdFx0Ly8gSW4gQ1NTMywgOmNoZWNrZWQgc2hvdWxkIHJldHVybiBib3RoIGNoZWNrZWQgYW5kIHNlbGVjdGVkIGVsZW1lbnRzXG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1JFQy1jc3MzLXNlbGVjdG9ycy0yMDExMDkyOS8jY2hlY2tlZFxuXHRcdFx0dmFyIG5vZGVOYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0cmV0dXJuICggbm9kZU5hbWUgPT09IFwiaW5wdXRcIiAmJiAhIWVsZW0uY2hlY2tlZCApIHx8XG5cdFx0XHRcdCggbm9kZU5hbWUgPT09IFwib3B0aW9uXCIgJiYgISFlbGVtLnNlbGVjdGVkICk7XG5cdFx0fSxcblxuXHRcdFwic2VsZWN0ZWRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHRcdC8vIEFjY2Vzc2luZyB0aGlzIHByb3BlcnR5IG1ha2VzIHNlbGVjdGVkLWJ5LWRlZmF1bHRcblx0XHRcdC8vIG9wdGlvbnMgaW4gU2FmYXJpIHdvcmsgcHJvcGVybHlcblx0XHRcdGlmICggZWxlbS5wYXJlbnROb2RlICkge1xuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG5cdFx0XHRcdGVsZW0ucGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZWxlbS5zZWxlY3RlZCA9PT0gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0Ly8gQ29udGVudHNcblx0XHRcImVtcHR5XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI2VtcHR5LXBzZXVkb1xuXHRcdFx0Ly8gOmVtcHR5IGlzIG5lZ2F0ZWQgYnkgZWxlbWVudCAoMSkgb3IgY29udGVudCBub2RlcyAodGV4dDogMzsgY2RhdGE6IDQ7IGVudGl0eSByZWY6IDUpLFxuXHRcdFx0Ly8gICBidXQgbm90IGJ5IG90aGVycyAoY29tbWVudDogODsgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbjogNzsgZXRjLilcblx0XHRcdC8vIG5vZGVUeXBlIDwgNiB3b3JrcyBiZWNhdXNlIGF0dHJpYnV0ZXMgKDIpIGRvIG5vdCBhcHBlYXIgYXMgY2hpbGRyZW5cblx0XHRcdGZvciAoIGVsZW0gPSBlbGVtLmZpcnN0Q2hpbGQ7IGVsZW07IGVsZW0gPSBlbGVtLm5leHRTaWJsaW5nICkge1xuXHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPCA2ICkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblxuXHRcdFwicGFyZW50XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuICFFeHByLnBzZXVkb3NbIFwiZW1wdHlcIiBdKCBlbGVtICk7XG5cdFx0fSxcblxuXHRcdC8vIEVsZW1lbnQvaW5wdXQgdHlwZXNcblx0XHRcImhlYWRlclwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiByaGVhZGVyLnRlc3QoIGVsZW0ubm9kZU5hbWUgKTtcblx0XHR9LFxuXG5cdFx0XCJpbnB1dFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiByaW5wdXRzLnRlc3QoIGVsZW0ubm9kZU5hbWUgKTtcblx0XHR9LFxuXG5cdFx0XCJidXR0b25cIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHR2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdHJldHVybiBuYW1lID09PSBcImlucHV0XCIgJiYgZWxlbS50eXBlID09PSBcImJ1dHRvblwiIHx8IG5hbWUgPT09IFwiYnV0dG9uXCI7XG5cdFx0fSxcblxuXHRcdFwidGV4dFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBhdHRyO1xuXHRcdFx0cmV0dXJuIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnB1dFwiICYmXG5cdFx0XHRcdGVsZW0udHlwZSA9PT0gXCJ0ZXh0XCIgJiZcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRTw4XG5cdFx0XHRcdC8vIE5ldyBIVE1MNSBhdHRyaWJ1dGUgdmFsdWVzIChlLmcuLCBcInNlYXJjaFwiKSBhcHBlYXIgd2l0aCBlbGVtLnR5cGUgPT09IFwidGV4dFwiXG5cdFx0XHRcdCggKCBhdHRyID0gZWxlbS5nZXRBdHRyaWJ1dGUoIFwidHlwZVwiICkgKSA9PSBudWxsIHx8XG5cdFx0XHRcdFx0YXR0ci50b0xvd2VyQ2FzZSgpID09PSBcInRleHRcIiApO1xuXHRcdH0sXG5cblx0XHQvLyBQb3NpdGlvbi1pbi1jb2xsZWN0aW9uXG5cdFx0XCJmaXJzdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKCBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBbIDAgXTtcblx0XHR9ICksXG5cblx0XHRcImxhc3RcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyggZnVuY3Rpb24oIF9tYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcblx0XHRcdHJldHVybiBbIGxlbmd0aCAtIDEgXTtcblx0XHR9ICksXG5cblx0XHRcImVxXCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oIGZ1bmN0aW9uKCBfbWF0Y2hJbmRleGVzLCBsZW5ndGgsIGFyZ3VtZW50ICkge1xuXHRcdFx0cmV0dXJuIFsgYXJndW1lbnQgPCAwID8gYXJndW1lbnQgKyBsZW5ndGggOiBhcmd1bWVudCBdO1xuXHRcdH0gKSxcblxuXHRcdFwiZXZlblwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKCBmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGggKSB7XG5cdFx0XHR2YXIgaSA9IDA7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkgKz0gMiApIHtcblx0XHRcdFx0bWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYXRjaEluZGV4ZXM7XG5cdFx0fSApLFxuXG5cdFx0XCJvZGRcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyggZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoICkge1xuXHRcdFx0dmFyIGkgPSAxO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpICs9IDIgKSB7XG5cdFx0XHRcdG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF0Y2hJbmRleGVzO1xuXHRcdH0gKSxcblxuXHRcdFwibHRcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyggZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoLCBhcmd1bWVudCApIHtcblx0XHRcdHZhciBpID0gYXJndW1lbnQgPCAwID9cblx0XHRcdFx0YXJndW1lbnQgKyBsZW5ndGggOlxuXHRcdFx0XHRhcmd1bWVudCA+IGxlbmd0aCA/XG5cdFx0XHRcdFx0bGVuZ3RoIDpcblx0XHRcdFx0XHRhcmd1bWVudDtcblx0XHRcdGZvciAoIDsgLS1pID49IDA7ICkge1xuXHRcdFx0XHRtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1hdGNoSW5kZXhlcztcblx0XHR9ICksXG5cblx0XHRcImd0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oIGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG5cdFx0XHR2YXIgaSA9IGFyZ3VtZW50IDwgMCA/IGFyZ3VtZW50ICsgbGVuZ3RoIDogYXJndW1lbnQ7XG5cdFx0XHRmb3IgKCA7ICsraSA8IGxlbmd0aDsgKSB7XG5cdFx0XHRcdG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF0Y2hJbmRleGVzO1xuXHRcdH0gKVxuXHR9XG59O1xuXG5FeHByLnBzZXVkb3NbIFwibnRoXCIgXSA9IEV4cHIucHNldWRvc1sgXCJlcVwiIF07XG5cbi8vIEFkZCBidXR0b24vaW5wdXQgdHlwZSBwc2V1ZG9zXG5mb3IgKCBpIGluIHsgcmFkaW86IHRydWUsIGNoZWNrYm94OiB0cnVlLCBmaWxlOiB0cnVlLCBwYXNzd29yZDogdHJ1ZSwgaW1hZ2U6IHRydWUgfSApIHtcblx0RXhwci5wc2V1ZG9zWyBpIF0gPSBjcmVhdGVJbnB1dFBzZXVkbyggaSApO1xufVxuZm9yICggaSBpbiB7IHN1Ym1pdDogdHJ1ZSwgcmVzZXQ6IHRydWUgfSApIHtcblx0RXhwci5wc2V1ZG9zWyBpIF0gPSBjcmVhdGVCdXR0b25Qc2V1ZG8oIGkgKTtcbn1cblxuLy8gRWFzeSBBUEkgZm9yIGNyZWF0aW5nIG5ldyBzZXRGaWx0ZXJzXG5mdW5jdGlvbiBzZXRGaWx0ZXJzKCkge31cbnNldEZpbHRlcnMucHJvdG90eXBlID0gRXhwci5maWx0ZXJzID0gRXhwci5wc2V1ZG9zO1xuRXhwci5zZXRGaWx0ZXJzID0gbmV3IHNldEZpbHRlcnMoKTtcblxudG9rZW5pemUgPSBTaXp6bGUudG9rZW5pemUgPSBmdW5jdGlvbiggc2VsZWN0b3IsIHBhcnNlT25seSApIHtcblx0dmFyIG1hdGNoZWQsIG1hdGNoLCB0b2tlbnMsIHR5cGUsXG5cdFx0c29GYXIsIGdyb3VwcywgcHJlRmlsdGVycyxcblx0XHRjYWNoZWQgPSB0b2tlbkNhY2hlWyBzZWxlY3RvciArIFwiIFwiIF07XG5cblx0aWYgKCBjYWNoZWQgKSB7XG5cdFx0cmV0dXJuIHBhcnNlT25seSA/IDAgOiBjYWNoZWQuc2xpY2UoIDAgKTtcblx0fVxuXG5cdHNvRmFyID0gc2VsZWN0b3I7XG5cdGdyb3VwcyA9IFtdO1xuXHRwcmVGaWx0ZXJzID0gRXhwci5wcmVGaWx0ZXI7XG5cblx0d2hpbGUgKCBzb0ZhciApIHtcblxuXHRcdC8vIENvbW1hIGFuZCBmaXJzdCBydW5cblx0XHRpZiAoICFtYXRjaGVkIHx8ICggbWF0Y2ggPSByY29tbWEuZXhlYyggc29GYXIgKSApICkge1xuXHRcdFx0aWYgKCBtYXRjaCApIHtcblxuXHRcdFx0XHQvLyBEb24ndCBjb25zdW1lIHRyYWlsaW5nIGNvbW1hcyBhcyB2YWxpZFxuXHRcdFx0XHRzb0ZhciA9IHNvRmFyLnNsaWNlKCBtYXRjaFsgMCBdLmxlbmd0aCApIHx8IHNvRmFyO1xuXHRcdFx0fVxuXHRcdFx0Z3JvdXBzLnB1c2goICggdG9rZW5zID0gW10gKSApO1xuXHRcdH1cblxuXHRcdG1hdGNoZWQgPSBmYWxzZTtcblxuXHRcdC8vIENvbWJpbmF0b3JzXG5cdFx0aWYgKCAoIG1hdGNoID0gcmNvbWJpbmF0b3JzLmV4ZWMoIHNvRmFyICkgKSApIHtcblx0XHRcdG1hdGNoZWQgPSBtYXRjaC5zaGlmdCgpO1xuXHRcdFx0dG9rZW5zLnB1c2goIHtcblx0XHRcdFx0dmFsdWU6IG1hdGNoZWQsXG5cblx0XHRcdFx0Ly8gQ2FzdCBkZXNjZW5kYW50IGNvbWJpbmF0b3JzIHRvIHNwYWNlXG5cdFx0XHRcdHR5cGU6IG1hdGNoWyAwIF0ucmVwbGFjZSggcnRyaW0sIFwiIFwiIClcblx0XHRcdH0gKTtcblx0XHRcdHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoZWQubGVuZ3RoICk7XG5cdFx0fVxuXG5cdFx0Ly8gRmlsdGVyc1xuXHRcdGZvciAoIHR5cGUgaW4gRXhwci5maWx0ZXIgKSB7XG5cdFx0XHRpZiAoICggbWF0Y2ggPSBtYXRjaEV4cHJbIHR5cGUgXS5leGVjKCBzb0ZhciApICkgJiYgKCAhcHJlRmlsdGVyc1sgdHlwZSBdIHx8XG5cdFx0XHRcdCggbWF0Y2ggPSBwcmVGaWx0ZXJzWyB0eXBlIF0oIG1hdGNoICkgKSApICkge1xuXHRcdFx0XHRtYXRjaGVkID0gbWF0Y2guc2hpZnQoKTtcblx0XHRcdFx0dG9rZW5zLnB1c2goIHtcblx0XHRcdFx0XHR2YWx1ZTogbWF0Y2hlZCxcblx0XHRcdFx0XHR0eXBlOiB0eXBlLFxuXHRcdFx0XHRcdG1hdGNoZXM6IG1hdGNoXG5cdFx0XHRcdH0gKTtcblx0XHRcdFx0c29GYXIgPSBzb0Zhci5zbGljZSggbWF0Y2hlZC5sZW5ndGggKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoICFtYXRjaGVkICkge1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBsZW5ndGggb2YgdGhlIGludmFsaWQgZXhjZXNzXG5cdC8vIGlmIHdlJ3JlIGp1c3QgcGFyc2luZ1xuXHQvLyBPdGhlcndpc2UsIHRocm93IGFuIGVycm9yIG9yIHJldHVybiB0b2tlbnNcblx0cmV0dXJuIHBhcnNlT25seSA/XG5cdFx0c29GYXIubGVuZ3RoIDpcblx0XHRzb0ZhciA/XG5cdFx0XHRTaXp6bGUuZXJyb3IoIHNlbGVjdG9yICkgOlxuXG5cdFx0XHQvLyBDYWNoZSB0aGUgdG9rZW5zXG5cdFx0XHR0b2tlbkNhY2hlKCBzZWxlY3RvciwgZ3JvdXBzICkuc2xpY2UoIDAgKTtcbn07XG5cbmZ1bmN0aW9uIHRvU2VsZWN0b3IoIHRva2VucyApIHtcblx0dmFyIGkgPSAwLFxuXHRcdGxlbiA9IHRva2Vucy5sZW5ndGgsXG5cdFx0c2VsZWN0b3IgPSBcIlwiO1xuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRzZWxlY3RvciArPSB0b2tlbnNbIGkgXS52YWx1ZTtcblx0fVxuXHRyZXR1cm4gc2VsZWN0b3I7XG59XG5cbmZ1bmN0aW9uIGFkZENvbWJpbmF0b3IoIG1hdGNoZXIsIGNvbWJpbmF0b3IsIGJhc2UgKSB7XG5cdHZhciBkaXIgPSBjb21iaW5hdG9yLmRpcixcblx0XHRza2lwID0gY29tYmluYXRvci5uZXh0LFxuXHRcdGtleSA9IHNraXAgfHwgZGlyLFxuXHRcdGNoZWNrTm9uRWxlbWVudHMgPSBiYXNlICYmIGtleSA9PT0gXCJwYXJlbnROb2RlXCIsXG5cdFx0ZG9uZU5hbWUgPSBkb25lKys7XG5cblx0cmV0dXJuIGNvbWJpbmF0b3IuZmlyc3QgP1xuXG5cdFx0Ly8gQ2hlY2sgYWdhaW5zdCBjbG9zZXN0IGFuY2VzdG9yL3ByZWNlZGluZyBlbGVtZW50XG5cdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdHdoaWxlICggKCBlbGVtID0gZWxlbVsgZGlyIF0gKSApIHtcblx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGNoZWNrTm9uRWxlbWVudHMgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSA6XG5cblx0XHQvLyBDaGVjayBhZ2FpbnN0IGFsbCBhbmNlc3Rvci9wcmVjZWRpbmcgZWxlbWVudHNcblx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0dmFyIG9sZENhY2hlLCB1bmlxdWVDYWNoZSwgb3V0ZXJDYWNoZSxcblx0XHRcdFx0bmV3Q2FjaGUgPSBbIGRpcnJ1bnMsIGRvbmVOYW1lIF07XG5cblx0XHRcdC8vIFdlIGNhbid0IHNldCBhcmJpdHJhcnkgZGF0YSBvbiBYTUwgbm9kZXMsIHNvIHRoZXkgZG9uJ3QgYmVuZWZpdCBmcm9tIGNvbWJpbmF0b3IgY2FjaGluZ1xuXHRcdFx0aWYgKCB4bWwgKSB7XG5cdFx0XHRcdHdoaWxlICggKCBlbGVtID0gZWxlbVsgZGlyIF0gKSApIHtcblx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgY2hlY2tOb25FbGVtZW50cyApIHtcblx0XHRcdFx0XHRcdGlmICggbWF0Y2hlciggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0d2hpbGUgKCAoIGVsZW0gPSBlbGVtWyBkaXIgXSApICkge1xuXHRcdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBjaGVja05vbkVsZW1lbnRzICkge1xuXHRcdFx0XHRcdFx0b3V0ZXJDYWNoZSA9IGVsZW1bIGV4cGFuZG8gXSB8fCAoIGVsZW1bIGV4cGFuZG8gXSA9IHt9ICk7XG5cblx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw5IG9ubHlcblx0XHRcdFx0XHRcdC8vIERlZmVuZCBhZ2FpbnN0IGNsb25lZCBhdHRyb3BlcnRpZXMgKGpRdWVyeSBnaC0xNzA5KVxuXHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGUgPSBvdXRlckNhY2hlWyBlbGVtLnVuaXF1ZUlEIF0gfHxcblx0XHRcdFx0XHRcdFx0KCBvdXRlckNhY2hlWyBlbGVtLnVuaXF1ZUlEIF0gPSB7fSApO1xuXG5cdFx0XHRcdFx0XHRpZiAoIHNraXAgJiYgc2tpcCA9PT0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICkge1xuXHRcdFx0XHRcdFx0XHRlbGVtID0gZWxlbVsgZGlyIF0gfHwgZWxlbTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoICggb2xkQ2FjaGUgPSB1bmlxdWVDYWNoZVsga2V5IF0gKSAmJlxuXHRcdFx0XHRcdFx0XHRvbGRDYWNoZVsgMCBdID09PSBkaXJydW5zICYmIG9sZENhY2hlWyAxIF0gPT09IGRvbmVOYW1lICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIEFzc2lnbiB0byBuZXdDYWNoZSBzbyByZXN1bHRzIGJhY2stcHJvcGFnYXRlIHRvIHByZXZpb3VzIGVsZW1lbnRzXG5cdFx0XHRcdFx0XHRcdHJldHVybiAoIG5ld0NhY2hlWyAyIF0gPSBvbGRDYWNoZVsgMiBdICk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRcdC8vIFJldXNlIG5ld2NhY2hlIHNvIHJlc3VsdHMgYmFjay1wcm9wYWdhdGUgdG8gcHJldmlvdXMgZWxlbWVudHNcblx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGVbIGtleSBdID0gbmV3Q2FjaGU7XG5cblx0XHRcdFx0XHRcdFx0Ly8gQSBtYXRjaCBtZWFucyB3ZSdyZSBkb25lOyBhIGZhaWwgbWVhbnMgd2UgaGF2ZSB0byBrZWVwIGNoZWNraW5nXG5cdFx0XHRcdFx0XHRcdGlmICggKCBuZXdDYWNoZVsgMiBdID0gbWF0Y2hlciggZWxlbSwgY29udGV4dCwgeG1sICkgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG59XG5cbmZ1bmN0aW9uIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApIHtcblx0cmV0dXJuIG1hdGNoZXJzLmxlbmd0aCA+IDEgP1xuXHRcdGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHR2YXIgaSA9IG1hdGNoZXJzLmxlbmd0aDtcblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRpZiAoICFtYXRjaGVyc1sgaSBdKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gOlxuXHRcdG1hdGNoZXJzWyAwIF07XG59XG5cbmZ1bmN0aW9uIG11bHRpcGxlQ29udGV4dHMoIHNlbGVjdG9yLCBjb250ZXh0cywgcmVzdWx0cyApIHtcblx0dmFyIGkgPSAwLFxuXHRcdGxlbiA9IGNvbnRleHRzLmxlbmd0aDtcblx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0U2l6emxlKCBzZWxlY3RvciwgY29udGV4dHNbIGkgXSwgcmVzdWx0cyApO1xuXHR9XG5cdHJldHVybiByZXN1bHRzO1xufVxuXG5mdW5jdGlvbiBjb25kZW5zZSggdW5tYXRjaGVkLCBtYXAsIGZpbHRlciwgY29udGV4dCwgeG1sICkge1xuXHR2YXIgZWxlbSxcblx0XHRuZXdVbm1hdGNoZWQgPSBbXSxcblx0XHRpID0gMCxcblx0XHRsZW4gPSB1bm1hdGNoZWQubGVuZ3RoLFxuXHRcdG1hcHBlZCA9IG1hcCAhPSBudWxsO1xuXG5cdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdGlmICggKCBlbGVtID0gdW5tYXRjaGVkWyBpIF0gKSApIHtcblx0XHRcdGlmICggIWZpbHRlciB8fCBmaWx0ZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApICkge1xuXHRcdFx0XHRuZXdVbm1hdGNoZWQucHVzaCggZWxlbSApO1xuXHRcdFx0XHRpZiAoIG1hcHBlZCApIHtcblx0XHRcdFx0XHRtYXAucHVzaCggaSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG5ld1VubWF0Y2hlZDtcbn1cblxuZnVuY3Rpb24gc2V0TWF0Y2hlciggcHJlRmlsdGVyLCBzZWxlY3RvciwgbWF0Y2hlciwgcG9zdEZpbHRlciwgcG9zdEZpbmRlciwgcG9zdFNlbGVjdG9yICkge1xuXHRpZiAoIHBvc3RGaWx0ZXIgJiYgIXBvc3RGaWx0ZXJbIGV4cGFuZG8gXSApIHtcblx0XHRwb3N0RmlsdGVyID0gc2V0TWF0Y2hlciggcG9zdEZpbHRlciApO1xuXHR9XG5cdGlmICggcG9zdEZpbmRlciAmJiAhcG9zdEZpbmRlclsgZXhwYW5kbyBdICkge1xuXHRcdHBvc3RGaW5kZXIgPSBzZXRNYXRjaGVyKCBwb3N0RmluZGVyLCBwb3N0U2VsZWN0b3IgKTtcblx0fVxuXHRyZXR1cm4gbWFya0Z1bmN0aW9uKCBmdW5jdGlvbiggc2VlZCwgcmVzdWx0cywgY29udGV4dCwgeG1sICkge1xuXHRcdHZhciB0ZW1wLCBpLCBlbGVtLFxuXHRcdFx0cHJlTWFwID0gW10sXG5cdFx0XHRwb3N0TWFwID0gW10sXG5cdFx0XHRwcmVleGlzdGluZyA9IHJlc3VsdHMubGVuZ3RoLFxuXG5cdFx0XHQvLyBHZXQgaW5pdGlhbCBlbGVtZW50cyBmcm9tIHNlZWQgb3IgY29udGV4dFxuXHRcdFx0ZWxlbXMgPSBzZWVkIHx8IG11bHRpcGxlQ29udGV4dHMoXG5cdFx0XHRcdHNlbGVjdG9yIHx8IFwiKlwiLFxuXHRcdFx0XHRjb250ZXh0Lm5vZGVUeXBlID8gWyBjb250ZXh0IF0gOiBjb250ZXh0LFxuXHRcdFx0XHRbXVxuXHRcdFx0KSxcblxuXHRcdFx0Ly8gUHJlZmlsdGVyIHRvIGdldCBtYXRjaGVyIGlucHV0LCBwcmVzZXJ2aW5nIGEgbWFwIGZvciBzZWVkLXJlc3VsdHMgc3luY2hyb25pemF0aW9uXG5cdFx0XHRtYXRjaGVySW4gPSBwcmVGaWx0ZXIgJiYgKCBzZWVkIHx8ICFzZWxlY3RvciApID9cblx0XHRcdFx0Y29uZGVuc2UoIGVsZW1zLCBwcmVNYXAsIHByZUZpbHRlciwgY29udGV4dCwgeG1sICkgOlxuXHRcdFx0XHRlbGVtcyxcblxuXHRcdFx0bWF0Y2hlck91dCA9IG1hdGNoZXIgP1xuXG5cdFx0XHRcdC8vIElmIHdlIGhhdmUgYSBwb3N0RmluZGVyLCBvciBmaWx0ZXJlZCBzZWVkLCBvciBub24tc2VlZCBwb3N0RmlsdGVyIG9yIHByZWV4aXN0aW5nIHJlc3VsdHMsXG5cdFx0XHRcdHBvc3RGaW5kZXIgfHwgKCBzZWVkID8gcHJlRmlsdGVyIDogcHJlZXhpc3RpbmcgfHwgcG9zdEZpbHRlciApID9cblxuXHRcdFx0XHRcdC8vIC4uLmludGVybWVkaWF0ZSBwcm9jZXNzaW5nIGlzIG5lY2Vzc2FyeVxuXHRcdFx0XHRcdFtdIDpcblxuXHRcdFx0XHRcdC8vIC4uLm90aGVyd2lzZSB1c2UgcmVzdWx0cyBkaXJlY3RseVxuXHRcdFx0XHRcdHJlc3VsdHMgOlxuXHRcdFx0XHRtYXRjaGVySW47XG5cblx0XHQvLyBGaW5kIHByaW1hcnkgbWF0Y2hlc1xuXHRcdGlmICggbWF0Y2hlciApIHtcblx0XHRcdG1hdGNoZXIoIG1hdGNoZXJJbiwgbWF0Y2hlck91dCwgY29udGV4dCwgeG1sICk7XG5cdFx0fVxuXG5cdFx0Ly8gQXBwbHkgcG9zdEZpbHRlclxuXHRcdGlmICggcG9zdEZpbHRlciApIHtcblx0XHRcdHRlbXAgPSBjb25kZW5zZSggbWF0Y2hlck91dCwgcG9zdE1hcCApO1xuXHRcdFx0cG9zdEZpbHRlciggdGVtcCwgW10sIGNvbnRleHQsIHhtbCApO1xuXG5cdFx0XHQvLyBVbi1tYXRjaCBmYWlsaW5nIGVsZW1lbnRzIGJ5IG1vdmluZyB0aGVtIGJhY2sgdG8gbWF0Y2hlckluXG5cdFx0XHRpID0gdGVtcC5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0aWYgKCAoIGVsZW0gPSB0ZW1wWyBpIF0gKSApIHtcblx0XHRcdFx0XHRtYXRjaGVyT3V0WyBwb3N0TWFwWyBpIF0gXSA9ICEoIG1hdGNoZXJJblsgcG9zdE1hcFsgaSBdIF0gPSBlbGVtICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIHNlZWQgKSB7XG5cdFx0XHRpZiAoIHBvc3RGaW5kZXIgfHwgcHJlRmlsdGVyICkge1xuXHRcdFx0XHRpZiAoIHBvc3RGaW5kZXIgKSB7XG5cblx0XHRcdFx0XHQvLyBHZXQgdGhlIGZpbmFsIG1hdGNoZXJPdXQgYnkgY29uZGVuc2luZyB0aGlzIGludGVybWVkaWF0ZSBpbnRvIHBvc3RGaW5kZXIgY29udGV4dHNcblx0XHRcdFx0XHR0ZW1wID0gW107XG5cdFx0XHRcdFx0aSA9IG1hdGNoZXJPdXQubGVuZ3RoO1xuXHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoIGVsZW0gPSBtYXRjaGVyT3V0WyBpIF0gKSApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBSZXN0b3JlIG1hdGNoZXJJbiBzaW5jZSBlbGVtIGlzIG5vdCB5ZXQgYSBmaW5hbCBtYXRjaFxuXHRcdFx0XHRcdFx0XHR0ZW1wLnB1c2goICggbWF0Y2hlckluWyBpIF0gPSBlbGVtICkgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cG9zdEZpbmRlciggbnVsbCwgKCBtYXRjaGVyT3V0ID0gW10gKSwgdGVtcCwgeG1sICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBNb3ZlIG1hdGNoZWQgZWxlbWVudHMgZnJvbSBzZWVkIHRvIHJlc3VsdHMgdG8ga2VlcCB0aGVtIHN5bmNocm9uaXplZFxuXHRcdFx0XHRpID0gbWF0Y2hlck91dC5sZW5ndGg7XG5cdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdGlmICggKCBlbGVtID0gbWF0Y2hlck91dFsgaSBdICkgJiZcblx0XHRcdFx0XHRcdCggdGVtcCA9IHBvc3RGaW5kZXIgPyBpbmRleE9mKCBzZWVkLCBlbGVtICkgOiBwcmVNYXBbIGkgXSApID4gLTEgKSB7XG5cblx0XHRcdFx0XHRcdHNlZWRbIHRlbXAgXSA9ICEoIHJlc3VsdHNbIHRlbXAgXSA9IGVsZW0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdC8vIEFkZCBlbGVtZW50cyB0byByZXN1bHRzLCB0aHJvdWdoIHBvc3RGaW5kZXIgaWYgZGVmaW5lZFxuXHRcdH0gZWxzZSB7XG5cdFx0XHRtYXRjaGVyT3V0ID0gY29uZGVuc2UoXG5cdFx0XHRcdG1hdGNoZXJPdXQgPT09IHJlc3VsdHMgP1xuXHRcdFx0XHRcdG1hdGNoZXJPdXQuc3BsaWNlKCBwcmVleGlzdGluZywgbWF0Y2hlck91dC5sZW5ndGggKSA6XG5cdFx0XHRcdFx0bWF0Y2hlck91dFxuXHRcdFx0KTtcblx0XHRcdGlmICggcG9zdEZpbmRlciApIHtcblx0XHRcdFx0cG9zdEZpbmRlciggbnVsbCwgcmVzdWx0cywgbWF0Y2hlck91dCwgeG1sICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBtYXRjaGVyT3V0ICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9ICk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXJGcm9tVG9rZW5zKCB0b2tlbnMgKSB7XG5cdHZhciBjaGVja0NvbnRleHQsIG1hdGNoZXIsIGosXG5cdFx0bGVuID0gdG9rZW5zLmxlbmd0aCxcblx0XHRsZWFkaW5nUmVsYXRpdmUgPSBFeHByLnJlbGF0aXZlWyB0b2tlbnNbIDAgXS50eXBlIF0sXG5cdFx0aW1wbGljaXRSZWxhdGl2ZSA9IGxlYWRpbmdSZWxhdGl2ZSB8fCBFeHByLnJlbGF0aXZlWyBcIiBcIiBdLFxuXHRcdGkgPSBsZWFkaW5nUmVsYXRpdmUgPyAxIDogMCxcblxuXHRcdC8vIFRoZSBmb3VuZGF0aW9uYWwgbWF0Y2hlciBlbnN1cmVzIHRoYXQgZWxlbWVudHMgYXJlIHJlYWNoYWJsZSBmcm9tIHRvcC1sZXZlbCBjb250ZXh0KHMpXG5cdFx0bWF0Y2hDb250ZXh0ID0gYWRkQ29tYmluYXRvciggZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbSA9PT0gY2hlY2tDb250ZXh0O1xuXHRcdH0sIGltcGxpY2l0UmVsYXRpdmUsIHRydWUgKSxcblx0XHRtYXRjaEFueUNvbnRleHQgPSBhZGRDb21iaW5hdG9yKCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBpbmRleE9mKCBjaGVja0NvbnRleHQsIGVsZW0gKSA+IC0xO1xuXHRcdH0sIGltcGxpY2l0UmVsYXRpdmUsIHRydWUgKSxcblx0XHRtYXRjaGVycyA9IFsgZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdHZhciByZXQgPSAoICFsZWFkaW5nUmVsYXRpdmUgJiYgKCB4bWwgfHwgY29udGV4dCAhPT0gb3V0ZXJtb3N0Q29udGV4dCApICkgfHwgKFxuXHRcdFx0XHQoIGNoZWNrQ29udGV4dCA9IGNvbnRleHQgKS5ub2RlVHlwZSA/XG5cdFx0XHRcdFx0bWF0Y2hDb250ZXh0KCBlbGVtLCBjb250ZXh0LCB4bWwgKSA6XG5cdFx0XHRcdFx0bWF0Y2hBbnlDb250ZXh0KCBlbGVtLCBjb250ZXh0LCB4bWwgKSApO1xuXG5cdFx0XHQvLyBBdm9pZCBoYW5naW5nIG9udG8gZWxlbWVudCAoaXNzdWUgIzI5OSlcblx0XHRcdGNoZWNrQ29udGV4dCA9IG51bGw7XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH0gXTtcblxuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRpZiAoICggbWF0Y2hlciA9IEV4cHIucmVsYXRpdmVbIHRva2Vuc1sgaSBdLnR5cGUgXSApICkge1xuXHRcdFx0bWF0Y2hlcnMgPSBbIGFkZENvbWJpbmF0b3IoIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApLCBtYXRjaGVyICkgXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWF0Y2hlciA9IEV4cHIuZmlsdGVyWyB0b2tlbnNbIGkgXS50eXBlIF0uYXBwbHkoIG51bGwsIHRva2Vuc1sgaSBdLm1hdGNoZXMgKTtcblxuXHRcdFx0Ly8gUmV0dXJuIHNwZWNpYWwgdXBvbiBzZWVpbmcgYSBwb3NpdGlvbmFsIG1hdGNoZXJcblx0XHRcdGlmICggbWF0Y2hlclsgZXhwYW5kbyBdICkge1xuXG5cdFx0XHRcdC8vIEZpbmQgdGhlIG5leHQgcmVsYXRpdmUgb3BlcmF0b3IgKGlmIGFueSkgZm9yIHByb3BlciBoYW5kbGluZ1xuXHRcdFx0XHRqID0gKytpO1xuXHRcdFx0XHRmb3IgKCA7IGogPCBsZW47IGorKyApIHtcblx0XHRcdFx0XHRpZiAoIEV4cHIucmVsYXRpdmVbIHRva2Vuc1sgaiBdLnR5cGUgXSApIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gc2V0TWF0Y2hlcihcblx0XHRcdFx0XHRpID4gMSAmJiBlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKSxcblx0XHRcdFx0XHRpID4gMSAmJiB0b1NlbGVjdG9yKFxuXG5cdFx0XHRcdFx0Ly8gSWYgdGhlIHByZWNlZGluZyB0b2tlbiB3YXMgYSBkZXNjZW5kYW50IGNvbWJpbmF0b3IsIGluc2VydCBhbiBpbXBsaWNpdCBhbnktZWxlbWVudCBgKmBcblx0XHRcdFx0XHR0b2tlbnNcblx0XHRcdFx0XHRcdC5zbGljZSggMCwgaSAtIDEgKVxuXHRcdFx0XHRcdFx0LmNvbmNhdCggeyB2YWx1ZTogdG9rZW5zWyBpIC0gMiBdLnR5cGUgPT09IFwiIFwiID8gXCIqXCIgOiBcIlwiIH0gKVxuXHRcdFx0XHRcdCkucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApLFxuXHRcdFx0XHRcdG1hdGNoZXIsXG5cdFx0XHRcdFx0aSA8IGogJiYgbWF0Y2hlckZyb21Ub2tlbnMoIHRva2Vucy5zbGljZSggaSwgaiApICksXG5cdFx0XHRcdFx0aiA8IGxlbiAmJiBtYXRjaGVyRnJvbVRva2VucyggKCB0b2tlbnMgPSB0b2tlbnMuc2xpY2UoIGogKSApICksXG5cdFx0XHRcdFx0aiA8IGxlbiAmJiB0b1NlbGVjdG9yKCB0b2tlbnMgKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0bWF0Y2hlcnMucHVzaCggbWF0Y2hlciApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hlckZyb21Hcm91cE1hdGNoZXJzKCBlbGVtZW50TWF0Y2hlcnMsIHNldE1hdGNoZXJzICkge1xuXHR2YXIgYnlTZXQgPSBzZXRNYXRjaGVycy5sZW5ndGggPiAwLFxuXHRcdGJ5RWxlbWVudCA9IGVsZW1lbnRNYXRjaGVycy5sZW5ndGggPiAwLFxuXHRcdHN1cGVyTWF0Y2hlciA9IGZ1bmN0aW9uKCBzZWVkLCBjb250ZXh0LCB4bWwsIHJlc3VsdHMsIG91dGVybW9zdCApIHtcblx0XHRcdHZhciBlbGVtLCBqLCBtYXRjaGVyLFxuXHRcdFx0XHRtYXRjaGVkQ291bnQgPSAwLFxuXHRcdFx0XHRpID0gXCIwXCIsXG5cdFx0XHRcdHVubWF0Y2hlZCA9IHNlZWQgJiYgW10sXG5cdFx0XHRcdHNldE1hdGNoZWQgPSBbXSxcblx0XHRcdFx0Y29udGV4dEJhY2t1cCA9IG91dGVybW9zdENvbnRleHQsXG5cblx0XHRcdFx0Ly8gV2UgbXVzdCBhbHdheXMgaGF2ZSBlaXRoZXIgc2VlZCBlbGVtZW50cyBvciBvdXRlcm1vc3QgY29udGV4dFxuXHRcdFx0XHRlbGVtcyA9IHNlZWQgfHwgYnlFbGVtZW50ICYmIEV4cHIuZmluZFsgXCJUQUdcIiBdKCBcIipcIiwgb3V0ZXJtb3N0ICksXG5cblx0XHRcdFx0Ly8gVXNlIGludGVnZXIgZGlycnVucyBpZmYgdGhpcyBpcyB0aGUgb3V0ZXJtb3N0IG1hdGNoZXJcblx0XHRcdFx0ZGlycnVuc1VuaXF1ZSA9ICggZGlycnVucyArPSBjb250ZXh0QmFja3VwID09IG51bGwgPyAxIDogTWF0aC5yYW5kb20oKSB8fCAwLjEgKSxcblx0XHRcdFx0bGVuID0gZWxlbXMubGVuZ3RoO1xuXG5cdFx0XHRpZiAoIG91dGVybW9zdCApIHtcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRSAxMSssIEVkZ2UgMTcgLSAxOCtcblx0XHRcdFx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdFx0XHRcdC8vIHR3byBkb2N1bWVudHM7IHNoYWxsb3cgY29tcGFyaXNvbnMgd29yay5cblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXHRcdFx0XHRvdXRlcm1vc3RDb250ZXh0ID0gY29udGV4dCA9PSBkb2N1bWVudCB8fCBjb250ZXh0IHx8IG91dGVybW9zdDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIGVsZW1lbnRzIHBhc3NpbmcgZWxlbWVudE1hdGNoZXJzIGRpcmVjdGx5IHRvIHJlc3VsdHNcblx0XHRcdC8vIFN1cHBvcnQ6IElFPDksIFNhZmFyaVxuXHRcdFx0Ly8gVG9sZXJhdGUgTm9kZUxpc3QgcHJvcGVydGllcyAoSUU6IFwibGVuZ3RoXCI7IFNhZmFyaTogPG51bWJlcj4pIG1hdGNoaW5nIGVsZW1lbnRzIGJ5IGlkXG5cdFx0XHRmb3IgKCA7IGkgIT09IGxlbiAmJiAoIGVsZW0gPSBlbGVtc1sgaSBdICkgIT0gbnVsbDsgaSsrICkge1xuXHRcdFx0XHRpZiAoIGJ5RWxlbWVudCAmJiBlbGVtICkge1xuXHRcdFx0XHRcdGogPSAwO1xuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgMTErLCBFZGdlIDE3IC0gMTgrXG5cdFx0XHRcdFx0Ly8gSUUvRWRnZSBzb21ldGltZXMgdGhyb3cgYSBcIlBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3Igd2hlbiBzdHJpY3QtY29tcGFyaW5nXG5cdFx0XHRcdFx0Ly8gdHdvIGRvY3VtZW50czsgc2hhbGxvdyBjb21wYXJpc29ucyB3b3JrLlxuXHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcblx0XHRcdFx0XHRpZiAoICFjb250ZXh0ICYmIGVsZW0ub3duZXJEb2N1bWVudCAhPSBkb2N1bWVudCApIHtcblx0XHRcdFx0XHRcdHNldERvY3VtZW50KCBlbGVtICk7XG5cdFx0XHRcdFx0XHR4bWwgPSAhZG9jdW1lbnRJc0hUTUw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHdoaWxlICggKCBtYXRjaGVyID0gZWxlbWVudE1hdGNoZXJzWyBqKysgXSApICkge1xuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVyKCBlbGVtLCBjb250ZXh0IHx8IGRvY3VtZW50LCB4bWwgKSApIHtcblx0XHRcdFx0XHRcdFx0cmVzdWx0cy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIG91dGVybW9zdCApIHtcblx0XHRcdFx0XHRcdGRpcnJ1bnMgPSBkaXJydW5zVW5pcXVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFRyYWNrIHVubWF0Y2hlZCBlbGVtZW50cyBmb3Igc2V0IGZpbHRlcnNcblx0XHRcdFx0aWYgKCBieVNldCApIHtcblxuXHRcdFx0XHRcdC8vIFRoZXkgd2lsbCBoYXZlIGdvbmUgdGhyb3VnaCBhbGwgcG9zc2libGUgbWF0Y2hlcnNcblx0XHRcdFx0XHRpZiAoICggZWxlbSA9ICFtYXRjaGVyICYmIGVsZW0gKSApIHtcblx0XHRcdFx0XHRcdG1hdGNoZWRDb3VudC0tO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIExlbmd0aGVuIHRoZSBhcnJheSBmb3IgZXZlcnkgZWxlbWVudCwgbWF0Y2hlZCBvciBub3Rcblx0XHRcdFx0XHRpZiAoIHNlZWQgKSB7XG5cdFx0XHRcdFx0XHR1bm1hdGNoZWQucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBgaWAgaXMgbm93IHRoZSBjb3VudCBvZiBlbGVtZW50cyB2aXNpdGVkIGFib3ZlLCBhbmQgYWRkaW5nIGl0IHRvIGBtYXRjaGVkQ291bnRgXG5cdFx0XHQvLyBtYWtlcyB0aGUgbGF0dGVyIG5vbm5lZ2F0aXZlLlxuXHRcdFx0bWF0Y2hlZENvdW50ICs9IGk7XG5cblx0XHRcdC8vIEFwcGx5IHNldCBmaWx0ZXJzIHRvIHVubWF0Y2hlZCBlbGVtZW50c1xuXHRcdFx0Ly8gTk9URTogVGhpcyBjYW4gYmUgc2tpcHBlZCBpZiB0aGVyZSBhcmUgbm8gdW5tYXRjaGVkIGVsZW1lbnRzIChpLmUuLCBgbWF0Y2hlZENvdW50YFxuXHRcdFx0Ly8gZXF1YWxzIGBpYCksIHVubGVzcyB3ZSBkaWRuJ3QgdmlzaXQgX2FueV8gZWxlbWVudHMgaW4gdGhlIGFib3ZlIGxvb3AgYmVjYXVzZSB3ZSBoYXZlXG5cdFx0XHQvLyBubyBlbGVtZW50IG1hdGNoZXJzIGFuZCBubyBzZWVkLlxuXHRcdFx0Ly8gSW5jcmVtZW50aW5nIGFuIGluaXRpYWxseS1zdHJpbmcgXCIwXCIgYGlgIGFsbG93cyBgaWAgdG8gcmVtYWluIGEgc3RyaW5nIG9ubHkgaW4gdGhhdFxuXHRcdFx0Ly8gY2FzZSwgd2hpY2ggd2lsbCByZXN1bHQgaW4gYSBcIjAwXCIgYG1hdGNoZWRDb3VudGAgdGhhdCBkaWZmZXJzIGZyb20gYGlgIGJ1dCBpcyBhbHNvXG5cdFx0XHQvLyBudW1lcmljYWxseSB6ZXJvLlxuXHRcdFx0aWYgKCBieVNldCAmJiBpICE9PSBtYXRjaGVkQ291bnQgKSB7XG5cdFx0XHRcdGogPSAwO1xuXHRcdFx0XHR3aGlsZSAoICggbWF0Y2hlciA9IHNldE1hdGNoZXJzWyBqKysgXSApICkge1xuXHRcdFx0XHRcdG1hdGNoZXIoIHVubWF0Y2hlZCwgc2V0TWF0Y2hlZCwgY29udGV4dCwgeG1sICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIHNlZWQgKSB7XG5cblx0XHRcdFx0XHQvLyBSZWludGVncmF0ZSBlbGVtZW50IG1hdGNoZXMgdG8gZWxpbWluYXRlIHRoZSBuZWVkIGZvciBzb3J0aW5nXG5cdFx0XHRcdFx0aWYgKCBtYXRjaGVkQ291bnQgPiAwICkge1xuXHRcdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggISggdW5tYXRjaGVkWyBpIF0gfHwgc2V0TWF0Y2hlZFsgaSBdICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0c2V0TWF0Y2hlZFsgaSBdID0gcG9wLmNhbGwoIHJlc3VsdHMgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIERpc2NhcmQgaW5kZXggcGxhY2Vob2xkZXIgdmFsdWVzIHRvIGdldCBvbmx5IGFjdHVhbCBtYXRjaGVzXG5cdFx0XHRcdFx0c2V0TWF0Y2hlZCA9IGNvbmRlbnNlKCBzZXRNYXRjaGVkICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBBZGQgbWF0Y2hlcyB0byByZXN1bHRzXG5cdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIHNldE1hdGNoZWQgKTtcblxuXHRcdFx0XHQvLyBTZWVkbGVzcyBzZXQgbWF0Y2hlcyBzdWNjZWVkaW5nIG11bHRpcGxlIHN1Y2Nlc3NmdWwgbWF0Y2hlcnMgc3RpcHVsYXRlIHNvcnRpbmdcblx0XHRcdFx0aWYgKCBvdXRlcm1vc3QgJiYgIXNlZWQgJiYgc2V0TWF0Y2hlZC5sZW5ndGggPiAwICYmXG5cdFx0XHRcdFx0KCBtYXRjaGVkQ291bnQgKyBzZXRNYXRjaGVycy5sZW5ndGggKSA+IDEgKSB7XG5cblx0XHRcdFx0XHRTaXp6bGUudW5pcXVlU29ydCggcmVzdWx0cyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIE92ZXJyaWRlIG1hbmlwdWxhdGlvbiBvZiBnbG9iYWxzIGJ5IG5lc3RlZCBtYXRjaGVyc1xuXHRcdFx0aWYgKCBvdXRlcm1vc3QgKSB7XG5cdFx0XHRcdGRpcnJ1bnMgPSBkaXJydW5zVW5pcXVlO1xuXHRcdFx0XHRvdXRlcm1vc3RDb250ZXh0ID0gY29udGV4dEJhY2t1cDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHVubWF0Y2hlZDtcblx0XHR9O1xuXG5cdHJldHVybiBieVNldCA/XG5cdFx0bWFya0Z1bmN0aW9uKCBzdXBlck1hdGNoZXIgKSA6XG5cdFx0c3VwZXJNYXRjaGVyO1xufVxuXG5jb21waWxlID0gU2l6emxlLmNvbXBpbGUgPSBmdW5jdGlvbiggc2VsZWN0b3IsIG1hdGNoIC8qIEludGVybmFsIFVzZSBPbmx5ICovICkge1xuXHR2YXIgaSxcblx0XHRzZXRNYXRjaGVycyA9IFtdLFxuXHRcdGVsZW1lbnRNYXRjaGVycyA9IFtdLFxuXHRcdGNhY2hlZCA9IGNvbXBpbGVyQ2FjaGVbIHNlbGVjdG9yICsgXCIgXCIgXTtcblxuXHRpZiAoICFjYWNoZWQgKSB7XG5cblx0XHQvLyBHZW5lcmF0ZSBhIGZ1bmN0aW9uIG9mIHJlY3Vyc2l2ZSBmdW5jdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCB0byBjaGVjayBlYWNoIGVsZW1lbnRcblx0XHRpZiAoICFtYXRjaCApIHtcblx0XHRcdG1hdGNoID0gdG9rZW5pemUoIHNlbGVjdG9yICk7XG5cdFx0fVxuXHRcdGkgPSBtYXRjaC5sZW5ndGg7XG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRjYWNoZWQgPSBtYXRjaGVyRnJvbVRva2VucyggbWF0Y2hbIGkgXSApO1xuXHRcdFx0aWYgKCBjYWNoZWRbIGV4cGFuZG8gXSApIHtcblx0XHRcdFx0c2V0TWF0Y2hlcnMucHVzaCggY2FjaGVkICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbGVtZW50TWF0Y2hlcnMucHVzaCggY2FjaGVkICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ2FjaGUgdGhlIGNvbXBpbGVkIGZ1bmN0aW9uXG5cdFx0Y2FjaGVkID0gY29tcGlsZXJDYWNoZShcblx0XHRcdHNlbGVjdG9yLFxuXHRcdFx0bWF0Y2hlckZyb21Hcm91cE1hdGNoZXJzKCBlbGVtZW50TWF0Y2hlcnMsIHNldE1hdGNoZXJzIClcblx0XHQpO1xuXG5cdFx0Ly8gU2F2ZSBzZWxlY3RvciBhbmQgdG9rZW5pemF0aW9uXG5cdFx0Y2FjaGVkLnNlbGVjdG9yID0gc2VsZWN0b3I7XG5cdH1cblx0cmV0dXJuIGNhY2hlZDtcbn07XG5cbi8qKlxuICogQSBsb3ctbGV2ZWwgc2VsZWN0aW9uIGZ1bmN0aW9uIHRoYXQgd29ya3Mgd2l0aCBTaXp6bGUncyBjb21waWxlZFxuICogIHNlbGVjdG9yIGZ1bmN0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IHNlbGVjdG9yIEEgc2VsZWN0b3Igb3IgYSBwcmUtY29tcGlsZWRcbiAqICBzZWxlY3RvciBmdW5jdGlvbiBidWlsdCB3aXRoIFNpenpsZS5jb21waWxlXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRleHRcbiAqIEBwYXJhbSB7QXJyYXl9IFtyZXN1bHRzXVxuICogQHBhcmFtIHtBcnJheX0gW3NlZWRdIEEgc2V0IG9mIGVsZW1lbnRzIHRvIG1hdGNoIGFnYWluc3RcbiAqL1xuc2VsZWN0ID0gU2l6emxlLnNlbGVjdCA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApIHtcblx0dmFyIGksIHRva2VucywgdG9rZW4sIHR5cGUsIGZpbmQsXG5cdFx0Y29tcGlsZWQgPSB0eXBlb2Ygc2VsZWN0b3IgPT09IFwiZnVuY3Rpb25cIiAmJiBzZWxlY3Rvcixcblx0XHRtYXRjaCA9ICFzZWVkICYmIHRva2VuaXplKCAoIHNlbGVjdG9yID0gY29tcGlsZWQuc2VsZWN0b3IgfHwgc2VsZWN0b3IgKSApO1xuXG5cdHJlc3VsdHMgPSByZXN1bHRzIHx8IFtdO1xuXG5cdC8vIFRyeSB0byBtaW5pbWl6ZSBvcGVyYXRpb25zIGlmIHRoZXJlIGlzIG9ubHkgb25lIHNlbGVjdG9yIGluIHRoZSBsaXN0IGFuZCBubyBzZWVkXG5cdC8vICh0aGUgbGF0dGVyIG9mIHdoaWNoIGd1YXJhbnRlZXMgdXMgY29udGV4dClcblx0aWYgKCBtYXRjaC5sZW5ndGggPT09IDEgKSB7XG5cblx0XHQvLyBSZWR1Y2UgY29udGV4dCBpZiB0aGUgbGVhZGluZyBjb21wb3VuZCBzZWxlY3RvciBpcyBhbiBJRFxuXHRcdHRva2VucyA9IG1hdGNoWyAwIF0gPSBtYXRjaFsgMCBdLnNsaWNlKCAwICk7XG5cdFx0aWYgKCB0b2tlbnMubGVuZ3RoID4gMiAmJiAoIHRva2VuID0gdG9rZW5zWyAwIF0gKS50eXBlID09PSBcIklEXCIgJiZcblx0XHRcdGNvbnRleHQubm9kZVR5cGUgPT09IDkgJiYgZG9jdW1lbnRJc0hUTUwgJiYgRXhwci5yZWxhdGl2ZVsgdG9rZW5zWyAxIF0udHlwZSBdICkge1xuXG5cdFx0XHRjb250ZXh0ID0gKCBFeHByLmZpbmRbIFwiSURcIiBdKCB0b2tlbi5tYXRjaGVzWyAwIF1cblx0XHRcdFx0LnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICksIGNvbnRleHQgKSB8fCBbXSApWyAwIF07XG5cdFx0XHRpZiAoICFjb250ZXh0ICkge1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblxuXHRcdFx0Ly8gUHJlY29tcGlsZWQgbWF0Y2hlcnMgd2lsbCBzdGlsbCB2ZXJpZnkgYW5jZXN0cnksIHNvIHN0ZXAgdXAgYSBsZXZlbFxuXHRcdFx0fSBlbHNlIGlmICggY29tcGlsZWQgKSB7XG5cdFx0XHRcdGNvbnRleHQgPSBjb250ZXh0LnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdHNlbGVjdG9yID0gc2VsZWN0b3Iuc2xpY2UoIHRva2Vucy5zaGlmdCgpLnZhbHVlLmxlbmd0aCApO1xuXHRcdH1cblxuXHRcdC8vIEZldGNoIGEgc2VlZCBzZXQgZm9yIHJpZ2h0LXRvLWxlZnQgbWF0Y2hpbmdcblx0XHRpID0gbWF0Y2hFeHByWyBcIm5lZWRzQ29udGV4dFwiIF0udGVzdCggc2VsZWN0b3IgKSA/IDAgOiB0b2tlbnMubGVuZ3RoO1xuXHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0dG9rZW4gPSB0b2tlbnNbIGkgXTtcblxuXHRcdFx0Ly8gQWJvcnQgaWYgd2UgaGl0IGEgY29tYmluYXRvclxuXHRcdFx0aWYgKCBFeHByLnJlbGF0aXZlWyAoIHR5cGUgPSB0b2tlbi50eXBlICkgXSApIHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpZiAoICggZmluZCA9IEV4cHIuZmluZFsgdHlwZSBdICkgKSB7XG5cblx0XHRcdFx0Ly8gU2VhcmNoLCBleHBhbmRpbmcgY29udGV4dCBmb3IgbGVhZGluZyBzaWJsaW5nIGNvbWJpbmF0b3JzXG5cdFx0XHRcdGlmICggKCBzZWVkID0gZmluZChcblx0XHRcdFx0XHR0b2tlbi5tYXRjaGVzWyAwIF0ucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKSxcblx0XHRcdFx0XHRyc2libGluZy50ZXN0KCB0b2tlbnNbIDAgXS50eXBlICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8XG5cdFx0XHRcdFx0XHRjb250ZXh0XG5cdFx0XHRcdCkgKSApIHtcblxuXHRcdFx0XHRcdC8vIElmIHNlZWQgaXMgZW1wdHkgb3Igbm8gdG9rZW5zIHJlbWFpbiwgd2UgY2FuIHJldHVybiBlYXJseVxuXHRcdFx0XHRcdHRva2Vucy5zcGxpY2UoIGksIDEgKTtcblx0XHRcdFx0XHRzZWxlY3RvciA9IHNlZWQubGVuZ3RoICYmIHRvU2VsZWN0b3IoIHRva2VucyApO1xuXHRcdFx0XHRcdGlmICggIXNlbGVjdG9yICkge1xuXHRcdFx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgc2VlZCApO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBDb21waWxlIGFuZCBleGVjdXRlIGEgZmlsdGVyaW5nIGZ1bmN0aW9uIGlmIG9uZSBpcyBub3QgcHJvdmlkZWRcblx0Ly8gUHJvdmlkZSBgbWF0Y2hgIHRvIGF2b2lkIHJldG9rZW5pemF0aW9uIGlmIHdlIG1vZGlmaWVkIHRoZSBzZWxlY3RvciBhYm92ZVxuXHQoIGNvbXBpbGVkIHx8IGNvbXBpbGUoIHNlbGVjdG9yLCBtYXRjaCApICkoXG5cdFx0c2VlZCxcblx0XHRjb250ZXh0LFxuXHRcdCFkb2N1bWVudElzSFRNTCxcblx0XHRyZXN1bHRzLFxuXHRcdCFjb250ZXh0IHx8IHJzaWJsaW5nLnRlc3QoIHNlbGVjdG9yICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8IGNvbnRleHRcblx0KTtcblx0cmV0dXJuIHJlc3VsdHM7XG59O1xuXG4vLyBPbmUtdGltZSBhc3NpZ25tZW50c1xuXG4vLyBTb3J0IHN0YWJpbGl0eVxuc3VwcG9ydC5zb3J0U3RhYmxlID0gZXhwYW5kby5zcGxpdCggXCJcIiApLnNvcnQoIHNvcnRPcmRlciApLmpvaW4oIFwiXCIgKSA9PT0gZXhwYW5kbztcblxuLy8gU3VwcG9ydDogQ2hyb21lIDE0LTM1K1xuLy8gQWx3YXlzIGFzc3VtZSBkdXBsaWNhdGVzIGlmIHRoZXkgYXJlbid0IHBhc3NlZCB0byB0aGUgY29tcGFyaXNvbiBmdW5jdGlvblxuc3VwcG9ydC5kZXRlY3REdXBsaWNhdGVzID0gISFoYXNEdXBsaWNhdGU7XG5cbi8vIEluaXRpYWxpemUgYWdhaW5zdCB0aGUgZGVmYXVsdCBkb2N1bWVudFxuc2V0RG9jdW1lbnQoKTtcblxuLy8gU3VwcG9ydDogV2Via2l0PDUzNy4zMiAtIFNhZmFyaSA2LjAuMy9DaHJvbWUgMjUgKGZpeGVkIGluIENocm9tZSAyNylcbi8vIERldGFjaGVkIG5vZGVzIGNvbmZvdW5kaW5nbHkgZm9sbG93ICplYWNoIG90aGVyKlxuc3VwcG9ydC5zb3J0RGV0YWNoZWQgPSBhc3NlcnQoIGZ1bmN0aW9uKCBlbCApIHtcblxuXHQvLyBTaG91bGQgcmV0dXJuIDEsIGJ1dCByZXR1cm5zIDQgKGZvbGxvd2luZylcblx0cmV0dXJuIGVsLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImZpZWxkc2V0XCIgKSApICYgMTtcbn0gKTtcblxuLy8gU3VwcG9ydDogSUU8OFxuLy8gUHJldmVudCBhdHRyaWJ1dGUvcHJvcGVydHkgXCJpbnRlcnBvbGF0aW9uXCJcbi8vIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXM1MzY0MjklMjhWUy44NSUyOS5hc3B4XG5pZiAoICFhc3NlcnQoIGZ1bmN0aW9uKCBlbCApIHtcblx0ZWwuaW5uZXJIVE1MID0gXCI8YSBocmVmPScjJz48L2E+XCI7XG5cdHJldHVybiBlbC5maXJzdENoaWxkLmdldEF0dHJpYnV0ZSggXCJocmVmXCIgKSA9PT0gXCIjXCI7XG59ICkgKSB7XG5cdGFkZEhhbmRsZSggXCJ0eXBlfGhyZWZ8aGVpZ2h0fHdpZHRoXCIsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcblx0XHRpZiAoICFpc1hNTCApIHtcblx0XHRcdHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSwgbmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInR5cGVcIiA/IDEgOiAyICk7XG5cdFx0fVxuXHR9ICk7XG59XG5cbi8vIFN1cHBvcnQ6IElFPDlcbi8vIFVzZSBkZWZhdWx0VmFsdWUgaW4gcGxhY2Ugb2YgZ2V0QXR0cmlidXRlKFwidmFsdWVcIilcbmlmICggIXN1cHBvcnQuYXR0cmlidXRlcyB8fCAhYXNzZXJ0KCBmdW5jdGlvbiggZWwgKSB7XG5cdGVsLmlubmVySFRNTCA9IFwiPGlucHV0Lz5cIjtcblx0ZWwuZmlyc3RDaGlsZC5zZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiwgXCJcIiApO1xuXHRyZXR1cm4gZWwuZmlyc3RDaGlsZC5nZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiApID09PSBcIlwiO1xufSApICkge1xuXHRhZGRIYW5kbGUoIFwidmFsdWVcIiwgZnVuY3Rpb24oIGVsZW0sIF9uYW1lLCBpc1hNTCApIHtcblx0XHRpZiAoICFpc1hNTCAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaW5wdXRcIiApIHtcblx0XHRcdHJldHVybiBlbGVtLmRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH0gKTtcbn1cblxuLy8gU3VwcG9ydDogSUU8OVxuLy8gVXNlIGdldEF0dHJpYnV0ZU5vZGUgdG8gZmV0Y2ggYm9vbGVhbnMgd2hlbiBnZXRBdHRyaWJ1dGUgbGllc1xuaWYgKCAhYXNzZXJ0KCBmdW5jdGlvbiggZWwgKSB7XG5cdHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoIFwiZGlzYWJsZWRcIiApID09IG51bGw7XG59ICkgKSB7XG5cdGFkZEhhbmRsZSggYm9vbGVhbnMsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcblx0XHR2YXIgdmFsO1xuXHRcdGlmICggIWlzWE1MICkge1xuXHRcdFx0cmV0dXJuIGVsZW1bIG5hbWUgXSA9PT0gdHJ1ZSA/IG5hbWUudG9Mb3dlckNhc2UoKSA6XG5cdFx0XHRcdCggdmFsID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKCBuYW1lICkgKSAmJiB2YWwuc3BlY2lmaWVkID9cblx0XHRcdFx0XHR2YWwudmFsdWUgOlxuXHRcdFx0XHRcdG51bGw7XG5cdFx0fVxuXHR9ICk7XG59XG5cbi8vIEVYUE9TRVxudmFyIF9zaXp6bGUgPSB3aW5kb3cuU2l6emxlO1xuXG5TaXp6bGUubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuXHRpZiAoIHdpbmRvdy5TaXp6bGUgPT09IFNpenpsZSApIHtcblx0XHR3aW5kb3cuU2l6emxlID0gX3NpenpsZTtcblx0fVxuXG5cdHJldHVybiBTaXp6bGU7XG59O1xuXG5pZiAoIHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kICkge1xuXHRkZWZpbmUoIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBTaXp6bGU7XG5cdH0gKTtcblxuLy8gU2l6emxlIHJlcXVpcmVzIHRoYXQgdGhlcmUgYmUgYSBnbG9iYWwgd2luZG93IGluIENvbW1vbi1KUyBsaWtlIGVudmlyb25tZW50c1xufSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUuZXhwb3J0cyApIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBTaXp6bGU7XG59IGVsc2Uge1xuXHR3aW5kb3cuU2l6emxlID0gU2l6emxlO1xufVxuXG4vLyBFWFBPU0VcblxufSApKCB3aW5kb3cgKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vc2l6emxlL2Rpc3Qvc2l6emxlLmpzIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBzZWxlY3QsIGdldFNpbmdsZVNlbGVjdG9yLCBnZXRNdWx0aVNlbGVjdG9yIH0gZnJvbSAnLi9zZWxlY3QnXG5leHBvcnQgeyBkZWZhdWx0IGFzIG1hdGNoLCBpbml0T3B0aW9ucyB9IGZyb20gJy4vbWF0Y2gnXG5leHBvcnQgeyBkZWZhdWx0IGFzIG9wdGltaXplIH0gZnJvbSAnLi9vcHRpbWl6ZSdcbmV4cG9ydCAqIGFzIGNvbW1vbiBmcm9tICcuL2NvbW1vbidcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=