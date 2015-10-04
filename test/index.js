
/**
 * Dependencies.
 */

var Scanner = require('..');
var assert = require('assert');

/**
 * Tests.
 */

describe('Scanner()', function() {
  it('should be a function', function() {
    assert.equal(typeof Scanner, 'function');
  });

  it('should be a constructor', function() {
    var scanner = new Scanner();
    assert(scanner instanceof Scanner);
  });

  it('should not require the new keyword', function() {
    var scanner = Scanner();
    assert(scanner instanceof Scanner);
  });
});

describe('Scanner#scan', function() {
  it('should be a function', function() {
    var scanner = Scanner();
    assert.equal(typeof scanner.scan, 'function');
  });
});
