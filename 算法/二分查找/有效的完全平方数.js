/* 给定一个 正整数 num ，编写一个函数，如果 num 是一个完全平方数，则返回 true ，否则返回 false 。

进阶：不要 使用任何内置的库函数，如  sqrt 。

输入：num = 16
输出：true

输入：num = 14
输出：false
 */

/* 使用二分查找，mid*mid > num 则right左移，否则left右移*/

/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function (num) {
  let left = 1;
  let right = num;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (mid * mid === num) {
      return true;
    } else if (mid * mid > num) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return false;
};
