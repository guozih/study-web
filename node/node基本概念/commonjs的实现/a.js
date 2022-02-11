let a = 100;
setInterval(() => {
    a++;
}, 1000)
module.exports = 100  //这样导出，由于缓存，引用方永远拿不到最新的值


let a = 100;
setInterval(() => {
    a++;
}, 1000)
module.exports = { a } //这样导出，虽然看似是导出一个对象，但是 node 缓存了第一次的值也就是 {a:100}，
// 那么下次新导出的对象【新的内存地址】是不会缓存的


let obj = { a: 100 };
setInterval(() => {
    obj.a++;
}, 1000)
module.exports = obj //这样导出，是一个对象，node 第一次缓存 {a:100}，但是定时器每次改变的是第一次缓存对象里边的 a
//这样打印出来 a 会依次递增