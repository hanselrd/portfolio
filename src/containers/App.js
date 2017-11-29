import React, { Component } from 'react';
import '../styles/App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps, mapDispatchToProps } from '../utils';
import { Container } from 'semantic-ui-react';
import Header from '../components/Header';
import Routes from './Routes';
import Footer from '../components/Footer';

class App extends Component {
  componentDidMount() {
    this.props.handleAuthStateChanged();
  }

  render() {
    const { auth, login, logout } = this.props;
    return (
      <div className="App">
        <div className="App-print-hidden">
          <Header auth={auth} authActions={{ login, logout }} />
          <Container text style={{ marginTop: '5em', flex: 1 }}>
            <Routes />
          </Container>
          <Footer />
        </div>
        <div className="App-print">
          <Routes />
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
