// 将source对象属性复制至指定对象target并返回target
const source = { name: "lee" };
const target = {};
const result = Object.assign(target, source);
console.log(result === target); // true

// 手写assign
Object.prototype.myAssign = function (target, ...source) {
  source.forEach((item) => {
    for (let key in item) {
      if (item.hasOwnProperty(key)) target[key] = item[key]; // 防止 for in 遍历原型上的属性
    }
  });
  return target;
};

// 防止 for in 遍历原型上的属性，也可以这样
// for in 并非在内部调用迭代器，普通对象也没有迭代属性，for in 在内部使用的方法是 [[OwnPropertyKeys]]
// Object.defineProperty(Object.prototype, "myAssign", { enumerable: false });

const res = Object.myAssign({}, { name: "lee" });
console.log(res);
