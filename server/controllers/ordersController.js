/**
 * Orders Controller
 * @module ordersController
 */

const { validationResult } = require('express-validator');

const Order = require('../models/ordersModel');
const User = require('../models/usersModel');

/**
 * Place Order
 * @function placeOrder
 * @param {*} req - Incoming requests
 * @param {*} res - Outgoing responses
 * @param {*} next - Go to the next line
 */
const placeOrder = async (req, res, next) => {
  const {
    phoneNumber,
    address,
    date,
    time,
    deliveryCharge,
    subTotal,
    total,
    items,
    paymentMethod,
    orderDate,
  } = req.body;
  const { userId } = req.userData;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
  }

  // getting user info
  let userInfo;
  try {
    userInfo = await User.findOne({ _id: userId });
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  // creating order
  const createdOrder = new Order({
    phoneNumber,
    address,
    deliveryTime: {
      date,
      time,
    },
    deliveryCharge,
    subTotal,
    total,
    items,
    userId,
    // @ts-ignore
    userName: userInfo.fName + ' ' + userInfo.lName,
    // @ts-ignore
    email: userInfo.email,
    payment: {
      paymentMethod,
    },
    orderDate,
  });

  try {
    await createdOrder.save();
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.status(201).json(createdOrder);
};

/**
 * Get Orders
 * @function getOrders
 * @param {*} req - Incoming requests
 * @param {*} res - Outgoing responses
 * @param {*} next - Go to the next line
 */
const getOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.find();
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.json(orders);
};

/**
 * Get Orders By Id
 * @function getOrderById
 * @param {*} req - Incoming requests
 * @param {*} res - Outgoing responses
 * @param {*} next - Go to the next line
 */
const getOrderById = async (req, res, next) => {
  const { oid } = req.params;

  let order;
  try {
    order = await Order.findById(oid);
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.json(order);
};

/**
 * Get Order by User Id
 * @function getOrderByUserId
 * @param {*} req - Incoming requests
 * @param {*} res - Outgoing responses
 * @param {*} next - Go to the next line
 */
const getOrderByUserId = async (req, res, next) => {
  const { uid } = req.params;

  let orders;
  try {
    orders = await Order.find({ userId: uid }).sort({ orderDate: -1 });
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.json(orders);
};

/**
 * Update Order Status
 * @function updateOrderStatus
 * @param {*} req - Incoming requests
 * @param {*} res - Outgoing responses
 * @param {*} next - Go to the next line
 */
const updateOrderStatus = async (req, res, next) => {
  const { oid } = req.params;
  const { status } = req.body;

  let order;
  try {
    order = await Order.findById(oid);
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  if (!order) {
    const err = new Error('Order not found!');
    return next(err);
  }

  // @ts-ignore
  order.status = status;

  let updatedOrder;
  try {
    updatedOrder = await order.save();
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.json(updatedOrder);
};

/**
 * Cancel Order
 * @function cancelOrder
 * @param {*} req - Incoming requests
 * @param {*} res - Outgoing responses
 * @param {*} next - Go to the next line
 */
const cancelOrder = async (req, res, next) => {
  const { oid } = req.params;

  let order;
  try {
    order = await Order.findById(oid);
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  if (!order) {
    const err = new Error('Order not found!');
    return next(err);
  }

  // @ts-ignore
  order.status = 'Canceled';

  let updatedOrder;
  try {
    updatedOrder = await order.save();
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.json(updatedOrder);
};

/**
 * Delete Order
 * @function deleteOrder
 * @param {*} req - Incoming requests
 * @param {*} res - Outgoing responses
 * @param {*} next - Go to the next line
 */
const deleteOrder = async (req, res, next) => {
  const { oid } = req.params;

  try {
    await Order.deleteOne({ _id: oid });
  } catch (error) {
    const err = new Error(error.message);
    return next(err);
  }

  res.json('Deleted!');
};

// export
exports.placeOrder = placeOrder;
exports.getOrders = getOrders;
exports.getOrderById = getOrderById;
exports.getOrderByUserId = getOrderByUserId;
exports.updateOrderStatus = updateOrderStatus;
exports.cancelOrder = cancelOrder;
exports.deleteOrder = deleteOrder;
