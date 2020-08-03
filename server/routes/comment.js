const express = require("express");
const router = express.Router();
const Comment = require("../model/Comment");

router.post("/save-comment", (req, res) => {
  const { writer, contents, postId, responseTo } = req.body;

  const comment = new Comment({ writer, contents, postId, responseTo });

  comment.save((err, comment) => {
    if (err) return res.status(400).json({ success: false, err });

    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((err, commentInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, commentInfo, postId });
      });
  });
});

router.post("/load-comment", (req, res) => {
  const { postId } = req.body;

  Comment.find({ postId })
    .sort({ createdAt: -1 }) // 내림차순 정렬
    .populate("writer")
    .exec((err, comment) => {
      if (err) return res.status(400).json({ success: false, err });

      return res.status(200).json({ success: true, comment, postId });
    });
});

router.delete("/delete-comment", (req, res) => {
  const { data } = req.body;
  Comment.findOneAndDelete({ _id: data._id }).exec((err, comment) => {
    if (err) return res.status(400).json({ success: false, err });
    return res
      .status(200)
      .json({ success: true, commentId: comment._id, postId: data.postId });
  });
});

module.exports = router;
