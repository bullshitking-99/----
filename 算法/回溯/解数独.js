/* 编写一个程序，通过已填充的空格来解决数独问题。
一个数独的解法需遵循如下规则：
数字 1-9 在每一行只能出现一次。
数字 1-9 在每一列只能出现一次。
数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
空白格用 '.' 表示。
Note:
给定的数独序列只包含数字 1-9 和字符 '.' 。
你可以假设给定的数独只有唯一解。
给定数独永远是 9x9 形式的。 */

//idea - 使用回溯模板，路径为数独矩阵，选择列表为 1-9 ，在每一个空格处进行选择
//因只需找到一个可行解，则若找到则直接返回以进行剪枝
//因为需要判断是否可行，所以需要设计一个判断函数
//更多细节：根据输入可看出矩阵中数字为char类型，填入时要注意使用 String.fromCharCode(charCode) 来填入字符

var solveSudoku = function (board) {
  const len = 9;
  const charCode1 = "1".charCodeAt(); // get the unicode of "1"
  const charCode9 = "9".charCodeAt();
  backTrack(board, 0, 0); //begin at [0,0]
  return board;

  function backTrack(board, i, j) {
    console.log("我好low啊");
    /*  这是我自己写的一段，结果拉到运行不出来，review的时候再查一下原因吧
   // the end conditions, the sequence of these condition is very important
    if (board[i][j] != ".") j++;
    if (j >= len) {
      if (i < len - 1) {
        i++;
        j = 0;
      } else return true;
    } */

    // 到最后一行，结束回溯
    if (i >= len) {
      return true;
    }

    // 到最后一列，进入下一行遍历
    if (j >= len) {
      return backTrack(board, i + 1, 0);
    }

    // 若已有预设值，则跳过
    if (board[i][j] !== ".") {
      return backTrack(board, i, j + 1);
    }

    // select in selectList
    for (let charcode = charCode1; charcode <= charCode9; charcode++) {
      const ch = String.fromCharCode(charcode);
      if (isValid(i, j, ch)) {
        board[i][j] = ch;
        //下行的if判断是为了剪枝，找到一个正解就可以结束了
        if (backTrack(board, i, j + 1)) {
          return true;
        }
        //backtrack this select
        board[i][j] = ".";
      }
    }
  }

  function isValid(row, col, num) {
    //判断所在行和所在列是否有相同数
    for (let i = 0; i < len; i++) {
      if (num === board[row][i] || num === board[i][col]) return false;
    }
    //判断所在九宫格是否有相同数
    //定位其所在九宫格左上角
    const rowstart = row - (row % 3);
    const colstart = col - (col % 3);
    for (let i = rowstart; i < rowstart + 3; i++) {
      for (let j = colstart; j < colstart + 3; j++) {
        if (num === board[i][j]) return false;
      }
    }
    return true;
  }
};

board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];
console.log(solveSudoku(board));
