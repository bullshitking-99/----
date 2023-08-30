// 可根据参数调整递归的深度
let arr = [[1], [[1, 2]], [[[[1, 2, 3]]]]];

Array.prototype.myFlat = function flat(depth) {
  let res = [];
  function dive(arr, dep) {
    for (let val of arr) {
      if (val instanceof Array && dep <= depth) {
        dive(val, dep + 1);
      } else {
        res.push(val);
      }
    }
  }
  dive(this, 1);
  return res;
};

console.log(arr.myFlat(2)); //[ 1, 1, 2, [ [ 1, 2, 3 ] ] ]
