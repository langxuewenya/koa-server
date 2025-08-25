const multer = require("@koa/multer");
const { UPLOAD_AVATAR_pATH } = require("../config/path");

//上传头像中间件

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_AVATAR_pATH); // 上传文件保存的路径
  },
});

const handleAvatar = multer({ storage: storage }).single("avatar");

// 上传其他文件...

module.exports = { handleAvatar };
