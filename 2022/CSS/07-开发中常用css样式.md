## 开发中常用css样式

### 自定义滚动条样式
```css
::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    //background-color: #8c8c8c;
    background-color: rgba(0, 0, 0, 0.25);
}

::-webkit-scrollbar-track {
    background-color: #f6f6f6;
}
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track {
    border: 0;
}
```

### 原生input输入框美化
```css
input {
    outline-style: none;
    border: 1px solid #c0c4cc;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    padding: 0;
    padding: 8px 12px;
    box-sizing: border-box;
    font-family: "Microsoft soft";
    &:focus {
        border-color: #f07b00;
        outline: 0;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), #f07b00;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), #f07b00;
    }
}
```

### 盒子阴影
```css
box-shadow: 0 16px 16px 0 rgba(50.1, 50.1, 71.27, 0.08),
            0 24px 32px 0 rgba(50.1, 50.1, 71.27, 0.08);
```

### 鼠标移入 小手
```css
    cursor: pointer;
```
- 其他取值
    值 | 描述
    ---- | ----
    auto | 标准光标
    pointer | 小手
    text | I形光标 
    wait | 等待光标
    crosshair | 十字标

