// 4个4 因为循环结束时i的值为4
// for (var i = 0; i < 4; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, i * 1000);
// }

// 使用let得到了块级作用域
// 1 2 3 4
// for (let i = 0; i < 4; i++) {
//   setTimeout(() => {
//     console.log(++i);
//   }, i * 1000);
// }

// 1 2 3 4
// setTimeout第二个参数之后为回调参数
// for (var i = 0; i < 4; i++) {
//   setTimeout(
//     function (i) {
//       console.log(++i);
//     },
//     i * 1000,
//     i
//   );
// }

// 使用闭包实现
// for (var i = 0; i < 5; i++) {
//   (function (i) {
//     setTimeout(function () {
//       console.log(i);
//     }, i * 1000);
//   })(i);
// }

// 递归试试
(function printNubmer(cur, tar) {
  if (cur > tar) return;
  console.log(cur);
  if (cur === tar) return;
  setTimeout(() => {
    printNubmer(++cur, tar);
  }, 500);
})(1, 4);
