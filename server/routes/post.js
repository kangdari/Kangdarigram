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

// 전체 포스트 조회
router.post("/load-post-list", (req, res) => {
  const { skip, limit } = req.body;

  Post.find()
    .sort({ createdAt: -1 }) // 내림차순 정렬
    .limit(limit) // 4개만
    .skip(skip)
    .populate("writer")
    .exec((err, postInfo) => {
      if (err) return res.status(400).json({ success: false, err });

      const newPostInfo = postInfo.map((post) => {
        const duration = getTime(post.createdAt);
        return { ...post._doc, ...{ timeInterval: duration } };
      });
      // 더 이상 불러올 post가 없는 경우
      if (postInfo.length < limit) {
        return res
          .status(200)
          .json({ success: true, postInfo: newPostInfo, end: true });
      }
      return res
        .status(200)
        .json({ success: true, postInfo: newPostInfo, end: false });
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

      return res
        .status(200)
        .json({ success: true, postInfo: newPostInfo, end: false });
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

router.get("/load-tag-post-list", (req, res) => {
  const { tag } = req.query;

  Post.find({ tags: `${tag}` })
    .populate("writer")
    .exec((err, tagPostInfo) => {
      if (err) return res.status(400).json({ success: false, err });

      const newPostInfo = tagPostInfo.map((post) => {
        const duration = getTime(post.createdAt);
        return { ...post._doc, ...{ timeInterval: duration } };
      });

      return res.status(200).json({ success: true, tagPostInfo: newPostInfo });
    });
});

// post 삭제
router.delete("/delete-post", (req, res) => {
  const { postId } = req.query;

  Post.findOneAndDelete({ _id: postId }).exec((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, postId });
  });
});

module.exports = router;
