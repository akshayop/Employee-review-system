const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee_controller'); //importing homecontroller from controller

router.get('/', employeeController.redirectPage)
router.get('/employee-dashboard/:id', employeeController.employeeDashboard); //rendering the home page
router.use('/users', require('./users')); //User routes
router.use('/admin', require('./admin')); //admin routes
router.use('/review', require('./review')); //review router


// exporting router
module.exports = router;