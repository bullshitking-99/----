/* 输入：s = "PAYPALISHIRING", numRows = 4
输出："PINALSIGYAHRPI"
解释：
P     I    N
A   L S  I G
Y A   H R
P     I 
----------------------------
输入：s = "A", numRows = 1
输出："A"*/

//鄙人拙见
//遍历字符串，创建numRows个空字符串进行存储每一行
//从上往下给numRows-1次，再倒着来一遍，直到字符给完
//连接字符串进行返回
/* ----------------------------------------------------- */
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (numRows === 1) {
    //看了别人的代码 这里判断的是 <2 比我这个好多了，增加了许多容错率，当然更成熟的函数会进一步判断输入
    return s;
  }
  let strArr = [];
  for (let index = 0; index < numRows; index++) {
    strArr.push("");
  }
  let step = 0;
  let flag = true;
  for (const element of s) {
    if (flag) {
      strArr[step++] += element;
      if (step === numRows - 1) {
        flag = false;
      }
    } else {
      strArr[step--] += element;
      if (step === 0) {
        flag = true;
      }
    }
  }
  return strArr.join("");
};

//大佬的代码 - 我的超级无敌优化版
//使用了new Array(n).fill(val),直接给创建并填充一条龙了
//提取了代码核心，超级简洁直接地完成了功能，比如剃掉了我的代码中多余的flag
//我是在解释中那个Z字形进行思考的，大佬直接在数组上进行思考的：Z字形实际上就是从左到右再从右到左地给数组元素赋值，
//二维上的思考转到了一维，一下子简单多了
/* ----------------------------------------------------- */
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (numRows < 2) return s;

  // 创建数组时指定数组元素个数和内容
  let strArr = new Array(numRows).fill("");

  let step = 0;
  let item = 1;
  for (const ele of s) {
    strArr[step] += ele;
    step += item;
    //填充到第一个或最后一个时调转填充方向
    if (step === numRows - 1 || step === 0) item = -item;
  }

  return strArr.join("");
};

console.log(convert("hello", 2));
