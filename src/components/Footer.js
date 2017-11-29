import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  List,
  Segment
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  state = {
    date: new Date()
  };

  render() {
    return (
      <div className="Footer">
        <Segment
          inverted
          vertical
          style={{ margin: '5em 0 0', padding: '5em 0' }}
        >
          <Container textAlign="center">
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as="h4">
                    Group 1
                  </Header>
                  <List link inverted>
                    <List.Item as="a">Link One</List.Item>
                    <List.Item as="a">Link Two</List.Item>
                    <List.Item as="a">Link Three</List.Item>
                    <List.Item as="a">Link Four</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4">
                    Group 2
                  </Header>
                  <List link inverted>
                    <List.Item as="a">Link One</List.Item>
                    <List.Item as="a">Link Two</List.Item>
                    <List.Item as="a">Link Three</List.Item>
                    <List.Item as="a">Link Four</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4">
                    Group 3
                  </Header>
                  <List link inverted>
                    <List.Item as="a">Link One</List.Item>
                    <List.Item as="a">Link Two</List.Item>
                    <List.Item as="a">Link Three</List.Item>
                    <List.Item as="a">Link Four</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header inverted as="h4">
                    Connect With Me
                  </Header>
                  <Button
                    circular
                    color="facebook"
                    icon="facebook"
                    size="huge"
                    style={{ margin: '0 0.3em' }}
                    as="a"
                    href="https://facebook.com/hansel.delacruz.14"
                    target="_blank"
                  />
                  <Button
                    circular
                    color="linkedin"
                    icon="linkedin"
                    size="huge"
                    style={{ margin: '0 0.3em' }}
                    as="a"
                    href="https://linkedin.com/in/hansel-de-la-cruz-532199144"
                    target="_blank"
                  />
                  <Button
                    circular
                    color="grey"
                    icon="github"
                    size="huge"
                    style={{ margin: '0 0.3em' }}
                    as="a"
                    href="https://github.com/hanselrd"
                    target="_blank"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider inverted section />
            <Container style={{ marginBottom: 20 }}>
              <span>
                &copy; Copyright {this.state.date.getFullYear()}{' '}
                <strong>Hansel De La Cruz</strong>
              </span>
            </Container>
            <List horizontal inverted divided link>
              <List.Item as={Link} to="/site-map">
                Site Map
              </List.Item>
              <List.Item as={Link} to="/contact-us">
                Contact Us
              </List.Item>
              <List.Item as={Link} to="/terms">
                Terms and Conditions
              </List.Item>
              <List.Item as={Link} to="/privacy-policy">
                Privacy Policy
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default Footer;
