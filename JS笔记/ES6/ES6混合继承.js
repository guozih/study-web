var NewListMixin = function (SuperClass){
  return class extends SuperClass{
    NewListMixinA = ()=> {

    }
  } //这里返回的是一个 新的class，继承了你传过来的那个 class
}
// 例子：
  class a{

  } 
//现在的 b 既继承了 NewListMixin，也继承了 a
/*
  * 第一步： b 继承了 NewListMixin，NewListMixin 接受一个参数，这个参数是 class a
  * 第二步:  NewListMixin(a) 执行，返回一个 新的类 ，这个类里面有自己的属性和方法，但是它继承了 class a，返回一个新的class
  * 第三步： b 继承 返回的新的 class，相当于 三重继承。
  * b 继承了 NewListMixin返回的新的class，这个新的class 又继承了 a，父子关系是 a => 新的class => b
  */
  class b extends NewListMixin(a){

  }
  //ES6 写法
  var NewListMixin = SuperClass => class extends SuperClass{
    
  }