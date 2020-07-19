
const fs = require("fs")

// 目录操作
// 创建目录
// fs.mkdir("xzx", err => {
//     if(err){
//         return console.log(err)
//     }
//     console.log('build success')
// })


// 修改目录名称
// fs.rename("xzx", "zzz1", err => {
//     if(err){
//         return console.log(err)
//     }
//     console.log('change success')
// })


// 读取目录
// fs.readdir("zzz1", (err, data) => {
//     if(err){
//         return console.log(err)
//     }
//     console.log(data, 'read success')
// })


// 删除目录(空文件夹/目录)
// fs.rmdir("zzz1", err => {
//     if(err){
//         return console.log(err)
//     }
//     console.log('del success')
// })



// 通用方法
// 判断文件或者目录是否存在
// fs.exists("xzx", exists => {
//     console.log(exists)
// })

// 获取文件或者目录的详细信息
fs.stat("zzz1", (err, stat) => {
    if(err){
        return console.log(err)
    }
    console.log(stat)
    // 判断文件是否的文件
    let res = stat.isFile()
    console.log(res)
    // 判断文件是否是一个文件夹
    let res2 = stat.isDirectory()
    console.log(res2)
})