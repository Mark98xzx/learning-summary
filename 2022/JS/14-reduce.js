let arr = [0, 1, 2, 3, 4];

let totalNum = arr.reduce((accumulate, currentValue, i, arr) => {
    console.log(accumulate, currentValue, i);
    // 0 1 1
    // 1 2 2
    // 3 3 3
    // 6 4 4
    return accumulate + currentValue;
})
console.log(totalNum, 'totalNum'); // 10 totalNum

let totalNum1 = arr.reduce((accumulate, currentValue, i, arr) => {
    return accumulate + currentValue;
}, 0)
console.log(totalNum1, 'totalNum1'); // 10 totalNum1

let totalNum2 = arr.reduce((accumulate, currentValue, i, arr) => {
    return accumulate + currentValue;
}, 5)
console.log(totalNum2, 'totalNum2'); // 15 totalNum2

let arr1 = [];
// arr1.reduce((acc, curr) => {
//     return acc + curr;
// }) // error
let test = arr1.reduce((acc, curr) => {
    return acc + curr;
}, 0)

console.log(test, 'test');

// 累加对象数组里的值
// 要累加对象数组中包含的值，必须提供初始值，以便各个item正确通过你的函数
let initialValue = 0;
let sum = [{x: 1}, {x:2}, {x:3}].reduce((accumulator, currentValue) => {
    return accumulator + currentValue.x;
}, initialValue)
console.log(sum, 'sum'); // 6 sum

// 二维数组转一维数组
let a = [1,2,3]
let b = [7,8,1]
console.log(a.concat(b)) // [ 1, 2, 3, 7, 8, 1 ]

let twoArr = [[1,3,2], [7,8,9], [2,5,8]]
let newArr = twoArr.reduce((acc, curr) => {
    return acc.concat(curr)
}, [])
console.log(newArr, 'newArr'); // [1, 3, 2, 7, 8, 9, 2, 5, 8] newArr

// 计算数组中每个元素出现的次数
let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
let nameObj = names.reduce((allname, name) => {
    if (name in allname) {
        allname[name]++;
    } else {
        allname[name] = 1;
    }
    return allname;
}, {})
console.log(nameObj, 'nameObj'); // { Alice: 2, Bob: 1, Tiff: 1, Bruce: 1 } 'nameObj'