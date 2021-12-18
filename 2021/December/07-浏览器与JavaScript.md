### 
- 首先浏览器是多线程的，js 是单线程的（浏览器只给 js 分配了一个线程）
- 单线程的特点就是一次只能处理一件事情。（后一个任务需要等待前一个任务的执行，这就可能出现长时间的等待）
- js 在单线程中实现异步机制主要依赖浏览器的任务队列
- 任务队列分为主任务队列，等待任务队列
- 在主任务队列自上而下执行的时候，如果遇到异步操作任务，不会立即执行而是把它放到等待任务队列中去排队
- 当主任务队列完成后才会到等待任务队列中进行查找（主任务队列不完，不管等待任务队列是否到达时间，都不做处理，会继续等待主任务队列完成）
- 等待任务队列中的内容，先达到条件的会被重新放到主任务队列中执行，然后接着去等待任务队列中查找
- 这就是因为 js 是单线程的。只能处理一件事情
- 单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等待

### 同步与异步任务
- **同步：**在一个线程上同一个时间只能做一件事。当前事情完成才能进行下一个任务
- **异步：**在主栈中执行一个任务，但是发现这个任务是一个异步的操作，会把它移除主栈放到等待任务队列中
    - 异步编程里面又分为**宏任务**和**微任务**
    - **宏任务：** 定时器、事件绑定、ajax、回调函数、node中的 fs 模块
    - **微任务：** promise、async/await、process.nextTick
    - 执行顺序：先执行主任务，执行完接着执行微任务，最后执行宏任务，按照条件的顺序依次执行
    - 这种循环机制又叫事件循环（event loop）

- 案例
    ```js
        async function as1() {
            console.log("as1 start");
            await as2();
            console.log("as1 end");
        }

        async function as2() {
            console.log("as2");
        }

        console.log("script start");

        setTimeout(function () {
            console.log("setTimeout");
        }, 0);

        as1();

        new Promise(function (resolve) {
            console.log("prom1");
            resolve();
        }).then(function () {
            console.log("prom2");
        });
        console.log("script end");

        //script start => as1 start => as2 => prom1 => script end
        //=> as1 start => prom2 => setTimeout
    ```