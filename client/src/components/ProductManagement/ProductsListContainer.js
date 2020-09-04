import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Product from './Product';
import { useHttpClient } from '../../hooks/useHttpClient';
import PaginationComponent from '../Pagination/PaginationComponent';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    marginTop: 20,
  },
}));

const ProductsListContainer = () => {
  const classes = useStyles();
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
    } catch (error) {}

    return () => setLoadedProducts([]);
  }, [sendRequest]);

  // Pagination helper
  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPage = indexOfLastPost - productsPerPage;
  const currentProducts = loadedProducts.slice(
    indexOfFirstPage,
    indexOfLastPost
  );

  return (
    <section className={classes.container}>
      <Grid container spacing={2}>
        {currentProducts.map((item) => (
          <Product key={item._id} product={item} />
        ))}
      </Grid>
      <PaginationComponent
        totalProducts={loadedProducts.length}
        productsPerPage={productsPerPage}
        setCurrentPage={setCurrentPage}
        page={currentPage}
      />
    </section>
  );
};

export default ProductsListContainer;
