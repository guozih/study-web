## webpack 是基于node运行的，他的配置文件都是需要遵循commonjs规范

#### 使用webpack步骤
  - 初始化一个项目 npm init -y
  - 安装 webpack 和 webpack-cli 两个包
  ```
  npm i webpack webpack-cli --save-dev    //  --save 就是说要把当前安装的包的信息存放到 package.json 中; -dev 相当于告诉 webpack 这个包是开发所需的依赖
  npm i webpack webpack-cli -D    //  -D 是 --save-dev 的缩写
  npm i webpack webpack-cli -dev    //  不加 --save 有时不会放到 package.json 里面
  npm i jquery --save    //  就是说要把当前安装的包的信息存放到 package.json 中默认是生产依赖【生产环境：上线之后要用的】
  npm i jquery --S    //  -S 是 --save 的缩写
  npm i jquery    //  如果不加后面的东西，有时不会放到 package.json。导致别人用的时候不会找到这个依赖包
  ```
  ```
  其实放到生产环境和开发环境没有区别，因为 webpack 是依赖打包【引入哪个包就打包哪个包】【就是为了区分给程序员看的】【vue里面有devDependencies，react里面没有devDependencies(只有dependencies)】
  我们安装错了，可以手动吧开发环境的包放到生产环境。因为 node_modules 就没有区分，根本不知道你放到了哪里
  我们可以在 package.json 里的 scripts 写上【"build":"webpack"】执行 npm run build 就可以打包了【像vue，react框架其实都用这个命令去打包的】
  ```
  ```
  webpack 默认会找 src 下的 index.js 作为入口文件
  webpack.config.js 是一个 webpack 会默认读取的配置文件
  如果打包时，文件内容没变。那么 webpack 就不会生成新的文件，用的是缓存文件【之前的文件】
  ```