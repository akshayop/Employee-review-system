const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller'); //importing homecontroller from controller

console.log('router loaded');

router.get('/', homeController.home);

// exporting router
module.exports = router;