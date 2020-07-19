// steam 流； 概念
const fs = require("fs")

// fs 模块 直接读取
// let res = fs.readFileSync("1.txt")
// console.log(res)
// console.log(res.toString())

// 可读流 (如果文件很大大，会去分成小段去读取)
// 好处：不会是造成内存溢出、或者宕机
// 性能会比上面的好
// let rs = fs.createReadStream("1.txt")
// rs.on("data", chunk => {
//     console.log(chunk.toString())
// })


// 创建一个65kb的文件
// let buffer = Buffer.alloc(65*1024)
// fs.writeFile("65kb", buffer, err => {
//     if(err){
//         return console.log(err)
//     }
//     console.log('write success')
// })

// 读取65kb文件  (分成两次读取)
// let rs = fs.createReadStream("65kb")
// let num = 0;
// let str = ""
// rs.on("data", chunk => {
//     num++;
//     str += chunk;
//     console.log(chunk)
//     console.log(num)
// })
// // 流完成了
// rs.on("end", () => {
//     console.log(str)
// })


//-------------------
// 创建一个64kb的文件
// let buffer = Buffer.alloc(64*1024)
// fs.writeFile("64kb", buffer, err => {
//     if(err){
//         return console.log(err)
//     }
//     console.log('write success')
// })

// 读取64kb文件  (只读取1次)
// let rs = fs.createReadStream("64kb")
// let num = 0;
// rs.on("data", chunk => {
//     num++;
//     console.log(chunk)
//     console.log(num)
// })


// 总结： 流会把数据分成 64kb 的小文件传输
// 以 64kb 为倍数 

//---------------------------
// 写入   相当于 复制
// let rs = fs.createReadStream("1.txt")
// let ws = fs.createWriteStream("2.txt")
// rs.pipe(ws)