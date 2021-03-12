import React, { useState, memo, useMemo, useCallback } from 'react';
/*
  useCallback 和 useMemo 的区别：
   useCallback不会把你传入的函数进行执行，通常用于给子组件传入一个函数【因此可以优化函数，来导致传入旧的内存地址（句柄）】
   useMemo 会把你传入的函数进行执行，会把返回值传给子组件【用于里面进行逻辑的判断，返回一个引用地址，去传给子组件】
    【和 Vue 的计算属性的功能一样，只不过 react 需要自己去判断是否要返回新的值】
  memo 会把你传入的函数进行进行缓存，里面会自动对每项进行【深】比较，只有发生变化的时候才会进行渲染
*/
function Child({ callback }) {
  console.log('render')
  return <div>我是子组件</div>
}
const ChildCom = memo(Child)

export default function (props) {
  const [count, setCount] = useState(0);
  const [set, setOun] = useState(0);
  const setJia = useCallback(() => {
    console.log('我只有set发生改变的时候才会执行')
  }, [set])

  /**
   * 这样写  ChildCom  组件只会在初次渲染时进行渲染，后面将不会渲染，因为 useMemo 会把函数执行，函数返回 undefined 
      即使 set 发生改变也不会渲染，每次 callback 传入的都是 undefined ,和上一次比较值是一样的，所以不会渲染 
  **/
  // const setJia = useMemo(() => {
  //   console.log('我只有set发生改变的时候才会执行')
  // }, [set])
  /*  
    要想使用 useMemo 进行传值，那么写成这样
  */
  // const setJia = useMemo(() => {
  //   return () => {
  //     console.log('我只有set发生改变的时候才会执行')
  //   }
  // }, [set])
  return <>
    <button onClick={() => setCount(count + 1)} style={{ marginRight: 10 }}>count 加</button>
    <button onClick={() => setOun(set + 1)}>set 加</button>
    <div>count : {count}</div>
    <div>set : {set}</div>
    <ChildCom callback={setJia} />
  </>
}
// import React, { useMemo, useCallback } from "react"
// let Counter = ({ value, children, onClick }) => {
//   console.log('Render: ', children)

//   return (
//     <div onClick={onClick}>
//       {children}: {value}
//     </div>
//   )
// }
// Counter = React.memo(Counter)



// const App = () => {
//   const [count1, setCount1] = React.useState(0)
//   const [count2, setCount2] = React.useState(0)

//   const increaseCounter1 = useCallback(() => {
//     setCount1(count1 => count1 + 1)
//   }, [])
//   const increaseCounter2 = useCallback(() => {
//     setCount2(count2 => count2 + 1)
//   }, [])
//   console.log(increaseCounter1)

//   return (
//     <>
//       <Counter value={count1} onClick={increaseCounter1}>Counter 1</Counter>
//       <Counter value={count2} onClick={increaseCounter2}>Coutner 2</Counter>
//     </>
//   )
// }

// export default App