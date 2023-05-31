const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller'); //importing homecontroller from controller


router.get('/', homeController.home); //rendering the home page
router.use('/users', require('./users')); //User routes

// exporting router
module.exports = router;