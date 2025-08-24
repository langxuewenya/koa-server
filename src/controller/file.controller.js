const fileService = require("../service/file.service");

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
    ctx.body = {
      code: 0,
      message: '"头像上传成功"',
      data: result,
    };
  }
}

module.exports = new fileController();
