/*
去掉字符串str中，连续重复的地方
*/
function removeRepetition(str) {
  let result = str[0];
  for (let x of str) {
    if (result[result.length - 1] !== x) {
      result += x;
    }
  }
  return result;
}

// 测试用例
console.log(removeRepetition("aaa")); // ->a
console.log(removeRepetition("abbba")); // ->aba
console.log(removeRepetition("aabbaabb")); // ->abab
console.log(removeRepetition("")); // ->
console.log(removeRepetition("abc")); // ->abc
