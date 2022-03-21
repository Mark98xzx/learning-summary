## bind
> 一句话介绍 bind：

bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数作为它运行时的 this，之后的一系列参数将会在传递的实参前传入作为它的参数。（来自MDN）

> 由此我们可以首先得出 bind 函数的两个特点：
1. 返回一个函数
2. 可以传入参数

### 返回函数的模拟实现
从第一个特点开始，举个例子：
```js
    let foo = {
        value: 1
    };

    function bar() {
        console.log(this.value);
    };

    // 返回了一个函数
    let bindFoo = bar.bind(foo);

    bindFoo(); // 1
```
关于指定 this 指向，我们可以使用 call 或者 apply 实现
第一版
```js
    Function.prototype.bind2 = function(context) {
        let self = this;
        return function () {
            return self.apply(context);
        }
    }
```
此外，之所以 return self.apply(context), 是考虑到绑定函数可能是有返回值的，还是这个例子：
```js
    let foo = {
        value: 1,
    };

    function bar() {
        return this.value;
    };

    let bindFoo = bar.bind(foo);

    console.log(bindFoo()); // 1
```

### 传参 模拟实现
接下来看第二点，可以传入参数。这个就有点让人费解了，在 bind 的时候，是否可以传参数呢？在执行 bind 返回的函数的时候，可不可以传参呢？再看下面例子：
```js
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
```

函数需要传 name 和 age 两个参数，竟然还可以在bind 的时候，只传 一个 name，在执行返回的函数的时候，再传另外一个参数 age！！！
这里我们可以用 arguments 进行处理。

第二版
```js  
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
```

### 构造函数效果的模拟实现
完成了这两点，还有最难的部分，因为 bind 还有个特点，就是
> 一个绑定函数也能使用 new 操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数
也即是说 当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效。举个栗子：

```js
    let value = 2;

    let foo = {
        value: 1,
    };

    function bar(name, age) {
        this.action = 'shopping';
        console.log(this.value);
        console.log(name);
        console.log(age);
    }

    bar.prototype.friend = 'kevin';

    let bindFoo = bar.bind(foo, 'mark');

    let obj = new bindFoo('18'); // undefined mark 18

    console.log(obj.action); // shopping

    console.log(obj.friend); // kevin
```
**注意：**尽管在全局和 foo 中都声明了 value 的值，最后依然返回了 undefined，说明绑定的 this 生效了，这里需要深入了解 new 的模拟实现（后面学习）。可以知道这个时候的this 指向 obj了。

所以我们可以通过修改返回的函数的原型来实现：
```js
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
```

### 构造函数效果的优化实现
但是在这个写法中，我们直接将 fBound.prototype = this.prototype，我们直接修改 fBound.prototype 的时候，也会直接修改绑定函数的 prototype。这个时候，我们可以通过一个空函数来进行中转：
```js
    // 第四版
    Function.prototype.mybind = function(context) {
        let self = this;
        let args = Array.prototype.slice.call(arguments, 1)

        let fNOP = function(){};

        let fBound = function() {
            let bindArgs =  Array.prototype.slice.call(arguments);
            return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
        }

        // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP;
        return fBound;
    }
```

