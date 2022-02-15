// loader 结构
// loader 就是一个函数，但不可以是箭头函数
// loader 必须有返回值，string or buffer；如果没有返回值就会报错
// loader 如何接收配置 通过 loader Api
// 如何返回多个信息 this.calback 
// this.calback 有同步调用和异步调用两种方式
// loader 有异步逻辑如何处理  this.async
// 多个loader 如何配置

module.exports = function (source) {
    console.log(this.query);
    // console.log(source);
    // 单个信息
    // return source.replace("hello", this.query.name);

    // 返回多个信息
    // const info = source.replace("hello", this.query.name);
    // this.callback(null, info);


    // error 直接写报错
    // setTimeout(() => {
    //     const info = source.replace("hello", this.query.name);
    //     // return info;
    //     this.callback(null, info);
    // }, 3000);

    // this.async
    const callback = this.async(); // 返回一个 异步callback
    setTimeout(() => {
        const info = source.replace("hello", this.query.name);
        callback(null, info);
    }, 3000);
};
