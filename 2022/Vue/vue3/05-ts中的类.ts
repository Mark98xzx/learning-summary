
// 类 最早都是用构造函数来替代的  ->  es6 类的概念 （function）
// 实例属性、方法； 静态属性、方法； 原型属性和方法

class Pointer {
    // public x: number = 1
    // public y: number = 2 // 声明的变量会被增加到实例
    constructor (public x: number, public y: number) { // 在 constructor 中的操作都是初始化操作
        this.x = x;
        this.y = y;
    }
}

let pointer = new Pointer(100, 200);

console.log(pointer.y, pointer.x); // 200 100


// public 是属性修饰符
// private
// protected
// readonly

class Animal {
    protected constructor (public name: string, public age: number) {
        console.log(this.name)
    }
    static type = '动物'; // 静态方法 es7语法
    // static get type() { // 属性服访问器
    //     return '动物'
    // }

    static getName() {
        return '方法'
    }
}

// new Animal() // Error 类“Animal”的构造函数是受保护的，仅可在类声明中访问

class Cat extends Animal {
    constructor(name: string, age: number, public address: string) {
        super(name, age); // Animal.call(this, name, age)
        console.log(this.name);
    }
}

let cat = new Cat('Tom', 18, '美国');
console.log(cat, cat.name);

export {}