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


```javascript
var pathToRegex = require('path-to-regex');

var matcher = new pathToRegex('/foo/:bar');
// matcher.regexp = /^\/foo\/(?<bar>[^\/]+?)$/
// matcher.keys = [{key:'bar',pattern:'[^\\/]+?'}]

var result = matcher.match('/foo/12345');
// result = { bar: '12345' }
```

... documentation in processed



[npm-image]: https://img.shields.io/npm/v/path-to-regex.svg?style=flat
[npm-url]: https://npmjs.org/package/path-to-regex
[david-image]: http://img.shields.io/david/lastuniverse/path-to-regex.svg?style=flat
[david-url]: https://david-dm.org/lastuniverse/path-to-regex
[license-image]: http://img.shields.io/npm/l/path-to-regex.svg?style=flat
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/path-to-regex.svg?style=flat
[downloads-url]: https://npmjs.org/package/path-to-regex