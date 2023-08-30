/* 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
输入：nums = [1,1,2]
输出：
[[1,1,2],
 [1,2,1],
 [2,1,1]] */

//idea:与上题不同的是，有重复数字的情况下不能再使用filter
/*------------------------------------------------------------------------*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var permuteUnique = function (nums) {
  nums.sort((a, b) => {
    return a - b;
  });
  let result = [];
  let path = [];

  function backtracing(used) {
    if (path.length === nums.length) {
      result.push(path.slice());
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
        continue;
      }
      if (!used[i]) {
        used[i] = true;
        path.push(nums[i]);
        backtracing(used);
        path.pop();
        used[i] = false;
      }
    }
  }
  backtracing([]);
  return result;
};

var nums = [1, 1, 2];

//以此验证foreach因为不能使用continue而可以使用return跳过当前循环，若需要跳出整个循环，需要抛出异常
function suck(nums) {
  nums.forEach((element) => {
    if (element === 1) {
      console.log("11");
      return;
    }
    console.log(element);
    return;
  });
}

console.log(permuteUnique(nums));
