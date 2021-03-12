import React from "react";

export default class VoteFoot extends React.Component {
  render() {
    let { callback } = this.props;
    return (
      <div>
        <button onClick={()=>{
          callback('SUP')
        }}>支持</button>
        <button onClick={()=>{
          callback('OPP')
        }}>反对</button>
      </div>
    );
  }
}
