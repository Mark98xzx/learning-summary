// export import 语法 ESModule
// require module.exports  commonjs

// module.exports = 'aa' // {}

// exports.aa = 100; // node的导出方式 {aa: 100}

// import xx from 'xxx'  // default 属性

// export default 'xxx' // exports.default = 'xxx' => {default: 'xxx'}

// let xx = require('xx')
// xx.default


// rollup 默认支支持es6语法, 只要es6模块才能做treeshaking

// let r = require('fs'); // commonjs 语法的require语法是没有类型提示的
// import r = require('fs');


// ts 为了支持 commonjs语法, 单独的提出了一个导出方式 export = / import x = require('')


// 用 ts 的时候除非你引入的模块, 他不是ts 写的, 我们可以直接使用 require 直接用
// 如果模块用 ts 写的,那就需要 import x = require('xx')
// 如果要是 es6模块,全部用 export default export {}  / import 即可




// -------------------

// 有时候在开发时引入一些第三方模块 会发现不是ts写的

// declare module 'jquery';
// import jquery from 'jquery'  // 有个组织 @types/


// 通过 declare 来声明变量,这个声明只是为了避免报错,没有任何意义
declare let a: string;
console.log(a);

declare function fn(): void;

declare class Person {
    constructor(name: string) {}
}

declare interface tomato {
    color: string
}
// let tomato: tomato = {}

export {}