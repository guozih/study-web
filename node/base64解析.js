/* 
    优点：base64可以把汉字在http协议中进行传输，可以转化一些较小的图片【较大图片转为base64会比之前更大】
    缺点：转化为base64会比之前大三分之一
*/

/*  
    node 使用的是 utf-8 的编码规范
    拿到在内存中表示的二进制，utf-8中一个汉字占三个字节【一个字节8位】，再把他们分割成每6位表示的二进制，由于每个字节8位，在前边补两个0，再去把分割的每一个
    字节转化为10进制，然后在base64规范表中查找相对应的位置
*/

const bu = Buffer.from('我');
console.log(bu);  /* 利用Buffer拿到所表示的的十六进制 */   /*e6 88 91*/
//拿到在内存中显示的二进制
const two1 = (0xe6).toString(2) /* 11100110 */
const two2 = (0x88).toString(2) /* 10001000 */
const two3 = (0x91).toString(2) /* 10010001 */
// 111001101000100010010001  汉字我 在内存中显示的二进制
// 00111001 00101000 00100010 00010001 分割成每个字节6位的表示
//转化为十进制
const shi1 = parseInt('00111001', 2) //57
const shi2 = parseInt('00101000', 2) //40
const shi3 = parseInt('00100010', 2) //34
const shi4 = parseInt('00010001', 2) //17
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
str += str.toLocaleLowerCase()
str += '0123456789'
str += '+/'
// 在base64规范表中查找对应的位置
let a = str[shi1]
let b = str[shi2]
let c = str[shi3]
let d = str[shi4]
console.log(a, b, c, d)
