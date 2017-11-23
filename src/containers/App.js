import React, { Component } from 'react';
import '../styles/App.css';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../utils';
import firebase from '../firebase';
import Counter from '../components/Counter';
import FontAwesome from 'react-fontawesome';

class App extends Component {
  componentDidMount() {
    this.props.handleAuthStateChanged();
  }
  render() {
    const { auth, counter1, counter2, increment, decrement, add } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hansel De La Cruz</h1>
        </header>
        <Counter counter={counter1} actions={{ increment, decrement, add }} />
        <Counter counter={counter2} actions={{ increment, decrement, add }} />
        {auth.running && <FontAwesome name="spinner" size="3x" spin />}
        {!auth.running &&
          !auth.user && (
            <button
              onClick={() =>
                firebase
                  .auth()
                  .signInWithPopup(new firebase.auth.GoogleAuthProvider())
              }
            >
              Login
            </button>
          )}
        {!auth.running &&
          auth.user && (
            <button onClick={() => firebase.auth().signOut()}>Logout</button>
          )}
        <p>{auth.user && JSON.stringify(auth.user)}</p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
