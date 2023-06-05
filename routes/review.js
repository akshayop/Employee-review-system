const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review_controller');

router.post('/create-review/:id', reviewController.createReview);

module.exports = router;
