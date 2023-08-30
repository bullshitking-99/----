// bind - 返回绑定上下文和参数的新函数，可用于生产偏函数
// let bound = func.bind(context, [arg1], [arg2], ...);
// 用apply构建语法糖，则bind的作用即不用每次都写apply

// 简易版
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("The binding object must be a function");
  }
  const originFunc = this;
  return function () {
    return originFunc.apply(context, args.concat(...arguments)); // concat会自动将参数中的数组铺平，但防止混淆还是给他手动铺开吧
  };
};

// 当我们需要考虑 将bind返回的函数bound作为构造函数时
// it is worth noting that，对bound执行new应忽略原先绑定的this

// 因此，我们需要判断bound是否在被new调用
// 因为new会先将this的原型指向构造函数的原型，所以此时的this是可以使用instanceof判断是不是实例的

Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("The binding object must be a function");
  }
  const originFunc = this;
  function bound() {
    return originFunc.apply(this instanceof bound ? this : context, [
      ...args,
      ...arguments,
    ]);
  }
  bound.prototype = Object.create(originFunc.prototype);
  return bound;
};

function Rabbit(name) {
  this.name = name;
}

const fake = {};
//   const Rabbit_lee = Rabbit.bind(fake, "lee");
const Rabbit_lee = Rabbit.myBind(fake, "lee");

const rab = new Rabbit_lee();

console.log(fake); // {}
console.log(rab); // Rabbit { name: 'lee' }
console.log(rab instanceof Rabbit); // true
