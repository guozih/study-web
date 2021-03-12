class MyPromise{
  constructor(executor){
    this.status = 'pending';
    this.value = undefined;
    //then方法里面绑定的两个方法
    this.resultFn = null;
    this.reasonFn = null;
    //改变状态值
    let change = (status,val) =>{
      //判断状态是否被修改
      if(this.status !== 'pending') return;
      this.status = status;
      this.value = val;
      //改变完成状态后，把基于then指定的对应方法执行
      let func = status === 'resolved' ? this.resultFn : this.reasonFn;
      if( typeof func !== 'function' ) return;
      func(val);
    }
    //成功时的方法
    let resolve = val =>{
      //如果通过 then 已经绑定方法
      if( typeof this.result === 'function'){
        change('resolved',val);
        return;
      }
      //为了没有绑定方法
      let delayTimer = setTimeout(_=>{
        change('resolved',val);
        clearTimeout(delayTimer);
      },0);
    }
    //失败时的方法
    let reject = val =>{
      //如果通过 then 已经绑定方法
      if( typeof this.reason === 'function'){
        change('rejected',val);
        return;
      }
      //为了没有绑定方法
      let delayTimer = setTimeout(_=>{
        change('rejected',val);
        clearTimeout(delayTimer);
      },0);
    }
    try{
      //执行函数
      executor(resolve,reject);
    }catch(err){
      //报错调用 reject 方法
      reject(err.message);
    }
  }
  then(resultFn,reasonFn){
    if(typeof resultFn !== 'function'){
      resultFn = result =>{
        return result;
      }
    }
    if(typeof reasonFn !== 'function'){
      reasonFn = reason =>{
        return MyPromise.reject(reason);
      }
    }
    //每次都要返回一个新的 Promise 实例
    return new MyPromise((resolve,reject)=>{
      //只要执行 resolve/reject 就能知道新的实例是成功还是失败的
      this.resultFn = result=>{
        try{
          //不报错，则接受方法的返回结果，会根据结果判断是成功还是失败
          let res = resultFn(result);
          if( res instanceof MyPromise ){
            res.then(resolve,reject);
            return;
          }
          resolve(res);
        }catch(err){
          //方法执行报错，也代表新实例是失败的
          reject(err.message);
        }
      };
      this.reasonFn = reason=>{
        try{
          let res = resultFn(reason);
          if( res instanceof MyPromise ){
            res.then(resolve,reject);
            return;
          }
          resolve(res);
        }catch(err){
          reject(err.message);
        }
      };
      // this.resultFn = resultFn;
      // this.reasonFn = reasonFn;
    });
  }
  catch(reasonFn){
    return this.then(null,reasonFn);
  }
  /* 静态方法 */
  static resolve(result){
    return new MyPromise((resolve)=>{
      resolve(result);
    })
  }
  static reject(reason){
    return new MyPromise((_,reject)=>{
      reject(reason);
    })
  }
  static all(arr){
    return new MyPromise((resolve,reject)=>{
      let index =0,
          results = [];
      // for(let i=0;i<arr.length;i++){
      //   let item = arr[i];
      //   if(item instanceof MyPromise){
      //     let status = item.status;
      //     console.log(status);
      //     if(status === 'pending'){
      //       return;
      //     }else if(status === 'resolved'){
      //       arr[i] = item.value;
      //     }else if(status === 'rejected'){
      //       reject(item.value);
      //       break;
      //     }
      //   }
      // }
      // resolve(arr);
      for(let i =0;i<arr.length;i++){
        let item = arr[i];
            index++;
        if(!(item instanceof MyPromise)){
          results[i] = item;
          continue;
        } 
        item.then(result=>{
          console.log(result);
          results[i] = result;
          if(index === arr.length){
            resolve(results);
          }
        }).catch(reason=>{
          //只有一个失败，整体就失败
          reject(reason);
        })
      }
    })
  }
}
// let pms1 = new MyPromise((resolve,reject)=>{
//   resolve('OK1');
// });
// console.log(pms1);
// let pms2 = pms1.then(result=>{
//   return 'OK2';
// },reason=>{
//   console.log(reason);
//   return 'ERROR2';
// })
// console.log(pms2);
let a = MyPromise.reject(1);
console.log(a);
let b = MyPromise.all([1,2,a])
console.log(b);