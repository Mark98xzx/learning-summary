// import MyEvent from './myEvent.js'

export default class Dialog extends EventTarget{
    constructor(options){
        // console.log(options)
        super()
        // 默认配置
        let opts = {
            width: "30%",
            height: "250px",
            title: "测试标题",
            content: "测试内容",
            dragable: true, //是否可拖拽
            maskable: true, //是否有遮罩
            isCancel: false, //是否有取消
        }
        // 合并配置  // 展开运算符也可以
        // Object.assign 第一层深拷贝，第二次浅拷贝
        let newOpts = Object.assign(opts, options)
        this.newOpts = newOpts
        // console.log(newOpts)
        // 另外一种方法
        // for (const key in options) {
        //     if (options.hasOwnProperty(key)===true) {
        //         opts[key] = options[key]
        //     }
        // }
        // let newOpts = opts
        // console.log(newOpts)
        this.init()
    }

    init(){
        this.createHtml()
        // 判断是否有遮罩参
        if(!this.newOpts.maskable){
            this.dialogEle.querySelector(".k-wrapper").style.display = "none"
        }
        // 绑定关闭事件
        // 直接在document上绑，这种方法不好，如果有多个对话框，会把全部的对话框都关闭
        // document.querySelector(".k-close").onclick = ()=>{
        //     console.log(111222)
        //     this.close()
        // }
        // 第二种
        // this.dialogEle.querySelector(".k-close").onclick = ()=>{
        //     // console.log(111222)
        //     this.close()
        // }
        // // 这个节点是运用三目运算符，如果初始化为false，绑定会报错
        // // this.dialogEle.querySelector(".k-default").onclick = ()=>{
        // //     this.close()
        // // }
        // this.dialogEle.querySelector(".k-default") && (this.dialogEle.querySelector(".k-default").onclick = ()=>{
        //     this.close()
        // })
        // 优化（不用每次获取节点，已经判断）// 取消按钮也不需要判断，不是绑定在取消按钮上面
        // 第三种 （事件委托）性能会更好一点  
        let kdialog = this.dialogEle.querySelector(".k-dialog")
        kdialog.addEventListener("click", e => {
            // console.log(e)
            let className = e.target.className;
            // console.log(className)
            switch(className){
                case 'k-close':
                    this.close();
                    this.newOpts.cancel();
                    break;
                case 'k-default':
                    this.close();
                    this.newOpts.cancel();
                    break;
                case 'k-primary':
                    this.close();
                    // this.newOpts.success();
                    // 使用自定义事件
                    this.sure()
                    break;
                default:
                    console.log("未点中");
                    break;
            }
        })

        // 绑定自定义事件(继承MyEvent)
        // this.addEvent("success", this.newOpts.success)
        // 继承 EventTarget 父类
        this.addEventListener("success", this.newOpts.success)

        // 控制是否拖拽
        if(this.newOpts.dragable){
            this.drag()
        }
    }

    sure(value){
        // 继承MyEvent
        // this.trigger("success")
        // 继承 EventTarget
        // 继承 EventTarget 需要实例化 
        // 在触发 success 事件是同时，会把把 数据传回去
        this.dispatchEvent(new CustomEvent("success",{
            // 只能是detail 参考 EventTarget MDN文档
            detail: value
        }))
    }

    // 创建html
    createHtml(){
        let dialogEle = document.createElement("div")
        dialogEle.innerHTML = `<div class="k-wrapper"></div>
        <div class="k-dialog" style="width:${this.newOpts.width};height:${this.newOpts.height}">
            <div class="k-header">
                <span class="k-title">${this.newOpts.title}</span><span class="k-close">X</span>
            </div>
            <div class="k-body">
                <span>${this.newOpts.content}</span>
            </div>
            <div class="k-footer">
                ${this.newOpts.isCancel?'<span class="k-default">取消</span>': ''}
                <span class="k-primary">确定</span>
            </div>
        </div>`
        dialogEle.style.display = "none"
        this.dialogEle = dialogEle
        document.querySelector("body").appendChild(dialogEle)
    }
    open(){
        this.dialogEle.style.display = "block"
    }
    close(){
        this.dialogEle.style.display = "none"
    }
    // 拖拽
    drag(){
        // 实现拖拽逻辑
        let kDialogDrag = this.dialogEle.querySelector(".k-dialog")
        kDialogDrag.onmousedown = e => {
            let x = e.clientX - kDialogDrag.offsetLeft;
            let y = e.clientY - kDialogDrag.offsetTop;
            kDialogDrag.onmousemove = e => {
                let xx = e.clientX - x;
                let yy = e.clientY - y;
                kDialogDrag.style.left = xx + "px";
                kDialogDrag.style.top = yy + "px";
            }
        }
        kDialogDrag.onmouseup = () => {
            kDialogDrag.onmousemove = ""
        }
    }
};

export class ExtendsDialog extends Dialog{
    constructor(options){
        super(options)
    }
    createHtml(){
        // 会覆盖上一层的 createHtml，会取不到 .k-body （会重写了）
        // 所以 需要：super.createHtml()
        super.createHtml()
        let myInput = document.createElement("input")
        myInput.classList.add("input-inner")
        this.myInput = myInput
        this.dialogEle.querySelector(".k-body").appendChild(myInput)
    }
    sure(){
        let value = this.myInput.value;
        // 把value传到父类
        super.sure(value)
    }
}

// 自定义组件 dialog
class ShowDialog extends HTMLElement{
    constructor(){
        super();
        // console.log(this);
        this.innerHTML = `<button>${this.innerText}</button>`
        let dialog = new Dialog({
            title: this.title,
            success: e =>{
                // 内部触发
                // console.log("success")

                // 外部触发 ---> 到首页 addEventListener 事件
                this.dispatchEvent(new CustomEvent("confim"))
            }
        })
        this.onclick = () => {
            dialog.open()
        }
    }
    // 定义属性，不是方法
    get title (){
        return this.getAttribute("title") || "默认标题"
    }
    get width(){
        return this.getAttribute("width") || "30%"
    }
}

customElements.define("show-dialog",ShowDialog)
