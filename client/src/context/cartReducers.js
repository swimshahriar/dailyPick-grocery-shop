// cases for switch case
export const AddItemToCart = 'ADD_ITEM_TO_CART';
export const ReduceItemQtyFromCart = 'REDUCE_ITEM_QTY_FROM_CART';
export const RemoveItemFromCart = 'REMOVE_ITEM_FROM_CART';
export const ClearCart = 'CLEAR_CART';

// add item to cart
const addItemToCart = (product, state) => {
  let subTotal = 0;

  // previous cart products and index
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item._id === product._id
  );

  // is item new or old
  if (updatedItemIndex < 0) {
    // check for offerPrice
    if (product.offerPrice === 0) {
      updatedCart.push({ ...product, qty: 1, total: +product.price });
    } else {
      updatedCart.push({ ...product, qty: 1, total: +product.offerPrice });
    }
    updatedCart.forEach((item) => (subTotal += item.total));
  } else {
    const updatedItem = { ...updatedCart[updatedItemIndex] };

    updatedItem.qty++;
    if (updatedItem.offerPrice !== 0) {
      updatedItem.total = +(updatedItem.offerPrice * updatedItem.qty).toFixed(
        2
      );
    } else {
      updatedItem.total = +(updatedItem.price * updatedItem.qty).toFixed(2);
    }

    updatedCart[updatedItemIndex] = updatedItem;
    updatedCart.forEach((item) => (subTotal += item.total));
  }

  subTotal = +subTotal.toFixed(2);

  let deliveryCharge = 15;
  if (subTotal >= 50) {
    deliveryCharge = 10;
  }

  const total = +(subTotal + deliveryCharge).toFixed(2);

  return { ...state, cart: updatedCart, subTotal, deliveryCharge, total };
};

// reduce item qty from cart
const reduceItemQtyFromCart = (productId, state) => {
  let subTotal = 0;
  // previous cart state and index of the product
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item._id === productId
  );

  const updatedItem = { ...updatedCart[updatedItemIndex] };
  updatedItem.qty--;

  // is quantity zero, then remove product from cart
  if (updatedItem.qty <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    // check for offerPrice
    if (updatedItem.offerPrice !== 0) {
      updatedItem.total = +(updatedItem.offerPrice * updatedItem.qty).toFixed(
        2
      );
    } else {
      updatedItem.total = +(updatedItem.price * updatedItem.qty).toFixed(2);
    }

    updatedCart[updatedItemIndex] = updatedItem;
  }
  updatedCart.forEach((item) => (subTotal += item.total));
  subTotal = +subTotal.toFixed(2);

  let deliveryCharge = 15;
  if (subTotal >= 50) {
    deliveryCharge = 10;
  }

  const total = +(subTotal + deliveryCharge).toFixed(2);

  return { ...state, cart: updatedCart, subTotal, deliveryCharge, total };
};

// remove item from cart
const removeItemFromCart = (productId, state) => {
  let subTotal = 0;
  // previous cart and item index
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item._id === productId
  );

  // removing item from cart
  updatedCart.splice(updatedItemIndex, 1);

  updatedCart.forEach((item) => (subTotal += item.total));
  subTotal = +subTotal.toFixed(2);

  let deliveryCharge = 15;
  if (subTotal >= 50) {
    deliveryCharge = 10;
  }

  const total = +(subTotal + deliveryCharge).toFixed(2);

  return { ...state, cart: updatedCart, subTotal, deliveryCharge, total };
};

// clear cart
const clearCart = (state) => {
  return { ...state, cart: [], subTotal: 0, deliveryCharge: 0, total: 0 };
};

// reducer for cart
export const cartReducer = (state, action) => {
  switch (action.type) {
    case AddItemToCart:
      return addItemToCart(action.product, state);
    case ReduceItemQtyFromCart:
      return reduceItemQtyFromCart(action.productId, state);
    case RemoveItemFromCart:
      return removeItemFromCart(action.productId, state);
    case ClearCart:
      return clearCart(state);
    default:
      throw new Error('Not a valid action!');
  }
};
