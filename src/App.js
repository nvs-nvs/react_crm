import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { persistStore } from 'redux-persist';

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
    const { isAuthentificated, user } = this.props;
      if (!isAuthentificated) {
          return (
              <Fragment>
                  <Switch>
                      <Route exact path="/login" name="Login Page" component={Login} />
                      <Redirect to="/login"/>
                  </Switch>
              </Fragment>
          );
      }
      
        return (
          <Fragment>
            <Switch>
              <Route path="/" name="Инфо о зале" component={DefaultLayout} />
              <Redirect to="/" />
            </Switch>
          </Fragment>
        );
  }
}

function mapStateToProps(state){
    return {
        user: state.user,
        isAuthentificated: state.auth.isAuthentificated
    };
}

export default hot(module)(withRouter(connect(mapStateToProps)(App)));
