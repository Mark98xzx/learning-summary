### css-loader 解析

less.less
```less
    @color: blue;
    #less {
        color: @color
    }
```
- let lessSoure = `@color: blue;`
- 交给 less-loader 处理，编译成css
```css
    #less {
        color: blue;
    }
```
- 再交给 css-loader 进行处理 负责处理源代码中的 import 和 url

- cssloader 会把css源码全部处理好，然后交给 style-laoder
- style-loader 会把 css 源码转换成一个 style 标签插入到页面中
```js
    let style = document.createElement('style');
    style.innerHTML = css内容;
    document.head.appendChild(style);
```

### @ 与 ~ 符
- @ 符
    - 配置解析的别名
    ```webpack.config.js
        resolve: {
            alias: {
                '@': path.resolve('src')
            }
        }
    ```

- ~ 符 (css-loader 的内置功能)
    - node_modules下的文件


### css兼容性
- 为了浏览器的兼容性，有时候我们必须加入 -webkit，-ms，-o，-moz 这些前缀
    - Trident内核：主要代表为 IE 浏览器，前缀为 -ms
    - Gecko内核：主要代表 Firefox，前缀为 -moz
    - Presto内核：主要代表 Opera，前缀为 -o
    - Wenkit内核：主要代表 Chrome 和 Safari，前缀为 -webkit

#### 可以安装 postcss来处理
- https://caniuse.com
- postcss-loader 可以使用 postcss 处理css
- postcss-preset-env 把现代的css转换成大多数浏览器能够理解、识别的
- postCss Preset Env 已经包含了 autoprefixer 和 browsers 的选项
```js
    npm i postcss-loader postcss-preset-env --save
```

#### postcss.config.js
```postcss-config.js
    let postcssPresetEnv = require('postcss-preset-env');
    module.exports = {
        plugins: [
            postcssPresetEnv({
                browsers: 'last 5 version'
            })
        ]
    }
```