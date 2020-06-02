// 引入vue
import Vue from 'vue'
// 引入 App.vue
import App from './App'

// ES
import calc from './modules/calc.js'
// 引入样式
import '@/assets/myindex.css'
// 引入 scss 文件
import './assets//index.scss'
// 引入 lass 文件
import './assets/index.less'
// 引入 bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


// 处理当前页面的逻辑
let ipt1 = document.querySelector("#ipt1")
let ipt2 = document.querySelector("#ipt2")
let ipt3 = document.querySelector("#ipt3")
let sel = document.querySelector("#sel")
let btn = document.querySelector("#btn")

let obj = {
    name: '小红',
    age: 18,
    sayHi(){
        console.log('hello word!')
    }
}
obj.sayHi()

btn.onclick = function(){
    // 获取输入框内容
    let val1 = ipt1.value
    let val2 = ipt2.value
    // 获取运算符
    let pro = sel.value
    // 判断
    switch (pro) {
        case "0":
            // 加法
            ipt3.value = calc.add(+val1, +val2)
            break;
        case "1":
            ipt3.value = calc.sub(+val1, +val2)
            break;
        case "2":
            ipt3.value = calc.multiplication(+val1, +val2)
            break;
        case "3":
            ipt3.value = calc.division(+val1, +val2)
            break;
        default:
            break;
    }
}

// 创建一个 vue 实例
new Vue({
    el: "#app",
    render: h => h(App) // 将App渲染到 #app 中
})