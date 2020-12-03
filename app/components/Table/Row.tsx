import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import React from 'react';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

export const Row: React.FC = ({ person, handleRowClick }) => {
  // const { person } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  // const entries = Object.entries(person.additional);

  return (
    <>
      <TableRow
        className={classes.root}
        hover
        onClick={(event) => handleRowClick(event, person.id)}
      >
        <TableCell>
          <IconButton aria-label="expand row" onClick={() => setOpen(!open)}>
            {person.additional &&
              (open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />)}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="person">
          {person.id}
        </TableCell>
        <TableCell align="left">{person.name}</TableCell>
        <TableCell align="left">{person.createdAt}</TableCell>
      </TableRow>
      {person.additional && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Additional
                </Typography>
                <List>
                  {person.additional.map((pair) => {
                    return (
                      <ListItem key={`item-${pair.key}-${pair.value}`}>
                        <ListItemText
                          primary={pair.value}
                          secondary={pair.key}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
