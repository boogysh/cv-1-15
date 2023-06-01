const express = require('express')
const router = express.Router()


const commentCtrl = require('../controllers/comment')

router.post('/', commentCtrl.createComment);  // before: auth, multer 
router.get('/', commentCtrl.getComment); 
// router.get('/:id', stuffCtrl.getOneComment); 

//-------
module.exports = router