/*
 * @lc app=leetcode.cn id=113 lang=typescript
 *
 * [113] 路径总和 II
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function pathSum(
  root: TreeNode | null,
  targetSum: number,
  path: number[] = [],
  res: number[][] = []
): number[][] {
  //   if (root === null) return res;

  //   if (!root.left && !root.right) {
  //     path.push(root.val);
  //     if (path.reduce((a, b) => a + b) === targetSum) {
  //       res.push(path);
  //     }
  //   }

  //   root.left && pathSum(root.left, targetSum, [...path, root.val], res);
  //   root.right && pathSum(root.right, targetSum, [...path, root.val], res);

  //   return res;

  if (!root) {
    return res;
  }

  path.push(root.val);

  if (!root.left && !root.right && path.reduce((a, b) => a + b) === targetSum)
    res.push(path);

  pathSum(root.left, targetSum, [...path], res);
  pathSum(root.right, targetSum, [...path], res);

  return res;
}
// @lc code=end
