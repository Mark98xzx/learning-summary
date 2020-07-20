const Koa = require("koa")
const Router = require("koa-router")
const views = require("koa-views")
let app = new Koa()
let router = new Router()
app.use(views(__dirname+"/views", {
    map:{
        html: "pug"
    }
}))
router.get("/", async ctx => {
    // ctx.body = "hello"
    await ctx.render("index.pug")
})
app.use(router.routes())
app.listen(3000)