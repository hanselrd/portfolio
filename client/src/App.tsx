import { RootState } from '@app/ducks';
import { authActions } from '@app/ducks/auth';
import { chatActions } from '@app/ducks/chat';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

export type AppProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

class App extends React.Component<AppProps> {
  public componentWillMount() {
    this.props.authStart();
  }

  public signUpWithEmailAndPassword() {
    this.props.authSignUpWithEmailAndPassword({
      email: 'test1@gmail.com',
      password: '123456'
    });
  }

  public login() {
    this.props.authSignInWithEmailAndPassword({
      email: 'test1@gmail.com',
      password: '123456'
    });
    // this.props.authSignInWithProvider({ provider: 'google', type: 'popup' });
  }

  public logout() {
    this.props.authSignOut();
  }

  public sendMessage() {
    this.props.chatSendMessage(new Date().toString());
  }

  public deleteMessage(id: string) {
    this.props.chatDeleteMessage(id);
  }

  public render() {
    const {
      auth,
      chat: { messages, status }
    } = this.props;

    return (
      <div>
        <p>Hello</p>
        {!auth.user && (
          <React.Fragment>
            <button onClick={() => this.signUpWithEmailAndPassword()}>
              Sign up with Email
            </button>
            <button onClick={() => this.login()}>Log in with Email</button>
          </React.Fragment>
        )}
        {auth.user && (
          <React.Fragment>
            <button onClick={() => this.logout()}>Log out</button>
            <button onClick={() => this.sendMessage()}>
              Send chat message
            </button>
            <hr />
            <p>{auth.user.uid}</p>
          </React.Fragment>
        )}
        <hr />
        <p>{JSON.stringify(status)}</p>
        {Object.keys(messages).map(key => (
          <p key={key}>
            <button onClick={() => this.deleteMessage(key)}> X</button>{' '}
            <span style={{ color: 'maroon' }}>[{key}]</span>{' '}
            {messages[key].text}
          </p>
        ))}
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
  authSignOut: authActions.signOut,
  chatSendMessage: chatActions.sendMessage,
  chatDeleteMessage: chatActions.deleteMessage
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
