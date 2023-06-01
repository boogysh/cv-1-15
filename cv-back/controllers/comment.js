const COMMENT = require("../models/comment");

exports.createComment = (req, res) => {
  const { firstName, lastName, commentTxt, project } = req.body;
  const comment = new COMMENT({ firstName, lastName, commentTxt, project });
  comment
    .save()
    .then((comment) => res.status(200).json(comment))
    .catch((error) => handleError(res, error));
};
exports.getComment = (req, res, next) => {
  COMMENT.find()
    .sort({ createdAt: -1 })
    // .sort({ clientInfo: req.clientInfo })

    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error }));
};
