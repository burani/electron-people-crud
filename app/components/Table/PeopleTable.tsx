import {
  makeStyles,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Table,
  CircularProgress,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchPeople, setPage } from '../PeopleSlice';
import { Row } from './Row';
import routes from '../../constants/routes.json';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

export const PeopleTable: React.FC = () => {
  const classes = useRowStyles();

  const dispatch = useDispatch();
  const history = useHistory();

  const people = useSelector((state) => {
    return state.people.people;
  });
  const isLoaded = useSelector((state) => {
    return state.people.isLoaded;
  });
  const page = useSelector((state) => {
    return state.people.page;
  });
  const pageSize = useSelector((state) => {
    return state.people.pageSize;
  });

  const handleChangePage = (e) => {
    dispatch(setPage(e.target.value));
  };

  const handleRowClick = (e, id) => {
    e.stopPropagation();
    if (
      e.target.classList.contains('MuiSvgIcon-root') ||
      e.target.classList.contains('MuiButtonBase-root') ||
      e.target.classList.contains('MuiIconButton-root') ||
      !e.target.classList.length
    ) {
      console.log('clicked icon');
      return;
    }
    console.log(`clicked row with id ${id}`);
    console.log(e.target.classList);
    history.push(`${routes.EDIT}/${id}`);
  };

  useEffect(() => {
    dispatch(fetchPeople(page, pageSize));
  }, []);

  return (
    <>
      {!isLoaded ? (
        <CircularProgress />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Full name</TableCell>
                  <TableCell align="left">Created at</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {people.map((person) => (
                  <Row
                    key={person.name + person.id}
                    person={person}
                    handleRowClick={handleRowClick}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={people.length}
            rowsPerPage={pageSize}
            page={page}
            onChangePage={handleChangePage}
          />
        </>
      )}
    </>
  );
};
