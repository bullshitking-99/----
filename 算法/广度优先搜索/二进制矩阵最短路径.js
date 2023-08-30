/* 

矩阵中填充着0/1，找一条从左上角出发，直到右下角的路径，路径要求为：
1.路径元素全为0
2.相邻元素共享一条边或一个角
如果存在该路径，则返回最短路径的长度（包含起点和终点）
否则返回-1 

*/

/* https://leetcode.cn/problems/shortest-path-in-binary-matrix/ */

/*  大佬代码对之前的套路做了一些精简
visited数组可以用 遍历过后将元素值置为1的方法 代替
在不使用visited后，对坐标的表示可以使用数组的方式，而非强行使用字符串与分隔符
数组表示坐标可以使用解构赋值提取横纵坐标
综上无需再额外提取代码为函数，放在一起更好阅读
坑 - 矩阵的行数可能超过个位数，所以坐标的表示需要用分隔符区分行和列坐标*/

/**
 * 老套路 版本一 又臭又长 拉中之拉
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix_oldFashion = function (grid) {
  let start = grid[0][0]; //number
  if (start === 1) return -1;
  let end = `${grid.length - 1}-${grid.length - 1}`;
  let path = 1;

  let queue = ["0-0"];

  let directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let visited = new Set(["0-0"]);

  while (queue.length) {
    let levelCount = queue.length;

    while (levelCount--) {
      let curr = queue.pop();
      if (curr === end) return path;

      //遍历搜索序列
      for (let direction of directions) {
        let neighbor = getCord(curr, direction); //return cord {String or null}
        //元素不出界 && 值为0 && 未访问 判断顺序有要求
        if (neighbor !== null && !visited.has(neighbor) && isZero(neighbor)) {
          if (neighbor === end) return ++path;

          queue.unshift(neighbor);
          visited.add(neighbor);
        }
      }
    }
    path++;
  }
  return -1;

  /**
   * 根据元素坐标与方向求相邻元素的坐标，越界则返回null
   * @param {String} location
   * @param {Array} direction
   * @returns {String} 坐标转化的字符串
   */
  function getCord(location, direction) {
    let cord = location.split("-");
    let indexRow = Number(cord[0]) + direction[0];
    let indexCol = Number(cord[1]) + direction[1];
    if (indexRow < 0 || indexCol < 0) return null;
    if (indexRow >= grid.length || indexCol >= grid.length) return null;
    return `${indexRow}-${indexCol}`;
  }

  /**
   * 根据坐标求值，并判断该元素是否满足条件
   * @param {string} location
   * @returns {Boolean}
   */
  function isZero(location) {
    //console.log(location);
    let cord = location.split("-");
    let indexRow = Number(cord[0]);
    let indexCol = Number(cord[1]);
    if (grid[indexRow][indexCol]) {
      return false;
    } else {
      return true;
    }
  }
};

/**
 * 带佬的全新版本
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
  //空数据判断 - 永远的第一步
  if (grid.length === 0 || grid[0][0] !== 0) return -1;

  let width = grid.length - 1;
  let queue = [[0, 0]];
  grid[0][0] = 1;
  let path = 1;
  let directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  while (queue.length) {
    let levelCount = queue.length;

    while (levelCount--) {
      //解构赋值格调拉满
      let [x, y] = queue.pop();

      //只判断坐标是否为右下角就行，因为队列里都是值为0的元素，而他们的值都被置1了
      if (x === width && y === width) {
        return path;
      }

      for (const direction of directions) {
        let row = x + direction[0];
        let col = y + direction[1];

        //越界判断
        if (row < 0 || col < 0 || row > width || col > width) continue;

        if (grid[row][col] === 0) {
          queue.unshift([row, col]);
          //淹没 防止遍历子节点时继续将该节点纳入队列
          grid[row][col] = 1;
        }
      }
    }
    path++;
  }
  return -1;
};

console.log(
  shortestPathBinaryMatrix([
    [0, 0, 0],
    [1, 1, 0],
    [1, 1, 0],
  ])
);
