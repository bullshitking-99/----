/* 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

问总共有多少条不同的路径？
 */

/* 动态规划：到达某点的方式只有从上至下和从左至右，故令dp[i][j]为从起点到该点的路径数
状态转移方程：dp[i][j] = dp[i-1][j] + dp[i][j-1]*/

/**
 * 方法1 经典动态规划
 * 时间与空间击败 49-21
 */
function uniquePaths_1(m: number, n: number): number {
  // 初始化数据结构
  const dp = Array(m)
    .fill(1)
    .map(() => Array(n).fill(1));
  // 循环遍历，状态转移
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0) dp[i][j] = 1;
      if (j === 0) dp[i][j] = 1;
      if (i > 0 && j > 0) dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  // 返回结果
  return dp[m - 1][n - 1];
}

/**
 * 方法2 空间优化 - 将二维数组降为一维
 * 时间与空间击败 72-77
 */
function uniquePaths_2(m: number, n: number): number {
  // 初始化数据结构
  const dp = Array(n).fill(1);
  let pre: number;
  // 循环遍历，状态转移
  for (let i = 1; i < m; i++) {
    pre = 1;
    for (let j = 1; j < n; j++) {
      dp[j] = pre + dp[j];
      pre = dp[j];
    }
  }
  // 返回结果
  return dp[n - 1];
}

/**
 *受到女朋友的启发，抛开算法思维，只从基础数学角度思考的话，这题实际上用简单的排列组合就搞定了，
 *小人向下走有n-1种选择，向右走有m-1种选择，那么总数不就是C(n-1)(m-1+n-1)（数学公式不好植入，n-1为上标，m-1+n-1为下标）
 */
var uniquePaths_3 = function (m: number, n: number): number {
  const smaller = (m < n ? m : n) - 1;
  const bigger = (m > n ? m : n) - 1;

  let dividend = 1;
  let divisor = 1;
  for (let i = 1; i <= smaller; i++) {
    dividend *= bigger + i;
    divisor *= i;
  }
  return dividend / divisor;
};
