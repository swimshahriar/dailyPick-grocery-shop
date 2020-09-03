import React from 'react';
import { Hidden, Drawer } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';

import DrawerItems from './DrawerItems';

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: drawerWidth,
  },
}));

const DrawerComp = ({ container, mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden mdUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <DrawerItems />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <DrawerItems />
        </Drawer>
      </Hidden>
    </>
  );
};

export default DrawerComp;
