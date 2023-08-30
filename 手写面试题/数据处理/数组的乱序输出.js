// 使用sort不顶用
// 虽然保证两个数之间交换的概率是0.5，但排序算法做不到每两个数都比较一次
// arr.sort(() => Math.random() - 0.5);

// 使用洗牌算法Fisher–Yates_shuffle，是每个数在每个位置的概率是1/n
// 步骤是每次随机抽一张，放到最后或上次放置位置的前一位
function shuffle(arr) {
  let i, j;
  for (i = arr.length; i; i--) {
    // j为0~length-1，此处i不能为0，因为i为0则j一定为0
    j = Math.floor(Math.random() * i);
    // 交换i j
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }
  return arr;
}

// const arr = [1, 2, 3, 4, 5];
// const res = shuffle(arr);
// console.log(res);

var statistics = new Array(5).fill(0).map(() => new Array(5).fill(0));
for (let i = 0; i < 100000; i++) {
  let arr = [1, 2, 3, 4, 5];
  arr = shuffle(arr);
  arr.forEach((value, index) => {
    statistics[index][value - 1]++;
  });
}
console.table(
  statistics.map((item) =>
    item.map((value) => ((value / 100000) * 100).toFixed(2) + "%")
  )
);
