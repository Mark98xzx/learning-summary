let a: null;

let b: undefined;

// a = 1; //err


let c: number;

// c = null;  // 配置文件不加strictNullChecks 是ok
// c = undefined; // 配置文件不加strictNullChecks 是ok


let d: number;

let e;


let ele = document.querySelector("div");  // ele: HTMLDivElement | null
if (ele) {
    ele.style.display = 'none';
}