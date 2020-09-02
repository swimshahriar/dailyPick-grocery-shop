import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  carouselItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 400,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },
}));

const CarouselItem = ({ item }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.carouselItem}>
      <Typography variant="h3">{item.name}</Typography>
      <Typography variant="body1">{item.description}</Typography>
    </Paper>
  );
};

export default CarouselItem;
