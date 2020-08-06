const express = require("express");
const router = express.Router();
const multer = require("multer");
const Post = require("../model/Post");
const Save = require("../model/Save");
const { getTime } = require("../utils/getTime");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 파일 저장 위치
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    // 파일 저장 이름
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

// 이미지 업로드
router.post("/image", (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ uploadSuccess: false, err });

    return res.status(200).json({
      uploadSuccess: true,
      filePath: res.req.file.path,
      filename: res.req.file.name,
    });
  });
});

// post 업로드
router.post("/upload", (req, res) => {
  const post = new Post(req.body);

  post.save((err) => {
    if (err) return res.status(400).json({ uploadSuccess: false, err });
    return res.status(200).json({ uploadSuccess: true });
  });
});

// user profile의 post 조회
router.post("/get-profile-post-list", (req, res) => {
  const { _id } = req.body;

  Post.find({ writer: _id })
    .populate("writer")
    .exec((err, postInfo) => {
      if (err) return res.status(400).json({ success: false, err });

      const newPostInfo = postInfo.map((post) => {
        const duration = getTime(post.createdAt);
        return { ...post._doc, ...{ timeInterval: duration } };
      });

      return res.status(200).json({ success: true, postInfo: newPostInfo });
    });
});

// user가 저장한 post 조회
router.post("/loadSavedPosts", (req, res) => {
  const { _id } = req.body;
  // 유저의 id를 가지고 Save 모델에서 검색
  Save.find({ userId: _id }).exec((err, savedInfo) => {
    if (err) return res.status(400).json({ success: false, err });
    // 저장된 post id 배열
    const savedPost = savedInfo.map((post) => post.postId);
    // Post 모델에서 저장된 post만 검색
    Post.find({ _id: { $in: savedPost } })
      .populate("writer")
      .exec((err, savedPostInfo) => {
        if (err) return res.status(400).json({ success: false, err });

        const newSavedPostInfo = savedPostInfo.map((post) => {
          const duration = getTime(post.createdAt);
          return { ...post._doc, ...{ timeInterval: duration } };
        });

        return res
          .status(200)
          .json({ success: true, savedPostInfo: newSavedPostInfo });
      });
  });
});

module.exports = router;
