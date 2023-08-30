const func = () => console.log("赢");

// setTimeout
let sleep = function (func, delay) {
  setTimeout(func, delay);
};
// sleep(func, 1000);

// Promsie
sleep = (delay) => new Promise((r) => setTimeout(r, delay));
// sleep(1000).then(func);

//async await
let wait = async function (func, delay) {
  await sleep(delay);
  func();
};
