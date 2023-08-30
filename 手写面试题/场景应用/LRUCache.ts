/**
 * https://leetcode.realduang.com/docs/list/design/146.lru-cache.html
 */

// 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
// 实现 LRUCache 类：
// LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存 int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
// void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
// 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。

// 定时清理未被操作的数
const sweep = (
  cache: { cache: Map<any, any>; [key: string]: any },
  delay: number
) => {
  const timeIds = new Map();
  const map = cache.cache;

  cache.get = (key: any) => {
    cache.prototype.get(key);
    clearCache(key);
  };
  cache.put = (key: any) => {
    cache.prototype.put(key);
    clearCache(key);
  };

  return cache;

  function clearCache(key: any) {
    if (timeIds.has(key)) {
      clearTimeout(timeIds.get(key));
    }

    const timeId = setTimeout(() => {
      map.delete(key);
      timeIds.delete(key);
    }, delay);

    timeIds.set(key, timeId);
  }
};

const LRUCache = class {
  capacity: number;
  cache: Map<any, any>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  put(key: any, value: any) {
    // 判断是否已存在
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    // 更新至队尾
    this.cache.set(key, value);

    // 判断容量
    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }

    console.log(this.cache);
  }

  get(key: any) {
    if (!this.cache.has(key)) {
      return -1;
    }
    const _value = this.cache.get(key);
    // 更新至队尾
    this.cache.delete(key);
    this.cache.set(key, _value);

    console.log(_value, this.cache);
  }
};

let lRUCache = new LRUCache(2);

lRUCache = sweep(lRUCache, 1000);

lRUCache.put(1, 1); // 缓存是 {1=1}

lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}

lRUCache.get(1); // 返回 1

lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}

lRUCache.get(2); // 返回 -1 (未找到)

lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}

lRUCache.get(1); // 返回 -1 (未找到)

lRUCache.get(3); // 返回 3

lRUCache.get(4); // 返回 4
