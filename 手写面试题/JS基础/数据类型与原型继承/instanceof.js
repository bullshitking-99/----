// 原型判断 使其能判断 基础数据类型
function instanceOf(instance, constructor) {
  // 判断基础类型
  if (typeof instance !== "object") {
    const instance_type = Object.prototype.toString
      .call(instance)
      .split(" ")[1]
      .slice(0, -1);

    console.log(constructor.name);
    if (constructor.name === instance_type) {
      return true;
    } else {
      return false;
    }
  }
  if (instance === null) return false;

  // 获取实例的原型
  let instance_proto = Object.getPrototypeOf(instance);

  // 获取构造器的 prototype 属性
  // 这里不能用 Object.getPrototypeOf(constructor)，获取的是[[prototype]]，指向 Function.prototype
  const constructor_proto = constructor.prototype;

  // 递归判断构造器prototype是否在实例原型链上
  while (true) {
    if (constructor_proto === instance_proto) return true;
    if (constructor_proto !== instance_proto)
      instance_proto = Object.getPrototypeOf(instance_proto);
    if (instance_proto === null) return false;
  }
}

const res = instanceOf([], Object);
console.log(res);

class Animal {}
class Rabbit extends Animal {}

let rabbit = new Rabbit();
console.log(instanceOf(rabbit, Animal)); // true
