const Koa = require("koa")
const Router = require("koa-router")
const nunjucks = require("koa-nunjucks-2")
let app = new Koa()

let router = new Router()
app.use(nunjucks({
    ext: "html",
    path: __dirname+"/views",
    nunjucksConfig: {
        trimBlocks: true, // 防止xss漏洞
    }
}))
router.get("/", async ctx => {
    // ctx.body = "hello"
    ctx.render("index", {
        username: "xzx",
        num: 3,
        arr:[{
            name:"张三",
            age:20
        },{
            name:"李四",
            age:28
        }],
        str: "hello world"
    })
})

router.get("/son", async ctx => {
    await ctx.render("son")
})

router.get("/import",async ctx=>{
    await ctx.render("import");
})

app.use(router.routes())

app.listen(8080)