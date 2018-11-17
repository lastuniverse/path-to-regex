# path-to-regex

> Turn a path string such as `/user/:id` or `/user/:id(\d+)`  into a regular expression 


[![NPM version][npm-image]][npm-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

## Installation

```
npm install path-to-regex --save
```

## Usage

```javascript
var pathToRegex = require('path-to-regex');

var matcher = new pathToRegex(path_template, options?);
```

- **path_template** A string or a regular expression.
- **options**
  - **case** When `true` the regexp will be case sensitive. (default: `true`)
  - **splitters** The chars list for splited patch string. (default: `'/'`)
  - **escapeChars** The chars list for escaped. (default: `'/'`)
  - **fromStart** When `true` the regexp will match from the beginning of the string. (default: `true`)
  - **toEnd** When `true` the regexp will match to the end of the string. (default: `true`)

## Samples

### Demonstration of processing a simple key identifier `:keyname`
```javascript
const parser = new pathToRegex('/foo/:bar');
// parser.regexp:  /^\/foo\/([^\/]+)[\/]?$/

const result = regex.match('/foo/asd');
/* result:
 { bar: 'asd' } 
*/


const result = regex.match('/foo/123');
/* result:
 { bar: '123' } 
*/


const result = regex.match('/foo/123/bar');
/* result:
 undefined 
*/

```




### Demonstration of processing a key identifier with a specific content `:keyname(\\d+)`
```javascript
const parser = new pathToRegex('/foo/:bar(\\d+)');
// parser.regexp:  /^\/foo\/(\d+)[\/]?$/

const result = regex.match('/foo/123');
/* result:
 { bar: '123' } 
*/


const result = regex.match('/foo/asd');
/* result:
 undefined 
*/


const result = regex.match('/foo/123asd');
/* result:
 undefined 
*/


const result = regex.match('/foo/123/bar');
/* result:
 undefined 
*/

```




### Demonstration of processing a multiple key identifiers `:keyname1 ... :keyname2`
```javascript
const parser = new pathToRegex('/user/:foo/:bar');
// parser.regexp:  /^\/user\/([^\/]+)\/([^\/]+)[\/]?$/

const result = regex.match('/user/123/asd');
/* result:
 { foo: '123', bar: 'asd' } 
*/


const result = regex.match('/user/asd/123');
/* result:
 { foo: 'asd', bar: '123' } 
*/

```




### Demonstration of processing a key identifiers with a repeated names `:keyname(\\d+) ... :keyname(\d+)`
```javascript
const parser = new pathToRegex('/foo/:bar/:bar');
// parser.regexp:  /^\/foo\/([^\/]+)\/([^\/]+)[\/]?$/

const result = regex.match('/foo/123/asd');
/* result:
 { bar: [ '123', 'asd' ] } 
*/


const result = regex.match('/foo/asd/123');
/* result:
 { bar: [ 'asd', '123' ] } 
*/

```




### Demonstration of processing a key identifier with a quantifier `?`
```javascript
const parser = new pathToRegex('/foo/:bar?');
// parser.regexp:  /^\/foo\/?([^\/]+)?[\/]?$/

const result = regex.match('/foo/123');
/* result:
 { bar: '123' } 
*/


const result = regex.match('/foo/');
/* result:
 { bar: undefined } 
*/


const result = regex.match('/foo');
/* result:
 { bar: undefined } 
*/

```




### Demonstration of processing a key identifier with a quantifier `*`
```javascript
const parser = new pathToRegex('/foo/:bar*');
// parser.regexp:  /^\/foo\/?((?:\/[^\/]+)*)[\/]?$/

const result = regex.match('/foo/123');
/* result:
 { bar: [ '123' ] } 
*/


const result = regex.match('/foo/123/456');
/* result:
 { bar: [ '123', '456' ] } 
*/


const result = regex.match('/foo/123/456/');
/* result:
 { bar: [ '123', '456' ] } 
*/


const result = regex.match('/foo/');
/* result:
 { bar: [] } 
*/


const result = regex.match('/foo');
/* result:
 { bar: [] } 
*/
```





... documentation in processed



[![NPM](https://nodei.co/npm/path-to-regex.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/path-to-regex/)

[npm-image]: https://img.shields.io/npm/v/path-to-regex.svg?style=flat
[npm-url]: https://npmjs.org/package/path-to-regex
[david-image]: http://img.shields.io/david/lastuniverse/path-to-regex.svg?style=flat
[david-url]: https://david-dm.org/lastuniverse/path-to-regex
[license-image]: http://img.shields.io/npm/l/path-to-regex.svg?style=flat
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/path-to-regex.svg?style=flat
[downloads-url]: https://npmjs.org/package/path-to-regex