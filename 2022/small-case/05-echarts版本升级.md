### vue 使用echarts 4.想升级5.x
- 需要用到一些新属性 如 高亮 等
- geo.emphasis.focus 从 v5.1.0 开始支持
- [文档地址](https://echarts.apache.org/zh/option.html#%2Fsearch%2Ffocus)

1. 先卸载旧版本
    ```js
        npm uninstall echarts --save
    ```
2. 安装新版本
    ```js
        npm install --save-dev echarts@^5.0.1
    ```
3. 按需引入
    - 以前：
        ```js
            import echarts from "echarts"
        ```
  
    - 更换引入方式
        ```js
            import * as echarts from "echarts"
        ```
    > 这种方式依然支持，但官方建议用最新的引入方式，可以最大程度的利用打包工具 tree-shaking 的能力，并且可以有效解决命名空间冲突的问题而且防止了内部结构的暴露。

###### 总结引入

1. 在main.js中引入,挂载到vue实例
```js
    import * as echarts from "echarts" //引入echarts
    Vue.prototype.$echarts = echarts
    
    //  可通过this.$echarts使用
    this.$echarts.init(document.getElementById('Chart'))  //使用方式
```

2.在单个vue文件中使用
```js
    import * as echarts from "echarts"
    //  使用方式
    echarts.init(document.getElementById('Chart')) 
```

3.在单个vue文件中按需引入
```js
    // 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
    import * as echarts from 'echarts/core';
    // 引入柱状图图表，图表后缀都为 Chart
    import { BarChart } from 'echarts/charts';
    // 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
    import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent
    } from 'echarts/components';
    // 标签自动布局，全局过渡动画等特性
    import { LabelLayout, UniversalTransition } from 'echarts/features';
    // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
    import { CanvasRenderer } from 'echarts/renderers';
    
    // 注册必须的组件
    echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    BarChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
    ]);
    
    // 接下来的使用就跟之前一样，初始化图表，设置配置项
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
    // ...
    });
```