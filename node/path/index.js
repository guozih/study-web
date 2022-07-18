const path = require('path');
/*  
    【见例子1.1】
    join【路径拼接】 和 resolve的区别
    如果路径中带/的，join会忽略，resolve会转到根目录
*/
// ===================================== 例子1.1 =================================
console.log(path.join('a','/////b'))
console.log(path.resolve('a','/b'));
/*  
    【见例子1.2】
    如果不写 __dirname ，那么 resolve 会自动以当前运行目录【process.cwd()】为目录加上后面的路径
*/
// ===================================== 例子1.2 =================================
console.log(process.cwd());
console.log(path.resolve('a','b'));
console.log(path.resolve(__dirname,'a','b'));