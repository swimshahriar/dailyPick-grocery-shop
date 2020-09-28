import React, { useState, useEffect } from 'react';
import { LocalOfferOutlined } from '@material-ui/icons';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header/Header';
import Carousel from '../components/Carousel/Carousel';
import ProductsListContainer from '../components/Products/ProductsListContainer';
import { useHttpClient } from '../hooks/useHttpClient';
import PaginationComponent from '../components/Pagination/PaginationComponent';
import BackdropLoader from '../components/BackdropLoader/BackdropLoader';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  offerTitle: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Home = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const classes = useStyles();

  useEffect(() => {
    try {
      const sendReq = async () => {
        const responseData = await sendRequest(
          'https://dailypick.herokuapp.com/api/product/offer'
        );

        setLoadedProducts(responseData);
      };
      sendReq();
    } catch (error) {}
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
        <BackdropLoader isLoading={isLoading} />
        <Carousel />
        <Container className={classes.offerTitle}>
          <LocalOfferOutlined fontSize="large" />
          <Typography variant="h4" color="textPrimary">
            Current Offers
          </Typography>
        </Container>
        {loadedProducts.length > 0 && (
          <>
            <ProductsListContainer products={currentProducts} />
            <PaginationComponent
              totalProducts={loadedProducts.length}
              productsPerPage={productsPerPage}
              setCurrentPage={setCurrentPage}
              page={currentPage}
            />
          </>
        )}
      </main>
    </>
  );
};

export default Home;
