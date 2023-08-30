/* 峰值元素是指其值严格大于左右相邻值的元素。
给你一个整数数组 nums，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回 任何一个峰值 所在位置即可。
你可以假设 nums[-1] = nums[n] = -∞ 。
你必须实现时间复杂度为 O(log n) 的算法来解决此问题。
 */

/* 
输入：nums = [1,2,3,1]
输出：2
解释：3 是峰值元素，你的函数应该返回其索引 2。
输入：nums = [1,2,1,3,5,6,4]
输出：1 或 5 
解释：你的函数可以返回索引 1，其峰值元素为 2；
     或者返回索引 5， 其峰值元素为 6。
*/

/* 使用二分查找，寻找峰值
首先判断左右侧两个特殊点，因为他们只需要判断是否大于一侧
但是这个怎么根据查找结果去缩减范围呢
当mid小于左右任意一个元素时，值更大元素的那一侧必然含有峰值
证明如，mid<mid+1,判断mid+1与mid+2，如果大于则mid+1为峰值，如果小于则继续判断mid+2与mid+3，这样递归下去，最长
递归到最右侧，则因为nums[n]为负无穷，最右侧元素为峰值
既然证明了该侧必然有峰值，则可使用二分查找，继续提升查找效率，因为我们的目的只是找到一个峰值即可 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  let left = 0;
  let right = nums.length - 1;

  if (nums.length === 1) {
    return 0;
  }

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (mid === 0 && nums[mid] > nums[mid + 1]) return mid;
    if (mid === nums.length - 1 && nums[mid] > nums[mid - 1]) return mid;

    if (
      mid > 0 &&
      mid < nums.length - 1 &&
      nums[mid] > nums[mid - 1] &&
      nums[mid] > nums[mid + 1]
    )
      return mid;
    else {
      if (nums[mid] < nums[mid + 1]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
};

//我这个有点暴拉，大佬的我都简洁地看不懂

function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[mid + 1]) {
      // 说明此时一定在mid左侧有峰值，缩小右边界范围
      right = mid;
    } else {
      // 说明此时一定在mid右侧有峰值，缩小右边界范围
      left = mid + 1;
    }
  }
  return left;
}
