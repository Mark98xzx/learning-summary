### 1. ref 操作 dom
-   第一步：设置属性 ref
-   第二步：操作 dom
```javasscript
    // 1. 设置添加 ref 属性
    <img style="border: 1px solid #ccc" id="img" ref="changeImg" :src="img1" alt="">
    // 2. 操作 dom
    this.$refs.changeImg.src = this.img2
```
    参考demo：01-使用ref操作dom.html

### 2. $set 使用
    注意点：
        当 vue 中的 data 加载完成以后，再添加到 data 中的数据是不会有响应式的效果。（因为初始化时Object.defineProperty 对 data 的发布订阅者模式【getter 与 setter】）
    作用：
        可以通过 $set 动态向 data 中添加数据，并且具有响应式的特点   
    参考demo：02-$set的使用.html  

### 3. webpack

#####   3.1 webpack 基本概念
-   官网：https://www.webpackjs.com/
-   作用：打包资源（脚本、样式、图片、表...），将来可以给浏览器来执行打包后的内容

#####   3.2 webpack 的安装
-   作用：
    +   vue-cli 搭建项目结构底层就是用 webpack 来实现的
    +   webpack 可以用来搭建一个项目结构，可以来打包文件

-   全局安装
    +   安装指令：
        +   npm i webpack webpack-cli -g
    +   使用：
        +   在项目文件目录下，打开终端/CMD， 运行：webpack ./src/main.js 
        +   将 src 中的 index.js 进行打包，由于 index.js 中引用了 calc.js ，所以 webpack 将 index & calc 全部打包到了 main.js 中

-   本地安装：
    +   安装指令：
        +   npm i webpack webpack-cli --save
    +   首先需要初始化
        +   npm init -y 生成 package.json 文件
    +   在 package.json 中的 script 中配置脚本
        ```json
            "scripts": {
                "start": "webpack ./src/index.js"
            }
        ```
    +   运行
        +   npm run start

#####   3.3 webpack 的配置文件： webpack.config.js
+   作用：用来设置项目的配置信息
+   步骤：
    +   创建一个文件 webpack.config.js
    +   添加配置信息
        ```js
            module.exports = {
                entry: './src/main.js'
            }
        ```
    +   修改 package.json 中的 script 脚本
        ```json
            "script": {
                "start": "webpack --config webpack.config.js"
            }
        ```
    +   入口
        +   属性：
            +   entry：'路径'
    +   出口
        +   属性：
            +   output：
            ```js
                output: {
                    // 出口文件名
                    filename: 'bundle.js',
                    // 出口文件存放的路径
                    path: path.resolve(__dirname, 'dist')
                }
            ```
    +   模式
        +   mode: 用来设置当前项目的环境
            +   production： 生产环境（文件越小越好）
            +   development：开发环境（文件越详细越好）

    +   source map
        +   作用：添加一个未打包之前代码的映射（将未打包代码的行号也保留一份，可以用来当作报错时的提示信息）
        ```js
            devtool: 'inline-source-map'
        ```
        +   属性：
            +   devtool
                +   inline-source-map 会将映射直接保存到打包的 js 文件中
                +   source-map （建议使用这个）打包会多生成一个 .map 后缀的文件（映射文件）
        +   特点：
            +   文件变大了
    +   解析 引用文件
        +   resolve
            +   extensions 省略后缀
            +   alias 给路径设置别名

##### 3.4 webpack的打包
+   注意点：
    +   webpack 默认只具备打包 js 文件的能力，不具备打包其它文件的能力
    +   可能通过 loaders 包来进行打包

+   打包 css 样式
    +   步骤：
        +   安装 Loader 包
            +   npm install --save-dev style-loader css-loader
        +   在配置文件中配置
            ```js
                module: {
                    rules: [
                        {
                            test: /\.css$/,
                            use: [
                                'style-loader',
                                'css-loader'
                            ]
                        }
                    ]
                }
            ```

+   打包 sass 文件
    +   步骤：
        +   安装 Loader:
            +   npm install sass-loader node-sass --save-dev
        +   配置 scss 的打包信息
            ```js
                {
                    test: /\.scss$/,
                    use: [{
                        loader: "style-loader" // 将 JS 字符串生成为 style 节点
                    }, {
                        loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                    }, {
                        loader: "sass-loader" // 将 Sass 编译成 CSS
                    }]
                }
            ```

