// 安全的 any  3.0版本
let ccc: any = 'xzx';

let ddd: number = 1;

ddd.toFixed(1);

ddd = ccc;

ddd.toFixed(1)


let ccc1: unknown = 'xzx';

let ddd1: number = 1;

ddd1.toFixed(1);

// ddd = ccc1; // err

ddd1.toFixed(1)

let g: any;
g.a;

let h: unknown;
// h.a; // errr

// unknow 比 any 严格