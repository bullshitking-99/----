// n个小孩进行编号1-n，循环报数1-k，k号离开，求最后留下小孩的编号
// 该函数有待完善，但我的理论是对的，耶

function childNum() {
  const Children = new Array(31).fill(1);
  //   Children.forEach((item, index, arr) => (arr[index] = ++index));

  let count = 1;
  function counter(id) {
    if (count === 3) {
      Children[id] = 0;
      count = 0;
    }
    count++;
  }
  let lastPerson;

  while (true) {
    for (let i = 1; i <= 30; i++) {
      if (lastPerson && lastPerson === i) {
        return lastPerson;
      }
      if (Children[i]) {
        counter(i);
        lastPerson = i;
      }
    }
  }
}

console.log(childNum());
