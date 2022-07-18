/* 
    1. 规定 then 里或者 catch 的成功或者回调函数不能返回 Promise 赋值的变量【见案例一】TypeError: Chaining cycle detected for promise
    2. 如果 then 里成功回调或者失败回调，返回的是一个对象或者函数
    3. 如果 then 里成功回调或者失败回调，返回的是一个普通值，那么直接 resolve(普通值)
*/

/*  
    案例一
    这样调用是不行的，由于运算符的优先级，相当于是把【then 返回值 promise】赋值给 外边的promise【死循环】，现在不是成功也不是失败
*/
const promise = new Promise((resolve,reject)=>{
    resolve(1)
}).then(()=>{
    console.log(promise);
    return promise
})

