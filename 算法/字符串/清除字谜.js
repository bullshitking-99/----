// 字谜（Anagrams） 是具有相同数量相同字母但是顺序不同的单词。

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

console.log(aclean(arr)); // "nap,teachers,ear" or "PAN,cheaters,era"

function aclean(arr) {
  const map = new Map();
  for (let str of arr) {
    map.set(str.toLowerCase().split("").sort().join(), str);
  }
  return Array.from(map.values());
}
