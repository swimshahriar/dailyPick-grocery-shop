import React from 'react';

import Header from '../components/Header/Header';
import Carousel from '../components/Carousel/Carousel';
import ProductsListContainer from '../components/Products/ProductsListContainer';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Carousel />
        <ProductsListContainer />
      </main>
    </>
  );
};

export default Home;
