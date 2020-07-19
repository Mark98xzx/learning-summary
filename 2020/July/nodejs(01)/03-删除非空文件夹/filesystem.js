
const fs = require("fs")

// 目录操作
// 读取目录
// fs.readdir("testdemo", (err, data) => {
//     if(err){
//         return console.log(err)
//     }
//     console.log(data, 'read success')
// })

// 删除目录(空文件夹/目录)
// fs.rmdir("testdemo", err => {
//     if(err){
//         return console.log(err)
//     }
//     console.log('del success')
// })


// 删除非空文件夹
// 先把目录里的文件删除 ---> 删除空目录
function removeDir(path){
    let data = fs.readdirSync(path);
    // [ '22', '33', '1.txt', '2.html']
    for (let i = 0; i < data.length; i++) {
        // 是文件或者目录； --->  ？文件：直接删除  ？目录：继续查找
        let url = path + "/" + data[i]
        let stat = fs.statSync(url)
        if(stat.isDirectory()){
            // 继续查找
            removeDir(url)
        } else {
            // 文件 删除
            fs.unlinkSync(url)
        }
    }
    // 删除空目录
    fs.rmdirSync(path)
}

removeDir("testdemo")