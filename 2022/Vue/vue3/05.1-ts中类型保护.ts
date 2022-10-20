// 类型保护 主要靠js的特性 和 ts自带的功能

// 1 typeof 区分类型保护变量
function fn(val: number | string) {
    if (typeof val === 'string') {
        val.match
    } else {
        val.toFixed
    }
}

// 2. instanceof
class Person {
    eat() {}
}
class Dog {

}
const createClass = (clazz: new () => Person | Dog ) => {
    return new clazz
}

let r = createClass(Person)
if (r instanceof Person) {
    r // Persom
} else {
    r // Dog
}


// 3. in 语法
interface Fish {
    swiming: string
}
interface Bird {
    fly: string
}

function getAnimalType(animal: Fish | Bird) { // keyof 取的是类型
    if ('swiming' in animal) {
        animal.swiming
    } else {
        animal.fly
    }
}

// === 以上的情况都是可以通过 js 来判断出来的


// 可以增加一个字面量类型来进行判断，可识别类型
interface IButton1 {
    color: 'blue'
    class: string
}
interface IButton2 {
    color: 'green'
    class: string
}

function getButton(button: IButton1 | IButton2) {
    if (button.color == 'blue') {
        button
    } else {
        button
    }
}


// ts中  is 语法：用来定义自己的类型
function isString(val: any): val is string { // 根据函数的返回值确定是不是string类型
    return Object.prototype.toString.call(val) == '[object String]'
}
let str = 'hello'
if (isString(str)) {
    str
}
let str1 = 1
if (isString(str1)) {
    str1 // never
}



// null 保护     三种 val ！= nul    ?     !
function getNum(val?: number | null) {
    val = val || 3;
    val.toFixed // 明确出来是 number

    function inner() {
        // val?.toFixed
        // val.toFixed
        if (val !== null) { // 内层函数可能会判断不正常
            // val.toFixed()
        }
    }
    inner();
}



// 代码的完整性；主要靠的是 never，利用 never 无法到达最终结果的特性，来保证代码的完整性
interface ISquare {
    kind: 'square',
    width: number
}

interface IRant {
    kind: 'rant',
    width: number,
    height: number
}

interface ICircle {
    kind: 'circle',
    r: number
}

const asset = (obj: never) => { throw new Error("err") }
// 完整性保护，保证代码逻辑全部覆盖到
function getArea(obj: ISquare | IRant | ICircle) {
    switch (obj.kind) {
        case "square":
            return obj.width * obj.width;
            break;
        case "rant":
            return obj.width * obj.height;
            break;
        case "circle":
            return
        default:
            asset(obj);
            break;
    }
}

getArea({kind: 'circle', r: 10})

export {}