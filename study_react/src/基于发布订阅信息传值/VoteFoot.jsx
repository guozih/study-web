import React from "react";

export default class VoteFoot extends React.Component {
  render() {
    let { eventBus } = this.props;
    return (
      <div>
        <button onClick={()=>{
          eventBus.$emit('renshu','SUP');
        }}>支持</button>
        <button onClick={()=>{
          eventBus.$emit('renshu','OPP');
        }}>反对</button>
      </div>
    );
  }
}
