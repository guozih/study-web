/* 
  REACT HOOKS :REACT 提供很多新的钩子函数，可以让函数式组件装有
  状态和常用的生命周期以及 REF/CONTEXT 等
*/
import React, { useState, useEffect, useRef, useReducer } from "react";

export default function Test(props) {
  /* 
    使用生命周期函数useEffect
    这样写相当于 DidMount 和 DidUpdate【第一次页面渲染完成，修改页面渲染完成】
    useEffect(()=>{
      console.log('OK')
    });
    这样写相当于 DidMount 【第一次加载完成之后执行，修改后不会执行】
    useEffect(()=>{
      console.log('changeN');
    },[]) 【这个数组是一个依赖项，里面写你的变量，只要里面变量发生改变才会去执行，不写没有依赖项，那么就是说什么值发生改变都不会去执行】
   */
  let [{ m, n }, setState] = useState({n:0,m:0});
  // 使用生命周期函数
  useEffect(() => {
    console.log('OK')
  });
  useEffect(() => {
    console.log('changeN');
  }, [n]);


  return (
    <div>
      {n}+{m} = {n+m}
      <button onClick={() =>setState(
        {m,n: ++n})
      }>+N</button>
      <button onClick={() =>setState(
        {n,m: ++m})
      }>+M</button>
    </div>
  );
}
