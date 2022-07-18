/* 
    Promise【包括then】只有两种情况是失败： 1. 执行报错
                               2. 自己手动修改失败的状态 
*/
const Promise = require('./myPromise/Promise-实现链式调用')

//=================================== 案例一 =======================================
/*  
    【自己写的 promise 的 then 报错的逻辑是 then 返回的 promise 不能与它的成功或者失败返回值是同一个 promise 】
    这里的 p1 是第二个 then 返回的结果是一个 Promise ，由于 then 里的成功和失败的回调都是一个异步的，第一个 then 还处于 penging 状态时，就执行第二个then
    所以就把第二个 then 里的成功和失败的函数放入到了 this 的发布订阅里【注意这里的 this 是指第一个 then 返回的 promise，也就是说到现在改变了第二个 promise 的发布订阅队列】，
    所以第一个 then 由于定时器的作用域，返回这个 Promise【已经改变 this 的发布订阅队列】，p1 的赋值为第二个 then 的返回值
    【可见 /myPromise/Promise-实现链式调用 14 和 15行打印】
    由于 p1 和第一个 then 返回值的 Promise 是一个构造函数 new 出的不同的对象，所以两个不相等，所以不会抛错，会改为成功的状态
    因此第二个 then 会走成功的回调
*/
// let p1 = new Promise((resove, reject) => {
//     resove(1)
// }).then(() => {
//     return p1
// }).then((e)=>{
//     console.log(e);
//     return 'xxxx'
// },(e)=>{
//     // console.log(e);
//     return 'yyy'
// })

//=================================== 案例二 =======================================
/* 
    由于 p2 和第一个 then 是同一个对象，所以会报错【都是第一个 then 返回的 promise ，但是由于 then 成功与失败的回调函数都是异步，所以执行
    第二个 then 的时候已经把 this 的发布订阅的消息队列添加了函数，所以打印出来发布订阅的消息队列里才会有函数】
*/
let p2 = new Promise((resove, reject) => {
    resove(1)
}).then((data) => {
    return p2
})
p2.then(()=>{
    return 'xxxoo'
},(e)=>{
    console.log(e);
    // return 'yyy'
})