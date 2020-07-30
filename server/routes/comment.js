const express = require("express");
const router = express.Router();
const Comment = require("../model/Comment");

router.post("/saveComment", (req, res) => {
  const { writer, contents, postId, responseTo } = req.body;

  const comment = new Comment({ writer, contents, postId, responseTo });

  comment.save((err, comment) => {
    if (err) return res.status(400).json({ success: false, err });

    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((err, commentInfo) => {
        if (err) return res.status(400).json({ success: false, err });

        return res.status(200).json({ success: true, commentInfo });
      });
  });
});

router.post("/getComment", (req, res) => {
  const { postId } = req.body;

  Comment.find({ postId })
    .populate("writer")
    .exec((err, comment) => {
      if (err) return res.status(400).json({ success: false, err });

      return res.status(200).json({ success: true, comment });
    });
});

module.exports = router;
