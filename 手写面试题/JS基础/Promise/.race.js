// 返回第一个结束的任务结果
// 和Promise.all的原理好像没差，第一个任务结束时则整个Promise状态结束

function Promise_race(array) {
  return new Promise((resolve, reject) => {
    array.forEach((task) => Promise.resolve(task).then(resolve, reject));
  });
}

const p1 = new Promise((r) => {
  r(1);
});

const p2 = new Promise((r) => {
  r(2);
});

const p3 = new Promise((r, j) => {
  j(new Error("shit"));
});

Promise_race([p3, p2, p3]).then((val) => {
  console.log(val);
});
