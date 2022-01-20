## instanceof

- 语法： 对象 instanceof 构造函数
- 作用：判断这个构造函数的 prototype 属性，在不在这个对象的原型链上，如果在就返回 true ，如果不在就返回 false

```js
    function Person(name, age) {
        this.name = name;
        this.age = age
    }
```
- 例1
```js
    let arr1 = new Array(10,20,30);
    console.log(arr1 instanceof Array); // true
    console.log(arr1 instanceof Object); // true
    console.log(arr1 instanceof Person); // false
```
- arr1对象的原型链: arr1 -> Array.prototype -> Object.prototype -> null

- 例2
    ```js
        console.log(Object instanceof Function); // true
        console.log(Object instanceof Object); // true
    ```
    - 根据 instanceof 的语法可以知道，前面的 Object 是对象，后面的 Object 是构造函数
    - Object 对象的原型链：Object对象 -> Function.prototype -> Object.prototype -> null

- 例3
    ```js
        console.log(Function instanceof Function); // true
        console.log(Function instanceof Object); // true
    ```
    - 根据 instanceof 的语法可以知道, 前面的 Function 是对象， 后面的 Function 是构造函数
    - Function 对象的原型：Function对象 -> Function.prototype -> Object.prototype -> null