const MESSAGE = require("../models/message");

exports.createMessage = (req, res) => {
  const { firstName, lastName, email, messageTxt} = req.body;
  const message = new  MESSAGE({ firstName, lastName, email, messageTxt });
  message
    .save()
    .then((message) => res.status(200).json(message))
    .catch((error) => handleError(res, error));
};
exports.getMessage = (req, res, next) => {
  MESSAGE.find()
    .sort({ createdAt: -1 })
    // .sort({ clientInfo: req.clientInfo })

    .then((messages) => res.status(200).json(messages))
    .catch((error) => res.status(400).json({ error }));
};