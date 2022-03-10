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
