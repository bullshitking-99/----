// apply - 使用 func.apply(this, arguments) 代替 func.call(this, ...arguments)
// call 和 apply 之间唯一的语法区别是，call 期望一个参数列表，而 apply 期望一个包含这些参数的类数组(简化数组，只有数值索引和length属性)对象。
// 对于既可迭代又是类数组的对象，例如一个真正的数组，我们使用 call 或 apply 均可，但是 apply 可能会更快，
// 因为大多数 JavaScript 引擎在内部对其进行了优化。

Function.prototype.myApply = function (context = global, args) {
  // 判断上下文，防止方法调用不当
  if (typeof this !== "function")
    throw new TypeError("The calling object must be a function");

  // 将调用myCall的函数添加为context的方法属性
  context.fn = this;
  // 调用，正常调用还是要把参数类数组铺开的，这里将类数组转化为可迭代的真数组，才能用spread铺开
  const res = context.fn(...Array.from(args));
  // 去掉对context的影响
  delete context.fn;
  return res;
};
