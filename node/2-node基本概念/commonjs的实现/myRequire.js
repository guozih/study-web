// const { Module } = require("module");
const path = require('path');
const fs = require('fs');
const vm = require('vm')
function Module(id) {
    this.id = id; //绝对路径
    this.exports = {} //模块对应的导出结果
}

Module._extensions = {
    '.js'(module) {
        //读取文件信息
        let scripts = fs.readFileSync(module.id, 'utf-8')
        //包装函数成为字符串
        let template = `(function(exports,module,require,__dirname,__filename){${scripts}})`
        //把函数字符串转化为函数，创建一个全新的环境，不受外界影响
        let compileFunction = vm.runInThisContext(template)
        let exports = module.exports; //为了实现一个简写
        let thisValue = exports;
        let filename = module.id;   // this = exports = module.exports = {}
        let dirname = path.dirname(filename)
        //call 的第一个参数是要指向的 this 后面的全部都是参数
        compileFunction.call(thisValue, exports, module, myRequire, dirname, filename)
        // console.log(compileFunction.toString());
    },
    '.json'(module) {
        //读取文件信息
        let jsonData = fs.readFileSync(module.id, 'utf-8')
        //直接将json挂到exports对象上，这样用户可以直接require一个json文件，拿到的就是json内容
        module.exports = JSON.parse(jsonData);
    }
}

Module._resolveFilename = function (filename) {
    //拼接出来一个绝对路径，不能直接用 filename，因为有的node版本在哪里执行的文件，就以哪个目录为基准，以免 filename 中以相对路径引入其他文件找不到 
    // 1.用户如果加了后缀名，那么就返回绝对路径
    const filePath = path.resolve(__dirname, filename)
    let exists = fs.existsSync(filePath) //判断这个路径的文件的路径是否存在【如果没有后缀名就不存在，那么会继续走下面的逻辑】
    if (exists) return filePath
    //尝试添加 .js 或者 .json 文件
    //获取 Module._extensions 中所有的 key
    // 2.如果没有加后缀名，则循环 Module._extensions 【策略模式】，依次查找对应后缀名的文件
    let keys = Reflect.ownKeys(Module._extensions)
    for (let i = 0; i < keys.length; i++) {
        let newPath = filePath + keys[i];
        if (fs.existsSync(newPath)) return newPath
    }
    // 3.没有找到就报错
    throw new Error('module not found')
}

Module._cache = function () { //用来做缓存的

}

Module.prototype.load = function () {
    let extension = path.extname(this.id);
    Module._extensions[extension] && Module._extensions[extension](this)
    // this.id  //要加载的后缀名
}

function myRequire(filename) {
    //1.获取文件的绝对路径
    const filePath = Module._resolveFilename(filename)
    console.log(filePath);
    let exists = Module._cache(filePath);
    //如果缓存里有，那么就把缓存里的东西拿出来
    if (exists) {
        return exists.exports;
    }
    //2.创建一个模块
    let module = new Module(filePath)
    //3.放到缓存中
    Module._cache[filePath] = module;
    //4.获取模块中的内容，包装函数，让函数执行，用户的逻辑会给 module.exports 赋值
    //这里必须放到原型上，因为要具体到加载哪个模块，Module上的静态方法拿不到 this.id 
    //也从语义上分析，是 module 的一个属性【加载】
    module.load()
    return module.exports;
}

const a = myRequire('./a')
console.log(a);