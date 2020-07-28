const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saveSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true },
);

const Save = mongoose.model("Save", saveSchema);

module.exports = Save;
