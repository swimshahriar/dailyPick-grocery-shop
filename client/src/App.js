// @ts-nocheck
import React, { useContext } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';

import Home from './pages/Home';
import AdminProducts from './pages/AdminProducts';
import AdminDashboard from './pages/AdminDashboard';
import AddProduct from './pages/AddProduct';
import ManageProduct from './pages/ManageProduct';
import CategoryProducts from './pages/CategoryProducts';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import { ShopContext } from './context/shopContext';

const App = () => {
  const { token, email } = useContext(ShopContext);

  let routes;
  if (token === null) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Route path="/admin" exact>
          <Auth />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
        <Route path="/category/:cname">
          <CategoryProducts />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else if (token !== null && email === 'admin@dailypick.com') {
    routes = (
      <Switch>
        <Route path="/admin" exact>
          <AdminDashboard />
        </Route>
        <Route path="/admin/products" exact>
          <AdminProducts />
        </Route>
        <Route path="/admin/products/add" exact>
          <AddProduct />
        </Route>
        <Route path="/admin/products/manage/:pid">
          <ManageProduct />
        </Route>

        <Redirect to="/admin" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
        <Route path="/category/:cname">
          <CategoryProducts />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return <Router>{routes}</Router>;
};

export default App;
