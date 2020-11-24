import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  link: {
    color: 'black',
  },
}));

export const SideBar: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to={routes.VIEW} className={classes.link}>
          <ListItem button key="View">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>

            <ListItemText primary="View" />
          </ListItem>
        </Link>
        <Link to={routes.EDIT} className={classes.link}>
          <ListItem button key="Edit">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>

            <ListItemText primary="Edit" />
          </ListItem>
        </Link>
        <Link to={routes.ABOUT} className={classes.link}>
          <ListItem button key="About">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>

            <ListItemText primary="About" />
          </ListItem>
        </Link>
      </List>
      <Divider />
    </div>
  );
};
