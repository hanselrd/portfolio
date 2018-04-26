import { RootState } from '@app/ducks';
import { authActions } from '@app/ducks/auth';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

export type AppProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

class App extends React.Component<AppProps> {
  public componentWillMount() {
    console.log(process.env.REACT_APP_STAGE);

    this.props.authStart();

    // firebase.auth().onAuthStateChanged(auth => {
    //   if (auth) {
    //     console.log(auth.toJSON());

    //     this.auth = auth;

    //     this.userRef = firebase
    //       .database()
    //       .ref('/users')
    //       .child(auth.uid);

    //     // this.userMetadataRef = firebase
    //     //   .database()
    //     //   .ref('/metadata/users')
    //     //   .child(auth.uid);

    //     this.chatRef = firebase.database().ref('/chat');

    //     this.chatRef.child('status').on('value', snapshot => {
    //       if (snapshot) {
    //         console.log('chat status', snapshot.val());
    //       }
    //     });

    //     this.chatRef
    //       .child('messages')
    //       .limitToLast(5)
    //       .on('child_added', snapshot => {
    //         if (snapshot) {
    //           console.log('ADDED', snapshot.key, snapshot.val());
    //         }
    //       });

    //     this.chatRef.child('messages').on('child_removed', snapshot => {
    //       if (snapshot) {
    //         console.log('REMOVED', snapshot.key, snapshot.val());
    //       }
    //     });

    //     firebase
    //       .database()
    //       .ref('.info/connected')
    //       .on('value', snapshot => {
    //         if (snapshot && snapshot.val()) {
    //           if (this.userRef) {
    //             this.userRef
    //               .onDisconnect()
    //               .update({ online: false })
    //               .then(() => {
    //                 if (this.userRef) {
    //                   this.userRef.update({ online: true });
    //                 }
    //               });
    //           }
    //         }
    //       });
    //   } else {
    //     console.log(null);
    //   }
    // });
  }

  public signUpWithEmailAndPassword = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    this.props.authSignUpWithEmailAndPassword({
      email: 'test1@gmail.com',
      password: '123456'
    });
  };

  public login = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.authSignInWithEmailAndPassword({
      email: 'test1@gmail.com',
      password: '123456'
    });
    // this.props.authSignInWithProvider({ provider: 'google', type: 'popup' });
  };

  public logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.authSignOut();
  };

  public sendChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.warn('not implemented');
    // if (this.auth) {
    //   if (this.chatRef) {
    //     this.chatRef
    //       .child('messages')
    //       .push()
    //       .set({
    //         created: firebase.database.ServerValue.TIMESTAMP,
    //         text: new Date().toString(),
    //         user: this.auth.uid
    //       });
    //   }
    // }
  };

  public render() {
    const { auth } = this.props;

    return (
      <div>
        <p>Hello</p>
        {!auth.user && (
          <React.Fragment>
            <button onClick={this.signUpWithEmailAndPassword}>
              Sign up with Email
            </button>
            <button onClick={this.login}>Log in with Email</button>
          </React.Fragment>
        )}
        {auth.user && (
          <React.Fragment>
            <button onClick={this.logout}>Log out</button>
            <button onClick={this.sendChat}>Send chat message</button>
            <hr />
            <p>{JSON.stringify(auth.user)}</p>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => state;

const mapDispatchToProps = {
  authStart: authActions.start,
  authSignInWithEmailAndPassword: authActions.signInWithEmailAndPassword,
  authSignInWithProvider: authActions.signInWithProvider,
  authSignUpWithEmailAndPassword: authActions.signUpWithEmailAndPassword,
  authSignOut: authActions.signOut
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
