function add(a, b) { return a + b; }
function multiply(a, b) { return a * b; }
function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }
function isEven(n) { return n % 2 === 0; }
module.exports = { add, multiply, capitalize, isEven };
