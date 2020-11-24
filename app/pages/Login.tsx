import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import Container from '@material-ui/core/Container/Container';
import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

const FormSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars'),
  login: Yup.string().required('Login is required'),
});

export default function Login(): JSX.Element {
  const classes = useStyles();
  let history = useHistory();
  return (
    <Container className={classes.container} maxWidth="xs">
      <Formik
        initialValues={{
          login: '',
          password: '',
        }}
        validationSchema={FormSchema}
        onSubmit={(values) => {
          console.log('clicked submit');
          history.push('/home');
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, isValid }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Login"
                      name="login"
                      size="small"
                      variant="outlined"
                      value={values.login}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.login && touched.login}
                      helperText={errors.login}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      size="small"
                      type="password"
                      variant="outlined"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.password && touched.password}
                      helperText={errors.password}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="secondary"
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={!isValid}
                >
                  Log in
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
