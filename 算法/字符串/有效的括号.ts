// 判断一个括号字符串 正反括号 是否对应
function isPairsCorrect(str: string): boolean {
  // 设定括号对
  const pairs = new Map([
    ["(", ")"],
    ["[", "]"],
    ["{", "}"],
  ]);

  // 存储已遍历括号
  const stock: string[] = [];

  // 遍历
  for (let s of str) {
    if (pairs.has(s)) {
      // 正括号纳入
      stock.push(s);
    } else {
      // 反括号对比
      // 数组无
      if (!stock.length) return false;
      // 数组有
      if (s === pairs.get(stock[stock.length - 1])) {
        // 括号对应
        stock.pop();
      } else {
        // 括号不对应
        return false;
      }
    }
  }

  // 判断结果
  if (!stock.length) {
    return true;
  }
  return false;
}

// test
const str = "{[()]}";
console.log(isPairsCorrect(str));
const str2 = "{[()}";
console.log(isPairsCorrect(str2));
