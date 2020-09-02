/**
 * Product Schema
 * @module productsModel
 */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/**
 * @constructor productSchema
 * @property {String} title - title of the product
 * @property {String} imageUrl - url of the product image
 * @property {String} description - description of the product
 * @property {Number} price - price of the product
 * @property {String} category - category name of the product
 * @property {Boolean} isArchive - is product archive?
 */
const productSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true, minlength: 10 },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  isArchive: { type: Boolean, default: false },
});

productSchema.plugin(uniqueValidator);

// Export Product Model
module.exports = mongoose.model('Product', productSchema);
