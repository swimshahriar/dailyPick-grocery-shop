import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  card: {
    borderColor: theme.palette.primary.light,
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: theme.palette.secondary.dark,
    '&:hover': {
      cursor: 'pointer',
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
    },
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
  },
  divider: {
    margin: 15,
  },
}));
