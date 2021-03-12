import React, { useReducer } from "react";
function reducer(state, action) {
  state = { ...state }; //这里必须使用这个，如果值不发生改变，那么它将不会渲染，state是对象。因此解构完，地址将发生改变
  // console.log(state);
  action();
  // switch (action.type) {
  //   case "ADDN":
  //     state.n++;
  //     break;
  //   case "ADDM":
  //     state.m++;
  //     break;
  // }
  return state;
}
export default function Test(props) {
  //使用useReducer
  /* 
    传两个参数，第一个参数是一个函数，这个函数将控制里面的方法去执行，已达到值的改变，第二个参数是你的初始值，
    这个初始值将传到 reducer 的第一个参数中
    返回值  参1： reducer 函数的返回值
           参2： 你要执行的方法，里面的参数会传到 reducer -> action这个参数，将根据这个参数执行方法
  */
  let [{ n, m }, dispatch] = useReducer(reducer, { n: 0, m: 0 });
  function a(){
    console.log(1);
  }
  console.log(dispatch);
  return (
    <div>
      {n}+{m} = {n + m}
      <button onClick={() => {
          /*  */
          dispatch(a);
        }}>+N</button>
      <button onClick={() => {
          dispatch({ type: "ADDM" });
        }}>+M</button>
    </div>
  );
}
