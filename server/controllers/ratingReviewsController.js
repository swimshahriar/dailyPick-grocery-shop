// @ts-nocheck
/**
 * Rating Reviews Controller
 * @module ratingReviewsController
 */

const { validationResult } = require('express-validator');

const RatingReview = require('../models/ratingReviewsModel');
const User = require('../models/usersModel');

/**
 * get rating reviews
 * @function addRatingReview
 * @param {*} req - Incoming requests
 * @param {*} res - Outgoing responses
 * @param {*} next - Go to the next line
 */
const getRatingReview = async (req, res, next) => {
  const { pid } = req.params;

  let ratingReview;
  try {
    ratingReview = await RatingReview.find({ productId: pid });
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  if (!ratingReview) {
    res.json('No ratings or reviews');
  }

  // calculating rating
  let totalRating = 0;
  ratingReview.map((item) => (totalRating += item.rating));
  const rating = totalRating / ratingReview.length;

  res.json({ ratingReview: [...ratingReview], ratingPoint: rating.toFixed(2) });
};

/**
 * add a rating review
 * @function addRatingReview
 * @param {*} req - Incoming requests
 * @param {*} res - Outgoing responses
 * @param {*} next - Go to the next line
 */
const addRatingReview = async (req, res, next) => {
  const productId = req.params.pid;
  const userId = req.userData.userId;
  const { rating, review } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ error: errors.array() });
  }

  let userInfo;
  try {
    userInfo = await User.findOne({ _id: userId });
  } catch (error) {
    const err = new Error('User not found!');
    return next(err);
  }

  // creating rating/review
  const createdRatingReviews = new RatingReview({
    rating,
    review,
    userId,
    userName: userInfo.fName + ' ' + userInfo.lName,
    productId,
  });

  let ratingReview;
  try {
    ratingReview = await createdRatingReviews.save();
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.json(ratingReview);
};

/**
 * delete a rating review
 * @function deleteRatingReview
 * @param {*} req - Incoming requests
 * @param {*} res - Outgoing responses
 * @param {*} next - Go to the next line
 */
const deleteRatingReview = async (req, res, next) => {
  const { rid, uid } = req.params;

  let isUserGaveRating;
  try {
    isUserGaveRating = await RatingReview.findOne({ _id: rid, userId: uid });
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  if (!isUserGaveRating) {
    const err = new Error('No rating or you do not have permission!');
    return next(err);
  }

  try {
    await RatingReview.deleteOne({ _id: isUserGaveRating._id });
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.json('deleted!');
};

// module exports
exports.getRatingReview = getRatingReview;
exports.addRatingReview = addRatingReview;
exports.deleteRatingReview = deleteRatingReview;
