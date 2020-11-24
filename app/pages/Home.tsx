import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import { About } from '../components/About';
import { Nav } from '../components/common/Nav';
import { Edit } from '../components/Edit';
import { View } from '../components/View';
import routes from '../constants/routes.json';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Nav />
      {/* 
      <Link to={routes.EDIT}>Edit</Link>
      <Link to={routes.ABOUT}>About</Link>
      <Link to={routes.LOGIN}>Logout</Link> */}
      <Route path={routes.VIEW} exact component={View} />
      <Route path={routes.EDIT} exact component={Edit} />
      <Route path={routes.ABOUT} exact component={About} />
      <Redirect from="/home" to={routes.VIEW} exact />
    </div>
  );
}
