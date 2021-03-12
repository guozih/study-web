import React from "react";
import VoteHead from "./VoteHead";
import VoteMain from "./VoteMain";
import VoteFoot from "./VoteFoot";
import { createStore } from 'redux';

//reducer修改容器状态的唯一途径
function reducer(state = {
  //state：原始容器中的状态信息，没有给设置初始值
  supNum: 0,
  oppNum: 0,
  title: '你好啊'
}, action) {
  //action是dispatch派发的行为对象（action.type行为标识）
  state = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'SUPPORT':
      state.supNum++;
      break;
    case 'OPPOSE':
      state.oppNum++;
      break;
  }
  //返回啥就把原始容器中的状态替换成啥
  return state;
}
//创建一个redux状态管理容器
const store = createStore(reducer);
//基于上下文把store传过去
const MyContext = React.createContext();
window.MyContext = MyContext;
export default class Vote extends React.Component {
  render() {
    return (
      <MyContext.Provider value={store}>
        <VoteHead />
        <VoteMain />
        <VoteFoot />
      </MyContext.Provider>
    );
  }
}
