import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    position: 'absolute',
    width: '80vw',
    height: '25vh',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #049E7F',
    boxShadow: theme.shadows[20],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    marginTop: 20,
  },
  confirmBtn: {
    marginLeft: 10,
  },
}));
