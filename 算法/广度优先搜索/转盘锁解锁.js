/* 你有一个带有四个圆形拨轮的转盘锁。每个拨轮都有10个数字： '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' 。
每个拨轮可以自由旋转：例如把 '9' 变为 '0'，'0' 变为 '9' 。每次旋转都只能旋转一个拨轮的一位数字。

锁的初始数字为 '0000' ，一个代表四个拨轮的数字的字符串。

列表 deadends 包含了一组死亡数字，一旦拨轮的数字和列表里的任何一个元素相同，这个锁将会被永久锁定，无法再被旋转。

字符串 target 代表可以解锁的数字，你需要给出解锁需要的最小旋转次数，如果无论如何不能解锁，返回 -1 。
*/

/* https://leetcode.cn/problems/open-the-lock/ */

/* 问题抽象化：将解锁的过程进行步骤化，第一步每个拨轮有向上向下两种方式，一共四个拨轮，共计八条路径 
则整个解锁过程化为一棵八叉树，每个结点存储当前锁的状态，问题简化为寻找结点为target的最短路径，则使用bfs算法，不同的是，
整个过程是边遍历边创建的

根据题意的deadends以及剪枝需要，维护一个hash表，存储所有的deadends和已遍历的非target结点

引入子节点：按八种情况转动转轮，转完后的数字若在hash中，则剪枝，否则纳入queue和hash

结束条件为队列为空，此时代表无论再怎么转都会meet hash，返回-1*/

/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
  if (deadends.includes("0000")) {
    return -1;
  }

  const hash = {};
  hash["0000"] = 1;
  deadends.forEach((e) => (hash[e] = 1));

  let res = 0;
  let queue = [];
  queue.unshift("0000");

  while (queue.length) {
    let levelCount = queue.length;

    while (levelCount--) {
      let queueHead = queue.pop();
      if (queueHead === target) return res;

      for (let i = 0; i < 4; i++) {
        let temp = ["", ""];
        temp[0] = queueHead.split("");
        temp[1] = queueHead.split("");

        temp[0][i] = upString(temp[0][i]);
        temp[1][i] = downString(temp[0][i]);

        temp[0] = temp[0].join("");
        temp[1] = temp[1].join("");

        temp.forEach((e) => {
          if (e === target) return ++res;
          if (!hash[e]) {
            queue.unshift(e);
            hash[e] = 1;
          }
        });
      }
    }
    res++;
  }
  return -1;

  function upString(str) {
    if (str === "9") {
      return "0";
    } else {
      return `${str - "0" + 1}`;
    }
  }
  function downString(str) {
    if (str === "0") {
      return "9";
    } else {
      return `${str - "0" - 1}`;
    }
  }
};

var openLock2 = function (deadends, target) {
  if (deadends.includes("0000")) {
    return -1;
  }

  const hash = {};
  hash["0000"] = 1;
  deadends.forEach((e) => (hash[e] = 1));

  let res = 0;
  let queue = [];
  queue.unshift("0000");

  while (queue.length) {
    let levelCount = queue.length;

    while (levelCount--) {
      let queueHead = queue.pop();
      if (queueHead === target) return res;

      for (let i = 0; i < 4; i++) {
        const upArr = queueHead.split("");
        upArr.splice(i, 1, up(queueHead[i]));
        const upString = upArr.join("");
        if (!hash[upString]) {
          hash[upString] = 1;
          queue.unshift(upString);
        }

        const downArr = queueHead.split("");
        downArr.splice(i, 1, down(queueHead[i]));
        const downString = downArr.join("");
        if (!hash[downString]) {
          hash[downString] = 1;
          queue.unshift(downString);
        }
      }
    }
    res++;
  }
  return -1;

  function up(str) {
    if (str === "9") {
      return "0";
    } else {
      return `${str - "0" + 1}`;
    }
  }
  function down(str) {
    if (str === "0") {
      return "9";
    } else {
      return `${str - "0" - 1}`;
    }
  }
};

let res = openLock(["0201", "0101", "0102", "1212", "2002"], "0202");
console.log(res);
