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
  ContactSupportOutlined,
} from '@material-ui/icons';

import AppleFuit from '../../assets/category/fruit.svg';
import MeatFood from '../../assets/category/meat-food.svg';
import Snacks from '../../assets/category/snacks.svg';
import Cooking from '../../assets/category/cooking.svg';
import Dairy from '../../assets/category/dairy.svg';

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
    name: 'Offers',
    icon: <LocalOfferOutlined />,
  },
  {
    name: 'Contact',
    icon: <ContactSupportOutlined />,
  },
];

const category = [
  {
    name: 'Fruits & Vegetable',
    icon: AppleFuit,
  },
  {
    name: 'Meat & Fish',
    icon: MeatFood,
  },
  {
    name: 'Snacks',
    icon: Snacks,
  },
  {
    name: 'Dairy',
    icon: Dairy,
  },
  {
    name: 'Cooking',
    icon: Cooking,
  },
];

const DrawerItems = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.toolbar} />
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
      <Divider />
      <List>
        {category.map((item) => (
          <ListItem button key={item.name}>
            <ListItemIcon>
              <img className={classes.img} src={item.icon} alt="Apple Fruit" />
            </ListItemIcon>
            <ListItemText primary={item.name} />
            <NavigateNext />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DrawerItems;
