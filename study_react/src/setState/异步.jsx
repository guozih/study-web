import React from "react";

export default class Test extends React.Component {
  state = {
    n: 0,
  };
  componentWillMount() {
    //这里面用 this.setState 那么render()只执行一遍
    // this.setState({
    //   n:2
    // })
  }
  render() {
    console.log("render");
    let { n } = this.state;
    return (
      <div>
        {n}
        <button onClick={this.handle}>+</button>
        <button ref={(x) => (this.btn = x)}>+</button>
      </div>
    );
  }
  componentDidMount() {
    //这里也会把setState变为同步【DOM2也是一样】。因此，只要是this.setState被异步包起来，那么就会变为同步
    this.btn.onclick = () => {
      this.setState({
        n: 3,
      });
      console.log("setState");
    };
    this.btn.addEventListener("click", () => {
      this.setState({
        n: 3,
      });
      console.log("setState");
    });
  }
  handle = () => {
    //如果有多个 this.setState 那么由于是异步，只执行最后一个。那么，render也就执行一次
    // this.setState({
    //   n:this.state.n+1
    // })
    //可以用定时器吧this.setState变为同步
    setTimeout(() => {
      this.setState({
        n: 3,
      });
      //这样的话this.setState将会执行2次，那么，render也就执行两次
      // this.setState({
      //   n:4
      // })
      console.log("setState");
    }, 1000);
  };
}
