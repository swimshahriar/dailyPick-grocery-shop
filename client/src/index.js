import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import App from './App';
import theme from './theme.js';
import ShopContextProvider from './context/shopContext';
import './index.css';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
