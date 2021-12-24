// node 主线程是单线程非阻塞异步IO，其中实现就是 Events 模块【发布订阅模式】
// 发布订阅模式 on：订阅  emit：发布 off：取消订阅 once：只执行一次
// ===========================================
const EventEmitter = require('./events');
function Eat1() { 
    //这样也可以把 EventEmitter 里边的this指向到Eat1的实例
    // EventEmitter.call(this)  
}
//这句话实际上为了实现原型继承【但是不会属性继承】【Eat1.prototype.__proto__ = EventEmitter.prototype】
Object.setPrototypeOf(Eat1.prototype, EventEmitter.prototype)
// class Eat1 extends EventEmitter{}【属性原型都继承】
const events = new Eat1(); //这样events查找不到，就会找到events.__proto__【即Eat1.prototype】，继续再找到 Eat1.prototype.__proto__
//这里订阅一些事件，可以订阅多个相同的事件名【可以传接收多个参数】
events.on('eat', function (data1, data2) {
    console.log('eat1', data1, data2);
})
// events.on('eat', function (data) {
//     console.log('eat2', data);
// })
// const eat3 = function (data1, data2) {
//     console.log('eat3', data1, data2);
// };
// events.on('eat', eat3)
// events.once('eat',function (){    //这个是执行完就取消绑定
//     console.log('只执行一次')
// })
// events.off('eat') //这样写会报错，意思是需要取消订阅的哪一个key【即函数】
// events.off('eat',eat3) //这里的意思是 取消绑定eat事件中为eat3函数【函数即key】
//这里发布事件，发布的事件名要和订阅的事件名一样
events.emit('eat', '米饭', '面条')
events.emit('eat', '米饭', '面条')
//=====================================================
    //实现一个一订阅就能发布的机制，这里的 nextTick 是异步，会优先于Promise执行
    // process.nextTick(function(){
    //     events.emit('eat','米饭','面条')
    // })
