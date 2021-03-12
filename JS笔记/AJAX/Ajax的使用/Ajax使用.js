/* 
  发送AJAX请求的四步步骤
    1。创建一个XHR对象
        不兼容 XMLHttpRequest 的浏览器【IE6】使用 ActiveXObject 创建
    2。打开请求连接（配置请求信息）
        xhr.open(【请求方式】【URL】【ASYNC】【USER-NAME】【USER-PASS】);
          【请求方式】 分为： GET 系列、POST 系列
          【ASYNC】    是否为异步请求，默认是true，也就是异步。设置为false代表同步
          【USER-NAME】【USER-PASS】 向服务器发送请求时所携带的用户名密码，只有在服务器设置了安全来宾账号的情况下需要（一般不用）     
    3。监听请求状态，在不同状态中做不同的事情
    4。发送AJAX请求（AJAX任务开始，直到响应主体信息返回【AJAX状态为4】代表任务结束）
*/
/* 
  GET系列 vs POST系列
    不管是哪一种请求方式，客户端都可以把信息传递给服务器，服务器也可以把信息返回给客户端。
    GET偏向于拿数据（获取数据【给的少得到的多】），而POST偏向于提交数据（给的多得到的少）
    【GET系列】：GET
                HEAD：只获取响应头的信息，不获取响应主体内容)
                DELETE：删除，一般代指删除服务器上的指定文件)
                OPTIONS：试探性请求，在 CROSS(跨域请求)中，所以正常请求发送前，先发送一个试探请求，验证是否可以和服务器正常的建立连接
    【POST系列】：POST
                  PUT：新增，一般代指向服务器中新增文件
    传递给服务器的数据格式【通常】有以下几种
      application/x-www-form-urlencoded （最终形成这种格式 xxx=xxx&xx=xx【字符串】）
        (换句话说，xxx=xxx&xx=xx 这种方式请求的都会形成 application/x-www-form-urlencoded 这样的数据格式，不管是GET还是POST)）
      multipart/form-data（很常用，例如：表单提交，文件上传(都是这样的格式传递给服务器)）【对象】
      raw（可以长传text、json、xml、html等格式的文本、富文本编辑器中的内容也可以基于这种格式传递）
      binary（长传二进制数据或者编码格式的数据）
    基于get向服务器发送请求，传递给服务器【通常】有以下几种方式
      基于请求头传递给服务器（比如想把本地的 Cookie 信息传递给服务器）
      基于URL地址后面的问号传参（xhr.open('get','./data.json?id=1&name=狗蛋),这样传递过去的数据都是 x-www-form-urlencoded 格式的
    基于post向服务器发送请求，传递给服务器【通常】有下几种方式
      基于请求头传递给服务器
      基于请求主体，把信息传递给服务器
*/
let xhr = new XMLHttpRequest;
xhr.open('get','./data.json');