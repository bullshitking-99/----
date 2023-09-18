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

function diveDepth(arr, res = 1) {
  if (!(arr instanceof Array)) return 0;

  arr.forEach((item) => {
    if (diveDepth(item) + 1 > res) res = diveDepth(item) + 1;
  });

  return res;
}

console.log(diveDepth([[1], [[1, 2]], [[[[1, 2, [[[]]], 3]]]]])); //8
