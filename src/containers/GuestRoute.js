import React, { Component } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../utils';

class GuestRoute extends Component {
  render() {
    const { auth } = this.props;
    return !auth.user ? <Route {...this.props} /> : <Redirect to="/home" />;
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GuestRoute)
);
