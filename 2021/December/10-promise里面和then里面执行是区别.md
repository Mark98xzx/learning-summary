### promise 里面和 then 里面执行有什么区别

- 构造函数里面是同步执行的，无法取消
- then 里面是异步的，属于微任务

- 例子
```js
    new Promise(function (resolve, reject) {
        // 这里面属于宏任务，是同步执行的
        console.log('macrotask');
        resolve('result');
    }).then(function (value) {
        // `then`中的回调函数属于微任务，在`resolve`执行后被推到微任务队列等待执行
        console.log('microtask');
        console.log(value === 'result'); // true
    });
```