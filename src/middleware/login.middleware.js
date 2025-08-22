const jwt = require("jsonwebtoken");
const userService = require("../service/user.service");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
} = require("../config/error");
const md5Encrypt = require("../utils/md5");
const { PUBLIC_KEY } = require("../config/screct");

// 登录验证
const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  const users = await userService.findUserByUsername(username);
  const user = users[0];
  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx);
  }
  if (user.password !== md5Encrypt(password)) {
    return ctx.app.emit("error", PASSWORD_IS_INCORRENT, ctx);
  }
  // 将user对象保存到ctx中,可供后面的中间件使用
  ctx.user = user;

  await next();
};

// 验证token
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    return ctx.app.emit("error", UNAUTHORIZATION, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  // 验证token是否有效
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (error) {
    ctx.app.emit("error", UNAUTHORIZATION, ctx);
  }
};

module.exports = {
  verifyLogin,
  verifyAuth,
};
