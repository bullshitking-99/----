//description
//泰波那契序列?Tn?定义如下：
// T0 = 0, T1 = 1, T2 = 1, 且在 n >= 0?的条件下 Tn+3 = Tn + Tn+1 + Tn+2
// 给你整数?n，请返回第 n 个泰波那契数?Tn 的值。

//递归 recursion
//时间复杂度为O(n) 空间复杂度为O(n)
var tribonacci1 = function (n) {
  if (n < 3) {
    if (n === 0) return 0;
    else if (n === 1) return 1;
    else if (n === 2) return 1;
  } else {
    return tribonacci(n - 3) + tribonacci(n - 2) + tribonacci(n - 1);
  }
};

//非递归 non-recursion
//滚动数组思想 空间复杂度为O(1)
var tribonacci2 = function (n) {
  if (n === 0) return 0;
  if (n === 1 || n === 2) return 1;
  let a = 0;
  let b = 1;
  let c = 1;
  let sum;
  for (let i = 3; i <= n; i++) {
    sum = a + b + c;
    a = b;
    b = c;
    c = sum;
  }
  return c;
};

//矩阵快速幂
//https://leetcode-cn.com/problems/n-th-tribonacci-number/solution/di-n-ge-tai-bo-na-qi-shu-by-leetcode-sol-kn16/
//O(logn) O(1)
var tribonacci3 = function (n) {
  if (n === 0) {
    return 0;
  }
  if (n <= 2) {
    return 1;
  }
  const q = [
    [1, 1, 1],
    [1, 0, 0],
    [0, 1, 0],
  ];
  const res = pow(q, n);
  return res[0][2];
};
//矩阵幂运算
const pow = (a, n) => {
  let ret = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  while (n > 0) {
    if ((n & 1) === 1) {
      //位运算，执行效率非常高。n&1：与操作，判断 n 二进制最右一位是否为 1 。判断是奇数还是偶数。
      ret = multiply(ret, a);
    }
    n >>= 1; //n>>1：移位操作，删除n二进制的最右一位。
    a = multiply(a, a);
  }
  return ret;
};
//矩阵乘法
const multiply = (a, b) => {
  const c = new Array(3).fill(0).map(() => new Array(3).fill(0));
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      c[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j] + a[i][2] * b[2][j];
    }
  }
  return c;
};

var n = 25;
console.log(tribonacci3(n));
