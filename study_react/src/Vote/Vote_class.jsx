import React from "react";

export default class Vote extends React.Component {
  state = {
    supNum: 0,
    oppNum: 0,
    zhichilv: "0%",
  };
  render() {
    console.log(this);
    let { supNum, oppNum, zhichilv } = this.state;
    return (
      <div>
        <h4>{this.props.title}</h4>
        <div>
          <p>支持人数：{supNum}</p>
          <p>反对人数：{oppNum}</p>
          <p>支持率：{this.jisuan1()}</p>
        </div>
        <div>
          <button onClick={()=>{this.jisuan('supNum')}}>支持</button>
          <button onClick={()=>{this.jisuan('oppNum')}}>反对</button>
        </div>
      </div>
    );
  }
  jisuan = (type) => {
    /* 
      这个方法相当于是 vue 的type相加完，只不过视图得我们手动去渲染
      可以不要下边 的 jisuan1 这个方法，那么写成： 
        let value = ++this.state[type];
        let { supNum, oppNum, zhichilv } = this.state;
        zhichilv = ((supNum/(supNum+oppNum))*100).toFixed(2)+'%';
        this.setState({
          ...this.state,
          // [type]:value, //这种写法在ie不支持
          zhichilv
        });
      只不过，我们还是 分开来写 比较好，也切合vue的方式。
    */
    ++this.state[type];
    this.setState({});
  };
  jisuan1 = ()=>{
    //下边这种方式相当于 vue的计算属性，只不过是我们自己定义的方法
    let { supNum, oppNum } = this.state;
    let total = supNum + oppNum;
    if (total === 0) {
      return "0%";
    }
    return ((supNum / total) * 100).toFixed(2) + "%";
  }
}
