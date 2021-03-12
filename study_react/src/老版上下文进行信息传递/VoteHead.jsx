import React from 'react';
import PropTypes from "prop-types";

export default class VoteHead extends React.Component{
  //获取上下文信息
  static contextTypes = {
    title: PropTypes.string,
    supNum: PropTypes.number,
    oppNum: PropTypes.number,
  };
  render(){
    console.log(this.context)
    let {title,supNum,oppNum} = this.context;
    return <>
      <h4>
        {title}
        (N:{supNum+oppNum})
      </h4>
    </>;
  }
}