import React, { useContext } from 'react';
import { Typography, Grow, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header/Header';
import { ShopContext } from '../context/shopContext';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  checkoutContainer: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  total: {
    color: theme.palette.primary.main,
  },
}));

const Checkout = () => {
  const classes = useStyles();
  const shopContext = useContext(ShopContext);

  return (
    <>
      <Header />
      <main>
        <Grow in timeout={500}>
          <Container className={classes.checkoutContainer}>
            <Typography variant="h4" color="textPrimary" align="center">
              Your Total:{' '}
              <span className={classes.total}>${shopContext.total}</span>
            </Typography>
            <CheckoutForm />
          </Container>
        </Grow>
      </main>
    </>
  );
};

export default Checkout;
