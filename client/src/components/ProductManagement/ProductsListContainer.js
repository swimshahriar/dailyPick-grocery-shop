import React, { useState } from 'react';
import { Grid, Grow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Product from './Product';
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

const ProductsListContainer = ({ loadedProducts }) => {
  const classes = useStyles();

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  // Pagination helper
  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPage = indexOfLastPost - productsPerPage;
  const currentProducts = loadedProducts.slice(
    indexOfFirstPage,
    indexOfLastPost
  );

  return (
    <section className={classes.container}>
      {loadedProducts.length <= 0 ? (
        <Grow in timeout={500}>
          <Typography variant="h4" color="textPrimary" align="center">
            No Products Found!
          </Typography>
        </Grow>
      ) : (
        <>
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
        </>
      )}
    </section>
  );
};

export default ProductsListContainer;
