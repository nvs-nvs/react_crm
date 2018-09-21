import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'

// Containers
import { DefaultLayout } from './containers';
// Pages
import { Login } from './views/Pages';

// import { renderRoutes } from 'react-router-config';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route path="/" name="Инфо о зале" component={DefaultLayout} />
        </Switch>
      </Fragment>
    );
  }
}

export default hot(module)(withRouter(App));
