/**
 * Products Route Module
 * @module productsRoute
 */

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const productsController = require('../controllers/productsController');
const checkAuth = require('../middlewares/checkAuth');

/**
 * @func router - Products Routes
 * @property {*} get - get property
 * @property {*} use - use middlewares
 * @property {*} post - post property
 * @property {*} patch - patch property
 * @property {*} delete - delete property
 */
router.get('/archive/all', productsController.getProductByArchive);
router.get('/offer', productsController.getProductByOffer);
router.get('/', productsController.getProducts);
router.get('/:pid', productsController.getProductById);
router.get('/category/:cname', productsController.getProductByCategory);
router.get('/search/:cname/q=:text', productsController.getProductBySearchText);

// checking for authorization
router.use(checkAuth);

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
