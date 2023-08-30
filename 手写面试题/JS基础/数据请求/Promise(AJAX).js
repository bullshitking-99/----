// Promise封装实现，发送GET请求
// Promise比之普通的回调函数写法的优点在于发布和订阅代码的分离
function getJSON(url) {
  return new Promise((resolve, reject) => {
    // 生产者代码，设置状态改变的时机即可
    // resolve和reject后面的代码还是会执行的，记一个教训
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return;
      if (this.status === 200) resolve(this.response);
      if (this.status !== 200) reject(new Error(this.statusText));
    };
    xhr.onerror = function () {
      reject(new Error(this.statusText));
    };
    xhr.responseType = "json";
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send(null);
  });
}
