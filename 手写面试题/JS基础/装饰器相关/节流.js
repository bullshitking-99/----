// 调用装饰器后执行一次函数，随后进入静默状态，不再继续执行，静默结束后立即执行静默期间最后一次调用
// 常用于频繁触发的事件，如屏幕滚动、鼠标移动等

function throttle(func, delay) {
  //   设置静默状态，在每次执行后进入静默并记录调用参数与上下文，解除静默后立即执行一次最终调用
  let isThrottle = false;
  let lastArgs;
  let lastThis;

  return function wrapper(...args) {
    //静默状态下记录调用的参数与上下文，以便之后调用
    if (isThrottle) {
      lastArgs = args;
      lastThis = this;
      // 记得退出
      return;
    }

    // 进入静默状态，执行一次函数
    isThrottle = true;
    // 注意这里调用的不是lastArgs，因其保存的是静默时期的调用信息
    func.apply(this, args);

    // 计时退出静默状态，执行期间最后一次调用
    // 内部运行的不是 func，而是 wrapper，因为我们不仅需要执行 func
    // 还需要再次进入冷却状态并设置 timeout 以重置它。
    setTimeout(() => {
      isThrottle = false;
      if (lastArgs) {
        wrapper.apply(lastThis, lastArgs);
        // 调用信息清零以防止无限调用
        lastArgs = lastThis = null;
      }
    }, delay);
  };
}

function f(a) {
  console.log(a);
}

// f1000 最多每 1000ms 将调用传递给 f 一次
let f1000 = throttle(f, 1000);

f1000(1); // 显示 1
f1000(2); // (节流，尚未到 1000ms)
f1000(3); // (节流，尚未到 1000ms)

// 当 1000ms 时间到，输出 3，中间值 2 被忽略
