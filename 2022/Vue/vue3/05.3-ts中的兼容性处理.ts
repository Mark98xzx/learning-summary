// ts中的兼容性，我们希望类型可以相互赋值

// 普通类型、接口、函数、类


// 1. 基础类型的兼容性；默认情况下都是定义好类型不能赋值给其他类型

type NumOrStr = number | string;
let numOrStr: NumOrStr = 'abc'; // 表示大的类型 子类型 -> 父类型

// 检测方法 例：鸭子检测，只要叫声像鸭子，就是鸭子
type MyStr = {toString(): string}
let str: MyStr = 'hello'; // 多的条件可以赋值给少的条件，一切都是为了安全

interface IVegetables {
    color: string
    taste: string
}


// 2. interface 将一个值赋予给了类型，是不会给出兼容性的；要求必须满足这个接口，两个接口之间是存在兼容性问题的

// let tomato: IVegetables = {
//     color: 'red',
//     taste: 'sweet'
//     // size: 'big' // error
// }

interface ITomato {
    color: string,
    taste: string,
    size: string
}

let vegetables!: IVegetables;
let tomato!: ITomato;

vegetables = tomato;
// tomato = vegetables; // error 缺少size

let vegetables1: IVegetables;
let tomato1 = {
    color: 'red',
    taste: 'sour',
    size: 'big'
}
vegetables1 = tomato1; // 通过接口的兼容性，可以处理赋予多的属性

// 可以用 as 


// 3. 函数兼容性，函数的参数 和 返回值。  类型的兼容性，类型的赋值可能发生兼容性处理

// 针对函数参数个数的兼容性

let sum1 = (a: string, b: string): string => a + b
let sum2 = (a: string): string => a

// 我允许你传递两个参数，但是你传递了一个；我只能传递一个，你给我传两个
sum1 = sum2
// sum2 = sum1  // error

function forEach<T>(arr: T[], cb: (item: T, index: number, arr: T[]) => void) {
    for (let i = 0; i < arr.length; i++) {
        cb(arr[i], i, arr);
    }
}

forEach([1, 2, 3, 4], (item, index, arr) => {
    console.log(item);
})

// 针对参数的类型做兼容处理  --> ts中的
// 逆变 和 协变
// 函数的参数的逆变的可以传父类
// 函数的返回值是协变的可以返回字类
// 传逆父  返协子

class Parent{
    money!: string
}

class Child extends Parent {
    house!: string
}

class Grandson extends Child {
    eat!: string
}

// 对于参数而言 儿子可以处理 钱和房子
function getFn(cb: (person: Child) => Child){ // house money

}

// 参数 Child Parent =>  返回值 Child Grandson
getFn((person: Child) => new Child);
getFn((person: Parent) => new Child);
// getFn((person: Parent) => new Parent); // error  Parent => money
getFn((person: Parent) => new Grandson);
// getFn((person: Child) => new Parent);



let fn: (person: Child) => Child = (person: Parent) => new Grandson;
fn(new Child);
// fn(new Parent); // error  缺少house


// 函数参数是联合类型的时候
function getType(cb: (val: string | number) => string) {

}

getType((val: string | number) => {
    return ''
})

getType((val: string) => { // string = val: sting | number
    return ''
})

getType((val: string | number | boolean) => {
    return ''
})

// 1. 并集：可以用少的赋给多的 string | number => number、string
// 2. 多的属性可以赋予少的属性
// 3. 函数的参数个数少的可以赋予个数多的

export {}