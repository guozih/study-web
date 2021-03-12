/*
  基于JSON方法，先把原始对象转化为字符串，在把字符串重新定义为对象，此时实现了内存的深度克隆
*/
var arr1 = [
  10,
  20,
  {
    name: "狗蛋",
  },
];
// 问题：如果对象中的某一项是正则或者函数，基于 JSON.stringify 和 JSON.parse 处理后就不在是正则（变为空对象）或者函数（变为null）了
var arr2 = JSON.parse(JSON.stringify(arr1));

function _type(val) {
  return Object.prototype.toString.call(val);
}

function _deepClone(obj) {
  //如果是null，就直接返回null
  if (obj === null) return null;
  //如果是基本类型值或者函数，直接返回（函数无需克隆）
  if (typeof obj !== "object") return obj;
  //如果是正则
  if (_type(obj) === "[object RegExp]") return new RegExp(obj);
  //如果是日期格式的数据
  if (_type(obj) === "[object Date]") return new Date(obj);
  //obj.constructor 找到的是所属类原型上的constructor，而原型上的constructor指向的是当前类的本身体
  //如果传对象就new对象，数组就new数组
  let newObj = new obj.constructor();
  for (let key in obj) {
    //for in由于会把原型上的属性也遍历到，因此执行判断
    //判断是不是私有属性
    if (!obj.hasOwnProperty(key)) break;
    newObj[key] = _deepClone(obj[key]);
  }
  return newObj;
}

arr2 = _deepClone(arr1);
