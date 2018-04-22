import * as apollo from '@app/core/apollo';
import firebase from '@app/core/firebase';
import gql from 'graphql-tag';
import * as React from 'react';
import { graphql } from 'react-apollo';

class App extends React.Component {
  public componentWillMount() {
    firebase.auth().onAuthStateChanged(auth => {
      if (auth) {
        console.log(auth.toJSON());
        auth.getIdToken().then(value => {
          localStorage.setItem(process.env.REACT_APP_AUTH_KEY as string, value);
        });
      } else {
        localStorage.removeItem(process.env.REACT_APP_AUTH_KEY as string);
      }
      apollo.client.resetStore();
      apollo.subscriptionClient.close(false);
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

export default graphql(gql`
  query {
    users {
      uid
    }
  }
`)(App);
