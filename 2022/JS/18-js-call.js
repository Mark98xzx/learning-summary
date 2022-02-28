// call 使用
var foo = {
    value: 1
};

function bar() {
    console.log(this.value)
};

bar(); // undefined

bar.call(foo); // 1

console.log("==============================")

// 第一版
Function.prototype.call2 = function(context) {
    // 首先获取调用call的函数，用 this 可以获取
    console.log(context); // { value: 1 }
    console.log(this, 'this'); // [Function: bar] 'this'
    context.fn = this;
    context.fn();
    delete context.fn;
}
// 测试一下
var foo1 = {
    value: 1
};
function bar1() {
    console.log(this.value)
}

bar1.call2(foo1); // 1