const fs = require("fs");
const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const { UPLOAD_AVATAR_pATH } = require("../config/path");

class userController {
  // 用户注册
  async create(ctx, next) {
    const user = ctx.request.body;
    const result = await userService.create(user);
    ctx.body = {
      message: "创建用户成功",
      data: result,
    };
  }

  // 展示头像
  async showAvatar(ctx, next) {
    const { userId } = ctx.params;
    const avatarInfo = await fileService.queryAvatarByUser(userId);
    const { filename, mimetype } = avatarInfo;
    ctx.type = mimetype; // 设置返回格式
    ctx.body = fs.createReadStream(`${UPLOAD_AVATAR_pATH}/${filename}`);
  }
}

module.exports = new userController();
