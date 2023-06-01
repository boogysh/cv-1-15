const mongoose = require("mongoose");
//const { stringify } = require("uuid");

const opts = {
  timestamps: { currentTime: () => Date.now() + 1 * 60 * 60 * 1000 },
};
const likeSchema = mongoose.Schema(
  {
    project: { type: String },
    ipList: { type: [String] },
    //  ipList: [{ ip: {type: String }, _id:false }],
    
    likes: { type: Number },
  },
  opts //   { timestamps: true }
);
module.exports = mongoose.model("LIKE", likeSchema);
