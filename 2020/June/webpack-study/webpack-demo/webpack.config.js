// 引入 path 核心模块
const path = require('path')
// 引入插件对象 
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入 清除dist 插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// 引入 webpack
const webpack = require('webpack');
// 引入
const VueLoaderPlugin = require('vue-loader/lib/plugin')


// 配置当前项目的相关信息
// 配置：项目入口文件
module.exports = {
    // 配置人口文件
    entry: './src/main.js',
    // 配置当前项目中的插件
    plugins: [
        new CleanWebpackPlugin(),
        // 自动将 html 文件拷贝到 dist 目录下
        new HtmlWebpackPlugin({
            title: 'Output Management',
            filename: 'index.html', // 生成的 html 文件的名称
            template: './index.html' // 告诉项目，当前静态文件以哪个为模板生成
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ],

    // 配置出口文件
    output: {
        // 出口文件名
        filename: 'main.js',
        // 出口文件存放的路径
        path: path.resolve(process.cwd(), 'dist')
        // path.resolve() 方法将路径或者路径片段的序列解析为绝对路径
    },
    
    // 解析引用文件
    resolve: {
        // 允许省略文件的后缀
        extensions: ['.js', '.vue', '.json'],
        // 设置别名
        alias: {
            "@": path.resolve(__dirname, 'src')
        }
    },

    // 开启一个小型服务器
    devServer: {
        contentBase: './dist',
        hot: true  // 开启热更新
    },
    
    // 设置当前项目的环境
    mode: "development",

    // 添加 source map
    // 作用：添加一个未打包之前代码的映射（将未打包代码的行号也保留一份，可以用来当作报错时的提示信息）
    // devtool: "inline-source-map"  // inline-source-map： 会将映射直接保存到打包的 js 文件中
    devtool: "source-map", // 打包会多生成一个 .map 后缀的文件（映射文件）

    // 配置打包文件的信息
    module: {
        rules: [ // 打包的其他文件的规则
            {
                // 打包以 .css 为后缀的文件
                test: /\.css$/,
                use: [
                    'style-loader', // 将 css 代码使用 style 标签包裹，并添加到页面的 head 中
                    'css-loader' // 将 css 代码打包到 main.js 中
                ]
            },
            {
                // 打包以 .scss 为后缀的文件
                test: /\.scss$/,
                use: [
                    'style-loader', // 添加 style 标签到 head 中
                    'css-loader',  // 将 css 代码打包到 main.js 中
                    'sass-loader'  // 将 sass 文件转为 css 文件
                ]
            },
            {
                // 打包以 .less 为后缀的文件
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'  // 将 less 文件转为 css 文件
                ]
            },
            {
                // 打包 图片
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                // 打包 字体文件
                test: /\.(eot|woff2|woff|ttf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                // 打包 js 文件 es6转es5
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env']
                    }
                  }
            },
            {
                // 打包 vue 文件
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    }
}