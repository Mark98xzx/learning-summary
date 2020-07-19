// buffer是一个二进制的类

// buffer创建
// new Buffer()
// let buffer = Buffer.alloc(10)
// console.log(buffer)


// 字符串创建
// let buffer = Buffer.from("大家好")
// console.log(buffer)


// 数组创建 (两位的十六进制编码在js不识别)需手动抓换
// let buffer = Buffer.from([e5, a4, a7, e5, ae, b6, e5, a5, bd])
// 转换(前面加上0x)
// let buffer = Buffer.from([0xe5, 0xa4, 0xa7, 0xe5, 0xae, 0xb6, 0xe5, 0xa5, 0xbd])
// console.log(buffer.toString())


// 也会出现 null的情况
let buffer1 = Buffer.from([0xe5, 0xa4, 0xa7, 0xe5])
let buffer2 = Buffer.from([0xae, 0xb6, 0xe5, 0xa5, 0xbd])
// console.log(buffer1, buffer2) // 没问题
// console.log(buffer1.toString()) // 字符串类型
// let newBuffer = Buffer.concat([buffer1, buffer2])
// console.log(newBuffer.toString())


// 另外一种解决方式
let {StringDecoder} = require("string_decoder")
let decoder = new StringDecoder()
let res1 = decoder.write(buffer1)
let res2 = decoder.write(buffer2)
console.log(res1+res2)
console.log(res2)