import firebase from '@app/core/firebase';
import * as React from 'react';

class App extends React.Component {
  private userRef?: firebase.database.Reference;
  // private userMetadataRef?: firebase.database.Reference;
  private chatRef?: firebase.database.Reference;
  private auth?: firebase.User;

  public componentWillMount() {
    console.log(process.env.REACT_APP_STAGE);

    firebase.auth().onAuthStateChanged(auth => {
      if (auth) {
        console.log(auth.toJSON());

        this.auth = auth;

        this.userRef = firebase
          .database()
          .ref('/users')
          .child(auth.uid);

        // this.userMetadataRef = firebase
        //   .database()
        //   .ref('/metadata/users')
        //   .child(auth.uid);

        this.chatRef = firebase.database().ref('/chat');

        this.chatRef.child('status').on('value', snapshot => {
          if (snapshot) {
            console.log('chat status', snapshot.val());
          }
        });

        this.chatRef
          .child('messages')
          .limitToLast(5)
          .on('child_added', snapshot => {
            if (snapshot) {
              console.log('ADDED', snapshot.key, snapshot.val());
            }
          });

        this.chatRef.child('messages').on('child_removed', snapshot => {
          if (snapshot) {
            console.log('REMOVED', snapshot.key, snapshot.val());
          }
        });

        firebase
          .database()
          .ref('.info/connected')
          .on('value', snapshot => {
            if (snapshot && snapshot.val()) {
              if (this.userRef) {
                this.userRef
                  .onDisconnect()
                  .update({ online: false })
                  .then(() => {
                    if (this.userRef) {
                      this.userRef.update({ online: true });
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
    if (this.userRef) {
      this.userRef.update({ online: false });
    }
    firebase.auth().signOut();
  };

  public sendChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (this.auth) {
      if (this.chatRef) {
        this.chatRef
          .child('messages')
          .push()
          .set({
            created: firebase.database.ServerValue.TIMESTAMP,
            text: new Date().toString(),
            user: this.auth.uid
          });
      }
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
