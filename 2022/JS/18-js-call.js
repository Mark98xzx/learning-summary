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

console.log("=========3================");

var obj = {
    value: 1
}
function bar4(name, age) {
    return {
        value: this.value,
        name: name,
        age:age
    }
}

console.log(bar4('mark', 23)); // {value:undefined,name:mark,age:23}
console.log(bar4.call(obj, 'mark', 24)); // {value:1,name:mark,age:24}


console.log("=======第三版=================");

Function.prototype.call4 = function(context) {
    var context = context || window;
    context.fn = this;

    let args = [];
    for (let i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args + ')');

    delete context.fn;
    return result;
}

// 测试一下
let value = 2;

let obj1 = {
    value: 10
}

function bar5(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age,
    }
}

bar5.call(null); // 2  node环境没有window  undefined
console.log(bar5.call4(obj1, 'mark', 18)); 
// 10
// {value:10, name: 'mark', age: 18}