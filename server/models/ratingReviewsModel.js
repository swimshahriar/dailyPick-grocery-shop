const { mongo } = require('mongoose');
/**
 * Rating Review Schema
 * @module ratingReviewsModel
 */
const mongoose = require('mongoose');

/**
 * @constructor ratingReviewsModel
 * @property {Number} rating - rating of the product
 * @property {String} review - review of the product
 * @property {ObjectId} userId - rating/reviewer id
 * @property {ObjectId} productId - productId
 */

const ratingReviewsModel = new mongoose.Schema({
  rating: { type: Number, required: true },
  review: { type: String },
  userId: { type: mongoose.Types.ObjectId, required: true },
  productId: { type: mongoose.Types.ObjectId, required: true },
});

// export model
module.exports = mongoose.model('RatingReview', ratingReviewsModel);
