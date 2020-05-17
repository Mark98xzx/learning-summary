### ES6新特性：Javascript中的Map和WeakMap对象

#### Map对象
-   Map对象是一种有对应 键/值 对的对象， JS的Object也是 键/值 对的对象 ；

    ES6中Map相对于Object对象有几个区别：

　　1：Object对象有原型， 也就是说他有默认的key值在对象上面， 除非我们使用Object.create(null)创建一个没有原型的对象；
　　2：在Object对象中， 只能把String和Symbol作为key值， 但是在Map中，key值可以是任何基本类型(String, Number, Boolean, undefined, NaN....)，或者对象(Map, Set, Object, Function , Symbol , null....);
　　3：通过Map中的size属性， 可以很方便地获取到Map长度， 要获取Object的长度， 你只能用别的方法了；
　　Map实例对象的key值可以为一个数组或者一个对象，或者一个函数，比较随意 ，而且Map对象实例中数据的排序是根据用户push的顺序进行排序的， 而Object实例中key,value的顺序就是有些规律了， (他们会先排数字开头的key值，然后才是字符串开头的key值)；

#### Map实例的属性
-   map.size这个属性和数组的length是一个意思，表示当前实例的长度；

#### Map实例的方法

    clear()方法， 删除所有的键/值对；
    delete(key)， 删除指定的键/值对；
    entries()返回一个迭代器， 迭代器按照对象的插入顺序返回[key, value]；
    forEach(callback , context) 循环执行函数并把键/值对作为参数； context为执行函数的上下文this；
    get(key) 返回Map对象key相对应的value值；
    has(key) 返回布尔值， 其实就是返回Map对象是否有指定的key；
    keys() 返回一个迭代器，迭代器按照插入的顺序返回每一个key元素；
    set(key, value) 给Map对象设置key/value 键/值对， 返回这个Map对象（相对于Javascript的Set，Set对象添加元素的方法叫做add，而Map对象添加元素的方法为set；
　　[@@iterator] 和entrieds()方法一样， 返回一个迭代器， 迭代器按照对象的插入顺序返回[key, value]；

#### Map的使用Demo：
```javascript
    var myMap = new Map();

    var keyString = "a string",
        keyObj = {},
        keyFunc = function () {};

    // 我们给myMap设置值
    myMap.set(keyString, "字符串'");
    myMap.set(keyObj, "对象");
    myMap.set(keyFunc, "函数");

    myMap.size; // 输出长度： 3

    // 获取值
    console.log(myMap.get(keyString));    // 输出：字符串
    console.log(myMap.get(keyObj));       // 输出：对象
    console.log(myMap.get(keyFunc));      // 输出：函数

    console.log(myMap.get("a string"));   // 输出：字符串

    console.log(myMap.get({}));           // 输出：undefined
    console.log(myMap.get(function() {})) // 输出：undefined
```

    我们也可以把NaN，undefined， 对象，数组，函数等这些作为一个Map对象的key值 ：

```javascript
    "use strict";
    let map = new Map();
    map.set(undefined, "0");
    map.set(NaN, {});
    console.log(map); //输出：Map { undefined => '0', NaN => {} }
```

#### 循环Map的方法

    使用Map实例的forEach方法:

```javascript
    "use strict";
    let map = new Map();
    map.set(undefined, "0");
    map.set(NaN, {});
    map.forEach(function(value ,key ,map) {
        console.log(key,value, map);
    });
```

    使用for...of循环：

```javascript
    "use strict";
    let map = new Map();
    map.set(undefined, "0");
    map.set(NaN, {});
    for(let [key, value] of map) {
        console.log(key, value);
    }
    for(let arr of map) {
        console.log(arr);
    }
```

### WeakMap

    WeakMap是弱引用的Map对象， 如果对象在js执行环境中不存在引用的话，相对应的WeakMap对象内的该对象也会被js执行环境回收

-    WeakMap对象的属性：无

-　　WeakMap对象的方法：

-　　delete(key) : 删除指定的键/值对；

-　　get(key) ：返回Map对象key相对应的value值；

-　　has(key) ：返回布尔值， 其实就是返回Map对象是否有指定的key；

-　　set(key)：给Map对象设置key/value 键/值对， 返回这个Map对象；

-　　WeakMap相对于Map少了很多的方法， 我们也可以自己再来实现这些方法，比如我们再实现一个Map实例的clear方法：


```javascript
    class ClearableWeakMap {
        constructor(init) {
            this._wm = new WeakMap(init)
        }
        clear() {
            this._wm = new WeakMap()
        }
        delete(k) {
            return this._wm.delete(k)
        }
        get(k) {
            return this._wm.get(k)
        }
        has(k) {
            return this._wm.has(k)
        }
        set(k, v) {
            this._wm.set(k, v)
            return this
        }
    }
```
##### 参考
    MDN：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map;
    ruanyifeng：http://es6.ruanyifeng.com/#docs/set-map