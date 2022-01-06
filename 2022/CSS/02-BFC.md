### 什么是BFC？

- BFC: block formatting content，块级格式化上下文。
- BFC 是 web 页面的可视 CSS 渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

- 定位方案：
    - 内部的 box 会在垂直方向上一个接一个放置
    - box 垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻 box 的 margin 发生重叠
    - 每个元素的 margin box 的左边，与包含块 border box 的左边相接触
    - BFC 的区域不会与 float box 重叠
    - BFC 是页面上应该隔离的独立容器，容器里面的子元素不会影响到外面的元素
    - 计算 BFC 的高度时，浮动元素也会参与计算

#### 满足以下条件之一就可以触发 BFC
- 根元素，即 html
- float 的值不为 none（默认）
- overflow 的值不为 visible（默认）
- display 的值不为 table-cell，table-caption，inline-block，flex，或者inline-flex 中的其中一个
- position 的值不为 absolute 或 fixed