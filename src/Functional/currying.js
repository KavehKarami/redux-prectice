function sum1(a, b) {
  return a + b;
}
sum1(1, 2);
// (a, b) => a + b;

// currying
function sum2(a) {
  return function (b) {
    return a + b;
  };
}

sum2(5)(3);
// (a) => (b) => a + b;
