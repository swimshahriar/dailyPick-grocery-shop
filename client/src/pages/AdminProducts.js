import React, { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddCircleOutlineOutlined, SearchOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import Header from '../components/AdminHeader/Header';
import ProductListContainer from '../components/ProductManagement/ProductsListContainer';
import { useHttpClient } from '../hooks/useHttpClient';
import BackdropLoader from '../components/BackdropLoader/BackdropLoader';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  addProductBtn: {
    width: '100%',
    marginTop: 10,
    padding: 10,
  },
  filterArea: {
    marginTop: 20,
    padding: 15,
    background: theme.palette.secondary.main,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputField: {
    margin: theme.spacing(2),
    width: '80%',
  },
  searchBtn: {
    [theme.breakpoints.down('xs')]: {
      width: 100,
    },
    width: 200,
  },
}));

const AdminProducts = () => {
  const history = useHistory();
  const classes = useStyles();
  const { sendRequest, isLoading } = useHttpClient();

  const [loadedProducts, setLoadedProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [searchText, setSearchText] = useState('');

  const categoryChangeHandler = (event) => {
    setCategory(event.target.value);
  };

  const searchHandler = async () => {
    let cname = 'all';
    if (category !== '') {
      cname = category;
    }

    let responseData;
    if (searchText !== '') {
      try {
        responseData = await fetch(
          `https://dailypick.herokuapp.com/api/product/search/${cname}/q=${searchText}`
        );
      } catch (error) {
        throw Error(error.message);
      }
      responseData = await responseData.json();
      setLoadedProducts(responseData);
    }
  };

  // fetching data
  useEffect(() => {
    try {
      let responseData;
      const sendReq = async () => {
        if (category === '') {
          responseData = await sendRequest(
            'https://dailypick.herokuapp.com/api/product/'
          );
        } else if (category === 'Archived') {
          responseData = await sendRequest(
            'https://dailypick.herokuapp.com/api/product/archive/all'
          );
        } else {
          responseData = await sendRequest(
            `https://dailypick.herokuapp.com/api/product/category/${category}`
          );
        }

        setLoadedProducts(responseData);
        setSearchText('');
      };
      sendReq();
    } catch (error) {}
  }, [sendRequest, category]);

  return (
    <>
      <Header />
      <main>
        {isLoading && <BackdropLoader isLoading={isLoading} />}
        <div className={classes.container}>
          <Button
            startIcon={<AddCircleOutlineOutlined />}
            variant="contained"
            color="primary"
            className={classes.addProductBtn}
            onClick={() => history.push('/admin/products/add')}
          >
            Add Product
          </Button>
          <div className={classes.filterArea}>
            <Typography variant="h4" color="textPrimary">
              Filter
            </Typography>
            <FormControl variant="filled" className={classes.inputField}>
              <InputLabel id="category">Category</InputLabel>
              <Select
                required
                labelId="category"
                id="category"
                value={category}
                onChange={categoryChangeHandler}
              >
                <MenuItem value={''}>All Products</MenuItem>
                <MenuItem value={'Archived'}>Archived</MenuItem>
                <MenuItem value={'Fruits and Vegetables'}>
                  Fruits and Vegetables
                </MenuItem>
                <MenuItem value={'Meat and Fish'}>Meat and Fish</MenuItem>
                <MenuItem value={'Snacks'}>Snacks</MenuItem>
                <MenuItem value={'Dairy'}>Dairy</MenuItem>
                <MenuItem value={'Cooking'}>Cooking</MenuItem>
                <MenuItem value={'Breakfast'}>Breakfast</MenuItem>
                <MenuItem value={'Beverage'}>Beverage</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="searchBox"
              label="Search Box"
              variant="filled"
              className={classes.inputField}
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
            <Button
              startIcon={<SearchOutlined />}
              variant="contained"
              color="primary"
              size="large"
              className={classes.searchBtn}
              onClick={searchHandler}
            >
              Search
            </Button>
          </div>
        </div>
        <ProductListContainer loadedProducts={loadedProducts} />
      </main>
    </>
  );
};

export default AdminProducts;
