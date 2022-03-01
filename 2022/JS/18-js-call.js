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


console.log("=========2==============");

// 第二步 例子
var foo2 = {
    value: 1
};

function bar2(name, age) {
    console.log(name);
    console.log(age);
    console.log(this.value);
}

bar2.call(foo, 'mark', '24')
// mark
// 24
// 1

console.log("===========第二版================");

Function.prototype.call3 = function(context) {
    context.fn = this;
    let args = [];
    for(let i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']')
    }
    eval('context.fn(' + args + ')');
    delete context.fn;
}
// 测试一下
let foo3 = {
    value: 1
};
function bar3(name, age) {
    console.log(name);
    console.log(age);
    console.log(this.value);
};
bar3.call3(foo3, 'mark', 24);
// mark
// 24
// 1

