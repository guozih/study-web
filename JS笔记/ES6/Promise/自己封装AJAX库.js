(function anonymous(){
  class MyAjax{
    constructor(options){
      //options=>最终处理好的配置项
      this.options = options;
      return this.init();
    }
    init(){
      //解构出我们需要的参数配置
      let {url,baseURL,method,headers,params,cache,data,timeout,withCreadntials,responseType,transformRequest,transformResponse} = this.options;
      let GET_REG = /^(GET|DELETE|HAED|OPTIONS)$/i;
      //请求的API地址的特殊处理
      //1、拼接完成地址
      url = baseURL + url;
      //2、GET系列请求下，要把params或者cache指定的随机数，以问号参数的方式拼接到URL末尾
      if(GET_REG.test(method)){
        let ask = _ajax.checkASK(url);
        if(params !== null){
          url += `${ask}${_ajax.paramsSerializer(params)}`;
        }
        if(!cache){
          //随机数的属性名一般用_,因为项目中后台发现传递的是_,一般就不做这个传递值的处理（约定俗称的规范，根据JQ中的规则来的）
          url+=`${ask}_=${Math.random()}`;
        } 
      }

      //请求主体传递参数的处理（POST系列）
      if(!GET_REG.test(method)){
        if(typeof transformRequest === 'function'){
          data = transformRequest(data);
        }
      }
      //基于Promise管理AJAX发送
      return new Promise((resolve,reject)=>{
        let xhr = new XMLHttpRequest;
        xhr.open(method,url);
        //额外的配置配置（例如请求头信息）
        xhr.timeout = timeout;
        xhr.withCredentials = withCreadntials;
        if(headers !== null &&  typeof headers === 'object'){
          for(let key in headers){
            if(!headers.hasOwnProperty(key)) break;
            xhr.setRequestHeader(key,headers[key]);
          }
        }
        xhr.onreadystatechange = ()=>{
          let status = xhr.status,
              statusText = xhr.statusText,
              state = xhr.readyState,
              result = null;
              
          if(/^2\d{2}$/.test(status)){ 
            if(state == 4){
              //一般服务器返回的结果都是JSON字符串，如果想要拓展更多可能情况，可以在
              //配置项中增加一个 responseType 来根绝类型做不同的处理
              result = xhr.response;
              responseType === 'json' ? result = JSON.parse(result) : null;
              //处理响应头
              let responseHeaders = {},
                  responseHeadersText = xhr.getAllResponseHeaders();
              responseHeadersText=responseHeadersText.split(/\n+/g);
              responseHeadersText.forEach(item=>{
                let [key,value] = item.split(': ');
                if(key.length === 0) return;
                responseHeaders[key] = value; 
              })
              resolve({
                config:this.options,
                request:xhr,
                status,
                statusText,
                data:result,
                headers:responseHeaders
              });
            }
            return;
          }
          reject({
            config:this.options,
            request:xhr,
            status,
            statusText,
          })  
        };
        xhr.send(data);
      }).then(result=>{
        //transformResponse处理返回后的结果
        if(typeof transformResponse === 'function'){
          result = transformResponse(result);
        }
        return result;
      });
    }
  }
  //定义AJAX对象和默认参配置
  let _ajax = {};
  _ajax.defaults = {
    url:'',
    baseURL:'',
    method:'get',
    headers:{},
    //=>axios中没有，但是JQ中有，清除get请求中的缓存（如果设置为false，则在所有get请求的末尾追加一个随机数作为参数，一次保证  每次请求的地址不同，从而清除缓存）
    params:null,
    //是否清楚缓存  true为缓存
    cache:true, 
    data:null,
    timeout:10000,
    withCreadntials:false,
    responseType:'json',
    //POST请求先走这个函数，我们在函数中可以把基于请求主体传递的内容做特殊处理
    transformRequest:null,
    //接收到服务器成功返回的结果后，我们把返回的结果进行处理
    transformResponse:null,
  }

  //用户传递的配置项，替换默认的配置项
  let init = function (options = {}){
    //处理headers这种二级结构合并替换
    _ajax.defaults.headers=Object.assign(_ajax.defaults.headers,options.headers);
    delete options.headers;
    return Object.assign(_ajax.defaults,options);
  }
  //并发多个AJAX请求，待所有请求都成功后做一些事情
  _ajax.all = function (requestArr){
    return Promise.all(requestArr);
  };

  //GETx系列请求
  ['get','delete','head','options'].forEach(item=>{
    _ajax[item] = function (url,options={}){
      options.url = url;
      options.method = item;
      return new MyAjax(init(options));
    }
  });

  //POST系列请求
  ['post','put'].forEach(item=>{
    _ajax[item] = function (url,data={},options={}){
      options.url = url;
      options.data = data;
      options.method = item;
      return new MyAjax(init(options));
    }
  });
  //提供一些对内和对外都有用的公共方法
  _ajax.paramsSerializer = function(obj){
    //把对象变为 x-www-form-urlencode格式
    let str = ``;
    for (let key in obj){
      if(!obj.hasOwnProperty(key)) break;
      str += `&${key}=${obj[key]}`;
    }
    str = str.substring(1);
    return str;
  }

  _ajax.checkASK = function (url){
    //验证地址中是佛存在问号，来决定地址中用谁
    return url.indexOf('?') < 0 ? '?' : '&';
  }
  window._ajax = _ajax;
})()
_ajax.get('./data.json').then(result=>{
  console.log(result);
})