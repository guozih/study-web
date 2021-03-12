import React from "react";
//生命周期
//===========第一次调用组件渲染的周期流程==============
//1.给属性设置默认值（设置默认值规则）
//2.constructor => 设置初始的状态等
//3.componentWillMount 第一次挂载之前 => 向服务器发送请求，请求数据
//4.render渲染
//5.componentDidMount 第一次挂载之后 => 把虚拟DOM转化为真实DOM了，我们可以获取DOM元素进行操作

//==========当组件状态发生改变 setState================
// 1.shouldComponentUpdate => 是否允许当前组件重新渲染
//（返回true，则继续重新渲染，返回false则停止重新渲染）
// 2.componentWillUpdate 重新渲染之前
// 3.render 重新渲染
// 4.componentDidUpdate 重新渲染之后

//==========当组件属性发生改变，父组件重新传递最新的属性信息============================
/* 
    1.componentWillReceiveProps => 在接受最新的属性之前
    2.shouldComponentUpdate
  */

//componentWillUnmount 卸载组件之前
/* 
  PureComponent 相对于 Component来说，内部给组件加了shouldComponentUpdate，把属性和状态进行“浅对比”，依次优化性能，
  只能是浅比较，只能比较当前的值【数组的里面的值不能被比较到，比较的是它的引用地址，只要引用地址没变，那么就不会渲染，因此需要[...data]】
*/

export default class Test extends React.PureComponent {
  constructor(props) {
    super(props);
    // console.log("constructor");
    this.state = {
      data: [10,20],
      n: 0,
    };
  }
  //第一次渲染页面之前
  componentWillMount() {
    console.log("componentWillMount");
    // setTimeout(()=>{
    //   this.setState({
    //     data:[100,200]
    //   })
    // },5000);
  }
  render() {
    console.log("render");
    let { data, n } = this.state;
    // console.log(this);
    return (
      <div>
        {/* {data} === {n} */}
        {data}==={n}
        {/* onClick={this.handle} 按理来说，这里执行this执行了button按钮，但是React中的事件都是合成事件，所有的事件都是进行事件代理的，而且事件对象也是合成的，
        因此this指向undefined【可以理解为事件里面所有的事件都是undefined】*/}
        {/* 这样也可以，因为包在匿名函数里面，匿名函数是一个箭头函数，因此this指向了当前实例。正因如此，this.handle执行【.前面是谁,那么this就指向谁】 */}
        <button onClick={this.handle.bind(this)}>bind点击+</button>
        <button
          onClick={() => {
            this.handle();
          }}
        >
          匿名箭头点击+
        </button>
        {/* 这种写法也可以，因为执行的时候，是一个箭头函数，里面没有this，那么这个函数在 render上下文中调用，那么this也指向了当前实例*/}
        <button onClick={this.handle1}>自己的私有箭头函数点击+</button>
        <button onClick={() => this.forceUpdate()}>强制刷新</button>
      </div>
    );
  }
  //这种相当于给自己的 构造函数的prptotype添加属性【自己.__proto__】
  handle(ev) {
    let {data,n} = this.state;
    // data.push(30);
    //this.setState 不管状态是否改变，都会控制render重新渲染
    this.setState({ n: ++n ,data:[...data,30]});
    //ev里面的属性都进行了劫持，都绑定了get和set方法，因此一开始都得到的null
    //ev,persist() => 把合成事件对象的值暴露出来
    // console.log(this,ev);
  }
  //这种相当于给自己添加一个属性 ES7
  handle1 = (ev) => {
    // console.log(this,ev);
    let n = this.state.n;
    this.setState();
  };
  //第一次渲染完成之后
  // componentDidMount() {
  //   console.log("componentDidMount");
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("shouldComponentUpdate", nextProps, nextState);
  //   //拿当前的状态和最新修改的状态进行对比（浅对比）
  //   //nextProps nextState 最新要修改的属性和状态
  //   //this.state / this.props 修改之前的
  //   //this.forceUpdate() 不会执行周期函数，会强制更新当前组件
  //   // if(this.state.n === nextState.n) return false;
  //   return true;
  // }
  // componentWillUpdate() {
  //   console.log("componentWillUpdate");
  // }
  // componentDidUpdate() {
  //   console.log("componentDidUpdate");
  // }
}
