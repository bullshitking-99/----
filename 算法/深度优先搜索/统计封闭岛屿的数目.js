/* 二维矩阵 grid 由 0 （土地）和 1 （水）组成。岛是由最大的4个方向连通的 0 组成的群，
封闭岛是一个 完全 由1包围（左、上、右、下）的岛。
请返回 封闭岛屿 的数目。
 */

/* https://leetcode.cn/problems/number-of-closed-islands/ */

/* 与 “飞地的数量”、“被围绕的区域” 大同小异 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var closedIsland = function (grid) {
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
      if (grid[i][j] === 0) res++;
      dfs(i, j);
    }
  }

  return res;

  function dfs(i, j) {
    //越界判断
    if (i < 0 || j < 0 || i > height - 1 || j > width - 1) return;

    //值判断
    if (grid[i][j] === 1) return;

    grid[i][j] = 1;

    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }
};
