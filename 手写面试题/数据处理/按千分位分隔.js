// 将带小数的数字的整数部分按千分位分隔
console.log(format(12323321000003.33)); // '12,323.33'

function format(num) {
  // 分隔
  let num_arr = num.toString().split(".");

  let integer = num_arr[0],
    decimal = num_arr[1] ? num_arr[1] : "";

  integer = integer.split("").reduceRight((res, cur, index) => {
    res.unshift(cur);
    if (!((res.length + 1) % 4) && index) res.unshift(",");
    return res;
  }, []);
  integer = integer.join("");
  return decimal ? integer + "." + decimal : integer;
}
