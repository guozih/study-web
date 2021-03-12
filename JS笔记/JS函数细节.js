//================================================== parseInt ==================================================
/* 
  parseInt(string, [[radix]]) ：以 radix 进制为基数找到 小于radix进制的数（从左到右查找，有一项不符合就返回，并把查找到的以 radix进制 再转化为 10进制）
    string：要转换的字符串 (不是字符串就转化为字符串)
    radix：进制数（2-36之间，【不传值、0】默认是10进制，剩下的不在这个范围之内的 parseInt 都返回 NaN ）
    不是找不到有效数字也会返回NaN
*/
/* 进制转化：从要转化数的个位依次乘以 进制数的次方（从0开始依次递增），任何值的0次方都是1 */
parseInt('12px',3); /* 12px字符串开始从左往右查找属于3进制的数（小于3的数）找到p，不符合直接返回12），然后进行计算*/ 
                    /* 1*3+2 => 5*/ /* 1乘以3的1次方加2*3的0次方 */
parseInt(''); /* 空字符串转为NaN */
parseInt([]) /* [].toString(),空字符串转为NaN */
parseInt([1,2]) /* [].toString()=>1,2,转为1 */
[1,2,3,4].map(parseInt); /* [1,NaN,NaN,NaN] */
/* 
  map的回调接收3个参数，第一个是数组中的每一项的值，第二个参数是下标，第三个参数是当前数组。
  正因如此 parseInt的前两个参数分别接收的是 数组中的每一项的值 和 下标。
  因此 第一次循环 parseInt(1,0)  0 默认是10进制 返回 1
      第二次循环 parseInt(2,1)  1 不在2—36之间 直接返回 NaN
      第三次循环 parseInt(3,2)  2 找不到2进制的数（小于2的数） 返回 NaN
      第四次循环 parseInt(4,3)  3 找不到3进制的数（小于3的数） 返回 NaN
*/

//================================================== indexOf ==================================================
/* 
  indexof(value,index)   返回第一次出现的指定值的索引，从 index 下标处进行搜索。如果未找到该值，则返回 -1
  value 不传 默认为 undefined
  index 不传 默认为 0
*/
'12'.indexOf()  /* => -1 ,value默认 undefined*/ 
/* 
  如果 value 为空字符串时，且 index 不传或者小于 this【字符串的length长度】，那么直接返回 index 
*/
'hello world'.indexOf('') // 返回 0
'hello world'.indexOf('', 0) // 返回 0
'hello world'.indexOf('', 3) // 返回 3
'hello world'.indexOf('', 8) // 返回 8
/* 
  如果 value 为空字符串时，且 index 大于 或者 等于 this【字符串的length长度】，那么返回该字符串的长度
*/
'hello world'.indexOf('', 11) // 返回 11
'hello world'.indexOf('', 13) // 返回 11
'hello world'.indexOf('', 22) // 返回 11

