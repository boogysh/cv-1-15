const express = require('express')
const router = express.Router()


const messageCtrl = require('../controllers/message')

router.post('/',  messageCtrl.createMessage);  // before: auth, multer 
router.get('/',  messageCtrl.getMessage); 
router.delete('/:id',  messageCtrl.deleteOneMessage); 
// router.get('/:id', stuffCtrl.getOneComment); 

//-------
module.exports = router