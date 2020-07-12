### AMD require.js （了解）

#### require.js使用 (webpack打包)
- 引入require.js
    ```js
        https://cdn.bootcss.com/require.js/2.3.6/require.js
    ```
    - 1. 加载模块
        ```js
            require(["a"]);
        ```
    - 2. 定义模块
        - 无依赖定义
            ```js
                define({
                    method1:function(){
                        console.log("a method...");
                    },
                    method2:function(){
                        console.log("b method...");
                    }
                });
            ```
        - 模块有依赖
            ```js
                define(["c"],{
                    method1:function(){
                        console.log("a method...");
                    },
                    method2:function(){
                        console.log("b method...");
                    }
                });
            ```
        - 函数式写法
            ```js
                define(["c"],function(c){
                    console.log(c);
                    obj = {
                        name:"张安",
                        age:20
                    }
                    return obj;
                });
            ```
#### 模块化优点
- 防止作用域污染 
- 提高代码的复用性
- 维护成本降低