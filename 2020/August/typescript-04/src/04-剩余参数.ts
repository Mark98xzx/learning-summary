interface IObj {
    [key: string]: any;
}

// 剩余参数 others：Array<>
function merge(target: IObj, ...others:Array<IObj>) {
    return Object.assign(target, ...others);
}


let newObj = merge({x: 1}, {y: 2}, {z: 3});