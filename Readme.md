
# Scanner
[![NPM version][npm-image]][npm-url]
[![build status][circle-image]][circle-url]
[![license][license-image]][license-url]

A cross-platform scanner for wireless networks.

## Installation

    $ npm install network-scanner

## Usage

```js
var Scanner = require('network-scanner');
var scanner = Scanner();

scanner.scan(function(err, networks) {
  // ...
});
```

## License

[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/network-scanner.svg?style=flat-square
[npm-url]: https://npmjs.org/package/network-scanner
[circle-image]: https://img.shields.io/circleci/project/stevenmiller888/scanner.svg
[circle-url]: https://circleci.com/gh/stevenmiller888/scanner
[license-image]: https://img.shields.io/npm/l/express.svg
[license-url]: https://tldrlegal.com/license/mit-license
