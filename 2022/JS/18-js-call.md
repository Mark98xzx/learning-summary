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

#### 第一步
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