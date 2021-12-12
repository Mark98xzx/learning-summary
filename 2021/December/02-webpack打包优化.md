## webpack 打包优化

### 1、为什么要优化打包？
- 项目越做越大，依赖包越来越多，打包文件太大
- 单页面应用首页白屏时间长，用户体验差

### 2、如何考虑解决
- 减小打包后的文件大小
- 首页按需引入文件
- 优化 webpack 打包时间

### 3、优化方式

#### 3.1、按需加载

##### 3.1.1、路由组件按需加载
```js
    const router = [
        {
            path: '/index',
            component: resolve => require.ensure([], () => resolve(require('@/components/index')))
        },
        {
            path: '/about',
            component: resolve => require.ensure([], () => resolve(require('@/components/about')))
        }
    ]
```

##### 3.1.2、第三方组件和插件。按需加载需引入第三方组件
```js
    // 引入全部组件
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css'
    Vue.use(ElementUI)

    // 按需引入组件
    import { Button } from 'element-ui'
    Vue.component(Button.name, Button)
```

##### 3.1.3、对于一些插件，如果只是在个别组件中用的到，也可以不要在 main.js 里面引入，而是在组件中按需引入
```js
    // 在main.js引入
    import Vue from vue
    import Vuelidate from 'vuelidate'
    Vue.use(Vuelidate)

    // 按组件按需引入
    import { Vuelidate } from 'vuelidate'
```

#### 3.2、优化loader配置
- 优化正则匹配
- 通过 cacheDirectory 选项开启缓存
- 通过 include、exclude 来减少被处理的文件
```js
    module: {
        rules: [
            {
            test: /\.js$/,
            loader: 'babel-loader?cacheDirectory',
            include: [resolve('src')]
            }
        ]
    }
```

#### 3.3、优化文件路径——省下搜索文件的时间
- extension 配置之后可以不用在 require 或是 import 的时候加文件扩展名,会依次尝试添加扩展名进行匹配。
- mainFiles 配置后不用加入文件名，会依次尝试添加的文件名进行匹配
- alias 通过配置别名可以加快 webpack 查找模块的速度。
```js
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        }
    },
```

#### 3.4、生产环境关闭 sourceMap
- sourceMap 本质上是一种映射关系，打包出来的 js 文件中的代码可以映射到代码文件的具体位置,这种映射关系会帮助我们直接找到在源代码中的错误。
- 打包速度减慢，生产文件变大，所以开发环境使用 sourceMap，生产环境则关闭。

#### 3.5、代码压缩
- UglifyJS: vue-cli 默认使用的压缩代码方式，它使用的是单线程压缩代码，打包时间较慢
- ParallelUglifyPlugin: 开启多个子进程，把对多个文件压缩的工作分别给多个子进程去完成
两种方法使用如下：

```js
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
            compress: {
                warnings: false
            }
            },
            sourceMap: true,
            parallel: true
        }),

        new ParallelUglifyPlugin({
            //缓存压缩后的结果，下次遇到一样的输入时直接从缓存中获取压缩后的结果并返回，
            //cacheDir 用于配置缓存存放的目录路径。
            cacheDir: '.cache/',
            sourceMap: true,
            uglifyJS: {
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
            }
        })
    ]
```

#### 3.6、提取公共代码
- 相同资源重复被加载，浪费用户流量，增加服务器成本。
- 每个页面需要加载的资源太大，导致网页首屏加载缓慢，影响用户体验。

#### 3.7、CDN 优化
- 随着项目越做越大，依赖的第三方 npm 包越来越多，构建之后的文件也会越来越大。
- 再加上又是单页应用，这就会导致在网速较慢或者服务器带宽有限的情况出现长时间的白屏。
1. 将 vue、vue-router、vuex、element-ui 和 axios 这五个库，全部改为通过 CDN 链接获取，在 index.html 里插入 相应链接。
```js
    <head>
        <link rel="stylesheet" href="https://cdn.bootcss.com/element-ui/2.0.7/theme-chalk/index.css" />
    </head>
    <body>
        <div id="app"></div>
        <script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js"></script>
        <script src="https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js"></script>
        <script src="https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js"></script>
        <script src="https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js"></script>
        <script src="https://cdn.bootcss.com/element-ui/2.6.1/index.js"></script>
        <!-- built files will be auto injected -->
    </body>
```
2. 在 webpack.config.js 配置文件
```js
    module.exports = {
    ···
        externals: {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT',
        'Axios':'axios'
        }
    },
```
3. 卸载依赖的 npm 包，npm uninstall axios element-ui vue vue-router vuex

4. 修改 main.js 文件里之前的引包方式
```js
    // import Vue from 'vue'
    // import ElementUI from 'element-ui'
    // import 'element-ui/lib/theme-chalk/index.css'
    // import VueRouter from 'vue-router'

    import App from './App.vue'
    import routes from './router'
    import utils from './utils/Utils'

    Vue.use(ELEMENT)
    Vue.use(VueRouter)

    const router = new VueRouter({
        mode: 'hash', //路由的模式
        routes
    })

    new Vue({
        router,
        el: '#app',
        render: h => h(App)
    })
```

> **注意：** CDN必须要可靠 或者自己的的CDN 再或者需兼容CDN服务挂了，有备选方案

#### 3.8、使用 HappyPack 多进程解析和处理文件
- 由于运行在 Node.js 之上的 Webpack 是单线程模型的，所以 Webpack 需要处理的事情需要一件一件的做，不能多件事一起做。
- HappyPack 就能让 Webpack 把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。
- HappyPack 对 file-loader、url-loader 支持的不友好，所以不建议对该 loader 使用。
使用方法如下：
1. HappyPack 插件安装： npm i -D happypack
2. webpack.base.conf.js 文件对 module.rules 进行配置
```js
    module: {
        rules: [
            {
            test: /\.js$/,
            use: ['happypack/loader?id=babel'],
            include: [resolve('src'), resolve('test')],
            exclude: path.resolve(__dirname, 'node_modules')
            },
            {
            test: /\.vue$/,
            use: ['happypack/loader?id=vue']
            }
        ]
    }
```
3. 在生产环境 webpack.prod.conf.js 文件进行配置
```js
    const HappyPack = require('happypack')
    // 构造出共享进程池，在进程池中包含5个子进程
    const HappyPackThreadPool = HappyPack.ThreadPool({ size: 5 })
    plugins: [
    new HappyPack({
        // 用唯一的标识符id，来代表当前的HappyPack是用来处理一类特定的文件
        id: 'babel',
        // 如何处理.js文件，用法和Loader配置中一样
        loaders: ['babel-loader?cacheDirectory'],
        threadPool: HappyPackThreadPool
    }),
    new HappyPack({
        id: 'vue', // 用唯一的标识符id，来代表当前的HappyPack是用来处理一类特定的文件
        loaders: [
        {
            loader: 'vue-loader',
            options: vueLoaderConfig
        }
        ],
        threadPool: HappyPackThreadPool
    })
    ]
```

### 总结
- 比较实用的方法: 按需加载，优化loader配置，关闭生产环境的sourceMap，CDN优化。
- vue-cli已做的优化： 代码压缩，提取公共代码，再优化空间不大。
- 根据项目实际需要和自身开发水平选择优化方法，必须避免因为优化产生bug。