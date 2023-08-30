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
