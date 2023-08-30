//数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
//idea: 1. 二叉树的深度优先遍历（先序） 2.剪枝操作减去无效递归
//二叉树，根结点必须为左括号，叶子结点必须为右括号，递归过程中右括号数量不能大于左括号，左右括号数量不能大于n

var generateParenthesis = function (n) {
  var backTrack = (str, left, right) => {
    if (right < 0 || left < 0 || right < left) return;
    if (left === 0) {
      str += ")".repeat(right);
      res.push(str);
      return;
    }
    backTrack(str + "(", left - 1, right);
    backTrack(str + ")", left, right - 1);
  };

  const res = [];
  backTrack("", n, n);
  return res;
};
//每次写完算法要思考一下代码的健壮性，比如输入的n为0或者负数时算法是否仍然有效

console.log(generateParenthesis(3));
