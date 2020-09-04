/**
 * Products Route Module
 * @module productsRoute
 */

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const productsController = require('../controllers/productsController');

// Products Routes
router.get('/', productsController.getProducts);
router.get('/:pid', productsController.getProductById);
router.post(
  '/add',
  body('title').not().isEmpty(),
  body('imageUrl').isURL(),
  body('description').isLength({ min: 10 }),
  body('category').not().isEmpty(),
  body('price').not().isEmpty().isNumeric(),
  body('unitQty').not().isEmpty(),
  productsController.addProduct
);
router.patch(
  '/update/:pid',
  body('title').not().isEmpty(),
  body('imageUrl').isURL(),
  body('description').isLength({ min: 10 }),
  body('category').not().isEmpty(),
  body('price').not().isEmpty().isNumeric(),
  body('unitQty').not().isEmpty(),
  body('isArchive').not().isEmpty(),
  productsController.updateProduct
);
router.delete('/delete/:pid', productsController.deleteProduct);

// Export Routes
module.exports = router;
