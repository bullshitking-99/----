/* 给定一个二叉树，找出其最小深度。
最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
说明:叶子节点是指没有子节点的节点。

示例:
给定二叉树[3,9,20,null,null,15,7],
返回它的最小深度 2. */

/* 基本思想：
1.创建并维护队列 初始时存入root 
2.while循环 结束条件为队列清空
3.计数当前层的节点数，while循环，循环条件中节点数自减
4.循环内为每个结点进行所需的逻辑判断，然后纳入其左右子节点，最后出队*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  if (root === null) return 0;

  let res = 0;
  let queue = [];
  queue.unshift(root);

  while (queue.length) {
    let levelCount = queue.length;
    res++;

    while (levelCount--) {
      let queueHead = queue[0];

      if (!queueHead.left && !queueHead.right) return res;
      if (queueHead.left) queue.push(queueHead.left);
      if (queueHead.right) queue.push(queueHead.right);

      queue.shift();
    }
  }
};
