## webpack 工程化

- webpack5.x 在2021.10发布上线

### webpack 入门

#### 1、webpack 简介
webpack 是一个现代 JavaScript 应用程序的静态模块打包器 （module bundle），当 webpack 处理应用程序时，它会递归的构建一个依赖关系图（dependency graph），其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或者多个的 bundle。
`webpack` 是一个打包模块化 JavaScript 的工具，它会从入口模块出发，识别出源码中的模块化导入语句，递归地找出入口文件的所有依赖，将入口和其所有的依赖打包到一个单独的文件中，是工程化、自动化思想在前端开发中的体现。

#### 2、webpack 安装
##### 环境准备
nodejs：https://nodejs.org/en/
版本参考官网发布的最新版本，可以提升webpack的打包速度

##### 安装方式
- 全局安装（不推荐）
```js
    // 安装webpack v4+ 版本时，需要额外加安装 webpack-cli
    npm install webpack webpack-cli -g

    // 检查版本
    webpack -v

    // 卸载
    npm uninstall webpack webpack-cli -g
```
> 全局安装 webpack ，这会将你项目中的webpack 锁定到指定版本，造成不同的项目中因为 webpack 依赖不同版本而导致冲突，构建失败
- 局部安装（推荐）
```js
    npm init -y // 初始化 npm 配置文件
    npm install --save-dev webpack // 安装核心库
    npm install --save-dev webpack-cli // 安装命令行工具

    // 安装最新的 4.x稳定版本
    npm i -D webpack@4.44.0

    // 安装指定版本
    npm i -D wenpack@<version>
```

#### 3、启动webpack
##### 3.1 webpack 默认配置
- webpack 默认支持 js模块 和 json 模块
- 支持 CommonJS Es module AMD 等模块类型
- webpack4 支持零配置使用，但是很弱，稍微复杂些的场景都需要额外扩展

##### 3.2 准备执行构建

- 新建src⽂件夹
- 新建src/index.js、src/index.json、src/other.js
```js
    // index.js
    const json = require("./index.json"); // commonJS
    import { add } from "./other.js"; // es module
    console.log(json, add(2, 3));
    // index.json
    {
    "name": "JOSN"
    }
    // other.js
    export function add(n1, n2) {
    return n1 + n2; }
```

##### 3.3 执行构建
```js
    // npx 方式
    npx webpack 

    // npm script
    npm run bulid
```
修改package.json⽂件：
```json
    "scripts": {
        "build": "webpack"
    },
```
原理就是通过 shell 脚本在 node_modules/.bin 目录下创建一个软链接

##### 3.4 构建成功
我们会发现目录下多出一个 dist 目录，里面有一个 main.js, 这个文件是一个可执行的 JavaScript 文件，里面包含 webpackBootstrap 启动函数。
- 一个自执行函数，参数是一个对象{}，参数称为 依赖图谱 模块路径以及该模块被打包编译后生成的chunk（代码片段） eval()

##### 3.5 默认配置
```js
    // wevpack.config.js
    const path = require("path");
    module.exports = {
        // 必填 webpack执⾏构建⼊⼝
        entry: "./src/index.js",
        output: {
            // 将所有依赖的模块合并输出到main.js
            filename: "main.js",
            // 输出⽂件的存放路径，必须是绝对路径
            path: path.resolve(__dirname, "./dist")
        }
    };
```

#### 4、webpack 配置核心概念
- chunk：指代码块，一个chunk 可能由多个模块组合而成，也用于代码合并与分割
- bundle：资源经过 webpack 流程解析编译后最终输出的成果文件
- entry：顾名思义，就是入口起点，用来告诉 webpack 用哪个文件作为构建依赖图的起点。webpack 会根据 entry 递归的去寻找依赖，每个依赖都将被它处理，最后输出到打包成果中
- output：output 配置描述了 webpack 打包的输出配置，包含输出文件的命名、位置等信息
- loader：默认情况下，webpack 仅支持 .js .json 文件，通过 loader，可以让它解析其他类型的文件，充当翻译官的角色。理论上只要有相对应的 loader，就可以处理任何类型的文件。
- plugin：loader 主要的职责是让 webpack 认识更多的文件类型，而 plugin 是职责是让其可以控制构建流程，从而执行一些特殊的任务。插件的功能非常强大，可以完成各种各样的任务
- webpack的功能补充
- mode：4.0开始，webpack支持零配置，旨在为开发人员减少上手难度，同时加入 mode 的概念，用于指定打包的目标环境，以便在打包过程中启用 webpack 针对不同环境下内置的优化

--------
- chunk chunks chunkNames
    - chunk 代码片段 一个module 对应 一个 chunk
    - chunks chunk组 （包含至少一个chunk（module））

- bundle module
    - 一个 bundle 对应一个chunkName （chunks）
    - 一个 chunkName （chunks）包含至少一个 module（chunk） 

- loader
    - 假如我们知道 webpack 只会编译处理 js json 格式的模块，那么怎么集成样式，图片，vue，jsx等模块呢？