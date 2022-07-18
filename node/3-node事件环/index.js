/* 
    node中自己实现一套事件环【新版本中node执行结果和浏览器执行结果一致】底层实现的方式不太一样
        浏览器中宏任务只有一个队列，
        node中，setImmediate、setTimeout属于宏任务，node创造了多个宏任务队列【timer队列，poll队列，check队列】
======================================= 事件环 =====================================
    1.timer阶段【setTimeout放在这里】在 i/o回调之前执行
    2.poll阶段【放i/o操作】
    3.check阶段【setImmediate放在这里】在 i/o回调之后执行
===================================================================================
    * node代码从上到下执行代码 -》 清空 nextTick  -》 清空微任务【queueMicrotask、promise.then】-
        取出一个宏任务执行【再清空微任务，依次循环】，当到达 poll 阶段后，如果 check 阶段为空，而且 poll 阶段里面也没有 i/o 操作，此时，
        不会继续轮询，会等待 timer 阶段定时器到达事件重新执行，或者有新的 i/o 操作进入到 poll 阶段
    queueMicrotask、promise.then 都是v8语言自己提供的，并不是node自己实现的
    【见例子1.1】setTimeout、setImmediate【按事件环的顺序应该先执行setTimeout，但是会受到计算机性能的约束，不一定哪个先执行】
    【见例子1.2】node代码执行，进入 timer 宏任务，看没有可以执行的代码；接下来进入 poll 阶段，执行i/o回调，
        回调中把 setTimeout 放到 timer 队列中，setImmediate 放到 check 中。那么执行完 poll 阶段，再去执行 check 队列，
        那么无论如何都是 setImmediate 先执行。
*/

//===================================== 例子 1.1 =========================================
// setTimeout(()=>{console.log(1);},0)
// setImmediate(()=>console.log(2));

//===================================== 例子 1.2 =========================================
// const fs = require('fs');
// const process = require('process')
// Promise.resolve().then(()=>{
//     console.log(1234);
// })
// fs.readFile('../lx.js',()=>{
//     process.nextTick(()=>{console.log(1);})
//     console.log(2);
//     Promise.resolve().then(()=>{
//         setTimeout(() => {
//             console.log(3);
//         }, 0);
//     })
//     setTimeout(() => {
//         console.log(4);
//     }, 0);
//     setImmediate(() => {
//         console.log(5);
//     });
// })
//===================================== 例子 1.3 =========================================
setTimeout(() => {
    Promise.resolve().then(()=>{
        console.log(1);
    })
}, 0);
setTimeout(() => {
    console.log(2);
}, 0);
setImmediate(() => {
    console.log(3);
});