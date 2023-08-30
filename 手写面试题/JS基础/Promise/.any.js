// 返回第一个成功的任务结果
// it is worth noting that 如果给出的 promise 都 rejected，
// 那么返回的 promise 会带有 AggregateError —— 一个特殊的 error 对象
// 在其 errors 属性中存储着所有 promise error

function Promise_any(array) {
  const errors = [];
  return new Promise((resolve, reject) => {
    array.forEach((task, index) => {
      Promise.resolve(task).then(resolve, (error) => {
        errors[index] = error;
        if (errors.length === array.length)
          reject(new AggregateError(errors, "All promises were rejected"));
      });
    });
  });
}

const promises = [
  Promise.reject("ERROR A"),
  Promise.reject("ERROR B"),
  //   Promise.resolve("result"),
];

Promise_any(promises).then(
  (val) => console.log(val),
  (e) => {
    console.log(e instanceof AggregateError); // true
    console.log(e.message); // "All promises were rejected"
    console.log(e.name); // "AggregateError"
    console.log(e.errors); // [ 'ERROR A', 'ERROR B' ]
  }
);
