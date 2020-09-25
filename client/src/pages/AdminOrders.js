import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tab, Tabs, Paper, Typography, Box } from '@material-ui/core';

import Header from '../components/AdminHeader/Header';
import OrderList from '../components/OrderList/OrderList';
import { useHttpClient } from '../hooks/useHttpClient';
import { ShopContext } from '../context/shopContext';
import BackdropLoader from '../components/BackdropLoader/BackdropLoader';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    flexGrow: 1,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AdminOrders = () => {
  const shopContext = useContext(ShopContext);
  const classes = useStyles();
  const { sendRequest, isLoading } = useHttpClient();
  const [value, setValue] = useState(0);
  const [loadedOrders, setLoadedOrders] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // fetching orders
  useEffect(() => {
    let orders;
    try {
      const sendReq = async () => {
        orders = await sendRequest(`https://dailypick.herokuapp.com/api/order/`);

        setLoadedOrders(orders);
      };
      sendReq();
    } catch (error) {}
  }, [shopContext.userId, sendRequest]);

  // separating each orders by status
  const pending = [];
  const confirmed = [];
  const processing = [];
  const delivered = [];
  const canceled = [];

  loadedOrders.forEach((order) => {
    if (order.status === 'Pending') {
      return pending.push(order);
    } else if (order.status === 'Confirmed') {
      return confirmed.push(order);
    } else if (order.status === 'Processing') {
      return processing.push(order);
    } else if (order.status === 'Delivered') {
      return delivered.push(order);
    } else if (order.status === 'Canceled') {
      return canceled.push(order);
    }
  });

  return (
    <>
      <Header />
      <main>
        <BackdropLoader isLoading={isLoading} />
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Pending" {...a11yProps(0)} />
            <Tab label="Confirmed" {...a11yProps(1)} />
            <Tab label="Processing" {...a11yProps(2)} />
            <Tab label="Delivered" {...a11yProps(3)} />
            <Tab label="Canceled" {...a11yProps(4)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <OrderList isAdmin={true} loadedOrders={pending} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <OrderList isAdmin={true} loadedOrders={confirmed} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <OrderList isAdmin={true} loadedOrders={processing} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <OrderList isAdmin={true} loadedOrders={delivered} />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <OrderList isAdmin={true} loadedOrders={canceled} />
          </TabPanel>
        </Paper>
      </main>
    </>
  );
};

export default AdminOrders;
