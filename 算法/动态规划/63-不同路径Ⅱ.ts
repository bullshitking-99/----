/* 与 62-不同路径 的区别为：考虑网格中任意一点存在障碍，无法通过 */

/**
 * 方法 1 通过初始化将所有障碍点以及无法到达的点进行置零，在遍历中仅更新非障碍点
 */
function uniquePathsWithObstacles_1(obstacleGrid: number[][]): number {
  // 初始化数据结构
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  const dp = Array(m)
    .fill(0)
    .map(() => Array(n).fill(0));
  // 初始化首行与首列
  for (let i = 0; i < m; i++) {
    if (obstacleGrid[i][0] === 1) break;
    dp[i][0] = 1;
  }
  for (let j = 0; j < n; j++) {
    if (obstacleGrid[0][j] === 1) break;
    dp[0][j] = 1;
  }
  //   遍历，更新dp
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 0) dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
}

/**
 * 方法 2 压缩数据结构，提升效率
 */
function uniquePathsWithObstacles_2(obstacleGrid: number[][]): number {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  const dp = Array(n).fill(0);

  // 初始化首行与首列
  for (let i = 0; i < n; i++) {
    if (obstacleGrid[0][i] === 1) break;
    dp[i] = 1;
  }

  for (let i = 1; i < m; i++) {
    if (obstacleGrid[i][0] === 1 || dp[0] === 0) dp[0] = 0;
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) dp[j] = 0;
      if (obstacleGrid[i][j] === 0) dp[j] = dp[j - 1] + dp[j];
    }
  }

  return dp[n - 1];
}
