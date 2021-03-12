/* 
  语言必经阶段：诞生=> 引用 => 完善语法规则 => 类库 => 插件 => 编写的代码会很多，处理的逻辑也会变多
  设计模式：更好的管理项目中的代码；方便维护，方便团队协作、方便拓展等
  发布订阅：灵感来源源于DOM2事件队列机制
    事件队列：我们可以向事件队列中追加方法（追加多个不同的方法），当后期事件触发的时候，
             按照顺序会把这些方法依次执行（也可以从事件队列中移除方法）
    模拟一个事件队列，我们可以把要执行的方法，依次添加到队列中（也可以移除），当某个条件到达的时候，
    我们通知队列中的方法依次执行
    vue：$emit / $on 都可以实现发布订阅
*/
(function () {
  class EventBus {
    constructor() {
      //创建一个事件池
      this.pond = {};
    }
    //向事件池中加方法
    $on(type,func) {
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
  window.EB = new EventBus();
})();
let fn1 = _=>console.log('fn1');
let fn2 = _=>console.log('fn2');
let fn3 = _=>console.log('fn3');
//这样的话，用  splice移除时导致的数组的塌陷，后面的fn5不会输出，因此要改为null
let fn4 = _=>{
  EB.$off('AA',fn1)
  EB.$off('AA',fn2)
}
let fn5 = _=>console.log('fn5')
EB.$on('AA',fn1);
EB.$on('AA',fn2);
EB.$on('AA',fn3);
EB.$on('AA',fn4);
EB.$on('AA',fn5);
EB.$emit('AA');
console.log(EB);