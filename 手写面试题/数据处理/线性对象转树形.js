// 根据parentid找妈妈

// test
let arr = [
  { id: 1, parent: null, text: "菜单1" },
  { id: 11, parent: 1, text: "菜单1-1" },
  { id: 111, parent: 11, text: "菜单1-1-1" },
  { id: 112, parent: 11, text: "菜单1-1-2" },
  { id: 12, parent: 1, text: "菜单1-2" },
  { id: 2, parent: null, text: "菜单2" },
  { id: 21, parent: 2, text: "菜单2-1" },
  { id: 22, parent: 2, text: "菜单2-2" },
];

// 线性查找 - 空间换时间
function buildTree(arr) {
  // 使用map转存，增加查找效率
  const map = new Map();
  arr.forEach((item) => {
    // 存入所有子节点，供查找
    map.set(item.id, item);
  });
  // 将子元素依次放入父元素中
  const tree = [];
  arr.forEach((item) => {
    const parent = map.get(item.parent);
    if (parent) {
      // parent存在则为子节点，存入父节点children中
      (parent.children || (parent.children = [])).push(item);
    } else {
      // parent不存在则为顶层节点
      tree.push(item);
    }
  });
  return JSON.stringify(tree);
}

// 递归遍历 - 时间换空间
function buildTreeInRecursion(nodeList) {
  for (let i = 0; i < nodeList.length; i++) {
    const curNode = nodeList[i];
    const parent = curNode.parent;
    // 顶层节点放至原位
    // 子节点递归寻找父节点
    if (parent) {
      findChild(nodeList, curNode);
      nodeList.splice(i--, 1);
    }
  }

  function findChild(childList, curNode) {
    childList.map((node) => {
      node.id === curNode.parent
        ? (node.children || (node.children = [])).push(curNode)
        : !!node.children && findChild(node.children, curNode);
    });
  }

  return JSON.stringify(nodeList);
}

function buildTreeInDoubleLoop(nodeList) {
  const tree = [];
  nodeList.map((node) => {
    const parent = node.parent;
    if (!parent) {
      tree.push(node);
    } else {
      nodeList.map((_node) => {
        if (parent === _node.id)
          (_node.children || (_node.children = [])).push(node);
      });
    }
  });
  return JSON.stringify(tree);
}

// console.log(buildTree(arr));
// console.log(buildTreeInRecursion(arr));
console.log(buildTreeInDoubleLoop(arr));
