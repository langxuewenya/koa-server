const multer = require("@koa/multer");

//上传头像中间件

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // 上传文件保存的路径
  },
});

const handleAvatar = multer({ storage: storage }).single("avatar");

// 上传其他文件...

module.exports = { handleAvatar };
