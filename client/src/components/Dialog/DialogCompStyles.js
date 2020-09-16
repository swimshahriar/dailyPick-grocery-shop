import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    margin: 15,
    textAlign: 'center',
  },
  dialogTitle: {
    textAlign: 'center',
  },
  reviewContainer: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputFieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    margin: theme.spacing(2),
    width: '90%',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    width: '60%',
    marginBottom: 20,
  },
}));
