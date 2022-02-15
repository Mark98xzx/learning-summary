const { webpack } = require("webpack");

// webpack 的配置文件

// webpack 是基于nodejs

const {resolve} = require("path");
const htmlwebpackplugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const minicssPlugin = require("mini-css-extract-plugin");

module.exports = {
    // 入口
    //  ----  spa 单页面应用 --------
    // entry: "./src/index.js",
    // // 出口
    // output: {
    //     // 生成的资源存放位置  必须是绝对路径
    //     path: resolve(__dirname, "./build"),
    //     // 生成的资源叫什么
    //     filename: "index.js"
    // },

    // ----- mpa 多页面应用 ---------
    // 多入口 对应 多出口
    entry: {
        // index：modules=[index.js, a.js] = [chunk, chunk] = chunks
        // index == chunkName 为有效chunks组名称
        index: "./src/index.js", // index.js a.js
        login: "./src/login.js"  // login.js
    },
    // 出口
    output: {
        // 生成的资源存放位置  必须是绝对路径
        path: resolve(__dirname, "./build"),
        // 生成的资源叫什么
        filename: "[name].js" // 占位符[name]
    },

    mode: "development", // 三种模式 none production development

    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ["style-loader", "css-loader"], // 执行顺序：自后向前
                use: [minicssPlugin.loader, "css-loader"], // minicssPlugin 使用文件抽离就 不用使用style-loader
            },
            // 自己loader 本地
            {
                test: /\.js$/,
                user: {
                    loader: resolve(__dirname, "./myLoaders/my-loader.js"),
                    options: {
                        name: "options 配置"
                    }
                }

            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new htmlwebpackplugin({
            template: "./src/public/index.html",
            filename: "index.html",
            chunks: ["index"],
        }),
        new htmlwebpackplugin({
            template: "./src/public/login.html",
            filename: "login.html",
            chunks: ["login"]
        }),
        // 样式抽取成独立的样式文件   style-loader：通过dom操作动态生成 style标签
        new minicssPlugin({
            filename: "index.css"
        })
    ],
}