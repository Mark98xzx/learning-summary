
## for-in 和 for-of

- for...of 是 ES6 新增的遍历方式，允许遍历一个含有 iterator 接口的数据结构（数组、对象等）并返回各项的值，和 ES3 中的 for...in 的区别如下：
    - for...of 遍历获取的是对象的键值，for...in 获取的是对象的键名
    - for...in 会遍历对象整个原型链，性能非常差，不推荐使用；而 for...of 只遍历当前对象，不会遍历原型链
    - 对于数组的遍历，for...in 会返回数组中所有可枚举的属性（包括原型链上可枚举的属性）；for...of 只返回数组的下标对应的属性值

- 简单来说就是它们两者都可以用于遍历，不过for in遍历的是数组的索引（index），而for of遍历的是数组元素值（value）
```js
    // for in
    const obj = {a:1, b:2, c:3}
        
    for (let key in obj) {
        console.log(key)
    }
    // a b c

    //for of
    const array1 = ['a', 'b', 'c']
    
    for (const val of array1) {
        console.log(val)
    }
    // a b c
```

### for in
- for in更适合遍历对象，当然也可以遍历数组，但是会存在一些问题，
    - 比如：
        - index索引为字符串型数字，不能直接进行几何运算
        ```js
            let arr = [1,2,3]
            for (let index in arr) {
                let res = index + 1
                console.log(res)
            }
            //01 11 21
        ```
- 使用for in会遍历数组所有的可枚举属性，包括原型，如果不想遍历原型方法和属性的话，可以在循环内部判断一下，使用hasOwnProperty()方法可以判断某属性是不是该对象的实例属性
    ```js
        let arr = [1,2,3]
        Array.prototype.a = 123
            
        for (let index in arr) {
            let res = arr[index]
            console.log(res)
        }
        //1 2 3 123

        for(let index in arr) {
            if(arr.hasOwnProperty(index)){
                let res = arr[index]
                console.log(res)
            }
        }
        // 1 2 3
    ```

### ES6 中的 for of
- for of遍历的是数组元素值，而且for of遍历的只是数组内的元素，不包括原型属性和索引
    ```js
        let arr = [1,2,3]
        arr.a = 123
        Array.prototype.a = 123
            
        for (let value of arr) {
            console.log(value)
        }
        //1 2 3
    ```
- for of适用遍历数/数组对象/字符串/map/set等拥有迭代器对象（iterator）的集合，但是不能遍历对象，因为没有迭代器对象，但如果想遍历对象的属性，你可以用for in循环（这也是它的本职工作）或用内建的Object.keys()方法
    ```js
        let myObject={
        　　a: 1,
        　　b: 2,
        　　c: 3
        }
        for (var key of Object.keys(myObject)) {
            console.log(key + ": " + myObject[key]);
        }
        //a:1 b:2 c:3
    ```

### 总结
- for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值

- for in总是得到对象的key或数组、字符串的下标

- for of总是得到对象的value或数组、字符串的值