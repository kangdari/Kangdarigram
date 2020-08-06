const express = require("express");
const router = express.Router();
const Comment = require("../model/Comment");
const Like = require("../model/Like");
const { getTime } = require("../utils/getTime");

router.post("/save-comment", (req, res) => {
  const { writer, contents, postId, responseTo, type } = req.body;

  const comment = new Comment({ writer, contents, postId, responseTo });

  comment.save((err, comment) => {
    if (err) return res.status(400).json({ success: false, err });

    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((err, commentInfo) => {
        if (err) return res.status(400).json({ success: false, err });

        const newComment = commentInfo.map((comment) => {
          const duration = getTime(comment.createdAt);
          return { ...comment._doc, ...{ timeInterval: duration } };
        });

        return res
          .status(200)
          .json({ success: true, commentInfo: newComment, postId, type });
      });
  });
});

router.post("/load-comment", (req, res) => {
  const { postId, type } = req.body;

  Comment.find({ postId })
    .sort({ createdAt: -1 }) // 내림차순 정렬
    // .limit(req.body.limit ? 2 : 0)
    .populate("writer")
    .exec((err, comment) => {
      if (err) return res.status(400).json({ success: false, err });

      // 작성 시간과 현재 시간 차이 계산한 키값을 추가
      const newComment = comment.map((comment) => {
        const duration = getTime(comment.createdAt);
        return { ...comment._doc, ...{ timeInterval: duration } };
      });

      return res.status(200).json({
        success: true,
        comment: newComment,
        postId,
        type,
      });
    });
});

router.delete("/delete-comment", (req, res) => {
  const { data } = req.body; // data._id: comment._id

  // 댓글과 그 댓글의 좋아요 삭제
  Comment.findOneAndDelete({ _id: data._id }).exec((err, comment) => {
    if (err) return res.status(400).json({ success: false, err });
    Like.findOneAndDelete({ commentId: data._id }).exec((err) => {
      if (err) return res.status(400).json({ success: false, err });
      return res
        .status(200)
        .json({ success: true, commentId: comment._id, postId: data.postId });
    });
  });
});

module.exports = router;
