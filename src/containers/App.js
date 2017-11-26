import React, { Component } from 'react';
import '../styles/App.css';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../utils';
import Counter from '../components/Counter';
import FontAwesome from 'react-fontawesome';

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
        <Counter counter={counter1} actions={{ increment, decrement, add }} />
        <Counter counter={counter2} actions={{ increment, decrement, add }} />
        {!auth.user &&
          auth.login.loading && <FontAwesome name="spinner" size="3x" spin />}
        {!auth.user &&
          !auth.login.loading && (
            <button
              onClick={() => login({ provider: 'google', type: 'popup' })}
            >
              Log in
            </button>
          )}
        {auth.user &&
          auth.logout.loading && <FontAwesome name="spinner" size="3x" spin />}
        {auth.user &&
          !auth.logout.loading && (
            <button onClick={() => logout()}>Log out</button>
          )}
        <p>{auth.user && JSON.stringify(auth.user)}</p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
