/**
 * 链接数组中的连续区间
 * @param {Array} nums
 * @returns {Array} res
 */
function linkNums(nums) {
  const res = [];
  let item = "";

  for (let i = 0; i < nums.length; i++) {
    item =
      nums[i] + 1 === nums[i + 1]
        ? `${nums[i]}~${nums[findEnd(i)]}`
        : `${nums[i]}`;

    res.push(item);
    if (item.indexOf("~")) i = findEnd(i);
  }

  //返回连续区间结尾下标
  function findEnd(start) {
    let end = start + 1;
    while (nums[end - 1] + 1 === nums[end] && end <= nums.length - 1) {
      end++;
    }
    return end - 1;
  }

  return res;
}

const arr = [2, 4, 5, 8, 10, 11, 12, 16];
console.log(linkNums(arr)); //[ '2', '4~5', '8', '10~12', '16' ]
