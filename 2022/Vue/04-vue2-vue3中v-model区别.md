## vue2 与 vue3 中的 v-model区别

### vue2 中的 v-model
- vue2中的 v-model，它主要用于表单元素和自定义组件上。v-model 本质上是一个语法糖，会对用户输入做一些特殊处理以达到更新数据，其处理就是给使用的元素绑定属性和事件。

- v-model 使用在表单元素上时，会根据元素不同采取不同的的处理：
    - 当`<input type="text">`文本 和 `<textarea>`上使用时，会默认给元素绑定名为 value 的 prop 和名为 input 的事件
    - 当`<input type="checkbox">`复选框 和 `<input typex="radio">`单选框 上使用时，会默认给元素绑定名为 checked 的 prop 和名为 change 的事件
    - 当 `<select>`选择框 上使用时，则绑定名为 value 的 prop 和名为 change 的事件

> 这些是 Vue 默认帮我们处理的，可以直接使用。但是你也会发现一些第三方组件也可以使用 v-model ，比如 Element 中的 Input 组件。这是因为这些组件自己实现了 v-model，原理其实就是上面说到的绑定属性和事件。

- 我们可以尝试实现一下 v-model，来开发一个简单的输入组件，就叫 MyInput

```vue
    <template>
        <div>
            <input type="text" :value="value" @input="$emit('input', $event.target.value)">
        </div>
    </template>

    <script>
        export default {
            props: {
                value: String, // 默认接收一个名为 value 的 prop
            }
        }
    </script>
```
- 上面代码就实现了组件的 v-model 功能，当在这个组件上使用 v-model

```js
    <my-input v-model="msg"></my-input>
```
- 等同于

```js
    <my-input :value="msg" @input="msg = $event" ></my-input>
```

- 还提供了 model 选项，用于将属性或事件名称改为其他名称，比如上面的 MyInput 组件，我们改一下：

```vue
<template>
    <div>
        <input
        type="text"
        :value="title"
        @input="$emit('change', $event.target.value)"
        />
    </div>
</template>

<script>
    export default {
        model: {
            prop: "title", // 将默认的 prop 名 value 改为 title
            event: "change", // 将默认的事件名 input 改为 change
        },
        props: {
            title: String, // 注意 template 代码中也要修改为 title
        },
    };
</script>
```

- 此时使用组件
```js
    <my-input v-model="msg"></my-input>

    // 等同于
    <my-input :title="msg" @change="msg = $event" ></my-input>
```

### 使用 .sync 修饰符
- vue 提供一个 .sync 的修饰符，效果跟 v-model 一样，也是便于子组件数据更改后自动更新父组件相关数据。实现 .sync 的方式与实现 v-model 异曲同工，区别就是抛出的事件名需要是 update:myPropName 的结构。

- 拿上面的 MyInput 说明，我们还是传入一个 title 的 prop，同时组件内部抛出 update:title 事件，代码如下：
```js
    <input type="text" :value="title" @input="$emit('update:title', $event.target.value)" />
```
- 此时如果使用这个组件，正常应该是这样
```js
    <my-input :title="msg" @update:title="msg = $event" ></my-input>
```
- 可以使用 .sync 修饰符来简化
```js
    <my-input :title.sync="msg" />
```
> 可以看到 .sync 和 v-model 所能达到的效果是一样的，用什么就看你什么场景，一般表单组件上都是用 v-model

### vue3 中的v-model

#### 修改默认 prop 名和事件名
- 当在自定义组件上，v-model 默认绑定的 prop 名从 value 变为 modelValue，而事件名也从默认的 input 该为 update:modelValue,在vue3 中编写上面的 MyInput 组件，需要这样：

```vue
<template>
    <div>
        <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" /> // 事件名改为 update:modelValue
    </div>
</template>
<script>
    export default {
        props: {
            modelValue: String, // 默认 prop 从 value 改为 modelValue
        }
    }
</script>
```
- 使用组件时：
```js
    <my-input v-model="msg" />

    // 等同于
    <my-input :modelValue="msg" @update:modelValue="msg = $event" />
```

### 废除 model 选项 和 .sync 修饰符

- vue3 中移除了 model 选项，这样就不可以在组件内修改默认 prop 名了。现在有一种更简单的方式，就是直接在 v-model 后面传递要修改的 prop 名：

```js
    // 要修改默认 prop 名，只需要在 v-model 后面接上 ：propName， 例如修改为 title
    <my-input v-model:title="msg" />

    // 等同于
    <my-input :title="msg" @update:title="msg = $event" />
```

- 注意组件内部也要修改 props：

