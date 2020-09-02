import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#049E7F',
      dark: '#008D70',
    },
    secondary: {
      main: '#FFF',
      dark: '#F7F7F7',
    },
    text: {
      primary: '#0F1136',
    },
  },
  typography: {
    fontFamily: 'Lato, sans-serif',
  },
});

theme = responsiveFontSizes(theme);

export default theme;
