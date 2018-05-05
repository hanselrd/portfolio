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
  Card,
  Dimmer,
  Form,
  Grid,
  Loader
} from 'semantic-ui-react';
import styled, { StyledComponentClass } from 'styled-components';
import * as yup from 'yup';

const LoginSocialLinkButton = styled(Button).attrs({
  fluid: true,
  labelPosition: 'left'
})`
  margin: 0.7em 0;
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
  <div>
    <Helmet>
      <title>Login - Hansel De La Cruz</title>
    </Helmet>
    <Card raised={true} fluid={true} centered={true}>
      <Dimmer active={signIn.pending}>
        <Loader>Logging in...</Loader>
      </Dimmer>
      <Card.Content>
        <Card.Header>Login</Card.Header>
      </Card.Content>
      <Card.Content extra={true}>
        <Card.Description>
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
                <Form onSubmit={handleSubmit}>
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
        </Card.Description>
      </Card.Content>
    </Card>
  </div>
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
