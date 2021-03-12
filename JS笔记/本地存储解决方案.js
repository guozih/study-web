/* 
  【服务器端存储】
    + 数据库
    + Redis缓存
    + session(和客户端的cookie有关联)
  【客户端本地存储】
    访问客户端本地存储的信息，受“浏览器”、“源”的限制（信息存储在客户端本地，物理磁盘的某一个位置，但是信息都是经过加密或者编码的，非专业人士无法破解）
    本地存储的信息都是明文的，所以需要严格保密的信息慎重存储到本地（加密）
      + cookie
      + H5中提供的webStorage
        + localStorage
        + sessionStorage
      + 本地书籍库存储
        + WebSQL
        + IndexedDB（等）
*/    
/* 
  cookie 和 localStorage 对比
    1、cookie兼容大部分浏览器（包括IE6）,localStorage是H5中新增的API，不兼容低版本浏览器（例如：IE6-8）
    2、本地存储的COOKIE信息，在发送AJAX请求的时候，会在请求头中自动携带，传递给服务器（cookie虽然是本地存储，但是总会在客户端和服务器端传来传去）
       但是 localStorage 是不会这样传递的
    3、cookie存储的内容比 localStorage 要小很多，一般同一个源下，cookie最多存储4KB，localStorage可以存储5MB（所以存储一些代码信息或者一些数据信息，我们应该使用localStorage）
    4、cookie 不稳定，会被一些特殊情况给干掉（cookie本身是有周期的），例如：使用360，或者浏览器本身自带的清理历史记录等功能清理电脑的时候，就是易把存储的cookie信息给干掉
       这写清理工具都清楚不掉 localStorage (localStorage是持久化保存在客户端本地，除非手动清楚，没有生命周期的限制)
    5、cookie 可能会被禁用（例如：浏览器的无痕浏览模式）

  localStorage 和 sessionStorage 对比
    1、localStorage是持久化存储到本地，而 sessionStorage 是会话存储。也就是：页面关掉（刷新不算），
       当前存储的 sessionStorage 就会被清除掉
*/  