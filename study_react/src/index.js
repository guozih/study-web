import React from "react";
import ReactDOM from "react-dom";
// import Render from "./Render Props"
import foo from './Render Props';
// import Test from './Test'
// import Danmu from './弹幕'
// import Gundong from './滚动'
// import Clock from "./Clock";
// import Input from "./非受控组件/input";
// import Test from './生命周期/Test';
// import Test from './setState/异步'
// import Test from './REACT HOOKS/hooks'
// import Test from "./REACT HOOKS/useEffect";
// import Test from "./Vote/Vote_class";
// import Test from "./基于发布订阅信息传值/Vote";
// import Test from "./基于上下文进行信息传递/Vote"
// import Test from "./新版上下文传递/Test";
// import Test from "./redux实现/Vote";
// import Test from './练习';
// import aaa from "./index.less";
// import "./react原理/react_know";
// import { createElement, render } from "./react原理/selfJSX";
// import News from "./组件/News";
// import ReactContext from './REACT HOOKS/reactContext'
// import ReactContext1 from './REACT HOOKS/reactContext1'
// import ReactContext2 from './REACT HOOKS/reactContext2'
// import MyTable from './表单'
// import ReactMemo from './REACT HOOKS/useMemo'
// import Table from './表格'

// ReactDOM.render(
//   <>
//     {/* 这个是函数式组件，函数式组件中传过去的属性都是都作为函数的参数 */}
//     <News index="1" />
//     <News index="1">
//       我是new组件<h1>哈哈哈</h1>
//     </News>
//   </>,
//   document.getElementById("root")
// );
const div = <div>123</div>
ReactDOM.render(
  <>
    {/* <Render /> */}
    {foo(div)}
    {/* <Test />
    <Test />
    <Test /> */}
  </>,
  document.getElementById("root")
);
