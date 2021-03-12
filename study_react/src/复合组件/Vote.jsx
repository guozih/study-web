import React from 'react';
import VoteHead from './VoteHead';
import VoteMain from './VoteMain';
import VoteFoot from './VoteFoot';

export default class Vote extends React.Component{
  //支持人数由父组件进行传递
  state = {
    supNum:0,
    oppNum:0
  }
  render(){
    //这是属性传递 => 单项传递【只能传给儿子，儿子不能传给父亲】(适用于父子)【因为子传父，父亲修改，那么子也修改(相当于子传父也适用于 相同父亲的兄弟)】
    //这样就可以衍生出来 子组件->父组件：父组件传递方法给子组件，子组件调用方法来修改父组件的内容【也是基于属性传递】
    //父组件一旦重新渲染，所以的后代组件都会重新渲染;相反，子组件重新渲染，父组件不一定重新渲染
    let title = this.props.title;
    let {supNum,oppNum} = this.state;
    return <div>
      <VoteHead title={title} total={supNum+oppNum}/>
      <VoteMain supNum={supNum} oppNum={oppNum}/>
      <VoteFoot callback={this.handle}/>
    </div>;
  }
  handle = type =>{
    //这里的this不管怎样都会指向 Vote，因为箭头函数里面没有this，他会向上级的作用域中找
    //因为函数找变量跟你在哪里调用没有关系，跟你再哪里定义有关系。那么 this 就找到Vote.永远都会指向 Vote
    if(type==='SUP'){
      this.setState({
        supNum:this.state.supNum+1
      })
      return;
    }
    this.setState({
      oppNum:this.state.oppNum+1
    })
  }
}