const connection = require("../app/database");

class fileService {
  // 保存头像信息
  async saveAvatar(filename, mimetype, size, userId) {
    const statement =
      "INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);";
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
    ]);
    return result;
  }
}

module.exports = new fileService();
