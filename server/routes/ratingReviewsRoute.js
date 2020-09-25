/**
 * Rating and Reviews Route
 * @module ratingReviewsRoute
 */

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

// ratingReviewsController import
const ratingReviewsController = require('../controllers/ratingReviewsController');
const checkAuth = require('../middlewares/checkAuth');

router.get('/:pid', ratingReviewsController.getRatingReview);

// checking for authentication
router.use(checkAuth);

router.post('/:pid', ratingReviewsController.addRatingReview);
router.delete('/:uid/:rid', ratingReviewsController.deleteRatingReview);

// exporting module
module.exports = router;
