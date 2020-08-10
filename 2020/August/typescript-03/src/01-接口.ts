interface Point {
    x: number;
    readonly y: number; // readonly 只读
    // color?: string;
    [key: string]: number; // 可拓展属性
}

let p1: Point = {
    x: 100,
    y: 200
}

// let p2: Point;

// p1.y = 300; // err

p1.z = 100;


// ----------------------------
class Person {
    constructor(public username: string) {}
}
class Student extends Person {

}

interface Point1 {
    // x: number;
    // readonly y: number;
    [key: string]: Person;
    [key: number]: Student;
}


//--------------------
function fn1(x: number, y: number): number{
    return x + y;
}
function fn2(x: number, y: number): number{
    return x + y;
}

// ---------------
interface IFunc {
    (x: number, y:number): number
}

let fn: IFunc = function(a: number, b:  number):number {
    return a + b
}

let fnn: IFunc = function(a: number, b:  number):number {
    return a + b
}

//-------------------
function todo (callback: IFunc) {
    let v = callback(1, 2)
}

todo(function(a: number, b: number): number {
    return a + b
})

// --------------------------
// document.onclick = function(){}

interface IEventFunc {
    (e: Event): void
}

function on(el: HTMLElement, evname: string, callback: IEventFunc){

}

let div = document.querySelector('div')
if (div) {
    on(div, 'click', function(e){
        // e.clientX
    })
}

// ----------------------------
    interface Box {
        height: number;
        width: number;
        fn(a: string): string;
    }
    
    interface Box {
        scale: number;
        // width: string;
        fn(a: number): number;
    }
    
    let box: Box = {
        height: 5,
        width: 6, 
        scale: 10,
        fn: function(a:any):any {
            return a;
        },
    }