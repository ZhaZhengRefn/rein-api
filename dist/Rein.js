(function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Rein=t()})(this,function(){"use strict";/*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */ /* global Reflect, Promise */function e(e,t){function n(){this.constructor=e}g(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}function t(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function n(e){return null!==e&&"object"==typeof e}function o(e){return"undefined"!=typeof FormData&&e instanceof FormData}function r(e){return"[object File]"===toString.call(e)}function a(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function i(e){return"[object Date]"===Object.prototype.toString.call(e)}function d(e){var t={};return"undefined"!=typeof Headers&&e instanceof Headers&&"function"==typeof e.forEach&&e.forEach(function(e,n){t[e]=n}),t}function s(e,t,n){var o=e;return o.config=n,o.response=t,o.isFetchError=!0,o.toJSON=function(){return{// Standard
message:this.message,name:this.name,stack:this.stack,// Microsoft
description:this.description,number:this.number,// Mozilla
fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,// Fetch
config:this.config// code: this.code,
}},o}function c(e,t,n){var o=new Error(e);return s(o,t,n)}function p(e){// A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
// RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
// by any combination of letters, digits, plus, period, or hyphen.
return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}function l(e,t,n,o,r){return void 0===t&&(t="/"),p(n)||(n=e.replace(/\/+$/,"")+"/"+t.replace(/\/+$/,"").replace(/^\/+/,"")+"/"+n.replace(/^\/+/,"")),o&&null!=r&&Object.keys(r).forEach(function(e){n=n.replace(new RegExp("\\{"+e+"\\}"),r[e]+"")}),n}function u(e,t,n){var o=this;void 0===e&&(e={}),void 0===t&&(t={}),n.forEach(function(n){"function"==typeof n&&n.call(o,e,t)})}function f(e){var o=[];return Object.keys(e).forEach(function(r){var a=e[r];null==a||(Array.isArray(a)?r+="[]":a=[a],a.forEach(function(e){i(e)?e=e.toISOString():n(e)&&(e=JSON.stringify(e)),o.push(t(r)+"="+t(e))}))}),o.join("&")}function h(e,t){if(null==t||!Object.keys(t).length)return e;var n=f(t);return e+=-1<e.indexOf("?")?"&"+n:"?"+n,e}function y(e){return o(e)||r(e)||a(e)?e:n(e)?JSON.stringify(e):e}var _,g=function(e,t){return g=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])},g(e,t)},b=function(){return b=Object.assign||function(e){for(var t,o=1,r=arguments.length;o<r;o++)for(var n in t=arguments[o],t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},b.apply(this,arguments)};(function(e){e.GET="GET",e.HEAD="HEAD",e.DELETE="DELETE",e.OPTIONS="OPTIONS",e.POST="POST",e.PUT="PUT",e.PATCH="PATCH"})(_||(_={}));var m=/** @class */function(){function e(){}return e.prototype.apply=function(){throw new Error("must implement apply method.")},e}(),j={validateResponse:function(e){var t=e.status;return!!(200<=t&&300>t)}},T={method:"GET",mode:"cors",credentials:"include",cache:"no-cache",redirect:"follow",// keepalive: true,
referrerPolicy:"no-referrer-when-downgrade"},x=function(){var e=[{match:function(e){return"method"===e},action:function(e,t){t.method=e.method?e.method.toUpperCase():"GET"}},{match:function(e){return"data"===e},action:function(e,t){var n=e.method||t.method;-1===["GET","HEAD"].indexOf(n.toUpperCase())&&(t.body=e.data)}},{match:function(e){return-1<["headers","mode","credentials","cache","redirect","referrer","referrerPolicy","keepalive","integrity"].indexOf(e)},action:function(e,t,n){t[n]=e[n]}}];return function(t,n){var o=this;Object.keys(t).forEach(function(r){for(var a,d=0;d<e.length;d++)if(a=e[d],a.match(r))return a.action.call(o,t,n,r)})}}(),E=/** @class */function(t){function n(e,n){void 0===e&&(e={}),void 0===n&&(n={});var o=t.call(this)||this;if(o.config=b({},j,e),o.debug=o.config.debug||!1,o.defaultInit=b({},T,n),o.debug&&console.info("[rein-api]: The config of AdaptorFetch is ",e),!o.isSupportFetch())throw new Error("[AdaptorFetch]: does not support fetch api.");return o}return e(n,t),n.prototype.isSupportFetch=function(){return"undefined"!=typeof window.fetch},n.prototype.apply=function(e){var t=this,n=b({},this.defaultInit);x.call(this,e,n);var o=n;return this.debug&&console.info("[rein-api]: The init of AdaptorFetch.apply is ",n),window.fetch(e.url,o).then(function(t){var n={status:t.status,statusText:t.statusText,headers:d(t.headers),config:e,init:o},r={};return r="ok"===t.statusText.toLowerCase()?t.json():t.text(),Promise.all([r,Promise.resolve(n)])}).then(function(n){var o=n[0],r=n[1],a=b({data:o},r);if(t.config.validateResponse(a))return Promise.resolve(a);var i=c("Request failed with status code "+a.status,a,e);return Promise.reject(i)})},n}(m),k=/** @class */function(){function e(){this.handlers=[]}return e.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},e.prototype.eject=function(e){e<this.handlers.length&&-1<e&&(this.handlers[e]=null)},e.prototype.forEach=function(e){this.handlers.forEach(function(t){if(null!=t)try{e(t)}catch(e){console.error("[InterceptorManager error]: ",e)}})},e}(),A="undefined"==typeof window?"undefined"==typeof global?"undefined"==typeof self?{}:self:global:window,O=function(e,t){return t={exports:{}},e(t,t.exports),t.exports}(function(e,t){/**
     * A faster alternative to `Function#apply`, this function invokes `func`
     * with the `this` binding of `thisArg` and the arguments of `args`.
     *
     * @private
     * @param {Function} func The function to invoke.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} args The arguments to invoke `func` with.
     * @returns {*} Returns the result of `func`.
     */function n(e,t,n){switch(n.length){case 0:return e.call(t);case 1:return e.call(t,n[0]);case 2:return e.call(t,n[0],n[1]);case 3:return e.call(t,n[0],n[1],n[2]);}return e.apply(t,n)}/**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */function o(e,t){for(var n=-1,o=Array(e);++n<e;)o[n]=t(n);return o}/**
     * The base implementation of `_.unary` without support for storing metadata.
     *
     * @private
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     */ /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */function r(e,t){return null==e?void 0:e[t]}/**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */ /**
     * Gets the value at `key`, unless `key` is "__proto__".
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */function a(e,t){return"__proto__"==t?void 0:e[t]}/** Used for built-in method references. */ /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */function i(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var o=e[t];this.set(o[0],o[1])}}/**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */ /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */function d(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var o=e[t];this.set(o[0],o[1])}}/**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */ /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */function s(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var o=e[t];this.set(o[0],o[1])}}/**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */ /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */function c(e){var t=this.__data__=new d(e);this.size=t.size}/**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */ /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */function p(e,t){var n=He(e),r=!n&&Le(e),a=!n&&!r&&Be(e),i=!n&&!r&&!a&&Me(e),d=n||r||a||i,s=d?o(e.length,String):[],c=s.length;for(var p in e)(t||ge.call(e,p))&&!(d&&(// Safari 9 has enumerable `arguments.length` in strict mode.
"length"==p||// Node.js 0.10 has enumerable non-index properties on buffers.
a&&("offset"==p||"parent"==p)||// PhantomJS 2 has enumerable non-index properties on typed arrays.
i&&("buffer"==p||"byteLength"==p||"byteOffset"==p)||// Skip index properties.
F(p,c)))&&s.push(p);return s}/**
     * This function is like `assignValue` except that it doesn't assign
     * `undefined` values.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */function l(e,t,n){(n===void 0||L(e[t],n))&&(n!==void 0||t in e)||h(e,t,n)}/**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */function u(e,t,n){var o=e[t];ge.call(e,t)&&L(o,n)&&(n!==void 0||t in e)||h(e,t,n)}/**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */function f(e,t){for(var n=e.length;n--;)if(L(e[n][0],t))return n;return-1}/**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */function h(e,t,n){"__proto__"==t&&Ce?Ce(e,t,{configurable:!0,enumerable:!0,value:n,writable:!0}):e[t]=n}/**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */ /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */function y(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":we&&we in Object(e)?w(e):D(e)}/**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */function _(e){return W(e)&&y(e)=="[object Arguments]"}/**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */function g(e){if(!V(e)||N(e))return!1;var t=M(e)?Te:ee;return t.test(G(e))}/**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */ /**
     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */function b(e){if(!V(e))return q(e);var t=I(e),n=[];for(var o in e)("constructor"!=o||!t&&ge.call(e,o))&&n.push(o);return n}/**
     * The base implementation of `_.merge` without support for multiple sources.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */function m(e,t,n,o,r){e===t||De(t,function(i,d){if(V(i))r||(r=new c),j(e,t,d,n,m,o,r);else{var s=o?o(a(e,d),i,d+"",e,t,r):void 0;s===void 0&&(s=i),l(e,d,s)}},X)}/**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */function j(e,t,n,o,r,i,d){var s=a(e,n),c=a(t,n),p=d.get(c);if(p)return void l(e,n,p);var u=i?i(s,c,n+"",e,t,d):void 0,f=u===void 0;if(f){var h=He(c),y=!h&&Be(c),_=!h&&!y&&Me(c);u=c,h||y||_?He(s)?u=s:B(s)?u=O(s):y?(f=!1,u=x(c,!0)):_?(f=!1,u=k(c,!0)):u=[]:J(c)||Le(c)?(u=s,Le(s)?u=Q(s):(!V(s)||o&&M(s))&&(u=C(c))):f=!1}f&&(d.set(c,u),r(u,c,o,i,d),d["delete"](c)),l(e,n,u)}/**
     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     */function T(e,t){return Ge(v(e,t,Z),e+"")}/**
     * The base implementation of `setToString` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */ /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */function x(e,t){if(t)return e.slice();var n=e.length,o=Ae?Ae(n):new e.constructor(n);return e.copy(o),o}/**
     * Creates a clone of `arrayBuffer`.
     *
     * @private
     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */function E(e){var t=new e.constructor(e.byteLength);return new ke(t).set(new ke(e)),t}/**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */function k(e,t){var n=t?E(e.buffer):e.buffer;return new e.constructor(n,e.byteOffset,e.length)}/**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */function O(e,t){var n=-1,o=e.length;for(t||(t=Array(o));++n<o;)t[n]=e[n];return t}/**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */function S(e,t,n,o){var r=!n;n||(n={});for(var a=-1,i=t.length;++a<i;){var d=t[a],s=o?o(n[d],e[d],d,n,e):void 0;s===void 0&&(s=e[d]),r?h(n,d,s):u(n,d,s)}return n}/**
     * Creates a function like `_.assign`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */ /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */function z(e,t){var n=e.__data__;return U(t)?n["string"==typeof t?"string":"hash"]:n.map}/**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */function P(e,t){var n=r(e,t);return g(n)?n:void 0}/**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */function w(e){var t=ge.call(e,we),n=e[we];try{e[we]=void 0}catch(t){}var o=me.call(e);return t?e[we]=n:delete e[we],o}/**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */function C(e){return"function"!=typeof e.constructor||I(e)?{}:qe(Oe(e))}/**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */function F(e,t){var n=typeof e;return t=null==t?9007199254740991:t,!!t&&("number"==n||"symbol"!=n&&te.test(e))&&-1<e&&0==e%1&&e<t}/**
     * Checks if the given arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
     *  else `false`.
     */function R(e,t,n){if(!V(n))return!1;var o=typeof t;return!("number"==o?!(H(n)&&F(t,n.length)):!("string"==o&&t in n))&&L(n[t],e)}/**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */function U(e){var t=typeof e;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e}/**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */function N(e){return!!be&&be in e}/**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */function I(e){var t=e&&e.constructor,n="function"==typeof t&&t.prototype||he;return e===n}/**
     * This function is like
     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * except that it includes inherited enumerable properties.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */function q(e){var t=[];if(null!=e)for(var n in Object(e))t.push(n);return t}/**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */function D(e){return me.call(e)}/**
     * A specialized version of `baseRest` which transforms the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @param {Function} transform The rest array transform.
     * @returns {Function} Returns the new function.
     */function v(e,t,o){return t=Re(void 0===t?e.length-1:t,0),function(){for(var r=arguments,a=-1,i=Re(r.length-t,0),d=Array(i);++a<i;)d[a]=r[t+a];a=-1;for(var s=Array(t+1);++a<t;)s[a]=r[a];return s[t]=o(d),n(e,this,s)}}/**
     * Sets the `toString` method of `func` to return `string`.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */ /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */function G(e){if(null!=e){try{return _e.call(e)}catch(t){}try{return e+""}catch(t){}}return""}/**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */function L(e,t){return e===t||e!==e&&t!==t}/**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */ /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */function H(e){return null!=e&&$(e.length)&&!M(e)}/**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */function B(e){return W(e)&&H(e)}/**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */ /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */function M(e){if(!V(e))return!1;// The use of `Object#toString` avoids issues with the `typeof` operator
// in Safari 9 which returns 'object' for typed arrays and other constructors.
var t=y(e);return t=="[object Function]"||t=="[object GeneratorFunction]"||t=="[object AsyncFunction]"||t=="[object Proxy]"}/**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */function $(e){return"number"==typeof e&&-1<e&&0==e%1&&e<=9007199254740991}/**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */function V(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}/**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */function W(e){return null!=e&&"object"==typeof e}/**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */function J(e){if(!W(e)||y(e)!="[object Object]")return!1;var t=Oe(e);if(null===t)return!0;var n=ge.call(t,"constructor")&&t.constructor;return"function"==typeof n&&n instanceof n&&_e.call(n)==je}/**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */ /**
     * Converts `value` to a plain object flattening inherited enumerable string
     * keyed properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */function Q(e){return S(e,X(e))}/**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */function X(e){return H(e)?p(e,!0):b(e)}/**
     * This method is like `_.assign` except that it recursively merges own and
     * inherited enumerable string keyed properties of source objects into the
     * destination object. Source properties that resolve to `undefined` are
     * skipped if a destination value exists. Array and plain object properties
     * are merged recursively. Other objects and value types are overridden by
     * assignment. Source objects are applied from left to right. Subsequent
     * sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {
     *   'a': [{ 'b': 2 }, { 'd': 4 }]
     * };
     *
     * var other = {
     *   'a': [{ 'c': 3 }, { 'e': 5 }]
     * };
     *
     * _.merge(object, other);
     * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
     */ /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */function Y(e){return function(){return e}}/**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */function Z(e){return e}/**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */ /**
     * Lodash (Custom Build) <https://lodash.com/>
     * Build: `lodash modularize exports="npm" -o ./`
     * Copyright JS Foundation and other contributors <https://js.foundation/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     */ /** Used as the size to enable large array optimizations. */var K=/[\\^$.*+?()[\]{}|]/g,ee=/^\[object .+?Constructor\]$/,te=/^(?:0|[1-9]\d*)$/,ne={};/** Used to stand-in for `undefined` hash values. */ne["[object Float32Array]"]=ne["[object Float64Array]"]=ne["[object Int8Array]"]=ne["[object Int16Array]"]=ne["[object Int32Array]"]=ne["[object Uint8Array]"]=ne["[object Uint8ClampedArray]"]=ne["[object Uint16Array]"]=ne["[object Uint32Array]"]=!0,ne["[object Arguments]"]=ne["[object Array]"]=ne["[object ArrayBuffer]"]=ne["[object Boolean]"]=ne["[object DataView]"]=ne["[object Date]"]=ne["[object Error]"]=ne["[object Function]"]=ne["[object Map]"]=ne["[object Number]"]=ne["[object Object]"]=ne["[object RegExp]"]=ne["[object Set]"]=ne["[object String]"]=ne["[object WeakMap]"]=!1;/** Detect free variable `global` from Node.js. */var oe="object"==typeof A&&A&&A.Object===Object&&A,re="object"==typeof self&&self&&self.Object===Object&&self,ae=oe||re||Function("return this")(),ie=t&&!t.nodeType&&t,de=ie&&!0&&e&&!e.nodeType&&e,se=de&&de.exports===ie,ce=se&&oe.process,pe=function(){try{return ce&&ce.binding&&ce.binding("util")}catch(t){}}(),le=pe&&pe.isTypedArray,ue=Array.prototype,fe=Function.prototype,he=Object.prototype,ye=ae["__core-js_shared__"],_e=fe.toString,ge=he.hasOwnProperty,be=function(){var e=/[^.]+$/.exec(ye&&ye.keys&&ye.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}(),me=he.toString,je=_e.call(Object),Te=RegExp("^"+_e.call(ge).replace(K,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),xe=se?ae.Buffer:void 0,Ee=ae.Symbol,ke=ae.Uint8Array,Ae=xe?xe.allocUnsafe:void 0,Oe=function(e,t){return function(n){return e(t(n))}}(Object.getPrototypeOf,Object),Se=Object.create,ze=he.propertyIsEnumerable,Pe=ue.splice,we=Ee?Ee.toStringTag:void 0,Ce=function(){try{var e=P(Object,"defineProperty");return e({},"",{}),e}catch(t){}}(),Fe=xe?xe.isBuffer:void 0,Re=Math.max,Ue=Date.now,Ne=P(ae,"Map"),Ie=P(Object,"create"),qe=function(){function e(){}return function(t){if(!V(t))return{};if(Se)return Se(t);e.prototype=t;var n=new e;return e.prototype=void 0,n}}();/** Detect free variable `self`. */i.prototype.clear=function(){this.__data__=Ie?Ie(null):{},this.size=0}/**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */,i.prototype["delete"]=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}/**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */,i.prototype.get=function(e){var t=this.__data__;if(Ie){var n=t[e];return n==="__lodash_hash_undefined__"?void 0:n}return ge.call(t,e)?t[e]:void 0}/**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */,i.prototype.has=function(e){var t=this.__data__;return Ie?t[e]!==void 0:ge.call(t,e)}/**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */,i.prototype.set=function(e,t){var n=this.__data__;return this.size+=this.has(e)?0:1,n[e]=Ie&&void 0===t?"__lodash_hash_undefined__":t,this}// Add methods to `Hash`.
,d.prototype.clear=function(){this.__data__=[],this.size=0}/**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */,d.prototype["delete"]=function(e){var t=this.__data__,n=f(t,e);if(0>n)return!1;var o=t.length-1;return n==o?t.pop():Pe.call(t,n,1),--this.size,!0}/**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */,d.prototype.get=function(e){var t=this.__data__,n=f(t,e);return 0>n?void 0:t[n][1]}/**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */,d.prototype.has=function(e){return-1<f(this.__data__,e)}/**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */,d.prototype.set=function(e,t){var n=this.__data__,o=f(n,e);return 0>o?(++this.size,n.push([e,t])):n[o][1]=t,this}// Add methods to `ListCache`.
,s.prototype.clear=function(){this.size=0,this.__data__={hash:new i,map:new(Ne||d),string:new i}}/**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */,s.prototype["delete"]=function(e){var t=z(this,e)["delete"](e);return this.size-=t?1:0,t}/**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */,s.prototype.get=function(e){return z(this,e).get(e)}/**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */,s.prototype.has=function(e){return z(this,e).has(e)}/**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */,s.prototype.set=function(e,t){var n=z(this,e),o=n.size;return n.set(e,t),this.size+=n.size==o?0:1,this}// Add methods to `MapCache`.
,c.prototype.clear=function(){this.__data__=new d,this.size=0}/**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */,c.prototype["delete"]=function(e){var t=this.__data__,n=t["delete"](e);return this.size=t.size,n}/**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */,c.prototype.get=function(e){return this.__data__.get(e)}/**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */,c.prototype.has=function(e){return this.__data__.has(e)}/**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */,c.prototype.set=function(e,t){var n=this.__data__;if(n instanceof d){var o=n.__data__;if(!Ne||199>o.length)return o.push([e,t]),this.size=++n.size,this;n=this.__data__=new s(o)}return n.set(e,t),this.size=n.size,this}// Add methods to `Stack`.
;var De=/**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */function(e){return function(t,n,o){for(var r=-1,a=Object(t),i=o(t),d=i.length;d--;){var s=i[e?d:++r];if(!1===n(a[s],s,a))break}return t}}(),ve=Ce?function(e,t){return Ce(e,"toString",{configurable:!0,enumerable:!1,value:Y(t),writable:!0})}:Z,Ge=/**
     * Creates a function that'll short out and invoke `identity` instead
     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
     * milliseconds.
     *
     * @private
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new shortable function.
     */function(e){var t=0,n=0;return function(){var o=Ue(),r=16-(o-n);if(n=o,!(0<r))t=0;else if(800<=++t)return arguments[0];return e.apply(void 0,arguments)}}(ve),Le=_(function(){return arguments}())?_:function(e){return W(e)&&ge.call(e,"callee")&&!ze.call(e,"callee")},He=Array.isArray,Be=Fe||function(){return!1},Me=le?function(e){return function(t){return e(t)}}(le):function(e){return W(e)&&$(e.length)&&!!ne[y(e)]},$e=function(e){return T(function(t,n){var o=-1,r=n.length,a=1<r?n[r-1]:void 0,i=2<r?n[2]:void 0;for(a=3<e.length&&"function"==typeof a?(r--,a):void 0,i&&R(n[0],n[1],i)&&(a=3>r?void 0:a,r=1),t=Object(t);++o<r;){var d=n[o];d&&e(t,d,o,a)}return t})}(function(e,t,n){m(e,t,n)});e.exports=$e}),S={dispatchConfig:{baseUrl:window.location.origin,headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"}},transformRequest:[function(e,t){return o(e)||r(e)?e:a(e)?(!!t&&t["Content-Type"]&&(t["Content-Type"]="application/x-www-form-urlencoded"),e.toString()):n(e)?(!!t&&t["Content-Type"]&&(t["Content-Type"]="application/json"),JSON.stringify(e)):e}],transformResponse:[function(e){try{"string"==typeof e&&(e=JSON.parse(e))}catch(e){}return e}]},dispatchOption:{method:"GET",url:"/",restful:!1,prefix:"/",meta:{},params:{},data:{},resource:{}}},z=["common"].concat(Object.keys(_).map(function(e){return e.toLowerCase()})),P=/** @class */function(){function e(e,t){this.config=b({},S.dispatchConfig,e),this.config.headers=O({},e.headers||{},S.dispatchConfig.headers),this.debug=this.config.debug||!1,this.adaptor=t,this.dispatch=this.dispatch.bind(this)}return e.prototype.dispatch=function(e){e=O({},S.dispatchOption,e),this.debug&&console.info("[rein-api]: The option of DispatchRequest.dispatch is ",e);var t=this.config,n=t.baseUrl,o=t.defaultPrefix,r=void 0===o?"/":o,a=t.headers,i=t.transformRequest,d=t.transformResponse,s=e.method,c=e.resource,p=e.data,f=e.url,_=e.restful,g=e.prefix,m=void 0===g?"/":g,j=e.params,T=l(n,m||r,f,_,c);T=h(T,j),u(p,a,i);// 序列化 data
var x=y(p),E=b({},a.common||{},a[s]||{},a);// 展开 headers
return z.forEach(function(e){delete E[e]}),this.adaptor.apply({url:T,method:s,data:x,headers:E}).then(function(e){u(e.data,e.headers,d);var t=O(Object.create(null),e.data);return Promise.resolve(t)},function(t){return u(t.response.data,t.response.headers,d),Promise.reject(t)})},e}(),w=/** @class */function(){function e(e,t){this.debug=e.debug||!1,this.debug&&console.info("[rein-api]: The config of Rein is ",e),this.adaptor=t||new E({debug:this.debug}),this.interceptors={request:new k,response:new k},this.dispatcher=new P(e,this.adaptor),this.request=this.request.bind(this)}return e.prototype.request=function(e){this.debug&&console.info("[rein-api]: The options of Rein.request is ",e);var t=Promise.resolve(e),n=this.dispatcher.dispatch,o=[n,void 0];for(this.interceptors.request.forEach(function(e){o.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){o.push(e.fulfilled,e.rejected)});o.length;)t=t.then(o.shift(),o.shift());return t},e}();return w});
