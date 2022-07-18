const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

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
        if (this.status === FULFILLED) {
            onFulfilled(this.value)
        }
        if (this.status === REJECTED) {
            onRejected(this.reason)
        }
        if (this.status === PENDING) {
            //为了处理 exector 里的异步，利用发布订阅模式，先放到一个数组里面
            this.onResolvedCallbacks.push(() => {
                onFulfilled(this.value)
            })
            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason)
            })
        }
    }
}

module.exports = Promise