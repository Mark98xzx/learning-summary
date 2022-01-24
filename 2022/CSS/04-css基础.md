### link 和 @import 的区别？

- link 属于 XHTML标签，而 @import 是CSS 提供的
- 页面被加载时，link 会同时被加载，而 @import 引用到的 CSS 会等到页面被加载完再加载
- import 只在 IE5 以上才能识别，而 link 是 XHTML 标签，无兼容问题
- link 方式的样式权重高于 @import 的权重
- 使用 dom 控制样式时的差别。当使用 javascript 控制 dom 去改变样式的时候，只能使用 link 标签，因为 @import 不是 dom 可以控制的


### 有哪些方式（CSS）可以隐藏页面元素？

- opacity：0  ： 本质上是将元素的透明度设置为0，就看起来隐藏了，但依旧占据空间且可以交互
- visibility：hidden ： 与上一个方法类似的效果，占据空间，但是不能交互了
- overflow：hidden ： 这个只隐藏元素溢出的部分，但是占据空间且不可交互
- display: none : 这个是彻底隐藏了元素，元素次年文档流中消失，既不占据空间也不可交互，也不影响布局
- z-index：-999 ： 原理是将层级放到底部，这样就被覆盖了，看起来隐藏了
- transform：scale(0, 0) : 平面变换，将元素缩放为0，但是依然占据空间，但不可交互
> 还有一些靠绝对定位把元素移动到可视区域外....

### em、px、rem 区别
- px：绝对单位，页面按精确像素展示
- em：相对单位，基准点为父节点字体的大小，如果自身定义了 font-sixe 按自身来计算（浏览器默认字体是 16px），整个页面内 1em 不是一个固定值
- rem: 相对单位，可理解为"root em" , 相对根节点 html 的字体大小来计算，css3 新加属性，chrome/firefox/IE9+ 支持

### 块级元素⽔平居中的⽅法？
- margin:0 auto ⽅法
```html
    <style>
        .center{ 
            height: 200px;
            width:200px;
            margin:0 auto;
            border:1px solid red;
        }
    </style>
    <div class="center">⽔平居中</div>
```

- flex布局，⽬前主流⽅法
```html
    <style>
        .center {
            display: flex;
            justify-content: center;
        }
    </style>
    <div class="center">
        <div class="flex-div">1</div>
        <div class="flex-div">2</div>
    </div>
```

- table 方法
```html
    <style>
        .center {
            display: table;
            margin: 0 auto;
            border: 1px solid #0f0;
        }
    </style>
    <div class="center">水平居中</div>
```

- 还有⼀些通过position+(margin|transform)等⽅法

> 拓展阅读：[水平居中垂直居中](https://louiszhai.github.io/2016/03/12/css-center/)

### CSS有几种定位方式？

- static: 正常文档流定位，此时 top、right、bottom、left 和 z-index 属性无效，块级元素从上往下纵向排布，行内元素从左往右排序
- relative：相对定位，此时的『相对』是相对于正常⽂档流的位置
- absolute：相对于最近的非 static 定位祖先元素的偏移，来确定元素的位置，比如一个绝对定位元素它的父级、和祖父级元素都为 relative，它会相对它的父级产生偏移
- fixed：指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，比如那种回到顶部的按钮一般都是用此定位方式
- sticky：粘性定位，特性近似于 relative 和 fixed 的合体，其在实际应用中的近似效果就是IOS通讯录滚动的时候的 『顶屁股』。