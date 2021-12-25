//这是一个 webpack 会默认读取的配置文件
let path = require('path'); // path 是 node 自带的一个包
//webpack 是基于  node，node 导出用的 commonjs 的规范。因此导出也应该写成commonjs的规范
// require exports module __dirname __filename 【都是这个文件的私有变量，node会把这个文件打包成一个JS闭包，从中做了处理】
// __dirname 当前文件所在文件夹的绝对路径【C:\Users\g1662\Desktop\我的资料\study-web\webpack】
// __filename 当前文件的绝对路径【C:\Users\g1662\Desktop\我的资料\study-web\webpack\webpack.config.js】
let { CleanWebpackPlugin } = require('clean-webpack-plugin') //打包之前会把打包目录里的文件全部删掉
let htmlWebpackPlugin = require('html-webpack-plugin'); //指定HTML模板，创建一个 script 标签插入到 body 里面
module.exports = {
  //这个对象里面都是 webpack 的配置项
  //mode：模式 控制是 生产环境 还是 开发环境，默认是 production
  mode: 'production', //【生产环境】，这个打包完的js是一个压缩文件，只有一行代码
  // mode: 'development',//【开发环境】，这个打包完的js里面有好多代码
  entry: './src/a.js',  //配置主入口文件的【现在配置到了'./src/a.js'】，默认是 ./src/index.js
  output: {
    // filename: 'haha.js', //把打包压缩后的代码 放到那个文件 叫什么名字。默认是 mian.js
    filename: 'haha.[hash:5].js', //打包完 haha.【自动生产的哈希值，webpack会根据正则去匹配】.js【:5是控制随机字符串的位数】【防止用户端缓存】
    path: path.resolve(__dirname, 'myapp')// 配置的是把生产好的haha.js放到哪个位置。【需要一个绝对路径，默认是 当前目录下的 dist 目录】
    // path.resolve 字符串路径的合并
  },
  plugins: [//插件的一些东西
    new CleanWebpackPlugin(),
    //只需要在制定的模板里面写上html模板【!回车】即可。打包时会创建一个 script 标签插入到 body 里面【如果模板里面没有内容，那么也会插入到文件里面，只是这个文件只有一个 script 标签，浏览器运行会出现乱码】。
    new htmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    })
  ]
}