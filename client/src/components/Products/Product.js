import React from 'react';
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

import useStyles from './ProductStyles';

const Product = ({ product }) => {
  const classes = useStyles();

  return (
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
            <Typography component="p" color="primary" className={classes.qty}>
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
            >
              Add To Cart
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grow>
  );
};

export default Product;
