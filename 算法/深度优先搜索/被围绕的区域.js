/* m x n 的矩阵，由O和X填充着，将被X包围的O相连块都换为X块
相连的概念: 在上下左右四个方向相邻
当一个块位于边界时，即未被X包围，其所在的相连块也都无需转换 */

/* 这题我不会，带佬的idea：

一次dfs可以将一整个相连块遍历一遍，本题中所有无需转换的相连块都有一个特点，那就是必有一个
块在边界处，切换视角，我们可以遍历四个边界，从边界处的O块进行dfs，扫描所有无需转换的块，将其标记visitied

然后从第二行第二列开始遍历剩余块，此时找到的未被visited的O块必然是被包围的，使用floodFill将其逐个转换

这题比较新颖的是在dfs中加入第三个参数needFill，自由选择遍历时是否转换块 */

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
  if (board.length === 0) return;

  let height = board.length;
  let width = board[0].length;

  let visited = Array(height)
    .fill("")
    .map((e) => Array(width).fill(false));

  //对四条边进行遍历
  for (let i = 0; i < height; i++) {
    dfs(i, 0, false);
    dfs(i, width - 1, false);
  }
  for (let j = 1; j < width - 1; j++) {
    dfs(0, j, false);
    dfs(height - 1, j, false);
  }

  //对内部进行遍历
  for (let i = 1; i < height - 1; i++) {
    for (let j = 1; j < width - 1; j++) {
      dfs(i, j, true);
    }
  }

  function dfs(i, j, needFill) {
    //遍历根结点，再遍历四个分支，分支顺序无所谓
    //越界判断
    if (i < 0 || i > height - 1 || j < 0 || j > width - 1) return;

    if (board[i][j] === "X" || visited[i][j]) return;

    if (needFill) board[i][j] = "X";

    visited[i][j] = true;

    dfs(i - 1, j, needFill);
    dfs(i, j - 1, needFill);
    dfs(i, j + 1, needFill);
    dfs(i + 1, j, needFill);
  }
};

let board = [["X"]];

solve(board);

console.log(board);
