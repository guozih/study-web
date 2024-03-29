/* 
    node提示 npm install @types/node【仅仅为了代码提示】
*/
/* 
    JS组成  ：DOM，BOM，ECMA
    Node组成：ECMA，内置模块，第三方模块
*/
/*
    node内部【底层】采用多线程，但是主线程是单线程【就是用来调度同步代码和回调函数的】
    多线程的概念：内部操作文件
    node中为了实现 i/o 操作 自己实现了一个 libuv（事件环）
*/
/*  node是一个把JS运行在服务器的一个环境，node不去操作DOM和BOM，但是node自己写了一套I/O用于文件操作，是基于事件驱动异步非阻塞I/O
        java：默认多线程访问同一个资源，需要加锁【多个人操作一个资源】
              在高并发场景下，多线程在不停的切换时间片【切换时间片：执行一个任务到一半再去执行其他的任务】
            ** 并发：同一时间对同一个服务器同时访问【假设同时发送10个请求，但是服务器还是会一个一个处理】
            ** 并行：在不同的CPU下执行操作【多核CPU都有自己的线程，假设请求太多，那么就把不同的请求分配的不同的CPU内核下进行处理】
                【采用多线程的方式让系统更加稳定，而且可以实现高并发】
                【想解决高并发，前提是得需要多核CPU，进行多线程处理】
                【webpack会判断CPU的内核，可以实现多线程打包】
        node：因为是单线程，不存在锁的概念
              适合处理I/O密集型的，不适合处理cpu密集型的【压缩，加密【要用到大量的cpu处理】】【意思就是处理一个【请求后的回调】要花费好长时间，那么会造成后面回调的阻塞】
        异步造成非阻塞：对于node来说，主线程处理一个请求的时候【文件读取】先会放到任务队列里边，底层的libuv库负责将任务队列中不同的任务分配给不同的线程去执行
                        那么这时主线程会继续执行以下的代码【不会造成阻塞】，假如这时文件读取完成，主线程空闲后再进行回调进行处理【主线程起到一个往返调度的作用】【事件循环】
        同步造成阻塞：对于Java同步来说，一个线程【文件读取】,那么它会等待文件读取后的内容，这样就会造成后面的代码无法执行，后面的同步代码或者请求无法处理【只针对对一个线程来讲】
        node优点：适合处理请求多，但是处理回调量小的【单线程处理，处理量大的话会导致后边的的回调卡死】
        java优点：适合处理请求多，但是处理回调量大的【多线程同步，一个线程处理事情时，它会一直等待，其他请求让其他线程去处理】
*/
/* 
    node为了实现模块化，会在执行代码时，外层包装一个函数，这个函数执行的时候，会改变this指向
*/
console.log(__dirname, __filename);
const { fstat } = require('fs');
const path = require('path')
const fs = require('fs')
// require('./commonjs的实现/a')
console.log(path.resolve(__dirname, __filename));
console.log(this); //这个是 {} 
function a() {
    console.log(this);
}
a.call(this)  //上边的 console.log(this) 在用 node 执行的时候相当于是这样的
// console.dir(global, { showHidden: false }); //showHidden 显示隐藏的属性

// __dirname, __filename, exports, module, require 这些都是全局变量，但是不能用 global 去访问【global.__dirname】【这5个全局变量是通过 node 包装的函数传过来的参数】
// console.log(global.process);