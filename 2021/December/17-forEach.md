### forEach 中 return 有效果吗？ 如何中断 forEach 循环
- 在 forEach 中，使用 return 不会返回，函数会继续执行

#### 中断方法
- 使用 try 监视代码块，在需要中断的地方抛出异常
- 官方推荐方法（替换方法）：用 every 和 some 替换 forEach 函数
    - every 在碰到 return false 的时候，中止循环
    - some 在碰到 return true 的时候，中止循环