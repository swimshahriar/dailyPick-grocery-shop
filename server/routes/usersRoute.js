/**
 * Users Route
 * @module usersRoute
 */
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// usersController import
const usersController = require('../controllers/usersController');

router.post(
  '/register',
  [
    body('fName').not().isEmpty(),
    body('lName').not().isEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
  ],
  usersController.registerUser
);
router.post(
  '/login',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  usersController.loginUser
);

// route export
module.exports = router;
