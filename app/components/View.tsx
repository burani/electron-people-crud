import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { PeopleTable } from './Table/PeopleTable';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    position: 'relative',
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export const View: React.FC = () => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <PeopleTable />
    </main>
  );
};
