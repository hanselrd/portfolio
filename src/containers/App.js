import React, { Component } from 'react';
import '../styles/App.css';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../utils';
import DocumentTitle from 'react-document-title';
import Header from '../components/Header';
import Counter from '../components/Counter';

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
      <DocumentTitle title="App.js | Hansel De La Cruz">
        <div className="App">
          <Header auth={auth} actions={{ login, logout }} />
          <div className="App-content">
            <Counter
              counter={counter1}
              actions={{ increment, decrement, add }}
            />
            <Counter
              counter={counter2}
              actions={{ increment, decrement, add }}
            />
            {auth.user && <hr />}
            <p>{auth.user && JSON.stringify(auth.user)}</p>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
