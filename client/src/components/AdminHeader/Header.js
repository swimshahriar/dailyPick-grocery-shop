import React, { useState, useContext } from 'react';
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
  NotificationsOutlined,
  DashboardOutlined,
  ExitToAppOutlined,
} from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';

import DrawerComp from './DrawerComp';
import useStyles from './HeaderStyles';
import Logo from '../../assets/Logo.svg';
import { ShopContext } from '../../context/shopContext';

const Header = (props) => {
  const { window } = props;
  const classes = useStyles();
  const shopContext = useContext(ShopContext);
  const history = useHistory();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleOutlined />
            </IconButton>

            <IconButton color="inherit">
              <Badge color="primary" showZero badgeContent={0}>
                <NotificationsOutlined />
              </Badge>
            </IconButton>

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
                  onClick={() => {
                    shopContext.logout();
                    history.push('/auth');
                  }}
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
