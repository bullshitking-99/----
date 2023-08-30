/* 给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？
返回满足题意的二叉搜索树的种数。 */

/* 前排提示，因为是互不相同的整数，不用考虑树中子节点的大小关系，有多少种树只与有多少个结点有关
设dp[i]为i个结点可以组成的搜索树的种数，我们从dp[2]一直求到dp[n]
设x为2到n的某一个整数，dp[x]这种情况下，根结点取值从1到x，左子树的结点个数从0到x-1，设其为j，相应右子树结点个数为x-j-1
则dp[x] += dp[j] * dp[x-j-1] , j的取值从0到x-1
处理边界情况：dp[0] = 1，dp[1] = 1
*/

var numTrees = function (n: number): number {
  const dp = Array(n + 1).fill(0);

  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      dp[i] += dp[j] * dp[i - j - 1];
    }
  }

  return dp[n];
};

var numTrees = function (n: number): number {
  if (n === 0 || n === 1) return 1;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      dp[i] += dp[j] * dp[i - j - 1];
    }
  }
  return dp[n];
};
