//整个 react 核心：基础语法、属性、状态、生命周期、组件等
import React from "react";
//把虚拟DOM渲染成为真实DOM
import ReactDOM from "react-dom";

//ReactDOM参数
//ReactDOM.reder(JSX语法,容器,渲染完成触发的回调函数)
//VUE template【炭盆类腾】
//REACT JSX(JAVASCRIPT AND XML[HTML])(只允许只有一个根节点)
//{}存放的是JS表达式，不能直接放入对象【会报错】（除数组和几种特殊情况除外）
/* 
    特殊情况：style 中必须写成对象，但是样式类型有 - 的必须写成 驼峰式的
             虚拟DOM对象
             null 和 undefined 代表空元素，不会渲染到DOM上
   */
//样式类名：className,不能写成 class
// let str = "react";
// //是数组的话它会把数组中的每一项分别拿出来渲染
// let arr = [1, 2, 3];
// let obj = {
//   name: "狗蛋",
// };
// let level = 1;
// ReactDOM.render(
//   <>
//     <span className="box" style={{ fontSize: "20px" }}>
//       你好啊
//     </span>
//     {/* 用map循环出li，没个li里面都放一个key，不然会有警告的错误【vue用v-for】 */}
//     {arr.map((item) => (
//       <li key={item}>{item}</li>
//     ))}
//     {str ? "哈哈" : "呜呜"}
//     {/* JSX语法根据level的值创建什么标签【具有很强的编程性】*/}
//     {[<h1>1</h1>, <h2>2</h2>, <h3>3</h3>][level]}
//   </>,
//   document.getElementById("root")
// );

//虚拟DOM到真实DOM===================================================================
//第一步：bable-preset-react-app 将 JSX 转换
/* 
      ReactDOM.render(<>react</>, document.getElementById("root"));
      【这个虚拟DOM 生成 真实DOM，基于 bable-preset-react-app 把 JSX 变为】
      React.createElement(React.Fragment, null, "react");
        第一个参数：标签名（或者函数组件/类组件）
        第二个参数：给标签设置的属性 null
        第三个参数或者更多：标签的子节点（文本节点或者元素节点=>所以的元素节点都会重新 React.createElement ）
      ReactDOM.render(<div>react</div>, document.getElementById("root"));
      因此上面的语法相当于 下面的语法 
      ReactDOM.render(
        React.createElement("div", null, "react"),
        document.getElementById("root")
      );
      【同一个文件中如果有多个 ReactDOM.render，那么只会渲染最后一个】
    */
//第二步：执行 React.createElement()
/*  
      console.log(React.createElement());
      console.log(React.createElement('div',null,'你好啊',React.createElement('div')))
      执行 React.createElement();创建JSX虚拟DOM对象【返回值就是虚拟DOM对象,几个重要的几个属性】
      {
        type：标签名或者组件
        props:{
          className:'xxx' 我们传递的属性
          children：子节点内容（特点：没有子节点则没有这个属性，否则是一个字符串或者一个数组,多个子节点是一个数组）
          style：样式
        }
      }
      【vue-loader把template语法解析为虚拟DOM对象】
*/
//第二步：执行 React.render()

ReactDOM.render(
  <div style={{ color: "red" }} className="str">
    react
    <h1>你好啊</h1>
  </div>,
  document.getElementById("root")
);

//看他生成的虚拟DOM对象
// console.log(React.createElement('div',{style:{color:'red'}},'你好啊',React.createElement('div')))
// console.log(React.createElement('div',{className:'box',style:{color:'red'}},'你好啊'));
