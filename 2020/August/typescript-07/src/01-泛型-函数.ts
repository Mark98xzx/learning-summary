function getVal<T>(obj: T, k: keyof T) {
    return obj[k];
}

let obj1 = {
    x: 1,
    y: 2
}
let obj2 = {
    username: 'xzx',
    age: 18
}

getVal<typeof obj1>( obj1, 'x' );
getVal<typeof obj2>( obj2, 'age' );