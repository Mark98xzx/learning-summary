### vuex 为什么要区分 actions 和 mutations
- vuex 中为什么把把异步操作封装在 actions，把同步操作放在 mutations？
    - 知乎文章：https://www.zhihu.com/question/48759748/answer/112823337
    - 官方文档说明：“在 mutations 中混合异步调用会导致你的程序很难调试。
    - 例如，当你能调用了两个包含异步回调的 mutations 来改变状态，你怎么知道什么时候回调和哪个先回调呢？这就是为什么我们要区分这两个概念。
    - 在 Vuex 中，我们将全部的改变都用同步方式实现。我们将全部的异步操作都放在 Actions 中。

但我不明白的是，如果同时出发了两个异步的 actions，那么这两个回调的时间不一样，那么对于 state 的更新还是存在竞态的。所以我觉得这样进行区分并不能解决“那么先回调，哪个后回调”来更新 state 的问题。

#尤雨溪的回答#
区分 actions 和 mutations 并不是为了解决竞态问题，而是为了能用 devtools 追踪状态变化。

事实上在 vuex 里面 actions 只是一个架构性的概念，并不是必须的，说到底只是一个函数，你在里面想干嘛都可以，只要最后触发 mutations 就行。异步竞态怎么处理那是用户自己的事情。vuex 真正限制你的只有 mutations 必须是同步的这一点（在 redux 里面就好像 reducer 必须同步返回下一个状态一样）。

同步的意义在于这样每一个 mutations 执行完成后都可以对应到一个新的状态（和 reducer 一样），这样 devtools 就可以打个 snapshot 存下来，然后就可以随便 time-travel 了。

如果你开着 devtool 调用一个异步的 actions，你可以清楚地看到它所调用的 mutations 是何时被记录下来的，并且可以立刻查看它们对应的状态。其实我有个点子一直没时间做，那就是把记录下来的 mutations 做成类似 rx-marble 那样的时间线图，对于理解应用的异步状态变化很有帮助