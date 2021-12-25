//截取小数点后几位数字
const query = function (num) {
  num = num + ''
  const [, char = ''] = num.split('.')
  return char.length;
}
const plus = function (num1, num2) {
  num1 = +num1;
  num2 = +num2;
  //isNaN 判断是不是非有效数字
  if (isNaN(num1) || isNaN(num2)) throw new TypeError('num1/num2 必须是整数类型')
  const num1Len = query(num1),
    num2Len = query(num2),
    //找到他们两个最大的值，Math.pow 10 的几次幂
    proNum = Math.pow(10, Math.max(num1Len, num2Len));
  return (num1 * proNum + num2 * proNum) / proNum
}
plus(0.1, 0.2)