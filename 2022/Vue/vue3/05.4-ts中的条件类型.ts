// ts 中的条件类型，满足某个条件给一个类型，不满足给了一个类型

interface Fish {
    name: string,
    type: '鱼'
}

interface Bird {
    name: string,
    type: '鸟'
}

interface Swiming {
    swiming: string
}

interface Sky {
    sky: string
}

type MyType<T> = T extends Bird ? Sky : Swiming; // 三元表达式，如果传入的是一个联合类型，他会进行条件的分发 Fish extends Bird | Bird extends Bird
type IEnv = MyType<Bird>
type IEnv1 = MyType<Bird | Fish>
type IEnv2 = MyType<Bird & Fish> // 这个类型不具备分发的功能，可以实现出返回联合类型
// type x = Fish & Bird 


// 如果用户传了name属性，就必须传age
// 其他情况下，用户可以只传递age

interface ISchool1 {
    name: string,
    age: number
}

interface ISchool2 {
    age?: number,
    size: string
}

type School<T> = T extends {name: string} ? ISchool1 : ISchool2

type Myschool = School<ISchool1>

let s: Myschool = {
    name: 'xxx',
    age: 12
}



// ts 中内置的类型，内置类型包含条件的情况（内部用条件来实现）
type Exclude<T, K> = T extends K ? never : T; // 在多个类型中提排除掉某几个
type MyExclude = Exclude<string | number | boolean, boolean>

// Extract：多个属性中，抽离某几个
type Extract<T, K> = T extends K ? T : never;
type MyExtract = Extract<string | number | boolean, boolean>


// 在多个类型中排除null类型
type MyNonNollable = NonNullable<string | number | null | undefined>



// ---------- infer 推断 ----------
// 获取函数的返回值类型
function getSchool() {
    return {name: 'xxx', age: 120}
}

// let r = getSchool()
// type t = typeof r

// infer 要配合 extends 关键字；否则无法使用；infer有推断类型的功能，可以自动推断出结果
type ReturnType<T extends (...args: any[]) => any> = T extends ((...args: any[]) => infer R) ? R : any
type MyReturnType = ReturnType<typeof getSchool> // ReturnType内置的


// 函数参数类型
function getFn(x:number, y: number) {
    return {name: 'xxx', age: 120}
}
type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never
type x = Parameters<typeof getFn> // Parameters内置的

// 类的参数
class Person {
    constructor(name: string) {}
}

type ConstructorParameters<T extends new (...args: any[]) => any> = T extends new (...args: infer CP) => any ? CP : never
type MyConstructorParameters = ConstructorParameters<typeof Person>

// 类的实例
type InstanceType<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : never
type MyInstanceType = InstanceType<typeof Person>
// 可直接
type MyInstanceType1 = Person


export {}