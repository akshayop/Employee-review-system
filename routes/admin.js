const express = require('express'); //require express
const router = express.Router(); //making router
const adminController = require('../controllers/admin_controller'); //requiring admin controller file, to call the function whn required

router.get('/admin-dashboard', adminController.adminDashboard); //It will show the deatils of the employeee
router.get('/add-employee',  adminController.addEmployee) //this will help to add new employees
router.post('/create-employee', adminController.createEmployee); // this will create a new employee
router.get('/edit-employee/:id', adminController.editEmployee); //this will help to edit details of the employee 
router.post('/update-employee/:id', adminController.updateEmployee);  //it will update any changes made by admin
router.get('/assign-review', adminController.assignReview); //it will asign the work to the employee
router.post('/add-review/:id', adminController.addReview); //it will help to add reviews
router.get('/delete-employee/:id', adminController.deleteEmployee);

module.exports = router;