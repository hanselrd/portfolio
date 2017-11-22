import React, { Component } from 'react';
import '../styles/App.css';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../utils';
import firebase from '../firebase';
import Counter from '../components/Counter';
import UserInfo from '../components/UserInfo';

if (!firebase.auth().currentUser) {
  firebase
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(auth => {
      console.log('auth', auth.user.toJSON());
      firebase.auth().signOut();
    })
    .catch(error => {
      console.log('error', error);
    });
}

class App extends Component {
  render() {
    const {
      counter1,
      counter2,
      increment,
      decrement,
      add,
      user1,
      user2,
      changeName,
      changeAge
    } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hansel De La Cruz</h1>
        </header>
        <Counter counter={counter1} actions={{ increment, decrement, add }} />
        <Counter counter={counter2} actions={{ increment, decrement, add }} />
        <UserInfo user={user1} actions={{ changeName, changeAge }} />
        <UserInfo user={user2} actions={{ changeName, changeAge }} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
