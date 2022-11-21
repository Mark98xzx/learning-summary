### echarts中tooltip.valueFormatter不起作用

- 在使用 echarts 图表，鼠标移入显示详细数据时，有些场景需要拼接字段如单位等，一开始使用tooltip.valueFormatter不起作用

```js
    series: [
        {
            name: '资产总额',
            type: 'bar',
            color: "#60ACFC",
            barWidth: 8,
            itemStyle: {
                barBorderRadius: [10, 10, 10, 10]
            },
            tooltip: {
                valueFormatter:  function(value) {
                    return value + ' 亿元';
                }
            },
            // data: [53325.34, 73325.51, 75425.54, 76592.33, 10525.11]
            data: seriesData[0]
        },
        {
            name: '增长率',
            type: 'line',
            yAxisIndex: 1,
            color: "#FFA500",
            symbolSize: 4,
            smooth: false,
            tooltip: {
                valueFormatter: function (value) {
                    return value + ' %';
                }
            },
            // data: [128.61, 37.51, 2.86, 1.55, -86.26]
            data: seriesData[1]
        }
    ]
```

- 最后查看文档才发现是自己的版本低了
- [echarts官方文档](https://echarts.apache.org/zh/option.html#grid.tooltip.valueFormatter)

    - grid.tooltip. valueFormatter
        - string
        - 从 v5.3.0 开始支持

        > tooltip 中数值显示部分的格式化回调函数。

        - 回调函数格式：
            ```js
                (value: number | string) => string
            ```
        - 示例：
            ```js
                // 添加 $ 前缀
                valueFormatter: (value) => '$' + value.toFixed(2)
            ```