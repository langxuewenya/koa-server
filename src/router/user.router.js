const KoaRouter = require("@koa/router");
const userController = require("../controller/user.controller");
const {
  verifyUser,
  encryptPassword,
} = require("../middleware/user.middleware");

const userRouter = new KoaRouter({ prefix: "/user" });

// 用户注册接口
userRouter.post("/", verifyUser, encryptPassword, userController.create);

module.exports = userRouter;
