const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const { SERVER_HOST, SERVER_PORT } = require("../config/server");

class fileController {
  // 上传头像
  async uploadAvatar(ctx, next) {
    // 检查文件是否正常上传
    if (!ctx.request.file) {
      ctx.status = 400;
      ctx.body = { message: "文件没有上传" };
      return;
    }
    const { filename, mimetype, size } = ctx.request.file;
    const { id } = ctx.user;
    const result = await fileService.saveAvatar(filename, mimetype, size, id);
    // 将头像信息保存到用户表中
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/user/avatar/${id}`;
    const result2 = await userService.updateUserAvatar(avatarUrl, id);

    ctx.body = {
      code: 0,
      message: '"头像上传成功"',
      data: avatarUrl,
    };
  }
}

module.exports = new fileController();
