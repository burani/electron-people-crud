/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Snackbar,
  TextField,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { FieldArray, Form, Formik, getIn } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { generate } from 'shortid';
import * as Yup from 'yup';
import { peopleAPI } from '../api';
import routes from '../constants/routes.json';
import { CustomToolbar } from './common/CustomToolbar';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const useStyles = makeStyles((theme) => ({
  content: {
    position: 'relative',
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  input: {
    marginTop: '30px',
  },
}));

const validationSchema = Yup.object().shape({
  additional: Yup.array().of(
    Yup.object().shape({
      key: Yup.string().min(2).required(),
      value: Yup.string().max(20),
    })
  ),
  name: Yup.string().required().max(40),
});

export const Edit: React.FC = ({ match }) => {
  const classes = useStyles();
  let history = useHistory();
  const isUpdate = !!match.params.id;
  const prevParamsId = usePrevious(match.params.id);

  const [initialValues, setInitialValues] = useState();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    isUpdate
      ? peopleAPI
          .getPerson(match.params.id)
          .then((res) => setInitialValues(res.data[0]))
      : setInitialValues({ name: '' });
  }, []);

  useEffect(() => {
    return () => {
      if (prevParamsId !== match.params.id) {
        setInitialValues({ name: '' });
      }
    };
  }, [match.params.id]);

  const onDeletePerson = (id) => {
    peopleAPI.deletePerson(id);
    history.push(routes.VIEW);
  };

  const onAddPerson = (values) => {
    let d = new Date();
    values.createdAt = d.toLocaleString();
    peopleAPI.addPerson(values);
    history.push(routes.VIEW);
  };

  const onUpdatePerson = (id, values) => {
    peopleAPI.updatePerson(id, values);
    handleOpen();
  };

  return (
    <div className={classes.content}>
      <CustomToolbar />

      {initialValues ? (
        <Container>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(values) => {
              isUpdate
                ? onUpdatePerson(match.params.id, values)
                : onAddPerson(values);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              errors,
              touched,
              isValid,
            }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      size="small"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.name && touched.name}
                      helperText={errors.name}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FieldArray name="additional">
                      {({ push }) => (
                        <div>
                          <Button
                            type="button"
                            color="secondary"
                            variant="contained"
                            onClick={() =>
                              push({ id: generate(), key: '', value: '' })
                            }
                          >
                            add property
                          </Button>
                          {values.additional &&
                            values.additional.map((pair, index) => {
                              const key = `additional[${index}].key`;
                              const value = `additional[${index}].value`;

                              return (
                                <div key={pair.id}>
                                  <TextField
                                    className={classes.input}
                                    size="small"
                                    name={`additional[${index}].key`}
                                    label="key"
                                    value={pair.key}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={getIn(errors, key)}
                                    helperText={getIn(errors, key)}
                                  />
                                  <TextField
                                    className={classes.input}
                                    size="small"
                                    name={`additional[${index}].value`}
                                    label="value"
                                    value={pair.value}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={getIn(errors, value)}
                                    helperText={getIn(errors, value)}
                                  />
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </FieldArray>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      color="secondary"
                      type="submit"
                      variant="contained"
                      disabled={!isValid}
                    >
                      {isUpdate ? 'Update' : 'Add a new person'}
                    </Button>
                    {isUpdate && (
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          onDeletePerson(values.id);
                        }}
                      >
                        Delete person
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Person was updated
              <Link to={routes.VIEW}> Go back to view</Link>
            </Alert>
          </Snackbar>
        </Container>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};
