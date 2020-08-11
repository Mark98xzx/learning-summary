let fn = (x) => {
};
let obj2 = {
    a: 1,
    fn(x) {
        return () => {
            //this
            this; // T
        };
    }
};
let obj3 = {
    a: 1,
    fn(x) {
        return () => {
            //this
            this; // Window
        };
    }
};
