function getVal(obj, k) {
    return obj[k];
}
let obj1 = {
    x: 1,
    y: 2
};
let obj2 = {
    username: 'xzx',
    age: 18
};
getVal(obj1, 'x');
getVal(obj2, 'age');
