const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller');

router.get('/admin-dashboard', adminController.adminDashboard);
router.get('/delete-employee/:id', adminController.deleteEmployee);

module.exports = router;