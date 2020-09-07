import React, { useState, useEffect, useContext } from 'react';
import {
  AppBar,
  CssBaseline,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Button,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  AccountCircleOutlined,
  ShoppingBasketOutlined,
  VpnKeyOutlined,
  DashboardOutlined,
  ExitToAppOutlined,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/shopContext';

import DrawerComp from './DrawerComp';
import useStyles from './HeaderStyles';
import Logo from '../../assets/Logo.svg';

const Header = (props) => {
  const shopContext = useContext(ShopContext);
  const { window } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const open = Boolean(anchorEl);

  // updating itemCount state
  useEffect(() => {
    let itemCount = 0;
    shopContext.cart.forEach((item) => {
      itemCount += item.qty;
    });
    setItemCount(itemCount);
  }, [shopContext.cart]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <header>
        <CssBaseline />
        <AppBar position="fixed" color="secondary" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/">
              <img className={classes.logo} src={Logo} alt="Logo" />
            </Link>
          </Toolbar>

          <div className={classes.headerIcons}>
            {isLoggedIn ? (
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircleOutlined />
              </IconButton>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<VpnKeyOutlined />}
                onClick={() => setIsLoggedIn(!isLoggedIn)}
              >
                Login
              </Button>
            )}
            <Link to="/cart">
              <IconButton color="inherit">
                <Badge color="primary" showZero badgeContent={itemCount}>
                  <ShoppingBasketOutlined />
                </Badge>
              </IconButton>
            </Link>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Button startIcon={<DashboardOutlined />}>DashBoard</Button>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Button
                  startIcon={<ExitToAppOutlined />}
                  onClick={() => setIsLoggedIn(!isLoggedIn)}
                >
                  Logout
                </Button>
              </MenuItem>
            </Menu>
          </div>
        </AppBar>
      </header>
      <aside>
        <nav className={classes.drawer} aria-label="categories">
          <DrawerComp
            container={container}
            handleDrawerToggle={handleDrawerToggle}
            mobileOpen={mobileOpen}
          />
        </nav>
      </aside>
    </div>
  );
};

export default Header;
