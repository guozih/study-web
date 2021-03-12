//react原理
function createElement(type, props, ...childs) {
  let obj = {};
  //标签名
  obj.type = type;
  //属性
  obj.props = props || {};
  //它下边的所有子节点
  obj.props.children = childs;
  //这里只是为了对应原生，原生，如果只有一个文本节点，就是一个字符串
  // 原生这里如果又是 一个元素节点，那么这里就是那个元素节点的 对象
  // if (childs.length > 0) {
  //   obj.props.children = childs.length === 1 ? childs[0] : childs;
  // }
  return obj;
}

function render(jsxOBJ, container, callback) {
  let { type, props } = jsxOBJ;
  let element = document.createElement(type);
  for (let key in props) {
    //这里循环 props,for in先会循环自己的属性，当自己的属性循环完，再循环父级属性。当循环到父级属性时，就可以直接退出循环
    if (!props.hasOwnProperty(key)) break;
    //className
    if (key === "className") {
      element.className = props["className"];
      //这里的 continue 是 为了阻止下面代码的执行，优化
      continue;
    }
    //style
    if (key === "style") {
      let sty = props["style"];
      for (let attr in sty) {
        //这里和上边的一样
        if (!props.hasOwnProperty(key)) break;
        element["style"][attr] = sty[attr];
      }
      continue;
    }
    //children
    if (key === "children") {
      let children = props["children"];
      // children = Array.isArray(children) ? children : [children];
      children.forEach((item) => {
        if (typeof item === "string") {
          //如果是字符串，要转化为文本节点
          element.appendChild(document.createTextNode(item));
          return;
        }
        //递归
        /* 
          【这里递归调用，传过来的值是上一个执行上下文的标签名 element ,因此插入的也是上一级上下文的标签，
          执行完执行栈销毁,因为他的返回值 为 undefined ，没有被外边所占用】
        */
        //这里的 item 是一个 对象，element 是上一级执行上下文的 标签名
        render(item, element);
      });
      continue;
    }
  }
  container.appendChild(element);
  callback && callback();
}
/* 
      把虚拟DOM对象变成真实DOM对象
      自己模拟写的
      render(
        createElement("div", {
        style: {
          fontSize: '20px'
        },
        className: "box"
      }, "react",createElement("h1", null, "你好啊")),document.getElementById("root"));
    */
render(
  createElement(
    "div",
    {
      style: {
        fontSize: "20px",
      },
      className: "box",
    },
    "react",
    createElement("h1", null, "你好啊")
  ),
  document.getElementById("root")
);
export { createElement, render };
