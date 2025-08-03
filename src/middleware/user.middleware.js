const userService = require("../service/user.service");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
} = require("../config/error");

// 验证用户
const verifyUser = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  // 1. 验证用户名和密码是否为空
  if (!username || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  // 2. 验证用户是否已存在
  const users = await userService.findUserByUsername(username);
  if (users.length) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
  }
  // 3. 执行下一个中间件
  await next();
};

module.exports = {
  verifyUser,
};
