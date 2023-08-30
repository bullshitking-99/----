/*
 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和。
注意：
num1 和num2 的长度都小于 5100.
num1 和num2 都只包含数字 0-9.
num1 和num2 都不包含任何前导零。
你不能使用任何內建 BigInteger 库， 也不能直接将输入的字符串转换为整数形式。 
*/

//step1 较短字符串用0进行长度补齐
//step2 js中字符串无法修改，故将结果一个一个存在数组里，使用unshift插入数组的头部
//step3 从字符串的尾部开始读起，相加和大于10则 item=1，表示下一次运算时结果加 1

/** 
 * 计算字符串的和
 @param num1 {string} 第一个字符串 
 @param num2 {string} 第二个字符串
 @return {string} 以字符串形式返回
*/
var addStrings = function (num1, num2) {
  //定义结果集
  let result = "";

  //字符串长度补齐
  if (num1.length !== num2.length) {
    let lengthGap = Math.abs(num1.length - num2.length);
    // let str0 = "0".repeat(lengthGap); //若非后序操作次数多这种复杂的变量名好像可以避免

    if (num1.length > num2.length) {
      num2 = "0".repeat(lengthGap) + num2;
    } else {
      num1 = "0".repeat(lengthGap) + num1;
    }
  }

  let item = 0;
  let temp;

  //开始循环相加
  for (let e = num1.length - 1; e >= 0; e--) {
    // temp = num1[e] - "0" + (num2[e] - "0") + item; //不用-0，直接用类型转换就好了
    temp = Number(num1[e]) + Number(num2[e]) + item;

    //item = 0;
    // if (temp >= 10) {
    //   item = 1;
    //   temp -= 10;
    // } //这种if选择赋值类型用三目能更加简洁

    item = temp > 9 ? 1 : 0;
    result = (temp % 10) + result;
  }
  //   if (item) {
  //     result = item + result;
  //   } //单行不加花括号 这波极简的背后意味着敲代码之前脑子里就有了内容，而不是习惯性先打个if出来再说
  if (item) result = item + result;
  return result;
};

console.log(addStrings("2", "12"));

//大神写的，妈的我什么时候也能写出这么优雅的code
/* --------------------------------------------------- */
/* var addStrings = function(num1, num2) {
    let i = num1.length - 1;
    let j = num2.length - 1;
    if (i < j) num1 = '0'.repeat(j - i) + num1;
    if (i > j) num2 = '0'.repeat(i - j) + num2;
  
    let res = '';
    let cnt = 0;
  
    for (let k = Math.max(i, j); k >= 0; k--) {
      const temp = Number(num1[k]) + Number(num2[k]) + cnt;
      cnt = temp > 9 ? 1 : 0;
      res = (temp % 10) + res;
    }
    if (cnt === 1) res = '1' + res;
    return res;
  }; */
