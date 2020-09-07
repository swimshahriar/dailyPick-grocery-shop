import React, { createContext, useReducer } from 'react';
import {
  cartReducer,
  AddItemToCart,
  RemoveItemFromCart,
  ReduceItemQtyFromCart,
  ClearCart,
} from './reducers';

export const ShopContext = createContext({
  cart: [],
  totalPrice: 0,
  addItemToCart: (product) => {},
  reduceItemQtyFromCart: (productId) => {},
  removeItemFromCart: (productId) => {},
  clearCart: () => {},
});

const ShopContextProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  const addItemToCart = (product) => {
    // @ts-ignore
    dispatch({ type: AddItemToCart, product });
  };

  const reduceItemQtyFromCart = (productId) => {
    // @ts-ignore
    dispatch({ type: ReduceItemQtyFromCart, productId });
  };

  const removeItemFromCart = (productId) => {
    // @ts-ignore
    dispatch({ type: RemoveItemFromCart, productId });
  };

  const clearCart = () => {
    // @ts-ignore
    dispatch({ type: ClearCart });
  };

  return (
    <ShopContext.Provider
      value={{
        cart: state.cart,
        totalPrice: state.totalPrice || 0,
        addItemToCart,
        reduceItemQtyFromCart,
        removeItemFromCart,
        clearCart,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
