const PENDING = "pending",
  FULLFILLED = "fullfilled",
  REJECTED = "rejected";
class MyPromise {
  constructor(handler) {
    // 设置实例状态
    this.status = PENDING;
    this.value = null;
    this.reason = null;

    // 接收注册回调的数组
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    // 输入判断
    if (!this._isFunction(handler))
      throw new Error("handler is not a function");

    //为handler传入参数，回调函数需要绑定Promise实例作为上下文，以读写实例
    handler(this._resolve.bind(this), this._reject.bind(this));
  }
  // 参数可选，改变promise状态，执行已注册的回调
  _resolve(value) {
    if (this.status === PENDING) {
      this.status = FULLFILLED;
      this.value = value;
      this.onResolvedCallbacks.forEach((fn) => fn(this.value));
    }
  }
  _reject(reason) {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reas;
      this.onRejectedCallbacks.forEach((fn) => fn(this.value));
    }
  }
  _isFunction(handler) {
    return typeof handler === "function";
  }

  // 承前启后的then
  /* 作为在微任务执行的then(使用queueMicroTask(f)安排微任务)，他的作用可分为：
    承前：
        1.当运行时promise内的生产者还没执行完（传入handler为异步任务，在下一个宏任务队列执行），
        则将自己的回调参数注册到promise实例中，等待异步任务执行完毕后通过resolve/reject执行，
        因为一个promise可以调用多个then(非链式调用),故使用数组存储这些注册的调用，统一执行
        2.若promise中的handler已经执行完（同步任务，resolve/reject已经执行过了），则直接执行回调
    启后：
        then总会返回一个promise，根据then中handler执行的结果，改变promise的状态，以供链式调用
        1.若结果为value，调用resolve设置promise的状态为fullfilled
        2.若执行过程中抛出错误，调用reject设置promise的状态为rejected
        3.若结果为一个promise，则说明then中的handler可能为一个异步任务，这时我们需要等待这个handler执行完，状态不变，
        继续通过then为其设置状态监听
    */
  then(onResolved, onRejected) {
    return new MyPromise((nextResolve, nextReject) => {
      // 1.判断有没有传入成功的回调
      if (this._isFunction(onResolved)) {
        // 2.判断当前的状态是否是成功状态
        if (this.status === FULLFILLED) {
          try {
            // 拿到上一个promise成功回调执行的结果
            let result = onResolved(this.value);
            // console.log("result", result);
            // 判断该发布任务是否已执行完成，还没执行完则使用then进行订阅，将回调注册进去，任务执行完将顺便改变该Promise状态
            if (result instanceof MyPromise) {
              result.then(nextResolve, nextReject);
            } else {
              // 立即改变当前Promise状态，并将结果传递给下一个then
              nextResolve(result);
            }
          } catch (e) {
            nextReject(e);
          }
        }
      }
      // 1.判断有没有传入失败的回调
      // if(this._isFunction(onRejected)){
      try {
        // 2.判断当前的状态是否是失败状态
        if (this.status === REJECTED) {
          let result = onRejected(this.reason);
          if (result instanceof MyPromise) {
            result.then(nextResolve, nextReject);
          } else {
            nextResolve(result);
          }
        }
      } catch (e) {
        nextReject(e);
      }
      // }
      // 2.判断当前的状态是否是默认状态
      if (this.status === PENDING) {
        if (this._isFunction(onResolved)) {
          // this.onResolvedCallback = onResolved;
          this.onResolvedCallbacks.push(() => {
            try {
              let result = onResolved(this.value);
              if (result instanceof MyPromise) {
                result.then(nextResolve, nextReject);
              } else {
                nextResolve(result);
              }
            } catch (e) {
              nextReject(e);
            }
          });
        }
        // if(this._isFunction(onRejected)){
        // this.onRejectedCallback = onRejected;
        this.onRejectedCallbacks.push(() => {
          try {
            let result = onRejected(this.reason);
            if (result instanceof MyPromise) {
              result.then(nextResolve, nextReject);
            } else {
              nextResolve(result);
              nextReject();
            }
          } catch (e) {
            nextReject(e);
          }
        });
        // }
      }
    });
  }
}
