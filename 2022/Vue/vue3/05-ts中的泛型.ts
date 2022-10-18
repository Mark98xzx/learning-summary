
// 泛型的用处在于，当我们调用的时候 确定类型，而不是一开始就写好类型，类型不确定，只有在执行的时候才能确定
// 方便确定不确定的类型

// 声明的时候需要<>包裹起来；传值的时候也需要
function createArray<T>(times: number, value: T):Array<T> { // 根据对应参数的类型给T赋值
    let result = [];
    for (let i = 0; i < times; i++) {
        result.push(value);
    }
    return result;
}

let r = createArray(5, '123');


// ==========  另外写法  ========
type ICreate = <T>(x: number, y: T) => Array<T>;
const createArray1: ICreate = <T>(times: number, value: T): Array<T> => {
  let result = [];
  for (let i = 0; i < times; i++) {
      result.push(value);
  }
  return result;
}
createArray1(3, 'abc')

// ========== 再一种写法 ========
interface ICreateArray { // interface 后面的类型 和 函数前面的类型的区别：如果放在函数前面表示使用函数的时候确定了类型。如果放在接口后面，表示是使用接口的时候确定类型。
  <T>(x: number, y: T): Array<T>; 
}
    
const createArray2: ICreateArray = <T>(times: number, value: T): Array<T> => {
  let result = [];
  for (let i = 0; i < times; i++) {
      result.push(value);
  }
  return result;
}
createArray2(3, 'abc')


// 元组进行类型交换
const swap = (tuple: [string, number]): [number, string] => {
    return [tuple[1], tuple[0]]
}

swap(['abc', 123]); // => [123, 'abc'] 参数都确定 只有两项

// 如果参数不确定

const swap1 = <T, K>(tuple: [T, K]): [K, T] => {
    return [tuple[1], tuple[0]]
}

let r1 = swap1<string, number>(['abc', 123]);
swap1<string, boolean>(['abc', true]);

// r1[0]
// r1[1]

// 不建议这样做
const sum = <T extends string>(a: T, b: T): T => { // 约束对象
    return (a + b) as T
}

sum('a', 'b')


// 泛型约束：主要强调类型中必须包含某个属性
// 计算数组长度
// [1, 2, 3] [4, 5, 6]

type withLength = {length: number}
const computArrayLength = <T extends withLength, K extends withLength> (arr1: T, arr2: K): number => {
    return arr1.length + arr2.length
}

computArrayLength([1, 2, 3], {length: 3})
// computArrayLength(123, {length: 3})


// ===========================
const getVal = <T extends object, K extends keyof T>(obj: T, key: K) => {
  return 
}

// getVal(1231, 'a')
getVal({a: 1, b: 2}, 'a')

// Ts规定
type T1 = keyof {a:1, b:2} // a b
type T2 = keyof string;
type T3 = keyof any; // string | number | symbol
export {}