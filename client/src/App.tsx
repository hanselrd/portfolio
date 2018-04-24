import firebase from '@app/core/firebase';
import * as React from 'react';

class App extends React.Component {
  public componentWillMount() {
    console.log(process.env.REACT_APP_STAGE);

    firebase.auth().onAuthStateChanged(auth => {
      if (auth) {
        console.log(auth.toJSON());
        firebase
          .database()
          .ref('/users')
          .child(auth.uid)
          .update({
            // displayName: 'test1',
            online: false
          });
      } else {
        console.log(null);
      }
    });
  }

  public signup = (e: React.MouseEvent<HTMLButtonElement>) => {
    firebase.auth().createUserWithEmailAndPassword('test1@gmail.com', '123456');
  };

  public login = (e: React.MouseEvent<HTMLButtonElement>) => {
    // firebase.auth().signInWithEmailAndPassword('test1@gmail.com', '123456');
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  public logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    firebase.auth().signOut();
  };

  public render() {
    return (
      <div>
        <p>Hello</p>
        <button onClick={this.signup}>Sign up with Email</button>
        <button onClick={this.login}>Log in with Email</button>
        <button onClick={this.logout}>Log out</button>
      </div>
    );
  }
}

export default App;
