/* 小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为 root 。

除了 root 之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列
类似于一棵二叉树”。 如果 两个直接相连的房子在同一天晚上被打劫 ，房屋将自动报警。

给定二叉树的 root 。返回 在不触动警报的情况下 ，小偷能够盗取的最高金额 。
 */

/* https://leetcode.cn/problems/house-robber-iii/ */

/* bfs无法覆盖所有情况，如两个兄弟结点可一个取一个不取
dfs的思想即将每一次选择作为一个平行世界，由于是具有重复类型的树结构，使用递归探索所有选择
1. 简单递归思想清晰，但是分支太多，且很多重合，因为当前节点不选择，依旧要考虑子节点不选择的情况，这与选择当前节点的情况重合
2. 针对递归中重复子问题的优化最容易想到的就是备忘录memo了，我们只需要拿数组记录下已经被递归过的重复子问题的结果即可，
    关于memo的key值，这里使用了很巧妙的JSON.stringify(root)。
 */

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
var rob = function (root) {
  //引入memo记录重复分支的值进行剪枝
  let memo = {};
  return dfs(root);

  function dfs(root) {
    if (!root) return 0;
    let rootKey = JSON.stringify(root);
    if (memo[rootKey]) return memo[rootKey];

    //选择该节点
    let rob = root.val;
    if (root.left) rob += dfs(root.left.left) + dfs(root.left.right);
    if (root.right) rob += dfs(root.right.left) + dfs(root.right.right);

    //不选择该节点
    let giveup = dfs(root.left) + dfs(root.right);

    const res = Math.max(rob, giveup);
    memo[rootKey] = res;
    return res;
  }
};
