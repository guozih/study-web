import React from "react";
/* 
  创建一个函数，只要函数中返回一个新的JSX元素，则为函数式组件
  props 传递过来的属性是只读的，不能去修改
  调用组件可以是单闭合，也可以是双闭合
  项目中使用双闭合方式，可以把一些子节点当做属性(children)传递给组件，在组件中可以把传递的这些子节点放到自定的位置【想到于vue的插槽slot】
    传过来的子节点两种调用方式：
      1：props.children
      2：React.Children.map(props.children,()=>{}) 
      React.Children【react自己封装的Children对象里面的map方法，可以循环数组，第一个是有要循环的数组，第二个是回调函数】
*/
function News(props) {
  /* 这边可以用 props 接收传过来的参数【父传子】*/
  console.log(props);
  console.log(React.Children);
  return (
    <div>
      <h1>函数式组件</h1>
      <ul>
        <li>你好啊</li>
        <li>他好啊</li>
        <li>我好啊</li>
        {props.children}

        {React.Children.map(props.children, (item) => {
          return <div>!! {item}</div>;
        })}
      </ul>
    </div>
  );
}

export default News;
