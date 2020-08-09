function fnn(x: number, y:number): number {
    return x + y
    // return x + y + '' //err
}

// fnn(1, 1)
// fnn(1, '1') // err

let v1: number = fnn(1, 2)