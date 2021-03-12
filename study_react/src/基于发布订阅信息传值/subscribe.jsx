//发布订阅模式
class Sub {
  constructor() {
    console.log(2)
    //创建一个事件池
    this.pond = {};
  }
  //向事件池中加方法
  $on(type,func) {
    console.log(1);
    let pond = this.pond;
    //每一次加方法的时候，首先看看事件池中是否存在这个类型，不存在就创建
     !(type in pond) ? (pond[type] = []) : null;
    //增加方法(去重)
    let pondT = pond[type];
    !pondT.includes(func) ? pondT.push(func) : null;
  }
  //从事件池中移除方法
  $off(type, func) {
    let pondT = this.pond[type];
    //没有就直接返回
    if (!pondT) return;
    for (let i = 0; i < pondT.length; i++) {
      let item = pondT[i];
      if (item === func) {
        //这样移除会导致数组塌陷问题
        // pondT.splice(i,1);
        pondT[i] = null;
        //移除掉（因为追加的时候去重了，所以删除一次就够了，不需要在向后找了）
        return;
      }
    }
  }
  //通知事件池中某个类型对应的方法执行
  $emit(type, ...args) {
    // ...args是给每个方法传递的参数
    //如果没有返回空数组,因此下边遍历也不会报错（当然没有就可以直接返回）
    let pondT = this.pond[type] || [];
    for (let i = 0; i < pondT.length; i++) {
      let func = pondT[i];
      //如果不是函数，在容器中移除掉
      if (typeof func !== "function") {
        //这里如果是null时，删除掉
        pondT.splice(i, 1);
        // 现在i--和后面的i++，相当于没加每减，也解决了上面删除null时的数组塌陷问题
        i--;
        continue;
      }
      func.apply(this, args);
    }
  }
}

export default function subscribe(){
  return new Sub;
}