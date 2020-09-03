import React from 'react';

import Header from '../components/AdminHeader/Header';
import AddProductForm from '../components/ProductManagement/AddProductForm';

const AddProduct = () => {
  return (
    <>
      <Header />
      <main>
        <AddProductForm />
      </main>
    </>
  );
};

export default AddProduct;
