/* 
    Buffer 是node中的16进制 内存的标识全部用二进制表示【buffer表示的是内存地址】
    二进制中需要8个位【最大11111111】，用16进制来表示我们整个大小会小一些【最大ff】
    Buffer 代表的是内存 如果一旦声明好，不能扩展的【随意更改大小】【声明Buffer的时候需要指定大小】
    如果想要更改 Buffer 大小，改小可以截取内存，改大的话需要创造一个大的内存空间，将数据拷贝过去
    buffer可以存储数据，可以和字符串相互转化
    当用fs读取文件时，不指定编码时，全部都是buffer类型【十六进制】【但是取出来的值都是十进制【这个十进制代表的是ascii码】】
    【见例子1.5】
    buffer修改某一项修改的是内存地址里边的值【见例子1.6】
    length alloc from slice concat copy isBuffer
*/

// ===================================== Buffer的用法 =======================================
/* 
    老的用法：new Buffer() 【见例子1.1】【和Buffer.from('字符串')功能一样】
*/
/* 
    新用法：Buffer.alloc(3) 3代表3个字节，最小3个字节【创建一个长度为n的空buffer】【见例子1.2】
            Buffer.form([1,2,3]) 放数组，数组里边只能放数字【默认是要传十六进制，如果不是16进制，会把传的数字转化为16进制】
            【不能放不识别的东西（汉字，英文字母等）】【数组里边的数字仅代表这个字节在内存中要存储数据的16进制表示数，而不是在内存中存储的内容】
            【最大256就是16进制的ff，如果大于256，那么就取余】【很少使用，因为需要指定存放的内容】【见例子1.3】
            Buffer.from('啦啦啦') 放字符串，把字符串转化为 buffer【见例子1.4】
*/
/* 
    from() 参数为字符串【编码规范，常用的有utf8、base64】
*/
//=============================== 例子1.1 =============================
// const buf1 = new Buffer('a')
// console.log(buf1);
//=============================== 例子1.2 =============================
let buf2 = Buffer.alloc(3)
console.log(buf2);
//=============================== 例子1.3 =============================
let buf3 = Buffer.from([257, 2, 3])
console.log(buf3);
buf3 = Buffer.from([0x48, 0x45, 0x4c, 0x4c, 0x4f])
console.log(buf3.toString());
//=============================== 例子1.4 =============================
let buf4 = Buffer.from('我')
console.log(buf4);
//=============================== 例子1.5 =============================
const fs = require('fs')
let buf5 = fs.readFileSync('./1.txt') //<Buffer 31 32 33 34 35 36 37 38 39>【十六进制】
console.log(buf5);
console.log(buf5[buf5.length - 1]); //57 代表的是ascii码【buf5.length指的是字节的大小，不是内容的大小】
//=============================== 例子1.6 =============================
let buf6 = Buffer.from([49, 50, 51, 52])
console.log(buf6);
let buf7 = buf6.slice(0, 2)
buf7[0] = 53;
console.log(buf6);
console.log(buf7);
//=============================== 例子1.7【buffer的拷贝】=============================
// copy可以指定要复制哪些过去，concat不行
// Buffer.prototype.copy = function (target, targetStart, sourceStart, sourceEnd) {
//     for (let i = sourceStart; i < sourceEnd; i++) {
//         target[targetStart++] = this[i]
//     }
// }
let buf8 = Buffer.from('我的')
let buf9 = Buffer.from('蛋糕')
let bigBuf1 = Buffer.alloc(12);
buf8.copy(bigBuf1, 0, 0, 6)   //参数解析：目标buffer，目标buffer的开始节点，源buffer的开始节点，源buffer的结束节点
buf9.copy(bigBuf1, 3, 0, 6)
console.log(bigBuf1);
console.log(bigBuf1.toString());
//把几个buffer合成一个buffer
Buffer.concat = function (bufferList, len) {
    if (len == undefined) {
        len = bufferList.reduce((preVal, val) => preVal + val.length, 0)
    }
    let bigBuf = Buffer.alloc(len);
    let start = 0;
    for (let i = 0; i < bufferList.length; i++) {
        if(Buffer.isBuffer(bufferList[i])){
            bufferList[i].copy(bigBuf, start, 0, bufferList[i].length)
            start += bufferList[i].length
        }
    }
    return bigBuf;
}
let buf10 = Buffer.from('我的')
let buf11 = Buffer.from('蛋糕')
let bigBuf2 = Buffer.concat([buf10, buf11,'qwe'])
console.log(bigBuf2.toString());