## mockjs 使用

### 1、基本使用

- 安装

    ```js
        npm install mockjs -D
    ```

### 2、基础语法

- 数据模板定义规范（DTD data template definition）
- 数据占位符定义规范（DPD）
- 占位符：只是在属性占个位置， 不出现在最终的属性值中

- vite3，vue3
  1. 安装 mockjs
  2. 安装 mock 插件
        - vite-plugin-mock cross-env
            - vite-plugin-mock：vite的数据模拟插件
            - cross-env：去处理 windows 和 linux 环境写法上不一致的问题， 解决跨平台的环境变量的问题

> reactive 如果直接赋值，会导致响应式丢失

```js
    let list = reactive([1, 2, 3, 4])
    list = [5, 6, 7, 8] // 重新赋值，list的响应式就丢失了
```
