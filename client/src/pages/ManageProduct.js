import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useHttpClient } from '../hooks/useHttpClient';
import BackdropLoader from '../components/BackdropLoader/BackdropLoader';
import Header from '../components/AdminHeader/Header';
import ManageProductForm from '../components/ProductManagement/ManageProductForm';

const ManageProduct = () => {
  const { pid } = useParams();
  const [loadedProduct, setLoadedProduct] = useState();
  const { sendRequest, isLoading } = useHttpClient();

  // fetching product details
  useEffect(() => {
    const sendReq = async () => {
      try {
        const response = await sendRequest(
          `https://dailypick.herokuapp.com/api/product/${pid}`
        );
        setLoadedProduct(response);
      } catch (error) {}
    };
    sendReq();
  }, [sendRequest, pid]);

  return (
    <>
      <Header />
      <main>
        {isLoading && <BackdropLoader isLoading={isLoading} />}
        {loadedProduct && <ManageProductForm loadedProduct={loadedProduct} />}
      </main>
    </>
  );
};

export default ManageProduct;
