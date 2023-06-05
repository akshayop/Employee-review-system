const express = require('express'); //require express
const router = express.Router(); //making router
const adminController = require('../controllers/admin_controller'); //requiring admin controller file, to call the function whn required
const passport = require('passport'); //requiring passport, for checking the authorization

router.get('/admin-dashboard', adminController.adminDashboard); //It will show the deatils of the employeee
router.get('/add-employee', passport.checkAuthentication, adminController.addEmployee) //this will help to add new employees
router.post('/create-employee', passport.checkAuthentication, adminController.createEmployee); // this will create a new employee
router.get('/edit-employee/:id', passport.checkAuthentication, adminController.editEmployee); //this will help to edit details of the employee 
router.post('/update-employee/:id', passport.checkAuthentication,  adminController.updateEmployee);  //it will update any changes made by admin
router.get('/assign-review/:id', passport.checkAuthentication, adminController.assignReview); //it will asign the work to the employee
router.post('/add-review/:id', passport.checkAuthentication, adminController.addReview); //it will help to add reviews
router.get('/delete-employee/:id', passport.checkAuthentication, adminController.deleteEmployee);

module.exports = router;