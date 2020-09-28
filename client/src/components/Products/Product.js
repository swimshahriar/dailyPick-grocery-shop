import React, { useContext, useState, useEffect } from 'react';
import {
  Grid,
  Card,
  Typography,
  Grow,
  CardContent,
  CardActions,
  CardMedia,
  Button,
} from '@material-ui/core';
import { ShoppingBasketOutlined } from '@material-ui/icons';
import classNames from 'classnames';
import Rating from '@material-ui/lab/Rating';

import useStyles from './ProductStyles';
import { ShopContext } from '../../context/shopContext';
import SimpleDialogDemo from '../Dialog/DialogComp';
import { useHttpClient } from '../../hooks/useHttpClient';

const Product = ({ product }) => {
  const shopContext = useContext(ShopContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [ratingPoint, setRatingPoint] = useState(Number);

  const { sendRequest, isLoading } = useHttpClient();

  useEffect(() => {
    const sendReq = async () => {
      try {
        const { ratingPoint } = await sendRequest(
          `https://dailypick.herokuapp.com/api/rating-review/${product._id}`
        );
        if (+ratingPoint) {
          setRatingPoint(+ratingPoint);
        } else {
          setRatingPoint(0);
        }
      } catch (error) {}
    };
    sendReq();
  }, [sendRequest, product._id]);

  return (
    <>
      {open && !isLoading && (
        <SimpleDialogDemo open={open} setOpen={setOpen} product={product} />
      )}
      {!isLoading && (
        <Grow in timeout={500}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.card}>
              <div className={classes.cardImageContainer}>
                <CardMedia
                  className={classes.cardImage}
                  image={product.imageUrl}
                  title="Lime"
                />
              </div>
              <CardContent>
                <div className={classes.rating}>
                  <Rating
                    readOnly
                    precision={0.5}
                    size="medium"
                    name="half-rating-read"
                    value={ratingPoint}
                  />
                  <Typography
                    className={classes.ratingBtn}
                    variant="h6"
                    color="textSecondary"
                    onClick={() => setOpen(true)}
                  >
                    ({ratingPoint} / 5)
                  </Typography>
                </div>
                <div className={classes.cardContent}>
                  <Typography variant="h6">{product.title}</Typography>
                  <div className={classes.priceSection}>
                    <Typography
                      variant="h6"
                      color="primary"
                      className={classNames(
                        classes.prodPrice,
                        product.offerPrice && classes.offer
                      )}
                    >
                      ${product.price}
                    </Typography>
                    {product.offerPrice > 0 && (
                      <Typography
                        variant="h6"
                        color="primary"
                        className={classes.prodPrice}
                      >
                        ${product.offerPrice}
                      </Typography>
                    )}
                  </div>
                </div>
                <Typography
                  component="p"
                  color="textSecondary"
                  className={classes.qty}
                >
                  {product.unitQty}
                </Typography>
                <Typography
                  component="p"
                  color="primary"
                  className={classes.qty}
                >
                  {product.category}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<ShoppingBasketOutlined />}
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => shopContext.addItemToCart(product)}
                >
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grow>
      )}
    </>
  );
};

export default Product;
