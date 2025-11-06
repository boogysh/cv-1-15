const express = require("express");
const router = express.Router();

const likeCtrl = require("../controllers/rating");

router.post("/", likeCtrl.createRating); // before: auth, multer
router.get("/", likeCtrl.getRating);

//-------
module.exports = router;
