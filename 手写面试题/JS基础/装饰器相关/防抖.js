// 调用装饰器后开始计时，经过一段冷静时间再调用真正的处理函数，连续调用重置计时，计时完执行最新的一次
// 常用于输入框的模糊搜索

function debounce(func, delay) {
  // 记录上一次调度标识
  let lastTimerId;

  return function (...args) {
    // 取消上一次调度，若调度已执行，clearTimeout无副作用
    clearTimeout(lastTimerId);
    lastTimerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

let f = debounce((str) => console.log(str), 1000);

f("a");
setTimeout(() => f("b"), 200);
setTimeout(() => f("c"), 500);
