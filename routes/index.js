const express = require('express');

const router =  express.Router();
const homeController = require('../controllers/home_controller');
console.log('router Loaded');

//access the controoller
router.get('/',homeController.home );
router.use('/users',require('./user'));

//for any further routes,access from here
// router.use('/urouterName',require(./routerfile))

module.exports = router;