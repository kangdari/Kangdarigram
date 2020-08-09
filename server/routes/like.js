const express = require("express");
const router = express.Router();
const Like = require("../model/Like");
const { User } = require("../model/Users");

// 댓글 좋아요 개수 체크
router.post("/get-comment-like", (req, res) => {
  const { commentId } = req.body;

  Like.find({ commentId })
    .populate("userId")
    .exec((err, likeInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, like: likeInfo, commentId });
    });
});

// 좋아요 개수 체크
router.post("/get-like-count", (req, res) => {
  const { postId } = req.body;

  Like.find({ postId })
    .populate("userId")
    .exec((err, likeInfo) => {
      if (err) return res.status(400).json({ success: false, err });

      return res
        .status(200)
        .json({ success: true, like: likeInfo, postId, type: req.body.type });
    });
});

// 좋아요 확인
router.post("/get-like-state", (req, res) => {
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
router.post("/like", (req, res) => {
  const { userId, postId, commentId, type } = req.body;
  let variable = {};
  if (commentId) {
    variable = { userId, commentId };
  } else {
    variable = { userId, postId };
  }

  const like = new Like(variable);

  User.find({ _id: userId }).exec((err, info) => {
    if (err) return res.status(400).json({ success: false, err });

    like.save((err, likeInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      const { id, name } = info[0];
      const userId = {
        id,
        name,
      };

      return res.status(200).json({
        success: true,
        likeInfo: { ...likeInfo._doc, userId }, // 좋아요를 누른 유저의 이름도 함께 응답 처리
        type,
      });
    });
  });
});

// 좋아요 취소
router.post("/unlike", (req, res) => {
  const { userId, postId, commentId, type } = req.body;
  let variable = {};
  if (commentId) {
    variable = { userId, commentId };
  } else {
    variable = { userId, postId };
  }

  Like.findOneAndDelete(variable).exec((err, likeInfo) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, likeInfo, type });
  });
});

module.exports = router;
