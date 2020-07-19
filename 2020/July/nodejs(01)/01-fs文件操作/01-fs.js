const fs =require("fs")

// 增删改查
// 1. 文件操作  2. 目录操作
// 文件操作
// fs.writeFile("1.txt", "我是写入的文字", function(err){
//     if(err){
//         return console.log(err)
//     }
//     console.log('写入成功')
// })

// a: 追加写入； w： 写入； r：读取

// fs.writeFile("1.txt", "我是追加写入的文字", {flag: "a"}, function(err){
//     if(err){
//         return console.log(err)
//     }
//     console.log('写入成功')
// })

// // 文件读取
// fs.readFile("1.txt", "utf-8", (err, data) => {
//     if(err){
//         return console.log(err)
//     }
//     console.log(data)
// })

// 所以文件操作 没有加 Sync 都是异步   否则是同步
// let data = fs.readFileSync("1.txt")
// console.log(data.toString())


// 修改
// fs.rename('1.txt', '001.txt', err => {
//     if(err){
//         return console.log(err)
//     }
//     console.log('修改成功')
// })


// 删除
// fs.unlink('2.txt', (err) => {
//     if(err){
//         return console.log(err)
//     }
//     console.log('删除成功')
// })



// 复制
// fs.copyFile('001.txt', '0001.txt', err => {
//     if(err){
//         return console.log(err)
//     }
//     console.log('复制成功')
// })


// node 提供
function myCopy(src, dest){
    fs.writeFileSync(dest, fs.readFileSync(src))
}
myCopy("001.txt", "00001.txt")