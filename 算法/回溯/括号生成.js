//���� n �����������ŵĶ������������һ�������������ܹ��������п��ܵĲ��� ��Ч�� ������ϡ�
//idea: 1. ��������������ȱ��������� 2.��֦������ȥ��Ч�ݹ�
//����������������Ϊ�����ţ�Ҷ�ӽ�����Ϊ�����ţ��ݹ�������������������ܴ��������ţ����������������ܴ���n

var generateParenthesis = function (n) {
  var backTrack = (str, left, right) => {
    if (right < 0 || left < 0 || right < left) return;
    if (left === 0) {
      str += ")".repeat(right);
      res.push(str);
      return;
    }
    backTrack(str + "(", left - 1, right);
    backTrack(str + ")", left, right - 1);
  };

  const res = [];
  backTrack("", n, n);
  return res;
};
//ÿ��д���㷨Ҫ˼��һ�´���Ľ�׳�ԣ����������nΪ0���߸���ʱ�㷨�Ƿ���Ȼ��Ч

console.log(generateParenthesis(3));
