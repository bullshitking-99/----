// nums 向右转轮 k 位
// in : nums:[-1],k:2 - out : nums:[-1]

//双指针法
//时间复杂度为O(2n),空间复杂度为O(1)
//idea: reverse the left part, then reverse the right part, finally reverse whole array
var rotate1 = function (nums, k) {
  var reverse = (low, high) => {
    while (low < high) {
      let temp = nums[low];
      nums[low++] = nums[high];
      nums[high--] = temp;
    }
  };
  const len = nums.length;
  k = k % len; //至关重要的一步，因为他这个算法拉了,这里保证k<len
  reverse(0, len - k - 1);
  reverse(len - k, len - 1);
  reverse(0, len - 1);
};

//环状替换法
//timeComplexity-O(n) spatialComplexity-O(1)
//idea: use temp to update elements one by one
var rotate2 = function (nums, k) {
  const n = nums.length;
  k = k % n;
  var temp, prev, next;
  var count = 0;
  var start = 0; // start in every loop
  var current; // current position in one loop
  while (count < n) {
    current = start;
    prev = nums[current];
    do {
      next = (current + k) % n;
      temp = nums[next];
      nums[next] = prev;
      count++;
      current = next;
      prev = temp;
    } while (current != start);
    start++;
  }
};

//切片 - 最快算法
//timeComplexity - the least
var totate3 = function (nums, k) {
  if (k >= nums.length) {
    k = k % nums.length;
  }
  const newa = [...nums.slice(-k), ...nums.slice(0, nums.length - k)];
  for (let i = 0; i < nums.length; i++) {
    nums[i] = newa[i];
  }
};

//test
nums = [1, 2, 3, 4, 5, 6, 7];
k = 3;
rotate2(nums, k);
console.log(nums);
