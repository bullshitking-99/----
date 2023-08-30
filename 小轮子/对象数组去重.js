let person = [
  { id: 0, name: "小明", age: 18 },
  { id: 1, name: "小张", age: 18 },
  { id: 2, name: "小李", age: 18 },
  { id: 3, name: "小孙", age: 18 },
  { id: 1, name: "小周", age: 18 },
  { id: 2, name: "小陈", age: 18 },
];
//使用filter筛除指定属性已存在的对象,map记录遍历到的id
//将传入的参数作为对象属性调用的话需要用到中括号
function deduplication1(arr, attr) {
  let m = new Map();
  return arr.filter((ele) => !m.has(ele[attr]) && m.set(ele[attr], ""));
}

//使用reduce累加第一次出现的对象，obj查询是否为重复项
//需要注意的是reduce每次将上个函数的返回结果作为res传入，所以要确保箭头函数返回的是res
function deduplication2(arr, attr) {
  let checkObj = {};
  return arr.reduce((res, cur) => {
    checkObj[cur[attr]] ? "" : (checkObj[cur[attr]] = res.push(cur));
    return res;
  }, []);
}

console.log(deduplication2(person, "id"));
