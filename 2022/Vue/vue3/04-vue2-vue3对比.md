## vue2-vue3对比

- vue2.0 采用 flow 进行编写，而3.0源码全部采用Typescript进行开发，对typescript支持友好
- 源码体积优化：移除部分api，使用 tree-shaking
- 数据劫持优化：vue3 采用 proxy，性能大大提升
- 编译优化： vue3 实现了静态模板分析、重写diff 算法
- CompositionAPI：整合业务代码逻辑，提取公共逻（vue2 采用mixin - 命名冲突数据来源不清晰）
- 自定义渲染器：可以用来创建自定义的渲染器。改写vue底层渲染逻辑
- 新增 fragment、teleport、suspense 组件

### 区别

- 源码采用 monorepo 方式进行管理，将模块拆分到 package 目录中
- vue3 采用 ts 开发，增强类型检测。vue2 则采用 flow
- vue3 的性能优化，支持 tree-shaing，不使用就不打包
- vue2 后期引入 RFC，使每个版本改动可控 rfcs

### 内部代码优化

- vue3 劫持数据采用 proxy；vue2 劫持数据采用 defineProperty。defineProperty 有性能问题和缺陷
- vue3 中模块编译进行优化，编译时生成 Block tree，可对子节点的动态节点进行收集，可以减少比较，并且采用了 patchFlag 标记动态节点
- vue3 采用 compositionApi 进行组织功能，解决反复横跳，优化复用逻辑（mixin 带来的数据源不清晰、命名冲突），相比 optionApi 类型推断更加方便
- 增加了 Fragment、 Teleport、Suspense 组件

### vue3 架构分析

1. Monorepo 介绍
`Monorepo` 是管理项目代码的一个方式，指在一个项目仓库 （repo）中管理多个模块/包（package）
- 一个仓库可维护多个模块，不用到处找仓库
- 方便版本管理和依赖管理，模块之间的引用，调用都非常方便
> 缺点：仓库体积会变大

2. vue3 项目结构
  - reactivity：响应式系统
  - runtime-core：与平台无关的运行核心（可以创建针对特定平台的运行时 - 自定义渲染器）
  - runtime-dom：针对浏览器的运行时。包括 DOM API，属性，事件处理等
  - runtime-test：用于测试
  - runtime-render：用于服务器端渲染
  - compiler-core：与平台无关的编译核心
  - compiler-dom：针对浏览器的编译模块
  - compiler-ssr：针对服务器端渲染的编译模块
  - compiler-sfc：针对单文件解析
  - size-check：用来测试代码体积
  - template-explorer：用于调试编译器输出的开发工具
  - shared：多个包之间共享的内容
  - vue：完整版本，包括运行时和编译时
