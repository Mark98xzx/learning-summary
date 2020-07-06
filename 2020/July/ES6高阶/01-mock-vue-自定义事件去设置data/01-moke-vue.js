class Vue extends EventTarget{
    constructor(options){
        super()
        this.$options = options;
        this._data = options.data
        this.compile()
        this.observer(this._data)
    }

    // 观察 观察起来
    observer(data){
        for(let key in data){
            let value = data[key]
            let _this = this
            Object.defineProperty(data, key, {
                configurable: true,
                enumerable:true,
                get(){
                    console.log("get....")
                    // return data[key]  不能直接这样return; 会产生爆栈
                    // 因为会反复触发get。你在 get() 方法里面取值， 但若是 return data[key] ， 它会促发又一个get()事件，如此循环....
                    // 修改下面这种写法 在外面先存 data[key]
                    return value
                },
                set(newValue){
                    console.log("set......")

                    // 继承 EventTarget 设置自定义事件
                    let event = new CustomEvent(key, {
                        detail: newValue
                    })
                    _this.dispatchEvent(event)

                    value = newValue
                }
            })
        }
    }



    // 编译 插值表达式
    compile(){
        let ele = document.querySelector(this.$options.el)
        // 调取compileNodes
        this.compileNodes(ele)
    }

    // 递归查找
    compileNodes(ele){
        let childNodes = ele.childNodes
        // console.log(childNodes)
        // 节点: 有两种:  文本 --- 元素节点
        childNodes.forEach(node => {
            // console.log(node)
            // 
            if(node.nodeType === 1){
                // 元素节点
                // 需要递归查找
                if(node.childNodes.length>0){
                    this.compileNodes(node)
                }

            }else if(node.nodeType === 3){
                // 文本节点
                // 需要匹配 "{{}}" 的文本
                /*
                    正则
                       +: 一次到多次
                       *: 0次到多次 
                       s: 匹配空格
                       S: 非空格
                       ^: 在正则开头,以什么开头; 在[]中,是以什么集合里的非
                       g: 全局匹配
                       $1: 分组; 以 "()" 分组
                */
                let reg = /\{\{\s*([^\{\}\s]+)\s*\}\}/g;
                let textContent = node.textContent;
                // console.log(textContent)
                if(reg.test(textContent)){
                    // console.log("有大括号表达式")
                    // 获取数据的下标
                    let $1 = RegExp.$1;
                    // console.log($1)
                    let rData = this._data[$1]
                    // console.log(rData)
                    // 将数据渲染到视图
                    node.textContent = node.textContent.replace(reg, rData)

                    // 绑定自定义事件
                    this.addEventListener($1, e => {
                        // console.log("自定义事件", e.detail)
                        // 重新渲染模板; 获取新值
                        let oldValue = this._data[$1];
                        let newValue = e.detail;
                        let reg = new RegExp(oldValue)
                        node.textContent = node.textContent.replace(reg, newValue)
                    })
                }
            }
        })
    }
}