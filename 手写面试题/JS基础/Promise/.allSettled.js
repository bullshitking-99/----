// 全部执行完再返回结果数组，报错不影响执行，包含在结果数组中
// 可用Promise.all实现，称之为语法糖

function Promise_allSettled(array) {
  // 将array里的promise全部改成resolve状态，即可通过Promise.all操作
  const convertedArray = array.map((promise) =>
    Promise.resolve(promise)
      .then((result) => ({
        status: "fullfilled",
        result,
      }))
      .catch((error) => ({
        status: "rejected",
        error,
      }))
  );
  return Promise.all(convertedArray);
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

Promise_allSettled([p1, p2, p3]).then((val) => {
  console.log(val);
});
