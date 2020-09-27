import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Typography,
  Container,
  Grow,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  SentimentDissatisfiedOutlined,
  SearchOutlined,
} from '@material-ui/icons';

import Header from '../components/Header/Header';
import ProductsListContainer from '../components/Products/ProductsListContainer';
import { useHttpClient } from '../hooks/useHttpClient';
import PaginationComponent from '../components/Pagination/PaginationComponent';
import BackdropLoader from '../components/BackdropLoader/BackdropLoader';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  emptyContainer: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  filterArea: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
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

const CategoryProducts = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const classes = useStyles();

  // getting the category name from the url
  const { cname } = useParams();
  const history = useHistory();

  const [category, setCategory] = useState(cname);
  const [searchText, setSearchText] = useState('');

  // category change handler
  const categoryChangeHandler = (event) => {
    history.push(`/category/${event.target.value}`);
  };

  // setting category
  useEffect(() => {
    setCategory(cname);
  }, [cname]);

  // search handler
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
        if (category !== '') {
          responseData = await sendRequest(
            `https://dailypick.herokuapp.com/api/product/category/${category}`
          );
        }

        setLoadedProducts(responseData);
        setSearchText('');
      };
      sendReq();
    } catch (error) {}
  }, [sendRequest, category, cname]);

  // Pagination helper
  let currentProducts;
  if (loadedProducts) {
    const indexOfLastPost = currentPage * productsPerPage;
    const indexOfFirstPage = indexOfLastPost - productsPerPage;
    currentProducts = loadedProducts.slice(indexOfFirstPage, indexOfLastPost);
  }

  return (
    <>
      <Header />
      <main>
        <BackdropLoader isLoading={isLoading} />
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
              {/* <MenuItem value={'All Products'}>All Products</MenuItem> */}
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
        {loadedProducts.length <= 0 && (
          <Grow in timeout={500}>
            <Container className={classes.emptyContainer}>
              <SentimentDissatisfiedOutlined fontSize="large" />
              <Typography variant="h4">No Products Found!</Typography>
              <SentimentDissatisfiedOutlined fontSize="large" />
            </Container>
          </Grow>
        )}
        {loadedProducts.length > 0 && (
          <>
            <ProductsListContainer products={currentProducts} />
            <PaginationComponent
              totalProducts={loadedProducts.length}
              productsPerPage={productsPerPage}
              setCurrentPage={setCurrentPage}
              page={currentPage}
            />
          </>
        )}
      </main>
    </>
  );
};

export default CategoryProducts;
