// 交叉类型 = 交集 （和数学中的有点差异）

interface Person1 {
    handsome: string
    // a: string  // 如果两个类型不一致，则相交的结果是never
}

interface Person2 {
    height: string
    // a: number
}

type Person3 = Person1 & Person2; // |并集   & 交集 （交集可以理解成涵盖所有属性）

let person: Person3 = {
    handsome: '帅',
    height: '高',
    // a: 1
}

// 在原有的类型基础上想去扩展属性，可以使用交叉类型
// ts的核心是为了安全；交叉类型，可以赋予给没有交叉之前的类型

let p: Person2 = person;


// type Person4 = Person2 & {money: string}
// let person4: Person4 = {
//     ...person,
//     money: '有钱'
// }

// 交叉类型，可以不生成一个新的类型，作为临时类型来使用
let person4: Person2 & {money: string} = {
    ...person,
    money: '有钱'
}

// 方法的mixin 默认推断会生成交集
function mixin<T extends object, K extends object>(o1: T, o2: K): T & K {
    return { ...o1, ...o2 }
}
let r = mixin({name: 'mark', age: 18}, {address: 'sz'})
// r.

export {}