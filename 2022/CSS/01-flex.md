### CSS 中的 flex: 1, 是什么意思？
- flex 是 flex-grow，flex-shrink 和 flex-basis 的简写
- 除了 auto(1 1 auto) 和 (0 0 auto) 这两个快捷值外，还有以下设置方式：
    - 当 flex 取值为一个非负数字，则该数字为 flex-grow 值，flex-shrink 取 1，flex-basis 取 0%，如下是同等的：
    ```css
        .item {flex: 1;}
        .item {
            flex-grow: 1;
            flex-shrink: 1;
            flex-basis: 0%;
        }
    ```
    - 当 flex 取值为 0 时，对应的三个 值分别是 0 1 0%
    ```css
        .item {flex: 0;}
        .item {
            flex-grow: 0;
            flex-shrink: 1;
            flex-basis: 0%;
        }
    ```
    - 当 flex 取值为一个长度或者百分比，则视为 flex-bassis 值，flex-grow 取 1，flex-shrink 取 1，有如下同情况（注意：0% 是一个百分比而不是一个非负数字）
    ```css
        .items-1 {flex: 0%;}
        .items-1 {
            flex-grow: 1;
            flex-shrink: 1;
            flex-basis: 0%;
        }

        .items-2 {flex: 24px;}
        .items-2 {
            flex-grow: 1;
            flex-shrink: 1;
            flex-basis: 24px;
        }
    ```
    - 当 flex 取值为两个非负数字，则分别视为 flex-grow 和 flex-shink 的值，flex-basis 取 0%，如下是等同的：
    ```css
        .item {flex: 2 3;}
        .item {
            flex-grow: 2;
            flex-shrink: 3;
            flex-basis: 0%;
        }
    ```
    - 当 flex 取值为一个非负数字和一个长度或者百分比，则分别视为 flex-grow 和 flex-basis 的值，flex-shrink 取 1，如下：
    ```css
        .item {flex: 11 32px;}
        .item {
            flex-grow: 11;
            flex-shrink: 1;
            flex-basis: 32px;
        }
    ```