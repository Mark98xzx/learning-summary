// 函数

// 考虑函数的参数和返回值


// 函数关键字 写完后会对当前函数，自动推断类型
function sum(x: string, y: string): string {
    return x + y
}



// const sum2 = (x: number, y: number): number => {
//     return x + y
// }
// 可以自动根据当前等号右边的内容，推断左边的类型
// const sum2: (x: number, y: number) => number = (x: number, y: number): number => {
//     return x + y
// }
// 等同于
type IFn = (x: number, y: number) => number
const sum2: IFn = (x: number, y: number): number => {
    return x + y
}

// sum2(1, 3) // ok
// sum2(1, '1') // error
// sum2(1, 1, 3) // error



// js 中支持的方法全部都支持

// ? 表示参数可以传递或者不传递，但是 y 的类型 可以是 number | undefined
// = 表示默认值
// 可以使用剩余运算符
// js 中默认值和可选参数不能一起使用
const sum3 = (x: number, y?: number, ...args: number[]): number => {
    // return x + y!;
    return x + (y as number)
}

sum3(123, 1, 12, 25);


// 函数重载

// 123 => [1, 2, 3]
// abc => ['a', 'b', 'c']

// 有可能出现下面的情况
// number => string[]
// string => number[]

// 一个方法，根据参数的不同实现不同的功能，ts 目的就是根据不同的参数返回类型
function toArray(value: string): string[];
function toArray(value: number): number[];
function toArray(value: number | string): number[] | string[] { // 重载方法要写在真实方法上面，且不能写其他
    if (typeof value === 'string') {
        return value.split('');
    } else {
        return value.toString().split('').map(v => Number(v));
    }
}

let r = toArray('123');
let r2 = toArray(100);

export {}