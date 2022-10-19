
// interface 描述对象的形状和结构，可以给数数据增添类型，而且方便使用
// type的方式，通过别名来重新定义类型

// interface 可以被类实现 和 继承，type没有的功能
// type 可以使用联合类型 interface 不能使用联合类型

// 1) 如何用接口描述对象类型

// type IObj = {name: string, age: number};

// 用接口
interface IObj {
    name: string,
    age: number
}

const getObj = (obj: IObj) => {
    
}

getObj({name: '1', age: 18})

// type interface 两种都可以；什么时候用type，什么时候用 interface
// 如果有联合类型就使用 type
type key = 'a' | 'b' | 'c'
// 能用接口就先用接口


// 2) 描述函数类型
const sum: (a: string, b: string) => string = (a: string, b: string): string => {
    return a + b;
}
// 用接口
interface ISum {
    (a: string, b: string): string
}
// 用type 别名
// type ISum = (a: string, b: string) => string
const sum1: ISum = (a: string, b: string): string => {
    return a + b;
}
// 就可以不用再每个参数标类型
const sum2: ISum = (a, b): string => {
    return a + b;
}
// sum2('a', 2);


// 3) 我希望写一个计数器的例子，每次调用函数就累加1

interface ICount { // 接口中的混合类型
    (): number
    count: number
}
const fn: ICount = (() => { // 函数返回函数，一般要标识函数的返回类型
    return fn.count++;
}) as ICount

fn.count = 0;
console.log(fn());
console.log(fn());



// 4) 接口的特性
interface IVegetables {
    color: string,
    taste: string
}

const tomato: IVegetables = {
    color: 'green',
    taste: 'sb',
    size: 'big' // 多出会报错
}

// a. 直接断言，断言后直接可以直接使用（要保证接口中限制的数据必须要有）
const tomato1: IVegetables = {
    color: 'green',
    taste: 'sb',
    size: 'big'
} as IVegetables

// b. 接口的合并 (接口同名会合并，会改变原有的接口) 不建议使用
// interface IVegetables {
//     size: string
// }
// const tomato2: IVegetables = {
//     color: 'green',
//     taste: 'sb',
//     size: 'big'
// }

// c. 单独写一个 tomato 接口 继承蔬菜接口
interface ITomato extends IVegetables { // 接口的继承 ts里面的
    size: string
}
const tomato3: ITomato = {
    color: 'green',
    taste: 'sb',
    size: 'big'
}

// d. 可选属性 可以通过 ? 来实现
interface IVegetables1 {
    color: string,
    taste: string,
    // size?: string,
    // id?: number
    [xxx: string]: any // 任意接口，可多填
}

const tomato4: IVegetables1 = {
    color: 'green',
    taste: 'sb',
    id: 1
}

// tomato4.size


// e. 可索引接口
interface ILikeArray {
    [key: number]: any
}
let arr: ILikeArray = [1, 2, 3]
let arr1: ILikeArray = {1: 1, 2: 2}

// 把一个对象赋值给一个接口，要满足接口中的所有属性
// 如果多出的属性，可以采用 断言、可选、任意接口


// 接口中的类型，可以通过类型别名的方式拿出来，但是只能用[]语法

type MyType = {key: string, value: string}
interface XXX {
    n: MyType[]
}
interface IArr {
    arr: MyType[]
    a: XXX
}
type My = IArr['a']['n']



// f. 接口实现，接口可以被类来实现
interface ISpeakable {
    name: string,
    // 用接口来形容类的时候，void 表示不关心返回值
    speak(): void // 描述当前实例上的方法，或者原型的方法
}

class Speak implements ISpeakable {
    readonly name!: string;
    // speak: () => void
    // constructor() {
    //     this.speak = function() {

    //     }
    // }
    speak(): string { // 此方法是原型方法
        return 'yyyyy'
    }
    
}
let s = new Speak();
// s.name = 'xxx'
// s.speak.



// g. 抽象类  不能被new(只能继承，不能被实例化)
abstract class Animal{ // 只有类标记成 abstract 属性再可以描述成 abstract 的
    abstract name: string // 没有具体实现，需要子类实现
    eat() {
        console.log('eat');
        
    }
    abstract drink(): void
}
// new Animal() // error
class Cat extends Animal {
    name!: string
    drink(): void {
        throw new Error("Method not implemented.")
    }

}

export {}