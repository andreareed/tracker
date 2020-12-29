import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import store from 'store2';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import { verifyToken, logout } from './views/Auth/auth-actions';

import LoggedOutLayout from './layouts/LoggedOutLayout';
import PrimaryLayout from './layouts/PrimaryLayout';

import Register from './views/Auth/Register';
import Login from './views/Auth/Login';

import Button from './common/components/Button';

class App extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(Map),
    verifyToken: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { user, verifyToken } = this.props;
    if (!user) {
      const token = store.get('token');
      if (token) {
        verifyToken();
      }
    }
  }

  render() {
    const { user, loaded, logout } = this.props;
    const token = store.get('token');

    if (token && !loaded) {
      return 'loading...';
    }

    if (!user) {
      return (
        <LoggedOutLayout>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Redirect to="/login" />
          </Switch>
        </LoggedOutLayout>
      );
    }

    return (
      <PrimaryLayout>
        <Button onClick={logout}>Logout</Button>
        <Switch>
          <Route exact path="/" component={() => null} />
          <Redirect to="/" />
        </Switch>
      </PrimaryLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user.get('data'),
    loaded: state.auth.token.get('loaded'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    verifyToken: () => dispatch(verifyToken()),
    logout: () => dispatch(logout()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
