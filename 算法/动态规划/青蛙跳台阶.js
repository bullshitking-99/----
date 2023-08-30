/* 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。
答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
 */

/* 利用 f(n)=f(n-1)+f(n-2) 这个公式，从小到大，循环叠加，直到算出f(n)*/

/**
 * @param {number} n
 * @return {number}
 */
var numWays = function (n) {
  if (n <= 1) return 1;
  if (n === 2) return 2;

  let a = 1;
  let b = 2;
  let fn = 0;
  for (let i = 3; i <= n; i++) {
    fn = (a + b) % 1000000007;
    a = b;
    b = fn;
  }
  return fn;
};
