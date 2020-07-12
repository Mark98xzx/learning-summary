class KPromise{
    constructor(handle){
        this.status = "pending";
        this.value = undefined;
        // 添加队列
        this.resolvedQueue = []
        this.rejectedQueue = []
        // bind: 改变this的指向
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
        setTimeout(run, 0)
        
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
        setTimeout(run, 0)
        
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
        this.resolvedQueue.push(onResolved)
        this.rejectedQueue.push(onRejected)
    }
}