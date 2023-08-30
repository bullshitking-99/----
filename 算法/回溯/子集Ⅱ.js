/* 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。
 */

/* 输入：nums = [1,2,2]
输出：[[],[1],[1,2],[1,2,2],[2],[2,2]] */

/* 输入：nums = [0]
输出：[[],[0]] */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  //排序
  nums.sort((a, b) => a - b);

  let res = [];
  backtrack([], 0);
  return res;

  function backtrack(path, start) {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      //如果当前位置不是同层节点第一个，且与上一个节点值相同则跳过
      if (i > start && nums[i] === nums[i - 1]) continue;
      backtrack([...path, nums[i]], i + 1);
    }
  }
};

console.log(subsetsWithDup([2, 1, 2]));
