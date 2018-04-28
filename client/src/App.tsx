import { RootState } from '@app/ducks';
import { authActions } from '@app/ducks/auth';
import { chatActions } from '@app/ducks/chat';
import { metadataActions } from '@app/ducks/metadata';
import { FormikProps, withFormik } from 'formik';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Button, Form } from 'semantic-ui-react';
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
      chat: { messages, status },
      metadata,
      values,
      handleChange,
      handleBlur,
      handleSubmit
    } = this.props;

    return (
      <div>
        <p>Hello</p>
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
            <p>{JSON.stringify(metadata.users[auth.user.uid])}</p>
          </React.Fragment>
        )}
        <hr />
        <p>{JSON.stringify(status)}</p>
        {Object.keys(messages).map(key => (
          <div key={key}>
            {metadata.users[messages[key].user] != null &&
              metadata.users[messages[key].user].role &&
              metadata.users[messages[key].user].role! >= 10 && (
                <Button
                  color="red"
                  size="tiny"
                  onClick={() => this.deleteMessage(key)}
                >
                  X
                </Button>
              )}
            <span style={{ color: 'maroon' }}>[{messages[key].user}]</span>{' '}
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
  metadataLoadUser: metadataActions.loadUser
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
