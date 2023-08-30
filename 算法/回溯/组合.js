/* 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
[1,2] 和 [2,1] 是同一个组合，只输出一个
你可以按 任何顺序 返回答案。 
示例：
输入：n = 4, k = 2
输出：
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
输入：n = 1, k = 1
输出：[[1]]
*/

// 选择一个，递归，删除该元素，继续递归

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
function combine(n, k) {
  let res = [];
  let path = [];

  backtrack(1);
  return res;

  function backtrack(start) {
    if (path.length === k) {
      res.push([...path]);
      return;
    }
    for (let i = start; i <= n; i++) {
      path.push(i);
      backtrack(i + 1);
      path.pop();
    }
  }
}

console.log(combine(1, 1));
