/* 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。
例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
 */

/* 从头至尾遍历，求出以nums[i]结尾的最长子序列长度dp[i]，方法是找到比nums[i]小的值nums[j]中dp[j]的最大值，随后dp[i]=dp[j]+1
设置longest变量，始终保持dp[i]的最大值，循环结束后输出*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  if (nums.length === 0) return 0;
  //每个位置可能在其前面找不到更小的值，则其dp为1，将此设为默认情况
  let dp = new Array(nums.length).fill(1);

  let longest = 1;

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
    longest = Math.max(longest, dp[i]);
  }

  return longest;
};

/* 本题还有一个 贪心 + 二分 的解法，因为此刻我对贪心不熟悉，看不懂题解，但其可以将时间复杂度从 n^2 -> nlogn */

function lengthOfLIS(nums) {
  // 维护一个最小递增子序列
  const lis = [];
  // Sn = (Sn-1, An)为递增子序列 ? Sn-1 + 1 : Sn-1
  for (let i = 0; i < nums.length; i++) {
    let left = 0;
    let right = lis.length - 1;
    // 求左边界的二分法
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (lis[mid] < nums[i]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    if (left >= lis.length) {
      // 边界越界，说明此时子 LIS 中不存在比 nums[i] 大的数，LIS 数组增加一位
      lis.push(nums[i]);
    } else {
      // 否则更新该 LIS 位置上的数字
      lis[left] = nums[i];
    }
  }
  return lis.length;
}
