import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  NavigateNext,
  LocalOfferOutlined,
  ExitToAppOutlined,
  DashboardOutlined,
  ShoppingBasketOutlined,
  ReceiptOutlined,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  img: {
    height: 25,
    width: 25,
  },
}));

const otherDirectiory = [
  {
    name: 'Help',
    icon: <LocalOfferOutlined />,
  },
  {
    name: 'Logout',
    icon: <ExitToAppOutlined />,
  },
];

const category = [
  {
    name: 'Dashboard',
    icon: <DashboardOutlined />,
    url: '/admin',
  },
  {
    name: 'Products',
    icon: <ShoppingBasketOutlined />,
    url: '/admin/products',
  },
  {
    name: 'Orders',
    icon: <ReceiptOutlined />,
    url: '/admin/orders',
  },
];

const DrawerItems = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {category.map((item) => (
          <Link to={item.url} key={item.name}>
            <ListItem button key={item.name}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
              <NavigateNext />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {otherDirectiory.map((item) => (
          <ListItem button key={item.name}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
            <NavigateNext />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DrawerItems;
