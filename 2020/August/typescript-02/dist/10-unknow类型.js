// 安全的 any  3.0版本
let ccc = 'xzx';
let ddd = 1;
ddd.toFixed(1);
ddd = ccc;
ddd.toFixed(1);
let ccc1 = 'xzx';
let ddd1 = 1;
ddd1.toFixed(1);
// ddd = ccc1; // err
ddd1.toFixed(1);
let g;
g.a;
let h;
// h.a; // errr
// unknow 比 any 严格
