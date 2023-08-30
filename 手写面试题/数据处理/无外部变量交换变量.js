// exchange a & b without third variable
const test = { a: 1, b: 2 };
exchange(test); // test{a:2,b:1}
function exchange(test) {
  test.a = test.a + test.b;
  test.b = test.a - test.b;
  test.a = test.a - test.b;
  console.log(test);
}

// js小技巧
let a = 1,
  b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1
