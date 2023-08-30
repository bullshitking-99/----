/* 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：

每行中的整数从左到右按升序排列。
每行的第一个整数大于前一行的最后一个整数。

输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
输出：true

输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
输出：false
*/

/* 使用两次二分查找
第一次在每行的第一个元素中查找，找到则返回true，未找到则记录right的位置，即target可能在的那一行
但这里需要加上判断，如果right的值越界，则直接return false
第二次查找right行，普通二分查找，但这次找不到则return false
 */

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  let m = matrix.length;
  let n = matrix[0].length;

  let left = 0;
  let right = m - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (matrix[mid][0] === target) {
      return true;
    } else if (matrix[mid][0] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (right < 0) {
    return false;
  }

  let line = right;
  left = 0;
  right = n - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (matrix[line][mid] === target) {
      return true;
    } else if (matrix[line][mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
};

/* -------------------------------------------------------------- */

/* 还可以直接将matrix转化为一维数组，直接进行二分查找，不过这样转换的时间和空间损耗可能比较大 */

function searchMatrix2(matrix, target) {
  //const flattedArr = matrix.reduce((arr1, arr2) => [...arr1, ...arr2]);
  const flattedArr = matrix.flat();

  let left = 0;
  let right = flattedArr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (flattedArr[mid] === target) {
      return true;
    } else if (flattedArr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return false;
}
