let obj = {
    a: 1,
    fn(x) {
        // this
        this.a;
        this.fn;
        // (<T>this).b; // err
    }
};
// obj.fn(1);
