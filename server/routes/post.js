const express = require('express');
const router = express.Router();
const multer = require('multer');
const Post = require('../model/Post');
// const { auth } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 파일 저장 위치
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    // 파일 저장 이름
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single('file');

// 포스트 업로드
router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ uploadSuccess: false, err });

    return res
      .status(200)
      .json({ uploadSuccess: true, filePath: res.req.file.path, filename: res.req.file.name });
  });
});

module.exports = router;
