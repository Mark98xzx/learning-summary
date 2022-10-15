const tuple: [string, number, boolean] = ['1', 1, true]

// tuple[3] = 100

tuple.push('str', 1, 2, 3)

function getVoid(): void {
    return undefined
    // return null
}

function create(obj: object) { // 后面泛型约束 会大量使用 object 类型

}
create({})
create([])
create(function() {})


const ele: HTMLElement | null = document.getElementById('app');

// 非空断言 表示这个东西一定有值，告诉ts 按照我的想法来，如果后续出错我负责
ele!.innerHTML = 'abc'

let a: string | number | undefined
// (<string>a).
// (<boolean>a).  类型 "string | number | undefined" 到类型 "boolean" 的转换可能是错误的，因为两种类型不能充分重叠。如果这是有意的，请先将表达式转换为 "unknown"。类型“number”不可与类型“boolean”进行比较

(a as any) as boolean

// 字面量类型 类型的内容是固定的
// let type: 'a' | 'b' | 'c' | 'd' = 'b'

type IType = 'a' | 'b' | 'c' | 'd'; // 类型别名

let type: IType = 'b';
let type2: IType = 'd';