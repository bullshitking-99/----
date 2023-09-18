function Sum(arr) {
  let Sum = 0;
  function dive(arr) {
    for (let val of arr) {
      if (val instanceof Array) {
        dive(val);
      } else {
        Sum += val;
      }
    }
  }
  dive(arr);
  return Sum;
}

console.log(Sum([[1], [[1, 2]], [[[[1, 2, 3]]]]])); // 10

function diveSum(arr, res = 0) {
  if (!arr.length) return res;

  arr.forEach((item) => {
    res += typeof item === "number" ? item : diveSum(item);
  });

  return res;
}

console.log(diveSum([[], [1], [[1, 2]], [[[[1, 2, 3]]], [1, 2, 3]]])); // 16
