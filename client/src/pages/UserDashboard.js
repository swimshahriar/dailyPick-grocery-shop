import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tab, Tabs, Paper, Typography, Box } from '@material-ui/core';

import Header from '../components/Header/Header';
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

const UserDashboard = () => {
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
        orders = await sendRequest(
          `http://localhost:8000/api/order/userId=${shopContext.userId}`
        );

        setLoadedOrders(orders);
      };
      sendReq();
    } catch (error) {}
  }, [shopContext.userId, sendRequest]);

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
            <Tab label="Your Profile" {...a11yProps(0)} />
            <Tab label="Your Orders" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            Email: {shopContext.email}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <OrderList isAdmin={false} loadedOrders={loadedOrders} />
          </TabPanel>
        </Paper>
      </main>
    </>
  );
};

export default UserDashboard;
