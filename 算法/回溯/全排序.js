//����һ�������ظ����ֵ����� nums �����������п��ܵ�ȫ���С�
//����԰�����˳�򷵻ش𰸡�
//idea:����һ��ģ��
/*------------------------------------------------------------------------*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let result = [];
  backtrack([], nums);
  return result;

  function backtrack(path, rest) {
    if (rest.length === 0) {
      result.push(path);
      return;
    }
    rest.forEach((element) => {
      backtrack(
        [...path, element],
        rest.filter((e) => e !== element)
      );
    });
  }
};

var nums = [1, 2, 3];
console.log(permute(nums));
