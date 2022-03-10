let foo = {
    value: 1,
};

function bar() {
    return this.value;
};

let bindFoo = bar.bind(foo);

console.log(bindFoo()); // 1

console.log("====================");

let foo1 = {
    value: 1,
};

function bar1(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);
};

let bindFoo1 = bar1.bind(foo, 'test');

bindFoo1('20'); // 1 test 18

console.log("========== 2 ==========");

let foo2 = {
    value: 10,
};

function bar2(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);
};

Function.prototype.bind2 = function(context) {
    let self = this;
    // 获取 bind2 函数从第二个参数到最后一个参数
    let args = Array.prototype.slice.call(arguments, 1);

    return function() {
        // 这时候的 arguments 是指 bind 返回的函数传入的参数
        let bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(context, args.concat(bindArgs));
    }
}

let bindFoo2 = bar2.bind2(foo2, 'mark');

bindFoo2('22'); // 10 mark 22