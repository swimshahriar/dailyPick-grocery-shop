// @ts-nocheck
import React, { createContext, useReducer, useEffect } from 'react';
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
  email: null,
  login: (userId, token, email) => {},
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
    email: null,
  });

  // login
  const login = (userId, token, email) => {
    dispatchAuth({ type: Login, userId, token, email });
  };

  // logout
  const logout = (authState) => {
    dispatchAuth({ type: Logout });
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      const { userId, token, email } = userData;
      login(userId, token, email);
    }
  }, []);

  const addItemToCart = (product) => {
    dispatch({ type: AddItemToCart, product });
  };

  const reduceItemQtyFromCart = (productId) => {
    dispatch({ type: ReduceItemQtyFromCart, productId });
  };

  const removeItemFromCart = (productId) => {
    dispatch({ type: RemoveItemFromCart, productId });
  };

  const clearCart = () => {
    dispatch({ type: ClearCart });
  };

  return (
    <ShopContext.Provider
      value={{
        token: authState.token,
        userId: authState.userId,
        email: authState.email,
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
