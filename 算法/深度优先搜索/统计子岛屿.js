/* 给你两个 m x n 的二进制矩阵 grid1 和 grid2 ，它们只包含 0 （表示水域）和 1 （表示陆地）。
一个 岛屿 是由 四个方向 （水平或者竖直）上相邻的 1 组成的区域。任何矩阵以外的区域都视为水域。

如果 grid2 的一个岛屿，被 grid1 的一个岛屿 完全 包含，也就是说 grid2 中该岛屿的每一个格子都被 grid1 中同一个岛屿完全包含，
那么我们称 grid2 中的这个岛屿为 子岛屿 。

请你返回 grid2 中 子岛屿 的 数目 。
 */

/* https://leetcode.cn/problems/count-sub-islands/ */

/* 1. 使用floodFill处理grid2，但是每次遍历岛屿时使用island记录下坐标，将grid1中存在的岛屿坐标记录下来作为visited数组
判断grid2中的岛屿是否每个点在grid1中都是1 */

/* 2. 反向思考，找到2中存在但是1中不存在的点，将含有该点的岛屿淹没，2中剩下的岛屿便都是1的子岛屿 */

/**
 * @param {number[][]} grid1
 * @param {number[][]} grid2
 * @return {number}
 */
var countSubIslands1 = function (grid1, grid2) {
  let island;
  let width = grid2[0].length;
  let height = grid2.length;
  let res = 0;

  //使用map存储grid1中存在的岛屿，缩小查询时间
  let existed = new Set();
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (grid1[i][j] === 1) existed.add(`${i}-${j}`);
    }
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (grid2[i][j] === 1) {
        island = [];
        dfs(i, j);

        //在grid1中判断该陆地是否存在
        let e;
        for (e = 0; e < island.length; e++) {
          let x = island[e][0];
          let y = island[e][1];
          if (!existed.has(`${x}-${y}`)) break;
        }
        if (e === island.length) res++;
      }
    }
  }

  return res;

  function dfs(i, j) {
    if (i < 0 || i > height - 1 || j < 0 || j > width - 1) return;
    if (grid2[i][j] === 0) return;

    grid2[i][j] = 0;
    island.push([i, j]);

    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }
};

var countSubIslands2 = function (grid1, grid2) {
  let width = grid2[0].length;
  let height = grid2.length;
  let res = 0;

  //淹没2中具有溢出点的岛屿
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (grid1[i][j] === 0 && grid2[i][j] === 1) dfs(i, j);
    }
  }

  //统计grid2中剩下的岛屿数量
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (grid2[i][j] === 1) {
        dfs(i, j);
        res++;
      }
    }
  }

  return res;

  function dfs(i, j) {
    if (i < 0 || i > height - 1 || j < 0 || j > width - 1) return;
    if (grid2[i][j] === 0) return;

    grid2[i][j] = 0;

    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }
};

let grid1 = [
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
  [0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1],
  [0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
];
let grid2 = [
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
  [1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1],
  [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1],
  [1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
  [0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1],
  [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0],
];

let res = countSubIslands2(grid1, grid2);
console.log(res);
