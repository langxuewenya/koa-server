const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../config/screct");

class loginController {
  // 用户登录
  login(ctx, next) {
    const { id, username } = ctx.user;
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: "7d",
      algorithm: "RS256",
    });
    ctx.body = { code: 0, data: { token, id, username } };
  }
  // 测试接口
  test(ctx, next) {
    ctx.body = "测试接口成功";
  }
}

module.exports = new loginController();
