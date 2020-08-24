## TypeScript 的模块系统

### TS 模块系统

虽然早期的时候，`TypeScript` 有一套自己的模块系统实现，但是随着更新，以及 `JavaScript` 模块化的日趋成熟，`TypeScript` 对 `ESM` 模块系统的支持也是越来越完善

### 模块

无论是 `JavaScript` 还是 `TypeScript` 都是以一个文件作为模块最小单元

- 任何一个包含了顶级 `import` 或者 `export` 的文件都被当成一个模块
- 相反的一个文件不带有顶级的 `import` 或者 `export` ，那么它的内容就是全局可见的

### 全局模块

如果一个文件中没有顶级 `import` 或者 `export` ，那么它的内容就是全局的，整个项目可见的

```ts
    // a.ts
    let a1 = 100;
    let a2 = 200;
```

```ts
    // b.ts
    // ok, 100
    console.log(a1);
    // error
    let a2 = 300;
```

> 不推荐使用全局模块，因为它会容易造成代码命名冲突（全局变量污染）

### 文件模块

任何一个包含了顶级 `import` 或者 `export` 的文件都会当做一个模块，在 `TypeScript` 中也称为外部模块。



## 模块语法

`TypeScript` 与 `ESM` 语法类似

### 导出模块内部数据

使用 `export` 导出模块内部数据（变量、函数、类、类型别名、接口……）

### 导入外部模块数据

使用 `import` 导入外部模块数据



## 模块编译

`TypeScript` 编译器也能够根据相应的编译参数，把代码编译成指定的模块系统使用的代码

#### `module` 选项

在 `TypeScript` 编译选项中，`module` 选项是用来指定生成哪个模块系统的代码，可设置的值有：`"none"`、`"commonjs"`、`"amd"`、`"udm"`、`"es6"`/`"es2015/esnext"`、`"System"`

- `target=="es3" or "es5"`：默认使用 `commonjs`
- 其它情况，默认 `es6`

## 模块导出默认值的问题

如果一个模块没有默认导出

```ts
    // m1.ts
    export let obj = {
    x: 1
    }
```

则在引入该模块的时候，需要使用下列一些方式来导入

```ts
    // main.ts
    // error: 提示 m1 模块没有默认导出
    import v from './m1'

    // 可以简单的使用如下方式
    import {obj} from './m1'
    console.log(obj.x)
    // or
    import * as m1 from './m1'
    console.log(m1.obj.x)
```



## 加载非 `TS` 文件

有的时候，我们需要引入一些 `js` 的模块，比如导入一些第三方的使用 `js` 而非 `ts` 编写的模块，默认情况下 `tsc` 是不对非 `ts` 模块文件进行处理的

我们可以通过 `allowJs` 选项开启该特性

```js
    // m1.js
    export default 100;
    // main.ts
    import m1 from './m1.js'
```

### 非 `ESM` 模块中的默认值问题

 在 `ESM` 中模块可以设置默认导出值

```ts
    export default '开课吧';
```

但是在 `CommonJS` 、`AMD` 中是没有默认值设置的，它们导出的是一个对象（`exports`）

```js
    module.exports.obj = {
        x: 100
    }
```

在 `TypeScript` 中导入这种模块的时候会出现 `模块没有默认导出的错误提示`。

简单一些的做法：

```typescript
    import * as m from './m1.js'
```

通过配置选项解决：

**allowSyntheticDefaultImports**

设置为：`true`，允许从没有设置默认导出的模块中默认导入。

虽然通过上面的方式可以解决编译过程中的检测问题，但是编译后的具体要运行代码还是有问题的

**esModuleInterop**

设置为：`true`，则在编译的同时生成一个 `__importDefault` 函数，用来处理具体的 `default` 默认导出

> 注意：以上设置只能当 `module` 不为 `es6+` 的情况下有效



### 以模块的方式加载 JSON 格式的文件

`TypeScript 2.9+` 版本添加了一个新的编译选项：`resolveJsonModule`，它允许我们把一个 `JSON` 文件作为模块进行加载

**resolveJsonModule**

设置为：`true` ，可以把 `json` 文件作为一个模块进行解析

**data.json**

```json
    {
        "name": "xzx",
        "age": 20,
        "gender": "男"
    }
```

**ts文件**

```ts
    import * as userData from './data.json';
    console.log(userData.name);
```