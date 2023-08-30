function Depth(arr) {
  let Depth = 0;
  function dive(arr, dep) {
    for (let val of arr) {
      if (val instanceof Array) {
        dive(val, dep + 1);
      } else {
        Depth = Math.max(Depth, dep);
      }
    }
  }
  dive(arr, 1);
  return Depth;
}

console.log(Depth([[1], [[1, 2]], [[[[1, 2, 3]]]]])); //5
