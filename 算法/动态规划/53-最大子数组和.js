/* 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
子数组 是数组中的一个连续部分。 */

/* 动态规划  Dynamic Programming 
    状态转移方程：dp(i) = max(dp(i-1)+nums[i] , nums[i])
    res = max(dp(i)) i∈[0,nums.length-1]*/

/**
 * @param {number[]} nums
 * @return {number}
 */
/* var maxSubArray = function (nums) {
  let res = Number.MIN_SAFE_INTEGER;
  const dp = new Array(nums.length).fill(res);

  dp[0] = nums[0];
  res = dp[0];

  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
    if (res < dp[i]) res = dp[i];
  }

  return res;
}; */

/* dp[i]数组存储了所有dp值，而不会被复用，因此可用一个变量替代，动态存储dp[i] */

var maxSubArray = function (nums) {
  let dp = nums[0];
  let res = dp;

  for (let i = 1; i < nums.length; i++) {
    dp = Math.max(dp + nums[i], nums[i]);
    res = Math.max(dp, res);
  }

  return res;
};
