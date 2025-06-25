



const add = function(...args) {	
  let sum = 0;
  for (let num of args) {
    sum += num;
  }
  return sum;
  // Alternatively, you can use the reduce method:
  // return args.reduce((acc, curr) => acc + curr); 
};

console.log(add(1, 2, 3, 4)); // Output: 10

const subtract = function(...args) {
  let sum = args.reduce((acc, curr) => acc - curr);
  return sum;
};

console.log(subtract(10, 4)); // Output: 6
console.log(subtract(-10, -4)); // Output: -6
console.log(subtract(-8, 7)); // Output: -15

const sum = function(args) {
  let sum = args.reduce((acc, curr) => acc + curr, 0);
  return +sum; 
};

const multiply = function(args) {
  let sum = args.reduce((acc, curr) => acc * curr, 1);
  return +sum; 
};

const power = function(base, exponent) {
  return Math.pow(base, exponent);
	
};

const factorial = function(n) {
    let res = 1;
    for (let i = 1; i <= n; i++) {
        res *= i;
    }
    return res;
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
