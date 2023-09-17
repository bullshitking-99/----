//  为什么要异步加载图片
//  图片懒加载时将data-src属性赋值给src
// 或等图片加载完后计算文档的完整高度

function imageAsync(url) {
  return new Promise((r, j) => {
    let img = new Image();
    img.src = url;
    img.οnlοad = (image) => {
      console.log(`图片请求成功，此处进行通用操作`);
      r(image);
    };
    img.οnerrοr = (err) => {
      console.log(`失败，此处进行失败的通用操作`);
      j(err);
    };
  });
}

imageAsync("url")
  .then(() => {
    console.log("加载成功");
  })
  .catch((error) => {
    console.log("加载失败");
  });
