import React, { Component } from 'react';
import myStyles from './index.lcss';

class App2 extends Component {
  state = {
    count: 0,
    size: {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    },
  }
  onResize = () => {
    this.setState({
      size: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    })
  }
  componentDidMount() {
    document.title = this.state.count
    window.addEventListener('resize', this.onResize, false);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false);
  }
  componentDidUpdate() {
    document.title = this.state.count
  }
  // aa = () => {
  //   this.setState({
  //     count: this.state.count + 1
  //   }, () => {
  //     document.title = this.state.count
  //   })
  // }
  render() {
    console.log(myStyles)
    const { count, size } = this.state;
    return (
      <>
        <button
          type="button"
          onClick={() => {
            // this.aa()
            this.setState({
              count: count + 1
            })
          }}
        >
          Click ({count})
        size:{size.width}*{size.height}
        </button>
        <div>1233</div>
      </>
    )
  }
}

export default App2;