//================================================== 惰性函数 ==================================================
  /* 
    惰性函数：调用一次就知道大体的意思，保留第一次的信息，为以后调用（利用闭包的机制）
  */
    //获取今天的时间
      function time() {
        //第一次调用，获取时间，现在就已经知道时间了
        let t = new Date();
        //修改time函数里的内容，下一次调用直接获取时间就好，不需要new了（懒得只需要做一次）
        time = function () {
          return t;
        };
        return t;
      }
    //绑定事件
      //普遍浏览器有可以用 addEventListener 绑定，IE低版本就得用 attachEvent
      function addEvent(dom, type, func) {
        //第一次进来，判断这个浏览器有没有这个事件，下次再调用这个方法的时候就知道有了，就不用判断了
        if (dom.addEventListener) {
          addEvent = function (dom, type, func) {
            dom.addEventListener(type, func);
          };
        } else if (dom.attachEvent) {
          addEvent = function (dom, type, func) {
            dom.attachEvent("on" + type, func);
          };
        } else {
          dom["on" + type] = func;
        }
        addEvent(dom, type, func);
      }
      /* 
        例子：
        var div = document.createElement("div");
        div.style.width = 200 + "px";
        div.style.height = 200 + "px";
        div.style.background = "red";
        document.body.appendChild(div);
        addEvent(div, "click", () => {
          console.log(111);
        });
      */ 

//================================================== 柯理化函数 ================================================== 
  //柯理化函数（一个大函数返回一个小函数，形成一个不销毁的栈，小函数下次调用可以用到大函数里的变量）
  //（预先把一些内容先存储和处理了，等到后期需要的时候拿来用即可，bind就是预先处理，返回一个函数 ）
    //重写bind（bind里面返回一个函数，栈不销毁，等待返回函数调用可以取到上一次的变量）
    (function (proto) {
      proto._bind = function (context, ...args) {
        if (context == undefined) {
          //如果传的是 undefined 和 null，指向 window
          context = window;
        }
        //ES5写法，要用到this，现在的this指向调用这个函数的  对象
        let _this = this;
        //这个 amArg  参数是为了，当这个函数调用 _bind时，返回的值 赋值给变量，把这个变量当做函数调用，又给这个函数传了参数
        //用这个 amArg 来接收传过来的参数
        return function (...amArg) {
          _this.call(context, ...[...args, ...amArg]);
        };
        return (...amArg) => this.call(context, ...[...args, ...amArg]);
      };
    })(Function.prototype);
    /* 
      currying函数(类似于柯理化函数)
      （面试题，写一个add函数，实现下面代码）
       add(1)        => 1
      add(1)(2)     => 3
      add(1)(2)(3)  => 6
      add(1)(2,3)   => 6
      add(1,2)(3)   => 6
      add(1,2,3)    => 6
    */
      //==================== 方案一 ====================
        //因为不知道要调用几次，所以每次只能返回一个函数，而已要记录上次的值，所以只能用柯理化函数的思想
        //（这个有缺陷，因为里面的函数被add所占用，所以这个栈不会被销毁，因此往后每次调用add都会把上一次的值拿过来一起计算）
          function add(...arg) {
            add = function (...args) {
              //把每次add传过来的值，都放到不销毁的栈里的arg数组里
              arg.push(...args);
              return add;
            };
            add.num = function () {
              return arg.reduce((preVal, item) => preVal + item);
            };
            return add;
          }
          add(1)(2).num();
          add(1)(2)(3).num();
      //==================== 方案二 ====================
        //柯理化思想的延迟执行，当条件满足后执行（但是要指定一共累加的个数，不要回报错）
          function currying(fun, len) {
            //把需要执行的函数返回出去，
            return function (...args) {
              // 第一次执行，如果传过来的参数大于等于指定个数，就直接执行累 fun
              if (args.length >= len) {
                return fun(...args);
              }
              // 如果不符合条件，那么给add重新赋值，nargs 意为 新的行参
              add = function (...nargs) {
                //再次执行add时，获取第一次的参数长度，把这次的参数添加到第一次传过来的数组里，再次获取长度，不符合条件，再次返回add
                //依次类推，直到符合条件执行 fun
                args.push(...nargs);
                if (len == args.length) {
                  return fun(...args);
                }
                return add;
              };
              //不符合条件时add也被赋值了，就返回add
              return add;
            };
          }
          //给currying函数传一个函数作为实参，保证可以访问到add函数传过来的参数
          let add = currying(function (...arg) {
            return arg.reduce((preVal, item) => preVal + item);
          }, 4);

//================================================== compose函数 ================================================== 
  /* 
    compose函数实现函数调用扁平化
  */
    var fn1 = (x) => x + 5;
    var fn2 = (x) => x + 15;
    var fn3 = (x) => x + 20;
    fn3(fn2(fn1(5))); //上一个函数的返回结果作为下一个函数的参数，这样写层级嵌套会很深，很恶心，因此出现 compose 函数
    /* 
      compose(fn1,fn2,fn3)(5)  第一次调用时 括号里传的是方法名，并依次执行，第二次调用 括号里是第一个函数的初始值
      有以下几种情况：
        compose()(5) => 5
        compose(fn1)(5) => 10;
        这种适用于被调用订的第一个函数参数的长度不一定
    */ 
      //==================== 这种是适用于，第一个函数调用时，只有一个参数 ====================
        function compose(...funcs) {
          return function (args) {
            if (funcs.length === 0) {
              return args;
            }
            return funcs.reduce((preVal, item) => item(preVal), args);
          };
        }
        compose(fn1, fn2, fn3)(5);

      //==================== 这种是适用于，第一个函数调用时，可以有多个参数 ====================
        function compose(...funcs) {
          return function (...args) {
            let len = funcs.length;
            if (len === 0) {
              return args;
            } else if (len === 1) {
              return funcs[0](...args);
            }
            //到这里funcs里只能是两个或两个以上，因此第一次调用，itme 也得调用一次，相当于调用了 fn1和fn2,返回结果赋值给下一次的perVal
            return funcs.reduce((preVal, item) =>
              typeof preVal === "function" ? item(preVal(...args)) : item(preVal)
            );
          };
        }

      //==================== 下面这个相当于尾递归调用 ====================
        function fn(arg) {
          return (function (arg) {
            return fn1(fn2(arg));
          })(fn3(arg));
        }
        function compose(...funcs) {
          if (funcs.length == 0) {
            return (arg) => arg;
          }
          if (funcs.length == 1) {
            return funcs[0];
          }
          /* 
            return funcs.reduce((a,b)=>(...args)=>a(b(...args)));
            因为最后一次 reduce 里的 回调函数的返回结果会作为，reduce 的返回结果。
            第一次回调函数执行的时候，它的返回值会作为下次回调函数的 a 的值。因为返回的是一个函数，因此这个的执行栈不会被销毁。
            依次类推，最后一次回调的返回结果作为 reduce 函数的返回结果，被一个变量有引用，因此也不会销毁。
            当调用 reduce 的返回结果时，是一个函数，这个函数就是最后一次的回调函数，因为之前的栈内存一直没有被销毁，所以类似尾递归调用
          */
          return funcs.reduce(function (a, b) {
            return function (...args) {
              return a(b(...args));
            };
          });
        }
