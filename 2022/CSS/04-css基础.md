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