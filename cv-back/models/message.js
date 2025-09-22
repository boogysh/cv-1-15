const mongoose = require("mongoose");
//const { stringify } = require("uuid");

const opts = {
  timestamps: { currentTime: () => Date.now() + 1 * 60 * 60 * 1000 },
};
const messageSchema = mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    messageTxt: { type: String },
    email: { type: String },
    project: { type: String },
  },
  opts //   { timestamps: true }
);
module.exports = mongoose.model("MESSAGE", messageSchema);
