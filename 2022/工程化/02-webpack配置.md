## webpack 配置

### 零配置
- 零配置是很弱的，特定的需求，总是需要自己进行配置
- webpack 有默认的配置文件，叫 `webpack.config.js`，我们可以对这个文件进行修改，进行个性化配置
    - 使用默认的配置文件：webpack.config.js
    - 不使用自定义配置文件：比如 webpackconfig.js，可以通过 --config webpackconfig.js 来指定 webpack 使用哪个配置文件来执行构建

### webpack.config.js 配置基础结构
```js
    module.exports = {
        entry: "./src/index.js", // 打包⼊⼝⽂件
        output: "./dist", // 输出结构
        mode: "production", // 打包环境  // 三种模式 none production development
        module: {
            rules: [
                // loader模块处理
                {
                    test: /\.css$/,
                    use: "style-loader"
                }
            ]
        },
        plugins: [new HtmlWebpackPlugin()] // 插件配置
    };
```

#### entry
- 指定 webpack 打包入口文件：webpack 执行构建的第一步将从 Entry 开始，可抽象输入

    ```js
        // 单⼊⼝ SPA，本质是个字符串
        entry:{
            main: './src/index.js'
        }
        // ==相当于简写===
        entry:"./src/index.js"

        //多⼊⼝ entry是个对象
        entry:{
            index:"./src/index.js",
            login:"./src/login.js"
        }
    ```

#### output
- 打包转换后的文件输出到磁盘位置：输出结果，在 webpack 经过一系列处理并得出最终想要的代码后输出结果

    ```js
        output: {
            filename: "bundle.js", // 输出⽂件的名称
            path: path.resolve(__dirname, "dist") // 输出⽂件到磁盘的⽬录，必须是绝对路径
        },
        
        // 多⼊⼝的处理
        output: {
            filename: "[name][chunkhash:8].js", // 利⽤占位符，⽂件名称不要重复
            path: path.resolve(__dirname, "dist") // 输出⽂件到磁盘的⽬录，必须是绝对路径
        }
    ```

#### mode
- mode 用来指定当前构建环境
    - production
    - development
    - none
- 设置 mode 可以自动触发 webpack 内置的函数，达到优化的效果
- 开发阶段的开启会有利于热更新的处理，识别哪个模块变化
- 生产阶段的开启会有帮助模块压缩，处理一些副作用等一些功能


#### loader
- 模块解析，模块转换器，用于把模块原内容按照需求转换成新内容。
- webpack 是模块打包工具，而模块不仅仅是 js，还可以是 css，图片或者其他格式
- 但是 webpack 默认只知道如何处理 js 和 json 模块，那么其他格式的模块处理，和处理方式就需要 loader 了

- 常见的loader

    ```js
        style-loader
        css-loader
        less-loader
        sass-loader
        ts-loader   // 将Ts转换成js
        babel-loader// 转换ES6、7等js新特性语法
        file-loader // 处理图⽚⼦图
        eslint-loader
        // ...
    ```

#### moudle
- 模块，在 webpack 里一切皆模块，一个模块对应着一个文件。webpack 会从配置的 entry 开始递归查找出所有依赖模块。

- 当 webpack 处理到不认识的模块时，需要在 webpack 中的 module 处进行配置，当检测到是什么格式的模块，使用什么的 loader 来处理

    ```js
        module:{
            rules:[
                {
                    test:/\.xxx$/, // 指定匹配规则
                    use:{
                        loader: 'xxx-load' // 指定使⽤的loader
                    }
                }
            ]
        } 
    ```

##### 例如：样式处理
- css-loader 分析 css 模块之间的关系，并合成一个 css
- style-loader 会把 css-loader 生成的内容，以 style 挂载到页面的 heade 部分
    ```js
        npm install style-loader css-loader -D
    ```
    ```js
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    ```

#### plugin: webpack的扩展补充
- 作用于 webpack 打包整个过程
- webpack 的打包过程是有（生命周期概念）钩子

plugin 可以在 webpack 运行到某个阶段的时候，帮你做一些事情，类似生命周期的概念

扩展插件，在 webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或者做你想要做的事情。

作用于整个构建过程

##### HtmlWebpackPlugin
- HtmlWebpackPlugin 会在打包结束后，自动生成一个 html 文件，并把打包生成的 js 模块引入到该 html 中

    ```js
        npm install --save-dev html-webpack-plugin
    ```
- 配置
    title: ⽤来⽣成⻚⾯的 title 元素
    filename: 输出的 HTML ⽂件名，默认是 index.html, 也可以直接配置带有⼦⽬录。
    template: 模板⽂件路径，⽀持加载器，⽐如 html!./index.html
    inject: true | 'head' | 'body' | false ,注⼊所有的资源到特定的 template 或者
    templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body
    元素的底部，'head' 将放置到 head 元素中。
    favicon: 添加特定的 favicon 路径到输出的 HTML ⽂件中。
    minify: {} | false , 传递 html-minifier 选项给 minify 输出
    hash: true | false, 如果为 true, 将添加⼀个唯⼀的 webpack 编译 hash 到所有包含的脚本和
    CSS ⽂件，对于解除 cache 很有⽤。
    cache: true | false，如果为 true, 这是默认值，仅仅在⽂件修改之后才会发布⽂件。
    showErrors: true | false, 如果为 true, 这是默认值，错误信息会写⼊到 HTML ⻚⾯中
    chunks: 允许只添加某些块 (⽐如，仅仅 unit test 块)
    chunksSortMode: 允许控制块在添加到⻚⾯之前的排序⽅式，⽀持的值：'none' | 'default' |
    {function}-default:'auto'
    excludeChunks: 允许跳过某些块，(⽐如，跳过单元测试的块)

- 案例 
    ```js
        const path = require("path");
        const htmlWebpackPlugin = require("html-webpack-plugin");

        module.exports = {
            // ...
            plugins: [
                new htmlWebpackPlugin({
                    title: "My App",
                    filename: "app.html",
                    template: "./src/public/index.html"
                })
            ]
        };

        // src/public/index.html
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title><%= htmlWebpackPlugin.options.title %></title>
        </head>
        <body>
        <div id="root"></div>
        </body>
        </html>
    ```

##### clean-webpack-plugin
文档：https://www.npmjs.com/package/clean-webpack-plugin

```js
    npm install --save-dev clean-webpack-plugin
```
```js
    const { CleanWebpackPlugin } = require("clean-webpack-plugin");
    // ...
    plugins: [
        new CleanWebpackPlugin()
    ]
```

- clean-webpack-plugin 如何做到 dist 目录下文件或者 目录不被清空
    - 使用配置项目：cleanOnceBeforePatterns 
        ```js
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["**/*", './dist'],
        })
        ```
        // cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/"],
        - ! 感叹号相当于 exclude 排除，意思是清空排除 dll 目录，和 dll目录下所有文件
        > **注意**：数组列表里面的 */ 是默认值，不可忽略，否则不做清空操作。
