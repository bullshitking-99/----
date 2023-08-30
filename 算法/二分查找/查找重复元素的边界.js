/* [34] 在排序数组中查找元素的第一个和最后一个位置 */

/* 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
如果数组中不存在目标值 target，返回 [-1, -1]。要求算法时间复杂度为 O(log n) 

示例：
输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]
输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]
输入：nums = [], target = 0
输出：[-1,-1]
 */

/* 二分查找算法的核心在于通过划分区域，缩小范围
判断 mid 是否等于 target ，是则继续判断：
当 mid-1 小于 target 或不存在时，记录开始位置
当 mid+1 大于 target 或不存在时，记录结束位置 

若 mid 不等于 target ，按照老方法：
大于 target 则 right = mid - 1
小于 target 则 left = mid + 1 

查找是不可逆的，必须进行两次查找*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let res = [-1, -1]; //直接把查找失败的值作为初始值，就不需要在函数中再赋了
  let left = 0;
  let right = nums.length - 1;

  findBoundary(left, right, "left");
  findBoundary(left, right, "right");

  return res;

  function findBoundary(left, right, side) {
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      if (nums[mid] === target) {
        if (side === "left") {
          if (typeof nums[mid - 1] === "undefined" || nums[mid - 1] < target) {
            res[0] = mid;
            return;
          }
          if (nums[mid - 1] === target) right = mid - 1;
        } else if (side === "right") {
          if (typeof nums[mid + 1] === "undefined" || nums[mid + 1] > target) {
            res[1] = mid;
            return;
          }
          if (nums[mid + 1] === target) left = mid + 1;
        } else {
          console.log("请输入正确的side值: left or right");
        }
      } else {
        if (nums[mid] < target) left = mid + 1;
        if (nums[mid] > target) right = mid - 1;
      }
    }
  }
};

let nums = [0, 0, 0, 1, 2, 3],
  target = 0;
let res = searchRange(nums, target);
console.log(res);
