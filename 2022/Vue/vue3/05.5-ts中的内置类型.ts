
// ts 中其他的内置类型，根据定义好的已有的类型，演变出一些其他类型

interface ICompany {
    name: string,
    address: string
}

interface IPerson {
    name: string,
    age: number,
    company: ICompany
}


// 
// 1. Partial ： 表示选项可以是选填的, 深度递归，默认不是深度递归
type  Partial<T> = {
    [K in keyof T]?: T[K] extends object ? Partial<T[K]> : T[K]
}
type MyPerson = Partial<IPerson>

let person: MyPerson = {
    name: 'mark',
    age: 12,
    company: {

    }
}



// 2.Required -? 去掉可选
type Required<T> = {
    [K in keyof T] - ? : T[K]
}
type MyRequired = Required<MyPerson>



// 3. Readonly
type Readonly<T> = {
    readonly [K in keyof T] - ? : T[K]
}
type MyReadonly = Readonly<MyPerson>



// 4. Pick：精挑细选（对象里选属性）； extract：抽离可用的（类型中选类型）
type Pick<T, K extends keyof T> = {
    [X in K] : T[X] // 挑选属性
}
type MyPick = Pick<IPerson, 'age' | 'company'>



// 5. Omit 忽略属性，两个对象合并 T&K
// 忽略掉name的其他的
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type MyType = Omit<IPerson, 'name'> & {name: string}



// 6. Record类型
type Record<K extends keyof any, T> = { // 约等于 任意接口
    [P in K]: T; // string: value; number: value;  symbol: value
}
let obj: Record<string, any> = {a: 1, b: 'sss'}



export {}