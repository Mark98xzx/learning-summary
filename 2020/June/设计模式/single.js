// class Person{
    // instance：记录有没有被实例化
//     static instance;
//     constructor(name){
//         if(Person.instance){
//             return Person.instance;
//         }
//         Person.instance = this;
//         console.log(this)

//         this.name = name;
//     }
// }

// export default Person;

// 以上有一个缺点：整个 Person类 暴露了出去，不安全。有风险，在外部可以修改静态属性


// 以下方法：没有整类一个的暴露
class Person{
    constructor(name){
        this.name = name
    }
}
let instace;
export default function(...arg){
    if(instace){
        return instace
    }
    instace = new Person(...arg)
    return instace
}