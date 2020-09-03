import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddCircleOutlineOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import Header from '../components/AdminHeader/Header';
import ProductListContainer from '../components/ProductManagement/ProductsListContainer';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  addProductBtn: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    width: '100%',
    marginTop: 10,
    padding: 10,
  },
}));

const AdminProducts = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <Header />
      <main>
        <Button
          startIcon={<AddCircleOutlineOutlined />}
          variant="contained"
          color="primary"
          className={classes.addProductBtn}
          onClick={() => history.push('/admin/products/add')}
        >
          Add Product
        </Button>
        <ProductListContainer />
      </main>
    </>
  );
};

export default AdminProducts;
