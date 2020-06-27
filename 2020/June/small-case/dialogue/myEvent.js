import Dialog from "./dialog"

export default class MyEvent{
    constructor(){
        this.handle = {}
    }
    // 添加事件
    addEvent(eventName, fn){
        if(typeof this.handle[eventName] === "undefined"){
            this.handle[eventName] = []
        }
        this.handle[eventName].push(fn)
    }
    // 移除事件
    removeEvent(eventName, fn){
        if(typeof this.handle[eventName] === "undefined"){
            return
        }
        for (let i = 0; i < this.handle[eventName].length; i++) {
            if(this.handle[eventName][i] === fn && typeof fn === "function"){
                // 把方法删除
                this.handle[eventName].splice(i, 1)
                break;
            }
        }
    }
    // 触发
    trigger(eventName){
        if(typeof this.handle[eventName] === "undefined"){
            return 
        }
        this.handle[eventName].forEach(v => {
            v()
        })
    }
}

