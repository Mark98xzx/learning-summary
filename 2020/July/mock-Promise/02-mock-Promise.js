class KPromise{
    constructor(handle){
        this.status = "pending";
        this.value = undefined;
        // 添加队列
        this.resolvedQueue = []
        this.rejectedQueue = []
        // bind: 改变this的指向; 这里不能使用call，call可以改变this指向，也会执行改方法
        handle(this._resolve.bind(this), this._reject.bind(this));
    }
    _resolve(val){
        // console.log(this)
        // console.log(val)
        // 改变状态及value
        this.status = "resolved";
        this.value = val;

        // 执行then 里面成功的回调 
        // 依次执行 this.resolvedQueue 数组里的函数
        // console.log(this.resolvedQueue, this.resolvedQueue.length)
        // 由于会出现先执行函数，再加入队列的原因， 添加一个setTimeout定时器
        // js 会先执行主线程，如果有 异步任务的 会注册一个 Event Queue 回调函数，等主线程执行完后再执行
        let run = () => {
            let cb;
            while(cb=this.resolvedQueue.shift()){
                cb(val)
            }
        }
        // setTimeout(run, 0)
        // 模拟 微任务 MutationObserver  控制执行顺序
        let observer = new MutationObserver(run)
        observer.observe(document.body, {
            attributes: true  // 配置：监听属性变化
        })
        document.body.setAttribute("skkb", Math.random())
        
    }
    _reject(err){
        // console.log(err)
        this.status = "rejected";
        this.value = err;

        // 执行 then 里失败的回调
        let run = () => {
            let cb;
            while(cb=this.rejectedQueue.shift()){
                cb(err)
            }
        }
        // setTimeout(run, 0)
        // 修改为 微任务 MutationObserver
        let observer = new MutationObserver(run)
        observer.observe(document.body, {
            attributes: true  // 配置：监听属性变化
        })
        document.body.setAttribute("skkb", Math.random())
        
    }
    // then方法
    then(onResolved, onRejected){
        // 1 直接调用 无论成功失败都调用
        // onResolved(this.value)
        // onRejected(this.value)

        // 2. 判断状态 去进行执行(但是有个问题 如果继续.then呢? 或者多个 .then方法)
        // if(this.status==="resolved"){
        //     onResolved(this.value)
        // }else if(this.status==="rejected"){
        //     onRejected(this.value)
        // }

        // 3 创建加入队列 然后再去依次执行
        // 把多个 onResolved 及 onRejected 放在队列,而不是在这里直接执行
        // this.resolvedQueue.push(onResolved)
        // this.rejectedQueue.push(onRejected)

        // 为了可以 链式操作
        // 返还 KPromise 对象
        return new KPromise((resolve, reject)=>{
            // 如果这样写又回到第一次的问题，直接就执行了
            // let res = onResolved()
            // if(res instanceof KPromise){
            //     console.log("then返还的是KPromise对象")
            // }
            // resolve(res)

            // 放到一个函数，然后push到 this.resolvedQueue，并没有直接调用
            this.resolvedQueue.push(val=>{
                val = onResolved && onResolved(val)
                if(val instanceof KPromise){
                    // console.log("KPromise", val)
                    // 返还的 KPromise 对象
                    // return val  // 外层有 return 无法直接返还val
                    return val.then(resolve);
                }else {
                    // 返还的 普通值
                    resolve(val);
                }
            })

            // 失败的
            if(!this.isCatch){
                this.rejectedQueue.push(err => {
                    onRejected && onRejected(err)
                    reject(err)
                })
            }
        })

        
    }

    // 静态方法 实现
    // resolve
    static resolve(val){
        return new KPromise(resolve => {
            resolve(val)
        })
    } 
    
    // reject
    static reject(val){
        return new KPromise((resolve, reject) => {
            reject(val)
        })
    }

    // all
    static all(lists){
        return new KPromise((resolve, reject) => {
            let arr = []
            let num = 0
            for(let i = 0; i < lists.length; i++){
                lists[i].then(res => {
                    // console.log(i)
                    num++;
                    arr.push(res)
                    if(num === lists.length){
                        // 所以lists里的 KPromise 成功的结果都拿到了
                        resolve(arr)
                    }
                }, err => {
                    reject(err);
                    throw Error("error...")
                })
                
            }
        })
    }

    // race
    static race(lists){
        return new KPromise((resolve, reject) => {
            for(let i = 0; i < lists.length; i++){
                lists[i].then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            }
        })
    }

    // catch 方法
    catch(onRejected){
        this.isCatch = true
        this.then(undefined, onRejected)
    }

    // finally 方法
    finally(callback){
        this.then(res => {
            callback()
        }, err => {
            callback()
        })
    }
}