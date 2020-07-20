const mysql = require("mysql2/promise");

let connection;
module.exports = {
  async initDB() {
    connection = await mysql.createConnection({
      user: "root",
      password: "root",
      database: "kkb-study",
    });
  },

  getDb() {
    return connection;
  },
};
