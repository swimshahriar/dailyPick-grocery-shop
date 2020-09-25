/**
 * User Schema
 * @module usersModel
 */

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/**
 * @constructor userSchema
 * @property {String} fName - first name of the user
 * @property {String} lName - last name of the user
 * @property {String} email - email of the product
 * @property {String} password - password of the user
 */
const userSchema = new mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
});

// plugin
userSchema.plugin(uniqueValidator);

// userSchema export
module.exports = mongoose.model('User', userSchema);
