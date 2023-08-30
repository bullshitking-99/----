/*
Object.create(proto, [descriptors])
利用给定的 proto 作为 [[Prototype]] 和可选的属性描述来创建一个空对象。
*/

function create(proto: object, descriptors: PropertyDescriptorMap = {}) {
  function F() {}
  // Object.setPrototypeOf(F, proto);
  // Property 'setPrototypeOf' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
  // 修改tsconfig.json没用
  F.prototype = proto;
  return Object.defineProperties(new F(), descriptors);
}

// test
// let animal = {
//   eats: true,
// };

// let rabbit = Object.create(animal, {
//   jumps: {
//     value: true,
//   },
// });

// console.log(rabbit.eats); // true
// console.log(rabbit.jumps); // true
