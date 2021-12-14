## 谈谈你对webpack的认识

webpack 是一个模块打包工具，可以使用webapck管理模块依赖，并编译输出模块所需的静态文件。它能够很好的管理与打包 web 开发中所用到的 HTML、JavaScript、CSS 以及各种静态文件（图片、字体等），让开发过程更高效。对于不同类型的资源，webpack有对应模块的加载器。webpack模块打包器会分析模块间的依赖关系，最后生成优化且合并后的静态资源。

### webpack的两大特色如下：
1. 代码切割（code splitting）
2. loader 可以处理各种类型的静态资源，并且支持串行操作 webpack 以 CommonJS 规范来书写代码，但对 AMD/CMD 的支持也是很全面，方便对项目进行代码迁移

### webpack 具有 require.js 和 browserify 的功能，但也有很多自己的新特性
1. 对 CommonJS、AMD、ES6的语法实现了兼容。
2. 对 JavaScript、CSS、图片等资源文件都支持打包
3. 串联式模块加载器和插件机制，让其具有更好的灵活性和扩展性，例如提供对 CoffeeScript、EMAScript 6 的支持
4. 有独立的配置文件 webpack.config.js
5. 可以将代码切割成不同的块，实现按需加载，缩短了初始化时间
6. 支持 SourceUrls 和 SourceMaps，易于调试
7. 具有强大的 Plugin 接口，大多都是内部插件，使用起来比较灵活
8. 使用异步I/O, 并具有多级缓存，这使得 webpack 速度很快且在增量编译上更加快