import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 20,
  },
}));

const PaginationComponent = ({
  totalProducts,
  productsPerPage,
  page,
  setCurrentPage,
}) => {
  const classes = useStyles();
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const currentPageHandler = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className={classes.pagination}>
      <Pagination
        onChange={currentPageHandler}
        page={page}
        count={pageNumbers.length}
        variant="outlined"
        shape="rounded"
        color="primary"
      />
    </div>
  );
};

export default PaginationComponent;
