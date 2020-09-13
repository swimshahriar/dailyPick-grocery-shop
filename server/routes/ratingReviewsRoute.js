/**
 * Rating and Reviews Route
 * @module ratingReviewsRoute
 */

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

// ratingReviewsController import
const ratingReviewsController = require('../controllers/ratingReviewsController');

router.get('/:pid', ratingReviewsController.getRatingReview);
router.post('/', ratingReviewsController.addRatingReview);
router.delete('/:pid', ratingReviewsController.deleteRatingReview);

// exporting module
module.exports = router;
