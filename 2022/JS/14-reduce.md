## reduce

- 语法

    - arr.reduce(callback[, initialValue])

- 两个参数：（callback 和 初始值）
    - arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
        - callback: 执行数组中每个值的函数（四个参数）
            - accumulator：累加器（结果）
            - currentValue：数组中正在处理的元素（当前值）
            - index：数组正在处理元素的索引（当前值索引）
            - array：当前数组

        - initialValue： 初始值。如果没有提供初始值，则使用数组第一个元素作为我们的初始值
        > **注意：**在没有初始值的空数组调用 reduce 将会报错

```js
    let arr = [0, 1, 2, 3, 4];

    let totalNum = arr.reduce((accumulate, currentValue, i, arr) => {
        console.log(accumulate, currentValue, i);
        // 0 1 1
        // 1 2 2
        // 3 3 3
        // 6 4 4
        return accumulate + currentValue;
    })
    console.log(totalNum, 'totalNum'); // 10 totalNum

    let totalNum1 = arr.reduce((accumulate, currentValue, i, arr) => {
        return accumulate + currentValue;
    }, 0)
    console.log(totalNum1, 'totalNum1'); // 10 totalNum1

    let totalNum2 = arr.reduce((accumulate, currentValue, i, arr) => {
        return accumulate + currentValue;
    }, 5)
    console.log(totalNum2, 'totalNum2'); // 15 totalNum2
```

- 注意：
```js
    let arr1 = [];
    // arr1.reduce((acc, curr) => {
    //     return acc + curr;
    // }) // error 空数组，没有设置初始值

    // ---------------------------

    let test = arr1.reduce((acc, curr) => {
        return acc + curr;
    }, 0)

    console.log(test, 'test'); // 0 test
```

- 累加对象数组里的值
    - 要累加对象数组中包含的值，必须提供初始值，以便各个item正确通过你的函数
    ```js
        let initialValue = 0;
        let sum = [{x: 1}, {x:2}, {x:3}].reduce((accumulator, currentValue) => {
            return accumulator + currentValue.x;
        }, initialValue)
        console.log(sum, 'sum'); // 6 sum
    ```

- 二维数组 转 一维数组
```js
    let a = [1,2,3]
    let b = [7,8,1]
    console.log(a.concat(b)) // [ 1, 2, 3, 7, 8, 1 ]

    let twoArr = [[1,3,2], [7,8,9], [2,5,8]]
    let newArr = twoArr.reduce((acc, curr) => {
        return acc.concat(curr)
    }, [])
    console.log(newArr, 'newArr'); // [1, 3, 2, 7, 8, 9, 2, 5, 8] newArr
```

- 计算数组中每个元素出现的次数
```js
    et names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
    let nameObj = names.reduce((allname, name) => {
        if (name in allname) {
            allname[name]++;
        } else {
            allname[name] = 1;
        }
        return allname;
    }, {})
    console.log(nameObj, 'nameObj'); // { Alice: 2, Bob: 1, Tiff: 1, Bruce: 1 } 'nameObj'
```
- 分析：
    - 由于设置了迭代初始值，allname 的 第一个值是空对象，此时 name 为 Alice，然后进行判断，发现在 allname 中没有 Alice 属性，所以就直接把 Alice 对应属性值赋值为1
    - 后面没有重复的是一样的道理，如果碰到重复值，就会为该属性值加1。