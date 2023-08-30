// 直接使用Object.prototype.toString.call()
// 语雀笔试题竟然用这个去补全typeof，多此一举了属于是

const toString = (val) => Object.prototype.toString.call(val).slice(8, -1);

console.log(toString(1)); // Number

console.log(toString(true)); //Boolean

console.log(toString("mc")); //String

console.log(toString([])); //Array

console.log(toString({})); //Object

console.log(toString(function () {})); //Function

console.log(toString(undefined)); //Undefined

console.log(toString(null)); //Null
