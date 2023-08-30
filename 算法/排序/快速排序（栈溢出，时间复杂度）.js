function quickSort(arr, left = 0, right = `${arr.length - 1}`) {
  var partitionIndex,
    left = typeof left != "number" ? left - "0" : left,
    right = typeof right != "number" ? right - "0" : right;

  if (left < right) {
    partitionIndex = partition(arr, left, right);
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
  }
  return arr;
}

function partition(arr, left, right) {
  //分区操作
  var pivot = left, //设定基准值（pivot）
    index = pivot + 1;
  for (var i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, pivot, index - 1);
  return index - 1;
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

let arr = [9, 8, 7, 6, 5, 4, 3, 2, 1];
// for (let index = 0; index < 10; index++) {
//   arr.push(Math.random().toFixed(6));
// }
console.log(quickSort(arr));
