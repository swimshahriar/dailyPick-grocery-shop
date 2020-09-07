import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
export default makeStyles((theme) => ({
  emptyContainer: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    margin: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shoppingCartIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  tableContainer: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  table: {
    minWidth: 700,
  },
  cartBottomBtn: {
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  clearBtn: {
    color: theme.palette.error.main,
  },
  navigateBtn: {
    marginTop: 20,
  },
  nextBtn: {
    marginLeft: 10,
  },
}));
