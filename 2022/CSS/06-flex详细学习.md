## flex

- 能够说出 flex 盒子的布局原理
- 能够使用 flex 布局的常用属性


### 2、flex 布局原理
#### 2.1、布局原理
- flex 是 flexible Box 的缩写，意为“弹性布局”，用来为盒状模型提供最大的灵活性，任何一个容器都可以指定为 flex 布局。
    - 当我们为父盒子设置为 flex 布局以后，子元素的 float、clear和vertical-aligin 属性将失效
    - 伸缩布局 = 弹性布局 = 伸缩盒布局 = 弹性盒布局 = flex布局
- 采用 Flex 布局的元素，称为 Flex 容器（flex container），简称“容器”，它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称“项目”。
    - 子容器可以横向排列也可以纵向排列
**总结：** flex布局原理：就是通过给父盒子添加 flex 属性，来控制子盒子的位置和排列方式


### 3、flex布局父项常见属性
#### 3.1、常见父项属性
以下有 6 个属性是对父元素设置的
- flex-direction：设置主轴
- justify-content：设置主轴上子元素排列方式
- flex-warp：设置子元素是否换行
- align-content：设置侧轴上子元素的排列方式（多行）
- align-items：设置侧轴上子元素排列方式（单行）
- flex-flow：复合属性，相当于同时设置了 flex-direction 和 flex-warp

#### 3.2、flex-direction 设置主轴方向
1. 主轴和侧轴
    - 在flex布局中，是分主轴和侧轴两个方向，同样的叫法有：行和列、x轴 和 y轴
        - 默认主轴方向就是 x 轴方向，水平向右
        - 默认侧轴方向就是 y 轴方向，水平向下
2. 属性值
    - flex-direction 属性决定主轴的方向（即项目的排列方向）
    > **注意：** 主轴和侧轴是会变化的，就看 flex-direction 设置谁为主轴，剩下的就是侧轴。而我们的子元素是跟着主轴来排列的

    |  序号   | 属性值  | 备注 |
    |  ----  | ----  | -----  |
    | 1  | row |  默认值从左到右 |
    | 2  | row-reverse | 从右到左 |
    | 3  | column |  从上到下 |
    | 4  | column-reverse |  从下到上 |


#### 3.3、justify-content 设置主轴上的子元素排列方式
- justify-content属性定义了项目在主轴上的对齐方式
**注意：**使用这个属性之前一定要确定好主轴是哪个
    |  序号   | 属性值  | 备注 |
    |  ----  | ----  | -----  |
    | 1  | flex-start |  默认值，从头部开始；如果主轴是x轴，则从左到右 |
    | 2  | flex-end | 从尾部开始排列 |
    | 3  | center |  在主轴居中对齐（如果主轴是x轴则是水平居中） |
    | 4  | space-around |  平分剩余空间 |
    | 5  | space-between | 先两边贴边，再平分剩余空间 |


#### 3.4、flex-warp 设置子元素是否换行
- 默认情况下，项目都是排在一条线上（又称“轴线”）上，flex-warp 属性定义，flex布局中默认是不换行的

    |  序号   | 属性值  | 备注 |
    |  ----  | ----  | -----  |
    | 1  | nowarp |  默认值 部换行 |
    | 2  | warp | 换行 |


#### 3.5、align-items 设置侧轴上的子元素排列方式（单行）
- 该属性是控制子项在侧轴（默认是y轴）上的排列方式 在子项为单项的时候使用

    |  序号   | 属性值  | 备注 |
    |  ----  | ----  | -----  |
    | 1  | flex-start |  默认值 从上往下 |
    | 2  | flex-end | 从小往上 |
    | 3  | center | 挤在一起居中（垂直居中） |
    | 4  | stretch | 拉伸 |


#### 3.6、align-content 设置侧轴上的子元素排列方式（多行）
- 设置子项在侧轴上的排列方式并且只能用于子项出现**换行**的情况（多行），在单行下是没有效果的

    |  序号   | 属性值  | 备注 |
    |  ----  | ----  | -----  |
    | 1  | flex-start |  默认值 在侧轴的头部开始排列 |
    | 2  | flex-end | 在侧轴的尾部开始排列 |
    | 3  | center | 在侧轴中间显示 |
    | 4  | space-around | 子项在侧轴平分剩余空间 |
    | 4  | space-between | 子项在侧轴先分布在两头，再平分剩余空间 |
    | 4  | stretch | 设置子项元素高度平分父元素高度 |


#### 3.7、align-content 和 align-items 区别
- align-content 适用于换行（多行）的情况下（单行情况下无效），可以设置上对齐、下对齐、居中、拉伸 以及 平均分配剩余空间等属性值。
- align-items 适用于单行情况下，只有上对齐、下对齐、居中和拉伸
**总结**就是单行找 align-items；多行找 align-content


#### 3.8、flex-flow
- flex-flow 属性是flex-direction 和 flex-warp 属性的复合属性
```css
    flex-flow: row warp;
```


### 4、flex 布局子项常见属性
- flex 子项目占的份数
- align-self 控制子项自己在侧轴的排列方式
- order 属性定义子项的排列顺序（前后顺序）

#### 4.1、flex 属性
- flex 属性定义子项目分配剩余空间，用flex来表示占多少份数
```css
    .item {
        flex: <number>; /* default 0 */
    }
```

#### 4.2 align-self 控制子项自己在侧轴上的排列方式
- align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。
```css
    span:ntn-child(2) {
        /* 设置自己在侧轴上的排列方式 */
        align-self: flex-end;
    }
```

#### 4.3 order 属性定义项目的排列顺序
- 数值越小，排列越靠前，默认为0
- 注意：和 z-index 不一样


|  序号   | 属性值  | 作用 |
|  ----  | ----  | -----  |
| 1  | flex-grow | 设置弹性盒子的扩展比率 |
| 2  | flex-shrink | 设置弹性盒子的缩小比率 |
| 3  | flex-basis |  设置弹性盒子伸缩基准 |
| 4  | flex | flex-grow、flex-shrink、flex-basis 的缩写 |


|  序号   | 属性  | 对应作用 |
|  ----  | ----  | -----  |
| 1  | flex: auto; |  flex: 1 1 auto |
| 2  | flex: none; | flex: 0 0 auto |
| 3  | flex: 0%;| flex: 1 1 0% |
| 4  | flex: 100px; | flex: 1 1 100px |
| 4  | flex: 1; | flex: 1 1 0% |