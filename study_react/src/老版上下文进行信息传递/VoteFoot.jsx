import React from "react";
import PropTypes from "prop-types";

export default class VoteFoot extends React.Component {
  //获取上下文信息
  static contextTypes = {
    handle: PropTypes.func,
  };
  render() {
    let { handle } = this.context;
    return (
      <div>
        <button onClick={()=>{
          handle('SUP')
        }}>支持</button>
        <button onClick={()=>{
          handle('OPP')
        }}>反对</button>
      </div>
    );
  }
}
