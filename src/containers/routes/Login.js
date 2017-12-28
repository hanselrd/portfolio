import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils';
import Page from '../../components/Page';
import { Button, Card, Form, Grid, Message } from 'semantic-ui-react';

class Login extends Component {
  render() {
    const { auth, login } = this.props;
    return (
      <div className="Login">
        <Page title="Login" hideHeader>
          <Card raised fluid centered>
            <Card.Content>
              <Card.Header>Login</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <Card.Description>
                <Message
                  error
                  header={auth.login.error && auth.login.error.code}
                  content={auth.login.error && auth.login.error.message}
                  hidden={!auth.login.error}
                />
                <Grid divided stackable columns="equal">
                  <Grid.Row>
                    <Grid.Column width={6} textAlign="center">
                      <p>Using your social media</p>
                      <Button
                        fluid
                        color="google plus"
                        icon="google"
                        content="Log in with Google"
                        labelPosition="left"
                        loading={
                          auth.login.loading &&
                          auth.login.request.provider === 'google'
                        }
                        style={{ margin: '0.7em 0' }}
                        onClick={() =>
                          login({ provider: 'google', type: 'popup' })
                        }
                      />
                      <Button
                        fluid
                        color="facebook"
                        icon="facebook"
                        content="Log in with Facebook"
                        labelPosition="left"
                        loading={
                          auth.login.loading &&
                          auth.login.request.provider === 'facebook'
                        }
                        style={{ margin: '0.7em 0' }}
                        onClick={() =>
                          login({ provider: 'facebook', type: 'popup' })
                        }
                      />
                      <Button
                        fluid
                        color="twitter"
                        icon="twitter"
                        content="Log in with Twitter"
                        labelPosition="left"
                        loading={
                          auth.login.loading &&
                          auth.login.request.provider === 'twitter'
                        }
                        style={{ margin: '0.7em 0' }}
                        onClick={() =>
                          login({ provider: 'twitter', type: 'popup' })
                        }
                      />
                      <Button
                        fluid
                        color="grey"
                        icon="github"
                        content="Log in with GitHub"
                        labelPosition="left"
                        loading={
                          auth.login.loading &&
                          auth.login.request.provider === 'github'
                        }
                        style={{ margin: '0.7em 0' }}
                        onClick={() =>
                          login({ provider: 'github', type: 'popup' })
                        }
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form>
                        <Form.Input
                          label="Email"
                          placeholder="Email"
                          disabled
                        />
                        <Form.Input
                          type="password"
                          label="Password"
                          placeholder="Password"
                          disabled
                        />
                        <Button primary type="submit" disabled>
                          Submit
                        </Button>
                        <Button secondary disabled>
                          Create an account
                        </Button>
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Description>
            </Card.Content>
          </Card>
        </Page>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
