## vue-color 使用

取色器插件

```bash
    npm install vue-color --save
```

```js
    <template>
        <sketch-picker v-model="colors" @input="updateValue" />
        <twitter-picker v-model="colors" @input="updateValue" />
    </template>

    import { Sketch, Twitter } from 'vue-color'

    components: {
      'sketch-picker': Sketch,
      'twitter-picker': Twitter
    },
    data() {
        return {
            colors: '#FFFFFF',
        }
    },
    methods: {
        // 取色器 值改变事件
        updateValue(value) {
            console.log(value)
            console.log(this.color)
            // console.log(value.hex.split('#'))
            // this.formData.color = value.hex.split('#')[1]
        },
    }
```