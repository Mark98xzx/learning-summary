let p1 = {
    x: 100,
    y: 200
};
// let p2: Point;
// p1.y = 300; // err
p1.z = 100;
// ----------------------------
class Person {
    constructor(username) {
        this.username = username;
    }
}
class Student extends Person {
}
//--------------------
function fn1(x, y) {
    return x + y;
}
function fn2(x, y) {
    return x + y;
}
let fn = function (a, b) {
    return a + b;
};
let fnn = function (a, b) {
    return a + b;
};
//-------------------
function todo(callback) {
    let v = callback(1, 2);
}
todo(function (a, b) {
    return a + b;
});
function on(el, evname, callback) {
}
let div = document.querySelector('div');
if (div) {
    on(div, 'click', function (e) {
        // e.clientX
    });
}
let box = {
    height: 5,
    width: 6,
    scale: 10,
    fn: function (a) {
        return a;
    },
};
