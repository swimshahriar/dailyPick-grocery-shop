import React, { useState, useContext } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import { VpnKeyOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import useStyles from './AuthFormStyles';
import { useHttpClient } from '../../hooks/useHttpClient';
import { ShopContext } from '../../context/shopContext';
import BackdropLoader from '../BackdropLoader/BackdropLoader';
import SnackbarComp from '../Snackbar/SnackbarComp';

const AuthForm = () => {
  const shopContext = useContext(ShopContext);
  const classes = useStyles();
  const history = useHistory();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  // input states
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  // register or login user
  const authSubmitHandler = async (event) => {
    event.preventDefault();
    clearError();

    let response;
    if (!isLoginMode) {
      try {
        response = await sendRequest(
          'http://localhost:8000/api/user/register',
          'POST',
          JSON.stringify({
            fName,
            lName,
            email,
            password,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
      } catch (error) {}
    } else {
      try {
        response = await sendRequest(
          'http://localhost:8000/api/user/login',
          'POST',
          JSON.stringify({
            email,
            password,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
      } catch (error) {}
    }

    if (!error) {
      // resetting states
      setFName('');
      setLName('');
      setEmail('');
      setPassword('');

      // set snackbar open
      setIsOpen(true);

      // calling login function from shop context
      shopContext.login(response.userId, response.token, response.email);

      setTimeout(() => {
        if (response.email !== 'admin@dailypick.com') {
          //redirect to the index page
          history.push('/');
        }
      }, 1700);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className={classes.authFormContainer}>
      {isLoading && <BackdropLoader isLoading={isLoading} />}

      <form autoComplete="off" onSubmit={authSubmitHandler}>
        <Card>
          <CardContent className={classes.inputFieldContainer}>
            <Typography variant="h1" color="textPrimary">
              {isLoginMode ? 'Login' : 'Register'}
            </Typography>
            {error && (
              <Typography component="p" color="error">
                {error}
              </Typography>
            )}
            {!isLoginMode && (
              <>
                <TextField
                  required
                  id="fName"
                  label="First Name"
                  variant="filled"
                  className={classes.inputField}
                  value={fName}
                  onChange={(event) => setFName(event.target.value)}
                />
                <TextField
                  required
                  id="lName"
                  label="Last Name"
                  variant="filled"
                  className={classes.inputField}
                  value={lName}
                  onChange={(event) => setLName(event.target.value)}
                />
              </>
            )}

            <TextField
              required
              id="email"
              label="Email"
              type="email"
              variant="filled"
              className={classes.inputField}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              required
              id="password"
              label="Password"
              type="password"
              variant="filled"
              className={classes.inputField}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              startIcon={<VpnKeyOutlined />}
              variant="contained"
              color="primary"
              type="submit"
              className={classes.submitBtn}
            >
              {!isLoginMode ? 'Register' : 'Login'}
            </Button>
            <Button
              startIcon={<VpnKeyOutlined />}
              variant="outlined"
              color="primary"
              className={classes.submitBtn}
              onClick={() => setIsLoginMode(!isLoginMode)}
            >
              {isLoginMode ? 'Register' : 'Login'} instead
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
    </div>
  );
};

export default AuthForm;
