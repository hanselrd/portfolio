import { RootState } from '@app/ducks';
import { authActions } from '@app/ducks/auth';
import { chatActions } from '@app/ducks/chat';
import { routerActions } from '@app/ducks/router';
import { usersActions } from '@app/ducks/users';
import { FormikProps, withFormik } from 'formik';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Button, Form, Icon } from 'semantic-ui-react';
import * as yup from 'yup';

interface IFormValues {
  text: string;
}

export type AppProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  FormikProps<IFormValues>;

class App extends React.Component<AppProps> {
  public componentWillMount() {
    this.props.authStart();
    this.props.routerStart();
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

  public sendMessage(text: string) {
    this.props.chatSendMessage(text);
  }

  public deleteMessage(id: string) {
    this.props.chatDeleteMessage(id);
  }

  public render() {
    const {
      auth,
      chat: { messages, enabled, bans },
      router,
      users,
      values,
      handleChange,
      handleBlur,
      handleSubmit
    } = this.props;

    return (
      <div>
        <p>Hello {router.location && router.location.pathname}</p>
        {!auth.user && (
          <React.Fragment>
            <Button onClick={() => this.signUpWithEmailAndPassword()}>
              Sign up with Email
            </Button>
            <Button onClick={() => this.login()}>Log in with Email</Button>
          </React.Fragment>
        )}
        {auth.user && (
          <React.Fragment>
            <Button onClick={() => this.logout()}>Log out</Button>
            {/* <Button onClick={() => this.sendMessage()}>
              Send chat message
            </Button> */}

            <Form onSubmit={handleSubmit}>
              <Form.Input
                name="text"
                value={values.text}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form>
            <hr />
            <p>{auth.user.uid}</p>
          </React.Fragment>
        )}
        <hr />
        <p>Enabled: {enabled ? 'yes' : 'no'}</p>
        <p>Users: {JSON.stringify(users)}</p>
        <p>Bans: {JSON.stringify(bans)}</p>
        {Object.keys(messages).map(key => (
          <div key={key}>
            {auth.user &&
              users[auth.user.uid] != null &&
              users[auth.user.uid].role >= 10 && (
                <Button
                  color="red"
                  size="tiny"
                  onClick={() => this.deleteMessage(key)}
                >
                  X
                </Button>
              )}
            <span style={{ color: 'maroon' }}>
              {users[messages[key].uid] != null && (
                <span>
                  [{users[messages[key].uid].displayName}
                  <Icon
                    name="circle"
                    color={users[messages[key].uid].online ? 'green' : 'grey'}
                  />]
                </span>
              )}
            </span>{' '}
            {messages[key].text}
          </div>
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
  chatDeleteMessage: chatActions.deleteMessage,
  chatLoadBan: chatActions.loadBan,
  routerStart: routerActions.start,
  routerPush: routerActions.push,
  usersLoadUser: usersActions.loadUser
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withFormik<AppProps, IFormValues>({
    mapPropsToValues: props => ({ text: '' }),
    validationSchema: yup.object().shape({
      text: yup
        .string()
        .required()
        .max(256)
    }),
    handleSubmit: ({ text }, { props, resetForm }) => {
      props.chatSendMessage(text);
      resetForm({ text: '' });
    }
  })
)(App);
