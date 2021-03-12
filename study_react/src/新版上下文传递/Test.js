import React from 'react';
//创建上下文对象
const ThemeContext = React.createContext();
class Child extends React.Component{
  static contextType = ThemeContext;
  //获取方式之一：基于this.context来使用即可
  render(){
    //获取方式一，查看传递过来的上下文信息： console.log(this.context);
    // return <div>
    //   {this.context.n}{this.context.m}
    //   我是孩子
    // </div>
    return <ThemeContext.Consumer>
      {context=>{
        return <>
          我是孩子{context.n}{context.m}
        </> 
      }}
    </ThemeContext.Consumer>
  }
}

class Parent extends React.Component{
  render(){
    return <ThemeContext.Provider value={{
      //提供的上下文信息
      n:10,m:20
    }}>
      我是父亲
      <Child/>
    </ThemeContext.Provider>
  }
}

export default Parent;