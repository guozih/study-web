/* 
  REACT HOOKS :REACT 提供很多新的钩子函数，可以让函数式组件装有
  状态和常用的生命周期以及 REF/CONTEXT 等
*/
import React, { useState, useEffect, useRef, useReducer } from "react";
export default function Test(props) {
  // let n = props.n ? props.n : 0;
  // let m = props.m ? props.m : 0;   //props值不能修改，只能写成这样
  /* 
    useState() 返回的是一个数组【当前最新的状态值,修改状态的方法】，那么进行解构
    官方推荐，每一次useState只管控一个状态
    let [n,changeN] = useState(0);
    let [m,changeM] = useState(0);
    可以这样，把所有的值放到对象里面
    let [{m,n},setState] = useState({
      n:0,m:0
    })
  */
  // 这样写也可以，就是懒初始化状态【会把里面的函数执行，第一次进来初始化一下，下一次就直接取值【不在执行函数】，懒惰模式】
  let [{ m, n }, setState] = useState(() => {
    // console.log(1);//这里的1只执行函数
    return {
      n: 0,
      m: 0,
    };
  });
  return (
    <div>
      {n}+{m} = {n+m}
       {/* 这个setState函数会把之前的值全部覆盖，而不是 this.setState 合并对象。上面的m和n也可以不用解构，那么下边setState({...state,n:n++}) */}
      <button onClick={() =>setState(
        {m,n: ++n}
      )}>+N</button>
      <button onClick={() =>setState(
        {n,m: ++m,}
      )}>+M</button>
    </div>
  );
}
