import React from 'react';
import VoteHead from './VoteHead';
import VoteMain from './VoteMain';
import VoteFoot from './VoteFoot';
import subscribe from './subscribe';

export default class Vote extends React.Component{
  //模拟vue中的$emit和$on实现发布订阅处理的方案（安装第三方插件或者自己处理）
  /* 
    1.调用Vote组件，创建一个属于自己的事件池
    2.在组件中把修改本身状态的方法放到事件池中
    3.在点击按钮的时候，通知事件池中的方法执行即可
  */
  constructor(props){
    super(props);
    //创建一个单独的事件池
    this.eventBus = subscribe();  
  }
  render(){
    let title = this.props.title;
    return <div>
      <VoteHead title={title} eventBus={this.eventBus}/>
      <VoteMain eventBus={this.eventBus}/>
      <VoteFoot eventBus={this.eventBus}/>
    </div>;
  }
 
}