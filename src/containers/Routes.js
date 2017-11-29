import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../utils';
import AuthRoute from './AuthRoute';
import GuestRoute from './GuestRoute';
import Home from '../components/Home';
import Blog from '../components/Blog';
import Projects from '../components/Projects';
import CV from '../components/CV';
import Login from '../containers/Login';
import Profile from '../components/Profile';
import Settings from '../components/Settings';
import PrivacyPolicy from '../components/PrivacyPolicy';
import NotFound from '../components/NotFound';

class Routes extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route exact path="/home" component={Home} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/cv" component={CV} />
        <GuestRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/profile" component={Profile} />
        <AuthRoute exact path="/settings" component={Settings} />
        {/* <Route exact path="/site-map" />
        <Route exact path="/contact-us" />
        <Route exact path="/terms" /> */}
        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
