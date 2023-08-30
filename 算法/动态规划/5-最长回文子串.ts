/* 给你一个字符串 s，找到 s 中最长的回文子串。 */

/* 
输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。

输入：s = "cbbd"
输出："bb"
*/

/* 动态规划： 依次求出所有子串，动态更新最长子串
dp[i][j]表示 i 到 j 的字符串是否为回文，值为 true|false，状态转移方程为 dp[i][j] = (s[i] === s[j] && dp[i+1][j-1]) 
遍历所有可行的i-j组合，即矩阵的右上角*/

/* 双指针法，遍历字符串以一个元素或两个元素为中心，向两遍遍历寻找最长回文 */

/**
 * 方法 1 - 基础版 通过但效率拉中之拉
 * 时间与空间击败 19 和 5
 */
function longestPalindrome_1(s: string): string {
  // 设定最长子串以及最大长度
  let res = [0, 0];
  let strLength = s.length;
  let maxLength = 0;
  // 给定初始矩阵
  const dp = new Array(strLength).fill(0).map(() =>
    Array(strLength)
      .fill(0)
      .map(() => false)
  );
  // 对角线元素设置为true，作为状态转移的基础
  dp.forEach((item_i: boolean[], index_i: number, arr: boolean[][]): void => {
    item_i.forEach((item_j: boolean, index_j: number): void => {
      if (index_i === index_j) arr[index_i][index_j] = true;
    });
  });
  // 遍历二维矩阵右上角，依次求出dp[i][j]并根据 maxLength 更新 res
  for (let j = 1; j < strLength; j++) {
    for (let i = 0; i < j; i++) {
      let length = j - i;
      if (length === 1) dp[i][j] = s[i] === s[j];
      if (length !== 1) dp[i][j] = s[i] === s[j] && dp[i + 1][j - 1];

      //   更新 res
      if (dp[i][j] && length > maxLength) {
        maxLength = length;
        res = [i, j];
      }
    }
  }
  //返回结果,slice的结果不包括end参数
  return s.slice(res[0], res[1] + 1);
}

/**
 * 方法 2 - 因为遍历顺序为从左到右，矩阵对角线元素的初始化必定早于对它的访问，故将两个循环集中到一起
 * 时间与空间击败 27 和 5
 */
function longestPalindrome_2(s: string): string {
  // 设定最长子串以及最大长度
  let res = [0, 0];
  let strLength = s.length;
  let maxLength = 0;
  // 给定初始矩阵
  const dp = new Array(strLength).fill(0).map(() =>
    Array(strLength)
      .fill(0)
      .map(() => false)
  );

  // 遍历二维矩阵右上角，依次求出dp[i][j]并根据 maxLength 更新 res
  for (let j = 0; j < strLength; j++) {
    for (let i = 0; i <= j; i++) {
      let length = j - i;
      // 初始化对角线
      if (length === 0) dp[i][j] = true;

      // 求dp[i][j]
      if (length === 1) dp[i][j] = s[i] === s[j];
      if (length > 1) dp[i][j] = s[i] === s[j] && dp[i + 1][j - 1];

      // 更新 res
      if (dp[i][j] && length > maxLength) {
        maxLength = length;
        res = [i, j];
      }
    }
  }
  //返回结果,slice的结果不包括end参数
  return s.slice(res[0], res[1] + 1);
}

/**
 * 方法 3 - 根据遍历顺序，每遍历一列dp时只需要前一列的数据，且只访问一次，故可以用一维数组存储前一列的数据并动态更新
 * 时间与空间击败 50 和 97 , 可见随着数据量的增加，维度上的缩小对于效率的提升是巨大的
 */
function longestPalindrome_3(s: string): string {
  // 设定最长子串以及最大长度
  let res = [0, 0];
  let strLength = s.length;
  let maxLength = 0;
  // 给定初始矩阵
  const dp = new Array(strLength).fill(false);

  // 遍历二维矩阵右上角，依次求出dp[i][j]并根据 maxLength 更新 res
  for (let j = 0; j < strLength; j++) {
    for (let i = 0; i <= j; i++) {
      let length = j - i;
      // 初始化对角线
      if (length === 0) dp[i] = true;

      // 求dp[i][j]
      if (length === 1) dp[i] = s[i] === s[j];
      if (length > 1) dp[i] = s[i] === s[j] && dp[i + 1];

      // 更新 res
      if (dp[i] && length > maxLength) {
        maxLength = length;
        res = [i, j];
      }
    }
  }
  //返回结果,slice的结果不包括end参数
  return s.slice(res[0], res[1] + 1);
}

/**
 * 方法 4 - 双指针法
 * 时间与空间击败 93 和 64
 */
function longestPalindrome_4(s: string): string {
  let res = "";
  // 遍历字符串，以每个元素为开头进行两次双指针搜索
  for (let i = 0; i < s.length; i++) {
    const subString_1 = longestSubPalindrome(i, i);
    const subString_2 = longestSubPalindrome(i, i + 1);

    if (res.length < subString_1.length) res = subString_1;
    if (res.length < subString_2.length) res = subString_2;
  }
  // 抽离查找最长回文串方法
  function longestSubPalindrome(left: number, right: number): string {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    // 需要注意的是判断错误时，仍会执行一次，则子串边界为[left+1,right-1]
    return s.slice(left + 1, right);
  }

  return res;
}
