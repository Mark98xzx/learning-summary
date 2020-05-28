## solt

    体现的精髓就是灵活

    要点：
        1. slot 是基于父子组件关系，它是写在子组件中
        2. slot 就是一个占位符，父组件在使用子组件的时候，可以给它传递任何显示的内容
        3. 插槽非常灵活，它将控制权交给了使用它的组件
        4. 插槽最厉害的地方在于，既要子组件给我们作事，同时控制权又要牢牢的把握在自己手里
        5. 作用域插槽就是把每一行数据传给父组件

    当我们使用 element-ui的时候
    我们写的组件是父组件，element-ui 中的轮播图就是一个子组件

##### 简单插槽

```javascript
// 父组件
<MySwiper>
    <img src="001.jpg" alt="">
</MySwiper>
```

```javascript
// 子组件
<div id="swiperid">
    <!-- 直接slot标签 占位 -->
    <slot />
</div>
```

##### 具名插槽

```javascript
// 父组件
<MyLayout>
  <template v-slot:header>
    <div>我是头部</div>
  </template>
  <div>我是内容</div>
  <template v-slot:footer>
    <div>我是底部</div>
  </template>
</MyLayout>
// 注意 v-slot 只能添加在 <template> 上
```

```javascript
// 子组件
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

##### 作用域插槽

```javascript
<template>
    <MyTable :data="persons">
        <template slot-scope="scope">
            <div :style="{color:scope.row.age > 18 ? 'green' : 'red'}">
                {{scope.row.name}}---{{scope.row.age}}
            </div>
        </template>
    </MyTable>
</template>
<script>
    export default {
        data(){
            return {
                persons: [
                    {id:1001,name:'小红',age:16},
                    {id:1002,name:'小明',age:25},
                    {id:1003,name:'小昭',age:15}
                ]
            }
        }
    }
</script>
```

```javascript
// 子组件
<template>
    <div>
        <ul>
            <li v-for="item in data" :key="item.id">
                <!-- 子组件通过作用域插槽传给父组件 -->
                <slot :row="item"/>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props:["data"]
    }
</script>

```

-   所有在父组件使用时，跟使用组件一样需要 import 进来，跟注册（参考demo：project-slot）


###### 总结

    1. 能根据父组件传入的不同内容，在子组件中显示不同效果 【轮播图】
    2. 在一些复杂的显示情况下，子组件可以把某一行数据通过作用域插槽传递到父组件，父组件就可以根据数据再去显示
