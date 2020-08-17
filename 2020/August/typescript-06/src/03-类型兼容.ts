interface IFly {
    fly(): void;
}

class Person implements IFly {
    name: string;
    age: number;

    study() {

    }

    fly() {}
}

class Cat implements IFly {
    name: string;
    age: number;

    catchMouse() {}

    fly() {}
}

let a1 = new Person();
let c1 = new Cat();

// function fn(arg: Person) {
//     arg.name;
// }

// fn( c1 )


function fn0( arg: IFly ) {
    arg.fly();
}

fn0(a1);
fn0(c1);