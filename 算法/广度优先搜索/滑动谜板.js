/* 在一个 2 x 3 的板上（board）有 5 块砖瓦，用数字 1~5 来表示, 以及一块空缺用 0 来表示。
一次 移动 定义为选择 0 与一个相邻的数字（上下左右）进行交换.

最终当板 board 的结果是 [[1,2,3],[4,5,0]] 谜板被解开。

给出一个谜板的初始状态 board ，返回最少可以通过多少次移动解开谜板，如果不能解开谜板，则返回 -1 。 */

/* https://leetcode.cn/problems/sliding-puzzle/ */

/**
 * @param {number[][]} board
 * @return {number}
 */
var slidingPuzzle = function (board) {
  let start = board.flat().join("");

  const target = "123450";
  const queue = [start];
  const visited = new Set([start]);
  let res = 0;

  //一维序列中每个位置对应的可移动位置
  const neighbors = [
    [1, 3],
    [0, 2, 4],
    [1, 5],
    [0, 4],
    [1, 3, 5],
    [2, 4],
  ];

  while (queue.length) {
    let levelCount = queue.length;
    while (levelCount--) {
      let curr = queue.pop();
      //console.log(curr);
      if (curr === target) return res;

      let location = curr.indexOf("0");
      //console.log(location);
      for (let neighbor of neighbors[location]) {
        let swaped = swap(location, neighbor, curr);
        if (swaped === target) return ++res;
        if (!visited.has(swaped)) {
          queue.unshift(swaped);
          visited.add(swaped);
        }
      }
    }
    res++;
  }
  return -1;

  function swap(indexA, indexB, str) {
    newStr = str.split("");
    let temp = newStr[indexA];
    newStr[indexA] = newStr[indexB];
    newStr[indexB] = temp;
    return newStr.join("");
  }
};

slidingPuzzle([
  [1, 2, 3],
  [4, 0, 5],
]);
