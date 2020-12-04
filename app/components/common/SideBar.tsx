import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  link: {
    color: 'black',
  },
}));

export const SideBar: React.FC = ({ handleClose }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to={routes.VIEW} className={classes.link}>
          <ListItem button key="View" onClick={handleClose}>
            <ListItemIcon>
              <ViewHeadlineIcon />
            </ListItemIcon>
            <ListItemText primary="View" />
          </ListItem>
        </Link>
        <Link to={routes.EDIT} className={classes.link}>
          <ListItem button key="Edit" onClick={handleClose}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </ListItem>
        </Link>
        <Link to={routes.ABOUT} className={classes.link}>
          <ListItem button key="About" onClick={handleClose}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
        </Link>
      </List>
      <Divider />
    </div>
  );
};
