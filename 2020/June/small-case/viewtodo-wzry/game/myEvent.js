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