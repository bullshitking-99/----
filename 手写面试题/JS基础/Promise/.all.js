// 返回一个Promise
// 参数数组里不一定全是promise
// 初始化时会一次性执行全部Promise（放至宏队列）
// 任意一个promise报错都会触发reject，直接返回reject

const promise_all = function (array) {
  const result = [];
  return new Promise((resolve, reject) => {
    array.forEach((element, index) => {
      Promise.resolve(element)
        .then((res) => {
          result[index] = res;
          if (result.length === array.length) resolve(result);
        })
        .catch((err) => reject(err));
    });
  });
};

const p1 = new Promise((r) => {
  console.log(1);
  r();
});

const p2 = new Promise((r) => {
  console.log(2);
  r();
});

const p3 = new Promise((r, j) => {
  console.log(3);
  j(new Error("shit"));
});

promise_all([p1, p2, p3]).then(
  (res) => console.log(res),
  (err) => console.log(err.message)
);
