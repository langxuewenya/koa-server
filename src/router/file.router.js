const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const { handleAvatar } = require("../middleware/file.middleware");
const { uploadAvatar } = require("../controller/file.controller");

const fileRouter = new KoaRouter({ prefix: "/file" });

// 上传头像
fileRouter.post("/avatar", verifyAuth, handleAvatar, uploadAvatar);

module.exports = fileRouter;
