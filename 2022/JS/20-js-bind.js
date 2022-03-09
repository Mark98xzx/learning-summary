let foo = {
    value: 1,
};

function bar() {
    return this.value;
};

let bindFoo = bar.bind(foo);

console.log(bindFoo()); // 1