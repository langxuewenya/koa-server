const KoaRouter = require("@koa/router");
const { create, showAvatar } = require("../controller/user.controller");
const {
  verifyUser,
  encryptPassword,
} = require("../middleware/user.middleware");

const userRouter = new KoaRouter({ prefix: "/user" });

// 用户注册接口
userRouter.post("/", verifyUser, encryptPassword, create);
// 展示用户头像
userRouter.get("/avatar/:userId", showAvatar);

module.exports = userRouter;
