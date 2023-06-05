const express = require('express');
const router = express.Router();
const passport =  require('passport');

const commentsController = require('../controllers/comments_controller_controller')

//post to submit the form 
router.post('/create',passport.checkAuthentication,commentsController.create);
router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy);



module.exports = router;