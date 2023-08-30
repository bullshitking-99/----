// 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。

// 你可以认为每种硬币的数量是无限的。

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins: number[], amount: number): number {
  // 最优解存储数组
  const dp = new Array(amount + 1).fill(Infinity);

  //已知的初始状态
  dp[0] = 0;

  // 使用迭代代替递归
  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }

  // 还需考虑无硬币匹配情况，返回-1
  return dp[amount] === Infinity ? -1 : dp[amount];
};
