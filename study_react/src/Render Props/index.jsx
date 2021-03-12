import React from 'react';

const Bar = ({ title }) => (<p>{title}</p>)
class Foo extends React.Component {
  state = {
    title: '我是标题123231'
  }
  render() {
    //通过 children 传递
    // const { children } = this.props;
    //通过 render Props 传递
    const { render } = this.props;
    const { title } = this.state;
    return <>
      {/* {children(title)} */}
      {render(title)}
    </>
  }
}
// export default function () {
//   return <Foo render={() => {
//     return <div>123</div>
//   }}></Foo>
// }
// const a = new Foo
export default function foo1(Component) {
  return class extends React.Component {
    state = {
      title: '我是标题123231'
    }
    render() {
      return <Foo render={(title) => {
        return <Component {...this.props} title={title} />
      }} />
    }
  }
}

// export default foo1
// const Foo = ({ title }) => {
//   return <p>{title}</p>
// }
// const Foo1 = ({title})=>{
//   return <div>{title}</div>
// }
// export default class App extends React.Component {
//   render() {
//     return <div>
//       <h3>这是一个render props组件</h3>
//       {/* 通过 render props 传递，给Foo传递一个render，这个是一个函数，这个函数返回要渲染内容 */}
//       {/* <Foo render={title => <Bar title={title} />} /> */}
//       {/* 通过 children 传递*/}
//       <Foo>
//         {(title) => {
//           return <Bar title={title} />
//         }}
//       </Foo>
//       {/* <Foo title="我是组件1" /> */}
//     </div>
//   }
// }