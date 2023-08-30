/* 给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。
你可以假设数组是非空的，并且给定的数组总是存在多数元素。 */

/* 本题将使用Moore Voting，摩尔投票算法求众数，算法思想为设置当前元素为候选项，count=1，遍历数组，当遇到相同元素时count++，
否则count--，当count===0时，则更换遍历指针当前元素为候选项，继续遍历，最后的候选项即为众数 */

/* 算法思想解析：众数的数量十分特殊，能以一己之力覆盖其它所有元素并有剩余，即使众数与其余元素交叉排列，即其余元素都用来消磨众数
的count，最后的候选元素也是众数 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let candidate = nums[0];
  let count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === candidate) count++;
    if (nums[i] !== candidate) count--;

    if (count === 0) {
      candidate = nums[i];
      count = 1;
    }
  }

  return candidate;
};
