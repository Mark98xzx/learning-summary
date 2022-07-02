## vue2 与 vue3 中的 v-model区别

### vue2 中的 v-model
- vue2中的 v-model，它主要用于表单元素和自定义组件上。v-model 本质上是一个语法糖，会对用户输入做一些特殊处理以达到更新数据，其处理就是给使用的元素绑定属性和事件。

- v-model 使用在表单元素上时，会根据元素不同采取不同的的处理：
    - 当<input type="text">文本 和 <textarea>上使用时，会默认给元素绑定名为 value 的 prop 和名为 input 的事件
    - 当<input type="checkbox">复选框 和 <input typex="radio">单选框 上使用时，会默认给元素绑定名为 checked 的 prop 和名为 change 的事件
    - 当 <select>选择框 上使用时，则绑定名为 value 的 prop 和名为 change 的事件

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
