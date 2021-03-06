import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  card: {
    minWidth: 220,
  },
  cardImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    height: 250,
    width: 250,
    margin: 15,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingBtn: {
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.primary.light,
    },
  },
  priceSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  prodPrice: {
    marginLeft: 10,
  },
  offer: {
    textDecoration: 'line-through',
    color: theme.palette.error.main,
  },
  qty: {
    marginBottom: 10,
  },
}));
