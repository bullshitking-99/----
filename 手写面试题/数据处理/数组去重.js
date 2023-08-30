// 给定某无序数组，要求去除数组中的重复数字并且返回新的无重复数组。
const array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];
let res;

// ES6 set
Array.from(new Set(array)); // [1, 2, 3, 5, 9, 8]
[...new Set(array)];

// reduce
let map = new Map();
res = array.reduce((res, cur) => {
  if (!map.has(cur)) {
    map.set(cur, null);
    res.push(cur);
  }
  // reduce每次迭代都要返回结果作为下次迭代的叠加量参数
  return res;
}, []);
console.log(res);

// ES5
// 没什么意思，使用对象替代Map作为键值对查验，手写循环
