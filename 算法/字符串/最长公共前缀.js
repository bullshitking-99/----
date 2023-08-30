// 输入：["cir","car"]
// 输出："cr"

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs.length < 2) {
    return strs[strs.length - 1];
  }
  let res = "",
    temp,
    item;
  for (let i = 0; i < strs[0].length; i++) {
    temp = strs[0][i];
    for (var j = 1; j < strs.length; j++) {
      item = strs[j][i];
      if (!item || item !== temp) {
        break;
      }
    }
    if (j === strs.length) {
      res += temp;
    } else {
      break;
    }
  }
  return res;
};

let s = longestCommonPrefix(["cir", "car"]);
console.log(s);
