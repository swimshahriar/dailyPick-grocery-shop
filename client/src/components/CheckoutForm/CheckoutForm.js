import React, { useContext, useState } from 'react';
import {
  TextField,
  Card,
  CardActions,
  CardContent,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from '@material-ui/core';
import {
  ShoppingBasketOutlined,
  DoneOutlineOutlined,
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import useStyles from './CheckoutFormStyles';
import SnackbarComp from '../Snackbar/SnackbarComp';
import { ShopContext } from '../../context/shopContext';
import { useHttpClient } from '../../hooks/useHttpClient';
import BackdropLoader from '../BackdropLoader/BackdropLoader';

const CheckoutForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const shopContext = useContext(ShopContext);
  const { sendRequest, isLoading, error } = useHttpClient();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(`${new Date().toLocaleDateString()}`);
  const [time, setTime] = useState('9:00 - 9:59 am');
  const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');
  const [isOpen, setIsOpen] = useState(false);

  // creating 5 days
  const dateList = [];
  for (let i = 0; i < 3; i++) {
    const currDate = new Date();
    currDate.setDate(currDate.getDate() + i);
    dateList.push(currDate.toLocaleDateString());
  }

  // place order handler
  const placeOrderHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        'https://dailypick.herokuapp.com/api/order/place',
        'POST',
        JSON.stringify({
          phoneNumber,
          address,
          date,
          time,
          paymentMethod,
          deliveryCharge: shopContext.deliveryCharge,
          items: shopContext.cart,
          subTotal: shopContext.subTotal,
          total: shopContext.total,
          orderDate: `${new Date().toLocaleDateString()}`,
        }),
        {
          'Content-Type': 'application/json',
          authorization: `Bearer ${shopContext.token}`,
        }
      );
    } catch (error) {}

    // reseting states and redirecting
    if (!isLoading && !error) {
      setIsOpen(true);
      setPhoneNumber('');
      setAddress('');
      setDate(`${new Date().toLocaleDateString()}`);
      setTime('9:00 - 9:59 am');
      setPaymentMethod('Cash On Delivery');

      shopContext.clearCart();

      setTimeout(() => {
        setIsOpen(false);
        history.push('/user/dashboard');
      }, 1700);
    }
  };

  return (
    <>
      <form
        className={classes.form}
        autoComplete="off"
        onSubmit={placeOrderHandler}
      >
        <Card>
          <CardContent className={classes.inputFieldContainer}>
            {error && (
              <Typography component="p" color="error">
                {error}
              </Typography>
            )}
            <TextField
              required
              id="phoneNumber"
              label="PhoneNumber"
              variant="filled"
              type="String"
              className={classes.inputField}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
              required
              multiline
              rows={4}
              id="address"
              label="Address"
              variant="filled"
              className={classes.inputField}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <FormControl variant="filled" className={classes.inputField}>
              <InputLabel id="category">Date of Delivery</InputLabel>
              <Select
                required
                labelId="Date of Delivery"
                id="date"
                value={date}
                // @ts-ignore
                onChange={(e) => setDate(e.target.value)}
              >
                {dateList.map((item, index) => (
                  <MenuItem key={index} value={`${item}`}>
                    {`${item}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="filled" className={classes.inputField}>
              <InputLabel id="category">Time of Delivery</InputLabel>
              <Select
                required
                labelId="Time of Delivery"
                id="time"
                value={time}
                // @ts-ignore
                onChange={(event) => setTime(event.target.value)}
              >
                <MenuItem value={'9:00 - 9:59 am'}>9:00 - 9:59 am</MenuItem>
                <MenuItem value={'10:00 - 10:59 am'}>10:00 - 10:59 am</MenuItem>
                <MenuItem value={'11:00 - 11:59 am'}>11:00 - 11:59 am</MenuItem>
                <MenuItem value={'12:00 - 12:59 pm'}>12:00 - 12:59 pm</MenuItem>
                <MenuItem value={'03:00 - 03:59 pm'}>03:00 - 03:59 pm</MenuItem>
                <MenuItem value={'04:00 - 04:59 pm'}>04:00 - 04:59 pm</MenuItem>
                <MenuItem value={'05:00 - 05:59 pm'}>05:00 - 05:59 pm</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="filled" className={classes.inputField}>
              <InputLabel id="category">Payment Method</InputLabel>
              <Select
                required
                labelId="Payment Method"
                id="paymentMethod"
                value={paymentMethod}
                // @ts-ignore
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <MenuItem value={'Cash On Delivery'}>Cash On Delivery</MenuItem>
                <MenuItem value={'Card'}>Card</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              startIcon={<ShoppingBasketOutlined />}
              variant="outlined"
              color="primary"
              className={classes.submitBtn}
              onClick={() => history.push('/cart')}
            >
              Cart
            </Button>
            <Button
              startIcon={<DoneOutlineOutlined />}
              variant="contained"
              color="primary"
              type="submit"
              className={classes.submitBtn}
            >
              Confirm
            </Button>
          </CardActions>
        </Card>
      </form>
      <SnackbarComp
        severity="success"
        message="Operation Success!"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <BackdropLoader isLoading={isLoading} />
    </>
  );
};

export default CheckoutForm;
