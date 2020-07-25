const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema(
  {
    // 작성 유저
    writer: {
      // User 모델의 모든 정보를 불러옴
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    // 내용
    contents: {
      type: String,
      maxlength: 80,
    },
    // 파일
    files: {
      type: Array,
      default: [],
    },
    // 태그
    tags: {
      type: Array,
      default: [],
    },
    // 작성 날짜
    publishedDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
