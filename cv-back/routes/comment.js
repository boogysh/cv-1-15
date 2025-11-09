const express = require('express')
const router = express.Router()


const commentCtrl = require('../controllers/comment')

router.post('/', commentCtrl.createComment);  // before: auth, multer 
router.get('/', commentCtrl.getComment); 
// router.get('/:id', stuffCtrl.getOneComment); 

// Nouvelle route PUT dédiée à la mise à jour du rating
router.put("/update-rating", commentCtrl.updateComment);

//-------
module.exports = router 

// rajouter plus tard

//router.put("/update-text", commentCtrl.updateCommentText);
//router.put("/update-author", commentCtrl.updateCommentAuthor);