/* 
  REACT HOOKS :REACT 提供很多新的钩子函数，可以让函数式组件装有
  状态和常用的生命周期以及 REF/CONTEXT 等
*/
import React, { useState, useEffect, useRef, useReducer } from "react";
function reducer(state, action) {
  state = { ...state }; //这里必须使用这个，如果值不发生改变，那么它将不会渲染，state是对象。因此解构完，地址将发生改变
  // console.log(state);
  switch (action.type) {
    case "ADDN":
      state.n++;
      break;
    case "ADDM":
      state.m++;
      break;
  }
  return state;
}
export default function Test(props) {
  // let n = props.n ? props.n : 0;
  // let m = props.m ? props.m : 0;
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
  /* 
    使用生命周期函数useEffect
    这样写相当于 DidMount 和 DidUpdate【第一次页面渲染完成，修改页面渲染完成】
    useEffect(()=>{
      console.log('OK')
    });
    这样写相当于 DidMount 【第一次加载完成之后执行，修改后不会执行】
    useEffect(()=>{
      console.log('changeN');
    },[]) 【这个数组是一个依赖项，里面写你的变量，只要里面变量发生改变才会去执行，不写没有依赖项，那么就是什么值发生改变都不会去执行】
   */
  /* 
    //使用ref
    let inputBox = useRef(); // => {current:undefined} 返回这么一个对象
    <input type="text" ref={inputBox}/>
    当把这个值绑定到DOM元素上，就可以手动操作DOM
  */
  //这样写也可以，就是懒初始化状态【会把里面的函数执行，第一次进来初始化一下，下一次就直接取值【不在执行函数】，懒惰模式】
  // let [{ m, n }, setState] = useState(() => {
  //   // console.log(1);//这里的1只执行函数
  //   return {
  //     n: 0,
  //     m: 0,
  //   };
  // });

  // console.log(m,n);
  //使用生命周期函数
  // useEffect(() => {
  //   // console.log('OK')
  // });
  // useEffect(() => {
  //   // console.log('changeN');
  //   // console.log(inputBox);
  //   inputBox.current.focus();
  //   inputBox.current.value = 100;
  // }, []);
  //使用ref
  // let inputBox = useRef(); // => {current:xxx}
  //使用useReducer
  let [{ n, m }, dispatch] = useReducer(reducer, { n: 0, m: 0 });
  console.log(dispatch);
  return (
    <div>
      {/* <input type="text" ref={inputBox} /> */}
      {n}+{m} = {n + m}
      <button onClick={()=>{dispatch({type:'ADDN'})}}>+N</button>
      <button onClick={()=>{dispatch({ type: "ADDM"})}}>+M</button>
      {/* 这个返回的第二个函数修改的值会把之前的值全部覆盖，而不是合并，上面的m和n也可以不用解构，那么下边setState({...state,n:n++}) */}
      {/* <button
        onClick={() =>
          setState({
            m,
            n: ++n,
          })
        }
      >
        +N
      </button> */}
      {/* <button
        onClick={() =>
          setState({
            n,
            m: ++m,
          })
        }
      >
        +M
      </button> */}
    </div>
  );
}
