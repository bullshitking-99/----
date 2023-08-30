// 根据定义，柯里化是一种函数的转换，它是指将一个函数从可调用的 f(a, b, c) 转换为可调用的 f(a)(b)(c)
// 但是在 JavaScript 中大多数的柯里化实现都是高级版的：它们使得函数可以在声明数量范围内任意传入参数
// 家人们，吃透了，无非是在调用包装器函数时收集和存储参数，然后在特定时机结算状态
// 这个特定时机可以是参数存储数量达到上限，某次空调用，或调用函数的toString函数时

// 函数参数列表长度固定
function curry_paramsLength(func) {
  return function curried(...args) {
    return args.length >= func.length
      ? func.apply(this, args)
      : (...restArgs) => curried.apply(this, [...args, ...restArgs]);
  };
}

// toString时结算状态 - G
function curry_toString(func) {
  const params = [];
  const curried = function (...args) {
    params.concat(args);
    return (...restArgs) => curried.apply(this, [...args, ...restArgs]);
  };
  curried.toString = () => func.apply(this, params);
  return curried;
}

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry_paramsLength(sum);
curriedSum = curry_toString(sum);

// 6
console.log(curriedSum(1)(2, 3));
console.log(curriedSum(1)(2)(3));
console.log(curriedSum(1, 2, 3));
