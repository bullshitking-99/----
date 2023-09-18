// 将带小数的数字的整数部分按千分位分隔

function format(num) {
  // 分隔
  let [integer, decimal = ""] = num.toString().split(".");

  integer = integer.split("").reduceRight((res, cur, index) => {
    res.unshift(cur);
    if (!((res.length + 1) % 4) && index) res.unshift(",");
    return res;
  }, []);

  integer = integer.join("");
  return decimal ? integer + "." + decimal : integer;
}

console.log(format(12323321000003.33)); // 12,323,321,000,003.33
