## call
- 一句话介绍call
    > call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或者方法

- 举个例子
```js
    var foo = {
        value: 1
    };

    function bar() {
        console.log(this.value)
    };

    bar(); // undefined

    bar.call(foo); // 1
```
**注意两点**
    1. call改变了 this 的指向，指向到 foo
    2. bar 函数执行了

### 模拟实现
