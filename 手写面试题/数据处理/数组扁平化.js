function flat(arr) {
  let res = [];
  function dive(arr) {
    for (let val of arr) {
      if (val instanceof Array) {
        dive(val);
      } else {
        res.push(val);
      }
    }
  }
  dive(arr);
  return res;
}

console.log(flat([[1], [[1, 2]], [[[[1, 2, 3]]]]])); // [ 1, 1, 2, 1, 2, 3 ]

// reduce简化代码
function flatten(arr) {
  return arr.reduce(
    (res, cur) => res.concat(Array.isArray(cur) ? flatten(cur) : cur),
    []
  );
}
console.log(flatten([[1], [[1, 2]], [[[[1, 2, 3]]]]])); // [ 1, 1, 2, 1, 2, 3 ]
