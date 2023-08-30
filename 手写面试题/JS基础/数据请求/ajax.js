// AJAX是一种异步通信机制，通过网络请求动态部分更新网页
// 使用XMLHttpRequest对象及其方法实现

// readyState的五种状态
// 0：XMLHttpRequest对象还没有完成初始化
// 1：XMLHttpRequest对象开始发送请求
// 2：XMLHttpRequest对象的请求发送完成
// 3：XMLHttpRequest对象开始读取服务器的响应
// 4：XMLHttpRequest对象读取服务器响应结束

const URL = "/server";
let xhr = new XMLHttpRequest();
// create Http request
// open 方法所需要的参数是请求的方法、请求的地址、是否异步和用户的认证信息
xhr.open("GET", URL, true);

// 设置状态监听函数
// 不建议赋值箭头函数，因为里面就用不了this了
xhr.onreadystatechange = function () {
  if (this.readyState !== 4) return;
  //   当对象的 readyState 变为 4 的时候，代表服务器返回的数据接收完成，
  // 这个时候可以通过判断请求的状态，如果状态是 2xx 或者 304 的话则代表返回正常。
  if (this.status === 200) handle(this.response);
  if (this.status !== 200) console.error(this.statusText);
};

// 请求完成事件
xhr.onload = function () {
  console.log(this.response);
};

// 设置请求失败时的监听函数
xhr.onerror = function () {
  console.error(this.statusText);
};
// 设置请求头信息
xhr.setRequestHeader("Accept", "application/json");

//请求的数据类型
xhr.responseType = "json";

// 发送Http请求
xhr.send(null);
