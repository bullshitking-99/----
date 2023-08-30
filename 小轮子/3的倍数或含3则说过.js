function judge3(num) {
  if (num % 3 === 0) {
    return "过";
  }
  // let num2 = String(num).split("");
  // for (var x of num2) {
  //   if (x == 3) return "过";
  // }
  /*使用字符串的indexof(subStr,pos) API更加方便*/
  if (String(num).indexOf("3") != -1) return "过";
  return num;
}
console.log(judge3(1222223));
