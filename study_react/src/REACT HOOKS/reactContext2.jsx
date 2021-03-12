//react Context【上下文】：从父级直接传到子集，不需要一级一级去传递
//使用静态属性获取值
import React, { Component, createContext } from 'react';

const countContext = createContext();
// 如果Provider想传入多个值的话，那就不要结构，因为 createContext() 返回的可以一层套一层传递数据,层次无所谓，哪个套哪个都一样。
// const countContext = createContext();
// 这样结构是为了在同一个文件里方便，要是子组件和父组件不在一个文件，就不要这样写。是因为父组件导出 countContext ,
//   子组件导入 countContext，使用 countContext.Consumer 调用父组件传过来的值
// createContext() 括号里面可以写默认值，上下文传递的值 this.props 接收不到
// Provider :生产者，它传值,Consumer接收
// Consumer：消费者，不能单独使用。接收Provider传过来的值，这两者必须结合使用,不能直接渲染组件，得是一个函数，唯一参数，就是Provider传过来的值

class Leaf extends Component {
  //静态属性 contextType 被赋值为 createContext() 创建出来的上下文
  static contextType = countContext;
  render() {
    const count = this.context;  // 通过 this.context 获取上下文值，就是 Provider传递过来的值
    // return <countContext.Consumer>
    //   {battery => <h1>Battery：{battery}</h1>}
    // </countContext.Consumer>
    //这里也不需要使用 countContext.Consumer 来接收值了，就直接可以渲染了
    return <h1>Battery：{count}</h1>
  }
}
//中间组件
class Middle extends Component {
  render() {
    return <Leaf />
  }
}
export default class App extends Component {
  render() {
    return <countContext.Provider value={60}>
      <Middle />
    </countContext.Provider>
  }
}
