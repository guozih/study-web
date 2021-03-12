/* 
  正则表达式
    只能处理字符串
    它是一个规则：可以验证字符串是否符合某个规则（test），也可以把字符串符合规则的内容捕获到
    (exec/match)。每一个正则都是 RegExp 的实例
    test ：可以判断当前字符串和当前字符串是否匹配。是就返回 true ，不对就返回 false。
    exec ：把当前字符串符合这个正则的 捕获到
*/

/* 
  编写一个正则表达式：
    字面量创建： 【两个斜杠之间包起来的，都是用来描述规则的元字符】
      let reg = /\d+/;
    构造函数模式创建。两个参数：元字符字符串，修饰符字符串
      let reg = new RegExp("\\d+"); 这里的第一个 \ 是用来转义的
      因为构造函数中得写字符串，那么 \d+ 中的 \d 会被转义，成为字母 d ,因此要在它之前再加 \ 防止它的转义，把有意义的 \d 变成无意义的
*/

/* 
  正则表达式有两部分组成
    元字符【常用的元字符有如下几种】
      元字符的分类：
        1。量词元字符【设置出现的次数】
          1  *      【0到多次】 【可以不出现】
          2  +      【一到多次】【最少出现一次】
          3  ?      【零次或者一次】【最少出现一次】
          4  {n}    【出现n次】
          5  {n,}   【出现n到多次】
          6  {n,m}  【出现n到m次】
        2。特殊元字符【单个或者组合在一起代表特殊的含义】【大写和小写的意思是相反的】
          1  \      【转义字符】【把有意义的变成无意义的，把无意义的变成有意义的】
          2  .      【除\n(换行符)以外的任意字符】
          3  ^      【以哪一个元字符作为开始】 (kan 瑞 te)   
          3  &      【以哪一个元字符作为结束】
          4  \n     【换行符】【n原本是一个字符，结果 \ 转义了就变成了换行符】
          5  \d     【0-9之间的数字】【n原本是一个字符，结果 \ 转义了就变成了0-9之间的数字】
          6  \D     【非0-9之间的数字】【大写和小写的意思是相反的】
          7  \N     【除\n(换行符)以外的任意字符，也就是 . 】
          8  \w     【数字、字母、下划线中的任意一个字符】 \W【非数字、字母、下划线中的任意一个字符】
          9  \s     【一个空白字符】【包含空格、制表符、换页符等】
          10 \t     【一个制表符】【一个TAB键：四个空格】
          11 \b     【匹配一个单词的边界】
          12 x|y    【x或者y中的一个字符】 【1|3|5：1或者3或者5中的任意一个字符】
          13 [xyz]  【x或者y或者z中的一个字符】 【[abcdefg]：这一串中的任意一个字符】
          14 [^xy]  【除了x或者y以外的任意字符】
          15 [a-z]  【指定a-z这个范围内中的任意字符】【[0-9a-zA-Z_]：0-9或者a-z或者A-Z或者_中的任意一个字符(相当于\w)】
          16 [^a-z] 【除了a-z以外的所有字符】
          17 ()     【正则中的分组符号】
          18 (?:)   【只匹配不捕获】
          19 (?=)   【正向预查】
          20 (?!)   【负向预查】
        3。普通元字符【代表本身含义的】
          1 /123/   【此正则匹配的就是123，没有其他意思】
    修饰符【常用的修饰符】
      1   i【ignoreCase(在 RegExp.prototype 上)】【忽略单词大小写匹配】
      2   m【multiline】【忽略换行匹配，就是可以进行多行匹配】
      3   g【global】【全局匹配】
*/

/* 
  /A/.test('lalala')  => false  【/A/表示是匹配一个大写字母A，没有匹配到返回 false 】
  /A/i.test('lalala') => true
*/