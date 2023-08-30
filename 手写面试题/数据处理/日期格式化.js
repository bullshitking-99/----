dateFormat(new Date("2020-12-01"), "yyyy/MM/dd"); // 2020/12/01
dateFormat(new Date("2020-04-01"), "yyyy/MM/dd"); // 2020/04/01
dateFormat(new Date("2020-04-01"), "yyyy年MM月dd日"); // 2020年04月01日

function dateFormat(date, format) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 细节+1 历史遗留？
  const day = date.getDate();
  //   console.log(year, month, day);
  format = format.replace("yyyy", year);
  format = format.replace("MM", month);
  format = format.replace("dd", day);
  console.log(format);
  return format;
}
