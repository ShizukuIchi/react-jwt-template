import React from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from 'helpers/history';
import MainPage from 'containers/MainPage';
import LoginPage from 'containers/LoginPage';
import PrivateRoute from 'components/PrivateRoute';

const Routes = () => (
  <Router history={history}>
    <div>
      <PrivateRoute exact path="/" component={MainPage} />
      <Route path="/login" component={LoginPage} />
    </div>
  </Router>
);

export default Routes;
