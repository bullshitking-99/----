/* 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
此外，你可以假设该网格的四条边均被水包围。
输入：grid = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
  ]
  输出：1
输入：grid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
  ]
  输出：3
 */

//idea:遍历整个表格，当遇到 1 时进行DFS，将整个岛屿表格置 0 ，岛屿数量+1

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let m = grid.length; //行数
  let n = grid[0].length; //列数
  let num = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        dfs(i, j);
        num++;
      }
    }
  }
  function dfs(row, col) {
    //判断是否越界
    if (row < 0 || row > m - 1 || col < 0 || col > n - 1) return;
    if (grid[row][col] === "0") return;
    grid[row][col] = "0";
    dfs(row + 1, col);
    dfs(row - 1, col);
    dfs(row, col + 1);
    dfs(row, col - 1);
  }
  return num;
};

var grid = [
  ["1", "1", "0", "0", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"],
];
console.log(numIslands(grid));
