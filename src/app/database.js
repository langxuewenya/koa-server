const mysql = require("mysql2");

// 1. 创建连接池
const connectionPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "admin-server",
  user: "root",
  password: "@adminlxw123456.",
  connectionLimit: 5,
});

// 2. 获取连接是否成功
connectionPool.getConnection((err, connection) => {
  // 2.1 判断是否有错误信息
  if (err) {
    console.log("连接失败", err);
    return;
  }
  // 2.2 获取connection，尝试和数据库建立连接
  connection.connect((err) => {
    if (err) {
      console.log("和数据库交互失败");
    } else {
      console.log("和数据库交互成功，可以操作数据库");
    }
  });
});

// 3. 获取连接池中的连接对象（promise）
const connection = connectionPool.promise();

module.exports = connection;
