## Object.create 和 new 有什么区别？
- js 中创建对象的方式一般有两种 Object.create 和 new
    ```js
        const Base = function(){};
        const o1 = Object.create(Base);
        const o2 = new Base();
    ```
- 在讲述两者区别之前，我们需要知道：
    - 构造函数 Foo 的原型属性 Foo.prototype 指向了原型对象。
    - 原型对象保存着实例共享的方法，有一个指针 constructor 指回构造函数。
    - js 中只有函数有 prototype 属性，所有的对象只有 __proto__ 隐式属性。

### 这两者有什么不一样呢？

#### Object.create
- 先看看 Object.create 的实现方式
    ```js
        Object.create = function(o) {
            var F = function() {};
            F.pototype = o;
            return new F();
        }
    ```
    - 可以看出来，Object.create 是内部定义一个对象，并且让 F.prototype 对象 赋值引进的对象/函数 o, 并且 return 出一个新的对象。

#### new
- 再看看 const o2 = new Base(); 的时候，new 做了什么。
    ```js
        var o1 = new Object();
        o1.[[Prototype]] = Base.prototype;
        Base.call(o1);
    ```
    - new 做法是新建一个 obj 对象 o1，并且让 o1 的 __proto__ 指向了 Base.prototype 对象。并且使用 call 进行强转作用环境。从而实现了实例的创建。

### 区别
- 看似是一样的，我们对原来代码进行改进一下
    ```js
        var Base = function () {
            this.a = 2
        }
        var o1 = new Base();
        var o2 = Object.create(Base);
        console.log(o1.a); // 2
        console.log(o2.a); // undefined
    ```
- 可以看出 Object.create 失去了原来对象属性的访问
- 再改造一下：
    ```js
        var Base = function () {
            this.a = 2
        }
        Base.prototype.a = 3;
        var o1 = new Base();
        var o2 = Object.create(Base);
        console.log(o1.a); // 2
        console.log(o2.a); // undefined
    ```

### 小结
|     |  new  | Object.create |
|:--------|:----------|:--------|
| 构造函数 | 保留原构造函数属性 | 丢失原构造函数属性 |
| 原型链 | 原构造函数 prototype 属性 | 原构造函数/(对象)本身 |
| 作用对象 | function | function 和 object |



