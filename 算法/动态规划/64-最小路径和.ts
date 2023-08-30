/* 与 62-不同路径相比，新增：方格中带有非负整数，为到达该点的路径长度，求起点到终点的最短路径长度 */

/**
 * 无它，唯手熟尔
 */
function minPathSum_1(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  const dp = Array(n).fill(grid[0][0]);

  for (let i = 1; i < n; i++) {
    dp[i] = dp[i - 1] + grid[0][i];
  }

  for (let i = 1; i < m; i++) {
    dp[0] = dp[0] + grid[i][0];
    for (let j = 1; j < n; j++) {
      dp[j] = Math.min(dp[j - 1], dp[j]) + grid[i][j];
    }
  }

  return dp[n - 1];
}

/**
 * 优化：直接使用grid存储路径和，节省空间，将两个循环合并，会提高时间
 */
function minPathSum_2(grid: number[][]): number {
  const M = grid.length;
  const N = grid[0].length;

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (i === 0 && j === 0) continue;
      if (i === 0) {
        grid[i][j] += grid[i][j - 1];
        continue;
      }
      if (j === 0) {
        grid[i][j] += grid[i - 1][j];
        continue;
      }
      grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
    }
  }
  return grid[M - 1][N - 1];
}
