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