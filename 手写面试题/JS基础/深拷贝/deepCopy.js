// 不多BB，给家人们来点深的
// map 写在默认参数中，可进行递归传入保持状态，并省得要在外面套一层函数以声明map，很优雅
// WeakMap节约内存，及时释放
// 原文链接：https://juejin.cn/post/6844903929705136141#heading-13

function deepClone(target, map = new WeakMap()) {
  // 数组和对象请进
  if (typeof target === "object" && target !== null) {
    let cloneTarget = Array.isArray(target) ? [] : {};

    //  解决循环引用问题，如该对象已复制过，则直接返回克隆对象，中断递归
    if (map.has(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);

    // // 使用封装的while函数进行迭代，优化性能
    // const keys = Array.isArray(target) ? undefined : Object.keys(target);
    // forEach(keys || target, (value, key) => {
    //   // target是对象，将key转化为对象属性名，以统一处理
    //   if (keys) {
    //     key = value;
    //   }
    //   // target是数组，直接赋值
    //   // 传入map记录状态
    //   cloneTarget[key] = deepClone(target[key], map);
    // });

    for (const key in target) {
      if (Object.hasOwnProperty.call(target, key)) {
        cloneTarget[key] = deepClone(target[key], map);
      }
    }

    return cloneTarget;
  }

  return target;
}

// 性能优化，将forin 改为 while或for
// 封装传入数组和回调的递归函数
function forEach(array, callback) {
  let len = array.length;
  let i = -1;
  while (++i < len) {
    // 有可能改变array，有可能不会
    callback(array[i], i);
  }
  // 返回可能被改变的array
  return array;
}

// test
const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child",
  },
  field4: [2, 4, 8],
  f: {
    f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } },
  },
};

target.target = target;

console.time();
const result = deepClone(target);
console.timeEnd();
