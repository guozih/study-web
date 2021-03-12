import React from "react";

/* 
  受控组件：受状态管控的组件 =>数据驱动视图渲染
  【来自外来的状态来管理组件。例如：antd中Form.Item里面包着Input，那么这个Input是一个受控组件，value值将不会给它赋值。将用 form 中的 initialValue 设置值】
  非受控组件：不受状态管控的组件（直接操作DOM=>ref）
  【组件自己管理自己的状态。例如：antd中tabs组件。】
  【
    <Tabs>
      <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
      <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
    </Tabs> 
    【大部分情况下，开发者都不用考虑如何控制 tabs 停留在哪个标签页，用户在需要时自行点击即可。这种情况下，tabs 会作为“非受控组件”来运行】
    【
      而当传递 activeKey 属性时，tabs 组件会转变为“受控组件”。标签切换需要通过代码来进行控制：
      state = {
        activeKey: '1',
      }
      onTabChange = (activeKey) => {
        this.setState({ activeKey });
      }
      <Tabs activeKey={this.state.activeKey} onChange={this.onTabChange}>
        <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
        <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
      </Tabs>
      这样 Tabs 就变为了非受控组件 activeKey 值为几，它才会让第几个 TabPane 显示
    】
  
  
  】
*/
export default class Input extends React.Component {
  //render 渲染该组件
  render() {
    //这里调用的时候调用的是父类的props
    // console.log(this.props);
    return (
      <div>
        {/* <input type="text" ref="inpBox" /> */}
        <input
          type="text"
          // ref={(ele) => {
          //   //写成函数，ele代表当前元素对象
          //   this.INP = ele;
          //   console.log(ele);
          // }}
          ref={ele => this.INP = ele}
        />
      </div>
    );
  }
  //生命周期函数 第一次渲染完
  componentDidMount() {
    // console.log(this.refs); //=>{inpBox: input}
    // this.refs.inpBox.focus();
    this.INP.focus();
  }
}
