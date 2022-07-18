function EventEmitter() {
    console.log('xxxxxxxxxx')
    this._event = {};
}
EventEmitter.prototype.on = function (eventName, callback) {
    //这样写是为了继承 EventEmitter，this指向不到实例，会报错，就是为了实现和 class 一样的效果，
    //在自己的实例上加上 _event
    if (!this._event) this._event = {}
    const callbasks = this._event[eventName] || [];
    callbasks.push(callback);
    this._event[eventName] = callbasks;
}
EventEmitter.prototype.emit = function (eventName, ...args) {
    //这样写是为了继承 EventEmitter，this指向不到实例，会报错，就是为了实现和 class 一样的效果，
    //在自己的实例上加上 _event
    if (!this._event) this._event = {}
    const callbasks = this._event[eventName];
    if (callbasks) {
        callbasks.forEach(cb => cb(...args))
    }
}
EventEmitter.prototype.off = function (eventName, callbask) {
    if (!this._event) this._event = {}
    if (this._event[eventName]) {
        this._event[eventName] = this._event[eventName].filter(fn => fn !== callbask && fn.l !== callbask)
    }
}
EventEmitter.prototype.once = function (eventName, callbask) {
    if (!this._event) this._event = {};
    const one = (...args) => {
        //执行完成之后，再删除
        callbask(...args);
        this.off(eventName,one);
    }
    /* 
        这句话的意思是为了 让one函数和用户自己定义的函数进行绑定关系，如果不写，下边这个取消就会失效，
        因为我们里边绑定的是one，而用户取消的是shopping
        once('shopping');off('shopping');
    */
    one.l = callbask; 
    //先绑定事件
    this.on(eventName,one);
}
module.exports = EventEmitter
