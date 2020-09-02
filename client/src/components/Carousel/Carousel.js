import React from 'react';
import MuiCarousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core/styles';

import CarouselItem from './CarouselItem';

const items = [
  {
    name: 'Random Name #1',
    description: 'Probably the most random thing you have ever seen!',
  },
  {
    name: 'Random Name #2',
    description: 'Hello World!',
  },
  {
    name: 'Random Name #3',
    description: 'Probably the most random thing you have ever seen!',
  },
  {
    name: 'Random Name #4',
    description: 'Hello World!',
  },
];
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  carousel: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
}));

const Carousel = () => {
  const classes = useStyles();
  return (
    <MuiCarousel className={classes.carousel} animation="slide">
      {items.map((item, index) => (
        <CarouselItem item={item} key={index} />
      ))}
    </MuiCarousel>
  );
};

export default Carousel;
