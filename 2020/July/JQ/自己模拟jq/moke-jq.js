class Jq{
    constructor(arg, root){
        if(typeof root !== "undefined"){
            this['prevObject'] = root
        }else{
            this['prevObject'] = [document]
        }
        // 情况一
        if(typeof arg === "string"){
            let eles = document.querySelectorAll(arg)
            // console.log(eles)
            // this.eles = eles
            this.addEles(eles)
            // 情况二
        }else if(typeof arg === "function"){
            window.addEventListener("DOMContentLoaded", arg)
        }else{
            // 情况三： 传入的原生对象
            // 一个dom对象、 多个dom对象
            if(typeof arg.length === 'undefined'){
                // 一个对象
                this[0] = arg
                this.length = 1
            }else{
                // 多个对象
                this.addEles(arg)
            }

        }
    }

    // 添加节点
    addEles(eles){
        eles.forEach((ele, index) => {
            this[index] = ele
        });
        this.length = eles.length
    }

    get(index){
        return this[index]
    }

    eq(index){
        // return this[index];
        // 保存上次操作的节点；
        return new Jq(this[index],this);
    }

    end(){
        return this['prevObject']
    }

    // 点击ff
    click(fn){
        // console.log("click....");
        // fn();
        // this.eles.addEventListener("click", fn)
        // 在 this 对象上 分别绑定 事件
        this.addEvent('click', fn)
        return this
    }

    on(eventName, fn){
        this.addEvent(eventName, fn)
    }
    addEvent(eventName, fn){
        for (let i = 0; i < this.length; i++) {
            // console.log(1111)
            this[i].addEventListener(eventName, fn)
        }
    }
    css(...arg){
        // 不定参
        // arguments
        if(arg.length===1){
            if(typeof arg[0] === "string"){

                // cssHooks
                if(arg[0] in $.cssHooks){
                    // 返还节点
                    return $.cssHooks[arg[0]].get(this[0])
                }

                // 情况一
                // 获取样式
                return this.getStyle(this[0], arg[0])
            }else{
                // 情况三 设置样式
                // 传入对象
                for (let i = 0; i < this.length; i++) {
                    for (let j in arg[0]) {
                        this.setStyle(this[i], j, arg[0][j])
                    }
                }
            }
        }else{
            // 情况二 设置样式
            for (let i = 0; i < this.length; i++) {
                this.setStyle(this[i], arg[0], arg[1])
            }
        }
    }
    getStyle(ele, styleName){
        return getComputedStyle(ele, null)[styleName]
    }
    setStyle(ele,styleName,styleValue){
        
        if(typeof styleValue === "number" && !(styleName in $.cssNumber && $.cssNumber[styleName])){
            styleValue = styleValue + "px"
        }
        if(styleName in $.cssHooks){
            $.cssHooks[styleName].set(ele, styleValue)
        }

        ele.style[styleName] = styleValue
    }

    // 动画功能
    animate(...arg){
        let timer = arg[1]/1000 + "s"
        for (let i = 0; i < this.length; i++) {
            this[i].style.transition = "all " + timer

            this[i].addEventListener("transitionend", arg[2])
            for(let key in arg[0]){
                this.setStyle(this[i], key, arg[0][key])
            }
        }
    }
}


function $(arg){
    // console.log(arg)
    return new Jq(arg)
}


// 不需要加单位的属性
$.cssNumber = {
    animationIterationCount: true,
    columnCount: true,
    fillOpacity: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    gridArea: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnStart: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowStart: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true,
    zoom: true
}

// 扩展新的属性 扩展性
$.cssHooks = {};