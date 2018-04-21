import { firebase } from '@app/core';
import * as React from 'react';

class App extends React.Component {
  public componentWillMount() {
    firebase.auth().onAuthStateChanged(auth => {
      if (auth) {
        console.log(auth.toJSON());
      }
    });
  }

  public login = (e: React.MouseEvent<HTMLButtonElement>) => {
    firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider());
  };

  public logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    firebase.auth().signOut();
  };

  public render() {
    return (
      <div>
        <p>Hello</p>
        <button onClick={this.login}>Sign in with Facebook</button>
        <button onClick={this.logout}>Sign out</button>
      </div>
    );
  }
}

export default App;
