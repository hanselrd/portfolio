import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../utils';
import { Helmet } from 'react-helmet';
import { Button, Card, Form, Grid } from 'semantic-ui-react';

class Login extends Component {
  render() {
    const { auth, login } = this.props;
    return (
      <div className="Login">
        <Helmet>
          <title>Login | Hansel De La Cruz</title>
        </Helmet>
        <Card raised fluid centered>
          <Card.Content>
            <Card.Header>Login</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <Card.Description>
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
                      <Form.Field>
                        <label>E-mail</label>
                        <input type="text" placeholder="E-mail" />
                      </Form.Field>
                      <Form.Field>
                        <label>Password</label>
                        <input type="password" placeholder="Password" />
                      </Form.Field>
                      <Button primary type="submit">
                        Submit
                      </Button>
                      <Button secondary>Create an account</Button>
                    </Form>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
