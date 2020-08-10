interface o1 {x: number; y: string}
interface o2 {z: number}

let o: o1 & o2 = Object.assign({}, {x: 1, y: 'xzx'}, {z: 2});

// o.u // err


let arr = [1,2,3];

let arr2 = [...arr, 10, 20];

Promise.resolve();