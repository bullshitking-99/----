/* 给定版本总数，查找最早错误版本，通过提供的版本测试api进行判断，尽量减少对api的调用次数*/
/* 输入：n = 5
输出：4
解释：
调用 isBadVersion(3) -> false 
调用 isBadVersion(5) -> true 
调用 isBadVersion(4) -> true
所以，4 是第一个错误的版本。
 */

/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let left = 1;
    let right = n;
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (!isBadVersion(mid)) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return left;
  };
};
