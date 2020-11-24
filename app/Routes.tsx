/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import LoginPage from './containers/LoginContainer';
import HomePage from './containers/HomeContainer';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route exact path={routes.LOGIN} component={LoginPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
