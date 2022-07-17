### vue2和vue3自定义指令

- 什么是指令？
    - 在vue中提供了一些对于页面 + 数据的更为方便的输出,这些操作就叫做指令, 以v-xxx表示
    - 类似于html页面中的属性 `<div v-xxx ></div>`

- 指令的作用是什么呢？
    - 指令中封装了一些DOM行为, 结合属性作为一个暗号, 暗号有对应的值,根据不同的值，框架会进行相关DOM操作的绑定

- vue中常用的v-指令有那些呢？
    - v-text 元素的InnerText属性,必须是双标签
    - v-html 元素的innerHTML
    - v-if 判断是否插入这个元素
    - v-else-if
    - v-else
    - v-show 隐藏元素 如果确定要隐藏, 会给元素的style加上display:none
    - v-model 对于输入框实现数据的双向绑定

### vue2
#### 自定义指令中传递的三个参数
- el: 指令所绑定的元素，可以用来直接操作DOM。
- binding: 一个对象，包含指令的很多信息。
- vnode: vue编译生成的虚拟节点

#### 自定义指令的生命周期
- 自定义指令有五个生命周期（也叫钩子函数）分别是：bind，instead，update、componentUpdate、unbind
    1. bind：只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个绑定时执行一次的初始化动作
    2. inserted：被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document中）
    3. update:被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
    4. componentUpdated:被绑定元素所在模板完成一次更新周期时调用。
    5. unbind:只调用一次，指令与元素解绑时调用。
    ```js
        bind: () => {//被绑定
            console.log('1 - bind');
        },
        
        inserted: () => {//绑定到节点
            console.log('2 - inserted');
        },
        
        update: () => {//组件更新
            console.log('3 - update');
        },
        
        componentUpdated: () => {//组件更新完成
            console.log('4 - componentUpdated');
        },
        
        unbind: () => {//解绑
            console.log('5 - bind');
        }
    ```

### 总结
- 自定义指令的命名规则
- 自定义指令的生命周期（钩子函数），调用时机
- 钩子函数的参数有哪些

### vue3 自定义指令的变化

- 每个钩子函数中，参数的变化：
    - el: 指令绑定的元素，可以用来总结操作DOM
    - binding: 数据对象，包含以下属性
        1. instance：当前组件的实例，一般推荐指令和组件无关，如果有需要使用组件上下文ViewModel，可以在这里获取
        2. value：指令的值
        3. oldValue：指令的前一个值，在 beforeUpdate 和 Updated 中，可以和 value 是相同的内容
        4. arg：传给指令的参数，例如v-on:click中的click
        5. modifiers：包含修饰符的对象, 例如v-on.stop:click 可以获取到一个{stop: true}的对象
            - vnode: vue编译生成的虚拟节点
            - preVNode: Update时的上一个虚拟节点

#### vue3 自定义指令的生命周期和组件的生命周期类似:

- created - 元素创建后，但是属性和事件还没有生效时调用。
- beforeMount- 仅调用一次，当指令第一次绑定元素的时候。
- mounted- 元素被插入父元素时调用.
- beforeUpdate: 在元素自己更新之前调用
- updated - 元素或者子元素更新之后调用.
- beforeUnmount: 元素卸载前调用.
- unmounted -当指令卸载后调用，仅调用一次

- 全局自定义指令的写法
```js
    let app = createApp(App)
    app.directive('highlight', {
        beforeMount(el, binding, vnode) {
            el.style.background = binding.value
        }
    })
```

- 局部自定义指令的写法
```js
    directives: {
        highlight: {
            beforeMount(el, binding, vnode) {
                el.style.background = binding.value;
            },
        }
    }
```