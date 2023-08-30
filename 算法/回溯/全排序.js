//给定一个不含重复数字的数组 nums ，返回其所有可能的全排列。
//你可以按任意顺序返回答案。
//idea:熟练一波模板
/*------------------------------------------------------------------------*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let result = [];
  backtrack([], nums);
  return result;

  function backtrack(path, rest) {
    if (rest.length === 0) {
      result.push(path);
      return;
    }
    rest.forEach((element) => {
      backtrack(
        [...path, element],
        rest.filter((e) => e !== element)
      );
    });
  }
};

var nums = [1, 2, 3];
console.log(permute(nums));
