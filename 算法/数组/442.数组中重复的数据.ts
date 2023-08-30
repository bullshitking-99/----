/*
 * @lc app=leetcode.cn id=442 lang=typescript
 *
 * [442] 数组中重复的数据
 */

// @lc code=start
function findDuplicates(nums: number[]): number[] {
  const _nums = nums.sort();
  const res = [];
  _nums.forEach((n, i, arr) => {
    if (i !== 0) {
      if (n === arr[i - 1]) res.push(n);
    }
  });
  return res;
}
// @lc code=end
