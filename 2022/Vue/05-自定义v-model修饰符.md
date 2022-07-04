### 自定义 v-model 修饰符

- 在 vue2 z中的 v-model 我们用过 .trim、.lazy 和 .number 这三个内置修饰符，而 vue3 则在这个基础上增加了自定义修饰符，即开发者可以自定义修饰符，以按需处理绑定值

- 当我们在 v-model 后面加上自定义修饰符时，会通过名为 modelModifiers 的 prop 传递给子组件，子组件拿到这个修饰符后，根据条件修改绑定的值。

- 自定义一个修饰符 capitalize，用于输入字符串的首字母大写
```js
    <myInput v-model.capitalize="msg" />

```

- 由于不是内置修饰符，所以需要我们自己在组件内部处理修饰符逻辑：
- MyInput 组件
```vue
<template>
    <div>
        <input type="text" :value="modelValue" @input="emitValue" />
    </div>
</template>
<script>
export default {
    props: {
        modelValue: String,
        modelModifiers: {
            // 自定义修饰符默认会传入这个 prop 中
            type: Object,
            default: () => ({}),
        }
    },
    mounted() {
        // 当组件 v-model 后面加上了自定义修饰符，组件内部会在 modelModifiers 上获取到修饰符的状态
        console.log(this.modelModifiers); // {capitalize: true}
    },
    methods: {
        emitValue(e) {
            let value = e.target.value,
            // 如果使用了自定义修饰符，即状态为 true，就处理值
            if (this.modelModifiers.capitalize) {
                value = value.chart(0).toUpperCase() + value.slice(1);
            }

            this.$emit("update:modelValue", value);
        }
    }
}

</script>
```
> 这样就完成了一个将输入字符串首字母大写的 v-model 修饰符

### 如果 v-model 带上参数，同时使用了 自定义修饰符

- 例如
```js
    <myInput v-model:title.capitalize="msg" />
```
- 那么传入组件内部的 prop 就不再是 modelModifiers 了，而是 titleModifiers。它的格式是 arg + 'Modifiers'。
- 如：
```vue
<template>
    <div>
        <input type="text" :value="title" @input="emitValue" />
    </div>
</template>
<script>
    export default {
        props: {
            title: String, // modelValue --> title
            titleModifiers: {
                // modelModifiers --> titleModifiers
                type: Object,
                default: () => {},
            }
        },
        mounted() {
            console.log(this.titleModifiers); // {capitalize: true}
        },
        methods: {
            emitValue(e) {
                let val = e.target.value;

                if (this.titleModifiers.capitalize) {
                    val = val.charAt(0).toUpperCase() + val.slice(1);
                }

                this.$emit("update:title", val);
            },
        }
    }
</script>
```