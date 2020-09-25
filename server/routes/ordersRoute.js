/**
 * Products Route
 * @module ordersRoute
 */

const express = require('express');
const { body } = require('express-validator');

const ordersController = require('../controllers/ordersController');
const checkAuth = require('../middlewares/checkAuth');

const router = express.Router();

/**
 * @func router - Orders Routes
 * @property {*} get - get property
 * @property {*} use - use middlewares
 * @property {*} post - post property
 * @property {*} patch - patch property
 * @property {*} delete - delete property
 */
router.get('/', ordersController.getOrders);
router.get('/userId=:uid', ordersController.getOrderByUserId);
router.get('/orderId=:oid', ordersController.getOrderById);

// checking for auth
router.use(checkAuth);

router.post(
  '/place',
  [
    body('phoneNumber').not().isEmpty(),
    body('address').not().isEmpty(),
    body('date').not().isEmpty(),
    body('time').not().isEmpty(),
    body('deliveryCharge').not().isEmpty(),
    body('items').not().isEmpty(),
    body('subTotal').not().isEmpty(),
    body('total').not().isEmpty(),
    body('paymentMethod').not().isEmpty(),
  ],
  ordersController.placeOrder
);
router.patch('/cancel/:oid', ordersController.cancelOrder);
router.patch('/changeStatus/:oid', ordersController.updateOrderStatus);
router.delete('/:oid', ordersController.deleteOrder);

// export
module.exports = router;
