/* 给定一个二叉搜索树的根节点 root ，和一个整数 k ，请你设计一个算法查找其中第 k 个最小元素（从 1 开始计数）。
https://leetcode.cn/problems/kth-smallest-element-in-a-bst/
*/

/* 二叉搜索树：中序遍历（左根右）为递增序列，比根结点小的结点在其左子树，比其大的结点在右子树 */

/* 示例
输入：root = [3,1,4,null,2], k = 1
输出：1 
输入：root = [5,3,6,2,4,null,null,1], k = 3
输出：3*/

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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  let count = 0;
  let res;
  traverse(root);
  return res;

  function traverse(root) {
    if (!root) {
      return;
    } else {
      traverse(root.left);
      if (++count === k) res = root.val;
      if (res) return;
      traverse(root.right);
    }
  }
};
