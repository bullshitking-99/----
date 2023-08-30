// new - 为原型创造实例，1.将prototype赋予实例完成继承 2.根据参数定制实例属性
// 如果构造函数里自己有返回，且返回是对象或函数，让他返回
// 空返回或常数则返回new创建的对象，这是顾及完整性的规范

function newObject(constructor, ...args) {
  // 边界判断
  if (typeof constructor !== "function") return false;
  // 创建对象并赋原型
  const obj = Object.create(constructor.prototype);
  // 执行构造函数，以新对象为上下文，回收构造函数的返回
  const res = constructor.apply(obj, args);
  // 判断构造返回
  if (res && (typeof res === "object" || typeof res === "function")) return res;
  return obj;
}

function animal(name) {
  this.name = name;
}

// 这个可以用newObject 等效
// class animal {
//   constructor(name) {
//     this.name = name;
//   }
// }

const obj = newObject(animal, "lee");
console.log(obj);

// 这个不可以用newObject，因为有函数了，只能用new，因为真正的new更复杂，要判断类型的
// class animal {
//   constructor(name) {
//     this.name = name;
//   }
//   eat() {
//     console.log("eating~");
//   }
// }
