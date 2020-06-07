// 导包
const express = require('express')
const axios = require('axios')

// c创建app
const app = express()


// 设置允许跨域
app.all('*', (req, res, next) => {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})


// 处理请求
// 测试
// app.get('/index', (req, res) => {
//     res.json({
//         status: 0,
//         message: "请求成功"
//     })
// })


// 测试
// app.get('/move/in_theaters', (req, res) => {
//     res.json([
//         {name: "千与千寻", type: "动画片"},
//         {name: "阿拉丁", type: "神话"},
//         {name: "王者荣耀", type: "动画片"}
//     ])
// })

app.get('/move/in_theaters', (req, res) => {
    // 发送请求给豆瓣服务器
    axios.get('https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a').then(res2=>{
        res.json(res2.data)
    })
})

// 启动服务
app.listen(3000, err => {
    if(err){
        console.log(err)
    }
    console.log('Is ok')
})