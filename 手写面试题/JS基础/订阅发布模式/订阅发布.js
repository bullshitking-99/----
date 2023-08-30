// 创建
// 加$是为了防止mixin引入后与原类中方法发生命名冲突
let eventMixin = {
  /**
   * 订阅事件，注册事件handler
   */
  $on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) this._eventHandlers[eventName] = [];
    // 允许同名handler注册
    this._eventHandlers[eventName].push(handler);
  },

  /**
   * 取消订阅事件中的某个方法
   */
  $off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    // 该事件未注册
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      // splice会修改原数组导致数组长度-1，故i下标也自减一位
      if (handlers[i] === handler) handlers.splice(i--, 1);
    }
  },

  /**
   * 删除该事件
   */
  $clear(eventName) {
    if (!this._eventHandlers?.[eventName]) return;
    delete this._eventHandlers[eventName];
  },

  /**
   * 发布事件，触发所有订阅事件的方法
   */
  $trigger(eventName, ...args) {
    let eventHandlers = this._eventHandlers[eventName];
    // 该事件名称没有对应的事件处理程序（handler）
    if (!eventHandlers || !eventHandlers.length) {
      console.warn("该事件无订阅");
      return;
    }
    eventHandlers.forEach((handler) => handler.apply(this, args));
  },
};

// 使用
class Menu {}
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

function sayBye(name) {
  console.log("goodBye " + name);
}
menu.$on("go", sayBye);
menu.$trigger("go", "my youth"); // goodBye my youth
menu.$off("go", sayBye);
menu.$trigger("go", "my youth"); //该事件无订阅
