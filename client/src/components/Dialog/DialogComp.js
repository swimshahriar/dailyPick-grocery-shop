import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Dialog,
  DialogTitle,
  Typography,
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Box,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../../hooks/useHttpClient';
import BackdropLoader from '../BackdropLoader/BackdropLoader';
import useStyles from './DialogCompStyles';
import { ShopContext } from '../../context/shopContext';

export function SimpleDialog(props) {
  const classes = useStyles();
  const history = useHistory();
  const shopContext = useContext(ShopContext);
  const {
    open,
    onClose,
    product,
    loadedRating,
    error,
    rating,
    ratingChangeHandler,
    review,
    reviewChangeHandler,
    ratingSubmitHandler,
    deleteRating,
  } = props;

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      scroll={'paper'}
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}>
        {product.title} ({+loadedRating.ratingPoint || 0} / 5) <br />
        <Rating
          readOnly
          precision={0.5}
          size="medium"
          name="half-rating-read"
          value={+loadedRating.ratingPoint || 0}
        />
      </DialogTitle>

      <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
        <Card>
          <CardContent className={classes.inputFieldContainer}>
            {error && (
              <Typography component="p" color="error">
                {error}
              </Typography>
            )}
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Give Rating:</Typography>
              <Rating
                precision={0.5}
                size="large"
                name="half-rating"
                value={rating}
                onChange={(event, newValue) => {
                  ratingChangeHandler(newValue);
                }}
              />
            </Box>
            <TextField
              multiline
              rows={4}
              id="review"
              label="Review"
              variant="filled"
              type="textarea"
              className={classes.inputField}
              value={review}
              onChange={reviewChangeHandler}
            />
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.submitBtn}
              onClick={
                shopContext.token
                  ? ratingSubmitHandler
                  : () => history.push('/auth')
              }
            >
              {shopContext.token ? 'Submit' : 'Login'}
            </Button>
          </CardActions>
        </Card>
      </form>
      <Container className={classes.container}>
        <Typography variant="h3">Rating and Reviews</Typography>
        {loadedRating.ratingReview.length === 0 ? (
          <Container>
            <Typography variant="h4">No Ratings or Reviews Found!</Typography>
          </Container>
        ) : (
          loadedRating.ratingReview.map((item) => {
            return (
              <Card key={item._id} className={classes.reviewContainer}>
                <div>
                  <Typography variant="h5">{item.userName}</Typography>
                  <Typography variant="h6" color="primary">
                    Rated: {item.rating}/5
                  </Typography>
                  <Rating
                    readOnly
                    precision={0.5}
                    size="medium"
                    name="half-rating-read"
                    value={item.rating}
                  />
                  {item.review !== '' && (
                    <Typography variant="h6">Review: {item.review}</Typography>
                  )}
                </div>
                {shopContext.token && shopContext.userId === item.userId && (
                  <Button
                    variant="outlined"
                    onClick={() => deleteRating(item._id)}
                  >
                    Delete
                  </Button>
                )}
              </Card>
            );
          })
        )}
      </Container>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function DialogComp({ open, setOpen, product }) {
  const { sendRequest, isLoading, error } = useHttpClient();
  const [loadedRating, setLoadedRating] = useState({
    ratingReview: [],
    ratingPoint: null,
  });
  const [rating, setRating] = useState(4.5);
  const [review, setReview] = useState('');

  const shopContext = useContext(ShopContext);

  useEffect(() => {
    try {
      const sendReq = async () => {
        const response = await sendRequest(
          `http://localhost:8000/api/rating-review/${product._id}`
        );
        setLoadedRating(response);
      };
      sendReq();
    } catch (error) {}
  }, [sendRequest, product._id]);

  const handleClose = () => {
    setOpen(false);
  };

  // rating change handler
  const ratingChangeHandler = (newValue) => {
    setRating(newValue);
  };

  // review change handler
  const reviewChangeHandler = (event) => {
    setReview(event.target.value);
  };

  // sending post req to the server
  const ratingSubmitHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:8000/api/rating-review/${product._id}`,
        'POST',
        JSON.stringify({
          rating,
          review,
        }),
        {
          'Content-Type': 'application/json',
          authorization: `Bearer ${shopContext.token}`,
        }
      );

      if (!error) {
        setRating(5);
        setReview('');
      }
      handleClose();
    } catch (error) {}
  };

  // delete Rating handler
  const deleteRating = async (rid) => {
    try {
      await sendRequest(
        `http://localhost:8000/api/rating-review/${shopContext.userId}/${rid}`,
        'DELETE',
        {},
        {
          'Content-Type': 'applicatin/json',
          authorization: `Bearer ${shopContext.token}`,
        }
      );
      handleClose();
    } catch (error) {}
  };

  return (
    <div>
      {isLoading && <BackdropLoader isLoading={isLoading} />}
      <SimpleDialog
        open={open}
        onClose={handleClose}
        // @ts-ignore
        product={product}
        loadedRating={loadedRating}
        error={error}
        rating={rating}
        review={review}
        ratingChangeHandler={ratingChangeHandler}
        reviewChangeHandler={reviewChangeHandler}
        ratingSubmitHandler={ratingSubmitHandler}
        deleteRating={deleteRating}
      />
    </div>
  );
}
