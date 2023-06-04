const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review_controller');

router.get('/assign-review', reviewController.assignReview)

module.exports = router;