+   打包 less 文件
    +   步骤：
        +   安装 Loader
            +   npm install --save-dev less-loader less
        +   配置
            ```js
                {
                    test: /\.less$/,
                    use: [{
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "less-loader" // compiles Less to CSS
                    }]
                }
            ```

+   打包 图片
    +   步骤：
        +   安装 Loader
            +   npm install --save-dev file-loader
        +   配置：
            ```js
                {
                    test: /\.(png|svg|gif|jpg)$/,
                    use: [
                        'file-loader'
                    ]
                }
            ```
    +   打包图片：需将 index.html 文件拷贝到 dist 目录下，否则图片无法正常加载

+   打包 字体文件
    +   步骤：
        +   配置：
            ```js
                {
                    test: /\.(eot|woff2|woff|ttf)/,
                    use: [
                        'file-loader'
                    ]
                }
            ```

+   打包 js 文件(将 es6 转为 es5)
    +   步骤：
        +   安装 Loader：
            +   npm install babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env --save
        +   配置
            ```js
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ```

+   打包 vue 组件
    +   准备工作：
        +   安装第三方包 vue
            +   npm i vue --save-dev
        +   创建一个组件 App.vue
        +   在 main.js
            ```js
                import Vue from 'vue'
                import App from './App.vue'
                new Vue({
                    el: '#app',
                    render: h => h(App)
                })
            ```
    +   步骤：
        +   安装 loader 包
            +   npm install -D vue-loader vue-template-compiler  
        +   webpack 配置
            ```js
                // 引入插件
                const VueLoaderPlugin = require('vue-loader/lib/plugin')

                module.exports = {
                module: {
                    rules: [
                        {
                            // 打包 vue 文件
                            test: /\.vue$/,
                            loader: 'vue-loader'
                        }
                    ]
                },
                plugins: [
                        // 请确保引入这个插件！
                        new VueLoaderPlugin()
                    ]
                }
            ```

#####   3.5webpack 的插件
+   HtmlWebpackPlugin
    +   作用：自动将 dist 之外的 index.html 拷贝到 dist 目录中
    +   步骤：
        +   安装插件：
            +   npm install --save-dev html-webpack-plugin
        +   配置：
            ```js
                // 引入插件
                const HtmlWebpackPlugin = require('html-webpack-plugin')
                // 配置插件
                plugins: [
                    new HtmlWebpackPlugin({
                        title: 'Output Management'
                    })
                ]
            ```

+   clean-webpack-plugin (只有项目运行在服务器，才会自动清除之前的)
    +   作用：在打包之前自动清除 dist 目录下的内容
    +   步骤
        +   安装插件
            +   npm install clean-webpack-plugin --save-dev
        +   配置插件
            ```js
                // 引入插件
                const { CleanWebpackPlugin } = require('clean-webpack-plugin')
                // 配置
                plugins: [
                    new CleanWebpackPlugin(),
                    new HtmlWebpackPlugin({
                        title: 'Output Management'
                    })
                ]
            ```

+   webpack-dev-server
    +   作用：将项目运行到服务器中，保存文件之后会重新刷新页面
    +   步骤：
        +   安装插件：
        +   npm install --save-dev webpack-dev-server
    +   配置插件：
        ```js
                devServer: {
                contentBase: './dist'
            }
        ```
    +   添加脚本：
        ```json
            "script": {
                "dev": "webpack-dev-server --open"
            }
        ```

+   HMR
    +   作用：热更新（不用刷新页面直接改变内容）只对修改样式有效，js无效
    +   步骤：
        +   配置
            ```js
                // 引入webpack
                const webpack = require('webpack');
                devServer: {
                    contentBase: './dist',
                    hot: true // 开启热更新
                }
                // 添加插件
                +     new webpack.NamedModulesPlugin(),
                +     new webpack.HotModuleReplacementPlugin()
            ```

-   以上内容可参考 webpack-demo ，想了解更多的配置可以前往官网：https://www.webpackjs.com/