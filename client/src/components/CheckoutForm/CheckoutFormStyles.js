import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  form: {
    marginTop: 20,
  },
  inputFieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    margin: theme.spacing(2),
    width: '80%',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    width: '80%',
    marginBottom: 20,
  },
}));
