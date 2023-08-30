/* 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
 */

/* 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 */

function merge(intervals: number[][]): number[][] {
  if (intervals.length <= 0) return [];

  //   按照区间第一位进行排序
  //   不一定有必要，但题目未说明测试用例有序
  intervals.sort((a, b) => a[0] - b[0]);

  //   定义res数组，并push第一个区间
  const res: number[][] = [intervals[0]];

  //   以区间数量-1循环，纳入新区间
  for (let i = 1; i < intervals.length; i++) {
    let temp = res[res.length - 1];
    let cur = intervals[i];

    if (temp[1] < cur[0]) {
      // 区间无交集则push新区间
      res.push(cur);
    } else {
      // 区间有交集则合并区间
      temp[1] = Math.max(temp[1], cur[1]);
    }
  }

  return res;
}
