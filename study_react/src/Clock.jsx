import React from "react";
//安装的第三方插件，设置属性的规则
import PropTypes from "prop-types";
//函数式组件特点：
/* 
  =>静态组件
  =>每一次调用函数组件，都会重新渲染和计算，把渲染后的结果呈现到页面中
  =>渲染完成后，呈现的内容不会改变，除非重新调用该组件
*/
// export default function Clock() {
//   return <div>{new Date().toLocaleString()}</div>;
// }

/* 
  类组件
  =>创建类，让其继承 React.Component 或者 React.PureComponent，此类被称为类组件
  =>动态组件
  =>react中基于状态来管理动态组件（类组件）
    =>设置初始状态值
    =>修改状态：setState修改组件及重新渲染
*/
export default class Clock extends React.Component {
  //设置默认值
  static defaultProps = {
    m: 100,
    // x: "aaa",
  };
  static propTypes = {
    //设置m的值为number,如果类型传的不对，会出现警告错误
    m: PropTypes.number,
    //x为字符串，必须传
    x: PropTypes.string.isRequired,
  };
  // constructor调用组件，创建类的一个实例，首先执行constructor把属性、上下文等信息传递过来
  constructor(props) {
    console.log(props);
    // console.log(this.props);
    super(props); //相当于 React.Component.call(this,props),
    console.log(this.props);
    //这样就可以在constructor中用到this.props
    //创建初始状态
    this.state = {
      time: new Date().toLocaleString(),
    };
  }
  //render 渲染该组件
  render() {
    //这里调用的时候调用的是父类的props
    // console.log(this.props);
    return <div>{this.state.time}</div>;
  }
  //生命周期函数 第一次渲染完
  componentDidMount() {
    setInterval(() => {
      //partiaState 部分状态
      //callback 回调函数(状态修改，组件重新渲染后，触发的回调函数)
      this.setState({
        time: new Date().toLocaleString(),
      });
      // this.state.time = new Date().toLocaleString();
    }, 1000);
  }
}
