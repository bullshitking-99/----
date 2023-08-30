// 订阅发布
interface IeventHandlers {
  [propName: string]: Array<Function>;
}
class eventMixin {
  _eventHandlers: IeventHandlers = {};
  // 订阅
  $on(event: string, handler: Function) {
    if (!this._eventHandlers[event]) this._eventHandlers[event] = [];
    this._eventHandlers[event].push(handler);
  }
  // 发布
  $trigger(event: string, ...args: any[]) {
    const handlers = this._eventHandlers[event];
    if (!handlers || !handlers.length) console.warn("none exist");
    handlers.forEach((handler: Function) => {
      handler.apply(this, args);
    });
  }

  // 取消
  $off(event: string, handler?: Function) {
    const handlers = this._eventHandlers[event];
    if (!handler) delete this._eventHandlers[event];
    if (handler) {
      handlers.forEach((item, index, arr) => {
        if (item === handler) arr.splice(index, 1);
      });
    }
  }
}

const eventBus = new eventMixin();
const hello = (name: string) => console.log("hello" + name);
eventBus.$on("hello", hello);
eventBus.$trigger("hello", "world");
eventBus.$off("hello", hello);
console.log(eventBus._eventHandlers);
