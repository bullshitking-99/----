/* 给你一个 无重复元素 的整数数组candidates 和一个目标整数target，找出candidates中可以使数字和为目标数target 的 
所有不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。

candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。
 */

//idea: 经典的回溯算法，对数组进行排序后，从头至尾进行选择，与其每次将路径中的数相加与target比较不如用resttarget与当前选择进行比较
//值得学习的是，应对一个元素可以选择多次的情况，每次递归的时候不改变当前选择即可，即参数中传入原数组下标

//时间复杂度分析：回溯算法的时间复杂度均可从搜索树中去分析

/* 时间复杂度：O(S)，其中 S为所有可行解的长度之和。从分析给出的搜索树我们可以看出时间复杂度取决于搜索树所有叶子节点
的深度之和，即所有可行解的长度之和。在这题中，我们很难给出一个比较紧的上界，我们知道 O(n×2^n) 
是一个比较松的上界，即在这份代码中，n 个位置每次考虑选或者不选，如果符合条件，就加入答案的时间代价。但是实际运行的时候，
因为不可能所有的解都满足条件，递归的时候我们还会用 target - candidates[idx] >= 0 进行剪枝，
所以实际运行情况是远远小于这个上界的。 */

/* 空间复杂度：O(target)。除答案数组外，空间复杂度取决于递归的栈深度，
在最差情况下需要递归 O(target) 层。 */

var combinationSum = function (candidates, target) {
  const res = [];
  candidates.sort((a, b) => a - b); // 将数组从小到大排序
  backtrack(0, target, []);
  return res;

  function backtrack(index, rest, str) {
    if (rest === 0) {
      res.push(str);
      return;
    }
    for (let i = index; i < candidates.length; i++) {
      if (candidates[i] > rest) break; //end the whole loop
      backtrack(i, rest - candidates[i], [...str, candidates[i]]);
    }
  }
};
