/* 
    Promise【包括then】只有两种情况是失败： 1. 执行报错
                               2. 自己手动修改失败的状态 
*/

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

//处理 then 返回的值是否是 Promise
function resolvePromise(promise, res, resolve, reject) {
    //判断 res 是什么类型，如果是一个普通值，则调resolve就可以了
    //如果是 Promise 的要看它返回的成功的还是失败的，再考虑调用哪个
    // console.log(promise);
    // console.log(res);
    if (promise == res) {
        reject(new TypeError('Chaining cycle detected for promise'))
        return;
    }

    // 判断返回的
    if ((typeof res === 'object' && res !== null) || typeof res === 'function') {
        try {
            let then = x.then;
            if(typeof then === 'function'){ //确保 then 是一个函数，如果有一个 then 方法就确定它是 promise

            }
        } catch (e) {
            reject(e)
        }
    } else {
        //普通值的情况直接成功即可
        resolve(res);
    }
}

class Promise {
    constructor(exector) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = []; //存放成功的回调
        this.onRejectedCallbacks = []; //存放失败的回调
        const resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn())  //为了处理 exector 里的异步
            }
        }
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn()) //为了处理 exector 里的异步
            }
        }
        try {
            exector(resolve, reject); //这个代码执行的时候可能会发生异常
        } catch (e) {
            reject(e)
        }
    }
    then(onFulfilled, onRejected) {
        //这里的逻辑是返回一个新的 Promise，里边
        let Promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                // setTimeout 为了处理 Promise2 访问报错的问题 Cannot access 'Promise2' before initialization【不能在Promise2初始化之前访问】
                setTimeout(() => {
                    try {
                        let res = onFulfilled(this.value) //拿到上一次 onFulfilled 的返回值
                        resolvePromise(Promise2, res, resolve, reject) //保证下链式调用 Promise 的下一次的返回值
                    } catch (e) { //执行对应的回调时发生异常就执行 reject
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let res = onRejected(this.reason)
                        resolvePromise(Promise2, res, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === PENDING) {
                //为了处理 exector 里的异步
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let res = onFulfilled(this.value)
                            resolvePromise(Promise2, res, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let res = onRejected(this.reason)
                            resolvePromise(Promise2, res, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })
        return Promise2;
        //=============== 这样写容易理解，返回一个 promise，写成上边的因为 new Promise时里边 exector 是同步先执行的，放在里边也可以
        // let res;
        // if (this.status === FULFILLED) {
        //     try {
        //         res = onFulfilled(this.value) //拿到上一次 onFulfilled 的返回值
        //     } catch (e) { //执行对应的回调时发生异常就执行 reject
        //         reject(e)
        //     }
        // }
        // if (this.status === REJECTED) {
        //     try {
        //         res = onRejected(this.reason)
        //     } catch (e) {
        //         reject(e)
        //     }
        // }
        // if (this.status === PENDING) {
        //     //为了处理 exector 里的异步
        //     this.onResolvedCallbacks.push(() => {
        //         try {
        //             res = onFulfilled(this.value)
        //         } catch (e) {
        //             reject(e)
        //         }
        //     })
        //     this.onRejectedCallbacks.push(() => {
        //         try {
        //             res = onRejected(this.reason)
        //         } catch (e) {
        //             reject(e)
        //         }
        //     })
        // }
        // let Promise2 = new Promise((resolve, reject) => {
        // })
    }
}

module.exports = Promise