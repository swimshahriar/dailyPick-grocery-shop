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
  prodPrice: {
    marginLeft: 10,
  },
  qty: {
    marginBottom: 10,
  },
  manageLink: {
    width: '100%',
  },
}));
