let a1 = {};
let arr = [1, 2, 3, 4];
let d1 = new Date();
let aObj = {
    x: 1,
    y: 2
};
let user = {
    username: 'zhangsan',
    age: 18
};
let user1 = {
    username: "zxz",
    age: 22
};
let user2 = {
    username: 'mmm',
    age: 23
};
// 类
class Person1 {
    constructor(username, age) {
        this.username = username;
        this.age = age;
    }
}
let users = new Person1("xzx", 22);
function ajax(options) { }
ajax({
    url: '',
    method: 'get'
});
