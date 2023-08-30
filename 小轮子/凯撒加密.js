/* 编码实现凯撒加密算法，根据输入的偏移量，实现对字符串的加密和解密.
恺撒加密（Caesar cipher），是一种最简单且最广为人知的替换加密技术。
明文中的所有字母都在字母表上向后（或向前）按照一个固定数目进行偏移后被替换成密文。
例如，当偏移量是3的时候，所有的字母 A 将被替换成 D，B 变成 E，以此类推。 */

/**
 * @description 字符串加密
 * @param {number} offset偏移量
 * @param {string} str 需要加密的字符串
 * @return {string} 返回加密字符串
 */
function encrypt(offset, str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += String.fromCodePoint(str.codePointAt(i) + 3);
  }
  return result;
}

/**
 * @description 字符串解密
 * @param {number} offset 偏移量
 * @param {string} str
 * @return {string} 返回加密字符串
 */
function decrypt(offset, str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += String.fromCodePoint(str.codePointAt(i) - 3);
  }
  return result;
}

//测试用例
console.log(encrypt(3, "caonima")); //fdrqlpd
console.log(decrypt(3, "fdrqlpd")); //caonima
