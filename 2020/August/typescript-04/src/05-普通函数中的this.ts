interface T {
    a: number;
    fn: (x: number) => void;
}

let obj: T = {
    a: 1,
    fn(this: T, x: number) {
        // this
        (<T>this).a;
        (<T>this).fn;
        // (<T>this).b; // err
    }
}

// obj.fn(1);