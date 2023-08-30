/* 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，
写一个函数搜索 nums 中的 target，
如果目标值存在返回下标，否则返回 -1。
*/

/* 示例：
输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
/* var search = function (nums, target) {
  let len = nums.length;
  return binarySearch(0, len - 1);

  function binarySearch(left, right) {
    if (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        return mid;
      } else if (nums[mid] < target) {
        return binarySearch(mid + 1, right);
      } else {
        return binarySearch(left, mid - 1);
      }
    }
    if (left === right && nums[left] === target) {
      return left;
    } else {
      return -1;
    }
  }
}; */

//上述递归做法小拉，没必要
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
export var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
};

let nums = [-1, 0, 3, 5, 9, 12],
  target = 12;

console.log(search(nums, target));
