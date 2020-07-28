const express = require("express");
const router = express.Router();
const Save = require("../model/Save");

// post save 상태 확인
router.post("/check", (req, res) => {
  const { userId, postId } = req.body;

  Save.find({ userId, postId }).exec((err, saveInfo) => {
    if (err) return res.status(400).json({ success: false, err });
    let saved = false; // 저장 x 상태
    if (saveInfo.length !== 0) saved = true; // 저장 o 상태

    return res.status(200).json({ success: true, saved });
  });
});

// post 저장
router.post("/saved", (req, res) => {
  const { userId, postId } = req.body;
  const save = new Save({ userId, postId });

  save.save((err, doc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({ success: true, doc });
  });
});

// post 저장 취소
router.post("/unsaved", (req, res) => {
  const { userId, postId } = req.body;
  // DB에서 userId, postId로 찾아서 삭제
  Save.findOneAndDelete({ userId, postId }).exec((err, doc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({ success: true, doc });
  });
});

module.exports = router;
