const Koa = require("koa");
const Router = require("koa-router");
const serve = require("koa-static");
const views = require("koa-views");
const path = require("path");
const news = require("./routers/news");
const { initDB } = require("./db");

initDB()

const app = new Koa();

// 静态资源
app.use(serve(path.resolve(__dirname, "./static")));
// 模板
app.use(
  views(path.resolve(__dirname, "./views"), {
    extension: "pug",
  })
);

const router = new Router();

// 路由
// 单一职责
// router.get("/news",async (ctx) => {
//     await ctx.render("news")
// });
router.get("/news", news);
// 详情页

app.use(router.routes());
app.listen(8081);
