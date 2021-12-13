## vue中路由按需加载的几种方式

使用vue-cli构建项目，我们会在router文件夹下面的index.js 里面引入相关的路由组件：
```js
    import Hello from '@/components/Hello'
    import Home from '@/components/Home'
    import User from '@/components/User'
```

### 普通加载的缺点
- webpack 在打包的时候会把整个路由打包成一个js文件，如果页面一多，会导致这个文件特别大，加载起来会比较耗时间、缓慢。

#### 1、require.ensure()实现按需加载
- 语法
    ```js
        require.ensure(dependencies:String[], callback:function(require), errorCallback:function(error), chunkName:String)
    ```
- vue中使用
    ```js
        const List = resolve => { require.ensure([], () => { resolve(require('./list')) }, 'list') }
    ```

#### 2、vue 异步组件技术
- 在 router 中配置，使用这种方法可以实现按需加载，一个组件生成一个 js 文件
- vue 中使用
    ```js
        {
            path: '/home',
            name: 'home',
            component: resove => require(['@/components/home'], resolve),
        }
    ```

#### 3、使用动态 import() 语法 （推荐使用）
- vue 中使用
    ```js
        //没有指定webpackChunkName,每个组件打包成一个js文件
        const test1 = ()=>import('@/components/test1.vue') 
        const test2 = ()=>import('@/components/test2.vue')

        //指定了相同的webpackChunkName，会合并打包成y一个js文件
        const test3 = ()=>import(/* webpackChunkName:'grounpTest' */ '@/components/test3.vue') 
        const test4 = ()=>import(/* webpackChunkName:'grounpTest' */ '@/components/test4.vue')

        const router = new VueRouter({
            routes: [
                { path: '/test1', component: test1 },
                { path: '/test2', component: test2 },
                { path: '/test3', component: test3 },
                { path: '/test4', component: test4 }
            ]
        })
    ```
    > 注：/* webpackChunkName: 'grounpTest' */使用命名chunk，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)
    - 另一种写法
    ```js
        {
            path: '/home_page',
            name: '首页',
            component: () => { return import(/* webpackChunkName: "Home" */ '@/views//HomePage.vue'); },
        },
        {
            path: '/notAuthority',
            name: '无权限界面',
            component: () => { return import(/* webpackChunkName: "Home" */ '@/views/NotAuthority.vue'); },
        },
    ```