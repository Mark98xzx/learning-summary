## axios

### axios是什么？
- axios 是一个轻量的 HTTP 客户端
    - 基于 XMLHttpRequest 服务来执行 HTTP 请求，支持丰富的配置，支持 promise，支持浏览器端和 node.js 端。自 Vue2.0起，尤大宣布取消对 vue-resourse 的官方推荐，转而推荐 axios。现在 axios 已经成为大部分 vue 开发者的首选

#### 特性
- 从浏览器中创造 XMLHttpRequests
- 从 node.js 创建 http 请求
- 支持 Promise API
- 拦截响应和请求响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON 数据
客户端支持防御 XSRF

#### 基本使用

- 安装
```js
    // npm 安装
    npm install axios --save
    // cdn 引入
    <script src="https://xxx.com/axios/dist/axios.min.js"></script>
```

- 导入
```js
    import axios from 'axios'
```

- 发送请求
```js
    axios({
        url: 'xxxx', // 设置请求的地址
        method: 'GET', // 设置请求的方法
        params: {   // get 请求使用params进行传参，如果是用 post 请求使用 data
            type: '',
            page: 1,
            limit: 20,
        }
    }).then(res => {
        // res 为后端返回的数据
        console.log(res)
    })
```

- 并发请求 axios.all([])

```js
    function getUserAccount() {
        return axios.get('/user/001')
    }
    function getUserPermissions() {
        return axios.get('/user/001/permissions')
    }
    axios.all([getUserAccount, getUserPermissions]).thrn(
        axios.spread(function (res1, res2) {
            // res1 第一个请求返回的内容，res2 第二个请求返回的内容
            // 两个请求都执行完成才会执行
        })
    )
```

#### 如何封装 axios
- axios 的 api 很友好，你完全可以很轻松在项目中直接使用
- 不过随着项目规模增大，如果每发起一次 HTTP 请求，就把这些 比如：设置超时时间、设置请求头、根据项目环境判断使用哪个请求地址、错误处理等等操作，都每一次都需要写一遍
- 这种重复劳动不仅浪费时间，而且让代码冗余，难以维护。为了提高我们开发效率，以及代码质量，我们可以在项目中进行二次封装一下axios 再使用
- 举个例子
    ```js
        axios('http:''localhost:3000/get', {
            // 配置代码
            method: 'GET',
            timeout: 1000,
            withCredentials: true,
            headers: {
                'Coutent-Type': 'application/json',
                Authorization: 'xxx',
            },
            transformRequest: [function(data, headers){
                return data
            }]
            // 其他配置
        }).then((data) => {
            // 真正的业务逻辑
            console.log(data)
        }, (err) => {
            // 错误时代码处理
            if (err.response.status === 401) {
                // handle authorization error
            }
            if (err.response.status === 403) {
                // handle server forbidden error
            }
            // 其他错误处理
            console.log(err)
        })
    ```
    - 如果每个页面都发送类似的请求，都要写一堆的配置与错误处理，就显得过于繁琐、代码冗余
    - 这时候我们就需要对 axios 进行二次封装，让我们使用更为便捷

#### 如何封装

- 封装的同时，需要和后端协商好一些约定，请求头，状态码，请求超时时间....
- 设置接口请求前缀：根据开发、测试、生产环境的不同，前缀加以区分
- 请求头：来实现一些具体的业务，必须携带一些参数才可以请求（例如：token...）
- 状态码：根据接口返回的不同 status，来执行不同的业务，这块也需要和后端约定好
- 请求方法：根据 get、post 等方法进行一个再次封装，使用起来更为方便
- 请求拦截器：根据请求的请求头设定，来决定哪些请求可以访问
- 响应连接器：这块是根据后端返回状态码判定执行不同业务

##### 设置接口请求前缀
- 利用 node 环境变量来做判断，用来区分开发、测试、生产环境
```js
    if (process.env.NODE_ENV === 'development') {
        axios.defaults.baseURL = 'http://dev.xxx.com'
    } else if {
        axios.defaults.baseURL = 'http://prod.xxx.com'
    }
```
- 在本地调试的时候，还需要在vue.config.js文件中配置devServer实现代理转发，从而实现跨域
```js
    devServer: {
        proxy: {
            '/proxyApi': {
                target: 'http://dev.xxx.com',
                changeOrigin: true,
                pathRewrite: {
                    '/proxyApi': ''
                }
            }
        }
    }
```

##### 设置请求头与超时时间
- 大部分情况下，请求头都是固定的，只有少部分情况下，会需要一些特殊的请求头，这里将普适性的请求头作为基础配置。当需要特殊请求头时，将特殊请求头作为参数传入，覆盖基础配置
```js
    const service = axios.create({
        ...
        timeout: 30000,  // 请求 30s 超时
        headers: {
            get: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
            },
            post: {
            'Content-Type': 'application/json;charset=utf-8'
            // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
            }
        },
    })
```

##### 封装请求方法
- 先引入封装好的方法，在要调用的接口重新封装成一个方法暴露出去
```js
    // get 请求
    export function httpGet({
        url,
        params = {}
    }) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params
            }).then((res) => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
    // post
    // post请求
    export function httpPost({
        url,
        data = {},
        params = {}
    }) {
        return new Promise((resolve, reject) => {
            axios({
                url,
                method: 'post',
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                // 发送的数据
                data,
                // url参数
                params
            }).then(res => {
                resolve(res.data)
            })
        })
    }
```

- 封装的方法放在一个api.js文件中
```js
    import { httpGet, httpPost } from './http'
    export const getorglist = (params = {}) => httpGet({ url: 'apps/api/org/list', params })
```

- 页面中引入 直接调用
```js
    // .vue
    import { getorglist } from '@/assets/js/api'

    getorglist({ id: 200 }).then(res => {
    console.log(res)
    })
```

- 这样可以把api统一管理起来，以后维护修改只需要在api.js文件操作即可

##### 请求拦截器
- 请求拦截器可以在每个请求里加上 token，做了统一处理维护起来也比较方便
```js
    axios.interceptors.request.use(
        config => {
            // 每次发送请求之前判断是否存在 token
            // 如果存在，则统一在 http 请求的 header 都加上 token，这样后台根据 token 判断你的登录情况，此处 token一般是用户完成登录后存储到 localstorage里的
            token && (config.headers.Authorization == token)
            return config
        },
        error => {
            return Promise.error(error)
        }
    )
```

##### 响应拦截器
- 响应拦截器可以在接收到响应后先做一层操作，如根据状态码判断登录状态、授权
```js
    // 响应拦截器
    axios.interceptors.response.use(response => {
        // 如果返回状态码为 200，说明接口请求成功，可以正常拿到数据
        // 否则抛出错误
        if (response.status === 200) {
            if (response.data.code === 511) {
                // 未授权调取授权接口
            } else if (response.data.code === 510) {
                // 未登录跳转登录页
            } else {
                return Promise.resolve(response)
            }
        } else {
            return Promise.reject(response)
        }
    }, error => {
        // 这里对异常作统一处理
        if (error.response.status) {
            // 处理请求失败的情况
            // 对不同返回码对相应处理
            return Promise.reject(error.response)
        }
    })
```