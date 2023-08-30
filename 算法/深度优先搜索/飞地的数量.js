/* 给你一个大小为 m x n 的二进制矩阵 grid ，其中 0 表示一个海洋单元格、1 表示一个陆地单元格。

一次 移动 是指从一个陆地单元格走到另一个相邻（上、下、左、右）的陆地单元格或跨过 grid 的边界。

返回网格中 无法 在任意次数的移动中离开网格边界的陆地单元格的数量。
 */

/* https://leetcode.cn/problems/number-of-enclaves/ */

/* 将所有带有边界块的陆地floodFill,再计算内陆的单元格数量 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var numEnclaves = function (grid) {
  let height = grid.length;
  let width = grid[0].length;
  let res = 0;

  //floodFill 所有可跨界陆地
  for (let i = 0; i < height; i++) {
    dfs(i, 0);
    dfs(i, width - 1);
  }
  for (let j = 1; j < width - 1; j++) {
    dfs(0, j);
    dfs(height - 1, j);
  }

  //遍历所有不可跨界内陆
  for (let i = 1; i < height - 1; i++) {
    for (let j = 1; j < width - 1; j++) {
      if (grid[i][j] === 1) res++;
    }
  }

  return res;

  function dfs(i, j) {
    //越界判断
    if (i < 0 || j < 0 || i > height - 1 || j > width - 1) return;

    //值判断
    if (grid[i][j] === 0) return;

    grid[i][j] = 0;

    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }
};

let grid = [
  [0, 0, 0, 1, 1, 1, 0, 1, 0, 0],
  [1, 1, 0, 0, 0, 1, 0, 1, 1, 1],
  [0, 0, 0, 1, 1, 1, 0, 1, 0, 0],
  [0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  [0, 1, 1, 0, 0, 0, 1, 1, 1, 1],
  [0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
];
let a = numEnclaves(grid);
console.log(a);
