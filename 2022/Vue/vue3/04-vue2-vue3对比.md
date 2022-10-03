## vue2-vue3对比

- vue2.0 采用 flow 进行编写，而3.0源码全部采用Typescript进行开发，对typescript支持友好
- 源码体积优化：移除部分api，使用 tree-shaking
- 数据劫持优化：vue3 采用 proxy，性能大大提升
- 编译优化： vue3 实现了静态模板分析、重写diff 算法
- CompositionAPI：整合业务代码逻辑，提取公共逻（vue2 采用mixin - 命名冲突数据来源不清晰）
- 自定义渲染器：可以用来创建自定义的渲染器。改写vue底层渲染逻辑
- 新增 fragment、teleport、suspense 组件

