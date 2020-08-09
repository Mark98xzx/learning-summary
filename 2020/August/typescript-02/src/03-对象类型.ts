let a1: Object = {};

let arr: Array<number> = [1, 2, 3, 4]

let d1: Date = new Date()


let aObj: Object = {
    x: 1,
    y: 2
}


let user: {username: string, age: number} = {
    username: 'zhangsan',
    age: 18
}
// user.gender = 'nan'

 
// 接口  复用
interface Person {
    username: string;
    age:  number;
}

let user1: Person = {
    username: "zxz",
    age: 22
}

let user2: Person = {
    username: 'mmm',
    age: 23
}

// 类
class Person1 {
    constructor(public username: string, public age: number){

    }
}

let users: Person = new Person1("xzx", 22)


interface AjaxOptions {
    url: string;
    method: string;
}

function ajax(options: AjaxOptions) {}

ajax({
    url: '',
    method: 'get'
});