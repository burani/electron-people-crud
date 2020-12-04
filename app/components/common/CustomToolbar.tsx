import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

export const CustomToolbar = () => {
  const classes = useStyles();
  return <div className={classes.toolbar} />;
};
