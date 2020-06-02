// vue3 响应式原理: 利用 Proxy 对象 对数组进行拦截
// 原始 => 响应式
const toProxy = new WeakMap() // 形如 obj: observed
// 响应式 => 原始
const toRow = new WeakMap()   // 形如 observed: obj

function isObjesct(obj){
    return typeof obj === 'object' || obj === null
}

function hasOwn(obj, key){
    return obj.hasOwnProperty(key)
}

function reactive(obj){
    if(!isObjesct){
        return obj
    }

    // 检查缓存
    if(toProxy.has(obj)){
        return toProxy.get(obj)
    }
    // 传入obj就是代理对象,此时不用反复代理
    if(toRow.has(obj)){
        return obj
    }

    const observed = new Proxy(obj, {
        get(target, key, receiver){
            // 访问
            const res = Reflect.get(target, key, receiver)
            console.log(`获取${key}: ${res}`)

            // 依赖收集
            track(target, key)
            // target 是 obj， key 是 name

            return isObjesct(res) ? reactive(res) : res
        },
        set(target, key, value, receiver){
            // 新增和更新
            const hadKey = hasOwn(target, key) // ADD 或 SET
            const oldVal = target[key]
            const res = Reflect.set(target, key, value, receiver)
            if(!hadKey){
                console.log(`新增${key}: ${value}`)
                trigger(target, "ADD", key)
            }else if(oldVal !== value){
                console.log(`设置${key}: ${value}`)
                trigger(target, 'SET', key)
            }
            return res
        },
        deleteProperty(target, key){
            // 删除
            const hadKey = hasOwn(target, key)
            const res = Reflect.deleteProperty(target, key)
            // key 存在并且删除成功
            if(res&&hadKey){
                console.log(`删除${key}: ${res}`)
                trigger(target, 'DELETE')
            }
            return res
        }
    })
    
    // 缓存
    toProxy.set(obj, observed)
    toRow.set(observed, obj)

    return observed
}

const activeReativeEffectStack = []

// 依赖收集执行
// 基本结构 {target: {key: [eff1, eff2]}}
let targetsMap = new WeakMap()

function track(target, key){
    // 从栈中获取响应函数
    const effect = activeReativeEffectStack[activeReativeEffectStack.length - 1]
    if(effect){
        let depsMap = targetsMap.get(target)
        if(!depsMap){
            // 首次访问 target
            depsMap = new Map()
            targetsMap.set(target, depsMap)
        }

        // 存放 key
        let deps = depsMap.get(key)
        if(!deps){
            deps = new Set()
            depsMap.set(key, deps)
        }
        if(!deps.has(effect)){
            deps.add(effect)
        }
    }
}

function effect(fn) {
    // 1. 处理异常
    // 2. 执行函数
    // 3. 放置到 activeReativeEffectStack
    const rxEffect = function (...args) {
        try{
            activeReativeEffectStack.push(rxEffect)
            return fn(...args) // 执行函数触发依赖收集
        } finally {
            activeReativeEffectStack.pop()
        }
    }

    rxEffect() // 默认立即执行
    return rxEffect
}

// 触发target.key 对应响应函数
function trigger(target, type, key) {
    // 获取依赖表
    const depsMap = targetsMap.get(target)
    if(depsMap){
        // 获取响应函数集合
        const deps = depsMap.get(target)
        const effects = new Set()
        if(deps){
            // 执行所有响应函数
            deps.forEach(effect => {
                // effect()
                effects.add(effect)
            })
        }

        // 数据新增或删除
        if(type === 'ADD' || type === 'DELETE'){
            if(Array.isArray(target)){
                const deps = depsMap.get('length')
                if(deps){
                    deps.forEach(effect => {
                        effects.add(effect)
                    })
                }
            }
        }
        // 获取已存在的Dep Set 执行
        effects.forEach(effect => effect())
    }
}

const data = {foo: 'foo', bar: {a: 1}}
const react = reactive(data)

// 1. 获取
// react.foo  // ok
// 2. 设置已经存在的属性
// react.foo = 'fooooooooooo'
// 3. 设置不存在的属性
// react.baz = 'bazzzzzzz'
// 4. 嵌套对象
// react.bar.a = 100

// 避免重复代理
// console.log(reactive(data) === react) // true
// reactive(react)

effect(() => {
    console.log('count发生了变化: ', react.foo)
    // dom
})
react.foo = 'ffffffffffffffo'

// 总结
// 使用 ES6 proxy 代理对象
// 不用给每个属性都设置set,get方法，不用跟 Object.defineProperty 一样触发循环调用
// 可以避免重复代理
