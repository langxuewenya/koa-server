const KoaRouter = require("@koa/router");
const { verifyLogin, verifyAuth } = require("../middleware/login.middleware");
const { login, test } = require("../controller/login.controller");

const loginRouter = new KoaRouter({ prefix: "/login" });

// 登录接口
loginRouter.post("/", verifyLogin, login);
loginRouter.get("/test", verifyAuth, test);

module.exports = loginRouter;
