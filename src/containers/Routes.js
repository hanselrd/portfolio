import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../utils';
import Home from '../components/Home';
import Blog from '../components/Blog';
import Projects from '../components/Projects';
import CV from '../components/CV';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route exact path="/home" component={Home} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/cv" component={CV} />
        <Route exact path="/site-map" render={() => <p>Site Map</p>} />
        <Route exact path="/contact-us" render={() => <p>Contact Us</p>} />
        <Route exact path="/terms" render={() => <p>Terms</p>} />
        <Route
          exact
          path="/privacy-policy"
          render={() => <p>Privacy Policy</p>}
        />
        <Route render={() => <p>Error 404</p>} />
      </Switch>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
