import React, { createContext, useReducer } from 'react';
import {
  cartReducer,
  AddItemToCart,
  RemoveItemFromCart,
  ReduceItemQtyFromCart,
  ClearCart,
} from './cartReducers';
import { authReducer, Login, Logout } from './authReducers';

export const ShopContext = createContext({
  token: null,
  userId: null,
  login: (userId, token) => {},
  logout: (state) => {},
  cart: [],
  totalPrice: 0,
  addItemToCart: (product) => {},
  reduceItemQtyFromCart: (productId) => {},
  removeItemFromCart: (productId) => {},
  clearCart: () => {},
});

const ShopContextProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });
  const [authState, dispatchAuth] = useReducer(authReducer, {
    token: null,
    userId: null,
  });

  // login
  const login = (userId, token) => {
    // @ts-ignore
    dispatchAuth({ type: Login, userId, token });
  };

  // logout
  const logout = (authState) => {
    // @ts-ignore
    dispatchAuth({ type: Logout });
  };

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
        // @ts-ignore
        token: authState.token,
        // @ts-ignore
        userId: authState.userId,
        login,
        logout,
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
