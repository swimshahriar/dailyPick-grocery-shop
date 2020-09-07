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
import { Link } from 'react-router-dom';

import AppleFuit from '../../assets/category/fruit.svg';
import MeatFood from '../../assets/category/meat-food.svg';
import Snacks from '../../assets/category/snacks.svg';
import Cooking from '../../assets/category/cooking.svg';
import Dairy from '../../assets/category/dairy.svg';
import Beverage from '../../assets/category/beverage.svg';
import Breakfast from '../../assets/category/wheat-bread.svg';

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
    name: 'Fruits and Vegetables',
    icon: AppleFuit,
  },
  {
    name: 'Meat and Fish',
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
  {
    name: 'Beverage',
    icon: Beverage,
  },
  {
    name: 'Breakfast',
    icon: Breakfast,
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
          <Link to={`/category/${item.name}`} key={item.name}>
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
        {category.map((item) => (
          <Link to={`/category/${item.name}`} key={item.name}>
            <ListItem button key={item.name}>
              <ListItemIcon>
                <img
                  className={classes.img}
                  src={item.icon}
                  alt="Apple Fruit"
                />
              </ListItemIcon>
              <ListItemText primary={item.name} />
              <NavigateNext />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
};

export default DrawerItems;
