/* 
  new 的实现原理（func是要new的类，args是类的参数）
  默认创建一个实例对象（而且是属于这个类的实例）
  也会把类当做普通函数执行
  执行的时候要保证函数中的 this 指向创建的实例
  若客户自己返回引用类型，则以自己返回的为主，否则返回创建的实例
*/
  function _new(func, ...args) {
    /* 
      let obj = {};
      让obj的原型链指向func的prototype
      IE大部分浏览器中不允许我们操作 __proto__，因此会报错
      obj.__proto__ = func.prototype;
      Object.create：创建一个空对象，让这个对象的 __proto__ 指向传过来的参数
    */
    let obj = Object.create(func.prototype);
    let res = func.call(obj, ...args);
    let _type = typeof res;
    //如果类返回 null，也让它返回自己创建的实例对象
    //如果返回的是引用类型，则返回这个引用类型，由于 typeof null 也是 'object'，所以排除null
    if ((_type !== null && _type === "object") || _type === "function") {
      return res;
    }
    //否则返回创建的实例
    return obj;
  }

  function Obj(name, age) {
    this.name = name;
    this.age = age;
    return null;
  }


  var obj = _new(Obj, "小红", 12);

