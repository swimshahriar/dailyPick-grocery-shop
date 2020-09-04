import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Product from './Product';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  gridContainer: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    marginTop: 40,
  },
}));

const ProductsListContainer = ({ products }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.gridContainer}>
      {products.map((item) => (
        <Product key={item._id} product={item} />
      ))}
    </Grid>
  );
};

export default ProductsListContainer;
