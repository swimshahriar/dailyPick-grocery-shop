/**
 * Products Controller Module
 * @module productsController
 */

const { validationResult } = require('express-validator');

const Product = require('../models/productsModel');

/**
 * Get All Products
 * @function getProducts
 * @param {*} req - Incoming requests
 * @param {*} res - Outgoing responses
 * @param {*} next - Go to the next line
 */
// @ts-ignore
const getProducts = async (req, res, next) => {
  /**
   * @property {string} products
   */
  let products;
  try {
    products = await Product.find();
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.status(200).json(products);
};

/**
 * Get Product by Id
 * @function getProductById
 * @param {*} req - Incoming requests
 * @param {*} res - Outgoing responses
 * @param {*} next - Go to the next line
 */
const getProductById = async (req, res, next) => {
  const { pid } = req.params;

  /**
   * @property {string} products
   */
  let product;
  try {
    product = await Product.findById(pid);
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.status(200).json(product);
};

/**
 * Add Products
 * @function addProduct
 * @param {*} req - Incoming requests
 * @param {*} res - Outgoing responses
 * @param {*} next - Go to the next line
 */
const addProduct = async (req, res, next) => {
  const { title, imageUrl, description, price, category, unitQty } = req.body;

  /**
   * @property {string} errors
   */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
  }

  const createdProduct = new Product({
    title,
    description,
    imageUrl,
    price,
    category,
    unitQty,
  });

  try {
    await createdProduct.save();
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.status(201).json(createdProduct);
};

/**
 * update Product
 * @function updateProduct
 * @param {*} req - Incoming requests
 * @param {*} res - Outgoing responses
 * @param {*} next - Go to the next line
 */
const updateProduct = async (req, res, next) => {
  const {
    title,
    description,
    price,
    category,
    imageUrl,
    unitQty,
    isArchive,
  } = req.body;
  const { pid } = req.params;

  /**
   * @property {string} errors
   */
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
  }

  /**
   * @property {string} existingProduct
   */
  let existingProduct;
  try {
    existingProduct = await Product.findById(pid);
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  if (!existingProduct) {
    const error = new Error('No Product Found!');
    return next(error);
  }

  // @ts-ignore
  existingProduct.title = title;
  // @ts-ignore
  existingProduct.category = category;
  // @ts-ignore
  existingProduct.imageUrl = imageUrl;
  // @ts-ignore
  existingProduct.description = description;
  // @ts-ignore
  existingProduct.price = price;
  // @ts-ignore
  existingProduct.unitQty = unitQty;
  // @ts-ignore
  existingProduct.isArchive = isArchive;

  let updatedProduct;
  try {
    updatedProduct = await existingProduct.save();
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.status(200).json(updatedProduct);
};

/**
 * Delete Product
 * @function deleteProduct
 * @param {*} req - Incoming requests
 * @param {*} res - Outgoing responses
 * @param {*} next - Go to the next line
 */
const deleteProduct = async (req, res, next) => {
  const { pid } = req.params;

  try {
    await Product.findOneAndDelete({ _id: pid });
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.status(200).json('Product Deleted!');
};

// Export functions
exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.addProduct = addProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
