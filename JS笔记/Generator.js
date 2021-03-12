/* 
  Generator函数：在JS中，一个函数一旦执行，就会运行到最后或遇到return时结束，运行期间不会有其他代码能够打断他，也不能从外部再传入值到函数体内，
                而Generator函数（生成器）的出现使得打破函数的完整运行成为了可能，其语法行为和传统函数完全不同。
  Generator函数是ES6提供的一种异步编程解决方案，形式上也是一种普通函数，但有几个显著的特证：
    1。function 关键字与函数名之间有一个星号 * (推荐紧挨着function关键字)
    2。函数体内使用 yield 表达式，定义不同的内部状态（可以有多个 yield ）
    3。直接调用 Generator 函数并不会执行，也不会返回运行的结果，而是返回一个遍历器（Iterator Object）
    4。依次调用遍历器对象的 next 方法，遍历 Generator 函数内部的每一个状态
*/
//======================================= Generator的使用 =======================================
  {
    // 普通函数，一旦调用立即执行
    function foo(){
      return 'hello';
    }
    foo() 
    // Generator函数
    function* generator(){
      console.log(2);
      yield 'status one' // yield 表达式是暂停执行的标记
      return 'staus two'
      yield 'status one2'
    }
    var iterator = generator()  //调用 Generator 函数，函数并没有执行【这里的2也不会去输出，而是立即返回一个 Iterator 对象【指针对象】】
    /*  第一次调用 next() 函数，开始从上而下执行，遇到第一个 yield 就返回一个对象 {value:'status one',done:false},
        返回的 value 是 yeild后面返回的表达式【和 return 一样，只是 yield 是存在记忆的【暂停执行】,调用 next() 开始执行 】
               done 返回 false/true 表示是否遍历结束。如果遇到 return 就返回 done 为 true【或者执行到函数末尾】，下面再写 yield 也没用了
    
    */
    iterator.next();
  }

//======================================= yield 表达式的注意事项 =======================================
  /* 
    yield 表达式只能用在 Generator 函数里面，用在其他地方都会报错

    情况1。：
    (function (){
      yield 1;
    })()

    情况二：
    yield 表达式如果用在另一个表达式中，必须放在圆括号里面
    (function* demo(){
      console.log(1 + yield); //报错
      console.log(1 + yield 2); //报错
      console.log(1 + (yield)); //OK
      console.log(1 + (yield 2)); //OK
    })()

    情况三：
    yield 表达式用作参数或放在赋值语句的右边，可以不加括号
    (function* demo (){
      foo(yield 'a',yield 'b'); //OK
      let input = yield; // OK
    })();
  */

//======================================= yield* 表达式的注意事项 =======================================
  /* 
    如果在 Generator 函数里面调用另一个函数 Generator 函数，默认情况下是没有效果的
  */
  {
    //这样只会
    function* foo(){
      yield 'aaa';
      yield 'bbb';
    }
    function* bar(){
      foo();
      // yield* foo(); //这样 就可以 返回 foo 的两个状态值
      yield 'ccc';
      yield 'ddd';
    }
    var iterator = bar();
    //这里调用 for of 来遍历函数bar生成的 迭代器对象时，只返回 bar 自身的的两个状态值。
    for(var item of iterator){
      console.log(item);
    } 
  }
