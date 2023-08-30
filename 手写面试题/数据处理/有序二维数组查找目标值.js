// 一个顺序查找 + 一个二分查找

const matrix = [
  [1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2],
  [3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3],
  [3, 3, 3, 3, 5],
];

// 整个二分查找，找得到就返回坐标，找不到就返回当前值
function two_way_Search(list, target) {
  const length = list.length;
  let left = 0,
    right = length - 1,
    mid;
  while (left <= right) {
    // 这一步小于等于是因为也要比对一下边界值
    mid = Math.floor((left + right) / 2); // 这一步真是害人，js里 / 不是整除，有小数
    if (list[mid] < target) left = mid + 1;
    if (list[mid] > target) right = mid - 1;
    if (list[mid] === target) {
      return mid;
    }
  }
  return false;
}

function find(matrix, target) {
  let len = matrix.length;
  for (let index = 0; index < len; index++) {
    const item = matrix[index];

    if (item[0] === target) return [index, 0];

    if (item[0] < target) {
      if (matrix[index + 1] > target || index === len - 1)
        return two_way_Search(item, target)
          ? [index, two_way_Search(item, target)]
          : false;
    }
  }
  console.log("false");
  return false;
}

const res = find(matrix, 5);
console.log(res);
