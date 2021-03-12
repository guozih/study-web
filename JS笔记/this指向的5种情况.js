//================================================== this指向5种情况 ==================================================
  /* 
    事件绑定
    普通函数执行
    构造函数执行
    箭头函数
    call/apply/bind
  */
  //==================== 事件绑定  ====================
    // 给元素的某个事件行为，事件触发，方法执行，此时方法中的 this 一般指向当前元素本身
    btn.attachEvent('onclick',function(){
      //IE6，7，8下的 DOM2 绑定事件，this指向了window
      //this指向window
      console.log(this) 
    })
  
  //==================== 普通函数执行  ====================
    /* 
      普通函数执行，取决于方法执行前面是否有 '.' ,'.'前面是谁，this就是谁，没有this指向window（严格模式下是undefined）
    */

  //==================== 构造函数执行  ====================
    //this指向new的实例
    function Fn() {
      console.log(this);
    }
    let f = new Fn();
    //这个不加小括号也行，只是 加了小括号 是属于有参，比不加小括号的无参优先级高。
    let f = new Fn();

  //==================== 箭头函数执行  ====================
    /* 
      箭头函数中没有 this ，所用的 this 是上级上下文中的 this （也没有prototype，也没有arguments）
    */
      let obj = {
        name: "小明",
        fn: function () {
          console.log(111);
          (() => {
            console.log(this);
          })();
        },
      };
      // this 指向 obj
      obj.fn();
      var aaa = obj.fn;
      // this 指向 window
      aaa();
  
  //==================== call/apply/bind  ====================
    /*
      严格模式下
        传的参数是谁，this 就指向谁，不传指向undefined
      非严格模式下
        null，undefined，不传都指向window，其他都指向自己
    */


