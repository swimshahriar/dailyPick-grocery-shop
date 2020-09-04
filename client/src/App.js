import React from 'react';
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

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
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
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
