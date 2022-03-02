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

#### 第一步 模拟实现
那么我们该怎么模拟实现两个效果呢？
试想当调用 call 的时候，把 foo 对象改造成如下：
```js
    var foo = {
        value: 1,
        bar: function() {
            console.log(this.value)
        }
    }

    foo.bar(); // 1
```
这时候 this 就指向 foo，是不是很简单？
但是这样却给 foo 对象本身添加了一个属性，这可不行呐！
不过也不用担心，我们用 delete 再删除它不就好了~
所以我们模拟的步骤可以分为：
1. 将函数设为对象的属性
2. 执行该函数
3. 删除该函数
以上例子为例，就是：
```js
    // 第一步
    foo.fn = bar
    // 第二步
    foo.fn()
    // 第三步
    delete foo.fn
```
fn 是对象的属性名。反正最后也要删除它
根据这个思路，我们可以尝试着去写第一版的 call2 函数

```js
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
```
正好可以打印 1 哎！是不是很开心！(～￣▽￣)～


#### 第二步 模拟实现
最开始也讲了，call 函数还能给定参数执行函数。
- 举个例子：
    ```js
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
    ```
**注意：**传入的参数并不确定，这可怎么办？
不急，我们可以从 arguments 对象中获取，取出第二个到最后一个参数，然后放到一个数组里。
比如这样：
```js
    // 以上面例子为例，此时 arguments 为：
    /* 
        arguments = {
            0: f00,
            1: 'mark',
            2: '24',
            length: 3
        }
    */
    // 因为 arguments 是类数组对象，所以可以用for循环
    var args = [];
    for (let i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    // 执行之后，args 为 ["arguments[1]", "arguments[2]", "arguments[3]"]
```
不定长的参数问题解决了，我们接着把这个参数数组放到要执行的函数的参数里面去。
```js
    // 将数组里面的元素作为多个参数放进函数的形参里
    context.fn(args.join(','));
    // ??
    // 这样操作肯定不行的啦
```
或许有人想到用 es6 的方法，不过 call 的 es3 的方法，我们为了模拟实现一个 es3 的方法，要用到 es6 的方法，好像.... 嗯，也可以啦。但是我们这次使用 eval 方法拼成一个函数，类似这样：
```js
    eval('context.fn(' + args + ')');
```
这里 args 会自动调用 Array.toString() 这个方法。

- 所以 我们第二版 克服两个打问题，代码如下

```js
    // 第二版
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
```
(๑•̀ㅂ•́)و✧

#### 第三步 模拟实现
模拟代码已经完成 80% ，还有两个小点要注意：
1. this 参数可以传 null，当为 null 时，视为指向 window
    - 举个例子
    ```js
        let value = 1;
        
        function bar() {
            console.log(this.value)
        }

        bar.call(null); // 1
    ```
    虽然这个例子本身不用call，结果依然一样

2. 函数是可以有返回值的
- 举个例子：
```js
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
```
不过比较好解决，看看第三版代码
```js
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
```
到此，我们完成了 call 的模拟实现