const express = require("express");
const router = express.Router();
const Like = require("../model/Like");

// 좋아요 확인
router.post("/getLike", (req, res) => {
  const { userId, postId, commentId } = req.body;
  let variable = {};
  if (commentId) {
    variable = { userId, commentId };
  } else {
    variable = { userId, postId };
  }

  Like.find(variable).exec((err, likeInfo) => {
    if (err) return res.status(400).json({ success: false, err });
    let liked = false; // 저장 x 상태
    if (likeInfo.length !== 0) liked = true;

    return res.status(200).json({ success: true, liked });
  });
});

// 좋아요 저장
router.post("/saveLike", (req, res) => {
  const { userId, postId, commentId } = req.body;
  let variable = {};
  if (commentId) {
    variable = { userId, commentId };
  } else {
    variable = { userId, postId };
  }

  const like = new Like(variable);

  like.save((err, likeInfo) => {
    if (err) return res.status(400).json({ success: false, err });

    return res.status(200).json({ success: true, likeInfo });
  });
});

// 좋아요 취소
router.post("/unSaveLike", (req, res) => {
  const { userId, postId, commentId } = req.body;
  let variable = {};
  if (commentId) {
    variable = { userId, commentId };
  } else {
    variable = { userId, postId };
  }

  Like.findOneAndDelete(variable).exec((err, likeInfo) => {
    if (err) return res.status(400).json({ success: false, err });

    return res.status(200).json({ success: true, likeInfo });
  });
});

module.exports = router;
