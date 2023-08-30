/* 已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。
数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 
示例:
输入：nums = [3,4,5,1,2]
输出：1
解释：原数组为 [1,2,3,4,5] ，旋转 3 次得到输入数组。

输入：nums = [4,5,6,7,0,1,2]
输出：0
解释：原数组为 [0,1,2,4,5,6,7] ，旋转 4 次得到输入数组。

输入：nums = [11,13,15,17]
输出：11
解释：原数组为 [11,13,15,17] ，旋转 4 次得到输入数组。
*/

/*  此题为搜索旋转排序数组的子集问题，使用二分法搜索数组，每次查找都能将范围缩小一半，灵活的是这个判断哪一侧的条件
此题中，当元素小于左侧元素则为数组最小值，当元素大于右侧元素，则右侧元素为最小值，如未查找到，则直接返回最左侧元素 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (mid > 0 && nums[mid] < nums[mid - 1]) {
      return nums[mid];
    } else if (mid < nums.length - 1 && nums[mid] > nums[mid + 1]) {
      return nums[mid + 1];
    } else {
      if (nums[mid] < nums[0]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }

  return nums[0];
};
