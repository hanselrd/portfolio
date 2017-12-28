import React, { Component } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../utils';

class AuthRoute extends Component {
  render() {
    const { auth } = this.props;
    return auth.user ? <Route {...this.props} /> : <Redirect to="/login" />;
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthRoute)
);
