const KoaRouter = require("@koa/router");
const { verifyLogin } = require("../middleware/login.middleware");
const { login } = require("../controller/login.controller");

const loginRouter = new KoaRouter({ prefix: "/login" });

// 登录接口
loginRouter.post("/", verifyLogin, login);

module.exports = loginRouter;
