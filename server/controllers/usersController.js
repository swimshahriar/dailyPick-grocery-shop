/**
 * User Controller Module
 * @module usersController
 */

const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/usersModel');

/**
 * Register an user
 * @function registerUser
 * @param {*} req - Incoming requests
 * @param {*} res - Outgoing responses
 * @param {*} next - Go to the next line
 */
const registerUser = async (req, res, next) => {
  const { fName, lName, email, password } = req.body;
  console.log(fName, lName, email, password);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
  }

  // checking, if user email already exists or not
  let existingEmail;
  try {
    existingEmail = await User.findOne({ email });
  } catch (error) {
    const err = new Error('Registration failed!');
    return next(err);
  }

  // if email exists, show error
  if (existingEmail) {
    const error = new Error('Email already exists!');
    return next(error);
  }

  // hash user password with bcrypt
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    const err = new Error('Registration failed!');
    return next(err);
  }

  // create user
  const createdUser = new User({
    fName,
    lName,
    email,
    password: hashedPassword,
  });

  // saving user data in the database
  try {
    await createdUser.save();
  } catch (error) {
    const err = new Error('Registration failed!');
    return next(err);
  }

  // creating token
  let token;
  try {
    token = jwt.sign(
      // @ts-ignore
      { userId: createdUser._id, email: createdUser.email },
      'jwt_super_secret_key',
      { expiresIn: '3h' }
    );
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.status(200).json({
    token,
    userId: createdUser._id,
  });
};

/**
 * Login an user
 * @function loginUser
 * @param {*} req - Incoming requests
 * @param {*} res - Outgoing responses
 * @param {*} next - Go to the next line
 */
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
  }

  // check for existing user
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  // if no existing user
  if (!existingUser) {
    const error = new Error('Email not found!');
    return next(error);
  }

  // if existing user check for password
  let validPassword = false;
  try {
    // @ts-ignore
    validPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  // if password is incorrect
  if (!validPassword) {
    const error = new Error('Password is incorrect!');
    return next(error);
  }

  // creating a jwt
  let token;
  try {
    token = jwt.sign(
      // @ts-ignore
      { userId: existingUser._id, email: existingUser.email },
      'jwt_super_secret_key',
      { expiresIn: '3h' }
    );
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  // if password is correct
  res.status(200).json({ userId: existingUser._id, token });
};

// export
exports.registerUser = registerUser;
exports.loginUser = loginUser;
