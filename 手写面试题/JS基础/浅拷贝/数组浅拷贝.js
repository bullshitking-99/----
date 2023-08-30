// 所谓拷贝，即把对象地址中的内容复制过来而非创一个新的引用

// 使用数组方法
// slice和concat都不会修改原数组
const arr = [1, 2, 3];
const arr_copy = arr.slice();
console.log(arr === arr_copy); // false

const arr_copy2 = arr.concat();
console.log(arr === arr_copy2); // false

// 自己写方法
function shallowCopy(target) {
  if (typeof target !== "object") return;
  const obj = Array.isArray(target) ? [] : {};
  for (const key in target) {
    if (Object.hasOwnProperty.call(target, key)) obj[key] = target[key];
  }
  return obj;
}
const arr_copy3 = shallowCopy(arr);
console.log(arr === arr_copy3); // false
