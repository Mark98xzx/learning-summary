let a;
let b;
// a = 1; //err
let c;
// c = null;  // 配置文件不加strictNullChecks 是ok
// c = undefined; // 配置文件不加strictNullChecks 是ok
let d;
let e;
let ele = document.querySelector("div"); // ele: HTMLDivElement | null
if (ele) {
    ele.style.display = 'none';
}
