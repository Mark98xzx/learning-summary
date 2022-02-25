## ref 对比 reactive

1. 定义
    ref: 用来定义基本数据类型
    reactive：用来定义引用数据类型
    FAQ: ref 可以用来定义引用数据类型，内部也依然会通过 reactive 转成代理对象，reactive 不可以定义基本数据类型

2. 原理
    ref 通过 Object.defineProperty() get set 实现响应式原理
    reactive 通过 Proxy() 做的响应式，比前者聪明

3. 使用
    ref：操作数据需要加 .value 模板读取不需要
    reactive：操作与模板读取均不需要
    一般会把组件中所有的数据丢到一个对象里，reactive做成响应式的数据，再返回出去。