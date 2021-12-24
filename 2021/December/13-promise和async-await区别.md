## promise和async await区别

### 1、promise
ECMAScript 6 新增的引用类型 Promise，可以通过 new 操作符来实例化。创建新期约时需要传入执行器（executor）函数作为参数。

#### 用法
- promise有三个状态，分别是pending（执行中）、success（成功）、rejected（失败）：
```js
    let n = new Promise((resolve,reject) => {
        //...
        resolve('123')
    });
    
    n.then(result => {
        console.log(result);//123
    });
```
- 无论 resolve()和 reject()中的哪个被调用，状态转换都不可撤销了。于是继续修改状态会静默 失败，如下所示：
```js
    let p = new Promise((resolve, reject) => {
        resolve(); 
        reject(); // 没有效果 
    });
```
- 为避免期约卡在待定状态，可以添加一个定时退出功能。比如，可以通过 setTimeout 设置一个 10 秒钟后无论如何都会拒绝期约的回调:
```js
    let p = new Promise((resolve, reject) => { 
        setTimeout(reject, 10000); // 10 秒后调用 reject() // 执行函数的逻辑 
    });
        
    setTimeout(console.log, 0, p); // Promise <pending>
    setTimeout(console.log, 11000, p); // 11 秒后再检查状态
```

### Promise.prototype.finally()
Promise.prototype.finally()方法用于给期约添加 onFinally 处理程序，这个处理程序在期 约转换为解决或拒绝状态时都会执行。这个方法可以避免 onResolved 和 onRejected 处理程序中出 现冗余代码。但 onFinally 处理程序没有办法知道期约的状态是解决还是拒绝，所以这个方法主要用 于添加清理代码。

### async/await
- 它可以把一个异步函数强制的处理成为一个同步函数，就很厉害，他本质也是promise，衍生出来的语法糖，写起来更优雅。async和await是配对使用的

```js
    //不加async await
    function foo () {
        Promise.resolve().then(resolve => {
            console.log("1");
        });
        console.log(3);
    }
    foo();//3  1

    //加了async await
    async function foo () {
        await Promise.resolve().then(resolve => {
            console.log("1");
        });
        console.log(3);
    }
    foo();//1 3
```

## 区别
async/await 是建立在 Promises上的，不能被使用在普通回调以及节点回调

async/await相对于promise来讲，写法更加优雅

async/await 和 Promises 很像，不阻塞

async/await 代码看起来像同步代码（以同步的方式书写异步代码）