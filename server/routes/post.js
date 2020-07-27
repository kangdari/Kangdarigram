const express = require('express');
const router = express.Router();
const multer = require('multer');
const Post = require('../model/Post');

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

// 이미지 업로드
router.post('/image', (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ uploadSuccess: false, err });

    return res
      .status(200)
      .json({ uploadSuccess: true, filePath: res.req.file.path, filename: res.req.file.name });
  });
});

// post 업로드
router.post('/upload', (req, res) => {
  const post = new Post(req.body);

  post.save((err) => {
    if (err) return res.status(400).json({ uploadSuccess: false, err });
    return res.status(200).json({ uploadSuccess: true });
  });
});

// user _id로 검색 => user가 작성한 post 조회
router.post('/posts', (req, res) => {
  const { _id } = req.body;
  Post.find({ writer: _id }).exec((err, postInfo) => {
    if (err) return res.status(400).json({ success: false, err });

    return res.status(200).json({ success: true, postInfo });
  });
});

module.exports = router;
