function L(type: string) {
    return function(target: Function) {
        target.prototype.type = type;
    }
}

function log(type?: string) {
    return function (target: any, name: string, descriptor: PropertyDescriptor) {

        // log 方法装饰器 是比 L 类装饰器先执行的

        let value = descriptor.value;
        descriptor.value = function(x: number, y: number) {
            let result = value(x, y);
            let _type = type;
            if (!_type) {
                _type = typeof target === 'function' ? target.prototype.type : target.type;
            }
    
            console.log({
                type: _type,
                name,
                x,
                y,
                result
            });
    
            return result;
        }
    
    }
}

@L('storage')
class M {
    @log()
    static add(x: number, y: number) {
        return x + y;
    }

    @log('log')
    static sub(x: number, y: number) {
        return x - y;
    }
}

let v1 = M.add(1, 2);
console.log(v1);
let v2 = M.sub(1, 2);
console.log(v2);

export default {}