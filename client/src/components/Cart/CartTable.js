import React, { useContext, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Clear as ClearIcon,
  ArrowBackOutlined,
  NavigateNextOutlined,
  ShoppingCart,
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import { ShopContext } from '../../context/shopContext';
import useStyles from './CartTableStyles';

const CartTable = () => {
  const [deliveryCharge, setDeliveryCharge] = useState(15);
  const shopContext = useContext(ShopContext);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (+shopContext.totalPrice >= 50) {
      setDeliveryCharge(10);
    } else {
      setDeliveryCharge(15);
    }
  }, [shopContext.totalPrice]);

  if (shopContext.cart.length <= 0) {
    return (
      <div className={classes.emptyContainer}>
        <ShoppingCart className={classes.shoppingCartIcon} />
        <Typography variant="h6">Empty Cart!</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push('/')}
        >
          Add Some Products
        </Button>
      </div>
    );
  }
  return (
    <div>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Clear</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Products</TableCell>
              <TableCell align="center">Qty.</TableCell>
              <TableCell align="center">Unit</TableCell>
              <TableCell align="center">Sum</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shopContext.cart.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.title}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => shopContext.reduceItemQtyFromCart(item._id)}
                  >
                    <RemoveIcon color="error" />
                  </IconButton>
                  {item.qty} x {item.unitQty}
                  <IconButton onClick={() => shopContext.addItemToCart(item)}>
                    <AddIcon color="primary" />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  ${item.offerPrice === 0 ? item.price : item.offerPrice}
                </TableCell>
                <TableCell align="center">${item.total}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => shopContext.removeItemFromCart(item._id)}
                  >
                    <ClearIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">${shopContext.totalPrice}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                Delivery Charge{' '}
                {shopContext.totalPrice < 50 && (
                  <Typography color="primary">
                    add ${(50 - shopContext.totalPrice).toFixed(2)} to save $5
                  </Typography>
                )}
              </TableCell>

              <TableCell align="right">${deliveryCharge.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">
                ${(deliveryCharge + shopContext.totalPrice).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.cartBottomBtn}>
        <Button
          startIcon={<ClearIcon />}
          variant="outlined"
          className={classes.clearBtn}
          onClick={() => shopContext.clearCart()}
        >
          Clear Cart
        </Button>
        <div className={classes.navigateBtn}>
          <Button
            startIcon={<ArrowBackOutlined />}
            color="primary"
            variant="outlined"
            onClick={() => history.push('/')}
          >
            Products
          </Button>
          <Button
            endIcon={<NavigateNextOutlined />}
            color="primary"
            variant="contained"
            className={classes.nextBtn}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTable;
