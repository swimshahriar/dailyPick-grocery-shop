import React from 'react';
import {
  Grow,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import useStyles from './OrderListStyles';

const OrderList = ({ loadedOrders }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Grow in timeout={500}>
      <Grid container spacing={2}>
        {loadedOrders.length <= 0 && (
          <Typography variant="h4" align="center">
            No Orders Yet!
          </Typography>
        )}
        {loadedOrders.map((order) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <Card
                className={classes.card}
                onClick={() => history.push(`/order/${order._id}`)}
              >
                <CardContent>
                  <div className={classes.flex}>
                    <Typography variant="h6">Order #{order._id}</Typography>
                    <Typography variant="h6">{order.status}</Typography>
                  </div>
                  <Divider className={classes.divider} />
                  <div className={classes.flex}>
                    <Typography variant="body2" component="p">
                      Order Date:
                    </Typography>
                    <Typography variant="body2" component="p">
                      {order.orderDate}
                    </Typography>
                  </div>
                  <div className={classes.flex}>
                    <Typography variant="body2" component="p">
                      Delivery Date:
                    </Typography>
                    <Typography variant="body2" component="p">
                      {order.deliveryTime.date}
                    </Typography>
                  </div>
                  <div className={classes.flex}>
                    <Typography variant="body2" component="p">
                      Delivery Time:
                    </Typography>
                    <Typography variant="body2" component="p">
                      {order.deliveryTime.time}
                    </Typography>
                  </div>
                  <Divider className={classes.divider} />
                  <div className={classes.flex}>
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h6">${order.total}</Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Grow>
  );
};

export default OrderList;
