//================================================== 继承 ==================================================
  /* 
    类的3大特征：封装、继承、多态
    封装：把一些函数放到一个类中，就是封装
    多态：（分为 重载 和 重写）
      Java中的重载：函数名相同，但是参数类型、数量不同或者返回值不同，这相当于把一个函数重载了，不会覆盖之前的方法
      （JS中没有类似于后台语言中的重载机制：JS中的重载指的是同一个方法，根据传参的不同，实现不同的业务逻辑）
        public String fn(int n,int m){}
        public String fn(int n){}
        fn(10,20) =>  调用的是第一个
        fn(20)    =>  调用的是第二个
      重写：子类重写父类的方法
    继承：子类继承父类中的属性和方法
  */
  //==================== 原型继承 ====================
    // B 继承 A（子类指向父类的实例 ）（公有属性）
      function A() {
        this.x = 100;
      }
      A.prototype.getx = function () {
        console.log(this.x);
      };
      function B() {}
      B.prototype.getY = function () {};
      // 现在不能调用 b 的公有属性 getY，因为 __protortype已经被修改
      B.prototype = new A();
      var b = new B();
  //==================== call继承 ====================
    //把父类当做普通函数执行，让其执行的时候，方法中的this变为子类的实例 （私有属性）
      function A() {
        this.x = 100;
      }
      A.prototype.getx = function () {
        console.log(this.x);
      };
      function B() {
        //call继承，new 的时候，this指向了，new 的实例
        A.call(this); //只能获取A方法里的私有 x 属性，获取不了公有 getx 属性
        this.y = 200;
      }
      B.prototype.getY = function () {};
      var b = new B();
  //==================== 寄生组合继承 ====================
    //寄生组合继承：call继承 + 变异版的原型继承共同完成
      function A() {
        this.x = 100;
      }
      A.prototype.getx = function () {
        console.log(this.x);
      };
      function B() {
        //call继承，new 的时候，this指向了，new 的实例
        A.call(this);
        this.y = 200;
      }
      B.prototype = Object.create(A.prototype);
      B.prototype.constructor = B;
      B.prototype.getY = function () {};
      var b = new B();
  //==================== class继承 ====================
    //和组合继承没区别
      class A {
        constructor() {
          // 私有设置属性
          this.x = 100;
        }
        // 设置A.prototype上的方法
        // 设置公有方法
        getX() {
          console.log(this.x);
        }
      }

      class B extends A {
        constructor() {
          //一单使用 extends 实现继承，只要自己写了constructor，就必须写 super()（ 相当于A.call(this) ）
          super();
          this.y = 200;
        }
        getY() {
          console.log(this.y);
        }
      }
