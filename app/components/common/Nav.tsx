/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  AppBar,
  Button,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useCallback } from 'react';
import { useLocation } from 'react-router';
import { SideBar } from './SideBar';
const { shell, remote } = require('electron');

const drawerWidth = 241;
const minDrawerWidth = 240;
const maxDrawerWidth = 1000;

const appPath = remote.app.getAppPath();

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  fileButton: {
    padding: theme.spacing(0, 2),
    height: '100%',
    justifySelf: 'end',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  dragger: {
    width: '5px',
    cursor: 'ew-resize',
    padding: '4px 0 0',
    borderTop: '1px solid #ddd',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: '#f4f7f9',
  },
}));

export const Nav: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [resizedWidth, setResizedWidth] = React.useState(drawerWidth);

  const handleMouseDown = (e) => {
    // console.log('in mouse down');
    document.addEventListener('mouseup', handleMouseUp, true);
    document.addEventListener('mousemove', handleMouseMove, true);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp, true);
    document.removeEventListener('mousemove', handleMouseMove, true);
  };

  const handleMouseMove = useCallback((e) => {
    const newWidth = e.clientX - document.body.offsetLeft;
    // console.log('newWidth: ' + newWidth);
    if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
      setResizedWidth(newWidth);
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation().pathname;

  const getTitle = (path: string): string => {
    const lastNumber = path.split('/')[3];

    switch (path) {
      case '/home/view':
        return 'View';
      case '/home/edit':
        return 'Edit - Add a new person';
      case `/home/edit/${lastNumber}`:
        return 'Edit - Update person';
      case '/home/about':
        return 'About';
      default:
        return 'Electron Crud';
    }
  };

  const pageTitle = getTitle(location);

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
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
          <Typography variant="h6" noWrap>
            {pageTitle}
          </Typography>
          <Button
            className={classes.fileButton}
            onClick={() => {
              shell.openItem(`${appPath}/db.json`);
            }}
          >
            Open file
          </Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
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
            <SideBar handleClose={handleDrawerClose} />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            // classes={{
            //   paper: classes.drawerPaper,
            // }}
            variant="permanent"
            open
            PaperProps={{ style: { width: resizedWidth } }}
          >
            <div
              onMouseDown={(e) => handleMouseDown(e)}
              className={classes.dragger}
            />
            <SideBar />
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
};
