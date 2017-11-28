import React, { Component } from 'react';
import '../styles/App.css';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../utils';
import { Helmet } from 'react-helmet';
import { Container } from 'semantic-ui-react';
import Header from '../components/Header';
import Routes from './Routes';
import Footer from '../components/Footer';

class App extends Component {
  componentDidMount() {
    this.props.handleAuthStateChanged();
  }

  render() {
    const {
      auth,
      login,
      logout,
      counter1,
      counter2,
      increment,
      decrement,
      add
    } = this.props;
    return (
      <div className="App">
        <Helmet>
          <title>App.js | Hansel De La Cruz</title>
        </Helmet>
        <Header auth={auth} authActions={{ login, logout }} />
        <Container text style={{ marginTop: '3em', flex: 1 }}>
          <Routes />
        </Container>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
