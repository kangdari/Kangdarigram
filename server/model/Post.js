const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    // 내용
    contents: {
      type: String,
      maxlength: 80,
    },
    // 파일
    images: {
      type: Array,
      default: [],
    },
    // 태그
    tags: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
