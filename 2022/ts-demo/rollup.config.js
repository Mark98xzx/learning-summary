import {nodeResolve} from "@rollup/plugin-node-resolve";

import ts  from "rollup-plugin-typescript2";
import serve from "rollup-plugin-serve";
import path from "path"

export default {
    input: 'src/index.ts',
    output: {
        file: path.resolve(__dirname, 'dist/bundle.js'),
        // global  弄个全局变量来接收
        // cjs   module.exports
        // esm   export default
        // umd   兼容 amd + commonjs 不支持 es6 导入
        // iife  ()()
        format: 'iife', // 自执行函数   
        sourcemap: true, // 源码映射文件
    },
    plugins: [ // 有顺序 从上往下
        nodeResolve({
            extensions: ['js', 'ts'] // 解析后缀名
        }),
        ts({
            tsconfig: path.resolve(__dirname, 'tsconfig.json')
        }),
        serve({
            port: 3000,
            contentBase: '', // 起的服务以根目录为基准
            open: false, // 是否默认打开浏览器
            openPage: '/public/index.html' // 打开页面
        })
    ]
}