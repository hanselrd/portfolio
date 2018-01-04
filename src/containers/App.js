import React, { Component } from 'react';
import '../styles/App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import detectPrint from 'react-detect-print';
import { mapStateToProps, mapDispatchToProps } from '../utils';
import { Container } from 'semantic-ui-react';
import Header from '../components/Header';
import Routes from './Routes';
import Footer from './Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.props.handleAuthStateChanged();
    this.props.localeStart();
  }

  render() {
    const { auth, login, logout, printing } = this.props;
    return (
      <div className="App">
        {!printing && (
          <div className="App-print-hidden">
            <Header auth={auth} authActions={{ login, logout }} />
            <Container text style={{ marginTop: '7em', flex: 1 }}>
              <Routes />
            </Container>
            <Footer />
          </div>
        )}
        {printing && (
          <div className="App-print">
            <Routes />
          </div>
        )}
      </div>
    );
  }
}

export default detectPrint(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
);
