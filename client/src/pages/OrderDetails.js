// @ts-nocheck
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grow,
  Button,
  CardActions,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header/Header';
import AdminHeader from '../components/AdminHeader/Header';
import { useHttpClient } from '../hooks/useHttpClient';
import BackdropLoader from '../components/BackdropLoader/BackdropLoader';
import { ShopContext } from '../context/shopContext';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  card: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
  },
  inputField: {
    margin: theme.spacing(2),
    width: '80%',
  },
}));

const OrderDetails = ({ isAdmin }) => {
  const { oid } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const shopContext = useContext(ShopContext);
  const { sendRequest, isLoading, error } = useHttpClient();
  const [loadedOrder, setLoadedOrder] = useState({
    items: [],
    _id: null,
    status: '',
    orderDate: '',
    deliveryTime: {
      date: '',
      time: '',
    },
    payment: {
      paymentMethod: '',
      paid: '',
    },
    address: '',
  });
  const [orderStatus, setOrderStatus] = useState('');

  useEffect(() => {
    let loadedOrderDetails;
    try {
      const sendReq = async () => {
        loadedOrderDetails = await sendRequest(
          `https://dailypick.herokuapp.com/api/order/orderId=${oid}`
        );
        setLoadedOrder(loadedOrderDetails);
        setOrderStatus(loadedOrderDetails.status);
      };
      sendReq();
    } catch (error) {}
  }, [sendRequest, oid]);

  // handle cancel
  const handleCancel = async () => {
    try {
      await sendRequest(
        `https://dailypick.herokuapp.com/api/order/cancel/${oid}`,
        'PATCH',
        {},
        {
          authorization: `Bearer ${shopContext.token}`,
        }
      );

      if (error === null) {
        history.push(`/order/${oid}`);
      }
    } catch (error) {}
  };

  // handle order status change
  const changeOrderStatusHandler = async () => {
    try {
      await sendRequest(
        `https://dailypick.herokuapp.com/api/order/changeStatus/${oid}`,
        'PATCH',
        JSON.stringify({
          status: orderStatus,
        }),
        {
          'Content-Type': 'application/json',
          authorization: `Bearer ${shopContext.token}`,
        }
      );
    } catch (error) {}
    if (error === null) {
      history.push(`/admin/order/${oid}`);
    }
  };

  return (
    <>
      {isAdmin ? <AdminHeader /> : <Header />}
      <BackdropLoader isLoading={isLoading} />
      <main className={classes.card}>
        {loadedOrder !== {} && (
          <Grow in timeout={500}>
            <Card>
              {error && (
                <Typography component="p" color="error" align="center">
                  {error}
                </Typography>
              )}
              <CardContent>
                <div className={classes.flex}>
                  <Typography variant="h6">Order #{loadedOrder._id}</Typography>
                  <Typography variant="h6">{loadedOrder.status}</Typography>
                </div>
                <Divider />
                <div className={classes.flex}>
                  <Typography variant="body1">Order Date:</Typography>
                  <Typography variant="body1">
                    {loadedOrder.orderDate}
                  </Typography>
                </div>
                <div className={classes.flex}>
                  <Typography variant="body1">Delivery Date:</Typography>
                  <Typography variant="body1">
                    {loadedOrder.deliveryTime.date}
                  </Typography>
                </div>
                <div className={classes.flex}>
                  <Typography variant="body1">Delivery Time:</Typography>
                  <Typography variant="body1">
                    {loadedOrder.deliveryTime.time}
                  </Typography>
                </div>
                <div className={classes.flex}>
                  <Typography variant="body1">Address:</Typography>
                  <Typography variant="body1">{loadedOrder.address}</Typography>
                </div>
                <div className={classes.flex}>
                  <Typography variant="body1">Phone:</Typography>
                  <Typography variant="body1">
                    {loadedOrder.phoneNumber}
                  </Typography>
                </div>
                <Divider />
                <div className={classes.flex}>
                  <Typography variant="h6">Title</Typography>
                  <Typography variant="h6">Unit Qty x Qty</Typography>
                  <Typography variant="h6">Price</Typography>
                </div>
                {loadedOrder.items.map((item) => {
                  return (
                    <div className={classes.flex} key={item._id}>
                      <Typography variant="body1">{item.title}</Typography>
                      <Typography variant="body1">
                        {item.unitQty} x {item.qty}
                      </Typography>
                      <Typography variant="body1">${item.total}</Typography>
                    </div>
                  );
                })}
                <Divider />
                <div className={classes.flex}>
                  <Typography variant="body1">Sub Total:</Typography>
                  <Typography variant="body1">
                    ${loadedOrder.subTotal}
                  </Typography>
                </div>
                <div className={classes.flex}>
                  <Typography variant="body1">Delivery Charge:</Typography>
                  <Typography variant="body1">
                    ${loadedOrder.deliveryCharge}
                  </Typography>
                </div>
                <div className={classes.flex}>
                  <Typography variant="body1">Total:</Typography>
                  <Typography variant="body1">${loadedOrder.total}</Typography>
                </div>
              </CardContent>
              {loadedOrder.status === 'Pending' && !isAdmin && (
                <CardActions>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={handleCancel}
                  >
                    Cancel Order
                  </Button>
                </CardActions>
              )}
              {isAdmin && (
                <>
                  <FormControl variant="filled" className={classes.inputField}>
                    <InputLabel id="orderStatus">Order Status</InputLabel>
                    <Select
                      required
                      labelId="orderStatus"
                      id="orderStatus"
                      value={orderStatus}
                      onChange={(e) => setOrderStatus(e.target.value)}
                    >
                      <MenuItem value={'Pending'}>Pending</MenuItem>
                      <MenuItem value={'Confirmed'}>Confirmed</MenuItem>
                      <MenuItem value={'Processing'}>Processing</MenuItem>
                      <MenuItem value={'Delivered'}>Delivered</MenuItem>
                      <MenuItem value={'Canceled'}>Canceled</MenuItem>
                    </Select>
                  </FormControl>

                  <CardActions>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={changeOrderStatusHandler}
                    >
                      Change Order Status
                    </Button>
                  </CardActions>
                </>
              )}
            </Card>
          </Grow>
        )}
      </main>
    </>
  );
};

export default OrderDetails;
