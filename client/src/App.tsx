import firebase from '@app/core/firebase';
import * as React from 'react';

class App extends React.Component {
  public componentWillMount() {
    console.log(process.env.REACT_APP_STAGE);

    firebase.auth().onAuthStateChanged(auth => {
      if (auth) {
        console.log(auth.toJSON());
      } else {
        console.log(null);
      }
    });
  }

  public login = (e: React.MouseEvent<HTMLButtonElement>) => {
    firebase.auth().signInWithEmailAndPassword('test1@gmail.com', '123456');
  };

  public logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    firebase.auth().signOut();
  };

  public render() {
    return (
      <div>
        <p>Hello</p>
        <button onClick={this.login}>Sign in with Email</button>
        <button onClick={this.logout}>Sign out</button>
      </div>
    );
  }
}

export default App;
