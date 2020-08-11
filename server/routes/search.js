const express = require("express");
const router = express.Router();
const { User } = require("../model/Users");
const Post = require("../model/Post");

router.get("/nav-search/context", (req, res) => {
  const { keyword } = req.query;

  // # 해쉬태그 검색
  if (keyword[0] === "#") {
    const newKeyword = keyword.slice(1);
    // tag 검색 수행, tags array에서 검색, 공백 무시
    keyword.length > 1
      ? Post.find({ tags: { $regex: newKeyword, $options: "x" } }).exec(
          (err, searchResult) => {
            if (err) return res.status(400).json({ success: false, err });

            const tagSet = new Set();
            searchResult.forEach((post) =>
              post.tags.forEach((tag) => {
                if (tag.substr(0, newKeyword.length) === newKeyword)
                  tagSet.add(tag);
              }),
            );

            return res
              .status(200)
              .json({ success: true, searchResult: [...tagSet], type: "tag" });
          },
        )
      : res.status(200).json({ success: true, searchResult: [], type: "none" });
  } else {
    // 유저 검색
    User.find({
      // id, name 둘 중 하나라도 일치하면 검색
      $or: [{ id: { $regex: keyword } }, { name: { $regex: keyword } }],
    }).exec((err, searchResult) => {
      if (err) return res.status(400).json({ success: false, err });
      return res
        .status(200)
        .json({ success: true, searchResult, type: "user" });
    });
  }
});

module.exports = router;
