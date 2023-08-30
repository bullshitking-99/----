//在 岛屿数量 此题的情景上，请求出表格中岛屿的最大面积，一个方格面积为1
//遍历矩阵，依次统计每个岛屿的面积，统计完后将岛屿置 0 ，最后得出最大面积
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  let m = grid.length;
  let n = grid[0].length;
  let maxArea = 0;
  let area;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        area = 0;
        dfs(i, j); //在这里调用函数，但是函数的词法环境取决于函数创建的地方,area需要定义在dfs本身或外部词法环境中
        maxArea = Math.max(maxArea, area);
      }
    }
  }

  return maxArea;

  function dfs(i, j) {
    //越界判断
    if (i < 0 || j < 0 || i > m - 1 || j > n - 1) return;
    if (grid[i][j] !== 1) return;

    area++;
    grid[i][j] = 2;

    dfs(i + 1, j);
    dfs(i, j - 1);
    dfs(i, j + 1);
    dfs(i - 1, j);
  }
};

var grid = [
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
];

console.log(maxAreaOfIsland(grid));