```vue
<template>
    <div>
        <input type="text" :value="title" @input="$emit('update:title', $event.target.value)" />
    </div>
</template>
<script>
    export default {
        // 此时这里不需要 model 选项来修改了
        props: {
            title: String, // 修改为 title， 注意template 中也要修改
        }
    }
</script>
```

- 同时，.sync 修饰符也被移除了，如果你尝试使用它，会报这样的错误：
    > '.sync' modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead
    - 错误提示中说明了，可以使用 v-model:propName 的方式来替代 .sync，因为本质上效果是一样的。

### 使用多个 v-model
- Vue3 中支持使用多个 v-model，属于新增功能，使得组件数据更新更灵活。例如有这样一个表单子组件，用户输入的多个数据都需要更新到父组件中显示，可以这样写：

- 表单子组件 Form
```vue
<template>
  <div class="form">
    
    <label for="name">姓名</label>
    <input id="name" type="text" :value="name" @input="$emit('update:name', $event.target.value)">
    
    <label for="address">地址</label>
    <input id="address" type="text" :value="address" @input="$emit('update:address', $event.target.value)">
  
  </div>
</template>

<script>
export default {
  props:{
    name: String,
    address: String
  }
}
</script>
```

- 父组件使用这个组件时：
```js
    <child-com v-model:name="name" v-model:address="address" />

    // 显示
    <div>{{ name }}</div>
    <div>{{ address }}</div>
```

## 总结
### vue2 中的两种写法
- 父子组件通信，都是单向的，很多时候需要双向通讯
    1. 父组件使用： msg.sync="value" 子组件使用 $emit('update:value', 'value改变后的值')
    2. 父组件传值直接传对象，子组件收到对象后可随意改变对象的属性，但不能改变对象本身
    3. 父组件使用 v-model
    > 第一种曾经被废除过，由于维护成本的原因被删掉，但经过证实，确实有存在的意义，又被加上。

### v-model 写法一
- 父组件
```html
<template>
    <div>
        <child-com v-model="test" />
        <p> {{ '外面的值：' + test }} </p>
        <button @click="handleClick">外面改变里面值</button>
    </div>
<template>
<script>
    import childCom from './childCom.vue';
    export default {
        components: {
            childCom,
        }
        data () {
            return {
                test: '',
            }
        },
        methods: {
            handleClick() {
                this.test += 1;
            }
        }
    }
</script>
```
- 子组件 childCom
```html
    <template>
        <div>
            <p> {{ '里面的值：' + msg }} </p>
            <button @click="handleClick">里面改外面的值</button>
        </div>
    </template>

    <script>
        export default {
            model: { // 使用model， 这儿2个属性，prop属性说，我要将test作为该组件被使用时（此处为childCom组件被父组件调用）v-model能取到的值，event说，我emit ‘editFn’ 的时候，参数的值就是父组件v-model收到的值。
                prop: 'test',
                event: 'editFn',
            },
            props: {
                test: ''
            },
            methods: {
                handleClick() {
                    this.$emit('editFn', this.test+2)
                }
            }
        }
    </script>
```

### v-model 写法二
- 父组件
```html
<template>
    <div>
        <child-com v-model="test" />
    </div>
</template>
```
- 子组件 child-com
```html
<template>
    <div>
        <p> {{ '里面的值：' + value }} </p> 
        <button @click="handleClick">里面改变外面值</button>
    </div>
<template>
<script>
    export default {
        props: {
            value: { // 必须使用 value
                default: '',
            }
        },
        methods: {
            handleClick() {
                this.$emit('input', this.value+3); // 这里必须用 input 发送数据，发送的数据会被父元素 v-model="test" 接收到，再被 value=test 传回来。
            }
        },
    }
</script>
```

#### vue3中的用法
##### 一、v-model：双向绑定
- Vue3：v-model规定：
    - 属性名任意（假设为xxx），事件名必须为 update:xxx
    - 效果
        - 未使用 v-model
        ```html
            <Com :value="value" @update:value="value=$event" />
        ```
        - 使用v-model
        ```html
            <Com v-model:value="value" />
        ```
    - [查看官方文档](https://v3.cn.vuejs.org/guide/migration/v-model.html#v-model)

##### 二、emit
- 新增emit用法，与this.$emit作用相同
    - 注意：新增emit没有 ''多乐'' 符
    ```js
        setup(props, context) {
            context.emit('update:value', newValue); //事件名 ，事件参数
            };
        // =======
        method(){
            this.$emit('update:value', newValue)
        }
    ```
    **$event的值是emit的第二个参数**