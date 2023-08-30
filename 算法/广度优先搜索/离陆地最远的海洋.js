/* 你现在手里有一份大小为 n x n 的 网格 grid，上面的每个 单元格 都用 0 和 1 标记好了。其中 0 代表海洋，1 代表陆地。

请你找出一个海洋单元格，这个海洋单元格到离它最近的陆地单元格的距离是最大的，并返回该距离。如果网格上只有陆地或者海洋，请返回 -1。

我们这里说的距离是「曼哈顿距离」（ Manhattan Distance）：(x0, y0) 和 (x1, y1) 这两个单元格之间的距离是 |x0 - x1| + |y0 - y1| 。
 */

/* https://leetcode.cn/problems/as-far-from-land-as-possible/ */

/* 单源bfs（从一个根结点开始）: 对每一个海洋结点使用bfs搜寻最近的陆地并记录距离，最后选出距离最大的，思路简单，但时间复杂度来到了O(n^4) 
这样做的好处是能测出leetcode执行时间的极限[doge]*/

/* 多源bfs（从多个根结点开始）: 从多点扩散，如雷达扫描一般标记周边结点并记录距离，因为是层级+相邻遍历而保证每个海洋结点中
存储的值都是其与陆地结点集群最近的距离
1. 入队所有陆地节点
2. 设置directions遍历序列
3. 开始一次bfs
4. 遇见新的海洋结点时存入他与陆地集群的最近距离（grid[x][y]+1）
5. 将存入的distance与res比较，更新最远距离*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxDistance = function (grid) {
  //经典空数据判断
  let width = grid.length;
  if (width === 0) return -1;

  let queue = [];
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width; j++) {
      //unshift性能损耗有点大，可以使用push代替
      //if (grid[i][j] === 1) queue.unshift([i, j]);
      if (grid[i][j] === 1) queue.push([i, j]);
    }
  }

  //全是海洋或全是陆地则return -1
  if (queue.length === 0 || queue.length === width * width) return -1;

  let directions = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];
  let res = -1;

  while (queue.length) {
    //因为用不到层数这个概念，所以无需levelCount循环
    let [x, y] = queue.pop();
    for (let [a, b] of directions) {
      let row = x + a;
      let col = y + b;

      //越界判断
      if (row < 0 || col < 0 || row >= width || col >= width) continue;

      //新的海洋结点
      if (grid[row][col] === 0) {
        let distance = grid[x][y] + 1;
        grid[row][col] = distance;
        res = Math.max(res, distance);
        queue.unshift([row, col]);
      }
    }
  }
  //距离不包含起点，需要减一
  return res - 1;
};

console.log(
  maxDistance([
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ])
);
