/**
 * Products Route
 * @module ordersRoute
 */

const express = require('express');
const { body } = require('express-validator');

const ordersController = require('../controllers/ordersController');

const router = express.Router();

router.get('/', ordersController.getOrders);
router.get('/:oid', ordersController.getOrderById);

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
router.patch('/:oid', ordersController.updateOrderStatus);
router.patch('/cancel/:oid', ordersController.cancelOrder);
router.delete('/:oid', ordersController.deleteOrder);

// export
module.exports = router;
