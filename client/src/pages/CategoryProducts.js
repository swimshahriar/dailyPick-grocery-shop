import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Grow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SentimentDissatisfiedOutlined } from '@material-ui/icons';

import Header from '../components/Header/Header';
import ProductsListContainer from '../components/Products/ProductsListContainer';
import { useHttpClient } from '../hooks/useHttpClient';
import PaginationComponent from '../components/Pagination/PaginationComponent';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  emptyContainer: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const CategoryProducts = () => {
  const { sendRequest } = useHttpClient();
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const classes = useStyles();

  // getting the category name from the url
  const { cname } = useParams();

  useEffect(() => {
    try {
      const sendReq = async () => {
        const responseData = await sendRequest(
          `http://localhost:8000/api/product/category/${cname}`
        );

        setLoadedProducts(responseData);
      };
      sendReq();
    } catch (error) {
      console.log(error);
    }
  }, [sendRequest, cname]);

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
        {loadedProducts.length <= 0 && (
          <Grow in timeout={500}>
            <Container className={classes.emptyContainer}>
              <SentimentDissatisfiedOutlined fontSize="large" />
              <Typography variant="h4">No Products Found!</Typography>
              <SentimentDissatisfiedOutlined fontSize="large" />
            </Container>
          </Grow>
        )}
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

export default CategoryProducts;
