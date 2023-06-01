const mongoose = require("mongoose");
//const { stringify } = require("uuid");

const opts = {
  timestamps: { currentTime: () => Date.now() + 1 * 60 * 60 * 1000 },
};
const commentSchema = mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    commentTxt: { type: String },
    project: { type: String },
  },
  opts //   { timestamps: true }
);
module.exports = mongoose.model("COMMENT", commentSchema);
