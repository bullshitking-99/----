/* 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。

说明:

1 ≤ m ≤ n ≤ 链表长度。

示例:

输入: 1->2->3->4->5->NULL, m = 2, n = 4

输出: 1->4->3->2->5->NULL */

//做题前真的应该先画个图啊，搞得半天错在起点而不自知

/* var reverseBetween = function (head, left, right) {
  if (left === right) {
    return head;
  }

  //find : beforeBegin begin end afterEnd
  let point = head;
  let beforeBegin = null,
    begin,
    end,
    afterEnd;

  for (let index = 1; index <= right; index++) {
    index === left - 1 ? (beforeBegin = point) : "";
    index === left ? (begin = point) : "";
    index === right ? (end = point) : "";

    point = point.next;
  }

  afterEnd = end.next;

  //记录反转后的尾结点
  let pieceEnd = begin;

  //分离
  beforeBegin ? (beforeBegin.next = null) : "";
  end.next = null;

  //反转片段并缝合
  beforeBegin
    ? (beforeBegin.next = reverseList(begin))
    : (head = reverseList(begin));
  pieceEnd.next = afterEnd;
  return head;

  function reverseList(head) {
    let pre = null;
    let cur = head;
    while (cur) {
      let next = cur.next;
      cur.next = pre;
      pre = cur;
      cur = next;
    }
    return pre;
  }
}; */

//大佬写的代码
var reverseBetween = function (head, m, n) {
  if (m === n) return head;
  const dummy = new ListNode(null);
  dummy.next = head;

  let beforeStart = dummy;
  let cnt = 1;
  while (cnt < m) {
    beforeStart = beforeStart.next;
    cnt++;
  }
  let end = beforeStart;
  while (cnt <= n) {
    end = end.next;
    cnt++;
  }
  const start = beforeStart.next;
  const afterEnd = end.next;

  let pre = start;
  let cur = pre.next;
  while (cur !== end) {
    const next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }

  start.next = afterEnd;
  beforeStart.next = end;
  cur.next = pre;

  return dummy.next;
};

function ListNode(val) {
  this.val = val;
  this.next = null;
}
