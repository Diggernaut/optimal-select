/**
 * # Select
 *
 * Construct a unique CSS queryselector to access the selected DOM element(s).
 * Applies different matching and optimization strategies for efficiency.
 */

import adapt from './adapt'
import match from './match'
import optimize from './optimize'
import { getCommonAncestor, getCommonProperties } from './common'

/**
 * Choose action depending on the input (single/multi)
 *
 * @param  {HTMLElement|Array.<HTMLElement>} input   - [description]
 * @param  {Object}                          options - [description]
 * @return {string}                                  - [description]
 */
export default function getQuerySelector (input, options = {}) {
  if (Array.isArray(input)) {
    return getMultiSelector(input, options)
  }
  return getSingleSelector(input, options)
}

/**
 * Get a selector for the provided element
 *
 * @param  {HTMLElement} element - [description]
 * @param  {Object}      options - [description]
 * @return {string}              - [description]
 */
export function getSingleSelector (element, options = {}) {

  if (element.nodeType === 3) {
    element = element.parentNode
  }
  if (element.nodeType !== 1) {
    throw new Error(`Invalid input - only HTMLElements or representations of them are supported! (not "${typeof element}")`)
  }

  const globalModified = adapt(element, options)

  const selector = match(element, options)
  const optimized = optimize(selector, element, options)

  // debug
  // console.log(`
  //   selector:  ${selector}
  //   optimized: ${optimized}
  // `)

  if (globalModified) {
    delete global.document
  }

  return optimized
}

/**
 * Get a selector to match multiple descendants from an ancestor
 *
 * @param  {Array.<HTMLElement>} elements - [description]
 * @param  {Object}              options  - [description]
 * @return {string}                       - [description]
 */
export function getMultiSelector (elements, options = {}) {

  if (elements.some((element) => element.nodeType !== 1)) {
    throw new Error(`Invalid input - only an Array of HTMLElements or representations of them is supported!`)
  }

  const globalModified = adapt(elements[0], options)

  const ancestor = getCommonAncestor(elements, options)
  const ancestorSelector = getSingleSelector(ancestor, options)

  // TODO: consider usage of multiple selectors + parent-child relation
  const commonSelectors = getCommonSelectors(elements)
  const descendantSelector = commonSelectors[0]

  const selector = `${ancestorSelector} ${descendantSelector}`
  const selectorMatches = [...document.querySelectorAll(selector)]

  if (!elements.every((element) => selectorMatches.some((entry) => entry === element) )) {
    // TODO: cluster matches to split into similar groups for sub selections
    return console.warn(`
      The selected elements can\'t be efficiently mapped.
      Its probably best to use multiple single selectors instead!
    `, elements)
  }

  if (globalModified) {
    delete global.document
  }

  return selector
}

/**
 * Get selectors to describe a set of elements
 *
 * @param  {Array.<HTMLElements>} elements - [description]
 * @return {string}                        - [description]
 */
function getCommonSelectors (elements) {

  const { classes, attributes, tag } = getCommonProperties(elements)

  const selectorPath = []

   if (tag) {
     selectorPath.push(tag)
   }

   if (classes) {
     const classSelector = classes.map((name) => `.${name}`).join('')
     selectorPath.push(classSelector)
   }

   if (attributes) {
     const attributeSelector = Object.keys(attributes).reduce((parts, name) => {
       parts.push(`[${name}="${attributes[name]}"]`)
       return parts
     }, []).join('')
     selectorPath.push(attributeSelector)
   }

   if (selectorPath.length) {
     // TODO: check for parent-child relation
   }

   return [
     selectorPath.join('')
   ]
 }
