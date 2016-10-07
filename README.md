[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# optimal select

A library which creates efficient and robust CSS selectors for HTML elements.

> The closest you can get if you're looking for a fingerprint of an HTML element


## Features

- provide UMD integration (usage with Browser + Node)
- supports the browser environment and the [htmlparser2](https://github.com/fb55/htmlparser2) DOM
- allow single and multiple element inputs
- configurations allow to define custom ignore patterns
- micro library (~ 12kb + no external dependency)
- shortest path and fastest selection in [comparison](https://github.com/fczbkk/css-selector-generator-benchmark)


## How To Use

Aside of the [prebundled versions](/dist) the library is also available via npm:

`npm install --save optimal-select`


### Integration

```js
import { select } from 'optimal-select' // global: 'OptimalSelect'

document.addEventListener('click', (e) => {
  var selector = select(e.target)
  console.log(selector)  
})
```


### Configuration

By default following attributes are ignored for robustness towards changes:
- style (inline styles often temporary and used for dynamic visualizations)
- data-reactid (reacts element identifier which depends on the current DOM structure)
- data-react-checksum (react string rendered markup which depends on the current DOM structure)

To define custom filters you can pass the 'ignore' property as a secondary optional parameter.
You can then specify a validation function for the different types (`id`, `class`, `attribute`, `tag`).

```js
var selector = select(element, {

  root: document, // default reference

  skip: (traverseNode) {
    // ignore select information of the direct parent
    return traverseNode === element.parentNode
  },

  ignore: {
    class (className) {
      // disregard short classnames
      return className.length < 3
    },

    attribute (name, value, defaultPredicate) {
      // exclude HTML5 data attributes
      return (/data-*/).test(name) || defaultPredicate(name, value)
    },

    // define simplified ignore patterns as a string/number/regex
    tag: 'div'
  }
})
```

As shown the `root` property allows to define the container element (default: `document`).
The `skip` value allows to define a `function`, a single `node` or an `array` of nodes which should be ignored as the selector is created (default: `null`). Finally individual filter functions can be defined through `ignore`.


### API

`getQuerySelector (input, [options])` // alias: `select`, `default`
Convinience function which automatically uses either `getSingleSelector` or `getMultiSelector`

`getSingleSelector(element, [options])`
Retrieve a unique CSS selector of the element

`getMultiSelector (elements, [options])`
Retrieve a unique CSS selector of the elements

`optimize (selector, element, [options])`
Improve the CSS selector

`getCommonAncestor(elements, [options])`
Retrieve the closest ancestor of the elements

`getCommonProperties(elements, [options])`
Retrieve a set of common properties of the elements


### Client & Server

The latest version `optimal-select` allows the generation and optimization of selectors on virtual environments. It uses the basic structure the [htmlparser2](https://github.com/fb55/htmlparser2) [DOM](https://github.com/fb55/domhandler) provides and adds some utilities to create the same results as the browser (note: the `withDOMLv1` option has to be enabled). Other libraries like [cheerio](https://github.com/cheeriojs/cheerio) are built on top of these and therefore compatible.

In contrast to the browser does server environments not have a global context which defines their scope. Therefore one can either be specified explicit as a node using the `context` options field or automatically extracted from the provided input element. Checkout [the example](/example/index.js) for more details.


## TODO

- extend documentation
- add automatic tests (e.g. [using jsdom](https://github.com/jbwyme/optimal-select/blob/master/tests/select.js))
- improve child-relation and grouping of multi-select
- check attributes for complex classnames
- fix ["#3 - Match line breaking attribute values"](https://github.com/Autarc/optimal-select/issues/3)
- fix [#8 - Full coverage for "nth-of-type" optimization](https://github.com/Autarc/optimal-select/issues/8)
- consider `:not` - selector to exclude other elements matching,
(for multiple element matching, consider the :not selector to exclude exceptions)


## Development

To build your own version run `npm run dev` for development (incl. watch) or `npm run build` for production (minified).
