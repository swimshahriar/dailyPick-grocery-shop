/**
 * Orders Model
 * @module ordersModel
 */

const mongoose = require('mongoose');

/**
 * @constructor orderSchema
 * @property {Array} items - list of items
 * @property {Number} subTotal - sub total price of the items
 * @property {Number} deliveryCharge - delivery charge
 * @property {Number} total - total price after adding delivery charge
 * @property {String} userId - id of the user
 * @property {String} address - address of the delivery
 * @property {String} phoneNumber - phone number of the user
 * @property {String} email - email of the user
 * @property {Object} deliveryTime - contains the delivery time and date
 * @property {Object} payment - contains payment method and paid status
 * @property {String} status - order process status
 * @property {Date} orderDate - order placed time
 */
const orderSchema = new mongoose.Schema({
  items: { type: Array, required: true },
  subTotal: { type: Number, required: true },
  deliveryCharge: { type: Number, required: true },
  total: { type: Number, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true },
  userName: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  deliveryTime: {
    time: { type: String, required: true },
    date: { type: Date, required: true },
  },
  payment: {
    paymentMethod: { type: String, required: true },
    paid: { type: Boolean, default: false },
  },
  status: { type: String, default: 'Pending' },
  orderDate: { type: Date, required: true },
});

// export
module.exports = mongoose.model('Order', orderSchema);
