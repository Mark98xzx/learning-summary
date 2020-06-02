// vue2对象响应式原理：Object.defineProperty()
// vue2 数组响应式原理：覆盖可以修改数组的7个方法
// 从数组原型中获取这 7 个方法，并覆盖为可以发送更新通知的函数实现
const originalProto = Array.prototype
const arrayProto = Object.create(originalProto)
;['push', 'pop', 'shift', 'unshift', 'splice', 'reverse', 'sort'].forEach(
    method => {
        arrayProto[method] = function () {
            // 做之前的事情
            originalProto[method].apply(this, arguments)

            // 通知更新
            notifyUpdate()
        }
    }
)

// 思想：递归遍历传入obj，定义每个属性的拦截
function observe(obj) {
    if (typeof obj !== 'object' || obj == null) {
        return obj
    }

    // 判断类型：如果是数组则替换它的原型
    if(Array.isArray(obj)){
        Object.setPrototypeOf(obj, arrayProto)
    }else{
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            // 对 obj 每个 key 执行拦截
            defineReactive(obj, key, obj[key])
        }
    }

}

// 具体定义指定的key拦截器
function defineReactive(obj, key, val) {
    // 递归遍历
    observe(val)

    // val实际上是一个闭包
    Object.defineProperty(obj, key, {
        get() {
            return val
        },
        set(newVal) {
            if (newVal !== val) {
                // val可能是对象
                observe(newVal)
                notifyUpdate()
                val = newVal
            }
        }
    })
}

function notifyUpdate() {
    console.log('页面更新！')
}

const data = { foo: 'foo', bar: {a: 1}, tua: [1, 2, 3] }
observe(data)
// 1. 普通更新
// data.foo = 'fooooooooooo'

// 2. 嵌套属性更新
// data.bar.a = 10
// data.dog = "dog"  // 没有的属性 是不行的

// 3. 赋值是对象
// data.bar = {a: 10}

// 4. 数组
data.tua.push(4)

// 总结 vue2
// 1. 需要响应化的数据较大，递归遍历性能不好、消耗较大
// 2. 新增或者删除属性无法监听
// 3. 数组响应化需要额外实现
// 4. 修改语法有限制

