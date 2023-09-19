// 打印最长子序列，但目前不是最小字典序

function findLongestIncreasingSubsequence(arr) {
  const n = arr.length;
  const lisLength = new Array(n).fill(1);
  const prevIndex = new Array(n).fill(-1);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j] && lisLength[i] < lisLength[j] + 1) {
        lisLength[i] = lisLength[j] + 1;
        prevIndex[i] = j;
      }
    }
  }

  let maxLengthIndex = 0;
  let maxLength = 0;
  for (let i = 0; i < n; i++) {
    if (lisLength[i] > maxLength) {
      maxLength = lisLength[i];
      maxLengthIndex = i;
    }
  }

  const longestIncreasingSubsequence = [];
  let currentIndex = maxLengthIndex;
  while (currentIndex !== -1) {
    longestIncreasingSubsequence.unshift(arr[currentIndex]);
    currentIndex = prevIndex[currentIndex];
  }

  return longestIncreasingSubsequence;
}

// 示例用法
const arr = [2, 1, 4, 3, 6, 5, 8, 7, 10, 9];
const result = findLongestIncreasingSubsequence(arr);
console.log("最长递增子序列为:", result);
