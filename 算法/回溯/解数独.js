/* ��дһ������ͨ�������Ŀո�������������⡣
һ�������Ľⷨ����ѭ���¹���
���� 1-9 ��ÿһ��ֻ�ܳ���һ�Ρ�
���� 1-9 ��ÿһ��ֻ�ܳ���һ�Ρ�
���� 1-9 ��ÿһ���Դ�ʵ�߷ָ��� 3x3 ����ֻ�ܳ���һ�Ρ�
�հ׸��� '.' ��ʾ��
Note:
��������������ֻ�������� 1-9 ���ַ� '.' ��
����Լ������������ֻ��Ψһ�⡣
����������Զ�� 9x9 ��ʽ�ġ� */

//idea - ʹ�û���ģ�壬·��Ϊ��������ѡ���б�Ϊ 1-9 ����ÿһ���ո񴦽���ѡ��
//��ֻ���ҵ�һ�����н⣬�����ҵ���ֱ�ӷ����Խ��м�֦
//��Ϊ��Ҫ�ж��Ƿ���У�������Ҫ���һ���жϺ���
//����ϸ�ڣ���������ɿ�������������Ϊchar���ͣ�����ʱҪע��ʹ�� String.fromCharCode(charCode) �������ַ�

var solveSudoku = function (board) {
  const len = 9;
  const charCode1 = "1".charCodeAt(); // get the unicode of "1"
  const charCode9 = "9".charCodeAt();
  backTrack(board, 0, 0); //begin at [0,0]
  return board;

  function backTrack(board, i, j) {
    console.log("�Һ�low��");
    /*  �������Լ�д��һ�Σ�����������в�������review��ʱ���ٲ�һ��ԭ���
   // the end conditions, the sequence of these condition is very important
    if (board[i][j] != ".") j++;
    if (j >= len) {
      if (i < len - 1) {
        i++;
        j = 0;
      } else return true;
    } */

    // �����һ�У���������
    if (i >= len) {
      return true;
    }

    // �����һ�У�������һ�б���
    if (j >= len) {
      return backTrack(board, i + 1, 0);
    }

    // ������Ԥ��ֵ��������
    if (board[i][j] !== ".") {
      return backTrack(board, i, j + 1);
    }

    // select in selectList
    for (let charcode = charCode1; charcode <= charCode9; charcode++) {
      const ch = String.fromCharCode(charcode);
      if (isValid(i, j, ch)) {
        board[i][j] = ch;
        //���е�if�ж���Ϊ�˼�֦���ҵ�һ������Ϳ��Խ�����
        if (backTrack(board, i, j + 1)) {
          return true;
        }
        //backtrack this select
        board[i][j] = ".";
      }
    }
  }

  function isValid(row, col, num) {
    //�ж������к��������Ƿ�����ͬ��
    for (let i = 0; i < len; i++) {
      if (num === board[row][i] || num === board[i][col]) return false;
    }
    //�ж����ھŹ����Ƿ�����ͬ��
    //��λ�����ھŹ������Ͻ�
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
