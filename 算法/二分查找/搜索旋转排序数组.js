/* 整数数组 nums 按升序排列，数组中的值 互不相同 。

在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，
使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。
例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。

给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

算法时间复杂度必须是O(logn)级别
 */

/* 
输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4
输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1
*/

//比左边一位小的元素即为原数组的起点
//在查找过程中，如果找到了target则直接返回下标
//根据target的值与旋转点比较，来确定第二步常规二分查找的范围
//特殊情况 => 如果数组在下标0进行旋转，则实际上数组不发生变化

//使用二分查找搜索分界点时不能使用平常的二分查找模板
//平常的二分查找适用条件是序列完全有序，而该序列是有分界点的，使用过程中会出现漏点的情况，需要改造

/**
 * 使用遍历寻找分界点
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  //找到分界点
  //分界点比左值小

  let start = 0; //这个初始值很重要,如果数组只有一个元素，下面的循环不会执行
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) {
      start = i;
    }
  }

  //确定查找分区
  //如果start为0则没有左分区
  let left, right;

  if (target === nums[0]) {
    return 0;
  } else if (target > nums[0] && start !== 0) {
    //左分区
    //如果start为0则没有左分区，跳过
    left = 0;
    right = start - 1;
  } else {
    //右分区
    left = start;
    right = nums.length - 1;
  }

  //分区中查找
  return binarySearch(left, right);

  function binarySearch(left, right) {
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (nums[mid] > target) {
        right = mid - 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        return mid;
      }
    }
    return -1;
  }
};

/**
 * 二分查找解法，时间复杂度为logn
 * @param {number[]} nums
 * @param {number} target
 * @return {number} target_index
 */
var search2 = function (nums, target) {
  //寻找分界点
  let start = 0; //初始值很重要，0即代表了数据未变化的情况
  let left = 0;
  let right = nums.length - 1; //这里不能是nums.length-1，我不理解

  //下面对普通的二分查找模板进行了改造
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[mid + 1]) {
      // 说明此时找到了旋转位置，位置为 mid + 1
      start = mid + 1;
      break;
    } else {
      // 通过二分缩小查询范围
      if (nums[mid] > nums[left]) {
        //这里选择了nums[left]，left可能动态变化啊，完全不懂
        left = mid + 1;
      } else {
        right = mid; //这里不是 mid+1
      }
    }
  }

  console.log("start : " + start);

  //确定查找分区
  //如果start为0则没有左分区

  if (target === nums[0]) {
    return 0;
  } else if (target > nums[0] && start !== 0) {
    //左分区
    //如果start为0则没有左分区，跳过
    left = 0;
    right = start - 1;
  } else {
    //右分区
    left = start;
    right = nums.length - 1;
  }

  //分区中查找
  return binarySearch(left, right);

  function binarySearch(left, right) {
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (nums[mid] > target) {
        right = mid - 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        return mid;
      }
    }
    return -1;
  }
};

/**
 * 直接使用二分查找层层缩小范围，愿称之为抓住了二分查找的本质
 * @param {number[]} nums
 * @param {number} target
 * @return {number} target_index
 */
var search3 = function (nums, target) {
  if (!nums || nums.length === 0) return -1;

  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (target === nums[mid]) {
      return mid;
    } else if (nums[mid] >= nums[left]) {
      // 说明[left, mid]之间是有序的
      if (target < nums[mid] && target >= nums[left]) {
        // 因为[left, mid]有序，若target在左侧范围内，则一定会大于nums[left]小于nums[mid]
        right = mid - 1;
      } else {
        // 反之一定不在该本次二分的有序范围内，递归右侧
        left = mid + 1;
      }
    } else if (nums[mid] <= nums[right]) {
      // 说明[mid, right]之间是有序的
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
};

let nums = [5, 1, 2, 3, 4],
  target = 1;
let answer = search2(nums, target);
console.log(answer);
