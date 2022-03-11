let value = 2;

let foo = {
    value: 1,
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

let bindFoo = bar.bind(foo, 'mark');

let obj = new bindFoo('18'); // undefined mark 18

console.log(obj.habit); // shopping

console.log(obj.friend); // kevin

console.log("======== 三版 ========");
Function.prototype.mybind = function(context) {
    let self = this;
    let args = Array.prototype.slice.call(arguments, 1)

    let fBound = function() {
        let bindArgs =  Array.prototype.slice.call(arguments);
        //  当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
        // 以上面的 demo 为例，如果改成 `this instanceof fBound ? null : context`,实例只是一个空对象，将 null 改成 this，实例会具有 habit 属性
        // 当作为普通函数时，this指向 window ，此时结果为 false，将绑定函数的 this 指向 context
        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
    }

    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    fBound.prototype = this.prototype;
    return fBound;
}

let bindFoo1 = bar.mybind(foo, 'mark001');
let obj1 = new bindFoo1('20'); // undefiend mark001 20
let obj2 = bindFoo1('24'); // 1 mark001 24

console.log(obj1.habit); // shopping
console.log(obj1.friend); // kevin