// call 使用
var foo = {
    value: 1
};

function bar() {
    console.log(this.value)
};

bar(); // undefined

bar.call(foo); // 1

console.log("==============================")

