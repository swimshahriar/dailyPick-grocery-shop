import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Product from './Product';

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

  return (
    <section className={classes.container}>
      <Grid container spacing={2}>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </Grid>
    </section>
  );
};

export default ProductsListContainer;
