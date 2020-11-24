import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
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
        <ListItem button key="View">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <Link to={routes.VIEW} className={classes.link}>
            <ListItemText primary="View" />
          </Link>
        </ListItem>
        <ListItem button key="Edit">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <Link to={routes.EDIT} className={classes.link}>
            <ListItemText primary="Edit" />
          </Link>
        </ListItem>
        <ListItem button key="About">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <Link to={routes.ABOUT} className={classes.link}>
            <ListItemText primary="About" />
          </Link>
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};
