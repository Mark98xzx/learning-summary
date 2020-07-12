
// AMD require.js  常用 webpack 打包
console.log("a模块")

define(["b"],function(obj){
    console.log(obj);
    return {
        name: "a-module"
    }
});
