import { RootState } from '@app/ducks';
import { authActions } from '@app/ducks/auth';
import { FormikProps, withFormik } from 'formik';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  Button,
  ButtonProps,
  Dimmer,
  Form,
  Grid,
  Header,
  Loader,
  Segment
} from 'semantic-ui-react';
import styled, { StyledComponentClass } from 'styled-components';
import * as yup from 'yup';

const LoginSocialLinkButton = styled(Button).attrs({
  fluid: true,
  labelPosition: 'left'
})`
  &&& {
    margin: 0.7em 0;
  }
` as StyledComponentClass<ButtonProps, {}>;

interface IFormValues {
  email: string;
  password: string;
}

type LoginProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  FormikProps<IFormValues>;

const Login: React.SFC<LoginProps> = ({
  authSignInWithEmailAndPassword,
  authSignInWithProvider,
  signIn,
  values,
  errors,
  // touched,
  handleChange,
  handleBlur,
  handleSubmit
}) => (
  <Segment inverted={true}>
    <Helmet>
      <title>Login - Hansel De La Cruz</title>
    </Helmet>
    <Header as="h2">Login</Header>
    <Dimmer active={signIn.pending}>
      <Loader>Logging in...</Loader>
    </Dimmer>
    <Grid divided={true} stackable={true} columns="equal">
      <Grid.Row>
        <Grid.Column width={6} textAlign="center">
          <p>Using your social media</p>
          <LoginSocialLinkButton
            color="google plus"
            icon="google"
            content="Log in with Google"
            onClick={() =>
              authSignInWithProvider({
                provider: 'google',
                type: 'popup'
              })
            }
          />
          <LoginSocialLinkButton
            color="facebook"
            icon="facebook"
            content="Log in with Facebook"
            onClick={() =>
              authSignInWithProvider({
                provider: 'facebook',
                type: 'popup'
              })
            }
          />
          <LoginSocialLinkButton
            color="twitter"
            icon="twitter"
            content="Log in with Twitter"
            onClick={() =>
              authSignInWithProvider({
                provider: 'twitter',
                type: 'popup'
              })
            }
          />
          <LoginSocialLinkButton
            color="grey"
            icon="github"
            content="Log in with Github"
            onClick={() =>
              authSignInWithProvider({
                provider: 'github',
                type: 'popup'
              })
            }
          />
        </Grid.Column>
        <Grid.Column>
          <Form onSubmit={handleSubmit} inverted={true}>
            <Form.Input
              name="email"
              label="Email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Form.Input
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Button primary={true} type="submit">
              Submit
            </Button>
          </Form>
          {JSON.stringify({ client: errors, server: signIn.error })}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

const mapStateToProps = (state: RootState) => state.auth;

const mapDispatchToProps = {
  authSignInWithEmailAndPassword: authActions.signInWithEmailAndPassword,
  authSignInWithProvider: authActions.signInWithProvider
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik<LoginProps, IFormValues>({
    mapPropsToValues: props => ({ email: '', password: '' }),
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required()
        .email(),
      password: yup.string().required()
    }),
    handleSubmit: ({ email, password }, { props }) => {
      props.authSignInWithEmailAndPassword({ email, password });
    }
  })
)(Login);
