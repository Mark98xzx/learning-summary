### css盒子每行固定个数响应式

- 不确定总个数 自动换行

```css
    .ui-flex {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .ui-every {
            // width: 20%;
            // min-width: 260px;
            // max-width: 300px;
            border-radius: 12px;
            // border: 1px solid #e7e7e7;
            // border: 1px solid #ccc;
            // background-color: #edf0f5;
            background-color: #daf2fb;
            z-index: 999;
            margin: 8px;
            // flex-grow: 1;
            // flex-shrink: 0;
            // flex-basis: 240px;
            // min-width: 260px;
            // max-width: 260px;
            // width: 260px;
            width: calc(100% / 4 - 16px);
            max-width: 27.1875rem;
        }
    }
```