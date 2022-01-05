### constructor 属性
- 属于原型对象的，指向这个原型对应的构造函数

```js
    function Student(name, age) {
        this.name = name;
        this.age = age;
    }
    // 每一个学生打招呼都一样，可以写在原型中
    Student.prototype.sayHi = function() {
        console.log("你好，我是学生，我的名字叫" + this.name);
    }
    // 实例化学生对象
    let s1 = new Student("小许", 18);
    s1.sayHi();

    // 验证
    console.log(Student.prototype.constructor === Student) // true
```

- 1、下面这句话没有问题
```js
    let ss1 = new Student('xxx', 18);
    console.log(ss1.constructor);
```
- s1对象访问constructor,s1对象自己没有,那就看s1对象指向的原型中有没有,发现有,就访问.

- 2、下面这句话也没有问题.
```js
    // 一般情况下不会有人这么写.
    var s2 = new Student.prototype.constructor("华华", 19);
    s2.sayHi();
```

- 4、原型可以替换
    - 原型替换了之后,constructor的指向会丢失.
    - 但是可以找回来
    ```js
        Student.prototype = {
            constructor:Student
        };
        console.log(Student.prototype.constructor === Student); // true;
    ```