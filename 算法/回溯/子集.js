/* 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
说明：解集不能包含重复的子集。
示例:

输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

输入：nums = [0]
输出：[[],[0]] */

//记录所有子集需要将所有第一次出现的路径记录其中，体现在代码中即不为res.push添加限制条件
//因为子集中不能有重复组合，所以每一次的同级递归中都会剔除上一次使用的元素，体现在代码中即为下标i+1
//之前我觉得是每次递归后删掉该路径上的根元素，这样会影响更顶层递归的下一次同级递归，事实上，nums应该始终保持
//无需定义path，start等，直接将初始值作为参数赋给backtrack即可

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  let res = [];
  backtrack(nums, [], 0);
  return res;

  function backtrack(nums, path, start) {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(nums, path, i + 1);
      path.pop();
    }
  }
};

let nums = [1, 2, 3];
console.log(subsets(nums));
