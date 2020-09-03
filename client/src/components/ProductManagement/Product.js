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
import { SettingsOutlined } from '@material-ui/icons';

import useStyles from './ProductStyles';

const Product = (props) => {
  const classes = useStyles();

  return (
    <Grow in timeout={500}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card className={classes.card}>
          <div className={classes.cardImageContainer}>
            <CardMedia
              className={classes.cardImage}
              image={
                'https://res.cloudinary.com/redq-inc/image/upload/v1589614568/pickbazar/grocery/GreenLimes_jrodle.jpg'
              }
              title="Lime"
            />
          </div>
          <CardContent>
            <div className={classes.cardContent}>
              <Typography variant="h6">Lime</Typography>
              <Typography variant="h6" color="primary">
                $1.5
              </Typography>
            </div>
            <Typography
              component="p"
              color="textSecondary"
              className={classes.qty}
            >
              x12
            </Typography>
            <Typography variant="body1" color="textSecondary">
              This is a product description. This is a product description.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              startIcon={<SettingsOutlined />}
              variant="outlined"
              color="primary"
              fullWidth
            >
              Manage
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grow>
  );
};

export default Product;
