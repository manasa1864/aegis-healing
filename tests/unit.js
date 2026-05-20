const { add, multiply, capitalize, isEven } = require('../src/utils');

let passed = 0, failed = 0;
function assert(ok, msg) {
  if (ok) { console.log('  ✓', msg); passed++; }
  else     { console.error('  ✗', msg); failed++; }
}

console.log('\n── Unit Tests ──');
assert(add(2, 3) === 5,          'add(2,3) = 5');
assert(multiply(4, 5) === 20,    'multiply(4,5) = 20');
assert(capitalize('hello') === 'Hello', 'capitalize works');
assert(isEven(4) === true,       'isEven(4) = true');
assert(isEven(3) === false,      'isEven(3) = false');

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
