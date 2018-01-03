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
import locales from '../locales';

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
                    {locales.footer.group} 1
                  </Header>
                  <List link inverted>
                    <List.Item as="a">
                      {locales.formatString(
                        locales.footer.link,
                        locales.footer.one
                      )}
                    </List.Item>
                    <List.Item as="a">
                      {locales.formatString(
                        locales.footer.link,
                        locales.footer.two
                      )}
                    </List.Item>
                    <List.Item as="a">
                      {locales.formatString(
                        locales.footer.link,
                        locales.footer.three
                      )}
                    </List.Item>
                    <List.Item as="a">
                      {locales.formatString(
                        locales.footer.link,
                        locales.footer.four
                      )}
                    </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4">
                    {locales.footer.group} 2
                  </Header>
                  <List link inverted>
                    <List.Item as="a">
                      {locales.formatString(
                        locales.footer.link,
                        locales.footer.one
                      )}
                    </List.Item>
                    <List.Item as="a">
                      {locales.formatString(
                        locales.footer.link,
                        locales.footer.two
                      )}
                    </List.Item>
                    <List.Item as="a">
                      {locales.formatString(
                        locales.footer.link,
                        locales.footer.three
                      )}
                    </List.Item>
                    <List.Item as="a">
                      {locales.formatString(
                        locales.footer.link,
                        locales.footer.four
                      )}
                    </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4">
                    {locales.footer.group} 3
                  </Header>
                  <List link inverted>
                    <List.Item as="a">
                      {locales.formatString(
                        locales.footer.link,
                        locales.footer.one
                      )}
                    </List.Item>
                    <List.Item as="a">
                      {locales.formatString(
                        locales.footer.link,
                        locales.footer.two
                      )}
                    </List.Item>
                    <List.Item as="a">
                      {locales.formatString(
                        locales.footer.link,
                        locales.footer.three
                      )}
                    </List.Item>
                    <List.Item as="a">
                      {locales.formatString(
                        locales.footer.link,
                        locales.footer.four
                      )}
                    </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header inverted as="h4">
                    {locales.footer.connectWithMe}
                  </Header>
                  <Button
                    circular
                    compact
                    color="facebook"
                    icon="facebook"
                    size="massive"
                    style={{ margin: '0 0.3em' }}
                    as="a"
                    href="https://facebook.com/hansel.delacruz.14"
                    target="_blank"
                  />
                  <Button
                    circular
                    compact
                    color="linkedin"
                    icon="linkedin"
                    size="massive"
                    style={{ margin: '0 0.3em' }}
                    as="a"
                    href="https://linkedin.com/in/hansel-de-la-cruz-532199144"
                    target="_blank"
                  />
                  <Button
                    circular
                    compact
                    color="grey"
                    icon="github"
                    size="massive"
                    style={{ margin: '0 0.3em' }}
                    as="a"
                    href="https://github.com/hanselrd"
                    target="_blank"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider inverted section />
            <Container style={{ marginBottom: '2em' }}>
              <span>
                &copy; Copyright {this.state.date.getFullYear()}{' '}
                <strong>Hansel De La Cruz</strong>
              </span>
            </Container>
            <List horizontal inverted divided link>
              <List.Item as={Link} to="/site-map">
                {locales.footer.siteMap}
              </List.Item>
              <List.Item as={Link} to="/contact-us">
                {locales.footer.contactUs}
              </List.Item>
              <List.Item as={Link} to="/terms">
                {locales.footer.termsAndConditions}
              </List.Item>
              <List.Item as={Link} to="/privacy-policy">
                {locales.footer.privacyPolicy}
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default Footer;
