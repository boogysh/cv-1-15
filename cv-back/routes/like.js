const express = require('express')
const router = express.Router()


const likeCtrl = require('../controllers/like')

router.post('/', likeCtrl.createLike);  // before: auth, multer 
router.get('/', likeCtrl.getLike); 

//-------
module.exports = router