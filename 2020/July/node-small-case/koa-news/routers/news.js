// 处理新闻列表
let currentPage;
const pageSize = 5;
const { getDb } = require("../db");
module.exports = async (ctx) => {
  // 获取数据
  currentPage = +ctx.query.p || 1;
  const newsDataList = await getCurrentPageNewsDataList();
  const len = await getPageCount();
  await ctx.render("news", {
    newsDataList,
    len,
    currentPage,
  });
};

async function getCurrentPageNewsDataList() {
  // const start = (currentPage - 1) * pageSize;
  // const end = start + pageSize;
  // return newsDataList.slice(start, end);
  // 分页
  const offset = (currentPage - 1) * pageSize;
  const sql = `SELECT * FROM news LIMIT ?,?`;
  const [rows] = await getDb().execute(sql, [offset, pageSize]);
  return rows;
}

async function getPageCount() {
  const sql = `SELECT * FROM news `;
  const [rows] = await getDb().execute(sql);
  const len = Math.ceil(rows.length / pageSize);
  return len;
}
