const connection = require("../app/database");

class UserService {
  // 创建用户
  async create(user) {
    const { username, password } = user;
    const statement = "INSERT INTO `user` (username, password) VALUES (?, ?);";
    const [result] = await connection.execute(statement, [username, password]);
    return result;
  }
  // 查询用户是否存在
  async findUserByUsername(username) {
    const statement = "SELECT * FROM `user` WHERE username = ?;";
    const [values] = await connection.execute(statement, [username]);
    return values;
  }
  // 更新用户头像
  async updateUserAvatar(avatarUrl, userId) {
    const statement = "UPDATE user SET avatar_url = ? WHERE id = ?;";
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }
}

module.exports = new UserService();
