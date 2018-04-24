import firebase from '@app/core/firebase';
import * as React from 'react';

class App extends React.Component {
  private writeonlyUserRef?: firebase.database.Reference;
  private writeonlyChatRef?: firebase.database.Reference;

  public componentWillMount() {
    console.log(process.env.REACT_APP_STAGE);

    firebase.auth().onAuthStateChanged(auth => {
      if (auth) {
        console.log(auth.toJSON());

        const writeonlyRef = firebase
          .database()
          .ref('/writeonly')
          .child(auth.uid);

        this.writeonlyUserRef = writeonlyRef.child('user');

        this.writeonlyChatRef = writeonlyRef.child('chat');

        firebase
          .database()
          .ref('.info/connected')
          .on('value', snapshot => {
            if (snapshot && snapshot.val()) {
              if (this.writeonlyUserRef) {
                this.writeonlyUserRef
                  .onDisconnect()
                  .set({ online: false })
                  .then(() => {
                    if (this.writeonlyUserRef) {
                      this.writeonlyUserRef.set({ online: true });
                    }
                  });
              }
            }
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
    firebase.auth().signInWithEmailAndPassword('test1@gmail.com', '123456');
    // firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  public logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (this.writeonlyUserRef) {
      this.writeonlyUserRef.update({ online: false });
    }
    firebase.auth().signOut();
  };

  public sendChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (this.writeonlyChatRef) {
      this.writeonlyChatRef.set({ text: 'hello from react' });
    }
  };

  public render() {
    return (
      <div>
        <p>Hello</p>
        <button onClick={this.signup}>Sign up with Email</button>
        <button onClick={this.login}>Log in with Email</button>
        <button onClick={this.logout}>Log out</button>
        <button onClick={this.sendChat}>Send chat message</button>
      </div>
    );
  }
}

export default App;
