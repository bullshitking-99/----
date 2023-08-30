// call - 为别人家的函数指定上下文this和传入参数
// call传入一个参数列表，需使用...rest参数，否则后面扩展会出事
Function.prototype.myCall = function (context = global, ...args) {
  // 判断上下文，防止方法调用不当
  if (typeof this !== "function")
    throw new TypeError("The calling object must be a function");

  // 将调用myCall的函数添加为context的方法属性
  context.fn = this;
  // 调用
  const res = context.fn(...args);
  // 去掉对context的影响
  delete context.fn;
  return res;
};

function sayHi() {
  console.log(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// 使用 call 将不同的对象传递为 "this"
sayHi.myCall(user); // John
sayHi.myCall(admin); // Admin
