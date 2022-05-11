### ESLint 代码校验

#### 安装
- eslint
- eslint-loader
- configuring
- babel-eslint
- Rules

```bash
    npm install eslint eslint-loader babel-eslint --save-dev
```

#### 配置(webpack.config.js)
```webpack.config.js
    module: {
        rules:[
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                options: {
                    fix: true // 打包时自动修复
                },
                exclude: /node_modules/  // 不检查第三方库
            }
        ]
    }
```

#### 配置文件(.eslintrc.js)
```.eslintrc.js
    module.exports = {
        root: true, // 这是一个根配置文件
        parser: "babel-eslint", // 解析器
        // 指定解析器选项
        parserOptions: {
            sourceType: "module",
            ecmaVersion: "2015"
        },
        // 指定脚本的运行环境
        env: {
            browser: true,
            node: true
        },
        // 启用的规则及其各自的错误级别
        rules: {
            "indent": "off", // 缩进风格
            "quotes": "off", // 引号类型
            "no-console: "error", // 禁止使用 console
            // ...
        }
    }
```

#### 自动修复（.vscode\settings.json）
- 安装vscode 的 eslint 插件
- 配置自动修复参数
.vscode\settings.json

```settings.json
    {
        "eslint.validate": [
            "javascript",
            "javascriptreact",
            "typescript",
            "typescriptreact"
        ],
        "editor.codeActionsOnSave": { // 编辑器保存动作 保存时自动修复
            "source.fixAll.eslint": true
        }
    }
```