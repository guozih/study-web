import React from 'react';

export default class VoteHead extends React.Component{
 
  render(){
    //基于上下文把store接收过来
    const MyContext = window.MyContext;
    return <MyContext.Consumer>
      {context =>{
        const store = context.store;
        //通过 createStore() 创建出来的存储库，赋值给 store 变量，通过getState获取初始状态值
        const {title,supNum,oppNum} = store.getState(); 
        return <h4>
          {title}
          (N:{supNum+oppNum})
        </h4>
      }}
    </MyContext.Consumer>;
  }
}