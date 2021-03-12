import React from "react";
import VoteHead from "./VoteHead";
import VoteMain from "./VoteMain";
import VoteFoot from "./VoteFoot";
import PropTypes from "prop-types";
/* 
  适用于 具有共同的祖先【上下文:祖先传递；属性传值:父子传值】
*/
export default class Vote extends React.Component {
  //设置祖先上下文中需要存放的内容
  static childContextTypes = {
    title: PropTypes.string,
    supNum: PropTypes.number,
    oppNum: PropTypes.number,
    handle: PropTypes.func,
  };
  getChildContext() {
    // 这个是内置方法
    // console.log(this);
    //当状态改变的时候，此方法也会被触发执行，更新给后代所用的上下文信息
    return {
      title: this.props.title,
      supNum: this.state.supNum,
      oppNum: this.state.oppNum,
      handle: this.handle,
    };
  }
  state = {
    supNum: 0,
    oppNum: 0,
  };
  handle = (type) => {
    if (type === "SUP") {
      this.setState({
        supNum: this.state.supNum + 1,
      });
      return;
    }
    this.setState({
      oppNum: this.state.oppNum + 1,
    });
  };
  render() {
    return (
      <div>
        <VoteHead />
        <VoteMain />
        <VoteFoot />
      </div>
    );
  }
}
