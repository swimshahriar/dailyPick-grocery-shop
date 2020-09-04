import React, { useState, useEffect } from 'react';

import Header from '../components/Header/Header';
import Carousel from '../components/Carousel/Carousel';
import ProductsListContainer from '../components/Products/ProductsListContainer';
import { useHttpClient } from '../hooks/useHttpClient';
import PaginationComponent from '../components/Pagination/PaginationComponent';

const Home = () => {
  const { sendRequest } = useHttpClient();
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  useEffect(() => {
    try {
      const sendReq = async () => {
        const responseData = await sendRequest(
          'http://localhost:8000/api/product/'
        );

        setLoadedProducts(responseData);
      };
      sendReq();
    } catch (error) {
      console.log(error);
    }
  }, [sendRequest]);

  // Pagination helper
  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPage = indexOfLastPost - productsPerPage;
  const currentProducts = loadedProducts.slice(
    indexOfFirstPage,
    indexOfLastPost
  );

  return (
    <>
      <Header />
      <main>
        <Carousel />
        <ProductsListContainer products={currentProducts} />
        <PaginationComponent
          totalProducts={loadedProducts.length}
          productsPerPage={productsPerPage}
          setCurrentPage={setCurrentPage}
          page={currentPage}
        />
      </main>
    </>
  );
};

export default Home;
