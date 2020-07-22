const koa = require("koa");
const views = require("koa-views");
const static = require("koa-static");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const md5 = require("md5");


const musicData = require("./data/music.json");

const app = new koa();
const router = new Router();


app.use(views(__dirname + "/views"), {
    map: {
        html: "pug"
    }
})
app.use(static(__dirname + "/static"));
app.use(bodyParser());
router.get("/login", async (ctx, next) => {
    let cookieInfo = ctx.cookies.get("isLogin")
    if (cookieInfo) {
        let serverInfo = md5("张三" + "123");
        if (serverInfo == cookieInfo) {
            ctx.redirect("/list");
        }
    }
    await ctx.render("login.pug");
})


router.post("/checkUser", (ctx, next) => {
    // console.log(ctx.request.body);
    //假定用户名是张三 密码是123；
    if (ctx.request.body.username == "张三" && ctx.request.body.pwd == "123") {
        console.log(ctx.request.body);
        if (ctx.request.body.memberMe) {
            //需要储存登录成功的状态；
            let loginStatus = md5("张三" + "123"); // 使用md加密
            ctx.cookies.set("isLogin", loginStatus, {
                maxAge: 3600 * 1000 * 24 * 7  // 设置 cookie 的有效时间
            })
        }
        //跳转到list页面；
        ctx.redirect("/list");
    } else {
        //用户名或者密码错误，跳转到错误页面；
        ctx.redirect("/error");
    }
})


router.get("/list", async (ctx, next) => {
    await ctx.render("list.pug", {
        musicData
    });
})
router.get("/error", async (ctx, next) => {
    await ctx.render("error.pug");
})

//音乐详细页面
router.get("/detail",async (ctx,next)=>{
    await ctx.render("detail.pug");
})

app.use(router.routes());
app.listen(3000);