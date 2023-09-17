// n个小孩进行编号0->n-1，循环报数1-k，k号离开，求最后留下小孩的编号
// 约瑟夫环问题

// 以k循环 递归处理剩下的小孩
// 删除后头尾交换即可代表新数组

const childNum = 88;
const children = new Array(childNum).fill(1).map((_, i) => i);

function delChild(children, k) {
  const num = children?.length;

  if (!num || !k) return false;

  if (num === 1) return children[0];

  let index = (num < k ? k % num : k) - 1;
  // 输出点在右边界的特殊处理
  if (index < 0) index = num - 1;

  const newChildren = [
    ...children.slice(index + 1),
    ...children.slice(0, index),
  ];

  return delChild(newChildren, k);
}

// 递归占用的栈空间太大，已知循环次数所以改为迭代
var lastRemaining = function (n, k) {
  let children = new Array(n).fill(1).map((_, i) => i);

  // 递归占用的栈空间太大，已知循环次数所以改为迭代
  while (children.length > 1) {
    const num = children.length;
    let index = (num < k ? k % num : k) - 1;
    // 输出点在右边界的特殊处理
    if (index < 0) index = num - 1;

    children = [...children.slice(index + 1), ...children.slice(0, index)];
  }

  return children[0];
};

// 仍会时间超时 需要参考数学解法 https://leetcode.cn/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/solutions/177639/javajie-jue-yue-se-fu-huan-wen-ti-gao-su-ni-wei-sh/
console.log(lastRemaining(70866, 116922));
