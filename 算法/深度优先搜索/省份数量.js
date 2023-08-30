/* 
有 n 个城市，其中一些彼此相连，另一些没有相连。如果城市 a 与城市 b 直接相连，且城市 b 与城市 c 直接相连，
那么城市 a 与城市 c 间接相连。

省份 是一组直接或间接相连的城市，组内不含其他没有相连的城市。

给你一个 n x n 的矩阵 isConnected ，其中 isConnected[i][j] = 1 表示第 i 个城市和第 j 个城市直接相连，
而 isConnected[i][j] = 0 表示二者不直接相连。

返回矩阵中 省份 的数量。
 */

/* https://leetcode.cn/problems/number-of-provinces/ */

/* 最多有n个省份，采用visited数组记录这些结点的访问情况，遍历单个省份使用dfs */

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function (isConnected) {
  const length = isConnected.length;
  const visited = new Array(length - 1).fill(false);
  let res = 0;

  for (let i = 0; i < length; i++) {
    if (!visited[i]) {
      dfs(i);
      res++;
    }
  }
  return res;

  function dfs(i) {
    visited[i] = true;
    for (let j = 0; j < length; j++) {
      if (isConnected[i][j] === 1 && !visited[j]) {
        dfs(j);
      }
    }
  }
};
