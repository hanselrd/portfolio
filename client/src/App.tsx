import firebase from '@app/core/firebase';
import * as React from 'react';

class App extends React.Component {
  public componentWillMount() {
    firebase.auth().onAuthStateChanged(auth => {
      if (auth) {
        console.log(auth.toJSON());
        auth.getIdToken().then(value => {
          // localStorage.setItem(process.env.REACT_APP_AUTH_KEY as string, value);
        });
      } else {
        // localStorage.removeItem(process.env.REACT_APP_AUTH_KEY as string);
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
